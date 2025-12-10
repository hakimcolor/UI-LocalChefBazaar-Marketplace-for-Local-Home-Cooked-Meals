// src/pages/ProfilePage.jsx

import React, { useContext, useState } from 'react';

import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../Context/AuthContext';


const Profile = () => {
  const { user } = useContext(AuthContext)
  const [loading, setLoading] = useState(false);

  // ⏳ Handle Request (Chef / Admin)
  const handleRoleRequest = async (type) => {
    if (!user) return;

    const requestData = {
      userName: user?.displayName,
      userEmail: user?.email,
      requestType: type, // chef OR admin
      requestStatus: 'pending',
      requestTime: new Date().toISOString(),
    };

    try {
      setLoading(true);

      const res = await fetch('https://your-server-domain.com/role-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      });

      const data = await res.json();

      if (data.insertedId) {
        Swal.fire({
          title: 'Request Sent!',
          text: `Your request to be a ${type} is now pending.`,
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        Swal.fire('Error', 'Could not send request.', 'error');
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center mt-10 px-4">
      <div className="bg-white shadow-md p-8 rounded-xl w-full max-w-lg border border-[#f3d9c6]">
        {/* Profile Image */}
        <div className="flex justify-center mb-6">
          <img
            src={
              user?.photoURL || 'https://i.ibb.co/7CMqG7N/default-avatar.jpg'
            }
            alt="User"
            className="w-32 h-32 rounded-full object-cover border-4 border-[#ffdbc9]"
          />
        </div>

        {/* User Info */}
        <h2 className="text-2xl font-bold text-center text-[#b94a21] mb-4">
          {user?.displayName}
        </h2>

        <div className="space-y-3 text-gray-700">
          <p>
            <strong>Email:</strong> {user?.email}
          </p>

          <p>
            <strong>Address:</strong> {user?.address || 'Not Provided'}
          </p>

          <p>
            <strong>Role:</strong>{' '}
            <span className="capitalize">{user?.role || 'user'}</span>
          </p>

          <p>
            <strong>Status:</strong>{' '}
            <span className="capitalize">{user?.status || 'active'}</span>
          </p>

          {/* Chef ID Only for Chef */}
          {user?.role === 'chef' && (
            <p>
              <strong>Chef ID:</strong> {user?.chefId || 'Not Assigned'}
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-col gap-3">
          {/* Be a Chef (hide if already chef or admin) */}
          {user?.role !== 'chef' && user?.role !== 'admin' && (
            <button
              onClick={() => handleRoleRequest('chef')}
              disabled={loading}
              className="w-full py-2 bg-[#b94a21] text-white rounded-lg hover:bg-[#a13f1c] transition"
            >
              {loading ? 'Sending...' : 'Be a Chef'}
            </button>
          )}

          {/* Be an Admin (hide if admin) */}
          {user?.role !== 'admin' && (
            <button
              onClick={() => handleRoleRequest('admin')}
              disabled={loading}
              className="w-full py-2 border border-[#b94a21] text-[#b94a21] rounded-lg hover:bg-[#ffdbc9] transition"
            >
              {loading ? 'Sending...' : 'Be an Admin'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
