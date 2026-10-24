import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import brand1 from "../../../thala/Gemini_Generated_Image_qyl2f4qyl2f4qyl2.jpg";
import brand2 from "@/assets/origin/thala-hands.jpg";
import { Em, useI18n } from "@/i18n/language";
import { Mark, marks } from "@/components/decoration/OriginMarks";

export const BrandsSection = () => {
  const { t, tm } = useI18n();
  const brands = [
    {
      name: t("brands.talaName"),
      tagline: t("brands.talaTag"),
      description: t("brands.talaText"),
      features: tm<string[]>("brands.talaFeatures"),
      image: brand1,
      bgClass: "bg-primary",
      textClass: "text-primary-foreground",
    },
    {
      name: t("brands.handsName"),
      tagline: t("brands.handsTag"),
      description: t("brands.handsText"),
      features: tm<string[]>("brands.handsFeatures"),
      image: brand2,
      bgClass: "bg-secondary",
      textClass: "text-secondary-foreground",
    },
  ];
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="brands" className="py-16 md:py-24 bg-cream-dark relative overflow-hidden" ref={ref}>
      <Mark src={marks.kilim} className="left-2 top-16 hidden h-36 md:block" />
      <Mark src={marks.spine} className="bottom-8 right-4 hidden h-48 lg:block" />
      {/* Classical Background Pattern */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              hsl(var(--gold) / 0.1) 10px,
              hsl(var(--gold) / 0.1) 11px
            )`,
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <span className="text-accent text-sm tracking-[0.3em] uppercase mb-4 block">
            {t("brands.kicker")}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary font-light mb-6 relative">
            <Em text={t("brands.title")} />
            {/* Classical Decorative Elements */}
            <div className="absolute -left-8 top-1/2 -translate-y-1/2 hidden xl:block">
              <div className="w-1 h-16 bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
            </div>
            <div className="absolute -right-8 top-1/2 -translate-y-1/2 hidden xl:block">
              <div className="w-1 h-16 bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
            </div>
          </h2>
          <div className="gold-line mb-8 relative">
            {/* Classical Laurel Accent */}
            <div className="absolute left-1/2 -translate-x-1/2 -top-2 w-32 h-1 bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            {t("brands.intro")}
          </p>
        </motion.div>

        {/* Brands */}
        <div className="space-y-24">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.3 + index * 0.2 }}
              className={`grid lg:grid-cols-2 gap-0 overflow-hidden shadow-elevated ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image */}
              <div
                className={`relative h-[400px] lg:h-[600px] ${brand.bgClass} ${
                  index % 2 === 1 ? "lg:order-2" : ""
                }`}
              >
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                  src={brand.image}
                  alt={brand.name}
                  className="w-full h-full object-contain p-8 lg:p-16"
                />
              </div>

              {/* Content */}
              <div
                className={`flex flex-col justify-center p-8 lg:p-16 ${
                  index % 2 === 0 ? "bg-primary text-primary-foreground" : "bg-background"
                }`}
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.5 + index * 0.2 }}
                  className={`text-sm tracking-[0.3em] uppercase mb-4 ${
                    index % 2 === 0 ? "text-gold-light" : "text-accent"
                  }`}
                >
                  {brand.tagline}
                </motion.span>

                <h3
                  className={`font-serif text-5xl md:text-6xl lg:text-7xl font-light mb-6 tracking-[0.1em] ${
                    index % 2 === 0 ? "text-primary-foreground" : "text-primary"
                  }`}
                >
                  {brand.name}
                </h3>

                <div
                  className={`h-px w-16 mb-8 ${
                    index % 2 === 0 ? "bg-gradient-gold" : "bg-gradient-gold"
                  }`}
                  style={{ backgroundImage: "var(--gradient-gold)" }}
                />

                <p
                  className={`text-lg leading-relaxed mb-8 ${
                    index % 2 === 0 ? "text-primary-foreground/80" : "text-foreground/70"
                  }`}
                >
                  {brand.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-4">
                  {brand.features.map((feature) => (
                    <span
                      key={feature}
                      className={`px-4 py-2 text-xs tracking-[0.2em] uppercase border ${
                        index % 2 === 0
                          ? "border-gold-light/30 text-gold-light"
                          : "border-accent/30 text-accent"
                      }`}
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
