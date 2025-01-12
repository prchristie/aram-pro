import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Build } from "../types/build.types";

export type Champion = {
  name: string;
  portraitUrl: URL;
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

  return Array.from(champions).map(([id, champion]) => ({
    name: champion.name,
    portraitUrl: new URL(
      `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${id}.png`
    ),
  }));
}

export async function getRunes() {
  const version = await getLatestVersion();

  const url = `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/runesReforged.json`;

  const res = await axios.get<GetRunesResponse>(url);

  return res.data;
}

export async function getBuildsForChamp(championId: number): Promise<Build[]> {
  return [
    {
      games: 1000,
      runes: {
        primaryRune: {
          icon: {
            url: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Domination/Electrocute/Electrocute.png",
          },
          name: "Eletrocute",
        },
        secondaryRuneIcon: {
          url: "https://github.com/InFinity54/LoL_DDragon/blob/master/img/perk-images/Styles/7204_Resolve.png",
        },
      },
      winRate: 100,
    },
  ];
}

export function useChampionBuilds(championId: number) {
  return useQuery({
    queryKey: [`champion-${championId}`],
    queryFn: () => getBuildsForChamp(championId),
  });
}

export function useChampions() {
  return useQuery({
    queryKey: ["champions"],
    staleTime: 100000,
    queryFn: fetchChampions,
  });
}
