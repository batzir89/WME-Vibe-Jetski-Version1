import React from 'react';
import { WzButton, WzCard, WzStatusChip } from './WzComponents';
import { WzSectionHeader } from './WzSectionHeader';

interface DesignSystemPageProps {
  onBack: () => void;
}

const DesignSystemPage: React.FC<DesignSystemPageProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-surface-alt p-8 overflow-y-auto">
      <div className="max-w-4xl mx-auto space-y-8 bg-white p-6 rounded-2xl shadow-elevation-2 border border-hairline">
        <div className="flex items-center justify-between border-b border-hairline pb-4">
          <div>
            <h1 className="font-waze-boing font-black text-2xl text-content-default">WME Vibe Design System</h1>
            <p className="text-sm text-hint-text mt-1">Official design system components, foundation tokens, and guidelines.</p>
          </div>
          <WzButton onClick={onBack}>Back to Map Editor</WzButton>
        </div>

        <WzSectionHeader headline="Status Chips" />
        <div className="flex items-center gap-3">
          <WzStatusChip label="Open" color="orange" />
          <WzStatusChip label="Pending" color="blue" />
          <WzStatusChip label="Verified" color="green" />
          <WzStatusChip label="Review" color="purple" />
          <WzStatusChip label="Critical" color="red" />
        </div>

        <WzSectionHeader headline="Cards & Elevations" />
        <div className="grid grid-cols-3 gap-4">
          <WzCard elevation={1}>
            <h4 className="font-waze-boing font-bold text-sm">Elevation 1</h4>
            <p className="text-xs text-content-p2 mt-1">Standard card elevation for list feeds.</p>
          </WzCard>
          <WzCard elevation={2}>
            <h4 className="font-waze-boing font-bold text-sm">Elevation 2</h4>
            <p className="text-xs text-content-p2 mt-1">Medium shadow for hover tooltips.</p>
          </WzCard>
          <WzCard elevation={3}>
            <h4 className="font-waze-boing font-bold text-sm">Elevation 3</h4>
            <p className="text-xs text-content-p2 mt-1">High elevation for floating panels.</p>
          </WzCard>
        </div>
      </div>
    </div>
  );
};

export default DesignSystemPage;
