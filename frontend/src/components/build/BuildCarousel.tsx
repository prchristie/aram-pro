import { Build } from "../../types/build.types";
import "./build-carousel.css";

type Props = {
  builds: Build[];
};

export function BuildCarousel({ builds }: Props) {
  return (
    <div className="build-carousel">
      {builds.map((b) => {
        return (
          <button className="carousel-item">
            <div style={{ position: "relative" }}>
              <img src={b.runes.primaryRune.icon.url} alt="" width={100} />
              <img
                src={b.runes.secondaryRuneIcon.url}
                alt=""
                style={{ position: "absolute", right: "-10px", bottom: "0" }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%"
              }}
            >
              <p
                style={{
                  color: getWinrateColor(b.winRate),
                  fontSize: "1.5rem",
                }}
              >
                {b.winRate}%
              </p>
              <div style={{
                color: "gray",
                fontSize: "0.9rem"
              }}>
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

function getWinrateColor(winrate: number) {
  if (winrate < 49) {
    return "red";
  }

  if (winrate > 53) {
    return "green";
  }

  return "white";
}
