import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import { HelmetProvider } from 'react-helmet-async';
import { useEffect } from "react";
import Lenis from 'lenis';
import { GlobalSchemas } from '@/components/global-schemas';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { CustomCursor } from '@/components/custom-cursor';
import { Home } from "@/pages/home";
import { Work } from "@/pages/work";
import { About } from "@/pages/about";
import { Contact } from "@/pages/contact";
import { ProjectPage } from "@/pages/project/[slug]";
import { PrivacyPolicy } from "@/pages/privacy-policy";
import NotFound from "@/pages/not-found";

const FontLoader = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500&family=Sora:wght@400;500;600;700;800&display=swap";
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
        <motion.div
          className="fixed inset-0 bg-[#0F0F0F] z-[100] origin-top pointer-events-none"
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
          <Navigation />
          <Switch location={location}>
            <Route path="/" component={Home} />
            <Route path="/work" component={Work} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/project/:slug" component={ProjectPage} />
            <Route path="/privacy-policy" component={PrivacyPolicy} />
            <Route component={NotFound} />
          </Switch>
          <Footer />
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

function App() {
  useEffect(() => {
    const lenis = new Lenis({
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
      <FontLoader />
      <CustomCursor />
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <Router />
      </WouterRouter>
    </HelmetProvider>
  );
}

export default App;
