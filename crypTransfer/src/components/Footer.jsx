import React from "react";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 py-6 mt-12 ">
      <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between">
        
        {/* Brand */}
        <h1 className="text-lg font-bold text-white">
          @CrypTransfer
        </h1>

        {/* Links */}
        <div className="flex gap-6 mt-4 sm:mt-0">
          <a
            href="/docs"
            className="hover:text-purple-400 transition-colors"
          >
            Docs
          </a>
          <a
            href="https://github.com/xeylous"
            className="hover:text-purple-400 transition-colors"
          >
            GitHub
          </a>
          <a
            href="/support"
            className="hover:text-purple-400 transition-colors"
          >
            Support
          </a>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="text-center text-sm text-gray-500 mt-4 border-t border-gray-800 pt-4">
        Built with ❤️ by Xeylous
      </div>
    </footer>
  );
}



