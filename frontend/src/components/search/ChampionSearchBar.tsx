import { useMemo, useState } from "react";
import { SearchBar } from "./SearchBar";
import Fuse from "fuse.js";
import { Champion, fetchChampions } from "../../services/lol";
import ChampionGrid from "./ChampionGrid";

function useChampions() {
  const [champs, setChamps] = useState<Champion[]>([]);
  const filterableChampionList = useMemo(
    () => new Fuse(champs, { keys: ["name"], threshold: 0.4 }),
    [champs]
  );

  fetchChampions().then((res) => setChamps(res));

  function filterChamps(filter: string) {
    return filterableChampionList.search(filter).map((res) => res.item);
  }

  return { champs, filterChamps };
}

export default function ChampionSearchBar() {
  const [filterText, setFilterText] = useState("");
  const { filterChamps } = useChampions();
  const filteredChamps = filterChamps(filterText);

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
        <ChampionGrid champions={filteredChamps} onChampionSplashClicked={() => setFilterText("")} />
      </div>
    </>
  );
}
