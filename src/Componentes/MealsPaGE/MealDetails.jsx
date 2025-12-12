
import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Context/AuthContext';

const MealDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [meal, setMeal] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const [reviewData, setReviewData] = useState({
    rating: 0,
    comment: '',
  });

  useEffect(() => {
    if (!user)navigate('signup');
  }, [user, navigate]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/mealsd/${id}`)
      .then((res) => setMeal(res.data))
      .catch((err) => console.log(err));

    fetchReviews();
  }, [id]);

  const fetchReviews = () => {
    axios
      .get(`http://localhost:5000/reviews/${id}`)
      .then((res) =>
        setReviews(Array.isArray(res.data) ? res.data : res.data?.data || [])
      )
      .catch((err) => console.log(err));
  };

  const handleReviewSubmit = () => {
    if (!reviewData.rating || !reviewData.comment)
      return Swal.fire('Error', 'Rating & comment required!', 'error');

    setLoading(true);

    const newReview = {
      foodId: id,
      mealName: meal.foodName,
      reviewerName: user.displayName,
      reviewerImage: user.photoURL,
      rating: Number(reviewData.rating),
      comment: reviewData.comment,
      date: new Date().toISOString(),
      reviewerEmail: user?.email || '',
    };

    axios
      .post('http://localhost:5000/reviews', newReview)
      .then(() => {
        Swal.fire('Success!', 'Review added successfully!', 'success');

        // RESET FORM
        setReviewData({ rating: 0, comment: '' });

        // UI INSTANT UPDATE
        fetchReviews();

        setLoading(false);
      })
      .catch(() => {
        Swal.fire('Failed', 'Review submit failed!', 'error');
        setLoading(false);
      });
  };

  const handleAddFavorite = () => {
    if (!user) return navigate('signin');
    if (!meal) return Swal.fire('Error', 'Meal not loaded yet', 'error');

    Swal.fire({
      title: 'Add to Favorite?',
      text: 'Do you want to add this meal to your favorites?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, add it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        const favData = {
          userEmail: user.email,
          mealId: meal._id.toString(), // safer as string
          mealName: meal.foodName,
          chefId: meal.chefId,
          chefName: meal.chefName,
          price: meal.price,
          addedTime: new Date().toISOString(),
        };
        console.log('Sending favData:', favData);

        axios
          .post('http://localhost:5000/favorites', favData)
          .then((res) => {
            Swal.fire('Added!', 'Meal added to favorites!', 'success');
          })
          .catch((err) => {
            
          });
      }
    });
  };


  if (!meal) return <p className="text-center text-xl mt-10">Loading...</p>;

  return (
    <div className="relative max-w-6xl mx-auto p-4 sm:p-6 md:p-8 border rounded-lg shadow-lg mt-6 mb-10">
      <title>LocalChefBazaar||MealDetails</title>
      <button
        onClick={() => navigate(-1)}
        className="bg-black/60 text-white px-3 sm:px-4 py-2 rounded-full shadow hover:bg-black/80 transition cursor-pointer"
      >
        ← Back
      </button>

      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6">
        {meal.foodName}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
        <img
          src={meal.foodImage}
          alt="Meal"
          className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded shadow-lg"
        />

        <div className="flex flex-col gap-3">
          <p className="text-xl font-bold">Chef: {meal.chefName}</p>
          <p className="text-lg">
            <strong>Price:</strong> ${meal.price}
          </p>
          <p className="text-lg">
            <strong>Rating:</strong> ⭐ {meal.rating}
          </p>
          <p>
            <strong>Ingredients:</strong> {meal.ingredients}
          </p>
          <p>
            <strong>Delivery Area:</strong> {meal.deliveryArea
          
            }
          </p>
          <p>
            <strong>Delivery Time:</strong> {meal.estimatedDeliveryTime}
          </p>
          <p>
            <strong>Chef Experience:</strong> {meal.chefExperience} Years
          </p>
          <p>
            <strong>Chef ID:</strong> {meal.chefId}
          </p>

          <div className="flex flex-wrap gap-4 mt-4">
            <Link to={`/order/${meal._id}`}>
              <button
                onClick={() => navigate(`/order/${meal._id}`)}
                className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-green-700 transition"
              >
                Order Now
              </button>
            </Link>

            <button
              onClick={handleAddFavorite}
              className="bg-pink-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-pink-700 transition"
            >
              Add to Favorite ❤️
            </button>
          </div>
        </div>
      </div>

      {/* REVIEW FORM */}
      <div className="mt-6 flex flex-col gap-2">
        <h3 className="text-xl font-semibold mb-2">Give a Review</h3>

        <input
          type="number"
          min="1"
          max="5"
          value={reviewData.rating}
          onChange={(e) =>
            setReviewData({ ...reviewData, rating: e.target.value })
          }
          placeholder="Rating (1-5)"
          className="border p-2 rounded w-32"
        />

        <textarea
          value={reviewData.comment}
          onChange={(e) =>
            setReviewData({ ...reviewData, comment: e.target.value })
          }
          placeholder="Write your comment..."
          className="border p-2 rounded w-full h-24 placeholder:text-green-500"
        ></textarea>

        <button
          onClick={handleReviewSubmit}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700 transition w-max disabled:opacity-50"
        >
          {loading ? 'Submitting...' : 'Submit Review'}
        </button>
      </div>

      {/* SHOW REVIEWS */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-3">Reviews</h2>

        {reviews.length > 0 ? (
          reviews.map((rev) => (
            <div key={rev._id} className="border p-3 rounded my-3 shadow">
              <div className="flex items-center gap-3">
                <img
                  src={rev.reviewerImage}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
                  alt=""
                />
                <div>
                  <p className="font-bold">{rev.reviewerName}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(rev.date).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <p className="mt-1">⭐ {rev.rating}</p>
              <p>{rev.comment}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 mt-2">No Reviews Found</p>
        )}
      </div>
    </div>
  );
};

export default MealDetails;
