import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { updateProfile } from 'firebase/auth';
import { db } from '../Firebase/Firebase.confige';
import { AuthContext } from '../Context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import { doc, setDoc } from 'firebase/firestore';
import axios from 'axios';

const SignUp = () => {
  const navigate = useNavigate();
  const { createUser } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [profileFile, setProfileFile] = useState(null);
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleToggle = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !name || !address || !password || !confirmPassword) {
      return toast.error('Please fill all fields.');
    }
    if (!profileFile) return toast.error('Please upload a profile image.');
    if (password !== confirmPassword)
      return toast.error('Passwords do not match.');
    if (password.length < 6)
      return toast.error('Password must be at least 6 characters.');
    if (!/[A-Z]/.test(password))
      return toast.error('Password must contain an uppercase letter.');
    if (!/[0-9]/.test(password))
      return toast.error('Password must include a number.');
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
      return toast.error('Password must include a special character.');

    try {
      // Upload profile image to IMGBB
      const formData = new FormData();
      formData.append('image', profileFile);

      const uploadRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=4069702c25ccc162b662f2c5ce170f8d`,
        formData
      );
      const profileImg = uploadRes.data.data.display_url;

      // Create user in Firebase Auth
      const userCredential = await createUser(email, password);

      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: profileImg,
      });

      // Send user data to backend
      const userData = { email, name, address, password, profileImg };
      await axios.post(`https://backend-local-chef-bazaar-marketpla.vercel.app
/users`, userData);

      await setDoc(doc(db, 'users', userCredential.user.uid), {
        name,
        email,
        profileImg,
        address,
        role: 'user',
        status: 'active',
        uid: userCredential.user.uid,
        createdAt: new Date(),
      });

      toast.success('Account created successfully!');
      setTimeout(() => navigate('/'), 500);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      {/* Navigation Bar */}
      <div className="flex items-center justify-center px-4 mt-10 mb-6">
        <Helmet>
          <title>Sign Up | LocalChefBazaar</title>
        </Helmet>
        <Toaster position="top-right" />

        <div className="backdrop-blur-md border border-orange-200 shadow-2xl rounded-3xl p-8 sm:p-10 w-full max-w-lg">
          <h2 className="text-4xl font-extrabold text-center mb-8">
            Create Your Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div className="flex flex-col">
              <label className="font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                className="w-full px-4 py-3  placeholder-gray-600 bg-orange-50 border  text-black border-orange-200 rounded-xl"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Profile Image */}
            <div className="flex flex-col">
              <label className=" font-medium mb-1">Profile Image</label>
              <input
                type="file"
                className=" w-full px-4 py-3 bg-orange-50 border border-orange-200 rounded-xl text-gray-900"
                onChange={(e) => setProfileFile(e.target.files[0])}
                required
              />
            </div>

            {/* Address */}
            <div className="flex flex-col">
              <label className="font-medium mb-1">Address</label>
              <input
                type="text"
                name="text"
                className="w-full px-4 text-black py-3 bg-orange-50 border border-orange-200 rounded-xl placeholder-gray-600"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className=" font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                className=" text-black w-full px-4 py-3 bg-orange-50 border border-orange-200 rounded-xl placeholder-gray-600"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className="flex flex-col relative">
              <label className=" font-medium mb-1">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full px-4 py-3 bg-orange-50 border  text-black border-orange-200 rounded-xl pr-12 placeholder-gray-600"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-4 top-[42px] text-red-700"
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
              <label className=" font-medium mb-1">Confirm Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full px-4 py-3 text-black bg-orange-50 border border-orange-200 rounded-xl placeholder-gray-600"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-amber-500 text-white font-bold rounded-xl hover:bg-amber-600 shadow-md"
              // onClick={navigate('/')}
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
    </div>
  );
};

export default SignUp;
