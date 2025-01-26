// TODO: Fill in img alts

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
import "./runeDisplay.css";

type Props = { runes: Runes; selectedKeystone: Keystone };

export function RuneDisplay({ runes, selectedKeystone }: Props) {
  return (
    <div>
      <div>
        <h2>Runes</h2>
        <hr className="divider" />
      </div>
      <div className="rune-path-container">
        <div className="primary-path-container">
          <PrimaryRunePathDisplay
            primaryRunePath={runes.primaryRunePath}
            selectedKeystone={selectedKeystone}
          />
        </div>
        <div className="divider"></div>
        <div className="secondary-path-container">
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
  return <div className="rune-row">{children}</div>;
}

function StatShardOptionsRow({
  shardOptions,
}: {
  shardOptions: ShardOption[];
}) {
  return (
    <RuneRow>
      {shardOptions.map((o) => (
        <HoveringWinRate winRate={o.winRate} key={o.id}>
          <img
            src={o.icon.url}
            width={30}
            className="rune-icon rune-icon--shard"
          />
        </HoveringWinRate>
      ))}
    </RuneRow>
  );
}

function StatShardsDisplay({ statShards }: { statShards: StatShards }) {
  return (
    <div className="stat-shards-grid-container">
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
      <div className="rune-path-header">
        <img
          src={secondaryRunePath.icon.url}
          alt={`${secondaryRunePath.name} icon`}
        />
        {secondaryRunePath.name}
      </div>

      <div className="rune-path-grid-container">
        {secondaryRunePath.slots.map((s) => (
          <RuneRow>
            {s.choices.map((c) => (
              <HoveringWinRate winRate={c.winRate} key={c.name}>
                <img src={c.icon.url} width={50} className="rune-icon" />
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
      <div className="rune-path-header">
        <img
          src={primaryRunePath.icon.url}
          alt={`${primaryRunePath.icon} name`}
        />
        {primaryRunePath.name}
      </div>
      <RuneRow>
        {primaryRunePath.keystones.map((ks) => (
          <img
            key={ks.name}
            src={ks.icon.url}
            alt={`${ks.name} icon`}
            width={75}
            className={`keystone-icon ${ks.name === selectedKeystone.name ? "" : "nonselected-keystone"}`}
          />
        ))}
      </RuneRow>
      <div className="rune-path-grid-container">
        {primaryRunePath.slots.map((s) => (
          <RuneRow>
            {s.choices.map((c) => (
              <HoveringWinRate winRate={c.winRate}>
                <img
                  src={c.icon.url}
                  key={c.name}
                  width={60}
                  className="rune-icon"
                />
              </HoveringWinRate>
            ))}
          </RuneRow>
        ))}
      </div>
    </>
  );
}
