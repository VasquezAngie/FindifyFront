import { useState, useEffect } from "react";

const useTopProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const response = await fetch(""); 
        const data = await response.json();
        setProducts(data.slice(0, 10)); 
      } catch (error) {
        console.error(error);
      }
    };
    fetchTopProducts();
  }, []);
  return products;
};
export default useTopProducts;
