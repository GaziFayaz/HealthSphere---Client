import useAuth from "../Hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import useSeller from "../Hooks/useSeller";

const SellerRoute = ({ children }) => {
	const { user, loading } = useAuth();
	const [ isSeller, isSellerPending ] = useSeller();
	const location = useLocation();

	if (loading || isSellerPending) {
		return <progress className="progress w-56"></progress>;
	}

	if (user && isSeller) {
		return children;
	}
	return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default SellerRoute;