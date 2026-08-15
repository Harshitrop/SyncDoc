import React from 'react';
import { UserPresence, SyncTelemetry } from '../types/ast';
import { 
  FileTextIcon, 
  NetworkIcon, 
  UsersIcon, 
  SunIcon, 
  MoonIcon, 
  SplitIcon, 
  SparklesIcon
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
  onTriggerConflictDemo
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyLink = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <header className="h-16 px-4 border-b border-slate-800/60 glass-panel flex items-center justify-between select-none z-30 sticky top-0">
      {/* Brand & Document Meta */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-violet-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 animate-pulse-glow">
            <FileTextIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-heading font-extrabold text-lg text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-300 to-purple-400 tracking-tight">
                SyncDoc
              </span>
              <span className="px-2 py-0.5 text-[10px] font-mono font-semibold rounded-full bg-cyan-950 text-cyan-400 border border-cyan-500/30">
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
          <span className="text-cyan-400 font-mono text-[11px]">{telemetry.pingMs}ms</span>
        </div>
      </div>

      {/* View Switcher Tabs (Week 1 & 2 Center Control) */}
      <div className="hidden lg:flex items-center p-1 rounded-xl bg-slate-900/90 border border-slate-800/80 text-xs font-medium text-slate-400">
        <button
          onClick={() => onChangeView('editor')}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all ${
            activeView === 'editor' && !isSplitView
              ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30 font-semibold shadow-sm'
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
              ? 'bg-gradient-to-r from-violet-500/20 to-purple-500/20 text-violet-300 border border-violet-500/30 font-semibold shadow-sm'
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
              ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 border border-emerald-500/30 font-semibold shadow-sm'
              : 'hover:text-slate-200'
          }`}
        >
          <SparklesIcon className="w-3.5 h-3.5" />
          <span>CRDT Matrix Log</span>
        </button>
      </div>

      {/* Collaborators & Action Buttons */}
      <div className="flex items-center space-x-3">
        {/* Active Collaborator Avatars */}
        <div className="flex items-center -space-x-2 overflow-hidden">
          {collaborators.map((user) => (
            <div
              key={user.id}
              className="relative group cursor-pointer"
              title={`${user.name} (${user.role}) - ${user.isOnline ? 'Online' : 'Offline'}`}
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full border-2 object-cover transition-transform group-hover:scale-110 group-hover:z-10"
                style={{ borderColor: user.color }}
              />
              {user.isTyping && (
                <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500 border border-slate-900"></span>
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Multi-User Dual Simulator Split View Toggle */}
        <button
          onClick={onToggleSplitView}
          className={`hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
            isSplitView
              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-lg shadow-cyan-500/10 ring-2 ring-cyan-500/20'
              : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700 hover:bg-slate-800'
          }`}
        >
          <SplitIcon className="w-3.5 h-3.5 text-cyan-400" />
          <span>Dual Simulator</span>
        </button>

        {/* Demo Conflict Trigger */}
        <button
          onClick={onTriggerConflictDemo}
          className="hidden xl:flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-semibold hover:bg-amber-500/20 transition-all"
        >
          <SparklesIcon className="w-3.5 h-3.5 text-amber-400 animate-spin" />
          <span>Simulate Conflict</span>
        </button>

        {/* Invite button */}
        <button
          onClick={onOpenInvite}
          className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium text-xs shadow-md shadow-cyan-500/20 hover:brightness-110 active:scale-95 transition-all"
        >
          <UsersIcon className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Invite</span>
        </button>

        {/* Theme Toggle */}
        <button
          onClick={onToggleTheme}
          className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-slate-200 transition-all"
          title="Toggle Dark / Light Theme"
        >
          {isDarkMode ? <SunIcon className="w-4 h-4 text-amber-400" /> : <MoonIcon className="w-4 h-4 text-cyan-400" />}
        </button>
      </div>
    </header>
  );
};
