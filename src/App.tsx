import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import Properties from "./pages/Properties";
import PropertyDetail from "./pages/PropertyDetail";
import Discover from "./pages/Discover";
import BlogDetail from "./pages/BlogDetail";
import Testimonials from "./pages/Testimonials";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import MallacootaHolidayRentals from "./pages/MallacootaHolidayRentals";
import ThingsToDoMallacoota from "./pages/ThingsToDoMallacoota";
import PetFriendlyMallacoota from "./pages/PetFriendlyMallacoota";
import GaboIsland from "./pages/GaboIsland";
import Redirect from "./components/Redirect";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter 
          future={{ 
            v7_startTransition: true,
            v7_relativeSplatPath: true 
          }}
        >
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/properties/:slug" element={<PropertyDetail />} />
            <Route path="/discover-mallacoota" element={<Discover />} />
            <Route path="/discover-mallacoota/:slug" element={<BlogDetail />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/mallacoota-holiday-rentals" element={<MallacootaHolidayRentals />} />
            <Route path="/things-to-do-mallacoota" element={<ThingsToDoMallacoota />} />
            <Route path="/pet-friendly-mallacoota" element={<PetFriendlyMallacoota />} />
            <Route path="/luxury-waterfront-mallacoota" element={<Redirect to="/mallacoota-holiday-rentals" />} />
            <Route path="/discover-mallacoota/gabo-island" element={<GaboIsland />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;