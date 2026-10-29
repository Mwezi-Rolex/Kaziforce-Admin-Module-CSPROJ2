import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'minor' | 'danger'
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }

export function Button({ variant = 'primary', className = '', children, ...rest }: ButtonProps) {
  const base = variant === 'primary' ? 'primary-button' : variant === 'danger' ? 'danger-button' : 'minor-button'
  return (
    <button className={`${base} ${className}`} {...rest}>
      {children}
    </button>
  )
}

type PillTone = 'neutral' | 'high' | 'medium' | 'low' | 'active' | 'suspended'

export function Pill({ children, tone = 'neutral', label }: { children: ReactNode; tone?: PillTone; label?: string }) {
  return (
    <span className={`pill pill-${tone}`}>
      <span aria-hidden="true">●</span>
      {label && `${label}: `}
      {children}
    </span>
  )
}

export function Field({
  label,
  children,
  htmlFor,
}: {
  label: string
  children: ReactNode
  htmlFor?: string
}) {
  return (
    <label className="field-label" htmlFor={htmlFor}>
      {label}
      {children}
    </label>
  )
}

export function Panel({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <section className={`border border-[#d8d9cf] bg-[#fcfbf7] p-7 ${className}`}>{children}</section>
}

export function EmptyState({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="border border-dashed border-[#d3d5cb] bg-[#faf9f4] p-8 text-center">
      <p className="font-serif text-xl text-[#33473f]">{title}</p>
      {hint && <p className="mt-2 text-xs text-[#778078]">{hint}</p>}
    </div>
  )
}

export function ErrorState({ message, hint }: { message: string; hint?: string }) {
  return (
    <div role="alert" className="border border-[#e4b3a7] bg-[#fff0eb] p-5">
      <p className="font-medium text-[#963721]">{message}</p>
      {hint && <p className="mt-1 text-xs text-[#8f4a3a]">{hint}</p>}
    </div>
  )
}

export function Loading({ label = 'Loading…' }: { label?: string }) {
  return (
    <div role="status" aria-live="polite" className="p-6">
      <p className="eyebrow">{label}</p>
    </div>
  )
}

export function PageTitle({ kicker, title, children }: { kicker: string; title: string; children?: ReactNode }) {
  return (
    <div className="mb-8 flex items-end justify-between">
      <div>
        <p className="eyebrow">{kicker}</p>
        <h1 className="mt-2 font-serif text-[42px] leading-none tracking-tight">{title}</h1>
      </div>
      {children}
    </div>
  )
}

export function BrandMark() {
  return (
    <div className="grid h-9 w-9 place-items-center rounded-sm bg-[#183a35] font-serif text-xl text-[#fcfaf2]">
      K
    </div>
  )
}
