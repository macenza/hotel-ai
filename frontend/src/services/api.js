const API_BASE_URL = "http://127.0.0.1:8000";


// =====================================================
// REVIEW SENTIMENT ANALYSIS
// =====================================================

export const analyzeReview = async (data) => {
  const response = await fetch(
    `${API_BASE_URL}/api/review/analyze`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.detail || "Failed to analyze review."
    );
  }

  return result;
};


// =====================================================
// CUSTOMER SEGMENTATION
// =====================================================

export const segmentCustomer = async (data) => {
  const response = await fetch(
    `${API_BASE_URL}/api/customer-segmentation/predict`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.detail ||
        "Failed to perform customer segmentation."
    );
  }

  return result;
};


// =====================================================
// HOTEL AI CHATBOT
// =====================================================

export const sendChatMessage = async (message, options = {}) => {
  const response = await fetch(
    "/api/chatbot",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        role: options.role,
        userEmail: options.userEmail,
        context: options.context,
      }),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message ||
        result.detail ||
        "Failed to get chatbot response."
    );
  }

  return result;
};