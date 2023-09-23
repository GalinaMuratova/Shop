import React from 'react';
import {Card, CardActionArea, CardContent, CardMedia, Grid, styled, Typography} from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {Link as NavLink } from "react-router-dom";

const Link = styled(NavLink)({
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
        color: 'inherit',
    }
});

interface Props {
    id: string;
    title: string;
    price: number;
    category: string;
    image: string;
}
const ProductBlock: React.FC<Props> = ({id, title,price,image}) => {
    const productImage = 'http://localhost:8000'+ '/images/' + image;
    return (
        <>
            <Grid item xs={12} sm={6} md={4} lg={3} component={Link} to={'/products/' + id}>
                <Card>
                    <CardActionArea>
                        <CardContent>
                            <CardMedia
                                sx={{height:240}}
                                image={productImage}
                                title={title}
                            />
                            <Typography gutterBottom variant="h5" component="div">
                                { title }
                            </Typography>
                            <Grid container justifyContent="space-between" alignItems="center">
                                <Typography variant="h6" color="text.secondary">
                                    <strong>
                                        Price: { price } som
                                    </strong>
                                </Typography>
                                <ArrowForwardIosIcon/>
                            </Grid>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
        </>
    );
};

export default ProductBlock;