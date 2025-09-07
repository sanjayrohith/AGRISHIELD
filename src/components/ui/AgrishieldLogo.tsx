import React from 'react';

interface AgrishieldLogoProps {
  className?: string;
  size?: number;
}

export const AgrishieldLogo: React.FC<AgrishieldLogoProps> = ({ 
  className = "", 
  size = 24 
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Shield Outline */}
      <path
        d="M60 10 L95 22 L95 50 Q95 85 60 110 Q25 85 25 50 L25 22 Z"
        fill="url(#shieldGradient)"
        stroke="#1F2937"
        strokeWidth="2"
      />
      
      {/* Inner Shield with Circuit Pattern */}
      <path
        d="M60 18 L88 28 L88 50 Q88 78 60 98 Q32 78 32 50 L32 28 Z"
        fill="url(#innerGradient)"
        stroke="none"
      />
      
      {/* Circuit Pattern - Top Border */}
      <g stroke="#86EFAC" strokeWidth="1.5" fill="none" opacity="0.8">
        <path d="M35 30 L45 30 L45 25 L55 25 L55 30 L65 30 L65 25 L75 25 L75 30 L85 30" />
        <circle cx="40" cy="30" r="1.5" fill="#86EFAC" />
        <circle cx="50" cy="25" r="1.5" fill="#86EFAC" />
        <circle cx="60" cy="30" r="1.5" fill="#86EFAC" />
        <circle cx="70" cy="25" r="1.5" fill="#86EFAC" />
        <circle cx="80" cy="30" r="1.5" fill="#86EFAC" />
      </g>
      
      {/* Circuit Pattern - Left Side */}
      <g stroke="#86EFAC" strokeWidth="1.5" fill="none" opacity="0.7">
        <path d="M35 35 L30 35 L30 45 L35 45" />
        <path d="M35 55 L30 55 L30 65 L35 65" />
        <circle cx="35" cy="40" r="1" fill="#86EFAC" />
        <circle cx="35" cy="60" r="1" fill="#86EFAC" />
      </g>
      
      {/* Circuit Pattern - Right Side */}
      <g stroke="#86EFAC" strokeWidth="1.5" fill="none" opacity="0.7">
        <path d="M85 35 L90 35 L90 45 L85 45" />
        <path d="M85 55 L90 55 L90 65 L85 65" />
        <circle cx="85" cy="40" r="1" fill="#86EFAC" />
        <circle cx="85" cy="60" r="1" fill="#86EFAC" />
      </g>
      
      {/* Central Plant/Leaf Design */}
      <g transform="translate(60, 60)">
        {/* Main leaf stem */}
        <path
          d="M0 -25 Q-2 -20 -4 -15 Q-2 -10 0 -5 Q2 -10 4 -15 Q2 -20 0 -25"
          fill="#FFFFFF"
          stroke="#22C55E"
          strokeWidth="1"
        />
        
        {/* Left leaf branches */}
        <path
          d="M-4 -15 Q-12 -18 -16 -12 Q-12 -8 -4 -10"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M-2 -8 Q-8 -10 -12 -6 Q-8 -3 -2 -5"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        
        {/* Right leaf branches */}
        <path
          d="M4 -15 Q12 -18 16 -12 Q12 -8 4 -10"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M2 -8 Q8 -10 12 -6 Q8 -3 2 -5"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        
        {/* Small circuit nodes on the plant */}
        <circle cx="-8" cy="-15" r="1" fill="#86EFAC" />
        <circle cx="8" cy="-15" r="1" fill="#86EFAC" />
        <circle cx="-6" cy="-6" r="0.8" fill="#86EFAC" />
        <circle cx="6" cy="-6" r="0.8" fill="#86EFAC" />
        <circle cx="0" cy="-20" r="1" fill="#86EFAC" />
      </g>
      
      {/* Gradient Definitions */}
      <defs>
        <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor: '#84CC16', stopOpacity: 0.9}} />
          <stop offset="30%" style={{stopColor: '#65A30D', stopOpacity: 0.95}} />
          <stop offset="70%" style={{stopColor: '#166534', stopOpacity: 1}} />
          <stop offset="100%" style={{stopColor: '#0F172A', stopOpacity: 1}} />
        </linearGradient>
        
        <linearGradient id="innerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor: '#22C55E', stopOpacity: 0.8}} />
          <stop offset="50%" style={{stopColor: '#059669', stopOpacity: 0.9}} />
          <stop offset="100%" style={{stopColor: '#064E3B', stopOpacity: 1}} />
        </linearGradient>
      </defs>
    </svg>
  );
};
