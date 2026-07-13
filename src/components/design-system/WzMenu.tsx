import React from 'react';

interface WzMenuProps {
  expanded: boolean;
  className?: string;
  autoFocusOnOpen?: boolean;
  children: React.ReactNode;
}

export const WzMenu: React.FC<WzMenuProps> = ({
  expanded,
  className = '',
  children
}) => {
  if (!expanded) return null;

  return (
    <div className={`absolute z-50 bg-white rounded-xl shadow-elevation-3 border border-hairline py-1 min-w-[200px] animate-in fade-in zoom-in-95 duration-150 ${className}`}>
      {children}
    </div>
  );
};

interface WzMenuItemProps {
  leadingIcon?: React.ReactNode;
  onClick?: () => void;
  children: React.ReactNode;
}

export const WzMenuItem: React.FC<WzMenuItemProps> = ({
  leadingIcon,
  onClick,
  children
}) => {
  return (
    <button
      onClick={onClick}
      className="w-full px-3 py-2 text-left font-sans text-xs text-content-p1 hover:bg-surface-alt flex items-center gap-2.5 transition-colors"
    >
      {leadingIcon && <span className="text-content-p2">{leadingIcon}</span>}
      <span>{children}</span>
    </button>
  );
};
