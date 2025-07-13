"use client";
import { AlertCircle } from "lucide-react";

interface ErrorDisplayProps {
  error: string;
  onRetry: () => void;
}

const ErrorDisplay = ({ error, onRetry }: ErrorDisplayProps) => {
  return (
    <div className="text-center py-8">
      <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
      <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
      <button
        onClick={onRetry}
        className="bg-red-600 dark:bg-red-700 hover:bg-red-700 dark:hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
      >
        Thử lại
      </button>
    </div>
  );
};

export default ErrorDisplay;
