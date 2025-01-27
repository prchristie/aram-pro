import { useEffect, useState } from "react";
import { useChampion, useChampionBuilds } from "../../services/lol/lol";
import { Build } from "../../types/build.types";
import { BuildCarousel } from "../feature/build/carousel/BuildCarousel";
import { RuneDisplay } from "../feature/build/runes/RuneDisplay";
import "./build-page.css";
import { notFound, useParams } from "@tanstack/react-router";

export function BuildPage() {
  const params = useParams({ from: "/champion/$name" });
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

  if(!champion.data) {
    throw notFound();
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
        <div className="build-display-container">
          <div className="rune-display-container">
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
