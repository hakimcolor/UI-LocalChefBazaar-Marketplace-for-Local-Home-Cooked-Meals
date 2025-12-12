// import React, { useEffect, useState, useContext } from 'react';
// import axios from 'axios';
// import { AuthContext } from '../../../Context/AuthContext';
// import toast, { Toaster } from 'react-hot-toast';

// const OrderRequest = () => {
//   const { user } = useContext(AuthContext); // লগিন করা ইউজার
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!user?.email) return;

//     const fetchOrders = async () => {
//       setLoading(true);
//       try {
//         const res = await axios.get(
//           `http://localhost:5000/user-chef-orders/${user.email}`
//         );

//         if (res.data.success) {
//           setOrders(res.data.data);
//         } else {
//           toast.error(res.data.message || 'Failed to fetch orders');
//         }
//       } catch (error) {
//         console.error('Error fetching user chef orders:', error);
//         toast.error('Server error while fetching orders');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, [user?.email]);

//   if (loading) {
//     return <div className="text-center mt-10">Loading orders...</div>;
//   }

//   if (!orders.length) {
//     return <div className="text-center mt-10">No orders found.</div>;
//   }

//   return (
//     <div className="p-4 text-black">
//       <Toaster />
//       <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {orders.map((order) => (
//           <div
//             key={order._id}
//             className="border rounded-lg p-4 shadow hover:shadow-lg transition duration-300"
//           >
//             <h3 className="text-xl font-semibold">{order.mealName}</h3>
//             <p>
//               <strong>Price:</strong> ${order.price} |{' '}
//               <strong>Quantity:</strong> {order.quantity} |{' '}
//               <strong>Total:</strong> ${order.totalPrice}
//             </p>
//             <p>
//               <strong>Chef ID:</strong> {order.chefId}
//             </p>
//             <p>
//               <strong>Payment Status:</strong> {order.paymentStatus}
//             </p>
//             <p>
//               <strong>Order Status:</strong> {order.orderStatus}
//             </p>
//             <p>
//               <strong>User Email:</strong> {order.userEmail}
//             </p>
//             <p>
//               <strong>Order Time:</strong>{' '}
//               {order.orderTime
//                 ? new Date(order.orderTime).toLocaleString()
//                 : '-'}
//             </p>
//             <p>
//               <strong>Delivery Address:</strong> {order.userAddress || '-'}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default OrderRequest;


import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../Context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';

const OrderRequest = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch orders
  useEffect(() => {
    if (!user?.email) return;

    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:5000/user-chef-orders/${user.email}`
        );

        if (res.data.success) {
          setOrders(res.data.data);
        } else {
          toast.error(res.data.message || 'Failed to load orders');
        }
      } catch (error) {
        console.error(error);
        toast.error('Server Error!');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user?.email]);

  // -------------------------
  // 🔥 Update Order Status
  // -------------------------
  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/update-order-status/${orderId}`,
        { orderStatus: newStatus }
      );

      if (res.data.success) {
        toast.success(`Order ${newStatus} successfully`);

        // Update UI without reload:
        setOrders((prev) =>
          prev.map((order) =>
            order._id === orderId ? { ...order, orderStatus: newStatus } : order
          )
        );
      } else {
        toast.error('Failed to update status');
      }
    } catch (error) {
      console.error(error);
      toast.error('Server error!');
    }
  };

  if (loading)
    return <div className="text-center mt-10">Loading orders...</div>;
  if (!orders.length)
    return <div className="text-center mt-10">No orders found.</div>;

  return (
    <div className="p-4 text-black">
      <Toaster />
      <h2 className="text-2xl font-bold mb-4">Your Orders</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {orders.map((order) => {
          const status = order.orderStatus;

          const isCancelled = status === 'cancelled';
          const isAccepted = status === 'accepted';
          const isDelivered = status === 'delivered';
          const isPending = status === 'pending';

          return (
            <div
              key={order._id}
              className="border rounded-lg p-4 shadow hover:shadow-lg transition duration-300"
            >
              <h3 className="text-xl font-semibold">{order.mealName}</h3>

              <p>
                <strong>Price:</strong> ${order.price} | <strong>Qty:</strong>{' '}
                {order.quantity} | <strong>Total:</strong> ${order.totalPrice}
              </p>

              <p>
                <strong>Chef ID:</strong> {order.chefId}
              </p>
              <p>
                <strong>User:</strong> {order.userEmail}
              </p>
              <p>
                <strong>Payment:</strong> {order.paymentStatus}
              </p>

              <p>
                <strong>Status:</strong>{' '}
                <span className="font-bold text-blue-600">
                  {order.orderStatus}
                </span>
              </p>

              <p>
                <strong>Order Time:</strong>{' '}
                {order.orderTime
                  ? new Date(order.orderTime).toLocaleString()
                  : '-'}
              </p>

              <p>
                <strong>Address:</strong> {order.userAddress || '-'}
              </p>

              {/* Action Buttons */}
              <div className="mt-4 flex flex-col sm:flex-row gap-2">
                {/* Cancel Button */}
                <button
                  onClick={() => handleStatusUpdate(order._id, 'cancelled')}
                  disabled={!isPending}
                  className={`px-3 py-2 rounded text-white w-full sm:w-auto ${
                    isPending ? 'bg-red-600' : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  Cancel
                </button>

                {/* Accept Button */}
                <button
                  onClick={() => handleStatusUpdate(order._id, 'accepted')}
                  disabled={!isPending}
                  className={`px-3 py-2 rounded text-white w-full sm:w-auto ${
                    isPending
                      ? 'bg-green-600'
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  Accept
                </button>

                {/* Deliver Button */}
                <button
                  onClick={() => handleStatusUpdate(order._id, 'delivered')}
                  disabled={!isAccepted}
                  className={`px-3 py-2 rounded text-white w-full sm:w-auto ${
                    isAccepted
                      ? 'bg-blue-600'
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  Deliver
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderRequest;
