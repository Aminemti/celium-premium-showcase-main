import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import aboutHero from "../../thala/Gemini_Generated_Image_qyl2f4qyl2f4qyl2.jpg";
import oliveGrove from "@/assets/origin/thala-groves-dawn.jpg";
import harvestDetail from "@/assets/origin/thala-hands.jpg";
import mill from "@/assets/origin/thala-mill.jpg";
import { thalaImages } from "@/data/cillitana";
import { Heart, Globe, Award, Users } from "lucide-react";
import { Em, useI18n } from "@/i18n/language";
import { EdgeRule, Mark, marks } from "@/components/decoration/OriginMarks";

const valueIcons = [Heart, Globe, Award, Users];

const AboutPage = () => {
  const { t, tm } = useI18n();
  const values = tm<{ title: string; description: string }[]>("housePage.values").map((value, index) => ({
    ...value,
    icon: valueIcons[index],
  }));
  const timeline = tm<{ year: string; event: string }[]>("housePage.timeline");
  const studies = tm<{ kicker: string; title: string; text: string }[]>("collection.studies");
  const studyImages = [thalaImages.colonnade, thalaImages.townBottle, mill, harvestDetail];
  const heroRef = useRef(null);
  const storyRef = useRef(null);
  const valuesRef = useRef(null);
  const timelineRef = useRef(null);

  const isHeroInView = useInView(heroRef, { once: true });
  const isStoryInView = useInView(storyRef, { once: true, margin: "-100px" });
  const isValuesInView = useInView(valuesRef, { once: true, margin: "-100px" });
  const isTimelineInView = useInView(timelineRef, { once: true, margin: "-100px" });

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={aboutHero}
            alt={t("housePage.altHero")}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/50 to-primary/80" />
        </div>
        <Mark src={marks.diamond} deep className="left-6 top-28 hidden h-16 md:block" />
        <Mark src={marks.spine} deep className="right-6 top-28 hidden h-44 lg:block" />
        <Mark src={marks.tree} deep className="bottom-8 left-8 hidden h-24 md:block" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative z-10 text-center px-6"
        >
          <span className="text-gold-light text-sm tracking-[0.3em] uppercase mb-4 block">
            {t("housePage.kicker")}
          </span>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-primary-foreground font-light mb-6">
            Maison <span className="italic">Frexes</span>
          </h1>
          <div className="gold-line mb-8" />
          <p className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto">
            {t("housePage.lead")}
          </p>
        </motion.div>
      </section>

      {/* Story Section */}
      <section ref={storyRef} className="relative overflow-hidden py-24 md:py-32 bg-background">
        <EdgeRule src={marks.bar} className="top-8" />
        <Mark src={marks.crescent} className="-left-6 top-24 hidden h-72 xl:block" />
        <Mark src={marks.grove} className="bottom-10 right-8 hidden h-14 md:block" />
        <div className="container relative z-10 mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isStoryInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1 }}
            >
              <span className="text-accent text-sm tracking-[0.3em] uppercase mb-4 block">
                {t("housePage.presentation")}
              </span>
              <h2 className="font-serif text-4xl md:text-5xl text-primary font-light mb-8">
                <Em text={t("housePage.enter")} />
              </h2>
              <div className="gold-line mb-8 mx-0" />
              
              <div className="space-y-6 text-foreground/70 leading-relaxed">
                <p>
                  {t("housePage.p1")}
                </p>
                <p>
                  {t("housePage.p2")}
                </p>
                <p>
                  {t("housePage.p3")}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isStoryInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                <img
                  src={oliveGrove}
                  alt={t("housePage.altGrove")}
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-4 border border-accent/30 pointer-events-none" />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isStoryInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute -bottom-8 -left-8 bg-primary p-8 hidden lg:block"
              >
                <span className="font-serif text-4xl text-gold-light block">{t("housePage.tala")}</span>
                <span className="text-primary-foreground/70 text-sm tracking-[0.2em] uppercase">
                  {t("housePage.theLand")}
                </span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="relative overflow-hidden py-24 md:py-32 bg-secondary">
        <Mark src={marks.loom} className="right-0 top-12 hidden h-64 lg:block" />
        <Mark src={marks.kilim} className="bottom-8 left-4 hidden h-28 md:block" />
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-accent text-sm tracking-[0.3em] uppercase mb-4 block">
              {t("housePage.signature")}
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-primary font-light mb-8">
              <Em text={t("housePage.notShop")} />
            </h2>
            <div className="gold-line mb-8" />
            <blockquote className="font-serif text-2xl md:text-3xl text-foreground/80 italic leading-relaxed mb-8">
              {t("housePage.quote")}
            </blockquote>
            <div className="flex justify-center">
              <div className="h-px w-24 bg-accent/30" />
            </div>
          </div>
        </div>
      </section>

      <div className="relative overflow-hidden bg-[hsl(42,38%,91%)]">
        <Mark src={marks.loom} className="left-0 top-16 hidden h-56 lg:block" />
        <Mark src={marks.lattice} className="-right-6 top-1/4 hidden h-56 xl:block" />
        {studies.map((study, index) => (
          <section key={study.title} className="relative overflow-hidden py-16 md:py-24">
            <div className="container relative z-10 mx-auto grid items-center gap-10 px-6 md:grid-cols-2 md:gap-16">
              <figure className={index % 2 === 1 ? "md:order-2" : ""}>
                <img src={studyImages[index] || studyImages[0]} alt="" className="h-[52vh] min-h-[320px] w-full object-cover" />
              </figure>
              <div className={index % 2 === 1 ? "md:order-1" : ""}>
                <p className="text-accent text-xs tracking-[0.28em] uppercase">{study.kicker}</p>
                <h2 className="mt-4 font-serif text-4xl md:text-5xl font-light text-primary">{study.title}</h2>
                <div className="gold-line mx-0 my-6" />
                <p className="text-lg leading-relaxed text-muted-foreground">{study.text}</p>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Values Section */}
      <section ref={valuesRef} className="relative overflow-hidden py-24 md:py-32 bg-background">
        <EdgeRule src={marks.bar} className="bottom-8" />
        <Mark src={marks.lattice} className="-right-4 top-16 hidden h-56 xl:block" />
        <div className="container relative z-10 mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            className="text-center mb-16"
          >
            <span className="text-accent text-sm tracking-[0.3em] uppercase mb-4 block">
              {t("housePage.keeps")}
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-primary font-light mb-6">
              <Em text={t("housePage.measures")} />
            </h2>
            <div className="gold-line" />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                className="text-center p-8 border border-border hover:border-accent/30 transition-all duration-500 group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="mb-6 inline-block"
                >
                  <value.icon className="w-12 h-12 text-accent mx-auto" strokeWidth={1} />
                </motion.div>
                <h3 className="font-serif text-xl text-primary mb-4">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Harvest Image Section */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <img
          src={harvestDetail}
          alt={t("housePage.altHarvest")}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/60 flex items-center justify-center">
          <div className="text-center px-6">
            <h3 className="font-serif text-3xl md:text-4xl text-primary-foreground mb-4">
              <Em text={t("housePage.byHand")} />
            </h3>
            <p className="text-primary-foreground/70 max-w-xl mx-auto">
              {t("housePage.byHandText")}
            </p>
          </div>
        </div>
        <Mark src={marks.bar} deep className="left-6 top-1/2 z-20 hidden h-8 -translate-y-1/2 md:block" />
        <Mark src={marks.bar} deep className="right-6 top-1/2 z-20 hidden h-8 -translate-y-1/2 -scale-x-100 md:block" />
      </section>

      {/* Timeline Section */}
      <section ref={timelineRef} className="relative overflow-hidden py-24 md:py-32 bg-primary">
        <Mark src={marks.lattice} deep className="left-4 top-16 hidden h-44 md:block" />
        <Mark src={marks.diamond} deep className="bottom-6 right-6 hidden h-28 md:block" />
        <div className="container relative z-10 mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isTimelineInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            className="text-center mb-16"
          >
            <span className="text-gold-light text-sm tracking-[0.3em] uppercase mb-4 block">
              {t("housePage.heritage")}
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-primary-foreground font-light mb-6">
              <Em text={t("housePage.fromLand")} />
            </h2>
            <div className="gold-line" />
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={isTimelineInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                className="flex items-start gap-8 mb-8 last:mb-0"
              >
                <div className="flex-shrink-0 w-20 text-right">
                  <span className="font-serif text-2xl text-gold-light">{item.year}</span>
                </div>
                <div className="relative flex-shrink-0">
                  <div className="w-3 h-3 rounded-full bg-gold-light" />
                  {index < timeline.length - 1 && (
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-px h-16 bg-gold-light/30" />
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <p className="text-primary-foreground/80">{item.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
