import React, { useState } from 'react';
import { DocumentAST, ASTNode, BlockType } from '../../types/ast';
import { NetworkIcon, SparklesIcon, CodeIcon, FileTextIcon, ShieldCheckIcon, CpuIcon, CheckIcon } from '../ui/Icons';

interface ASTGraphProps {
  doc: DocumentAST;
  activeNodeId: string | null;
  onSelectNode: (nodeId: string) => void;
}

export const ASTGraph: React.FC<ASTGraphProps> = ({ doc, activeNodeId, onSelectNode }) => {
  const [filterType, setFilterType] = useState<string>('all');
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  const filteredNodes = doc.nodes.filter(node => {
    if (filterType === 'all') return true;
    return node.type === filterType;
  });

  const getBlockIcon = (type: BlockType) => {
    switch (type) {
      case 'heading': return <FileTextIcon className="w-3.5 h-3.5 text-cyan-400" />;
      case 'code': return <CodeIcon className="w-3.5 h-3.5 text-violet-400" />;
      case 'callout': return <SparklesIcon className="w-3.5 h-3.5 text-amber-400" />;
      case 'table': return <CpuIcon className="w-3.5 h-3.5 text-emerald-400" />;
      case 'task': return <CheckIcon className="w-3.5 h-3.5 text-blue-400" />;
      case 'math': return <ShieldCheckIcon className="w-3.5 h-3.5 text-pink-400" />;
      default: return <FileTextIcon className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  return (
    <div className="w-full h-full flex flex-col glass-panel rounded-2xl border border-slate-800/80 shadow-2xl overflow-hidden select-none">
      {/* Header Bar */}
      <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shrink-0">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-violet-500/10 text-violet-400 border border-violet-500/20">
            <NetworkIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-base text-white flex items-center space-x-2">
              <span>Interactive AST Tree Visualizer</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-violet-950 text-violet-300 border border-violet-800">
                2D Graph
              </span>
            </h3>
            <p className="text-xs text-slate-400">Abstract Syntax Tree node hierarchy & operational state</p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 text-xs">
          {['all', 'heading', 'paragraph', 'code', 'callout', 'table', 'task', 'math'].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold capitalize transition-all shrink-0 ${
                filterType === t
                  ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-md'
                  : 'bg-slate-950/80 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Main Graph Content Area - Scrollable Container */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-slate-950/90 space-y-6 relative">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:20px_20px] opacity-30 pointer-events-none"></div>

        {/* Level 0: Root Document Node */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-600 via-blue-600 to-violet-600 text-white font-bold text-xs md:text-sm shadow-xl shadow-cyan-500/20 border border-cyan-400/40 flex items-center space-x-2.5 animate-pulse-glow">
            <SparklesIcon className="w-4 h-4 text-cyan-200" />
            <span>RootDocument Node (#{doc.rootId})</span>
            <span className="text-[10px] font-mono bg-black/30 px-2 py-0.5 rounded-full">v{doc.version}</span>
          </div>

          {/* Vertical Connecting Line */}
          <div className="w-0.5 h-8 bg-gradient-to-b from-cyan-500 via-violet-500 to-slate-700 my-1"></div>
        </div>

        {/* Level 1: Category Branches */}
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
          <div className="p-2.5 rounded-xl bg-slate-900/80 border border-cyan-500/30 text-center">
            <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">Structural Node</span>
            <span className="text-xs font-semibold text-slate-200">Headings & Text</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900/80 border border-violet-500/30 text-center">
            <span className="text-[10px] font-bold text-violet-400 uppercase tracking-wider block">Logic & Execution</span>
            <span className="text-xs font-semibold text-slate-200">Code & Algorithms</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900/80 border border-amber-500/30 text-center">
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">Alerts & Callouts</span>
            <span className="text-xs font-semibold text-slate-200">System Warnings</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900/80 border border-emerald-500/30 text-center">
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">Data Matrix</span>
            <span className="text-xs font-semibold text-slate-200">Tables & Formulas</span>
          </div>
        </div>

        {/* Level 2: Child AST Block Nodes */}
        <div className="relative z-10 pt-4 border-t border-slate-800/80">
          <div className="flex items-center justify-between mb-3 text-xs text-slate-400 font-mono">
            <span>Showing {filteredNodes.length} of {doc.nodes.length} AST Nodes</span>
            <span>Click any node to inspect in Editor</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredNodes.map((node) => {
              const isSelected = activeNodeId === node.id;
              const isHovered = hoveredNodeId === node.id;

              return (
                <div
                  key={node.id}
                  onClick={() => onSelectNode(node.id)}
                  onMouseEnter={() => setHoveredNodeId(node.id)}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  className={`p-3.5 rounded-xl border transition-all duration-200 cursor-pointer text-left space-y-2 relative overflow-hidden ${
                    isSelected
                      ? 'bg-slate-900 border-cyan-400 text-cyan-200 glow-border-cyan ring-2 ring-cyan-500/30 scale-[1.02] shadow-xl'
                      : isHovered
                      ? 'bg-slate-900/90 border-violet-400 text-slate-100 scale-[1.01]'
                      : 'bg-slate-900/60 border-slate-800/80 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  {/* Top Bar */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1.5">
                      {getBlockIcon(node.type)}
                      <span className="text-[11px] font-mono font-bold uppercase px-1.5 py-0.5 rounded bg-slate-950 text-cyan-300 border border-slate-800">
                        {node.type}
                      </span>
                    </div>

                    <div className="flex items-center space-x-1 font-mono text-[10px] text-slate-400">
                      <span>v{node.version}</span>
                    </div>
                  </div>

                  {/* Node ID & Content Preview */}
                  <div>
                    <div className="text-[10px] font-mono text-cyan-400 font-bold">#{node.id}</div>
                    <p className="text-xs font-medium text-slate-200 line-clamp-2 leading-relaxed mt-0.5">
                      {node.content || node.formula || 'Block node payload'}
                    </p>
                  </div>

                  {/* Footer Meta */}
                  <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span>By: {node.lastModifiedBy || 'System'}</span>
                    <span className="text-emerald-400 font-semibold">AST Valid</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
