import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import AboutPage from "./pages/AboutPage";
import ProductsPage from "./pages/ProductsPage";
import CollectionStudyPage from "./pages/CollectionStudyPage";
import BrandsPage from "./pages/BrandsPage";
import QualityPage from "./pages/QualityPage";
import SustainabilityPage from "./pages/SustainabilityPage";
import JournalPage from "./pages/JournalPage";
import ContactPage from "./pages/ContactPage";
import AdminPage from "./pages/AdminPage";
import NotFound from "./pages/NotFound";
import { CollectionProvider } from "./lib/collection-store";
import { LanguageProvider } from "./i18n/language";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <LanguageProvider>
      <CollectionProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/the-house" element={<AboutPage />} />
          <Route path="/heritage" element={<BrandsPage />} />
          <Route path="/craftsmanship" element={<QualityPage />} />
          <Route path="/collection" element={<ProductsPage />} />
          <Route path="/collection/:id" element={<CollectionStudyPage />} />
          <Route path="/sustainability" element={<SustainabilityPage />} />
          <Route path="/journal" element={<JournalPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/about" element={<Navigate to="/the-house" replace />} />
          <Route path="/products" element={<Navigate to="/collection" replace />} />
          <Route path="/brands" element={<Navigate to="/heritage" replace />} />
          <Route path="/quality" element={<Navigate to="/craftsmanship" replace />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </CollectionProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
