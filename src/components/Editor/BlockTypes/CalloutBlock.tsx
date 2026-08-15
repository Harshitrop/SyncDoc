import React from 'react';
import { ASTNode } from '../../../types/ast';
import { AlertTriangleIcon, SparklesIcon, ShieldCheckIcon } from '../../ui/Icons';

interface CalloutBlockProps {
  node: ASTNode;
  isLocked: boolean;
  onUpdate: (content: string) => void;
}

export const CalloutBlock: React.FC<CalloutBlockProps> = ({ node, isLocked, onUpdate }) => {
  const variant = node.variant || 'info';

  const styles = {
    info: {
      bg: 'bg-gradient-to-r from-cyan-950/60 to-blue-950/60 border-cyan-500/40 text-cyan-200',
      icon: <SparklesIcon className="w-5 h-5 text-cyan-400 shrink-0" />,
      badge: 'bg-cyan-900/60 text-cyan-300 border-cyan-500/30'
    },
    warning: {
      bg: 'bg-gradient-to-r from-amber-950/60 to-orange-950/60 border-amber-500/40 text-amber-200',
      icon: <AlertTriangleIcon className="w-5 h-5 text-amber-400 shrink-0" />,
      badge: 'bg-amber-900/60 text-amber-300 border-amber-500/30'
    },
    success: {
      bg: 'bg-gradient-to-r from-emerald-950/60 to-teal-950/60 border-emerald-500/40 text-emerald-200',
      icon: <ShieldCheckIcon className="w-5 h-5 text-emerald-400 shrink-0" />,
      badge: 'bg-emerald-900/60 text-emerald-300 border-emerald-500/30'
    },
    danger: {
      bg: 'bg-gradient-to-r from-rose-950/60 to-red-950/60 border-rose-500/40 text-rose-200',
      icon: <AlertTriangleIcon className="w-5 h-5 text-rose-400 shrink-0" />,
      badge: 'bg-rose-900/60 text-rose-300 border-rose-500/30'
    }
  }[variant];

  return (
    <div className={`p-4 rounded-2xl border ${styles.bg} my-3 flex items-start space-x-3 shadow-lg backdrop-blur-md`}>
      {styles.icon}
      <div className="flex-1">
        <textarea
          disabled={isLocked}
          value={node.content}
          onChange={(e) => onUpdate(e.target.value)}
          rows={Math.max(2, Math.ceil(node.content.length / 75))}
          className="w-full bg-transparent text-sm leading-relaxed focus:outline-none resize-none"
        />
      </div>
    </div>
  );
};
