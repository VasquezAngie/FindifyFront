import React, { useEffect, useState } from 'react';

interface ToastProps {
  status: number;
  title: string;
  description: string;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ status, title, description, onClose }) => {
  const bgColor = status === 200 ? 'bg-green-500' : 'bg-red-500';
  const [isExiting, setIsExiting] = useState(false);
  
  const icon = status === 200 ? (
    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
    </svg>
  ) : (
    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
    </svg>
  );

  // Autocierre después de 4 segundos
  useEffect(() => {
    console.log('Toast montado');
    const timer = setTimeout(() => {
      console.log('Iniciando cierre automatico');
      setIsExiting(true);
      
      setTimeout(() => {
        console.log('Ejecutando onClose');
        onClose();
      }, 500);
    }, 3500);

    return () => {
      console.log('Limpiando timer');
      clearTimeout(timer);
    };
  }, [onClose]);

  // Cierre manual
  const handleClose = () => {
    console.log('Cierre manual iniciado');
    setIsExiting(true);
    
    setTimeout(() => {
      console.log('Ejecutando onClose manual');
      onClose();
    }, 500);
  };

  // Clase para animación de entrada y salida
  const translateClass = isExiting 
    ? 'translate-x-full opacity-0' 
    : 'translate-x-0 opacity-100';

  return (
    <div 
      className={`fixed bottom-4 right-4 p-5 rounded-lg shadow-xl text-white ${bgColor} transform transition-all duration-500 ease-in-out ${translateClass} z-[9999] w-80 md:w-96`}
    >
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0">
          {icon}
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-lg">{title}</h4>
          <p className="text-sm text-white text-opacity-90">{description}</p>
        </div>
        <button 
          onClick={handleClose} 
          className="text-white text-opacity-70 hover:text-opacity-100 transition-opacity"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <div className="h-1 bg-white bg-opacity-30 mt-3 rounded-full overflow-hidden">
        <div className="bg-white h-full" style={{ animation: 'shrinkWidth 3.5s linear forwards' }}></div>
      </div>
    </div>
  );
};

export default Toast;

// Asegúrate de que esta animación esté definida en tu archivo globals.css o en tu configuración de tailwind:
/*
@keyframes shrinkWidth {
  from { width: 100%; }
  to { width: 0%; }
}
*/ 