import React from 'react';
import { WzSectionHeader } from './design-system/WzSectionHeader';
import { WzButton } from './design-system/WzComponents';

interface SelectionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const SelectionDrawer: React.FC<SelectionDrawerProps> = ({ isOpen, onClose }) => {
  return (
    <div 
      className={`bg-white border-r border-hairline flex-shrink-0 flex flex-col relative overflow-hidden transition-[width] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]`}
      style={{ 
        width: isOpen ? `340px` : '0px',
      }}
      aria-hidden={!isOpen}
    >
      <div className="flex flex-col h-full w-[340px]">
        <WzSectionHeader 
          headline="Selection"
          actions={
            <WzButton 
              color="clear-icon" 
              onClick={onClose}
              className="!p-1 !h-auto"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </WzButton>
          }
        />
        <div className="flex-grow p-4 flex flex-col items-center justify-center text-content-p3">
          <p className="font-waze-boing font-bold text-sm">No item selected</p>
          <p className="text-xs text-hint-text mt-2 text-center">Click on a map feature to view details</p>
        </div>
      </div>
    </div>
  );
};

export default SelectionDrawer;
