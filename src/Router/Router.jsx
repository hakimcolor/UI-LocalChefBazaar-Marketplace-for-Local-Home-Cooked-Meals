import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root";
import SignUp from "../pages/SingUp";
import SignIn from "../pages/Singin";
import Home from "../pages/Home";
import MealsALL from "../pages/MealsALL";
import PrivateRoute from "./PriveteRouter";
import Dashbord from "../pages/Dashbord";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'signup',
        element: <SignUp />,
      },
      {
        path: 'signin',
        element: <SignIn />,
      },
      {
        path: 'allmeals',
        element: <MealsALL />,
      },
      {
        element: <PrivateRoute />,
        children: [
          {
            path: 'dashboard',
            element:<Dashbord/>
          },
        ],
      },
    ],
  },
]);
