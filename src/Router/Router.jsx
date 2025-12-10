import { createBrowserRouter } from 'react-router';
import Root from '../Layout/Root';
import SignUp from '../pages/SingUp';
import SignIn from '../pages/Singin';
import Home from '../pages/Home';
import MealsALL from '../pages/MealsALL';
import PrivateRoute from './PriveteRouter';
import DashboardLayout from '../Layout/DashbordLayout/DashboardLayout';

import DashboardHome from './DashboardHome';
import Orders from '../pages/Dashbord/User/Orders';
import MYReviews from '../pages/Dashbord/User/MYReviews';
import FavoriteMeal from '../pages/Dashbord/User/FavoriteMeal';
// import Profile from '../pages/Dashbord/sherd/Profile';
import WElcomd from '../pages/Dashbord/User/WElcomd';
import Profile from '../pages/Dashbord/sherd/Profile';

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
    ],
  },

  {
    path: 'dashbord',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <WElcomd/>,
      },
      {
        path: 'orders',
        element: <Orders />,
      }, {
        path: 'reviews',
        element:<MYReviews/>
      }, {
        path: 'favoritemeal',
        element:<FavoriteMeal/>
      }, {
        path: 'profile',
        element:<Profile/>
      }
    ],
  },

  // ✅ PRIVATE ROUTES
  // {
  //   path: 'dashboard',
  //   element: (
  //     <PrivateRoute>
  //       <DashboardLayout />
  //     </PrivateRoute>
  //   ),
  //   children: [
  //     {
  //       index: true,
  //       element: <DashboardHome/>,
  //     },
  //     {
  //       path: 'profile',
  //       element: <Profile />,
  //     },
  //   ],
  // },
]);
