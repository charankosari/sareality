import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import PropertyGrid from "../components/property/PropertyGrid";
import { fetchListings } from "../hooks/useLocalData";

export default function Listings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchListings()
      .then((data) => setListings(data || []))
      .catch((err) => {
        console.error("Failed to load listings", err);
        setListings([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const search = searchParams.get("search") || "";
  const city = searchParams.get("city") || "";
  const minBeds = parseInt(searchParams.get("beds") || "0", 10) || 0;

  const filtered = listings.filter((l) => {
    const matchesSearch = search
      ? l.title.toLowerCase().includes(search.toLowerCase()) ||
        l.location.toLowerCase().includes(search.toLowerCase()) ||
        l.description.toLowerCase().includes(search.toLowerCase())
      : true;

    const matchesCity = city
      ? l.location.toLowerCase().includes(city.toLowerCase())
      : true;
    const matchesBeds = minBeds ? l.beds >= minBeds : true;

    return matchesSearch && matchesCity && matchesBeds;
  });

  function applyFilter(e) {
    e.preventDefault();
    const form = e.target;
    const searchVal = form.search?.value?.trim() || "";
    const cityVal = form.city?.value?.trim() || "";
    const bedsVal = form.beds?.value || "";

    const next = {};
    if (searchVal) next.search = searchVal;
    if (cityVal) next.city = cityVal;
    if (bedsVal) next.beds = bedsVal;
    setSearchParams(next);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50"
    >
      <div className="container mx-auto px-5 py-8">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Luxury Properties
          </h1>
          <p className="text-gray-600">
            Discover your perfect home from our curated collection
          </p>
        </motion.div>

        {/* Mobile Filter Toggle */}
        <div className="md:hidden mb-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowFilters(!showFilters)}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z"
              />
            </svg>
            {showFilters ? "Hide Filters" : "Show Filters"}
          </motion.button>
        </div>

        {/* Search and Filter Form */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`bg-white rounded-2xl shadow-lg p-6 mb-8 ${
            showFilters ? "block" : "hidden md:block"
          }`}
        >
          <form
            onSubmit={applyFilter}
            className="space-y-4 md:space-y-0 md:flex md:items-end md:gap-4"
          >
            {/* Search Input */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Properties
              </label>
              <input
                name="search"
                defaultValue={search}
                placeholder="Search by title, location, or description"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* City Input */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City
              </label>
              <input
                name="city"
                defaultValue={city}
                placeholder="Enter city"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Beds Select */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bedrooms
              </label>
              <select
                name="beds"
                defaultValue={minBeds}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
                <option value="5">5+</option>
              </select>
            </div>

            {/* Filter Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full md:w-auto bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Apply Filters
            </motion.button>
          </form>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-6"
        >
          <p className="text-gray-600">
            {loading
              ? "Loading..."
              : `Showing ${filtered.length} of ${listings.length} properties`}
          </p>
        </motion.div>

        {/* Property Grid */}
        <PropertyGrid items={filtered} loading={loading} />
      </div>
    </motion.div>
  );
}
