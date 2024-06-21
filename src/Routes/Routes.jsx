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

export const router = createBrowserRouter([
  {
    path:"/",
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
        element: <Register></Register>
      },
      {
        path: "/update-profile",
        element: <PrivateRoute><UpdateProfile></UpdateProfile></PrivateRoute>
      },
      {
          path: "/cart",
          element: <PrivateRoute><Cart></Cart></PrivateRoute>
      },
      {
          path: "/checkout",
          element: <PrivateRoute><Checkout></Checkout></PrivateRoute>
      },
      {
        path: "/invoice",
        element: <PrivateRoute><Invoice></Invoice></PrivateRoute>
      }
    ]
  }
])