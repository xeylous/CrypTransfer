import React from "react";
import { useWeb3 } from "../providers/Web3Context.jsx";
import {
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  XMarkIcon,
  ClipboardDocumentIcon,
} from "@heroicons/react/24/solid";

export default function TransactionDetailsCard({ onClose }) {
  const { lastTx, explorerFor, chainId } = useWeb3();

  if (!lastTx) return null;

  // Status style
  const getStatusInfo = () => {
    if (lastTx.status === "Pending")
      return { icon: <ClockIcon className="h-5 w-5 text-yellow-500" />, text: "Pending", color: "bg-yellow-100 text-yellow-800" };
    if (lastTx.status === "Success")
      return { icon: <CheckCircleIcon className="h-5 w-5 text-green-600" />, text: "Success", color: "bg-green-100 text-green-800" };
    return { icon: <XCircleIcon className="h-5 w-5 text-red-600" />, text: "Failed", color: "bg-red-100 text-red-800" };
  };

  const { icon, text, color } = getStatusInfo();

  // Copy helper
  const copyToClipboard = (value) => {
    navigator.clipboard.writeText(value);
    alert("Copied to clipboard ✅"); // you can replace with toast
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 animate-fadeIn"
      style={{ backdropFilter: "blur(10px)", backgroundColor: "rgba(0,0,0,0.55)" }}
    >
      {/* Card */}
      <div className="relative bg-white/90 backdrop-blur-xl text-gray-800 rounded-2xl shadow-2xl p-7 w-[90%] sm:w-[420px] animate-slideUp border border-gray-200/40">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition rounded-full p-1 hover:bg-gray-200"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>

        {/* Title */}
        <h3 className="text-2xl font-bold mb-6 text-center text-gray-900 tracking-tight">
          Transaction Details
        </h3>

        {/* Details */}
        <div className="space-y-4 text-sm">
          {/* From */}
          <div className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded-lg">
            <span className="font-medium text-gray-600">From:</span>
            <span className="truncate max-w-[200px] text-gray-800">{lastTx.from}</span>
            <button onClick={() => copyToClipboard(lastTx.from)} className="ml-2 text-gray-400 hover:text-gray-700">
              <ClipboardDocumentIcon className="w-5 h-5" />
            </button>
          </div>

          {/* To */}
          <div className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded-lg">
            <span className="font-medium text-gray-600">To:</span>
            <span className="truncate max-w-[200px] text-gray-800">{lastTx.to}</span>
            <button onClick={() => copyToClipboard(lastTx.to)} className="ml-2 text-gray-400 hover:text-gray-700">
              <ClipboardDocumentIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Gas */}
          {lastTx.gasUsed && (
            <div className="flex justify-between bg-gray-50 px-3 py-2 rounded-lg">
              <span className="font-medium text-gray-600">Gas Used:</span>
              <span>{lastTx.gasUsed}</span>
            </div>
          )}

          {/* Block */}
          {lastTx.blockNumber && (
            <div className="flex justify-between bg-gray-50 px-3 py-2 rounded-lg">
              <span className="font-medium text-gray-600">Block:</span>
              <span>{lastTx.blockNumber}</span>
            </div>
          )}

          {/* Status */}
          <div className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded-lg">
            <span className="font-medium text-gray-600">Status:</span>
            <span className={`flex items-center gap-2 px-2 py-1 rounded-full text-xs font-medium ${color}`}>
              {icon} {text}
            </span>
          </div>
        </div>

        {/* Explorer Link */}
        <a
          href={`${explorerFor(chainId)}${lastTx.hash}`}
          target="_blank"
          rel="noreferrer"
          className="mt-6 block text-center w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-2.5 rounded-lg shadow-md transition font-medium"
        >
          View on Explorer 🔗
        </a>
      </div>
    </div>
  );
}
