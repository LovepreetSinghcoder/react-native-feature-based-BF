export const handleError = (error) => {
  if (!error) return "Something went wrong";

  // Network Error
  if (error.message === "Network Error") {
    return "Please check your internet connection.";
  }

  // Server Error
  if (error.response?.status >= 500) {
    return "Server error. Please try again later.";
  }
}