import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const ManageRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await axios.get('http://localhost:5000/role-requests');
      setRequests(res.data.data);
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Failed to fetch requests', 'error');
    }
  };

  const handleApprove = async (req) => {
    try {
      let updateData = {};
      if (req.requestType === 'chef') {
        const chefId = `chef-${Math.floor(1000 + Math.random() * 9000)}`;
        updateData = { role: 'chef', chefId };
      } else if (req.requestType === 'admin') {
        updateData = { role: 'admin' };
      }

      // Update user role
      await axios.patch(
        `http://localhost:5000/users/${req.userEmail}/role`,
        updateData
      );

      // Update request status
      await axios.patch(
        `http://localhost:5000/role-requests/${req._id}/status`,
        { requestStatus: 'approved' }
      );

      Swal.fire('Approved', `${req.userName}'s request approved!`, 'success');
      fetchRequests();
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Failed to approve request', 'error');
    }
  };

  const handleReject = async (req) => {
    try {
      await axios.patch(
        `http://localhost:5000/role-requests/${req._id}/status`,
        { requestStatus: 'rejected' }
      );
      Swal.fire('Rejected', `${req.userName}'s request rejected!`, 'info');
      fetchRequests();
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Failed to reject request', 'error');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Role Requests</h2>
      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Request Type</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Request Time</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req._id} className="text-center">
              <td className="border px-4 py-2">{req.userName}</td>
              <td className="border px-4 py-2">{req.userEmail}</td>
              <td className="border px-4 py-2">{req.requestType}</td>
              <td className="border px-4 py-2">{req.requestStatus}</td>
              <td className="border px-4 py-2">
                {new Date(req.requestTime).toLocaleString()}
              </td>
              <td className="border px-4 py-2">
                {req.requestStatus === 'pending' ? (
                  <>
                    <button
                      onClick={() => handleApprove(req)}
                      className="bg-green-500 text-white px-3 py-1 mr-2 rounded hover:bg-green-600"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(req)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <span className="text-gray-400">{req.requestStatus}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageRequests;
