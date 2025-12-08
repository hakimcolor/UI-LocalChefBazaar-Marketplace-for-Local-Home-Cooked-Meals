import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root";
import SignUp from "../pages/SingUp";
import SignIn from "../pages/Singin";
import Home from "../pages/Home";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />, children: [
      {
        index: true,
        element: <Home/>
      },
      {
        path: 'signup',
      element:<SignUp/>
      }, {
        path: 'signin',
        element:<SignIn/>
    }
    ]
  },
]);
