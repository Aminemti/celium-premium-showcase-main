import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import oliveGrove from "@/assets/origin/thala-groves-dawn.jpg";
import { useI18n } from "@/i18n/language";
import { EdgeRule, Mark, marks } from "@/components/decoration/OriginMarks";

export const AboutSection = () => {
  const { t } = useI18n();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-16 md:py-24 bg-background relative overflow-hidden" ref={ref}>
      <EdgeRule src={marks.bar} className="top-6" />
      <Mark src={marks.crescent} className="-left-4 top-24 hidden h-64 xl:block" />
      <Mark src={marks.tree} className="bottom-8 right-6 hidden h-24 md:block" />
      {/* Classical Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              hsl(var(--gold) / 0.1) 2px,
              hsl(var(--gold) / 0.1) 4px
            )`,
          }}
        />
      </div>

      {/* Classical Side Inscriptions */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden xl:block pointer-events-none">
        <p className="roman-inscription opacity-10 -rotate-90 whitespace-nowrap" style={{ fontFamily: "Cormorant Garamond, serif" }}>
          {t("about.inscription")}
        </p>
      </div>

      <div className="container mx-auto px-6 relative z-10">
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
                src={oliveGrove}
                alt={t("about.alt")}
                className="w-full h-[500px] object-cover"
              />
              {/* Classical Gold Frame */}
              <div className="absolute inset-4 border border-accent/30 pointer-events-none" />
              {/* Classical Corner Decorations */}
              <div className="classical-corner classical-corner-tl absolute top-4 left-4 opacity-40" />
              <div className="classical-corner classical-corner-tr absolute top-4 right-4 opacity-40" />
              <div className="classical-corner classical-corner-bl absolute bottom-4 left-4 opacity-40" />
              <div className="classical-corner classical-corner-br absolute bottom-4 right-4 opacity-40" />
            </div>
            {/* Decorative element */}
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute -bottom-6 -right-6 w-32 h-32 border border-accent/40 hidden lg:block"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
            className="lg:pl-8"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-accent text-sm tracking-[0.3em] uppercase mb-4 block"
            >
              {t("about.kicker")}
            </motion.span>

            <div className="relative">
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary font-light mb-8 leading-tight">
                Maison <span className="italic">Frexes</span>
              </h2>
              {/* Classical Decorative Element */}
              <div className="absolute -left-4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/20 to-transparent hidden lg:block" />
            </div>

            <div className="gold-line mb-8 mx-0 relative">
              {/* Classical Laurel Pattern */}
              <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-24 h-0.5 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
            </div>

            <p className="text-foreground/80 text-lg leading-relaxed mb-6">
              {t("about.p1")}
            </p>

            <p className="text-foreground/70 leading-relaxed mb-8">
              {t("about.p2")}
            </p>

            <p className="text-foreground/70 leading-relaxed">
              {t("about.p3")}
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-10 flex items-center gap-8"
            >
              <div className="text-center">
                <span className="font-serif text-3xl text-accent block">{t("about.pure")}</span>
                <span className="text-sm tracking-[0.2em] text-muted-foreground uppercase">
                  {t("about.authentic")}
                </span>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <span className="font-serif text-3xl text-accent block">{t("about.quiet")}</span>
                <span className="text-sm tracking-[0.2em] text-muted-foreground uppercase">
                  {t("about.elegance")}
                </span>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <span className="font-serif text-3xl text-accent block">{t("about.true")}</span>
                <span className="text-sm tracking-[0.2em] text-muted-foreground uppercase">
                  {t("about.trust")}
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
