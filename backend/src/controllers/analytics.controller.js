import User from "../models/user.model.js";
import Product from "../models/product.model.js";
import Order from "../models/order.model.js";

export const getAnalytics = async (req, res) => {
  try {
    const analyticsData = await getAnalyticsAggregations();

    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);

    const dailySalesData = await getDailySalesData(startDate, endDate);

    res.status(200).json({
      summary: analyticsData,
      last7Days: dailySalesData,
    });
  } catch (error) {
    console.log("get analytics error", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAnalyticsAggregations = async () => {
  const totalUsers = await User.countDocuments();
  const totalProducts = await Product.countDocuments();

  const salesData = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalSales: { $sum: 1 },
        totalRevenue: { $sum: "$totalAmount" },
      },
    },
  ]);

  const { totalSales, totalRevenue } = salesData[0] || { totalSales: 0, totalRevenue: 0 };
  return { users: totalUsers, products: totalProducts, totalSales, totalRevenue };
};

const getDailySalesData = async (startDate, endDate) => {
  const dailySales = await Order.aggregate([
    {
      $match: {
        createdAt: { $gte: startDate, $lte: endDate },
      },
    },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt", timezone: "Asia/Dhaka" } },
        sales: { $sum: 1 },
        revenue: { $sum: "$totalAmount" },
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
  ]);

  const datesArray = getDatesInRange(startDate, endDate);

  return datesArray.map((date) => {
    const foundData = dailySales.find((item) => item._id === date);
    return {
      date,
      sales: foundData?.sales || 0,
      revenue: foundData?.revenue || 0,
    };
  });
};

function getDatesInRange(startDate, endDate) {
  const dates = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const year = currentDate.getFullYear();

    dates.push(`${day}-${month}-${year}`);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}
