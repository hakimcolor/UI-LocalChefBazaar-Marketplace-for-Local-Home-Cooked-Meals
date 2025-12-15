
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../Context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import Loading from '../../../Componentes/Loading';

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://backend-local-chef-bazaar-marketpla.vercel.app
/orders/${user.email}`
        );

        if (res.data.success) {
          setOrders(res.data.data);
        } else {
          setOrders([]);
          toast.error(res.data.message || 'No orders found');
        }
      } catch (err) {
        console.error(err);
        toast.error('Server Error! Failed to fetch orders.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user?.email]);

  // 🔥 PAYMENT LOGIC (UNCHANGED)
  const handlePay = async (order) => {
    try {
      const res = await axios.post(
        `https://backend-local-chef-bazaar-marketpla.vercel.app
/create-checkout-session`,
        {
          orderId: order._id,
          amount: order.totalPrice,
          email: user.email,
          name: order.mealName || 'Customer',
        }
      );

      if (res.data.url) {
        window.location.href = res.data.url;
      } else {
        toast.error('Payment initiation failed');
      }
    } catch (err) {
      console.error(err);
      toast.error('Payment error! Please try again.');
    }
  };

  if (loading) return <Loading />;

  // ✅ SORT: pending first, paid last
  const sortedOrders = [...orders].sort((a, b) => {
    if (a.paymentStatus === 'pending' && b.paymentStatus === 'paid') return -1;
    if (a.paymentStatus === 'paid' && b.paymentStatus === 'pending') return 1;
    return 0;
  });

  return (
    <div className="p-4 grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-black">
      <title>LocalChefBazaar || MyOrders</title>
      <Toaster />

      {sortedOrders.length === 0 && (
        <p className="text-center col-span-full text-gray-500">
          No orders found.
        </p>
      )}

      {sortedOrders.map((order) => {
        const isPaid = order.paymentStatus?.toLowerCase() === 'paid';

        return (
          <div
            key={order._id}
            className={`border p-4 rounded shadow bg-white flex flex-col justify-between
              ${
                isPaid
                  ? 'opacity-60 pointer-events-none cursor-not-allowed'
                  : ''
              }`}
          >
            <h2 className="font-bold text-xl mb-2">{order.mealName}</h2>

            <p>
              <span className="font-semibold">Chef Name:</span> {order.chefName}
            </p>

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
              <span className="font-semibold">Delivery Time:</span>{' '}
              {order.deliveryTime}
            </p>

            <p>
              <span className="font-semibold">User Address:</span>{' '}
              {order.userAddress || '-'}
            </p>

            <p>
              <span className="font-semibold">Payment Status:</span>{' '}
              {order.paymentStatus}
            </p>

            {/* PAY BUTTON (UNCHANGED UI) */}
            {order.orderStatus === 'accepted' &&
              order.paymentStatus?.toLowerCase() === 'pending' && (
                <button
                  onClick={() => handlePay(order)}
                  className="bg-green-500 text-white px-4 py-2 mt-3 rounded hover:bg-green-600 cursor-pointer"
                >
                  Pay Now
                </button>
              )}
          </div>
        );
      })}
    </div>
  );
};

export default MyOrders;
