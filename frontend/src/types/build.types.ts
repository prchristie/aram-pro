export type Keystone = {
  icon: Icon;
  name: string;
};

export type PrimaryRunePath = {
  keystones: Keystone[];
  slots: RuneSlot[];
};

export type SecondaryRunePath = {
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
}

export type ShardOptions = {
  options: ShardOption[]
}

export type Shards = {
  offense: ShardOptions;
  flex: ShardOptions;
  defense: ShardOptions;
}

export type Runes = {
  keystone: Keystone;
  primaryRunePath: PrimaryRunePath;
  secondaryRunePath: SecondaryRunePath;
  shards: Shards;
};

export type Build = {
  winRate: number;
  games: number;
  runes: Runes;
};

export type Champion = {
  name: string;
  portraitUrl: string;
};
