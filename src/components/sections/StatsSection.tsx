import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Em, useI18n } from "@/i18n/language";
import { Mark, marks } from "@/components/decoration/OriginMarks";

export const StatsSection = () => {
  const { t, tm } = useI18n();
  const stats = tm<{ value: string; label: string; description: string }[]>("stats.items");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-16 md:py-24 bg-secondary relative overflow-hidden" ref={ref}>
      <Mark src={marks.grove} className="left-6 bottom-8 hidden h-12 md:block" />
      <Mark src={marks.tree} className="right-6 top-16 hidden h-20 md:block" />
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
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
          className="text-center mb-16"
        >
          <span className="text-accent text-sm tracking-[0.3em] uppercase mb-4 block">
            {t("stats.kicker")}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary font-light mb-6">
            <Em text={t("stats.title")} />
          </h2>
          <div className="gold-line" />
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
              className="text-center p-8 relative group"
            >
              {/* Decorative line between items */}
              {index < stats.length - 1 && (
                <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-20 bg-accent/20" />
              )}
              
              <motion.span
                className="font-serif text-5xl md:text-6xl lg:text-7xl text-gradient-gold block mb-4"
                initial={{ scale: 0.5 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1, type: "spring" }}
              >
                {stat.value}
              </motion.span>
              <h3 className="font-serif text-lg text-primary mb-2 tracking-wide">
                {stat.label}
              </h3>
              <p className="text-muted-foreground text-sm">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
