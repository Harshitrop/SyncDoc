import React from 'react';
import { ASTNode } from '../../../types/ast';

interface TaskBlockProps {
  node: ASTNode;
  isLocked: boolean;
  onToggleTaskChecked: (parentTaskId: string, taskId: string) => void;
}

export const TaskBlock: React.FC<TaskBlockProps> = ({ node, isLocked, onToggleTaskChecked }) => {
  const tasks = node.children || [];
  const completedCount = tasks.filter(t => t.checked).length;
  const progressPercent = tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className="my-3 p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 shadow-lg space-y-3">
      {/* Header & Progress */}
      <div className="flex items-center justify-between">
        <h4 className="font-heading font-bold text-sm text-slate-200">{node.content}</h4>
        <div className="flex items-center space-x-2">
          <div className="w-24 h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <span className="font-mono text-xs text-cyan-400 font-semibold">{progressPercent}%</span>
        </div>
      </div>

      {/* Task List items */}
      <div className="space-y-2">
        {tasks.map(task => (
          <div
            key={task.id}
            onClick={() => !isLocked && onToggleTaskChecked(node.id, task.id)}
            className="flex items-center space-x-3 p-2 rounded-xl bg-slate-950/60 border border-slate-800/60 cursor-pointer hover:border-slate-700 transition-all"
          >
            <input
              type="checkbox"
              disabled={isLocked}
              checked={!!task.checked}
              onChange={() => {}} // handled by parent onClick
              className="w-4 h-4 rounded border-slate-700 text-cyan-500 focus:ring-cyan-400 accent-cyan-500 cursor-pointer"
            />
            <span
              className={`text-xs md:text-sm font-medium transition-all ${
                task.checked ? 'line-through text-slate-500' : 'text-slate-200'
              }`}
            >
              {task.content}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
