import React from "react";

function BookingStats({
  totalBookings = 0,
  predictedCancellation = 0,
  predictedNonCancellation = 0,
}) {
  const cancellationRate =
    totalBookings > 0
      ? ((predictedCancellation / totalBookings) * 100).toFixed(1)
      : "0.0";

  const stats = [
    {
      title: "Total Bookings",
      value: totalBookings,
    },
    {
      title: "Predicted Cancellation",
      value: predictedCancellation,
    },
    {
      title: "Predicted Non-Cancellation",
      value: predictedNonCancellation,
    },
    {
      title: "Cancellation Rate",
      value: `${cancellationRate}%`,
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

export default BookingStats;