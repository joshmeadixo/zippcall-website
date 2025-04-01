import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';
import UseCases from './components/UseCases';
import FounderNote from './components/FounderNote';

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <HowItWorks />
      <Features />
      {/* Testimonials removed until we have genuine reviews */}
      {/* <Testimonials /> */}
      <UseCases />
      <Pricing />
      <FounderNote />
      <FAQ />
      <CallToAction />
      <Footer />
    </main>
  );
} 