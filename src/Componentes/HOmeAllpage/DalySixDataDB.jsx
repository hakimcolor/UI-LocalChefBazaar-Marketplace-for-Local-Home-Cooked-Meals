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
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
          >
            <img
              src={meal.foodImage || 'https://via.placeholder.com/400x250'}
              alt={meal.foodName}
              className="w-full h-56 object-cover"
            />
            <div className="p-5">
              <h3 className="text-2xl font-semibold mb-2 text-gray-800">
                {meal.foodName}
              </h3>
              <p className="text-gray-600 mb-2">
                Chef: <span className="font-medium">{meal.chefName}</span>
              </p>
              <p className="text-gray-600 mb-2">
                Ingredients: {meal.ingredients.join(', ')}
              </p>
              <p className="text-gray-600 mb-2">
                Delivery: {meal.estimatedDeliveryTime} mins | Experience:{' '}
                {meal.chefExperience} yrs
              </p>
              <p className="text-red-500 font-bold text-xl">${meal.price}</p>
              <p className="text-yellow-500 mt-1">Rating: {meal.rating} ⭐</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DalySixDataDB;
