import React, {useEffect} from 'react';
import {CATEGORIES} from "../../constants";
import {Button, CircularProgress, Grid} from "@mui/material";
import {Link, useLocation} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectProducts, selectProductsLoading} from "./ProductsSlice";
import {fetchProducts} from "./ProductsThunk";
import ProductBlock from "./components/ProductBlock";

const Products = () => {
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectProductsLoading);
    const products = useAppSelector(selectProducts);
    const location = useLocation();
    const reverse = [...products].reverse();

    useEffect(() => {
        dispatch(fetchProducts(location.search))
    }, [dispatch, location.search]);

    return (
        <>
            <Grid container flexDirection='row' justifyContent='space-between'>
                <Grid item>
                    <Button color="inherit" component={Link} to={'/'}>All</Button>
                </Grid>
                {CATEGORIES.map((el) => (
                    <Grid key={el} item>
                        <Button color="inherit" component={Link}  to={`/?category=${el}`}>{el}</Button>
                    </Grid>
                ))}
            </Grid>
            <Grid container item spacing={2} style={{margin:'20px 0'}}>
                {loading ? (
                    <Grid item container justifyContent="center">
                        <CircularProgress />
                    </Grid>
                ) : (
                    <>
                        {reverse.map((el) => (
                            <ProductBlock key={el._id} id={el._id} title={el.title} price={el.price} category={el.category} image={el.image} />
                        ))}
                    </>
                    )}
            </Grid>
        </>
    );
};

export default Products;