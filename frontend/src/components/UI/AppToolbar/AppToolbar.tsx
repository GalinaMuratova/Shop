import React from 'react';
import { AppBar, Grid, styled, Toolbar, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link as NavLink } from 'react-router-dom';
import UserMenu from './UserMenu';
import AnonymousMenu from './AnonymousMenu';
import { useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../../features/users/usersSlice';

const Link = styled(NavLink)({
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
        color: 'inherit',
    }
});

const AppToolbar = () => {
    const user = useAppSelector(selectUser);
    return (
        <AppBar position="sticky" sx={{ mb: 2 }}>
            <Toolbar>
                <Typography variant="h5" component="h5" sx={{ flexGrow: 1 }}>
                    <Link to="/">
                        Everything you can find
                        <ShoppingCartIcon style={{fontSize:'25px',margin: '6px 0 -5px 8px'}} />
                    </Link>
                </Typography>
                <Grid item>
                    {user ? (
                        <UserMenu user={user}/>
                    ) : (
                        <AnonymousMenu/>
                    )}
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default AppToolbar;