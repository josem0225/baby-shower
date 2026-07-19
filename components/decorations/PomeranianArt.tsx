import React from 'react';
import Image from 'next/image';

export function PomeranianArt({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-full h-full ${className}`}>
      <Image
        src="/images/pom_standing.png"
        alt="Pomeranian"
        fill
        className="object-contain"
        style={{
          maskImage: 'radial-gradient(circle at center, black 55%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 55%, transparent 75%)'
        }}
        sizes="(max-width: 768px) 192px, 256px"
      />
    </div>
  );
}
