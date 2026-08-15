import React from 'react';
import { ASTNode } from '../../../types/ast';

interface HeadingBlockProps {
  node: ASTNode;
  isLocked: boolean;
  onUpdate: (content: string) => void;
}

export const HeadingBlock: React.FC<HeadingBlockProps> = ({ node, isLocked, onUpdate }) => {
  const level = node.level || 1;

  const fontClasses = {
    1: 'text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-cyan-300 tracking-tight mb-2',
    2: 'text-xl md:text-2xl font-bold text-slate-100 tracking-tight mt-4 mb-2 border-b border-slate-800/60 pb-2',
    3: 'text-lg font-semibold text-cyan-300 tracking-tight mt-3 mb-1'
  }[level];

  return (
    <div className="group relative">
      <input
        type="text"
        disabled={isLocked}
        value={node.content}
        onChange={(e) => onUpdate(e.target.value)}
        className={`w-full bg-transparent focus:outline-none ${fontClasses} ${
          isLocked ? 'cursor-not-allowed opacity-80' : ''
        }`}
        placeholder={`Heading ${level}...`}
      />
    </div>
  );
};
