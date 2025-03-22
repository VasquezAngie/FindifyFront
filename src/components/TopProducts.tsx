import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";

const TopProducts = () => {
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

  return (
    <div className="w-full relative py-15 bg-[#F5F5F5] dark:bg-[#0A0A0A] text-[#1A1A1A] dark:text-[#E0E0E0]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Los 10 productos <br /> más comprados esta semana
        </h2>

        <div className="relative mt-10">
          <div className="absolute -left-20 top-1/2 transform -translate-y-1/2 z-10 swiper-button-prev cursor-pointer before:hidden"></div>
          <div className="absolute -right-20 top-1/2 transform -translate-y-1/2 z-10 swiper-button-next cursor-pointer before:hidden"></div>

          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            pagination={{ el: ".swiper-pagination", clickable: true }}
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <article className="flex flex-col items-center p-6 rounded-xl shadow bg-white dark:bg-[#141414] text-[#1A1A1A] dark:text-[#E0E0E0]">
                  <time className="text-gray-500 dark:text-gray-400">
                    {product.date}
                  </time>
                  <h3 className="mt-3 text-lg font-semibold">{product.name}</h3>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-[200px] h-[200px] bg-gray-50 rounded-lg object-contain mt-3"
                  />
                  <p className="mt-5 text-sm text-center">
                    {product.description}
                  </p>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="swiper-pagination mt-6 flex justify-center"></div>
        </div>
      </div>
    </div>
  );
};

export default TopProducts;
