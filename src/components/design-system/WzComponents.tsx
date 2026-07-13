import React from 'react';

interface WzCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  elevation?: number;
}

export const WzCard: React.FC<WzCardProps> = ({ 
  children, 
  className = '', 
  onClick,
  elevation = 1 
}) => {
  const elevationStyles = {
    1: 'shadow-elevation-1',
    2: 'shadow-elevation-2',
    3: 'shadow-elevation-3',
  }[elevation] || 'shadow-elevation-1';

  return (
    <div 
      onClick={onClick}
      className={`bg-surface-default rounded-xl border border-hairline p-3.5 ${elevationStyles} hover:shadow-elevation-2 transition-all duration-200 ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

interface WzStatusChipProps {
  label: string;
  color?: 'blue' | 'orange' | 'green' | 'purple' | 'red';
}

export const WzStatusChip: React.FC<WzStatusChipProps> = ({ label, color = 'blue' }) => {
  const colors = {
    blue: 'bg-blue-50 text-primary border-blue-200',
    orange: 'bg-orange-50 text-cautious-variant border-orange-200',
    green: 'bg-green-50 text-safe-variant border-green-200',
    purple: 'bg-purple-50 text-primary-variant border-purple-200',
    red: 'bg-red-50 text-alarming-variant border-red-200',
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider border ${colors[color] || colors.blue}`}>
      {label}
    </span>
  );
};

interface WzButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseDown?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: 'primary' | 'secondary' | 'clear';
  color?: string;
  className?: string;
  disabled?: boolean;
}

export const WzButton: React.FC<WzButtonProps> = ({
  children,
  onClick,
  onMouseDown,
  variant = 'primary',
  color,
  className = '',
  disabled = false
}) => {
  if (color === 'clear-icon' || variant === 'clear') {
    return (
      <button
        onClick={onClick}
        onMouseDown={onMouseDown}
        disabled={disabled}
        className={`p-1.5 hover:bg-surface-variant rounded-md text-content-p1 transition-colors ${className}`}
      >
        {children}
      </button>
    );
  }

  const baseStyles = 'px-3 py-1.5 rounded-lg font-medium text-xs transition-all duration-150 flex items-center justify-center gap-1.5 select-none';
  const variantStyles = variant === 'secondary'
    ? 'bg-surface-default border border-hairline text-content-p1 hover:bg-surface-alt'
    : 'bg-primary text-white hover:bg-primary/90 shadow-sm';

  return (
    <button
      onClick={onClick}
      onMouseDown={onMouseDown}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles} ${className}`}
    >
      {children}
    </button>
  );
};
