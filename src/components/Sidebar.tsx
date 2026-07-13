import React, { useState } from 'react';
import {
  PlusIcon,
  MapEditIcon,
  FeedIcon,
  CalendarIcon,
  PlaceIcon,
  YourDrivesIcon,
  GlobeIcon,
  ScriptsIcon,
  SettingsIcon,
} from './icons';
import { WzMenu, WzMenuItem } from './design-system/WzMenu';
import { ActiveDrawer } from '../App';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  hasDivider?: boolean;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, active = false, hasDivider = true, onClick }) => {
  const activeClasses = active ? 'bg-surface-variant text-primary font-bold' : 'text-content-p1 hover:bg-surface-alt';
  return (
    <div className="w-full">
      {hasDivider && <div className="h-[1px] bg-hairline w-full" />}
      <button 
        onClick={onClick} 
        className={`flex flex-col items-center justify-center h-[70px] w-full gap-1 transition-all duration-150 ${activeClasses}`}
      >
        <span className="text-content-p1">{icon}</span>
        <span className="text-[11px] leading-tight text-center tracking-tight px-1 font-sans">{label}</span>
      </button>
    </div>
  );
};

interface SidebarProps {
  activeDrawer: ActiveDrawer;
  onToggleDrawer: (drawer: ActiveDrawer) => void;
  isDrawingMode: boolean;
  isPOIMode: boolean;
  onToggleDrawingMode: () => void;
  onTogglePOIMode: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeDrawer, 
  onToggleDrawer,
  isDrawingMode,
  isPOIMode,
  onToggleDrawingMode,
  onTogglePOIMode
}) => {
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);

  return (
    <aside className="w-20 bg-surface-default flex flex-col items-center border-r border-hairline flex-shrink-0 z-20 select-none">
      {/* Top Plus Action Button (Frame: Collapsed with labels) */}
      <div className="h-[72px] flex items-center justify-center w-full relative">
        <button 
          onClick={() => setIsMenuExpanded(!isMenuExpanded)}
          className={`w-10 h-10 rounded-full flex items-center justify-center text-white shadow-elevation-1 transition-all duration-150 hover:scale-105 ${
            (isDrawingMode || isPOIMode) ? 'bg-emerald-500 ring-2 ring-emerald-200' : 'bg-primary hover:bg-primary/90'
          }`}
          title={(isDrawingMode || isPOIMode) ? 'Exit Mode' : 'New Map Feature'}
        >
          {(isDrawingMode || isPOIMode) ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <PlusIcon />
          )}
        </button>

        <WzMenu 
          expanded={isMenuExpanded} 
          className="left-full ml-2 top-4"
        >
          <WzMenuItem 
            leadingIcon={<MapEditIcon />} 
            onClick={() => {
              setIsMenuExpanded(false);
              onToggleDrawingMode();
            }}
          >
            Create Polygon Area
          </WzMenuItem>
          <WzMenuItem 
            leadingIcon={<PlaceIcon />} 
            onClick={() => {
              setIsMenuExpanded(false);
              onTogglePOIMode();
            }}
          >
            Create Place Marker
          </WzMenuItem>
        </WzMenu>
      </div>

      {/* Labeled menu list from Figma frame 7828:79830 */}
      <div className="w-full flex-grow overflow-y-auto overflow-x-hidden">
        <SidebarItem 
          icon={<MapEditIcon />} 
          label="Select" 
          active={activeDrawer === 'select'} 
          onClick={() => onToggleDrawer('select')} 
        />
        <SidebarItem 
          icon={<FeedIcon />} 
          label="Solve" 
          active={activeDrawer === 'solve'} 
          onClick={() => onToggleDrawer('solve')} 
        />
        <SidebarItem 
          icon={<CalendarIcon />} 
          label="Events" 
          active={activeDrawer === 'events'} 
          onClick={() => onToggleDrawer('events')} 
        />
        <SidebarItem 
          icon={<PlaceIcon />} 
          label="Google places" 
          active={activeDrawer === 'places'} 
          onClick={() => onToggleDrawer('places')} 
        />
        <SidebarItem 
          icon={<YourDrivesIcon />} 
          label="Your drives" 
          active={activeDrawer === 'drives'} 
          onClick={() => onToggleDrawer('drives')} 
        />
        <SidebarItem 
          icon={<GlobeIcon />} 
          label="Your areas" 
          active={activeDrawer === 'areas'} 
          onClick={() => onToggleDrawer('areas')} 
        />
        <SidebarItem 
          icon={<ScriptsIcon />} 
          label="Scripts" 
          active={activeDrawer === 'scripts'} 
          onClick={() => onToggleDrawer('scripts')} 
        />
        <SidebarItem 
          icon={<SettingsIcon />} 
          label="Settings" 
          active={activeDrawer === 'settings'} 
          onClick={() => onToggleDrawer('settings')} 
        />
      </div>
    </aside>
  );
};

export default Sidebar;
