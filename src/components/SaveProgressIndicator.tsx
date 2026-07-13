import React, { useEffect } from 'react';

interface SaveProgressIndicatorProps {
  isVisible: boolean;
  isComplete: boolean;
  onFinish: () => void;
}

const SaveProgressIndicator: React.FC<SaveProgressIndicatorProps> = ({
  isVisible,
  isComplete,
  onFinish
}) => {
  useEffect(() => {
    if (isComplete) {
      const timer = setTimeout(() => {
        onFinish();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isComplete, onFinish]);

  if (!isVisible && !isComplete) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-content-default text-white px-4 py-2.5 rounded-xl shadow-elevation-3 flex items-center gap-3 text-xs font-bold animate-in fade-in slide-in-from-bottom-2 duration-200">
      {!isComplete ? (
        <>
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          <span>Saving map changes to WME servers...</span>
        </>
      ) : (
        <>
          <span className="w-2 h-2 rounded-full bg-brand-carpool animate-ping" />
          <span>Map edits successfully saved!</span>
        </>
      )}
    </div>
  );
};

export default SaveProgressIndicator;
