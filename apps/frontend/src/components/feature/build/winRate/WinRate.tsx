import { PropsWithChildren } from "react";
import "./win-rate.css";

type WinRateProps = {
  winRate: number;
  className?: string;
};

export function WinRate({ winRate, className }: WinRateProps) {
  return (
    <p className={`win-rate win-rate--${getWinRateBand(winRate)} ${className}`}>
      {Math.round(winRate)}%
    </p>
  );
}

type HoveringWinRateProps = {
  winRate: number;
} & PropsWithChildren;

export function HoveringWinRate({ winRate, children }: HoveringWinRateProps) {
  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          position: "absolute",
          top: "-15px",
          right: "-20px",
          backgroundColor: "rgba(0,0,0,0.8)",
          padding: "1px 3px",
          borderRadius: "5px",
        }}
      >
        <WinRate winRate={winRate} />
      </div>
      {children}
    </div>
  );
}

function getWinRateBand(winrate: number) {
  if (winrate < 48.5) {
    return "low";
  }

  if (winrate > 52.5) {
    return "high";
  }

  return "average";
}
