import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useToast } from "../../context/ToastContext";
import { encryptPassword } from "../../services/EncryptPassword";
import useAuthService from "../../services/AuthService";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();
  const { login } = useAuthService();

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validación de campos
    if (!name || !email || !password || !confirmPassword) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    setIsLoading(true);

    try {
      console.log('Enviando solicitud de registro...');
      console.log('URL del backend:', `${import.meta.env.VITE_BACKEND_URL}api/auth/register`);
      console.log('Datos a enviar:', { name, email, password: '******' });
      
      // IMPORTANTE: No encriptar la contraseña aquí, el backend se encarga de hashearla
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password, // Enviar la contraseña sin encriptar, el backend la hasheará
        }),
      });

      console.log('Respuesta recibida:', response.status);
      const data = await response.json();
      console.log('Datos de respuesta:', data);

      if (!response.ok) {
        console.log('Mostrando toast de error');
        showToast(response.status, 'Error', data.message || 'Error al registrar usuario');
        setError(data.message || "Error al registrar. Intenta nuevamente.");
        setIsLoading(false);
        return;
      }

      // Procesamos la respuesta y autenticamos al usuario
      console.log('Datos recibidos:', data);
      
      if (data.data?.token && data.data?.user) {
        // Iniciar sesión automáticamente después del registro
        const { token, user } = data.data;
        
        // Adaptamos el formato de usuario que viene del backend al formato que espera AuthService
        const userData = {
          name: user.name,
          uid: user.id
        };
        
        console.log('Llamando a login con token y userData:', token, userData);
        const loginSuccess = login(token, userData);
        console.log('Login result:', loginSuccess);
        
        console.log('Mostrando toast de éxito');
        showToast(200, 'Éxito', 'Usuario registrado correctamente');
        onClose();
        navigate("/");
      } else {
        setError("Error inesperado. Por favor, intenta nuevamente.");
      }

    } catch (error) {
      console.error('Error al registrar:', error);
      setError("Ocurrió un problema de conexión. Intenta más tarde.");
      showToast(500, 'Error', 'Error de conexión');
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
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50" onClick={handleOverlayClick}>
      <div className="bg-white rounded-xl shadow-xl w-96">
        <div className="p-6 border-b flex items-center">
          <h2 className="text-xl font-bold text-center flex-grow">Registrarse</h2>
          <button 
            className="text-gray-500 cursor-pointer" 
            onClick={onClose}
            disabled={isLoading}
          >
            &times;
          </button>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-1">Nombre</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-xl"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ingresa tu nombre"
                disabled={isLoading}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border rounded-xl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingresa tu email"
                disabled={isLoading}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Contraseña</label>
              <input
                type="password"
                className="w-full px-3 py-2 border rounded-xl"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu contraseña"
                disabled={isLoading}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Confirmar Contraseña</label>
              <input
                type="password"
                className="w-full px-3 py-2 border rounded-xl"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirma tu contraseña"
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              className={`w-full bg-[#50ccc3] text-white py-2 rounded-full hover:bg-[#3ea39b] transition-colors ${isLoading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
              disabled={isLoading}
            >
              {isLoading ? 'Registrando...' : 'Registrarse'}
            </button>
          </form>
          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
