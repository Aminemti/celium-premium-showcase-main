import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Leaf } from "lucide-react";

const quickLinks = [
  { name: "About Us", href: "/about" },
  { name: "Our Brands", href: "/brands" },
  { name: "Quality", href: "/quality" },
  { name: "Contact", href: "/contact" },
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary pt-0 pb-12">
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
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <Leaf size={24} className="text-accent" />
              <h3 className="font-serif text-2xl text-accent tracking-[0.15em]">
                CELIUM
              </h3>
            </Link>

            {/* Description */}
            <p className="text-primary-foreground/70 text-sm leading-relaxed mb-6 max-w-sm">
              Pure Nature in Every Drop. Premium natural oils and olive oils from Tunisia, crafted with care for international markets.
            </p>

            {/* Copyright */}
            <p className="text-primary-foreground/50 text-sm">
              © {currentYear} CELIUM Natural Oils. All rights reserved.
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
              Quick Links
            </h4>
            <nav className="flex flex-col gap-3">
              {quickLinks.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-primary-foreground/70 hover:text-accent text-sm transition-colors duration-300"
                >
                  {item.name}
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
              Contact
            </h4>
            <div className="flex flex-col gap-2">
              <p className="text-primary-foreground/70 text-sm">Tunisia</p>
              <p className="text-primary-foreground/50 text-sm italic">Email coming soon</p>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};