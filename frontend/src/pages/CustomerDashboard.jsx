import React, { useEffect, useMemo, useState } from "react";
import {
  FiUsers,
  FiCalendar,
  FiMessageSquare,
  FiUser,
  FiUserPlus,
  FiAward,
  FiRefreshCw,
  FiActivity,
  FiTrendingUp,
  FiBarChart2,
  FiDatabase,
  FiCheckCircle,
} from "react-icons/fi";

const API_URL = "http://localhost:4000";

/* =========================================================
   ANIMATED NUMBER
========================================================= */

const AnimatedNumber = ({
  value = 0,
  duration = 900,
  className = "",
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const target = Number(value) || 0;

    if (target === 0) {
      setDisplayValue(0);
      return;
    }

    let startTime = null;
    let animationFrame;

    const animate = (currentTime) => {
      if (!startTime) {
        startTime = currentTime;
      }

      const progress = Math.min(
        (currentTime - startTime) / duration,
        1
      );

      const easedProgress =
        1 - Math.pow(1 - progress, 3);

      const currentValue = Math.floor(
        easedProgress * target
      );

      setDisplayValue(currentValue);

      if (progress < 1) {
        animationFrame =
          requestAnimationFrame(animate);
      } else {
        setDisplayValue(target);
      }
    };

    animationFrame =
      requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [value, duration]);

  return (
    <span className={className}>
      {displayValue.toLocaleString()}
    </span>
  );
};

/* =========================================================
   SECTION TITLE
========================================================= */

const SectionTitle = ({
  title,
  subtitle,
  icon: Icon,
}) => {
  return (
    <div className="mb-6 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition-all duration-300 hover:scale-105 hover:rotate-3">
          <Icon className="h-5 w-5" />
        </div>

        <div>
          <h2 className="text-lg font-extrabold tracking-tight text-slate-900">
            {title}
          </h2>

          {subtitle && (
            <p className="mt-1 text-xs text-slate-500">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

/* =========================================================
   SUMMARY CARD
========================================================= */

const SummaryCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  iconBackground,
  iconColor,
  delay = "0ms",
}) => {
  return (
    <div
      className="group relative overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-indigo-200 hover:shadow-xl"
      style={{
        animationDelay: delay,
      }}
    >
      {/* Decorative circle */}
      <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-indigo-500/[0.035] transition-all duration-700 group-hover:scale-[1.8]" />

      {/* Bottom glow */}
      <div className="pointer-events-none absolute -bottom-16 -left-10 h-28 w-28 rounded-full bg-violet-500/[0.025] blur-2xl transition-all duration-700 group-hover:scale-150" />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-500">
            {title}
          </p>

          <h3 className="mt-3 text-4xl font-black tracking-tight text-slate-900">
            <AnimatedNumber value={value} />
          </h3>

          <div className="mt-3 flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <FiTrendingUp className="h-3 w-3" />
            </span>

            <p className="text-xs font-medium text-slate-400">
              {subtitle}
            </p>
          </div>
        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl ${iconBackground} ${iconColor} transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}
        >
          <Icon className="h-6 w-6" />
        </div>
      </div>

      {/* Tiny bottom indicator */}
      <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-indigo-600 transition-all duration-500 group-hover:w-full" />
    </div>
  );
};

/* =========================================================
   GUEST CARD
========================================================= */

const GuestCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  iconBackground,
  iconColor,
  delay = "0ms",
}) => {
  return (
    <div
      className="group relative overflow-hidden rounded-[1.4rem] border border-slate-200 bg-white p-5 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-lg"
      style={{
        animationDelay: delay,
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconBackground} ${iconColor} transition-all duration-300 group-hover:scale-110`}
          >
            <Icon className="h-5 w-5" />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-slate-400">
              {title}
            </p>

            <p className="mt-1 text-2xl font-black text-slate-900">
              <AnimatedNumber value={value} />
            </p>

            <p className="mt-1 text-[11px] font-medium text-slate-400">
              {subtitle}
            </p>
          </div>
        </div>

        <div className="h-8 w-1 rounded-full bg-slate-100 transition-all duration-300 group-hover:h-12 group-hover:bg-indigo-200" />
      </div>
    </div>
  );
};

/* =========================================================
   SEGMENT CARD
========================================================= */

const SegmentCard = ({
  title,
  value,
  description,
  icon: Icon,
  percentage,
  type,
}) => {
  const styles = {
    budget: {
      wrapper:
        "border-amber-100 bg-gradient-to-br from-amber-50/80 via-white to-white",
      icon:
        "bg-amber-100 text-amber-600",
      number:
        "text-amber-600",
      bar:
        "bg-amber-500",
      badge:
        "bg-amber-50 text-amber-700 border-amber-100",
    },

    regular: {
      wrapper:
        "border-blue-100 bg-gradient-to-br from-blue-50/80 via-white to-white",
      icon:
        "bg-blue-100 text-blue-600",
      number:
        "text-blue-600",
      bar:
        "bg-blue-500",
      badge:
        "bg-blue-50 text-blue-700 border-blue-100",
    },

    premium: {
      wrapper:
        "border-violet-100 bg-gradient-to-br from-violet-50/80 via-white to-white",
      icon:
        "bg-violet-100 text-violet-600",
      number:
        "text-violet-600",
      bar:
        "bg-violet-500",
      badge:
        "bg-violet-50 text-violet-700 border-violet-100",
    },
  };

  const currentStyle =
    styles[type] || styles.regular;

  return (
    <div
      className={`group relative overflow-hidden rounded-[1.5rem] border p-6 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl ${currentStyle.wrapper}`}
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-14 -top-14 h-36 w-36 rounded-full bg-white/70 transition-all duration-700 group-hover:scale-150" />

      <div className="relative">
        <div className="flex items-start justify-between">
          <div>
            <span
              className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${currentStyle.badge}`}
            >
              Customer Segment
            </span>

            <h3 className="mt-4 text-xl font-extrabold text-slate-900">
              {title}
            </h3>

            <p className="mt-1 text-xs font-medium text-slate-500">
              {description}
            </p>
          </div>

          <div
            className={`flex h-12 w-12 items-center justify-center rounded-2xl ${currentStyle.icon} transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}
          >
            <Icon className="h-5 w-5" />
          </div>
        </div>

        <div className="mt-7 flex items-end justify-between">
          <div>
            <p
              className={`text-4xl font-black tracking-tight ${currentStyle.number}`}
            >
              <AnimatedNumber value={value} />
            </p>

            <p className="mt-1 text-xs font-medium text-slate-400">
              Customers
            </p>
          </div>

          <p className="text-sm font-extrabold text-slate-600">
            {percentage}%
          </p>
        </div>

        {/* Progress */}
        <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-200/70">
          <div
            className={`h-full rounded-full ${currentStyle.bar} transition-all duration-1000 ease-out`}
            style={{
              width: `${percentage}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

/* =========================================================
   LOADING CARD
========================================================= */

const LoadingCard = ({ className = "" }) => {
  return (
    <div
      className={`animate-pulse rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm ${className}`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-3">
          <div className="h-4 w-28 rounded-lg bg-slate-200" />
          <div className="h-10 w-24 rounded-lg bg-slate-200" />
          <div className="h-3 w-36 rounded-lg bg-slate-100" />
        </div>

        <div className="h-14 w-14 rounded-2xl bg-slate-200" />
      </div>
    </div>
  );
};

/* =========================================================
   LOADING SCREEN
========================================================= */

const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-[#f5f7fb] px-6 py-8">
      <div className="mx-auto max-w-[1400px]">
        {/* Header skeleton */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 animate-pulse rounded-2xl bg-slate-200" />

            <div className="space-y-2">
              <div className="h-5 w-52 animate-pulse rounded-lg bg-slate-200" />
              <div className="h-3 w-72 animate-pulse rounded-lg bg-slate-100" />
            </div>
          </div>

          <div className="hidden h-11 w-28 animate-pulse rounded-xl bg-slate-200 sm:block" />
        </div>

        {/* Hero skeleton */}
        <div className="mb-8 h-56 animate-pulse rounded-[2rem] bg-slate-200" />

        {/* Summary skeleton */}
        <div className="grid gap-5 md:grid-cols-3">
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
        </div>

        {/* Guest skeleton */}
        <div className="mt-10">
          <div className="mb-5 h-6 w-44 animate-pulse rounded-lg bg-slate-200" />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
          </div>
        </div>

        {/* Segmentation skeleton */}
        <div className="mt-10">
          <div className="mb-5 h-6 w-56 animate-pulse rounded-lg bg-slate-200" />

          <div className="grid gap-5 md:grid-cols-3">
            <LoadingCard className="h-56" />
            <LoadingCard className="h-56" />
            <LoadingCard className="h-56" />
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================
   ERROR SCREEN
========================================================= */

const ErrorScreen = ({
  error,
  onRetry,
}) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5f7fb] px-6">
      <div className="w-full max-w-md rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-500">
          <FiActivity className="h-7 w-7" />
        </div>

        <h2 className="mt-6 text-2xl font-black text-slate-900">
          Dashboard Unavailable
        </h2>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          {error}
        </p>

        <button
          onClick={onRetry}
          className="mt-7 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-xl active:translate-y-0"
        >
          <FiRefreshCw className="h-4 w-4" />
          Try Again
        </button>
      </div>
    </div>
  );
};

/* =========================================================
   EMPTY STATE
========================================================= */

const EmptyState = () => {
  return (
    <div className="rounded-[1.5rem] border border-dashed border-slate-300 bg-white p-10 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-slate-400">
        <FiDatabase className="h-6 w-6" />
      </div>

      <h3 className="mt-4 text-lg font-bold text-slate-800">
        No customer data yet
      </h3>

      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
        Customer and guest statistics will appear here
        when booking data becomes available.
      </p>
    </div>
  );
};

/* =========================================================
   MAIN DASHBOARD
========================================================= */

const CustomerDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] =
    useState(true);
  const [clearing, setClearing] =
    useState(false);
  const [refreshing, setRefreshing] =
    useState(false);
  const [error, setError] =
    useState("");

  /* =======================================================
     FETCH DASHBOARD
  ======================================================= */

  const fetchDashboard = async (
    showRefresh = false
  ) => {
    try {
      if (showRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const response = await fetch(
        `${API_URL}/api/dashboard`
      );

      if (!response.ok) {
        throw new Error(
          "Failed to fetch dashboard"
        );
      }

      const result =
        await response.json();

      setData(result);
    } catch (err) {
      console.error(
        "Dashboard error:",
        err
      );

      setError(
        err.message ||
          "Unable to load dashboard data."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  /* =======================================================
     INITIAL LOAD
  ======================================================= */

  useEffect(() => {
    fetchDashboard();
  }, []);

  /* =======================================================
     CLEAR BOOKINGS
  ======================================================= */

  const clearDashboard = async () => {
    const confirmed =
      window.confirm(
        "This will permanently delete all booking data.\n\n" +
          "Reviews will NOT be deleted.\n\n" +
          "Do you want to continue?"
      );

    if (!confirmed) return;

    try {
      setClearing(true);
      setError("");

      const response =
        await fetch(
          `${API_URL}/api/dashboard/bookings`,
          {
            method: "DELETE",
          }
        );

      const result =
        await response.json();

      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result.message ||
            "Failed to clear booking data"
        );
      }

      await fetchDashboard();
    } catch (err) {
      console.error(
        "Clear dashboard error:",
        err
      );

      setError(
        err.message ||
          "Failed to clear booking information."
      );
    } finally {
      setClearing(false);
    }
  };

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return <LoadingScreen />;
  }

  /* =======================================================
     ERROR
  ======================================================= */

  if (error && !data) {
    return (
      <ErrorScreen
        error={error}
        onRetry={() =>
          fetchDashboard()
        }
      />
    );
  }

  /* =======================================================
     SUMMARY DATA
  ======================================================= */

  const totalCustomers =
    Number(
      data?.totalCustomers ??
        data?.customers?.length ??
        0
    );

  const totalBookings =
    Number(
      data?.totalBookings ??
        data?.totalReservations ??
        data?.bookings?.length ??
        0
    );

  const totalReviews =
    Number(
      data?.totalReviews ??
        data?.reviews?.length ??
        0
    );

  /* =======================================================
     GUEST DATA
  ======================================================= */

  const adults =
    Number(
      data?.guests?.adults ??
        data?.adults ??
        0
    );

  const children =
    Number(
      data?.guests?.children ??
        data?.children ??
        0
    );

  const babies =
    Number(
      data?.guests?.babies ??
        data?.babies ??
        0
    );

  const totalGuests =
    Number(
      data?.guests?.totalGuests ??
        data?.guests?.total ??
        data?.totalGuests ??
        adults +
          children +
          babies
    );

  /* =======================================================
     SEGMENTATION DATA
  ======================================================= */

  const segmentation =
    data?.customerSegmentation ??
    data?.segmentation ??
    {};

  const budgetCustomers =
    Number(
      segmentation?.budget ??
        segmentation?.budgetCustomers ??
        data?.segments?.segment1 ??
        0
    );

  const regularCustomers =
    Number(
      segmentation?.regular ??
        segmentation?.regularCustomers ??
        data?.segments?.segment2 ??
        0
    );

  const premiumCustomers =
    Number(
      segmentation?.premium ??
        segmentation?.premiumCustomers ??
        data?.segments?.segment3 ??
        0
    );

  /* =======================================================
     SEGMENT TOTAL
  ======================================================= */

  const segmentationTotal =
    budgetCustomers +
    regularCustomers +
    premiumCustomers;

  /* =======================================================
     SEGMENT PERCENTAGE
  ======================================================= */

  const getPercentage = (value) => {
    if (!segmentationTotal) {
      return 0;
    }

    return Number(
      (
        (Number(value) /
          segmentationTotal) *
        100
      ).toFixed(1)
    );
  };

  const budgetPercentage =
    getPercentage(
      budgetCustomers
    );

  const regularPercentage =
    getPercentage(
      regularCustomers
    );

  const premiumPercentage =
    getPercentage(
      premiumCustomers
    );

  /* =======================================================
     CHECK IF DATA EXISTS
  ======================================================= */

  const hasCustomerData =
    totalCustomers > 0 ||
    totalBookings > 0 ||
    totalReviews > 0 ||
    adults > 0 ||
    children > 0 ||
    babies > 0 ||
    segmentationTotal > 0;

  /* =======================================================
     DASHBOARD
  ======================================================= */

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-slate-800">

      {/* ===================================================
          GLOBAL STYLE
      ==================================================== */}

      <style>{`
        @keyframes dashboardFadeIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes dashboardFadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes dashboardScale {
          from {
            opacity: 0;
            transform: scale(0.96);
          }

          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes dashboardShimmer {
          0% {
            transform: translateX(-100%);
          }

          100% {
            transform: translateX(100%);
          }
        }

        .dashboard-fade-in {
          animation:
            dashboardFadeIn
            0.6s
            ease-out
            both;
        }

        .dashboard-fade-up {
          animation:
            dashboardFadeUp
            0.65s
            ease-out
            both;
        }

        .dashboard-scale {
          animation:
            dashboardScale
            0.55s
            ease-out
            both;
        }

        .dashboard-shimmer {
          position: relative;
          overflow: hidden;
        }

        .dashboard-shimmer::after {
          content: "";
          position: absolute;
          inset: 0;
          width: 50%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255,255,255,0.15),
            transparent
          );
          animation:
            dashboardShimmer
            2.5s
            infinite;
        }

        .dashboard-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .dashboard-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        .dashboard-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 999px;
        }
      `}</style>

      {/* ===================================================
          HEADER
      ==================================================== */}

      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto max-w-[1400px] px-5 py-4 sm:px-6 lg:px-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            {/* BRAND */}

            <div className="dashboard-fade-in flex items-center gap-4">
              <div className="group relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-xl text-white shadow-lg shadow-indigo-600/20 transition-all duration-500 hover:scale-105 hover:rotate-2">
                <span className="relative z-10">
                  🏨
                </span>

                <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>

              <div>
                <h1 className="text-xl font-extrabold tracking-tight text-slate-900">
                  Customer Dashboard
                </h1>

                <p className="mt-1 text-xs font-medium text-slate-500">
                  Customer overview & segmentation
                </p>
              </div>
            </div>

            {/* ACTIONS */}

            <div className="dashboard-fade-in flex gap-3">
              <button
                type="button"
                onClick={() =>
                  fetchDashboard(true)
                }
                disabled={
                  refreshing ||
                  clearing
                }
                className="group inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-200 hover:text-indigo-600 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
              >
                <FiRefreshCw
                  className={`h-4 w-4 transition-transform duration-500 ${
                    refreshing
                      ? "animate-spin"
                      : "group-hover:rotate-180"
                  }`}
                />

                {refreshing
                  ? "Refreshing..."
                  : "Refresh"}
              </button>

              <button
                type="button"
                onClick={
                  clearDashboard
                }
                disabled={
                  clearing ||
                  refreshing
                }
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-600 hover:shadow-lg hover:shadow-red-500/20 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {clearing ? (
                  <>
                    <FiRefreshCw className="h-4 w-4 animate-spin" />
                    Clearing...
                  </>
                ) : (
                  <>
                    <span>🗑</span>
                    Clear Bookings
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ===================================================
          MAIN
      ==================================================== */}

      <main className="mx-auto max-w-[1400px] px-5 py-7 sm:px-6 lg:px-10 lg:py-9">

        {/* =================================================
            ERROR BANNER
        ================================================= */}

        {error && (
          <div className="dashboard-scale mb-6 flex items-center justify-between gap-4 rounded-2xl border border-red-100 bg-red-50 px-5 py-4 text-sm text-red-700">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-red-500 shadow-sm">
                !
              </div>

              <span className="font-medium">
                {error}
              </span>
            </div>

            <button
              type="button"
              onClick={() =>
                setError("")
              }
              className="text-xs font-bold text-red-500 transition hover:text-red-700"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* =================================================
            HERO
        ================================================= */}

        <section className="dashboard-fade-up dashboard-shimmer relative mb-8 overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-950 p-7 shadow-xl shadow-indigo-950/10 sm:p-9 lg:p-10">

          {/* Background circles */}

          <div className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />

          <div className="pointer-events-none absolute right-20 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full border border-white/[0.04]" />

          <div className="relative max-w-3xl">

            {/* Badge */}

            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-indigo-200 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>

              Customer Intelligence
            </div>

            {/* Heading */}

            <h2 className="mt-5 text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.7rem]">
              Customer
              <span className="text-indigo-300">
                {" "}Overview
              </span>
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
              A clean view of customer activity,
              guest information and customer
              segmentation.
            </p>

            {/* Small stats inside hero */}

            <div className="mt-7 flex flex-wrap gap-3">
              <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-3.5 py-2 text-xs font-semibold text-slate-300 backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.1]">
                <FiCheckCircle className="h-4 w-4 text-emerald-400" />
                Dashboard Active
              </div>

              <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-3.5 py-2 text-xs font-semibold text-slate-300 backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.1]">
                <FiBarChart2 className="h-4 w-4 text-indigo-300" />
                Segmentation Enabled
              </div>
            </div>
          </div>
        </section>

        {!hasCustomerData ? (
          <EmptyState />
        ) : (
          <>
            {/* =============================================
                SUMMARY
            ============================================== */}

            <section className="mb-10">
              <SectionTitle
                title="Summary"
                subtitle="Key customer statistics"
                icon={FiActivity}
              />

              <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

                <SummaryCard
                  title="Total Customers"
                  value={totalCustomers}
                  subtitle="Customer records"
                  icon={FiUsers}
                  iconBackground="bg-indigo-50"
                  iconColor="text-indigo-600"
                  delay="80ms"
                />

                <SummaryCard
                  title="Total Bookings"
                  value={totalBookings}
                  subtitle="Booking records"
                  icon={FiCalendar}
                  iconBackground="bg-blue-50"
                  iconColor="text-blue-600"
                  delay="160ms"
                />

                <SummaryCard
                  title="Total Reviews"
                  value={totalReviews}
                  subtitle="Customer reviews"
                  icon={FiMessageSquare}
                  iconBackground="bg-violet-50"
                  iconColor="text-violet-600"
                  delay="240ms"
                />

              </div>
            </section>

            {/* =============================================
                GUEST INFORMATION
            ============================================== */}

            <section className="mb-10">
              <SectionTitle
                title="Guest Information"
                subtitle="Guest distribution"
                icon={FiUsers}
              />

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

                <GuestCard
                  title="Adults"
                  value={adults}
                  subtitle="Age 13+"
                  icon={FiUser}
                  iconBackground="bg-indigo-50"
                  iconColor="text-indigo-600"
                  delay="100ms"
                />

                <GuestCard
                  title="Children"
                  value={children}
                  subtitle="Age 2–12"
                  icon={FiUsers}
                  iconBackground="bg-orange-50"
                  iconColor="text-orange-600"
                  delay="180ms"
                />

                <GuestCard
                  title="Babies"
                  value={babies}
                  subtitle="Under 2"
                  icon={FiUserPlus}
                  iconBackground="bg-pink-50"
                  iconColor="text-pink-600"
                  delay="260ms"
                />

                <GuestCard
                  title="Total Guests"
                  value={totalGuests}
                  subtitle="All guests"
                  icon={FiUsers}
                  iconBackground="bg-emerald-50"
                  iconColor="text-emerald-600"
                  delay="340ms"
                />

              </div>
            </section>

            {/* =============================================
                CUSTOMER SEGMENTATION
            ============================================== */}

            <section className="mb-10">
              <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                <SectionTitle
                  title="Customer Segmentation"
                  subtitle="Customer distribution by segment"
                  icon={FiBarChart2}
                />

                <div className="mb-6 inline-flex items-center gap-2 self-start rounded-full border border-indigo-100 bg-indigo-50 px-3.5 py-2 text-[10px] font-bold uppercase tracking-wider text-indigo-700 sm:self-auto">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                  AI Segmentation
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

                <SegmentCard
                  title="Budget"
                  value={budgetCustomers}
                  description="Price-conscious customers"
                  icon={FiUser}
                  percentage={
                    budgetPercentage
                  }
                  type="budget"
                />

                <SegmentCard
                  title="Regular"
                  value={regularCustomers}
                  description="Regular customers"
                  icon={FiUsers}
                  percentage={
                    regularPercentage
                  }
                  type="regular"
                />

                <SegmentCard
                  title="Premium"
                  value={premiumCustomers}
                  description="High-value customers"
                  icon={FiAward}
                  percentage={
                    premiumPercentage
                  }
                  type="premium"
                />

              </div>
            </section>

            {/* =============================================
                SEGMENTATION SUMMARY
            ============================================== */}

            {segmentationTotal > 0 && (
              <section className="mb-10">
                <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md">

                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
                        Segmented Customers
                      </p>

                      <p className="mt-2 text-3xl font-black tracking-tight text-slate-900">
                        <AnimatedNumber
                          value={
                            segmentationTotal
                          }
                        />
                      </p>

                      <p className="mt-1 text-xs font-medium text-slate-400">
                        Total customers assigned to segments
                      </p>
                    </div>

                    {/* Mini distribution */}

                    <div className="flex flex-wrap items-center gap-3">

                      <div className="flex items-center gap-2 rounded-xl bg-amber-50 px-3 py-2 text-xs font-bold text-amber-700">
                        <span className="h-2 w-2 rounded-full bg-amber-500" />
                        Budget {budgetPercentage}%
                      </div>

                      <div className="flex items-center gap-2 rounded-xl bg-blue-50 px-3 py-2 text-xs font-bold text-blue-700">
                        <span className="h-2 w-2 rounded-full bg-blue-500" />
                        Regular {regularPercentage}%
                      </div>

                      <div className="flex items-center gap-2 rounded-xl bg-violet-50 px-3 py-2 text-xs font-bold text-violet-700">
                        <span className="h-2 w-2 rounded-full bg-violet-500" />
                        Premium {premiumPercentage}%
                      </div>

                    </div>
                  </div>

                  {/* Combined distribution bar */}

                  <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-100">
                    <div className="flex h-full w-full">

                      {budgetPercentage > 0 && (
                        <div
                          className="h-full bg-amber-500 transition-all duration-1000"
                          style={{
                            width: `${budgetPercentage}%`,
                          }}
                        />
                      )}

                      {regularPercentage > 0 && (
                        <div
                          className="h-full bg-blue-500 transition-all duration-1000"
                          style={{
                            width: `${regularPercentage}%`,
                          }}
                        />
                      )}

                      {premiumPercentage > 0 && (
                        <div
                          className="h-full bg-violet-500 transition-all duration-1000"
                          style={{
                            width: `${premiumPercentage}%`,
                          }}
                        />
                      )}

                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* =============================================
                DATA CONTROL
            ============================================== */}

            <section className="mb-8">
              <div className="rounded-[1.5rem] border border-slate-800 bg-slate-900 p-5 text-white shadow-lg">

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                      <FiCheckCircle className="h-5 w-5" />
                    </div>

                    <div>
                      <h4 className="text-sm font-bold">
                        Dashboard Data Control
                      </h4>

                      <p className="mt-1 text-xs text-slate-400">
                        Clear booking records while keeping customer reviews safe.
                      </p>
                    </div>
                  </div>

                  <div className="text-xs font-semibold text-slate-500">
                    {clearing
                      ? "Updating..."
                      : "System Ready"}
                  </div>

                </div>
              </div>
            </section>
          </>
        )}

        {/* =================================================
            FOOTER
        ================================================= */}

        <footer className="border-t border-slate-200 pt-6 text-center">
          <p className="text-xs font-semibold text-slate-500">
            Hotel Management AI Dashboard
          </p>

          <p className="mt-1 text-[11px] font-medium text-slate-400">
            Customer overview & segmentation
          </p>
        </footer>

      </main>
    </div>
  );
};

export default CustomerDashboard;