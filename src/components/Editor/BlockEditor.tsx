import React from 'react';
import { DocumentAST, UserPresence, BlockType } from '../../types/ast';
import { BlockItem } from './BlockItem';
import { PlusIcon, FileTextIcon } from '../ui/Icons';

interface BlockEditorProps {
  doc: DocumentAST;
  activeNodeId: string | null;
  onSetActiveNodeId: (nodeId: string) => void;
  collaborators: UserPresence[];
  onUpdateContent: (nodeId: string, content: string) => void;
  onUpdateTableData: (nodeId: string, tableData: string[][]) => void;
  onToggleTaskChecked: (parentTaskId: string, taskId: string) => void;
  onAddBlockAfter: (targetNodeId: string, type: BlockType) => void;
  onDeleteNode: (nodeId: string) => void;
}

export const BlockEditor: React.FC<BlockEditorProps> = ({
  doc,
  activeNodeId,
  onSetActiveNodeId,
  collaborators,
  onUpdateContent,
  onUpdateTableData,
  onToggleTaskChecked,
  onAddBlockAfter,
  onDeleteNode
}) => {
  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-4 max-w-4xl mx-auto w-full select-text">
      {/* Editor Header Title & Info */}
      <div className="pb-4 mb-4 border-b border-slate-800/80 space-y-2">
        <div className="flex items-center space-x-2 text-xs text-slate-400 font-mono">
          <FileTextIcon className="w-4 h-4 text-cyan-400" />
          <span>AST Document Root ID: {doc.rootId}</span>
          <span>•</span>
          <span>Total AST Nodes: {doc.nodes.length}</span>
        </div>
      </div>

      {/* Render Atomic AST Node Blocks */}
      <div className="space-y-3">
        {doc.nodes.map((node) => (
          <BlockItem
            key={node.id}
            node={node}
            isActive={activeNodeId === node.id}
            onFocus={() => onSetActiveNodeId(node.id)}
            collaborators={collaborators}
            onUpdateContent={onUpdateContent}
            onUpdateTableData={onUpdateTableData}
            onToggleTaskChecked={onToggleTaskChecked}
            onAddBlockAfter={onAddBlockAfter}
            onDeleteNode={onDeleteNode}
          />
        ))}
      </div>

      {/* Add New Block Button at Bottom */}
      <div className="pt-6 text-center">
        <button
          onClick={() => onAddBlockAfter(doc.nodes[doc.nodes.length - 1]?.id || 'root', 'paragraph')}
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-semibold shadow-lg transition-all hover:scale-105"
        >
          <PlusIcon className="w-4 h-4 text-cyan-400" />
          <span>Click or Press '/' to Add AST Block</span>
        </button>
      </div>
    </main>
  );
};
