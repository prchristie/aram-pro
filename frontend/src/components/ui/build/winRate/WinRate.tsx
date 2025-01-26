import { ReactNode } from "react";
import "./winRate.css";

export function WinRate({
  winRate,
  className,
}: {
  winRate: number;
  className?: string;
}) {
  return (
    <p className={`win-rate win-rate--${getWinRateBand(winRate)} ${className}`}>
      {Math.round(winRate)}%
    </p>
  );
}

export function HoveringWinRate({
  winRate,
  children,
}: {
  winRate: number;
  children: ReactNode;
}) {
  return (
    <div style={{ position: "relative" }}>
      <div style={{position: "absolute", top: "-15px", right: "-20px", backgroundColor: "rgba(0,0,0,0.8)", padding: "1px 3px", borderRadius: "5px"}}>
        <WinRate
          winRate={winRate}
        />
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
