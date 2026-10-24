import assert from 'node:assert/strict'
import { test } from 'node:test'
import { readFile, mkdir } from 'node:fs/promises'
import { resolve, extname } from 'node:path'
import { createRequire } from 'node:module'
import { chromium } from 'playwright'

const require = createRequire(import.meta.url)
const root = resolve('dist')
const online = process.env.LUMA_BROWSER_NETWORK === '1'
const screenshots = online ? 'test-results/palette-online' : 'test-results/palette'
const types = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
}

test(
  'Porcelain & Terracotta contrast, focus, form states and responsive theme matrix',
  { timeout: 240000 },
  async () => {
    const browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox'],
      ...(process.env.PLAYWRIGHT_EXECUTABLE_PATH
        ? { executablePath: process.env.PLAYWRIGHT_EXECUTABLE_PATH }
        : {}),
    })
    try {
      const context = await browser.newContext({
        viewport: { width: 1440, height: 1000 },
        colorScheme: 'light',
        reducedMotion: 'reduce',
      })
      // Fulfill built assets directly: this also works without a listening HTTP port.
      await context.route('**/*', async (route) => {
        const url = new URL(route.request().url())
        if (url.hostname !== 'luma.test') return online ? route.continue() : route.abort()
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
      const runtimeErrors = []
      page.on('pageerror', (error) => runtimeErrors.push(error.message))
      await page.goto('http://luma.test/')
      await page.locator('#contact form').waitFor()
      await page.getByRole('button', { name: 'Switch to English', exact: true }).click()
      assert.equal(await page.locator('html').getAttribute('dir'), 'ltr')
      const lightChrome = await page.locator('meta[name="theme-color"]').getAttribute('content')
      await page.getByRole('button', { name: 'Switch to dark mode', exact: true }).click()
      assert.match(await page.locator('html').getAttribute('class'), /dark/)
      assert.notEqual(
        await page.locator('meta[name="theme-color"]').getAttribute('content'),
        lightChrome,
      )
      await page.getByRole('button', { name: 'Switch to light mode', exact: true }).click()
      assert.equal(
        await page.locator('meta[name="theme-color"]').getAttribute('content'),
        lightChrome,
      )
      await mkdir(screenshots, { recursive: true })
      // Allow the browser's one-pixel rounding of fractional layout dimensions.
      const overflow = () =>
        page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1)
      const date = new Date()
      do {
        date.setDate(date.getDate() + 1)
      } while (date.getDay() !== 0)
      // Check the full theme/language/viewport matrix, including rendered form states.
      for (const width of [1440, 360]) {
        for (const language of ['ar', 'en']) {
          for (const theme of ['light', 'dark']) {
            const scenario = `${width === 1440 ? 'desktop' : 'mobile'}-${language}-${theme}`
            await page.setViewportSize({
              width,
              height: width === 1440 ? 1000 : 800,
            })
            await page.evaluate(
              ({ language, theme }) => {
                localStorage.setItem('luma-language', language)
                localStorage.setItem('luma-theme', theme)
              },
              { language, theme },
            )
            await page.reload()
            await page.locator('#contact form').waitFor()
            for (const img of await page.locator('img').all()) await img.scrollIntoViewIfNeeded()
            await page.waitForFunction(() =>
              [...document.images].every((img) => img.complete && img.naturalWidth > 0),
            )
            await page.evaluate(() => document.fonts.ready)
            assert.equal(
              await page.locator('html').getAttribute('dir'),
              language === 'ar' ? 'rtl' : 'ltr',
            )
            assert.equal(await overflow(), false, `${scenario}: horizontal overflow`)
            await page.addScriptTag({
              path: require.resolve('axe-core/axe.min.js'),
            })

            // Resolve CSS colors through the browser, including Tailwind's color-mix and OKLCH.
            const contrast = async (selector, foreground, background, minimum) => {
              const ratio = await page
                .locator(selector)
                .first()
                .evaluate(
                  (element, { foreground, background }) => {
                    const styles = getComputedStyle(element)
                    const canvas = document.createElement('canvas')
                    canvas.width = canvas.height = 1
                    const context = canvas.getContext('2d')
                    const luminance = (property) => {
                      context.clearRect(0, 0, 1, 1)
                      context.fillStyle = styles.getPropertyValue(property).trim()
                      context.fillRect(0, 0, 1, 1)
                      const [r, g, b] = [...context.getImageData(0, 0, 1, 1).data].map(
                        (channel) => {
                          const srgb = channel / 255
                          return srgb <= 0.04045 ? srgb / 12.92 : ((srgb + 0.055) / 1.055) ** 2.4
                        },
                      )
                      return 0.2126 * r + 0.7152 * g + 0.0722 * b
                    }
                    const values = [luminance(foreground), luminance(background)].sort(
                      (a, b) => b - a,
                    )
                    return (values[0] + 0.05) / (values[1] + 0.05)
                  },
                  { foreground, background },
                )
              assert.ok(
                ratio >= minimum,
                `${scenario}: ${selector} ${foreground}/${background} = ${ratio.toFixed(2)}, needs ${minimum}`,
              )
            }
            for (const surface of ['--canvas', '--surface', '--soft']) {
              for (const text of ['--ink', '--muted', '--primary']) {
                await contrast('html', text, surface, 4.5)
              }
              await contrast('html', '--focus-ring', surface, 3)
            }
            await contrast('footer', '--deep-ink', '--deep', 4.5)
            await contrast('footer', '--deep-muted', '--deep', 4.5)
            await contrast('footer', '--focus-ring', '--deep', 3)
            await contrast('html', '--deep', '--accent', 4.5)
            assert.equal(
              await page.locator('meta[name="theme-color"]').getAttribute('content'),
              await page
                .locator('html')
                .evaluate((element) =>
                  getComputedStyle(element).getPropertyValue('--canvas').trim(),
                ),
            )

            const primary = page.locator('#home a[href="#contact"]')
            await contrast('#home a[href="#contact"]', 'color', 'background-color', 4.5)
            await primary.hover()
            await page.waitForTimeout(50)
            await contrast('#home a[href="#contact"]', 'color', 'background-color', 4.5)
            assert.equal(
              await primary.evaluate((element) => getComputedStyle(element).backgroundColor),
              await page.evaluate(() => {
                const probe = document.createElement('span')
                probe.style.backgroundColor = 'var(--primary-hover)'
                document.body.append(probe)
                const color = getComputedStyle(probe).backgroundColor
                probe.remove()
                return color
              }),
            )
            await page.keyboard.press('Tab')
            await primary.focus()
            assert.equal(
              await primary.evaluate((element) => element.matches(':focus-visible')),
              true,
            )
            await contrast('#home a[href="#contact"]', 'outline-color', '--canvas', 3)
            const secondary = page.locator('#home a[target="_blank"]')
            await secondary.hover()
            await page.waitForTimeout(50)
            await contrast('#home a[target="_blank"]', 'color', '--soft', 4.5)
            await contrast('#home a[target="_blank"]', 'border-top-color', '--soft', 3)
            await page.locator('#services a').first().focus()
            await contrast('#services a', 'outline-color', 'background-color', 3)
            await page.locator('footer a').first().focus()
            await contrast('footer a', 'outline-color', '--deep', 3)
            const whatsapp = page.locator('a.fixed[target="_blank"]')
            await whatsapp.focus()
            await contrast('a.fixed[target="_blank"]', 'outline-color', '--deep-ink', 3)
            await whatsapp.hover()
            await page.waitForTimeout(50)
            await contrast('a.fixed[target="_blank"]', 'color', 'background-color', 3)
            await page.mouse.move(0, 0)
            await page.evaluate(() => {
              document.activeElement.blur()
              window.scrollTo(0, 0)
            })
            await page.screenshot({ path: `${screenshots}/${scenario}.png` })
            await page.screenshot({ path: `${screenshots}/${scenario}-full.png`, fullPage: true })

            const audit = async (state) => {
              const result = await page.evaluate(async () =>
                window.axe.run(document, {
                  runOnly: {
                    type: 'rule',
                    values: ['color-contrast'],
                  },
                }),
              )
              assert.deepEqual(
                result.violations.map((violation) => ({
                  id: violation.id,
                  nodes: violation.nodes.map((node) => ({
                    target: node.target,
                    summary: node.failureSummary,
                  })),
                })),
                [],
                `${scenario}: ${state}`,
              )
            }
            await audit('default')
            if (width === 360) {
              await page.locator('header button[aria-haspopup="dialog"]').click()
              await audit('mobile menu')
              await page.screenshot({
                path: `${screenshots}/${scenario}-menu.png`,
              })
              await page.keyboard.press('Escape')
            }
            const submit = page.locator('#contact button[type="submit"]')
            await submit.click()
            assert.equal(await page.locator('#name').getAttribute('aria-invalid'), 'true')
            await page.locator('#name').focus()
            await contrast('#name', 'outline-color', 'background-color', 3)
            await contrast('#name', 'border-top-color', 'background-color', 3)
            await audit('validation errors and focused input')
            await page
              .locator('#contact form')
              .screenshot({ path: `${screenshots}/${scenario}-form-errors.png` })
            await page.locator('#name').fill('Test Patient')
            await page.locator('#phone').fill('0791234567')
            await page.locator('#date').fill(date.toISOString().slice(0, 10))
            await page.locator('#service').selectOption('checkup')
            await submit.click()
            assert.equal(await submit.isDisabled(), true, `${scenario}: submission pending`)
            const status = page.locator('#contact [role="status"]')
            await status.waitFor()
            await audit('booking success')
            await status.screenshot({
              path: `${screenshots}/${scenario}-form-success.png`,
            })
          }
        }
      }
      assert.deepEqual(runtimeErrors, [])
      await context.close()
    } finally {
      await browser.close()
    }
  },
)
