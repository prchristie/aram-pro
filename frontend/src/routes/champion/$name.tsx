import { createFileRoute, notFound } from "@tanstack/react-router";
import { BuildPage } from "../../components/pages/BuildPage";
import { fetchChampionByName } from "../../services/lol/lol";

export const Route = createFileRoute("/champion/$name")({
  component: () => {
    return <BuildPage />;
  },
  loader: async ({ params: { name } }) => {
    const champion = await fetchChampionByName(name);
    if(!champion) {
      throw notFound()
    }
  },
  pendingComponent: () => <>loading</>,
});
