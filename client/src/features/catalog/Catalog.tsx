import { Product } from "../../app/models/product";

interface CatalogProps {
    products: Product[];
}

const Catalog = ({ products }: CatalogProps) => {
    return (
        <ul>
            {products.map((product) => (
                <li key={product.id}>
                    {product.name} {product.price}
                </li>
            ))}
        </ul>
    );
};

export default Catalog;
