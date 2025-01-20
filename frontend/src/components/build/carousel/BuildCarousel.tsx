import { Build } from "../../../types/build.types";
import { getWinRateBand } from "../../../util";
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
                src={b.runes.keystone.icon.url}
                alt={`Primary keystone ${b.runes.keystone.name}`}
                width={100}
              />
              <img
                src={b.runes.secondaryPathIcon.url}
                alt="Secondary path"
                className="build-carousel__secondary-path-icon"
              />
            </div>
            <div className="build-carousel__build-info">
              <p
                className={`build-carousel__win-rate build-carousel__win-rate--${getWinRateBand(b.winRate)}`}
              >
                {Math.round(b.winRate)}%
              </p>
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
