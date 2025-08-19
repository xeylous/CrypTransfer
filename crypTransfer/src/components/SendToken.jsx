import React, { useEffect, useMemo, useState } from "react";
import { useWeb3 } from "../providers/Web3Context.jsx";
import erc20Abi from "../utils/erc20Abi.js";

export default function SendToken() {
  const { web3, account } = useWeb3();
  const [token, setToken] = useState("");
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState(""); // human amount
  const [decimals, setDecimals] = useState(18);
  const [symbol, setSymbol] = useState("TOKEN");
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState("0");

  const contract = useMemo(() => {
    if (!web3 || !token) return null;
    return new web3.eth.Contract(erc20Abi, token);
  }, [web3, token]);

  useEffect(() => {
    const fetchMeta = async () => {
      if (!contract || !account) return;
      try {
        const [d, s, bal] = await Promise.all([
          contract.methods.decimals().call(),
          contract.methods.symbol().call(),
          contract.methods.balanceOf(account).call()
        ]);
        setDecimals(Number(d));
        setSymbol(s);
        setBalance(bal);
      } catch (e) {
        console.warn("Failed to read token metadata", e);
      }
    };
    fetchMeta();
  }, [contract, account]);

  const humanBalance = useMemo(() => {
    if (!web3) return "0";
    try {
      return (Number(balance) / 10 ** decimals).toString();
    } catch {
      return "0";
    }
  }, [balance, decimals, web3]);

  const sendToken = async (e) => {
    e.preventDefault();
    if (!contract || !account) return alert("Connect wallet & enter token address");
    try {
      setLoading(true);
      const value = BigInt(Math.floor(Number(amount) * 10 ** decimals)).toString();
      const gas = await contract.methods.transfer(to, value).estimateGas({ from: account });
      const tx = await contract.methods.transfer(to, value).send({ from: account, gas });

      // success toast via window event (caught by TxToast)
      window.dispatchEvent(new CustomEvent("tx-toast", {
        detail: {
          title: `Sent ${amount} ${symbol}`,
          hash: tx?.transactionHash || "",
          message: `to ${to}`
        }
      }));

      setTo("");
      setAmount("");
    } catch (err) {
      console.error(err);
      alert(err?.message || "Token transfer failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={sendToken} className="space-y-4">
      <div>
        <label className="block mb-2 text-sm text-gray-300">Token Contract Address</label>
        <input
          className="input"
          placeholder="0xYourTokenAddress..."
          value={token}
          onChange={(e) => setToken(e.target.value)}
          required
        />
        {account && token && (
          <p className="text-xs text-gray-400 mt-2">
            Balance: <span className="text-gray-200">{humanBalance} {symbol}</span>
          </p>
        )}
      </div>

      <div>
        <label className="block mb-2 text-sm text-gray-300">Recipient Address</label>
        <input
          className="input"
          placeholder="0xRecipient..."
          value={to}
          onChange={(e) => setTo(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block mb-2 text-sm text-gray-300">Amount ({symbol})</label>
        <input
          className="input"
          placeholder="10"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          step="any"
          min="0"
          required
        />
      </div>

      <button className="btn w-full" disabled={loading}>
        {loading ? "Sending..." : `Send ${symbol}`}
      </button>
    </form>
  );
}
