import { useState, useEffect } from "react";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { productSelectors, fetchProductsAsync, fetchFilters } from "../../app/store/catalogSlice";
import { useAppSelector, useAppDispatch } from "../../app/store/configureStore";
import { Grid, Paper } from "@mui/material";
import ProductSearch from "./ProductSearch";

// const sortOptions = [
//     { value: 'name', label: 'Alphabetical' },
//     { value: 'priceDesc', label: 'Price - High to low' },
//     { value: 'price', label: 'Price - Low to high' },
// ]

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
        <Grid container columnSpacing={4}>
            <Grid item xs={3}>
                <Paper sx={{ mb: 2 }}>
                    <ProductSearch />
                </Paper>
                {/* <Paper sx={{ p: 2, mb: 2 }}>
                    <RadioButtonGroup
                        selectedValue={productParams.orderBy}
                        options={sortOptions}
                        onChange={(e) => dispatch(setProductParams({ orderBy: e.target.value }))}
                    />
                </Paper>
                <Paper sx={{ p: 2, mb: 2 }}>
                    <CheckboxButtons
                        items={brands}
                        checked={productParams.brands}
                        onChange={(items: string[]) => dispatch(setProductParams({ brands: items }))}
                    />
                </Paper>
                <Paper sx={{ p: 2 }}>
                    <CheckboxButtons
                        items={types}
                        checked={productParams.types}
                    />
                </Paper> */}
            </Grid>
            <Grid item xs={9}>
                <ProductList products={products} />
            </Grid>
            <Grid item xs={3} />
            {/* <Grid item xs={9} sx={{ mb: 2 }}>
                {metaData && (
                    <AppPagination
                        metaData={metaData}
                        onPageChange={(page: number) => dispatch(setPageNumber({ pageNumber: page }))}
                    />
                )}
            </Grid> */}
        </Grid>
    );
};

export default Catalog;
