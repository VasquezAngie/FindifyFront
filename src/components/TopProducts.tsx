import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";

//import useTopProducts from "../hooks/useTopProducts";

const TopProducts = () => {
  const products = [
    {
      "id": 1,
      "name": "Wireless Headphones",
      "category": "Electronics",
      "price": 99.99,
      "image": "src/assets/Gatitoconporro.png",
      "author": "John Doe",
      "date": "2024-02-15",
      "description": "High-quality wireless headphones with noise cancellation."
    },
    {
      "id": 2,
      "name": "Smartphone X",
      "category": "Mobile",
      "price": 799.99,
      "image": "src/assets/Gatitoconporro.png",
      "author": "Jane Smith",
      "date": "2024-01-20",
      "description": "Latest generation smartphone with an advanced camera system."
    },
    {
      "id": 3,
      "name": "Gaming Laptop",
      "category": "Computers",
      "price": 1299.99,
      "image": "src/assets/Gatitoconporro.png",
      "author": "Alice Johnson",
      "date": "2024-03-10",
      "description": "Powerful gaming laptop with high-end GPU and fast refresh rate."
    },
    {
      "id": 4,
      "name": "Smartwatch Pro",
      "category": "Wearables",
      "price": 199.99,
      "image": "src/assets/Gatitoconporro.png",
      "author": "Michael Brown",
      "date": "2024-02-25",
      "description": "Feature-rich smartwatch with health tracking and GPS."
    },
    {
      "id": 5,
      "name": "4K Smart TV",
      "category": "Home Entertainment",
      "price": 599.99,
      "image": "src/assets/Gatitoconporro.png",
      "author": "Sophia Davis",
      "date": "2024-01-05",
      "description": "Large 4K Smart TV with HDR and streaming services."
    },
    {
      "id": 6,
      "name": "Bluetooth Speaker",
      "category": "Audio",
      "price": 49.99,
      "image": "src/assets/Gatitoconporro.png",
      "author": "Daniel Wilson",
      "date": "2024-02-28",
      "description": "Portable Bluetooth speaker with deep bass and long battery life."
    },
    {
      "id": 7,
      "name": "Gaming Mouse",
      "category": "Accessories",
      "price": 39.99,
      "image": "src/assets/Gatitoconporro.png",
      "author": "Emma Martinez",
      "date": "2024-03-02",
      "description": "Ergonomic gaming mouse with customizable buttons and RGB lighting."
    },
    {
      "id": 8,
      "name": "Mechanical Keyboard",
      "category": "Accessories",
      "price": 89.99,
      "image": "src/assets/Gatitoconporro.png",
      "author": "Oliver Taylor",
      "date": "2024-01-30",
      "description": "RGB mechanical keyboard with customizable key switches."
    },
    {
      "id": 9,
      "name": "Fitness Tracker",
      "category": "Wearables",
      "price": 59.99,
      "image": "src/assets/Gatitoconporro.png",
      "author": "Isabella Clark",
      "date": "2024-02-12",
      "description": "Fitness tracker with heart rate monitor and step counter."
    },
    {
      "id": 10,
      "name": "Drone Camera",
      "category": "Cameras",
      "price": 499.99,
      "image": "src/assets/Gatitoconporro.png",
      "author": "Liam White",
      "date": "2024-03-05",
      "description": "High-definition drone camera with stabilization and long battery life."
    }
  ]
  ;

  return (
    <div className="bg-[#E8F8F7] py-24 sm:py-32 w-screen relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl font-semibold tracking-tight text-black sm:text-5xl">
            Los 10 productos más comprados esta semana 
          </h2>
        </div>

        <div className="relative mt-10">
          <div className="absolute -left-10 top-1/2 transform -translate-y-1/2 z-10 swiper-button-prev"></div>
          <div className="absolute -right-10 top-1/2 transform -translate-y-1/2 z-10 swiper-button-next"></div>
          
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}
            pagination={{ clickable: true }}
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <article className="flex max-w-xl flex-col items-start justify-between bg-white p-6 rounded-xl shadow">
                  <div className="flex items-center gap-x-4 text-xs">
                    <time dateTime={product.date} className="text-gray-500">
                      {product.date}
                    </time>
                    <a
                      href="#"
                      className="relative z-10 rounded-full bg-gray-100 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-200"
                    >
                      {product.category}
                    </a>
                  </div>

                  <div className="group relative pt-6">
                    <div>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-[200px] h-[200px] bg-gray-50 rounded-lg object-contain"
                      />
                    </div>
                    <h3 className="mt-3 text-lg font-semibold text-gray-900 group-hover:text-gray-600">
                      {product.name}
                    </h3>
                    <p className="mt-5 line-clamp-3 text-sm text-gray-600">
                      {product.description}
                    </p>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default TopProducts;
