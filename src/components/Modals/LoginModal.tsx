import { useState, useEffect } from "react";
import useAuthService from "../../services/AuthService";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegister: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onSwitchToRegister,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { login } = useAuthService();

  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setIsDarkMode(prefersDark);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: username, password }),
        }
      );

      if (!response.ok) {
        throw new Error("Error en la autenticación");
      }

      const data = await response.json();
      const { token, user } = data.data;
      login(token, user);
      console.log("Usuario autenticado con token:", token);
      onClose();
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 ${
        isDarkMode ? "bg-[#0A0A0A]" : "bg-[#F5F5F5]"
      }`}
    >
      <div
        className={`rounded-xl shadow-xl w-96 ${
          isDarkMode ? "bg-[#141414] text-[#E0E0E0]" : "bg-white text-[#1A1A1A]"
        }`}
      >
        <div
          className={`p-6 border-b flex items-center ${
            isDarkMode ? "border-[#141414]" : "border-[#D9D9D9]"
          }`}
        >
          <h2 className="text-xl font-bold text-center flex-grow">Login</h2>
          <button
            className={`text-gray-500 ${
              isDarkMode ? "hover:text-[#00A3FF]" : "hover:text-[#0056B3]"
            }`}
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-1">Username</label>
              <input
                type="text"
                className={`w-full px-3 py-2 border rounded-xl ${
                  isDarkMode
                    ? "bg-[#141414] border-[#141414] text-[#E0E0E0]"
                    : "bg-white border-[#D9D9D9] text-[#1A1A1A]"
                }`}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Password</label>
              <input
                type="password"
                className={`w-full px-3 py-2 border rounded-xl ${
                  isDarkMode
                    ? "bg-[#141414] border-[#141414] text-[#E0E0E0]"
                    : "bg-white border-[#D9D9D9] text-[#1A1A1A]"
                }`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
            </div>
            <div className="mb-4 flex items-center space-x-2">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <label>Remember me</label>
            </div>
            <button
              type="submit"
              className={`w-full py-2 rounded-full ${
                isDarkMode
                  ? "bg-[#007BFF] text-white hover:bg-[#00A3FF]"
                  : "bg-[#007BFF] text-white hover:bg-[#0056B3]"
              }`}
            >
              Login
            </button>
          </form>
          <div className="text-center mt-4">
            <p>
              ¿No tienes una cuenta?{" "}
              <button
                onClick={onSwitchToRegister}
                className={`underline ${
                  isDarkMode ? "text-[#00A3FF]" : "text-[#007BFF]"
                }`}
              >
                Regístrate
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
