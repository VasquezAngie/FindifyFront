import { useState } from "react";

import { useToast } from "../../context/ToastContext";
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuthService();
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validación básica
    if (!email || !password) {
      setError("Por favor completa todos los campos");
      return;
    }

    setIsLoading(true);

    try {
      // No encriptar la contraseña, el backend se encarga de compararla
      console.log("Enviando solicitud de login...");
      console.log("URL:", `${import.meta.env.VITE_BACKEND_URL}api/auth/login`);
      console.log("Datos:", { email, password: "******" });

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password, // Enviar contraseña sin encriptar
          }),
        }
      );

      console.log("Respuesta recibida:", response.status);
      const data = await response.json();
      console.log("Datos de respuesta:", data);

      if (!response.ok) {
        console.log("Error de autenticación:", data);
        setError(data.message || "Error en la autenticación");
        showToast(
          response.status,
          "Error",
          data.message || "Error en la autenticación"
        );
        setIsLoading(false);
        return;
      }

      // Adaptamos el formato de usuario que viene del backend al formato que espera AuthService
      const { token, user } = data.data;
      const userData = {
        name: user.name,
        uid: user.id,
      };

      const loginSuccess = login(token, userData);
      console.log(
        "Usuario autenticado con token:",
        token,
        "Login success:",
        loginSuccess
      );
      showToast(200, "Éxito", "Usuario autenticado correctamente");
      onClose();
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setError("Error de conexión. Intenta más tarde.");
      showToast(500, "Error", "Error de conexión");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !isLoading) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-white dark:bg-[#121212] rounded-xl shadow-xl w-96">
        <div className="p-6 border-b dark:border-gray-700 flex items-center">
          <h2 className="text-xl font-bold text-center flex-grow dark:text-white">
            Iniciar Sesión
          </h2>
          <button
            className="text-gray-500 dark:text-gray-300 cursor-pointer"
            onClick={onClose}
            disabled={isLoading}
          >
            &times;
          </button>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-1 dark:text-gray-300">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border rounded-xl dark:bg-[#1e1e1e] dark:border-gray-700 dark:text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingresa tu email"
                disabled={isLoading}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 dark:text-gray-300">
                Contraseña
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border rounded-xl dark:bg-[#1e1e1e] dark:border-gray-700 dark:text-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu contraseña"
                disabled={isLoading}
              />
            </div>
            <div className="mb-4 flex items-center space-x-2">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                disabled={isLoading}
                id="rememberMe"
                className="dark:accent-[#50ccc3]"
              />
              <label
                htmlFor="rememberMe"
                className="select-none dark:text-gray-300"
              >
                Recordarme
              </label>
            </div>
            <button
              type="submit"
              className={`w-full bg-[#50ccc3] text-white py-2 rounded-full hover:bg-[#3ea39b] transition-colors ${
                isLoading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </button>
          </form>
          {error && (
            <p className="text-red-500 dark:text-red-400 mt-4 text-center">
              {error}
            </p>
          )}
          <div className="text-center mt-4">
            <p className="dark:text-gray-300">
              ¿No tienes una cuenta?{" "}
              <button
                onClick={onSwitchToRegister}
                className="text-[#50ccc3] underline cursor-pointer"
                disabled={isLoading}
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
