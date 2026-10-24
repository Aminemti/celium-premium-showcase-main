import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import qualityBadge from "@/assets/quality-badge.jpg";
import harvestDetail from "@/assets/origin/thala-hands.jpg";
import processHero from "@/assets/origin/thala-mill.jpg";
import { Shield, Leaf, Award, Sparkles, CheckCircle, Beaker, ThermometerSun, Eye } from "lucide-react";
import { Em, useI18n } from "@/i18n/language";
import { EdgeRule, Mark, marks } from "@/components/decoration/OriginMarks";

const pillarIcons = [Leaf, Shield, Award, Sparkles];
const testIcons = [Beaker, Eye, ThermometerSun];

const QualityPage = () => {
  const { t, tm } = useI18n();
  const qualityPillars = tm<{ title: string; description: string }[]>("craftPage.pillars").map((item, index) => ({
    ...item,
    icon: pillarIcons[index],
  }));
  const testingProcess = tm<{ title: string; description: string }[]>("craftPage.tests").map((item, index) => ({
    ...item,
    icon: testIcons[index],
  }));
  const certifications = tm<string[]>("craftPage.certs");
  const promises = tm<{ title: string; description: string }[]>("craftPage.promises");
  const heroRef = useRef(null);
  const pillarsRef = useRef(null);
  const processRef = useRef(null);
  const certRef = useRef(null);

  const isHeroInView = useInView(heroRef, { once: true });
  const isPillarsInView = useInView(pillarsRef, { once: true, margin: "-100px" });
  const isProcessInView = useInView(processRef, { once: true, margin: "-100px" });
  const isCertInView = useInView(certRef, { once: true, margin: "-100px" });

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-primary">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>
        <Mark src={marks.spine} deep className="left-5 top-28 hidden h-40 lg:block" />
        <Mark src={marks.grove} deep className="bottom-8 left-10 hidden h-12 md:block" />
        <Mark src={marks.diamond} deep className="bottom-10 right-8 hidden h-20 md:block" />

        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1 }}
          >
            <span className="text-gold-light text-sm tracking-[0.3em] uppercase mb-4 block">
              {t("craftPage.kicker")}
            </span>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-primary-foreground font-light mb-6">
              <span className="italic">{t("heritagePage.savoir")}</span>
            </h1>
            <div className="gold-line mx-0 mb-8" />
            <p className="text-primary-foreground/70 text-lg md:text-xl max-w-xl">
              {t("craftPage.lead")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <img
                src={qualityBadge}
                alt={t("craftPage.altBadge")}
                className="w-80 h-80 object-cover mx-auto rounded-full shadow-gold"
              />
              <div className="absolute inset-0 rounded-full border-2 border-gold-light/30 scale-110" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quality Pillars */}
      <section ref={pillarsRef} className="relative overflow-hidden py-24 md:py-32 bg-background">
        <EdgeRule src={marks.bar} className="top-8" />
        <Mark src={marks.crescent} className="-right-4 top-16 hidden h-72 xl:block" />
        <Mark src={marks.tree} className="bottom-6 left-6 hidden h-24 md:block" />
        <div className="container relative z-10 mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isPillarsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            className="text-center mb-20"
          >
            <span className="text-accent text-sm tracking-[0.3em] uppercase mb-4 block">
              {t("craftPage.four")}
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-primary font-light mb-6">
              <Em text={t("craftPage.foundations")} />
            </h2>
            <div className="gold-line" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {qualityPillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isPillarsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 + index * 0.15 }}
                className="group p-8 lg:p-10 border border-border hover:border-accent/30 bg-card transition-all duration-500"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="mb-6"
                >
                  <pillar.icon className="w-12 h-12 text-accent" strokeWidth={1} />
                </motion.div>
                <h3 className="font-serif text-2xl text-primary mb-4">{pillar.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{pillar.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Break */}
      <section className="relative h-[40vh] min-h-[300px]">
        <img
          src={harvestDetail}
          alt={t("housePage.altHarvest")}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/70 flex items-center justify-center">
          <Mark src={marks.bar} deep className="left-6 top-1/2 hidden h-8 -translate-y-1/2 md:block" />
          <Mark src={marks.bar} deep className="right-6 top-1/2 hidden h-8 -translate-y-1/2 -scale-x-100 md:block" />
          <blockquote className="relative z-10 font-serif text-2xl md:text-3xl lg:text-4xl text-primary-foreground italic text-center max-w-3xl px-6">
            {t("craftPage.quote")}
          </blockquote>
        </div>
      </section>

      {/* Testing Process */}
      <section ref={processRef} className="relative overflow-hidden py-24 md:py-32 bg-secondary">
        <Mark src={marks.loom} className="bottom-4 left-0 hidden h-60 lg:block" />
        <Mark src={marks.grove} className="right-8 top-10 h-12" />
        <div className="container relative z-10 mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isProcessInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1 }}
            >
              <span className="text-accent text-sm tracking-[0.3em] uppercase mb-4 block">
                {t("craftPage.sequence")}
              </span>
              <h2 className="font-serif text-4xl md:text-5xl text-primary font-light mb-6">
                <Em text={t("craftPage.fruit")} />
              </h2>
              <div className="gold-line mx-0 mb-8" />
              <p className="text-foreground/70 leading-relaxed mb-10">
                {t("craftPage.sequenceText")}
              </p>

              <div className="space-y-8">
                {testingProcess.map((test, index) => (
                  <motion.div
                    key={test.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isProcessInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-accent/10 flex items-center justify-center">
                      <test.icon className="w-6 h-6 text-accent" strokeWidth={1} />
                    </div>
                    <div>
                      <h4 className="font-serif text-lg text-primary mb-2">{test.title}</h4>
                      <p className="text-muted-foreground text-sm">{test.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isProcessInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative"
            >
              <div className="relative overflow-hidden">
                <img
                  src={processHero}
                  alt={t("process.alt")}
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-4 border border-accent/30 pointer-events-none" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section ref={certRef} className="relative overflow-hidden py-24 md:py-32 bg-primary">
        <Mark src={marks.lattice} deep className="-left-4 top-6 hidden h-56 md:block" />
        <Mark src={marks.spine} deep className="bottom-4 right-4 hidden h-44 lg:block" />
        <EdgeRule src={marks.bar} deep className="bottom-8" />
        <div className="container relative z-10 mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isCertInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            className="text-center mb-16"
          >
            <span className="text-gold-light text-sm tracking-[0.3em] uppercase mb-4 block">
              {t("craftPage.kept")}
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-primary-foreground font-light mb-6">
              <Em text={t("craftPage.marks")} />
            </h2>
            <div className="gold-line mb-8" />
            <p className="text-primary-foreground/70 max-w-2xl mx-auto">
              {t("craftPage.keptText")}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isCertInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="p-6 border border-primary-foreground/20 hover:border-gold-light/50 bg-primary-foreground/5 transition-all duration-300 flex flex-col items-center justify-center text-center"
              >
                <CheckCircle className="w-8 h-8 text-gold-light mb-3" strokeWidth={1} />
                <span className="text-primary-foreground text-sm">{cert}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Promise */}
      <section className="relative overflow-hidden py-24 md:py-32 bg-background">
        <Mark src={marks.kilim} className="right-2 top-8 hidden h-40 md:block" />
        <Mark src={marks.tree} className="bottom-6 left-6 hidden h-20 md:block" />
        <div className="container relative z-10 mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-accent text-sm tracking-[0.3em] uppercase mb-4 block">
              {t("craftPage.promise")}
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-primary font-light mb-8">
              <Em text={t("craftPage.nameTitle")} />
            </h2>
            <div className="gold-line mb-8" />
            <p className="text-foreground/70 text-lg leading-relaxed mb-12">
              {t("craftPage.promiseText")}
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                ...promises,
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="p-6 border border-border"
                >
                  <h4 className="font-serif text-xl text-primary mb-2">{item.title}</h4>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default QualityPage;
