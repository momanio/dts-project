import assert from 'node:assert/strict'
import { test } from 'node:test'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { build } from 'vite'
import { JSDOM } from 'jsdom'

test('renders both languages and exercises theme, FAQ, reviews and booking state', { timeout: 30000 }, async () => {
  process.env.NODE_ENV = 'test'
  const dom = new JSDOM('<!doctype html><html><head></head><body><div id="root"></div></body></html>', { url: 'https://luma.test', pretendToBeVisual: true })
  for (const key of ['window', 'document', 'localStorage', 'HTMLElement', 'Element', 'Node', 'SVGElement', 'HTMLInputElement', 'HTMLSelectElement', 'Event', 'CustomEvent', 'MutationObserver', 'getComputedStyle']) globalThis[key] = dom.window[key]
  globalThis.IS_REACT_ACT_ENVIRONMENT = true
  globalThis.requestAnimationFrame = dom.window.requestAnimationFrame.bind(dom.window)
  globalThis.cancelAnimationFrame = dom.window.cancelAnimationFrame.bind(dom.window)
  window.matchMedia = (query) => ({ matches: query.includes('reduced-motion'), media: query, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {} })
  globalThis.IntersectionObserver = class {
    constructor(callback) { this.callback = callback }
    observe(target) { queueMicrotask(() => this.callback([{ target, isIntersecting: true, intersectionRatio: 1 }])) }
    unobserve() {}
    disconnect() {}
  }
  Element.prototype.scrollIntoView = () => {}
  await build({ configFile: false, logLevel: 'silent', build: { ssr: 'tests/dom-entry.ts', outDir: 'test-results/dom', emptyOutDir: true } })
  const { App, i18n } = await import(pathToFileURL(resolve('test-results/dom/dom-entry.js')).href)
  const { createElement, act } = await import('react')
  const { createRoot } = await import('react-dom/client')
  const root = createRoot(document.getElementById('root'))
  const flush = async () => { await act(async () => { await new Promise((resolve) => setTimeout(resolve, 40)) }) }
  const click = async (element) => { assert.ok(element); await act(async () => element.click()); await flush() }
  try {
    await act(async () => root.render(createElement(App)))
    await flush()
    assert.equal(document.documentElement.dir, 'rtl')
    assert.equal(document.querySelectorAll('h1').length, 1)
    await click(document.querySelector('button[aria-label="Switch to English"]'))
    assert.equal(document.documentElement.dir, 'ltr')
    assert.equal(localStorage.getItem('luma-language'), 'en')
    assert.match(document.title, /Luma Dental/)
    await click(document.querySelector('button[aria-label="Switch to dark mode"]'))
    assert.equal(document.documentElement.classList.contains('dark'), true)
    assert.equal(localStorage.getItem('luma-theme'), 'dark')
    const question = document.querySelectorAll('#faq button')[1]
    await click(question)
    assert.equal(question.getAttribute('aria-expanded'), 'true')
    await click(question)
    assert.equal(question.getAttribute('aria-expanded'), 'false')
    await click(document.querySelector('button[aria-label="Next review"]'))
    assert.match(document.querySelector('#reviews').textContent, /Omar K\./)
    await click(document.querySelector('#services a'))
    assert.equal(document.getElementById('service').value, 'checkup')
    const form = document.querySelector('#contact form')
    assert.ok(form)
    await act(async () => form.dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true })))
    await flush()
    assert.equal(document.getElementById('name').getAttribute('aria-invalid'), 'true')
    assert.equal(document.getElementById('phone').getAttribute('aria-invalid'), 'true')
    assert.ok(document.querySelector('#name-error'))
    await act(async () => i18n.changeLanguage('ar'))
    assert.equal(document.documentElement.dir, 'rtl')
    assert.match(document.querySelector('#name-error').textContent, /أدخل/)
    for (const input of document.querySelectorAll('input:not([type="range"]), select, textarea')) assert.ok(document.querySelector(`label[for="${input.id}"]`))
  } finally { await act(async () => root.unmount()); dom.window.close() }
})
