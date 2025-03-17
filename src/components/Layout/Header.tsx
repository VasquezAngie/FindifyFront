import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useSignOut from "react-auth-kit/hooks/useSignOut";

import LoginModal from "../Modals/LoginModal";
import RegisterModal from "../Modals/RegisterModal";
import { useToast } from "../../context/ToastContext";
import { IUserData } from "../../services/AuthService";

const Header = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const isAuthenticated = useIsAuthenticated();
  const auth = useAuthUser() as { user: IUserData } | null;
  const signOut = useSignOut();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Función para cambiar de Login a Registro
  const switchToRegister = () => {
    setIsLoginOpen(false); // Cierra el modal de login
    setIsRegisterOpen(true); // Abre el modal de registro
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    signOut();
    setDropdownOpen(false);
    showToast(200, 'Éxito', 'Sesión cerrada correctamente');
    navigate('/');
  };

  // Cerrar el dropdown cuando se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

      <div className="flex items-center space-x-2 ml-auto">
        {isAuthenticated ? (
          <div className="relative" ref={dropdownRef}>
            <div 
              className="flex items-center space-x-2 cursor-pointer" 
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <span className="text-gray-700">
                ¡Hola, {auth?.user?.name || 'Usuario'}!
              </span>
              <div className="w-10 h-10 rounded-full bg-[#2c8c8c] flex items-center justify-center text-white font-semibold">
                {auth?.user?.name ? auth.user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-4 w-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 py-2 bg-white rounded shadow-xl z-20">
                <a 
                  href="#perfil" 
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  Mi perfil
                </a>
                <a 
                  href="#configuracion" 
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  Configuración
                </a>
                <div className="border-t border-gray-200 my-1"></div>
                <button
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
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
          </>
        )}
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
