import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Clock, Send, Building, Globe } from "lucide-react";
import { Em, useI18n } from "@/i18n/language";
import { EdgeRule, Mark, marks } from "@/components/decoration/OriginMarks";

const infoIcons = [Mail, Phone, MapPin, Clock];
const inquiryValues = ["importer", "distributor", "grocery", "hotel", "restaurant", "chef", "press", "other"];

const ContactPage = () => {
  const { t, tm } = useI18n();
  const contactInfo = tm<{ title: string; value: string; description: string }[]>("contactPage.cards").map((card, index) => ({
    ...card,
    icon: infoIcons[index],
  }));
  const inquiryTypes = inquiryValues.map((value, index) => ({
    value,
    label: tm<string[]>("contactPage.types")[index],
  }));
  const heroRef = useRef(null);
  const formRef = useRef(null);

  const isHeroInView = useInView(heroRef, { once: true });
  const isFormInView = useInView(formRef, { once: true, margin: "-100px" });

  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    country: "",
    inquiryType: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: t("contactPage.toastTitle"),
      description: t("contactPage.toastBody"),
    });
    
    setFormData({
      name: "",
      email: "",
      company: "",
      country: "",
      inquiryType: "",
      message: "",
    });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative py-32 md:py-40 bg-primary overflow-hidden">
        <Mark src={marks.lattice} deep className="left-4 top-28 hidden h-44 md:block" />
        <Mark src={marks.diamond} deep className="right-8 top-32 hidden h-16 md:block" />
        <Mark src={marks.grove} deep className="bottom-8 left-10 hidden h-12 md:block" />
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
          animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="container mx-auto px-6 text-center relative z-10"
        >
          <span className="text-gold-light text-sm tracking-[0.3em] uppercase mb-4 block">
            {t("contactPage.kicker")}
          </span>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-primary-foreground font-light mb-6">
            <Em text={t("contactPage.title")} />
          </h1>
          <div className="gold-line mb-8" />
          <p className="text-primary-foreground/70 text-lg md:text-xl max-w-2xl mx-auto">
            {t("contactPage.lead")}
          </p>
        </motion.div>
      </section>

      {/* Contact Info Cards */}
      <section className="relative overflow-hidden py-24 md:py-32 bg-background">
        <Mark src={marks.crescent} className="-left-6 top-20 hidden h-72 xl:block" />
        <Mark src={marks.tree} className="bottom-8 right-6 hidden h-24 md:block" />
        <div className="container relative z-10 mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="p-8 border border-border hover:border-accent/30 bg-card transition-all duration-500 text-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="mb-4 inline-block"
                >
                  <info.icon className="w-10 h-10 text-accent mx-auto" strokeWidth={1} />
                </motion.div>
                <h3 className="font-serif text-lg text-primary mb-2">{info.title}</h3>
                <p className="text-foreground font-medium mb-1">{info.value}</p>
                <p className="text-muted-foreground text-sm">{info.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Form Section */}
          <div ref={formRef} className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isFormInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1 }}
              className="lg:col-span-2"
            >
              <span className="text-accent text-sm tracking-[0.3em] uppercase mb-4 block">
                {t("contactPage.profession")}
              </span>
              <h2 className="font-serif text-4xl md:text-5xl text-primary font-light mb-6">
                <Em text={t("contactPage.begin")} />
              </h2>
              <div className="gold-line mx-0 mb-8" />
              
              <p className="text-foreground/70 leading-relaxed mb-8">
                {t("contactPage.beginText")}
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Building className="w-6 h-6 text-accent flex-shrink-0 mt-1" strokeWidth={1} />
                  <div>
                    <h4 className="font-serif text-lg text-primary mb-1">{t("contactPage.forProfession")}</h4>
                    <p className="text-muted-foreground text-sm">
                      {t("contactPage.forProfessionText")}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Globe className="w-6 h-6 text-accent flex-shrink-0 mt-1" strokeWidth={1} />
                  <div>
                    <h4 className="font-serif text-lg text-primary mb-1">{t("contactPage.international")}</h4>
                    <p className="text-muted-foreground text-sm">
                      {t("contactPage.internationalText")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quote */}
              <div className="mt-12 p-6 bg-secondary border-l-4 border-accent">
                <p className="font-serif text-lg text-foreground/80 italic">
                  {t("contactPage.quote")}
                </p>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isFormInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 0.2 }}
              className="lg:col-span-3"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm tracking-wider text-foreground/70 block mb-2">
                      {t("contactPage.fullName")}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-border bg-background text-foreground focus:border-accent focus:outline-none transition-colors"
                      placeholder={t("contact.namePh")}
                    />
                  </div>
                  <div>
                    <label className="text-sm tracking-wider text-foreground/70 block mb-2">
                      {t("contactPage.email")}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-border bg-background text-foreground focus:border-accent focus:outline-none transition-colors"
                      placeholder={t("contact.emailPh")}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm tracking-wider text-foreground/70 block mb-2">
                      {t("contactPage.company")}
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-border bg-background text-foreground focus:border-accent focus:outline-none transition-colors"
                      placeholder={t("contactPage.companyPh")}
                    />
                  </div>
                  <div>
                    <label className="text-sm tracking-wider text-foreground/70 block mb-2">
                      {t("contactPage.country")}
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-border bg-background text-foreground focus:border-accent focus:outline-none transition-colors"
                      placeholder={t("contactPage.countryPh")}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm tracking-wider text-foreground/70 block mb-2">
                    {t("contactPage.inquiry")}
                  </label>
                  <select
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-border bg-background text-foreground focus:border-accent focus:outline-none transition-colors appearance-none cursor-pointer"
                  >
                    <option value="">{t("contactPage.select")}</option>
                    {inquiryTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm tracking-wider text-foreground/70 block mb-2">
                    {t("contactPage.message")}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-border bg-background text-foreground focus:border-accent focus:outline-none transition-colors resize-none"
                    placeholder={t("contactPage.messagePh")}
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-12 py-4 bg-primary text-primary-foreground font-light tracking-[0.15em] uppercase text-sm hover:bg-primary/90 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    t("contactPage.sending")
                  ) : (
                    <>
                      {t("contactPage.send")}
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Placeholder / CTA */}
      <section className="relative overflow-hidden py-24 md:py-32 bg-secondary">
        <EdgeRule src={marks.bar} className="top-8" />
        <Mark src={marks.kilim} className="right-2 bottom-8 hidden h-32 md:block" />
        <div className="container mx-auto px-6 text-center">
          <span className="text-accent text-sm tracking-[0.3em] uppercase mb-4 block">
            {t("contactPage.visit")}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-primary font-light mb-6">
            <Em text={t("contactPage.theHouse")} />
          </h2>
          <div className="gold-line mb-8" />
          <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
            {t("contactPage.visitText")}
          </p>
          
          <div className="bg-primary/5 border border-border p-12 md:p-16 max-w-4xl mx-auto">
            <MapPin className="w-16 h-16 text-accent/30 mx-auto mb-6" strokeWidth={1} />
            <p className="font-serif text-xl text-primary mb-2">Maison Frexes</p>
            <p className="text-muted-foreground">
              {t("footer.place")}<br />
              {t("contactPage.placeLine")}
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
