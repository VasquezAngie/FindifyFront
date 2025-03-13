import { ChangeEvent, useState } from "react";
import "boxicons"


const SearchBar = ()=>{
    const [query,setQuery]=useState("");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
      };
    
      return (
        <div className="flex items-center w-200  rounded-full border border-gray-300 bg-white p-2  shadow-sm">
            <input
                type="text"
                value={query}
                placeholder="Buscar productos..."
                onChange={handleChange}
                className="flex-1 outline-none bg-transparent px-2  placeholder-gray-500 text-gray-500"
            />
            <div className="bg-[#2c8c8c] p-2 rounded-full">
                <img className="w-5 h-5" src="src/assets/search.svg" alt="Buscar" />
            </div>
        </div>

        
      );
};
    
    export default SearchBar;




