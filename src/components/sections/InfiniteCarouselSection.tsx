import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";

import carousel1 from "@/assets/origin/thala-oil-light.jpg";
import carousel2 from "../../../thala/Gemini_Generated_Image_qyl2f4qyl2f4qyl2.jpg";
import carousel3 from "@/assets/origin/thala-fruit.jpg";
import carousel4 from "@/assets/origin/thala-mill.jpg";
import carousel5 from "../../../thala/Gemini_Generated_Image_xh0ogqxh0ogqxh0o.jpg";
import { Em, useI18n } from "@/i18n/language";
import { Mark, marks } from "@/components/decoration/OriginMarks";

const sources = [carousel1, carousel2, carousel3, carousel4, carousel5];

export const InfiniteCarouselSection = () => {
  const { t, tm } = useI18n();
  const alts = tm<string[]>("carousel.alts");
  const carouselImages = sources.map((src, index) => ({ src, alt: alts[index] }));
  const duplicatedImages = [...carouselImages, ...carouselImages, ...carouselImages, ...carouselImages];
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-16 md:py-24 bg-primary relative overflow-hidden" ref={ref}>
      <Mark src={marks.diamond} deep className="left-6 top-6 hidden h-12 md:block" />
      <Mark src={marks.grove} deep className="right-8 top-7 hidden h-10 md:block" />
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
          {t("carousel.kicker")}
        </span>
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary-foreground font-light mb-6">
          <Em text={t("carousel.title")} />
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
