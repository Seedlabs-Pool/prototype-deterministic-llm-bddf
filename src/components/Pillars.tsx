import React from 'react';
import { RefinementIcon, MVUIcon, TransformIcon, AuditIcon } from './Icons';

const PILLARS = [
  {
    icon: RefinementIcon,
    title: 'Program Refinement Calculus',
    desc: 'Bridges high-level specifications and executable code. The LLM is guided by formal refinement rules so that generated output provably preserves the correctness of the original specification.',
  },
  {
    icon: MVUIcon,
    title: 'Minimal Verification Units',
    desc: 'LLM output is segmented into MVUs, enabling granular constraint enforcement. Each unit is validated independently, allowing iterative correction without rejecting an entire proposal.',
  },
  {
    icon: TransformIcon,
    title: 'Structure-Preserving Transforms',
    desc: 'Prevents vocabulary-based hallucinations by enforcing operator-based transforms. The system audits for lawful emergence rather than relying on brittle text substitution or pattern matching.',
  },
  {
    icon: AuditIcon,
    title: 'Audit-First Governance',
    desc: 'Every action produces a tamper-evident, independently reconstructable authorization artifact. Satisfies strict regulatory requirements for explainability, non-repudiation, and auditability.',
  },
];

export default function Pillars() {
  return (
    <section style={{ padding: '80px 24px', background: '#ffffff' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>Technical Architecture</h2>
        <p style={{ fontSize: 16, color: '#475569', marginBottom: 40, maxWidth: 640, lineHeight: 1.6 }}>
          Four formal mechanisms that shift the burden of reliability from stochastic model weights to deterministic, world-side governance.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
          {PILLARS.map((p, i) => (
            <div key={i} style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: 12,
              padding: 24,
            }}>
              <div style={{ marginBottom: 16 }}>
                <p.icon size={32} color="#4f46e5" />
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>{p.title}</h3>
              <p style={{ fontSize: 15, color: '#475569', lineHeight: 1.6 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
