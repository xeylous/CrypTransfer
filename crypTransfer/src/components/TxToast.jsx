import React from "react";

export default function TxToast({ message, type, onClose }) {
  return (
    <div
      className={`fixed bottom-6 right-6 px-6 py-3 rounded shadow-lg transition-all flex items-center justify-between gap-4
      ${type === "error" ? "bg-red-600" : "bg-green-600"} text-white`}
    >
      <span>{message}</span>

      {/* Close Button */}
      <button
        onClick={onClose}
        className="text-white hover:text-gray-200 text-xl leading-none focus:outline-none"
      >
        &times;
      </button>
    </div>
  );
}
