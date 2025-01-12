import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/champion/$name")({
  component: () => {
    <ChampionPage />;
  },
  pendingComponent: () => <>loading</>,
});

export function ChampionPage() {
  return <>Hello</>;
}
