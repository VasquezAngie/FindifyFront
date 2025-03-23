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

  const switchToRegister = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(true);
  };

  const handleLogout = () => {
    signOut();
    setDropdownOpen(false);
    showToast(200, "Éxito", "Sesión cerrada correctamente");
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
        <nav className="flex space-x-4">
          <a
            href="/"
            className="py-5 px-4 text-[#333333] dark:text-[#89CFF0] hover:underline"
          >
            Inicio
          </a>
          <a
            href="/productos"
            className="py-5 text-[#333333] dark:text-[#89CFF0] hover:underline"
          >
            Productos
          </a>
        </nav>
      </div>

      <div className="flex space-x-4">
        {isAuthenticated ? (
          <div className="relative" ref={dropdownRef}>
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <span className="text-[#333333] dark:text-white">
                ¡Hola, {auth?.user?.name || "Usuario"}!
              </span>
              <div className="w-10 h-10 rounded-full bg-[#2c8c8c] flex items-center justify-center text-white font-semibold">
                {auth?.user?.name
                  ? auth.user.name.charAt(0).toUpperCase()
                  : "U"}
              </div>
            </div>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 py-2 bg-white dark:bg-[#222] rounded shadow-xl z-20">
                <a
                  href="#perfil"
                  className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-[#444]"
                >
                  Mi perfil
                </a>
                <a
                  href="#configuracion"
                  className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-[#444]"
                >
                  Configuración
                </a>
                <div className="border-t border-gray-200 dark:border-gray-600 my-1"></div>
                <button
                  className="block w-full text-left px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-[#444]"
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
              className="bg-[#75BFBF] dark:bg-[#82ffffb7] text-[#333333] dark:text-white font-bold py-2 px-4 rounded hover:bg-[#4A90E2] dark:hover:bg-[#89CFF0] transition"
              onClick={() => setIsLoginOpen(true)}
            >
              Iniciar Sesión
            </button>
            <button
              className="bg-[#75BFBF] dark:bg-[#82ffffb7] text-[#333333] dark:text-white font-bold py-2 px-4 rounded hover:bg-[#4A90E2] dark:hover:bg-[#89CFF0] transition"
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
        onSwitchToRegister={switchToRegister}
      />
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />
    </header>
  );
};

export default Header;
