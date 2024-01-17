import { Grid } from "@mui/material";
import { Product } from "../../app/models/product";
import ProductCard from "./ProductCard";
import { useAppSelector } from "../../app/store/configureStore";
import ProductCardSkeleton from "./ProductCardSkeleton";

interface ProductListProps {
    products: Product[];
}

const ProductList = ({ products }: ProductListProps) => {
    const { productsLoaded } = useAppSelector((state) => state.catalog);
    return (
        <Grid container spacing={4}>
            {products.map((product) => (
                <Grid item xs={4} key={product.id}>
                    {!productsLoaded ? <ProductCardSkeleton /> : <ProductCard product={product} />}
                </Grid>
            ))}
        </Grid>
    );
};

export default ProductList;
