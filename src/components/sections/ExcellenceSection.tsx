import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { Leaf, Award, Globe } from "lucide-react";

const excellenceItems = [
  {
    icon: Leaf,
    title: "100% Natural",
    description: "Pure, unadulterated olive oils and natural oils sourced from the finest origins in Tunisia.",
    iconBg: "bg-primary",
    cardBg: "bg-card",
  },
  {
    icon: Award,
    title: "Premium Quality",
    description: "Rigorous quality control ensures every product meets our exceptional standards.",
    iconBg: "bg-accent",
    cardBg: "bg-secondary",
    featured: true,
  },
  {
    icon: Globe,
    title: "International",
    description: "Serving global markets with luxury packaging and premium branding.",
    iconBg: "bg-primary",
    cardBg: "bg-card",
  },
];

export const ExcellenceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-16 md:py-24 bg-background" ref={ref}>
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary font-light mb-6">
            Excellence in Every <span className="italic">Detail</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            From careful selection of olives and natural ingredients to premium packaging and preservation, we ensure the highest standards in every step of our process.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {excellenceItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className={`relative p-8 rounded-2xl ${item.cardBg} border border-border/50 shadow-soft hover:shadow-elevated transition-shadow duration-500`}
            >
              {/* Featured indicator dot */}
              {item.featured && (
                <div className="absolute top-6 right-6 w-3 h-3 rounded-full bg-accent" />
              )}

              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-xl ${item.iconBg} flex items-center justify-center mb-6`}
              >
                <item.icon size={28} className="text-primary-foreground" />
              </div>

              {/* Content */}
              <h3 className="font-serif text-2xl text-primary mb-4">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
