import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { resolveImage } from "@/data/collection";
import { useI18n, usePublicCollection } from "@/i18n/language";
import { EdgeRule, Mark, marks } from "@/components/decoration/OriginMarks";

const ProductsPage = () => {
  const content = usePublicCollection();
  const { t } = useI18n();
  const collections = content.collections.filter((collection) => collection.visibleOnCollectionPage);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="relative overflow-hidden pt-36 pb-16 md:pt-44 md:pb-20">
        <Mark src={marks.diamond} className="left-6 top-28 hidden h-16 md:block" />
        <Mark src={marks.spine} className="right-5 top-32 hidden h-40 lg:block" />
        <div className="container relative z-10 mx-auto px-6 text-center max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="text-accent text-sm tracking-[0.3em] uppercase">{t("collection.houseEyebrow")}</span>
            <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl text-primary font-light mt-6 mb-4">
              {t("collection.houseTitle")}
            </h1>
            <p className="font-serif text-2xl md:text-3xl text-primary/80 italic font-light">{t("collection.houseItalic")}</p>
            <div className="gold-line my-8" />
            <p className="text-muted-foreground text-lg">{t("collection.houseIntro")}</p>
            <p className="mt-8 text-sm tracking-[0.28em] uppercase text-accent">{t("collection.choose")}</p>
          </motion.div>
        </div>
      </section>

      <section className="relative overflow-hidden pb-24">
        <EdgeRule src={marks.bar} className="top-0" />
        <Mark src={marks.loom} className="left-0 top-24 hidden h-56 lg:block" />
        <Mark src={marks.lattice} className="-right-4 top-1/3 hidden h-52 xl:block" />
        <div className="container relative z-10 mx-auto px-6 max-w-6xl space-y-16 md:space-y-24">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8 }}
            >
              <Link to={`/collection/${collection.id}`} className="group grid items-center gap-8 md:grid-cols-2 md:gap-14">
                <div className={`overflow-hidden bg-cream ${index % 2 === 1 ? "md:order-2" : ""}`}>
                  <img
                    src={resolveImage(collection.cover)}
                    alt={collection.name}
                    className="h-[68vh] min-h-[420px] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </div>
                <div className={index % 2 === 1 ? "md:order-1" : ""}>
                  <p className="text-accent text-xs tracking-[0.28em] uppercase">{collection.badge}</p>
                  <h2 className="mt-4 font-serif text-5xl md:text-6xl font-light text-primary group-hover:text-accent transition-colors">
                    {collection.name}
                  </h2>
                  <div className="gold-line mx-0 my-6" />
                  <p className="text-lg leading-relaxed text-muted-foreground">{collection.line}</p>
                  <span className="mt-8 inline-flex text-sm tracking-[0.22em] uppercase text-primary group-hover:text-accent transition-colors">
                    {t("collection.enter")}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductsPage;
