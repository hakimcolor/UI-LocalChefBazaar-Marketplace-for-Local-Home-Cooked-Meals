// import React, { useEffect, useState, useContext } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../../Context/AuthContext';

// const MealsPage = () => {
//   const [meals, setMeals] = useState([]);
//   const [sortOrder, setSortOrder] = useState('asc');
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10; // ১০ টা meals per page
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchMeals();
//   }, [sortOrder]);

//   const fetchMeals = async () => {
//     try {
//       const res = await axios.get(
//         `http://localhost:5000/meals?sort=${sortOrder}`
//       );

//       if (res.data.success) {
//         setMeals(res.data.data);
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleSeeDetails = (mealId) => {
//     navigate(`/mealsd/${mealId}`);
//   };


//   const indexOfLastMeal = currentPage * itemsPerPage;
//   const indexOfFirstMeal = indexOfLastMeal - itemsPerPage;
//   const currentMeals = meals.slice(indexOfFirstMeal, indexOfLastMeal);
//   const totalPages = Math.ceil(meals.length / itemsPerPage);

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       <title>LocalChefBazaar||MealsPage</title>
//       <div className="flex justify-end mb-6">
//         <select
//           value={sortOrder}
//           onChange={(e) => setSortOrder(e.target.value)}
//           className="border rounded shadow px-4 py-2 font-medium bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white cursor-pointer transition-all duration-500 hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500"
//         >
//           <option className="text-black font-bold" value="asc">
//             Price: Low → High
//           </option>
//           <option className="text-black font-bold" value="desc">
//             Price: High → Low
//           </option>
//         </select>
//       </div>

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
  const itemsPerPage = 10;
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMeals();
  }, [sortOrder]);

  useEffect(() => {
    handleSearch(searchTerm);
  }, [meals, searchTerm]);

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

  const handleSearch = (value) => {
    setSearchTerm(value);

    const filtered = meals.filter((meal) =>
      meal.foodName.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredMeals(filtered);
    setCurrentPage(1);
  };

  const handleSeeDetails = (mealId) => {
    navigate(`/mealsd/${mealId}`);
  };

  const indexOfLastMeal = currentPage * itemsPerPage;
  const indexOfFirstMeal = indexOfLastMeal - itemsPerPage;
  const currentMeals = filteredMeals.slice(indexOfFirstMeal, indexOfLastMeal);
  const totalPages = Math.ceil(filteredMeals.length / itemsPerPage);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <title>LocalChefBazaar || MealsPage</title>

      {/* 🔍 Search + Sort Bar */}
      <div className="flex justify-between items-center mb-6 gap-4">
        {/* Search (Left) */}
        <input
          type="text"
          placeholder="Search by food name..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="border rounded px-4 py-2 w-1/2 shadow"
        />

        {/* Sort (Right) */}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border rounded shadow px-4 py-2 font-medium 
          bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
          text-white cursor-pointer transition-all duration-500 
          hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500"
        >
          <option className="text-black font-bold" value="asc">
            Price: Low → High
          </option>
          <option className="text-black font-bold" value="desc">
            Price: High → Low
          </option>
        </select>
      </div>

      {/* Meals Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {currentMeals.map((meal) => (
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

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2">
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
    </div>
  );
};

export default MealsPage;
