import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fetchListingById } from "../hooks/useLocalData";

function LoadingSkeleton() {
  return (
    <div className="container mx-auto px-5 py-12">
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="animate-pulse bg-gray-200 rounded-xl h-96"></div>
          <div className="grid grid-cols-3 gap-4">
            <div className="animate-pulse bg-gray-200 rounded-lg h-24"></div>
            <div className="animate-pulse bg-gray-200 rounded-lg h-24"></div>
            <div className="animate-pulse bg-gray-200 rounded-lg h-24"></div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="animate-pulse bg-gray-200 rounded-lg h-8"></div>
          <div className="animate-pulse bg-gray-200 rounded-lg h-4"></div>
          <div className="animate-pulse bg-gray-200 rounded-lg h-32"></div>
          <div className="animate-pulse bg-gray-200 rounded-lg h-12"></div>
        </div>
      </div>
    </div>
  );
}

export default function PropertyPage() {
  const { id } = useParams();
  const [prop, setProp] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchListingById(id)
      .then((data) => {
        setProp(data);
      })
      .catch((err) => {
        console.error("Failed to load property:", err);
        setProp(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) return <LoadingSkeleton />;

  if (!prop) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-5 py-24 text-center"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Property Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          Sorry, we couldn't find the property you're looking for.
        </p>
        <Link
          to="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Return Home
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50"
    >
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-5 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link
              to="/"
              className="text-gray-500 hover:text-blue-600 transition-colors"
            >
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link
              to="/listings"
              className="text-gray-500 hover:text-blue-600 transition-colors"
            >
              Listings
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{prop.title}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-5 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Main Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative rounded-2xl overflow-hidden shadow-lg"
            >
              <img
                src={prop.image}
                alt={prop.title}
                className="w-full h-96 lg:h-[500px] object-cover"
                loading="lazy"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 text-sm font-medium text-gray-900">
                Featured
              </div>
            </motion.div>

            {/* Thumbnail Images */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-3 gap-4"
            >
              {[prop.image, prop.image, prop.image].map((img, idx) => (
                <div
                  key={idx}
                  className="relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <img
                    src={img}
                    alt={`${prop.title} ${idx + 1}`}
                    className="w-full h-24 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </motion.div>

            {/* Property Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-2xl p-8 shadow-sm"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                About This Property
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                {prop.description}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {prop.beds}
                  </div>
                  <div className="text-sm text-gray-600">Bedrooms</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {prop.baths}
                  </div>
                  <div className="text-sm text-gray-600">Bathrooms</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {prop.area}
                  </div>
                  <div className="text-sm text-gray-600">Square Feet</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">2024</div>
                  <div className="text-sm text-gray-600">Built</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-2xl p-8 shadow-sm sticky top-24"
            >
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {prop.price}
                </div>
                <div className="text-lg text-gray-600 mb-4">{prop.title}</div>
                <div className="text-gray-500">{prop.location}</div>
              </div>

              <div className="space-y-4 mb-8">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
                  onClick={() =>
                    window.open(
                      "mailto:hello@luxuryhomes.com?subject=Schedule Tour for " +
                        prop.title,
                      "_blank"
                    )
                  }
                >
                  Schedule Tour
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full border-2 border-blue-600 text-blue-600 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200"
                  onClick={() =>
                    window.open(
                      "mailto:hello@luxuryhomes.com?subject=Pre-approval for " +
                        prop.title,
                      "_blank"
                    )
                  }
                >
                  Get Pre-approved
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full border border-gray-300 text-gray-700 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => alert("Property saved to your favorites!")}
                >
                  Save Property
                </motion.button>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Contact Agent
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-600">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <span>hello@luxuryhomes.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    <span>(555) 123-4567</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
