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
    navigate(`/mealsd/${mealId}`);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Sorting */}
      <div className="flex justify-end mb-6">
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border rounded shadow px-4 py-2 font-medium bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white cursor-pointer transition-all duration-500 hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500"
        >
          <option className="text-black font-bold" value="asc">
            Price: Low → High
          </option>
          <option className="text-black font-bold" value="desc">
            Price: High → Low
          </option>
        </select>
      </div>

      {/* Meal Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {meals.map((meal) => (
          <div
            key={meal._id}
            className="border rounded shadow flex flex-col h-full"
          >
            <img
              src={meal.foodImage}
              className="w-full h-72 object-cover"
              alt=""
            />

            <div className="p-4 flex flex-col flex-grow">
              <h2 className="text-xl font-bold">{meal.foodName}</h2>
              <p>Chef: {meal.chefName}</p>
              <p>Price: ${meal.price}</p>

              {/* BUTTON ALWAYS STAYS AT THE BOTTOM */}
              <button
                onClick={() => handleSeeDetails(meal._id)}
                className="mt-auto bg-red-600 text-white px-4 py-2 w-full rounded"
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
