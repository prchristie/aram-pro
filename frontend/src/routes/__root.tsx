import {createRootRoute, Outlet} from "@tanstack/react-router";
import {TanStackRouterDevtools} from "@tanstack/router-devtools";
import Header from "../components/Header.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const queryClient = new QueryClient()

export const Route = createRootRoute({
    component: () => (
        <QueryClientProvider client={queryClient}>
            <Header />
            <Outlet/>
            <TanStackRouterDevtools/>
        </QueryClientProvider>
    )
});
