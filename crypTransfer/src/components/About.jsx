import React from "react";

export default function About() {
  return (
    <section className="max-w-3xl mx-auto px-4 py-10 text-center">
      <h2 className="text-3xl font-bold text-white mb-4">🚀 About CrypTransfer</h2>
      <p className="text-lg text-gray-200 leading-relaxed">
        <span className="font-semibold text-yellow-300">CrypTransfer</span> is a
        simple and secure Web3 application that lets you send{" "}
        <span className="font-semibold">ETH</span> or{" "}
        <span className="font-semibold">ERC-20 tokens</span> directly to any
        Ethereum address using your MetaMask wallet.
      </p>
      <p className="mt-4 text-gray-200">
        It is designed with{" "}
        <span className="font-semibold text-purple-300">React</span>,{" "}
        <span className="font-semibold text-blue-300">Tailwind CSS</span>, and{" "}
        <span className="font-semibold text-green-300">Web3.js</span> to give
        you a fast, responsive, and modern Web3 experience.
      </p>
      <p className="mt-4 text-gray-300 italic">
        Connect your wallet, choose ETH or Token transfer, enter the recipient’s
        address, and send in just one click.
      </p>
    </section>
  );
}
