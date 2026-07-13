import React from 'react';
import { WzCard, WzButton } from './design-system/WzComponents';

interface VideoPlayerProps {
  drive: any;
  onClose: () => void;
  currentTime: number;
  onTimeUpdate: (time: number) => void;
  mapViewSize?: { width: number; height: number };
  activeSuggestionIndex?: number;
  setActiveSuggestionIndex?: (index: number) => void;
  onSuggestionSelect?: (suggestion: any, index: number) => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  drive,
  onClose,
  currentTime,
  onTimeUpdate,
  onSuggestionSelect
}) => {
  return (
    <div className="absolute bottom-12 left-6 z-40 w-80 animate-in fade-in zoom-in-95 duration-200">
      <WzCard elevation={3} className="!p-3 bg-white shadow-elevation-3 space-y-2 border border-hairline">
        <div className="flex items-center justify-between">
          <span className="font-waze-boing font-bold text-xs text-content-default">Drive Playback: {drive.title}</span>
          <WzButton variant="clear" onClick={onClose} className="!p-1 !h-auto">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </WzButton>
        </div>

        <div className="h-28 bg-slate-900 rounded-lg flex items-center justify-center text-white/50 text-xs font-mono">
          🎥 Simulated Dashcam Video ({Math.floor(currentTime)}s)
        </div>

        <div className="flex items-center gap-2">
          <input 
            type="range"
            min="0"
            max="900"
            value={currentTime}
            onChange={(e) => onTimeUpdate(parseFloat(e.target.value))}
            className="flex-grow h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <span className="text-[11px] font-mono text-content-p2">{Math.floor(currentTime)}s</span>
        </div>

        {drive.suggestions && drive.suggestions.length > 0 && (
          <div className="space-y-1 pt-1 border-t border-hairline">
            <span className="text-[10px] font-bold uppercase tracking-wider text-hint-text">Suggestions:</span>
            {drive.suggestions.map((s: any, idx: number) => (
              <button
                key={idx}
                onClick={() => onSuggestionSelect?.(s, idx)}
                className="w-full text-left text-xs px-2 py-1 rounded bg-surface-alt hover:bg-surface-variant transition-colors flex items-center justify-between"
              >
                <span>{s.text}</span>
                <span className="text-[10px] font-mono text-primary font-bold">{s.time}s</span>
              </button>
            ))}
          </div>
        )}
      </WzCard>
    </div>
  );
};

export default VideoPlayer;
