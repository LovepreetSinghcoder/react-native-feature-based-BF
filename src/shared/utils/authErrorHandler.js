export const handleAuthError = (error) => {
  if (!error) return "Something went wrong";

  // Network Error
  if (error.message === "Network Error") {
    return "Please check your internet connection.";
  }

  // Server Error
  if (error.response?.status >= 500) {
    return "Server error. Please try again later.";
  }

  // Invalid Token
  if (error.response?.status === 401) {
    return "Authentication failed. Please login again.";
  }

  // User Cancelled Login
  if (error.message === "User cancelled login") {
    return "Login cancelled.";
  }

  return "Something went wrong. Please try again.";
};