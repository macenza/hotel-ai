import React from "react";

function RevenueStats({
  currentMonthRevenue = 0,
  predictedNextMonthRevenue = 0,
}) {
  const revenueIncrease =
    predictedNextMonthRevenue - currentMonthRevenue;

  const revenueGrowth =
    currentMonthRevenue > 0
      ? ((revenueIncrease / currentMonthRevenue) * 100).toFixed(1)
      : "0.0";

  const stats = [
    {
      title: "Current Month Revenue",
      value: `₹${currentMonthRevenue.toLocaleString("en-IN")}`,
    },
    {
      title: "Predicted Next Month Revenue",
      value: `₹${predictedNextMonthRevenue.toLocaleString("en-IN")}`,
    },
    {
      title: "Revenue Increase",
      value: `₹${revenueIncrease.toLocaleString("en-IN")}`,
    },
    {
      title: "Revenue Growth",
      value: `${revenueGrowth}%`,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md"
        >
          <p className="text-sm font-medium text-slate-500">
            {stat.title}
          </p>

          <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            {stat.value}
          </h2>
        </div>
      ))}
    </div>
  );
}

export default RevenueStats;