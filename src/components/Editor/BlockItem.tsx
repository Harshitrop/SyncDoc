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
      className={`group relative p-2 md:p-3 rounded-2xl transition-all duration-200 ${
        isLocked
          ? 'bg-slate-900/80 border-2 glow-border-amber ring-2 ring-amber-500/20'
          : isActive
          ? 'bg-slate-900/50 border border-cyan-500/40 ring-1 ring-cyan-500/20 shadow-lg'
          : isHovered
          ? 'bg-slate-900/30 border border-slate-800/80'
          : 'border border-transparent'
      }`}
    >
      {/* Remote Presence & Lock Indicator (Week 2 Visual Indicator Requirement) */}
      {lockingUser && (
        <div
          className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-slate-950 flex items-center space-x-1 shadow-lg z-20 animate-bounce"
          style={{ backgroundColor: lockingUser.color }}
        >
          <LockIcon className="w-3 h-3 text-slate-950" />
          <span>{lockingUser.name} is editing...</span>
        </div>
      )}

      {/* Block Meta Tag (Hover State) */}
      {isHovered && !lockingUser && (
        <div className="absolute -top-2.5 right-4 px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-400 flex items-center space-x-1.5 opacity-90 z-20">
          <span className="text-cyan-400 font-bold">#{node.id}</span>
          <span>v{node.version}</span>
        </div>
      )}

      {/* Left Handle & Add Block Trigger */}
      {isHovered && !lockingUser && (
        <div className="absolute -left-9 top-3 flex items-center space-x-1 z-20">
          <button
            onClick={() => setShowToolbar(!showToolbar)}
            className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-cyan-300 hover:bg-slate-700 transition-all shadow-md"
            title="Add Block"
          >
            <PlusIcon className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Toolbar Context */}
      {showToolbar && (
        <div className="absolute -left-9 top-10 z-30">
          <InlineToolbar
            onAddBlock={(type) => {
              onAddBlockAfter(node.id, type);
              setShowToolbar(false);
            }}
            onDeleteBlock={() => onDeleteNode(node.id)}
          />
        </div>
      )}

      {/* Main Block Content */}
      <div className="w-full">
        {renderBlockContent()}
      </div>
    </div>
  );
};
