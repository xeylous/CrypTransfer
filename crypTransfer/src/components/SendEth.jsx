import React, { useState } from "react";
import { useWeb3 } from "../providers/Web3Context.jsx";

export default function SendEth() {
  const { web3, account, showToast, setLastTx } = useWeb3(); // ✅ include setLastTx
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState(""); 
  const [loading, setLoading] = useState(false);

  const sendEth = async (e) => {
    e.preventDefault();
    if (!web3 || !account) {
      showToast("Error", "", "Please connect your wallet first", "error");
      return;
    }

    try {
      setLoading(true);
      const valueWei = web3.utils.toWei(amount || "0", "ether");

      const tx = await web3.eth.sendTransaction({
        from: account,
        to,
        value: valueWei,
      });

      // ✅ Update Context so TransactionDetailsCard can display
      setLastTx({
        from: tx.from,
        to: tx.to,
        hash: tx.transactionHash,
        status: "Success",
      });

      // ✅ Success Toast
      showToast(
        `Sent ${amount} ETH`,
        tx?.transactionHash,
        `Transaction successful! Sent to ${to}`,
        "success"
      );

      setTo("");
      setAmount("");
    } catch (err) {
      console.error(err);

      // ❌ Error Toast
      showToast(
        "Transaction Failed",
        "",
        err?.message || "Something went wrong",
        "error"
      );

      // ✅ Update context on failure
      setLastTx({
        from: account,
        to,
        hash: null,
        status: "Failed",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={sendEth} className="space-y-4">
      <div>
        <label className="block mb-2 text-sm text-gray-100">
          Recipient Address
        </label>
        <input
          className="input placeholder:text-gray-300"
          placeholder="0xRecipient..."
          value={to}
          onChange={(e) => setTo(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block mb-2 text-sm text-gray-100">Amount (ETH)</label>
        <input
          className="input placeholder:text-gray-300"
          placeholder="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          step="any"
          min="0"
          required
        />
      </div>

      <button className="btn w-full" disabled={loading}>
        {loading ? "Sending..." : "Send ETH"}
      </button>
    </form>
  );
}
