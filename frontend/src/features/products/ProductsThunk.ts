import {createAsyncThunk} from "@reduxjs/toolkit";
import {ProductMutation} from "../../types";
import {RootState} from "../../app/store";
import axiosApi from "../../axiosApi";

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