import React from 'react';
import { ASTNode } from '../../../types/ast';
import { CpuIcon } from '../../ui/Icons';

interface MathDiagramBlockProps {
  node: ASTNode;
  isLocked: boolean;
  onUpdate: (content: string) => void;
}

export const MathDiagramBlock: React.FC<MathDiagramBlockProps> = ({ node, isLocked, onUpdate }) => {
  return (
    <div className="my-4 p-4 rounded-2xl bg-gradient-to-r from-violet-950/40 via-slate-950 to-blue-950/40 border border-violet-500/30 shadow-xl space-y-2">
      <div className="flex items-center justify-between text-xs text-violet-300 font-semibold">
        <div className="flex items-center space-x-1.5">
          <CpuIcon className="w-4 h-4 text-violet-400" />
          <span>LaTeX & AST Convergence Formula</span>
        </div>
        <span className="font-mono text-[10px] text-violet-400 bg-violet-950 px-2 py-0.5 rounded border border-violet-800">
          LaTeX AST Node
        </span>
      </div>

      <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800 font-mono text-cyan-300 text-center text-sm md:text-base tracking-wide shadow-inner overflow-x-auto">
        {node.formula || node.content}
      </div>

      <input
        type="text"
        disabled={isLocked}
        value={node.content}
        onChange={(e) => onUpdate(e.target.value)}
        className="w-full bg-transparent text-xs text-slate-400 focus:outline-none text-center italic"
        placeholder="Formula description..."
      />
    </div>
  );
};
