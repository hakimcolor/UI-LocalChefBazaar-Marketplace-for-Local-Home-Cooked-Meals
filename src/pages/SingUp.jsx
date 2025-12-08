import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { updateProfile } from 'firebase/auth';
import { auth, db } from '../Firebase/Firebase.confige';
import { AuthContext } from '../Context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import { doc, setDoc } from 'firebase/firestore';

const SignUp = () => {
  const navigate = useNavigate();
  const { createUser } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [profileImg, setProfileImg] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleToggle = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !email ||
      !name ||
      !profileImg ||
      !address ||
      !password ||
      !confirmPassword
    ) {
      return toast.error('Please fill all fields.');
    }
    if (password !== confirmPassword)
      return toast.error('Passwords do not match.');
    if (password.length < 6)
      return toast.error('Password must be at least 6 characters.');
    if (!/[A-Z]/.test(password))
      return toast.error(
        'Password must contain at least one uppercase letter.'
      );
    if (!/[0-9]/.test(password))
      return toast.error('Password must include at least one number.');
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
      return toast.error(
        'Password must include at least one special character.'
      );

    try {
      const res = await createUser(email, password);

      // Update Firebase Auth Profile
      await updateProfile(res.user, {
        displayName: name,
        photoURL: profileImg,
      });

      // Save to Firestore
      await setDoc(doc(db, 'users', res.user.uid), {
        name,
        email,
        profileImg,
        address,
        role: 'user',
        status: 'active',
        uid: res.user.uid,
        createdAt: new Date(),
      });

      toast.success('Account created successfully!');
      navigate('/signin');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className=" flex items-center justify-center px-4 mt-10 mb-6 -z-20 pt-20">
      <Helmet>
        <title>Sign Up | LocalChefBazaar</title>
      </Helmet>

      <Toaster position="top-right" />

      <div className="bg-white/90 backdrop-blur-md border border-orange-200 shadow-2xl rounded-3xl p-8 sm:p-10 w-full max-w-lg">
        <h2 className="text-4xl font-extrabold text-center text-orange-700 mb-8">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div className="flex flex-col">
            <label className="text-orange-800 font-medium mb-1">Name</label>
            <input
              type="text"
              autoComplete="name"
              className="w-full px-4 py-3 bg-orange-50 border border-orange-200 rounded-xl"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Profile Image URL */}
          <div className="flex flex-col">
            <label className="text-orange-800 font-medium mb-1">
              Profile Image URL
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 bg-orange-50 border border-orange-200 rounded-xl"
              placeholder="Enter image link"
              value={profileImg}
              onChange={(e) => setProfileImg(e.target.value)}
              required
            />
          </div>

          {/* Address */}
          <div className="flex flex-col">
            <label className="text-orange-800 font-medium mb-1">Address</label>
            <input
              type="text"
              className="w-full px-4 py-3 bg-orange-50 border border-orange-200 rounded-xl"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-orange-800 font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 bg-orange-50 border border-orange-200 rounded-xl"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col relative">
            <label className="text-orange-800 font-medium mb-1">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              className="w-full px-4 py-3 bg-orange-50 border border-orange-200 rounded-xl pr-12"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-4 top-[42px]"
              onClick={handleToggle}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={22} />
              ) : (
                <AiOutlineEye size={22} />
              )}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col">
            <label className="text-orange-800 font-medium mb-1">
              Confirm Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              className="w-full px-4 py-3 bg-orange-50 border border-orange-200 rounded-xl"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-amber-500 text-white font-bold rounded-xl hover:bg-amber-600 shadow-md"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center text-orange-700 mt-6">
          Already have an account?{' '}
          <NavLink
            to="/signin"
            className="text-orange-600 font-semibold hover:underline"
          >
            Sign In
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
