import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';


const MealsPage = () => {
  const [meals, setMeals] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const { user } = useContext(AuthContext)

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
      navigate(`/meals/${mealId}`); // Meal Details Page
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-end mb-4">
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {meals.map((meal) => (
          <div
            key={meal._id}
            className="border rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={meal.foodImage}
              alt={meal.foodName}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold">{meal.foodName}</h3>
              <p className="text-gray-600">Chef: {meal.chefName}</p>
              <p className="text-gray-500">Chef ID: {meal.chefId}</p>
              <p className="text-gray-800 font-semibold">
                Price: ${meal.price}
              </p>
              <p className="text-yellow-500">
                Rating: {meal.rating || '⭐️⭐️⭐️'}
              </p>
              <p className="text-gray-600">
                Delivery: {meal.deliveryArea || 'All areas'}
              </p>
              <button
                onClick={() => handleSeeDetails(meal._id)}
                className="mt-3 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
              >
                See Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealsPage;
