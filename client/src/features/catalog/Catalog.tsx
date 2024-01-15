import { useState, useEffect } from "react";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { productSelectors, fetchProductsAsync } from "../../app/store/catalogSlice";
import { useAppSelector, useAppDispatch } from "../../app/store/configureStore";

const Catalog = () => {
    // const [products, setProducts] = useState<Product[]>([]);
    // const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //   const fetchProducts = async () => {
    //     agent.Catalog.list()
    //       .then((response) => setProducts(response))
    //       .catch((error) => console.log(error))
    //       .finally(() => setLoading(false));
    //   };
    //   fetchProducts();
    // }, []);

    const products = useAppSelector(productSelectors.selectAll);
    const { productsLoaded, status } = useAppSelector((state) => state.catalog);
    const dispatch = useAppDispatch();


    useEffect(() => {
        if (!productsLoaded) dispatch(fetchProductsAsync());
    }, [productsLoaded, dispatch])

    if (status.includes("pending")) return <LoadingComponent message="Loading products..." />;

    return (
        <>
            <ProductList products={products} />
        </>
    );
};

export default Catalog;
