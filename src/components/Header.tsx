import React, { useState } from 'react';
import { UserPresence, SyncTelemetry } from '../types/ast';
import { 
  FileTextIcon, 
  NetworkIcon, 
  UsersIcon, 
  SunIcon, 
  MoonIcon, 
  SplitIcon, 
  SparklesIcon,
  ShieldCheckIcon,
  RefreshCwIcon
} from './ui/Icons';

interface HeaderProps {
  title: string;
  version: number;
  collaborators: UserPresence[];
  telemetry: SyncTelemetry;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  isSplitView: boolean;
  onToggleSplitView: () => void;
  activeView: 'editor' | 'ast' | 'crdt';
  onChangeView: (view: 'editor' | 'ast' | 'crdt') => void;
  onOpenInvite: () => void;
  onOpenSecurity?: () => void;
  onOpenHistory?: () => void;
  onTriggerConflictDemo: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  version,
  collaborators,
  telemetry,
  isDarkMode,
  onToggleTheme,
  isSplitView,
  onToggleSplitView,
  activeView,
  onChangeView,
  onOpenInvite,
  onOpenSecurity,
  onOpenHistory,
  onTriggerConflictDemo
}) => {
  return (
    <header className="h-16 px-4 border-b border-slate-800/60 glass-panel flex items-center justify-between select-none z-30 sticky top-0">
      {/* Brand & Document Meta */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-pink-600 to-amber-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
            <FileTextIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-heading font-extrabold text-lg text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-300 to-amber-300 tracking-tight">
                SyncDoc
              </span>
              <span className="px-2 py-0.5 text-[10px] font-mono font-semibold rounded-full bg-purple-950 text-purple-300 border border-purple-500/30">
                AST v{version}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium truncate max-w-[280px]">
              {title}
            </p>
          </div>
        </div>

        {/* Sync Status Badge */}
        <div className="hidden md:flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-slate-300 font-medium capitalize">{telemetry.status}</span>
          <span className="text-slate-500">•</span>
          <span className="text-purple-400 font-mono text-[11px]">{telemetry.pingMs}ms</span>
        </div>
      </div>

      {/* View Switcher Tabs (Week 1 to Week 4 Controls) */}
      <div className="hidden lg:flex items-center p-1 rounded-xl bg-slate-900/90 border border-slate-800/80 text-xs font-medium text-slate-400">
        <button
          onClick={() => onChangeView('editor')}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all ${
            activeView === 'editor' && !isSplitView
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold shadow-sm'
              : 'hover:text-slate-200'
          }`}
        >
          <FileTextIcon className="w-3.5 h-3.5" />
          <span>AST Editor</span>
        </button>

        <button
          onClick={() => onChangeView('ast')}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all ${
            activeView === 'ast'
              ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold shadow-sm'
              : 'hover:text-slate-200'
          }`}
        >
          <NetworkIcon className="w-3.5 h-3.5" />
          <span>AST Node Graph</span>
        </button>

        <button
          onClick={() => onChangeView('crdt')}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all ${
            activeView === 'crdt'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold shadow-sm'
              : 'hover:text-slate-200'
          }`}
        >
          <SparklesIcon className="w-3.5 h-3.5" />
          <span>CRDT Matrix Log</span>
        </button>
      </div>

      {/* Action Buttons & Features */}
      <div className="flex items-center space-x-2">
        {/* DOMPurify Security & PDF Modal Trigger (Week 3 & 4) */}
        {onOpenSecurity && (
          <button
            onClick={onOpenSecurity}
            className="flex items-center space-x-1 px-2.5 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold hover:bg-emerald-500/20 transition-all"
            title="DOMPurify XSS Guard & PDF Compiler"
          >
            <ShieldCheckIcon className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">DOMPurify Security</span>
          </button>
        )}

        {/* Time-Travel Version History (Week 4) */}
        {onOpenHistory && (
          <button
            onClick={onOpenHistory}
            className="flex items-center space-x-1 px-2.5 py-1.5 rounded-xl bg-violet-500/10 text-violet-300 border border-violet-500/30 text-xs font-semibold hover:bg-violet-500/20 transition-all"
            title="Time Travel AST Version History"
          >
            <RefreshCwIcon className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">Version History</span>
          </button>
        )}

        {/* Multi-User Dual Simulator Toggle */}
        <button
          onClick={onToggleSplitView}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
            isSplitView
              ? 'bg-purple-600 text-white border-purple-400 shadow-lg glow-active'
              : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:bg-slate-800'
          }`}
        >
          <SplitIcon className="w-3.5 h-3.5 text-purple-300" />
          <span>Dual Simulator</span>
        </button>

        {/* Conflict Demo Trigger */}
        <button
          onClick={onTriggerConflictDemo}
          className="hidden sm:flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 text-xs font-extrabold shadow-md hover:brightness-110 transition-all"
        >
          <SparklesIcon className="w-3.5 h-3.5 text-slate-950" />
          <span>Simulate Conflict</span>
        </button>

        {/* Invite button */}
        <button
          onClick={onOpenInvite}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md transition-all"
        >
          <UsersIcon className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Invite</span>
        </button>

        {/* Theme Toggle */}
        <button
          onClick={onToggleTheme}
          className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-slate-200 transition-all"
          title="Toggle Theme"
        >
          {isDarkMode ? <SunIcon className="w-4 h-4 text-amber-400" /> : <MoonIcon className="w-4 h-4 text-purple-400" />}
        </button>
      </div>
    </header>
  );
};
