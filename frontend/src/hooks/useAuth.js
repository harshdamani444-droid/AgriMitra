import { useSelector, useDispatch } from 'react-redux';
import { setUser, logoutUser } from '../redux/slices/authSlice';
import { toast } from "react-toastify";


export const useAuth = () => {
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector((state) => state.auth);

    const login = (userData) => {
        dispatch(setUser(userData));
    };

    const handleLogout = () => {
        dispatch(logoutUser());
        toast.success("Logged out successfully");
    };
    return {
        isAuthenticated,
        user,
        login,
        logout: handleLogout,
    };
};