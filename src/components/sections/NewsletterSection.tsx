import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Em, useI18n } from "@/i18n/language";
import { Mark, marks } from "@/components/decoration/OriginMarks";

export const NewsletterSection = () => {
  const { t } = useI18n();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: t("newsletter.toastTitle"),
        description: t("newsletter.toastBody"),
      });
      setEmail("");
    }
  };

  return (
    <section
      className="py-16 md:py-24 bg-primary relative overflow-hidden"
      ref={ref}
    >
      <Mark src={marks.lattice} deep className="left-2 top-10 hidden h-44 md:block" />
      <Mark src={marks.spine} deep className="bottom-6 right-6 hidden h-40 lg:block" />
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Floating elements */}
      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-[15%] hidden lg:block"
      >
        <Sparkles className="w-8 h-8 text-gold-light/30" />
      </motion.div>
      <motion.div
        animate={{ y: [10, -10, 10] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-[15%] hidden lg:block"
      >
        <Sparkles className="w-6 h-6 text-gold-light/30" />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
          >
            <span className="text-gold-light text-sm tracking-[0.3em] uppercase mb-4 block">
              {t("newsletter.kicker")}
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary-foreground font-light mb-6">
              <Em text={t("newsletter.title")} />
            </h2>
            <div className="gold-line mb-8" />
            <p className="text-primary-foreground/70 text-lg leading-relaxed mb-12 max-w-xl mx-auto">
              {t("newsletter.intro")}
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
          >
            <div className="flex-1 relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("newsletter.placeholder")}
                className="w-full px-6 py-4 bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-gold-light transition-colors duration-300 text-sm tracking-wider"
                required
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="group px-8 py-4 bg-accent text-accent-foreground font-light tracking-[0.15em] uppercase text-sm hover:shadow-gold transition-all duration-300 flex items-center justify-center gap-2"
            >
              {t("newsletter.receive")}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>
          </motion.form>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-primary-foreground/40 text-xs mt-6 tracking-wider"
          >
            {t("newsletter.note")}
          </motion.p>
        </div>
      </div>
    </section>
  );
};
