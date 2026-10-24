import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { thalaImages } from "@/data/cillitana";
import { isCollectionOpen, resolveImage } from "@/data/collection";
import { useI18n, usePublicCollection } from "@/i18n/language";
import { EdgeRule, Mark, marks } from "@/components/decoration/OriginMarks";

export const FeaturedProductsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const content = usePublicCollection();
  const { t } = useI18n();
  const collections = content.collections
    .filter((collection) => collection.featuredOnHome)
    .map((collection) => ({
      ...collection,
      image: resolveImage(collection.cover),
      href: isCollectionOpen(collection, content.products) ? `/collection/${collection.id}` : "",
    }));

  return (
    <section ref={ref} className="relative overflow-hidden py-16 md:py-24 bg-background">
      <EdgeRule src={marks.bar} className="bottom-6" />
      <Mark src={marks.loom} className="right-0 top-16 hidden h-56 lg:block" />
      <Mark src={marks.grove} className="bottom-10 left-6 hidden h-14 md:block" />
      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm tracking-[0.3em] uppercase font-medium">
            {content.homeEyebrow}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mt-4 mb-6">
            {content.homeTitle}
          </h2>
          <div className="gold-line mb-6" />
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            {content.homeSubtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="group"
            >
              <div className="bg-card border border-border/50 overflow-hidden transition-all duration-500 hover:shadow-elevated hover:border-accent/30">
                <div className="relative aspect-[4/5] overflow-hidden bg-cream">
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className={`w-full h-full object-cover object-center transition-transform duration-700 ${
                      collection.href ? "group-hover:scale-105" : "scale-105"
                    }`}
                  />
                  {!collection.href && <div className="absolute inset-0 bg-primary/45" />}

                  <div className="absolute top-4 left-4">
                    <span className="bg-accent text-accent-foreground text-xs font-medium px-3 py-1.5 tracking-wider uppercase">
                      {collection.badge}
                    </span>
                  </div>

                  {collection.href && (
                    <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <Link
                        to={collection.href}
                        className="bg-background text-foreground px-6 py-3 text-sm tracking-wider uppercase font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                      >
                        {t("featured.discover")}
                      </Link>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <span className="text-accent text-xs tracking-[0.2em] uppercase">Maison Frexes</span>
                  <h3 className="font-serif text-2xl text-foreground mt-2 mb-3 group-hover:text-accent transition-colors">
                    {collection.name}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{collection.line}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mb-14"
        >
          <Link to="/collection/cillitana#thala" className="group relative block overflow-hidden">
            <img
              src={thalaImages.groves}
              alt={t("thala.altLand")}
              className="h-[46vh] min-h-[300px] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/45 to-primary/15" />
            <div className="absolute inset-0 flex items-end px-8 py-10 md:px-14 md:py-12">
              <div className="max-w-xl text-primary-foreground">
                <p className="text-accent text-xs tracking-[0.28em] uppercase">{t("thala.homeKicker")}</p>
                <h3 className="font-serif text-4xl md:text-5xl font-light mt-3">{t("thala.title")}</h3>
                <p className="mt-4 text-primary-foreground/85 leading-relaxed">{t("thala.homeLine")}</p>
              </div>
            </div>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center"
        >
          <Link
            to="/collection"
            className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 text-sm tracking-[0.2em] uppercase font-medium hover:bg-accent hover:text-accent-foreground transition-all duration-300 group"
          >
            {t("collection.discover")} {content.homeTitle}
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
