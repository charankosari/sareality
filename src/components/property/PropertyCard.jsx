import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function PropertyCard({ p, animateIndex = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: animateIndex * 0.1,
        ease: "easeOut",
      }}
      whileHover={{
        y: -4,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      className="group bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
    >
      <Link to={`/property/${p.id}`} className="block">
        <div className="relative h-48 bg-gray-100 overflow-hidden">
          <img
            src={p.image}
            alt={p.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>
        <div className="p-6">
          <h4 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
            {p.title}
          </h4>
          <div className="text-gray-600 text-sm mt-1">{p.location}</div>
          <div className="mt-4 flex items-center justify-between">
            <div className="font-bold text-xl text-gray-900">{p.price}</div>
            <div className="text-sm text-gray-500 flex items-center gap-2">
              <span className="flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                {p.beds}
              </span>
              <span className="flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
                {p.baths}
              </span>
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-500">{p.area}</div>
        </div>
      </Link>
    </motion.article>
  );
}
