// src/components/Docs.jsx
import React from "react";

export default function Docs() {
  return (
    <section className="bg-gray-900 text-gray-100 py-16 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-purple-400">
          Welcome to CrypTransfer Documentation
        </h1>

        <p className="text-lg leading-relaxed mb-6">
          Building your first Web3 project can feel like stepping into a brand new
          world. At first it might look confusing with all these words like smart
          contracts, tokens and transactions. But trust me, once you take that
          first step it becomes exciting and full of possibilities. This document
          is here to be your friendly companion while you explore our
          CrypTransfer app. 
        </p>

        <h2 className="text-2xl font-semibold text-blue-400 mb-4">
          What is CrypTransfer
        </h2>
        <p className="mb-6">
          CrypTransfer is a small but powerful decentralized application. Its
          purpose is simple: help you send Ether or tokens from your wallet to
          another person in a safe and transparent way. It works directly with
          your MetaMask wallet and uses the Ethereum blockchain so every
          transaction is secure and recorded forever.
        </p>

        <h2 className="text-2xl font-semibold text-blue-400 mb-4">
          How it Works
        </h2>
        <p className="mb-6">
          Once you connect your MetaMask wallet, you can choose between sending
          Ether or sending a token. You simply type in the address of the
          receiver and the amount you want to send. When you hit the send
          button, MetaMask will ask for your confirmation. If everything goes
          right you will see a popup message in our app telling you the
          transaction was successful. If something goes wrong you will also get
          a clear message so you know what happened. 
        </p>

        <h2 className="text-2xl font-semibold text-blue-400 mb-4">
          Why We Built This
        </h2>
        <p className="mb-6">
          Many times newcomers to blockchain feel lost. We wanted to create
          something that feels welcoming and simple. With CrypTransfer you do
          not need to worry about heavy technical words. It is like a friend who
          shows you how to walk before you run. We wanted to make the process of
          sending crypto feel as natural as sending a message.
        </p>

        <h2 className="text-2xl font-semibold text-blue-400 mb-4">
          Features You Will Love
        </h2>
        <ul className="list-disc pl-6 space-y-3 mb-6">
          <li>A clean and colorful interface that works on mobile, tablet and laptop</li>
          <li>Easy switching between sending Ether and tokens</li>
          <li>Instant feedback through a popup toast after every transaction</li>
          <li>Transparent and secure as everything is powered by blockchain</li>
          <li>A beginner friendly design so you learn while using</li>
        </ul>

        <h2 className="text-2xl font-semibold text-blue-400 mb-4">
          A Small Note from the Creator
        </h2>
        <p className="mb-6 italic">
          When I built this project I imagined someone completely new to Web3
          trying it out. I wanted them to smile when they realize that sending
          crypto is not complicated at all. I hope you feel the same joy while
          exploring CrypTransfer and maybe this will spark the beginning of your
          own journey into building blockchain projects.
        </p>

        <p className="text-center text-purple-300 font-semibold mt-10">
          Happy learning and happy building ✨
        </p>
      </div>
    </section>
  );
}
