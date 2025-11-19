import React from "react";

export default function Logo({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 200 200" width="64" height="64" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="X42 logo">
      <defs>
        <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#B54BFF"/>
          <stop offset="1" stopColor="#3A00FF"/>
        </linearGradient>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      <rect x="0" y="0" width="200" height="200" rx="28" fill="none" />
      <g filter="url(#glow)">
        <circle cx="100" cy="100" r="70" fill="rgba(10,8,20,0.3)" stroke="url(#g1)" strokeWidth="2"/>
        {/* shield hex frame */}
        <path d="M50 100 L70 38 L130 38 L150 100 L130 162 L70 162 Z" fill="none" stroke="url(#g1)" strokeWidth="1.8" opacity="0.9"/>
        {/* X beams */}
        <g transform="translate(100,100)">
          <rect x="-10" y="-76" width="20" height="52" rx="3" fill="url(#g1)" transform="rotate(45)"/>
          <rect x="-10" y="-76" width="20" height="52" rx="3" fill="url(#g1)" transform="rotate(-45)"/>
          <rect x="-10" y="24" width="20" height="52" rx="3" fill="url(#g1)" transform="rotate(45)"/>
          <rect x="-10" y="24" width="20" height="52" rx="3" fill="url(#g1)" transform="rotate(-45)"/>
          {/* central small X */}
          <text x="-10" y="6" fill="#E9ECFF" fontFamily="monospace" fontSize="12">X</text>
          <text x="10" y="24" fill="#FFD478" fontFamily="monospace" fontSize="10">42</text>
        </g>
      </g>
    </svg>
  );
}
