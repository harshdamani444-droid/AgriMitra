import { useSelector, useDispatch } from 'react-redux';
import { setUser, logoutUser } from '../redux/slices/authSlice';
import { toast } from "react-toastify";
import { resetCart } from '../redux/slices/Cart/GetCart';


export const useAuth = () => {
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector((state) => state.auth);

    const login = (userData) => {
        dispatch(setUser(userData));
    };

    const handleLogout = async () => {
        await dispatch(logoutUser());
        await dispatch(resetCart());

        toast.success("Logged out successfully");
        dispatch(setUser(null));
    };
    return {
        isAuthenticated,
        user,
        login,
        logout: handleLogout,
    };
};