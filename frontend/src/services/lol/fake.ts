import { Build, RuneSlot, RuneSlotChoice } from "../../types/build.types";

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

function createFakeBuild(winrate: number): Build {
  return {
    games: 10000,
    runes: {
      keystone: {
        icon: {
          url: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Domination/Electrocute/Electrocute.png",
        },
        name: "Eletrocute",
      },
      primaryRunePath: {
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
        slots: [createSlot(winrate), createSlot(winrate), createSlot(winrate)],
      },
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
