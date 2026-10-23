import { c as Container, d as Section, f as SectionHeading, i as BookLink, t as clinic, u as Reveal } from "../dom-entry.js";
import { useState } from "react";
import { MoveHorizontal, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { jsxDEV } from "react/jsx-dev-runtime";
// src/sections/Results.tsx
var _jsxFileName = "/home/omar/Projects/dts-project/src/sections/Results.tsx";
function Results() {
	const { t } = useTranslation();
	const [position, setPosition] = useState(50);
	return /* @__PURE__ */ jsxDEV(Section, {
		id: "results",
		className: "border-y border-line bg-soft/50",
		children: /* @__PURE__ */ jsxDEV(Container, {
			className: "grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20",
			children: [/* @__PURE__ */ jsxDEV("div", { children: [
				/* @__PURE__ */ jsxDEV(SectionHeading, {
					section: "results",
					description: true
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 14,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ jsxDEV("div", {
					className: "mt-6 inline-flex items-center gap-2 rounded-full border border-line px-3 py-2 text-[9px] font-medium tracking-wide",
					children: [/* @__PURE__ */ jsxDEV(Sparkles, {
						className: "size-3.5 text-primary",
						"aria-hidden": "true"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 16,
						columnNumber: 13
					}, this), t("results.tag")]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 15,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ jsxDEV("div", {
					className: "mt-8",
					children: /* @__PURE__ */ jsxDEV(BookLink, {}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 20,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 19,
					columnNumber: 11
				}, this)
			] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 13,
				columnNumber: 9
			}, this), /* @__PURE__ */ jsxDEV(Reveal, { children: [
				/* @__PURE__ */ jsxDEV("div", {
					className: "relative isolate aspect-[4/3] overflow-hidden rounded-3xl bg-[#e6c1aa]",
					dir: "ltr",
					children: [
						/* @__PURE__ */ jsxDEV("img", {
							src: clinic.images.before,
							alt: t("results.beforeAlt"),
							width: "900",
							height: "675",
							loading: "lazy",
							className: "absolute inset-0 h-full w-full object-cover"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 28,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ jsxDEV("img", {
							src: clinic.images.after,
							alt: t("results.afterAlt"),
							width: "900",
							height: "675",
							loading: "lazy",
							className: "absolute inset-0 h-full w-full object-cover",
							style: { clipPath: `inset(0 ${100 - position}% 0 0)` }
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 36,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ jsxDEV("span", {
							className: "absolute start-5 top-5 rounded-full bg-white/95 px-4 py-2 text-xs font-medium text-deep",
							children: t("results.after")
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 45,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ jsxDEV("span", {
							className: "absolute end-5 top-5 rounded-full bg-white/95 px-4 py-2 text-xs font-medium text-deep",
							children: t("results.before")
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 48,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ jsxDEV("div", {
							className: "pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-xl",
							style: { left: `${position}%` },
							children: /* @__PURE__ */ jsxDEV("span", {
								className: "absolute top-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white/70 bg-primary text-primary-ink shadow-lg",
								children: /* @__PURE__ */ jsxDEV(MoveHorizontal, {
									className: "size-5",
									"aria-hidden": "true"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 56,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 55,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 51,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ jsxDEV("input", {
							type: "range",
							min: "0",
							max: "100",
							value: position,
							onChange: (event) => setPosition(Number(event.target.value)),
							"aria-label": t("results.slider"),
							"aria-valuetext": `${position}% ${t("results.after")}`,
							className: "absolute inset-0 h-full w-full cursor-ew-resize appearance-none bg-transparent opacity-0 focus:opacity-100 focus:outline-offset-[-6px] [&::-webkit-slider-thumb]:h-full [&::-webkit-slider-thumb]:w-1 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-transparent"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 59,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 24,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ jsxDEV("p", {
					className: "mt-4 flex items-center justify-center gap-2 text-xs text-muted",
					children: [/* @__PURE__ */ jsxDEV(MoveHorizontal, {
						className: "size-3.5",
						"aria-hidden": "true"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 71,
						columnNumber: 13
					}, this), t("results.hint")]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 70,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ jsxDEV("p", {
					className: "mx-auto mt-3 max-w-md text-center text-[10px] leading-5 text-muted",
					children: t("results.disclaimer")
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 74,
					columnNumber: 11
				}, this)
			] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 23,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 12,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 11,
		columnNumber: 5
	}, this);
}
export { Results as default };
