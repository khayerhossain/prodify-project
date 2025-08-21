"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, PlayCircle } from "lucide-react";

const images = [
  "https://i.ibb.co.com/GfPzC4M6/Airpods.png",
  "https://i.ibb.co.com/rKqdTrrD/game-controler.png",
  "https://i.ibb.co.com/fVyKTXwf/smart-watch.png",
  "https://i.ibb.co.com/LdKy2SD9/headphone.png",
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-gray-950 via-black to-gray-900" />
      {/* Accent blobs */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-purple-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />

      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="uppercase tracking-wider">New</span>
              <span className="text-white/50">Exclusive Collection</span>
            </div>

            <h1 className="text-4xl font-extrabold leading-tight text-white md:text-5xl lg:text-6xl">
              Discover the latest
              <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                gadgets & accessories
              </span>
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
              Shop premium headphones, smart watches, and more. Get top quality
              electronics with modern design, best deals, and fast delivery —
              all in one place.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="#shop-now"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-purple-600 px-5 py-3 font-medium text-white shadow-lg shadow-purple-600/25 transition hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400/60"
              >
                Shop Now
                <ArrowRight className="h-5 w-5" />
              </a>
              <a
                href="#learn-more"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-3 font-medium text-white/90 backdrop-blur transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
              >
                <PlayCircle className="h-5 w-5" />
                Watch Demo
              </a>
            </div>
          </motion.div>

          {/* Right visual - Slideshow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <div className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-2 shadow-2xl backdrop-blur">
              <div className="rounded-2xl bg-black p-4 shadow-inner">
                <div className="aspect-[16/10] w-full overflow-hidden rounded-xl ring-1 ring-white/10 flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={current}
                      src={images[current]}
                      alt="Product preview"
                      className="h-full w-full object-contain p-6"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.6 }}
                    />
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
