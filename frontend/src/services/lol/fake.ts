import {
  Build,
  RuneSlot,
  RuneSlotChoice,
  ShardOption,
  Shards,
} from "../../types/build.types";

function generateRandomWinRate() {
  return Math.random() * 100;
}

function createChoice(winrate: number): RuneSlotChoice {
  return {
    icon: {
      url: "https://github.com/InFinity54/LoL_DDragon/blob/master/img/perk-images/Styles/Resolve/FontOfLife/FontOfLife.png?raw=true",
    },
    winRate: winrate,
    name: "FontOfLife",
  };
}

function createSlot(winrate: number): RuneSlot {
  return {
    choices: [
      createChoice(winrate),
      createChoice(winrate),
      createChoice(winrate),
    ],
  };
}

function createShardOptions(winrate: number): ShardOption[] {
  return [
    {
      icon: {
        url: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/StatMods/StatModsAdaptiveForceIcon.png",
      },
      winRate: winrate,
    },
    {
      icon: {
        url: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/StatMods/StatModsAdaptiveForceIcon.png",
      },
      winRate: winrate,
    },
    {
      icon: {
        url: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/StatMods/StatModsAdaptiveForceIcon.png",
      },
      winRate: winrate,
    },
  ];
}

function createDefaultShards(winrate: number): Shards {
  return {
    offense: createShardOptions(winrate),
    defense: createShardOptions(winrate),
    flex: createShardOptions(winrate),
  };
}

function createFakeBuild(winrate: number): Build {
  return {
    games: 10000,
    keystone: {
      icon: {
        url: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Domination/Electrocute/Electrocute.png",
      },
      name: "Eletrocute",
    },
    runes: {
      primaryRunePath: {
        name: "Domination",
        icon: {
          url: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7200_Domination.png",
        },
        keystones: [
          {
            icon: {
              url: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Domination/Electrocute/Electrocute.png",
            },
            name: "Thing",
          },
          {
            icon: {
              url: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Domination/Electrocute/Electrocute.png",
            },
            name: "Thing",
          },
          {
            icon: {
              url: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Domination/Electrocute/Electrocute.png",
            },
            name: "Thing",
          },
          {
            icon: {
              url: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Domination/Electrocute/Electrocute.png",
            },
            name: "Thing",
          },
        ],
        slots: [createSlot(winrate), createSlot(winrate), createSlot(winrate)],
      },
      secondaryRunePath: {
        icon: {
          url: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7204_Resolve.png",
        },
        name: "Resolve",
        slots: [createSlot(winrate), createSlot(winrate), createSlot(winrate)],
      },
      shards: createDefaultShards(winrate),
    },
    winRate: winrate,
  };
}

export function createBuildList(size: number) {
  const output: Build[] = [];
  output.push(createFakeBuild(50));
  for (let i = 0; i < size; i++) {
    output.push(createFakeBuild(generateRandomWinRate()));
  }

  return output;
}
