type PagerProps = {
  page: number
  size: number
  total: number
  onPage: (page: number) => void
}

// List pagination control (SEMANTIC_MODEL.md BUG-9, fixed). The API supports
// page/size on every list endpoint; this component is what makes the second
// and later pages reachable in the interface. Renders nothing while the whole
// list fits on one page.
export function Pager({ page, size, total, onPage }: PagerProps) {
  const pages = Math.max(1, Math.ceil(total / size))
  if (pages <= 1) return null
  return (
    <nav className="mt-4 flex items-center gap-3" aria-label="Pagination">
      <button type="button" className="minor-button" disabled={page <= 1} onClick={() => onPage(page - 1)}>
        ← Previous
      </button>
      <span className="font-mono text-[10px] uppercase tracking-wider text-[#636d66]">
        Page {page} of {pages} · {total} total
      </span>
      <button type="button" className="minor-button" disabled={page >= pages} onClick={() => onPage(page + 1)}>
        Next →
      </button>
    </nav>
  )
}
