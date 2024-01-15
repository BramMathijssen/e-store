import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { Product } from "../../app/models/product";
import { RootState } from "../../app/store/configureStore";

const productsAdapter = createEntityAdapter<Product>();

// export const fetchProductsAsync = createAsyncThunk<Product[]>(
//     'catalog/fetchProductsAsync',
//     async (_, thunkAPI) => {
//         try {
//             return await agent.Catalog.list();
//         } catch (error: any) {
//             return thunkAPI.rejectWithValue({error: error.data})
//         }
//     }
// )

// unfinished implementation
export const fetchProductsAsync = createAsyncThunk<Product[]>("catalog/fetchProductsAsync", async (_, thunkAPI) => {
    try {
        return await agent.Catalog.list();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return thunkAPI.rejectWithValue({ error: error.data });
    }
});

export const fetchSingleProduct = createAsyncThunk<Product, number>(
    "catalog/fetchSingleProduct",
    async (productId, thunkAPI) => {
        try {
            const product = await agent.Catalog.details(productId);
            return product;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const fetchFilters = createAsyncThunk("catalog/fetchFilters", async (_, thunkAPI) => {
    try {
        return agent.Catalog.fetchFilters();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const catalogSlice = createSlice({
    name: "catalog",
    initialState: productsAdapter.getInitialState({
        productsLoaded: false,
        filtersLoaded: false,
        status: "idle",
        brands: [],
        types: [],
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProductsAsync.pending, (state) => {
            state.status = "pendingFetchProducts";
        });
        builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
            productsAdapter.setAll(state, action.payload);
            (state.status = "idle"), (state.productsLoaded = true);
        });
        builder.addCase(fetchProductsAsync.rejected, (state, action) => {
            console.log(action.payload);
            state.status = "idle";
        });
        builder.addCase(fetchSingleProduct.pending, (state) => {
            state.status = "pendingFetchSingleProduct";
        });
        builder.addCase(fetchSingleProduct.fulfilled, (state, action) => {
            productsAdapter.upsertOne(state, action.payload);
            state.status = "idle";
        });
        builder.addCase(fetchSingleProduct.rejected, (state, action) => {
            console.log(action);
            state.status = "idle";
        });
        builder.addCase(fetchFilters.pending, (state) => {
            state.status = "pendingFetchFilters";
        });
        builder.addCase(fetchFilters.fulfilled, (state, action) => {
            state.brands = action.payload.brands;
            state.types = action.payload.types;
            state.filtersLoaded = true;
            state.status = "idle";
        });
        builder.addCase(fetchFilters.rejected, (state, action) => {
            state.status = "idle";
            console.log(action.payload);
        });
    },
});

export const productSelectors = productsAdapter.getSelectors((state: RootState) => state.catalog);
