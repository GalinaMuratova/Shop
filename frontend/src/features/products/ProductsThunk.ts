import {createAsyncThunk} from "@reduxjs/toolkit";
import {IProduct, ProductMutation} from "../../types";
import {RootState} from "../../app/store";
import axiosApi from "../../axiosApi";

export const fetchProducts  =createAsyncThunk<IProduct[], string>(
    'products/fetchAll',
    async (category) => {
        const productsResponse = await axiosApi.get<IProduct[]>(`/products${category}`);
        return productsResponse.data;
    }
);

export const fetchOneProduct  =createAsyncThunk<IProduct, string>(
    'products/fetchOne',
    async (id) => {
        const productsResponse = await axiosApi.get<IProduct>(`/products/${id}`);
        return productsResponse.data;
    }
);

export const createProduct = createAsyncThunk<void, ProductMutation, { state: RootState}>(
    'products/create',
    async (productMutation, thunkAPI) => {
        const userState = thunkAPI.getState().users;

        const formData = new FormData();

        const keys = Object.keys(productMutation) as (keyof ProductMutation)[];

        keys.forEach(key => {
            const value = productMutation[key];
            if (value !== null) {
                formData.append(key,value);
            }
        })

        await axiosApi.post('/products', formData, {headers: {'Authorization': userState.user?.token}});
    }
);