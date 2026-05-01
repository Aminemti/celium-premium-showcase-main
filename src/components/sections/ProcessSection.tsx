import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import processHero from "@/assets/process-hero.jpg";

const steps = [
  {
    number: "01",
    title: "Harvest",
    description: "Hand-picked at the perfect moment of ripeness, our olives and natural ingredients are carefully selected from centuries-old groves and pristine sources in Tunisia's finest regions.",
  },
  {
    number: "02",
    title: "Selection",
    description: "Only the finest olives make the cut. Each batch undergoes meticulous quality control to ensure only premium fruit proceeds to extraction.",
  },
  {
    number: "03",
    title: "Cold Press",
    description: "Within hours of harvest, olives are cold-pressed at temperatures below 27°C, preserving the delicate flavors and nutritional properties.",
  },
  {
    number: "04",
    title: "Refinement",
    description: "Our master blenders craft the perfect balance, ensuring each bottle meets the exacting standards of the CELIUM name.",
  },
];

export const ProcessSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-16 md:py-24 bg-background relative overflow-hidden" ref={ref}>
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
            The Journey
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary font-light mb-6">
            From Grove to <span className="italic">Bottle</span>
          </h2>
          <div className="gold-line mb-8" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A meticulous process perfected over generations, ensuring every drop 
            captures the essence of Tunisia's finest olives and natural ingredients.
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
                alt="Olive oil production process"
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
              <span className="text-xs tracking-[0.2em] uppercase">Cold Pressed</span>
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
