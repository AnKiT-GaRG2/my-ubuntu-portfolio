import React from 'react';
import { Sparkles, Trash2, RefreshCw } from 'lucide-react';

interface ChatHeaderProps {
  accentRgb: string;
  lighterRgb: string;
  darkerRgb: string;
  onClearChat: () => void;
  onRefresh: () => void;
}

export function ChatHeader({ 
  accentRgb, 
  lighterRgb, 
  darkerRgb, 
  onClearChat, 
  onRefresh 
}: ChatHeaderProps) {
  return (
    <div 
      className="p-4 flex items-center justify-between flex-shrink-0 shadow-lg"
      style={{
        background: `linear-gradient(to right, rgb(${accentRgb}), rgb(${lighterRgb}), rgb(${darkerRgb}))`
      }}
    >
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center animate-pulse shadow-xl border-2 border-white/30">
          <Sparkles className="text-white" size={24} />
        </div>
        <div>
          <h3 className="text-white font-bold text-lg flex items-center gap-2">
            AnkiTalk
            <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">AI</span>
          </h3>
          <p className="text-white/90 text-xs flex items-center gap-1">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Powered by Ankit's Ubuntu
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onClearChat}
          className="p-2 hover:bg-white/20 rounded-lg transition-all duration-300 group"
          title="Clear chat"
        >
          <Trash2 className="text-white w-5 h-5 group-hover:scale-110 transition-transform" />
        </button>
        <button
          onClick={onRefresh}
          className="p-2 hover:bg-white/20 rounded-lg transition-all duration-300 group"
          title="Refresh"
        >
          <RefreshCw className="text-white w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
        </button>
      </div>
    </div>
  );
}
