import { Build } from "../../../types/build.types";
import { WinRate } from "../winRate/WinRate";
import "./build-carousel.css";

type Props = {
  builds: Build[];
  onBuildSelected: (b: Build) => void;
};

export function BuildCarousel({ builds, onBuildSelected }: Props) {
  return (
    <div className="build-carousel">
      {builds.map((b) => {
        return (
          <button
            className="build-carousel-item"
            onClick={() => onBuildSelected(b)}
          >
            <div className="rune-pair">
              <img
                src={b.keystone.icon.url}
                alt={`Primary keystone ${b.keystone.name}`}
                width={100}
              />
              <img
                src={b.runes.secondaryRunePath.icon.url}
                alt="Secondary path"
                className="build-carousel__secondary-path-icon"
              />
            </div>
            <div className="build-carousel__build-info">
              <WinRate winRate={b.winRate} className="build-carousel__win-rate" />
              <div className="build-carousel__games-played">
                <p>{b.games}</p>
                <p>Games</p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
