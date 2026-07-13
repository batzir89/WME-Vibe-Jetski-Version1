import React, { useState } from 'react';
import { WzSectionHeader } from './design-system/WzSectionHeader';
import { WzCard, WzButton } from './design-system/WzComponents';
import { WzTabs, WzTab } from './design-system/WzTabs';

interface SelectionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const SelectionDrawer: React.FC<SelectionDrawerProps> = ({ isOpen, onClose }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <div 
      className="bg-surface-default border-r border-hairline flex-shrink-0 flex flex-col relative overflow-hidden transition-[width] duration-250 ease-in-out z-10"
      style={{ width: isOpen ? '340px' : '0px' }}
    >
      <div className="flex flex-col h-full w-[340px]">
        <WzSectionHeader 
          headline="Feature Selection"
          actions={
            <WzButton variant="clear" onClick={onClose} className="!p-1 !h-auto">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </WzButton>
          }
        />

        <div className="bg-surface-default">
          <WzTabs 
            activeTabIndex={activeTabIndex}
            onTabChange={setActiveTabIndex}
          >
            <WzTab label="General" />
            <WzTab label="Geometry" />
            <WzTab label="History" />
          </WzTabs>
        </div>

        <div className="p-4 space-y-4 flex-grow overflow-y-auto bg-surface-alt">
          <WzCard elevation={1} className="space-y-3">
            <h4 className="font-waze-boing font-bold text-xs uppercase tracking-wider text-hint-text">Polygon Properties</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between border-b border-hairline pb-1.5">
                <span className="text-content-p2">Area Type:</span>
                <span className="font-bold text-content-default">Soho Commercial Zone</span>
              </div>
              <div className="flex justify-between border-b border-hairline pb-1.5">
                <span className="text-content-p2">Stroke Color:</span>
                <span className="font-mono text-primary font-bold">#842FEB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-content-p2">Fill Opacity:</span>
                <span className="font-mono text-content-default">20%</span>
              </div>
            </div>
          </WzCard>
        </div>
      </div>
    </div>
  );
};

export default SelectionDrawer;
