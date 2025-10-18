import React from "react";
import { motion } from "framer-motion";
import PropertyCard from "./PropertyCard";

function SkeletonCard() {
  return (
    <div className="animate-pulse bg-white border rounded-lg overflow-hidden h-56" />
  );
}

export default function PropertyGrid({ items = [], loading = false }) {
  if (loading) {
    return (
      <section className="container mx-auto px-5 py-8">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </section>
    );
  }

  if (!items || items.length === 0) {
    return (
      <section className="container mx-auto px-5 py-12 text-center">
        <div className="max-w-xl mx-auto">
          <h3 className="text-xl font-semibold">No properties found</h3>
          <p className="text-gray-600 mt-2">
            Try adjusting the filters or check back later.
          </p>
        </div>
      </section>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="container mx-auto px-5 py-8"
    >
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p, idx) => (
          <PropertyCard key={p.id} p={p} animateIndex={idx} />
        ))}
      </div>
    </motion.section>
  );
}
