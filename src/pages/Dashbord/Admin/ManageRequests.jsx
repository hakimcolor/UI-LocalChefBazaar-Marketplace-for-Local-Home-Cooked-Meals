
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const ManageRequests = () => {
//   const [requests, setRequests] = useState([]);

//   useEffect(() => {
//     const fetchRequests = async () => {
//       try {
//         const res = await axios.get('http://localhost:5000/role-requests');
//         setRequests(res.data.data);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchRequests();
//   }, []);

//   const handleApprove = async (id) => {
//     try {
//       const res = await axios.patch(
//         `http://localhost:5000/role-requests/${id}/approve`
//       );
//       alert(res.data.message);
//       setRequests(requests.filter((r) => r._id !== id));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleDecline = async (id) => {
//     try {
//       const res = await axios.patch(
//         `http://localhost:5000/role-requests/${id}/decline`
//       );
//       alert(res.data.message);
//       setRequests(requests.filter((r) => r._id !== id));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   if (!requests.length) return <p>No pending requests</p>;

//   return (
//     <div className="p-4 max-w-lg mx-auto">
//       <h2 className="text-xl font-bold mb-4">Pending Role Requests</h2>
//       <ul>
//         {requests.map((r) => (
//           <li
//             key={r._id}
//             className="flex justify-between items-center mb-2 p-2 bg-gray-100 rounded"
//           >
//             <div>
//               <p>
//                 {r.name} ({r.email})
//               </p>
//               <p>Requested Role: {r.roleRequest}</p>
//             </div>
//             <div className="space-x-2">
//               <button
//                 onClick={() => handleApprove(r._id)}
//                 className="bg-blue-500 text-white px-2 py-1 rounded"
//               >
//                 Approve
//               </button>
//               <button
//                 onClick={() => handleDecline(r._id)}
//                 className="bg-red-500 text-white px-2 py-1 rounded"
//               >
//                 Decline
//               </button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ManageRequests;
