import { createFileRoute } from "@tanstack/react-router";
import { useChampion } from "../../services/lol";

export const Route = createFileRoute("/champion/$name")({
  component: () => {
    return <BuildPage />;
  },
  pendingComponent: () => <>loading</>,
});

export function BuildPage() {
  const params = Route.useParams();
  const champion = useChampion(params.name);

  if(champion.error || champion.isPending) {
    return <>Woops</>
  }

  return (
    <div>
      <div style={{ display: "flex" }}>
        <img
          style={{
            borderRadius: "10px",
          }}
          src={champion.data.portraitUrl}
          alt=""
        />
      </div>
    </div>
  );
}
