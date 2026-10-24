import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { Leaf, Award, Globe } from "lucide-react";
import { Em, useI18n } from "@/i18n/language";
import { Mark, marks } from "@/components/decoration/OriginMarks";

const visuals = [
  { icon: Leaf, iconBg: "bg-primary", cardBg: "bg-card" },
  { icon: Award, iconBg: "bg-accent", cardBg: "bg-secondary", featured: true },
  { icon: Globe, iconBg: "bg-primary", cardBg: "bg-card" },
];

export const ExcellenceSection = () => {
  const { t, tm } = useI18n();
  const copy = tm<{ title: string; description: string }[]>("excellence.items");
  const excellenceItems = visuals.map((visual, index) => ({ ...visual, ...copy[index] }));
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative overflow-hidden py-16 md:py-24 bg-background" ref={ref}>
      <Mark src={marks.kilim} className="right-2 top-12 hidden h-36 md:block" />
      <Mark src={marks.crescent} className="-left-8 bottom-8 hidden h-56 xl:block" />
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary font-light mb-6">
            <Em text={t("excellence.title")} />
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            {t("excellence.intro")}
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
