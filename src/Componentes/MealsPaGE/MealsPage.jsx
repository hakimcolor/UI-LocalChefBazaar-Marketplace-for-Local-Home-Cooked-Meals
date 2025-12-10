
 import React, { useEffect, useState, useContext } from 'react';
 import axios from 'axios';
 import { useNavigate } from 'react-router-dom';
 import { AuthContext } from '../../Context/AuthContext';

 const MealsPage = () => {
   const [meals, setMeals] = useState([]);
   const [sortOrder, setSortOrder] = useState('asc');
   const { user } = useContext(AuthContext);
   const navigate = useNavigate();

   useEffect(() => {
     fetchMeals();
   }, [sortOrder]);

   const fetchMeals = async () => {
     try {
       const res = await axios.get(
         `http://localhost:5000/meals?sort=${sortOrder}`
       );
       if (res.data.success) {
         setMeals(res.data.data);
       }
     } catch (err) {
       console.error(err);
     }
   };

   const handleSeeDetails = (mealId) => {
     if (user?.email) {
       navigate(`/meals/${mealId}`);
     } else {
       navigate('/signup');
     }
   };

   return (
     <div className="p-6 max-w-7xl mx-auto">
       {/* Sort Dropdown */}
       <div className="flex justify-end mb-6">
         <select
           value={sortOrder}
           onChange={(e) => setSortOrder(e.target.value)}
           className="
      border-2 
      border-transparent
      px-4 py-2 
      rounded-lg 
      bg-gradient-to-r from-orange-400 via-red-400 to-pink-500
      text-white 
      font-bold 
      text-lg 
      shadow-lg
      hover:scale-105 
      transition 
      duration-300 
      ease-in-out
      focus:outline-none 
      focus:ring-4 
      focus:ring-pink-300
      cursor-pointer
    "
         >
           <option value="asc" className="text-black font-semibold">
             Price: Low to High
           </option>
           <option value="desc" className="text-black font-semibold">
             Price: High to Low
           </option>
         </select>
       </div>

       {/* Meals Grid */}
       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
         {meals.map((meal) => (
           <div
             key={meal._id}
             className="border rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
           >
             <img
               src={meal.foodImage}
               alt={meal.foodName}
               className="w-full h-48 object-cover"
             />
             <div className="p-4 flex flex-col flex-grow">
               <h3 className="text-xl font-bold">{meal.foodName}</h3>
               <p className="text-gray-600">Chef: {meal.chefName}</p>
               <p className="text-gray-500">Chef ID: {meal.chefId}</p>
               <p className="text-gray-800 font-semibold">
                 Price: ${meal.price.toFixed(2)}
               </p>
               <p className="text-yellow-500">
                 Rating: {meal.rating ? meal.rating : '⭐️⭐️⭐️'}
               </p>
               <p className="text-gray-600 mb-4">
                 Delivery: {meal.deliveryArea || 'All areas'}
               </p>

               {/* Push button to bottom */}
               <div className="mt-auto">
                 <button
                   onClick={() => handleSeeDetails(meal._id)}
                   className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
                 >
                   See Details
                 </button>
               </div>
             </div>
           </div>
         ))}
       </div>
     </div>
   );
 };

 export default MealsPage;
