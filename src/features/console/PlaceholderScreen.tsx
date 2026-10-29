import { Panel } from '../../components/ui/primitives'

// Temporary foundation screen. Each console area is rebuilt as a Phase 3
// vertical slice (PLAN.md slice order); nothing here is final behaviour.
export function PlaceholderScreen({ area, slice }: { area: string; slice: string }) {
  return (
    <Panel>
      <p className="eyebrow">{area}</p>
      <h1 className="mt-3 font-serif text-3xl">Under construction — Phase 3, slice {slice}</h1>
      <p className="mt-3 max-w-lg text-sm leading-6 text-[#68736c]">
        The routing, layout, session, and permission scaffolding are live; this area is implemented
        in its own vertical slice per the plan.
      </p>
    </Panel>
  )
}
