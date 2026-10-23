import { Suspense, lazy, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, animate, motion, useInView, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Award, Baby, BadgeCheck, CalendarCheck, CalendarDays, Camera, Check, Cross, Globe, Heart, HeartHandshake, Layers3, Leaf, MapPin, Menu, MessageCircle, Microscope, Moon, Phone, Plus, Quote, ScanLine, ShieldCheck, Smile, Sparkles, Star, Stethoscope, Sun, X } from "lucide-react";
import { initReactI18next, useTranslation } from "react-i18next";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Fragment, jsxDEV } from "react/jsx-dev-runtime";
import i18n from "i18next";
// src/lib/utils.ts
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function readPreference(key) {
	try {
		return localStorage.getItem(key);
	} catch {
		return null;
	}
}
function writePreference(key, value) {
	try {
		localStorage.setItem(key, value);
	} catch {}
}
// src/hooks/useTheme.ts
function useTheme() {
	const [theme, setTheme] = useState(() => {
		const saved = readPreference("luma-theme");
		return saved === "dark" || saved === "light" ? saved : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
	});
	useEffect(() => {
		document.documentElement.classList.toggle("dark", theme === "dark");
	}, [theme]);
	useEffect(() => {
		const media = window.matchMedia("(prefers-color-scheme: dark)");
		const sync = (event) => {
			if (!readPreference("luma-theme")) setTheme(event.matches ? "dark" : "light");
		};
		media.addEventListener("change", sync);
		return () => media.removeEventListener("change", sync);
	}, []);
	const toggleTheme = () => {
		const next = theme === "light" ? "dark" : "light";
		writePreference("luma-theme", next);
		setTheme(next);
	};
	return {
		theme,
		toggleTheme
	};
}
// src/components/ui.tsx
var _jsxFileName$12 = "/home/omar/Projects/dts-project/src/components/ui.tsx";
function Container({ className, ...props }) {
	return /* @__PURE__ */ jsxDEV("div", {
		className: cn("mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12", className),
		...props
	}, void 0, false, {
		fileName: _jsxFileName$12,
		lineNumber: 9,
		columnNumber: 5
	}, this);
}
function buttonStyle({ variant = "primary", className }) {
	return cn("inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-6 py-3 text-sm font-semibold transition-[background-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-60", variant === "primary" && "bg-primary text-primary-ink shadow-sm hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/10", variant === "secondary" && "border border-line bg-transparent text-ink hover:bg-soft", variant === "light" && "bg-[#f3f5eb] text-deep hover:bg-white", className);
}
function Button({ variant, className, ...props }) {
	return /* @__PURE__ */ jsxDEV("button", {
		className: buttonStyle({
			variant,
			className
		}),
		...props
	}, void 0, false, {
		fileName: _jsxFileName$12,
		lineNumber: 28,
		columnNumber: 10
	}, this);
}
function ButtonLink({ variant, className, ...props }) {
	return /* @__PURE__ */ jsxDEV("a", {
		className: buttonStyle({
			variant,
			className
		}),
		...props
	}, void 0, false, {
		fileName: _jsxFileName$12,
		lineNumber: 35,
		columnNumber: 10
	}, this);
}
function DirectionArrow({ className }) {
	return /* @__PURE__ */ jsxDEV(ArrowUpRight, {
		className: cn("size-4 shrink-0 rtl:-scale-x-100", className),
		"aria-hidden": "true"
	}, void 0, false, {
		fileName: _jsxFileName$12,
		lineNumber: 39,
		columnNumber: 5
	}, this);
}
function BookLink({ variant, className }) {
	const { t } = useTranslation();
	return /* @__PURE__ */ jsxDEV(ButtonLink, {
		href: "#contact",
		variant,
		className,
		children: [t("common.book"), /* @__PURE__ */ jsxDEV(DirectionArrow, {}, void 0, false, {
			fileName: _jsxFileName$12,
			lineNumber: 50,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$12,
		lineNumber: 48,
		columnNumber: 5
	}, this);
}
function Card({ className, ...props }) {
	return /* @__PURE__ */ jsxDEV("div", {
		className: cn("rounded-3xl border border-line bg-surface/80", className),
		...props
	}, void 0, false, {
		fileName: _jsxFileName$12,
		lineNumber: 56,
		columnNumber: 5
	}, this);
}
function Reveal({ children, delay = 0, className }) {
	const reduced = useReducedMotion();
	return /* @__PURE__ */ jsxDEV(motion.div, {
		initial: reduced ? false : {
			opacity: 0,
			y: 22
		},
		whileInView: {
			opacity: 1,
			y: 0
		},
		viewport: {
			once: true,
			amount: .12
		},
		transition: {
			duration: .65,
			delay,
			ease: [
				.22,
				1,
				.36,
				1
			]
		},
		className,
		children
	}, void 0, false, {
		fileName: _jsxFileName$12,
		lineNumber: 70,
		columnNumber: 5
	}, this);
}
function Section({ id, className, children }) {
	return /* @__PURE__ */ jsxDEV("section", {
		id,
		"aria-labelledby": `${id}-title`,
		className: cn("py-20 sm:py-24 lg:py-28", className),
		children
	}, void 0, false, {
		fileName: _jsxFileName$12,
		lineNumber: 91,
		columnNumber: 5
	}, this);
}
function SectionHeading({ section, className, centered = false, description = false }) {
	const { t } = useTranslation();
	return /* @__PURE__ */ jsxDEV(Reveal, {
		className: cn("max-w-2xl", centered && "mx-auto text-center", className),
		children: [
			/* @__PURE__ */ jsxDEV("p", {
				className: "eyebrow mb-5",
				children: t(`${section}.eyebrow`)
			}, void 0, false, {
				fileName: _jsxFileName$12,
				lineNumber: 114,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ jsxDEV("h2", {
				id: `${section}-title`,
				className: "section-title",
				children: [
					t(`${section}.title`),
					/* @__PURE__ */ jsxDEV("br", {}, void 0, false, {
						fileName: _jsxFileName$12,
						lineNumber: 117,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ jsxDEV("em", {
						className: "font-medium text-primary",
						children: t(`${section}.accent`)
					}, void 0, false, {
						fileName: _jsxFileName$12,
						lineNumber: 118,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$12,
				lineNumber: 115,
				columnNumber: 7
			}, this),
			description && /* @__PURE__ */ jsxDEV("p", {
				className: "mt-6 max-w-lg text-sm leading-7 text-muted sm:text-base",
				children: t(`${section}.description`)
			}, void 0, false, {
				fileName: _jsxFileName$12,
				lineNumber: 121,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$12,
		lineNumber: 113,
		columnNumber: 5
	}, this);
}
function Stars({ rating = 5, className }) {
	const { t } = useTranslation();
	return /* @__PURE__ */ jsxDEV("span", {
		role: "img",
		"aria-label": t("common.stars", { count: rating }),
		className: cn("inline-flex gap-1 text-[#9b742e] dark:text-accent", className),
		children: Array.from({ length: 5 }, (_, i) => /* @__PURE__ */ jsxDEV(Star, {
			className: "size-3.5 fill-current",
			"aria-hidden": "true"
		}, i, false, {
			fileName: _jsxFileName$12,
			lineNumber: 137,
			columnNumber: 9
		}, this))
	}, void 0, false, {
		fileName: _jsxFileName$12,
		lineNumber: 131,
		columnNumber: 5
	}, this);
}
function ToothMark({ className }) {
	return /* @__PURE__ */ jsxDEV("svg", {
		viewBox: "0 0 48 48",
		fill: "none",
		className,
		"aria-hidden": "true",
		children: [/* @__PURE__ */ jsxDEV("path", {
			d: "M24 10c-6-5-16-3-16 6 0 6 3 10 5 16 1 4 2 7 5 7 4 0 2-13 6-13s2 13 6 13c3 0 4-3 5-7 2-6 5-10 5-16 0-9-10-11-16-6Z",
			stroke: "currentColor",
			strokeWidth: "2",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		}, void 0, false, {
			fileName: _jsxFileName$12,
			lineNumber: 145,
			columnNumber: 7
		}, this), /* @__PURE__ */ jsxDEV("path", {
			d: "M17 14c3-1 6 2 10 1",
			stroke: "currentColor",
			strokeWidth: "2",
			strokeLinecap: "round"
		}, void 0, false, {
			fileName: _jsxFileName$12,
			lineNumber: 152,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$12,
		lineNumber: 144,
		columnNumber: 5
	}, this);
}
function Logo({ inverse = false }) {
	const { t } = useTranslation();
	return /* @__PURE__ */ jsxDEV("a", {
		href: "#home",
		"aria-label": `${t("clinic.name")} — ${t("nav.home")}`,
		className: cn("inline-flex shrink-0 items-center gap-2.5", inverse ? "text-[#edf3ec]" : "text-ink"),
		children: [/* @__PURE__ */ jsxDEV("span", {
			className: cn("flex size-11 items-center justify-center rounded-full border", inverse ? "border-white/30" : "border-primary/40"),
			children: /* @__PURE__ */ jsxDEV(ToothMark, { className: "size-8" }, void 0, false, {
				fileName: _jsxFileName$12,
				lineNumber: 173,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName$12,
			lineNumber: 167,
			columnNumber: 7
		}, this), /* @__PURE__ */ jsxDEV("span", {
			className: "text-lg font-semibold tracking-tight sm:text-xl",
			children: t("clinic.name")
		}, void 0, false, {
			fileName: _jsxFileName$12,
			lineNumber: 175,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$12,
		lineNumber: 159,
		columnNumber: 5
	}, this);
}
// src/components/Navbar.tsx
var _jsxFileName$11 = "/home/omar/Projects/dts-project/src/components/Navbar.tsx";
var links = [
	"home",
	"about",
	"services",
	"results",
	"reviews",
	"faq",
	"contact"
];
function Navbar() {
	const { t, i18n } = useTranslation();
	const { theme, toggleTheme } = useTheme();
	const [scrolled, setScrolled] = useState(false);
	const dialogRef = useRef(null);
	const triggerRef = useRef(null);
	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 24);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	useEffect(() => {
		const media = window.matchMedia("(min-width: 1280px)");
		const closeOnDesktop = () => {
			if (media.matches) {
				dialogRef.current?.close();
				document.body.style.overflow = "";
			}
		};
		media.addEventListener("change", closeOnDesktop);
		return () => {
			media.removeEventListener("change", closeOnDesktop);
			document.body.style.overflow = "";
		};
	}, []);
	const closeMenu = () => {
		dialogRef.current?.close();
		document.body.style.overflow = "";
		triggerRef.current?.focus();
	};
	return /* @__PURE__ */ jsxDEV(Fragment, { children: [
		/* @__PURE__ */ jsxDEV("a", {
			href: "#main",
			className: "fixed start-5 top-2 z-[100] -translate-y-24 rounded-lg bg-primary px-5 py-3 text-primary-ink focus:translate-y-0",
			children: t("common.skip")
		}, void 0, false, {
			fileName: _jsxFileName$11,
			lineNumber: 42,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ jsxDEV("header", {
			className: cn("sticky top-0 z-40 border-b border-line/70 bg-canvas/90 backdrop-blur-xl transition-[box-shadow] duration-300", scrolled && "shadow-sm"),
			children: /* @__PURE__ */ jsxDEV(Container, {
				className: cn("flex items-center justify-between gap-4 transition-[height] duration-300", scrolled ? "h-18" : "h-22"),
				children: [
					/* @__PURE__ */ jsxDEV(Logo, {}, void 0, false, {
						fileName: _jsxFileName$11,
						lineNumber: 60,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ jsxDEV("nav", {
						"aria-label": t("common.menu"),
						className: "hidden items-center gap-5 xl:flex",
						children: links.map((link) => /* @__PURE__ */ jsxDEV("a", {
							href: `#${link}`,
							className: "py-3 text-xs font-medium text-muted transition-colors hover:text-primary",
							children: t(`nav.${link}`)
						}, link, false, {
							fileName: _jsxFileName$11,
							lineNumber: 63,
							columnNumber: 15
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName$11,
						lineNumber: 61,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ jsxDEV("div", {
						className: "flex items-center gap-0.5 sm:gap-1",
						children: [
							/* @__PURE__ */ jsxDEV("button", {
								type: "button",
								onClick: () => void i18n.changeLanguage(i18n.language === "ar" ? "en" : "ar"),
								"aria-label": t("common.languageLabel"),
								className: "min-h-11 min-w-11 rounded-full px-2 text-xs font-semibold hover:bg-soft",
								children: t("common.language")
							}, void 0, false, {
								fileName: _jsxFileName$11,
								lineNumber: 73,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ jsxDEV("button", {
								type: "button",
								onClick: toggleTheme,
								"aria-label": t(theme === "dark" ? "common.light" : "common.dark"),
								className: "flex size-11 items-center justify-center rounded-full hover:bg-soft",
								children: theme === "dark" ? /* @__PURE__ */ jsxDEV(Sun, {
									className: "size-4",
									"aria-hidden": "true"
								}, void 0, false, {
									fileName: _jsxFileName$11,
									lineNumber: 88,
									columnNumber: 17
								}, this) : /* @__PURE__ */ jsxDEV(Moon, {
									className: "size-4",
									"aria-hidden": "true"
								}, void 0, false, {
									fileName: _jsxFileName$11,
									lineNumber: 90,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$11,
								lineNumber: 81,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ jsxDEV(BookLink, { className: "ms-3 hidden px-5 text-xs sm:inline-flex" }, void 0, false, {
								fileName: _jsxFileName$11,
								lineNumber: 93,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ jsxDEV("button", {
								ref: triggerRef,
								type: "button",
								className: "ms-1 flex size-11 items-center justify-center rounded-full hover:bg-soft xl:hidden",
								"aria-label": t("common.menu"),
								"aria-haspopup": "dialog",
								onClick: () => {
									dialogRef.current?.showModal();
									document.body.style.overflow = "hidden";
								},
								children: /* @__PURE__ */ jsxDEV(Menu, {
									className: "size-5",
									"aria-hidden": "true"
								}, void 0, false, {
									fileName: _jsxFileName$11,
									lineNumber: 105,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$11,
								lineNumber: 94,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$11,
						lineNumber: 72,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$11,
				lineNumber: 54,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName$11,
			lineNumber: 48,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ jsxDEV("dialog", {
			ref: dialogRef,
			"aria-label": t("common.menu"),
			onCancel: closeMenu,
			onClose: () => {
				document.body.style.overflow = "";
			},
			onClick: (e) => {
				if (e.target === e.currentTarget) closeMenu();
			},
			className: "fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none border-0 bg-black/30 p-0 text-ink backdrop:backdrop-blur-sm",
			children: /* @__PURE__ */ jsxDEV("div", {
				className: "ms-auto flex h-full w-[min(88vw,400px)] flex-col overflow-y-auto bg-canvas p-7 shadow-2xl motion-safe:animate-[slide-in_0.25s_ease-out]",
				children: [
					/* @__PURE__ */ jsxDEV("div", {
						className: "mb-10 flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ jsxDEV(Logo, {}, void 0, false, {
							fileName: _jsxFileName$11,
							lineNumber: 124,
							columnNumber: 13
						}, this), /* @__PURE__ */ jsxDEV("button", {
							type: "button",
							"aria-label": t("common.close"),
							className: "flex size-11 shrink-0 items-center justify-center rounded-full bg-soft",
							onClick: closeMenu,
							children: /* @__PURE__ */ jsxDEV(X, {
								"aria-hidden": "true",
								className: "size-5"
							}, void 0, false, {
								fileName: _jsxFileName$11,
								lineNumber: 131,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$11,
							lineNumber: 125,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$11,
						lineNumber: 123,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ jsxDEV("nav", {
						"aria-label": t("common.menu"),
						className: "flex flex-col",
						children: links.map((link, index) => /* @__PURE__ */ jsxDEV("a", {
							onClick: closeMenu,
							href: `#${link}`,
							className: "flex items-center justify-between border-b border-line py-4 text-lg",
							children: [/* @__PURE__ */ jsxDEV("span", { children: [/* @__PURE__ */ jsxDEV("span", {
								className: "me-3 text-xs text-muted",
								children: String(index + 1).padStart(2, "0")
							}, void 0, false, {
								fileName: _jsxFileName$11,
								lineNumber: 143,
								columnNumber: 19
							}, this), t(`nav.${link}`)] }, void 0, true, {
								fileName: _jsxFileName$11,
								lineNumber: 142,
								columnNumber: 17
							}, this), /* @__PURE__ */ jsxDEV(ArrowUpRight, {
								className: "size-4 rtl:-scale-x-100",
								"aria-hidden": "true"
							}, void 0, false, {
								fileName: _jsxFileName$11,
								lineNumber: 148,
								columnNumber: 17
							}, this)]
						}, link, true, {
							fileName: _jsxFileName$11,
							lineNumber: 136,
							columnNumber: 15
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName$11,
						lineNumber: 134,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ jsxDEV("a", {
						href: "#contact",
						onClick: closeMenu,
						className: "mt-8 rounded-full bg-primary px-5 py-4 text-center text-sm font-semibold text-primary-ink",
						children: t("common.book")
					}, void 0, false, {
						fileName: _jsxFileName$11,
						lineNumber: 152,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$11,
				lineNumber: 122,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName$11,
			lineNumber: 110,
			columnNumber: 7
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName$11,
		lineNumber: 41,
		columnNumber: 5
	}, this);
}
// src/config/clinic.ts
var clinic = {
	name: {
		en: "Luma Dental",
		ar: "لوما لطب الأسنان"
	},
	tagline: {
		en: "A little care. A brighter smile.",
		ar: "عناية تستحقها. وابتسامة تحبّها."
	},
	phone: "+96265550140",
	whatsapp: "+962790000140",
	email: "hello@example.com",
	website: "https://example.com",
	address: {
		street: {
			en: "24 Zahran Street, 3rd floor",
			ar: "شارع زهران ٢٤، الطابق الثالث"
		},
		area: {
			en: "Abdoun, Amman",
			ar: "عبدون، عمّان"
		},
		city: {
			en: "Amman",
			ar: "عمّان"
		},
		country: "JO"
	},
	geo: {
		lat: 31.9496,
		lng: 35.8838
	},
	hours: {
		weekdays: {
			opens: "09:00",
			closes: "19:00"
		},
		saturday: {
			opens: "10:00",
			closes: "15:00"
		}
	},
	doctor: {
		name: {
			en: "Dr. Leen Haddad",
			ar: "د. لين حدّاد"
		},
		role: {
			en: "General & Cosmetic Dentist",
			ar: "طبيبة أسنان عامة وتجميلية"
		},
		bio: {
			en: "Good dentistry starts with listening. Dr. Leen brings a thoughtful, personal approach to every visit, taking the time to understand your needs and help you feel comfortable, informed, and in control of your care.",
			ar: "تبدأ العناية الجيدة بالاستماع. تمنحك الدكتورة لين الوقت والاهتمام لفهم احتياجاتك، وتشرح لك خياراتك بوضوح لتشعر بالراحة والثقة في كل خطوة من رحلتك العلاجية."
		},
		quote: {
			en: "The best part of my day? Seeing you smile with confidence again.",
			ar: "أجمل لحظة في يومي؟ أن أراك تبتسم بثقة من جديد."
		},
		qualifications: [
			{
				en: "DDS, University of Jordan",
				ar: "بكالوريوس طب الأسنان، الجامعة الأردنية"
			},
			{
				en: "Member, Jordan Dental Association",
				ar: "عضو نقابة أطباء الأسنان الأردنية"
			},
			{
				en: "Focus on restorative & aesthetic dentistry",
				ar: "اهتمام بطب الأسنان الترميمي والتجميلي"
			}
		]
	},
	stats: {
		experience: 12,
		patients: 2500,
		rating: 4.9,
		reviews: 180
	},
	services: [
		"checkup",
		"whitening",
		"implants",
		"orthodontics",
		"veneers",
		"rootCanal",
		"pediatric",
		"emergency"
	],
	packages: [
		{
			service: "checkup",
			price: 35
		},
		{
			service: "whitening",
			price: 150,
			featured: true
		},
		{
			service: "orthodontics",
			price: 50
		}
	],
	testimonials: [
		{
			name: {
				en: "Sarah A.",
				ar: "سارة أ."
			},
			service: "whitening",
			quote: {
				en: "From the warm welcome to the little details, everything felt so considered. Dr. Leen explained every step. For the first time, I actually look forward to my dental visits.",
				ar: "من الترحيب الجميل إلى أدق التفاصيل، شعرت أن كل شيء صُمّم لراحتي. شرحت لي الدكتورة لين كل خطوة. لأول مرة، أصبحت أتطلّع لزيارتي لطبيب الأسنان."
			},
			rating: 5
		},
		{
			name: {
				en: "Omar K.",
				ar: "عمر ك."
			},
			service: "checkup",
			quote: {
				en: "A calm space, a kind team, and no rush. I left knowing exactly what my teeth needed and what my options were. That peace of mind makes all the difference.",
				ar: "مكان هادئ وفريق لطيف، دون أي استعجال. خرجت وأنا أعرف تمامًا ما تحتاجه أسناني وما هي الخيارات المتاحة. راحة البال هذه تصنع كل الفرق."
			},
			rating: 5
		},
		{
			name: {
				en: "Rana M.",
				ar: "رنا م."
			},
			service: "pediatric",
			quote: {
				en: "My daughter was nervous about her first visit, but the team made her feel completely at ease. Patient, gentle, and so good with little ones.",
				ar: "كانت ابنتي متوترة قبل زيارتها الأولى، لكن الفريق جعلها تشعر بالاطمئنان. صبر ولطف وتعامل رائع مع الأطفال."
			},
			rating: 5
		}
	],
	socials: {
		instagram: "https://www.instagram.com/",
		facebook: "https://www.facebook.com/"
	},
	images: {
		hero: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=80&fm=webp",
		doctor: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80&fm=webp",
		clinic: "https://images.unsplash.com/photo-1629909615957-be38d48fbbe6?auto=format&fit=crop&w=900&q=80&fm=webp",
		before: "/images/smile-before.svg",
		after: "/images/smile-after.svg"
	},
	booking: {
		endpoint: "",
		maxDaysAhead: 90
	}
};
var phoneHref = `tel:${clinic.phone}`;
var whatsappHref = `https://wa.me/${clinic.whatsapp.replace(/\D/g, "")}`;
function localizedClinic(locale) {
	return {
		name: clinic.name[locale],
		tagline: clinic.tagline[locale],
		street: clinic.address.street[locale],
		area: clinic.address.area[locale],
		doctorName: clinic.doctor.name[locale],
		doctorRole: clinic.doctor.role[locale],
		doctorBio: clinic.doctor.bio[locale],
		doctorQuote: clinic.doctor.quote[locale],
		qualifications: clinic.doctor.qualifications.map((item) => item[locale]),
		testimonials: clinic.testimonials.map((item) => ({
			name: item.name[locale],
			quote: item.quote[locale]
		}))
	};
}
// src/components/Footer.tsx
var _jsxFileName$10 = "/home/omar/Projects/dts-project/src/components/Footer.tsx";
function Footer() {
	const { t } = useTranslation();
	return /* @__PURE__ */ jsxDEV(Fragment, { children: [
		/* @__PURE__ */ jsxDEV("footer", {
			className: "bg-deep pb-28 pt-16 text-[#eaf0e6] md:pb-7",
			children: /* @__PURE__ */ jsxDEV(Container, { children: [
				/* @__PURE__ */ jsxDEV("div", {
					className: "grid gap-10 border-b border-white/15 pb-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_0.8fr_1fr_0.8fr]",
					children: [
						/* @__PURE__ */ jsxDEV("div", { children: [/* @__PURE__ */ jsxDEV(Logo, { inverse: true }, void 0, false, {
							fileName: _jsxFileName$10,
							lineNumber: 21,
							columnNumber: 15
						}, this), /* @__PURE__ */ jsxDEV("p", {
							className: "mt-5 max-w-xs text-xs leading-7 text-[#c5d6c9]",
							children: t("footer.description")
						}, void 0, false, {
							fileName: _jsxFileName$10,
							lineNumber: 22,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$10,
							lineNumber: 20,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ jsxDEV("div", { children: [/* @__PURE__ */ jsxDEV("h2", {
							className: "mb-5 text-sm font-semibold",
							children: t("footer.links")
						}, void 0, false, {
							fileName: _jsxFileName$10,
							lineNumber: 27,
							columnNumber: 15
						}, this), /* @__PURE__ */ jsxDEV("nav", {
							"aria-label": t("footer.links"),
							className: "grid grid-cols-2 gap-x-5 gap-y-3 text-xs text-[#c5d6c9]",
							children: [
								"home",
								"about",
								"services",
								"results",
								"reviews",
								"faq",
								"contact"
							].map((key) => /* @__PURE__ */ jsxDEV("a", {
								href: `#${key}`,
								className: "py-1 hover:text-white",
								children: t(`nav.${key}`)
							}, key, false, {
								fileName: _jsxFileName$10,
								lineNumber: 34,
								columnNumber: 21
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName$10,
							lineNumber: 28,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$10,
							lineNumber: 26,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ jsxDEV("div", { children: [/* @__PURE__ */ jsxDEV("h2", {
							className: "mb-5 text-sm font-semibold",
							children: t("contact.hours")
						}, void 0, false, {
							fileName: _jsxFileName$10,
							lineNumber: 42,
							columnNumber: 15
						}, this), /* @__PURE__ */ jsxDEV("div", {
							className: "space-y-3 text-xs text-[#c5d6c9]",
							children: [
								/* @__PURE__ */ jsxDEV("p", { children: [
									t("contact.weekdays"),
									/* @__PURE__ */ jsxDEV("br", {}, void 0, false, {
										fileName: _jsxFileName$10,
										lineNumber: 46,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ jsxDEV("span", {
										dir: "ltr",
										className: "mt-1 inline-block",
										children: [
											clinic.hours.weekdays.opens,
											" – ",
											clinic.hours.weekdays.closes
										]
									}, void 0, true, {
										fileName: _jsxFileName$10,
										lineNumber: 47,
										columnNumber: 19
									}, this)
								] }, void 0, true, {
									fileName: _jsxFileName$10,
									lineNumber: 44,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ jsxDEV("p", { children: [
									t("contact.saturday"),
									/* @__PURE__ */ jsxDEV("br", {}, void 0, false, {
										fileName: _jsxFileName$10,
										lineNumber: 53,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ jsxDEV("span", {
										dir: "ltr",
										className: "mt-1 inline-block",
										children: clinic.hours.saturday ? `${clinic.hours.saturday.opens} – ${clinic.hours.saturday.closes}` : t("contact.closed")
									}, void 0, false, {
										fileName: _jsxFileName$10,
										lineNumber: 54,
										columnNumber: 19
									}, this)
								] }, void 0, true, {
									fileName: _jsxFileName$10,
									lineNumber: 51,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ jsxDEV("p", { children: [
									t("contact.friday"),
									" · ",
									t("contact.closed")
								] }, void 0, true, {
									fileName: _jsxFileName$10,
									lineNumber: 60,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$10,
							lineNumber: 43,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$10,
							lineNumber: 41,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ jsxDEV("div", { children: [
							/* @__PURE__ */ jsxDEV("h2", {
								className: "mb-5 text-sm font-semibold",
								children: t("footer.connect")
							}, void 0, false, {
								fileName: _jsxFileName$10,
								lineNumber: 66,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ jsxDEV("a", {
								href: phoneHref,
								className: "block py-1 text-xs text-[#c5d6c9]",
								children: /* @__PURE__ */ jsxDEV("bdi", { children: clinic.phone }, void 0, false, {
									fileName: _jsxFileName$10,
									lineNumber: 68,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$10,
								lineNumber: 67,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ jsxDEV("a", {
								href: `mailto:${clinic.email}`,
								className: "mt-2 block text-xs text-[#c5d6c9]",
								children: clinic.email
							}, void 0, false, {
								fileName: _jsxFileName$10,
								lineNumber: 70,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ jsxDEV("div", {
								className: "mt-5 flex gap-2",
								children: [/* @__PURE__ */ jsxDEV("a", {
									href: clinic.socials.instagram,
									target: "_blank",
									rel: "noopener noreferrer",
									"aria-label": t("common.instagram"),
									className: "flex size-10 items-center justify-center rounded-full border border-white/20 hover:bg-white/10",
									children: /* @__PURE__ */ jsxDEV(Camera, {
										className: "size-4",
										"aria-hidden": "true"
									}, void 0, false, {
										fileName: _jsxFileName$10,
										lineNumber: 81,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$10,
									lineNumber: 74,
									columnNumber: 17
								}, this), /* @__PURE__ */ jsxDEV("a", {
									href: clinic.socials.facebook,
									target: "_blank",
									rel: "noopener noreferrer",
									"aria-label": t("common.facebook"),
									className: "flex size-10 items-center justify-center rounded-full border border-white/20 hover:bg-white/10",
									children: /* @__PURE__ */ jsxDEV(Globe, {
										className: "size-4",
										"aria-hidden": "true"
									}, void 0, false, {
										fileName: _jsxFileName$10,
										lineNumber: 90,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$10,
									lineNumber: 83,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$10,
								lineNumber: 73,
								columnNumber: 15
							}, this)
						] }, void 0, true, {
							fileName: _jsxFileName$10,
							lineNumber: 65,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$10,
					lineNumber: 19,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ jsxDEV("div", {
					className: "flex flex-col justify-between gap-3 py-6 text-[10px] text-[#c5d6c9] sm:flex-row",
					children: [/* @__PURE__ */ jsxDEV("p", { children: t("footer.copyright", {
						year: (/* @__PURE__ */ new Date()).getFullYear(),
						name: t("clinic.name")
					}) }, void 0, false, {
						fileName: _jsxFileName$10,
						lineNumber: 96,
						columnNumber: 13
					}, this), /* @__PURE__ */ jsxDEV("p", {
						className: "flex items-center gap-2",
						children: [t("footer.crafted"), /* @__PURE__ */ jsxDEV(Heart, {
							className: "size-3",
							"aria-hidden": "true"
						}, void 0, false, {
							fileName: _jsxFileName$10,
							lineNumber: 101,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$10,
						lineNumber: 99,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$10,
					lineNumber: 95,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ jsxDEV("p", {
					className: "max-w-3xl text-[10px] leading-5 text-[#bdcfc2]",
					children: t("footer.demo")
				}, void 0, false, {
					fileName: _jsxFileName$10,
					lineNumber: 104,
					columnNumber: 11
				}, this)
			] }, void 0, true, {
				fileName: _jsxFileName$10,
				lineNumber: 18,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName$10,
			lineNumber: 17,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ jsxDEV("a", {
			href: whatsappHref,
			target: "_blank",
			rel: "noopener noreferrer",
			"aria-label": t("common.whatsapp"),
			className: "fixed end-5 bottom-24 z-30 flex size-13 items-center justify-center rounded-full border border-white/30 bg-[#2e7167] text-white shadow-xl transition-transform hover:scale-105 md:end-7 md:bottom-7",
			children: /* @__PURE__ */ jsxDEV(MessageCircle, {
				className: "size-6",
				strokeWidth: 1.6,
				"aria-hidden": "true"
			}, void 0, false, {
				fileName: _jsxFileName$10,
				lineNumber: 114,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName$10,
			lineNumber: 107,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ jsxDEV("div", {
			className: "fixed inset-x-0 bottom-0 z-30 flex gap-3 border-t border-line bg-canvas/95 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-lg md:hidden",
			children: [/* @__PURE__ */ jsxDEV("a", {
				href: phoneHref,
				className: "flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full border border-line text-xs font-semibold",
				children: [/* @__PURE__ */ jsxDEV(Phone, {
					className: "size-4",
					"aria-hidden": "true"
				}, void 0, false, {
					fileName: _jsxFileName$10,
					lineNumber: 121,
					columnNumber: 11
				}, this), t("common.call")]
			}, void 0, true, {
				fileName: _jsxFileName$10,
				lineNumber: 117,
				columnNumber: 9
			}, this), /* @__PURE__ */ jsxDEV("a", {
				href: "#contact",
				className: "flex min-h-11 flex-[1.3] items-center justify-center gap-2 rounded-full bg-primary text-xs font-semibold text-primary-ink",
				children: [/* @__PURE__ */ jsxDEV(CalendarDays, {
					className: "size-4",
					"aria-hidden": "true"
				}, void 0, false, {
					fileName: _jsxFileName$10,
					lineNumber: 128,
					columnNumber: 11
				}, this), t("common.book")]
			}, void 0, true, {
				fileName: _jsxFileName$10,
				lineNumber: 124,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$10,
			lineNumber: 116,
			columnNumber: 7
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName$10,
		lineNumber: 16,
		columnNumber: 5
	}, this);
}
// src/components/SEO.tsx
var _jsxFileName$9 = "/home/omar/Projects/dts-project/src/components/SEO.tsx";
function SEO() {
	const { t, i18n } = useTranslation();
	useEffect(() => {
		document.title = t("seo.title");
		const metadata = {
			description: t("seo.description"),
			"og:title": t("seo.title"),
			"og:description": t("seo.description"),
			"og:locale": i18n.language === "ar" ? "ar_JO" : "en_JO",
			"og:url": clinic.website,
			"og:image": `${clinic.website}/social-card.png`,
			"twitter:title": t("seo.title"),
			"twitter:description": t("seo.description"),
			"twitter:image": `${clinic.website}/social-card.png`
		};
		Object.entries(metadata).forEach(([name, content]) => {
			const attribute = name.startsWith("og:") ? "property" : "name";
			let tag = document.head.querySelector(`meta[${attribute}="${name}"]`);
			if (!tag) {
				tag = document.createElement("meta");
				tag.setAttribute(attribute, name);
				document.head.appendChild(tag);
			}
			tag.content = content;
		});
	}, [t, i18n.language]);
	const data = {
		"@context": "https://schema.org",
		"@type": ["Dentist", "LocalBusiness"],
		name: t("clinic.name"),
		description: t("seo.description"),
		url: clinic.website,
		telephone: clinic.phone,
		image: `${clinic.website}/social-card.png`,
		address: {
			"@type": "PostalAddress",
			streetAddress: t("clinic.street"),
			addressLocality: clinic.address.city[i18n.language === "en" ? "en" : "ar"],
			addressCountry: clinic.address.country
		},
		geo: {
			"@type": "GeoCoordinates",
			latitude: clinic.geo.lat,
			longitude: clinic.geo.lng
		},
		openingHoursSpecification: [{
			"@type": "OpeningHoursSpecification",
			dayOfWeek: [
				"Sunday",
				"Monday",
				"Tuesday",
				"Wednesday",
				"Thursday"
			],
			opens: clinic.hours.weekdays.opens,
			closes: clinic.hours.weekdays.closes
		}, ...clinic.hours.saturday ? [{
			"@type": "OpeningHoursSpecification",
			dayOfWeek: ["Saturday"],
			...clinic.hours.saturday
		}] : []],
		currenciesAccepted: "JOD"
	};
	return /* @__PURE__ */ jsxDEV("script", {
		type: "application/ld+json",
		dangerouslySetInnerHTML: { __html: JSON.stringify(data).replace(/</g, "\\u003c") }
	}, void 0, false, {
		fileName: _jsxFileName$9,
		lineNumber: 66,
		columnNumber: 5
	}, this);
}
// src/components/ClinicImage.tsx
var _jsxFileName$8 = "/home/omar/Projects/dts-project/src/components/ClinicImage.tsx";
function ClinicImage({ fallback, ...props }) {
	return /* @__PURE__ */ jsxDEV("img", {
		...props,
		onError: (event) => {
			const img = event.currentTarget;
			if (!img.src.endsWith(fallback)) img.src = fallback;
		}
	}, void 0, false, {
		fileName: _jsxFileName$8,
		lineNumber: 8,
		columnNumber: 5
	}, this);
}
// src/sections/Hero.tsx
var _jsxFileName$7 = "/home/omar/Projects/dts-project/src/sections/Hero.tsx";
function Hero() {
	const { t, i18n } = useTranslation();
	const reduced = useReducedMotion();
	const number = new Intl.NumberFormat(i18n.language);
	return /* @__PURE__ */ jsxDEV("section", {
		id: "home",
		"aria-labelledby": "hero-title",
		className: "relative overflow-hidden pb-14 pt-12 sm:pb-20 sm:pt-16 lg:pt-20",
		children: [/* @__PURE__ */ jsxDEV(motion.div, {
			"aria-hidden": "true",
			className: "pointer-events-none absolute -start-40 top-12 size-[600px] rounded-full bg-[#dae8d7]/35 blur-[100px] dark:bg-primary/5",
			animate: reduced ? void 0 : {
				x: [
					0,
					30,
					0
				],
				y: [
					0,
					25,
					0
				]
			},
			transition: {
				duration: 14,
				repeat: Infinity,
				ease: "easeInOut"
			}
		}, void 0, false, {
			fileName: _jsxFileName$7,
			lineNumber: 18,
			columnNumber: 7
		}, this), /* @__PURE__ */ jsxDEV(Container, {
			className: "relative grid items-center gap-12 lg:grid-cols-[1.04fr_1fr] lg:gap-16",
			children: [/* @__PURE__ */ jsxDEV(Reveal, {
				className: "py-2 lg:py-8",
				children: [
					/* @__PURE__ */ jsxDEV("div", {
						className: "mb-7 inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/60 px-3.5 py-2",
						children: [/* @__PURE__ */ jsxDEV("span", { className: "size-1.5 rounded-full bg-primary" }, void 0, false, {
							fileName: _jsxFileName$7,
							lineNumber: 27,
							columnNumber: 13
						}, this), /* @__PURE__ */ jsxDEV("p", {
							className: "eyebrow text-[9px] sm:text-[10px]",
							children: t("hero.eyebrow")
						}, void 0, false, {
							fileName: _jsxFileName$7,
							lineNumber: 28,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$7,
						lineNumber: 26,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ jsxDEV("h1", {
						id: "hero-title",
						className: "font-display text-[clamp(3.6rem,6.8vw,6.4rem)] leading-[1.04] font-medium tracking-[-0.045em]",
						children: [
							t("hero.title"),
							/* @__PURE__ */ jsxDEV("br", {}, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 35,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ jsxDEV("em", {
								className: "font-medium text-primary",
								children: t("hero.accent")
							}, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 36,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ jsxDEV("span", {
								className: "ms-2 inline-block align-top text-accent",
								children: /* @__PURE__ */ jsxDEV(Sparkles, {
									className: "size-7 sm:size-10",
									strokeWidth: 1,
									"aria-hidden": "true"
								}, void 0, false, {
									fileName: _jsxFileName$7,
									lineNumber: 38,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 37,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$7,
						lineNumber: 30,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ jsxDEV("p", {
						className: "mt-7 max-w-[26rem] text-base leading-8 text-muted",
						children: t("hero.description")
					}, void 0, false, {
						fileName: _jsxFileName$7,
						lineNumber: 41,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ jsxDEV("div", {
						className: "mt-9 flex flex-wrap gap-3",
						children: [/* @__PURE__ */ jsxDEV(BookLink, {}, void 0, false, {
							fileName: _jsxFileName$7,
							lineNumber: 45,
							columnNumber: 13
						}, this), /* @__PURE__ */ jsxDEV(ButtonLink, {
							href: whatsappHref,
							target: "_blank",
							rel: "noopener noreferrer",
							variant: "secondary",
							children: [/* @__PURE__ */ jsxDEV(MessageCircle, {
								className: "size-4",
								"aria-hidden": "true"
							}, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 52,
								columnNumber: 15
							}, this), t("common.whatsapp")]
						}, void 0, true, {
							fileName: _jsxFileName$7,
							lineNumber: 46,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$7,
						lineNumber: 44,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ jsxDEV("div", {
						className: "mt-11 grid max-w-md grid-cols-3 border-t border-line pt-7",
						children: [
							/* @__PURE__ */ jsxDEV("div", {
								className: "border-e border-line pe-3",
								children: [/* @__PURE__ */ jsxDEV("strong", {
									className: "font-display text-3xl font-semibold",
									children: [number.format(clinic.stats.experience), /* @__PURE__ */ jsxDEV("span", {
										className: "text-primary",
										children: "+"
									}, void 0, false, {
										fileName: _jsxFileName$7,
										lineNumber: 60,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$7,
									lineNumber: 58,
									columnNumber: 15
								}, this), /* @__PURE__ */ jsxDEV("p", {
									className: "mt-1 text-[11px] text-muted sm:text-xs",
									children: t("hero.experience")
								}, void 0, false, {
									fileName: _jsxFileName$7,
									lineNumber: 62,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$7,
								lineNumber: 57,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ jsxDEV("div", {
								className: "border-e border-line px-4 sm:px-6",
								children: [/* @__PURE__ */ jsxDEV("strong", {
									className: "font-display text-3xl font-semibold",
									children: [number.format(clinic.stats.patients), /* @__PURE__ */ jsxDEV("span", {
										className: "text-primary",
										children: "+"
									}, void 0, false, {
										fileName: _jsxFileName$7,
										lineNumber: 67,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$7,
									lineNumber: 65,
									columnNumber: 15
								}, this), /* @__PURE__ */ jsxDEV("p", {
									className: "mt-1 text-[11px] text-muted sm:text-xs",
									children: t("hero.patients")
								}, void 0, false, {
									fileName: _jsxFileName$7,
									lineNumber: 69,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$7,
								lineNumber: 64,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ jsxDEV("div", {
								className: "ps-4 sm:ps-6",
								children: [/* @__PURE__ */ jsxDEV("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ jsxDEV("strong", {
										className: "font-display text-3xl font-semibold",
										children: number.format(clinic.stats.rating)
									}, void 0, false, {
										fileName: _jsxFileName$7,
										lineNumber: 73,
										columnNumber: 17
									}, this), /* @__PURE__ */ jsxDEV(Stars, {
										className: "hidden gap-0.5 sm:inline-flex [&_svg]:size-2.5",
										rating: clinic.stats.rating
									}, void 0, false, {
										fileName: _jsxFileName$7,
										lineNumber: 76,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$7,
									lineNumber: 72,
									columnNumber: 15
								}, this), /* @__PURE__ */ jsxDEV("p", {
									className: "mt-1 text-[11px] text-muted sm:text-xs",
									children: t("hero.rating")
								}, void 0, false, {
									fileName: _jsxFileName$7,
									lineNumber: 81,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$7,
								lineNumber: 71,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$7,
						lineNumber: 56,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$7,
				lineNumber: 25,
				columnNumber: 9
			}, this), /* @__PURE__ */ jsxDEV(Reveal, {
				delay: .15,
				className: "relative mx-auto w-full max-w-xl px-3 pb-10 lg:px-0",
				children: [
					/* @__PURE__ */ jsxDEV("div", {
						className: "absolute -end-4 top-8 h-[90%] w-[90%] rounded-t-[12rem] rounded-b-[2rem] border border-primary/20 sm:-end-5",
						"aria-hidden": "true"
					}, void 0, false, {
						fileName: _jsxFileName$7,
						lineNumber: 86,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ jsxDEV("div", {
						className: "relative h-[420px] overflow-hidden rounded-t-[11rem] rounded-b-3xl bg-soft sm:h-[500px] lg:h-[570px]",
						children: [
							/* @__PURE__ */ jsxDEV(ClinicImage, {
								src: clinic.images.hero,
								fallback: "/images/clinic.svg",
								alt: t("hero.imageAlt"),
								width: "1000",
								height: "1200",
								fetchPriority: "high",
								className: "h-full w-full object-cover"
							}, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 91,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-gradient-to-t from-[#123d3a]/35 via-transparent to-transparent" }, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 100,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ jsxDEV("div", {
								className: "absolute start-6 top-6 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-2 text-[9px] font-semibold tracking-widest text-deep backdrop-blur-sm",
								children: [/* @__PURE__ */ jsxDEV(MapPin, {
									className: "size-3",
									"aria-hidden": "true"
								}, void 0, false, {
									fileName: _jsxFileName$7,
									lineNumber: 102,
									columnNumber: 15
								}, this), t("hero.location")]
							}, void 0, true, {
								fileName: _jsxFileName$7,
								lineNumber: 101,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ jsxDEV("p", {
								className: "absolute inset-x-6 bottom-6 text-center font-display text-2xl text-white",
								children: t("hero.note")
							}, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 105,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$7,
						lineNumber: 90,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ jsxDEV("div", {
						className: "absolute -start-1 top-20 flex max-w-[85%] items-center gap-3 rounded-2xl border border-line/70 bg-surface/95 p-3.5 shadow-xl shadow-deep/5 backdrop-blur-md sm:-start-6 lg:-start-8",
						children: [/* @__PURE__ */ jsxDEV("span", {
							className: "flex size-10 shrink-0 items-center justify-center rounded-full bg-soft text-primary",
							children: /* @__PURE__ */ jsxDEV(ShieldCheck, {
								className: "size-5",
								strokeWidth: 1.5,
								"aria-hidden": "true"
							}, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 111,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$7,
							lineNumber: 110,
							columnNumber: 13
						}, this), /* @__PURE__ */ jsxDEV("div", { children: [/* @__PURE__ */ jsxDEV("p", {
							className: "text-xs font-semibold",
							children: t("hero.badge")
						}, void 0, false, {
							fileName: _jsxFileName$7,
							lineNumber: 114,
							columnNumber: 15
						}, this), /* @__PURE__ */ jsxDEV("p", {
							className: "mt-1 text-[10px] text-muted",
							children: t("hero.badgeDetail")
						}, void 0, false, {
							fileName: _jsxFileName$7,
							lineNumber: 115,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$7,
							lineNumber: 113,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$7,
						lineNumber: 109,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ jsxDEV("div", {
						className: "absolute -end-1 bottom-0 flex max-w-[90%] items-center gap-3 rounded-2xl border border-line/70 bg-surface/95 p-4 shadow-xl shadow-deep/5 backdrop-blur-md sm:-end-5",
						children: [/* @__PURE__ */ jsxDEV("span", {
							className: "flex size-10 shrink-0 items-center justify-center rounded-full bg-[#f5eadd] text-[#7d5935]",
							children: /* @__PURE__ */ jsxDEV(Heart, {
								className: "size-5",
								strokeWidth: 1.5,
								"aria-hidden": "true"
							}, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 120,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$7,
							lineNumber: 119,
							columnNumber: 13
						}, this), /* @__PURE__ */ jsxDEV("div", { children: [/* @__PURE__ */ jsxDEV("p", {
							className: "text-sm font-semibold",
							children: t("hero.open")
						}, void 0, false, {
							fileName: _jsxFileName$7,
							lineNumber: 123,
							columnNumber: 15
						}, this), /* @__PURE__ */ jsxDEV("p", {
							className: "mt-1 text-xs text-muted",
							children: t("hero.openDetail")
						}, void 0, false, {
							fileName: _jsxFileName$7,
							lineNumber: 124,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$7,
							lineNumber: 122,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$7,
						lineNumber: 118,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$7,
				lineNumber: 85,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$7,
			lineNumber: 24,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$7,
		lineNumber: 13,
		columnNumber: 5
	}, this);
}
// src/sections/Care.tsx
var _jsxFileName$6 = "/home/omar/Projects/dts-project/src/sections/Care.tsx";
var serviceIcons = {
	checkup: Stethoscope,
	whitening: Sparkles,
	implants: Layers3,
	orthodontics: Smile,
	veneers: ScanLine,
	rootCanal: Heart,
	pediatric: Baby,
	emergency: Cross
};
function TrustBar() {
	const { t } = useTranslation();
	const badges = [
		{
			key: "association",
			Icon: Award
		},
		{
			key: "digital",
			Icon: ScanLine
		},
		{
			key: "sterilization",
			Icon: ShieldCheck
		},
		{
			key: "care",
			Icon: Heart
		}
	];
	return /* @__PURE__ */ jsxDEV("aside", {
		className: "border-y border-line bg-soft/50 py-8",
		"aria-label": t("trust.label"),
		children: /* @__PURE__ */ jsxDEV(Container, { children: [/* @__PURE__ */ jsxDEV("div", {
			className: "flex flex-col items-center gap-7 lg:flex-row lg:justify-between",
			children: [/* @__PURE__ */ jsxDEV("p", {
				className: "max-w-40 text-center text-[9px] leading-5 font-semibold tracking-[0.12em] text-muted lg:text-start",
				children: t("trust.label")
			}, void 0, false, {
				fileName: _jsxFileName$6,
				lineNumber: 59,
				columnNumber: 11
			}, this), /* @__PURE__ */ jsxDEV("div", {
				className: "grid w-full grid-cols-2 gap-x-5 gap-y-6 lg:w-auto lg:grid-cols-4 lg:gap-10",
				children: badges.map(({ key, Icon }) => /* @__PURE__ */ jsxDEV("div", {
					className: "flex items-center justify-center gap-2.5 text-primary",
					children: [/* @__PURE__ */ jsxDEV(Icon, {
						className: "size-6 shrink-0",
						strokeWidth: 1.3,
						"aria-hidden": "true"
					}, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 65,
						columnNumber: 17
					}, this), /* @__PURE__ */ jsxDEV("span", {
						className: "max-w-32 text-[11px] leading-5 font-medium",
						children: t(`trust.${key}`)
					}, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 66,
						columnNumber: 17
					}, this)]
				}, key, true, {
					fileName: _jsxFileName$6,
					lineNumber: 64,
					columnNumber: 15
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName$6,
				lineNumber: 62,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$6,
			lineNumber: 58,
			columnNumber: 9
		}, this), /* @__PURE__ */ jsxDEV("p", {
			className: "mt-5 text-center text-[10px] text-muted",
			children: t("trust.demo")
		}, void 0, false, {
			fileName: _jsxFileName$6,
			lineNumber: 73,
			columnNumber: 9
		}, this)] }, void 0, true, {
			fileName: _jsxFileName$6,
			lineNumber: 57,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$6,
		lineNumber: 56,
		columnNumber: 5
	}, this);
}
function About() {
	const { t } = useTranslation();
	return /* @__PURE__ */ jsxDEV(Section, {
		id: "about",
		children: /* @__PURE__ */ jsxDEV(Container, {
			className: "grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24",
			children: [/* @__PURE__ */ jsxDEV(Reveal, {
				className: "relative mx-auto w-full max-w-md",
				children: [
					/* @__PURE__ */ jsxDEV("div", {
						className: "absolute -start-3 top-3 h-full w-full rounded-3xl border border-primary/25",
						"aria-hidden": "true"
					}, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 85,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ jsxDEV("div", {
						className: "relative overflow-hidden rounded-3xl bg-soft",
						children: [/* @__PURE__ */ jsxDEV(ClinicImage, {
							src: clinic.images.doctor,
							fallback: "/images/doctor.svg",
							alt: t("about.imageAlt"),
							width: 800,
							height: 1e3,
							loading: "lazy",
							className: "aspect-[4/5] w-full object-cover object-top"
						}, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 90,
							columnNumber: 13
						}, this), /* @__PURE__ */ jsxDEV("div", {
							className: "absolute inset-x-4 bottom-4 rounded-2xl border border-white/30 bg-white/90 px-5 py-4 text-deep backdrop-blur-md",
							children: [/* @__PURE__ */ jsxDEV("p", {
								className: "font-display text-2xl font-semibold",
								children: t("clinic.doctorName")
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 100,
								columnNumber: 15
							}, this), /* @__PURE__ */ jsxDEV("p", {
								className: "mt-1 text-xs text-[#536b63]",
								children: t("clinic.doctorRole")
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 101,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 99,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$6,
						lineNumber: 89,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ jsxDEV("div", {
						className: "absolute -end-4 top-7 flex size-23 -rotate-6 flex-col items-center justify-center gap-1 rounded-full border-4 border-canvas bg-primary p-3 text-center text-primary-ink",
						children: [/* @__PURE__ */ jsxDEV(Heart, {
							className: "size-5",
							strokeWidth: 1.4,
							"aria-hidden": "true"
						}, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 105,
							columnNumber: 13
						}, this), /* @__PURE__ */ jsxDEV("span", {
							className: "text-[9px] leading-4",
							children: t("about.badge")
						}, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 106,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$6,
						lineNumber: 104,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ jsxDEV("p", {
						className: "mt-6 text-center text-[10px] text-muted",
						children: t("about.note")
					}, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 108,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$6,
				lineNumber: 84,
				columnNumber: 9
			}, this), /* @__PURE__ */ jsxDEV("div", { children: [/* @__PURE__ */ jsxDEV(SectionHeading, { section: "about" }, void 0, false, {
				fileName: _jsxFileName$6,
				lineNumber: 111,
				columnNumber: 11
			}, this), /* @__PURE__ */ jsxDEV(Reveal, {
				delay: .1,
				children: [
					/* @__PURE__ */ jsxDEV("p", {
						className: "mt-6 text-sm leading-8 text-muted",
						children: t("clinic.doctorBio")
					}, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 113,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ jsxDEV("ul", {
						className: "mt-6 space-y-3",
						children: clinic.doctor.qualifications.map((_, index) => /* @__PURE__ */ jsxDEV("li", {
							className: "flex items-start gap-3 text-xs leading-6",
							children: [/* @__PURE__ */ jsxDEV(BadgeCheck, {
								className: "mt-0.5 size-4 shrink-0 text-primary",
								"aria-hidden": "true"
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 117,
								columnNumber: 19
							}, this), t(`clinic.qualifications.${index}`)]
						}, index, true, {
							fileName: _jsxFileName$6,
							lineNumber: 116,
							columnNumber: 17
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 114,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ jsxDEV("blockquote", {
						className: "my-8 border-s-2 border-accent ps-5 font-display text-2xl leading-relaxed text-primary",
						children: [
							"“",
							t("clinic.doctorQuote"),
							"”"
						]
					}, void 0, true, {
						fileName: _jsxFileName$6,
						lineNumber: 122,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ jsxDEV(BookLink, {}, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 125,
						columnNumber: 13
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$6,
				lineNumber: 112,
				columnNumber: 11
			}, this)] }, void 0, true, {
				fileName: _jsxFileName$6,
				lineNumber: 110,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$6,
			lineNumber: 83,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$6,
		lineNumber: 82,
		columnNumber: 5
	}, this);
}
function Services() {
	const { t } = useTranslation();
	return /* @__PURE__ */ jsxDEV(Section, {
		id: "services",
		className: "bg-soft/55",
		children: /* @__PURE__ */ jsxDEV(Container, { children: [/* @__PURE__ */ jsxDEV("div", {
			className: "mb-12 flex flex-col justify-between gap-7 md:flex-row md:items-end",
			children: [/* @__PURE__ */ jsxDEV(SectionHeading, { section: "services" }, void 0, false, {
				fileName: _jsxFileName$6,
				lineNumber: 139,
				columnNumber: 11
			}, this), /* @__PURE__ */ jsxDEV("p", {
				className: "max-w-xs text-sm leading-7 text-muted",
				children: t("services.description")
			}, void 0, false, {
				fileName: _jsxFileName$6,
				lineNumber: 140,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$6,
			lineNumber: 138,
			columnNumber: 9
		}, this), /* @__PURE__ */ jsxDEV("div", {
			className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
			children: [clinic.services.map((service, index) => {
				const Icon = serviceIcons[service];
				const featured = index === 0;
				return /* @__PURE__ */ jsxDEV(Reveal, {
					delay: index % 4 * .07,
					className: cn(featured && "sm:col-span-2"),
					children: /* @__PURE__ */ jsxDEV("a", {
						href: `#contact?service=${service}`,
						onClick: (event) => {
							event.preventDefault();
							window.dispatchEvent(new CustomEvent("luma:service", { detail: service }));
							document.getElementById("contact")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
							window.history.replaceState(null, "", "#contact");
						},
						className: cn("group relative flex h-full min-h-65 flex-col overflow-hidden rounded-3xl border p-7 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lg", featured ? "border-deep bg-deep text-[#f5f6ed]" : "border-line bg-surface/80"),
						children: [
							/* @__PURE__ */ jsxDEV("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ jsxDEV("span", {
									className: cn("flex size-11 items-center justify-center rounded-xl", featured ? "bg-white/10" : "bg-soft text-primary"),
									children: /* @__PURE__ */ jsxDEV(Icon, {
										className: "size-5",
										strokeWidth: 1.4,
										"aria-hidden": "true"
									}, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 180,
										columnNumber: 23
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 174,
									columnNumber: 21
								}, this), /* @__PURE__ */ jsxDEV("span", {
									className: cn("flex size-8 items-center justify-center rounded-full border transition-transform group-hover:rotate-12", featured ? "border-white/25" : "border-line"),
									children: /* @__PURE__ */ jsxDEV(DirectionArrow, {}, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 188,
										columnNumber: 23
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 182,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$6,
								lineNumber: 173,
								columnNumber: 19
							}, this),
							featured && /* @__PURE__ */ jsxDEV(Fragment, { children: [/* @__PURE__ */ jsxDEV(ToothMark, { className: "pointer-events-none absolute -end-4 bottom-6 size-52 -rotate-12 text-white/10" }, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 193,
								columnNumber: 23
							}, this), /* @__PURE__ */ jsxDEV("p", {
								className: "mt-7 text-[9px] tracking-[0.18em] text-[#b8d4c9]",
								children: t("services.checkup.detail")
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 194,
								columnNumber: 23
							}, this)] }, void 0, true, {
								fileName: _jsxFileName$6,
								lineNumber: 192,
								columnNumber: 21
							}, this),
							/* @__PURE__ */ jsxDEV("h3", {
								className: cn("relative mb-3 mt-6 text-base font-semibold", featured && "mt-3 font-display text-3xl font-medium"),
								children: t(`services.${service}.title`)
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 199,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ jsxDEV("p", {
								className: cn("relative max-w-sm text-xs leading-6", featured ? "text-[#d3e1d8]" : "text-muted"),
								children: t(`services.${service}.description`)
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 207,
								columnNumber: 19
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$6,
						lineNumber: 152,
						columnNumber: 17
					}, this)
				}, service, false, {
					fileName: _jsxFileName$6,
					lineNumber: 147,
					columnNumber: 15
				}, this);
			}), /* @__PURE__ */ jsxDEV(Reveal, {
				delay: .15,
				children: /* @__PURE__ */ jsxDEV("div", {
					className: "flex h-full min-h-65 flex-col items-start justify-center rounded-3xl border border-dashed border-primary/30 bg-transparent p-7",
					children: [
						/* @__PURE__ */ jsxDEV(Leaf, {
							className: "mb-4 size-7 text-primary",
							strokeWidth: 1.3,
							"aria-hidden": "true"
						}, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 221,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ jsxDEV("h3", {
							className: "text-base font-semibold",
							children: t("services.cta")
						}, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 222,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ jsxDEV("p", {
							className: "mb-5 mt-2 text-xs leading-6 text-muted",
							children: t("services.ctaDetail")
						}, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 223,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ jsxDEV("a", {
							href: "#contact",
							className: "inline-flex items-center gap-2 text-xs font-semibold text-primary",
							children: [t("common.book"), /* @__PURE__ */ jsxDEV(DirectionArrow, {}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 229,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 224,
							columnNumber: 15
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$6,
					lineNumber: 220,
					columnNumber: 13
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$6,
				lineNumber: 219,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$6,
			lineNumber: 142,
			columnNumber: 9
		}, this)] }, void 0, true, {
			fileName: _jsxFileName$6,
			lineNumber: 137,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$6,
		lineNumber: 136,
		columnNumber: 5
	}, this);
}
function Counter({ value, suffix, label }) {
	const ref = useRef(null);
	const visible = useInView(ref, { once: true });
	const reduced = useReducedMotion();
	const { i18n } = useTranslation();
	useEffect(() => {
		if (!visible || !ref.current) return;
		const formatter = new Intl.NumberFormat(i18n.language, { maximumFractionDigits: Number.isInteger(value) ? 0 : 1 });
		if (reduced) {
			ref.current.textContent = formatter.format(value);
			return;
		}
		const animation = animate(0, value, {
			duration: 1.7,
			ease: "easeOut",
			onUpdate: (current) => {
				if (ref.current) ref.current.textContent = formatter.format(current);
			}
		});
		return () => animation.stop();
	}, [
		visible,
		value,
		reduced,
		i18n.language
	]);
	return /* @__PURE__ */ jsxDEV("div", {
		className: "text-center",
		children: [/* @__PURE__ */ jsxDEV("p", {
			"aria-label": `${new Intl.NumberFormat(i18n.language).format(value)}${suffix ?? ""}`,
			className: "font-display text-4xl sm:text-5xl",
			children: [/* @__PURE__ */ jsxDEV("span", {
				ref,
				"aria-hidden": "true",
				children: new Intl.NumberFormat(i18n.language).format(value)
			}, void 0, false, {
				fileName: _jsxFileName$6,
				lineNumber: 268,
				columnNumber: 9
			}, this), /* @__PURE__ */ jsxDEV("span", {
				"aria-hidden": "true",
				className: "text-[#bad6c7]",
				children: suffix
			}, void 0, false, {
				fileName: _jsxFileName$6,
				lineNumber: 271,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$6,
			lineNumber: 264,
			columnNumber: 7
		}, this), /* @__PURE__ */ jsxDEV("p", {
			className: "mt-3 text-xs text-[#ccdbd0]",
			children: label
		}, void 0, false, {
			fileName: _jsxFileName$6,
			lineNumber: 275,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$6,
		lineNumber: 263,
		columnNumber: 5
	}, this);
}
function WhyChooseUs() {
	const { t } = useTranslation();
	const icons = [
		Microscope,
		Heart,
		ShieldCheck,
		CalendarDays
	];
	return /* @__PURE__ */ jsxDEV(Section, {
		id: "why",
		children: /* @__PURE__ */ jsxDEV(Container, { children: [/* @__PURE__ */ jsxDEV("div", {
			className: "grid items-center gap-12 lg:grid-cols-2 lg:gap-20",
			children: [/* @__PURE__ */ jsxDEV("div", { children: [/* @__PURE__ */ jsxDEV(SectionHeading, {
				section: "why",
				description: true
			}, void 0, false, {
				fileName: _jsxFileName$6,
				lineNumber: 288,
				columnNumber: 13
			}, this), /* @__PURE__ */ jsxDEV("div", {
				className: "mt-9 grid gap-6 sm:grid-cols-2",
				children: icons.map((Icon, index) => /* @__PURE__ */ jsxDEV(Reveal, {
					delay: index * .06,
					children: [
						/* @__PURE__ */ jsxDEV(Icon, {
							className: "mb-3 size-6 text-primary",
							strokeWidth: 1.5,
							"aria-hidden": "true"
						}, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 292,
							columnNumber: 19
						}, this),
						/* @__PURE__ */ jsxDEV("h3", {
							className: "text-sm font-semibold",
							children: t(`why.items.${index}.title`)
						}, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 293,
							columnNumber: 19
						}, this),
						/* @__PURE__ */ jsxDEV("p", {
							className: "mt-2 text-xs leading-6 text-muted",
							children: t(`why.items.${index}.description`)
						}, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 294,
							columnNumber: 19
						}, this)
					]
				}, index, true, {
					fileName: _jsxFileName$6,
					lineNumber: 291,
					columnNumber: 17
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName$6,
				lineNumber: 289,
				columnNumber: 13
			}, this)] }, void 0, true, {
				fileName: _jsxFileName$6,
				lineNumber: 287,
				columnNumber: 11
			}, this), /* @__PURE__ */ jsxDEV(Reveal, {
				className: "relative",
				children: [/* @__PURE__ */ jsxDEV(ClinicImage, {
					src: clinic.images.clinic,
					fallback: "/images/clinic.svg",
					alt: t("why.imageAlt"),
					loading: "lazy",
					width: 900,
					height: 1e3,
					className: "aspect-[5/6] max-h-[570px] w-full rounded-t-[9rem] rounded-b-3xl object-cover"
				}, void 0, false, {
					fileName: _jsxFileName$6,
					lineNumber: 302,
					columnNumber: 13
				}, this), /* @__PURE__ */ jsxDEV("div", {
					className: "absolute inset-x-6 bottom-6 flex items-center gap-3 rounded-2xl bg-surface/95 p-5 shadow-sm backdrop-blur",
					children: [/* @__PURE__ */ jsxDEV("span", {
						className: "flex size-9 shrink-0 items-center justify-center rounded-full bg-soft text-primary",
						children: /* @__PURE__ */ jsxDEV(Check, {
							className: "size-5",
							"aria-hidden": "true"
						}, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 313,
							columnNumber: 17
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 312,
						columnNumber: 15
					}, this), /* @__PURE__ */ jsxDEV("p", {
						className: "text-sm font-medium",
						children: t("about.caption")
					}, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 315,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$6,
					lineNumber: 311,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$6,
				lineNumber: 301,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$6,
			lineNumber: 286,
			columnNumber: 9
		}, this), /* @__PURE__ */ jsxDEV(Reveal, {
			className: "mt-16 rounded-3xl bg-deep px-5 py-10 text-[#f4f4e9] sm:px-12",
			children: [/* @__PURE__ */ jsxDEV("div", {
				className: "grid grid-cols-3 gap-3 divide-x divide-white/20 rtl:divide-x-reverse",
				children: [
					/* @__PURE__ */ jsxDEV(Counter, {
						value: clinic.stats.experience,
						suffix: "+",
						label: t("why.experience")
					}, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 321,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ jsxDEV(Counter, {
						value: clinic.stats.patients,
						suffix: "+",
						label: t("why.patients")
					}, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 322,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ jsxDEV(Counter, {
						value: clinic.stats.rating,
						suffix: "/5",
						label: t("why.rating")
					}, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 323,
						columnNumber: 13
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$6,
				lineNumber: 320,
				columnNumber: 11
			}, this), /* @__PURE__ */ jsxDEV("p", {
				className: "mt-7 text-center text-[10px] text-[#bed0c5]",
				children: t("why.note")
			}, void 0, false, {
				fileName: _jsxFileName$6,
				lineNumber: 325,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$6,
			lineNumber: 319,
			columnNumber: 9
		}, this)] }, void 0, true, {
			fileName: _jsxFileName$6,
			lineNumber: 285,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$6,
		lineNumber: 284,
		columnNumber: 5
	}, this);
}
// src/sections/Journey.tsx
var _jsxFileName$5 = "/home/omar/Projects/dts-project/src/sections/Journey.tsx";
function Journey() {
	const { t, i18n } = useTranslation();
	const icons = [
		CalendarCheck,
		MessageCircle,
		HeartHandshake,
		Smile
	];
	return /* @__PURE__ */ jsxDEV(Section, {
		id: "journey",
		children: /* @__PURE__ */ jsxDEV(Container, { children: [/* @__PURE__ */ jsxDEV(SectionHeading, {
			section: "journey",
			centered: true
		}, void 0, false, {
			fileName: _jsxFileName$5,
			lineNumber: 11,
			columnNumber: 9
		}, this), /* @__PURE__ */ jsxDEV("ol", {
			className: "mt-14 grid gap-9 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7",
			children: icons.map((Icon, index) => /* @__PURE__ */ jsxDEV("li", { children: /* @__PURE__ */ jsxDEV(Reveal, {
				delay: index * .1,
				className: "relative",
				children: [
					/* @__PURE__ */ jsxDEV("div", {
						className: "mb-6 flex items-center gap-4",
						children: [
							/* @__PURE__ */ jsxDEV("span", {
								className: "flex size-14 shrink-0 items-center justify-center rounded-2xl border border-line bg-soft",
								children: /* @__PURE__ */ jsxDEV(Icon, {
									className: "size-6 text-primary",
									strokeWidth: 1.4,
									"aria-hidden": "true"
								}, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 18,
									columnNumber: 21
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 17,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ jsxDEV("span", { className: "h-px flex-1 bg-line" }, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 20,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ jsxDEV("span", {
								className: "text-xs text-primary",
								children: new Intl.NumberFormat(i18n.language, { minimumIntegerDigits: 2 }).format(index + 1)
							}, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 21,
								columnNumber: 19
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$5,
						lineNumber: 16,
						columnNumber: 17
					}, this),
					/* @__PURE__ */ jsxDEV("h3", {
						className: "text-base font-semibold",
						children: t(`journey.steps.${index}.title`)
					}, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 27,
						columnNumber: 17
					}, this),
					/* @__PURE__ */ jsxDEV("p", {
						className: "mt-3 text-sm leading-7 text-muted",
						children: t(`journey.steps.${index}.description`)
					}, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 28,
						columnNumber: 17
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$5,
				lineNumber: 15,
				columnNumber: 15
			}, this) }, index, false, {
				fileName: _jsxFileName$5,
				lineNumber: 14,
				columnNumber: 13
			}, this))
		}, void 0, false, {
			fileName: _jsxFileName$5,
			lineNumber: 12,
			columnNumber: 9
		}, this)] }, void 0, true, {
			fileName: _jsxFileName$5,
			lineNumber: 10,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$5,
		lineNumber: 9,
		columnNumber: 5
	}, this);
}
// src/sections/Reviews.tsx
var _jsxFileName$4 = "/home/omar/Projects/dts-project/src/sections/Reviews.tsx";
function Reviews() {
	const { t, i18n } = useTranslation();
	const [index, setIndex] = useState(0);
	const reduced = useReducedMotion();
	const review = clinic.testimonials[index];
	const change = (direction) => setIndex((current) => (current + direction + clinic.testimonials.length) % clinic.testimonials.length);
	return /* @__PURE__ */ jsxDEV(Section, {
		id: "reviews",
		className: "bg-soft/60",
		children: /* @__PURE__ */ jsxDEV(Container, {
			className: "grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20",
			children: [/* @__PURE__ */ jsxDEV("div", { children: [
				/* @__PURE__ */ jsxDEV(SectionHeading, {
					section: "reviews",
					description: true
				}, void 0, false, {
					fileName: _jsxFileName$4,
					lineNumber: 22,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ jsxDEV("div", {
					className: "mt-8 flex items-center gap-4",
					children: [/* @__PURE__ */ jsxDEV("strong", {
						className: "font-display text-5xl",
						children: new Intl.NumberFormat(i18n.language).format(clinic.stats.rating)
					}, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 24,
						columnNumber: 13
					}, this), /* @__PURE__ */ jsxDEV("div", { children: [/* @__PURE__ */ jsxDEV(Stars, { rating: clinic.stats.rating }, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 28,
						columnNumber: 15
					}, this), /* @__PURE__ */ jsxDEV("p", {
						className: "mt-1 text-[11px] text-muted",
						children: t("reviews.count", { count: clinic.stats.reviews })
					}, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 29,
						columnNumber: 15
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$4,
						lineNumber: 27,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$4,
					lineNumber: 23,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ jsxDEV("p", {
					className: "mt-4 text-[10px] text-muted",
					children: t("reviews.note")
				}, void 0, false, {
					fileName: _jsxFileName$4,
					lineNumber: 34,
					columnNumber: 11
				}, this)
			] }, void 0, true, {
				fileName: _jsxFileName$4,
				lineNumber: 21,
				columnNumber: 9
			}, this), /* @__PURE__ */ jsxDEV("div", {
				role: "region",
				"aria-roledescription": "carousel",
				"aria-label": t("nav.reviews"),
				className: "rounded-3xl border border-line bg-surface/80 p-7 sm:p-10",
				children: [
					/* @__PURE__ */ jsxDEV(Quote, {
						className: "mb-6 size-9 text-primary/40",
						strokeWidth: 1,
						"aria-hidden": "true"
					}, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 42,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ jsxDEV("div", {
						"aria-live": "polite",
						"aria-atomic": "true",
						className: "min-h-62",
						children: /* @__PURE__ */ jsxDEV(AnimatePresence, {
							mode: "wait",
							initial: false,
							children: /* @__PURE__ */ jsxDEV(motion.div, {
								initial: reduced ? false : {
									opacity: 0,
									y: 8
								},
								animate: {
									opacity: 1,
									y: 0
								},
								exit: { opacity: 0 },
								transition: { duration: reduced ? 0 : .18 },
								children: [
									/* @__PURE__ */ jsxDEV(Stars, { rating: review.rating }, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 52,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ jsxDEV("blockquote", {
										className: "mt-4 font-display text-[clamp(1.5rem,2.3vw,2rem)] leading-relaxed",
										children: [
											"“",
											t(`clinic.testimonials.${index}.quote`),
											"”"
										]
									}, void 0, true, {
										fileName: _jsxFileName$4,
										lineNumber: 53,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ jsxDEV("div", {
										className: "mt-6 flex items-center gap-3",
										children: [/* @__PURE__ */ jsxDEV("span", {
											"aria-hidden": "true",
											className: "flex size-11 shrink-0 items-center justify-center rounded-full bg-soft font-display text-lg text-primary",
											children: t(`clinic.testimonials.${index}.name`).slice(0, 1)
										}, void 0, false, {
											fileName: _jsxFileName$4,
											lineNumber: 57,
											columnNumber: 19
										}, this), /* @__PURE__ */ jsxDEV("div", { children: [/* @__PURE__ */ jsxDEV("p", {
											className: "text-sm font-semibold",
											children: t(`clinic.testimonials.${index}.name`)
										}, void 0, false, {
											fileName: _jsxFileName$4,
											lineNumber: 64,
											columnNumber: 21
										}, this), /* @__PURE__ */ jsxDEV("p", {
											className: "mt-1 text-xs text-muted",
											children: t(`services.${review.service}.title`)
										}, void 0, false, {
											fileName: _jsxFileName$4,
											lineNumber: 67,
											columnNumber: 21
										}, this)] }, void 0, true, {
											fileName: _jsxFileName$4,
											lineNumber: 63,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$4,
										lineNumber: 56,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ jsxDEV("p", {
										className: "sr-only",
										children: t("reviews.counter", {
											current: index + 1,
											total: clinic.testimonials.length
										})
									}, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 72,
										columnNumber: 17
									}, this)
								]
							}, index, true, {
								fileName: _jsxFileName$4,
								lineNumber: 45,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 44,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 43,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ jsxDEV("div", {
						className: "mt-7 flex items-center justify-between border-t border-line pt-5",
						children: [/* @__PURE__ */ jsxDEV("div", {
							className: "flex gap-2",
							children: clinic.testimonials.map((_, dot) => /* @__PURE__ */ jsxDEV("button", {
								type: "button",
								"aria-label": t("reviews.counter", {
									current: dot + 1,
									total: clinic.testimonials.length
								}),
								"aria-pressed": dot === index,
								onClick: () => setIndex(dot),
								className: "flex size-8 items-center justify-center",
								children: /* @__PURE__ */ jsxDEV("span", { className: cn("h-1.5 rounded-full transition-[width,background-color]", dot === index ? "w-6 bg-primary" : "w-1.5 bg-line") }, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 92,
									columnNumber: 19
								}, this)
							}, dot, false, {
								fileName: _jsxFileName$4,
								lineNumber: 81,
								columnNumber: 17
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 79,
							columnNumber: 13
						}, this), /* @__PURE__ */ jsxDEV("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ jsxDEV("button", {
								type: "button",
								onClick: () => change(-1),
								"aria-label": t("common.previous"),
								className: "flex size-11 items-center justify-center rounded-full border border-line transition-colors hover:bg-soft",
								children: /* @__PURE__ */ jsxDEV(ArrowLeft, {
									className: "size-4 rtl:-scale-x-100",
									"aria-hidden": "true"
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 108,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 102,
								columnNumber: 15
							}, this), /* @__PURE__ */ jsxDEV("button", {
								type: "button",
								onClick: () => change(1),
								"aria-label": t("common.next"),
								className: "flex size-11 items-center justify-center rounded-full bg-primary text-primary-ink transition-colors hover:bg-primary-hover",
								children: /* @__PURE__ */ jsxDEV(ArrowRight, {
									className: "size-4 rtl:-scale-x-100",
									"aria-hidden": "true"
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 116,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 110,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$4,
							lineNumber: 101,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$4,
						lineNumber: 78,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$4,
				lineNumber: 36,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$4,
			lineNumber: 20,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$4,
		lineNumber: 19,
		columnNumber: 5
	}, this);
}
// src/sections/Pricing.tsx
var _jsxFileName$3 = "/home/omar/Projects/dts-project/src/sections/Pricing.tsx";
function Pricing() {
	const { t, i18n } = useTranslation();
	return /* @__PURE__ */ jsxDEV(Section, {
		id: "pricing",
		children: /* @__PURE__ */ jsxDEV(Container, { children: [
			/* @__PURE__ */ jsxDEV("div", {
				className: "flex flex-col justify-between gap-7 md:flex-row md:items-end",
				children: [/* @__PURE__ */ jsxDEV(SectionHeading, { section: "pricing" }, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 20,
					columnNumber: 11
				}, this), /* @__PURE__ */ jsxDEV("p", {
					className: "max-w-sm text-sm leading-7 text-muted",
					children: t("pricing.description")
				}, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 21,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$3,
				lineNumber: 19,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ jsxDEV("div", {
				className: "mt-12 grid gap-5 md:grid-cols-3",
				children: clinic.packages.map((item, index) => /* @__PURE__ */ jsxDEV(Reveal, {
					delay: index * .08,
					children: /* @__PURE__ */ jsxDEV("div", {
						className: cn("relative flex h-full flex-col rounded-3xl border p-7 lg:p-9", item.featured ? "border-primary bg-soft" : "border-line bg-surface/70"),
						children: [
							item.featured && /* @__PURE__ */ jsxDEV("div", {
								className: "absolute -top-3 start-6 inline-flex items-center gap-2 rounded-full bg-primary px-3 py-1.5 text-[10px] font-medium text-primary-ink",
								children: [/* @__PURE__ */ jsxDEV(Sparkles, {
									className: "size-3",
									"aria-hidden": "true"
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 34,
									columnNumber: 21
								}, this), t("pricing.featured")]
							}, void 0, true, {
								fileName: _jsxFileName$3,
								lineNumber: 33,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ jsxDEV("h3", {
								className: "mt-1 text-base font-semibold",
								children: t(`services.${item.service}.title`)
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 38,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ jsxDEV("p", {
								className: "mt-7 text-[11px] text-muted",
								children: t("common.from")
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 41,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ jsxDEV("p", {
								className: "mt-1 flex items-baseline gap-2",
								children: [/* @__PURE__ */ jsxDEV("span", {
									className: "font-display text-5xl",
									children: new Intl.NumberFormat(i18n.language).format(item.price)
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 43,
									columnNumber: 19
								}, this), /* @__PURE__ */ jsxDEV("span", {
									className: "text-sm text-muted",
									children: t("common.currency")
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 46,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$3,
								lineNumber: 42,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ jsxDEV("p", {
								className: "mb-8 mt-5 flex flex-1 items-start gap-2 border-t border-line pt-5 text-xs leading-6 text-muted",
								children: [/* @__PURE__ */ jsxDEV(Check, {
									className: "mt-1 size-3.5 shrink-0 text-primary",
									"aria-hidden": "true"
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 49,
									columnNumber: 19
								}, this), t(`pricing.${item.service}`)]
							}, void 0, true, {
								fileName: _jsxFileName$3,
								lineNumber: 48,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ jsxDEV(ButtonLink, {
								href: "#contact",
								variant: item.featured ? "primary" : "secondary",
								className: "w-full",
								children: [t("common.quote"), /* @__PURE__ */ jsxDEV(DirectionArrow, {}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 58,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$3,
								lineNumber: 52,
								columnNumber: 17
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$3,
						lineNumber: 26,
						columnNumber: 15
					}, this)
				}, item.service, false, {
					fileName: _jsxFileName$3,
					lineNumber: 25,
					columnNumber: 13
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName$3,
				lineNumber: 23,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ jsxDEV("p", {
				className: "mx-auto mt-6 max-w-xl text-center text-[11px] leading-6 text-muted",
				children: t("pricing.note")
			}, void 0, false, {
				fileName: _jsxFileName$3,
				lineNumber: 64,
				columnNumber: 9
			}, this)
		] }, void 0, true, {
			fileName: _jsxFileName$3,
			lineNumber: 18,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$3,
		lineNumber: 17,
		columnNumber: 5
	}, this);
}
// src/components/Accordion.tsx
var _jsxFileName$2 = "/home/omar/Projects/dts-project/src/components/Accordion.tsx";
function Accordion({ items }) {
	const [open, setOpen] = useState(0);
	const id = useId();
	return /* @__PURE__ */ jsxDEV("div", {
		className: "border-t border-line",
		children: items.map((item, index) => /* @__PURE__ */ jsxDEV("div", {
			className: "border-b border-line",
			children: [/* @__PURE__ */ jsxDEV("h3", { children: /* @__PURE__ */ jsxDEV("button", {
				type: "button",
				"aria-expanded": open === index,
				"aria-controls": `${id}-panel-${index}`,
				id: `${id}-button-${index}`,
				onClick: () => setOpen(open === index ? null : index),
				className: "flex w-full items-center justify-between gap-5 py-6 text-start text-sm font-medium",
				children: [/* @__PURE__ */ jsxDEV("span", { children: item.question }, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 21,
					columnNumber: 15
				}, this), /* @__PURE__ */ jsxDEV(Plus, {
					className: cn("size-4 shrink-0 text-primary transition-transform", open === index && "rotate-45"),
					"aria-hidden": "true"
				}, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 22,
					columnNumber: 15
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$2,
				lineNumber: 13,
				columnNumber: 13
			}, this) }, void 0, false, {
				fileName: _jsxFileName$2,
				lineNumber: 12,
				columnNumber: 11
			}, this), /* @__PURE__ */ jsxDEV("div", {
				id: `${id}-panel-${index}`,
				role: "region",
				"aria-labelledby": `${id}-button-${index}`,
				hidden: open !== index,
				className: "pb-6 pe-7 text-sm leading-7 text-muted",
				children: item.answer
			}, void 0, false, {
				fileName: _jsxFileName$2,
				lineNumber: 31,
				columnNumber: 11
			}, this)]
		}, index, true, {
			fileName: _jsxFileName$2,
			lineNumber: 11,
			columnNumber: 9
		}, this))
	}, void 0, false, {
		fileName: _jsxFileName$2,
		lineNumber: 9,
		columnNumber: 5
	}, this);
}
// src/sections/FAQ.tsx
var _jsxFileName$1 = "/home/omar/Projects/dts-project/src/sections/FAQ.tsx";
function FAQ() {
	const { t } = useTranslation();
	const items = Array.from({ length: 6 }, (_, index) => ({
		question: t(`faq.items.${index}.question`),
		answer: t(`faq.items.${index}.answer`)
	}));
	return /* @__PURE__ */ jsxDEV(Section, {
		id: "faq",
		className: "border-t border-line",
		children: /* @__PURE__ */ jsxDEV(Container, {
			className: "grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20",
			children: [/* @__PURE__ */ jsxDEV("div", { children: [/* @__PURE__ */ jsxDEV(SectionHeading, {
				section: "faq",
				description: true
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 17,
				columnNumber: 11
			}, this), /* @__PURE__ */ jsxDEV(ButtonLink, {
				href: whatsappHref,
				target: "_blank",
				rel: "noopener noreferrer",
				variant: "secondary",
				className: "mt-8",
				children: [/* @__PURE__ */ jsxDEV(MessageCircle, {
					className: "size-4",
					"aria-hidden": "true"
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 25,
					columnNumber: 13
				}, this), t("common.whatsapp")]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 18,
				columnNumber: 11
			}, this)] }, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 16,
				columnNumber: 9
			}, this), /* @__PURE__ */ jsxDEV(Accordion, { items }, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 29,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 15,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 14,
		columnNumber: 5
	}, this);
}
// src/App.tsx
var _jsxFileName = "/home/omar/Projects/dts-project/src/App.tsx";
var Results = lazy(() => import("./assets/Results-CXPZETBR.js"));
var Contact = lazy(() => import("./assets/Contact-DhpZRlR0.js"));
function App() {
	return /* @__PURE__ */ jsxDEV(MotionConfig, {
		reducedMotion: "user",
		children: [
			/* @__PURE__ */ jsxDEV(SEO, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 19,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ jsxDEV(Navbar, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 20,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ jsxDEV("main", {
				id: "main",
				tabIndex: -1,
				children: [
					/* @__PURE__ */ jsxDEV(Hero, {}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 22,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ jsxDEV(TrustBar, {}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 23,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ jsxDEV(About, {}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 24,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ jsxDEV(Services, {}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 25,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ jsxDEV(WhyChooseUs, {}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 26,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ jsxDEV(Suspense, {
						fallback: /* @__PURE__ */ jsxDEV("div", {
							className: "min-h-[600px] bg-soft",
							"aria-busy": "true"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 27,
							columnNumber: 29
						}, this),
						children: /* @__PURE__ */ jsxDEV(Results, {}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 28,
							columnNumber: 11
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 27,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ jsxDEV(Journey, {}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 30,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ jsxDEV(Reviews, {}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 31,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ jsxDEV(Pricing, {}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 32,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ jsxDEV(FAQ, {}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 33,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ jsxDEV(Suspense, {
						fallback: /* @__PURE__ */ jsxDEV("div", {
							className: "min-h-[900px] bg-soft",
							"aria-busy": "true"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 34,
							columnNumber: 29
						}, this),
						children: /* @__PURE__ */ jsxDEV(Contact, {}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 35,
							columnNumber: 11
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 34,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 21,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ jsxDEV(Footer, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 38,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 18,
		columnNumber: 5
	}, this);
}
// src/i18n/ar.ts
var ar = {
	clinic: localizedClinic("ar"),
	common: {
		book: "احجز موعدك",
		bookShort: "احجز الآن",
		whatsapp: "تواصل عبر واتساب",
		call: "اتصل بالعيادة",
		learnMore: "اكتشف خدماتنا",
		allServices: "اختر العناية المناسبة",
		readMore: "تعرّف على طبيبتك",
		close: "إغلاق القائمة",
		menu: "فتح القائمة",
		language: "EN",
		languageLabel: "Switch to English",
		light: "التبديل إلى الوضع الفاتح",
		dark: "التبديل إلى الوضع الداكن",
		skip: "انتقل إلى المحتوى الرئيسي",
		currency: "د.أ",
		from: "ابتداءً من",
		quote: "اطلب تقديرًا للتكلفة",
		next: "الرأي التالي",
		previous: "الرأي السابق",
		stars: "{{count}} من ٥ نجوم",
		instagram: "إنستغرام",
		facebook: "فيسبوك"
	},
	nav: {
		home: "الرئيسية",
		about: "طبيبتك",
		services: "خدماتنا",
		results: "ابتسامات",
		reviews: "آراؤكم",
		faq: "أسئلتك",
		contact: "زرنا"
	},
	hero: {
		eyebrow: "عناية مدروسة بأسنانك. هنا في عمّان.",
		title: "ابتسامة صحية.",
		accent: "وثقة تدوم.",
		description: "خبرة تطمئنك، ولمسة لطيفة، ومكان يمنحك الراحة. اكتشف عناية بأسنانك صُمّمت من أجلك.",
		experience: "عامًا من العناية",
		patients: "ابتسامة سعيدة",
		rating: "تقييم مرضانا",
		imageAlt: "غرفة علاج أسنان مشرقة ومريحة بمعدات حديثة — صورة توضيحية لعيادة",
		badge: "ابتسامتك بأيدٍ أمينة",
		badgeDetail: "عناية شخصية. وثقة تدوم.",
		open: "تشعر ببعض القلق؟ لا بأس.",
		openDetail: "سنأخذها خطوة بخطوة، معًا.",
		note: "بداية جديدة لشعور أجمل.",
		location: "عبدون، عمّان"
	},
	trust: {
		label: "عناية متميزة تبدأ بمعايير عالية",
		association: "نقابة أطباء الأسنان الأردنية",
		digital: "طب أسنان رقمي",
		sterilization: "تعقيم دقيق",
		care: "أنت أولويتنا",
		demo: "اعتمادات توضيحية · تخضع لتأكيد العيادة"
	},
	about: {
		eyebrow: "وراء كل ابتسامة، حكاية",
		title: "طبيبتك.",
		accent: "وشريكتك في العناية.",
		imageAlt: "مختصة رعاية صحية في عيادة مشرقة — صورة توضيحية تُستبدل بصورة الطبيبة المعالجة",
		caption: "وجه مألوف. وتجربة ألطف.",
		note: "ملف طبيبة ومؤهلات للتوضيح. صورة عامة.",
		signature: "بكل اهتمام،",
		badge: "معك، في كل خطوة."
	},
	services: {
		eyebrow: "قليل من العناية يصنع فرقًا كبيرًا",
		title: "لكل ابتسامة حكاية.",
		accent: "ولكل حكاية عناية.",
		description: "من العناية اليومية إلى بداية جديدة لابتسامتك، تجد كل ما تحتاجه تحت سقف واحد.",
		checkup: {
			title: "الفحص والتنظيف",
			description: "بداية صحية مع فحص شامل وتنظيف يمنح ابتسامتك الانتعاش.",
			detail: "أساسيات ابتسامتك الصحية"
		},
		whitening: {
			title: "تبييض الأسنان",
			description: "ابتسامة أكثر إشراقًا وثقة، بخطة تناسب احتياجاتك."
		},
		implants: {
			title: "زراعة الأسنان",
			description: "خيارات مدروسة بعناية لتعويض الأسنان المفقودة."
		},
		orthodontics: {
			title: "التقويم والشفاف",
			description: "خطوات نحو تناسق أجمل، بخيارات مريحة وإرشاد شخصي."
		},
		veneers: {
			title: "القشور وتصميم الابتسامة",
			description: "تفاصيل مصمّمة بعناية لابتسامة هوليوود تحتفظ بطابعك."
		},
		rootCanal: {
			title: "علاج الجذور",
			description: "عناية دقيقة ولطيفة للمساعدة في الحفاظ على أسنانك الطبيعية."
		},
		pediatric: {
			title: "ابتسامات صغيرة",
			description: "زيارات ودّية تساعد أطفالنا على بناء عادات صحية تدوم."
		},
		emergency: {
			title: "العناية الطارئة",
			description: "مشكلة غير متوقعة؟ اتصل خلال ساعات العمل لمعرفة أقرب موعد متاح."
		},
		cta: "لا تعرف من أين تبدأ؟",
		ctaDetail: "لنتحدث. نساعدك في اختيار العناية المناسبة."
	},
	why: {
		eyebrow: "ما يميّز لوما",
		title: "عناية تطمئنك.",
		accent: "وراحة تستحقها.",
		description: "التفاصيل الصغيرة هي التي تشعرك بأنك في بيتك. والاهتمام الحقيقي هو الذي يصنع الفرق في تجربتك.",
		items: [
			{
				title: "تقنية في خدمة راحتك",
				description: "تصوير رقمي وتقنيات مختارة بعناية لتخطيط علاجي واضح ومدروس."
			},
			{
				title: "راحتك أولًا",
				description: "نهج لطيف، ووقت للاستراحة، وخيارات للراحة نشرحها قبل أن نبدأ."
			},
			{
				title: "اهتمام بكل التفاصيل",
				description: "إجراءات نظافة واضحة وعناية بالتعقيم في كل موعد."
			},
			{
				title: "مواعيد تناسب يومك",
				description: "مواعيد مسائية ويوم السبت، ووقت نخصّصه لك وحدك."
			}
		],
		experience: "عامًا من الخبرة",
		patients: "ابتسامة نعتني بها",
		rating: "تقييم مرضانا",
		note: "إحصاءات توضيحية للعيادة",
		imageAlt: "تصميم داخلي مشرق ومدروس لعيادة — صورة توضيحية"
	},
	results: {
		eyebrow: "تغييرات صغيرة. احتمالات جميلة.",
		title: "ابتسامة واحدة،",
		accent: "قد تغيّر الكثير.",
		description: "اكتشف مقارنة توضيحية لتبييض الأسنان. في الاستشارة، نتحدث عن الخيارات المناسبة لابتسامتك أنت.",
		before: "قبل",
		after: "بعد",
		slider: "اكشف مقارنة تبييض الأسنان",
		hint: "اسحب للمقارنة · أو استخدم مفاتيح الأسهم",
		disclaimer: "رسم توضيحي وليس نتيجة لمريض. تختلف النتائج وتتطلّب تقييمًا طبيًا.",
		beforeAlt: "رسم لابتسامة قبل التبييض التجميلي",
		afterAlt: "رسم لابتسامة بعد التبييض التجميلي",
		tag: "أكثر إشراقًا. وبطابعك أنت."
	},
	journey: {
		eyebrow: "بساطة من الخطوة الأولى",
		title: "حكايتك القادمة.",
		accent: "أربع خطوات بسيطة.",
		steps: [
			{
				title: "قل مرحبًا",
				description: "اختر وقتًا يناسبك، ودع لنا الاهتمام بالتفاصيل."
			},
			{
				title: "لنتعرّف عليك",
				description: "نستمع إليك، ونفحص أسنانك، ونناقش خياراتك معًا."
			},
			{
				title: "عناية على راحتك",
				description: "خطة علاج شخصية، تكون راحتك في قلبها."
			},
			{
				title: "ابتسامة تستمر",
				description: "إرشادات ومتابعة تحافظ على ابتسامتك في أفضل حال."
			}
		]
	},
	reviews: {
		eyebrow: "كلمات لطيفة. وابتسامات سعيدة.",
		title: "شيء من المحبة،",
		accent: "من أصحاب الابتسامات.",
		description: "أجمل ما في عملنا هو شعورك وأنت تغادر العيادة.",
		note: "قصص مرضى توضيحية، وليست تقييمات موثّقة.",
		counter: "الرأي {{current}} من {{total}}",
		rating: "{{rating}} / ٥",
		count: "أكثر من {{count}} تقييم"
	},
	pricing: {
		eyebrow: "عناية واضحة. وأسعار واضحة.",
		title: "بداية مطمئنة،",
		accent: "لابتسامتك.",
		description: "بعض الوضوح قبل زيارتك الأولى. نؤكد لك تقديرًا شخصيًا للتكلفة بعد الاستشارة.",
		featured: "إشراقة محبوبة",
		checkup: "فحص الأسنان والتنظيف الروتيني",
		whitening: "استشارة وجلسة تبييض داخل العيادة",
		orthodontics: "استشارة تقويم، وليست تكلفة العلاج الكامل",
		note: "أسعار ابتدائية توضيحية بالدينار الأردني. تعتمد التكلفة النهائية على التقييم واحتياجات العلاج."
	},
	faq: {
		eyebrow: "إجابات على ما يدور في بالك",
		title: "لنجعل زيارتك",
		accent: "أكثر اطمئنانًا.",
		description: "معلومة بسيطة قد تجعل زيارتك القادمة أسهل بكثير.",
		items: [
			{
				question: "هل يمكنني استخدام التأمين الصحي؟",
				answer: "تواصل معنا باسم شركة التأمين وتفاصيل وثيقتك. يساعدك الفريق في التحقق من التغطية وشرح التكاليف المتوقعة قبل العلاج. تعتمد التغطية على شروط وثيقتك."
			},
			{
				question: "أشعر بالقلق من علاج الأسنان، هل يمكنكم مساعدتي؟",
				answer: "بالتأكيد. أخبرنا بما تشعر به عند الحجز. تشرح لك الطبيبة كل خطوة وتناقش خيارات الراحة المناسبة وتتفق معك على فترات استراحة. نأخذ الأمور بالوتيرة التي تناسبك."
			},
			{
				question: "ماذا أحضر معي في الزيارة الأولى؟",
				answer: "أحضر هويتك وتفاصيل التأمين إن وُجدت، وقائمة بالأدوية أو السجلات الطبية ذات الصلة. خصّص وقتًا للحديث والفحص ومناقشة خطة العناية."
			},
			{
				question: "ما طرق الدفع المتاحة؟",
				answer: "تقبل العيادة التوضيحية الدفع النقدي والبطاقات الرئيسية. تواصل مع الفريق لتأكيد وسائل الدفع المتاحة والاستفسار عن ترتيبات السداد قبل موعدك."
			},
			{
				question: "ماذا أفعل إذا احتجت موعدًا عاجلًا؟",
				answer: "اتصل بالعيادة خلال ساعات العمل للتحقق من أقرب موعد متاح. نموذج الموقع ليس خدمة لمتابعة الحالات الطارئة."
			},
			{
				question: "هل تتوفر مواعيد يوم السبت؟",
				answer: "نعم، عندما تكون ساعات السبت مفعّلة في جدول العيادة. أرسل طلبًا أو اتصل لتأكيد التوفر. العيادة مغلقة يوم الجمعة."
			}
		]
	},
	contact: {
		eyebrow: "ابتسامتك القادمة تبدأ هنا",
		title: "لنخصّص وقتًا",
		accent: "لابتسامتك.",
		description: "أخبرنا قليلًا عن نفسك، وسيتواصل معك فريقنا لاختيار وقت يناسبك.",
		formTitle: "مرحبًا صغيرة. وبداية جديدة.",
		formDescription: "اطلب موعدك من خلال النموذج.",
		name: "الاسم الكامل",
		namePlaceholder: "اسمك",
		phone: "رقم الهاتف",
		phonePlaceholder: "+962 7X XXX XXXX",
		date: "التاريخ المفضّل",
		service: "كيف يمكننا مساعدتك؟",
		servicePlaceholder: "اختر الخدمة",
		message: "هل ترغب بإخبارنا بشيء؟",
		messagePlaceholder: "شاركنا ما يدور في بالك…",
		optional: "(اختياري)",
		submit: "اطلب موعدك",
		submitting: "جارٍ إرسال طلبك…",
		privacy: "تُستخدم بياناتك فقط للرد على طلب موعدك.",
		demo: "نموذج تجريبي: تتم محاكاة الطلبات ولا يُحجز موعد فعلي.",
		successTitle: "اكتمل طلبك التجريبي.",
		successMessage: "شكرًا لتجربة الحجز. لم تُرسل أي بيانات إلى عيادة ولم يُحجز موعد فعلي.",
		liveSuccessTitle: "وصل طلبك بنجاح.",
		liveSuccessMessage: "سيتواصل معك الفريق لتأكيد التوفر. لم يتم تأكيد موعدك بعد.",
		another: "إرسال طلب آخر",
		error: "تعذّر إرسال الطلب. حاول مرة أخرى أو اتصل بالعيادة.",
		address: "طريقك إلينا",
		hours: "وقت يناسبك",
		weekdays: "الأحد – الخميس",
		saturday: "السبت",
		friday: "الجمعة",
		closed: "مغلق",
		map: "نراك في عبدون",
		mapDescription: "معاينة خريطة · موقع توضيحي للعيادة",
		openMap: "افتح خرائط Google",
		mapTitle: "خريطة المنطقة التوضيحية للعيادة في عبدون، عمّان",
		loadMap: "تحميل الخريطة التفاعلية",
		phoneHint: "هاتف أردني محمول أو أرضي، يبدأ بـ ‎+962 أو 0.",
		required: "الحقول المعلّمة بـ * مطلوبة."
	},
	validation: {
		name: "أدخل اسمك (من حرفين إلى ٨٠ حرفًا).",
		phone: "أدخل رقمًا أردنيًا صحيحًا، مثل ‎+962 79 123 4567.",
		date: "اختر موعدًا متاحًا خلال {{days}} يومًا القادمة. الجمعة عطلة.",
		service: "اختر الخدمة المطلوبة.",
		message: "يرجى ألّا تتجاوز رسالتك ١٠٠٠ حرف."
	},
	footer: {
		description: "عناية مدروسة بأسنانك في قلب عمّان. هنا من أجل صحتك وثقتك وكل ابتسامة في الطريق.",
		links: "أهلًا بك في لوما",
		connect: "لنبقَ على تواصل",
		copyright: "© {{year}} {{name}}. جميع الحقوق محفوظة.",
		crafted: "القليل من الاهتمام يصنع الفرق.",
		demo: "موقع تجريبي. هوية العيادة والمؤهلات والإحصاءات والآراء والأسعار وبيانات الاتصال توضيحية، وتُستبدل قبل النشر."
	},
	seo: {
		title: "لوما لطب الأسنان | عناية مدروسة في عمّان",
		description: "اكتشف تجربة أكثر هدوءًا للعناية بأسنانك في لوما، عبدون، عمّان. تعرّف على طبيبتك وخدماتنا واطلب موعدك."
	}
};
// src/i18n/en.ts
var en = {
	clinic: localizedClinic("en"),
	common: {
		book: "Book Appointment",
		bookShort: "Book Now",
		whatsapp: "WhatsApp us",
		call: "Call the clinic",
		learnMore: "Explore our care",
		allServices: "Find your treatment",
		readMore: "Meet your dentist",
		close: "Close menu",
		menu: "Open menu",
		language: "العربية",
		languageLabel: "Switch to Arabic",
		light: "Switch to light mode",
		dark: "Switch to dark mode",
		skip: "Skip to main content",
		currency: "JOD",
		from: "Starting from",
		quote: "Get a quote",
		next: "Next review",
		previous: "Previous review",
		stars: "{{count}} out of 5 stars",
		instagram: "Instagram",
		facebook: "Facebook"
	},
	nav: {
		home: "Home",
		about: "Our doctor",
		services: "Our care",
		results: "Smiles",
		reviews: "Kind words",
		faq: "FAQ",
		contact: "Visit us"
	},
	hero: {
		eyebrow: "THOUGHTFUL DENTISTRY. RIGHT HERE IN AMMAN.",
		title: "A healthy smile.",
		accent: "A brighter you.",
		description: "Expert care, a gentle touch, and a space that feels like a deep breath. Discover dentistry made for you.",
		experience: "years of care",
		patients: "happy smiles",
		rating: "patient rating",
		imageAlt: "Bright, welcoming dental treatment room with modern equipment — stock clinic image",
		badge: "Your smile is in good hands",
		badgeDetail: "Personal care. Lasting confidence.",
		open: "A little nervous? That’s okay.",
		openDetail: "We’ll take it one step at a time.",
		note: "A fresh approach to feeling good.",
		location: "ABDOUN, AMMAN"
	},
	trust: {
		label: "GREAT CARE STARTS WITH HIGH STANDARDS",
		association: "Jordan Dental Association",
		digital: "Digital dentistry",
		sterilization: "Careful sterilization",
		care: "Patient-first care",
		demo: "Illustrative credentials · subject to clinic verification"
	},
	about: {
		eyebrow: "A PERSON BEHIND EVERY SMILE",
		title: "Your dentist.",
		accent: "Your partner in care.",
		imageAlt: "Healthcare professional in a bright clinic — stock portrait, replace with the treating dentist",
		caption: "A familiar face. A gentler experience.",
		note: "Example doctor profile and credentials. Stock portrait.",
		signature: "With care,",
		badge: "Here for you, every step."
	},
	services: {
		eyebrow: "A LITTLE CARE GOES A LONG WAY",
		title: "Every smile is different.",
		accent: "Your care should be, too.",
		description: "From everyday essentials to a fresh start for your smile, find thoughtful care under one roof.",
		checkup: {
			title: "Checkups & cleaning",
			description: "A healthy foundation, with thorough checkups and a refreshingly clean smile.",
			detail: "YOUR EVERYDAY ESSENTIALS"
		},
		whitening: {
			title: "Teeth whitening",
			description: "A brighter, naturally confident smile with a plan tailored to you."
		},
		implants: {
			title: "Dental implants",
			description: "Explore carefully planned options for replacing missing teeth."
		},
		orthodontics: {
			title: "Braces & clear aligners",
			description: "Find your alignment with discreet options and personal guidance."
		},
		veneers: {
			title: "Veneers & smile design",
			description: "Thoughtfully designed details for a smile that still feels like you."
		},
		rootCanal: {
			title: "Root canal care",
			description: "Focused, gentle care to help preserve your natural teeth."
		},
		pediatric: {
			title: "Little smiles",
			description: "Friendly visits that help little ones build healthy habits for life."
		},
		emergency: {
			title: "Emergency care",
			description: "Unexpected tooth trouble? Call during clinic hours for the next available visit."
		},
		cta: "Not sure where to start?",
		ctaDetail: "Let’s talk. We’ll help you find the right care."
	},
	why: {
		eyebrow: "THE LUMA DIFFERENCE",
		title: "Good dentistry.",
		accent: "Even better peace of mind.",
		description: "It’s the little things that make you feel at home. And the thoughtful details that make a difference to your care.",
		items: [
			{
				title: "Modern, considered care",
				description: "Digital imaging and carefully selected technology for informed treatment planning."
			},
			{
				title: "Comfort comes first",
				description: "A gentle approach, time to pause, and comfort options explained before we begin."
			},
			{
				title: "Care in every detail",
				description: "Clear hygiene routines and attention to sterilization at every appointment."
			},
			{
				title: "Made for your schedule",
				description: "Evening and Saturday appointments, with time set aside just for you."
			}
		],
		experience: "Years of experience",
		patients: "Smiles cared for",
		rating: "Patient rating",
		note: "Illustrative clinic statistics",
		imageAlt: "Thoughtfully designed bright clinic interior — stock photo"
	},
	results: {
		eyebrow: "SMALL CHANGES. BEAUTIFUL POSSIBILITIES.",
		title: "A smile can",
		accent: "change everything.",
		description: "Explore an illustrative whitening comparison. Your consultation is where we discuss what’s possible for your own smile.",
		before: "Before",
		after: "After",
		slider: "Reveal the whitening comparison",
		hint: "Drag to explore · or use the arrow keys",
		disclaimer: "Illustration only, not a patient result. Outcomes vary and require a clinical assessment.",
		beforeAlt: "Illustrated smile before cosmetic whitening",
		afterAlt: "Illustrated smile after cosmetic whitening",
		tag: "A LITTLE BRIGHTER. STILL YOU."
	},
	journey: {
		eyebrow: "SIMPLE FROM THE VERY START",
		title: "Your next chapter.",
		accent: "Four easy steps.",
		steps: [
			{
				title: "Say hello",
				description: "Choose a time that works for you. We’ll take care of the details."
			},
			{
				title: "Let’s get to know you",
				description: "We listen, take a look, and talk through your options together."
			},
			{
				title: "Care, at your pace",
				description: "A personal treatment plan, with your comfort at the center."
			},
			{
				title: "Keep on smiling",
				description: "Helpful aftercare and follow-ups to keep your smile on track."
			}
		]
	},
	reviews: {
		eyebrow: "KIND WORDS, HAPPY SMILES",
		title: "A little love",
		accent: "from our patients.",
		description: "The most meaningful part of our work is how you feel when you leave.",
		note: "Illustrative patient stories, not verified reviews.",
		counter: "Review {{current}} of {{total}}",
		rating: "{{rating}} / 5",
		count: "{{count}}+ patient reviews"
	},
	pricing: {
		eyebrow: "CLEAR CARE. CLEAR PRICING.",
		title: "A good place",
		accent: "to start.",
		description: "A little clarity before your first visit. We’ll confirm a personalized estimate after your consultation.",
		featured: "A brighter favorite",
		checkup: "Examination & routine cleaning",
		whitening: "In-clinic whitening consultation & treatment",
		orthodontics: "Orthodontic consultation, not a full course of treatment",
		note: "Illustrative starting prices in Jordanian dinars. Final fees depend on assessment and treatment needs."
	},
	faq: {
		eyebrow: "A FEW THINGS YOU MIGHT BE WONDERING",
		title: "Let’s put your",
		accent: "mind at ease.",
		description: "A little information can make your next visit feel a lot easier.",
		items: [
			{
				question: "Can I use my dental insurance?",
				answer: "Please contact the clinic with your provider and plan details. The team will help you check eligibility and explain any expected costs before treatment. Coverage depends on your policy."
			},
			{
				question: "I’m nervous about dental treatment. Can you help?",
				answer: "Absolutely. Tell us how you’re feeling when you book. Your dentist will explain each step, discuss suitable comfort options, and agree on pauses with you. We’ll go at a pace that feels manageable."
			},
			{
				question: "What should I bring to my first visit?",
				answer: "Bring your ID, any insurance details, and a list of medicines or relevant dental records. Allow time for a conversation, an examination, and a discussion of your care plan."
			},
			{
				question: "Which payment methods are available?",
				answer: "The example clinic accepts cash and major cards. Contact the team to confirm available payment methods and ask about payment arrangements before your appointment."
			},
			{
				question: "What if I need an urgent appointment?",
				answer: "Call the clinic during opening hours so the team can check the earliest available appointment. The website form is not monitored as an emergency service."
			},
			{
				question: "Are Saturday appointments available?",
				answer: "Yes, when Saturday hours are enabled in the clinic schedule. Send a request or call to confirm availability. The clinic is closed on Fridays."
			}
		]
	},
	contact: {
		eyebrow: "YOUR NEXT SMILE STARTS HERE",
		title: "Let’s make time",
		accent: "for your smile.",
		description: "Tell us a little about yourself. Our team will get in touch to find a time that works for you.",
		formTitle: "A little hello. A fresh start.",
		formDescription: "Request your appointment below.",
		name: "Full name",
		namePlaceholder: "Your name",
		phone: "Phone number",
		phonePlaceholder: "+962 7X XXX XXXX",
		date: "Preferred date",
		service: "How can we help?",
		servicePlaceholder: "Choose a treatment",
		message: "Anything you’d like us to know?",
		messagePlaceholder: "Tell us what’s on your mind…",
		optional: "(optional)",
		submit: "Request Appointment",
		submitting: "Sending your request…",
		privacy: "Your details are used only to respond to your appointment request.",
		demo: "Demo form: requests are simulated and no appointment is booked.",
		successTitle: "Your demo request is complete.",
		successMessage: "Thank you for trying the booking experience. No data was sent to a clinic and no appointment has been booked.",
		liveSuccessTitle: "Your request is on its way.",
		liveSuccessMessage: "The clinic will contact you to confirm availability. Your appointment is not confirmed yet.",
		another: "Send another request",
		error: "We couldn’t send your request. Please try again or call the clinic.",
		address: "Find your way to us",
		hours: "A time that works for you",
		weekdays: "Sunday – Thursday",
		saturday: "Saturday",
		friday: "Friday",
		closed: "Closed",
		map: "See you in Abdoun",
		mapDescription: "Map preview · example clinic location",
		openMap: "Open in Google Maps",
		mapTitle: "Map of the example clinic area in Abdoun, Amman",
		loadMap: "Load interactive map",
		phoneHint: "Jordanian mobile or landline, starting with +962 or 0.",
		required: "Fields marked * are required."
	},
	validation: {
		name: "Enter your name (2–80 characters).",
		phone: "Enter a valid Jordanian number, for example +962 79 123 4567.",
		date: "Choose an available date within the next {{days}} days. Fridays are closed.",
		service: "Choose a treatment.",
		message: "Please keep your message under 1,000 characters."
	},
	footer: {
		description: "Thoughtful dentistry in the heart of Amman. Here for your health, your confidence, and every smile in between.",
		links: "Make yourself at home",
		connect: "Stay connected",
		copyright: "© {{year}} {{name}}. All rights reserved.",
		crafted: "A little care makes a difference.",
		demo: "Demonstration website. Clinic identity, credentials, statistics, reviews, prices, and contact details are illustrative. Replace before publication."
	},
	seo: {
		title: "Luma Dental | Thoughtful Dental Care in Amman",
		description: "Discover a calmer kind of dental care at Luma Dental in Abdoun, Amman. Explore treatments, meet your dentist, and request an appointment."
	}
};
// src/i18n/index.ts
var language = readPreference("luma-language") === "en" ? "en" : "ar";
function applyLanguage(lang) {
	document.documentElement.lang = lang;
	document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
	writePreference("luma-language", lang);
}
applyLanguage(language);
i18n.use(initReactI18next).init({
	resources: {
		en: { translation: en },
		ar: { translation: ar }
	},
	lng: language,
	fallbackLng: "ar",
	interpolation: { escapeValue: false }
});
i18n.on("languageChanged", applyLanguage);
var i18n_default = i18n;
export { App, Button as a, Container as c, Section as d, SectionHeading as f, BookLink as i, i18n_default as i18n, DirectionArrow as l, phoneHref as n, ButtonLink as o, whatsappHref as r, Card as s, clinic as t, Reveal as u };
