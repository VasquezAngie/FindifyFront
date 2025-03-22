import { ChangeEvent, useState } from "react";
import "boxicons";

const SearchBar = () => {
  const [query, setQuery] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="flex items-center w-full max-w-md rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 p-0.5 shadow-md">
      <input
        type="text"
        value={query}
        placeholder="Buscar productos..."
        onChange={handleChange}
        className="flex-1 outline-none bg-transparent px-4 text-gray-700 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400"
      />
      <button className="bg-[#75BFBF] dark:bg-[#82ffffb7] p-3 rounded-full transition hover:bg-[#0056b3] dark:hover:bg-[#0080FF]">
        <img className="w-6 h-6" src="src/assets/search.svg" alt="Buscar" />
      </button>
    </div>
  );
};

export default SearchBar;
