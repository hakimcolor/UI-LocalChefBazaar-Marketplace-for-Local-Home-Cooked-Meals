import { createBrowserRouter } from 'react-router';
import Root from '../Layout/Root';
import SignUp from '../pages/SingUp';
import SignIn from '../pages/Singin';

import DashboardLayout from '../Layout/DashbordLayout/DashboardLayout';

import Orders from '../Componentes/MealsPaGE/Orders';
import MYReviews from '../pages/Dashbord/User/MYReviews';
import FavoriteMeal from '../pages/Dashbord/User/FavoriteMeal';
// import Profile from '../pages/Dashbord/sherd/Profile';
import WElcomd from '../pages/Dashbord/User/WElcomd';
import Profile from '../pages/Dashbord/sherd/Profile';
import Addmeals from '../pages/Dashbord/Seller/Addmeals';
import MealsPage from '../Componentes/MealsPaGE/MealsPage';
import MealDetails from '../Componentes/MealsPaGE/MealDetails';
import Home from '../pages/Home';
import MyMeals from '../pages/Dashbord/Seller/MyMeals';
import Order from '../Componentes/MealsPaGE/Orders';
import OrderRequest from '../pages/Dashbord/Seller/OrderRequest';
import MyOrders from '../pages/Dashbord/User/MyOrders';
import ManageUsers from '../pages/Dashbord/Admin/ManageUsers';
import ManageRequests from '../pages/Dashbord/Admin/ManageRequests';

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
        element: <MealsPage />,
      },
      {
        path: 'mealsd/:id',
        element: <MealDetails />,
      },
      {
        path: '/order/:id',
        element: <Order />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/mealsd/${params.id}`),
      },
    ],
  },

  {
    path: 'dashbord',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <WElcomd />,
      },
      {
        path: 'orders',
        element: <Orders />,
      },
      {
        path: 'reviews',
        element: <MYReviews />,
      },
      {
        path: 'favoritemeal',
        element: <FavoriteMeal />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'addmeals',
        element: <Addmeals />,
      },
      {
        path: 'mymeals',
        element: <MyMeals />,
      },
      {
        path: 'orderreq',
        element: <OrderRequest />,
      },{
        path: 'myorder',
        element:<MyOrders/>
      }, {
        path: 'manageuser',
        element:<ManageUsers/>
      }, {
        path: 'managerequest', 
        element:<ManageRequests/>
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
