import Bento from "@/components/Bento";
import Comparison from "@/components/Comparison";
import FAQ from "@/components/FAQ";
import Features from "@/components/Features";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Logos from "@/components/Logos";
import Navbar from "@/components/Navbar";
import PixelDivider from "@/components/PixelDivider";
import Pricing from "@/components/Pricing";
import Showcase from "@/components/Showcase";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import VideoSection from "@/components/VideoSection";

export default function Home() {
  return (
    <main id="content" className="flex w-full flex-col bg-[#0A0A0A] pt-[60px]">
      <Navbar />
      <Hero />
      <PixelDivider />
      <Logos />
      <Features />
      <HowItWorks />
      <VideoSection />
      <Stats />
      <Testimonials />
      <Bento />
      <Comparison />
      <Showcase />
      <FAQ />
      <Pricing />
      <FinalCTA />
      <Footer />
    </main>
  );
}
