import { useState } from "react";
import { analyzeReview } from "../services/api";

function ReviewForm({ onReviewAnalyzed }) {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!review.trim()) {
      setError("Please enter your hotel review.");
      return;
    }

    if (rating === 0) {
      setError("Please select a star rating.");
      return;
    }

    try {
      setLoading(true);

      const result = await analyzeReview({
        review: review.trim(),
        rating,
      });

      const newReview = {
        id: Date.now(),
        review: review.trim(),
        rating,
        sentiment: result.sentiment,
      };

      onReviewAnalyzed(newReview);

      setReview("");
      setRating(0);
      setHoverRating(0);

      setMessage("Your review has been submitted successfully.");
    } catch (err) {
      setError(
        err.message ||
          "Unable to analyze the review. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-full bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="mb-8">
          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-2xl">
              💬
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
                Hotel Experience
              </p>

              <h1 className="mt-1 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                Share Your Experience
              </h1>
            </div>

          </div>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            Tell us about your stay and help us understand
            your experience better.
          </p>
        </div>


        {/* =====================================================
            MAIN CARD
        ====================================================== */}

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

          <div className="grid lg:grid-cols-5">


            {/* =================================================
                LEFT VISUAL
            ================================================== */}

            <div className="relative min-h-[360px] overflow-hidden bg-gradient-to-br from-indigo-950 via-indigo-800 to-violet-700 lg:col-span-2 lg:min-h-[680px]">

              {/* Decorative circles */}

              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10" />

              <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-white/10" />

              <div className="absolute left-8 top-8 h-20 w-20 rounded-full border border-white/10" />

              {/* Content */}

              <div className="relative flex h-full flex-col justify-between p-8 text-white sm:p-10">

                <div>

                  <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold tracking-wider backdrop-blur-sm">
                    ✦ HOTEL AI
                  </span>

                  <h2 className="mt-8 text-4xl font-black leading-tight sm:text-5xl">
                    Your experience
                    <br />
                    matters.
                  </h2>

                  <p className="mt-5 max-w-sm text-sm leading-7 text-indigo-100 sm:text-base">
                    Every review helps us understand what our
                    guests love and where we can improve.
                  </p>

                </div>


                {/* Bottom feature cards */}

                <div className="mt-10 grid grid-cols-2 gap-3">

                  <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">

                    <div className="text-2xl">
                      ⭐
                    </div>

                    <p className="mt-2 text-sm font-bold">
                      Rate your stay
                    </p>

                    <p className="mt-1 text-xs text-indigo-100">
                      From 1 to 5 stars
                    </p>

                  </div>


                  <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">

                    <div className="text-2xl">
                      🤖
                    </div>

                    <p className="mt-2 text-sm font-bold">
                      AI Analysis
                    </p>

                    <p className="mt-1 text-xs text-indigo-100">
                      Smart sentiment analysis
                    </p>

                  </div>

                </div>

              </div>

            </div>


            {/* =================================================
                FORM
            ================================================== */}

            <form
              className="p-6 sm:p-8 lg:col-span-3 lg:p-10"
              onSubmit={handleSubmit}
            >

              {/* Form Header */}

              <div className="mb-8 flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-xl text-indigo-600">
                  ✦
                </div>

                <div>

                  <h2 className="text-xl font-black text-slate-900">
                    Write a Review
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Your feedback is valuable to us.
                  </p>

                </div>

              </div>


              {/* =================================================
                  RATING
              ================================================== */}

              <div className="mb-8">

                <label className="text-sm font-bold text-slate-800">
                  How was your stay?
                </label>

                <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">

                  <div className="flex items-center gap-2">

                    {[1, 2, 3, 4, 5].map((star) => (

                      <button
                        type="button"
                        key={star}
                        className={`flex h-11 w-11 items-center justify-center rounded-xl text-2xl transition-all duration-200 ${
                          star <=
                          (hoverRating || rating)
                            ? "scale-105 bg-amber-50 text-amber-400"
                            : "bg-white text-slate-300 hover:bg-white hover:text-amber-300"
                        }`}
                        onClick={() =>
                          setRating(star)
                        }
                        onMouseEnter={() =>
                          setHoverRating(star)
                        }
                        onMouseLeave={() =>
                          setHoverRating(0)
                        }
                        aria-label={`${star} stars`}
                      >
                        ★
                      </button>

                    ))}

                  </div>

                  <div className="mt-3">

                    <span
                      className={`text-sm font-semibold ${
                        rating > 0
                          ? "text-amber-600"
                          : "text-slate-400"
                      }`}
                    >
                      {rating === 0
                        ? "Select your rating"
                        : `⭐ ${rating} out of 5`}
                    </span>

                  </div>

                </div>

              </div>


              {/* =================================================
                  REVIEW TEXT
              ================================================== */}

              <div className="mb-6">

                <div className="flex items-center justify-between">

                  <label
                    htmlFor="review"
                    className="text-sm font-bold text-slate-800"
                  >
                    Your Review
                  </label>

                  <span className="text-xs font-medium text-slate-400">
                    Maximum 2000 characters
                  </span>

                </div>

                <div className="relative mt-3">

                  <textarea
                    id="review"
                    value={review}
                    onChange={(e) =>
                      setReview(e.target.value)
                    }
                    placeholder="Tell us about your room, staff, service, cleanliness, food, or overall experience..."
                    rows="8"
                    maxLength="2000"
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm leading-6 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                  />

                  <div className="absolute bottom-3 right-4 rounded-lg bg-white px-2 py-1 text-xs font-semibold text-slate-400 shadow-sm">
                    {review.length}/2000
                  </div>

                </div>

              </div>


              {/* =================================================
                  ERROR
              ================================================== */}

              {error && (

                <div className="mb-5 flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50 p-4">

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-red-100 font-bold text-red-600">
                    !
                  </div>

                  <div>

                    <p className="text-sm font-bold text-red-700">
                      Something went wrong
                    </p>

                    <p className="mt-1 text-xs leading-5 text-red-600">
                      {error}
                    </p>

                  </div>

                </div>

              )}


              {/* =================================================
                  SUCCESS
              ================================================== */}

              {message && (

                <div className="mb-5 flex items-start gap-3 rounded-2xl border border-emerald-100 bg-emerald-50 p-4">

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-100 font-bold text-emerald-600">
                    ✓
                  </div>

                  <div>

                    <p className="text-sm font-bold text-emerald-700">
                      Review Submitted
                    </p>

                    <p className="mt-1 text-xs leading-5 text-emerald-600">
                      {message}
                    </p>

                  </div>

                </div>

              )}


              {/* =================================================
                  SUBMIT BUTTON
              ================================================== */}

              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                disabled={loading}
              >

                {loading ? (
                  <>
                    <svg
                      className="h-5 w-5 animate-spin"
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

                    Analyzing Review...

                  </>
                ) : (
                  <>
                    Submit Review

                    <span className="transition-transform duration-200 group-hover:translate-x-1">
                      →
                    </span>
                  </>
                )}

              </button>


              {/* Small footer */}

              <p className="mt-4 text-center text-xs leading-5 text-slate-400">
                🤖 Your review will be analyzed using our AI
                sentiment system.
              </p>

            </form>

          </div>

        </div>

      </div>
    </div>
  );
}

export default ReviewForm;