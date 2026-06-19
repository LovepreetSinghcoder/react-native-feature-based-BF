import React from "react";
import { useAlert } from "./AlertContext";
import AppAlert from "@feedback/AppAlert";

export default function GlobalAlert() {
  const { currentAlert, handleConfirm, handleCancel } = useAlert();

  if (!currentAlert) return null;

  return (
    <AppAlert
      pointerEvents="auto"
      visible={currentAlert.visible}
      title={currentAlert.title}
      message={currentAlert.message}
      confirmText={currentAlert.confirmText}
      cancelText={currentAlert.cancelText}
      variant={currentAlert.variant}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
    />
  );
}
