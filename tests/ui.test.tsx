import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ConfirmDialog } from '../src/components/ui/ConfirmDialog'
import { Pill } from '../src/components/ui/primitives'

describe('Pill', () => {
  it('renders its label and tone', () => {
    render(<Pill tone="high" label="Severity">High</Pill>)
    const pill = screen.getByText(/Severity: High/)
    expect(pill).toHaveClass('pill-high')
  })
})

describe('ConfirmDialog (Ch5 §3.4.6 two-step confirmation)', () => {
  it('requires two clicks before confirming', async () => {
    const onConfirm = vi.fn()
    render(
      <ConfirmDialog
        title="Permanently ban?"
        detail="This permanently bans the selected account."
        target="isaac.njeri@example.com"
        confirmLabel="Permanently ban"
        destructive
        onConfirm={onConfirm}
        onCancel={() => undefined}
      />,
    )
    expect(screen.getByRole('dialog', { name: 'Permanently ban?' })).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'Continue' }))
    expect(onConfirm).not.toHaveBeenCalled()
    expect(screen.getByText(/You are about to finalize/)).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: /Permanently ban/ }))
    expect(onConfirm).toHaveBeenCalledTimes(1)
  })

  it('cancels on Escape', async () => {
    const onCancel = vi.fn()
    render(
      <ConfirmDialog
        title="Confirm"
        detail="d"
        target="t"
        confirmLabel="Confirm"
        onConfirm={() => undefined}
        onCancel={onCancel}
      />,
    )
    await userEvent.keyboard('{Escape}')
    expect(onCancel).toHaveBeenCalledTimes(1)
  })
})
