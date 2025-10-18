import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function StatsPanel({ items = [] }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const numberEls = el.querySelectorAll(".stat-number");

    numberEls.forEach((n) => {
      const target = Number(n.dataset.target || "0");

      gsap.fromTo(
        n,
        { innerText: 0 },
        {
          innerText: target,
          duration: 1.5,
          ease: "power2.out",
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: n,
            start: "top 90%",
            once: true,
          },
          onUpdate() {
            n.innerText = Math.round(n.innerText);
          },
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section className="bg-gray-50 py-16">
      <div
        ref={ref}
        className="container mx-auto px-5 grid md:grid-cols-4 gap-8"
      >
        {items.map((it, index) => (
          <motion.div
            key={it.label}
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <div
              className="text-5xl font-bold text-gray-900 stat-number mb-2"
              data-target={it.value}
            >
              0
            </div>
            <div className="text-gray-600 font-medium text-lg">{it.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
