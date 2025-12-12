// import React, { useState, useContext } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import { useLoaderData } from 'react-router-dom';
// import { AuthContext } from '../../../Context/AuthContext';

// const Order = () => {
//   const { user } = useContext(AuthContext);
//   const meal = useLoaderData();

//   const [quantity, setQuantity] = useState(1);
//   const [userAddress, setUserAddress] = useState('');

//   const handleConfirmOrder = async () => {
//     const totalPrice = meal.price * quantity;

//     Swal.fire({
//       title: 'Confirm Order?',
//       text: `Your total price is $${totalPrice}. Do you want to confirm the order?`,
//       icon: 'question',
//       showCancelButton: true,
//       confirmButtonText: 'Yes',
//       cancelButtonText: 'Cancel',
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         const orderInfo = {
//           foodId: meal._id,
//           mealName: meal.mealName || meal.foodName,
//           price: meal.price,
//           quantity: quantity,
//           totalPrice: totalPrice,
//           chefId: meal.chefId,
//           paymentStatus: 'Pending',
//           userEmail: user?.email,
//           userAddress,
//           orderStatus: 'pending',
//           orderTime: new Date().toISOString(),
//         };

//         try {
//           const res = await axios.post(
//             'http://localhost:5000/orders',
//             orderInfo
//           );
//           console.log(res.data);

//           Swal.fire('Success!', 'Order placed successfully!', 'success');
//         } catch (error) {
//           Swal.fire('Error!', 'Failed to place order', 'error');
//         }
//       }
//     });
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
//       <h2 className="text-2xl font-bold text-center mb-6">
//         Confirm Your Order
//       </h2>

//       {/* Meal Name */}
//       <div className="mb-3">
//         <label className="font-semibold">Meal Name</label>
//         <input
//           type="text"
//           value={meal.mealName || meal.foodName}
//           disabled
//           className="input input-bordered w-full"
//         />
//       </div>

//       {/* Price */}
//       <div className="mb-3">
//         <label className="font-semibold">Price</label>
//         <input
//           type="text"
//           value={meal.price}
//           disabled
//           className="input input-bordered w-full"
//         />
//       </div>

//       {/* Quantity */}
//       <div className="mb-3">
//         <label className="font-semibold">Quantity</label>
//         <input
//           type="number"
//           min="1"
//           value={quantity}
//           onChange={(e) => setQuantity(Number(e.target.value))}
//           className="input input-bordered w-full"
//         />
//       </div>

//       {/* Chef ID */}
//       <div className="mb-3">
//         <label className="font-semibold">Chef ID</label>
//         <input
//           type="text"
//           value={meal.chefId}
//           disabled
//           className="input input-bordered w-full"
//         />
//       </div>

//       {/* User Email */}
//       <div className="mb-3">
//         <label className="font-semibold">Your Email</label>
//         <input
//           type="text"
//           value={user?.email}
//           disabled
//           className="input input-bordered w-full"
//         />
//       </div>

//       {/* Address */}
//       <div className="mb-3">
//         <label className="font-semibold">Delivery Address</label>
//         <textarea
//           className="textarea textarea-bordered w-full"
//           placeholder="Enter your address"
//           value={userAddress}
//           onChange={(e) => setUserAddress(e.target.value)}
//         ></textarea>
//       </div>

//       <button onClick={handleConfirmOrder} className="btn btn-primary w-full">
//         Confirm Order
//       </button>
//     </div>
//   );
// };

// export default Order;
import React, { useState, useContext } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';

const Order = () => {
  const { user } = useContext(AuthContext);
  const meal = useLoaderData();
  const navigate = useNavigate();


  const [quantity, setQuantity] = useState(1);
  const [userAddress, setUserAddress] = useState('');

  const handleConfirmOrder = async () => {
    if (!userAddress.trim()) {
      Swal.fire('Warning!', 'Please enter your delivery address', 'warning');
      return;
    }

    const totalPrice = meal.price * quantity;

    Swal.fire({
      title: `Confirm Order for "${meal.mealName || meal.foodName}"?`,
      text: `Your total price is $${totalPrice}. Do you want to confirm the order?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const orderInfo = {
          foodId: meal._id,
          mealName: meal.mealName || meal.foodName,
          price: meal.price,
          quantity,
          totalPrice,
          chefId: meal.chefId,
          paymentStatus: 'Pending',
          userEmail: user?.email,
          userAddress,
          deliveryTime: meal.estimatedDeliveryTime,
          orderStatus: 'pending',
          orderTime: new Date().toISOString(),
        };


        try {
          await axios.post('http://localhost:5000/orders', orderInfo);
          Swal.fire('Success!', 'Order placed successfully!', 'success');
        } catch (error) {
          Swal.fire('Error!', 'Failed to place order', 'error');
        }
      }
    });
  };

  return (
    <div className="max-w-md sm:max-w-sm mx-auto p-6 mb-5 bg-orange-50 shadow-md rounded-xl border border-orange-200 text-black">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-red-600 mb-6">
        🍽 Confirm Order: {meal.mealName || meal.foodName}
      </h2>

      {/* Meal Name */}
      <div className="mb-4">
        <label className="font-semibold text-orange-700 mb-1 block">
          Meal Name
        </label>
        <input
          type="text"
          value={meal.mealName || meal.foodName}
          disabled
          className="input input-bordered w-full border border-orange-400 rounded-lg p-2 text-sm sm:text-base"
        />
      </div>

      {/* Price */}
      <div className="mb-4">
        <label className="font-semibold text-orange-700 mb-1 block">
          Price
        </label>
        <input
          type="text"
          value={`$${meal.price}`}
          disabled
          className="input input-bordered w-full border border-orange-400 rounded-lg p-2 text-sm sm:text-base"
        />
      </div>

      {/* Quantity */}
      <div className="mb-4">
        <label className="font-semibold text-orange-700 mb-1 block">
          Quantity
        </label>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="input input-bordered w-full border border-orange-400 rounded-lg p-2 text-sm sm:text-base"
        />
      </div>

      {/* Chef ID */}
      <div className="mb-4">
        <label className="font-semibold text-orange-700 mb-1 block">
          Chef ID
        </label>
        <input
          type="text"
          value={meal.chefId}
          disabled
          className="input input-bordered w-full border border-orange-400 rounded-lg p-2 text-sm sm:text-base"
        />
      </div>

      {/* User Email */}
      <div className="mb-4">
        <label className="font-semibold text-orange-700 mb-1 block">
          Your Email
        </label>
        <input
          type="text"
          value={user?.email}
          disabled
          className="input input-bordered w-full border border-orange-400 rounded-lg text-black p-2 text-sm sm:text-base"
        />
      </div>

      {/* Address */}
      <div className="mb-5">
        <label className="font-semibold text-orange-700 mb-1 block">
          Delivery Address <span className="text-red-500">*</span>
        </label>
        <textarea
          className="textarea textarea-bordered w-full border border-orange-400 rounded-lg p-2 text-sm sm:text-base resize-none placeholder:text-black"
          placeholder="Enter your address"
          value={userAddress}
          onChange={(e) => setUserAddress(e.target.value)}
          rows={3}
        ></textarea>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => navigate(-1)}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg py-2 text-sm sm:text-base order-1 sm:order-1"
        >
          Back
        </button>

        {/* Confirm Order */}
        <button
          onClick={handleConfirmOrder}
          className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg py-2 text-sm sm:text-base order-2 sm:order-2"
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default Order;
