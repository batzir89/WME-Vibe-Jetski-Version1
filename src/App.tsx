import React, { useState } from 'react';
import SolveDrawer, { IssueItem } from './components/SolveDrawer';
import { MapContent } from './components/MapContent';
import { PolygonStyleEditor, PolygonStyleProps } from './components/PolygonStyleEditor';
import { WzButton } from './components/design-system/WzComponents';

export const App: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [drawerWidth, setDrawerWidth] = useState(380);
  const [isAutoRefresh, setIsAutoRefresh] = useState(true);
  const [selectedIssue, setSelectedIssue] = useState<IssueItem | null>(null);
  const [showIssues, setShowIssues] = useState(true);
  
  const [polygonStyle, setPolygonStyle] = useState<PolygonStyleProps>({
    strokeWidth: 3,
    fillOpacity: 0.35,
    strokeColor: '#0075E3',
    fillColor: '#0075E3',
    showStroke: true,
    showFill: true
  });
  const [showPolygonEditor, setShowPolygonEditor] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background-default text-content-default">
      {/* Top Navigation Bar */}
      <div className="absolute top-0 left-0 right-0 h-[52px] bg-white border-b border-hairline z-50 flex items-center justify-between px-4 shadow-sm">
        <div className="flex items-center gap-3">
          <WzButton 
            variant="secondary"
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            className="!py-1 !px-2.5 flex items-center gap-2 border-hairline"
          >
            <svg className="w-4.5 h-4.5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
            <span className="text-xs font-bold text-content-p1">Issues Panel</span>
          </WzButton>

          <div className="h-5 w-[1px] bg-hairline" />

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white font-waze-boing font-black text-xs shadow-sm">
              W
            </div>
            <span className="font-waze-boing font-black text-lg text-content-default tracking-tight">Waze Map Editor</span>
            <span className="bg-[#1EE592]/20 text-[#118742] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-[#1EE592]/40">
              Vibe Replica • Soho Live
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <WzButton 
            variant="secondary"
            onClick={() => setShowIssues(!showIssues)}
            className={`!py-1.5 !px-3 font-bold transition-all ${
              showIssues ? 'bg-blue-50/80 border-primary text-primary' : ''
            }`}
          >
            {showIssues ? 'Hide Cluster Pins' : 'Show Cluster Pins'}
          </WzButton>

          <WzButton 
            variant="secondary"
            onClick={() => setShowPolygonEditor(!showPolygonEditor)}
            className={`!py-1.5 !px-3 font-bold transition-all ${
              showPolygonEditor ? 'bg-blue-50/80 border-primary text-primary' : ''
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-primary" />
            Polygon Style Editor
          </WzButton>

          <div className="flex items-center gap-2 bg-surface-alt px-3 py-1 rounded-full border border-hairline text-xs font-medium text-content-p1">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Lat: 51.5136° N, Lon: 0.1365° W
          </div>
        </div>
      </div>

      {/* Main Content Viewport */}
      <div className="flex w-full h-full pt-[52px] relative overflow-hidden">
        {/* Left Drawer Side Panel */}
        <SolveDrawer 
          isOpen={isDrawerOpen} 
          width={drawerWidth} 
          setWidth={setDrawerWidth} 
          isAutoRefresh={isAutoRefresh} 
          setIsAutoRefresh={setIsAutoRefresh}
          selectedIssue={selectedIssue}
          onSelectIssue={(issue) => {
            setSelectedIssue(issue);
            triggerToast(`Focused on ${issue.id}: ${issue.title}`);
          }}
        />

        {/* Map Canvas */}
        <div className="flex-1 h-full relative overflow-hidden">
          <MapContent 
            polygonStyle={polygonStyle}
            showIssues={showIssues}
            onPolygonSelect={() => {
              triggerToast("Selected Soho Food Cluster Zone");
            }}
          />

          {/* Polygon Style Editor Panel */}
          {showPolygonEditor && (
            <PolygonStyleEditor 
              style={polygonStyle} 
              onChange={setPolygonStyle} 
              onClose={() => setShowPolygonEditor(false)} 
            />
          )}

          {/* User Hint Tooltip Badge */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-elevation-2 border border-hairline z-30 flex items-center gap-2">
            <span className="text-xs font-waze-boing font-bold text-content-default">💡 Hover over the 7-counter Food Cluster pin to fan out items!</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#E06B00]" />
            <span className="text-xs text-content-p2 font-medium">Drag the Polygon Style box around</span>
          </div>

          {/* Dynamic Toast Message */}
          {toastMessage && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-content-default text-white px-5 py-2.5 rounded-xl shadow-2xl text-xs font-medium z-50 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3 duration-200">
              <span className="w-2 h-2 rounded-full bg-brand-carpool" />
              {toastMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
