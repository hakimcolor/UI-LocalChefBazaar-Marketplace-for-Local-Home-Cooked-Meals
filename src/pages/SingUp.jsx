// import React, { useContext, useState } from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
// import { updateProfile } from 'firebase/auth';
// import { auth, db } from '../Firebase/Firebase.confige';
// import { AuthContext } from '../Context/AuthContext';
// import toast, { Toaster } from 'react-hot-toast';
// import { Helmet } from 'react-helmet';
// import { doc, setDoc } from 'firebase/firestore';
// import axios from 'axios';

// const SignUp = () => {
//   const navigate = useNavigate();
//   const { createUser } = useContext(AuthContext);

//   const [email, setEmail] = useState('');
//   const [name, setName] = useState('');
//   // const [profileImg, setProfileImg] = useState('');
//   const [address, setAddress] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);

//   const handleToggle = () => setShowPassword(!showPassword);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const profileIm = e.target.file; 
//     const file=profileIm.files[0]
//     console.log(file);
   
//     if (
//       !email ||
//       !name ||
//       !profileIm ||
//       !address ||
//       !password ||
//       !confirmPassword
//     ) {
//       return toast.error('Please fill all fields.');
//     }
//     if (password !== confirmPassword)
//       return toast.error('Passwords do not match.');
//     if (password.length < 6)
//       return toast.error('Password must be at least 6 characters.');
//     if (!/[A-Z]/.test(password))
//       return toast.error(
//         'Password must contain at least one uppercase letter.'
//       );
//     if (!/[0-9]/.test(password))
//       return toast.error('Password must include at least one number.');
//     if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
//       return toast.error(
//         'Password must include at least one special character.'
//       );
    
    
//     const res = await axios.post(
//       `https://api.imgbb.com/1/upload?expiration=600&key=4069702c25ccc162b662f2c5ce170f8d`, { image: file }, {
//         headers: {
//         "Content-Type":"multipart/form-data"
//       }}
//     );
    
// const profileImg = res.data.data.display_url;

//     try {
//       const res = await createUser(email, password);

//       await updateProfile(res.user, {
//         displayName: name,
//         photoURL: profileImg,
//       });

//       await setDoc(doc(db, 'users', res.user.uid), {
//         name,
//         email,
//         profileImg,
//         address,
//         role: 'user',
//         status: 'active',
//         uid: res.user.uid,
//         createdAt: new Date(),
//       });

//       toast.success('Account created successfully!');
//       navigate('/');
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center px-4 mt-10 mb-6 -z-20">
//       <Helmet>
//         <title>Sign Up | LocalChefBazaar</title>
//       </Helmet>

//       <Toaster position="top-right" />

//       <div className="bg-white/90 backdrop-blur-md border border-orange-200 shadow-2xl rounded-3xl p-8 sm:p-10 w-full max-w-lg">
//         <h2 className="text-4xl font-extrabold text-center text-orange-700 mb-8">
//           Create Your Account
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div className="flex flex-col">
//             <label className="text-orange-800 font-medium mb-1">Name</label>
//             <input
//               type="text"
//               name="name"
//               autoComplete="name"
//               className="w-full px-4 py-3 bg-orange-50 border border-orange-200 rounded-xl"
//               placeholder="Enter your name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//           </div>

//           <div className="flex flex-col">
//             <label className="text-orange-800 font-medium mb-1">
//               Profile Image 
//             </label>
//             <input
//               type="file"
//               name="file"
//               className="w-full px-4 py-3 bg-orange-50 border border-orange-200 rounded-xl"
//               placeholder="Enter image link"
//               // value={profileImg}
//               // onChange={(e) => setProfileImg(e.target.value)}
             
//             />
//           </div>

//           <div className="flex flex-col">
//             <label className="text-orange-800 font-medium mb-1">Address</label>
//             <input
//               type="text"
//               name="address"
//               className="w-full px-4 py-3 bg-orange-50 border border-orange-200 rounded-xl"
//               placeholder="Enter your address"
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//               required
//             />
//           </div>

//           <div className="flex flex-col">
//             <label className="text-orange-800 font-medium mb-1">Email</label>
//             <input
//               type="email"
//               name="email"
//               className="w-full px-4 py-3 bg-orange-50 border border-orange-200 rounded-xl"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           <div className="flex flex-col relative">
//             <label className="text-orange-800 font-medium mb-1">Password</label>
//             <input
//               type={showPassword ? 'text' : 'password'}
//               className="w-full px-4 py-3 bg-orange-50 border border-orange-200 rounded-xl pr-12"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               autoComplete="new-password"
//             />
//             <button
//               type="button"
//               className="absolute right-4 top-[42px]"
//               onClick={handleToggle}
//             >
//               {showPassword ? (
//                 <AiOutlineEyeInvisible size={22} />
//               ) : (
//                 <AiOutlineEye size={22} />
//               )}
//             </button>
//           </div>

//           <div className="flex flex-col">
//             <label className="text-orange-800 font-medium mb-1">
//               Confirm Password
//             </label>
//             <input
//               type={showPassword ? 'text' : 'password'}
//               className="w-full px-4 py-3 bg-orange-50 border border-orange-200 rounded-xl"
//               placeholder="Confirm password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full py-3 bg-amber-500 text-white font-bold rounded-xl hover:bg-amber-600 shadow-md"
//           >
//             Sign Up
//           </button>
//         </form>

//         <p className="text-sm text-center text-orange-700 mt-6">
//           Already have an account?{' '}
//           <NavLink
//             to="/signin"
//             className="text-orange-600 font-semibold hover:underline"
//           >
//             Sign In
//           </NavLink>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SignUp;
import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { updateProfile } from 'firebase/auth';
import { auth, db } from '../Firebase/Firebase.confige';
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

    if (!email || !name || !address || !password || !confirmPassword)
      return toast.error('Please fill all fields.');

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
      const formData = new FormData();
      formData.append('image', profileFile);

      const uploadRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=4069702c25ccc162b662f2c5ce170f8d`,
        formData
      );

      const profileImg = uploadRes.data.data.display_url;

      const userCredential = await createUser(email, password);

      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: profileImg,
      });

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
      navigate('/');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center px-4 mt-10 mb-6 -z-20">
      <Helmet>
        <title>Sign Up | LocalChefBazaar</title>
      </Helmet>

      <Toaster position="top-right" />

      <div className="bg-white/90 backdrop-blur-md border border-orange-200 shadow-2xl rounded-3xl p-8 sm:p-10 w-full max-w-lg">
        <h2 className="text-4xl font-extrabold text-center text-orange-700 mb-8">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col">
            <label className="text-orange-800 font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              className="w-full px-4 py-3 bg-orange-50 border border-orange-200 rounded-xl"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-orange-800 font-medium mb-1">
              Profile Image
            </label>
            <input
              type="file"
              className="w-full px-4 py-3 bg-orange-50 border border-orange-200 rounded-xl"
              onChange={(e) => setProfileFile(e.target.files[0])}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-orange-800 font-medium mb-1">Address</label>
            <input
              type="text"
              name='text'
              className="w-full px-4 py-3 bg-orange-50 border border-orange-200 rounded-xl"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-orange-800 font-medium mb-1">Email</label>
            <input
              type="email"
              name='email'
              className="w-full px-4 py-3 bg-orange-50 border border-orange-200 rounded-xl"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

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
