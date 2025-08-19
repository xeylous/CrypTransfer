import React, { useState, useEffect } from "react";

import SendEth from "../components/SendEth.jsx";
import SendToken from "../components/SendToken.jsx";
import TxToast from "../components/TxToast.jsx";
import { useWeb3 } from "../providers/Web3Context.jsx";
import Footer from "../components/Footer.jsx";
import About from "../components/About.jsx";
import Navbar from "../components/Navbar.jsx";
import TransactionDetailsCard from "../components/TransactionDetailsCard.jsx";

export default function Landing() {
  const [tab, setTab] = useState("eth"); // "eth" | "token"
  const { toast, lastTx, hideToast } = useWeb3(); // 👈 get lastTx
  const [showPopup, setShowPopup] = useState(false);

  // 👇 Automatically show popup when a new successful transaction occurs
  useEffect(() => {
    if (lastTx && lastTx.status === "Success") {
      setShowPopup(true);
    }
  }, [lastTx]);

  return (
    <>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-500 to-blue-500">
        <Navbar />

        <main className="flex-1 max-w-3xl mx-auto px-4 mt-8 mb-30">
          {/* Toast after success */}
          {toast?.open && (
            <TxToast
              message={toast.message || toast.title}
              type={toast.title.includes("Failed") ? "error" : "success"}
              onClose={hideToast} // ✅ wire the × button
            />
          )}

          <div className="w-full lg:w-[800px] xl:w-[700px] mx-auto mb-6">
            <button
              className={`tab ${tab === "eth" ? "tab-active" : ""}`}
              onClick={() => setTab("eth")}
            >
              Send ETH
            </button>
            <button
              className={`tab ${tab === "token" ? "tab-active" : ""}`}
              onClick={() => setTab("token")}
            >
              Send Token
            </button>
          </div>

          <div className="card">
            {tab === "eth" ? <SendEth /> : <SendToken />}
          </div>
        </main>

        {/* ✅ Auto-open Transaction Popup */}
        {showPopup && (
          <TransactionDetailsCard onClose={() => setShowPopup(false)} />
        )}

        <About />
        <Footer />
      </div>
    </>
  );
}
