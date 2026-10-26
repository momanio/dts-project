import { useId } from 'react'
import { motion, useTransform } from 'motion/react'
import type { MotionValue } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { clinic } from '../config/clinic'
import { ClinicImage } from './ClinicImage'

const stops = [0, 0.3, 0.65, 0.85, 1]
const tooth =
  'M240 48C202 26 163 12 125 25C61 47 37 101 45 169C52 228 86 272 102 333C115 380 120 457 151 497C168 519 187 513 195 484C207 440 211 359 240 359C269 359 273 440 285 484C293 513 312 519 329 497C360 457 365 380 378 333C394 272 428 228 435 169C443 101 419 47 355 25C317 12 278 26 240 48Z'

export function DoctorPortrait({
  progress,
  animated,
}: {
  progress: MotionValue<number>
  animated: boolean
}) {
  const { t, i18n } = useTranslation()
  const id = useId()
  const direction = i18n.dir() === 'rtl' ? -1 : 1
  const travel = animated ? 1 : 0
  // Container units keep the word and smile inside their own scene at smaller desktop widths.
  // On a 720px scene these reach ~200px and ~140px respectively. No per-frame React state.
  const wordX = useTransform(
    progress,
    stops,
    [0, 14, 28, 28, 28].map((x) => `${x * direction * travel}cqw`),
  )
  const toothY = useTransform(
    progress,
    stops,
    [0, 60, 82, 64, 64].map((y) => y * travel),
  )
  const toothRotate = useTransform(
    progress,
    stops,
    [0, 1.5, 6, 6, 6].map((angle) => angle * direction * travel),
  )
  const portraitY = useTransform(
    progress,
    stops,
    [0, -80, -96, -80, -80].map((y) => y * travel),
  )
  const portraitScale = useTransform(
    progress,
    stops,
    [0, 0.025, 0.035, 0.02, 0.02].map((scale) => 1 + scale * travel),
  )
  const smileX = useTransform(
    progress,
    stops,
    [0, 7, 20, 17, 17].map((x) => `${x * direction * travel}cqw`),
  )
  const smileY = useTransform(
    progress,
    stops,
    [0, -8, -18, -12, -12].map((y) => y * travel),
  )

  return (
    <div className="doctor-scene">
      <motion.div className="doctor-scene__word" style={{ x: wordX }} aria-hidden="true">
        {t('about.sceneWord')}
      </motion.div>

      <motion.div className="doctor-scene__tooth" style={{ y: toothY }} aria-hidden="true">
        <motion.svg
          viewBox="0 0 480 560"
          fill="none"
          style={{ rotate: toothRotate }}
          focusable="false"
        >
          <defs>
            <linearGradient
              id={`${id}-porcelain`}
              x1="100"
              y1="60"
              x2="400"
              y2="450"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="var(--surface)" />
              <stop offset="0.48" stopColor="var(--soft)" />
              <stop offset="1" stopColor="var(--accent)" />
            </linearGradient>
            <radialGradient id={`${id}-glaze`} cx="0.3" cy="0.2" r="0.85">
              <stop stopColor="var(--surface)" stopOpacity="0.95" />
              <stop offset="0.65" stopColor="var(--surface)" stopOpacity="0" />
            </radialGradient>
            <linearGradient
              id={`${id}-edge`}
              x1="70"
              y1="60"
              x2="380"
              y2="500"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="var(--surface)" />
              <stop offset="1" stopColor="var(--primary)" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <path d={tooth} fill={`url(#${id}-porcelain)`} stroke="var(--line)" strokeWidth="1.5" />
          <path d={tooth} fill={`url(#${id}-glaze)`} />
          <path
            d="M240 65C196 40 163 29 128 41C74 59 53 107 61 167C68 222 100 269 116 327C132 385 137 459 160 489M321 489C350 446 351 383 368 325C385 266 414 224 420 171"
            stroke={`url(#${id}-edge)`}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M141 65C178 51 206 96 273 83M82 113C68 168 93 215 109 245"
            stroke="var(--surface)"
            strokeWidth="5"
            strokeLinecap="round"
            opacity="0.65"
          />
          <path
            d="M263 348C283 362 287 412 293 441"
            stroke="var(--primary)"
            strokeOpacity="0.13"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </motion.svg>
      </motion.div>

      <motion.div className="doctor-scene__portrait" style={{ y: portraitY }}>
        <motion.div className="doctor-scene__frame" style={{ scale: portraitScale }}>
          <ClinicImage
            src={clinic.images.doctor}
            fallback="/images/doctor.svg"
            alt={t('about.imageAlt')}
            width={800}
            height={1000}
            loading="lazy"
          />
        </motion.div>
      </motion.div>

      <motion.div
        className="doctor-scene__smile"
        style={{ x: smileX, y: smileY }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 340 160" fill="none" focusable="false">
          <path
            d="M12 32C64 146 246 148 324 24"
            stroke="var(--canvas)"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            d="M12 32C64 146 246 148 324 24"
            stroke="var(--primary)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M46 105C116 157 230 149 286 111"
            stroke="var(--accent)"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>
    </div>
  )
}
