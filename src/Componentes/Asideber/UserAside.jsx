
import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import {
  FaUser,
  FaShoppingBag,
  FaStar,
  FaHeart,
  FaSignOutAlt,
  FaArrowLeft,
} from 'react-icons/fa';
import { AuthContext } from '../../Context/AuthContext';
import Logo from '../../assets/Logo.png';

const UserAside = () => {
  const { user, signoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // Logout handler
  const handleLogout = () => {
    if (!signoutUser) return;

    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out from your account!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#D35400',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log me out!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        signoutUser()
          .then(() => {
            Swal.fire({
              title: 'Logged out!',
              text: 'You have been successfully logged out.',
              icon: 'success',
              timer: 1500,
              showConfirmButton: false,
            });
            toast.success('Successfully logged out!');
            setTimeout(() => navigate('/'), 1500);
          })
          .catch((error) => {
            toast.error(`Logout error: ${error.message}`);
          });
      }
    });
  };

  // Styles
  const linkStyle =
    'flex items-center gap-3 px-4 py-2 rounded-md font-medium text-[#5a5a5a] hover:bg-[#ffe9dd] transition';
  const activeStyle = 'bg-[#ffdbc9] text-[#b94a21] border-l-4 border-[#b94a21]';
  const backButtonStyle =
    'flex items-center gap-2 text-[#b94a21] font-semibold hover:text-[#ff5722] hover:scale-105 transition cursor-pointer mb-4';

  return (
    <div className="p-6 flex flex-col h-full bg-white shadow-lg">
      <title>LocalChefBazaar||UserAside</title>
      {/* Back Button */}

      {/* Logo + Brand */}
      <div className="flex items-center gap-3 mb-8">
        <img
          src={Logo}
          alt="Logo"
          className="w-12 h-12 rounded-xl object-cover shadow border border-[#f1d4c3]"
        />
        <div>
          <h2 className="font-bold text-lg text-[#b94a21]">LocalChefBazaar</h2>
          <p className="text-xs text-gray-500">User Dashboard</p>
        </div>
      </div>

      {/* User Info */}
      <div className="mb-6 flex items-center gap-3">
        <img
          src={user?.photoURL || 'https://i.ibb.co/7CMqG7N/default-avatar.jpg'}
          alt="User avatar"
          className="w-12 h-12 rounded-full object-cover border border-[#ffddb5]"
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
        <NavLink
          to="addmeals"
          className={({ isActive }) =>
            `${linkStyle} ${isActive ? activeStyle : ''}`
          }
        >
          <FaUser /> add..
        </NavLink>
        <NavLink
          to="myorder"
          className={({ isActive }) =>
            `${linkStyle} ${isActive ? activeStyle : ''}`
          }
        >
          <FaShoppingBag /> My Orders
        </NavLink>
        <NavLink
          to="orderReq"
          className={({ isActive }) =>
            `${linkStyle} ${isActive ? activeStyle : ''}`
          }
        >
          <FaShoppingBag />
          Order Requests
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
          to="mymeals"
          className={({ isActive }) =>
            `${linkStyle} ${isActive ? activeStyle : ''}`
          }
        >
          <FaStar /> My Meals
        </NavLink>
        <NavLink
          to="favoritemeal"
          className={({ isActive }) =>
            `${linkStyle} ${isActive ? activeStyle : ''}`
          }
        >
          <FaHeart /> Favorite Meal
        </NavLink>
        <div
          className={backButtonStyle}
          onClick={() => navigate(-1)} // go back one step in history
        >
          <FaArrowLeft /> Back
        </div>
        <Link to={'/'}>
          {' '}
          <div
            className={backButtonStyle}
            // go back one step in history
          >
            <FaArrowLeft /> Back Home
          </div>
        </Link>
      </nav>

      {/* Logout Button */}
      <div className="mt-auto pt-6">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-2 border border-[#b94a21] text-[#b94a21] rounded-md hover:bg-[#ffdbc9] transition"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>

      {/* Footer */}
      <p className="text-center text-xs text-gray-400 mt-4">
        © {new Date().getFullYear()} LocalChefBazaar
      </p>
    </div>
  );
};

export default UserAside;
