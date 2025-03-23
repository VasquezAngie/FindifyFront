import React from "react";
import Header from "../../components/Layout/Header2";
import SearchBar from "../../components/SearchBar";
import TopProducts from "../../components/TopProducts";

const MainPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 w-full z-50">
        <Header />
      </div>
      <div className="flex flex-col flex-grow overflow-y-auto pt-[70px] h-[calc(100vh-70px)]">
        <div
          className="relative w-screen min-h-[130vh] flex flex-col justify-start bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/src/assets/2092.jpg')" }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>

          <div className="relative flex flex-col items-center justify-center text-center mt-70">
            <h1 className="text-4xl font-bold text-white mb-6 max-w-3xl">
              ¡Empieza ahora y encuentra lo que necesitas al mejor precio!
            </h1>
            <SearchBar />
          </div>
        </div>
        <div className="flex flex-col items-center w-screen">
          <TopProducts />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
