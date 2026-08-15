import React, { useState } from 'react';
import { UserPresence } from '../types/ast';
import { CheckIcon, UsersIcon } from './ui/Icons';

interface InviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  collaborators: UserPresence[];
}

export const InviteModal: React.FC<InviteModalProps> = ({ isOpen, onClose, collaborators }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md p-6 rounded-2xl glass-panel border border-slate-700/60 shadow-2xl space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <UsersIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-white">Invite Collaborators</h3>
              <p className="text-xs text-slate-400">Share live Yjs WebSocket AST session link</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-sm font-semibold p-1 rounded-lg hover:bg-slate-800"
          >
            ✕
          </button>
        </div>

        {/* Share Link Box */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300">Session Link</label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              readOnly
              value={`https://syncdoc.app/session/doc-sync-spec-2026`}
              className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-300 focus:outline-none"
            />
            <button
              onClick={handleCopyLink}
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all flex items-center space-x-1.5 shrink-0"
            >
              {copied ? (
                <>
                  <CheckIcon className="w-4 h-4" />
                  <span>Copied!</span>
                </>
              ) : (
                <span>Copy Link</span>
              )}
            </button>
          </div>
        </div>

        {/* Active Collaborators */}
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-3">
            Active Collaborators ({collaborators.length})
          </span>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {collaborators.map(user => (
              <div key={user.id} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <div className="flex items-center space-x-3">
                  <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover border" style={{ borderColor: user.color }} />
                  <div>
                    <div className="text-xs font-semibold text-slate-200">{user.name}</div>
                    <div className="text-[10px] text-slate-400">{user.role}</div>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                  CRDT Connected
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
