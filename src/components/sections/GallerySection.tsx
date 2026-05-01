import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";

import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";

const galleryItems = [
  {
    src: gallery1,
    title: "The Harvest",
    description: "Hand-picked olives from our Tunisian groves",
    gridClass: "md:col-span-1 md:row-span-2",
  },
  {
    src: gallery2,
    title: "Our Collection",
    description: "Premium olive oil varieties for every palate",
    gridClass: "md:col-span-2 md:row-span-1",
  },
  {
    src: gallery3,
    title: "Liquid Gold",
    description: "Pure, unfiltered extra virgin excellence",
    gridClass: "md:col-span-1 md:row-span-1",
  },
  {
    src: gallery4,
    title: "Culinary Art",
    description: "Elevating dishes with Mediterranean flavors",
    gridClass: "md:col-span-1 md:row-span-1",
  },
  {
    src: gallery5,
    title: "Ancient Heritage",
    description: "Centuries-old olive trees, timeless tradition",
    gridClass: "md:col-span-1 md:row-span-2",
  },
  {
    src: gallery6,
    title: "Quality Assured",
    description: "Scientific precision meets artisan craft",
    gridClass: "md:col-span-2 md:row-span-2",
  },
];

export const GallerySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-16 md:py-24 bg-background relative overflow-hidden" ref={ref}>
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-64 h-64 border border-accent/10 rounded-full opacity-30" />
      <div className="absolute bottom-40 left-10 w-32 h-32 border border-accent/10 rounded-full opacity-30" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm tracking-[0.3em] uppercase mb-4 block">
            Gallery
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary font-light mb-6">
            A World of <span className="italic">Purity</span>
          </h2>
          <div className="gold-line" />
          <p className="mt-6 text-muted-foreground max-w-2xl mx-auto text-lg">
            Explore the artistry behind CELIUM — from sun-drenched groves to the elegance of our final products.
          </p>
        </motion.div>

        {/* Masonry Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[220px]">
          {galleryItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`relative group overflow-hidden cursor-pointer ${item.gridClass}`}
            >
              {/* Image */}
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Default subtle overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />

              {/* Hover overlay - Light effect fading from bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-accent/80 via-accent/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Gold accent line on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

              {/* Content overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                {/* Text container with slide up animation */}
                <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="font-serif text-2xl md:text-3xl text-primary-foreground mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 drop-shadow-lg">
                    {item.title}
                  </h3>
                  <p className="text-primary-foreground/90 text-sm md:text-base opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 drop-shadow-md">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Elegant corner accents */}
              <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-accent/0 group-hover:border-accent/80 transition-all duration-500" />
              <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-accent/0 group-hover:border-accent/80 transition-all duration-500" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-accent/0 group-hover:border-accent/80 transition-all duration-500" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-accent/0 group-hover:border-accent/80 transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
