import { createBrowserRouter } from 'react-router';
import Root from '../Layout/Root';
import SignUp from '../pages/SingUp';
import SignIn from '../pages/Singin';



import DashboardLayout from '../Layout/DashbordLayout/DashboardLayout';


import Orders from '../pages/Dashbord/User/Orders';
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
import Order from '../pages/Dashbord/User/Orders';

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
