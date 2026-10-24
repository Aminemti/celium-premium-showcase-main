import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import processHero from "@/assets/origin/thala-mill.jpg";
import { Em, useI18n } from "@/i18n/language";
import { EdgeRule, Mark, marks } from "@/components/decoration/OriginMarks";

export const ProcessSection = () => {
  const { t, tm } = useI18n();
  const steps = tm<{ title: string; description: string }[]>("process.steps").map((step, index) => ({
    ...step,
    number: String(index + 1).padStart(2, "0"),
  }));
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-16 md:py-24 bg-background relative overflow-hidden" ref={ref}>
      <EdgeRule src={marks.bar} className="top-6" />
      <Mark src={marks.lattice} className="-right-6 top-20 hidden h-64 xl:block" />
      <Mark src={marks.tree} className="bottom-6 left-6 hidden h-20 md:block" />
      {/* Classical Background Inscription */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden xl:block pointer-events-none">
        <p className="roman-inscription text-6xl opacity-[0.02] whitespace-nowrap" style={{ fontFamily: "Cormorant Garamond, serif" }}>
          ARS · PERFECTA · NATURAE
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
          <span className="text-accent text-sm tracking-[0.3em] uppercase mb-4 block">
            {t("process.kicker")}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary font-light mb-6">
            <Em text={t("process.title")} />
          </h2>
          <div className="gold-line mb-8" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            {t("process.intro")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <div className="relative overflow-hidden">
              <img
                src={processHero}
                alt="The craft of the olive"
                className="w-full h-[500px] lg:h-[600px] object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
              {/* Classical Gold Frame */}
              <div className="absolute inset-4 border border-accent/30 pointer-events-none" />
              {/* Classical Corner Decorations */}
              <div className="classical-corner classical-corner-tl absolute top-4 left-4 opacity-40" />
              <div className="classical-corner classical-corner-tr absolute top-4 right-4 opacity-40" />
              <div className="classical-corner classical-corner-bl absolute bottom-4 left-4 opacity-40" />
              <div className="classical-corner classical-corner-br absolute bottom-4 right-4 opacity-40" />
            </div>
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute -bottom-8 -right-8 bg-accent text-accent-foreground p-6 hidden lg:flex flex-col items-center justify-center"
            >
              <span className="font-serif text-3xl">100%</span>
              <span className="text-xs tracking-[0.2em] uppercase">{t("process.cold")}</span>
            </motion.div>
          </motion.div>

          {/* Steps */}
          <div className="space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 + index * 0.15 }}
                className="group flex gap-6 p-6 border border-transparent hover:border-accent/20 hover:bg-secondary/30 transition-all duration-500"
              >
                {/* Number */}
                <div className="flex-shrink-0">
                  <span className="font-serif text-4xl text-accent/40 group-hover:text-accent transition-colors duration-300">
                    {step.number}
                  </span>
                </div>
                {/* Content */}
                <div>
                  <h3 className="font-serif text-xl text-primary mb-2 tracking-wide">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
