export type Rune = {
  name: string;
  icon: RuneIcon;
};

export type StatShards = {
  defenseId: number;
  flexId: number;
  offenseId: number;
};

export type PrimaryRunePath = {
  keystone: Rune;
  lesserSlot1: Rune;
  lesserSlot2: Rune;
  lesserSlot3: Rune;
};

export type SecondaryRunePath = {
  iconUrl: string;
  lesserSlot1: Rune;
  lesserSlot2: Rune;
};

export type RunePage = {
  primaryPath: PrimaryRunePath;
  secondaryPath: SecondaryRunePath;
  shards: StatShards;
};

// export type RuneWinrates = {

// }

export type RuneIcon = {
  url: string;
};

export type Runes = {
  primaryRune: Rune;
  secondaryRuneIcon: RuneIcon;
  // primaryRunesWinrates: RuneWinrates;
  // secondaryRunesWinrates: RuneWinrates;
};

export type Build = {
  winRate: number;
  games: number;
  runes: Runes;
};
