import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Star, Filter, Grid, List, ChevronDown } from "lucide-react";
import arivanoBottle from "@/assets/arivano-bottle.jpg";
import olivoreBottle from "@/assets/olivore-bottle.jpg";

const allProducts = [
  {
    id: 1,
    name: "ARIVANO Reserve",
    category: "Extra Virgin",
    brand: "ARIVANO",
    description: "Our flagship luxury olive oil with intense fruity notes and a peppery finish. Cold-pressed within hours of harvest.",
    price: "148 TND",
    volume: "500ml",
    image: arivanoBottle,
    rating: 5,
    badge: "Best Seller",
    intensity: "Robust",
  },
  {
    id: 2,
    name: "OLIVORE Classic",
    category: "Premium",
    brand: "OLIVORE",
    description: "Smooth and balanced, perfect for everyday culinary excellence. Versatile and refined.",
    price: "92 TND",
    volume: "750ml",
    image: olivoreBottle,
    rating: 4,
    badge: "Popular",
    intensity: "Medium",
  },
  {
    id: 3,
    name: "ARIVANO Limited Edition",
    category: "Single Estate",
    brand: "ARIVANO",
    description: "Rare harvest from century-old trees, limited to 500 bottles annually. A collector's treasure.",
    price: "396 TND",
    volume: "250ml",
    image: arivanoBottle,
    rating: 5,
    badge: "Limited",
    intensity: "Intense",
  },
  {
    id: 4,
    name: "OLIVORE Organic",
    category: "Organic",
    brand: "OLIVORE",
    description: "Certified organic olive oil from sustainable groves. Pure, natural, and environmentally conscious.",
    price: "115 TND",
    volume: "500ml",
    image: olivoreBottle,
    rating: 5,
    badge: "Organic",
    intensity: "Delicate",
  },
  {
    id: 5,
    name: "ARIVANO Early Harvest",
    category: "Extra Virgin",
    brand: "ARIVANO",
    description: "Harvested at the peak of freshness for maximum polyphenols and vibrant green color.",
    price: "181 TND",
    volume: "500ml",
    image: arivanoBottle,
    rating: 5,
    badge: "New",
    intensity: "Robust",
  },
  {
    id: 6,
    name: "OLIVORE Infused Collection",
    category: "Infused",
    brand: "OLIVORE",
    description: "Premium olive oil infused with Mediterranean herbs and spices. Perfect for finishing dishes.",
    price: "105 TND",
    volume: "250ml",
    image: olivoreBottle,
    rating: 4,
    badge: "Chef's Choice",
    intensity: "Medium",
  },
  {
    id: 7,
    name: "ARIVANO Gift Set",
    category: "Gift Set",
    brand: "ARIVANO",
    description: "An exquisite trio of our finest oils in a luxurious presentation box. The perfect gift.",
    price: "495 TND",
    volume: "3x250ml",
    image: arivanoBottle,
    rating: 5,
    badge: "Gift",
    intensity: "Varied",
  },
  {
    id: 8,
    name: "OLIVORE Light",
    category: "Premium",
    brand: "OLIVORE",
    description: "Delicate and mild, ideal for baking and light preparations. Subtle olive essence.",
    price: "79 TND",
    volume: "750ml",
    image: olivoreBottle,
    rating: 4,
    badge: null,
    intensity: "Delicate",
  },
];

const categories = ["All", "Extra Virgin", "Premium", "Single Estate", "Organic", "Infused", "Gift Set"];
const brands = ["All", "ARIVANO", "OLIVORE"];

const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const filteredProducts = allProducts.filter((product) => {
    const categoryMatch = selectedCategory === "All" || product.category === selectedCategory;
    const brandMatch = selectedBrand === "All" || product.brand === selectedBrand;
    return categoryMatch && brandMatch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-primary">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/90 to-primary" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <span className="text-gold-light text-sm tracking-[0.3em] uppercase font-medium">
              Our Collection
            </span>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-primary-foreground mt-4 mb-6">
              Premium Olive Oils
            </h1>
            <div className="gold-line mb-6" />
            <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg">
              Explore our curated selection of exceptional olive oils, each bottle 
              representing the finest of Tunisian craftsmanship.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 border-b border-border bg-card">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Category Filters */}
            <div className="flex items-center gap-2 flex-wrap justify-center">
              <Filter size={18} className="text-muted-foreground mr-2" />
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 text-sm tracking-wider uppercase transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-background text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Brand & View Controls */}
            <div className="flex items-center gap-4">
              {/* Brand Dropdown */}
              <div className="relative">
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="appearance-none bg-background border border-border px-4 py-2 pr-10 text-sm tracking-wider uppercase cursor-pointer focus:outline-none focus:border-accent"
                >
                  {brands.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand === "All" ? "All Brands" : brand}
                    </option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              </div>

              {/* View Toggle */}
              <div className="flex border border-border">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 transition-colors ${
                    viewMode === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Grid size={18} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 transition-colors ${
                    viewMode === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section ref={ref} className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          {/* Results Count */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="text-muted-foreground mb-8"
          >
            Showing {filteredProducts.length} products
          </motion.p>

          {/* Grid View */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
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
                      
                      {product.badge && (
                        <div className="absolute top-4 left-4">
                          <span className="bg-accent text-accent-foreground text-xs font-medium px-3 py-1.5 tracking-wider uppercase">
                            {product.badge}
                          </span>
                        </div>
                      )}

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                        <button className="bg-background text-foreground px-6 py-3 text-sm tracking-wider uppercase font-medium hover:bg-accent hover:text-accent-foreground transition-colors">
                          Quick View
                        </button>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-6">
                      <span className="text-accent text-xs tracking-[0.2em] uppercase">
                        {product.brand} · {product.category}
                      </span>

                      <h3 className="font-serif text-xl text-foreground mt-2 mb-2 group-hover:text-accent transition-colors">
                        {product.name}
                      </h3>

                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={i < product.rating ? "fill-accent text-accent" : "text-border"}
                          />
                        ))}
                      </div>

                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {product.description}
                      </p>

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
          ) : (
            /* List View */
            <div className="space-y-6">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, x: -40 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="flex flex-col md:flex-row bg-card border border-border/50 overflow-hidden transition-all duration-500 hover:shadow-elevated hover:border-accent/30">
                    {/* Product Image */}
                    <div className="relative w-full md:w-64 aspect-square md:aspect-auto overflow-hidden bg-cream flex-shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      
                      {product.badge && (
                        <div className="absolute top-4 left-4">
                          <span className="bg-accent text-accent-foreground text-xs font-medium px-3 py-1.5 tracking-wider uppercase">
                            {product.badge}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <span className="text-accent text-xs tracking-[0.2em] uppercase">
                            {product.brand} · {product.category}
                          </span>
                          <h3 className="font-serif text-2xl text-foreground mt-2 group-hover:text-accent transition-colors">
                            {product.name}
                          </h3>
                        </div>
                        <div className="text-right">
                          <span className="font-serif text-3xl text-foreground">
                            {product.price}
                          </span>
                          <p className="text-muted-foreground text-sm">{product.volume}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={i < product.rating ? "fill-accent text-accent" : "text-border"}
                          />
                        ))}
                        <span className="text-muted-foreground text-sm ml-2">
                          Intensity: {product.intensity}
                        </span>
                      </div>

                      <p className="text-muted-foreground mb-6">
                        {product.description}
                      </p>

                      <button className="self-start bg-primary text-primary-foreground px-6 py-3 text-sm tracking-wider uppercase font-medium hover:bg-accent hover:text-accent-foreground transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl text-primary-foreground mb-6">
              Looking for Wholesale Orders?
            </h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
              We offer special pricing for restaurants, retailers, and distributors. 
              Contact us to discuss your bulk order requirements.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-4 text-sm tracking-[0.2em] uppercase font-medium hover:bg-gold-light transition-colors"
            >
              Contact Sales Team
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductsPage;
