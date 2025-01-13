import { FC } from "react";
import "./SearchBar.css";

interface SearchBarProps {
  placeholder?: string;
  filterText: string;
  setFilterText: (filterText: string) => void;
}

export const SearchBar: FC<SearchBarProps> = ({
  placeholder,
  filterText,
  setFilterText,
}) => {
  return (
    <input
      className="search-bar"
      type="text"
      placeholder={placeholder}
      value={filterText}
      onChange={(e) => setFilterText(e.target.value)}
    />
  );
};
