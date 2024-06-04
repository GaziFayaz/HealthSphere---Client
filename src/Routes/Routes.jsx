import { createBrowserRouter } from "react-router-dom";
import Root from "../Layouts/Root";
import Home from "../Components/Home/Home";
import Login from "../Components/Authentication/Login";
import Register from "../Components/Authentication/Register";

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
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>
      }
    ]
  }
])