// shared/hooks/useAlert.js
import { useAlert as useAlertContext } from "./AlertContext";

export const useAlert = () => {
  const { showAlert } = useAlertContext();

  return {
    showAlert,
  };
};
