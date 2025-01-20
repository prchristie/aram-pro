import { AnchorHTMLAttributes, FC } from "react";
import { Champion } from "../../services/lol/lol";
import "./redirectable-champion-splash.css";
import Image from "../Image";
import { Link } from "@tanstack/react-router";

interface ClickableChampionSplashProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  champion: Champion;
}

const RedirectableChampionSplash: FC<ClickableChampionSplashProps> = ({
  champion,
  ...props
}) => {
  return (
    <Link {...props} to="/champion/$name" params={{ name: champion.name }}>
      <Image
        className="champion-splash"
        src={champion.portraitUrl}
        alt={champion.name}
      />
    </Link>
  );
};

export default RedirectableChampionSplash;
