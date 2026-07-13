import React from 'react';
import { WzButton } from './design-system/WzComponents';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background-modal backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-elevation-3 border border-hairline space-y-4 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-waze-boing font-black text-lg">
            W
          </div>
          <div>
            <h3 className="font-waze-boing font-black text-lg text-content-default">Welcome to WME Vibe</h3>
            <p className="text-xs text-hint-text">Interactive Map Editor Replica</p>
          </div>
        </div>
        <p className="text-xs text-content-p2 leading-relaxed">
          Explore Soho Food Cluster pins, edit polygon styling with real-time opacity controls, solve map issues, and review drive recordings directly on the map.
        </p>
        <div className="pt-2 flex justify-end">
          <WzButton onClick={onClose} className="w-full font-bold">
            Start Editing
          </WzButton>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;
