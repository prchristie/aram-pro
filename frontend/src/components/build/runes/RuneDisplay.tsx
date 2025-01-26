import { ReactNode } from "@tanstack/react-router";
import {
  Keystone,
  PrimaryRunePath,
  Runes,
  SecondaryRunePath,
  ShardOption,
  Shards as StatShards,
} from "../../../types/build.types";
import { HoveringWinRate } from "../winRate/WinRate";

type Props = { runes: Runes; selectedKeystone: Keystone };

export function RuneDisplay({ runes, selectedKeystone }: Props) {
  return (
    <div>
      <div>
        <h2>Runes</h2>
        <hr style={{ border: "3px solid white" }} />
      </div>
      <div
        style={{
          display: "flex",
          paddingTop: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            flex: "2",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <PrimaryRunePathDisplay
            primaryRunePath={runes.primaryRunePath}
            selectedKeystone={selectedKeystone}
          />
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
            gap: "30px",
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
  shardOptions,
}: {
  shardOptions: ShardOption[];
}) {
  return (
    <RuneRow>
      {shardOptions.map((o) => (
        // TODO: Introduce the id for the key
        <HoveringWinRate winRate={o.winRate} key={o.id}>
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
        gap: "20px",
      }}
    >
      <StatShardOptionsRow shardOptions={statShards.offense} />
      <StatShardOptionsRow shardOptions={statShards.flex} />
      <StatShardOptionsRow shardOptions={statShards.defense} />
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
          gap: "15px",
        }}
      >
        {secondaryRunePath.slots.map((s) => (
          <RuneRow>
            {s.choices.map((c) => (
              <HoveringWinRate winRate={c.winRate} key={c.name}>
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
  selectedKeystone,
}: {
  primaryRunePath: PrimaryRunePath;
  selectedKeystone: Keystone;
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
        {primaryRunePath.keystones.map((ks) => {
          console.log(ks.name, selectedKeystone.name);

          return (
            <img
              key={ks.name}
              src={ks.icon.url}
              alt=""
              width={75}
              style={{
                filter:
                  ks.name === selectedKeystone.name ? "" : "grayscale(100%)",
                flex: "1",
              }}
            />
          );
        })}
      </RuneRow>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "30px",
        }}
      >
        {primaryRunePath.slots.map((s) => (
          <RuneRow>
            {s.choices.map((c) => (
              <HoveringWinRate winRate={c.winRate}>
                <img src={c.icon.url} key={c.name} width={60} />
              </HoveringWinRate>
            ))}
          </RuneRow>
        ))}
      </div>
    </>
  );
}
