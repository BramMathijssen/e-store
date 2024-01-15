import { useState, useEffect } from "react";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { productSelectors, fetchProductsAsync, fetchFilters } from "../../app/store/catalogSlice";
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
    const { productsLoaded, status, filtersLoaded } = useAppSelector((state) => state.catalog);
    const dispatch = useAppDispatch();

    // we use two seperate use effects here because otherwise they will run double if we combine them into one useffect
    useEffect(() => {
        if (!productsLoaded) dispatch(fetchProductsAsync());
    }, [productsLoaded, dispatch]);

    useEffect(() => {
        if (!filtersLoaded) dispatch(fetchFilters());
    }, [dispatch, filtersLoaded]);

    if (status.includes("pending")) return <LoadingComponent message="Loading products..." />;

    return (
        <>
            <ProductList products={products} />
        </>
    );
};

export default Catalog;
