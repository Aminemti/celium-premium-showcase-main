import { motion } from "framer-motion";
import { ChevronDown, ArrowDown, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useI18n } from "@/i18n/language";
import { Mark, marks } from "@/components/decoration/OriginMarks";
import { thalaImages } from "@/data/cillitana";
import arivanoBottle from "@/assets/arivano-bottle.jpg";
import olivoreBottle from "@/assets/olivore-bottle.jpg";

export const HeroSection = () => {
  const { t } = useI18n();
  const scrollToAbout = () => {
    const element = document.querySelector("#about");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Bounce animation for floating cards
  const bounceAnimation = {
    y: [0, -12, 0],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  };

  // Slightly offset bounce for second card
  const bounceAnimationDelayed = {
    y: [0, -10, 0],
    transition: {
      duration: 2.8,
      repeat: Infinity,
      ease: "easeInOut" as const,
      delay: 0.5,
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={thalaImages.heroBottle}
          alt={t("hero.altGrove")}
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/75 via-charcoal/15 to-charcoal/45" />
      </div>
      <Mark src={marks.spine} deep className="left-4 top-32 hidden h-40 lg:block" />
      <Mark src={marks.diamond} deep className="right-8 top-28 hidden h-16 md:block" />
      <Mark src={marks.grove} deep className="bottom-16 left-8 hidden h-12 md:block" />

      {/* Main Content Container */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-left [text-shadow:0_2px_28px_rgba(0,0,0,0.65)]">
            {/* Company Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="font-serif text-6xl md:text-7xl lg:text-8xl font-light text-primary-foreground tracking-[0.1em] mb-4"
            >
              FREXES
            </motion.h1>

            {/* Subtitle with gold lines */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-accent" />
              <span className="text-accent text-sm md:text-base tracking-[0.4em] uppercase">
                {t("hero.maison")}
              </span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-accent" />
            </motion.div>

            {/* Slogan */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="font-serif text-2xl md:text-3xl lg:text-4xl text-primary-foreground/90 font-light italic mb-6"
            >
              {t("hero.slogan")}
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="text-primary-foreground/70 text-base md:text-lg max-w-xl mb-10 leading-relaxed"
            >
              {t("hero.description")}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/collection"
                className="group inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 font-medium tracking-wide transition-all duration-300"
              >
                {t("hero.collection")}
                <ArrowDown size={18} className="group-hover:translate-y-1 transition-transform" />
              </Link>
              <button
                onClick={scrollToAbout}
                className="inline-flex items-center gap-2 border border-primary-foreground/40 hover:border-primary-foreground/80 text-primary-foreground px-8 py-4 font-medium tracking-wide transition-all duration-300 hover:bg-primary-foreground/10"
              >
                {t("hero.house")}
              </button>
            </motion.div>
          </div>

          {/* Right Side - Floating Product Cards - Overlapping in Lower Right */}
          <div className="hidden lg:block relative h-[500px]">
            {/* Premium Badge - Above the cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute top-0 right-0 inline-flex items-center gap-2 bg-charcoal/60 backdrop-blur-sm border border-accent/30 rounded-full px-4 py-2 z-20"
            >
              <Sparkles size={16} className="text-accent" />
              <span className="text-primary-foreground text-sm tracking-[0.2em] uppercase">
                {t("hero.collection")}
              </span>
            </motion.div>

            {/* First Card - Behind, slightly higher and left */}
            <motion.div
              initial={{ opacity: 0, x: 50, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="absolute bottom-16 right-24"
            >
              <motion.div
                animate={bounceAnimation}
                className="relative w-56 h-72 rounded-2xl overflow-hidden border border-accent/30 shadow-elevated"
              >
                <img
                  src={arivanoBottle}
                  alt={t("hero.altPremiere")}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-accent/30 bg-charcoal/40 backdrop-blur-sm">
                  <p className="font-serif text-primary-foreground text-lg tracking-wider text-center">FREXES</p>
                  <p className="text-accent text-[10px] tracking-[0.18em] uppercase text-center">{t("hero.premiere")}</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Second Card - Front, lower and to the right */}
            <motion.div
              initial={{ opacity: 0, x: 50, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 1, delay: 1.1 }}
              className="absolute bottom-0 right-0 z-10"
            >
              <motion.div
                animate={bounceAnimationDelayed}
                className="relative w-52 h-64 rounded-2xl overflow-hidden border border-accent/30 shadow-elevated"
              >
                <img
                  src={olivoreBottle}
                  alt={t("hero.altReserve")}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-accent/30 bg-charcoal/40 backdrop-blur-sm">
                  <p className="font-serif text-primary-foreground text-lg tracking-wider text-center">FREXES</p>
                  <p className="text-accent text-[10px] tracking-[0.18em] uppercase text-center">{t("hero.reserve")}</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator with Bounce */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.button
          animate={{
            y: [0, 8, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          onClick={scrollToAbout}
          className="group flex flex-col items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-300"
        >
          <span className="text-xs tracking-[0.3em] uppercase">{t("hero.scroll")}</span>
          <ChevronDown size={24} />
        </motion.button>
      </motion.div>

      {/* Side decorative elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 1.5 }}
        className="absolute left-8 top-1/2 -translate-y-1/2 hidden xl:block"
      >
        <div className="gold-line-vertical" />
      </motion.div>
    </section>
  );
};
