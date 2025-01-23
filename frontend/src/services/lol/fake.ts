import {
  Build,
  RuneSlot,
  RuneSlotChoice,
  ShardOption,
  Shards,
} from "../../types/build.types";
import { getRunesReforged } from "./lol";
import { Rune, Slot } from "./lol.service.types";

const runesReforged = await getRunesReforged();

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

function createDefaultShards(): Shards {
  return {
    offense: createShardOptions(generateRandomWinRate()),
    defense: createShardOptions(generateRandomWinRate()),
    flex: createShardOptions(generateRandomWinRate()),
  };
}

function getRandomPath() {
  return runesReforged[Math.floor(Math.random() * runesReforged.length)];
}

function createRuneFromRunesReforgedRune(rune: Rune) {
  return {
    icon: {
      url: `https://ddragon.leagueoflegends.com/cdn/img/${rune.icon}`,
    },
    name: rune.name,
  };
}

function createSlots(slots: Slot[]) {
  return slots.slice(1).map((s) => {
    return {
      choices: s.runes.map((r) => {
        return {
          icon: {
            url: `https://ddragon.leagueoflegends.com/cdn/img/${r.icon}`,
          },
          name: r.name,
          winRate: generateRandomWinRate(),
        } as RuneSlotChoice;
      }),
    };
  });
}

function createFakeBuild(): Build {
  const randomPrimaryPath = getRandomPath();
  const randomSecondaryPath = getRandomPath();

  const primaryKeystones = randomPrimaryPath.slots[0].runes;
  const randomSelectedKeystone =
    primaryKeystones[Math.floor(Math.random() * primaryKeystones.length)];

  return {
    games: Math.round(Math.random() * 100000),
    keystone: createRuneFromRunesReforgedRune(randomSelectedKeystone),
    runes: {
      primaryRunePath: {
        name: randomPrimaryPath.name,
        icon: {
          url: `https://ddragon.leagueoflegends.com/cdn/img/${randomPrimaryPath.icon}`,
        },
        keystones: primaryKeystones.map((pks) =>
          createRuneFromRunesReforgedRune(pks)
        ),
        slots: createSlots(randomPrimaryPath.slots),
      },
      secondaryRunePath: {
        icon: {
          url: `https://ddragon.leagueoflegends.com/cdn/img/${randomSecondaryPath.icon}`,
        },
        name: "Resolve",
        slots: createSlots(randomSecondaryPath.slots),
      },
      shards: createDefaultShards(),
    },
    winRate: generateRandomWinRate(),
  };
}

export function createBuildList(size: number) {
  const output: Build[] = [];
  output.push(createFakeBuild());
  for (let i = 0; i < size; i++) {
    output.push(createFakeBuild());
  }

  return output;
}
