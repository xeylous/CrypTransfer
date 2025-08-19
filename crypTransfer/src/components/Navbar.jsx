import React, { useState } from "react";
import { useWeb3 } from "../providers/Web3Context.jsx";

export default function Navbar() {
  const { account, connect, chainId, disconnect, changeWallet } = useWeb3();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleWalletClick = () => setMenuOpen((prev) => !prev);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-zinc-800 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <a
          href="/">
            <img
              src="/cryptransfer.svg"
              alt="Cryptransfer Logo"
              className="w-9 h-9"
            />
          </a>
            <a
            href="/">
          <div>
            <h1 className="text-lg text-gray-300 font-semibold">CrypTransfer</h1>
            <p className="text-xs text-gray-400">• Transfer • the • Token</p>
          </div></a>
        </div>

        <div className="relative flex items-center gap-3">
          {chainId && (
            <span className="hidden sm:inline text-xs text-gray-300 border border-white/10 rounded px-2 py-1">
              Chain ID: {chainId}
            </span>
          )}

          {account ? (
            <div className="relative">
              <button
                onClick={handleWalletClick}
                className="text-sm text-gray-300 bg-white/10 px-3 py-2 rounded-lg border border-white/10"
              >
                {account.slice(0, 6)}…{account.slice(-4)}
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-zinc-900 border border-white/10 rounded shadow-lg">
                  {/* Use changeWallet from context */}
                  <button
                    onClick={() => {
                      changeWallet();
                      setMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-zinc-800"
                  >
                    Change Wallet
                  </button>

                  <button
                    onClick={() => {
                      disconnect();
                      setMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-zinc-800"
                  >
                    Disconnect
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button className="btn" onClick={connect}>
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
