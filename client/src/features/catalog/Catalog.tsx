import { useState, useEffect } from "react";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";

const Catalog = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await fetch("http://localhost:5245/api/products");
            const data = await res.json();
            setProducts(data);
        };
        fetchProducts();
    }, []);

    return <ProductList products={products} />;
};

export default Catalog;
