export type Keystone = {
  icon: Icon;
  name: string;
};

export type PrimaryRunePath = {
  keystones: Keystone[];
  slots: RuneSlot[];
};

export type SecondaryRunePath = {
  slots: RuneSlot[];
};

export type RuneSlots = {
  slots: RuneSlot[];
};

export type RuneSlotChoice = {
  icon: Icon;
  name: string;
  winRate: number;
};

export type RuneSlot = {
  choices: RuneSlotChoice[];
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
