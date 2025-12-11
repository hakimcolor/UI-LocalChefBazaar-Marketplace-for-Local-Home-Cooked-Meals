import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const CustomerReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/reviews/latest')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setReviews(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch reviews:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading reviews...</div>;
  if (reviews.length === 0) return <div>No reviews found.</div>;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div
      className="customer-reviews-section py-12 px-6 rounded-lg"
      style={{
        background: 'linear-gradient(135deg, #e0e0e0, #fff176)', // gray to yellow gradient
      }}
    >
      <h2
        className="text-4xl font-bold text-center mb-8"
        style={{ color: 'rgb(34, 49, 63)' }} // nice dark RGB color for title
      >
        Customer Reviews
      </h2>

      <Slider {...settings}>
        {reviews.map((review) => (
          <div key={review._id} className="px-4">
            <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-300">
              <h3
                className="font-semibold text-xl mb-2"
                style={{ color: 'rgb(34, 49, 63)' }}
              >
                {review.reviewerName}
              </h3>
              <p className="text-yellow-500 font-semibold mb-2">
                Rating: {review.rating} ⭐
              </p>
              <p className="text-gray-700 mb-4">{review.comment}</p>
              <p className="text-sm text-gray-400">
                {new Date(review.date).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CustomerReviews;
