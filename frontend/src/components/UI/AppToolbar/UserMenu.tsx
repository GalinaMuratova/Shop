import React from 'react';
import {Button, CircularProgress} from '@mui/material';
import { Link } from 'react-router-dom';
import { IUser } from '../../../types';
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {logout} from "../../../features/users/usersThunk";
import {selectLogoutLoading} from "../../../features/users/usersSlice";
import LogoutIcon from '@mui/icons-material/Logout';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

interface Props {
    user: IUser;
}
const UserMenu: React.FC<Props> = ({user}) => {
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectLogoutLoading);
    const handleLogout = () => {
      dispatch(logout());
    };
    return (
        <>
            <Button
                color="inherit"
                style={{marginRight:'25px'}}
            >
                Hello, {user.displayName}
            </Button>
            <Button color="inherit" component={Link} to="product/new">
                Add product
                <AddCircleOutlineIcon style={{fontSize:'17px'}}/>
            </Button>
                {loading ? (
                    <CircularProgress size={24} color="warning" />
                ) : (
                    <Button color="inherit" onClick={handleLogout} disabled={loading}>
                        Logout
                        <LogoutIcon style={{fontSize:'17px'}}/>
                    </Button>
                )}
        </>
    );
};

export default UserMenu;