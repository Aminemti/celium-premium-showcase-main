import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    quote: "CELIUM's ARIVANO has redefined what we consider premium olive oil. The depth of flavor and the commitment to quality is unmatched in the industry.",
    author: "Jean-Pierre Dubois",
    role: "Executive Chef",
    company: "Le Bernardin, Paris",
  },
  {
    quote: "As a distributor for luxury food products, CELIUM stands out. Their attention to detail from production to packaging represents true artisanal excellence.",
    author: "Maria Fernandez",
    role: "Import Director",
    company: "Gourmet Europa",
  },
  {
    quote: "The purity and authenticity of CELIUM oils have made them our exclusive choice. Our customers recognize and appreciate the difference.",
    author: "Henrik Johansson",
    role: "Founder",
    company: "Nordic Fine Foods",
  },
];

export const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 md:py-24 bg-background relative overflow-hidden" ref={ref}>
      {/* Decorative olive branch pattern */}
      <div className="absolute top-20 left-10 w-32 h-32 border border-accent/10 rounded-full opacity-50" />
      <div className="absolute bottom-20 right-10 w-48 h-48 border border-accent/10 rounded-full opacity-50" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm tracking-[0.3em] uppercase mb-4 block">
            Testimonials
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary font-light mb-6">
            Trusted by <span className="italic">Excellence</span>
          </h2>
          <div className="gold-line" />
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            {/* Quote Icon */}
            <Quote className="w-16 h-16 text-accent/20 mx-auto mb-8" strokeWidth={1} />

            {/* Testimonial Content */}
            <div className="text-center min-h-[200px] flex flex-col justify-center">
              <motion.blockquote
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground/80 italic leading-relaxed mb-8"
              >
                "{testimonials[currentIndex].quote}"
              </motion.blockquote>

              <motion.div
                key={`author-${currentIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="gold-line mb-6" />
                <p className="font-serif text-lg text-primary tracking-wide">
                  {testimonials[currentIndex].author}
                </p>
                <p className="text-muted-foreground text-sm tracking-[0.15em] uppercase">
                  {testimonials[currentIndex].role}, {testimonials[currentIndex].company}
                </p>
              </motion.div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-6 mt-12">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={prevTestimonial}
                className="p-3 border border-accent/30 hover:border-accent hover:bg-accent/10 transition-all duration-300"
              >
                <ChevronLeft className="w-5 h-5 text-accent" />
              </motion.button>

              {/* Dots */}
              <div className="flex gap-3">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "bg-accent w-8"
                        : "bg-accent/30 hover:bg-accent/50"
                    }`}
                  />
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={nextTestimonial}
                className="p-3 border border-accent/30 hover:border-accent hover:bg-accent/10 transition-all duration-300"
              >
                <ChevronRight className="w-5 h-5 text-accent" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
