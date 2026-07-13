import React from 'react';

interface WzToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  children?: React.ReactNode;
  className?: string;
}

export const WzToggleSwitch: React.FC<WzToggleSwitchProps> = ({
  checked,
  onChange,
  children,
  className = ''
}) => {
  return (
    <label className={`flex items-center justify-between cursor-pointer select-none py-1 ${className}`}>
      {children && <span className="text-xs font-medium text-content-default">{children}</span>}
      <div 
        onClick={(e) => {
          e.preventDefault();
          onChange(!checked);
        }}
        className={`w-9 h-5 flex items-center rounded-full p-0.5 transition-colors duration-200 ${checked ? 'bg-primary' : 'bg-disabled-text'}`}
      >
        <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${checked ? 'translate-x-4' : 'translate-x-0'}`} />
      </div>
    </label>
  );
};
