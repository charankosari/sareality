import React from "react";
import { motion } from "framer-motion";
import { FaAward, FaHandshake, FaHome, FaStar } from "react-icons/fa";

const About = () => {
  const stats = [
    { icon: FaHome, value: "500+", label: "Properties Sold" },
    { icon: FaHandshake, value: "1000+", label: "Happy Clients" },
    { icon: FaAward, value: "15+", label: "Years Experience" },
    { icon: FaStar, value: "4.9", label: "Client Rating" },
  ];

  const values = [
    {
      title: "Trust & Integrity",
      description:
        "Building lasting relationships through honest communication and transparent transactions.",
      icon: "🤝",
    },
    {
      title: "Market Expertise",
      description:
        "Deep local market knowledge and cutting-edge insights to guide your decisions.",
      icon: "📊",
    },
    {
      title: "Personalized Service",
      description:
        "Tailored solutions that understand your unique needs and aspirations.",
      icon: "🎯",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "First-time Home Buyer",
      content:
        "SA Reality made my first home buying experience incredibly smooth. Their attention to detail and patience throughout the process was exceptional.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Property Investor",
      content:
        "Professional, knowledgeable, and always available. They helped me build a successful investment portfolio with their market insights.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Home Seller",
      content:
        "Sold my home above asking price in just 2 weeks! Their marketing strategy and negotiation skills are unmatched.",
      rating: 5,
    },
    {
      name: "David Thompson",
      role: "Relocating Family",
      content:
        "Moving to a new city was daunting, but SA Reality found us the perfect neighborhood and home. Highly recommend!",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-6">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                About SA Reality
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Your Trusted Real Estate Partner
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                With over a decade of experience in real estate, I've built my
                reputation on trust, integrity, and delivering exceptional
                results. My approach combines cutting-edge market insights with
                personalized service to help you find not just a property, but
                your perfect home.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Whether you're buying your dream home or selling a cherished
                property, I'm committed to making your real estate journey
                seamless, stress-free, and ultimately successful. Let's turn
                your vision into reality.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative h-96 w-full rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=60"
                  alt="SA Reality - Professional Real Estate Services"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="text-2xl text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Values Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              What Sets Us Apart
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our commitment to excellence and client satisfaction drives
              everything we do.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Testimonials Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              What Our Clients Say
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it - hear from the families we've
              helped find their dream homes.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-lg" />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.role}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* CTA Section
      <section className="bg-blue-600 py-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Start Your Real Estate Journey?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Let's discuss your real estate goals and create a personalized
              plan to achieve them.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Get Started Today
            </motion.button>
          </motion.div>
        </div>
      </section> */}
    </div>
  );
};

export default About;
