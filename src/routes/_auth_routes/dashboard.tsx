import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth_routes/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth_routes/dashboard"!</div>
}
