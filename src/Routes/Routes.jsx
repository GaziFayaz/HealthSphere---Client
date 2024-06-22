import { createBrowserRouter } from "react-router-dom";
import Root from "../Layouts/Root";
import Home from "../Components/Home/Home";
import Login from "../Components/Authentication/Login";
import Register from "../Components/Authentication/Register";
import Shop from "../Components/Shop/Shop";
import CategoryDetails from "../Components/Home/Category/CategoryDetails";
import PrivateRoute from "./PrivateRoute";
import Cart from "../Components/Cart/Cart";
import Checkout from "../Components/Checkout/Checkout";
import Invoice from "../Components/Invoice/Invoice";
import UpdateProfile from "../Components/UpdateProfile/UpdateProfile";
import CustomerDashboard from "../Layouts/CustomerDashboard";
import SellerDashboard from "../Layouts/SellerDashboard";
import SellerRoute from "./SellerRoute";
import AdminRoute from "./AdminRoute";
import AdminDashboard from "../Layouts/AdminDashboard";
import AdminHome from "../Components/Admin/AdminHome";
import User from "../Components/Admin/User";
import Category from "../Components/Admin/Category";
import Payment from "../Components/Admin/Payment";
import Sales from "../Components/Admin/Sales";
import Banner from "../Components/Admin/Banner";
import SellerHome from "../Components/Seller/SellerHome";
import Medicine from "../Components/Seller/Medicine";
import History from "../Components/Seller/History";
import Advertisement from "../Components/Seller/Advertisement";
import PaymentHistory from "../Components/Customer/PaymentHistory";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Root></Root>,
		children: [
			{
				path: "/",
				element: <Home></Home>,
			},
			{
				path: "/categories/:categoryId",
				element: <CategoryDetails></CategoryDetails>,
			},
			{
				path: "/shop",
				element: <Shop></Shop>,
			},
			{
				path: "/login",
				element: <Login></Login>,
			},
			{
				path: "/register",
				element: <Register></Register>,
			},
			{
				path: "/update-profile",
				element: (
					<PrivateRoute>
						<UpdateProfile></UpdateProfile>
					</PrivateRoute>
				),
			},
			{
				path: "/cart",
				element: (
					<PrivateRoute>
						<Cart></Cart>
					</PrivateRoute>
				),
			},
			{
				path: "/checkout",
				element: (
					<PrivateRoute>
						<Checkout></Checkout>
					</PrivateRoute>
				),
			},
			{
				path: "/invoice",
				element: (
					<PrivateRoute>
						<Invoice></Invoice>
					</PrivateRoute>
				),
			},
		],
	},
	{
		path: "/dashboard",
		element: (
			<PrivateRoute>
				<CustomerDashboard></CustomerDashboard>
			</PrivateRoute>
		),
    children: [
      {
        path: "/dashboard/payment-history",
        element: (
          <PrivateRoute>
            <PaymentHistory></PaymentHistory>
          </PrivateRoute>
        )
      }
    ]
	},
	{
		path: "/seller-dashboard",
		element: (
			<SellerRoute>
				<SellerDashboard></SellerDashboard>
			</SellerRoute>
		),
		children: [
			{
				path: "/seller-dashboard/overview",
				element: (
					<SellerRoute>
						<SellerHome></SellerHome>
					</SellerRoute>
				),
			},
			{
				path: "/seller-dashboard/manage-medicine",
				element: (
					<SellerRoute>
						<Medicine></Medicine>
					</SellerRoute>
				),
			},
			{
				path: "/seller-dashboard/payment-history",
				element: (
					<SellerRoute>
						<History></History>
					</SellerRoute>
				),
			},
			{
				path: "/seller-dashboard/request-advert",
				element: (
					<SellerRoute>
						<Advertisement></Advertisement>
					</SellerRoute>
				),
			},
		],
	},
	{
		path: "/admin-dashboard",
		element: (
			<AdminRoute>
				<AdminDashboard></AdminDashboard>
			</AdminRoute>
		),
		children: [
			{
				path: "/admin-dashboard/overview",
				element: (
					<AdminRoute>
						<AdminHome></AdminHome>
					</AdminRoute>
				),
			},
			{
				path: "/admin-dashboard/manage-user",
				element: (
					<AdminRoute>
						<User></User>
					</AdminRoute>
				),
			},
			{
				path: "/admin-dashboard/manage-category",
				element: (
					<AdminRoute>
						<Category></Category>
					</AdminRoute>
				),
			},
			{
				path: "/admin-dashboard/manage-payment",
				element: (
					<AdminRoute>
						<Payment></Payment>
					</AdminRoute>
				),
			},
			{
				path: "/admin-dashboard/sales",
				element: (
					<AdminRoute>
						<Sales></Sales>
					</AdminRoute>
				),
			},
			{
				path: "/admin-dashboard/manage-banner",
				element: (
					<AdminRoute>
						<Banner></Banner>
					</AdminRoute>
				),
			},
		],
	},
]);
