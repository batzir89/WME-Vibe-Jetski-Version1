import React, { useState } from 'react';
import { WzButton } from './design-system/WzComponents';

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
  isUndocked?: boolean;
  setIsUndocked?: (val: boolean) => void;
}

const ChatPanel: React.FC<ChatPanelProps> = ({
  isOpen,
  onClose,
  isUndocked = false,
  setIsUndocked
}) => {
  const [messages, setMessages] = useState<Array<{ id: number; user: string; text: string; time: string }>>([
    { id: 1, user: 'MapEditor_UK', text: 'Soho road layout update checked.', time: '2:14 PM' },
    { id: 2, user: 'LondonWazer', text: 'Turn restriction on Dean St confirmed.', time: '2:18 PM' }
  ]);
  const [inputText, setInputText] = useState('');

  if (!isOpen) return null;

  const handleSend = () => {
    if (!inputText.trim()) return;
    setMessages(prev => [
      ...prev,
      { id: Date.now(), user: 'You', text: inputText, time: 'Just now' }
    ]);
    setInputText('');
  };

  return (
    <div className={`fixed z-40 bg-white shadow-elevation-3 border border-hairline flex flex-col ${
      isUndocked ? 'top-20 right-20 w-80 h-96 rounded-2xl' : 'bottom-12 right-16 w-80 h-96 rounded-2xl'
    }`}>
      <div className="p-3 border-b border-hairline flex items-center justify-between bg-surface-alt rounded-t-2xl">
        <h4 className="font-waze-boing font-bold text-xs text-content-default">WME Community Chat</h4>
        <div className="flex items-center gap-1">
          {setIsUndocked && (
            <WzButton variant="clear" onClick={() => setIsUndocked(!isUndocked)} className="!p-1 !h-auto">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18"/></svg>
            </WzButton>
          )}
          <WzButton variant="clear" onClick={onClose} className="!p-1 !h-auto">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </WzButton>
        </div>
      </div>

      <div className="flex-grow p-3 space-y-2 overflow-y-auto bg-white text-xs">
        {messages.map((m) => (
          <div key={m.id} className="p-2 rounded-lg bg-surface-alt space-y-0.5">
            <div className="flex items-center justify-between text-[10px] text-hint-text font-bold">
              <span>{m.user}</span>
              <span>{m.time}</span>
            </div>
            <p className="text-content-p1">{m.text}</p>
          </div>
        ))}
      </div>

      <div className="p-2 border-t border-hairline flex items-center gap-1.5 bg-white rounded-b-2xl">
        <input 
          type="text" 
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type a message..."
          className="flex-grow text-xs px-2.5 py-1.5 rounded-lg border border-hairline focus:outline-none focus:border-primary"
        />
        <WzButton onClick={handleSend} className="!py-1.5 !px-2.5">Send</WzButton>
      </div>
    </div>
  );
};

export default ChatPanel;
