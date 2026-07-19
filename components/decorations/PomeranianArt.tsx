import React from 'react';

export function PomeranianArt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={`w-full h-full drop-shadow-xl ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Sombra base */}
      <ellipse cx="100" cy="190" rx="70" ry="10" fill="rgba(0,0,0,0.05)" />
      
      <g className="fill-white">
        {/* Cola peluda (Lado derecho) */}
        <circle cx="160" cy="110" r="30" />
        <circle cx="150" cy="90" r="25" />
        <circle cx="170" cy="130" r="25" />
        <circle cx="140" cy="75" r="20" />
        
        {/* Cuerpo súper peludo */}
        <circle cx="100" cy="130" r="45" />
        <circle cx="120" cy="140" r="35" />
        <circle cx="75" cy="145" r="35" />
        <circle cx="65" cy="120" r="40" />
        <circle cx="130" cy="110" r="40" />
        
        {/* Cabeza peluda */}
        <circle cx="90" cy="80" r="35" />
        <circle cx="70" cy="95" r="30" />
        <circle cx="115" cy="85" r="25" />
        <circle cx="95" cy="60" r="25" />
      </g>
      
      {/* Orejas puntiagudas */}
      <path d="M70,55 Q75,35 85,50 Z" className="fill-white" />
      <path d="M105,50 Q115,35 120,55 Z" className="fill-white" />
      {/* Interior de las orejas */}
      <path d="M72,55 Q76,42 82,51 Z" fill="#F5F1E7" />
      <path d="M107,51 Q113,42 118,55 Z" fill="#F5F1E7" />
      
      {/* Patitas (Ligeramente visibles bajo el pelo) */}
      <rect x="75" y="165" width="14" height="25" rx="7" className="fill-white" />
      <rect x="110" y="165" width="14" height="25" rx="7" className="fill-white" />
      <rect x="125" y="155" width="12" height="20" rx="6" className="fill-white" />
      
      {/* Cara */}
      {/* Ojos adorables */}
      <circle cx="80" cy="90" r="5" fill="#3D3831" />
      <circle cx="105" cy="90" r="5" fill="#3D3831" />
      {/* Brillo en los ojos (Kawaii) */}
      <circle cx="78" cy="88" r="1.5" fill="white" />
      <circle cx="103" cy="88" r="1.5" fill="white" />
      
      {/* Nariz pequeñita */}
      <circle cx="92.5" cy="100" r="4.5" fill="#3D3831" />
      
      {/* Boquita sonriente */}
      <path d="M87,105 Q92.5,112 98,105" stroke="#3D3831" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      
      {/* Chapitas (Blush) */}
      <ellipse cx="68" cy="98" rx="6" ry="3.5" fill="#FFB6C1" opacity="0.6" />
      <ellipse cx="117" cy="98" rx="6" ry="3.5" fill="#FFB6C1" opacity="0.6" />
    </svg>
  );
}
