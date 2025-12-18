import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Loading from '../Loading';

const StarRating = ({ rating }) => {
  const clampedRating = Math.max(0, Math.min(5, rating));
  const fullStars = Math.floor(clampedRating);
  const stars = [];

  for (let i = 0; i < 5; i++) {
    if (i < fullStars || (i === fullStars && clampedRating % 1 >= 0.5)) {
      stars.push(
        <span key={i} className="text-yellow-500">
          ★
        </span>
      );
    } else {
      stars.push(
        <span key={i} className="text-gray-300">
          ★
        </span>
      );
    }
  }

  return <div className="inline-flex text-xl">{stars}</div>;
};

const CustomerReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_API}
/reviews/latest`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data && data.success && Array.isArray(data.data))
          setReviews(data.data);
        else if (Array.isArray(data)) setReviews(data);
        else setReviews([]);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;
  if (reviews.length === 0)
    return (
      <div className="text-center py-10 text-xl font-medium text-gray-700">
        No customer reviews found.
      </div>
    );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
  };

  return (
    <div className="bg-gradient-to-r   rounded-xl from-orange-100 via-yellow-50 to-orange-200 py-16 px-4 max-w-7xl mx-auto  mt-10">
      <h2 className="text-4xl font-extrabold text-center mb-10 text-gray-800">
        What Our Customers Say
      </h2>

      <div className="max-w-4xl mx-auto">
        <Slider {...settings}>
          {reviews.map((review) => (
            <div key={review._id} className="p-2">
              <div className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-100 flex flex-col">
                <div className="flex justify-between items-start mb-6 border-b pb-4">
                  <div className="flex items-center">
                    <img
                      src={
                        review.reviewerImage ||
                        'https://via.placeholder.com/50/CCCCCC/FFFFFF?text=User'
                      }
                      alt={review.reviewerName || 'Reviewer'}
                      className="w-14 h-14 rounded-full object-cover mr-4 shadow-md"
                    />
                    <div>
                      <p className="font-bold text-lg text-gray-800">
                        {review.reviewerName || 'Anonymous User'}
                      </p>
                      <p className="text-sm text-gray-500">
                        {review.date
                          ? new Date(review.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })
                          : 'Date N/A'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 pt-1">
                    <div className="flex flex-col items-end">
                      <StarRating rating={review.rating} />
                      <span className="font-semibold text-sm text-gray-700 mt-1">
                        ({review.rating}/5 Stars)
                      </span>
                    </div>
                  </div>
                </div>

                <h3 className="font-extrabold text-3xl mb-4 text-gray-800">
                  {review.title ||
                    `Review for ${review.mealName || 'Product/Meal'}`}
                </h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {review.comment}
                </p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default CustomerReviews;
