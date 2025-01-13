import { Build, Rune, RunePage } from "../types/build.types";
import {Image} from "../components/Image"

export function BuildDisplay(props: { build: Build }) {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1 }}>
        <RunePageDisplay runePage={props.build.runePage} />
      </div>
      <div style={{ flex: 1 }}>
        <Items />
      </div>
    </div>
  );
}

function RunePageDisplay(props: { runePage: RunePage }) {
  return <>
    <RuneIcon rune={props.runePage.primaryPath.keystone}/>
  </>;
}

// function RunePath(_props: {name: string}) {
//   // const runes = await getRunes()
//   return <></>

// }

function RuneIcon(props: {rune: Rune}) {
  return <Image src={props.rune.iconUrl}/>
}

function Items() {
  return <></>;
}
