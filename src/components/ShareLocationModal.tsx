import React from 'react';
import { WzButton } from './design-system/WzComponents';

interface ShareLocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  isChatOpen?: boolean;
}

const ShareLocationModal: React.FC<ShareLocationModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background-modal backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-5 max-w-sm w-full shadow-elevation-3 border border-hairline space-y-3">
        <h3 className="font-waze-boing font-bold text-base text-content-default">Share Location</h3>
        <p className="text-xs text-content-p2">
          Copy coordinates link for current view in Soho (51.5136° N, 0.1365° W).
        </p>
        <div className="flex justify-end gap-2 pt-2">
          <WzButton variant="secondary" onClick={onClose}>Close</WzButton>
          <WzButton onClick={onClose}>Copy Link</WzButton>
        </div>
      </div>
    </div>
  );
};

export default ShareLocationModal;
