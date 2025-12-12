// import React, { useState, useContext } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';

// import { useLoaderData } from 'react-router-dom';
// import { AuthContext } from '../../../Context/AuthContext';

// const Order = () => {
//   const { user } = useContext(AuthContext);
//   const meal = useLoaderData();
//   console.log(meal);
  

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
//           mealName: meal.foodName, 
//           price: meal.price,
//           quantity: quantity,
//           chefId: meal.chefId,
//           paymentStatus: 'Pending',
//           userEmail: user.email,
//           userAddress,
//           orderStatus: 'pending',
//           orderTime: new Date().toISOString(),
//         };

//         try {
//           const res = await axios.post(
//             'http://localhost:5000/orders',
//             orderInfo
//           );

//           if (res.data.success) {
//             Swal.fire('Success!', 'Order placed successfully!', 'success');
//           }
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
//           value={meal.foodName}
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
//           value={user.email}
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
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthContext';

const Order = () => {
  const { user } = useContext(AuthContext);
  const meal = useLoaderData(); // loaded meal item

  const [quantity, setQuantity] = useState(1);
  const [userAddress, setUserAddress] = useState('');

  const handleConfirmOrder = async () => {
    const totalPrice = meal.price * quantity;

    Swal.fire({
      title: 'Confirm Order?',
      text: `Your total price is $${totalPrice}. Do you want to confirm the order?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const orderInfo = {
          foodId: meal._id, // food item `_id`
          mealName: meal.mealName || meal.foodName,
          price: meal.price,
          quantity: quantity,
          chefId: meal.chefId,
          paymentStatus: 'Pending',
          userEmail: user?.email,
          userAddress,
          orderStatus: 'pending',
          orderTime: new Date().toISOString(),
        };

        try {
          const res = await axios.post(
            'http://localhost:5000/orders',
            orderInfo
          ); console.log(res.data);

          // success message
          Swal.fire({
            title: 'Success!',
            text: 'Order placed successfully!',
            icon: 'success',
          });
        } catch (error) {
          Swal.fire({
            title: 'Error!',
            text: 'Failed to place order',
            icon: 'error',
          });
        }
      }
    });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">
        Confirm Your Order
      </h2>

      {/* Meal Name */}
      <div className="mb-3">
        <label className="font-semibold">Meal Name</label>
        <input
          type="text"
          value={meal.mealName || meal.foodName}
          disabled
          className="input input-bordered w-full"
        />
      </div>

      {/* Price */}
      <div className="mb-3">
        <label className="font-semibold">Price</label>
        <input
          type="text"
          value={meal.price}
          disabled
          className="input input-bordered w-full"
        />
      </div>

      {/* Quantity */}
      <div className="mb-3">
        <label className="font-semibold">Quantity</label>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="input input-bordered w-full"
        />
      </div>

      {/* Chef ID */}
      <div className="mb-3">
        <label className="font-semibold">Chef ID</label>
        <input
          type="text"
          value={meal.chefId}
          disabled
          className="input input-bordered w-full"
        />
      </div>

      {/* User Email */}
      <div className="mb-3">
        <label className="font-semibold">Your Email</label>
        <input
          type="text"
          value={user?.email}
          disabled
          className="input input-bordered w-full"
        />
      </div>

      {/* Address */}
      <div className="mb-3">
        <label className="font-semibold">Delivery Address</label>
        <textarea
          className="textarea textarea-bordered w-full"
          placeholder="Enter your address"
          value={userAddress}
          onChange={(e) => setUserAddress(e.target.value)}
        ></textarea>
      </div>

      <button onClick={handleConfirmOrder} className="btn btn-primary w-full">
        Confirm Order
      </button>
    </div>
  );
};

export default Order;
