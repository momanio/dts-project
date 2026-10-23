import assert from 'node:assert/strict'
import { test } from 'node:test'
import { readFile, mkdir } from 'node:fs/promises'
import { resolve, extname } from 'node:path'
import { createRequire } from 'node:module'
import { chromium } from 'playwright'

const require = createRequire(import.meta.url)
const root = resolve('dist')
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
  'desktop, RTL, mobile, booking, keyboard interactions and accessibility',
  { timeout: 120000 },
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
        if (url.hostname !== 'luma.test') return route.abort()
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
      assert.equal(await page.locator('html').getAttribute('dir'), 'rtl')
      assert.equal(await page.locator('h1').count(), 1)
      await page.getByRole('button', { name: 'Switch to English', exact: true }).click()
      assert.equal(await page.locator('html').getAttribute('lang'), 'en')
      assert.equal(await page.locator('html').getAttribute('dir'), 'ltr')
      assert.match(await page.title(), /Luma Dental/)
      await page.reload()
      await page.locator('#contact form').waitFor()
      assert.equal(await page.locator('html').getAttribute('lang'), 'en')
      await page.getByRole('button', { name: 'Switch to dark mode' }).click()
      assert.match(await page.locator('html').getAttribute('class'), /dark/)
      await page.reload()
      await page.locator('#contact form').waitFor()
      assert.match(await page.locator('html').getAttribute('class'), /dark/)
      await page.getByRole('button', { name: 'Switch to light mode' }).click()
      const question = page.getByRole('button', {
        name: 'I’m nervous about dental treatment. Can you help?',
      })
      await question.click()
      assert.equal(await question.getAttribute('aria-expanded'), 'true')
      await question.press('Enter')
      assert.equal(await question.getAttribute('aria-expanded'), 'false')
      const slider = page.getByRole('slider')
      await slider.focus()
      await slider.press('ArrowRight')
      assert.equal(await slider.inputValue(), '51')
      await page.getByRole('button', { name: 'Next review', exact: true }).click()
      await page.getByText('Omar K.', { exact: true }).waitFor()
      await page.getByRole('button', { name: 'Request Appointment', exact: true }).click()
      assert.equal(await page.locator('#name').getAttribute('aria-invalid'), 'true')
      assert.equal(await page.locator('#phone').getAttribute('aria-invalid'), 'true')
      await page.getByLabel('Full name', { exact: false }).fill('Test Patient')
      await page.getByLabel('Phone number', { exact: false }).fill('0791234567')
      const date = new Date()
      do {
        date.setDate(date.getDate() + 1)
      } while (date.getDay() !== 0)
      await page
        .getByLabel('Preferred date', { exact: false })
        .fill(date.toISOString().slice(0, 10))
      await page.getByLabel('How can we help?', { exact: false }).selectOption('checkup')
      await page.getByRole('button', { name: 'Request Appointment', exact: true }).click()
      await page.getByText('Your demo request is complete.', { exact: true }).waitFor()
      assert.equal(
        await page
          .locator('#contact [role="status"]')
          .evaluate((element) => element === document.activeElement),
        true,
      )
      await page.getByRole('button', { name: 'Send another request' }).click()
      await page.locator('#services a').first().click()
      assert.equal(await page.locator('#service').inputValue(), 'checkup')
      await page.addScriptTag({ path: require.resolve('axe-core/axe.min.js') })
      const axe = await page.evaluate(async () =>
        window.axe.run(document, {
          runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] },
        }),
      )
      assert.deepEqual(
        axe.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })),
        [],
      )
      await mkdir('test-results', { recursive: true })
      await page.evaluate(() => window.scrollTo(0, 0))
      await page.screenshot({ path: 'test-results/desktop-en.png' })
      await page.setViewportSize({ width: 360, height: 800 })
      const overflow = () => page.evaluate(() => document.documentElement.scrollWidth > innerWidth)
      assert.equal(await overflow(), false, 'English mobile overflow')
      await page.getByRole('button', { name: 'Open menu', exact: true }).click()
      assert.equal(await page.locator('dialog').evaluate((el) => el.open), true)
      await page.keyboard.press('Escape')
      assert.equal(await page.locator('dialog').evaluate((el) => el.open), false)
      assert.equal(
        await page
          .getByRole('button', { name: 'Open menu', exact: true })
          .evaluate((el) => el === document.activeElement),
        true,
      )
      await page.getByRole('button', { name: 'Switch to Arabic', exact: true }).click()
      assert.equal(await overflow(), false, 'Arabic mobile overflow')
      await page.screenshot({ path: 'test-results/mobile-ar.png' })
      const arabicAxe = await page.evaluate(async () =>
        window.axe.run(document, {
          runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] },
        }),
      )
      assert.deepEqual(
        arabicAxe.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })),
        [],
      )
      assert.deepEqual(runtimeErrors, [])
      await context.close()
    } finally {
      await browser.close()
    }
  },
)
