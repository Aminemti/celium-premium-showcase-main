import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";

import carousel1 from "@/assets/carousel-1.jpg";
import carousel2 from "@/assets/carousel-2.jpg";
import carousel3 from "@/assets/carousel-3.jpg";
import carousel4 from "@/assets/carousel-4.jpg";
import carousel5 from "@/assets/carousel-5.jpg";

const carouselImages = [
  { src: carousel1, alt: "Premium olive oil pouring" },
  { src: carousel2, alt: "Tunisian olive grove at sunset" },
  { src: carousel3, alt: "Fresh olives on branch" },
  { src: carousel4, alt: "Traditional olive press" },
  { src: carousel5, alt: "Olive oil tasting" },
];

// Duplicate multiple times for truly seamless loop
const duplicatedImages = [...carouselImages, ...carouselImages, ...carouselImages, ...carouselImages];

export const InfiniteCarouselSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-16 md:py-24 bg-primary relative overflow-hidden" ref={ref}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" 
          style={{ 
            backgroundImage: "radial-gradient(circle at 25% 25%, hsl(var(--accent)) 1px, transparent 1px)",
            backgroundSize: "50px 50px"
          }} 
        />
      </div>

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
        className="text-center mb-16 relative z-10 px-6"
      >
        <span className="text-accent text-sm tracking-[0.3em] uppercase mb-4 block">
          Visual Journey
        </span>
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary-foreground font-light mb-6">
          Moments of <span className="italic">Excellence</span>
        </h2>
        <div className="h-px w-16 mx-auto bg-accent" />
      </motion.div>

      {/* Infinite Carousel */}
      <div className="relative">
        {/* Gradient Overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-primary to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-primary to-transparent z-10" />

        {/* Scrolling Container */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="flex"
        >
          <motion.div
            className="flex"
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 60,
                ease: "linear",
              },
            }}
          >
            {duplicatedImages.map((image, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[400px] md:w-[500px] lg:w-[600px] relative group px-3"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-[280px] md:h-[340px] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Elegant border frame */}
                  <div className="absolute inset-4 border border-accent/30 pointer-events-none" />
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom decorative line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="mt-16 mx-auto w-48 h-px bg-accent/50 origin-center"
      />
    </section>
  );
};
