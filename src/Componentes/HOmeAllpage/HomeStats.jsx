import React, { useEffect, useState } from 'react';

const HomeStats = () => {
  const [stats, setStats] = useState({
    mealsCount: 0,
    reviewsCount: 0,
    favoritesCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://backend-local-chef-bazaar-marketpla.vercel.app
/api/stats`)
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



  return (
    <section className="bg-gradient-to-r   rounded-xl from-orange-100 via-yellow-50 to-orange-200 py-16 px-4 max-w-7xl mx-auto  mt-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="bg-white rounded-xl shadow-lg p-8 hover:scale-105 transition-transform duration-300">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-orange-500">
            {stats.mealsCount}
          </h2>
          <p className="mt-2 text-lg sm:text-xl md:text-2xl font-bold text-gray-700">
            Total Meals
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-8 hover:scale-105 transition-transform duration-300">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-orange-500">
            {stats.reviewsCount}
          </h2>
          <p className="mt-2 text-lg sm:text-xl md:text-2xl font-bold text-gray-700">
            Total Reviews
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-8 hover:scale-105 transition-transform duration-300">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-orange-500">
            {stats.favoritesCount}
          </h2>
          <p className="mt-2 text-lg sm:text-xl md:text-2xl font-bold text-gray-700">
            Total Favorites
          </p>
        </div>
      </div>
    </section>
  );
};

export default HomeStats;
