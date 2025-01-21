import { ReactNode } from "@tanstack/react-router";
import {
  PrimaryRunePath,
  Runes,
  SecondaryRunePath,
  ShardOptions,
  Shards as StatShards,
} from "../../../types/build.types";
import { getWinRateBand } from "../../../util";

type Props = { runes: Runes };

export function RuneDisplay({ runes }: Props) {
  return (
    <div>
      <div>
        <h2>Runes</h2>
        <hr style={{ border: "3px solid white" }} />
      </div>
      <div style={{ display: "flex", paddingTop: "10px", gap: "30px" }}>
        <div
          style={{
            display: "flex",
            flex: "2",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <PrimaryRunePathDisplay primaryRunePath={runes.primaryRunePath} />
        </div>
        <div
          style={{
            minHeight: "100%",
            border: "3px solid white",
          }}
        ></div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            minWidth: "150px",
            flex: "1.5",
          }}
        >
          <SecondaryRunePathDisplay
            secondaryRunePath={runes.secondaryRunePath}
          />
          <StatShardsDisplay statShards={runes.shards} />
        </div>
      </div>
    </div>
  );
}

function RuneRow({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      {children}
    </div>
  );
}

function StatShardOptionsRow({
  options: shardOptions,
}: {
  options: ShardOptions;
}) {
  return (
    <RuneRow>
      {shardOptions.options.map((o) => (
        <div style={{ position: "relative" }}>
          <p
            style={{
              position: "absolute",
              backgroundColor: "rgba(0,0,0,0.5)",
              fontSize: "0.65rem",
              right: "-15px",
              top: "-5px",
              zIndex: 10,
              color: getWinRateBand(o.winRate) === "high" ? "#7ed957" : "white",
            }}
          >
            {Math.round(o.winRate)}%
          </p>
          <img
            src={o.icon.url}
            width={30}
            style={{
              background: "black",
              borderRadius: "50%",
              border: "1px solid gold",
            }}
          />
        </div>
      ))}
    </RuneRow>
  );
}

function StatShardsDisplay({ statShards }: { statShards: StatShards }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <StatShardOptionsRow options={statShards.offense} />
      <StatShardOptionsRow options={statShards.flex} />
      <StatShardOptionsRow options={statShards.defense} />
    </div>
  );
}

function SecondaryRunePathDisplay({
  secondaryRunePath,
}: {
  secondaryRunePath: SecondaryRunePath;
}) {
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <img
          src={secondaryRunePath.icon.url}
          alt=""
        />
        {secondaryRunePath.name}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {secondaryRunePath.slots.map((s) => (
          <RuneRow>
            {s.choices.map((c) => (
              <div style={{ position: "relative" }}>
                <p
                  style={{
                    position: "absolute",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    fontSize: "0.7rem",
                    right: "-15px",
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
                <img src={c.icon.url} width={50} />
              </div>
            ))}
          </RuneRow>
        ))}
      </div>
    </>
  );
}

function PrimaryRunePathDisplay({
  primaryRunePath,
}: {
  primaryRunePath: PrimaryRunePath;
}) {
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <img src={primaryRunePath.icon.url} alt="" />
        {primaryRunePath.name}
      </div>
      <RuneRow>
        {primaryRunePath.keystones.map((ks) => (
          <img src={ks.icon.url} alt="" width={80} />
        ))}
      </RuneRow>
      {primaryRunePath.slots.map((s) => (
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
                  right: "-15px",
                  top: "-5px",
                  zIndex: 10,
                  color:
                    getWinRateBand(c.winRate) === "high" ? "#7ed957" : "white",
                }}
              >
                {Math.round(c.winRate)}%
              </p>
              <img src={c.icon.url} key={c.name} width={50} />
            </div>
          ))}
        </RuneRow>
      ))}
    </>
  );
}
