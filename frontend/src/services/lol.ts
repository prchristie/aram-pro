import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Build } from "../types/build.types";

export type Champion = {
  name: string;
  portraitUrl: string;
};

type GetChampionsResponse = {
  type: string;
  format: string;
  version: string;
  data: Map<string, { name: string }>;
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

export async function fetchLatestVersion() {
  const url = "https://ddragon.leagueoflegends.com/api/versions.json";
  const res = await axios.get<string[]>(url);
  const data = res.data;

  return data[0];
}

export async function fetchChampions(): Promise<Champion[]> {
  const version = await fetchLatestVersion();
  const url = `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`;

  const res = await axios.get<GetChampionsResponse>(url);
  const data = res.data;
  const champions = new Map(Object.entries(data.data));

  return Array.from(champions.values()).map((champion) => {
    return {
      name: champion.name,
      portraitUrl: `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champion.id}.png`,
    };
  });
}

export async function fetchChampionByName(name: string): Promise<Champion> {
  const version = await fetchLatestVersion();
  // const url = `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion/${name}.json`;

  // const res = await axios.get<GetChampionsResponse>(url);
  // const data = res.data;
  // const champion = new Map(data.data).get(name)!;

  // console.log(data);

  return {
    name: name,
    portraitUrl: `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${name}.png`,
  };
}

function createBuildList(size: number) {
  const output: Build[] = []
  for(let i = 0; i < size; i++) {
    output.push(
      {
        games: 10000,
        runes: {
          primaryRune: {
            icon: {
              url: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Domination/Electrocute/Electrocute.png",
            },
            name: "Eletrocute",
          },
          secondaryRuneIcon: {
            url: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7204_Resolve.png",
          },
        },
        winRate: 100,
      }
    )
  }

  return output;
}

export async function fetchBuildsForChamp(name: string): Promise<Build[]> {
  return createBuildList(2)
}

export function useChampionBuilds(name: string) {
  return useQuery({
    queryKey: [`${name}-builds`],
    retry: true,
    staleTime: Infinity,
    queryFn: () => fetchBuildsForChamp(name),
  });
}

export function useChampions() {
  return useQuery({
    queryKey: ["champions"],
    queryFn: fetchChampions,
    staleTime: Infinity,
  });
}

export function useChampion(name: string) {
  return useQuery({
    queryKey: [`champion-${name}`],
    queryFn: async () => await fetchChampionByName(name),
    staleTime: Infinity,
  });
}
