import type { ImgHTMLAttributes } from 'react'

export function ClinicImage({
  fallback,
  ...props
}: ImgHTMLAttributes<HTMLImageElement> & { fallback: string }) {
  return (
    <img
      {...props}
      onError={(event) => {
        const img = event.currentTarget
        if (!img.src.endsWith(fallback)) img.src = fallback
      }}
    />
  )
}
