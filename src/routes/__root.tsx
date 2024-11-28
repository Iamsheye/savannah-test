import * as React from "react";
import {
  Outlet,
  ScrollRestoration,
  createRootRoute,
} from "@tanstack/react-router";
import { AuthProvider } from "../context/AuthContext";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <AuthProvider>
        <ScrollRestoration />
        <Outlet />
      </AuthProvider>
    </React.Fragment>
  );
}
