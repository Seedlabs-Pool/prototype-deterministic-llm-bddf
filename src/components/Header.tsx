import React from 'react';
import { LogoIcon } from './Icons';

export default function Header() {
  return (
    <header style={{
      borderBottom: '1px solid #1e293b',
      background: '#0f172a',
      position: 'sticky',
      top: 0,
      zIndex: 50,
    }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}>
        <LogoIcon size={32} />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{
            fontSize: 18,
            fontWeight: 700,
            color: '#f8fafc',
            lineHeight: 1.2,
            letterSpacing: '-0.01em',
          }}>Veritas Compiler</span>
          <span style={{
            fontSize: 13,
            color: '#94a3b8',
            lineHeight: 1.2,
          }}>Deterministic LLM Guardrail Compiler</span>
        </div>
      </div>
    </header>
  );
}
