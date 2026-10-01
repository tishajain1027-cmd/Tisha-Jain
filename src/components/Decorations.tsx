import React from 'react';

export const BabyBow: React.FC<{ className?: string; color?: string }> = ({
  className = "w-6 h-6",
  color = "#7C9BB3"
}) => {
  return (
    <svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Left loop */}
      <path
        d="M 50 35 C 38 18 12 12 10 32 C 8 50 34 46 50 38 Z"
        fill={color}
        fillOpacity="0.88"
      />
      {/* Left loop inner shadow / fold */}
      <path
        d="M 45 34 C 35 25 22 22 20 33 C 19 41 33 42 45 37 Z"
        fill="#5F85A2"
        fillOpacity="0.3"
      />
      {/* Right loop */}
      <path
        d="M 50 35 C 62 18 88 12 90 32 C 92 50 66 46 50 38 Z"
        fill={color}
        fillOpacity="0.88"
      />
      {/* Right loop inner fold */}
      <path
        d="M 55 34 C 65 25 78 22 80 33 C 81 41 67 42 55 37 Z"
        fill="#5F85A2"
        fillOpacity="0.3"
      />
      {/* Left ribbon tail */}
      <path
        d="M 46 40 C 40 55 28 65 18 76 C 26 72 32 70 38 72 C 45 62 48 50 50 42 Z"
        fill={color}
        fillOpacity="0.95"
      />
      {/* Right ribbon tail */}
      <path
        d="M 54 40 C 60 55 72 65 82 76 C 74 72 68 70 62 72 C 55 62 52 50 50 42 Z"
        fill={color}
        fillOpacity="0.95"
      />
      {/* Center knot */}
      <ellipse cx="50" cy="37" rx="7" ry="6" fill="#5F85A2" />
      <ellipse cx="50" cy="36" rx="5" ry="4" fill={color} />
      <path d="M 47 34 C 50 33 53 33 54 36" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
};

export const MiniHeart: React.FC<{ className?: string; fill?: string }> = ({
  className = "w-4 h-4",
  fill = "#7C9BB3"
}) => {
  return (
    <svg viewBox="0 0 24 24" fill={fill} className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
};

export const DaisyFlower: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Petals */}
      <circle cx="50" cy="20" r="12" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
      <circle cx="71" cy="29" r="12" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
      <circle cx="80" cy="50" r="12" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
      <circle cx="71" cy="71" r="12" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
      <circle cx="50" cy="80" r="12" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
      <circle cx="29" cy="71" r="12" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
      <circle cx="20" cy="50" r="12" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
      <circle cx="29" cy="29" r="12" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
      {/* Daisy Center */}
      <circle cx="50" cy="50" r="15" fill="#E8B86D" />
      <circle cx="48" cy="48" r="12" fill="#F4C77E" />
      <circle cx="47" cy="46" r="3" fill="#FFF4D2" opacity="0.8" />
    </svg>
  );
};

export const WaxSealEmblem: React.FC<{ className?: string; label?: string }> = ({
  className = "w-20 h-20",
  label = "Tap to Open"
}) => {
  return (
    <div className={`relative flex items-center justify-center cursor-pointer select-none group ${className}`}>
      {/* Outer seal wax ring */}
      <div className="absolute inset-0 rounded-full bg-[#5F85A2] shadow-xl group-hover:scale-105 transition-transform duration-300 ring-4 ring-[#7C9BB3]/40">
        {/* Organic wax perimeter drips */}
        <div className="absolute -top-1 left-2 w-4 h-4 rounded-full bg-[#5F85A2]" />
        <div className="absolute -bottom-1.5 right-3 w-5 h-5 rounded-full bg-[#5F85A2]" />
        <div className="absolute top-4 -right-1 w-3 h-3 rounded-full bg-[#5F85A2]" />
        <div className="absolute bottom-3 -left-1.5 w-4 h-4 rounded-full bg-[#5F85A2]" />
      </div>

      {/* Inner stamped medallion */}
      <div className="relative w-[84%] h-[84%] rounded-full bg-gradient-to-br from-[#8EABC0] via-[#6D93AF] to-[#4F7591] flex flex-col items-center justify-center p-2 shadow-inner border border-[#AFC9DC]/40 text-center">
        <BabyBow className="w-6 h-6 text-white mb-0.5 filter drop-shadow" color="#FFFFFF" />
        <span className="font-serif-cormorant text-[10px] tracking-widest uppercase font-semibold text-white/95 leading-tight drop-shadow">
          {label}
        </span>
      </div>

      {/* Ripple ring for visual encouragement */}
      <div className="absolute -inset-2 rounded-full border-2 border-[#7C9BB3] opacity-40 animate-ping pointer-events-none" />
    </div>
  );
};
