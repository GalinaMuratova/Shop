import React from 'react';
import {Button, CircularProgress} from '@mui/material';
import { Link } from 'react-router-dom';
import { IUser } from '../../../types';
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {logout} from "../../../features/users/usersThunk";
import {selectLogoutLoading} from "../../../features/users/usersSlice";

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
            >
                Hello, {user.username}
            </Button>
            <Button color="inherit" component={Link} to="post/new">
                Add post
            </Button>
            <Button color="inherit" onClick={handleLogout} disabled={loading}>
                {loading ? (
                    <CircularProgress size={24} color="warning" />
                ) : (
                    'Logout'
                )}
            </Button>
        </>
    );
};

export default UserMenu;