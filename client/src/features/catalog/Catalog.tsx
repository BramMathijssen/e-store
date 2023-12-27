import { useState, useEffect } from "react";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";

const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      agent.Catalog.list()
        .then((response) => setProducts(response))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    };
    fetchProducts();
  }, []);

  if (loading) return <LoadingComponent message="Loading Products..." />;

  return <ProductList products={products} />;
};

export default Catalog;
