import {
  CalendarDays,
  Globe as Facebook,
  Heart,
  Camera as Instagram,
  MessageCircle,
  Phone,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { clinic, phoneHref, whatsappHref } from "../config/clinic";
import { Container, Logo } from "./ui";

export function Footer() {
  const { t } = useTranslation();
  return (
    <>
      <footer className="on-deep bg-deep pb-28 pt-16 text-deep-ink md:pb-7">
        <Container>
          <div className="grid gap-10 border-b border-deep-ink/15 pb-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_0.8fr_1fr_0.8fr]">
            <div>
              <Logo inverse />
              <p className="mt-5 max-w-xs text-xs leading-7 text-deep-muted">
                {t("footer.description")}
              </p>
            </div>
            <div>
              <h2 className="mb-5 text-sm font-semibold">
                {t("footer.links")}
              </h2>
              <nav
                aria-label={t("footer.links")}
                className="grid grid-cols-2 gap-x-5 gap-y-3 text-xs text-deep-muted"
              >
                {[
                  "home",
                  "about",
                  "services",
                  "results",
                  "reviews",
                  "faq",
                  "contact",
                ].map((key) => (
                  <a
                    key={key}
                    href={`#${key}`}
                    className="py-1 hover:text-deep-ink"
                  >
                    {t(`nav.${key}`)}
                  </a>
                ))}
              </nav>
            </div>
            <div>
              <h2 className="mb-5 text-sm font-semibold">
                {t("contact.hours")}
              </h2>
              <div className="space-y-3 text-xs text-deep-muted">
                <p>
                  {t("contact.weekdays")}
                  <br />
                  <span dir="ltr" className="mt-1 inline-block">
                    {clinic.hours.weekdays.opens} –{" "}
                    {clinic.hours.weekdays.closes}
                  </span>
                </p>
                <p>
                  {t("contact.saturday")}
                  <br />
                  <span dir="ltr" className="mt-1 inline-block">
                    {clinic.hours.saturday
                      ? `${clinic.hours.saturday.opens} – ${clinic.hours.saturday.closes}`
                      : t("contact.closed")}
                  </span>
                </p>
                <p>
                  {t("contact.friday")} · {t("contact.closed")}
                </p>
              </div>
            </div>
            <div>
              <h2 className="mb-5 text-sm font-semibold">
                {t("footer.connect")}
              </h2>
              <a href={phoneHref} className="block py-1 text-xs text-deep-muted">
                <bdi>{clinic.phone}</bdi>
              </a>
              <a
                href={`mailto:${clinic.email}`}
                className="mt-2 block text-xs text-deep-muted"
              >
                {clinic.email}
              </a>
              <div className="mt-5 flex gap-2">
                <a
                  href={clinic.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t("common.instagram")}
                  className="flex size-10 items-center justify-center rounded-full border border-deep-muted hover:bg-deep-ink/10"
                >
                  <Instagram className="size-4" aria-hidden="true" />
                </a>
                <a
                  href={clinic.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t("common.facebook")}
                  className="flex size-10 items-center justify-center rounded-full border border-deep-muted hover:bg-deep-ink/10"
                >
                  <Facebook className="size-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-3 py-6 text-[10px] text-deep-muted sm:flex-row">
            <p>
              {t("footer.copyright", {
                year: new Date().getFullYear(),
                name: t("clinic.name"),
              })}
            </p>
            <p className="flex items-center gap-2">
              {t("footer.crafted")}
              <Heart className="size-3" aria-hidden="true" />
            </p>
          </div>
        </Container>
      </footer>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("common.whatsapp")}
        className="fixed end-5 bottom-24 z-30 flex size-13 items-center justify-center rounded-full border border-white/30 bg-whatsapp text-white shadow-xl shadow-deep/15 transition-[transform,background-color] hover:scale-105 hover:bg-whatsapp-hover focus-visible:outline-deep focus-visible:ring-8 focus-visible:ring-deep-ink md:end-7 md:bottom-7"
      >
        <MessageCircle
          className="size-6"
          strokeWidth={1.6}
          aria-hidden="true"
        />
      </a>
      <div className="fixed inset-x-0 bottom-0 z-30 flex gap-3 border-t border-line bg-canvas/95 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-lg md:hidden">
        <a
          href={phoneHref}
          className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full border border-control-line text-xs font-semibold transition-colors hover:bg-soft"
        >
          <Phone className="size-4" aria-hidden="true" />
          {t("common.call")}
        </a>
        <a
          href="#contact"
          className="flex min-h-11 flex-[1.3] items-center justify-center gap-2 rounded-full bg-primary text-xs font-semibold text-primary-ink transition-colors hover:bg-primary-hover"
        >
          <CalendarDays className="size-4" aria-hidden="true" />
          {t("common.book")}
        </a>
      </div>
    </>
  );
}
