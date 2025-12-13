// import React, { useEffect, useState, useContext } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../../Context/AuthContext';

// const MealsPage = () => {
//   const [meals, setMeals] = useState([]);
//   const [filteredMeals, setFilteredMeals] = useState([]);
//   const [sortOrder, setSortOrder] = useState('asc');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchMeals();
//   }, [sortOrder]);

//   useEffect(() => {
//     handleSearch(searchTerm);
//   }, [meals, searchTerm]);

//   const fetchMeals = async () => {
//     try {
//       const res = await axios.get(
//         `http://localhost:5000/meals?sort=${sortOrder}`
//       );

//       if (res.data.success) {
//         setMeals(res.data.data);
//         setFilteredMeals(res.data.data);
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleSearch = (value) => {
//     setSearchTerm(value);

//     const filtered = meals.filter((meal) =>
//       meal.foodName.toLowerCase().includes(value.toLowerCase())
//     );

//     setFilteredMeals(filtered);
//     setCurrentPage(1);
//   };

//   const handleSeeDetails = (mealId) => {
//     navigate(`/mealsd/${mealId}`);
//   };

//   const indexOfLastMeal = currentPage * itemsPerPage;
//   const indexOfFirstMeal = indexOfLastMeal - itemsPerPage;
//   const currentMeals = filteredMeals.slice(indexOfFirstMeal, indexOfLastMeal);
//   const totalPages = Math.ceil(filteredMeals.length / itemsPerPage);

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       <title>LocalChefBazaar || MealsPage</title>

//       {/* 🔍 Search + Sort Bar */}
//       <div className="flex justify-between items-center mb-6 gap-4">
//         {/* Search (Left) */}
//         <input
//           type="text"
//           placeholder="Search by food name..."
//           value={searchTerm}
//           onChange={(e) => handleSearch(e.target.value)}
//           className="border rounded px-4 py-2 w-1/2 shadow"
//         />

//         {/* Sort (Right) */}
//         <select
//           value={sortOrder}
//           onChange={(e) => setSortOrder(e.target.value)}
//           className="border rounded shadow px-4 py-2 font-medium
//           bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
//           text-white cursor-pointer transition-all duration-500
//           hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500"
//         >
//           <option className="text-black font-bold" value="asc">
//             Price: Low → High
//           </option>
//           <option className="text-black font-bold" value="desc">
//             Price: High → Low
//           </option>
//         </select>
//       </div>

//       {/* Meals Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {currentMeals.map((meal) => (
//           <div
//             key={meal._id}
//             className="border rounded shadow flex flex-col h-full"
//           >
//             <img
//               src={meal.foodImage}
//               className="w-full h-72 object-cover"
//               alt=""
//             />
//             <div className="p-4 flex flex-col flex-grow">
//               <h2 className="text-xl font-bold">{meal.foodName}</h2>
//               <p>Chef: {meal.chefName}</p>
//               <p>Price: ${meal.price}</p>
//               <button
//                 onClick={() => handleSeeDetails(meal._id)}
//                 className="mt-auto bg-red-600 text-white px-4 py-2 w-full rounded"
//               >
//                 See Details
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-center mt-6 gap-2">
//         {Array.from({ length: totalPages }, (_, i) => (
//           <button
//             key={i}
//             onClick={() => setCurrentPage(i + 1)}
//             className={`px-4 py-2 border rounded ${
//               currentPage === i + 1 ? 'bg-indigo-500 text-white' : ''
//             }`}
//           >
//             {i + 1}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MealsPage;
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';

const MealsPage = () => {
  const [meals, setMeals] = useState([]);
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // Fetch meals
  useEffect(() => {
    fetchMeals();
  }, [sortOrder]);

  useEffect(() => {
    const filtered = meals.filter((meal) =>
      meal.foodName?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMeals(filtered);
    setCurrentPage(1);
  }, [searchTerm, meals]);

  const fetchMeals = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/meals?sort=${sortOrder}`
      );
      if (res.data.success) {
        setMeals(res.data.data);
        setFilteredMeals(res.data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSeeDetails = (mealId) => {
    navigate(`/mealsd/${mealId}`);
  };

  const indexOfLastMeal = currentPage * itemsPerPage;
  const indexOfFirstMeal = indexOfLastMeal - itemsPerPage;
  const currentMeals = filteredMeals.slice(indexOfFirstMeal, indexOfLastMeal);
  const totalPages = Math.ceil(filteredMeals.length / itemsPerPage);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-4xl font-bold mb-10 text-center">Daily Meals</h2>

      {/* Search + Sort */}
      <p className='font-bold text-2xl'>Search your meal</p>
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 mt-2">
        <input
          type="text"
          placeholder="Search your meal here..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 rounded border shadow placeholder:text-green-400"
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border px-4 py-2 rounded shadow font-medium cursor-pointer"
        >
          <option value="asc" className="text-black cursor-pointer">
            Price: Low → High
          </option>
          <option value="desc" className="text-black cursor-pointer">
            Price: High → Low
          </option>
        </select>
      </div>

      {/* Meals Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {currentMeals.length > 0 ? (
          currentMeals.map((meal) => (
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
                  <h3 className="text-2xl font-semibold mb-2 text-gray-800 font-bold">
                    {meal.foodName}
                  </h3>
                  <p className="text-gray-600 mb-1">
                    <strong>Chef:</strong> {meal.chefName}
                  </p>
                  {meal.ingredients && (
                    <p className="text-gray-600 mb-1">
                      <strong>Ingredients:</strong>{' '}
                      {meal.ingredients.join(', ')}
                    </p>
                  )}
                  <p className="text-gray-600 mb-3">
                    <strong>Delivery:</strong> {meal.estimatedDeliveryTime} mins
                    | <strong>Experience:</strong> {meal.chefExperience} yrs
                  </p>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-red-500 font-bold text-xl">
                    ${meal.price}
                  </p>
                  <p className="text-yellow-500 font-semibold">
                    ⭐ {meal.rating}
                  </p>
                </div>
                <button
                  onClick={() => handleSeeDetails(meal._id)}
                  className="mt-4 bg-red-600 text-white px-4 py-2 w-full rounded hover:bg-red-700 transition cursor-pointer"
                >
                  See Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-3 text-center text-gray-500">
            No meals found 😔
          </p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10 gap-2 flex-wrap">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 border rounded ${
                currentPage === i + 1 ? 'bg-indigo-500 text-white' : ''
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MealsPage;
