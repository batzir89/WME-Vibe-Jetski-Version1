import React from 'react';
import { WzButton } from './design-system/WzComponents';

interface TileRecoveryNotificationProps {
  isVisible: boolean;
  onRefresh: () => void;
  onFallback: () => void;
  onClose: () => void;
}

const TileRecoveryNotification: React.FC<TileRecoveryNotificationProps> = ({
  isVisible,
  onRefresh,
  onFallback,
  onClose
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-14 left-1/2 -translate-x-1/2 z-40 bg-surface-default border border-hairline p-3 rounded-xl shadow-elevation-3 flex items-center gap-3 text-xs animate-in fade-in slide-in-from-bottom-2 duration-200">
      <span className="w-2 h-2 rounded-full bg-cautious animate-ping" />
      <span className="text-content-p1">Tile layer zoom threshold notice</span>
      <WzButton variant="secondary" onClick={onRefresh} className="!py-1 !px-2 text-xs">Reload Tiles</WzButton>
      <WzButton variant="secondary" onClick={onFallback} className="!py-1 !px-2 text-xs">Reset Zoom</WzButton>
      <WzButton variant="clear" onClick={onClose} className="!p-1 !h-auto">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </WzButton>
    </div>
  );
};

export default TileRecoveryNotification;
