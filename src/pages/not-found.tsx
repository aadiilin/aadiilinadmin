import { Link } from "wouter";
import { SEO } from "@/components/seo";

export default function NotFound() {
  return (
    <>
      <SEO title="Page Not Found" description="The requested page could not be found on Aadiilin's portfolio." path="/404" noIndex noFollow />
      <main className="bg-[#0F0F0F] min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md">
          <h1 className="font-serif text-8xl md:text-9xl italic text-white/20 mb-6">404</h1>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">Page not found</h2>
          <p className="font-sans text-sm text-white/40 mb-8">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <Link href="/" className="font-sans text-xs uppercase tracking-widest text-white/60 hover:text-white transition-colors border border-white/20 rounded-full px-8 py-4 inline-block">
            &larr; Return to Home
          </Link>
        </div>
      </main>
    </>
  );
}
