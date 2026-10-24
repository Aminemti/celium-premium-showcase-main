import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useI18n } from "@/i18n/language";
import logoOnDark from "@/assets/brand/maison-frexes-dark.png";
import { Mark, marks } from "@/components/decoration/OriginMarks";

const quickLinks = [
  { key: "nav.house", href: "/the-house" },
  { key: "nav.heritage", href: "/heritage" },
  { key: "nav.craft", href: "/craftsmanship" },
  { key: "nav.collection", href: "/collection" },
  { key: "nav.sustainability", href: "/sustainability" },
  { key: "nav.journal", href: "/journal" },
  { key: "nav.contact", href: "/contact" },
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useI18n();

  return (
    <footer className="relative overflow-hidden bg-primary pt-0 pb-12">
      <Mark src={marks.grove} deep className="bottom-6 left-6 hidden h-12 md:block" />
      <Mark src={marks.diamond} deep className="bottom-8 right-8 hidden h-16 md:block" />
      {/* Golden separator line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-accent to-transparent mb-12" />
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Left Column - Logo & Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-1"
          >
            {/* Logo with Leaf */}
            <Link to="/" className="inline-block mb-6" aria-label="Maison Frexes">
              <img src={logoOnDark} alt="Maison Frexes" className="h-20 w-auto object-contain" />
            </Link>

            {/* Description */}
            <p className="text-primary-foreground/70 text-sm leading-relaxed mb-6 max-w-sm">
              {t("footer.blurb")}
            </p>

            {/* Copyright */}
            <p className="text-primary-foreground/50 text-sm">
              © {currentYear} Maison Frexes. {t("footer.rights")}
            </p>
          </motion.div>

          {/* Middle Column - Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-1"
          >
            <h4 className="font-serif text-lg text-accent mb-6 tracking-wide">
              {t("footer.house")}
            </h4>
            <nav className="flex flex-col gap-3">
              {quickLinks.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="text-primary-foreground/70 hover:text-accent text-sm transition-colors duration-300"
                >
                  {t(item.key)}
                </Link>
              ))}
            </nav>
          </motion.div>

          {/* Right Column - Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-1"
          >
            <h4 className="font-serif text-lg text-accent mb-6 tracking-wide">
              {t("footer.contact")}
            </h4>
            <div className="flex flex-col gap-2">
              <p className="text-primary-foreground/70 text-sm">{t("footer.place")}</p>
              <p className="text-primary-foreground/50 text-sm">contact@maisonfrexes.com</p>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};