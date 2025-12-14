// import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../Context/AuthContext';
import { useContext, useEffect, useState } from 'react';
import Loading from '../../../Componentes/Loading';

const FavoriteMeal = () => {
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/favorites/${user.email}`)
        .then((res) => {
          if (res.data.success) {
            setFavorites(res.data.data);
            calculateTotal(res.data.data);
          }
          setLoading(false); 
        })
        .catch((err) => {
          console.error(err);
          toast.error('Failed to load favorites');
          setLoading(false); 
        });
    }
  }, [user?.email]);

  const calculateTotal = (data) => {
    const total = data.reduce((acc, meal) => acc + (meal.price || 0), 0);
    setTotalPrice(total.toFixed(2));
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/favorites/${id}`)
          .then((res) => {
            if (res.data.success) {
              const updatedFavorites = favorites.filter(
                (fav) => fav._id !== id
              );
              setFavorites(updatedFavorites);
              calculateTotal(updatedFavorites);
              toast.success('Meal removed from favorites successfully.');
            }
          })
          .catch((err) => {
            console.error(err);
            toast.error('Failed to delete meal');
          });
      }
    });
  };
  if (loading) return <Loading />;

  return (
    <div className="p-4 bg-white dark:bg-gray-900 min-h-screen">
    <title>LocalChefBazaar || Favorite meal</title>
      {/* {loading && (
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-red-500"></div>
        </div>
      )} */}

   
      <h2
        className="text-3xl font-bold mb-6"
        style={{
          background:
            'linear-gradient(90deg, rgb(255,99,71), rgb(255,165,0), rgb(34,139,34))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        My Favorite Meals
      </h2>

      {!loading && (
        <>
          {favorites.length === 0 ? (
            <p className="text-gray-700 dark:text-gray-300">
              No favorite meals found.
            </p>
          ) : (
            <>
             
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-gray-800">
                      <th className="border px-4 py-2 text-gray-900 dark:text-gray-100">
                        Meal Name
                      </th>
                      <th className="border px-4 py-2 text-gray-900 dark:text-gray-100">
                        Chef Name
                      </th>
                      <th className="border px-4 py-2 text-gray-900 dark:text-gray-100">
                        Price
                      </th>
                      <th className="border px-4 py-2 text-gray-900 dark:text-gray-100">
                        Date Added
                      </th>
                      <th className="border px-4 py-2 text-gray-900 dark:text-gray-100">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {favorites.map((fav) => (
                      <tr key={fav._id} className="bg-white dark:bg-gray-900">
                        <td className="border px-4 py-2 text-gray-900 dark:text-gray-100">
                          {fav.mealName}
                        </td>
                        <td className="border px-4 py-2 text-gray-900 dark:text-gray-100">
                          {fav.chefName}
                        </td>
                        <td className="border px-4 py-2 text-gray-900 dark:text-gray-100">
                          ${fav.price?.toFixed(2)}
                        </td>
                        <td className="border px-4 py-2 text-gray-900 dark:text-gray-100">
                          {new Date(fav.addedTime).toLocaleDateString()}
                        </td>
                        <td className="border px-4 py-2">
                          <button
                            onClick={() => handleDelete(fav._id)}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-gray-200 dark:bg-gray-800 font-bold">
                      <td
                        colSpan="2"
                        className="border px-4 py-2 text-right text-gray-900 dark:text-gray-100"
                      >
                        Total:
                      </td>
                      <td className="border px-4 py-2 text-gray-900 dark:text-gray-100">
                        ${totalPrice}
                      </td>
                      <td colSpan="2" className="border px-4 py-2"></td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              
              <div className="md:hidden space-y-4">
                {favorites.map((fav) => (
                  <div
                    key={fav._id}
                    className="border p-4 rounded shadow bg-gray-50 dark:bg-gray-800"
                  >
                    <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">
                      {fav.mealName}
                    </h3>
                    <p className="text-gray-900 dark:text-gray-100">
                      <span className="font-semibold">Chef:</span> {fav.chefName}
                    </p>
                    <p className="text-gray-900 dark:text-gray-100">
                      <span className="font-semibold">Price:</span> $
                      {fav.price?.toFixed(2)}
                    </p>
                    <p className="text-gray-900 dark:text-gray-100">
                      <span className="font-semibold">Date Added:</span>{' '}
                      {new Date(fav.addedTime).toLocaleDateString()}
                    </p>
                    <button
                      onClick={() => handleDelete(fav._id)}
                      className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                ))}
                <div className="text-right font-bold text-gray-900 dark:text-gray-100">
                  Total: ${totalPrice}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default FavoriteMeal;
