import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Layout from "./components/Layout";
import CustomerSegmentation from "./pages/CustomerSegmentation";
import BookingCancellation from "./pages/BookingCancellation";
import CustomerDashboard from "./pages/CustomerDashboard";
import RevenueDashboard from "./pages/RevenueDashboard";
import ReviewForm from "./pages/ReviewForm";
import SentimentDashboard from "./pages/SentimentDashboard";
import Chatbot from "./components/Chatbot";

function App() {
  const [reviews, setReviews] = useState(() => {
    const savedReviews = localStorage.getItem("hotelReviews");

    return savedReviews
      ? JSON.parse(savedReviews)
      : [];
  });

  const handleReviewAnalyzed = (newReview) => {
    setReviews((previousReviews) => {
      const updatedReviews = [
        newReview,
        ...previousReviews,
      ];

      localStorage.setItem(
        "hotelReviews",
        JSON.stringify(updatedReviews)
      );

      return updatedReviews;
    });
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>

          <Route
            path="/"
            element={
              <Navigate
                to="/review-form"
                replace
              />
            }
          />

          <Route
            path="/review-form"
            element={
              <ReviewForm
                onReviewAnalyzed={handleReviewAnalyzed}
              />
            }
          />

          <Route
            path="/sentiment-dashboard"
            element={
              <SentimentDashboard
                reviews={reviews}
              />
            }
          />

          <Route
            path="/customer-segmentation"
            element={<CustomerSegmentation />}
          />

          <Route
            path="/booking-cancellation"
            element={<BookingCancellation />}
          />

          <Route
            path="/revenue-dashboard"
            element={<RevenueDashboard />}
          />

          <Route
            path="/dashboard"
            element={<CustomerDashboard />}
          />

        </Route>
      </Routes>

      {/* Floating Chatbot */}
      <Chatbot />

    </BrowserRouter>
  );
}

export default App;