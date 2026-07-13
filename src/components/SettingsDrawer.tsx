import React from 'react';
import { WzSectionHeader } from './design-system/WzSectionHeader';
import { WzButton } from './design-system/WzComponents';
import { WzCheckbox } from './design-system/WzCheckbox';

interface SettingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsDrawer: React.FC<SettingsDrawerProps> = ({ isOpen, onClose }) => {
  return (
    <div 
      className="bg-white border-r border-hairline flex-shrink-0 flex flex-col relative overflow-hidden transition-[width] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
      style={{ width: isOpen ? '340px' : '0px' }}
    >
      <div className="flex flex-col h-full w-[340px]">
        <WzSectionHeader 
          headline="Settings"
          actions={
            <WzButton color="clear-icon" onClick={onClose} className="!p-1 !h-auto">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </WzButton>
          }
        />
        <div className="p-4 space-y-4 flex-grow overflow-y-auto">
          <div className="space-y-2">
            <h4 className="font-waze-boing font-bold text-xs uppercase tracking-wider text-hint-text">General Preferences</h4>
            <WzCheckbox checked={true} onChange={() => {}}>Auto-save map edits</WzCheckbox>
            <WzCheckbox checked={true} onChange={() => {}}>Show live vehicle traffic overlay</WzCheckbox>
            <WzCheckbox checked={false} onChange={() => {}}>Dark theme (Experimental)</WzCheckbox>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsDrawer;
