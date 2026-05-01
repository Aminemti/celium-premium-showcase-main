import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import aboutHero from "@/assets/about-hero.jpg";
import oliveGrove from "@/assets/olive-grove.jpg";
import harvestDetail from "@/assets/harvest-detail.jpg";
import { Heart, Globe, Award, Users } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Passion",
    description: "Every bottle represents our deep love for olive oil craftsmanship, passed down through generations of Tunisian artisans.",
  },
  {
    icon: Globe,
    title: "Heritage",
    description: "Rooted in Tunisia's rich agricultural tradition, we honor centuries of knowledge while embracing modern excellence.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "Uncompromising standards guide every decision, from grove selection to final packaging.",
  },
  {
    icon: Users,
    title: "Partnership",
    description: "We build lasting relationships with our clients, becoming trusted partners in their culinary journey.",
  },
];

const timeline = [
  { year: "1875", event: "Our family's first olive groves planted in Northern Tunisia" },
  { year: "1920", event: "First cold-press facility established" },
  { year: "1985", event: "Beginning of international exports" },
  { year: "2010", event: "Launch of ARIVANO luxury line" },
  { year: "2018", event: "Introduction of OLIVORE premium range" },
  { year: "2024", event: "Expansion to 40+ countries worldwide" },
];

const AboutPage = () => {
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
            alt="Tunisian olive grove"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/50 to-primary/80" />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative z-10 text-center px-6"
        >
          <span className="text-gold-light text-sm tracking-[0.3em] uppercase mb-4 block">
            Our Story
          </span>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-primary-foreground font-light mb-6">
            About <span className="italic">CELIUM</span>
          </h1>
          <div className="gold-line mb-8" />
          <p className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto">
            A legacy of excellence, crafted in the heart of Tunisia's olive country.
          </p>
        </motion.div>
      </section>

      {/* Story Section */}
      <section ref={storyRef} className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isStoryInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1 }}
            >
              <span className="text-accent text-sm tracking-[0.3em] uppercase mb-4 block">
                The Beginning
              </span>
              <h2 className="font-serif text-4xl md:text-5xl text-primary font-light mb-8">
                A Tunisian <span className="italic">Legacy</span>
              </h2>
              <div className="gold-line mb-8 mx-0" />
              
              <div className="space-y-6 text-foreground/70 leading-relaxed">
                <p>
                  CELIUM Natural Oils was born from a simple yet profound belief: that 
                  Tunisia's exceptional olives deserve to be shared with the world in their 
                  purest, most exquisite form.
                </p>
                <p>
                  Our journey began in the sun-drenched groves of Northern Tunisia, where 
                  our founding family first cultivated olive trees over a century ago. 
                  Through generations of careful stewardship, we have preserved the ancient 
                  wisdom of olive oil production while embracing innovations that enhance 
                  quality without compromising authenticity.
                </p>
                <p>
                  Today, CELIUM stands as a beacon of Tunisian excellence, exporting 
                  premium olive oils to discerning markets across the globe. Every bottle 
                  carries the essence of our heritage—the warmth of Mediterranean sun, 
                  the richness of Tunisian soil, and the passion of artisans who treat 
                  each harvest as a sacred trust.
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
                  alt="Ancient olive grove"
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
                <span className="font-serif text-4xl text-gold-light block">150+</span>
                <span className="text-primary-foreground/70 text-sm tracking-[0.2em] uppercase">
                  Years of Heritage
                </span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 md:py-32 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-accent text-sm tracking-[0.3em] uppercase mb-4 block">
              Our Mission
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-primary font-light mb-8">
              Crafting <span className="italic">Liquid Gold</span>
            </h2>
            <div className="gold-line mb-8" />
            <blockquote className="font-serif text-2xl md:text-3xl text-foreground/80 italic leading-relaxed mb-8">
              "To share the finest expression of Tunisian olive oil with the world, 
              honoring tradition through uncompromising quality and sustainable practices 
              that preserve our land for future generations."
            </blockquote>
            <div className="flex justify-center">
              <div className="h-px w-24 bg-accent/30" />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section ref={valuesRef} className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            className="text-center mb-16"
          >
            <span className="text-accent text-sm tracking-[0.3em] uppercase mb-4 block">
              What Drives Us
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-primary font-light mb-6">
              Our <span className="italic">Values</span>
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
      <section className="relative h-[50vh] min-h-[400px]">
        <img
          src={harvestDetail}
          alt="Olive harvest"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/60 flex items-center justify-center">
          <div className="text-center px-6">
            <h3 className="font-serif text-3xl md:text-4xl text-primary-foreground mb-4">
              Every Olive, <span className="italic">Hand-Selected</span>
            </h3>
            <p className="text-primary-foreground/70 max-w-xl mx-auto">
              Our commitment to quality begins at the harvest, where experienced hands 
              select only the finest olives at their peak of ripeness.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section ref={timelineRef} className="py-24 md:py-32 bg-primary">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isTimelineInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            className="text-center mb-16"
          >
            <span className="text-gold-light text-sm tracking-[0.3em] uppercase mb-4 block">
              Our Journey
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-primary-foreground font-light mb-6">
              A Timeline of <span className="italic">Excellence</span>
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
