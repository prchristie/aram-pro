import { FC } from "react";
import RedirectableChampionSplash from "./RedirectableChampionSplash";
import "./champion-grid.css"
import { Champion } from "../../../types/build.types";

interface ChampionGridProps {
  champions: Champion[];
  onChampionSplashClicked: () => void;
}

const ChampionGrid: FC<ChampionGridProps> = ({
  champions,
  onChampionSplashClicked,
}) => {
  if (champions.length >= 1) {
    return (
      <div className="champion-grid">
        {champions.map((c) => (
          <div key={c.name} className="champion-grid__item">
            <RedirectableChampionSplash
              key={c.name}
              champion={c}
              onClick={onChampionSplashClicked}
            />
            {c.name}
          </div>
        ))}
      </div>
    );
  }

  return <></>;
};

export default ChampionGrid;
