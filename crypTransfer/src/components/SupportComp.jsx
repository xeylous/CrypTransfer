import React from "react";
import { NavLink } from "react-router";
import { FaEnvelope, FaPhone, FaDiscord, FaTelegram } from "react-icons/fa";

const SupportComp = () => {
  return (
    <section className="bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white py-16 px-6 md:px-20">
      <div className="max-w-4xl mx-auto text-center">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Need Help? We're Here for You
        </h2>
        <p className="text-gray-400 mb-12">
          Whether you’re facing issues with transactions or have general questions 
          about our platform, our support team is always ready to help. Choose your 
          preferred way of connecting with us.
        </p>

        {/* Support Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Email */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <FaEnvelope className="text-3xl text-blue-400 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Email Support</h3>
            <p className="text-gray-400 mb-4">
              Reach out to us anytime through email. We usually reply within 24 hours.
            </p>
            <a
              href="mailto:testmailer9608@gmail.com"
              className="text-blue-400 hover:underline"
            >
              support@cryptransfer.com
            </a>
          </div>

          {/* Phone */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <FaPhone className="text-3xl text-green-400 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Phone Support</h3>
            <p className="text-gray-400 mb-4">
              Call us for urgent queries and direct help.
            </p>
            <p className="text-green-400">+91 00000000</p>
          </div>

          {/* Discord */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <FaDiscord className="text-3xl text-indigo-400 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Discord Community</h3>
            <p className="text-gray-400 mb-4">
              Join our community to connect with other users and get quick support.
            </p>
            <a
              href="https://discord.gg/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:underline"
            >
              Join Discord
            </a>
          </div>

          {/* Telegram */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <FaTelegram className="text-3xl text-sky-400 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Telegram Support</h3>
            <p className="text-gray-400 mb-4">
              Get real-time updates and quick responses via Telegram.
            </p>
            <a
              href="https://t.me/xeylous"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-400 hover:underline"
            >
              Join Telegram
            </a>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-12">
          <NavLink
            to="/"
            className="px-6 py-2 bg-blue-500 rounded-md hover:bg-blue-600 transition text-white font-semibold"
          >
            Back to Home
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default SupportComp;
