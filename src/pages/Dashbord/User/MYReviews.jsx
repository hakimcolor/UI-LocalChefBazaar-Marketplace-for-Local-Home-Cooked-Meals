// import React, { useEffect, useState, useContext } from 'react';
// import axios from 'axios';
// import { AuthContext } from '../../../Context/AuthContext';
// import toast from 'react-hot-toast';

// const MyReviews = () => {
//   const { user } = useContext(AuthContext);
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editingReview, setEditingReview] = useState(null);
//   const [updatedRating, setUpdatedRating] = useState('');
//   const [updatedComment, setUpdatedComment] = useState('');

//   useEffect(() => {
//     if (user?.email) {
//       axios
//         .get(`http://localhost:5000/user-reviews/${user.email}`)
//         .then((res) => setReviews(res.data.data))
//         .catch((err) => console.log(err))
//         .finally(() => setLoading(false));
//     } else setLoading(false);
//   }, [user]);

//   const handleDelete = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this review?')) return;
//     try {
//       await axios.delete(`http://localhost:5000/reviews/${id}`);
//       setReviews(reviews.filter((r) => r._id.toString() !== id.toString()));
//       toast.success('Review deleted successfully!');
//     } catch (err) {
//       console.log(err);
//       toast.error('Something went wrong.');
//     }
//   };

//   const handleEdit = (review) => {
//     setEditingReview(review);
//     setUpdatedRating(review.rating);
//     setUpdatedComment(review.comment);
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//      const res = await axios.put(
//        `http://localhost:5000/reviews/${editingReview._id}`, 
//        {
//          rating: Number(updatedRating),
//          comment: updatedComment,
//        }
//      );
// ;
//       setReviews(
//         reviews.map((r) =>
//           r._id.toString() === editingReview._id.toString()
//             ? res.data.updatedReview
//             : r
//         )
//       );
//       setEditingReview(null);
//       toast.success('Review updated successfully!');
//     } catch (err) {
//       console.log(err);
//       toast.error('Something went wrong.');
//     }
//   };

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div className="p-5 max-w-3xl mx-auto">
//       <h2 className="text-2xl font-bold mb-5">My Reviews</h2>

//       {reviews.length === 0 ? (
//         <p>You have no reviews.</p>
//       ) : (
//         reviews.map((r) => (
//           <div
//             key={r._id}
//             className="border p-4 rounded-lg shadow-md mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
//           >
//             <div className="flex items-center gap-4">
//               <img
//                 src={r.reviewerImage}
//                 alt={r.reviewerName}
//                 className="w-14 h-14 rounded-full object-cover"
//               />
//               <div>
//                 <h4 className="font-semibold">{r.reviewerName}</h4>
//                 <p className="text-sm text-gray-600">Meal: {r.mealName}</p>
//                 <p className="text-sm text-yellow-600">Rating: {r.rating}</p>
//                 <p className="text-gray-700">{r.comment}</p>
//                 <p className="text-gray-400 text-xs">
//                   Date: {new Date(r.date).toLocaleString()}
//                 </p>
//               </div>
//             </div>
//             <div className="flex gap-2">
//               <button
//                 className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                 onClick={() => handleDelete(r._id)}
//               >
//                 Delete
//               </button>
//               <button
//                 className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
//                 onClick={() => handleEdit(r)}
//               >
//                 Update
//               </button>
//             </div>
//           </div>
//         ))
//       )}

//       {/* Edit Modal */}
//       {editingReview && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg w-96">
//             <h3 className="text-lg font-bold mb-4">Update Review</h3>
//             <form onSubmit={handleUpdate} className="flex flex-col gap-3">
//               <label>
//                 Rating:
//                 <input
//                   type="number"
//                   min="1"
//                   max="5"
//                   value={updatedRating}
//                   onChange={(e) => setUpdatedRating(e.target.value)}
//                   className="border px-2 py-1 w-full rounded"
//                   required
//                 />
//               </label>
//               <label>
//                 Comment:
//                 <textarea
//                   value={updatedComment}
//                   onChange={(e) => setUpdatedComment(e.target.value)}
//                   className="border px-2 py-1 w-full rounded"
//                   required
//                 ></textarea>
//               </label>
//               <div className="flex justify-end gap-2 mt-3">
//                 <button
//                   type="button"
//                   className="px-4 py-1 rounded border"
//                   onClick={() => setEditingReview(null)}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
//                 >
//                   Update
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyReviews;
import React, { useEffect, useState, useContext, useRef } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../Context/AuthContext';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const MyReviews = () => {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingReview, setEditingReview] = useState(null);
  const [updatedRating, setUpdatedRating] = useState('');
  const [updatedComment, setUpdatedComment] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const ratingInputRef = useRef(null);

  // Close modal helper
  const closeModal = () => {
    setEditingReview(null);
    setUpdatedRating('');
    setUpdatedComment('');
    setIsUpdating(false);
  };

  // Close modal on Escape key
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    if (editingReview) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [editingReview]);

  // Focus rating input when modal opens
  useEffect(() => {
    if (editingReview && ratingInputRef.current) {
      ratingInputRef.current.focus();
    }
  }, [editingReview]);

  // Fetch user reviews
  useEffect(() => {
    let mounted = true;
    if (user?.email) {
      axios
        .get(`http://localhost:5000/user-reviews/${user.email}`)
        .then((res) => {
          if (!mounted) return;
          setReviews(res.data.data || []);
        })
        .catch((err) => {
          console.error(err);
          toast.error('Failed to load reviews.');
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
    return () => {
      mounted = false;
    };
  }, [user]);

  // Delete review
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this review? This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(`http://localhost:5000/reviews/${id}`);
      setReviews((prev) => prev.filter((r) => r._id !== id));
      toast.success('Review deleted successfully!');
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong while deleting.');
    }
  };

  // Open edit modal
  const handleEdit = (review) => {
    setEditingReview(review);
    setUpdatedRating(String(review.rating ?? ''));
    setUpdatedComment(review.comment ?? '');
  };

  // Update review
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingReview) return;

    let ratingNumber = parseInt(updatedRating, 10);
    if (Number.isNaN(ratingNumber)) {
      toast.error('Rating must be a number between 1 and 5.');
      return;
    }
    ratingNumber = Math.max(1, Math.min(5, ratingNumber));

    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to update this review?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, update it!',
      cancelButtonText: 'No',
    });

    if (!result.isConfirmed) return;

    setIsUpdating(true);
    try {
      const res = await axios.patch(
        `http://localhost:5000/reviewsup/${editingReview._id}`,
        {
          rating: ratingNumber,
          comment: updatedComment,
        }
      );

      // The API may return updatedReview or the updated object directly.
      const updated = res.data?.updatedReview || res.data || null;

      // Fallback if API doesn't return an updated object
      const fallbackUpdated = {
        ...editingReview,
        rating: ratingNumber,
        comment: updatedComment,
        date: new Date().toISOString(),
      };

      const updatedToUse = updated && updated._id ? updated : fallbackUpdated;

      setReviews((prev) =>
        prev.map((r) =>
          r._id === (updatedToUse._id || editingReview._id) ? updatedToUse : r
        )
      );

      toast.success('Review updated successfully!');
      closeModal();
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong while updating.');
      setIsUpdating(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-5 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-5">My Reviews</h2>

      {reviews.length === 0 ? (
        <p>You have no reviews.</p>
      ) : (
        reviews.map((r) => (
          <div
            key={r._id}
            className="border p-4 rounded-lg shadow-md mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-semibold">Meal:</span>{' '}
                <strong className="text-lg">{r.mealName}</strong>
              </p>

              <p className="text-sm text-yellow-600 mb-1">
                <span className="font-semibold">Rating:</span>{' '}
                <strong>{r.rating}</strong>
              </p>

              <p className="text-gray-700 mb-1">
                <span className="font-semibold">Comment:</span>{' '}
                <span>{r.comment}</span>
              </p>

              <p className="text-gray-400 text-xs">
                <span className="font-semibold">Date:</span>{' '}
                <span>{r.date ? new Date(r.date).toLocaleString() : '—'}</span>
              </p>
            </div>

            <div className="flex gap-2">
              <button
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                onClick={() => handleDelete(r._id)}
              >
                Delete
              </button>
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                onClick={() => handleEdit(r)}
              >
                Update
              </button>
            </div>
          </div>
        ))
      )}

      {/* Edit Modal */}
      {editingReview && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-label="Edit review modal"
        >
          <div
            className="bg-white p-6 rounded-lg w-96"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold mb-4">Update Review</h3>
            <p className="text-sm text-gray-600 mb-3">
              <span className="font-semibold">Meal:</span>{' '}
              <strong>{editingReview.mealName}</strong>
            </p>

            <form onSubmit={handleUpdate} className="flex flex-col gap-3">
              <label className="flex flex-col">
                <span className="font-semibold">Rating:</span>
                <input
                  ref={ratingInputRef}
                  type="number"
                  min="1"
                  max="5"
                  value={updatedRating}
                  onChange={(e) => setUpdatedRating(e.target.value)}
                  className="border px-2 py-1 w-full rounded"
                  required
                  aria-label="Rating between 1 and 5"
                />
              </label>
              <label className="flex flex-col">
                <span className="font-semibold">Comment:</span>
                <textarea
                  value={updatedComment}
                  onChange={(e) => setUpdatedComment(e.target.value)}
                  className="border px-2 py-1 w-full rounded"
                  required
                  aria-label="Comment"
                />
              </label>
              <div className="flex justify-end gap-2 mt-3">
                <button
                  type="button"
                  className="px-4 py-1 rounded border"
                  onClick={closeModal}
                  disabled={isUpdating}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
                  disabled={isUpdating}
                >
                  {isUpdating ? 'Updating...' : 'Update'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyReviews;