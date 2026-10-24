import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, MapPin, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Em, useI18n } from "@/i18n/language";
import { Mark, marks } from "@/components/decoration/OriginMarks";

export const ContactSection = () => {
  const { t } = useI18n();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: t("contact.toastTitle"),
      description: t("contact.toastBody"),
    });

    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section id="contact" className="relative overflow-hidden py-16 md:py-24 bg-background" ref={ref}>
      <Mark src={marks.bar} className="left-6 top-1/2 hidden h-8 -translate-y-1/2 md:block" />
      <Mark src={marks.tree} className="bottom-8 right-8 hidden h-20 md:block" />
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1 }}
          >
            <span className="text-accent text-sm tracking-[0.3em] uppercase mb-4 block">
              {t("contact.kicker")}
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary font-light mb-6">
              <Em text={t("contact.title")} />
            </h2>
            <div className="gold-line mb-8 mx-0" />

            <p className="text-foreground/70 text-lg leading-relaxed mb-12">
              {t("contact.intro")}
            </p>

            {/* Contact Details */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex items-start gap-4"
              >
                <div className="w-12 h-12 border border-accent/30 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-serif text-lg text-primary mb-1">{t("contact.location")}</h4>
                  <p className="text-muted-foreground">{t("contact.place")}</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex items-start gap-4"
              >
                <div className="w-12 h-12 border border-accent/30 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-serif text-lg text-primary mb-1">{t("contact.email")}</h4>
                  <p className="text-muted-foreground">contact@maisonfrexes.com</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex items-start gap-4"
              >
                <div className="w-12 h-12 border border-accent/30 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-serif text-lg text-primary mb-1">{t("contact.phone")}</h4>
                  <p className="text-muted-foreground">+216 XX XXX XXX</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-secondary/50 p-8 lg:p-12 border border-border"
            >
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm tracking-[0.15em] uppercase text-muted-foreground mb-2"
                    >
                      {t("contact.name")}
                    </label>
                    <Input
                      id="name"
                      name="name"
                      required
                      className="bg-background border-border focus:border-accent focus:ring-accent"
                      placeholder={t("contact.namePh")}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm tracking-[0.15em] uppercase text-muted-foreground mb-2"
                    >
                      {t("contact.email")}
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="bg-background border-border focus:border-accent focus:ring-accent"
                      placeholder={t("contact.emailPh")}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm tracking-[0.15em] uppercase text-muted-foreground mb-2"
                  >
                    {t("contact.subject")}
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    required
                    className="bg-background border-border focus:border-accent focus:ring-accent"
                      placeholder={t("contact.subjectPh")}
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm tracking-[0.15em] uppercase text-muted-foreground mb-2"
                  >
                    {t("contact.message")}
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="bg-background border-border focus:border-accent focus:ring-accent resize-none"
                    placeholder={t("contact.messagePh")}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-olive-medium text-primary-foreground py-6 text-sm tracking-[0.2em] uppercase transition-all duration-300 group"
                >
                  {isSubmitting ? (
                    t("contact.sending")
                  ) : (
                    <>
                      {t("contact.send")}
                      <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
