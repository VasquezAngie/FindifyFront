import React, { createContext, useContext, useState, ReactNode } from 'react';
import Toast from '../components/Toast';

interface ToastContextType {
  showToast: (status: number, title: string, description: string) => void;
}

interface ToastData {
  id: number;
  status: number;
  title: string;
  description: string;
  isVisible: boolean;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Mantenemos un array de toasts en lugar de solo uno
  const [toasts, setToasts] = useState<ToastData[]>([]);
  
  // Contador para ID único
  const [counter, setCounter] = useState(0);

  // Mostrar un nuevo toast
  const showToast = (status: number, title: string, description: string) => {
    const newId = counter + 1;
    setCounter(newId);
    
    // Añadir el nuevo toast al array
    setToasts(prev => [...prev, {
      id: newId,
      status,
      title,
      description,
      isVisible: true
    }]);
  };

  // Manejar el cierre de un toast específico por ID
  const handleClose = (id: number) => {
    // Marcar el toast como no visible
    setToasts(prev => 
      prev.map(toast => 
        toast.id === id ? { ...toast, isVisible: false } : toast
      )
    );
    
    // Eliminar el toast del array después de la animación
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 500);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Mostrar todos los toasts visibles */}
      {toasts.map(toast => (
        <Toast 
          key={toast.id}
          status={toast.status} 
          title={toast.title} 
          description={toast.description} 
          onClose={() => handleClose(toast.id)} 
        />
      ))}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}; 
