import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import arivanoHero from "@/assets/arivano-hero.jpg";
import olivoreHero from "@/assets/olivore-hero.jpg";
import { Crown, Gem, Star, Droplets, Leaf, Award } from "lucide-react";

const arivanoFeatures = [
  { icon: Crown, title: "Single Estate", description: "Sourced exclusively from our premier grove in Northern Tunisia" },
  { icon: Gem, title: "Limited Production", description: "Only 5,000 bottles produced each harvest season" },
  { icon: Star, title: "Award Winning", description: "Gold medal winner at international olive oil competitions" },
];

const olivoreFeatures = [
  { icon: Droplets, title: "Pure Blend", description: "Expertly blended from select Tunisian olive varieties" },
  { icon: Leaf, title: "Everyday Luxury", description: "Premium quality for daily culinary excellence" },
  { icon: Award, title: "Certified Quality", description: "Meets the highest international quality standards" },
];

const BrandsPage = () => {
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
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative z-10 text-center px-6"
        >
          <span className="text-gold-light text-sm tracking-[0.3em] uppercase mb-4 block">
            Our Collection
          </span>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-primary-foreground font-light mb-6">
            Premium <span className="italic">Brands</span>
          </h1>
          <div className="gold-line mb-8" />
          <p className="text-primary-foreground/70 text-lg md:text-xl max-w-2xl mx-auto">
            Two distinguished lines, each representing the pinnacle of olive oil excellence.
          </p>
        </motion.div>
      </section>

      {/* ARIVANO Section */}
      <section ref={arivanoRef} className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-6">
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
                  alt="ARIVANO Luxury Extra Virgin Olive Oil"
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
                <span className="text-xs tracking-[0.2em] uppercase">Luxury Line</span>
              </motion.div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isArivanoInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <span className="text-accent text-sm tracking-[0.3em] uppercase mb-4 block">
                Luxury Extra Virgin
              </span>
              <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-primary font-light mb-6 tracking-[0.1em]">
                ARIVANO
              </h2>
              <div className="gold-line mb-8 mx-0" />
              
              <p className="text-foreground/80 text-lg leading-relaxed mb-6">
                The crown jewel of the CELIUM collection. ARIVANO represents the absolute 
                pinnacle of olive oil excellence—a single-estate extra virgin olive oil 
                crafted for those who accept nothing less than perfection.
              </p>
              
              <p className="text-foreground/70 leading-relaxed mb-10">
                Harvested from ancient olive trees on our premier estate, each bottle of 
                ARIVANO is cold-pressed within hours of picking, preserving the vibrant 
                flavors and exceptional nutritional properties that define truly exceptional 
                olive oil. With notes of fresh grass, artichoke, and a distinctive peppery 
                finish, ARIVANO transforms every dish into a culinary masterpiece.
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
                <h4 className="font-serif text-lg text-primary mb-4">Tasting Notes</h4>
                <div className="flex flex-wrap gap-3">
                  {["Fresh Grass", "Artichoke", "Green Almond", "Pepper", "Herbaceous"].map((note) => (
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
        <div className="container mx-auto px-6 flex items-center justify-center gap-8">
          <div className="h-px flex-1 bg-accent/20" />
          <span className="font-serif text-xl text-accent italic">×</span>
          <div className="h-px flex-1 bg-accent/20" />
        </div>
      </div>

      {/* OLIVORE Section */}
      <section ref={olivoreRef} className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isOlivoreInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1 }}
              className="lg:order-2"
            >
              <span className="text-accent text-sm tracking-[0.3em] uppercase mb-4 block">
                Premium Olive Oil
              </span>
              <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-primary font-light mb-6 tracking-[0.1em]">
                OLIVORE
              </h2>
              <div className="gold-line mb-8 mx-0" />
              
              <p className="text-foreground/80 text-lg leading-relaxed mb-6">
                Where accessibility meets excellence. OLIVORE brings the refined quality 
                of CELIUM to everyday cooking, offering a premium olive oil that elevates 
                every meal without compromise.
              </p>
              
              <p className="text-foreground/70 leading-relaxed mb-10">
                Expertly blended from select Tunisian olive varieties, OLIVORE delivers 
                consistent quality and balanced flavor that makes it perfect for both 
                cooking and finishing. Its mild, fruity character with subtle buttery notes 
                complements a wide range of cuisines, from Mediterranean classics to 
                contemporary fusion dishes.
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
                <h4 className="font-serif text-lg text-primary mb-4">Tasting Notes</h4>
                <div className="flex flex-wrap gap-3">
                  {["Mild Fruit", "Butter", "Ripe Olive", "Smooth", "Balanced"].map((note) => (
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
                  alt="OLIVORE Premium Olive Oil"
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
                <span className="text-xs tracking-[0.2em] uppercase text-gold-light">Premium Line</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-24 md:py-32 bg-primary">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-gold-light text-sm tracking-[0.3em] uppercase mb-4 block">
              Choose Your Experience
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-primary-foreground font-light mb-6">
              Compare Our <span className="italic">Oils</span>
            </h2>
            <div className="gold-line" />
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-6">
                <span className="text-primary-foreground/40 text-sm uppercase tracking-wider">Feature</span>
              </div>
              <div className="p-6 bg-primary-foreground/5">
                <span className="font-serif text-2xl text-gold-light">ARIVANO</span>
              </div>
              <div className="p-6 bg-primary-foreground/5">
                <span className="font-serif text-2xl text-gold-light">OLIVORE</span>
              </div>

              {[
                { feature: "Type", arivano: "Extra Virgin", olivore: "Premium Blend" },
                { feature: "Origin", arivano: "Single Estate", olivore: "Multi-Source" },
                { feature: "Production", arivano: "Limited", olivore: "Year-Round" },
                { feature: "Best For", arivano: "Finishing", olivore: "Cooking" },
                { feature: "Flavor Profile", arivano: "Bold & Complex", olivore: "Mild & Balanced" },
              ].map((row, index) => (
                <>
                  <div key={`feature-${index}`} className="p-4 border-t border-primary-foreground/10">
                    <span className="text-primary-foreground/60 text-sm">{row.feature}</span>
                  </div>
                  <div key={`arivano-${index}`} className="p-4 border-t border-primary-foreground/10 bg-primary-foreground/5">
                    <span className="text-primary-foreground">{row.arivano}</span>
                  </div>
                  <div key={`olivore-${index}`} className="p-4 border-t border-primary-foreground/10 bg-primary-foreground/5">
                    <span className="text-primary-foreground">{row.olivore}</span>
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
