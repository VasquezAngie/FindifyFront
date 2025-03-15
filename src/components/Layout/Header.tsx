import { useState } from "react";
import LoginModal from "../Modals/LoginModal";
import RegisterModal from "../Modals/RegisterModal";

const Header = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  // Función para cambiar de Login a Registro
  const switchToRegister = () => {
    setIsLoginOpen(false); // Cierra el modal de login
    setIsRegisterOpen(true); // Abre el modal de registro
  };

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

      <div className="flex space-x-2 ml-auto">
        <button
          className="bg-[#2c8c8c] text-white font-bold py-2 px-2 rounded"
          onClick={() => setIsLoginOpen(true)}
        >
          Iniciar Sesión
        </button>

        <button
          className="bg-[#2c8c8c] text-white font-bold py-2 px-2 rounded"
          onClick={() => setIsRegisterOpen(true)}
        >
          Registrarse
        </button>
      </div>

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSwitchToRegister={switchToRegister} // Prop para cambiar a registro
      />

      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />
    </div>
  );
};

export default Header;
