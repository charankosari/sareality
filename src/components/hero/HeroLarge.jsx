import React, { useRef, useEffect } from "react";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";
gsap.registerPlugin(ScrollTrigger);

export default function HeroLarge({ onSearch }) {
  const heroRef = useRef(null);
  const inputRef = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = heroRef.current;
    if (!el) return;

    // Simple fade in animation
    gsap.fromTo(
      el.querySelectorAll(".hero-animate"),
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out" }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [reduced]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen bg-white overflow-hidden"
    >
      {/* Subtle Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gray-50 rounded-full opacity-50"></div>
        <div className="absolute top-40 right-20 w-64 h-64 bg-gray-100 rounded-full opacity-30"></div>
        <div className="absolute -bottom-8 left-40 w-56 h-56 bg-gray-50 rounded-full opacity-40"></div>
      </div>

      <div className="container mx-auto px-5 py-10 md:py-18 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]"
        >
          <div className="space-y-8">
            <motion.div
              className="hero-animate space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                <FaMapMarkerAlt className="w-4 h-4" />
                Premium Properties
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                Find Your
                <span className="block text-blue-600">Dream Home</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Discover luxury properties across America with our curated
                collection of architecturally stunning homes in the most
                desirable locations.
              </p>
            </motion.div>

            <motion.div
              className="hero-animate space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaSearch className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    ref={inputRef}
                    placeholder="Search by city, state, or ZIP code"
                    className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                    aria-label="Search properties"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        onSearch && onSearch(inputRef.current.value);
                      }
                    }}
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => onSearch && onSearch(inputRef.current.value)}
                >
                  Search
                </motion.button>
              </div>

              <div className="flex flex-wrap gap-4 text-sm">
                <span className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Malibu, CA
                </span>
                <span className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-full">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Brooklyn, NY
                </span>
                <span className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-full">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  Aspen, CO
                </span>
                <span className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-full">
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  Austin, TX
                </span>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="hero-animate relative"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=60"
                alt="Luxury Property"
                className="w-full h-[500px] lg:h-[600px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

              {/* Property Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="absolute bottom-6 left-6 right-6"
              >
                <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900">
                        Featured Property
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Malibu, California
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">
                        $2.8M
                      </div>
                      <div className="text-sm text-gray-500">
                        4 bed • 3 bath
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
