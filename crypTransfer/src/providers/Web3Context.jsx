import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import Web3 from "web3";

const Web3Context = createContext(null);

const EXPLORERS = {
  1: "https://etherscan.io/tx/",
  5: "https://goerli.etherscan.io/tx/",
  11155111: "https://sepolia.etherscan.io/tx/",
  137: "https://polygonscan.com/tx/",
  80002: "https://www.oklink.com/amoy/tx/",
  8453: "https://basescan.org/tx/",
  10: "https://optimistic.etherscan.io/tx/",
  42161: "https://arbiscan.io/tx/",
};

/** Detects injected provider (MetaMask, etc.) */
function getProvider() {
  if (typeof window === "undefined") return null;
  const eth = window.ethereum;
  if (!eth) return null;
  if (eth.providers && Array.isArray(eth.providers)) {
    const mm = eth.providers.find((p) => p.isMetaMask);
    return mm || eth.providers[0] || eth;
  }
  return eth;
}

export function Web3Provider({ children }) {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [lastTx, setLastTx] = useState(null);
  const [toast, setToast] = useState({
    open: false,
    title: "",
    hash: "",
    message: "",
  }); 

  const listenersAttached = useRef(false);
  const providerRef = useRef(null);

/** Toast helpers */
const showToast = useCallback((title, hash = "", message = "") => {
  setToast({ open: true, title, hash, message });
}, []);

const hideToast = useCallback(() => {
  setToast({ open: false, title: "", hash: "", message: "" });
}, []);


  const explorerFor = useCallback(
    (cid) => EXPLORERS[cid] || "https://etherscan.io/tx/",
    []
  );

  /** Attach listeners (accounts + chain changes) */
  const attachListeners = useCallback(
    (provider) => {
      if (!provider || listenersAttached.current) return;
      provider.on("accountsChanged", (accs) =>
        setAccount(accs.length ? accs[0] : null)
      );
      provider.on("chainChanged", (cidHex) =>
        setChainId(parseInt(cidHex, 16))
      );
      listenersAttached.current = true;
    },
    []
  );

  /** Connect wallet */
  const connect = useCallback(async () => {
    const provider = getProvider();
    if (!provider) {
      alert("MetaMask not detected. Please install it.");
      return;
    }
    providerRef.current = provider;
    const w3 = new Web3(provider);
    setWeb3(w3);
    try {
      const accounts = await provider.request({ method: "eth_requestAccounts" });
      const selected = accounts[0];
      setAccount(selected);
      const cidHex = await provider.request({ method: "eth_chainId" });
      setChainId(parseInt(cidHex, 16));
      attachListeners(provider);
      localStorage.setItem("ct_connected", "1");
      showToast(
        "Wallet Connected",
        "",
        `${selected.slice(0, 6)}…${selected.slice(-4)}`
      );
    } catch (err) {
      showToast("Connection Failed", "", err.message);
    }
  }, [attachListeners, showToast]);

 /** Disconnect wallet */
const disconnect = useCallback(async () => {
  const provider = providerRef.current || getProvider();
  if (provider) {
    try {
      await provider.request({
        method: "wallet_revokePermissions",
        params: [{ eth_accounts: {} }],
      });
    } catch (err) {
      console.warn("Revoke permissions not supported:", err.message);
    }
  }

  setAccount(null);
  setWeb3(null);
  setChainId(null);
  setLastTx(null);
  localStorage.removeItem("ct_connected");
  showToast("Wallet Disconnected");
}, [showToast]);


  /** Switch wallet (ask user to select another account) */
const changeWallet = useCallback(async () => {
  const provider = providerRef.current || getProvider();
  if (!provider) {
    showToast("No Wallet Detected", "", "Install MetaMask");
    return;
  }
  try {
    const accounts = await provider.request({
      method: "wallet_requestPermissions",
      params: [{ eth_accounts: {} }],
    }).then(() => provider.request({ method: "eth_accounts" }));

    if (accounts && accounts.length > 0) {
      setAccount(accounts[0]);
      showToast(
        "Wallet Changed",
        "",
        `${accounts[0].slice(0, 6)}…${accounts[0].slice(-4)}`
      );
    }
  } catch (err) {
    showToast("Change Wallet Failed", "", err.message);
  }
}, [showToast]);

  /** Send transaction */
  const sendTransaction = useCallback(
    async ({ to, value }) => {
      if (!web3 || !account) {
        showToast("No Wallet", "", "Connect wallet first");
        return;
      }
      try {
        const tx = {
          from: account,
          to,
          value: web3.utils.toWei(value, "ether"),
        };

        const promiEvent = web3.eth.sendTransaction(tx);

        promiEvent
          .once("transactionHash", (hash) => {
            setLastTx({
              hash,
              from: account,
              to,
              status: "Pending",
            });
            showToast(
              "Transaction Pending",
              hash,
              "Click to view on explorer"
            );
          })
          .once("receipt", (receipt) => {
            setLastTx({
              hash: receipt.transactionHash,
              from: receipt.from,
              to: receipt.to,
              gasUsed: receipt.gasUsed,
              blockNumber: receipt.blockNumber,
              status: receipt.status ? "Success" : "Failed",
            });
            showToast(
              "Transaction Confirmed",
              receipt.transactionHash,
              receipt.status ? "Success ✅" : "Failed ❌"
            );
          })
          .on("error", (err) => {
            console.error("Tx failed:", err);
            setLastTx((prev) =>
              prev ? { ...prev, status: "Failed" } : null
            );
            showToast("Tx Failed", "", err.message);
          });
      } catch (err) {
        console.error("Tx failed:", err);
        showToast("Tx Failed", "", err.message);
      }
    },
    [web3, account, showToast]
  );

  /** Auto-reconnect if previously connected */
  useEffect(() => {
    const provider = getProvider();
    if (!provider) return;
    providerRef.current = provider;
    const wasConnected = localStorage.getItem("ct_connected") === "1";

    const init = async () => {
      const w3 = new Web3(provider);
      setWeb3(w3);
      const accs = await provider.request({ method: "eth_accounts" });
      if (accs && accs.length > 0) {
        setAccount(accs[0]);
        const cidHex = await provider.request({ method: "eth_chainId" });
        setChainId(parseInt(cidHex, 16));
        attachListeners(provider);
        if (wasConnected) {
          showToast(
            "Session Restored",
            "",
            `${accs[0].slice(0, 6)}…${accs[0].slice(-4)}`
          );
        }
      }
    };
    init();
  }, [attachListeners, showToast]);

  return (
    <Web3Context.Provider
      value={{
        web3,
        account,
        chainId,
        connect,
        sendTransaction,
        lastTx,
        disconnect,     // ✅ new
        changeWallet,
        explorerFor,
        toast,
        setLastTx,
        showToast,
        hideToast, 
      }}
    >
      {children}
    </Web3Context.Provider>
  );
}

export const useWeb3 = () => useContext(Web3Context);
