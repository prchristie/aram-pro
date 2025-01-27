export type Keystone = {
  icon: Icon;
  name: string;
};

export type PrimaryRunePath = {
  keystones: Keystone[];
  slots: RuneSlot[];
  icon: Icon;
  name: string;
};

export type SecondaryRunePath = {
  name: string;
  icon: Icon;
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

export type ShardOption = {
  icon: Icon;
  winRate: number;
  id: number;
};

export type Shards = {
  offense: ShardOption[];
  flex: ShardOption[];
  defense: ShardOption[];
};

export type Runes = {
  primaryRunePath: PrimaryRunePath;
  secondaryRunePath: SecondaryRunePath;
  shards: Shards;
};

export type Build = {
  keystone: Keystone;
  winRate: number;
  games: number;
  runes: Runes;
};

export type Champion = {
  name: string;
  portraitUrl: string;
};
