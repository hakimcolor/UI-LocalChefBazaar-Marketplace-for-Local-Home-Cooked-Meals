import React, { useEffect, useState, useContext, useRef } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { AuthContext } from '../../../Context/AuthContext';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import Loading from '../../../Componentes/Loading';

const Modal = ({ children, onClose }) => {
  if (typeof document === 'undefined') return null;
  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 bg-black/10 backdrop-blur-md flex items-center justify-center z-50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Edit review modal"
    >
      <div
        className="border-amber-900 border-2 p-6 rounded-lg w-96"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};

const MyReviews = () => {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingReview, setEditingReview] = useState(null);
  const [updatedRating, setUpdatedRating] = useState('');
  const [updatedComment, setUpdatedComment] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const ratingInputRef = useRef(null);

  const normalizeReview = (r) => {
    const id = r._id;
    let idStr = id;
    if (id && typeof id !== 'string') {
      if (id.$oid) idStr = id.$oid;
      else if (id.toString) idStr = id.toString();
    }
    const foodId = r.foodId;
    let foodIdStr = foodId;
    if (foodId && typeof foodId !== 'string') {
      if (foodId.$oid) foodIdStr = foodId.$oid;
      else if (foodId.toString) foodIdStr = foodId.toString();
    }
    return { ...r, _id: idStr, foodId: foodIdStr };
  };

  const closeModal = () => {
    setEditingReview(null);
    setUpdatedRating('');
    setUpdatedComment('');
    setIsUpdating(false);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    if (editingReview) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [editingReview]);

  useEffect(() => {
    if (editingReview && ratingInputRef.current) {
      ratingInputRef.current.focus();
    }
  }, [editingReview]);

  useEffect(() => {
    let mounted = true;
    if (user?.email) {
      axios
        .get(
          `https://backend-local-chef-bazaar-marketpla.vercel.app/user-reviews/${encodeURIComponent(
            user.email
          )}`
        )
        .then((res) => {
          if (!mounted) return;
          const data = res.data?.data || [];
          const normalized = data.map((r) => normalizeReview(r));
          setReviews(normalized);
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
      await axios.delete(
        `https://backend-local-chef-bazaar-marketpla.vercel.app/reviews/${encodeURIComponent(
          id
        )}`
      );
      setReviews((prev) => prev.filter((r) => String(r._id) !== String(id)));
      toast.success('Review deleted successfully!');
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong while deleting.');
    }
  };

  const handleEdit = (review) => {
    const normalized = normalizeReview(review);
    setEditingReview(normalized);
    setUpdatedRating(String(normalized.rating ?? ''));
    setUpdatedComment(normalized.comment ?? '');
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingReview) return;

    const reviewId = String(editingReview._id).trim();

    let ratingNumber = parseInt(updatedRating, 10);
    if (Number.isNaN(ratingNumber)) {
      toast.error('Rating must be a number between 1 and 5.');
      return;
    }
    ratingNumber = Math.max(1, Math.min(5, ratingNumber));

    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to update this review?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, update it!',
      cancelButtonText: 'No',
    });
    if (!confirm.isConfirmed) return;

    const payload = { rating: ratingNumber, comment: updatedComment };

    setIsUpdating(true);
    // keep original for rollback
    const original = reviews.find((r) => String(r._id) === reviewId);

    try {
      const res = await axios.patch(
        `https://backend-local-chef-bazaar-marketpla.vercel.app/reviewsup/${encodeURIComponent(
          reviewId
        )}`,
        payload
      );

      if (!res || res.status >= 400 || res.data?.success === false) {
        throw new Error(
          (res && res.data && (res.data.message || res.data.error)) ||
            'Server update failed'
        );
      }

      const serverUpdated = res.data?.updatedReview;
      const updatedToUse =
        serverUpdated && serverUpdated._id
          ? normalizeReview(serverUpdated)
          : {
              ...(original || editingReview),
              rating: ratingNumber,
              comment: updatedComment,
              date: new Date().toISOString(),
              _id: reviewId,
            };

      setReviews((prev) =>
        prev.map((r) =>
          String(r._id) === String(updatedToUse._id) ? updatedToUse : r
        )
      );

      toast.success('Review updated successfully!');
      closeModal();
    } catch (err) {
      console.error('Update failed:', err);
      if (original) {
        setReviews((prev) =>
          prev.map((r) => (String(r._id) === reviewId ? original : r))
        );
        setEditingReview(original);
        setUpdatedRating(String(original.rating ?? ''));
        setUpdatedComment(original.comment ?? '');
      }
      Swal.fire('Error', err.message || 'Failed to update review', 'error');
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) return <Loading></Loading>;

  return (
    <div className="p-5 max-w-3xl mx-auto">
      <title>LocalChefBazaar || My Reviews</title>
      <h2 className="text-2xl font-bold mb-5 text-green-500">My Reviews</h2>

      {reviews.length === 0 ? (
        <p>You have no reviews.</p>
      ) : (
        reviews.map((r) => (
          <div
            key={String(r._id)}
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
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
                onClick={() => handleDelete(r._id)}
              >
                Delete
              </button>
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 cursor-pointer"
                onClick={() => handleEdit(r)}
              >
                Update
              </button>
            </div>
          </div>
        ))
      )}

      {editingReview && (
        <Modal onClose={closeModal}>
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
                disabled={isUpdating}
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
                disabled={isUpdating}
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
        </Modal>
      )}
    </div>
  );
};

export default MyReviews;
