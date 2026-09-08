import { useEffect, useState } from "react";

const API_URL = "http://localhost:4000";

const EMPTY_DATA = {
  revenue: {
    tomorrowPredictedRevenue: 0,
    revenueIncrease: 0,
    revenueIncreasePercentage: 0,
  },
};

function RevenueDashboard() {
  const [data, setData] = useState(EMPTY_DATA);
  const [loading, setLoading] = useState(true);
  const [clearing, setClearing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // =====================================================
  // LOAD REVENUE DATA
  // =====================================================

  const fetchRevenue = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/api/dashboard`
      );

      if (!response.ok) {
        throw new Error(
          `API failed: ${response.status}`
        );
      }

      const result = await response.json();

      console.log(
        "💰 REVENUE DASHBOARD DATA:",
        result
      );

      setData(result || EMPTY_DATA);

    } catch (err) {
      console.error(
        "Revenue dashboard error:",
        err
      );

      setError(
        err.message ||
          "Unable to load revenue data."
      );

    } finally {
      setLoading(false);
    }
  };


  // =====================================================
  // INITIAL LOAD ONLY
  // =====================================================

  useEffect(() => {
    fetchRevenue();
  }, []);


  // =====================================================
  // CLEAR REVENUE DATA
  // =====================================================

  const clearRevenueData = async () => {
    const confirmed = window.confirm(
      "⚠️ WARNING\n\n" +
        "This will permanently delete ALL booking data used for revenue prediction.\n\n" +
        "Revenue, Booking Cancellation, Customer Segmentation and booking-related dashboard data will become empty.\n\n" +
        "Reviews will NOT be deleted.\n\n" +
        "Do you want to continue?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setClearing(true);
      setError("");
      setSuccess("");

     const response = await fetch(
  `${API_URL}/api/bookings`,
  {
    method: "DELETE",
  }
);

const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            "Failed to clear revenue data."
        );
      }

      setData(EMPTY_DATA);

      setSuccess(
        "All booking and revenue data has been cleared successfully."
      );

    } catch (err) {
      console.error(
        "Clear revenue data error:",
        err
      );

      setError(
        err.message ||
          "Failed to clear revenue data."
      );

    } finally {
      setClearing(false);
    }
  };


  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="min-h-full bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">

          <div className="rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">

            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

            <h2 className="mt-5 text-lg font-bold text-slate-900">
              Loading Revenue Prediction
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Loading tomorrow's revenue prediction...
            </p>

          </div>

        </div>
      </div>
    );
  }


  // =====================================================
  // REVENUE VALUES
  // =====================================================

  const tomorrowPredictedRevenue =
    Number(
      data?.revenue?.tomorrowPredictedRevenue ??
        data?.revenue?.predictedTomorrowRevenue ??
        data?.revenue?.tomorrowRevenue ??
        0
    );

  const revenueIncrease =
    Number(
      data?.revenue?.revenueIncrease ??
        data?.revenue?.increase ??
        0
    );

  const revenueIncreasePercentage =
    Number(
      data?.revenue?.revenueIncreasePercentage ??
        data?.revenue?.increasePercentage ??
        0
    );


  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="min-h-full bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">

      <div className="mx-auto w-full max-w-7xl">

        {/* =================================================
            HEADER
        ================================================== */}

        <div className="mb-8">

          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <div className="flex items-center gap-3">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-2xl">
                  💰
                </div>

                <div>

                  <p className="text-sm font-semibold text-emerald-600">
                    Hotel Analytics
                  </p>

                  <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                    Revenue Prediction
                  </h1>

                </div>

              </div>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                AI-powered revenue prediction for the next day.
              </p>

            </div>


            {/* ACTIONS */}

            <div className="flex flex-wrap gap-3">

              {/* MANUAL REFRESH */}

              <button
                onClick={fetchRevenue}
                disabled={clearing}
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition hover:border-emerald-300 hover:text-emerald-600 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
              >

                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 4v5h5M20 20v-5h-5M5.64 18.36A9 9 0 1018.36 5.64"
                  />
                </svg>

                Refresh

              </button>


              {/* CLEAR */}

              <button
                onClick={clearRevenueData}
                disabled={clearing}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-rose-500 to-red-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-rose-200 transition hover:from-rose-600 hover:to-red-600 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
              >

                {clearing ? (
                  <>
                    <svg
                      className="h-4 w-4 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >

                      <circle
                        cx="12"
                        cy="12"
                        r="9"
                        stroke="currentColor"
                        strokeWidth="3"
                        opacity="0.3"
                      />

                      <path
                        d="M21 12a9 9 0 00-9-9"
                        stroke="currentColor"
                        strokeWidth="3"
                      />

                    </svg>

                    Clearing...
                  </>
                ) : (
                  <>
                    🗑️
                    Clear Revenue Data
                  </>
                )}

              </button>

            </div>

          </div>

        </div>


        {/* =================================================
            SUCCESS
        ================================================== */}

        {success && (
          <div className="mb-6 rounded-2xl border border-emerald-100 bg-emerald-50 px-5 py-4">

            <div className="flex items-center gap-3">

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 font-bold text-emerald-600">
                ✓
              </div>

              <p className="text-sm font-semibold text-emerald-700">
                {success}
              </p>

            </div>

          </div>
        )}


        {/* =================================================
            ERROR
        ================================================== */}

        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4">

            <div className="flex items-center gap-3">

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-100 font-bold text-red-600">
                !
              </div>

              <p className="text-sm font-semibold text-red-700">
                {error}
              </p>

            </div>

          </div>
        )}


        {/* =================================================
            TOMORROW PREDICTED REVENUE
        ================================================== */}

        <div className="rounded-3xl border border-emerald-100 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <div className="flex items-center gap-2">

                <span className="rounded-lg bg-violet-50 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-violet-600">
                  AI Prediction
                </span>

                <span className="text-xs font-semibold text-slate-400">
                  Next Day
                </span>

              </div>

              <p className="mt-4 text-sm font-semibold text-slate-500">
                Tomorrow's Predicted Revenue
              </p>

              <h2 className="mt-2 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
                ₹{tomorrowPredictedRevenue.toLocaleString("en-IN")}
              </h2>

              <p className="mt-3 text-sm font-medium text-violet-600">
                Based on today's incoming bookings
              </p>

            </div>


            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-emerald-50 text-4xl">
              🤖
            </div>

          </div>

        </div>


        {/* =================================================
            REVENUE INCREASE
        ================================================== */}

        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">

          {/* NUMBER */}

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm font-semibold text-slate-500">
                  Revenue Increase
                </p>

                <h2 className="mt-3 text-3xl font-black text-slate-900">
                  ₹{Math.abs(revenueIncrease).toLocaleString("en-IN")}
                </h2>

              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-2xl">
                📈
              </div>

            </div>

            <p className="mt-4 text-xs font-semibold text-emerald-600">
              Predicted increase in revenue
            </p>

          </div>


          {/* PERCENTAGE */}

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm font-semibold text-slate-500">
                  Revenue Increase
                </p>

                <h2 className="mt-3 text-3xl font-black text-slate-900">
                  {revenueIncreasePercentage.toFixed(2)}%
                </h2>

              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-2xl">
                %
              </div>

            </div>

            <p className="mt-4 text-xs font-semibold text-violet-600">
              Predicted percentage increase
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default RevenueDashboard;