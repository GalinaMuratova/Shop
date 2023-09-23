import {IProduct} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {createProduct} from "./ProductsThunk";

interface ProductsState {
    items: IProduct[];
    fetchLoading: boolean;
    createLoading: boolean;
}

const initialState: ProductsState = {
    items: [],
    fetchLoading: false,
    createLoading: false
};

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
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
export const selectProductsLoading = (state: RootState) => state.products.fetchLoading;
export const selectCreateLoading = (state:RootState) => state.products.createLoading;