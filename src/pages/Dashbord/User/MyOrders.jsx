
// import React, { useEffect, useState, useContext } from 'react';
// import axios from 'axios';
// import { AuthContext } from '../../../Context/AuthContext';
// import { useNavigate } from 'react-router-dom';

// const MyOrders = () => {
//   const { user } = useContext(AuthContext);
//   const [orders, setOrders] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (user?.email) {
//       axios
//         .get(`http://localhost:5000/orders/${user.email}`)
//         .then((res) => {
//           if (res.data.success) {
//             setOrders(res.data.data);
//           }
//         })
//         .catch((err) => console.error('Order fetch error:', err));
//     }
//   }, [user]);

//   const handlePay = async (order) => {
//     try {
//       const res = await axios.post(
//         'http://localhost:5000/create-checkout-session',
//         {
//           orderId: order._id,
//           amount: order.totalPrice, // total price
//           email: user.email,
//         }
//       );

//       if (res.data.url) {
//         window.location.href = res.data.url;
//       }
//     } catch (err) {
//       console.error('Stripe redirect error:', err);
//     }
//   };

//   return (
//     <div className="p-4 grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-black">
//       {orders.length === 0 && (
//         <p className="text-center col-span-full text-gray-500">
//           No orders found.
//         </p>
//       )}

//       {orders.map((order) => (
//         <div
//           key={order._id}
//           className="border p-4 rounded shadow bg-white flex flex-col justify-between"
//         >
//           <h2 className="font-bold text-xl mb-2">{order.mealName}</h2>

//           <p>
//             <span className="font-semibold">Chef ID:</span> {order.chefId}
//           </p>

//           <p>
//             <span className="font-semibold">Price:</span> ${order.price}
//           </p>

//           <p>
//             <span className="font-semibold">Quantity:</span> {order.quantity}
//           </p>

//           <p>
//             <span className="font-semibold">Total Price:</span> $
//             {order.totalPrice}
//           </p>

//           <p>
//             <span className="font-semibold">Order Status:</span>{' '}
//             {order.orderStatus}
//           </p>

//           <p>
//             <span className="font-semibold">Order Time:</span>{' '}
//             {new Date(order.orderTime).toLocaleString()}
//           </p>

//           <p>
//             <span className="font-semibold">Delivery Time:</span>
//             {order.deliveryTime ? order.deliveryTime : 'Pending'}
//           </p>

//           <p>
//             <span className="font-semibold">User Address:</span>{' '}
//             {order.userAddress}
//           </p>

//           <p>
//             <span className="font-semibold">Payment Status:</span>{' '}
//             {order.paymentStatus}
//           </p>

//           {/* Pay button show only when order accepted + payment pending */}
//           {order.orderStatus === 'accepted' &&
//             order.paymentStatus.toLowerCase() === 'pending' && (
//               <button
//                 onClick={() => handlePay(order)}
//                 className="bg-green-500 text-white px-4 py-2 mt-3 rounded hover:bg-green-600"
//               >
//                 Pay Now
//               </button>
//             )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default MyOrders;
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.email) {
      const fetchOrders = async () => {
        setLoading(true);
        try {
          const res = await axios.get(
            `http://localhost:5000/orders/${user.email}`
          );
          if (res.data.success && Array.isArray(res.data.data)) {
            setOrders(res.data.data);
          } else {
            setOrders([]);
            toast.error(res.data.message || 'No orders found');
          }
        } catch (err) {
          console.error('Order fetch error:', err);
          toast.error('Server Error! Failed to fetch orders.');
          setOrders([]);
        } finally {
          setLoading(false);
        }
      };
      fetchOrders();
    }
  }, [user?.email]);

  const handlePay = async (order) => {
    try {
      const res = await axios.post(
        'http://localhost:5000/create-checkout-session',
        {
          orderId: order._id,
          amount: order.totalPrice,
          email: user.email,
        }
      );

      if (res.data.url) {
        window.location.href = res.data.url;
      } else {
        toast.error('Payment initiation failed');
      }
    } catch (err) {
      console.error('Stripe redirect error:', err);
      toast.error('Payment error! Please try again.');
    }
  };

  if (loading)
    return <div className="text-center mt-10">Loading your orders...</div>;

  return (
    <div className="p-4 grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-black">
      <Toaster />

      {orders.length === 0 && (
        <p className="text-center col-span-full text-gray-500">
          No orders found.
        </p>
      )}

      {orders.map((order) => (
        <div
          key={order._id}
          className="border p-4 rounded shadow bg-white flex flex-col justify-between"
        >
          <h2 className="font-bold text-xl mb-2">{order.mealName}</h2>

          <p>
            <span className="font-semibold">Chef ID:</span> {order.chefId}
          </p>

          <p>
            <span className="font-semibold">Price:</span> ${order.price}
          </p>

          <p>
            <span className="font-semibold">Quantity:</span> {order.quantity}
          </p>

          <p>
            <span className="font-semibold">Total Price:</span> $
            {order.totalPrice}
          </p>

          <p>
            <span className="font-semibold">Order Status:</span>{' '}
            {order.orderStatus}
          </p>

          <p>
            <span className="font-semibold">Order Time:</span>{' '}
            {order.orderTime ? new Date(order.orderTime).toLocaleString() : '-'}
          </p>

          <p>
            <span className="font-semibold">Delivery Time:</span>{' '}
            {order.deliveryTime
              ? new Date(order.deliveryTime).toLocaleString()
              : 'Pending'}
          </p>

          <p>
            <span className="font-semibold">User Address:</span>{' '}
            {order.userAddress || '-'}
          </p>

          <p>
            <span className="font-semibold">Payment Status:</span>{' '}
            {order.paymentStatus}
          </p>

          {/* Pay button only for accepted + pending payment */}
          {order.orderStatus === 'accepted' &&
            order.paymentStatus?.toLowerCase() === 'pending' && (
              <button
                onClick={() => handlePay(order)}
                className="bg-green-500 text-white px-4 py-2 mt-3 rounded hover:bg-green-600"
              >
                Pay Now
              </button>
            )}
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
