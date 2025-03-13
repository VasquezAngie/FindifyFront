import { useState } from "react";
import LoginModal from "../Modals/LoginModal";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-[#E8F8F7] p-4 flex justify-between items-center max-w-full">
      <div className="flex items-center space-x-8 overflow-clip">
        <img
          src="src/assets/Logo/logo_findy_prov.png"
          alt="Logo Findy Prov"
          className="w-25 h-25"
        />
        <h1 className="font-bold text-4xl">Findify</h1>
        <h4 className="py-5 px-4">Inicio</h4>
        <h4 className="py-5">Productos</h4>
      </div>

      <button
        className="bg-[#2c8c8c] text-white font-bold py-2 px-2 rounded"
        onClick={() => setIsModalOpen(true)}
      >
        Iniciar Sesión
      </button>

      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Header;
