import React from 'react';
import './Badge.css';

export interface BadgeProps {
  status: 'success' | 'danger' | 'warning' | 'yellow' | 'neutral';
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ status, children }) => {
  const getTailwindColors = () => {
    switch (status) {
      case 'success': return 'bg-[#198754]/10 text-[#198754]';
      case 'danger': return 'bg-[#BC2542]/10 text-[#BC2542]';
      case 'warning': return 'bg-[#C65201]/10 text-[#C65201]';
      case 'yellow': return 'bg-[#FFC656]/20 text-[#C65201]'; // Darker text for yellow visibility
      case 'neutral': return 'bg-neutral-light text-neutral-dark';
      default: return 'bg-neutral-light text-neutral-dark';
    }
  };

  return (
    <span className={`custom-badge rounded-full px-2.5 py-0.5 text-xs font-semibold ${getTailwindColors()}`}>
      {children}
    </span>
  );
};
