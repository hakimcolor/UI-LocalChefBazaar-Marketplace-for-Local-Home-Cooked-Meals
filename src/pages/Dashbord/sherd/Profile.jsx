
// import React, { useContext, useEffect, useState } from 'react';
// import Swal from 'sweetalert2';
// import { toast } from 'react-toastify';
// import { AuthContext } from '../../../Context/AuthContext';
// import Loading from '../../../Componentes/Loading';

// const Profile = () => {
//   const { user } = useContext(AuthContext); // logged-in user
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // Fetch user info from backend
//   useEffect(() => {
//     const fetchUserData = async () => {
//       if (!user?.email) return;

//       try {
//         setLoading(true);
//         const res = await fetch(`http://localhost:5000/users/${user.email}`);
//         const data = await res.json();

//         if (data.success) {
//           setUserData(data.data);
//         } else {
//           toast.error(data.message || 'User not found');
//         }
//       } catch (err) {
//         toast.error(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserData();
//   }, [user?.email]);

//   // Handle Role Request (Chef/Admin)
//   const handleRoleRequest = async (type) => {
//     if (!userData) return;

//     const requestData = {
//       _id: userData._id,
//       userName: userData.name,
//       userEmail: userData.email,
//       requestType: type,
//       requestStatus: 'pending',
//       requestTime: new Date().toISOString(),
//     };

//     try {

//       setLoading(true);
//       const res = await fetch('http://localhost:5000/role-requests', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(requestData),
//       });

//       const data = await res.json();

//       if (data.insertedId) {
//         Swal.fire({
//           title: 'Request Sent!',
//           text: `Your request to be a ${type} is now pending.`,
//           icon: 'success',
//           timer: 1500,
//           showConfirmButton: false,
//         });
//       } else {
//         Swal.fire('Error', 'Could not send request.', 'error');
//       }
//     } catch (err) {
//       toast.error(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading && !userData) return <Loading />;

//   return (
//     <div className="flex justify-center mt-10 px-4">
//       <title>LocalChefBazaar || Profile</title>
//       <div className="bg-white shadow-md p-8 rounded-xl w-full max-w-lg border border-[#f3d9c6]">
//         {/* Profile Image */}
//         <div className="flex justify-center mb-6">
//           <img
//             src={
//               userData?.profileImg ||
//               'https://i.ibb.co/7CMqG7N/default-avatar.jpg'
//             }
//             alt="User"
//             className="w-32 h-32 rounded-full object-cover border-4 border-[#ffdbc9]"
//           />
//         </div>

//         {/* User Info */}
//         <h2 className="text-2xl font-bold text-center text-[#b94a21] mb-4">
//           {userData?.name}
//         </h2>

//         <div className="space-y-3 text-gray-700">
//           <p>
//             <strong>Email:</strong> {userData?.email}
//           </p>

//           <p>
//             <strong>Address:</strong> {userData?.address || 'Not Provided'}
//           </p>

//           <p>
//             <strong>Role:</strong>{' '}
//             <span className="capitalize">{userData?.role || 'user'}</span>
//           </p>

//           <p>
//             <strong>Status:</strong>{' '}
//             <span className="capitalize">{userData?.status || 'active'}</span>
//           </p>

//           {/* Chef ID */}
//           {userData?.role === 'chef' && (
//             <p>
//               <strong>Chef ID:</strong> {userData?.chefId || 'Not Assigned'}
//             </p>
//           )}
//         </div>

//         {/* Buttons */}
//         <div className="mt-8 flex flex-col gap-3">
//           {userData?.role !== 'chef' && userData?.role !== 'admin' && (
//             <button
//               onClick={() => handleRoleRequest('chef')}
//               disabled={loading}
//               className="w-full py-2 bg-[#b94a21] text-white rounded-lg hover:bg-[#a13f1c] transition"
//             >
//               {loading ? 'Sending...' : 'Be a Chef'}
//             </button>
//           )}

//           {userData?.role !== 'admin' && (
//             <button
//               onClick={() => handleRoleRequest('admin')}
//               disabled={loading}
//               className="w-full py-2 border border-[#b94a21] text-[#b94a21] rounded-lg hover:bg-[#ffdbc9] transition"
//             >
//               {loading ? 'Sending...' : 'Be an Admin'}
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../Context/AuthContext';


const Profile = () => {
  const { user } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/users/${user.email}`
        );
        setUserInfo(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, [user.email]);

  const handleRoleRequest = async (role) => {
    try {
      const res = await axios.post('http://localhost:5000/role-request', {
        email: user.email,
        requestedRole: role,
      });
      alert(res.data.message);
      setUserInfo({ ...userInfo, roleRequest: role });
    } catch (err) {
      console.error(err);
    }
  };

  if (!userInfo) return <p>Loading...</p>;

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">{userInfo.name}</h2>
      <p>Email: {userInfo.email}</p>
      <p>Address: {userInfo.address}</p>
      <p>Role: {userInfo.role}</p>
      <p>Status: {userInfo.status || 'active'}</p>
      {userInfo.roleRequest && <p>Pending Request: {userInfo.roleRequest}</p>}
      <div className="mt-4 space-x-2">
        {!userInfo.roleRequest && (
          <>
            <button
              onClick={() => handleRoleRequest('chef')}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Be a Chef
            </button>
            <button
              onClick={() => handleRoleRequest('admin')}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Be an Admin
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
