import { useState } from "react";

import useAuthService from '../../services/AuthService';

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
  const { login } = useAuthService();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: username, password }),
      });

      if (!response.ok) {
        throw new Error('Error en la autenticación');
      }

      const data = await response.json();
      const { token, user } = data.data;
      login(token, user);
      console.log('Usuario autenticado con token:', token);
      onClose();
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-96">
        <div className="p-6 border-b flex items-center">
          <h2 className="text-xl font-bold text-center flex-grow">Login</h2>
          <button className="text-gray-500" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-1">Username</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-xl"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 border rounded-xl"
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
              className="w-full bg-[#50ccc3] text-white py-2 rounded-full hover:bg-gray-500"
            >
              Login
            </button>
          </form>
          <div className="text-center mt-4">
            <p>
              ¿No tienes una cuenta?{" "}
              <button
                onClick={onSwitchToRegister}
                className="text-[#50ccc3] underline"
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
