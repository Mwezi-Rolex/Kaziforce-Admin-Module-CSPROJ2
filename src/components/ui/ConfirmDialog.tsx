import { useEffect, useRef, useState } from 'react'
import { Button } from './primitives'

export type ConfirmAction = {
  /** Short headline. */
  title: string
  /** What the action does; shown on both steps. */
  detail: string
  /** The exact item the action applies to, finalised on step 2. */
  target: string
  confirmLabel: string
  destructive?: boolean
  onConfirm: () => void
  onCancel: () => void
}

// Two-step destructive-action confirmation (Ch5 §3.4.6 wireframes: bans and
// feature toggles are gated behind confirmation modals). Focus is moved into
// the dialog; Escape cancels.
export function ConfirmDialog({ title, detail, target, confirmLabel, destructive = false, onConfirm, onCancel }: ConfirmAction) {
  const [step, setStep] = useState<1 | 2>(1)
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    dialogRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onCancel])

  return (
    <div className="modal-backdrop" role="presentation">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className="w-full max-w-md border border-[#c9c8bd] bg-[#fcfbf6] p-7 shadow-2xl outline-none"
      >
        <p className="eyebrow">Step {step} of 2 · confirmation required</p>
        <h2 className="mt-3 font-serif text-3xl">{step === 1 ? title : 'Confirm this action.'}</h2>
        <p className="mt-4 text-sm leading-6 text-[#626f67]">
          {step === 1 ? detail : `You are about to finalize: ${target}. This cannot be undone from this interface.`}
        </p>
        <div className="mt-8 flex justify-end gap-3">
          <Button variant="minor" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            variant={destructive ? 'danger' : 'primary'}
            onClick={() => (step === 1 ? setStep(2) : onConfirm())}
          >
            {step === 1 ? 'Continue' : confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}
