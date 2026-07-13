import React from 'react';

interface WzTabsProps {
  activeTabIndex: number;
  onTabChange: (index: number) => void;
  className?: string;
  children: React.ReactNode;
}

export const WzTabs: React.FC<WzTabsProps> = ({
  activeTabIndex,
  onTabChange,
  className = '',
  children
}) => {
  return (
    <div className={`flex border-b border-hairline bg-surface-default px-2 ${className}`}>
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return null;
        const isActive = index === activeTabIndex;
        return (
          <button
            key={index}
            onClick={() => onTabChange(index)}
            className={`flex-1 py-3 text-center font-medium text-[13px] relative transition-colors ${
              isActive ? 'text-primary font-bold' : 'text-content-p2 hover:text-content-default'
            }`}
          >
            {child.props.label}
            {isActive && (
              <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-primary rounded-t-full" />
            )}
          </button>
        );
      })}
    </div>
  );
};

interface WzTabProps {
  label: string;
  children?: React.ReactNode;
}

export const WzTab: React.FC<WzTabProps> = ({ children }) => {
  return <>{children}</>;
};
