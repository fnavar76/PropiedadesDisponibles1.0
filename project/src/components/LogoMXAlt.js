import React from 'react';

const LogoMXAlt = ({ size = 56 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 256 256"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'block' }}
  >
    <circle cx="128" cy="128" r="120" fill="#6B7A8F" />
    <path d="M128 200c-40-40-64-64-64-92a64 64 0 1 1 128 0c0 28-24 52-64 92z" fill="white" />
    <rect x="92" y="140" width="72" height="40" rx="8" fill="#6B7A8F" />
    <polygon points="128,100 160,140 96,140" fill="#6B7A8F" />
    <circle cx="128" cy="80" r="16" fill="#FFD700" />
    <text x="128" y="235" textAnchor="middle" fontFamily="cursive" fontSize="28" fill="#fff">México</text>
    <text x="128" y="255" textAnchor="middle" fontFamily="sans-serif" fontSize="22" fill="#434A5E" fontWeight="bold">Propiedades Disponibles</text>
  </svg>
);

export default LogoMXAlt;
