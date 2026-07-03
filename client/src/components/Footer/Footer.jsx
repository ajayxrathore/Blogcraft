import React from "react";
import { Link } from "react-router-dom";
import { Logo } from "../index";

function Footer() {
  return (
    <footer className="w-full bg-neutral-900 border-t border-neutral-800 py-12 text-neutral-400">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 pb-8 border-b border-neutral-800">
          <div className="max-w-md">
            <div className="mb-4 inline-flex items-center">
              <Logo width="100px" />
            </div>
            <p className="text-sm leading-relaxed text-neutral-400">
              Share your learning, thoughts and experience. Stay curious and
              keep blogging
            </p>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm font-medium">
            <Link
              to="/"
              className="transition-colors duration-200 hover:text-white"
            >
              Home
            </Link>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>&copy; {new Date().getFullYear()}. Ajay Rathore</p>
          <p className="italic">Built for Bloggers.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
