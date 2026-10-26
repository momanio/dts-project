import assert from 'node:assert/strict'
import { test } from 'node:test'
import { readFile, mkdir } from 'node:fs/promises'
import { resolve, extname } from 'node:path'
import { createRequire } from 'node:module'
import { chromium } from 'playwright'

const require = createRequire(import.meta.url)
const root = resolve('dist')
const screenshots = 'test-results/doctor-scroll'
const types = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
}
const layers = ['word', 'tooth', 'portrait', 'smile']
const near = (actual, expected, message, tolerance = 2) =>
  assert.ok(Math.abs(actual - expected) <= tolerance, `${message}: ${actual} ≈ ${expected}`)

test(
  'sticky doctor storyboard, reversible depth, responsive static layouts and accessibility',
  { timeout: 180000 },
  async () => {
    const browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox'],
      ...(process.env.PLAYWRIGHT_EXECUTABLE_PATH
        ? { executablePath: process.env.PLAYWRIGHT_EXECUTABLE_PATH }
        : {}),
    })
    const errors = []
    await mkdir(screenshots, { recursive: true })

    async function openPage({
      width = 1440,
      height = 900,
      language = 'en',
      theme = 'light',
      reducedMotion = 'no-preference',
      fallback = false,
    } = {}) {
      const context = await browser.newContext({
        viewport: { width, height },
        reducedMotion,
        hasTouch: width < 900,
        isMobile: width < 900,
        colorScheme: theme,
      })
      await context.addInitScript(
        ({ language, theme }) => {
          localStorage.setItem('luma-language', language)
          localStorage.setItem('luma-theme', theme)
        },
        { language, theme },
      )
      await context.route('**/*', async (route) => {
        const url = new URL(route.request().url())
        if (url.hostname !== 'luma.test') {
          return process.env.LUMA_BROWSER_NETWORK === '1' &&
            /fonts\.(googleapis|gstatic)\.com/.test(url.hostname)
            ? route.continue()
            : route.abort()
        }
        if (fallback && url.pathname === '/images/doctor-male.webp')
          return route.fulfill({ status: 404, body: '' })
        const path = resolve(root, `.${url.pathname === '/' ? '/index.html' : url.pathname}`)
        if (!path.startsWith(`${root}/`)) return route.fulfill({ status: 403, body: '' })
        try {
          await route.fulfill({
            body: await readFile(path),
            contentType: types[extname(path)] ?? 'application/octet-stream',
          })
        } catch {
          await route.fulfill({ status: 404, body: '' })
        }
      })
      const page = await context.newPage()
      page.on('pageerror', (error) => errors.push(error.message))
      await page.goto('http://luma.test/')
      await page.locator('#contact form').waitFor()
      await page.evaluate(() => document.fonts.ready)
      await page.locator('#about').evaluate((element) =>
        window.scrollTo({
          top: scrollY + element.getBoundingClientRect().top,
          behavior: 'instant',
        }),
      )
      // Allow the existing navigation's height transition to finish before measuring the scroll target.
      await page.waitForTimeout(400)
      await page.waitForFunction(() => {
        const image = document.querySelector('.doctor-scene img')
        return image.complete && image.naturalWidth > 0
      })
      return { page, context }
    }
    const scrollToProgress = async (page, progress) => {
      await page.locator('#about').evaluate((element, progress) => {
        const rect = element.getBoundingClientRect()
        window.scrollTo({
          top: scrollY + rect.top + (rect.height - innerHeight) * progress,
          behavior: 'instant',
        })
      }, progress)
      await page.waitForTimeout(120)
    }
    const matrix = (page, selector) =>
      page.locator(selector).evaluate((element) => {
        const m = new DOMMatrixReadOnly(getComputedStyle(element).transform)
        return { x: m.m41, y: m.m42, rotation: (Math.atan2(m.m12, m.m11) * 180) / Math.PI }
      })
    const assertLayout = async (page, pinned) => {
      const width = page.viewportSize().width
      assert.equal(
        await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1),
        false,
        'no horizontal overflow',
      )
      for (const selector of ['.doctor-scene__frame', '.doctor-about__details']) {
        const rect = await page.locator(selector).boundingBox()
        assert.ok(
          rect.x >= 0 && rect.x + rect.width <= width + 1,
          `${selector} stays inside viewport`,
        )
        if (pinned) {
          const header = await page.locator('header').boundingBox()
          assert.ok(rect.y >= header.y + header.height, `${selector} clears navigation`)
          assert.ok(
            rect.y + rect.height <= page.viewportSize().height,
            `${selector} fits sticky stage`,
          )
        }
      }
      const frame = await page.locator('.doctor-scene__frame').boundingBox()
      const smile = await page.locator('.doctor-scene__smile').boundingBox()
      assert.ok(smile.y > frame.y + frame.height * 0.45, 'foreground smile stays below the face')
      const scene = await page.locator('.doctor-scene').boundingBox()
      const word = await page.locator('.doctor-scene__word').boundingBox()
      assert.ok(
        word.x >= scene.x - 1 && word.x + word.width <= scene.x + scene.width + 1,
        'bilingual word stays within composition',
      )
    }
    const audit = async (page) => {
      await page.addScriptTag({ path: require.resolve('axe-core/axe.min.js') })
      const result = await page.evaluate(() =>
        window.axe.run(document.querySelector('#about'), {
          runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] },
        }),
      )
      assert.deepEqual(
        result.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })),
        [],
      )
      await page.evaluate(() => document.activeElement.blur())
    }
    const booking = async (page) => {
      const cta = page.locator('#about a[href="#contact"]')
      await cta.focus()
      await page.keyboard.press('Tab')
      await page.keyboard.press('Shift+Tab')
      assert.equal(
        await cta.evaluate(
          (element) => element === document.activeElement && element.matches(':focus-visible'),
        ),
        true,
      )
      await page.keyboard.press('Enter')
      assert.equal(new URL(page.url()).hash, '#contact')
    }

    try {
      for (const language of ['en', 'ar']) {
        for (const theme of ['light', 'dark']) {
          const { page, context } = await openPage({ language, theme })
          const scenario = `desktop-${language}-${theme}`
          assert.equal(await page.locator('#about').getAttribute('data-parallax'), 'true')
          near(
            (await page.locator('#about').boundingBox()).height,
            900 * 2.4,
            '240vh scroll section',
          )
          assert.equal(
            await page
              .locator('.doctor-about__stage')
              .evaluate((element) => getComputedStyle(element).position),
            'sticky',
          )
          assert.equal(
            await page.locator('.doctor-scene__word').innerText(),
            language === 'ar' ? 'ابتسامة' : 'SMILE',
          )
          for (const layer of ['word', 'tooth', 'smile']) {
            const element = page.locator(`.doctor-scene__${layer}`)
            assert.equal(await element.getAttribute('aria-hidden'), 'true')
            assert.equal(
              await element.evaluate((element) => getComputedStyle(element).pointerEvents),
              'none',
            )
          }
          await scrollToProgress(page, 0)
          const details = await page.locator('.doctor-about__details').boundingBox()
          const first = Object.fromEntries(
            await Promise.all(
              layers.map(async (layer) => [layer, await matrix(page, `.doctor-scene__${layer}`)]),
            ),
          )
          await page.screenshot({ path: `${screenshots}/${scenario}-start.png` })
          await assertLayout(page, true)
          for (const layer of layers) {
            assert.equal(
              await page
                .locator(`.doctor-scene__${layer}`)
                .evaluate((element) => getComputedStyle(element).opacity),
              '1',
              `${layer} visible immediately`,
            )
          }
          await scrollToProgress(page, 0.3)
          near((await matrix(page, '.doctor-scene__portrait')).y, -80, 'portrait rises 80px by 30%')
          near((await matrix(page, '.doctor-scene__tooth')).y, 60, 'tooth drops 60px by 30%')
          await scrollToProgress(page, 0.65)
          await page.screenshot({ path: `${screenshots}/${scenario}-middle.png` })
          await assertLayout(page, true)
          const direction = language === 'ar' ? -1 : 1
          const sceneWidth = (await page.locator('.doctor-scene').boundingBox()).width
          near(
            (await matrix(page, '.doctor-scene__word')).x,
            sceneWidth * 0.28 * direction,
            'word moves ~200px',
          )
          near(
            (await matrix(page, '.doctor-scene__smile')).x,
            sceneWidth * 0.2 * direction,
            'smile moves ~140px',
          )
          near(
            (await matrix(page, '.doctor-scene__tooth svg')).rotation,
            6 * direction,
            'tooth rotates six degrees',
            0.1,
          )
          const middleDetails = await page.locator('.doctor-about__details').boundingBox()
          near(middleDetails.y, details.y, 'reading content stays fixed', 0.5)
          near(middleDetails.x, details.x, 'reading content does not drift', 0.5)
          near(
            (await page.locator('.doctor-about__stage').boundingBox()).y,
            74,
            'stage pins below navigation',
          )
          await audit(page)
          await scrollToProgress(page, 0.85)
          const settled = await matrix(page, '.doctor-scene__portrait')
          await scrollToProgress(page, 1)
          await page.screenshot({ path: `${screenshots}/${scenario}-end.png` })
          await assertLayout(page, true)
          assert.deepEqual(
            await matrix(page, '.doctor-scene__portrait'),
            settled,
            'scene holds final pose from 85–100%',
          )
          // The pin releases naturally when its section ends.
          await page.evaluate(() => window.scrollBy({ top: 240, behavior: 'instant' }))
          await page.waitForTimeout(100)
          near(
            (await page.locator('.doctor-about__stage').boundingBox()).y,
            74 - 240,
            'sticky stage releases',
          )
          assert.ok(
            (await page.locator('#services').boundingBox()).y < page.viewportSize().height,
            'next section enters viewport',
          )
          await scrollToProgress(page, 0)
          for (const layer of layers) {
            const reversed = await matrix(page, `.doctor-scene__${layer}`)
            near(reversed.x, first[layer].x, `${layer} reverses x`, 0.5)
            near(reversed.y, first[layer].y, `${layer} reverses y`, 0.5)
          }
          await booking(page)
          await context.close()
        }
      }

      for (const language of ['en', 'ar']) {
        for (const theme of ['light', 'dark']) {
          for (const variant of [
            { name: 'mobile', width: 360, height: 800 },
            { name: 'short', width: 1440, height: 600 },
            { name: 'reduced', width: 1440, height: 900, reducedMotion: 'reduce' },
          ]) {
            const { page, context } = await openPage({ ...variant, language, theme })
            assert.equal(await page.locator('#about').getAttribute('data-parallax'), 'false')
            assert.equal(
              await page
                .locator('.doctor-about__stage')
                .evaluate((element) => getComputedStyle(element).position),
              'relative',
            )
            near(
              (await page.locator('#about').boundingBox()).height,
              (await page.locator('.doctor-about__stage').boundingBox()).height,
              'no extra scroll runway',
            )
            await assertLayout(page, false)
            for (const layer of layers)
              assert.deepEqual(
                await matrix(page, `.doctor-scene__${layer}`),
                { x: 0, y: 0, rotation: 0 },
                'static layer',
              )
            const position = (await page.locator('.doctor-about__stage').boundingBox()).y
            await page.evaluate(() => window.scrollBy({ top: 180, behavior: 'instant' }))
            await page.waitForTimeout(100)
            near(
              (await page.locator('.doctor-about__stage').boundingBox()).y,
              position - 180,
              'normal document flow',
            )
            await audit(page)
            await page.locator('#about').screenshot({
              path: `${screenshots}/${variant.name}-${language}-${theme}.png`,
              style: 'header, #root > .fixed { visibility: hidden !important; }',
            })
            await booking(page)
            await context.close()
          }
        }
      }

      // Boundaries, live preference changes, and the original image fallback.
      for (const language of ['en', 'ar']) {
        const { page, context } = await openPage({ width: 1100, height: 800, language })
        for (const progress of [0, 0.65, 1]) {
          await scrollToProgress(page, progress)
          await assertLayout(page, true)
        }
        await page.emulateMedia({ reducedMotion: 'reduce' })
        await page.waitForFunction(
          () => document.querySelector('#about').dataset.parallax === 'false',
        )
        assert.equal(
          await page
            .locator('.doctor-about__stage')
            .evaluate((element) => getComputedStyle(element).position),
          'relative',
        )
        await page.setViewportSize({ width: 320, height: 700 })
        await page.waitForTimeout(150)
        await assertLayout(page, false)
        const menu = page.locator('header button[aria-haspopup="dialog"]')
        const menuBounds = await menu.boundingBox()
        assert.ok(
          menuBounds.width >= 44 && menuBounds.height >= 44,
          'compact navigation keeps its touch target',
        )
        await menu.click()
        assert.equal(await page.locator('dialog').evaluate((element) => element.open), true)
        await page.keyboard.press('Escape')
        assert.equal(await menu.evaluate((element) => element === document.activeElement), true)
        await page.locator('#about').evaluate((element) =>
          window.scrollTo({
            top: scrollY + element.getBoundingClientRect().top - 74,
            behavior: 'instant',
          }),
        )
        await page.screenshot({ path: `${screenshots}/narrow-${language}.png` })
        await context.close()
      }
      const { page, context } = await openPage({
        width: 360,
        height: 800,
        language: 'ar',
        fallback: true,
      })
      assert.ok(
        (await page.locator('.doctor-scene img').getAttribute('src')).endsWith(
          '/images/doctor.svg',
        ),
      )
      await assertLayout(page, false)
      await context.close()
      assert.deepEqual(errors, [])
    } finally {
      await browser.close()
    }
  },
)
