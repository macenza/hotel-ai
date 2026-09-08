import { useEffect, useState } from "react";

const API_URL = "http://localhost:4000";

function CustomerSegmentation() {
  const [stats, setStats] = useState({
    total: 0,
    segment1: 0,
    segment2: 0,
    segment3: 0,
  });

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [clearing, setClearing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // =========================================================
  // FETCH CUSTOMER SEGMENTATION
  // =========================================================

  const fetchCustomerSegmentation = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/api/customer-segmentation`
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch customer segmentation data: ${response.status}`
        );
      }

      const data = await response.json();

      console.log(
        "CUSTOMER SEGMENTATION DATA:",
        data
      );

      setStats({
        total: data.total || 0,
        segment1: data.segments?.segment1 || 0,
        segment2: data.segments?.segment2 || 0,
        segment3: data.segments?.segment3 || 0,
      });

      setCustomers(
        Array.isArray(data.topCustomers)
          ? data.topCustomers
          : []
      );

    } catch (error) {
      console.error(
        "Customer segmentation error:",
        error
      );

      setError(
        error.message ||
        "Failed to load customer segmentation data."
      );

    } finally {
      setLoading(false);
    }
  };


  // =========================================================
  // INITIAL LOAD
  // =========================================================

  useEffect(() => {
    fetchCustomerSegmentation();
  }, []);


  // =========================================================
  // CLEAR ALL BOOKING / SEGMENTATION DATA
  // =========================================================

  const clearSegmentationData = async () => {

    const confirmed = window.confirm(
      "⚠️ WARNING\n\n" +
      "This will permanently delete ALL booking data used for customer segmentation.\n\n" +
      "Customer Segmentation, Customer Dashboard and booking-related analytics will become empty.\n\n" +
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
        `${API_URL}/api/customer-segmentation`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
          "Failed to clear segmentation data."
        );
      }

      // =====================================================
      // IMPORTANT
      // DO NOT SET DATA/STATE TO NULL
      // Update the existing UI with zero values instead.
      // =====================================================

      setStats({
        total: 0,
        segment1: 0,
        segment2: 0,
        segment3: 0,
      });

      setCustomers([]);

      setSuccess(
        "All booking and customer segmentation data has been cleared successfully."
      );

    } catch (error) {

      console.error(
        "Clear segmentation error:",
        error
      );

      setError(
        error.message ||
        "Failed to clear segmentation data."
      );

    } finally {
      setClearing(false);
    }
  };


  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">

        <div className="mx-auto max-w-7xl">

          <div className="rounded-3xl border border-slate-200 bg-white p-12 shadow-sm">

            <div className="flex flex-col items-center justify-center py-16">

              <div className="relative h-14 w-14">

                <div className="absolute inset-0 rounded-full border-4 border-indigo-100" />

                <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-indigo-600" />

              </div>

              <h2 className="mt-6 text-xl font-bold text-slate-900">
                Loading Customer Segmentation
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Analyzing customer booking data...
              </p>

            </div>

          </div>

        </div>

      </div>
    );
  }


  // =========================================================
  // MAIN UI
  // =========================================================

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">

      <div className="mx-auto max-w-7xl">


        {/* ===================================================
            HEADER
        ==================================================== */}

        <div className="mb-8">

          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

            {/* TITLE */}

            <div>

              <div className="flex items-center gap-3">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-2xl shadow-lg shadow-indigo-200">
                  🤖
                </div>

                <div>

                  <p className="text-sm font-semibold text-indigo-600">
                    Customer Analytics
                  </p>

                  <h1 className="text-2xl font-black text-slate-900 sm:text-3xl">
                    Customer Segmentation
                  </h1>

                </div>

              </div>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
                Automatically generated customer segments from
                hotel booking data using AI-powered analysis.
              </p>

            </div>


            {/* ACTION BUTTONS */}

            <div className="flex flex-wrap items-center gap-3">

              {/* REFRESH */}

              <button
                onClick={fetchCustomerSegmentation}
                disabled={clearing}
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-indigo-300 hover:text-indigo-600 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
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
                onClick={clearSegmentationData}
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
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3m-7 0h10"
                      />

                    </svg>

                    Clear Segmentation

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

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                ✓
              </div>

              <p className="text-sm font-semibold text-emerald-700">
                {success}
              </p>

            </div>

          </div>

        )}


        {/* ===================================================
            ERROR
        ==================================================== */}

        {error && (

          <div className="mb-6 rounded-2xl border border-rose-100 bg-rose-50 p-4">

            <div className="flex items-center gap-3">

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-100 font-bold text-rose-600">
                !
              </div>

              <p className="text-sm font-semibold text-rose-700">
                {error}
              </p>

            </div>

          </div>

        )}


        {/* ===================================================
            STATS CARDS
        ==================================================== */}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">


          {/* TOTAL */}

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg">

            <div className="flex items-start justify-between">

              <div>

                <p className="text-sm font-semibold text-slate-500">
                  Total Customers
                </p>

                <h2 className="mt-3 text-4xl font-black text-slate-900">
                  {stats.total}
                </h2>

              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-2xl">
                👥
              </div>

            </div>

            <p className="mt-5 text-xs font-semibold text-indigo-600">
              Booking records
            </p>

          </div>


          {/* BUDGET */}

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg">

            <div className="flex items-start justify-between">

              <div>

                <p className="text-sm font-semibold text-slate-500">
                  Budget Customers
                </p>

                <h2 className="mt-3 text-4xl font-black text-slate-900">
                  {stats.segment1}
                </h2>

              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-2xl">
                💰
              </div>

            </div>

            <p className="mt-5 text-xs font-semibold text-blue-600">
              Price-conscious customers
            </p>

          </div>


          {/* REGULAR */}

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg">

            <div className="flex items-start justify-between">

              <div>

                <p className="text-sm font-semibold text-slate-500">
                  Regular Customers
                </p>

                <h2 className="mt-3 text-4xl font-black text-slate-900">
                  {stats.segment2}
                </h2>

              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-2xl">
                ⭐
              </div>

            </div>

            <p className="mt-5 text-xs font-semibold text-emerald-600">
              Consistent booking activity
            </p>

          </div>


          {/* PREMIUM */}

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg">

            <div className="flex items-start justify-between">

              <div>

                <p className="text-sm font-semibold text-slate-500">
                  Premium Customers
                </p>

                <h2 className="mt-3 text-4xl font-black text-slate-900">
                  {stats.segment3}
                </h2>

              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-2xl">
                👑
              </div>

            </div>

            <p className="mt-5 text-xs font-semibold text-amber-600">
              High-value customers
            </p>

          </div>

        </div>


        {/* ===================================================
            TOP 20 CUSTOMERS
        ==================================================== */}

        <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

          {/* HEADER */}

          <div className="flex flex-col gap-3 border-b border-slate-100 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-xl">
                  👥
                </div>

                <div>

                  <h2 className="text-xl font-extrabold text-slate-900">
                    Top 20 Customers
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Latest customers processed by the segmentation system.
                  </p>

                </div>

              </div>

            </div>


            <span className="w-fit rounded-full bg-slate-100 px-4 py-2 text-xs font-bold text-slate-600">
              {customers.length} customers
            </span>

          </div>


          {/* CUSTOMER LIST */}

          {customers.length === 0 ? (

            <div className="px-6 py-20 text-center">

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-50 text-4xl">
                👥
              </div>

              <h3 className="mt-6 text-xl font-bold text-slate-900">
                No Customers Available
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                Customer segmentation data will appear here
                automatically after bookings are processed.
              </p>

            </div>

          ) : (

            <div className="divide-y divide-slate-100">

              {customers.slice(0, 20).map(
                (customer, index) => {

                  const segment =
                    String(
                      customer.segment || ""
                    ).toLowerCase();

                  let badgeClass =
                    "bg-slate-100 text-slate-600";

                  let icon = "👤";

                  if (
                    segment.includes("1") ||
                    segment.includes("budget")
                  ) {
                    badgeClass =
                      "bg-blue-50 text-blue-700";
                    icon = "💰";
                  }

                  else if (
                    segment.includes("2") ||
                    segment.includes("regular")
                  ) {
                    badgeClass =
                      "bg-emerald-50 text-emerald-700";
                    icon = "⭐";
                  }

                  else if (
                    segment.includes("3") ||
                    segment.includes("premium")
                  ) {
                    badgeClass =
                      "bg-amber-50 text-amber-700";
                    icon = "👑";
                  }

                  return (

                    <div
                      key={
                        customer.id ||
                        customer.booking_id ||
                        index
                      }
                      className="flex flex-col gap-4 px-6 py-5 transition hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between"
                    >

                      <div className="flex items-center gap-4">

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-black text-slate-600">
                          {index + 1}
                        </div>

                        <div>

                          <p className="font-bold text-slate-800">
                            {customer.name ||
                              `Customer ${index + 1}`}
                          </p>

                          <p className="mt-1 text-sm text-slate-500">
                            {customer.booking_id
                              ? `Booking #${customer.booking_id}`
                              : "Hotel customer"}
                          </p>

                        </div>

                      </div>


                      <span
                        className={`flex w-fit items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold ${badgeClass}`}
                      >

                        {icon}

                        {customer.segment ||
                          "Pending"}

                      </span>

                    </div>

                  );
                }
              )}

            </div>

          )}

        </div>


        {/* ===================================================
            DATA CONTROL NOTICE
        ==================================================== */}

        <div className="mt-8 rounded-2xl bg-slate-900 p-5 text-white">

          <div className="flex items-start gap-4">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-500/20 text-xl text-rose-400">
              🗑️
            </div>

            <div>

              <h4 className="font-bold">
                Segmentation Data Control
              </h4>

              <p className="mt-1 text-sm leading-6 text-slate-400">
                Clear Segmentation permanently removes booking
                records used for customer segmentation. Reviews
                remain completely untouched.
              </p>

            </div>

          </div>

        </div>


        {/* FOOTER */}

        <footer className="py-8 text-center">

          <p className="text-sm font-semibold text-slate-500">
            Hotel Management AI Dashboard
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Customer segmentation and intelligent analytics
          </p>

        </footer>

      </div>

    </div>
  );
}

export default CustomerSegmentation;