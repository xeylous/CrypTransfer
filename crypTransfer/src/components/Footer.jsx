import React from "react";
import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 py-6 mt-12">
      <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between">
        
        {/* Brand */}
        <h1 className="text-lg font-bold text-white">@CrypTransfer</h1>

        {/* Links */}
        <div className="flex gap-6 mt-4 sm:mt-0">
          {/* Internal routes use Link */}
          <Link
            to="/docs"
            className="hover:text-purple-400 transition-colors"
          >
            Docs
          </Link>
          {/* External link stays as <a> */}
          <a
            href="https://github.com/xeylous"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-400 transition-colors"
          >
            GitHub
          </a>
          <Link
            to="/support"
            className="hover:text-purple-400 transition-colors"
          >
            Support
          </Link>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="text-center text-sm text-gray-500 mt-4 border-t border-gray-800 pt-4">
        Built with ❤️ by Xeylous
      </div>
    </footer>
  );
}
