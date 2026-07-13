import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MapContent from './components/MapContent';
import YourDrivesDrawer from './components/YourDrivesDrawer';
import SettingsDrawer from './components/SettingsDrawer';
import SelectionDrawer from './components/SelectionDrawer';
import SolveDrawer from './components/SolveDrawer';
import DesignSystemPage from './components/design-system/DesignSystemPage';
import WelcomeModal from './components/WelcomeModal';
import SaveProgressIndicator from './components/SaveProgressIndicator';

export type ActiveDrawer = 'select' | 'solve' | 'events' | 'places' | 'drives' | 'areas' | 'scripts' | 'settings' | 'none';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'app' | 'design-system'>('app');
  const [activeDrawer, setActiveDrawer] = useState<ActiveDrawer>('none');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isUndoable, setIsUndoable] = useState(false);
  const [isRedoable, setIsRedoable] = useState(false);
  const [isDeletable, setIsDeletable] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaveComplete, setIsSaveComplete] = useState(false);

  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const [isDrawingMode, setIsDrawingMode] = useState(false);
  const [isPOIMode, setIsPOIMode] = useState(false);

  const [showIssues, setShowIssues] = useState(true);
  const [showPOI, setShowPOI] = useState(true);
  const [showPolygons, setShowPolygons] = useState(true);

  const handleToggleDrawer = (drawer: ActiveDrawer) => {
    setActiveDrawer(prev => prev === drawer ? 'none' : drawer);
  };

  const handleSave = () => {
    if (!hasUnsavedChanges || isSaving) return;
    setIsSaving(true);
    setIsSaveComplete(false);
    setTimeout(() => {
      setIsSaving(false);
      setIsSaveComplete(true);
      setHasUnsavedChanges(false);
    }, 1500);
  };

  if (currentView === 'design-system') {
    return <DesignSystemPage onBack={() => setCurrentView('app')} />;
  }

  return (
    <div className="h-screen w-screen bg-surface-default flex flex-col font-sans text-content-default antialiased overflow-hidden select-none">
      {/* Header bar from Figma node 7828:79830 */}
      <Header 
        hasUnsavedChanges={hasUnsavedChanges}
        onSave={handleSave}
        isSaving={isSaving}
        isUndoable={isUndoable}
        onUndo={() => {}}
        isRedoable={isRedoable}
        onRedo={() => {}}
        isDeletable={isDeletable}
        onTrash={() => {}}
        onToggleChat={() => setIsChatOpen(!isChatOpen)}
      />

      <div className="flex flex-grow overflow-hidden relative">
        {/* Sidebar navigation from Figma node 7828:79830 */}
        <Sidebar 
          activeDrawer={activeDrawer}
          onToggleDrawer={handleToggleDrawer}
          isDrawingMode={isDrawingMode}
          isPOIMode={isPOIMode}
          onToggleDrawingMode={() => {
            setIsPOIMode(false);
            setIsDrawingMode(prev => !prev);
          }}
          onTogglePOIMode={() => {
            setIsDrawingMode(false);
            setIsPOIMode(prev => !prev);
          }}
        />

        {/* Side Drawers */}
        <SelectionDrawer 
          isOpen={activeDrawer === 'select'}
          onClose={() => setActiveDrawer('none')}
        />

        <SolveDrawer 
          isOpen={activeDrawer === 'solve'}
          onClose={() => setActiveDrawer('none')}
        />

        <YourDrivesDrawer 
          isOpen={activeDrawer === 'drives'}
          onClose={() => setActiveDrawer('none')}
        />

        <SettingsDrawer 
          isOpen={activeDrawer === 'settings'}
          onClose={() => setActiveDrawer('none')}
        />

        {/* Interactive Map View */}
        <MapContent 
          showIssues={showIssues}
          showPOI={showPOI}
          showPolygons={showPolygons}
          isDrawingMode={isDrawingMode}
          onDrawingComplete={() => setIsDrawingMode(false)}
          isPOIMode={isPOIMode}
          onPOIPlaced={() => setIsPOIMode(false)}
          onOpenDesignSystem={() => setCurrentView('design-system')}
          isShareModalOpen={isShareModalOpen}
          onToggleShareModal={() => setIsShareModalOpen(!isShareModalOpen)}
          isChatOpen={isChatOpen}
          onOpenChat={() => setIsChatOpen(!isChatOpen)}
          onPolygonSelect={() => handleToggleDrawer('select')}
          setHasUnsavedChanges={setHasUnsavedChanges}
        />
      </div>

      <WelcomeModal 
        isOpen={isWelcomeModalOpen}
        onClose={() => setIsWelcomeModalOpen(false)}
      />

      <SaveProgressIndicator 
        isVisible={isSaving}
        isComplete={isSaveComplete}
        onFinish={() => setIsSaveComplete(false)}
      />
    </div>
  );
};

export default App;
