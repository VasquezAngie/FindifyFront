import Header2 from "../../components/Layout/Header2";
import ProductsList from "../../components/Products/ProductsList";

const LandingPageProductos: React.FC = () => {
  return (
    <div className="container mx-auto p-4 bg-white dark:bg-gray-800">
      <Header2 />

      <div className="flex justify-between items-start mt-8 space-x-8">
        <div className="flex-grow">
          <ProductsList />
        </div>

        <div className="w-64">
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
            <table className="w-full border-collapse">
              <thead className="bg-gray-200 dark:bg-gray-700">
                <tr>
                  <th className="py-3 px-6 text-left font-semibold text-gray-900 dark:text-white">
                    CATEGORÍAS
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  "Teclados",
                  "Mouse",
                  "Pantallas",
                  "Audífonos",
                  "Bafles",
                  "Cámaras",
                ].map((categoria, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                  >
                    <td className="py-3 px-6 text-gray-800 dark:text-gray-200 cursor-pointer">
                      {categoria}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPageProductos;
