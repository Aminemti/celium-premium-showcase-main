import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { useI18n } from "@/i18n/language";
import { Mark, marks } from "@/components/decoration/OriginMarks";

const NotFound = () => {
  const { t } = useI18n();
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6">
      <Header />
      <Mark src={marks.diamond} className="left-6 top-28 hidden h-16 md:block" />
      <Mark src={marks.tree} className="bottom-10 right-8 hidden h-24 md:block" />
      <Mark src={marks.spine} className="right-6 top-32 hidden h-40 lg:block" />
      <div className="text-center">
        <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4">Maison Frexes</p>
        <h1 className="font-serif text-6xl text-primary font-light mb-4">404</h1>
        <p className="mb-8 text-lg text-muted-foreground">{t("missing.text")}</p>
        <Link to="/" className="text-sm tracking-[0.2em] uppercase text-primary hover:text-accent transition-colors">
          {t("missing.back")}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
