// import { FC, useMemo, useState } from "react";
// import { SearchBar } from "./SearchBar";
// import ChampionGrid from "./ChampionGrid";
// import { Champion, fetchChampions } from "../../services/lol";
// import Fuse from "fuse.js";

// type FilterableChampionGridProps = object;

// const FilterableChampionGrid: FC<FilterableChampionGridProps> = () => {
//   const [filterText, setFilterText] = useState("");


//   const champsToShow = !filterText
//     ? champs
//     : filterableChampionList.search(filterText).map((res) => res.item);

//   fetchChampions().then((res) => setChamps(res));

//   return (
//     <>
//       <div>
//         <SearchBar filterText={filterText} setFilterText={setFilterText} placeholder="Champion name"/>
//       </div>
//       {champs.length === 0 ? (
//         "Loading..."
//       ) : (
//         <ChampionGrid champions={champsToShow} />
//       )}
//     </>
//   );
// };

// export default FilterableChampionGrid;
