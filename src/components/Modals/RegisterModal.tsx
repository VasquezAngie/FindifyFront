import React, { useState, useEffect } from "react";
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
  const [isDarkMode, setIsDarkMode] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setIsDarkMode(prefersDark);
  }, []); // <-- Aquí faltaba el punto y coma

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
          className={`p-6 border-b flex justify-between items-center ${
            isDarkMode ? "border-[#141414]" : "border-[#D9D9D9]"
          }`}
        >
          <h2 className="text-xl font-bold text-center">Registro</h2>
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
              <label className="block mb-1 font-semibold">
                Nombre de usuario
              </label>
              <input
                type="text"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  isDarkMode
                    ? "bg-[#141414] border-[#141414] text-[#E0E0E0] focus:ring-[#00A3FF]"
                    : "bg-white border-[#D9D9D9] text-[#1A1A1A] focus:ring-[#007BFF]"
                }`}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ingresa tu usuario"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-semibold">
                Correo electrónico
              </label>
              <input
                type="email"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  isDarkMode
                    ? "bg-[#141414] border-[#141414] text-[#E0E0E0] focus:ring-[#00A3FF]"
                    : "bg-white border-[#D9D9D9] text-[#1A1A1A] focus:ring-[#007BFF]"
                }`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingresa tu correo"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-semibold">Contraseña</label>
              <input
                type="password"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  isDarkMode
                    ? "bg-[#141414] border-[#141414] text-[#E0E0E0] focus:ring-[#00A3FF]"
                    : "bg-white border-[#D9D9D9] text-[#1A1A1A] focus:ring-[#007BFF]"
                }`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu contraseña"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-semibold">
                Confirmar contraseña
              </label>
              <input
                type="password"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  isDarkMode
                    ? "bg-[#141414] border-[#141414] text-[#E0E0E0] focus:ring-[#00A3FF]"
                    : "bg-white border-[#D9D9D9] text-[#1A1A1A] focus:ring-[#007BFF]"
                }`}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirma tu contraseña"
              />
            </div>
            <button
              type="submit"
              className={`w-full py-2 rounded-full font-semibold transition-colors duration-300 ${
                isDarkMode
                  ? "bg-[#007BFF] text-white hover:bg-[#00A3FF]"
                  : "bg-[#007BFF] text-white hover:bg-[#0056B3]"
              }`}
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
