import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Build, Champion } from "../../types/build.types";
import { createBuildList } from "./fake";
import { Convert, RunesReforged } from "./lol.service.types";

type GetChampionsResponse = {
  type: string;
  format: string;
  version: string;
  data: Map<string, { name: string }>;
};

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

  return {
    name: name,
    portraitUrl: `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${name}.png`,
  };
}

export async function fetchBuildsForChamp(_name: string): Promise<Build[]> {
  return await createBuildList(10);
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

export async function getRunesReforged(): Promise<RunesReforged[]> {
  const version = await fetchLatestVersion();
  const url = `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/runesReforged.json`;

  const res = await axios.get(url);
  const json = res.data;

  return Convert.toRunesReforged(JSON.stringify(json));
}
