import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import Loading from '../../../../Componentes/Loading';

const StatisticsPage = () => {
  const [stats, setStats] = useState({
    totalPaidAmount: 0,
    totalOrders: 0,
  });
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    setLoading(true); 
    axios
      .get(
        `https://backend-local-chef-bazaar-marketpla.vercel.app
/orders/paid/total`
      )
      .then((res) => {
        setStats(res.data);
        setLoading(false); 
      })
      .catch((err) => {
        console.error(err);
        setLoading(false); 
      });
  }, []);

  const chartData = [
    { name: 'Total Paid Amount', value: stats.totalPaidAmount },
    { name: 'Total Orders', value: stats.totalOrders },
  ];

  const COLORS = ['#0088FE', '#00C49F'];

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-6">
      <title>LocalChefBazer || Statistics Page</title>

      <h2 className="text-2xl font-bold mb-4 text-gray-800">📊 Platform Statistics</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white shadow rounded-xl p-5">
          <h3 className="text-lg font-semibold">💰 Total Paid Amount</h3>
          <p className="text-3xl font-bold text-green-600">
            $ {stats.totalPaidAmount}
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-5">
          <h3 className="text-lg font-semibold">🧾 Total Paid Orders</h3>
          <p className="text-3xl font-bold text-blue-600">
            {stats.totalOrders}
          </p>
        </div>
      </div>

      <div className="bg-white shadow rounded-xl p-5">
        <h3 className="text-lg font-semibold mb-4">📊 Statistics Chart</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StatisticsPage;
