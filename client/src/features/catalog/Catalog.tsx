import { Product } from "../../app/models/product";
import ProductList from "./ProductList";

interface CatalogProps {
    products: Product[];
}

const Catalog = ({ products }: CatalogProps) => {
    return <ProductList products={products} />;
};

export default Catalog;
