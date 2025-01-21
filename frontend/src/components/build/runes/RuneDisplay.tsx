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

function HoveringWinRate({
  winRate,
  children,
}: {
  winRate: number;
  children: ReactNode;
}) {
  return (
    <div style={{ position: "relative" }}>
      <p
        style={{
          position: "absolute",
          backgroundColor: "rgba(0,0,0,0.8)",
          fontSize: "0.9rem",
          right: "-20px",
          top: "-10px",
          zIndex: 10,
          borderRadius: "5px",
          padding: "1px",
          color: getWinRateBand(winRate) === "high" ? "#7ed957" : "white",
        }}
      >
        {Math.round(winRate)}%
      </p>
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
        <HoveringWinRate winRate={o.winRate}>
          <img
            src={o.icon.url}
            width={30}
            style={{
              background: "black",
              borderRadius: "50%",
              border: "1px solid gold",
            }}
          />
        </HoveringWinRate>
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
        <img src={secondaryRunePath.icon.url} alt="" />
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
              <HoveringWinRate winRate={c.winRate}>
                <img src={c.icon.url} width={50} />
              </HoveringWinRate>
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
            <HoveringWinRate
              winRate={c.winRate}
            >
              <img src={c.icon.url} key={c.name} width={50} />
            </HoveringWinRate>
          ))}
        </RuneRow>
      ))}
    </>
  );
}
