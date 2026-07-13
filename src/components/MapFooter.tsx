import React from 'react';

interface MapFooterProps {
  coords: string;
  zoomLevel: number;
  onOpenDesignSystem: () => void;
  onOpenChat?: () => void;
}

const MapFooter: React.FC<MapFooterProps> = ({
  coords,
  zoomLevel,
  onOpenDesignSystem,
  onOpenChat
}) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-9 bg-white/90 backdrop-blur-sm border-t border-hairline px-4 z-20 flex items-center justify-between text-xs text-content-p2 font-mono">
      <div className="flex items-center gap-4">
        <span>{coords}</span>
        <span className="border-l border-hairline pl-4">Zoom: {zoomLevel}</span>
      </div>

      <div className="flex items-center gap-3 font-sans font-medium text-[11px]">
        <button 
          onClick={onOpenDesignSystem}
          className="text-primary hover:underline"
        >
          🎨 Design System Tokens
        </button>
        {onOpenChat && (
          <button 
            onClick={onOpenChat}
            className="text-content-p1 hover:text-primary transition-colors"
          >
            💬 Community Chat
          </button>
        )}
      </div>
    </div>
  );
};

export default MapFooter;
