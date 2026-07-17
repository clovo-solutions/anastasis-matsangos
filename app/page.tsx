import { Nav } from '@/components/Nav';
import { Hero } from '@/components/Hero';
import { Overview } from '@/components/Overview';
import { Stats } from '@/components/Stats';
import { Services } from '@/components/Services';
import { Projects } from '@/components/Projects';
import { Process } from '@/components/Process';
import { WhyUs } from '@/components/WhyUs';
import { CTA } from '@/components/CTA';
import { Footer } from '@/components/Footer';
import { CalInit } from '@/components/CalInit';

/**
 * Section rhythm is deliberate — light, light, DARK, light, DARK, light, DARK.
 * The alternation is what gives the scroll its pulse; reordering sections
 * without preserving it will flatten the whole page.
 */
export default function Page() {
  return (
    <>
      <span id="top" />
      <CalInit />
      <Nav />
      <main id="main">
        <Hero />
        <Overview />
        <Stats />
        <Services />
        <Projects />
        <Process />
        <WhyUs />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
