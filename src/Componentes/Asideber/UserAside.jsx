import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  FaUser,
  FaShoppingBag,
  FaStar,
  FaHeart,
  FaSignOutAlt,
  FaArrowLeft,
  FaUsersCog,
  FaChartLine,
} from 'react-icons/fa';
import {
  MdRestaurantMenu,
  MdRestaurant,
  MdPendingActions,
} from 'react-icons/md';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Context/AuthContext';
import Logo from '../../assets/Logo.png';
import axios from 'axios';

const UserAside = () => {
  const { user, signoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [role, setRole] = useState(null); // ✅ FIX

  // Fetch role
  useEffect(() => {
    if (!user?.email) return;

    const fetchRole = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_API}/check-role/${user.email}`
        );

        if (res.data?.success) {
          setRole(res.data.role);
        }
      } catch (err) {
        console.error('Role fetch failed:', err);
        setRole('user'); // fallback
      }
    };

    fetchRole();
  }, [user?.email]);

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#D35400',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout',
    }).then((result) => {
      if (result.isConfirmed) {
        signoutUser()
          .then(() => {
            toast.success('Logged out');
            navigate('/');
          })
          .catch((err) => toast.error(err.message));
      }
    });
  };

  const linkStyle =
    'flex items-center gap-3 px-4 py-2 rounded-md font-medium text-[#5a5a5a] hover:bg-[#ffe9dd] transition';
  const activeStyle = 'bg-[#ffdbc9] text-[#b94a21] border-l-4 border-[#b94a21]';

  const backButtonStyle =
    'flex items-center gap-2 text-[#b94a21] font-semibold hover:text-[#ff5722] hover:scale-105 transition cursor-pointer mb-4';
  return (
    <div className="p-6 flex flex-col h-full bg-white shadow-lg">
      <div className="flex items-center gap-3 mb-8">
        <img src={Logo} className="w-12 h-12 rounded-xl" />
        <div>
          <h2 className="font-bold text-lg text-[#b94a21]">LocalChefBazaar</h2>
          <p className="text-xs text-gray-500">Dashboard</p>
        </div>
      </div>

      <div className="mb-6 flex items-center gap-3">
        <img
          src={user?.photoURL || 'https://i.ibb.co/7CMqG7N/default-avatar.jpg'}
          className="w-12 h-12 rounded-full"
        />
        <div>
          <h4 className="font-semibold text-[#b94a21]">
            {user?.displayName || 'User'}
          </h4>
          <p className="text-xs text-gray-500">{user?.email}</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1">
        <NavLink
          to="profile"
          className={({ isActive }) =>
            `${linkStyle} ${isActive ? activeStyle : ''}`
          }
        >
          <FaUser /> My Profile
        </NavLink>
        {/* USER  UI*/}
        {role === 'user' && (
          <>
            <NavLink
              to="myorder"
              className={({ isActive }) =>
                `${linkStyle} ${isActive ? activeStyle : ''}`
              }
            >
              <FaShoppingBag /> My Orders
            </NavLink>
            <NavLink
              to="reviews"
              className={({ isActive }) =>
                `${linkStyle} ${isActive ? activeStyle : ''}`
              }
            >
              <FaStar /> My Reviews
            </NavLink>
            <NavLink
              to="favoritemeal"
              className={({ isActive }) =>
                `${linkStyle} ${isActive ? activeStyle : ''}`
              }
            >
              <FaHeart /> Favorite Meal
            </NavLink>
          </>
        )}
        {/* CHEF UI */}
        {role === 'chef' && (
          <>
            <NavLink
              to="addmeals"
              className={({ isActive }) =>
                `${linkStyle} ${isActive ? activeStyle : ''}`
              }
            >
              <MdRestaurantMenu /> Create Meal
            </NavLink>
            <NavLink
              to="mymeals"
              className={({ isActive }) =>
                `${linkStyle} ${isActive ? activeStyle : ''}`
              }
            >
              <MdRestaurant /> My Meals
            </NavLink>
            <NavLink
              to="orderReq"
              className={({ isActive }) =>
                `${linkStyle} ${isActive ? activeStyle : ''}`
              }
            >
              <MdPendingActions /> Order Requests
            </NavLink>
          </>
        )}
        {/* ADMIN  UI*/}
        {role === 'admin' && (
          <>
            <NavLink
              to="manageuser"
              className={({ isActive }) =>
                `${linkStyle} ${isActive ? activeStyle : ''}`
              }
            >
              <FaUsersCog /> Manage Users
            </NavLink>
            <NavLink
              to="managerequest"
              className={({ isActive }) =>
                `${linkStyle} ${isActive ? activeStyle : ''}`
              }
            >
              <MdPendingActions /> Manage Request
            </NavLink>
            <NavLink
              to="StatisticsPage"
              className={({ isActive }) =>
                `${linkStyle} ${isActive ? activeStyle : ''}`
              }
            >
              <FaChartLine /> Statistics
            </NavLink>
          </>
        )}
        <div className={backButtonStyle} onClick={() => navigate(-1)}>
          <FaArrowLeft /> Back{' '}
        </div>

        <Link to="/">
          {' '}
          <div className={backButtonStyle}>
            <FaArrowLeft /> Back Home{' '}
          </div>{' '}
        </Link>
      </nav>

      {/* Logout */}
      <div className="mt-auto pt-6">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-2 border border-[#b94a21] text-[#b94a21] rounded-md hover:bg-[#ffdbc9]"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  );
};

export default UserAside;
