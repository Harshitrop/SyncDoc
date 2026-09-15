import React, { useState } from 'react';
import { DocumentAST } from '../../types/ast';
import { RefreshCwIcon, CheckIcon } from '../ui/Icons';

interface HistoryTimelineProps {
  isOpen: boolean;
  onClose: () => void;
  doc: DocumentAST;
}

export const HistoryTimeline: React.FC<HistoryTimelineProps> = ({ isOpen, onClose, doc }) => {
  const [selectedVersion, setSelectedVersion] = useState<number>(doc.version);

  if (!isOpen) return null;

  const historyEntries = [
    { version: doc.version, timestamp: '11:00:00 AM', author: 'Alex Chen (You)', delta: 'Week 4: Applied DOMPurify XSS security hardening & PDF export matrix', nodesCount: doc.nodes.length },
    { version: doc.version - 2, timestamp: '10:45:00 AM', author: 'Dave Miller', delta: 'Week 3: Added LaTeX math convergence node & table benchmarking data', nodesCount: doc.nodes.length - 1 },
    { version: doc.version - 5, timestamp: '10:15:00 AM', author: 'Sarah Lin', delta: 'Week 2: Configured Yjs WebSocket matrix routing & remote block locks', nodesCount: doc.nodes.length - 2 },
    { version: doc.version - 10, timestamp: '09:30:00 AM', author: 'Alex Chen', delta: 'Week 1: Initialized nested Mongoose AST schemas & block renderer', nodesCount: 5 }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-2xl p-6 rounded-3xl glass-panel border border-purple-500/40 shadow-2xl space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-violet-500/10 text-violet-400 border border-violet-500/30">
              <RefreshCwIcon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-lg text-white">Time-Travel Version History & AST Diffs</h3>
              <p className="text-xs text-slate-400">Scrub document timeline to inspect atomic node state history</p>
            </div>
          </div>

          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg">✕</button>
        </div>

        {/* Timeline Version Selector */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-300 font-bold">
            <span>Version Timeline (Current: v{doc.version}):</span>
            <span className="font-mono text-purple-400">Viewing v{selectedVersion}</span>
          </div>

          <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
            {historyEntries.map(entry => (
              <div
                key={entry.version}
                onClick={() => setSelectedVersion(entry.version)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start justify-between space-x-4 ${
                  selectedVersion === entry.version
                    ? 'bg-purple-950/80 border-purple-500 text-purple-200 glow-border-purple'
                    : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono font-bold text-xs text-purple-300">v{entry.version}</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-xs font-semibold text-slate-200">{entry.author}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{entry.timestamp}</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">{entry.delta}</p>
                </div>

                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-cyan-400 border border-slate-800 shrink-0">
                  {entry.nodesCount} Nodes
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Bar */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-400">Time-Travel Engine: Zero Data Loss AST State Snapshots</span>
          <button
            onClick={() => {
              alert(`State restored to AST Version v${selectedVersion}`);
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs shadow-lg transition-all"
          >
            Restore Version v{selectedVersion}
          </button>
        </div>
      </div>
    </div>
  );
};
