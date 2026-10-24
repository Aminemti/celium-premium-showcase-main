import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import arivanoHero from "../../thala/Gemini_Generated_Image_xh0ogqxh0ogqxh0o.jpg";
import olivoreHero from "@/assets/origin/thala-hands.jpg";
import { Crown, Gem, Star, Droplets, Leaf, Award } from "lucide-react";
import { Em, useI18n } from "@/i18n/language";
import { EdgeRule, Mark, marks } from "@/components/decoration/OriginMarks";

const landIcons = [Crown, Gem, Star];
const gestureIcons = [Droplets, Leaf, Award];

const BrandsPage = () => {
  const { t, tm } = useI18n();
  const arivanoFeatures = tm<{ title: string; description: string }[]>("heritagePage.landFeatures").map((feature, index) => ({
    ...feature,
    icon: landIcons[index],
  }));
  const olivoreFeatures = tm<{ title: string; description: string }[]>("heritagePage.gestureFeatures").map((feature, index) => ({
    ...feature,
    icon: gestureIcons[index],
  }));
  const placeNotes = tm<string[]>("heritagePage.placeNotes");
  const gestureNotes = tm<string[]>("heritagePage.gestureNotes");
  const rows = tm<{ feature: string; land: string; craft: string }[]>("heritagePage.rows");
  const arivanoRef = useRef(null);
  const olivoreRef = useRef(null);

  const isArivanoInView = useInView(arivanoRef, { once: true, margin: "-100px" });
  const isOlivoreInView = useInView(olivoreRef, { once: true, margin: "-100px" });

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>
        <Mark src={marks.diamond} deep className="left-6 top-28 hidden h-16 md:block" />
        <Mark src={marks.spine} deep className="right-6 top-28 hidden h-44 lg:block" />
        <Mark src={marks.tree} deep className="bottom-6 left-8 hidden h-28 md:block" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative z-10 text-center px-6"
        >
          <span className="text-gold-light text-sm tracking-[0.3em] uppercase mb-4 block">
            {t("heritagePage.kicker")}
          </span>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-primary-foreground font-light mb-6">
            <Em text={t("heritagePage.title")} />
          </h1>
          <div className="gold-line mb-8" />
          <p className="text-primary-foreground/70 text-lg md:text-xl max-w-2xl mx-auto">
            {t("heritagePage.lead")}
          </p>
        </motion.div>
      </section>

      {/* The Land */}
      <section ref={arivanoRef} className="relative overflow-hidden py-24 md:py-32 bg-background">
        <EdgeRule src={marks.bar} className="top-8" />
        <Mark src={marks.crescent} className="-left-6 top-28 hidden h-72 xl:block" />
        <Mark src={marks.grove} className="bottom-10 right-8 h-14" />
        <div className="container relative z-10 mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isArivanoInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1 }}
              className="relative"
            >
              <div className="relative bg-primary p-12 lg:p-20">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                  src={arivanoHero}
                  alt={t("heritagePage.landscapes")}
                  className="w-full h-[500px] object-contain"
                />
                {/* Gold frame */}
                <div className="absolute inset-8 border border-gold-light/20 pointer-events-none" />
              </div>
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isArivanoInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute -bottom-6 -right-6 bg-accent text-accent-foreground p-6 hidden lg:flex flex-col items-center"
              >
                <Crown className="w-8 h-8 mb-2" strokeWidth={1} />
                <span className="text-xs tracking-[0.2em] uppercase">{t("heritagePage.theLand")}</span>
              </motion.div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isArivanoInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <span className="text-accent text-sm tracking-[0.3em] uppercase mb-4 block">
                {t("heritagePage.landscapes")}
              </span>
              <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-primary font-light mb-6 tracking-[0.1em]">
                {t("brands.talaName")}
              </h2>
              <div className="gold-line mb-8 mx-0" />
              
              <p className="text-foreground/80 text-lg leading-relaxed mb-6">
                {t("heritagePage.landP1")}
              </p>
              
              <p className="text-foreground/70 leading-relaxed mb-10">
                {t("heritagePage.landP2")}
              </p>

              {/* Features */}
              <div className="space-y-6">
                {arivanoFeatures.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isArivanoInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <feature.icon className="w-6 h-6 text-accent flex-shrink-0 mt-1" strokeWidth={1} />
                    <div>
                      <h4 className="font-serif text-lg text-primary mb-1">{feature.title}</h4>
                      <p className="text-muted-foreground text-sm">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Tasting Notes */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isArivanoInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="mt-12 p-6 border border-accent/20 bg-secondary/30"
              >
                <h4 className="font-serif text-lg text-primary mb-4">{t("heritagePage.ofPlace")}</h4>
                <div className="flex flex-wrap gap-3">
                  {placeNotes.map((note) => (
                    <span
                      key={note}
                      className="px-4 py-2 text-xs tracking-[0.15em] uppercase border border-accent/30 text-accent"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="bg-secondary py-8">
        <div className="container mx-auto px-6 flex items-center justify-center gap-6">
          <img src={marks.bar} alt="" aria-hidden className="hidden h-5 w-auto opacity-40 sm:block" />
          <div className="h-px flex-1 bg-accent/20" />
          <span className="font-serif text-xl text-accent italic">×</span>
          <div className="h-px flex-1 bg-accent/20" />
          <img src={marks.bar} alt="" aria-hidden className="hidden h-5 w-auto -scale-x-100 opacity-40 sm:block" />
        </div>
      </div>

      {/* The Gesture */}
      <section ref={olivoreRef} className="relative overflow-hidden py-24 md:py-32 bg-background">
        <Mark src={marks.loom} className="right-0 top-16 hidden h-64 lg:block" />
        <Mark src={marks.kilim} className="bottom-8 left-4 hidden h-28 md:block" />
        <EdgeRule src={marks.bar} className="bottom-8" />
        <div className="container relative z-10 mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isOlivoreInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1 }}
              className="lg:order-2"
            >
              <span className="text-accent text-sm tracking-[0.3em] uppercase mb-4 block">
                {t("heritagePage.savoir")}
              </span>
              <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-primary font-light mb-6 tracking-[0.1em]">
                {t("brands.handsName")}
              </h2>
              <div className="gold-line mb-8 mx-0" />
              
              <p className="text-foreground/80 text-lg leading-relaxed mb-6">
                {t("heritagePage.gestureP1")}
              </p>
              
              <p className="text-foreground/70 leading-relaxed mb-10">
                {t("heritagePage.gestureP2")}
              </p>

              {/* Features */}
              <div className="space-y-6">
                {olivoreFeatures.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isOlivoreInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <feature.icon className="w-6 h-6 text-accent flex-shrink-0 mt-1" strokeWidth={1} />
                    <div>
                      <h4 className="font-serif text-lg text-primary mb-1">{feature.title}</h4>
                      <p className="text-muted-foreground text-sm">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Tasting Notes */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isOlivoreInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="mt-12 p-6 border border-accent/20 bg-secondary/30"
              >
                <h4 className="font-serif text-lg text-primary mb-4">{t("heritagePage.ofGesture")}</h4>
                <div className="flex flex-wrap gap-3">
                  {gestureNotes.map((note) => (
                    <span
                      key={note}
                      className="px-4 py-2 text-xs tracking-[0.15em] uppercase border border-accent/30 text-accent"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isOlivoreInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative lg:order-1"
            >
              <div className="relative bg-secondary p-12 lg:p-20">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                  src={olivoreHero}
                  alt={t("heritagePage.theGesture")}
                  className="w-full h-[500px] object-contain"
                />
                {/* Gold frame */}
                <div className="absolute inset-8 border border-accent/20 pointer-events-none" />
              </div>
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isOlivoreInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 hidden lg:flex flex-col items-center"
              >
                <Leaf className="w-8 h-8 mb-2 text-gold-light" strokeWidth={1} />
                <span className="text-xs tracking-[0.2em] uppercase text-gold-light">{t("heritagePage.theGesture")}</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="relative overflow-hidden py-24 md:py-32 bg-primary">
        <Mark src={marks.lattice} deep className="left-4 top-28 hidden h-44 md:block" />
        <Mark src={marks.diamond} deep className="bottom-6 right-6 hidden h-28 md:block" />
        <div className="container relative z-10 mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-gold-light text-sm tracking-[0.3em] uppercase mb-4 block">
              {t("heritagePage.essence")}
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-primary-foreground font-light mb-6">
              <Em text={t("heritagePage.landAndCraft")} />
            </h2>
            <div className="gold-line" />
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-6">
                <span className="text-primary-foreground/40 text-sm uppercase tracking-wider">{t("heritagePage.feature")}</span>
              </div>
              <div className="p-6 bg-primary-foreground/5">
                <span className="font-serif text-2xl text-gold-light">{t("heritagePage.land")}</span>
              </div>
              <div className="p-6 bg-primary-foreground/5">
                <span className="font-serif text-2xl text-gold-light">{t("heritagePage.craft")}</span>
              </div>

              {rows.map((row, index) => (
                <>
                  <div key={`feature-${index}`} className="p-4 border-t border-primary-foreground/10">
                    <span className="text-primary-foreground/60 text-sm">{row.feature}</span>
                  </div>
                  <div key={`arivano-${index}`} className="p-4 border-t border-primary-foreground/10 bg-primary-foreground/5">
                    <span className="text-primary-foreground">{row.land}</span>
                  </div>
                  <div key={`olivore-${index}`} className="p-4 border-t border-primary-foreground/10 bg-primary-foreground/5">
                    <span className="text-primary-foreground">{row.craft}</span>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BrandsPage;
