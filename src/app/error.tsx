"use client";
import { AlertTriangle } from "lucide-react";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const ErrorPage: React.FC<ErrorPageProps> = ({ error, reset }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-lg w-full text-center border border-red-200">
        <div className="flex justify-center mb-4">
          <AlertTriangle className="w-12 h-12 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-red-600 mb-2">
          Something went wrong!
        </h1>
        <p className="text-gray-700 mb-4">{error.message}</p>

        <button
          onClick={() => reset()}
          className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
        >
          🔄 Try Again
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
