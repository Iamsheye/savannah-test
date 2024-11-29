import * as React from "react";
import {
  Outlet,
  ScrollRestoration,
  createRootRoute,
} from "@tanstack/react-router";
import {} from "../hook/useAuth";
import AuthProvider from "../context/auth/provider";
import MenuProvider from "../context/menu/provider";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <AuthProvider>
        <MenuProvider>
          <ScrollRestoration />
          <Outlet />
        </MenuProvider>
      </AuthProvider>
    </React.Fragment>
  );
}
