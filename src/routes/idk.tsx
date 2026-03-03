import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/idk')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/tetrispage"!</div>
}
