import React from 'react';
import { DocumentAST, UserPresence, BlockType } from '../types/ast';
import { BlockEditor } from './Editor/BlockEditor';
import { SparklesIcon, SplitIcon } from './ui/Icons';

interface SplitSimulatorProps {
  doc: DocumentAST;
  collaborators: UserPresence[];
  activeNodeId: string | null;
  onSetActiveNodeId: (nodeId: string) => void;
  onUpdateContent: (nodeId: string, content: string) => void;
  onUpdateTableData: (nodeId: string, tableData: string[][]) => void;
  onToggleTaskChecked: (parentTaskId: string, taskId: string) => void;
  onAddBlockAfter: (targetNodeId: string, type: BlockType) => void;
  onDeleteNode: (nodeId: string) => void;
  onTriggerConflict: () => void;
}

export const SplitSimulator: React.FC<SplitSimulatorProps> = ({
  doc,
  collaborators,
  activeNodeId,
  onSetActiveNodeId,
  onUpdateContent,
  onUpdateTableData,
  onToggleTaskChecked,
  onAddBlockAfter,
  onDeleteNode,
  onTriggerConflict
}) => {
  const userA = collaborators[0]; // Alex
  const userB = collaborators[1]; // Dave

  return (
    <div className="w-full h-full flex flex-col p-4 md:p-6 space-y-4 overflow-hidden select-none">
      {/* Top Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/80 via-slate-950 to-amber-950/80 border border-cyan-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <SplitIcon className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-base text-white flex items-center space-x-2">
              <span>Dual Multi-User Simulator View</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800">
                Live Yjs WebSocket Sync
              </span>
            </h3>
            <p className="text-xs text-slate-300">
              Proves zero-overwrite collaborative editing: User A & User B type simultaneously on the same AST document tree.
            </p>
          </div>
        </div>

        <button
          onClick={onTriggerConflict}
          className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 font-bold text-xs shadow-lg hover:brightness-110 active:scale-95 transition-all shrink-0"
        >
          <SparklesIcon className="w-4 h-4 text-slate-950 animate-spin" />
          <span>Simulate Concurrent Edit Race</span>
        </button>
      </div>

      {/* Side-by-Side Dual Editors */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-hidden min-h-0">
        {/* Left Window: User A */}
        <div className="flex flex-col rounded-2xl glass-panel border border-cyan-500/30 overflow-hidden shadow-2xl">
          <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <img src={userA.avatar} alt={userA.name} className="w-7 h-7 rounded-full object-cover border-2 border-cyan-400" />
              <div>
                <span className="text-xs font-bold text-slate-100">{userA.name}</span>
                <span className="text-[10px] text-slate-400 block">{userA.role}</span>
              </div>
            </div>

            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
              User A Window
            </span>
          </div>

          <div className="flex-1 overflow-y-auto">
            <BlockEditor
              doc={doc}
              activeNodeId={activeNodeId}
              onSetActiveNodeId={onSetActiveNodeId}
              collaborators={collaborators}
              onUpdateContent={onUpdateContent}
              onUpdateTableData={onUpdateTableData}
              onToggleTaskChecked={onToggleTaskChecked}
              onAddBlockAfter={onAddBlockAfter}
              onDeleteNode={onDeleteNode}
            />
          </div>
        </div>

        {/* Right Window: User B */}
        <div className="flex flex-col rounded-2xl glass-panel border border-amber-500/30 overflow-hidden shadow-2xl">
          <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <img src={userB.avatar} alt={userB.name} className="w-7 h-7 rounded-full object-cover border-2 border-amber-400" />
              <div>
                <span className="text-xs font-bold text-slate-100">{userB.name}</span>
                <span className="text-[10px] text-slate-400 block">{userB.role}</span>
              </div>
            </div>

            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-800">
              User B Window
            </span>
          </div>

          <div className="flex-1 overflow-y-auto">
            <BlockEditor
              doc={doc}
              activeNodeId={activeNodeId}
              onSetActiveNodeId={onSetActiveNodeId}
              collaborators={collaborators}
              onUpdateContent={onUpdateContent}
              onUpdateTableData={onUpdateTableData}
              onToggleTaskChecked={onToggleTaskChecked}
              onAddBlockAfter={onAddBlockAfter}
              onDeleteNode={onDeleteNode}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
