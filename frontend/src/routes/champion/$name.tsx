import { createFileRoute } from "@tanstack/react-router";
import { useChampion, useChampionBuilds } from "../../services/lol/lol";
import { BuildCarousel } from "../../components/build/carousel/BuildCarousel";
import "./build-page.css";
import { RuneDisplay } from "../../components/build/runes/RuneDisplay";
import { useEffect, useState } from "react";
import { Build } from "../../types/build.types";

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
  const [selectedBuild, setSelectedBuild] = useState<undefined | Build>(
    undefined
  );

  useEffect(() => {
    if (builds.error || builds.isPending) {
      return;
    }

    setSelectedBuild(builds.data[0]);
  }, [builds.error, builds.isPending, builds.data]);

  if (
    champion.error ||
    champion.isPending ||
    builds.error ||
    builds.isPending
  ) {
    return <>Woops</>;
  }

  return (
    <div className="build-page">
      <div className="build-page__build-carousel__container">
        <img
          className="build-page__champion-portrait"
          src={champion.data.portraitUrl}
          alt={`${champion.data.name}'s portrait art`}
          width={128}
          height={128}
        />
        <BuildCarousel
          builds={builds.data}
          onBuildSelected={setSelectedBuild}
        />
      </div>
      <div>
        <div
          style={{
            display: "flex",
          }}
        >
          <div
            style={{
              flex: "1.5",
            }}
          >
            {selectedBuild ? (
              <RuneDisplay
                runes={selectedBuild.runes}
                selectedKeystone={selectedBuild.keystone}
              />
            ) : (
              "Loading"
            )}
          </div>
          <div style={{ flex: 1 }}></div>
        </div>
      </div>
    </div>
  );
}
