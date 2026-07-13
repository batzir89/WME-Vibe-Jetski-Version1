import React from 'react';
import { WzSectionHeader } from './design-system/WzSectionHeader';
import { WzButton, WzCard } from './design-system/WzComponents';

interface Drive {
  id: string;
  title: string;
  duration: string;
  distance: string;
  date: string;
}

interface YourDrivesDrawerProps {
  isOpen: boolean;
  onClose?: () => void;
}

const MOCK_DRIVES: Drive[] = [
  {
    id: 'drive-1',
    title: 'Soho Loop Drive',
    duration: '15 mins',
    distance: '3.2 km',
    date: 'Today, 2:30 PM',
  },
  {
    id: 'drive-2',
    title: 'Oxford St Commute',
    duration: '22 mins',
    distance: '5.8 km',
    date: 'Yesterday, 8:45 AM',
  }
];

const YourDrivesDrawer: React.FC<YourDrivesDrawerProps> = ({
  isOpen,
  onClose
}) => {
  return (
    <div 
      className="bg-surface-default border-r border-hairline flex-shrink-0 flex flex-col relative overflow-hidden transition-[width] duration-250 ease-in-out z-10"
      style={{ width: isOpen ? '340px' : '0px' }}
    >
      <div className="flex flex-col h-full w-[340px]">
        <WzSectionHeader 
          headline="Your Drives"
          actions={
            onClose && (
              <WzButton variant="clear" onClick={onClose} className="!p-1 !h-auto">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </WzButton>
            )
          }
        />
        <div className="flex-grow p-3 space-y-3 overflow-y-auto bg-surface-alt">
          {MOCK_DRIVES.map((drive) => (
            <WzCard key={drive.id} elevation={1}>
              <div className="flex items-center justify-between mb-1">
                <span className="font-waze-boing font-bold text-xs text-content-default">{drive.title}</span>
                <span className="text-[11px] font-mono text-hint-text">{drive.date}</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-content-p2">
                <span>⏱️ {drive.duration}</span>
                <span>📍 {drive.distance}</span>
              </div>
            </WzCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default YourDrivesDrawer;
