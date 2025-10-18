import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container mx-auto px-5 py-24 text-center">
      <h2 className="text-2xl font-semibold">Page not found</h2>
      <p className="muted mt-2">Sorry — we couldn't find that page.</p>
      <Link
        to="/"
        className="inline-block mt-6 bg-black text-white px-4 py-2 rounded-lg"
      >
        Return home
      </Link>
    </div>
  );
}
