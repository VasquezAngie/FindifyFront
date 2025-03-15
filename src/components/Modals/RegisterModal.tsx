import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { encryptPassword } from "../../services/EncryptPassword";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      const encryptedPassword = encryptPassword(password);
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password: encryptedPassword }),
      });

      if (!response.ok) {
        setError("Error al registrar. Intenta nuevamente.");
        return;
      }

      onClose();
      navigate("/MainPage");
    } catch (error) {
      setError("Ocurrió un problema de conexión. Intenta más tarde.");
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-96">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold text-center">Registro</h2>
          <button className="text-gray-500" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-1">Nombre de usuario</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-xl"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ingresa tu usuario"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Correo electrónico</label>
              <input
                type="email"
                className="w-full px-3 py-2 border rounded-xl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingresa tu correo"
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
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Confirmar contraseña</label>
              <input
                type="password"
                className="w-full px-3 py-2 border rounded-xl"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirma tu contraseña"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#50ccc3] text-white py-2 rounded-full hover:bg-gray-500"
            >
              Registrarse
            </button>
          </form>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
