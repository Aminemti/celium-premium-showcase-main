import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import qualityBadge from "@/assets/quality-badge.jpg";
import harvestDetail from "@/assets/harvest-detail.jpg";
import processHero from "@/assets/process-hero.jpg";
import { Shield, Leaf, Award, Sparkles, CheckCircle, Beaker, ThermometerSun, Eye } from "lucide-react";

const qualityPillars = [
  {
    icon: Leaf,
    title: "Careful Selection",
    description: "Every olive is hand-picked at the optimal moment of ripeness. Our expert harvesters know exactly when each variety reaches its peak, ensuring the purest flavor profile and highest nutritional value in every drop.",
  },
  {
    icon: Shield,
    title: "Uncompromising Purity",
    description: "Zero additives, zero shortcuts. Our oils are 100% natural, free from any artificial enhancers, preservatives, or blending with lesser oils. What you taste is pure Tunisian olive excellence.",
  },
  {
    icon: Award,
    title: "Excellence Certified",
    description: "Every batch undergoes rigorous laboratory testing and sensory evaluation by trained experts. We meet and exceed the highest international standards for olive oil quality.",
  },
  {
    icon: Sparkles,
    title: "Artisanal Process",
    description: "Traditional cold-pressing methods meet modern precision. We preserve the authentic character of Tunisian olive oil while ensuring consistent quality across every bottle.",
  },
];

const testingProcess = [
  {
    icon: Beaker,
    title: "Chemical Analysis",
    description: "Free acidity, peroxide value, UV absorbance, and fatty acid composition are tested in our on-site laboratory.",
  },
  {
    icon: Eye,
    title: "Sensory Evaluation",
    description: "Trained panelists assess aroma, taste, and mouthfeel according to international olive oil council standards.",
  },
  {
    icon: ThermometerSun,
    title: "Freshness Testing",
    description: "We monitor oxidation levels and ensure optimal storage conditions to preserve freshness until bottling.",
  },
];

const certifications = [
  "ISO 22000 Food Safety",
  "HACCP Certified",
  "IOC Standards Compliant",
  "EU Quality Mark",
  "Organic Certification Available",
  "Halal Certified",
];

const QualityPage = () => {
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
        
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1 }}
          >
            <span className="text-gold-light text-sm tracking-[0.3em] uppercase mb-4 block">
              Our Commitment
            </span>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-primary-foreground font-light mb-6">
              Uncompromising <span className="italic">Quality</span>
            </h1>
            <div className="gold-line mx-0 mb-8" />
            <p className="text-primary-foreground/70 text-lg md:text-xl max-w-xl">
              From grove to bottle, every step reflects our dedication to delivering 
              nothing but the finest natural oils to discerning palates worldwide.
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
                alt="Quality certification badge"
                className="w-80 h-80 object-cover mx-auto rounded-full shadow-gold"
              />
              <div className="absolute inset-0 rounded-full border-2 border-gold-light/30 scale-110" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quality Pillars */}
      <section ref={pillarsRef} className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isPillarsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            className="text-center mb-20"
          >
            <span className="text-accent text-sm tracking-[0.3em] uppercase mb-4 block">
              The Four Pillars
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-primary font-light mb-6">
              Foundations of <span className="italic">Excellence</span>
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
          alt="Olive harvest detail"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/70 flex items-center justify-center">
          <blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl text-primary-foreground italic text-center max-w-3xl px-6">
            "Quality is not an act, it is a habit — embedded in every stage of our process."
          </blockquote>
        </div>
      </section>

      {/* Testing Process */}
      <section ref={processRef} className="py-24 md:py-32 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isProcessInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1 }}
            >
              <span className="text-accent text-sm tracking-[0.3em] uppercase mb-4 block">
                Quality Control
              </span>
              <h2 className="font-serif text-4xl md:text-5xl text-primary font-light mb-6">
                Rigorous <span className="italic">Testing</span>
              </h2>
              <div className="gold-line mx-0 mb-8" />
              <p className="text-foreground/70 leading-relaxed mb-10">
                Every batch of CELIUM oil undergoes comprehensive testing before 
                it earns our seal of approval. Our state-of-the-art laboratory 
                and trained sensory panels ensure that only oils meeting our 
                exacting standards reach your table.
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
                  alt="Quality testing process"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-4 border border-accent/30 pointer-events-none" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section ref={certRef} className="py-24 md:py-32 bg-primary">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isCertInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            className="text-center mb-16"
          >
            <span className="text-gold-light text-sm tracking-[0.3em] uppercase mb-4 block">
              Recognized Excellence
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-primary-foreground font-light mb-6">
              Our <span className="italic">Certifications</span>
            </h2>
            <div className="gold-line mb-8" />
            <p className="text-primary-foreground/70 max-w-2xl mx-auto">
              We maintain the highest industry certifications, ensuring our products 
              meet global standards for safety, quality, and authenticity.
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
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-accent text-sm tracking-[0.3em] uppercase mb-4 block">
              Our Promise
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-primary font-light mb-8">
              The CELIUM <span className="italic">Guarantee</span>
            </h2>
            <div className="gold-line mb-8" />
            <p className="text-foreground/70 text-lg leading-relaxed mb-12">
              We stand behind every bottle that bears the CELIUM name. Our quality 
              guarantee ensures that if you're ever unsatisfied with the quality 
              of our products, we will make it right. This is our commitment to 
              you, our valued partner in the pursuit of culinary excellence.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "100% Authentic", description: "Pure Tunisian olive oil, never blended" },
                { title: "Fresh Guarantee", description: "Optimal shelf life from production" },
                { title: "Traceability", description: "Full transparency from grove to bottle" },
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
