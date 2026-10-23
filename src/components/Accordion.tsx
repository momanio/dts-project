import { useId, useState } from 'react'
import { Plus } from 'lucide-react'
import { cn } from '../lib/utils'

export function Accordion({ items }: { items: { question: string; answer: string }[] }) {
  const [open, setOpen] = useState<number | null>(0)
  const id = useId()
  return (
    <div className="border-t border-line">
      {items.map((item, index) => (
        <div key={index} className="border-b border-line">
          <h3>
            <button
              type="button"
              aria-expanded={open === index}
              aria-controls={`${id}-panel-${index}`}
              id={`${id}-button-${index}`}
              onClick={() => setOpen(open === index ? null : index)}
              className="flex w-full items-center justify-between gap-5 py-6 text-start text-sm font-medium"
            >
              <span>{item.question}</span>
              <Plus
                className={cn(
                  'size-4 shrink-0 text-primary transition-transform',
                  open === index && 'rotate-45',
                )}
                aria-hidden="true"
              />
            </button>
          </h3>
          <div
            id={`${id}-panel-${index}`}
            role="region"
            aria-labelledby={`${id}-button-${index}`}
            hidden={open !== index}
            className="pb-6 pe-7 text-sm leading-7 text-muted"
          >
            {item.answer}
          </div>
        </div>
      ))}
    </div>
  )
}
