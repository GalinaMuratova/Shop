import React from 'react';
import {CATEGORIES} from "../../constants";
import {Button, Grid} from "@mui/material";
import {Link} from "react-router-dom";

const Products = () => {
    return (
        <>
            <Grid container flexDirection='row' justifyContent='space-around'>
                <Grid item>
                    <Button color="inherit" component={Link} to={'/'}>All</Button>
                </Grid>
                {CATEGORIES.map((el) => (
                    <Grid item>
                        <Button color="inherit" component={Link} to={`/?category=${el}`}>{el}</Button>
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default Products;