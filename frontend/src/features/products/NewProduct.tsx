import React, { useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ProductForm from "./components/ProductForm";
import {useAppSelector} from "../../app/hooks";
import {selectUser} from "../users/usersSlice";

const NewProduct = () => {
    const user = useAppSelector(selectUser);
    const navigate = useNavigate();

    useEffect(()=>{
        if (!user) {
            navigate('/login');
        }
    }, [user])

    return (
        <Container maxWidth='md' >
            <Typography variant='h4' sx={{mb:3}}>
                Add new product
            </Typography>
            <ProductForm />
        </Container>
    );
};

export default NewProduct;