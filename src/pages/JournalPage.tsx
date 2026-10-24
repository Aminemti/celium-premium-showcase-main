import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import gallery1 from "../../thala/Gemini_Generated_Image_xh0ogqxh0ogqxh0o.jpg";
import gallery5 from "@/assets/origin/thala-hands.jpg";
import gallery6 from "../../thala/Gemini_Generated_Image_tvqz8ytvqz8ytvqz.jpg";
import { Em, useI18n } from "@/i18n/language";
import { EdgeRule, Mark, marks } from "@/components/decoration/OriginMarks";

const images = [gallery5, gallery1, gallery6];

const JournalPage = () => {
  const { t, tm } = useI18n();
  const entries = tm<{ kicker: string; title: string; text: string }[]>("journalPage.entries").map((entry, index) => ({
    ...entry,
    image: images[index],
  }));
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div className="min-h-screen">
      <Header />

      <section className="relative pt-32 pb-20 bg-primary overflow-hidden">
        <Mark src={marks.diamond} deep className="left-6 top-28 hidden h-16 md:block" />
        <Mark src={marks.spine} deep className="right-6 top-28 hidden h-44 lg:block" />
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="container mx-auto px-6 text-center relative z-10"
        >
          <span className="text-gold-light text-sm tracking-[0.3em] uppercase mb-4 block">{t("journalPage.kicker")}</span>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-primary-foreground font-light mb-6">
            <Em text={t("journalPage.title")} />
          </h1>
          <div className="gold-line mb-8" />
          <p className="text-primary-foreground/70 text-lg md:text-xl max-w-2xl mx-auto">
            {t("journalPage.lead")}
          </p>
        </motion.div>
      </section>

      <section ref={ref} className="relative overflow-hidden py-24 md:py-32 bg-background">
        <EdgeRule src={marks.bar} className="top-8" />
        <Mark src={marks.loom} className="left-0 top-24 hidden h-60 lg:block" />
        <Mark src={marks.kilim} className="bottom-8 right-4 hidden h-32 md:block" />
        <div className="container relative z-10 mx-auto px-6 max-w-5xl space-y-24">
          {entries.map((entry, index) => (
            <motion.article
              key={entry.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.12 }}
              className="grid lg:grid-cols-2 gap-10 items-center"
            >
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <div className="relative overflow-hidden">
                  <img src={entry.image} alt={entry.title} className="w-full h-[360px] object-cover" />
                  <div className="absolute inset-4 border border-accent/30 pointer-events-none" />
                </div>
              </div>
              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                <span className="text-accent text-sm tracking-[0.3em] uppercase mb-4 block">{entry.kicker}</span>
                <h2 className="font-serif text-4xl text-primary font-light mb-6">{entry.title}</h2>
                <div className="gold-line mx-0 mb-6" />
                <p className="text-foreground/70 leading-relaxed">{entry.text}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default JournalPage;
