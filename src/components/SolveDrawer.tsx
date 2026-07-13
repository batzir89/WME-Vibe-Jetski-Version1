import React from 'react';
import { WzSectionHeader } from './design-system/WzSectionHeader';
import { WzCard, WzButton, WzStatusChip } from './design-system/WzComponents';

interface SolveDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MapIssue {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  statusColor: 'orange' | 'blue' | 'red' | 'green';
  commentsCount: number;
}

const MOCK_ISSUES: MapIssue[] = [
  {
    id: 'issue-1',
    title: 'Update request: blocked road',
    subtitle: 'Soho St • 2 days ago',
    category: 'Traffic Flow',
    statusColor: 'orange',
    commentsCount: 3
  },
  {
    id: 'issue-2',
    title: 'Suggested edit: turn restriction',
    subtitle: 'Dean St • 5 days ago',
    category: 'Geometry',
    statusColor: 'blue',
    commentsCount: 2
  },
  {
    id: 'issue-3',
    title: 'Update request: incorrect speed limit',
    subtitle: 'Oxford St • 1 day ago',
    category: 'Speed Limit',
    statusColor: 'red',
    commentsCount: 5
  }
];

const SolveDrawer: React.FC<SolveDrawerProps> = ({ isOpen, onClose }) => {
  return (
    <div 
      className="bg-surface-default border-r border-hairline flex-shrink-0 flex flex-col relative overflow-hidden transition-[width] duration-250 ease-in-out z-10"
      style={{ width: isOpen ? '340px' : '0px' }}
    >
      <div className="flex flex-col h-full w-[340px]">
        <WzSectionHeader 
          headline="Solve Map Issues"
          actions={
            <WzButton variant="clear" onClick={onClose} className="!p-1 !h-auto">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </WzButton>
          }
        />

        <div className="p-3 space-y-3 flex-grow overflow-y-auto bg-surface-alt">
          {MOCK_ISSUES.map((issue) => (
            <WzCard key={issue.id} elevation={1} className="space-y-2">
              <div className="flex items-center justify-between">
                <WzStatusChip label={issue.category} color={issue.statusColor} />
                <span className="text-[11px] text-hint-text font-mono">💬 {issue.commentsCount}</span>
              </div>
              <div>
                <h4 className="font-waze-boing font-bold text-xs text-content-default leading-tight">{issue.title}</h4>
                <p className="text-[11px] text-hint-text mt-0.5">{issue.subtitle}</p>
              </div>
              <div className="pt-1 flex justify-end">
                <WzButton variant="secondary" className="!py-1 !px-2.5 text-[11px]">
                  Inspect Issue
                </WzButton>
              </div>
            </WzCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SolveDrawer;
