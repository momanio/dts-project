import type { ClinicConfig, Locale } from "../types/clinic.ts";

// DEMO CONTENT: replace all names, claims, contact details, prices, and stock images
// with clinic-approved information before publishing. No real patient data is used.
export const clinic: ClinicConfig = {
  name: { en: "Dental", ar: " لطب الأسنان" },
  tagline: {
    en: "A little care. A brighter smile.",
    ar: "عناية تستحقها. وابتسامة تحبّها.",
  },
  phone: "+96265550140",
  whatsapp: "+962796854546",
  email: "hello@example.com",
  website: "https://example.com",
  address: {
    street: {
      en: "24 Zahran Street, 3rd floor",
      ar: "شارع زهران ٢٤، الطابق الثالث",
    },
    area: { en: "Abdoun, Amman", ar: "عبدون، عمّان" },
    city: { en: "Amman", ar: "عمّان" },
    country: "JO",
  },
  geo: { lat: 31.9496, lng: 35.8838 },
  hours: {
    weekdays: { opens: "09:00", closes: "19:00" },
    saturday: { opens: "10:00", closes: "15:00" },
  },
  doctor: {
    name: { en: "Dr Mahmoud Hamasha", ar: "د. محمود حماشة" },
    role: { en: "General & Cosmetic Dentist", ar: "طبيب أسنان عامة وتجميلية" },
    bio: {
      en: "Good dentistry starts with listening. Dr Mahmoud Hamasha brings a thoughtful, personal approach to every visit, taking the time to understand your needs and help you feel comfortable, informed, and in control of your care.",
      ar: "تبدأ العناية الجيدة بالاستماع. يمنحك الدكتور محمود حماشة الوقت والاهتمام لفهم احتياجاتك، ويشرح لك خياراتك بوضوح لتشعر بالراحة والثقة في كل خطوة من رحلتك العلاجية.",
    },
    quote: {
      en: "The best part of my day? Seeing you smile with confidence again.",
      ar: "أجمل لحظة في يومي؟ أن أراك تبتسم بثقة من جديد.",
    },
    qualifications: [
      {
        en: "DDS, University of Jordan",
        ar: "بكالوريوس طب الأسنان، الجامعة الأردنية",
      },
      {
        en: "Member, Jordan Dental Association",
        ar: "عضو نقابة أطباء الأسنان الأردنية",
      },
      {
        en: "Focus on restorative & aesthetic dentistry",
        ar: "اهتمام بطب الأسنان الترميمي والتجميلي",
      },
    ],
  },
  stats: { experience: 12, patients: 2500, rating: 4.9, reviews: 180 },
  services: [
    "checkup",
    "whitening",
    "implants",
    "orthodontics",
    "veneers",
    "rootCanal",
    "pediatric",
    "emergency",
  ],
  packages: [
    { service: "checkup", price: 35 },
    { service: "whitening", price: 150, featured: true },
    { service: "orthodontics", price: 50 },
  ],
  testimonials: [
    {
      name: { en: "Sarah A.", ar: "سارة أ." },
      service: "whitening",
      quote: {
        en: "From the warm welcome to the little details, everything felt so considered. Dr Mahmoud Hamasha explained every step. For the first time, I actually look forward to my dental visits.",
        ar: "من الترحيب الجميل إلى أدق التفاصيل، شعرت أن كل شيء صُمّم لراحتي. شرح لي الدكتور محمود حماشة كل خطوة. لأول مرة، أصبحت أتطلّع لزيارتي لطبيب الأسنان.",
      },
      rating: 5,
    },
    {
      name: { en: "Omar K.", ar: "عمر ك." },
      service: "checkup",
      quote: {
        en: "A calm space, a kind team, and no rush. I left knowing exactly what my teeth needed and what my options were. That peace of mind makes all the difference.",
        ar: "مكان هادئ وفريق لطيف، دون أي استعجال. خرجت وأنا أعرف تمامًا ما تحتاجه أسناني وما هي الخيارات المتاحة. راحة البال هذه تصنع كل الفرق.",
      },
      rating: 5,
    },
    {
      name: { en: "Rana M.", ar: "رنا م." },
      service: "pediatric",
      quote: {
        en: "My daughter was nervous about her first visit, but the team made her feel completely at ease. Patient, gentle, and so good with little ones.",
        ar: "كانت ابنتي متوترة قبل زيارتها الأولى، لكن الفريق جعلها تشعر بالاطمئنان. صبر ولطف وتعامل رائع مع الأطفال.",
      },
      rating: 5,
    },
  ],
  socials: {
    instagram: "https://www.instagram.com/",
    facebook: "https://www.facebook.com/",
  },
  images: {
    hero: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=80&fm=webp",
    // Local Unsplash portrait: photo-1622253692010-333f2da6031d.
    doctor: "/images/doctor-male.webp",
    clinic:
      "https://images.unsplash.com/photo-1629909615957-be38d48fbbe6?auto=format&fit=crop&w=900&q=80&fm=webp",
    before: "/images/smile-before.svg",
    after: "/images/smile-after.svg",
  },
  booking: { endpoint: "", maxDaysAhead: 90 },
};

export const phoneHref = `tel:${clinic.phone}`;
export const whatsappHref = `https://wa.me/${clinic.whatsapp.replace(/\D/g, "")}`;

export function localizedClinic(locale: Locale) {
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
      quote: item.quote[locale],
    })),
  };
}
