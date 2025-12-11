import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../../Context/AuthContext';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const MyMeals = () => {
  const { user } = useContext(AuthContext);
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user-added meals
  useEffect(() => {
    if (!user?.email) return;

    fetch(`http://localhost:5000/user-meals/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setMeals(data.data);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [user?.email]);

  // DELETE function
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This meal will be deleted permanently!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/meals/${id}`, {
          method: 'DELETE',
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              Swal.fire('Deleted!', 'Meal has been deleted.', 'success');

              // update UI
              setMeals((prev) => prev.filter((meal) => meal._id !== id));
            }
          });
      }
    });
  };

  if (loading)
    return <p className="text-center text-xl font-semibold">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto mt-8 font-[Poppins]">
      <h2 className="text-3xl font-bold mb-6 text-center">
        My Added Meals ({meals.length})
      </h2>

      {meals.length === 0 ? (
        <p className="text-center text-gray-600">No meals added yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {meals.map((meal) => (
            <div
              key={meal._id}
              className="border p-4 rounded-xl shadow bg-white"
            >
              {/* Meal Image */}
              <img
                src={meal.foodImage}
                alt={meal.foodName}
                className="rounded-md h-44 w-full object-cover"
              />

              {/* Food Name */}
              <h3 className="mt-3 text-xl font-bold">{meal.foodName}</h3>

              {/* Price */}
              <p className="text-sm mt-1">
                Price: <span className="font-semibold">${meal.price}</span>
              </p>

              {/* Rating */}
              <p className="text-sm mt-1">
                Rating: <span className="font-semibold">{meal.rating}</span>
              </p>

              {/* Ingredients */}
              <p className="text-sm mt-2">
                Ingredients:
                <span className="font-semibold">
                  {' '}
                  {meal.ingredients.join(', ')}
                </span>
              </p>

              {/* Delivery Time */}
              <p className="text-sm mt-1">
                Delivery Time:
                <span className="font-semibold">
                  {' '}
                  {meal.estimatedDeliveryTime} min
                </span>
              </p>

              {/* Chef Name */}
              <p className="text-sm mt-1">
                Chef Name:
                <span className="font-semibold"> {meal.chefName}</span>
              </p>

              {/* Chef ID */}
              <p className="text-sm mt-1">
                Chef ID:
                <span className="font-semibold"> {meal.chefId}</span>
              </p>

              {/* Buttons */}
              <div className="flex justify-between mt-4">
                {/* Update */}
                <Link
                  to={`/update-meal/${meal._id}`}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Update
                </Link>

                {/* Delete */}
                <button
                  onClick={() => handleDelete(meal._id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyMeals;
