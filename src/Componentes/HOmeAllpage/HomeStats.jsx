import React, { useEffect, useState } from 'react';

const HomeStats = () => {
  const [stats, setStats] = useState({
    mealsCount: 0,
    reviewsCount: 0,
    favoritesCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/stats')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStats({
            mealsCount: data.mealsCount,
            reviewsCount: data.reviewsCount,
            favoritesCount: data.favoritesCount,
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="stats-container">
      <div>Meals: {stats.mealsCount}</div>
      <div>Reviews: {stats.reviewsCount}</div>
      <div>Favorites: {stats.favoritesCount}</div>
    </div>
  );
};

export default HomeStats;
