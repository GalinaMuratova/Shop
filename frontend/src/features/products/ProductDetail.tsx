import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {
    selectDeleteProductLoading,
    selectOneProduct,
    selectOneProductLoading
} from "./ProductsSlice";
import {deleteProduct, fetchOneProduct} from "./ProductsThunk";
import {useNavigate, useParams} from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import {
    Button,
    Card,
    CardContent,
    CircularProgress,
    Container,
    Grid,
    Typography
} from "@mui/material";
import {selectUser} from "../users/usersSlice";

const ProductDetail = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const navigate = useNavigate();
    const user = useAppSelector(selectUser);
    const product = useAppSelector(selectOneProduct);
    const loading = useAppSelector(selectOneProductLoading);
    const deleteLoading = useAppSelector(selectDeleteProductLoading);


    useEffect(() => {
        if (id) {
            dispatch(fetchOneProduct(id))
        }
    }, [dispatch, id]);
    const onDelete = async () => {
        if(id) {
            await dispatch(deleteProduct(id));
            navigate('/')
        }
    };
    const productImage = 'http://localhost:8000'+ '/images/' + product?.image;

    const realUser = user?._id === product?.user._id;

    return (
        <>
            {loading ? (
                <Grid item container justifyContent="center">
                    <CircularProgress />
                </Grid>
            ) : (
                <Container>
                    <Card >
                        <Grid>
                            <CardContent>
                                <Grid container flexDirection='row' >
                                    <Grid item style={{ height:'380px', maxWidth:'360px', width:'auto', borderRadius:'8px', overflow: 'hidden', margin:'20px 30px 0 0'}}>
                                        {product?.image && (
                                            <img
                                                src={productImage}
                                                alt={product?.title}
                                                style={{ height:'100%', width:'100%', objectFit: 'cover' }}
                                            />
                                        )}
                                    </Grid>
                                    <Grid item container display='flex' flexDirection='column' flexWrap='wrap' width='60%'>
                                        <Typography style={{margin:'16px 5px 0 0', fontSize:'30', fontWeight:'bold'}} variant='h5' component='div'>
                                            {product?.title}
                                        </Typography>
                                        <Typography variant="h6" color="text.secondary">
                                            Category: { product?.category }
                                        </Typography>
                                        <Typography gutterBottom variant="subtitle1" component="div" style={{color: 'grey'}}>
                                            { product?.description}
                                        </Typography>
                                        <Typography gutterBottom variant="h5" component="div" style={{fontWeight:'bold'}}>
                                            Price: {product?.price} som
                                        </Typography>
                                        <Grid item container flexDirection='row' marginTop='auto'>
                                            <Typography variant='h6' fontWeight='bold'>{product?.user.displayName} :</Typography>
                                            <Typography variant='h6' color="text.secondary" marginRight='20px'>{product?.user.phone} </Typography>
                                            {deleteLoading ? (
                                                <CircularProgress size={24} />
                                            ) : (
                                                realUser ? (
                                                    <Button onClick={onDelete} variant="outlined" startIcon={<DeleteIcon />}>Delete</Button>
                                                ) : (
                                                    <Button variant="outlined" startIcon={<DeleteIcon />} disabled>Delete</Button>
                                                )
                                            )}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Grid>
                    </Card>
                </Container>
            )}
        </>
    );
};

export default ProductDetail;