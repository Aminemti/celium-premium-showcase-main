import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import oliveGrove from "@/assets/origin/thala-groves-dawn.jpg";
import harvestDetail from "../../thala/Gemini_Generated_Image_qyl2f4qyl2f4qyl2.jpg";
import { Leaf, Droplets, Sun } from "lucide-react";
import { Em, useI18n } from "@/i18n/language";
import { EdgeRule, Mark, marks } from "@/components/decoration/OriginMarks";

const icons = [Leaf, Droplets, Sun];

const SustainabilityPage = () => {
  const { t, tm } = useI18n();
  const commitments = tm<{ title: string; description: string }[]>("sustainPage.items").map((item, index) => ({
    ...item,
    icon: icons[index],
  }));
  const heroRef = useRef(null);
  const bodyRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const isBodyInView = useInView(bodyRef, { once: true, margin: "-100px" });

  return (
    <div className="min-h-screen">
      <Header />

      <section ref={heroRef} className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={oliveGrove} alt={t("housePage.altGrove")} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/50 to-primary/80" />
        </div>
        <Mark src={marks.spine} deep className="left-5 top-28 hidden h-40 lg:block" />
        <Mark src={marks.grove} deep className="bottom-8 left-10 hidden h-12 md:block" />
        <Mark src={marks.diamond} deep className="bottom-10 right-8 hidden h-20 md:block" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative z-10 text-center px-6"
        >
          <span className="text-gold-light text-sm tracking-[0.3em] uppercase mb-4 block">{t("sustainPage.kicker")}</span>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-primary-foreground font-light mb-6">
            <Em text={t("sustainPage.title")} />
          </h1>
          <div className="gold-line mb-8" />
          <p className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto">
            {t("sustainPage.lead")}
          </p>
        </motion.div>
      </section>

      <section ref={bodyRef} className="relative overflow-hidden py-24 md:py-32 bg-background">
        <EdgeRule src={marks.bar} className="top-8" />
        <Mark src={marks.crescent} className="-right-4 top-16 hidden h-72 xl:block" />
        <Mark src={marks.tree} className="bottom-6 left-6 hidden h-24 md:block" />
        <div className="container relative z-10 mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <span className="text-accent text-sm tracking-[0.3em] uppercase mb-4 block">{t("sustainPage.care")}</span>
            <h2 className="font-serif text-4xl md:text-5xl text-primary font-light mb-6">
              <Em text={t("sustainPage.quiet")} />
            </h2>
            <div className="gold-line mb-8" />
            <p className="text-foreground/70 leading-relaxed">
              {t("sustainPage.body")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {commitments.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isBodyInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.15 * index }}
                className="p-8 border border-border hover:border-accent/30 transition-all duration-500"
              >
                <item.icon className="w-10 h-10 text-accent mb-6" strokeWidth={1} />
                <h3 className="font-serif text-2xl text-primary mb-4">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative h-[46vh] min-h-[320px] overflow-hidden">
        <img src={harvestDetail} alt={t("housePage.altHarvest")} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-primary/65 flex items-center justify-center px-6">
          <blockquote className="font-serif text-2xl md:text-4xl text-primary-foreground italic text-center max-w-3xl">
            {t("sustainPage.quote")}
          </blockquote>
        </div>
        <Mark src={marks.kilim} deep className="left-4 bottom-6 z-20 hidden h-28 md:block" />
        <Mark src={marks.loom} deep className="right-0 top-8 z-20 hidden h-52 lg:block" />
      </section>

      <Footer />
    </div>
  );
};

export default SustainabilityPage;
