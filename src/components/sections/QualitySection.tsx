import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Leaf, Award, Shield, Sparkles } from "lucide-react";

const qualities = [
  {
    icon: Leaf,
    title: "Careful Selection",
    description:
      "Every olive is hand-picked at the optimal moment of ripeness, ensuring the purest flavor profile and highest nutritional value.",
  },
  {
    icon: Award,
    title: "Artisanal Process",
    description:
      "Traditional cold-pressing methods meet modern precision, preserving the authentic character of Tunisian olive oil.",
  },
  {
    icon: Shield,
    title: "Uncompromising Purity",
    description:
      "Zero additives, zero shortcuts. Our oils are 100% natural, free from any artificial enhancers or preservatives.",
  },
  {
    icon: Sparkles,
    title: "Excellence Certified",
    description:
      "Every batch undergoes rigorous quality testing to meet the highest international standards of excellence.",
  },
];

export const QualitySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="quality" className="py-16 md:py-24 bg-primary relative overflow-hidden" ref={ref}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Classical Inscription */}
      <div className="absolute top-1/4 right-8 hidden xl:block pointer-events-none">
        <p className="roman-inscription opacity-10 rotate-90 whitespace-nowrap" style={{ fontFamily: "Cormorant Garamond, serif" }}>
          QUALITAS · SUPREMA
        </p>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <span className="text-gold-light text-sm tracking-[0.3em] uppercase mb-4 block">
            Our Commitment
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary-foreground font-light mb-6">
            Uncompromising <span className="italic">Quality</span>
          </h2>
          <div className="gold-line mb-8" />
          <p className="text-primary-foreground/70 max-w-2xl mx-auto text-lg">
            From grove to bottle, every step reflects our dedication to delivering
            nothing but the finest natural oils.
          </p>
        </motion.div>

        {/* Quality Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {qualities.map((quality, index) => (
            <motion.div
              key={quality.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.15 }}
              className="group"
            >
              <div className="p-8 border border-primary-foreground/10 hover:border-gold-light/30 transition-all duration-500 h-full bg-primary-foreground/5 backdrop-blur-sm">
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  className="mb-6"
                >
                  <quality.icon className="w-10 h-10 text-gold-light" strokeWidth={1} />
                </motion.div>

                {/* Title */}
                <h3 className="font-serif text-xl text-primary-foreground mb-4 tracking-wide">
                  {quality.title}
                </h3>

                {/* Description */}
                <p className="text-primary-foreground/60 text-sm leading-relaxed">
                  {quality.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <blockquote className="font-serif text-2xl md:text-3xl text-primary-foreground/80 italic max-w-3xl mx-auto">
            "We don't simply produce oil—we craft liquid gold that embodies the
            essence of Tunisia's finest olive heritage."
          </blockquote>
          <div className="gold-line mt-8" />
        </motion.div>
      </div>
    </section>
  );
};
