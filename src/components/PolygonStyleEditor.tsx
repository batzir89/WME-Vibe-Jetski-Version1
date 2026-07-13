import React, { useState, useRef, useEffect } from 'react';
import { WzToggleSwitch } from './design-system/WzToggleSwitch';
import { WzButton } from './design-system/WzComponents';

export interface PolygonStyleProps {
  strokeWidth: number;
  fillOpacity: number;
  strokeColor: string;
  fillColor: string;
  showStroke: boolean;
  showFill: boolean;
}

interface PolygonStyleEditorProps {
  style: PolygonStyleProps;
  onChange: (newStyle: PolygonStyleProps) => void;
  onClose: () => void;
  mapViewSize?: { width: number, height: number };
  initialPosition?: { x: number, y: number } | null;
}

const MAP_PADDING = 10;

export const PolygonStyleEditor: React.FC<PolygonStyleEditorProps> = ({ 
  style, 
  onChange, 
  onClose,
  mapViewSize = { width: window.innerWidth, height: window.innerHeight },
  initialPosition
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isInitialized, setIsInitialized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [lastInitialPosition, setLastInitialPosition] = useState<{ x: number, y: number } | null>(null);
  const dragOffset = useRef({ x: 0, y: 0 });

  // Update position if initialPosition changes (selection changed)
  useEffect(() => {
    if (initialPosition && initialPosition !== lastInitialPosition) {
      const editorWidth = 288;
      const editorHeight = 220;
      
      // Position to the right and slightly below the click point
      let targetX = initialPosition.x + 20;
      let targetY = initialPosition.y + 20;

      // Adjust if it would go off-screen
      if (targetX + editorWidth > mapViewSize.width - MAP_PADDING) {
        targetX = initialPosition.x - editorWidth - 20; // Try left side
      }
      if (targetY + editorHeight > mapViewSize.height - MAP_PADDING) {
        targetY = mapViewSize.height - editorHeight - MAP_PADDING;
      }

      // Clamp to screen bounds
      targetX = Math.max(MAP_PADDING, Math.min(targetX, mapViewSize.width - editorWidth - MAP_PADDING));
      targetY = Math.max(MAP_PADDING, Math.min(targetY, mapViewSize.height - editorHeight - MAP_PADDING));

      setPosition({ x: targetX, y: targetY });
      setLastInitialPosition(initialPosition);
      setIsInitialized(true);
    }
  }, [initialPosition, mapViewSize, lastInitialPosition]);

  // Default fallback if no initialPosition
  useEffect(() => {
    if (!isInitialized && mapViewSize.width > 0 && !initialPosition) {
      setPosition({ 
        x: Math.max(MAP_PADDING, mapViewSize.width - 310), 
        y: Math.max(MAP_PADDING, Math.min(100, mapViewSize.height - 220))
      });
      setIsInitialized(true);
    }
  }, [mapViewSize, isInitialized, initialPosition]);

  // Ensure editor stays within bounds when window/sidebar resizes
  useEffect(() => {
    if (isInitialized && !isDragging) {
      const editorWidth = 288;
      const editorHeight = 220;
      
      setPosition(prev => ({
        x: Math.max(MAP_PADDING, Math.min(prev.x, mapViewSize.width - editorWidth - MAP_PADDING)),
        y: Math.max(MAP_PADDING, Math.min(prev.y, mapViewSize.height - editorHeight - MAP_PADDING))
      }));
    }
  }, [mapViewSize, isInitialized, isDragging]);

  const update = (patch: Partial<PolygonStyleProps>) => {
    onChange({ ...style, ...patch });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    dragOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    };
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const newX = e.clientX - dragOffset.current.x;
      const newY = e.clientY - dragOffset.current.y;

      // Clamp within view
      const clampedX = Math.max(MAP_PADDING, Math.min(newX, mapViewSize.width - 288 - MAP_PADDING));
      const clampedY = Math.max(MAP_PADDING, Math.min(newY, mapViewSize.height - 220 - MAP_PADDING));

      setPosition({ x: clampedX, y: clampedY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, mapViewSize]);

  return (
    <div 
      className={`absolute z-[1001] bg-white rounded-xl shadow-elevation-3 w-72 overflow-hidden border border-hairline animate-in fade-in zoom-in-95 duration-200 ${isDragging ? 'cursor-grabbing select-none' : ''}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      onPointerDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
    >
      <div 
        className="px-4 py-3 border-b border-hairline flex items-center justify-between bg-surface-variant/30 cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
      >
        <h3 className="font-medium text-content-default text-sm">Polygon Style</h3>
        <WzButton color="clear-icon" onClick={onClose} className="!p-1 !h-auto" onMouseDown={e => e.stopPropagation()}>
           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </WzButton>
      </div>

      <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto">
        {/* Stroke Section */}
        <div className="space-y-3">
          <WzToggleSwitch checked={style.showStroke} onChange={(val) => update({ showStroke: val })}>
            Show Border
          </WzToggleSwitch>
          
          {style.showStroke && (
            <div className="space-y-3 pl-2 border-l-2 border-hairline ml-3">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-hint-text">Border Width</label>
                <div className="flex items-center gap-3">
                   <input 
                    type="range" min="0" max="10" step="0.5" 
                    value={style.strokeWidth} 
                    onChange={(e) => update({ strokeWidth: parseFloat(e.target.value) })}
                    className="flex-grow h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <span className="text-xs font-mono w-4 text-right text-content-default">{style.strokeWidth}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Fill Section */}
        <div className="space-y-3">
          <WzToggleSwitch checked={style.showFill} onChange={(val) => update({ showFill: val })}>
            Show Fill
          </WzToggleSwitch>
          
          {style.showFill && (
            <div className="space-y-3 pl-2 border-l-2 border-hairline ml-3">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-hint-text">Fill Opacity</label>
                <div className="flex items-center gap-3">
                   <input 
                    type="range" min="0" max="1" step="0.05" 
                    value={style.fillOpacity} 
                    onChange={(e) => update({ fillOpacity: parseFloat(e.target.value) })}
                    className="flex-grow h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <span className="text-xs font-mono w-8 text-right text-content-default">{Math.round(style.fillOpacity * 100)}%</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
