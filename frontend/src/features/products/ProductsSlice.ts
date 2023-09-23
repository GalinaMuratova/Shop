import {IProduct} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {createProduct, fetchOneProduct, fetchProducts} from "./ProductsThunk";

interface ProductsState {
    items: IProduct[];
    item: IProduct | null,
    fetchLoading: boolean;
    fetchOneLoading: boolean;
    createLoading: boolean;
}

const initialState: ProductsState = {
    items: [],
    item: null,
    fetchLoading: false,
    fetchOneLoading: false,
    createLoading: false
};

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.fetchLoading = true;
        });
        builder.addCase(fetchProducts.fulfilled, (state, {payload: products}) => {
            state.fetchLoading = false;
            state.items= products;
        });
        builder.addCase(fetchProducts.rejected, (state) => {
            state.fetchLoading = false;
        });

        builder.addCase(fetchOneProduct.pending, (state) => {
            state.fetchOneLoading = true;
        });
        builder.addCase(fetchOneProduct.fulfilled, (state, {payload: product} ) => {
            state.fetchOneLoading = false;
            state.item = product;
        });
        builder.addCase(fetchOneProduct.rejected, (state) => {
            state.fetchOneLoading = false;
        });

        builder.addCase(createProduct.pending, (state) => {
            state.createLoading = true;
        });
        builder.addCase(createProduct.fulfilled, (state) => {
            state.createLoading = false;
        });
        builder.addCase(createProduct.rejected, (state) => {
            state.createLoading = false;
        });
    }
});

export const productsReducer = productsSlice.reducer;
export const selectProducts = (state: RootState) => state.products.items;
export const selectOneProduct = (state: RootState) => state.products.item;
export const selectProductsLoading = (state: RootState) => state.products.fetchLoading;
export const selectOneProductLoading = (state: RootState) => state.products.fetchOneLoading;
export const selectCreateLoading = (state:RootState) => state.products.createLoading;