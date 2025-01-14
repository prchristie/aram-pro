export type Keystone = {
  icon: Icon;
  name: string;
};

export type PrimaryRunePath = {
  keystones: Keystone[];
  runeSlots: RuneSlots;
};

export type SecondaryRunePath = {
  runeSlots: RuneSlots;
};

export type RuneSlots = {
  slot1: RuneSlot;
  slot2: RuneSlot;
  slot3: RuneSlot;
};

export type RuneSlotChoice = {
  icon: Icon;
  winRate: number;
};

export type RuneSlot = {
  choice1: RuneSlotChoice;
  choice2: RuneSlotChoice;
  choice3: RuneSlotChoice;
};

export type Icon = {
  url: string;
};

export type Runes = {
  keystone: Keystone;
  secondaryPathIcon: Icon;
  primaryRunePathWinRates: PrimaryRunePath;
  secondaryRunesPathWinRates: SecondaryRunePath;
};

export type Build = {
  winRate: number;
  games: number;
  runes: Runes;
};
