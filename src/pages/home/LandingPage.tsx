import { motion, useScroll, useTransform } from "framer-motion";
import React, { useEffect } from "react";

import Header from "../../components/Layout/Header2";
import SearchBar from "../../components/SearchBar";
import TopProducts from "../../components/TopProducts";

const MainPage: React.FC = () => {
  // Para animación de scroll
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);
  const scale = useTransform(scrollY, [0, 200], [1, 0.9]);
  const y = useTransform(scrollY, [0, 200], [0, -50]);

  // Efecto para cargar AOS
  useEffect(() => {
    document.body.style.overflowX = 'hidden';
    return () => {
      document.body.style.overflowX = 'auto';
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      <div className="fixed top-0 left-0 w-full z-50">
        <Header />
      </div>
      <div className="flex flex-col flex-grow overflow-y-auto pt-[70px] h-[calc(100vh-70px)]">
        <motion.div
          className="relative w-screen min-h-[130vh] flex flex-col justify-start bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/src/assets/2092.jpg')" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          {/* Efecto de partículas o luces flotantes (estilo Apple) */}
          <motion.div 
            className="absolute inset-0 z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 0.5, duration: 2 }}
          >
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3 + Math.random() * 5,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </motion.div>

          <motion.div 
            className="relative flex flex-col items-center justify-center text-center mt-70 z-10"
            style={{ opacity, scale, y }}
          >
            <motion.h1 
              className="text-5xl font-bold text-white mb-8 max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              ¡Empieza ahora y encuentra lo que necesitas al mejor precio!
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="w-full max-w-xl"
            >
              <SearchBar />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="mt-12"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/20 backdrop-blur-lg text-white px-8 py-3 rounded-full font-semibold hover:bg-white/30 transition duration-300"
              >
                Descubre más
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="flex flex-col items-center w-screen bg-white py-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7 }}
        >
          <motion.h2 
            className="text-3xl font-bold text-gray-800 mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Productos más buscados
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <TopProducts />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default MainPage;
