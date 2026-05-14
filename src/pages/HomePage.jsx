import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { About } from "../components/About";
import { Services } from "../components/Services";
import { WhyUs } from "../components/WhyUs";
import { Testimonials } from "../components/Testimonials";
import { LogoStrip } from "../components/LogoStrip";
import { Blog } from "../components/Blog";
import { CTA } from "../components/CTA";
import { Footer } from "../components/Footer";
import { ScrollProgress } from "../components/ui/ScrollProgress";
import { HorizontalMarquee } from "../components/ui/HorizontalMarquee";

export function HomePage() {
  return (
    <div className="site-shell">
      <ScrollProgress />
      <Navbar />
      <main className="pt-24">
        <Hero />
        <HorizontalMarquee
          text="Strategy  &bull;  Design  &bull;  AI  &bull;  Growth"
          speed={400}
          direction="left"
        />
        <About />
        <Services />
        <HorizontalMarquee
          text="Think  &bull;  Build  &bull;  Launch  &bull;  Scale"
          speed={350}
          direction="right"
        />
        <WhyUs />
        <Testimonials />
        <LogoStrip />
        <Blog />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
