import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { messages, type Lang } from "@/i18n/messages";
import { useCollection } from "@/lib/collection-store";
import type { CollectionContent } from "@/data/collection";

const STORAGE_KEY = "maison-frexes-lang";

type Tree = string | Tree[] | { [key: string]: Tree };

function readLang(): Lang {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "fr" || stored === "ar") return stored;
  } catch {
    /* keep the house language */
  }
  return "en";
}

function walk(tree: Tree, path: string): unknown {
  return path.split(".").reduce<unknown>((node, key) => {
    if (node && typeof node === "object" && key in (node as object)) {
      return (node as Record<string, unknown>)[key];
    }
    return undefined;
  }, tree);
}

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  dir: "ltr" | "rtl";
  t: (path: string) => string;
  tm: <T>(path: string) => T;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readLang);

  const setLang = (next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* the choice still holds for this visit */
    }
  };

  useEffect(() => {
    const dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    document.title = messages[lang].meta.title;
  }, [lang]);

  const value = useMemo<LanguageContextValue>(() => {
    const tree = messages[lang] as Tree;
    const fallback = messages.en as Tree;
    return {
      lang,
      setLang,
      dir: lang === "ar" ? "rtl" : "ltr",
      t: (path) => {
        const found = walk(tree, path);
        if (typeof found === "string") return found;
        const english = walk(fallback, path);
        return typeof english === "string" ? english : path;
      },
      tm: <T,>(path: string) => (walk(tree, path) ?? walk(fallback, path)) as T,
    };
  }, [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useI18n() {
  const value = useContext(LanguageContext);
  if (!value) throw new Error("useI18n must be used within LanguageProvider");
  return value;
}

export function Em({ text, className = "italic" }: { text: string; className?: string }) {
  const parts = text.split("*");
  if (parts.length < 3) return <>{text}</>;
  return (
    <>
      {parts[0]}
      <span className={className}>{parts[1]}</span>
      {parts.slice(2).join("*")}
    </>
  );
}

/** The collections and products are written in the admin, so they read the same in every language. */
export function usePublicCollection(): CollectionContent {
  const { content } = useCollection();
  return content;
}
