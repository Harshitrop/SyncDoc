import { useState, useEffect, useCallback } from 'react';
import { UserPresence, CRDTLogEntry, SyncTelemetry } from '../types/ast';
import { INITIAL_COLLABORATORS } from '../mock/sampleDoc';
import { wsAdapter } from '../services/websocket';

export function useCollaboration() {
  const [collaborators, setCollaborators] = useState<UserPresence[]>(INITIAL_COLLABORATORS);
  const [crdtLogs, setCrdtLogs] = useState<CRDTLogEntry[]>([
    {
      id: 'crdt-init-1',
      timestamp: '11:00:12',
      clientId: 'usr-backend-1',
      clientName: 'Dave Miller',
      clientColor: '#f59e0b',
      operation: 'CRDT_VECTOR_SYNC',
      nodeId: 'doc-sync-spec-2026',
      deltaSummary: 'StateVector exchange (Clock: v1042)',
      clockVector: 'v1042',
      conflictResolved: true
    },
    {
      id: 'crdt-init-2',
      timestamp: '11:01:45',
      clientId: 'usr-frontend-2',
      clientName: 'Sarah Lin',
      clientColor: '#10b981',
      operation: 'NODE_MUTATE',
      nodeId: 'node-p1',
      deltaSummary: 'Updated paragraph text block node #node-p1',
      clockVector: 'v1045',
      conflictResolved: true
    },
    {
      id: 'crdt-init-3',
      timestamp: '11:04:10',
      clientId: 'usr-backend-1',
      clientName: 'Dave Miller',
      clientColor: '#f59e0b',
      operation: 'BLOCK_LOCK',
      nodeId: 'node-code-1',
      deltaSummary: 'Acquired exclusive operational edit lock on #node-code-1',
      clockVector: 'v1048',
      conflictResolved: true
    }
  ]);

  const [telemetry, setTelemetry] = useState<SyncTelemetry>({
    status: 'connected',
    pingMs: 12,
    opsPerSec: 28,
    vectorClock: 1048,
    activeCollaborators: 4,
    totalASTNodes: 10
  });

  // Listen to WebSocket broadcasts
  useEffect(() => {
    const unsubscribe = wsAdapter.subscribe('crdt_delta', (newEntry: CRDTLogEntry) => {
      setCrdtLogs(prev => [newEntry, ...prev.slice(0, 49)]); // Keep last 50 logs
      setTelemetry(prev => ({
        ...prev,
        opsPerSec: prev.opsPerSec + 1,
        vectorClock: prev.vectorClock + 1
      }));
    });
    return unsubscribe;
  }, []);

  // Periodic heartbeat & ping latency jitter simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry(prev => ({
        ...prev,
        pingMs: Math.floor(10 + Math.random() * 6),
        opsPerSec: Math.max(12, Math.floor(20 + Math.sin(Date.now() / 2000) * 15))
      }));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Trigger simulated remote user typing for Week 2 presentation
  const simulateRemoteTyping = useCallback((userId: string, nodeId: string) => {
    setCollaborators(prev =>
      prev.map(c => (c.id === userId ? { ...c, activeBlockId: nodeId, isTyping: true } : c))
    );

    const user = collaborators.find(c => c.id === userId) || collaborators[1];
    wsAdapter.broadcastCRDTDelta(
      user,
      'NODE_MUTATE',
      nodeId,
      `Remote keystroke input on node #${nodeId}`
    );

    setTimeout(() => {
      setCollaborators(prev =>
        prev.map(c => (c.id === userId ? { ...c, isTyping: false } : c))
      );
    }, 1800);
  }, [collaborators]);

  // Simulate concurrent AST conflict resolution (Mid-Project Review requirement)
  const triggerConflictSimulation = useCallback(() => {
    const userA = collaborators[0];
    const userB = collaborators[1];

    wsAdapter.broadcastCRDTDelta(
      userA,
      'NODE_MUTATE',
      'node-p1',
      'User A inserted paragraph delta at index 4 (Clock: v1049)'
    );

    setTimeout(() => {
      wsAdapter.broadcastCRDTDelta(
        userB,
        'NODE_MUTATE',
        'node-p1',
        'User B concurrently modified paragraph text (Clock: v1050)'
      );
    }, 150);

    setTimeout(() => {
      wsAdapter.broadcastCRDTDelta(
        userA,
        'CRDT_VECTOR_SYNC',
        'node-p1',
        '⚡ AST CRDT Convergence Achieved: Zero data loss merge applied.'
      );
    }, 450);
  }, [collaborators]);

  return {
    collaborators,
    crdtLogs,
    telemetry,
    simulateRemoteTyping,
    triggerConflictSimulation
  };
}
