// import React, { useEffect, useState, useContext } from 'react';
// import axios from 'axios';
// import { AuthContext } from '../../../Context/AuthContext'; // Logged-in user context
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
//           if (res.data.success) setOrders(res.data.data);
//         })
//         .catch((err) => console.error(err));
//     }
//   }, [user]);

//   const handlePay = async (orderId, amount) => {
//     // Redirect to Stripe Checkout page
//     // Simplified: replace with your Stripe payment logic
//     try {
//       const stripePaymentUrl = `/stripe-checkout/${orderId}?amount=${amount}`;
//       window.location.href = stripePaymentUrl;
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="p-4 grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-black">
//       {orders.map((order) => (
//         <div
//           key={order._id}
//           className="border p-4 rounded shadow flex flex-col justify-between"
//         >
//           <h2 className="font-bold text-lg">{order.foodName}</h2>
//           <p>
//             Chef: {order.chefName} (ID: {order.chefId})
//           </p>
//           <p>Price: ${order.price}</p>
//           <p>Quantity: {order.quantity}</p>
//           <p>Order Status: {order.orderStatus}</p>
//           <p>Delivery Time: {order.deliveryTime || 'Pending'}</p>
//           <p>Payment Status: {order.paymentStatus}</p>

//           {order.orderStatus === 'accepted' &&
//             order.paymentStatus === 'pending' && (
//               <button
//                 onClick={() => handlePay(order._id, order.price)}
//                 className="bg-green-500 text-white px-4 py-2 mt-2 rounded hover:bg-green-600"
//               >
//                 Pay
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

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/orders/${user.email}`)
        .then((res) => {
          if (res.data.success) {
            setOrders(res.data.data);
          }
        })
        .catch((err) => console.error('Order fetch error:', err));
    }
  }, [user]);

  const handlePay = async (order) => {
    try {
      const res = await axios.post(
        'http://localhost:5000/create-checkout-session',
        {
          orderId: order._id,
          amount: order.totalPrice, // total price
          email: user.email,
        }
      );

      if (res.data.url) {
        window.location.href = res.data.url;
      }
    } catch (err) {
      console.error('Stripe redirect error:', err);
    }
  };

  return (
    <div className="p-4 grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-black">
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
            {new Date(order.orderTime).toLocaleString()}
          </p>

          <p>
            <span className="font-semibold">Delivery Time:</span>
            {order.deliveryTime ? order.deliveryTime : 'Pending'}
          </p>

          <p>
            <span className="font-semibold">User Address:</span>{' '}
            {order.userAddress}
          </p>

          <p>
            <span className="font-semibold">Payment Status:</span>{' '}
            {order.paymentStatus}
          </p>

          {/* Pay button show only when order accepted + payment pending */}
          {order.orderStatus === 'accepted' &&
            order.paymentStatus.toLowerCase() === 'pending' && (
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
