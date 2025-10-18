import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSeedling,
  FaChevronLeft,
  FaChevronRight,
  FaBuilding,
  FaLightbulb,
} from "react-icons/fa";

const features = [
  {
    title: "Design-led, people-first",
    text: "We partner with architects and local builders to present homes that balance proportion, light and materials.",
    images: [
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=60",
      "https://images.unsplash.com/photo-1560184897-6e7d8f1e5e55?auto=format&fit=crop&w=1200&q=60",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=60",
    ],
    icon: FaBuilding,
    color: "blue",
  },
  {
    title: "Sustainable materials, intelligent design",
    text: "Prioritize natural materials and energy-efficient systems to create homes that last.",
    images: [
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=60",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=60",
      "https://images.unsplash.com/photo-1505691723518-36a6d2b4d6d3?auto=format&fit=crop&w=1200&q=60",
    ],
    icon: FaSeedling,
    color: "green",
  },
  {
    title: "Innovation meets tradition",
    text: "Blending cutting-edge technology with timeless architectural principles for homes that stand the test of time.",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=60",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=1200&q=60",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=60",
    ],
    icon: FaLightbulb,
    color: "purple",
  },
];

export default function FeatureBlock() {
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % features.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + features.length) % features.length);
  };

  const isActive = (index) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 41) - 10; // -10 to 30 degrees
  };

  const currentFeature = features[active];

  return (
    <section className="bg-gradient-to-br from-gray-50 to-white py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="relative grid grid-cols-1 gap-12 lg:gap-20 lg:grid-cols-2 items-center">
          {/* Left Side - Image Carousel */}
          <div className="order-2 lg:order-1">
            <div className="relative h-80 lg:h-96 w-full">
              <AnimatePresence>
                {currentFeature.images.map((image, index) => (
                  <motion.div
                    key={`${active}-${image}`}
                    initial={{
                      opacity: 0,
                      scale: 0.9,
                      rotateY: randomRotateY(),
                    }}
                    animate={{
                      opacity: index === 0 ? 1 : 0.8,
                      scale: index === 0 ? 1 : 0.95,
                      rotateY: index === 0 ? 0 : randomRotateY(),
                      zIndex: currentFeature.images.length - index,
                      y: index === 0 ? 0 : index * 10,
                      x: index === 0 ? 0 : index * 5,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.9,
                      rotateY: randomRotateY(),
                    }}
                    transition={{
                      duration: 0.6,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 origin-bottom"
                  >
                    <img
                      src={image}
                      alt={`${currentFeature.title} ${index + 1}`}
                      width={500}
                      height={500}
                      draggable={false}
                      className="h-full w-full rounded-3xl object-cover object-center shadow-2xl"
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Side - Text Content */}
          <div className="flex flex-col justify-center py-4 order-1 lg:order-2 px-4 lg:px-0">
            <motion.div
              key={active}
              initial={{
                y: 20,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              exit={{
                y: -20,
                opacity: 0,
              }}
              transition={{
                duration: 0.2,
                ease: "easeInOut",
              }}
            >
              <h3 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                {currentFeature.title}
              </h3>

              <motion.p className="text-base lg:text-lg text-gray-600 leading-relaxed mb-8">
                {currentFeature.text.split(" ").map((word, index) => (
                  <motion.span
                    key={index}
                    initial={{
                      filter: "blur(10px)",
                      opacity: 0,
                      y: 5,
                    }}
                    animate={{
                      filter: "blur(0px)",
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.2,
                      ease: "easeInOut",
                      delay: 0.02 * index,
                    }}
                    className="inline-block"
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
              </motion.p>

              <div className="flex items-center gap-4 mb-8">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-14 h-14 rounded-xl flex items-center justify-center text-xl ${
                    currentFeature.color === "blue"
                      ? "bg-blue-100 text-blue-600"
                      : currentFeature.color === "green"
                      ? "bg-green-100 text-green-600"
                      : "bg-purple-100 text-purple-600"
                  }`}
                >
                  <currentFeature.icon />
                </motion.div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-lg">
                    Excellence in Every Detail
                  </h4>
                  <p className="text-gray-600">Crafting spaces that inspire</p>
                </div>
              </div>
            </motion.div>

            {/* Navigation Controls */}
            <div className="flex gap-4 items-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handlePrev}
                onMouseEnter={() => setAutoplay(false)}
                onMouseLeave={() => setAutoplay(true)}
                className="group/button flex h-12 w-12 items-center justify-center rounded-full bg-white hover:bg-gray-50 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <FaChevronLeft className="h-4 w-4 text-gray-700 transition-transform duration-300 group-hover/button:rotate-12" />
              </motion.button>

              <div className="flex gap-2 items-center">
                {features.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActive(index)}
                    onMouseEnter={() => setAutoplay(false)}
                    onMouseLeave={() => setAutoplay(true)}
                    className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                      index === active ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleNext}
                onMouseEnter={() => setAutoplay(false)}
                onMouseLeave={() => setAutoplay(true)}
                className="group/button flex h-12 w-12 items-center justify-center rounded-full bg-white hover:bg-gray-50 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <FaChevronRight className="h-4 w-4 text-gray-700 transition-transform duration-300 group-hover/button:-rotate-12" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
