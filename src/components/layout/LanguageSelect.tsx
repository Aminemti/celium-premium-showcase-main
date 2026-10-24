import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useI18n } from "@/i18n/language";
import type { Lang } from "@/i18n/messages";

const options: { id: Lang; label: string; short: string }[] = [
  { id: "en", label: "English", short: "EN" },
  { id: "fr", label: "Français", short: "FR" },
  { id: "ar", label: "العربية", short: "ع" },
];

export const LanguageSelect = ({ light = false }: { light?: boolean }) => {
  const { lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const current = options.find((option) => option.id === lang) ?? options[0];

  useEffect(() => {
    const onPointer = (event: MouseEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div ref={root} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={current.label}
        onClick={() => setOpen((value) => !value)}
        className={`group flex items-center gap-2 border px-3 py-1.5 text-[10px] tracking-[0.28em] uppercase transition-colors duration-300 ${
          light
            ? "border-primary-foreground/30 text-primary-foreground hover:border-gold-light"
            : "border-primary/20 text-primary hover:border-accent"
        }`}
      >
        <span className="text-accent">{current.short}</span>
        <span className={lang === "ar" ? "tracking-normal font-serif text-sm normal-case" : ""}>
          {current.label}
        </span>
        <ChevronDown
          size={12}
          className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.25 }}
            className="absolute end-0 top-full z-[80] mt-3 min-w-[11.5rem] border border-border bg-background/95 py-2 shadow-soft backdrop-blur-md"
          >
            {options.map((option) => {
              const active = option.id === lang;
              return (
                <li key={option.id}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={active}
                    onClick={() => {
                      setLang(option.id);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center justify-between px-4 py-2.5 text-start transition-colors duration-300 hover:bg-secondary ${
                      active ? "text-accent" : "text-primary"
                    }`}
                  >
                    <span className={`font-serif text-lg ${option.id === "ar" ? "tracking-normal" : ""}`}>
                      {option.label}
                    </span>
                    <span className="text-[10px] tracking-[0.22em]">{option.short}</span>
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};
