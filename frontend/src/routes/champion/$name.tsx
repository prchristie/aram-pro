import { createFileRoute } from "@tanstack/react-router";
import { useChampion, useChampionBuilds } from "../../services/lol";
import { BuildCarousel } from "../../components/build/BuildCarousel";

export const Route = createFileRoute("/champion/$name")({
  component: () => {
    return <BuildPage />;
  },
  pendingComponent: () => <>loading</>,
});

function BuildPage() {
  const params = Route.useParams();
  const champion = useChampion(params.name);
  const builds = useChampionBuilds(params.name);

  if (
    champion.error ||
    champion.isPending ||
    builds.error ||
    builds.isPending
  ) {
    return <>Woops</>;
  }

  return (
    <div>
      <div style={{ display: "flex", gap: "20px" }}>
        <img
          style={{
            borderRadius: "10px",
          }}
          src={champion.data.portraitUrl}
          alt={`${champion.data.name}'s portrait art`}
          width={128}
          height={128}
        />
          <BuildCarousel builds={builds.data} />
      </div>
    </div>
  );
}
