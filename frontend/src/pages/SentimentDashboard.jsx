import { useEffect, useMemo, useState } from "react";

function RevenueDashboard() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [clearing, setClearing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // =========================================================
  // FETCH REVIEWS
  // =========================================================

  const fetchReviews = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "http://localhost:4000/api/reviews"
      );

      if (!response.ok) {
        throw new Error(
          `API failed: ${response.status}`
        );
      }

      const result = await response.json();

      console.log("REVIEW DASHBOARD DATA:", result);

      setReviews(
        Array.isArray(result.reviews)
          ? result.reviews
          : []
      );

    } catch (err) {
      console.error(
        "Review dashboard error:",
        err
      );

      setError(
        err.message ||
        "Failed to load reviews."
      );

    } finally {
      setLoading(false);
    }
  };


  // =========================================================
  // INITIAL LOAD
  // =========================================================

  useEffect(() => {
    fetchReviews();
  }, []);


  // =========================================================
  // CLEAR ALL REVIEWS
  // =========================================================

  const clearReviews = async () => {

    const confirmed = window.confirm(
      "⚠️ This will permanently delete ALL customer reviews.\n\nThis action cannot be undone.\n\nDo you want to continue?"
    );

    if (!confirmed) {
      return;
    }

    try {

      setClearing(true);
      setError("");
      setSuccess("");

      const response = await fetch(
        "http://localhost:4000/api/reviews",
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
          "Failed to clear reviews."
        );
      }

      // Update UI immediately
      setReviews([]);

      setSuccess(
        "All customer reviews have been deleted successfully."
      );

    } catch (err) {

      console.error(
        "Clear reviews error:",
        err
      );

      setError(
        err.message ||
        "Failed to clear reviews."
      );

    } finally {
      setClearing(false);
    }
  };


  // =========================================================
  // SENTIMENT COUNTS
  // =========================================================

  const sentimentCounts = useMemo(() => {

    let positive = 0;
    let neutral = 0;
    let negative = 0;

    reviews.forEach((review) => {

      const sentiment =
        String(review.sentiment || "")
          .toLowerCase()
          .trim();

      if (
        sentiment === "positive" ||
        sentiment === "pos"
      ) {
        positive++;
      }

      else if (
        sentiment === "neutral" ||
        sentiment === "neu"
      ) {
        neutral++;
      }

      else if (
        sentiment === "negative" ||
        sentiment === "neg"
      ) {
        negative++;
      }

    });

    return {
      positive,
      neutral,
      negative,
    };

  }, [reviews]);


  // =========================================================
  // SENTIMENT STYLE
  // =========================================================

  const getSentimentStyle = (sentiment) => {

    const value =
      String(sentiment || "")
        .toLowerCase()
        .trim();

    if (
      value === "positive" ||
      value === "pos"
    ) {
      return {
        label: "Positive",
        icon: "😊",
        className:
          "bg-emerald-50 text-emerald-700 border-emerald-100",
      };
    }

    if (
      value === "negative" ||
      value === "neg"
    ) {
      return {
        label: "Negative",
        icon: "😞",
        className:
          "bg-rose-50 text-rose-700 border-rose-100",
      };
    }

    return {
      label: "Neutral",
      icon: "😐",
      className:
        "bg-amber-50 text-amber-700 border-amber-100",
    };
  };


  // =========================================================
  // FORMAT DATE
  // =========================================================

  const formatDate = (date) => {

    if (!date) {
      return "Unknown date";
    }

    try {

      return new Date(date).toLocaleString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }
      );

    } catch {
      return "Unknown date";
    }
  };


  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {

    return (
      <div className="min-h-full bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">

        <div className="mx-auto w-full max-w-7xl">

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-10">

            <div className="flex flex-col items-center justify-center py-20">

              <div className="relative w-14 h-14">

                <div className="absolute inset-0 rounded-full border-4 border-indigo-100"></div>

                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-indigo-600 animate-spin"></div>

              </div>

              <h2 className="mt-6 text-xl font-bold text-slate-900">
                Loading Reviews
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Fetching customer feedback...
              </p>

            </div>

          </div>

        </div>

      </div>
    );
  }


  // =========================================================
  // MAIN DASHBOARD
  // =========================================================

  return (
    <div className="min-h-full bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">

      <div className="mx-auto w-full max-w-7xl">


        {/* ===================================================
            HEADER
        ==================================================== */}

        <div className="mb-8">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

            <div>

              <div className="flex items-center gap-3">

                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-200 text-2xl">
                  ⭐
                </div>

                <div>

                  <p className="text-sm font-semibold text-indigo-600">
                    Hotel Analytics
                  </p>

                  <h1 className="mt-0.5 text-3xl font-black text-slate-900">
                    Review Dashboard
                  </h1>

                </div>

              </div>

              <p className="mt-3 text-sm text-slate-500 max-w-2xl">
                Monitor customer feedback, review sentiment
                and recent guest experiences from one place.
              </p>

            </div>


            {/* ACTIONS */}

            <div className="flex flex-wrap items-center gap-3">

              <button
                onClick={fetchReviews}
                disabled={loading || clearing}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold text-sm shadow-sm hover:border-indigo-300 hover:text-indigo-600 hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >

                <svg
                  className="w-4.5 h-4.5"
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


              <button
                onClick={clearReviews}
                disabled={clearing}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-red-500 text-white font-bold text-sm shadow-lg shadow-rose-200 hover:from-rose-600 hover:to-red-600 hover:shadow-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >

                {clearing ? (

                  <>

                    <svg
                      className="w-4.5 h-4.5 animate-spin"
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

                    <svg
                      className="w-4.5 h-4.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >

                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3m-7 0h10"
                      />

                    </svg>

                    Clear All Reviews

                  </>

                )}

              </button>

            </div>

          </div>

        </div>


        {/* ===================================================
            SUCCESS MESSAGE
        ==================================================== */}

        {success && (

          <div className="mb-6 rounded-2xl border border-emerald-100 bg-emerald-50 p-4">

            <div className="flex items-center gap-3">

              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                ✓
              </div>

              <p className="text-sm font-semibold text-emerald-700">
                {success}
              </p>

            </div>

          </div>

        )}


        {/* ===================================================
            ERROR MESSAGE
        ==================================================== */}

        {error && (

          <div className="mb-6 rounded-2xl border border-rose-100 bg-rose-50 p-4">

            <div className="flex items-center gap-3">

              <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center font-bold">
                !
              </div>

              <p className="text-sm font-semibold text-rose-700">
                {error}
              </p>

            </div>

          </div>

        )}


        {/* ===================================================
            STAT CARDS
        ==================================================== */}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">


          {/* TOTAL */}

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 hover:shadow-lg transition">

            <div className="flex items-start justify-between">

              <div>

                <p className="text-sm font-semibold text-slate-500">
                  Total Reviews
                </p>

                <h2 className="text-4xl font-black text-slate-900 mt-3">
                  {reviews.length}
                </h2>

              </div>

              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl">
                💬
              </div>

            </div>

            <p className="text-xs font-semibold text-indigo-600 mt-5">
              Latest 20 reviews shown
            </p>

          </div>


          {/* POSITIVE */}

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 hover:shadow-lg transition">

            <div className="flex items-start justify-between">

              <div>

                <p className="text-sm font-semibold text-slate-500">
                  Positive
                </p>

                <h2 className="text-4xl font-black text-slate-900 mt-3">
                  {sentimentCounts.positive}
                </h2>

              </div>

              <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-xl">
                😊
              </div>

            </div>

            <p className="text-xs font-semibold text-emerald-600 mt-5">
              Positive customer feedback
            </p>

          </div>


          {/* NEUTRAL */}

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 hover:shadow-lg transition">

            <div className="flex items-start justify-between">

              <div>

                <p className="text-sm font-semibold text-slate-500">
                  Neutral
                </p>

                <h2 className="text-4xl font-black text-slate-900 mt-3">
                  {sentimentCounts.neutral}
                </h2>

              </div>

              <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-xl">
                😐
              </div>

            </div>

            <p className="text-xs font-semibold text-amber-600 mt-5">
              Neutral customer feedback
            </p>

          </div>


          {/* NEGATIVE */}

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 hover:shadow-lg transition">

            <div className="flex items-start justify-between">

              <div>

                <p className="text-sm font-semibold text-slate-500">
                  Negative
                </p>

                <h2 className="text-4xl font-black text-slate-900 mt-3">
                  {sentimentCounts.negative}
                </h2>

              </div>

              <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-xl">
                😞
              </div>

            </div>

            <p className="text-xs font-semibold text-rose-600 mt-5">
              Negative customer feedback
            </p>

          </div>

        </div>


        {/* ===================================================
            REVIEW LIST
        ==================================================== */}

        <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">


          {/* LIST HEADER */}

          <div className="px-6 lg:px-8 py-6 border-b border-slate-100">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

              <div>

                <div className="flex items-center gap-3">

                  <div className="w-11 h-11 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center text-xl">
                    📝
                  </div>

                  <div>

                    <h2 className="text-xl font-extrabold text-slate-900">
                      Recent Customer Reviews
                    </h2>

                    <p className="text-sm text-slate-500 mt-1">
                      Latest 20 reviews from your customers
                    </p>

                  </div>

                </div>

              </div>


              <div className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-100">

                <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                  Showing
                </span>

                <span className="ml-2 text-sm font-black text-slate-900">
                  {reviews.length} / 20
                </span>

              </div>

            </div>

          </div>


          {/* EMPTY STATE */}

          {reviews.length === 0 ? (

            <div className="px-6 py-20 text-center">

              <div className="w-20 h-20 mx-auto rounded-3xl bg-slate-50 flex items-center justify-center text-4xl">
                💬
              </div>

              <h3 className="mt-6 text-xl font-bold text-slate-900">
                No Reviews Available
              </h3>

              <p className="mt-2 text-sm text-slate-500 max-w-md mx-auto">
                There are currently no customer reviews in the
                database. New reviews will appear here automatically.
              </p>

              <button
                onClick={fetchReviews}
                className="mt-6 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-700 transition"
              >
                Refresh Reviews
              </button>

            </div>

          ) : (

            <div className="divide-y divide-slate-100">

              {reviews.slice(0, 20).map((review, index) => {

                const sentiment =
                  getSentimentStyle(
                    review.sentiment
                  );

                return (

                  <div
                    key={
                      review.review_id ||
                      `${index}-${review.created_at}`
                    }
                    className="p-6 lg:px-8 hover:bg-slate-50/70 transition"
                  >

                    <div className="flex flex-col lg:flex-row lg:items-start gap-5">


                      {/* NUMBER */}

                      <div className="flex-shrink-0">

                        <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center">

                          <span className="text-sm font-black text-slate-500">
                            #{index + 1}
                          </span>

                        </div>

                      </div>


                      {/* REVIEW */}

                      <div className="flex-1 min-w-0">

                        <div className="flex flex-wrap items-center gap-3 mb-3">

                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold ${sentiment.className}`}
                          >
                            <span>
                              {sentiment.icon}
                            </span>

                            {sentiment.label}

                          </span>

                          <span className="text-xs text-slate-400 font-medium">
                            {formatDate(
                              review.created_at
                            )}
                          </span>

                        </div>


                        <p className="text-slate-700 text-sm lg:text-base leading-7 break-words">
                          {review.review_text ||
                            "No review text available."}
                        </p>

                      </div>

                    </div>

                  </div>

                );

              })}

            </div>

          )}

        </section>


        {/* ===================================================
            SAFETY NOTICE
        ==================================================== */}

        <div className="mt-8 rounded-2xl bg-slate-900 p-5 text-white">

          <div className="flex items-start gap-4">

            <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center flex-shrink-0">
              🗑️
            </div>

            <div>

              <h4 className="font-bold">
                Review data control
              </h4>

              <p className="text-sm text-slate-400 mt-1 leading-relaxed">
                Clear All Reviews permanently removes all customer
                reviews from the database. Booking data and other
                hotel information are not affected.
              </p>

            </div>

          </div>

        </div>


        {/* ===================================================
            FOOTER
        ==================================================== */}

        <footer className="text-center py-8">

          <p className="text-sm font-semibold text-slate-500">
            Hotel Management AI Dashboard
          </p>

          <p className="text-xs text-slate-400 mt-1">
            Customer feedback and sentiment intelligence
          </p>

        </footer>

      </div>

    </div>
  );
}

export default RevenueDashboard;