import React, { useEffect, useState } from 'react';

const DalySixDataDB = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/meals/latest')
      .then((res) => res.json())
      .then((data) => {
        setMeals(data.data.slice(0, 6));
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-20">
        <p className="text-gray-500 text-lg animate-pulse">Loading meals...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-4xl font-bold mb-10 text-center ">
        Daily Meals
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {meals.map((meal) => (
          <div
            key={meal._id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 flex flex-col"
          >
            <img
              src={meal.foodImage || 'https://via.placeholder.com/400x250'}
              alt={meal.foodName}
              className="w-full h-56 object-cover"
            />
            <div className="p-5 flex flex-col flex-1 justify-between">
              <div>
                <h3 className="text-2xl font-semibold mb-2 text-gray-800">
                  <strong>{meal.foodName}</strong>
                </h3>
                <p className="text-gray-600 mb-1 ">
                  <strong>Chef:</strong> {meal.chefName}
                </p>
                <p className="text-gray-600 mb-1">
                  <strong>Ingredients:</strong> {meal.ingredients.join(', ')}
                </p>
                <p className="text-gray-600 mb-3">
                  <strong>
                    Delivery: </strong> {meal.estimatedDeliveryTime} mins | <strong>Experience: </strong>{' '}
                    {meal.chefExperience} yrs
                 
                </p>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <p className="text-red-500 font-bold text-xl">
                  <strong>${meal.price}</strong>
                </p>
                <p className="text-yellow-500 font-semibold">
                  <strong>⭐ {meal.rating}</strong>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DalySixDataDB;
