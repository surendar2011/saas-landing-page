import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import Pricing from "@/components/sections/Pricing";
import Docs from "@/components/sections/Docs";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <Hero />
      <Features />
      <Pricing />
      <Docs />
      <Footer />
    </div>
  );
}
