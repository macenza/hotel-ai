import React, { useEffect, useState } from "react";
import BookingStats from "../components/BookingStats";

const API_URL = "http://localhost:4000";

const EMPTY_DATA = {
  totalBookings: 0,
  predictedCancellation: 0,
  predictedNonCancellation: 0,
  cancellationRate: "0.0",
  recentBookings: [],
};

function BookingCancellation() {
  const [data, setData] = useState(EMPTY_DATA);
  const [loading, setLoading] = useState(true);
  const [clearing, setClearing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // =====================================================
  // LOAD DATA
  // =====================================================

  const loadBookingCancellationData = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/api/dashboard`
      );

      if (!response.ok) {
        throw new Error("Failed to load dashboard data.");
      }

      const result = await response.json();

      console.log(
        "🔥 Booking Cancellation Dashboard:",
        result.bookingCancellation
      );

      setData(
        result.bookingCancellation || EMPTY_DATA
      );

    } catch (err) {
      console.error(
        "Booking cancellation dashboard error:",
        err
      );

      setError(
        "Unable to load booking cancellation data."
      );

    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {
    loadBookingCancellationData();
  }, []);

  // =====================================================
  // AUTO REFRESH EVERY 5 SECONDS
  // =====================================================

  useEffect(() => {
    const interval = setInterval(() => {
      loadBookingCancellationData();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // =====================================================
  // CLEAR ALL BOOKING DATA
  // =====================================================

  const clearBookingData = async () => {
    const confirmed = window.confirm(
      "⚠️ WARNING\n\n" +
      "This will permanently delete ALL booking data.\n\n" +
      "Booking Cancellation, Customer Segmentation, Customer Dashboard and Revenue-related booking data will be cleared.\n\n" +
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
        `${API_URL}/api/booking-cancellation`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
          "Failed to clear booking data."
        );
      }

      // Immediately update UI
      setData(EMPTY_DATA);

      setSuccess(
        "All booking and cancellation prediction data has been cleared successfully."
      );

    } catch (err) {
      console.error(
        "Clear booking data error:",
        err
      );

      setError(
        err.message ||
        "Failed to clear booking data."
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
              Loading Booking Cancellation
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Loading booking prediction data...
            </p>

          </div>

        </div>
      </div>
    );
  }

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

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-2xl">
                  📊
                </div>

                <div>

                  <p className="text-sm font-semibold text-blue-600">
                    Hotel Analytics
                  </p>

                  <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                    Booking Cancellation
                  </h1>

                </div>

              </div>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                Monitor hotel bookings and AI-based cancellation
                predictions in real time.
              </p>

            </div>

            {/* ACTIONS */}

            <div className="flex flex-wrap gap-3">

              {/* REFRESH */}

              <button
                onClick={loadBookingCancellationData}
                disabled={clearing}
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition hover:border-blue-300 hover:text-blue-600 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
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
                onClick={clearBookingData}
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
                    Clear Bookings
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
            STATS
        ================================================== */}

        <BookingStats
          totalBookings={data.totalBookings}
          predictedCancellation={
            data.predictedCancellation
          }
          predictedNonCancellation={
            data.predictedNonCancellation
          }
        />


        {/* =================================================
            CANCELLATION RATE
        ================================================== */}

        <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-semibold text-slate-500">
                Cancellation Prediction Rate
              </p>

              <h2 className="mt-2 text-3xl font-black text-slate-900">
                {data.cancellationRate || "0.0"}%
              </h2>

            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-2xl">
              ⚠️
            </div>

          </div>

          <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">

            <div
              className="h-full rounded-full bg-red-500 transition-all duration-500"
              style={{
                width: `${Math.min(
                  Number(data.cancellationRate || 0),
                  100
                )}%`,
              }}
            />

          </div>

        </div>


        {/* =================================================
            RECENT BOOKINGS
        ================================================== */}

        <section className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

          {/* HEADER */}

          <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">

            <div>

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-xl">
                  🏨
                </div>

                <div>

                  <h2 className="text-lg font-bold text-slate-900">
                    Recent Bookings
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Latest hotel booking cancellation predictions
                  </p>

                </div>

              </div>

            </div>

            <span className="w-fit rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600">
              {data.recentBookings.length} Bookings
            </span>

          </div>


          {/* LIST */}

          {data.recentBookings.length === 0 ? (

            <div className="px-5 py-20 text-center sm:px-6">

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-50 text-4xl">
                🏨
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900">
                No Bookings Available
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Booking cancellation predictions will appear
                here after bookings are processed.
              </p>

            </div>

          ) : (

            <div className="divide-y divide-slate-100">

              {data.recentBookings.map(
                (booking, index) => {

                  const isCancellation =
                    Number(booking.prediction) === 1;

                  return (
                    <div
                      key={
                        booking.bookingId ||
                        index
                      }
                      className="flex flex-col gap-4 px-5 py-5 transition hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between sm:px-6"
                    >

                      {/* BOOKING */}

                      <div className="flex items-center gap-4">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-sm font-bold text-slate-600">
                          {index + 1}
                        </div>

                        <div>

                          <p className="font-bold text-slate-800">
                            {booking.name || "Guest"}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            Booking #{booking.bookingId}
                          </p>

                          {booking.bookingDate && (
                            <p className="mt-1 text-xs text-slate-400">
                              📅 {booking.bookingDate}
                            </p>
                          )}

                        </div>

                      </div>


                      {/* PREDICTION */}

                      <span
                        className={
                          isCancellation
                            ? "w-fit rounded-full bg-red-50 px-4 py-2 text-xs font-bold text-red-600"
                            : "w-fit rounded-full bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-600"
                        }
                      >

                        {isCancellation
                          ? "⚠️ Predicted Cancellation"
                          : "✅ Predicted Non-Cancellation"}

                      </span>

                    </div>
                  );
                }
              )}

            </div>

          )}

        </section>


        {/* =================================================
            INFO
        ================================================== */}

        <div className="mt-8 rounded-2xl bg-slate-900 p-5 text-white">

          <div className="flex items-start gap-4">

            <div className="text-2xl">
              🤖
            </div>

            <div>

              <h3 className="font-bold">
                AI Cancellation Prediction
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-400">
                The dashboard displays the cancellation prediction
                stored with each booking. Data automatically refreshes
                every 5 seconds.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default BookingCancellation;