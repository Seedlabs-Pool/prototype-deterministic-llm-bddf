import React from 'react';
import { PlayIcon } from './Icons';

export default function Hero({ onRun }: { onRun: () => void }) {
  return (
    <section style={{
      background: '#0f172a',
      padding: '80px 24px',
      textAlign: 'center',
    }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <h1 style={{
          fontSize: 'clamp(28px, 5vw, 48px)',
          fontWeight: 800,
          color: '#f8fafc',
          lineHeight: 1.1,
          marginBottom: 20,
          letterSpacing: '-0.02em',
        }}>
          Deterministic Guardrails for Autonomous Code Agents
        </h1>
        <p style={{
          fontSize: 'clamp(16px, 2vw, 20px)',
          color: '#cbd5e1',
          lineHeight: 1.6,
          maxWidth: 640,
          margin: '0 auto 32px',
        }}>
          Convert stochastic LLM outputs into formally verified, policy-bound execution. 
          Our compiler generates a non-bypassable runtime boundary that fails closed unless an affirmative ALLOW verdict is produced.
        </p>
        <button
          data-cta="primary-cta"
          onClick={onRun}
          style={{
            background: '#4f46e5',
            color: '#ffffff',
            border: 'none',
            borderRadius: 8,
            padding: '14px 28px',
            fontSize: 16,
            fontWeight: 600,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            boxShadow: '0 4px 14px rgba(79, 70, 229, 0.4)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(79, 70, 229, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 14px rgba(79, 70, 229, 0.4)';
          }}
        >
          <PlayIcon size={16} />
          Run Live Simulation
        </button>
      </div>
    </section>
  );
}
