import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/tetrispage')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/tetrispage"!</div>
}
