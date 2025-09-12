import React from 'react';

const LogoMX = ({ size = 48 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 256 256"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'block' }}
  >
    <rect width="256" height="256" rx="40" fill="#6B7A8F" />
    <polygon points="48,48 208,48 128,208" fill="white" />
    <polyline points="48,48 128,128 208,48" stroke="#434A5E" strokeWidth="16" fill="none" />
    <polyline points="128,128 128,208" stroke="#434A5E" strokeWidth="8" fill="none" />
    <text x="128" y="230" textAnchor="middle" fontFamily="cursive" fontSize="32" fill="#fff">México</text>
    <text x="128" y="252" textAnchor="middle" fontFamily="sans-serif" fontSize="20" fill="#434A5E" fontWeight="bold">Propiedades Disponibles</text>
  </svg>
);

export default LogoMX;
