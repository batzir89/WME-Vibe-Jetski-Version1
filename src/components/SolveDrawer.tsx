import React, { useState } from 'react';
import { FeedIcon, RefreshIcon, ChevronDownIcon } from './icons';
import { Filter } from 'lucide-react';
import { WzTabs, WzTab } from './design-system/WzTabs';
import { WzCard, WzStatusChip } from './design-system/WzComponents';
import { WzCheckbox } from './design-system/WzCheckbox';

export interface IssueItem {
  id: string;
  title: string;
  subtitle: string;
  status: string;
  chipColor: 'blue' | 'orange' | 'green' | 'purple' | 'red';
  desc: string;
}

interface SolveDrawerProps {
  isOpen: boolean;
  width: number;
  setWidth?: (width: number) => void;
  isAutoRefresh: boolean;
  setIsAutoRefresh: (isAutoRefresh: boolean) => void;
  selectedIssue?: IssueItem | null;
  onSelectIssue?: (issue: IssueItem) => void;
}

const CuteWazeMascotAvatar = () => (
  <svg width="34" height="34" viewBox="0 0 32 32" className="w-[34px] h-[34px] select-none flex-shrink-0">
    <path d="M22 21C22 23.2091 19.3137 25 16 25C12.6863 25 10 23.2091 10 21C10 18.7909 12.6863 17 16 17C19.3137 17 22 18.7909 22 21Z" fill="#000" opacity="0.08"/>
    <circle cx="11" cy="24" r="2.5" fill="#1B1B1B" stroke="white" strokeWidth="1.2"/>
    <circle cx="21" cy="24" r="2.5" fill="#1B1B1B" stroke="white" strokeWidth="1.2"/>
    <path d="M25 19C25 14 21.5 10 16 10C10.5 10 7 14 7 19C7 22.5 9.5 24 16 24C22.5 24 25 22.5 25 19Z" fill="#33CCFF" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M12 10.5L9.5 5.5" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="9" cy="4.5" r="1.8" fill="#FFC400" stroke="#1B1B1B" strokeWidth="1.5"/>
    <circle cx="12.5" cy="16.5" r="3" fill="white" stroke="#1B1B1B" strokeWidth="1.2"/>
    <circle cx="13" cy="16.5" r="1.2" fill="#1B1B1B"/>
    <circle cx="19.5" cy="16.5" r="4.2" fill="#1B1B1B" />
    <circle cx="19.5" cy="16.5" r="2.2" fill="#A4FF00" stroke="#1B1B1B" strokeWidth="1"/>
    <path d="M16 14.5L24 17.5" stroke="#1B1B1B" strokeWidth="1.2"/>
    <path d="M14 20.3C14.8 21.3 16.2 21.3 17 20.3" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
  </svg>
);

const MOCK_ISSUES: Record<string, IssueItem[]> = {
  MSs: [
    { id: 'MS #1042', title: 'Missing Segment in Soho', subtitle: 'Reported 12 mins ago • High Priority', status: 'Open', chipColor: 'orange', desc: 'User reports road continuation missing connecting Dean St to Carlisle St.' },
    { id: 'MS #0988', title: 'New Roundabout geometry', subtitle: 'Reported 2 hours ago', status: 'Pending', chipColor: 'blue', desc: 'Recently constructed 3-lane roundabout needs geometry audit.' },
    { id: 'MS #0811', title: 'Private road designation check', subtitle: 'Reported yesterday', status: 'Under Review', chipColor: 'purple', desc: 'Check if gated residential street requires private attribute.' }
  ],
  URs: [
    { id: 'UR #8892', title: 'Turn restriction incorrect on Oxford St', subtitle: 'Last comment 5 mins ago', status: 'Open', chipColor: 'orange', desc: 'No right turn between 7am and 7pm currently marked 24/7.' },
    { id: 'UR #8741', title: 'One way direction reversed', subtitle: 'Reported 1 hour ago', status: 'Investigating', chipColor: 'blue', desc: 'Wardour St direction appears flipped after recent road works.' }
  ],
  PURs: [
    { id: 'PUR #331', title: 'New Parking Lot: Soho Underground', subtitle: 'Reported 3 hours ago', status: 'New', chipColor: 'green', desc: 'Entrance coordinates and pricing details submitted.' }
  ],
  MPs: [
    { id: 'MP #512', title: 'Map Problem: Navigation Loop', subtitle: 'Automated alert • 4 occurrences', status: 'System Alert', chipColor: 'orange', desc: 'Users experiencing routing loop around Golden Square.' }
  ]
};

export const SolveDrawer: React.FC<SolveDrawerProps> = ({ 
  isOpen, 
  width, 
  isAutoRefresh, 
  setIsAutoRefresh,
  selectedIssue,
  onSelectIssue 
}) => {
  const [activeTab, setActiveTab] = useState('MSs');
  
  const tabs = [
    { id: 'URs', label: 'URs', count: 140 },
    { id: 'PURs', label: 'PURs', count: 9 },
    { id: 'MPs', label: 'MPs', count: 16 },
    { id: 'MSs', label: 'MSs', count: 3 },
  ];

  const currentList = MOCK_ISSUES[activeTab] || [];

  return (
    <div 
      className="bg-[#FFFFFF] border-r border-hairline flex-shrink-0 flex flex-col relative overflow-hidden transition-[width] duration-300 cubic-bezier(0.4,0,0.2,1) shadow-elevation-2 z-30"
      style={{ width: isOpen ? `${width}px` : '0px' }}
    >
      <div className="flex flex-col h-full" style={{ minWidth: `330px`, width: `${width}px` }}>
        {/* Panel Header */}
        <div className="h-12 px-4 border-b border-hairline flex items-center justify-between flex-shrink-0 bg-white">
          <div className="flex items-center gap-1.5">
            <FeedIcon className="w-5 h-5 text-hint-text" />
            <button className="flex items-center gap-0.5 text-content-p1 font-sans font-bold text-sm hover:bg-surface-alt px-1 py-0.5 rounded">
              <span>All issues</span>
              <ChevronDownIcon className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex items-center gap-0.5">
            <button className="w-8 h-8 flex items-center justify-center hover:bg-surface-alt rounded-full text-content-p1"><RefreshIcon className="w-4 h-4" /></button>
            <button className="w-8 h-8 flex items-center justify-center hover:bg-surface-alt rounded-full text-content-p1"><Filter className="w-[18px] h-[18px]" /></button>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex-shrink-0 bg-white shadow-sm">
          <WzTabs 
            activeTabIndex={tabs.findIndex((t) => t.id === activeTab)} 
            onTabChange={(index) => setActiveTab(tabs[index].id)}
            className="w-full"
          >
            {tabs.map((tab) => (
              <WzTab key={tab.id} label={`${tab.label} (${tab.count})`}>
                <div className="hidden" />
              </WzTab>
            ))}
          </WzTabs>
        </div>

        {/* Issues List Container */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2.5 bg-surface-alt">
          {currentList.map((issue) => {
            const isSelected = selectedIssue?.id === issue.id;
            return (
              <WzCard 
                key={issue.id} 
                onClick={() => onSelectIssue?.(issue)}
                className={isSelected ? 'ring-2 ring-primary border-primary bg-blue-50/20' : ''}
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <CuteWazeMascotAvatar />
                    <div>
                      <span className="font-waze-boing font-bold text-[13.5px] text-content-default block leading-tight">
                        {issue.title}
                      </span>
                      <span className="text-[11px] text-hint-text font-medium block mt-0.5">
                        {issue.id} • {issue.subtitle}
                      </span>
                    </div>
                  </div>
                  <WzStatusChip label={issue.status} color={issue.chipColor} />
                </div>
                <p className="text-[12px] text-content-p2 leading-relaxed pl-10 border-t border-hairline/60 pt-2 mt-2">
                  {issue.desc}
                </p>
              </WzCard>
            );
          })}
        </div>

        {/* Auto Refresh Toggle in Footer */}
        <div className="h-[52px] px-4 border-t border-hairline flex items-center justify-between flex-shrink-0 bg-white">
          <WzCheckbox checked={isAutoRefresh} onChange={(val) => setIsAutoRefresh(val)}>
            <span className="font-sans text-[13px] text-content-p2 font-medium">
              Update results when map moves
            </span>
          </WzCheckbox>
          <span className="text-[11px] font-mono text-content-p3 bg-surface-alt px-2 py-0.5 rounded border border-hairline">
            Soho Area
          </span>
        </div>
      </div>
    </div>
  );
};

export default SolveDrawer;
