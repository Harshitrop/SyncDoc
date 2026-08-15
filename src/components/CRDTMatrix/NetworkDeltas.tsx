import React from 'react';
import { CRDTLogEntry, SyncTelemetry } from '../../types/ast';
import { CpuIcon, NetworkIcon, SparklesIcon, ShieldCheckIcon } from '../ui/Icons';

interface NetworkDeltasProps {
  logs: CRDTLogEntry[];
  telemetry: SyncTelemetry;
  onTriggerConflict: () => void;
}

export const NetworkDeltas: React.FC<NetworkDeltasProps> = ({ logs, telemetry, onTriggerConflict }) => {
  return (
    <div className="w-full h-full flex flex-col p-4 md:p-6 glass-panel rounded-2xl border border-slate-800/80 shadow-2xl space-y-5">
      {/* Header & Control Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-800 pb-4 gap-3">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CpuIcon className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-lg text-white">Yjs CRDT Synchronization Matrix</h3>
            <p className="text-xs text-slate-400">Conflict-free Replicated Data Type WebSocket telemetry & delta stream</p>
          </div>
        </div>

        <button
          onClick={onTriggerConflict}
          className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 hover:brightness-110 active:scale-95 transition-all"
        >
          <SparklesIcon className="w-4 h-4 text-slate-950 animate-spin" />
          <span>Simulate Concurrent Conflict</span>
        </button>
      </div>

      {/* Telemetry Quick Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center space-x-3">
          <NetworkIcon className="w-5 h-5 text-cyan-400" />
          <div>
            <div className="text-[10px] text-slate-400 font-semibold uppercase">Vector Clock</div>
            <div className="font-mono text-base text-cyan-300 font-bold">v{telemetry.vectorClock}</div>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center space-x-3">
          <CpuIcon className="w-5 h-5 text-emerald-400" />
          <div>
            <div className="text-[10px] text-slate-400 font-semibold uppercase">Ops Velocity</div>
            <div className="font-mono text-base text-emerald-300 font-bold">{telemetry.opsPerSec} ops/s</div>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center space-x-3">
          <ShieldCheckIcon className="w-5 h-5 text-violet-400" />
          <div>
            <div className="text-[10px] text-slate-400 font-semibold uppercase">Conflict Loss Rate</div>
            <div className="font-mono text-base text-violet-300 font-bold">0.00%</div>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center space-x-3">
          <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></span>
          <div>
            <div className="text-[10px] text-slate-400 font-semibold uppercase">Latency Ping</div>
            <div className="font-mono text-base text-emerald-400 font-bold">{telemetry.pingMs} ms</div>
          </div>
        </div>
      </div>

      {/* Live WebSocket CRDT Delta Log Feed */}
      <div className="flex-1 flex flex-col bg-slate-950/90 rounded-2xl border border-slate-800 overflow-hidden">
        <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs font-semibold text-slate-300 flex items-center justify-between">
          <span>Live Network Delta Stream (Yjs WebSocket Matrix)</span>
          <span className="text-[10px] font-mono text-slate-500">Auto-scrolling</span>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2 font-mono text-xs max-h-[420px]">
          {logs.map((log) => (
            <div
              key={log.id}
              className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-start justify-between space-x-4 hover:border-slate-700 transition-all animate-fadeIn"
            >
              <div className="flex items-start space-x-3">
                <span className="w-2.5 h-2.5 rounded-full mt-1 shrink-0" style={{ backgroundColor: log.clientColor }}></span>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-slate-200">{log.clientName}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-950 text-cyan-400 border border-slate-800">
                      {log.operation}
                    </span>
                    <span className="text-slate-500 text-[10px]">{log.timestamp}</span>
                  </div>
                  <p className="text-slate-300 mt-1">{log.deltaSummary}</p>
                </div>
              </div>

              <div className="flex flex-col items-end space-y-1">
                <span className="text-[10px] font-bold text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800">
                  {log.clockVector}
                </span>
                {log.conflictResolved && (
                  <span className="text-[9px] text-emerald-400 flex items-center space-x-1">
                    <ShieldCheckIcon className="w-3 h-3" />
                    <span>Merged Clean</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
