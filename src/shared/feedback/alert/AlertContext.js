import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
} from "react";
import { useColorScheme } from "react-native";

const AlertContext = createContext();

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};

export const AlertProvider = ({ children }) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const [alertQueue, setAlertQueue] = useState([]);
  const [currentAlert, setCurrentAlert] = useState(null);
  const timeoutRef = useRef(null);

  const showAlert = useCallback(
    (config) => {
      const alertConfig = {
        id: Date.now() + Math.random(), // unique id
        visible: true,
        title: "",
        message: "",
        confirmText: "OK",
        cancelText: "Cancel",
        onConfirm: null,
        onCancel: null,
        variant: "info", // default variant
        ...config,
      };

      // Check for duplicate alerts (same title and message)
      const isDuplicate =
        alertQueue.some(
          (alert) =>
            alert.title === alertConfig.title &&
            alert.message === alertConfig.message,
        ) ||
        (currentAlert &&
          currentAlert.title === alertConfig.title &&
          currentAlert.message === alertConfig.message);

      if (isDuplicate) {
        return; // Prevent duplicate alerts
      }

      if (currentAlert) {
        // Queue the alert
        setAlertQueue((prev) => [...prev, alertConfig]);
      } else {
        // Show immediately
        setCurrentAlert(alertConfig);
      }
    },
    [alertQueue, currentAlert],
  );

  const hideAlert = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    setCurrentAlert(null);

    // Show next alert from queue after a brief delay
    setTimeout(() => {
      setAlertQueue((prev) => {
        if (prev.length > 0) {
          const nextAlert = prev[0];
          setCurrentAlert(nextAlert);
          return prev.slice(1);
        }
        return prev;
      });
    }, 300); // Delay to allow exit animation
  }, []);

  const handleConfirm = useCallback(() => {
    const onConfirm = currentAlert?.onConfirm;
    hideAlert();
    if (onConfirm) {
      // Delay callback to allow animation to complete
      timeoutRef.current = setTimeout(() => {
        onConfirm();
        timeoutRef.current = null;
      }, 300);
    }
  }, [currentAlert, hideAlert]);

  const handleCancel = useCallback(() => {
    const onCancel = currentAlert?.onCancel;
    hideAlert();
    if (onCancel) {
      timeoutRef.current = setTimeout(() => {
        onCancel();
        timeoutRef.current = null;
      }, 300);
    }
  }, [currentAlert, hideAlert]);

  const value = {
    showAlert,
    hideAlert,
    handleConfirm,
    handleCancel,
    currentAlert,
    isDark,
  };

  return (
    <AlertContext.Provider value={value}>{children}</AlertContext.Provider>
  );
};
