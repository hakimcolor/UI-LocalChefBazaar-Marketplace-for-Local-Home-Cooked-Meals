
import React, { useContext, useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FiLogOut, FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';
import logo from '../assets/Logo.png';
import { AuthContext } from '../Context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';

const Header = () => {
  const { user, signoutUser } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark'
  );
  const navigate = useNavigate();


  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);


  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      darkMode ? 'dark' : 'light'
    );
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const navLinks = user
    ? [
        { name: 'Home', path: '/' },
        { name: 'Meals', path: '/allmeals' },
        { name: 'Dashboard', path: 'dashbord' },
      ]
    : [
        { name: 'Home', path: '/' },
        { name: 'Meals', path: '/allmeals' },
      ];

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

  const buttonClass =
    'px-4 py-2 bg-amber-500 text-white font-bold rounded-xl shadow-md hover:bg-amber-600 transition';

  const toggleButtonClass =
    'ml-4 p-2 rounded-full bg-amber-500 text-white hover:bg-amber-600 transition';

  return (
    <header
      className="w-full fixed top-0 left-0 shadow-md z-50 bg-[#1a1a1a] h-[80px] flex items-center animate__animated animate__fadeInDown animate__faster"
      style={{
        backgroundColor: 'var(--header-bg)',
        color: 'var(--header-text)',
      }}
    >
      <Toaster position="top-right" />

      <div className="flex justify-between items-center p-4 w-full max-w-7xl mx-auto">
        <NavLink to="/" className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="w-16 h-16 rounded-full" />
          <span className="hidden sm:flex text-3xl font-bold">
            <span className="text-red-900 font-extrabold">L</span>
            <span className="text-gray-300">C</span>
            <span className="text-yellow-400">B</span>
            <span className="text-green-300">Z</span>
            <span className="text-blue-200">R</span>
          </span>
        </NavLink>

     
        <nav className="hidden md:flex items-center gap-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-[#FFD700] underline underline-offset-4'
                    : 'text-white hover:text-[#FFD700]'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          <button
            onClick={() => setDarkMode(!darkMode)}
            className={toggleButtonClass}
          >
            {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>

          {user ? (
            <div className="flex items-center gap-4">
              <div className="relative group">
                <img
                  src={
                    user.photoURL || 'https://i.ibb.co/2Z3p8wN/default-user.png'
                  }
                  alt="User"
                  className="w-14 h-14 rounded-full border-2 border-[#FFD700] cursor-pointer"
                />
                <div className="absolute top-16 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-sm px-4 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap">
                  <p className="font-semibold">{user.displayName || 'User'}</p>
                  <p className="text-gray-300">{user.email}</p>
                </div>
              </div>

              <button onClick={handleLogout} className={buttonClass}>
                <FiLogOut size={18} className="inline mr-2 cursor-pointer" />
                Log Out
              </button>
            </div>
          ) : (
            <NavLink to="/signup">
              <button className={buttonClass}>Sign Up</button>
            </NavLink>
          )}
        </nav>

        
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-3xl text-white"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>


      {isOpen && (
        <div className="md:hidden fixed top-[80px] right-0 w-64 p-10 bg-[#D35400] shadow-md rounded-bl-3xl animate__animated animate__slideInRight z-40">
          <nav className="flex flex-col items-center py-4 space-y-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => {
                  setIsOpen(false);
                  window.scrollTo(0, 0); 
                }}
                className={({ isActive }) =>
                  `text-lg transition-all duration-200 ${
                    isActive
                      ? 'text-[#FFD700] underline underline-offset-4'
                      : 'text-white hover:text-[#FFD700]'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            <button
              onClick={() => setDarkMode(!darkMode)}
              className={toggleButtonClass}
            >
              {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>

            {user ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className={buttonClass}
              >
                Log Out
              </button>
            ) : (
              <NavLink to="/signup" onClick={() => setIsOpen(false)}>
                <button className={buttonClass}>Sign Up</button>
              </NavLink>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
