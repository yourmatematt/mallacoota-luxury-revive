import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ScrollToTop from "@/components/ScrollToTop";
import ErrorBoundary from "@/components/ErrorBoundary";
import RouteFallback from "@/components/RouteFallback";
import Redirect from "./components/Redirect";

const Index = lazy(() => import("./pages/Index"));
const Properties = lazy(() => import("./pages/Properties"));
const PropertyDetail = lazy(() => import("./pages/PropertyDetail"));
const Discover = lazy(() => import("./pages/Discover"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));
const Testimonials = lazy(() => import("./pages/Testimonials"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));
const MallacootaHolidayRentals = lazy(() => import("./pages/MallacootaHolidayRentals"));
const ThingsToDoMallacoota = lazy(() => import("./pages/ThingsToDoMallacoota"));
const PetFriendlyMallacoota = lazy(() => import("./pages/PetFriendlyMallacoota"));
const GaboIsland = lazy(() => import("./pages/GaboIsland"));
const MallacootaFishing = lazy(() => import("./pages/MallacootaFishing"));
const MallacootaKayaking = lazy(() => import("./pages/MallacootaKayaking"));
const MallacootaFamily = lazy(() => import("./pages/MallacootaFamily"));
const MallacootaSummer = lazy(() => import("./pages/MallacootaSummer"));
const MallacootaWinter = lazy(() => import("./pages/MallacootaWinter"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

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
          <ErrorBoundary>
            <Suspense fallback={<RouteFallback />}>
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
                <Route path="/mallacoota-fishing-accommodation" element={<MallacootaFishing />} />
                <Route path="/mallacoota-kayaking-holidays" element={<MallacootaKayaking />} />
                <Route path="/mallacoota-family-holidays" element={<MallacootaFamily />} />
                <Route path="/mallacoota-summer-holidays" element={<MallacootaSummer />} />
                <Route path="/mallacoota-winter-getaway" element={<MallacootaWinter />} />
                <Route path="/luxury-waterfront-mallacoota" element={<Redirect to="/mallacoota-holiday-rentals" />} />
                <Route path="/discover-mallacoota/gabo-island" element={<GaboIsland />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
