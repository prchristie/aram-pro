import { ReactNode } from "@tanstack/react-router";
import { Runes } from "../../../types/build.types";
import { getWinRateBand } from "../../../util";

type Props = { runes: Runes };

function RuneRow({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      {children}
    </div>
  );
}

export function RuneDisplay({ runes }: Props) {
  return (
    <div>
      <div>
        <h2>Runes</h2>
        <hr style={{ border: "3px solid white" }} />
      </div>
      <div style={{ display: "flex", paddingTop: "10px", gap: "30px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <RuneRow>
            {runes.primaryRunePathWinRates.keystones.map((ks) => (
              <img src={ks.icon.url} alt="" width={80} />
            ))}
          </RuneRow>
          {runes.primaryRunePathWinRates.slots.map((s) => (
            <RuneRow>
              {s.choices.map((c) => (
                <div
                  style={{
                    position: "relative",
                  }}
                >
                  <p
                    style={{
                      position: "absolute",
                      backgroundColor: "rgba(0,0,0,0.5)",
                      right: "-10px",
                      top: "-5px",
                      zIndex: 10,
                      color:
                        getWinRateBand(c.winRate) === "high"
                          ? "#7ed957"
                          : "white",
                    }}
                  >
                    {Math.round(c.winRate)}%
                  </p>
                  <img src={c.icon.url} key={c.name} width={60} />
                </div>
              ))}
            </RuneRow>
          ))}
        </div>
        <div style={{
          minHeight: "100%",
          border: "3px solid white"
        }}></div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            minWidth: "150px",
          }}
        >
          <img
            src={runes.secondaryPathIcon.url}
            alt=""
            style={{ alignSelf: "center" }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {runes.secondaryRunesPathWinRates.slots.map((s) => (
              <RuneRow>
                {s.choices.map((c) => (
                  <div style={{ position: "relative" }}>
                    <p
                      style={{
                        position: "absolute",
                        backgroundColor: "rgba(0,0,0,0.5)",
                        fontSize: "0.7rem",
                        right: "-10px",
                        top: "-5px",
                        zIndex: 10,
                        color:
                          getWinRateBand(c.winRate) === "high"
                            ? "#7ed957"
                            : "white",
                      }}
                    >
                      {Math.round(c.winRate)}%
                    </p>
                    <img src={c.icon.url} width={35} />
                  </div>
                ))}
              </RuneRow>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}