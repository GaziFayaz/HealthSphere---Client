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
				path: "/categories/:slug",
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
	},
	{
		path: "/seller-dashboard",
		element: (
			<SellerRoute>
				<SellerDashboard></SellerDashboard>
			</SellerRoute>
		),
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
