import { createFileRoute } from "@tanstack/react-router";
import { BuildPage } from "../../components/pages/BuildPage";

export const Route = createFileRoute("/champion/$name")({
  component: () => {
    return <BuildPage />;
  },
  pendingComponent: () => <>loading</>,
});
