import { useEffect, useRef } from "react";
import { Alert } from "react-native";
import { useAppSelector } from "@store/hooks";
import { useAlert } from "../feedback/alert/useAlert";

export const useOfflineAlert = () => {
  const { showAlert } = useAlert();
  const isOffline = useAppSelector((state) => state.network.isOffline);
  const hasShownRef = useRef(false);

  useEffect(() => {
    if (isOffline && !hasShownRef.current) {
      showAlert({
        title: "Network Error",
        message: "Check your internet connection!",
        confirmText: "Ok",
        variant: "error",
      });

      hasShownRef.current = true;
    } else if (!isOffline) {
      hasShownRef.current = false; // reset for next offline
    }
  }, [isOffline]);

  return null;
};
