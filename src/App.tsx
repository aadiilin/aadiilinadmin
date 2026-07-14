import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HelmetProvider } from 'react-helmet-async';
import { useEffect } from "react";
import Lenis from 'lenis';
import { GlobalSchemas } from '@/components/global-schemas';
import { Home } from "@/pages/home";
import { ProjectPage } from "@/pages/project/[slug]";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

const FontLoader = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,600;12..96,700;12..96,800&family=Instrument+Sans:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);
  return null;
};

function Router() {
  const [location] = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <div key={location} className="relative">
        {/* Curtain wipe overlay */}
        <motion.div
          className="fixed inset-0 bg-text z-[100] origin-top pointer-events-none"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, delay: 0.4 }}
        >
          <Switch location={location}>
            <Route path="/" component={Home} />
            <Route path="/project/:slug" component={ProjectPage} />
            <Route component={NotFound} />
          </Switch>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

function App() {
  useEffect(() => {
    const scrollEl = document.querySelector('.scroll-container') as HTMLElement | undefined
    if (!scrollEl) return

    const lenis = new Lenis({
      wrapper: scrollEl,
      content: scrollEl,
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 2.0,
      infinite: false,
      lerp: 0.08,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <HelmetProvider>
      <GlobalSchemas />
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <FontLoader />
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
