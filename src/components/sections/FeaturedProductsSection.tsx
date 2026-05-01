import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";
import arivanoBottle from "@/assets/arivano-bottle.jpg";
import olivoreBottle from "@/assets/olivore-bottle.jpg";

const featuredProducts = [
  {
    id: 1,
    name: "ARIVANO Reserve",
    category: "Extra Virgin Olive Oil",
    description: "Our flagship luxury olive oil with intense fruity notes and a peppery finish.",
    price: "148 TND",
    volume: "500ml",
    image: arivanoBottle,
    rating: 5,
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "OLIVORE Classic",
    category: "Premium Olive Oil",
    description: "Smooth and balanced, perfect for everyday culinary excellence.",
    price: "92 TND",
    volume: "750ml",
    image: olivoreBottle,
    rating: 4,
    badge: "Popular",
  },
  {
    id: 3,
    name: "ARIVANO Limited Edition",
    category: "Single Estate",
    description: "Rare harvest from century-old trees, limited to 500 bottles annually.",
    price: "396 TND",
    volume: "250ml",
    image: arivanoBottle,
    rating: 5,
    badge: "Limited",
  },
];

export const FeaturedProductsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm tracking-[0.3em] uppercase font-medium">
            Our Collection
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mt-4 mb-6">
            Featured Products
          </h2>
          <div className="gold-line mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Discover our most celebrated olive oils and natural oils, crafted with passion and 
            perfected through generations of expertise.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="group"
            >
              <div className="bg-card border border-border/50 overflow-hidden transition-all duration-500 hover:shadow-elevated hover:border-accent/30">
                {/* Product Image */}
                <div className="relative aspect-[4/5] overflow-hidden bg-cream">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-accent text-accent-foreground text-xs font-medium px-3 py-1.5 tracking-wider uppercase">
                      {product.badge}
                    </span>
                  </div>

                  {/* Quick View Overlay */}
                  <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <Link
                      to="/products"
                      className="bg-background text-foreground px-6 py-3 text-sm tracking-wider uppercase font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  {/* Category */}
                  <span className="text-accent text-xs tracking-[0.2em] uppercase">
                    {product.category}
                  </span>

                  {/* Name */}
                  <h3 className="font-serif text-xl text-foreground mt-2 mb-2 group-hover:text-accent transition-colors">
                    {product.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={i < product.rating ? "fill-accent text-accent" : "text-border"}
                      />
                    ))}
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Price & Volume */}
                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <span className="font-serif text-2xl text-foreground">
                      {product.price}
                    </span>
                    <span className="text-muted-foreground text-sm">
                      {product.volume}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center"
        >
          <Link
            to="/products"
            className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 text-sm tracking-[0.2em] uppercase font-medium hover:bg-accent hover:text-accent-foreground transition-all duration-300 group"
          >
            View All Products
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
