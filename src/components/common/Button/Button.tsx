import React, { type ButtonHTMLAttributes } from 'react';
import './Button.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'outline' | 'ghost';
  colorTheme?: 'primary' | 'danger' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'solid', 
  colorTheme = 'primary',
  size = 'md',
  className = '',
  ...props 
}) => {
  const getVariantClasses = () => {
    if (variant === 'solid') {
      if (colorTheme === 'primary') return 'bg-[var(--color-primary-bold)] text-white hover:brightness-90';
      if (colorTheme === 'danger') return 'bg-danger text-white hover:brightness-90';
      if (colorTheme === 'neutral') return 'bg-neutral-dark text-white hover:brightness-75';
    }
    if (variant === 'outline') {
      if (colorTheme === 'primary') return 'border-[1px] border-[var(--color-primary-bold)] text-[var(--color-primary-bold)] hover:bg-[var(--color-primary-muted)]';
      if (colorTheme === 'danger') return 'border-[1px] border-danger text-danger hover:bg-danger/10';
      if (colorTheme === 'neutral') return 'border-[1px] border-neutral-dark text-neutral-dark hover:bg-neutral-light';
    }
    if (variant === 'ghost') {
      if (colorTheme === 'primary') return 'text-[var(--color-primary-bold)] hover:bg-neutral-light';
      if (colorTheme === 'danger') return 'text-danger hover:bg-neutral-light';
      if (colorTheme === 'neutral') return 'text-neutral-dark hover:bg-neutral-light';
    }
    return '';
  };

  const getSizeClasses = () => {
    if (size === 'sm') return 'px-3 py-1 text-sm';
    if (size === 'lg') return 'px-6 py-3 text-lg';
    return 'px-4 py-1.5 text-base';
  };
  
  return (
    <button 
      className={`custom-btn uppercase font-medium transition-colors duration-200 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed ${getVariantClasses()} ${getSizeClasses()} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
