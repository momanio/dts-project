import { useEffect, useRef, useState } from 'react'
import { Menu, Moon, Sun, X, ArrowUpRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../hooks/useTheme'
import { cn } from '../lib/utils'
import { BookLink, Container, Logo } from './ui'

const links = ['home', 'about', 'services', 'results', 'reviews', 'faq', 'contact'] as const
export function Navbar() {
  const { t, i18n } = useTranslation()
  const { theme, toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => {
    const media = window.matchMedia('(min-width: 1280px)')
    const closeOnDesktop = () => {
      if (media.matches) {
        dialogRef.current?.close()
        document.body.style.overflow = ''
      }
    }
    media.addEventListener('change', closeOnDesktop)
    return () => {
      media.removeEventListener('change', closeOnDesktop)
      document.body.style.overflow = ''
    }
  }, [])
  const closeMenu = () => {
    dialogRef.current?.close()
    document.body.style.overflow = ''
    triggerRef.current?.focus()
  }
  return (
    <>
      <a
        href="#main"
        className="fixed start-5 top-2 z-[100] -translate-y-24 rounded-lg bg-primary px-5 py-3 text-primary-ink focus:translate-y-0"
      >
        {t('common.skip')}
      </a>
      <header
        className={cn(
          'sticky top-0 z-40 border-b border-line/70 bg-canvas/90 backdrop-blur-xl transition-[box-shadow] duration-300',
          scrolled && 'shadow-sm shadow-deep/10',
        )}
      >
        <Container
          className={cn(
            'flex items-center justify-between gap-4 transition-[height] duration-300 max-[359px]:gap-2 max-[359px]:px-3 max-[359px]:[&>a]:gap-2 max-[359px]:[&>a>span:first-child]:size-9 max-[359px]:[&>a>span:last-child]:text-base',
            scrolled ? 'h-18' : 'h-22',
          )}
        >
          <Logo />
          <nav aria-label={t('common.menu')} className="hidden items-center gap-5 xl:flex">
            {links.map((link) => (
              <a
                key={link}
                href={`#${link}`}
                className="py-3 text-xs font-medium text-muted transition-colors hover:text-primary"
              >
                {t(`nav.${link}`)}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-0.5 sm:gap-1">
            <button
              type="button"
              onClick={() => void i18n.changeLanguage(i18n.language === 'ar' ? 'en' : 'ar')}
              aria-label={t('common.languageLabel')}
              className="min-h-11 min-w-11 rounded-full px-2 text-xs font-semibold hover:bg-soft"
            >
              {t('common.language')}
            </button>
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={t(theme === 'dark' ? 'common.light' : 'common.dark')}
              className="flex size-11 items-center justify-center rounded-full hover:bg-soft"
            >
              {theme === 'dark' ? (
                <Sun className="size-4" aria-hidden="true" />
              ) : (
                <Moon className="size-4" aria-hidden="true" />
              )}
            </button>
            <BookLink className="ms-3 hidden px-5 text-xs sm:inline-flex" />
            <button
              ref={triggerRef}
              type="button"
              className="ms-1 flex size-11 items-center justify-center rounded-full hover:bg-soft xl:hidden"
              aria-label={t('common.menu')}
              aria-haspopup="dialog"
              onClick={() => {
                dialogRef.current?.showModal()
                document.body.style.overflow = 'hidden'
              }}
            >
              <Menu className="size-5" aria-hidden="true" />
            </button>
          </div>
        </Container>
      </header>
      <dialog
        ref={dialogRef}
        aria-label={t('common.menu')}
        onCancel={closeMenu}
        onClose={() => {
          document.body.style.overflow = ''
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeMenu()
        }}
        className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none border-0 bg-deep/40 p-0 text-ink backdrop:backdrop-blur-sm"
      >
        <div className="ms-auto flex h-full w-[min(88vw,400px)] flex-col overflow-y-auto bg-canvas p-7 shadow-2xl shadow-deep/20 motion-safe:animate-[slide-in_0.25s_ease-out]">
          <div className="mb-10 flex items-center justify-between gap-3">
            <Logo />
            <button
              type="button"
              aria-label={t('common.close')}
              className="flex size-11 shrink-0 items-center justify-center rounded-full bg-soft"
              onClick={closeMenu}
            >
              <X aria-hidden="true" className="size-5" />
            </button>
          </div>
          <nav aria-label={t('common.menu')} className="flex flex-col">
            {links.map((link, index) => (
              <a
                onClick={closeMenu}
                key={link}
                href={`#${link}`}
                className="flex items-center justify-between border-b border-line py-4 text-lg"
              >
                <span>
                  <span className="me-3 text-xs text-muted">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {t(`nav.${link}`)}
                </span>
                <ArrowUpRight className="size-4 rtl:-scale-x-100" aria-hidden="true" />
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            onClick={closeMenu}
            className="mt-8 rounded-full bg-primary px-5 py-4 text-center text-sm font-semibold text-primary-ink transition-colors hover:bg-primary-hover"
          >
            {t('common.book')}
          </a>
        </div>
      </dialog>
    </>
  )
}
