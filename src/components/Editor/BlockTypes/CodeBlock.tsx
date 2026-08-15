import React, { useState } from 'react';
import { ASTNode } from '../../../types/ast';
import { CodeIcon, PlayIcon, CheckIcon } from '../../ui/Icons';

interface CodeBlockProps {
  node: ASTNode;
  isLocked: boolean;
  onUpdate: (content: string) => void;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ node, isLocked, onUpdate }) => {
  const [output, setOutput] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleRunCode = () => {
    setIsRunning(true);
    setOutput(null);
    setTimeout(() => {
      setIsRunning(false);
      setOutput('🚀 AST SyncEngine: Transaction committed. Yjs CRDT Vector v1048 applied successfully.');
    }, 600);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(node.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl overflow-hidden bg-slate-950 border border-slate-800/80 my-3 font-mono text-xs shadow-xl">
      {/* Code Header Bar */}
      <div className="px-4 py-2 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <CodeIcon className="w-4 h-4 text-cyan-400" />
          <span className="text-slate-300 font-semibold uppercase text-[11px] tracking-wide">
            {node.language || 'typescript'}
          </span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-400 text-[10px]">AST Block #{node.id}</span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleRunCode}
            disabled={isRunning}
            className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 text-[11px] font-semibold transition-all"
          >
            <PlayIcon className={`w-3 h-3 ${isRunning ? 'animate-spin' : ''}`} />
            <span>{isRunning ? 'Running...' : 'Run AST'}</span>
          </button>

          <button
            onClick={handleCopy}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] transition-all"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      {/* Code Editor Body */}
      <textarea
        disabled={isLocked}
        value={node.content}
        onChange={(e) => onUpdate(e.target.value)}
        rows={Math.max(5, node.content.split('\n').length)}
        className="w-full p-4 bg-slate-950 text-cyan-200 focus:outline-none resize-none leading-relaxed"
      />

      {/* Execution Output Simulation */}
      {output && (
        <div className="p-3 bg-slate-900 border-t border-slate-800 text-emerald-400 text-[11px] flex items-center space-x-2 animate-fadeIn">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>{output}</span>
        </div>
      )}
    </div>
  );
};
