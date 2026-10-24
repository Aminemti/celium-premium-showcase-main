import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { PieceSlides } from "@/components/collection/PieceSlides";
import { resolveImage, type Product } from "@/data/collection";
import { useI18n, usePublicCollection } from "@/i18n/language";
import { EdgeRule, Mark, marks } from "@/components/decoration/OriginMarks";

/** The plates grow when a collection holds few products, and the line always stays centred. */
function plateWidth(count: number) {
  if (count === 1) return "w-full max-w-[20rem]";
  if (count === 2) return "w-[46%] max-w-[17rem]";
  if (count === 3) return "w-[46%] sm:w-[31%] max-w-[14rem]";
  if (count === 4) return "w-[46%] sm:w-[31%] lg:w-[23%] max-w-[12rem]";
  return "w-[46%] sm:w-[31%] lg:w-[19%] max-w-[10rem]";
}

const CollectionStudyPage = () => {
  const { id = "" } = useParams();
  const content = usePublicCollection();
  const { t } = useI18n();
  const collection = content.collections.find((item) => item.id === id);
  const sections = collection?.sections.filter((section) => section.visible) ?? [];
  const products = content.products.filter((product) => product.collectionId === id);
  const [open, setOpen] = useState<Product | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!collection) return <Navigate to="/collection" replace />;

  return (
    <div className="min-h-screen bg-[hsl(42,38%,91%)]">
      <Header />

      <section className="relative overflow-hidden">
        <div className="relative h-[78vh] min-h-[520px]">
          <img src={resolveImage(collection.cover)} alt={collection.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/30 to-primary/25" />
          <div className="absolute inset-x-0 bottom-0 px-6 pb-14 md:px-16 md:pb-16">
            <div className="mx-auto max-w-6xl">
              <Link to="/collection" className="text-xs tracking-[0.28em] uppercase text-primary-foreground/80 hover:text-accent transition-colors">
                {t("collection.back")}
              </Link>
              <p className="mt-6 text-accent text-xs tracking-[0.28em] uppercase">{collection.badge}</p>
              <h1 className="mt-4 font-serif text-6xl md:text-7xl lg:text-8xl font-light text-primary-foreground">{collection.name}</h1>
              <p className="mt-4 max-w-2xl font-serif text-2xl italic font-light text-primary-foreground/85">{collection.line}</p>
            </div>
          </div>
        </div>
      </section>

      {collection.description && (
        <section className="relative overflow-hidden py-16 md:py-20">
          <Mark src={marks.diamond} className="left-6 top-10 hidden h-14 md:block" />
          <Mark src={marks.spine} className="right-4 top-8 hidden h-36 lg:block" />
          <div className="container relative z-10 mx-auto max-w-3xl px-6 text-center">
            <p className="text-lg leading-relaxed text-muted-foreground">{collection.description}</p>
          </div>
        </section>
      )}

      {sections.length === 0 && (
        <section className="relative overflow-hidden border-y border-border/60 bg-card/40 py-16">
          <Mark src={marks.kilim} className="left-4 top-8 hidden h-24 md:block" />
          <div className="container relative z-10 mx-auto max-w-3xl px-6 text-center">
            <p className="text-accent text-xs tracking-[0.28em] uppercase">{t("collection.heldKicker")}</p>
            <h2 className="mt-4 font-serif text-4xl md:text-5xl font-light text-primary">{t("collection.heldTitle")}</h2>
            <div className="gold-line my-6" />
            <p className="leading-relaxed text-muted-foreground">{t("collection.heldBody")}</p>
          </div>
        </section>
      )}

      {sections.length > 0 && (
        <div className="relative overflow-hidden">
          <Mark src={marks.loom} className="left-0 top-16 hidden h-56 lg:block" />
          <Mark src={marks.lattice} className="-right-6 top-1/4 hidden h-56 xl:block" />
          {sections.map((section, index) => (
            <section
              key={section.id}
              id={index === 0 ? "thala" : undefined}
              className="relative scroll-mt-24 overflow-hidden py-16 md:py-24"
            >
              <div className="container relative z-10 mx-auto grid items-center gap-10 px-6 md:grid-cols-2 md:gap-16">
                <figure className={index % 2 === 1 ? "md:order-2" : ""}>
                  {section.image ? (
                    <img
                      src={resolveImage(section.image)}
                      alt=""
                      className="h-[52vh] min-h-[320px] w-full object-cover"
                    />
                  ) : (
                    <div className="h-[52vh] min-h-[320px] w-full bg-cream" />
                  )}
                </figure>
                <div className={index % 2 === 1 ? "md:order-1" : ""}>
                  <p className="text-accent text-xs tracking-[0.28em] uppercase">{section.kicker}</p>
                  <h2 className="mt-4 font-serif text-4xl md:text-5xl font-light text-primary">{section.title}</h2>
                  <div className="gold-line mx-0 my-6" />
                  <p className="text-lg leading-relaxed text-muted-foreground">{section.body}</p>
                </div>
              </div>
            </section>
          ))}
        </div>
      )}

      {products.length > 0 && (
        <section className="border-t border-accent/20 py-16 md:py-24">
          <div className="mx-auto w-full px-6 md:px-10 lg:px-14">
            <div className="flex flex-wrap items-start justify-center gap-x-4 gap-y-12">
              {products.map((product) => (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => setOpen(product)}
                  className={`group text-center ${plateWidth(products.length)}`}
                >
                  <div className="aspect-square overflow-hidden bg-[hsl(40,32%,96%)]">
                    {product.images[0] ? (
                      <img
                        src={resolveImage(product.images[0])}
                        alt=""
                        className="h-full w-full object-cover object-center transition duration-700 ease-out group-hover:scale-[1.04]"
                      />
                    ) : null}
                  </div>
                  <p className="mt-3 font-serif text-base font-light text-primary md:text-lg">{product.name || "Untitled"}</p>
                  {product.price ? <p className="mt-1.5 text-sm text-primary/80">{product.price}</p> : null}
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-primary/55">
                    {product.inStock ? t("collection.inStock") : t("collection.outOfStock")}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      <Dialog open={!!open} onOpenChange={(next) => !next && setOpen(null)}>
        <DialogContent className="z-[80] max-h-[92vh] max-w-4xl gap-0 overflow-y-auto border-border bg-background p-0 sm:rounded-none [&>button]:right-5 [&>button]:top-5 [&>button]:rounded-full [&>button]:bg-background/90 [&>button]:p-1.5 [&>button]:text-primary [&>button]:opacity-100">
          {open && (
            <div className="grid md:grid-cols-2">
              <PieceSlides key={open.id} images={open.images} alt={open.name} />
              <div className="flex flex-col justify-center px-8 py-12 md:px-12 md:py-16">
                <p className="text-xs uppercase tracking-[0.28em] text-accent">{collection.name}</p>
                <DialogTitle className="mt-4 font-serif text-4xl font-light text-primary md:text-5xl">{open.name}</DialogTitle>
                <DialogDescription className="mt-6 text-base leading-relaxed text-muted-foreground">{open.description}</DialogDescription>
                <ul className="mt-8 space-y-3">
                  {open.price ? (
                    <li className="text-xs uppercase tracking-[0.18em] text-primary">{open.price}</li>
                  ) : null}
                  <li className="text-xs uppercase tracking-[0.18em] text-primary">
                    {open.inStock ? t("collection.inStock") : t("collection.outOfStock")}
                  </li>
                </ul>
                <Link
                  to="/contact"
                  onClick={() => setOpen(null)}
                  className="mt-10 inline-flex text-sm uppercase tracking-[0.22em] text-primary transition-colors hover:text-accent"
                >
                  {t("collection.write")}
                </Link>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <section className="relative overflow-hidden border-t border-border/60 py-20">
        <EdgeRule src={marks.bar} className="top-6" />
        <Mark src={marks.grove} className="left-8 bottom-8 hidden h-12 md:block" />
        <div className="container relative z-10 mx-auto px-6 text-center">
          <p className="font-serif text-2xl italic text-primary md:text-3xl">{collection.name}</p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-8">
            <Link to="/collection" className="text-sm uppercase tracking-[0.22em] text-primary transition-colors hover:text-accent">
              {t("collection.back")}
            </Link>
            <Link to="/contact" className="text-sm uppercase tracking-[0.22em] text-primary transition-colors hover:text-accent">
              {t("collection.write")}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CollectionStudyPage;
