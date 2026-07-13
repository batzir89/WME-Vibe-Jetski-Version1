import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MapContent from './components/MapContent';
import YourDrivesDrawer from './components/YourDrivesDrawer';
import SettingsDrawer from './components/SettingsDrawer';
import SelectionDrawer from './components/SelectionDrawer';
import DesignSystemPage from './components/design-system/DesignSystemPage';
import WelcomeModal from './components/WelcomeModal';
import SaveProgressIndicator from './components/SaveProgressIndicator';
import { WzSectionHeader } from './components/design-system/WzSectionHeader';
import { WzButton } from './components/design-system/WzComponents';
import { WzCheckbox } from './components/design-system/WzCheckbox';
import SolveDrawer from './components/SolveDrawer';

type ActiveDrawer = 'drives' | 'settings' | 'select' | 'places' | 'solve' | 'none';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'app' | 'design-system'>('app');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isUndoable, setIsUndoable] = useState(false);
  const [isRedoable, setIsRedoable] = useState(false);
  const [isDeletable, setIsDeletable] = useState(false);
  const [activeDrawer, setActiveDrawer] = useState<ActiveDrawer>('none');
  const [drawerWidth, setDrawerWidth] = useState(340);
  const [solveDrawerWidth, setSolveDrawerWidth] = useState(340);
  const [isAutoRefresh, setIsAutoRefresh] = useState(true);
  const [selectedDrive, setSelectedDrive] = useState<any | null>(null);
  const [driveToReview, setDriveToReview] = useState<any | null>(null);
  const [videoPlaybackTime, setVideoPlaybackTime] = useState(0);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState<number>(-1);
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(true);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isChatUndocked, setIsChatUndocked] = useState(false);
  const [isDrawingMode, setIsDrawingMode] = useState(false);
  const [isPOIMode, setIsPOIMode] = useState(false);
  const [isLayerPanelOpen, setIsLayerPanelOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaveComplete, setIsSaveComplete] = useState(false);
  const [showIssues, setShowIssues] = useState(true);
  const [showPOI, setShowPOI] = useState(true);
  const [showPolygons, setShowPolygons] = useState(true);
  const [isWazePlacesExpanded, setIsWazePlacesExpanded] = useState(true);
  
  const mapActionsRef = useRef({
    handleSave: () => {},
    handleUndo: () => {},
    handleRedo: () => {},
    handleTrash: () => {},
  });

  const toggleDrivesDrawer = () => {
    setActiveDrawer(prev => prev === 'drives' ? 'none' : 'drives');
  };

  const toggleSettingsDrawer = () => {
    setActiveDrawer(prev => prev === 'settings' ? 'none' : 'settings');
  };

  const toggleSelectDrawer = () => {
    setActiveDrawer(prev => prev === 'select' ? 'none' : 'select');
  };

  const togglePlacesDrawer = () => {
    setActiveDrawer(prev => prev === 'places' ? 'none' : 'places');
  };

  const toggleSolveDrawer = () => {
    setActiveDrawer(prev => prev === 'solve' ? 'none' : 'solve');
  };

  const toggleDrawingMode = () => {
    setIsPOIMode(false);
    setIsDrawingMode(prev => !prev);
    if (!isDrawingMode) {
      setActiveDrawer('none');
    }
  };

  const togglePOIMode = () => {
    setIsDrawingMode(false);
    setIsPOIMode(prev => !prev);
    if (!isPOIMode) {
      setActiveDrawer('none');
    }
  };

  const toggleLayerPanel = () => {
    setIsLayerPanelOpen(prev => !prev);
  }

  const toggleShareModal = () => {
    setIsShareModalOpen(prev => !prev);
  }

  const toggleChat = () => {
    setIsChatOpen(prev => !prev);
  }

  const handleSave = () => {
    setIsSaving(true);
    setIsSaveComplete(false);
    
    // Trigger the actual map save logic
    mapActionsRef.current.handleSave();
    
    // Simulate server confirmation after 2.5 seconds
    setTimeout(() => {
      setIsSaveComplete(true);
      setHasUnsavedChanges(false);
    }, 2500);
  };

  const handleDriveSelect = (drive: any | null) => {
    setDriveToReview(null); // Close video player if a new drive is selected for preview
    setSelectedDrive(drive);
    setActiveSuggestionIndex(-1);
  };
  
  const clearSelectedDrive = () => {
    if (selectedDrive) {
        setSelectedDrive(null);
    }
  }

  const handleReviewDrive = (drive: any) => {
    setSelectedDrive(drive);
    setDriveToReview(drive);
    setActiveSuggestionIndex(-1);
  }

  const handleCloseVideoPlayer = () => {
      setDriveToReview(null);
      setSelectedDrive(null);
      setVideoPlaybackTime(0);
      setActiveSuggestionIndex(-1);
  }

  if (currentView === 'design-system') {
    return <DesignSystemPage onBack={() => setCurrentView('app')} />;
  }

  return (
    <div className="h-screen w-screen bg-gray-100 flex flex-col antialiased">
      <Header 
        hasUnsavedChanges={hasUnsavedChanges}
        onSave={handleSave}
        isSaving={isSaving}
        isUndoable={isUndoable}
        onUndo={() => mapActionsRef.current.handleUndo()}
        isRedoable={isRedoable}
        onRedo={() => mapActionsRef.current.handleRedo()}
        isDeletable={isDeletable}
        onTrash={() => mapActionsRef.current.handleTrash()}
        onToggleChat={toggleChat}
      />
      <div className="flex flex-grow overflow-hidden">
        <Sidebar 
          activeDrawer={activeDrawer}
          onToggleDrivesDrawer={toggleDrivesDrawer}
          onToggleSettingsDrawer={toggleSettingsDrawer}
          onToggleSelectDrawer={toggleSelectDrawer}
          onTogglePlacesDrawer={togglePlacesDrawer}
          onToggleSolveDrawer={toggleSolveDrawer}
          onToggleDrawingMode={toggleDrawingMode}
          onTogglePOIMode={togglePOIMode}
          isDrawingMode={isDrawingMode}
          isPOIMode={isPOIMode}
        />
        <SelectionDrawer 
          isOpen={activeDrawer === 'select'}
          onClose={() => setActiveDrawer('none')}
        />
        <YourDrivesDrawer 
          isOpen={activeDrawer === 'drives'}
          width={drawerWidth}
          setWidth={setDrawerWidth}
          onDriveSelect={handleDriveSelect}
          selectedDrive={selectedDrive}
          onReviewDrive={handleReviewDrive}
        />
        <SolveDrawer 
          isOpen={activeDrawer === 'solve'}
          width={solveDrawerWidth}
          setWidth={setSolveDrawerWidth}
          isAutoRefresh={isAutoRefresh}
          setIsAutoRefresh={setIsAutoRefresh}
        />
        <SettingsDrawer 
          isOpen={activeDrawer === 'settings'}
          onClose={() => setActiveDrawer('none')}
        />
        <MapContent 
          setHasUnsavedChanges={setHasUnsavedChanges}
          setIsUndoable={setIsUndoable}
          setIsRedoable={setIsRedoable}
          setIsDeletable={setIsDeletable}
          mapActionsRef={mapActionsRef}
          selectedDrive={selectedDrive}
          onClearDriveSelection={clearSelectedDrive}
          reviewedDrive={driveToReview}
          videoTime={videoPlaybackTime}
          onVideoTimeUpdate={setVideoPlaybackTime}
          onCloseVideoPlayer={handleCloseVideoPlayer}
          activeSuggestionIndex={activeSuggestionIndex}
          setActiveSuggestionIndex={setActiveSuggestionIndex}
          onOpenDesignSystem={() => setCurrentView('design-system')}
          onToggleLayerPanel={toggleLayerPanel}
          onToggleShareModal={toggleShareModal}
          isShareModalOpen={isShareModalOpen}
          onOpenChat={toggleChat}
          isChatOpen={isChatOpen}
          isChatUndocked={isChatUndocked}
          setIsChatUndocked={setIsChatUndocked}
          onTriggerSave={handleSave}
          onPolygonSelect={() => setActiveDrawer('select')}
          isDrawingMode={isDrawingMode}
          onDrawingComplete={() => setIsDrawingMode(false)}
          isPOIMode={isPOIMode}
          onPOIPlaced={() => {}}
          showIssues={showIssues}
          showPOI={showPOI}
          showPolygons={showPolygons}
          isAutoRefresh={isAutoRefresh}
        />
        <AnimatePresence>
          {isLayerPanelOpen && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 240 }}
              exit={{ width: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="flex-shrink-0 bg-white border-l border-gray-200 overflow-hidden flex flex-col"
            >
              <WzSectionHeader 
                headline="Map layer"
                hideBottomBorder={true}
                className="border-b border-hairline"
                actions={
                  <WzButton 
                    color="clear-icon" 
                    onClick={toggleLayerPanel}
                    className="!p-1 !h-auto"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </WzButton>
                }
              />
              <div className="flex-grow p-4 flex flex-col gap-4">
                <WzCheckbox 
                  checked={showIssues} 
                  onChange={(checked) => setShowIssues(checked)}
                >
                  Issues
                </WzCheckbox>
                <WzCheckbox checked={true} onChange={() => {}}>Google places</WzCheckbox>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <WzCheckbox 
                      checked={showPOI && showPolygons}
                      onChange={(checked) => {
                        setShowPOI(checked);
                        setShowPolygons(checked);
                      }}
                    >
                      Waze places
                    </WzCheckbox>
                    <WzButton 
                      color="clear-icon" 
                      onClick={() => setIsWazePlacesExpanded(!isWazePlacesExpanded)}
                      className={`transition-transform duration-200 ${isWazePlacesExpanded ? 'rotate-180' : ''}`}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </WzButton>
                  </div>
                  <AnimatePresence>
                    {isWazePlacesExpanded && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="pl-6 flex flex-col gap-2 overflow-hidden"
                      >
                        <WzCheckbox 
                          checked={showPOI} 
                          onChange={(checked) => setShowPOI(checked)}
                        >
                          POI
                        </WzCheckbox>
                        <WzCheckbox 
                          checked={showPolygons} 
                          onChange={(checked) => setShowPolygons(checked)}
                        >
                          Polygons
                        </WzCheckbox>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <WzCheckbox checked={true} onChange={() => {}}>Road</WzCheckbox>
                <WzCheckbox checked={true} onChange={() => {}}>Hazards</WzCheckbox>
                <WzCheckbox checked={true} onChange={() => {}}>Display</WzCheckbox>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <WelcomeModal 
        isOpen={isWelcomeModalOpen} 
        onClose={() => setIsWelcomeModalOpen(false)} 
      />
      <SaveProgressIndicator 
        isVisible={isSaving}
        isComplete={isSaveComplete}
        onFinish={() => {
          setIsSaving(false);
          setIsSaveComplete(false);
        }}
      />
    </div>
  );
};

export default App;
