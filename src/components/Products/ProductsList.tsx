const products = [
  {
    id: 1,
    name: "Earthen Bottle",
    href: "#",
    price: "$48",
    imageSrc:
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-01.jpg",
    imageAlt:
      "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
  },
  {
    id: 2,
    name: "Nomad Tumbler",
    href: "#",
    price: "$35",
    imageSrc:
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-02.jpg",
    imageAlt:
      "Olive drab green insulated bottle with flared screw lid and flat top.",
  },
  {
    id: 3,
    name: "Focus Paper Refill",
    href: "#",
    price: "$89",
    imageSrc:
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-03.jpg",
    imageAlt:
      "Person using a pen to cross a task off a productivity paper card.",
  },
  {
    id: 4,
    name: "Machined Mechanical Pencil",
    href: "#",
    price: "$35",
    imageSrc:
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-04.jpg",
    imageAlt:
      "Hand holding black machined steel mechanical pencil with brass tip and top.",
  },
  {
    id: 5,
    name: "Stainless Steel Mug",
    href: "#",
    price: "$22",
    imageSrc:
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-05.jpg",
    imageAlt: "A sleek stainless steel mug with a black handle.",
  },
  {
    id: 6,
    name: "Wooden Table Lamp",
    href: "#",
    price: "$60",
    imageSrc:
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-06.jpg",
    imageAlt: "A wooden table lamp with a soft white lampshade.",
  },
  {
    id: 7,
    name: "Leather Notebook",
    href: "#",
    price: "$25",
    imageSrc:
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-07.jpg",
    imageAlt: "A handcrafted leather notebook with a wraparound strap.",
  },
  {
    id: 8,
    name: "Portable Bluetooth Speaker",
    href: "#",
    price: "$75",
    imageSrc:
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-08.jpg",
    imageAlt: "A compact portable Bluetooth speaker in black color.",
  },
  {
    id: 9,
    name: "Wireless Headphones",
    href: "#",
    price: "$120",
    imageSrc:
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-09.jpg",
    imageAlt: "Over-ear wireless headphones with noise cancellation.",
  },
  {
    id: 10,
    name: "Minimalist Wall Clock",
    href: "#",
    price: "$45",
    imageSrc:
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-10.jpg",
    imageAlt: "A minimalist wall clock with a wooden frame.",
  },
  {
    id: 11,
    name: "Ceramic Coffee Set",
    href: "#",
    price: "$55",
    imageSrc:
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-11.jpg",
    imageAlt: "A set of ceramic coffee cups with a matching tray.",
  },
  {
    id: 12,
    name: "Vintage Desk Organizer",
    href: "#",
    price: "$38",
    imageSrc:
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-12.jpg",
    imageAlt: "A wooden desk organizer with compartments for accessories.",
  },
  {
    id: 13,
    name: "Ergonomic Office Chair",
    href: "#",
    price: "$180",
    imageSrc:
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-13.jpg",
    imageAlt: "A comfortable ergonomic office chair in black.",
  },
  {
    id: 14,
    name: "Modern Floor Lamp",
    href: "#",
    price: "$95",
    imageSrc:
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-14.jpg",
    imageAlt: "A modern floor lamp with adjustable brightness.",
  },
  {
    id: 15,
    name: "Wireless Keyboard & Mouse",
    href: "#",
    price: "$85",
    imageSrc:
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-15.jpg",
    imageAlt: "A wireless keyboard and mouse set in white.",
  },
  {
    id: 16,
    name: "Smart LED Light Bulbs",
    href: "#",
    price: "$50",
    imageSrc:
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-16.jpg",
    imageAlt: "A set of smart LED light bulbs with app control.",
  },
];

export default function ProductsList() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-800 transition-colors duration-300">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <a key={product.id} href={product.href} className="group">
              <img
                alt={product.imageAlt}
                src={product.imageSrc}
                className="aspect-square w-full rounded-lg bg-gray-200 dark:bg-gray-700 object-cover group-hover:opacity-75 xl:aspect-7/8"
              />
              <h3 className="mt-4 text-sm text-gray-700 dark:text-gray-300">
                {product.name}
              </h3>
              <p className="mt-1 text-lg font-medium text-gray-900 dark:text-gray-100">
                {product.price}
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
