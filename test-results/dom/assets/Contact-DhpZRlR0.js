import { a as Button, c as Container, d as Section, f as SectionHeading, l as DirectionArrow, n as phoneHref, o as ButtonLink, r as whatsappHref, s as Card, t as clinic } from "../dom-entry.js";
import { useEffect, useRef, useState } from "react";
import { Check, Clock3, LoaderCircle, LockKeyhole, MapPin, MessageCircle, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Fragment, jsxDEV } from "react/jsx-dev-runtime";
import { useForm } from "react-hook-form";
import { z } from "zod";
// src/lib/booking.ts
function clinicToday() {
	return new Intl.DateTimeFormat("en-CA", {
		timeZone: "Asia/Amman",
		year: "numeric",
		month: "2-digit",
		day: "2-digit"
	}).format(/* @__PURE__ */ new Date());
}
function maximumBookingDate() {
	const date = /* @__PURE__ */ new Date(`${clinicToday()}T12:00:00Z`);
	date.setUTCDate(date.getUTCDate() + clinic.booking.maxDaysAhead);
	return date.toISOString().slice(0, 10);
}
function normalizePhone(value) {
	const cleaned = value.replace(/[٠-٩]/g, (digit) => String(digit.charCodeAt(0) - 1632)).replace(/[۰-۹]/g, (digit) => String(digit.charCodeAt(0) - 1776)).replace(/[\s()-]/g, "");
	return cleaned.startsWith("00962") ? `+${cleaned.slice(2)}` : cleaned.startsWith("0") ? `+962${cleaned.slice(1)}` : cleaned;
}
function isAvailableDate(value) {
	if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
	const date = /* @__PURE__ */ new Date(`${value}T12:00:00Z`);
	if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value) return false;
	return value >= clinicToday() && value <= maximumBookingDate() && date.getUTCDay() !== 5 && (date.getUTCDay() !== 6 || clinic.hours.saturday !== null);
}
var bookingSchema = z.object({
	name: z.string().trim().min(2, "name").max(80, "name"),
	phone: z.string().refine((value) => /^\+962(?:7[789]\d{7}|[2356]\d{7})$/.test(normalizePhone(value)), "phone"),
	date: z.string().refine(isAvailableDate, "date"),
	service: z.string().refine((value) => clinic.services.some((service) => service === value), "service"),
	message: z.string().max(1e3, "message")
});
async function submitAppointment(values) {
	const parsed = bookingSchema.parse(values);
	if (!clinic.booking.endpoint) {
		await new Promise((resolve) => window.setTimeout(resolve, 800));
		return { demo: true };
	}
	if (!(await fetch(clinic.booking.endpoint, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			...parsed,
			phone: normalizePhone(parsed.phone),
			timezone: "Asia/Amman"
		}),
		signal: AbortSignal.timeout(15e3)
	})).ok) throw new Error("Appointment request failed");
	return { demo: false };
}
// src/sections/Contact.tsx
var _jsxFileName = "/home/omar/Projects/dts-project/src/sections/Contact.tsx";
var resolver = async (values) => {
	const result = bookingSchema.safeParse(values);
	if (result.success) return {
		values: result.data,
		errors: {}
	};
	const errors = {};
	for (const issue of result.error.issues) {
		const field = issue.path[0];
		if (typeof field === "string" && field in values && !errors[field]) errors[field] = {
			type: issue.code,
			message: issue.message
		};
	}
	return {
		values: {},
		errors
	};
};
function Contact() {
	const { t } = useTranslation();
	const [success, setSuccess] = useState(null);
	const [failed, setFailed] = useState(false);
	const [showMap, setShowMap] = useState(false);
	const successRef = useRef(null);
	const { register, handleSubmit, reset, setValue, formState: { errors, isSubmitting } } = useForm({
		resolver,
		defaultValues: {
			name: "",
			phone: "",
			date: "",
			service: "",
			message: ""
		}
	});
	useEffect(() => {
		const selectService = (event) => {
			if (event instanceof CustomEvent && typeof event.detail === "string" && clinic.services.some((service) => service === event.detail)) {
				setValue("service", event.detail, { shouldValidate: true });
				setSuccess(null);
			}
		};
		window.addEventListener("luma:service", selectService);
		return () => window.removeEventListener("luma:service", selectService);
	}, [setValue]);
	useEffect(() => {
		if (success) successRef.current?.focus();
	}, [success]);
	const submit = handleSubmit(async (values) => {
		setFailed(false);
		try {
			setSuccess(await submitAppointment(values));
			reset();
		} catch {
			setFailed(true);
		}
	});
	const error = (field) => errors[field] ? /* @__PURE__ */ jsxDEV("p", {
		id: `${field}-error`,
		role: "alert",
		className: "mt-2 text-xs leading-5 text-red-700 dark:text-red-300",
		children: t(`validation.${field}`, { days: clinic.booking.maxDaysAhead })
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 88,
		columnNumber: 7
	}, this) : null;
	const fieldProps = (field) => ({
		id: field,
		"aria-invalid": !!errors[field],
		"aria-describedby": errors[field] ? `${field}-error` : field === "phone" ? "phone-hint" : void 0
	});
	const mapUrl = `https://www.google.com/maps?q=${clinic.geo.lat},${clinic.geo.lng}&z=15`;
	return /* @__PURE__ */ jsxDEV(Section, {
		id: "contact",
		className: "bg-soft/60",
		children: /* @__PURE__ */ jsxDEV(Container, { children: [/* @__PURE__ */ jsxDEV("div", {
			className: "grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20",
			children: [/* @__PURE__ */ jsxDEV("div", { children: [/* @__PURE__ */ jsxDEV(SectionHeading, {
				section: "contact",
				description: true
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 111,
				columnNumber: 13
			}, this), /* @__PURE__ */ jsxDEV("div", {
				className: "mt-10 space-y-7",
				children: [
					/* @__PURE__ */ jsxDEV("div", {
						className: "flex items-start gap-4",
						children: [/* @__PURE__ */ jsxDEV("span", {
							className: "flex size-10 shrink-0 items-center justify-center rounded-xl border border-line bg-surface",
							children: /* @__PURE__ */ jsxDEV(MapPin, {
								className: "size-5 text-primary",
								strokeWidth: 1.5,
								"aria-hidden": "true"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 115,
								columnNumber: 19
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 114,
							columnNumber: 17
						}, this), /* @__PURE__ */ jsxDEV("div", { children: [/* @__PURE__ */ jsxDEV("h3", {
							className: "text-sm font-semibold",
							children: t("contact.address")
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 118,
							columnNumber: 19
						}, this), /* @__PURE__ */ jsxDEV("address", {
							className: "mt-2 text-sm leading-7 text-muted not-italic",
							children: [
								t("clinic.street"),
								/* @__PURE__ */ jsxDEV("br", {}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 121,
									columnNumber: 21
								}, this),
								t("clinic.area")
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 119,
							columnNumber: 19
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 117,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 113,
						columnNumber: 15
					}, this),
					/* @__PURE__ */ jsxDEV("div", {
						className: "flex items-start gap-4",
						children: [/* @__PURE__ */ jsxDEV("span", {
							className: "flex size-10 shrink-0 items-center justify-center rounded-xl border border-line bg-surface",
							children: /* @__PURE__ */ jsxDEV(Clock3, {
								className: "size-5 text-primary",
								strokeWidth: 1.5,
								"aria-hidden": "true"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 128,
								columnNumber: 19
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 127,
							columnNumber: 17
						}, this), /* @__PURE__ */ jsxDEV("div", {
							className: "w-full max-w-xs",
							children: [/* @__PURE__ */ jsxDEV("h3", {
								className: "text-sm font-semibold",
								children: t("contact.hours")
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 131,
								columnNumber: 19
							}, this), /* @__PURE__ */ jsxDEV("dl", {
								className: "mt-2 space-y-2 text-xs leading-6 text-muted",
								children: [
									/* @__PURE__ */ jsxDEV("div", {
										className: "flex justify-between gap-4",
										children: [/* @__PURE__ */ jsxDEV("dt", { children: t("contact.weekdays") }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 134,
											columnNumber: 23
										}, this), /* @__PURE__ */ jsxDEV("dd", {
											dir: "ltr",
											children: [
												clinic.hours.weekdays.opens,
												" – ",
												clinic.hours.weekdays.closes
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 135,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 133,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ jsxDEV("div", {
										className: "flex justify-between gap-4",
										children: [/* @__PURE__ */ jsxDEV("dt", { children: t("contact.saturday") }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 140,
											columnNumber: 23
										}, this), /* @__PURE__ */ jsxDEV("dd", { children: clinic.hours.saturday ? /* @__PURE__ */ jsxDEV("span", {
											dir: "ltr",
											children: [
												clinic.hours.saturday.opens,
												" – ",
												clinic.hours.saturday.closes
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 143,
											columnNumber: 27
										}, this) : t("contact.closed") }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 141,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 139,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ jsxDEV("div", {
										className: "flex justify-between gap-4",
										children: [/* @__PURE__ */ jsxDEV("dt", { children: t("contact.friday") }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 152,
											columnNumber: 23
										}, this), /* @__PURE__ */ jsxDEV("dd", { children: t("contact.closed") }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 153,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 151,
										columnNumber: 21
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 132,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 130,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 126,
						columnNumber: 15
					}, this),
					/* @__PURE__ */ jsxDEV("div", {
						className: "flex flex-wrap items-center gap-3",
						children: [/* @__PURE__ */ jsxDEV(ButtonLink, {
							href: phoneHref,
							variant: "secondary",
							children: [/* @__PURE__ */ jsxDEV(Phone, {
								className: "size-4",
								"aria-hidden": "true"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 160,
								columnNumber: 19
							}, this), /* @__PURE__ */ jsxDEV("bdi", { children: clinic.phone }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 161,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 159,
							columnNumber: 17
						}, this), /* @__PURE__ */ jsxDEV("a", {
							href: whatsappHref,
							target: "_blank",
							rel: "noopener noreferrer",
							className: "inline-flex min-h-11 items-center gap-2 px-2 text-xs font-semibold text-primary",
							children: [/* @__PURE__ */ jsxDEV(MessageCircle, {
								className: "size-4",
								"aria-hidden": "true"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 169,
								columnNumber: 19
							}, this), t("common.whatsapp")]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 163,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 158,
						columnNumber: 15
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 112,
				columnNumber: 13
			}, this)] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 110,
				columnNumber: 11
			}, this), /* @__PURE__ */ jsxDEV(Card, {
				className: "p-6 shadow-lg shadow-deep/3 sm:p-9",
				children: success ? /* @__PURE__ */ jsxDEV("div", {
					ref: successRef,
					tabIndex: -1,
					role: "status",
					className: "flex min-h-[560px] flex-col items-center justify-center text-center",
					children: [
						/* @__PURE__ */ jsxDEV("span", {
							className: "mb-6 flex size-16 items-center justify-center rounded-full bg-soft text-primary",
							children: /* @__PURE__ */ jsxDEV(Check, {
								className: "size-8",
								"aria-hidden": "true"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 184,
								columnNumber: 19
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 183,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ jsxDEV("h3", {
							className: "font-display text-3xl",
							children: t(success.demo ? "contact.successTitle" : "contact.liveSuccessTitle")
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 186,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ jsxDEV("p", {
							className: "my-6 max-w-sm text-sm leading-7 text-muted",
							children: t(success.demo ? "contact.successMessage" : "contact.liveSuccessMessage")
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 189,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ jsxDEV(Button, {
							type: "button",
							onClick: () => {
								setSuccess(null);
								setFailed(false);
							},
							children: t("contact.another")
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 192,
							columnNumber: 17
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 177,
					columnNumber: 15
				}, this) : /* @__PURE__ */ jsxDEV("form", {
					noValidate: true,
					onSubmit: (event) => void submit(event),
					"aria-label": t("contact.formTitle"),
					children: [
						/* @__PURE__ */ jsxDEV("h3", {
							className: "font-display text-3xl",
							children: t("contact.formTitle")
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 208,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ jsxDEV("p", {
							className: "mt-2 text-xs leading-6 text-muted",
							children: [
								t("contact.formDescription"),
								" ",
								t("contact.required")
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 209,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ jsxDEV("div", {
							className: "mt-7 grid gap-5 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ jsxDEV("div", { children: [
									/* @__PURE__ */ jsxDEV("label", {
										htmlFor: "name",
										className: "mb-2 block text-xs font-medium",
										children: [t("contact.name"), " *"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 214,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ jsxDEV("input", {
										...register("name"),
										...fieldProps("name"),
										autoComplete: "name",
										maxLength: 80,
										placeholder: t("contact.namePlaceholder"),
										className: "field",
										required: true
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 217,
										columnNumber: 21
									}, this),
									error("name")
								] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 213,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ jsxDEV("div", { children: [
									/* @__PURE__ */ jsxDEV("label", {
										htmlFor: "phone",
										className: "mb-2 block text-xs font-medium",
										children: [t("contact.phone"), " *"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 229,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ jsxDEV("input", {
										...register("phone"),
										...fieldProps("phone"),
										type: "tel",
										dir: "ltr",
										autoComplete: "tel",
										maxLength: 25,
										placeholder: t("contact.phonePlaceholder"),
										className: "field",
										required: true
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 232,
										columnNumber: 21
									}, this),
									error("phone"),
									/* @__PURE__ */ jsxDEV("p", {
										id: "phone-hint",
										className: "mt-1.5 text-[10px] leading-5 text-muted",
										children: t("contact.phoneHint")
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 244,
										columnNumber: 21
									}, this)
								] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 228,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ jsxDEV("div", { children: [
									/* @__PURE__ */ jsxDEV("label", {
										htmlFor: "date",
										className: "mb-2 block text-xs font-medium",
										children: [t("contact.date"), " *"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 249,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ jsxDEV("input", {
										...register("date"),
										...fieldProps("date"),
										type: "date",
										min: clinicToday(),
										max: maximumBookingDate(),
										className: "field min-h-12",
										required: true
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 252,
										columnNumber: 21
									}, this),
									error("date")
								] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 248,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ jsxDEV("div", { children: [
									/* @__PURE__ */ jsxDEV("label", {
										htmlFor: "service",
										className: "mb-2 block text-xs font-medium",
										children: [t("contact.service"), " *"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 264,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ jsxDEV("select", {
										...register("service"),
										...fieldProps("service"),
										className: "field min-h-12",
										required: true,
										children: [/* @__PURE__ */ jsxDEV("option", {
											value: "",
											children: t("contact.servicePlaceholder")
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 273,
											columnNumber: 23
										}, this), clinic.services.map((service) => /* @__PURE__ */ jsxDEV("option", {
											value: service,
											children: t(`services.${service}.title`)
										}, service, false, {
											fileName: _jsxFileName,
											lineNumber: 275,
											columnNumber: 25
										}, this))]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 267,
										columnNumber: 21
									}, this),
									error("service")
								] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 263,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ jsxDEV("div", {
									className: "sm:col-span-2",
									children: [
										/* @__PURE__ */ jsxDEV("label", {
											htmlFor: "message",
											className: "mb-2 block text-xs font-medium",
											children: [
												t("contact.message"),
												" ",
												/* @__PURE__ */ jsxDEV("span", {
													className: "font-normal text-muted",
													children: t("contact.optional")
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 285,
													columnNumber: 23
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 283,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ jsxDEV("textarea", {
											...register("message"),
											...fieldProps("message"),
											rows: 3,
											maxLength: 1e3,
											placeholder: t("contact.messagePlaceholder"),
											className: "field resize-y"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 287,
											columnNumber: 21
										}, this),
										error("message")
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 282,
									columnNumber: 19
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 212,
							columnNumber: 17
						}, this),
						failed && /* @__PURE__ */ jsxDEV("p", {
							role: "alert",
							className: "mt-4 rounded-xl bg-red-50 p-3 text-xs leading-6 text-red-800 dark:bg-red-950 dark:text-red-200",
							children: t("contact.error")
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 299,
							columnNumber: 19
						}, this),
						/* @__PURE__ */ jsxDEV(Button, {
							type: "submit",
							disabled: isSubmitting,
							className: "mt-5 w-full",
							children: isSubmitting ? /* @__PURE__ */ jsxDEV(Fragment, { children: [/* @__PURE__ */ jsxDEV(LoaderCircle, {
								className: "size-4 animate-spin",
								"aria-hidden": "true"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 309,
								columnNumber: 23
							}, this), t("contact.submitting")] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 308,
								columnNumber: 21
							}, this) : /* @__PURE__ */ jsxDEV(Fragment, { children: [t("contact.submit"), /* @__PURE__ */ jsxDEV(DirectionArrow, {}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 315,
								columnNumber: 23
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 313,
								columnNumber: 21
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 306,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ jsxDEV("p", {
							className: "mt-4 flex items-start justify-center gap-2 text-center text-[10px] leading-5 text-muted",
							children: [/* @__PURE__ */ jsxDEV(LockKeyhole, {
								className: "mt-1 size-3 shrink-0",
								"aria-hidden": "true"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 320,
								columnNumber: 19
							}, this), t("contact.privacy")]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 319,
							columnNumber: 17
						}, this),
						!clinic.booking.endpoint && /* @__PURE__ */ jsxDEV("p", {
							className: "mt-3 rounded-lg bg-soft px-3 py-2 text-center text-[10px] leading-5 text-muted",
							children: t("contact.demo")
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 324,
							columnNumber: 19
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 203,
					columnNumber: 15
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 175,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 109,
			columnNumber: 9
		}, this), /* @__PURE__ */ jsxDEV("div", {
			className: "relative mt-12 overflow-hidden rounded-3xl border border-line bg-soft",
			children: [showMap ? /* @__PURE__ */ jsxDEV("iframe", {
				src: `${mapUrl}&output=embed`,
				title: t("contact.mapTitle"),
				loading: "lazy",
				referrerPolicy: "no-referrer-when-downgrade",
				className: "h-72 w-full border-0",
				allowFullScreen: true
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 334,
				columnNumber: 13
			}, this) : /* @__PURE__ */ jsxDEV("div", {
				className: "relative flex min-h-64 items-center justify-center bg-[url('/images/map.svg')] bg-cover bg-center p-6",
				children: /* @__PURE__ */ jsxDEV("div", {
					className: "relative rounded-2xl border border-line bg-surface/95 px-8 py-6 text-center shadow-lg backdrop-blur",
					children: [
						/* @__PURE__ */ jsxDEV(MapPin, {
							className: "mx-auto mb-3 size-6 text-primary",
							strokeWidth: 1.5,
							"aria-hidden": "true"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 345,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ jsxDEV("h3", {
							className: "font-display text-2xl",
							children: t("contact.map")
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 350,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ jsxDEV("p", {
							className: "mb-4 mt-1 text-[10px] text-muted",
							children: t("contact.mapDescription")
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 351,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ jsxDEV(Button, {
							type: "button",
							variant: "secondary",
							onClick: () => setShowMap(true),
							className: "min-h-10 px-5 py-2 text-xs",
							children: t("contact.loadMap")
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 352,
							columnNumber: 17
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 344,
					columnNumber: 15
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 343,
				columnNumber: 13
			}, this), /* @__PURE__ */ jsxDEV("a", {
				href: mapUrl,
				target: "_blank",
				rel: "noopener noreferrer",
				className: "flex min-h-12 items-center justify-center gap-2 bg-surface p-3 text-xs font-medium text-primary",
				children: [t("contact.openMap"), /* @__PURE__ */ jsxDEV(DirectionArrow, {}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 370,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 363,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 332,
			columnNumber: 9
		}, this)] }, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 108,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 107,
		columnNumber: 5
	}, this);
}
export { Contact as default };
