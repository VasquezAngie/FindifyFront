import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { encryptPassword } from '../../services/EncryptPassword';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const signIn = useSignIn();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const encryptedPassword = encryptPassword(password);
      const response = await fetch("http://localhost:5000/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: username, password: encryptedPassword }),
      });

      if (!response.ok) {
        setError("Credenciales incorrectas");
        return;
      }

      const data = await response.json();

      const success = signIn({
        auth: { token: data.token, type: "Bearer" },
        userState: { user: { name: data.user.name, uid: data.user.uid } }
      });

      if (success) {
        onClose();
        navigate('/MainPage');
      } else {
        setError("Error al iniciar sesión. Intenta nuevamente.");
      }
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
          <h2 className="text-xl font-bold text-center">Login</h2>
          <button className="text-gray-500" onClick={onClose}>&times;</button>
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
            <div className="mb-4">
              <label className="flex items-center space-x-2">
                <input 
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <span>Remember me</span>
              </label>
            </div>  
            <button 
              type="submit" 
              className="w-full bg-[#50ccc3] text-white py-2 rounded-full hover:bg-gray-500"
            >
              Login
            </button>
          </form>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
        <div className="p-4 border-t text-center">
          <p>Not a member? <a href="#" className="text-[#50ccc3]">Sign Up</a></p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
