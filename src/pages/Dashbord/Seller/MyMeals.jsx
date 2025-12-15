import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../../Context/AuthContext';
import Swal from 'sweetalert2';
import Loading from '../../../Componentes/Loading';

const MyMeals = () => {
  const { user } = useContext(AuthContext);
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMeal, setSelectedMeal] = useState(null);

  // helper to normalize _id to string
  const normalizeId = (m) => {
    const id = m._id;
    if (!id) return m;
    if (typeof id === 'string') return m;
    if (id.$oid) return { ...m, _id: id.$oid };
    if (id.toString) return { ...m, _id: id.toString() };
    return m;
  };

  // Fetch user-added meals
  useEffect(() => {
    if (!user?.email) return;

    fetch(`https://backend-local-chef-bazaar-marketpla.vercel.app
/user-meals/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const normalized = data.data.map((m) => normalizeId(m));
          setMeals(normalized);
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
        fetch(
          `https://backend-local-chef-bazaar-marketpla.vercel.app
/meals/${id}`,
          {
            method: 'DELETE',
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              Swal.fire('Deleted!', 'Meal has been deleted.', 'success');
              setMeals((prev) => prev.filter((meal) => meal._id !== id));
            }
          });
      }
    });
  };

  // OPEN modal for update
  const handleOpenModal = (meal) => {
    const normalized = normalizeId(meal);
    console.log('Opening modal for meal:', normalized);
    setSelectedMeal(normalized);
  };
  // CLOSE modal
  const handleCloseModal = () => setSelectedMeal(null);

  // HANDLE form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedMeal((prev) => ({ ...prev, [name]: value }));
  };

  const handleIngredientsChange = (e) => {
    const value = e.target.value.split(',').map((i) => i.trim());
    setSelectedMeal((prev) => ({ ...prev, ingredients: value }));
  };

  // HANDLE Update submit — on success reload whole page so UI updates

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedMeal || !selectedMeal._id) {
      Swal.fire('Error', 'No meal selected or missing id', 'error');
      return;
    }

    // Optimistically update UI and close modal immediately
    const payload = { ...selectedMeal };
    delete payload._id;
    if (payload.price !== undefined) payload.price = Number(payload.price);
    if (payload.rating !== undefined) payload.rating = Number(payload.rating);
    if (payload.estimatedDeliveryTime !== undefined)
      payload.estimatedDeliveryTime = Number(payload.estimatedDeliveryTime);

    const optimisticMeal = { ...selectedMeal, ...payload };
    setMeals((prev) =>
      prev.map((m) => (m._id === optimisticMeal._id ? optimisticMeal : m))
    );
    setSelectedMeal(null);
    Swal.fire('Updated!', 'Meal has been updated.', 'success');

    // still send the request in background (optional)
    try {
      const id = encodeURIComponent(String(selectedMeal._id).trim());
      const res = await fetch(
        `https://backend-local-chef-bazaar-marketpla.vercel.app
/meals/${id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json();
      console.log('Background PUT response:', res.status, data);
      // if you want to show an error after success, you could notify user here.
    } catch (err) {
      console.error('Background update failed:', err);
      // optionally show an error notification, but do NOT revert UI in this quick approach
      Swal.fire(
        'Warning',
        'Server update failed — changes may not be saved.',
        'warning'
      );
    }
  };
  if (loading) return <Loading />;

  return (
    <div className="max-w-6xl mx-auto mt-8 font-[Poppins]">
      <title>LocalChefBazaar || My Meals</title>
      <h2 className="text-3xl font-bold mb-6 text-center text-black">
        My Added Meals ({meals.length})
      </h2>

      {meals.length === 0 ? (
        <p className="text-center text-gray-600">No meals added yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {meals.map((meal) => (
            <div
              key={meal._id}
              className="border p-4 rounded-xl shadow text-black flex flex-col justify-between h-full"
            >
              <div>
                <img
                  src={meal.foodImage}
                  alt={meal.foodName}
                  className="rounded-md h-44 w-full object-cover"
                />
                <h3 className="mt-3 text-xl font-bold">{meal.foodName}</h3>
                <p className="text-sm mt-1">
                  Price: <span className="font-semibold">${meal.price}</span>
                </p>
                <p className="text-sm mt-1">
                  Rating: <span className="font-semibold">{meal.rating}</span>
                </p>
                <p className="text-sm mt-2">
                  Ingredients:
                  <span className="font-semibold">
                    {' '}
                    {Array.isArray(meal.ingredients)
                      ? meal.ingredients.join(', ')
                      : meal.ingredients}
                  </span>
                </p>
                <p className="text-sm mt-1">
                  Delivery Time:
                  <span className="font-semibold">
                    {' '}
                    {meal.estimatedDeliveryTime} min
                  </span>
                </p>
                <p className="text-sm mt-1">
                  Chef Name:
                  <span className="font-semibold"> {meal.chefName}</span>
                </p>
                <p className="text-sm mt-1">
                  Chef ID:
                  <span className="font-semibold"> {meal.chefId}</span>
                </p>
              </div>

              <div className="flex justify-center gap-4 mt-4">
                <button
                  onClick={() => handleOpenModal(meal)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Update
                </button>

                <button
                  onClick={() => handleDelete(meal._id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedMeal && (
        <div className="fixed inset-0  bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-96 relative">
            <h3 className="text-xl font-bold mb-4">Update Meal</h3>
            <form onSubmit={handleUpdate} className="space-y-3">
              <input
                type="text"
                name="foodName"
                value={selectedMeal.foodName || ''}
                onChange={handleChange}
                placeholder="Food Name"
                className="w-full border px-3 py-2 rounded"
                required
              />
              <input
                type="text"
                name="foodImage"
                value={selectedMeal.foodImage || ''}
                onChange={handleChange}
                placeholder="Food Image URL"
                className="w-full border px-3 py-2 rounded"
                required
              />
              <input
                type="number"
                name="price"
                value={selectedMeal.price || ''}
                onChange={handleChange}
                placeholder="Price"
                className="w-full border px-3 py-2 rounded"
                required
              />
              <input
                type="number"
                name="rating"
                value={selectedMeal.rating || ''}
                onChange={handleChange}
                placeholder="Rating"
                className="w-full border px-3 py-2 rounded"
                required
              />
              <input
                type="text"
                name="ingredients"
                value={
                  Array.isArray(selectedMeal.ingredients)
                    ? selectedMeal.ingredients.join(', ')
                    : selectedMeal.ingredients || ''
                }
                onChange={handleIngredientsChange}
                placeholder="Ingredients (comma separated)"
                className="w-full border px-3 py-2 rounded"
                required
              />
              <input
                type="number"
                name="estimatedDeliveryTime"
                value={selectedMeal.estimatedDeliveryTime || ''}
                onChange={handleChange}
                placeholder="Estimated Delivery Time"
                className="w-full border px-3 py-2 rounded"
                required
              />
              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyMeals;
