import AramProIcon from "./AramProIcon";
import "./header.css";
import { Link } from "@tanstack/react-router";
import ChampionSearchBar from "./search/ChampionSearchBar";

export default function Header() {
  return (
    <div className="header">
      <Link to="/">
        <AramProIcon width={150} />
      </Link>
      <ChampionSearchBar />
    </div>
  );
}
