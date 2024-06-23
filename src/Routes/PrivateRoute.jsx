import { Navigate, useLocation } from "react-router";
import useAuth from "../Hooks/useAuth";
import useCustomer from "../Hooks/useCustomer";


const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isCustomer, isCustomerPending] = useCustomer();
    const location = useLocation();

    if(loading || isCustomerPending){
        return <progress className="progress w-56"></progress>
    }

    if (user && isCustomer) {
        return children;
    }
    return <Navigate to="/" state={{from: location}} replace></Navigate>
};

export default PrivateRoute;