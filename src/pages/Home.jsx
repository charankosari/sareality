import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import HeroLarge from "../components/hero/HeroLarge";
import FeatureBlock from "../components/blocks/FeatureBlock";
import StatsPanel from "../components/blocks/StatsPanel";
import GalleryGrid from "../components/blocks/GalleryGrid";
import Testimonials from "../components/blocks/Testimonials";
import PropertyGrid from "../components/property/PropertyGrid";
import { fetchListings } from "../hooks/useLocalData";

export default function Home() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchListings()
      .then((data) => {
        if (!cancelled) setListings(data || []);
      })
      .catch((err) => {
        console.error("Failed to load listings", err);
        if (!cancelled) setListings([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleSearch = (searchTerm) => {
    if (searchTerm && searchTerm.trim()) {
      navigate(`/listings?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate("/listings");
    }
  };
  // Handle contact hash scroll
  useEffect(() => {
    if (window.location.hash === "#contact") {
      setTimeout(() => {
        const contactSection = document.getElementById("contact");
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 100); // Small delay to ensure page is rendered
    }
  }, []);

  const stats = [
    { label: "Projects Delivered", value: 256 },
    { label: "Happy Owners", value: 720 },
    { label: "Average Build Time (days)", value: 45 },
    { label: "Sustainability Score", value: 92 },
  ];

  const testimonials = [
    { name: "Asha N.", quote: "A beautiful home, perfectly executed." },
    { name: "Rahul P.", quote: "Exceptional quality and service." },
  ];

  const galleryImages = (listings || []).map((l) => l.image).slice(0, 6);

  return (
    <>
      <HeroLarge onSearch={handleSearch} />
      <section id="featured" className="container mx-auto px-5 py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Featured Properties</h2>
          <p className="text-gray-600">Hand-picked listings</p>
        </div>
      </section>

      {/* Property grid: pass loading */}
      <PropertyGrid items={listings} loading={loading} />

      <FeatureBlock />

      <StatsPanel items={stats} />

      <GalleryGrid
        images={
          galleryImages.length
            ? galleryImages
            : [
                "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=60",
                "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=60",
              ]
        }
      />

      <Testimonials items={testimonials} />

      <section id="contact" className="bg-white py-20">
        <div className="container mx-auto px-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Ready to Find Your Dream Home?
            </h3>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Get personalized recommendations and exclusive access to our
              premium property collection.
            </p>

            {/* Simple Trust Indicators */}
            <div className="flex justify-center items-center gap-8 mb-12 text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium">500K+ Happy Clients</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium">50+ Countries</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm font-medium">99% Satisfaction</span>
              </div>
            </div>

            {/* Simple Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-md mx-auto"
            >
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Thanks! We will reach out soon.");
                }}
              >
                <input
                  aria-label="Your name"
                  className="w-full border border-gray-200 rounded-xl px-6 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                  placeholder="Your name"
                  required
                />
                <input
                  aria-label="Your email"
                  type="email"
                  className="w-full border border-gray-200 rounded-xl px-6 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                  placeholder="your@email.com"
                  required
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Get Started Today
                </motion.button>
              </form>

              <p className="text-sm text-gray-500 mt-6">
                Free consultation • No commitment required
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
