import React from 'react';
import { PlusIcon, CodeIcon, SparklesIcon, TrashIcon } from '../ui/Icons';
import { BlockType } from '../../types/ast';

interface InlineToolbarProps {
  onAddBlock: (type: BlockType) => void;
  onDeleteBlock: () => void;
}

export const InlineToolbar: React.FC<InlineToolbarProps> = ({ onAddBlock, onDeleteBlock }) => {
  return (
    <div className="flex items-center space-x-1 p-1 rounded-xl glass-panel border border-slate-700/60 shadow-xl text-xs">
      <button
        onClick={() => onAddBlock('paragraph')}
        className="px-2 py-1 rounded-lg hover:bg-slate-800 text-slate-300 flex items-center space-x-1 transition-all"
        title="Add Paragraph"
      >
        <PlusIcon className="w-3.5 h-3.5 text-cyan-400" />
        <span>Text</span>
      </button>

      <button
        onClick={() => onAddBlock('heading')}
        className="px-2 py-1 rounded-lg hover:bg-slate-800 text-slate-300 font-bold transition-all"
        title="Add Heading"
      >
        H2
      </button>

      <button
        onClick={() => onAddBlock('code')}
        className="px-2 py-1 rounded-lg hover:bg-slate-800 text-cyan-400 flex items-center space-x-1 transition-all"
        title="Add Code Block"
      >
        <CodeIcon className="w-3.5 h-3.5" />
        <span>Code</span>
      </button>

      <button
        onClick={() => onAddBlock('callout')}
        className="px-2 py-1 rounded-lg hover:bg-slate-800 text-amber-400 flex items-center space-x-1 transition-all"
        title="Add Callout"
      >
        <SparklesIcon className="w-3.5 h-3.5" />
        <span>Callout</span>
      </button>

      <div className="h-4 w-px bg-slate-700 mx-1"></div>

      <button
        onClick={onDeleteBlock}
        className="p-1 rounded-lg hover:bg-rose-500/20 text-rose-400 transition-all"
        title="Delete AST Block"
      >
        <TrashIcon className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
