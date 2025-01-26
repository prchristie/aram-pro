import AramProIcon from "../AramProIcon";
import "./header.css";
import { Link } from "@tanstack/react-router";
import ChampionSearchBar from "./champion-search-bar/ChampionSearchBar";

export default function Header() {
  return (
    <div className="header">
      <Link to="/">
        <AramProIcon width={150} />
      </Link>
      <div className="search-bar-container">
        <ChampionSearchBar />
      </div>
    </div>
  );
}
