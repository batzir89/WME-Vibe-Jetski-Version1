import React from 'react';

interface WzSectionHeaderProps {
  headline: string;
  hideBottomBorder?: boolean;
  actions?: React.ReactNode;
  className?: string;
}

export const WzSectionHeader: React.FC<WzSectionHeaderProps> = ({
  headline,
  hideBottomBorder = false,
  actions,
  className = ''
}) => {
  return (
    <div className={`h-12 px-4 flex items-center justify-between bg-white ${!hideBottomBorder ? 'border-b border-hairline' : ''} ${className}`}>
      <h3 className="font-waze-boing font-bold text-sm text-content-default">{headline}</h3>
      {actions && <div className="flex items-center gap-1">{actions}</div>}
    </div>
  );
};
