import React from 'react';
import { WzCard, WzButton } from './design-system/WzComponents';

export interface ComplexPinData {
  title: string;
  subtitle: string;
  iconSvg: string;
  iconBgColor: string;
}

interface InfoCardProps {
  data: ComplexPinData;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onRecenter: () => void;
  currentIndex: number;
  totalIssues: number;
  isSnapped?: boolean;
  onSnapChange?: (snapped: boolean) => void;
  mapViewSize?: { width: number; height: number };
}

const InfoCard: React.FC<InfoCardProps> = ({
  data,
  onClose,
  onNext,
  onPrev,
  onRecenter,
  currentIndex,
  totalIssues
}) => {
  return (
    <div className="absolute top-16 left-6 z-40 w-80 animate-in fade-in zoom-in-95 duration-200">
      <WzCard elevation={3} className="!p-4 border-hairline bg-white shadow-elevation-3 space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center text-white flex-shrink-0"
              style={{ backgroundColor: data.iconBgColor }}
              dangerouslySetInnerHTML={{ __html: data.iconSvg }}
            />
            <div>
              <h4 className="font-waze-boing font-bold text-sm text-content-default leading-tight">{data.title}</h4>
              <p className="text-[11px] text-hint-text mt-0.5">{data.subtitle}</p>
            </div>
          </div>
          <WzButton variant="clear" onClick={onClose} className="!p-1 !h-auto">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </WzButton>
        </div>

        <div className="pt-2 border-t border-hairline flex items-center justify-between">
          <div className="flex items-center gap-1">
            <WzButton variant="secondary" onClick={onPrev} className="!px-2 !py-1 text-xs">Prev</WzButton>
            <WzButton variant="secondary" onClick={onNext} className="!px-2 !py-1 text-xs">Next</WzButton>
            <span className="text-[11px] text-hint-text font-mono ml-1">{currentIndex + 1} of {totalIssues}</span>
          </div>
          <WzButton variant="secondary" onClick={onRecenter} className="!px-2 !py-1 text-xs">Recenter</WzButton>
        </div>
      </WzCard>
    </div>
  );
};

export default InfoCard;
