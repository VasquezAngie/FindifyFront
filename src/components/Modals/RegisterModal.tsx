import React, { useState } from 'react';
import { RegisterHandleSubmit } from '../../services/RegisterService'; 

const ModalRegistro = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    email: '',
    cc: '',
    celular: '',
    direccion: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Registrar</button>

      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Registro</h2>
            </div>
            {isSuccess ? (
              <div className="text-center space-y-4">
                <p>Registro exitoso. Ahora <strong>INICIAR SESIÓN</strong></p>
                <button onClick={() => setIsOpen(false)}>Cerrar</button>
              </div>
            ) : (
              <form onSubmit={(e) => RegisterHandleSubmit(e, formData, setIsSuccess)} className="space-y-4">
                <input
                  name="nombres"
                  placeholder="Nombres"
                  value={formData.nombres}
                  onChange={handleChange}
                  required
                />
                <input
                  name="apellidos"
                  placeholder="Apellidos"
                  value={formData.apellidos}
                  onChange={handleChange}
                  required
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <input
                  name="cc"
                  placeholder="CC"
                  value={formData.cc}
                  onChange={handleChange}
                  required
                />
                <input
                  name="celular"
                  placeholder="Celular"
                  value={formData.celular}
                  onChange={handleChange}
                  required
                />
                <input
                  name="direccion"
                  placeholder="Dirección"
                  value={formData.direccion}
                  onChange={handleChange}
                  required
                />
                <input
                  name="password"
                  type="password"
                  placeholder="Contraseña"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <div className="modal-footer">
                  <button type="submit">Registrar</button>
                  <button type="button" onClick={() => setIsOpen(false)}>Cerrar</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalRegistro;
