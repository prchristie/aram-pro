import { createFileRoute, createLazyFileRoute } from '@tanstack/react-router'
import { Champion } from '../../services/lol'
import RedirectableChampionSplash from '../../components/search/RedirectableChampionSplash'
import { CSSProperties, useEffect, useMemo, useState } from 'react'
import Image from '../../components/Image'
import { BuildDisplay } from '../../components/BuildDisplay'
import {
  Build,
  RunePage,
  NormalPercentage,
  Rune,
} from '../../types/build.types'

export const Route = createLazyFileRoute('/champion/$name')({
  component: () => <ChampionPage />,
  pendingComponent: () => <>loading</>
})

function getChampionByName(name: string): Champion {
  return {
    name: name,
    portraitUrl:
      'https://ddragon.leagueoflegends.com/cdn/12.10.1/img/champion/Aatrox.png',
  }
}

function SelectableBuildChoice(props: {
  build: Build
  onClick: (build: Build) => void
}) {
  return (
    <div
      style={{
        backgroundColor: '#37403d',
        borderRadius: '12px',
        display: 'flex',
        flex: '1 0 0',
        flexDirection: 'column',
        justifyItems: 'center',
        alignItems: 'stretch',
        padding: '5px 15px',
        cursor: 'pointer',
      }}
      onClick={() => props.onClick(props.build)}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div>
          <Image width={75} src={props.build.primaryRune.iconUrl} />
        </div>
        <div>
          <Image width={25} src={props.build.secondaryRune.iconUrl} />
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          gap: '15px',
        }}
      >
        <div>{props.build.winRate.number}%</div>
        <div style={{ textAlign: 'center' }}>
          <div>Games</div>
          <div>{props.build.games}</div>
        </div>
      </div>
    </div>
  )
}

function SelectableBuildsList(props: {
  style?: CSSProperties
  builds: Build[]
  onBuildSelect: (build: Build) => void
}) {
  return (
    <div style={{ display: 'flex', gap: '15px', ...props.style }}>
      {props.builds.map((b) => (
        <SelectableBuildChoice
          build={b}
          onClick={props.onBuildSelect}
        ></SelectableBuildChoice>
      ))}
    </div>
  )
}

export function ChampionPage() {
  const params = Route.useParams()
  const [selectedBuild, setSelectedBuild] = useState<Build | undefined>(
    undefined,
  )
  const [selectableBuilds, setSelectableBuilds] = useState<Build[]>([])

  const champion = useMemo(() => getChampionByName(params.name), [params.name])
  useEffect(() => {
    getChampionBuilds(champion).then((bs) => {
      if (bs.length === 0) {
        throw new Error('No builds found')
      }
      setSelectableBuilds(bs)
      setSelectedBuild(bs[0])
    })
  })

  return (
    <div>
      <div
        style={{
          display: 'flex',
          gap: '50px',
        }}
      >
        <RedirectableChampionSplash
          style={{ flexShrink: '0' }}
          champion={champion}
        />
        <SelectableBuildsList
          style={{ overflow: 'auto' }}
          builds={selectableBuilds}
          onBuildSelect={setSelectedBuild}
        />
      </div>
      <div className="runes-and-items-container">
        {selectedBuild ? <BuildDisplay build={selectedBuild} /> : 'Loading...'}
      </div>
    </div>
  )
}

async function getChampionBuilds(_champion: Champion): Promise<Build[]> {
  const rune1: Rune = {
    iconUrl:
      'https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Domination/Electrocute/Electrocute.png',
    id: 8112,
    key: 'Electrocute',
    name: 'Electrocute',
  }
  const rune2 = {
    iconUrl:
      'https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7200_Domination.png',
    id: 8100,
    key: 'Domination',
    name: 'Domination',
  }

  const runePage: RunePage = {
    primaryPath: {
      keystone: rune1,
      lesserSlot1: rune2,
      lesserSlot2: rune2,
      lesserSlot3: rune2,
    },
    secondaryPath: {
      lesserSlot1: rune2,
      lesserSlot2: rune2,
    },
    shards: {
      defenseId: 5001,
      flexId: 5008,
      offenseId: 5005,
    },
  }

  return [
    {
      games: 100,
      primaryRune: {
        iconUrl:
          'https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Domination/Electrocute/Electrocute.png',
        id: 8112,
        key: 'Electrocute',
        name: 'Electrocute',
      },
      secondaryRune: {
        iconUrl:
          'https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7200_Domination.png',
        id: 8100,
        key: 'Domination',
        name: 'Domination',
      },
      winRate: NormalPercentage.create(50),
      runePage,
    },
  ]
}
