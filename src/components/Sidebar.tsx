import React, { useState } from 'react';
import {
  PlusIcon,
  MapEditIcon,
  FeedIcon,
  CalendarIcon,
  YourDrivesIcon,
  PlaceIcon,
  GlobeIcon,
  ScriptsIcon,
  SettingsIcon,
} from './icons';
import { WzMenu, WzMenuItem } from './design-system/WzMenu';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  hasDivider?: boolean;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, active = false, hasDivider = false, onClick }) => {
  const activeClasses = active ? 'bg-surface-variant text-primary font-bold' : 'text-content-p1 hover:bg-surface-alt';
  return (
    <div className="w-full">
      {hasDivider && <hr className="border-t border-hairline" />}
      <button onClick={onClick} className={`flex flex-col items-center justify-center h-[70px] w-full gap-1 transition-all duration-200 ${activeClasses}`}>
        {icon}
        <span className="text-xs tracking-wide">{label}</span>
      </button>
    </div>
  );
};

interface SidebarProps {
  activeDrawer: 'drives' | 'settings' | 'select' | 'places' | 'solve' | 'none';
  isDrawingMode: boolean;
  isPOIMode: boolean;
  onToggleDrivesDrawer: () => void;
  onToggleSettingsDrawer: () => void;
  onToggleSelectDrawer: () => void;
  onTogglePlacesDrawer: () => void;
  onToggleSolveDrawer: () => void;
  onToggleDrawingMode: () => void;
  onTogglePOIMode: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeDrawer, 
  isDrawingMode,
  isPOIMode,
  onToggleDrivesDrawer, 
  onToggleSettingsDrawer, 
  onToggleSelectDrawer,
  onTogglePlacesDrawer,
  onToggleSolveDrawer,
  onToggleDrawingMode,
  onTogglePOIMode
}) => {
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);

  const handleCreatePolygon = () => {
    setIsMenuExpanded(false);
    onToggleDrawingMode();
  };

  const handleCreatePOI = () => {
    setIsMenuExpanded(false);
    onTogglePOIMode();
  };

  return (
    <aside className="w-20 bg-white flex flex-col items-center shadow-md flex-shrink-0 z-10">
      <div className="h-[72px] flex items-center justify-center w-full relative">
        <button 
          onClick={() => setIsMenuExpanded(!isMenuExpanded)}
          className={`w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-200 hover:scale-110 ${
            (isDrawingMode || isPOIMode) ? 'bg-emerald-500 scale-110 ring-4 ring-emerald-200' : 'bg-primary hover:bg-primary/90'
          }`}
          title={(isDrawingMode || isPOIMode) ? 'Exit Mode' : 'Create new...'}
        >
          {(isDrawingMode || isPOIMode) ? (
            <svg onClick={(e) => { 
                e.stopPropagation(); 
                if (isDrawingMode) onToggleDrawingMode();
                if (isPOIMode) onTogglePOIMode();
              }} 
              width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            >
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
          <WzMenuItem leadingIcon={<MapEditIcon />} onClick={handleCreatePolygon}>
            Creating a polygon
          </WzMenuItem>
          <WzMenuItem leadingIcon={<PlaceIcon />} onClick={handleCreatePOI}>
            Creating a POI
          </WzMenuItem>
        </WzMenu>
      </div>

      <SidebarItem icon={<MapEditIcon />} label="Select" active={activeDrawer === 'select'} onClick={onToggleSelectDrawer} />
      <SidebarItem icon={<FeedIcon />} label="Solve" active={activeDrawer === 'solve'} onClick={onToggleSolveDrawer} />
      <SidebarItem icon={<CalendarIcon />} label="Events" />
      <SidebarItem icon={<PlaceIcon />} label="Google places" active={activeDrawer === 'places'} onClick={onTogglePlacesDrawer} />
      <SidebarItem icon={<YourDrivesIcon />} label="Your drives" hasDivider active={activeDrawer === 'drives'} onClick={onToggleDrivesDrawer} />
      <SidebarItem icon={<GlobeIcon />} label="Your areas" />
      <SidebarItem icon={<ScriptsIcon />} label="Scripts" />
      <SidebarItem icon={<SettingsIcon />} label="Settings" active={activeDrawer === 'settings'} onClick={onToggleSettingsDrawer} />
    </aside>
  );
};

export default Sidebar;
