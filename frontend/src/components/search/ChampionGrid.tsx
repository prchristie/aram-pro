import { FC } from "react";
import RedirectableChampionSplash from "./RedirectableChampionSplash";
import { Champion } from "../../services/lol";

interface ChampionGridProps {
  champions: Champion[];
  onChampionSplashClicked: () => void
}

const ChampionGrid: FC<ChampionGridProps> = ({ champions, onChampionSplashClicked }) => {
  if (champions.length >= 1) {
    return <div
      style={{
        width: "100%",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        gap: "5px",
        maxHeight: "50vh",
        overflow: "auto",
        backgroundColor: "rgba(0,0,0,0.75)",
        fontSize: "0.85rem",
        padding: "10px",
        borderRadius: "10px",
      }}
    >
      {champions.map((c) => (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
          <RedirectableChampionSplash key={c.name} champion={c} onClick={onChampionSplashClicked}/>
          {c.name}
        </div>
      ))}
    </div>;
  }

  return <></>
};

export default ChampionGrid;
