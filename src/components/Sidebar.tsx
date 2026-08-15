import React from 'react';
import { SyncTelemetry } from '../types/ast';
import { 
  FileTextIcon, 
  NetworkIcon, 
  CpuIcon, 
  ShieldCheckIcon, 
  GitBranchIcon, 
  PlusIcon,
  PlayIcon,
  SparklesIcon
} from './ui/Icons';

interface SidebarProps {
  telemetry: SyncTelemetry;
  collaborators: UserPresence[];
  onSimulateTyping: () => void;
  onSimulateConflict: () => void;
  activeView: 'editor' | 'ast' | 'crdt';
  onChangeView: (view: 'editor' | 'ast' | 'crdt') => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  telemetry,
  collaborators,
  onSimulateTyping,
  onSimulateConflict,
  activeView,
  onChangeView
}) => {
  return (
    <aside className="w-64 border-r border-slate-800/60 glass-panel flex flex-col justify-between hidden md:flex h-[calc(100vh-4rem)] select-none">
      {/* Upper Navigation & Document List (Week 1 Requirement) */}
      <div className="p-4 space-y-6 overflow-y-auto">
        {/* Workspace Title & Create Doc */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Workspace Docs
            </span>
            <button className="p-1 rounded-lg bg-slate-800/60 hover:bg-slate-700 text-slate-300 transition-colors">
              <PlusIcon className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-1">
            <button
              onClick={() => onChangeView('editor')}
              className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-medium text-left transition-all ${
                activeView === 'editor'
                  ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30 font-semibold shadow-md'
                  : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              <FileTextIcon className="w-4 h-4 text-cyan-400 shrink-0" />
              <span className="truncate">SyncDoc Architecture Spec</span>
            </button>

            <button
              className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:bg-slate-800/40 hover:text-slate-200 text-left transition-all"
            >
              <GitBranchIcon className="w-4 h-4 text-violet-400 shrink-0" />
              <span className="truncate">CRDT Matrix Benchmarks</span>
            </button>

            <button
              className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:bg-slate-800/40 hover:text-slate-200 text-left transition-all"
            >
              <ShieldCheckIcon className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="truncate">AST Security & DOMPurify</span>
            </button>
          </div>
        </div>

        {/* View Selection Section */}
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-3">
            AST Tools & Matrix
          </span>
          <div className="space-y-1">
            <button
              onClick={() => onChangeView('editor')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-left transition-all ${
                activeView === 'editor' ? 'bg-slate-800 text-white font-semibold' : 'text-slate-400 hover:bg-slate-800/50'
              }`}
            >
              <div className="flex items-center space-x-2">
                <FileTextIcon className="w-4 h-4 text-cyan-400" />
                <span>Document Editor</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                10 Nodes
              </span>
            </button>

            <button
              onClick={() => onChangeView('ast')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-left transition-all ${
                activeView === 'ast' ? 'bg-slate-800 text-white font-semibold' : 'text-slate-400 hover:bg-slate-800/50'
              }`}
            >
              <div className="flex items-center space-x-2">
                <NetworkIcon className="w-4 h-4 text-violet-400" />
                <span>AST Node Tree</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-violet-950 text-violet-400 border border-violet-800">
                Live Graph
              </span>
            </button>

            <button
              onClick={() => onChangeView('crdt')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-left transition-all ${
                activeView === 'crdt' ? 'bg-slate-800 text-white font-semibold' : 'text-slate-400 hover:bg-slate-800/50'
              }`}
            >
              <div className="flex items-center space-x-2">
                <CpuIcon className="w-4 h-4 text-emerald-400" />
                <span>CRDT Network Matrix</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                Yjs Protocol
              </span>
            </button>
          </div>
        </div>

        {/* Live Presentation Demo Triggers (For Evaluator/Trainer Review) */}
        <div className="pt-2 border-t border-slate-800/60">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-400 block mb-2.5 flex items-center space-x-1">
            <SparklesIcon className="w-3.5 h-3.5" />
            <span>Trainer Demo Triggers</span>
          </span>

          <div className="space-y-2">
            <button
              onClick={onSimulateTyping}
              className="w-full flex items-center space-x-2 px-3 py-2 rounded-xl bg-gradient-to-r from-blue-900/40 to-cyan-900/40 border border-cyan-500/30 text-cyan-300 text-xs font-medium hover:brightness-125 transition-all text-left"
            >
              <PlayIcon className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>Simulate Remote Typing</span>
            </button>

            <button
              onClick={onSimulateConflict}
              className="w-full flex items-center space-x-2 px-3 py-2 rounded-xl bg-gradient-to-r from-amber-900/40 to-orange-900/40 border border-amber-500/30 text-amber-300 text-xs font-medium hover:brightness-125 transition-all text-left"
            >
              <SparklesIcon className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Simulate CRDT Conflict</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Telemetry Card (Week 2 Matrix Dashboard) */}
      <div className="p-4 border-t border-slate-800/60 bg-slate-950/60">
        <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800/80 space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">Matrix Clock:</span>
            <span className="font-mono text-cyan-400 font-bold">v{telemetry.vectorClock}</span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">Ops / sec:</span>
            <span className="font-mono text-emerald-400 font-bold">{telemetry.opsPerSec} ops</span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">Collaborators:</span>
            <span className="font-mono text-violet-400 font-bold">{telemetry.activeCollaborators} active</span>
          </div>

          <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500">
            <span>Sync Engine: Yjs WebSocket</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>
        </div>
      </div>
    </aside>
  );
};
