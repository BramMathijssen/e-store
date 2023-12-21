import { useEffect, useState } from "react";
import { Product } from "../models/product";
import Catalog from "../../features/catalog/Catalog";
import { Typography } from "@mui/material";

function App() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await fetch("http://localhost:5245/api/products");
            const data = await res.json();
            setProducts(data);
        };
        fetchProducts();
    }, []);

    return (
        <div>
          <Typography variant="h1">E-Store</Typography>
          <Catalog products={products} />
        </div>
    );
}

export default App;
