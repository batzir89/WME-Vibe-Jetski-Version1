import React from 'react';
import { WzButton } from './design-system/WzComponents';

interface RightToolbarProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onToggleLayerPanel?: () => void;
  onToggleShareModal?: () => void;
  isShareOpen?: boolean;
  isChatOpen?: boolean;
}

const RightToolbar: React.FC<RightToolbarProps> = ({
  onZoomIn,
  onZoomOut,
  onToggleLayerPanel,
  onToggleShareModal,
  isShareOpen
}) => {
  return (
    <div className="absolute bottom-16 right-6 z-30 flex flex-col gap-2">
      <div className="bg-white rounded-xl shadow-elevation-2 border border-hairline overflow-hidden flex flex-col">
        <WzButton variant="clear" onClick={onZoomIn} className="!w-10 !h-10 !rounded-none font-bold text-lg border-b border-hairline">
          +
        </WzButton>
        <WzButton variant="clear" onClick={onZoomOut} className="!w-10 !h-10 !rounded-none font-bold text-lg">
          −
        </WzButton>
      </div>

      <div className="bg-white rounded-xl shadow-elevation-2 border border-hairline overflow-hidden flex flex-col">
        {onToggleLayerPanel && (
          <WzButton variant="clear" onClick={onToggleLayerPanel} className="!w-10 !h-10 !rounded-none border-b border-hairline" title="Map Layers">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
          </WzButton>
        )}
        {onToggleShareModal && (
          <WzButton variant="clear" onClick={onToggleShareModal} className={`!w-10 !h-10 !rounded-none ${isShareOpen ? 'text-primary bg-blue-50' : ''}`} title="Share Location">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
          </WzButton>
        )}
      </div>
    </div>
  );
};

export default RightToolbar;
