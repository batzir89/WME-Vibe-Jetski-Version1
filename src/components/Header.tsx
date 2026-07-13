import React, { useState } from 'react';
import { WzButton } from './design-system/WzComponents';

interface HeaderProps {
  hasUnsavedChanges: boolean;
  onSave: () => void;
  isSaving: boolean;
  isUndoable: boolean;
  onUndo: () => void;
  isRedoable: boolean;
  onRedo: () => void;
  isDeletable: boolean;
  onTrash: () => void;
  onToggleChat?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  hasUnsavedChanges,
  onSave,
  isSaving,
  isUndoable,
  onUndo,
  isRedoable,
  onRedo,
  isDeletable,
  onTrash,
  onToggleChat
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="h-[56px] bg-white border-b border-hairline flex items-center justify-between px-3 z-40 shadow-sm flex-shrink-0">
      {/* Left section: Menu Icon, Logo & Title */}
      <div className="flex items-center gap-3">
        <button 
          className="p-2 text-content-p1 hover:bg-surface-alt rounded-lg transition-colors"
          title="Toggle Navigation Menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-waze-boing font-black text-sm shadow-sm">
            W
          </div>
          <span className="font-waze-boing font-black text-lg text-content-default tracking-tight">
            Waze Map Editor
          </span>
        </div>

        {/* Search location bar */}
        <div className="relative ml-4 w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-hint-text">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search location"
            className="w-full pl-9 pr-3 py-1.5 bg-surface-alt border border-hairline rounded-lg text-xs text-content-default placeholder:text-hint-text focus:outline-none focus:border-primary focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Right section: Action Buttons, Notifications, Chat, Apps & Profile */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 border-r border-hairline pr-2">
          <WzButton 
            variant="clear"
            onClick={onTrash} 
            disabled={!isDeletable}
            title="Delete Selected Feature"
            className="!p-2 text-content-p1 hover:text-red-600 disabled:opacity-40"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
          </WzButton>
          <WzButton 
            variant="clear"
            onClick={onUndo} 
            disabled={!isUndoable}
            title="Undo"
            className="!p-2 text-content-p1 disabled:opacity-40"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/></svg>
          </WzButton>
          <WzButton 
            variant="clear"
            onClick={onRedo} 
            disabled={!isRedoable}
            title="Redo"
            className="!p-2 text-content-p1 disabled:opacity-40"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 7v6h-6"/><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7"/></svg>
          </WzButton>
        </div>

        {/* Save Button with Unsaved counter badge */}
        <div className="relative flex items-center">
          <WzButton 
            onClick={onSave}
            disabled={!hasUnsavedChanges || isSaving}
            className={`font-bold px-4 ${hasUnsavedChanges ? 'bg-primary text-white hover:bg-primary/90' : 'bg-disabled-text text-white opacity-60'}`}
          >
            {isSaving ? 'Saving...' : 'Save'}
          </WzButton>
          {hasUnsavedChanges && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 text-slate-900 text-[10px] font-bold rounded-full flex items-center justify-center border border-white">
              1
            </span>
          )}
        </div>

        <div className="h-5 w-[1px] bg-hairline mx-1" />

        {/* Notifications Icon with Indicator */}
        <button 
          className="relative p-2 text-content-p1 hover:bg-surface-alt rounded-lg transition-colors"
          title="Notifications"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full ring-2 ring-white" />
        </button>

        {/* Community Chat */}
        {onToggleChat && (
          <button 
            onClick={onToggleChat} 
            className="p-2 text-content-p1 hover:bg-surface-alt rounded-lg transition-colors"
            title="WME Chat"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </button>
        )}

        {/* Apps Grid */}
        <button 
          className="p-2 text-content-p1 hover:bg-surface-alt rounded-lg transition-colors"
          title="Waze Apps"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
          </svg>
        </button>

        {/* User Profile Avatar */}
        <div className="w-8 h-8 rounded-full bg-slate-200 border border-hairline flex items-center justify-center text-content-default font-bold text-xs cursor-pointer hover:ring-2 hover:ring-primary transition-all">
          BZ
        </div>
      </div>
    </header>
  );
};

export default Header;
