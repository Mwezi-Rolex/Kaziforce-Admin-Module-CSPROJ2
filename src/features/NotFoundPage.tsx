import { Link } from 'react-router-dom'
import { BrandMark } from '../components/ui/primitives'

// CON-WEB-002.
export function NotFoundPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#f7f9f6] px-6 text-[#173e32]">
      <div className="max-w-md text-center">
        <div className="mb-8 flex justify-center">
          <BrandMark />
        </div>
        <p className="eyebrow">404 · not found</p>
        <h1 className="mt-3 font-serif text-4xl">This page does not exist.</h1>
        <p className="mt-4 text-sm leading-6 text-[#636d67]">
          The address may be mistyped, or the page may have moved.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link to="/" className="primary-button">
            Overview <span aria-hidden="true">→</span>
          </Link>
          <Link to="/console" className="minor-button">
            Console
          </Link>
        </div>
      </div>
    </main>
  )
}
