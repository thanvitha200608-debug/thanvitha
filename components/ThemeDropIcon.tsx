import React from 'react';

export const ThemeDropIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 384 512"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
    >
      <defs>
        <linearGradient id="dropGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#FF6B00' }} />
          <stop offset="100%" style={{ stopColor: '#002D72' }} />
        </linearGradient>
      </defs>
      <path
        d="M192 512C86 512 0 426 0 320C0 228.8 130.2 57.7 166.6 11.7C172.6 4.2 181.5 0 192 0s19.4 4.2 25.4 11.7C253.8 57.7 384 228.8 384 320c0 106-86 192-192 192z"
        fill="url(#dropGradient)"
      />
    </svg>
  );
};
