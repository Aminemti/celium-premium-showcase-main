import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { BrandsSection } from "@/components/sections/BrandsSection";
import { FeaturedProductsSection } from "@/components/sections/FeaturedProductsSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { QualitySection } from "@/components/sections/QualitySection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { InfiniteCarouselSection } from "@/components/sections/InfiniteCarouselSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { ExcellenceSection } from "@/components/sections/ExcellenceSection";
import { ServicesSection } from "@/components/sections/ServicesSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <FeaturedProductsSection />
        <BrandsSection />
        <ProcessSection />
        <GallerySection />
        <ServicesSection />
        <ExcellenceSection />
        <QualitySection />
        <StatsSection />
        <InfiniteCarouselSection />
        <TestimonialsSection />
        <ContactSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
