export type Rune = {
  name: string;
  iconUrl: string;
  id: number;
  key: string;
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
  lesserSlot1: Rune;
  lesserSlot2: Rune;
};

export type RunePage = {
  primaryPath: PrimaryRunePath;
  secondaryPath: SecondaryRunePath;
  shards: StatShards;
};

export type Build = {
  winRate: NormalPercentage;
  games: number;
  primaryRune: Rune;
  secondaryRune: Rune;
  runePage: RunePage;
};

export class NormalPercentage {
  public get number(): number {
    return this._number;
  }

  private constructor(private _number: number) {}

  public static create(number: number) {
    if (number < 0 || number > 100) {
      throw Error("Invalid percentage");
    }

    return new NormalPercentage(number);
  }
}