"use client";
import { Toast, ToastType } from "@/types/toast";
import React, { createContext, useContext, useState } from "react";

interface ToastContextProps {
  /**
   * Hiện toast
   * @param message
   * @param type
   * @param duration
   */
  showToastMessage: (
    message: string,
    type: ToastType,
    duration?: number
  ) => void;
  toast: Toast;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [toast, setToast] = useState<Toast>({
    message: "",
    type: "success",
    show: false
  });

  const showToastMessage = (
    message: string,
    type: ToastType,
    duration: number = 3000
  ) => {
    setToast({ message, type, show: true });
    setTimeout(() => {
      setToast({ message: "", type: "success", show: false });
    }, duration);
  };

  return (
    <ToastContext.Provider value={{ showToastMessage, toast }}>
      {children}

      {/* Ô hiển thị toast đơn giản – tuỳ bạn tuỳ biến thêm */}
      {toast.show && (
        <div className="fixed bottom-4 right-4 z-50">
          <div
            className={`px-6 py-3 rounded-lg shadow-lg text-white max-w-sm ${
              toast.type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {toast.message}
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
};

/* ---------- Hook tiện dụng ---------- */
export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast phải dùng trong ToastProvider");
  return ctx;
};
