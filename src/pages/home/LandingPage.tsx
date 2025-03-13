import React from "react";
import Header from "../../components/Layout/Header";
import SearchBar from "../../components/SearchBar";
import TopProducts from "../../components/TopProducts";

const MainPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#E8F8F7] flex flex-col ">
      <Header />
      <div className="w-full max-w-3xl px-4 mt-8 mb-8 text-center mx-auto">
        <h1 className="text-4xl font-bold mb-6">
          ¡Empieza ahora y encuentra lo que necesitas al mejor precio!
        </h1>
      </div>
      <div className="w-full mb-12 flex justify-center">{<SearchBar />}</div>
      <div className="w-full">
        <TopProducts />
      </div>
    </div>
  );
};

export default MainPage;
