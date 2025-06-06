import { DollarSign, Package, ShoppingCart, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import AnalyticsCard from "./AnalyticsCard";
import axios from "../lib/axios.config";

function AnalyticsTab() {
  const [analyticsData, setAnalyticsData] = useState({
    users: 0,
    products: 0,
    totalSales: 0,
    totalRevenue: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [dailySalesData, setDailySalesData] = useState([]);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await axios.get("/analytics");

        setAnalyticsData(response.data.summary);
        setDailySalesData(response.data.last7Days);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <AnalyticsCard
          title="Total Users"
          value={analyticsData?.users.toLocaleString()}
          icon={Users}
          color="from-emerald-500 to-teal-700"
        />
        <AnalyticsCard
          title="Total Products"
          value={analyticsData?.products.toLocaleString()}
          icon={Package}
          color="from-emerald-500 to-green-700"
        />
        <AnalyticsCard
          title="Total Sales"
          value={analyticsData?.totalSales.toLocaleString()}
          icon={ShoppingCart}
          color="from-emerald-500 to-cyan-700"
        />
        <AnalyticsCard
          title="Total Revenue"
          value={`$${analyticsData?.totalRevenue.toLocaleString()}`}
          icon={DollarSign}
          color="from-emerald-500 to-lime-700"
        />
      </div>
      <motion.div
        className="bg-gray-800/60 rounded-lg p-6 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        <ResponsiveContainer width="100%" height={400}>
          {dailySalesData?.length > 0 ? (
            <LineChart data={dailySalesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" stroke="#D1D5DB" />
              <YAxis yAxisId="left" stroke="#D1D5DB" />
              <YAxis yAxisId="right" orientation="right" stroke="#D1D5DB" />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="sales"
                stroke="#10B981"
                activeDot={{ r: 8 }}
                name="Sales"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="revenue"
                stroke="#3B82F6"
                activeDot={{ r: 8 }}
                name="Revenue"
              />
            </LineChart>
          ) : (
            <p className="text-gray-400 text-center">No sales data available.</p>
          )}
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}

export default AnalyticsTab;
