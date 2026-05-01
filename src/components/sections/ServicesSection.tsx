import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Droplets, Package, Sparkles, ArrowRight, Check } from "lucide-react";

const services = [
  {
    icon: Droplets,
    title: "Premium Olive Oil",
    description: "Exquisite extra virgin and premium olive oils, cold-pressed from hand-selected olives. Our ARIVANO and OLIVORE collections represent the pinnacle of Tunisian olive oil craftsmanship, each bottle a testament to centuries of tradition and uncompromising quality.",
    features: ["Extra Virgin Quality", "Cold-Pressed Excellence", "Single Estate Options", "Award-Winning"],
    accent: "bg-primary",
    textAccent: "text-primary-foreground",
  },
  {
    icon: Sparkles,
    title: "Natural Oils Collection",
    description: "A curated selection of rare and precious natural oils, sourced from Tunisia's finest botanical treasures. From argan to almond, each oil is carefully extracted to preserve its natural properties and therapeutic benefits, perfect for culinary and wellness applications.",
    features: ["Rare Varieties", "Therapeutic Benefits", "Culinary Excellence", "Pure Extraction"],
    accent: "bg-accent",
    textAccent: "text-accent-foreground",
    featured: true,
  },
  {
    icon: Package,
    title: "Packaging & Preservation",
    description: "Luxury packaging solutions designed to protect and preserve the integrity of your premium oils. Our bespoke packaging services ensure optimal preservation, elegant presentation, and extended shelf life, with custom branding that reflects your brand's sophistication.",
    features: ["Luxury Packaging", "Optimal Preservation", "Custom Branding", "Extended Shelf Life"],
    accent: "bg-primary",
    textAccent: "text-primary-foreground",
  },
];

export const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-12 md:py-16 bg-secondary relative overflow-hidden" ref={ref}>
      {/* Decorative gradient lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-12"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-accent text-sm tracking-[0.3em] uppercase mb-4 block"
          >
            Our Services
          </motion.span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-primary font-light mb-4">
            Comprehensive <span className="italic">Excellence</span>
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="gold-line mb-6"
          />
          <p className="text-muted-foreground max-w-2xl mx-auto text-base">
            From premium olive oils and natural oils to bespoke packaging and preservation solutions, 
            we offer a complete range of services tailored to meet the highest standards of quality and luxury.
          </p>
        </motion.div>

        {/* Services - Horizontal Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="group relative"
            >
              <div
                className={`relative p-6 lg:p-8 rounded-xl border border-border/50 shadow-soft hover:shadow-elevated transition-all duration-500 h-full flex flex-col overflow-hidden ${
                  service.featured
                    ? `${service.accent} ${service.textAccent} border-accent/30`
                    : "bg-card"
                }`}
              >
                {/* Premium corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-accent/5 to-transparent pointer-events-none" />
                
                {/* Featured Badge - Enhanced */}
                {service.featured && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="absolute top-4 right-4 flex items-center gap-1.5"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary-foreground animate-pulse" />
                    <span className="text-[10px] tracking-[0.2em] uppercase text-primary-foreground/80">
                      Featured
                    </span>
                  </motion.div>
                )}

                {/* Icon - Enhanced with subtle glow */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-lg mb-4 relative ${
                    service.featured
                      ? "bg-primary-foreground/20"
                      : `${service.accent} ${service.textAccent}`
                  }`}
                >
                  {/* Subtle glow effect */}
                  <div className={`absolute inset-0 rounded-lg blur-sm opacity-30 ${
                    service.featured ? "bg-primary-foreground/20" : service.accent
                  }`} />
                  <service.icon
                    size={28}
                    className={`relative z-10 ${
                      service.featured ? service.textAccent : "text-primary-foreground"
                    }`}
                    strokeWidth={1.5}
                  />
                </motion.div>

                {/* Title */}
                <h3
                  className={`font-serif text-xl md:text-2xl font-light mb-3 tracking-wide ${
                    service.featured ? service.textAccent : "text-primary"
                  }`}
                >
                  {service.title}
                </h3>

                {/* Gold Line - Animated */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className={`h-px w-12 mb-4 origin-left ${
                    service.featured
                      ? "bg-primary-foreground/30"
                      : "bg-gradient-gold"
                  }`}
                  style={
                    !service.featured
                      ? { backgroundImage: "var(--gradient-gold)" }
                      : undefined
                  }
                />

                {/* Description */}
                <p
                  className={`text-sm leading-relaxed mb-4 flex-grow ${
                    service.featured
                      ? "text-primary-foreground/80"
                      : "text-muted-foreground"
                  }`}
                >
                  {service.description}
                </p>

                {/* Features - Compact with premium styling */}
                <div className="space-y-2 pt-4 border-t border-border/30">
                  {service.features.map((feature, featureIndex) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{
                        duration: 0.4,
                        delay: 0.3 + index * 0.1 + featureIndex * 0.05,
                      }}
                      className="flex items-center gap-2 group/feature"
                    >
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Check
                          size={12}
                          className={
                            service.featured
                              ? service.textAccent
                              : "text-accent"
                          }
                          strokeWidth={3}
                        />
                      </motion.div>
                      <span
                        className={`text-xs tracking-wide transition-colors group-hover/feature:${
                          service.featured
                            ? "text-primary-foreground"
                            : "text-foreground"
                        } ${
                          service.featured
                            ? "text-primary-foreground/90"
                            : "text-foreground/70"
                        }`}
                      >
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Premium hover effect overlay with gradient */}
                <div className="absolute inset-0 border border-accent/0 group-hover:border-accent/20 rounded-xl transition-all duration-500 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-br from-accent/0 group-hover:from-accent/5 to-transparent rounded-xl transition-all duration-500 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Quote - Compact with premium styling */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <blockquote className="font-serif text-lg md:text-xl text-foreground/70 italic max-w-2xl mx-auto mb-4 relative">
            <span className="absolute -left-4 md:-left-8 text-accent/30 text-4xl font-serif">"</span>
            Each service is crafted with the same dedication to excellence, ensuring uncompromising quality 
            in every aspect of our offerings.
            <span className="absolute -right-4 md:-right-8 text-accent/30 text-4xl font-serif">"</span>
          </blockquote>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="gold-line"
          />
        </motion.div>
      </div>
    </section>
  );
};
