import React from 'react';
import { ASTNode } from '../../../types/ast';

interface ParagraphBlockProps {
  node: ASTNode;
  isLocked: boolean;
  onUpdate: (content: string) => void;
}

export const ParagraphBlock: React.FC<ParagraphBlockProps> = ({ node, isLocked, onUpdate }) => {
  return (
    <div className="relative py-1">
      <textarea
        disabled={isLocked}
        value={node.content}
        onChange={(e) => onUpdate(e.target.value)}
        rows={Math.max(2, Math.ceil(node.content.length / 85))}
        className={`w-full bg-transparent text-slate-200 leading-relaxed text-sm md:text-base focus:outline-none resize-none ${
          isLocked ? 'cursor-not-allowed opacity-80' : ''
        }`}
        placeholder="Type paragraph content..."
      />
    </div>
  );
};
