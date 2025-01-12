import { useEffect, useMemo, useState } from "react";
import { SearchBar } from "./SearchBar";
import Fuse from "fuse.js";
import ChampionGrid from "./ChampionGrid";
import { useChampions } from "../../services/lol";

function useFilterableChampions() {
  const { data: champs, isPending, error } = useChampions();

  const filterableChampionList = useMemo(
    () =>
      new Fuse(isPending || error ? [] : champs, {
        keys: ["name"],
        threshold: 0.4,
      }),
    [champs, error, isPending]
  );

  function filterChamps(filter: string) {
    return filterableChampionList.search(filter).map((res) => res.item);
  }

  return { champs, filterChamps };
}

export default function ChampionSearchBar() {
  const [filterText, setFilterText] = useState("");
  const { filterChamps } = useFilterableChampions();
  const filteredChamps = filterChamps(filterText);
  console.log(filteredChamps);

  return (
    <>
      <SearchBar
        filterText={filterText}
        setFilterText={setFilterText}
        placeholder="Champion name"
      />
      <div
        style={{
          position: "absolute",
          top: "100%",
          width: "100%",
        }}
      >
        <ChampionGrid
          champions={filteredChamps}
          onChampionSplashClicked={() => setFilterText("")}
        />
      </div>
    </>
  );
}
