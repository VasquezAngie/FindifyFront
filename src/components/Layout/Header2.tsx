import { useState } from "react";
import { Link } from "react-router-dom";
import LoginModal from "../Modals/LoginModal";
import RegisterModal from "../Modals/RegisterModal";

const Header2 = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const toggleLoginModal = () => setIsLoginOpen(!isLoginOpen);
  const toggleRegisterModal = () => setIsRegisterOpen(!isRegisterOpen);
  const switchToRegister = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(true);
  };

  return (
    <header className="sticky top-0 left-0 w-full bg-[#F8F8F8] dark:bg-[#121212] p-4 flex justify-between items-center border-b border-[#89CFF0] dark:border-[#4A90E2] z-50">
      <div className="flex items-center space-x-8">
        <img
          src="src/assets/Logo/logo_findy_prov.png"
          alt="Logo Findy Prov"
          className="w-20 h-20"
        />
        <h1 className="font-bold text-4xl text-[#333333] dark:text-[#FFFFFF]">
          Findify
        </h1>
        <nav className="flex space-x-4 ">
          <Link
            to="/"
            className="py-5 px-4 text-[#333333] dark:text-[#89CFF0] cursor-pointer hover:underline"
          >
            Inicio
          </Link>
          <Link
            to="/productos"
            className="py-5 text-[#333333] dark:text-[#89CFF0] hover:underline"
          >
            Productos
          </Link>
        </nav>
      </div>

      <div className="flex space-x-4">
        <button
          className="bg-[#75BFBF] dark:bg-[#82ffffb7] text-[#333333] dark:text-white font-bold py-2 px-4 rounded hover:bg-[#4A90E2] dark:hover:bg-[#89CFF0] transition"
          onClick={toggleLoginModal}
        >
          Iniciar Sesión
        </button>
        <button
          className="bg-[#75BFBF] dark:bg-[#82ffffb7] text-[#333333] dark:text-white font-bold py-2 px-4 rounded hover:bg-[#4A90E2] dark:hover:bg-[#89CFF0] transition"
          onClick={toggleRegisterModal}
        >
          Registrarse
        </button>
      </div>

      <LoginModal
        isOpen={isLoginOpen}
        onClose={toggleLoginModal}
        onSwitchToRegister={switchToRegister}
      />
      <RegisterModal isOpen={isRegisterOpen} onClose={toggleRegisterModal} />
    </header>
  );
};

export default Header2;
