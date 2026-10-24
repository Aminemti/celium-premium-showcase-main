import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useI18n } from "@/i18n/language";
import { LanguageSelect } from "@/components/layout/LanguageSelect";
import logoOnLight from "@/assets/brand/maison-frexes-light.png";
import logoOnDark from "@/assets/brand/maison-frexes-dark.png";

const navHrefs = [
  { key: "nav.home", href: "/" },
  { key: "nav.collection", href: "/collection" },
  { key: "nav.house", href: "/the-house" },
  { key: "nav.heritage", href: "/heritage" },
  { key: "nav.craft", href: "/craftsmanship" },
  { key: "nav.sustainability", href: "/sustainability" },
  { key: "nav.journal", href: "/journal" },
  { key: "nav.contact", href: "/contact" },
];

export const Header = () => {
  const [atTop, setAtTop] = useState(true);
  const [hidden, setHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuOpen = useRef(false);
  const { t } = useI18n();
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const darkHero = ["/", "/the-house", "/heritage", "/craftsmanship", "/sustainability", "/journal", "/contact"].includes(location.pathname);
  const minimized = !atTop;
  const solidHeader = minimized || !darkHero;

  useEffect(() => {
    menuOpen.current = isMobileMenuOpen;
  }, [isMobileMenuOpen]);

  useEffect(() => {
    let anchor = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y <= 8) {
        setAtTop(true);
        setHidden(false);
        anchor = y;
      } else if (!menuOpen.current) {
        setAtTop(false);
        if (y > anchor + 8) {
          setHidden(true);
          anchor = y;
        } else if (y < anchor - 8) {
          setHidden(false);
          anchor = y;
        }
      } else {
        setAtTop(false);
        setHidden(false);
        anchor = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const getTextColor = () => {
    if (solidHeader) return "text-primary";
    if (!isHomePage) return "text-primary-foreground";
    return "text-primary-foreground";
  };

  const getHoverColor = () => {
    if (solidHeader) return "hover:text-accent";
    return "hover:text-gold-light";
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: hidden ? "-110%" : 0, opacity: hidden ? 0 : 1 }}
        transition={{ duration: hidden ? 0.35 : 0.45, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,padding,box-shadow] duration-500 ${
          hidden ? "pointer-events-none" : ""
        } ${
          minimized
            ? "bg-background/95 py-2 shadow-soft backdrop-blur-md"
            : solidHeader
              ? "bg-background/95 py-4 shadow-soft backdrop-blur-md"
              : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.02 }}>
            <Link to="/" className="block" aria-label="Maison Frexes">
              <img
                src={solidHeader ? logoOnLight : logoOnDark}
                alt="Maison Frexes"
                className={`w-auto object-contain transition-[height] duration-500 ${
                  minimized ? "h-10 md:h-12" : "h-16 md:h-20"
                }`}
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="flex items-center gap-3">
          <nav className="hidden xl:flex items-center gap-4 2xl:gap-6">
            {navHrefs.map((item) => (
              <motion.div key={item.href} whileHover={{ y: -2 }}>
                <Link
                  to={item.href}
                  className={`relative text-[10px] 2xl:text-xs tracking-[0.14em] uppercase font-light whitespace-nowrap transition-colors duration-300 group ${
                    solidHeader
                      ? "text-foreground hover:text-accent"
                      : "text-primary-foreground/90 hover:text-primary-foreground"
                  } ${location.pathname === item.href ? "text-accent" : ""}`}
                >
                  {t(item.key)}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-accent transition-all duration-300 ${
                      location.pathname === item.href ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              </motion.div>
            ))}
          </nav>
          <LanguageSelect light={!solidHeader} />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`xl:hidden p-2 transition-colors ${getTextColor()}`}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-primary pt-24 xl:hidden overflow-y-auto"
          >
            <nav className="flex flex-col items-center gap-5 p-8 pb-16">
              {navHrefs.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={item.href}
                    className={`text-xl font-serif tracking-[0.14em] ${
                      location.pathname === item.href
                        ? "text-gold-light"
                        : "text-primary-foreground"
                    }`}
                  >
                    {t(item.key)}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
