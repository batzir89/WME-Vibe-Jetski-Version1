import React from 'react';

interface WzCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  children?: React.ReactNode;
  className?: string;
}

export const WzCheckbox: React.FC<WzCheckboxProps> = ({
  checked,
  onChange,
  children,
  className = ''
}) => {
  return (
    <label className={`inline-flex items-center gap-2.5 cursor-pointer select-none ${className}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 rounded border-hairline text-primary focus:ring-primary cursor-pointer accent-primary"
      />
      {children}
    </label>
  );
};
