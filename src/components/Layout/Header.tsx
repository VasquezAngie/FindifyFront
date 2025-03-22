import { useState } from "react";
import LoginModal from "../Modals/LoginModal";
import RegisterModal from "../Modals/RegisterModal";
import { Link } from "react-router-dom";

const Header = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const switchToRegister = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(true);
  };

  return (
    <div className="bg-[#0A0A0A] dark:bg-[#141414] p-4 flex justify-between items-center max-w-full border-b border-[#007BFF] dark:border-[#00A3FF]">
      <div className="flex items-center space-x-8">
        <img
          src="src/assets/Logo/logo_findy_prov.png"
          alt="Logo Findy Prov"
          className="w-20 h-20"
        />
        <h1 className="font-bold text-4xl text-[#E0E0E0] dark:text-[#F5F5F5]">
          Findify
        </h1>
        <h4 className="py-5 px-4 text-[#E0E0E0] dark:text-[#00A3FF] cursor-pointer">
          Inicio
        </h4>
        <Link
          to="/productos"
          className="text-[#E0E0E0] dark:text-[#00A3FF] hover:underline"
        >
          Productos
        </Link>
      </div>

      <div className="flex space-x-4 ml-auto">
        <button
          className="bg-[#007BFF] dark:bg-[#007BFF] text-white font-bold py-2 px-4 rounded hover:bg-[#00A3FF] dark:hover:bg-[#0056B3] transition"
          onClick={() => setIsLoginOpen(true)}
        >
          Iniciar Sesión
        </button>

        <button
          className="bg-[#007BFF] dark:bg-[#007BFF] text-white font-bold py-2 px-4 rounded hover:bg-[#00A3FF] dark:hover:bg-[#0056B3] transition"
          onClick={() => setIsRegisterOpen(true)}
        >
          Registrarse
        </button>
      </div>

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSwitchToRegister={switchToRegister}
      />

      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />
    </div>
  );
};

export default Header;
