
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const BASE_URL = `https://backend-local-chef-bazaar-marketpla.vercel.app`;

const ManageRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/role-requests`);
        setRequests(res.data.data || []);
      } catch (err) {
        console.error(err);
        toast.error('Failed to fetch requests', { position: 'top-center' });
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const handleApprove = async (id, t) => {
    try {
      const res = await axios.patch(`${BASE_URL}/role-requests/${id}/approve`);
      setRequests((prev) => prev.filter((r) => r._id !== id));
      toast.success(res.data.message, { position: 'top-center' });
    } catch (err) {
      console.error(err);
      toast.error('Failed to approve request', { position: 'top-center' });
    } finally {
      toast.dismiss(t.id);
    }
  };

  const handleDecline = async (id, t) => {
    try {
      const res = await axios.patch(`${BASE_URL}/role-requests/${id}/decline`);
      setRequests((prev) => prev.filter((r) => r._id !== id));
      toast.success(res.data.message, { position: 'top-center' });
    } catch (err) {
      console.error(err);
      toast.error('Failed to decline request', { position: 'top-center' });
    } finally {
      toast.dismiss(t.id);
    }
  };

  const confirmAction = (id, actionType) => {
    toast(
      (t) => (
        <div className="p-4 bg-white rounded shadow-lg text-center w-full max-w-sm mx-auto">
          <p className="text-lg font-semibold mb-4">
            Are you sure you want to {actionType}?
          </p>
          <div className="flex justify-center space-x-4">
            <button
              className={`px-4 py-2 rounded font-semibold cursor-pointer ${
                actionType === 'approve'
                  ? 'bg-blue-500 text-white'
                  : 'bg-red-500 text-white'
              }`}
              onClick={() => {
                if (actionType === 'approve') handleApprove(id, t);
                else handleDecline(id, t);
              }}
            >
              Yes
            </button>
            <button
              className="bg-gray-300 px-4 py-2 rounded font-semibold cursor-pointer"
              onClick={() => toast.dismiss(t.id)}
            >
              No
            </button>
          </div>
        </div>
      ),
      { duration: Infinity, position: 'top-center' }
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-green-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!requests.length) {
    return <p className="text-center text-lg mt-8 text-black">No pending requests</p>;
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <Toaster
        containerStyle={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999,
        }}
      />
      <h2 className="text-2xl font-bold mb-6 text-center">
        Pending Role Requests
      </h2>
      <ul className="space-y-4">
        {requests.map((r) => (
          <li
            key={r._id}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-gray-100 rounded shadow"
          >
            <div className="mb-2 sm:mb-0">
              <p className="font-semibold text-lg">
                {r.name} ({r.email})
              </p>
              <p className="text-sm sm:text-base">
                Requested Role: {r.roleRequest}
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => confirmAction(r._id, 'approve')}
                className="bg-blue-500 text-white px-4 py-2 rounded font-semibold cursor-pointer"
              >
                Approve
              </button>
              <button
                onClick={() => confirmAction(r._id, 'decline')}
                className="bg-red-500 text-white px-4 py-2 rounded font-semibold cursor-pointer"
              >
                Decline
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageRequests;
