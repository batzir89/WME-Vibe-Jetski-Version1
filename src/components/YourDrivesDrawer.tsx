import React from 'react';
import { WzSectionHeader } from './design-system/WzSectionHeader';
import { WzButton, WzCard } from './design-system/WzComponents';

interface Drive {
  id: string;
  title: string;
  duration: string;
  distance: string;
  date: string;
  route: number[][];
  suggestions?: { time: number; text: string }[];
}

interface YourDrivesDrawerProps {
  isOpen: boolean;
  width: number;
  setWidth?: (width: number) => void;
  onDriveSelect: (drive: Drive | null) => void;
  selectedDrive: Drive | null;
  onReviewDrive: (drive: Drive) => void;
}

const MOCK_DRIVES: Drive[] = [
  {
    id: 'drive-1',
    title: 'Soho Loop Drive',
    duration: '15 mins',
    distance: '3.2 km',
    date: 'Today, 2:30 PM',
    route: [
      [-0.1363, 51.5135, 25],
      [-0.1380, 51.5140, 15],
      [-0.1350, 51.5150, 30],
      [-0.1363, 51.5135, 25]
    ],
    suggestions: [
      { time: 180, text: 'Check turn restriction at Dean St' },
      { time: 420, text: 'Confirm missing segment speed limit' }
    ]
  },
  {
    id: 'drive-2',
    title: 'Oxford St Commute',
    duration: '22 mins',
    distance: '5.8 km',
    date: 'Yesterday, 8:45 AM',
    route: [
      [-0.1420, 51.5153, 40],
      [-0.1346, 51.5161, 10],
      [-0.1300, 51.5165, 35]
    ],
    suggestions: [
      { time: 300, text: 'Heavy congestion slowdown' }
    ]
  }
];

const YourDrivesDrawer: React.FC<YourDrivesDrawerProps> = ({
  isOpen,
  width,
  onDriveSelect,
  selectedDrive,
  onReviewDrive
}) => {
  return (
    <div 
      className="bg-white border-r border-hairline flex-shrink-0 flex flex-col relative overflow-hidden transition-[width] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
      style={{ width: isOpen ? `${width}px` : '0px' }}
    >
      <div className="flex flex-col h-full w-[340px]">
        <WzSectionHeader headline="Your Drives" />
        <div className="flex-grow p-3 space-y-3 overflow-y-auto bg-surface-alt">
          {MOCK_DRIVES.map((drive) => {
            const isSelected = selectedDrive?.id === drive.id;
            return (
              <WzCard 
                key={drive.id}
                onClick={() => onDriveSelect(isSelected ? null : drive)}
                className={isSelected ? 'ring-2 ring-primary border-primary bg-blue-50/20' : ''}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-waze-boing font-bold text-sm text-content-default">{drive.title}</span>
                  <span className="text-[11px] font-mono text-hint-text">{drive.date}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-content-p2 mb-2">
                  <span>⏱️ {drive.duration}</span>
                  <span>📍 {drive.distance}</span>
                </div>
                <WzButton 
                  variant="secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    onReviewDrive(drive);
                  }}
                  className="w-full text-xs font-bold !py-1 text-primary hover:bg-blue-50"
                >
                  Review Drive Video
                </WzButton>
              </WzCard>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default YourDrivesDrawer;
