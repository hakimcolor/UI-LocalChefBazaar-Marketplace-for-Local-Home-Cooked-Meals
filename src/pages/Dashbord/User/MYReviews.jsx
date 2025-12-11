import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../Context/AuthContext';


const MyReviews = () => {
  const { user } = useContext(AuthContext); // লগিন ইউজার
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/user-reviews/${user.email}`)
        .then((res) => setReviews(res.data.data))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) return <p>লোড হচ্ছে...</p>;

  return (
    <div>
      <h2>আমার রিভিউসমূহ</h2>
      {reviews.length === 0 ? (
        <p>তোমার কোনো রিভিউ নেই</p>
      ) : (
        reviews.map((r) => (
          <div
            key={r._id}
            style={{
              border: '1px solid #ddd',
              padding: '10px',
              margin: '10px 0',
              borderRadius: '8px',
            }}
          >
            <img
              src={r.reviewerImage}
              alt={r.reviewerName}
              width="50"
              height="50"
              style={{ borderRadius: '50%' }}
            />
            <h4>{r.reviewerName}</h4>
            <p>Rating: {r.rating}</p>
            <p>Comment: {r.comment}</p>
            <p>Date: {new Date(r.date).toLocaleString()}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default MyReviews;
