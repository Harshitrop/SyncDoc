import React, { useState } from 'react';
import { ASTNode, UserPresence, BlockType } from '../../types/ast';
import { HeadingBlock } from './BlockTypes/HeadingBlock';
import { ParagraphBlock } from './BlockTypes/ParagraphBlock';
import { CodeBlock } from './BlockTypes/CodeBlock';
import { CalloutBlock } from './BlockTypes/CalloutBlock';
import { TableBlock } from './BlockTypes/TableBlock';
import { TaskBlock } from './BlockTypes/TaskBlock';
import { MathDiagramBlock } from './BlockTypes/MathDiagramBlock';
import { InlineToolbar } from './InlineToolbar';
import { LockIcon, PlusIcon } from '../ui/Icons';

interface BlockItemProps {
  node: ASTNode;
  isActive: boolean;
  onFocus: () => void;
  collaborators: UserPresence[];
  onUpdateContent: (nodeId: string, content: string) => void;
  onUpdateTableData: (nodeId: string, tableData: string[][]) => void;
  onToggleTaskChecked: (parentTaskId: string, taskId: string) => void;
  onAddBlockAfter: (targetNodeId: string, type: BlockType) => void;
  onDeleteNode: (nodeId: string) => void;
}

export const BlockItem: React.FC<BlockItemProps> = ({
  node,
  isActive,
  onFocus,
  collaborators,
  onUpdateContent,
  onUpdateTableData,
  onToggleTaskChecked,
  onAddBlockAfter,
  onDeleteNode
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showToolbar, setShowToolbar] = useState(false);

  // Check if any remote user is locking or active on this block
  const lockingUser = collaborators.find(c => c.activeBlockId === node.id && c.id !== 'usr-lead-frontend');
  const isLocked = !!lockingUser;

  const renderBlockContent = () => {
    switch (node.type) {
      case 'heading':
        return (
          <HeadingBlock
            node={node}
            isLocked={isLocked}
            onUpdate={(c) => onUpdateContent(node.id, c)}
          />
        );
      case 'code':
        return (
          <CodeBlock
            node={node}
            isLocked={isLocked}
            onUpdate={(c) => onUpdateContent(node.id, c)}
          />
        );
      case 'callout':
        return (
          <CalloutBlock
            node={node}
            isLocked={isLocked}
            onUpdate={(c) => onUpdateContent(node.id, c)}
          />
        );
      case 'table':
        return (
          <TableBlock
            node={node}
            isLocked={isLocked}
            onUpdateTableData={(data) => onUpdateTableData(node.id, data)}
          />
        );
      case 'task':
        return (
          <TaskBlock
            node={node}
            isLocked={isLocked}
            onToggleTaskChecked={onToggleTaskChecked}
          />
        );
      case 'math':
        return (
          <MathDiagramBlock
            node={node}
            isLocked={isLocked}
            onUpdate={(c) => onUpdateContent(node.id, c)}
          />
        );
      case 'paragraph':
      default:
        return (
          <ParagraphBlock
            node={node}
            isLocked={isLocked}
            onUpdate={(c) => onUpdateContent(node.id, c)}
          />
        );
    }
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowToolbar(false);
      }}
      onClick={onFocus}
      className={`group relative p-4 md:p-5 rounded-3xl transition-all duration-200 shadow-xl ${
        isLocked
          ? 'bg-slate-900/90 border-2 glow-border-amber ring-2 ring-amber-500/20'
          : isActive
          ? 'bg-slate-900/80 border border-purple-500/60 glow-border-purple ring-2 ring-purple-500/20'
          : isHovered
          ? 'bg-slate-900/60 border border-slate-800'
          : 'bg-slate-900/40 border border-slate-800/80'
      }`}
    >
      {/* Remote Presence & Lock Indicator */}
      {lockingUser && (
        <div
          className="absolute -top-3 right-5 px-3 py-1 rounded-full text-[11px] font-extrabold text-slate-950 flex items-center space-x-1.5 shadow-xl z-20 animate-bounce"
          style={{ backgroundColor: lockingUser.color }}
        >
          <LockIcon className="w-3.5 h-3.5 text-slate-950" />
          <span>{lockingUser.name} is editing...</span>
        </div>
      )}

      {/* Block Header Meta Badge */}
      <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-2">
        <span className="uppercase text-purple-400 font-extrabold tracking-wider bg-purple-950/80 px-2 py-0.5 rounded border border-purple-800">
          {node.type}
        </span>
        <span className="text-slate-400">
          v{node.version} • by {node.lastModifiedBy || 'Jyoti'}
        </span>
      </div>

      {/* Left Add Block Context Trigger */}
      {isHovered && !lockingUser && (
        <div className="absolute -left-9 top-4 flex items-center space-x-1 z-20">
          <button
            onClick={() => setShowToolbar(!showToolbar)}
            className="p-1.5 rounded-xl bg-purple-600 text-white hover:bg-purple-500 transition-all shadow-lg"
            title="Add AST Block"
          >
            <PlusIcon className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Toolbar */}
      {showToolbar && (
        <div className="absolute -left-9 top-12 z-30">
          <InlineToolbar
            onAddBlock={(type) => {
              onAddBlockAfter(node.id, type);
              setShowToolbar(false);
            }}
            onDeleteBlock={() => onDeleteNode(node.id)}
          />
        </div>
      )}

      {/* Main Block Payload Content */}
      <div className="w-full">
        {renderBlockContent()}
      </div>
    </div>
  );
};
