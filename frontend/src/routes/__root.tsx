import {
  createRootRoute,
  Outlet,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import Header from "../components/feature/Header.tsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { NotFoundPage } from "../components/pages/NotFoundPage.tsx";

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFoundPage
});

function RootComponent() {
  return (
    <>
      <Header />
      <Outlet />
      <TanStackRouterDevtools />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}
