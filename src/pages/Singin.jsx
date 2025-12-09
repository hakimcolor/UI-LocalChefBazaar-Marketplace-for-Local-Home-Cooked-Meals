// import { auth } from '../Firebase/Firebase.confige';
// import React, { useContext, useState } from 'react';
// import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { AuthContext } from '../Context/AuthContext';
// import { sendPasswordResetEmail } from 'firebase/auth';
// import toast, { Toaster } from 'react-hot-toast';
// import { Helmet } from 'react-helmet';

// const SignIn = () => {
//   const { singinuser } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const [email, setEmail] = useState('');
//   const [passcode, setPasscode] = useState('');
//   const [show, setShow] = useState(false);
//   const [error, setError] = useState('');

//   const handleToggle = () => setShow(!show);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setError('');

//     singinuser(email, passcode)
//       .then(() => {
//         setEmail('');
//         setPasscode('');
//         toast.success('Login successful!');
//         navigate('/');
//       })
//       .catch((err) => {
//         setError(err.message);
//         toast.error(err.message);
//       });
//   };

//   const handleForgotPassword = () => {
//     if (!email) {
//       toast.error('Please enter your email first!');
//       return;
//     }

//     sendPasswordResetEmail(auth, email)
//       .then(() => {
//         toast.success('Password reset email sent! Check your inbox.');
//       })
//       .catch((err) => {
//         toast.error(err.message);
//       });
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen px-4">
//       <Helmet>
//         <title>Login | LocalChefBazaar</title>
//       </Helmet>

//       <Toaster />

//       <div className="bg-white/90 backdrop-blur-md border border-orange-200 shadow-2xl rounded-3xl p-8 sm:p-10 w-full max-w-lg">
//         <h2 className="text-4xl font-extrabold text-center text-orange-700 mb-8">
//           Login to Your Account
//         </h2>
//         <p className="text-center text-orange-600 mb-8">
//           Enter your credentials to continue
//         </p>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div className="flex flex-col">
//             <label className="text-orange-800 font-medium mb-1">Email</label>
//             <input
//               type="email"
//               value={email}
//               name='email'
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Enter your email"
//               required
//               className="w-full px-4 py-3 bg-orange-50 border border-orange-200 rounded-xl"
//             />
//           </div>

//           <div className="relative flex flex-col">
//             <label className="text-orange-800 font-medium mb-1">Password</label>
//             <input
//               type={show ? 'text' : 'password'}
//               value={passcode}
//               onChange={(e) => setPasscode(e.target.value)}
//               name='password'
//               placeholder="Enter your password"
//               required
//               className="w-full px-4 py-3 bg-orange-50 border border-orange-200 rounded-xl pr-12"
//             />
//             <button
//               type="button"
//               onClick={handleToggle}
//               className="absolute right-4 top-[42px] text-orange-600 hover:text-orange-800"
//             >
//               {show ? (
//                 <AiOutlineEyeInvisible size={22} />
//               ) : (
//                 <AiOutlineEye size={22} />
//               )}
//             </button>
//           </div>

//           <div className="text-right">
//             <button
//               type="button"
//               onClick={handleForgotPassword}
//               disabled={!email}
//               className={`text-sm ${
//                 email
//                   ? 'text-orange-600 hover:underline'
//                   : 'text-gray-400 cursor-not-allowed'
//               }`}
//             >
//               Forgot Password?
//             </button>
//           </div>

//           {error && <p className="text-red-500 text-sm">{error}</p>}

//           <button
//             type="submit"
//             className="w-full py-3 bg-amber-500 text-white font-bold rounded-xl hover:bg-amber-600 shadow-md"
//           >
//             Login
//           </button>
//         </form>

//         <p className="text-sm text-center text-orange-700 mt-6">
//           Don’t have an account?{' '}
//           <NavLink
//             to="/signup"
//             className="text-orange-600 font-medium hover:underline"
//           >
//             Sign Up
//           </NavLink>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SignIn;
import { auth } from '../Firebase/Firebase.confige';
import React, { useContext, useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { sendPasswordResetEmail } from 'firebase/auth';
import toast, { Toaster } from 'react-hot-toast';
import { Helmet } from 'react-helmet';

const SignIn = () => {
  const { signinUser } = useContext(AuthContext); // fixed here
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [passcode, setPasscode] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');

  const handleToggle = () => setShow(!show);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    signinUser(email, passcode) // fixed here
      .then(() => {
        setEmail('');
        setPasscode('');
        toast.success('Login successful!');
        navigate('/');
      })
      .catch((err) => {
        setError(err.message);
        toast.error(err.message);
      });
  };

  const handleForgotPassword = () => {
    if (!email) {
      toast.error('Please enter your email first!');
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success('Password reset email sent! Check your inbox.');
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <Helmet>
        <title>Login | LocalChefBazaar</title>
      </Helmet>

      <Toaster />

      <div className="bg-white/90 backdrop-blur-md border border-orange-200 shadow-2xl rounded-3xl p-8 sm:p-10 w-full max-w-lg">
        <h2 className="text-4xl font-extrabold text-center text-orange-700 mb-8">
          Login to Your Account
        </h2>
        <p className="text-center text-orange-600 mb-8">
          Enter your credentials to continue
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col">
            <label className="text-orange-800 font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-3 bg-orange-50 border border-orange-200 rounded-xl placeholder-gray-600 text-black"
            />
          </div>

          <div className="relative flex flex-col">
            <label className="text-orange-800 font-medium mb-1">Password</label>
            <input
              type={show ? 'text' : 'password'}
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              name="password"
              placeholder="Enter your password"
              required
              className="w-full px-4 py-3 bg-orange-50 border border-orange-200 rounded-xl pr-12 placeholder-gray-600 text-black"
            />
            <button
              type="button"
              onClick={handleToggle}
              className="absolute right-4 top-[42px] text-orange-600 hover:text-orange-800"
            >
              {show ? (
                <AiOutlineEyeInvisible size={22} />
              ) : (
                <AiOutlineEye size={22} />
              )}
            </button>
          </div>

          <div className="text-right">
            <button
              type="button"
              onClick={handleForgotPassword}
              disabled={!email}
              className={`text-sm ${
                email
                  ? 'text-orange-600 hover:underline'
                  : 'text-gray-400 cursor-not-allowed'
              }`}
            >
              Forgot Password?
            </button>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 bg-amber-500 text-white font-bold rounded-xl hover:bg-amber-600 shadow-md"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center text-orange-700 mt-6">
          Don’t have an account?{' '}
          <NavLink
            to="/signup"
            className="text-orange-600 font-medium hover:underline"
          >
            Sign Up
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
