import React, { useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Simulator from './components/Simulator';
import Pillars from './components/Pillars';
import Footer from './components/Footer';

export default function App() {
  const simulatorRef = useRef<HTMLDivElement>(null);

  const scrollToSimulator = () => {
    simulatorRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', background: '#ffffff', minHeight: '100vh', color: '#0f172a' }}>
      <style>{`
        .sim-grid { grid-template-columns: 1fr; }
        @media (min-width: 768px) { .sim-grid { grid-template-columns: 1fr 1fr; } }
      `}</style>
      <Header />
      <Hero onRun={scrollToSimulator} />
      <div ref={simulatorRef}>
        <Simulator />
      </div>
      <Pillars />
      <Footer />
    </div>
  );
}
