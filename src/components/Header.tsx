import React from 'react';
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
  return (
    <header className="h-[52px] bg-white border-b border-hairline flex items-center justify-between px-4 z-40 shadow-sm flex-shrink-0">
      <div className="flex items-center gap-3">
        <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white font-waze-boing font-black text-xs shadow-sm">
          W
        </div>
        <span className="font-waze-boing font-black text-lg text-content-default tracking-tight">Waze Map Editor</span>
        <span className="bg-brand-carpool/20 text-[#118742] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-brand-carpool/40">
          Vibe Core Replica
        </span>
      </div>

      <div className="flex items-center gap-2">
        <WzButton 
          variant="secondary"
          onClick={onUndo} 
          disabled={!isUndoable}
          className="!p-1.5"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/></svg>
        </WzButton>
        <WzButton 
          variant="secondary"
          onClick={onRedo} 
          disabled={!isRedoable}
          className="!p-1.5"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 7v6h-6"/><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7"/></svg>
        </WzButton>
        <WzButton 
          variant="secondary"
          onClick={onTrash} 
          disabled={!isDeletable}
          className="!p-1.5 text-red-500 hover:text-red-600"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
        </WzButton>

        <div className="h-5 w-[1px] bg-hairline mx-1" />

        <WzButton 
          onClick={onSave}
          disabled={!hasUnsavedChanges || isSaving}
          className={`font-bold ${hasUnsavedChanges ? 'bg-primary' : 'bg-disabled-text text-white'}`}
        >
          {isSaving ? 'Saving...' : 'Save'}
        </WzButton>

        {onToggleChat && (
          <WzButton variant="secondary" onClick={onToggleChat} className="!p-1.5 ml-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </WzButton>
        )}
      </div>
    </header>
  );
};

export default Header;
