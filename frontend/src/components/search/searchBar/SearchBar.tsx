import { FC } from "react";
import "./SearchBar.css";
import { useKeyCapture } from "../../../hooks/useKeyboard";

interface SearchBarProps {
  placeholder?: string;
  searchQuery: string;
  onSearchQueryChange: (filterText: string) => void;
}

export const SearchBar: FC<SearchBarProps> = ({
  placeholder,
  searchQuery,
  onSearchQueryChange,
}) => {
  function onKeydown() {
    onSearchQueryChange("");
  }

  const keyboard = useKeyCapture(onKeydown, false, new Set(["Escape"]));

  return (
    <input
      className="search-bar"
      type="text"
      placeholder={placeholder}
      value={searchQuery}
      onChange={(e) => onSearchQueryChange(e.target.value)}
      onFocus={() => {
        keyboard.activateKeyboard();
      }}
      onBlur={() => keyboard.deactivateKeyboard()}
    />
  );
};
