import { createFileRoute } from "@tanstack/react-router";
import Dashboard from "./dashboard";

export const Route = createFileRoute("/_auth_routes/archived")({
  component: () => <Dashboard isArchived={true} />,
});
