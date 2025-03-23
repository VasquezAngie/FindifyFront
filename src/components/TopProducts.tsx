import { motion } from "framer-motion";
import { useRef } from "react";
import { Navigation, Pagination, EffectCoverflow } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/swiper-bundle.css";

const TopProducts = () => {
  const swiperRef = useRef(null);
  
  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      category: "Electronics",
      price: 99.99,
      image: "src/assets/Gatitoconporro.png",
      author: "John Doe",
      date: "2024-02-15",
      description: "High-quality wireless headphones with noise cancellation.",
    },
    {
      id: 2,
      name: "Smartphone X",
      category: "Mobile",
      price: 799.99,
      image: "src/assets/Gatitoconporro.png",
      author: "Jane Smith",
      date: "2024-01-20",
      description:
        "Latest generation smartphone with an advanced camera system.",
    },
    {
      id: 3,
      name: "Gaming Laptop",
      category: "Computers",
      price: 1299.99,
      image: "src/assets/Gatitoconporro.png",
      author: "Alice Johnson",
      date: "2024-03-10",
      description:
        "Powerful gaming laptop with high-end GPU and fast refresh rate.",
    },
    {
      id: 4,
      name: "Smartwatch Pro",
      category: "Wearables",
      price: 199.99,
      image: "src/assets/Gatitoconporro.png",
      author: "Michael Brown",
      date: "2024-02-25",
      description: "Feature-rich smartwatch with health tracking and GPS.",
    },
    {
      id: 5,
      name: "4K Smart TV",
      category: "Home Entertainment",
      price: 599.99,
      image: "src/assets/Gatitoconporro.png",
      author: "Sophia Davis",
      date: "2024-01-05",
      description: "Large 4K Smart TV with HDR and streaming services.",
    },
    {
      id: 6,
      name: "Bluetooth Speaker",
      category: "Audio",
      price: 49.99,
      image: "src/assets/Gatitoconporro.png",
      author: "Daniel Wilson",
      date: "2024-02-28",
      description:
        "Portable Bluetooth speaker with deep bass and long battery life.",
    },
    {
      id: 7,
      name: "Gaming Mouse",
      category: "Accessories",
      price: 39.99,
      image: "src/assets/Gatitoconporro.png",
      author: "Emma Martinez",
      date: "2024-03-02",
      description:
        "Ergonomic gaming mouse with customizable buttons and RGB lighting.",
    },
    {
      id: 8,
      name: "Mechanical Keyboard",
      category: "Accessories",
      price: 89.99,
      image: "src/assets/Gatitoconporro.png",
      author: "Oliver Taylor",
      date: "2024-01-30",
      description: "RGB mechanical keyboard with customizable key switches.",
    },
    {
      id: 9,
      name: "Fitness Tracker",
      category: "Wearables",
      price: 59.99,
      image: "src/assets/Gatitoconporro.png",
      author: "Isabella Clark",
      date: "2024-02-12",
      description: "Fitness tracker with heart rate monitor and step counter.",
    },
    {
      id: 10,
      name: "Drone Camera",
      category: "Cameras",
      price: 499.99,
      image: "src/assets/Gatitoconporro.png",
      author: "Liam White",
      date: "2024-03-05",
      description:
        "High-definition drone camera with stabilization and long battery life.",
    },
  ];

  // Variantes de animación de Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      } 
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 12
      } 
    }
  };

  // Animación para los botones de navegación
  const navButtonVariants = {
    initial: { scale: 1, opacity: 0.7 },
    hover: { scale: 1.1, opacity: 1 },
    tap: { scale: 0.95 }
  };

  return (
    <motion.div 
      className="w-full relative py-15 bg-gradient-to-b from-white to-gray-50 dark:from-[#0A0A0A] dark:to-[#121212] text-[#1A1A1A] dark:text-[#E0E0E0]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.h2 
          className="text-4xl font-semibold tracking-tight sm:text-5xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Los 10 productos <br /> más comprados esta semana
        </motion.h2>

        <motion.div 
          className="relative mt-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Botones de navegación con animación */}
          <motion.div 
            className="absolute -left-10 md:-left-16 top-1/2 transform -translate-y-1/2 z-10 swiper-button-prev cursor-pointer before:hidden bg-white/30 dark:bg-black/30 backdrop-blur-md w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-lg"
            variants={navButtonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </motion.div>
          
          <motion.div 
            className="absolute -right-10 md:-right-16 top-1/2 transform -translate-y-1/2 z-10 swiper-button-next cursor-pointer before:hidden bg-white/30 dark:bg-black/30 backdrop-blur-md w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-lg"
            variants={navButtonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </motion.div>

          {/* Carrusel mejorado */}
          <Swiper
            ref={swiperRef}
            modules={[Navigation, Pagination, EffectCoverflow]}
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            spaceBetween={10}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false,
            }}
            breakpoints={{
              640: { slidesPerView: 1.3 },
              768: { slidesPerView: 2.3 },
              1024: { slidesPerView: 3.3 },
            }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            pagination={{ 
              el: ".swiper-pagination", 
              clickable: true,
              dynamicBullets: true
            }}
            loop={true}
            speed={800}
          >
            {products.map((product) => (
              <SwiperSlide key={product.id} className="py-10 px-3">
                <motion.article 
                  variants={cardVariants}
                  className="flex flex-col items-center p-6 rounded-2xl shadow-lg bg-white/90 dark:bg-[#141414]/90 backdrop-blur-md border border-gray-100 dark:border-gray-800 text-[#1A1A1A] dark:text-[#E0E0E0] transform transition-all duration-300 hover:scale-[1.03] hover:shadow-xl overflow-hidden"
                  whileHover={{ 
                    y: -5,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)"
                  }}
                >
                  {/* Fondo de la tarjeta con efecto de gradiente sutil */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-white/50 dark:from-gray-900/50 dark:to-black/50 -z-10" />
                  
                  <motion.time 
                    className="text-gray-500 dark:text-gray-400 font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {product.date}
                  </motion.time>
                  
                  <motion.h3 
                    className="mt-3 text-xl font-semibold"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {product.name}
                  </motion.h3>
                  
                  <motion.div
                    className="mt-3"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", damping: 15, delay: 0.4 }}
                  >
                    <motion.img
                      src={product.image}
                      alt={product.name}
                      className="w-[200px] h-[200px] rounded-xl object-contain shadow-sm bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black p-2"
                      whileHover={{ 
                        scale: 1.05,
                        rotate: [0, -1, 1, -1, 0],
                        transition: { rotate: { repeat: 0, duration: 0.5 } }
                      }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.div>
                  
                  <motion.p 
                    className="mt-5 text-sm text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {product.description}
                  </motion.p>
                  
                  <motion.div 
                    className="mt-4 bg-blue-500 text-white text-lg font-medium py-1 px-4 rounded-full"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    ${product.price}
                  </motion.div>
                </motion.article>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Pagination mejorada */}
          <motion.div 
            className="swiper-pagination mt-6 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TopProducts;
