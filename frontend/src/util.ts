export function getWinRateBand(winrate: number) {
  if (winrate < 48.5) {
    return "low";
  }

  if (winrate > 52.5) {
    return "high";
  }

  return "average";
}
