import React from 'react';

export const LogoIcon = ({ size = 32 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 2L4 8V16C4 23.18 9.02 29.76 16 31.5C22.98 29.76 28 23.18 28 16V8L16 2Z" fill="#4f46e5" stroke="#4f46e5" strokeWidth="2" strokeLinejoin="round"/>
    <path d="M11 16L14.5 19.5L21 13" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 11H22" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
  </svg>
);

export const CheckIcon = ({ size = 16, color = '#059669' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="7" stroke={color} strokeWidth="1.5"/>
    <path d="M5 8L7 10L11 6" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const XIcon = ({ size = 16, color = '#dc2626' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="7" stroke={color} strokeWidth="1.5"/>
    <path d="M6 6L10 10M10 6L6 10" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const FileIcon = ({ size = 16, color = '#94a3b8' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <path d="M9 1H4C3.44772 1 3 1.44772 3 2V14C3 14.5523 3.44772 15 4 15H12C12.5523 15 13 14.5523 13 14V5L9 1Z" stroke={color} strokeWidth="1.5"/>
    <path d="M9 1V5H13" stroke={color} strokeWidth="1.5"/>
  </svg>
);

export const PlayIcon = ({ size = 16, color = 'white' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <path d="M4 2L14 8L4 14V2Z" fill={color}/>
  </svg>
);

export const ShieldCheckIcon = ({ size = 48, color = '#059669' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <path d="M24 4L6 12V22C6 34.15 13.8 44.54 24 47.5C34.2 44.54 42 34.15 42 22V12L24 4Z" stroke={color} strokeWidth="3" strokeLinejoin="round" fill="none"/>
    <path d="M16 24L22 30L34 18" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const ShieldXIcon = ({ size = 48, color = '#dc2626' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <path d="M24 4L6 12V22C6 34.15 13.8 44.54 24 47.5C34.2 44.54 42 34.15 42 22V12L24 4Z" stroke={color} strokeWidth="3" strokeLinejoin="round" fill="none"/>
    <path d="M18 18L30 30M30 18L18 30" stroke={color} strokeWidth="3" strokeLinecap="round"/>
  </svg>
);

export const RefinementIcon = ({ size = 24, color = '#4f46e5' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke={color} strokeWidth="2" strokeLinejoin="round"/>
    <path d="M2 17L12 22L22 17" stroke={color} strokeWidth="2" strokeLinejoin="round"/>
    <path d="M2 12L12 17L22 12" stroke={color} strokeWidth="2" strokeLinejoin="round"/>
  </svg>
);

export const MVUIcon = ({ size = 24, color = '#4f46e5' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="7" height="7" rx="1" stroke={color} strokeWidth="2"/>
    <rect x="14" y="3" width="7" height="7" rx="1" stroke={color} strokeWidth="2"/>
    <rect x="3" y="14" width="7" height="7" rx="1" stroke={color} strokeWidth="2"/>
    <rect x="14" y="14" width="7" height="7" rx="1" stroke={color} strokeWidth="2"/>
  </svg>
);

export const TransformIcon = ({ size = 24, color = '#4f46e5' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M4 7V4H20V7" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M9 20H15" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M12 4V20" stroke={color} strokeWidth="2" strokeLinecap="round" strokeDasharray="4 2"/>
    <path d="M7 11L12 16L17 11" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const AuditIcon = ({ size = 24, color = '#4f46e5' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke={color} strokeWidth="2" strokeLinejoin="round"/>
    <path d="M14 2V8H20" stroke={color} strokeWidth="2" strokeLinejoin="round"/>
    <path d="M9 15L11 17L15 13" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
