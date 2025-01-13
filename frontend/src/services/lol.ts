import axios from "axios";

export type Champion = {
  name: string;
  portraitUrl: string;
};

type GetChampionsResponse = {
  type: string;
  format: string;
  version: string;
  data: Map<string, Champion>;
};

export type GetRunesResponse = Style[];

export interface Style {
  id: number;
  key: string;
  icon: string;
  name: string;
  slots: Slot[];
}

export interface Slot {
  runes: Rune[];
}

export interface Rune {
  id: number;
  key: string;
  icon: string;
  name: string;
  shortDesc: string;
  longDesc: string;
}

export async function getLatestVersion() {
  const url = "https://ddragon.leagueoflegends.com/api/versions.json";
  const res = await axios.get<string[]>(url);
  const data = res.data;

  return data[0];
}



export async function fetchChampions(): Promise<Champion[]> {
  const version = await getLatestVersion();
  const url = `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`;

  const res = await axios.get<GetChampionsResponse>(url);
  const data = res.data;
  const champions = data.data;

  return Object.values(champions).map((champion) => ({
    name: champion.name,
    portraitUrl: `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champion.id}.png`,
  }));
}

export async function getRunes() {
  const version = await getLatestVersion();

  const url = `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/runesReforged.json`;

  const res = await axios.get<GetRunesResponse>(url);

  return res.data;
}
