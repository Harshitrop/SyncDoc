import * as Y from 'yjs';

export class YjsCRDTServerEngine {
  constructor() {
    this.docs = new Map(); // Y.Doc per document ID
    this.locks = new Map(); // Node ID -> User ID lock mapping
    this.vectorClock = 1048;
  }

  getOrCreateDoc(docId) {
    if (!this.docs.has(docId)) {
      const ydoc = new Y.Doc();
      this.docs.set(docId, ydoc);
    }
    return this.docs.get(docId);
  }

  applyNodeDelta(docId, clientId, clientName, clientColor, nodeId, deltaPatch) {
    this.vectorClock += 1;
    const ydoc = this.getOrCreateDoc(docId);
    const astMap = ydoc.getMap('ast_nodes');

    ydoc.transact(() => {
      const existing = astMap.get(nodeId) || {};
      astMap.set(nodeId, {
        ...existing,
        ...deltaPatch,
        version: (existing.version || 1) + 1,
        lastModifiedBy: clientName
      });
    });

    return {
      id: `crdt-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }),
      clientId,
      clientName,
      clientColor,
      operation: 'NODE_MUTATE',
      nodeId,
      deltaSummary: `Applied Yjs CRDT delta transaction on #${nodeId}`,
      clockVector: `v${this.vectorClock}`,
      conflictResolved: true
    };
  }

  acquireBlockLock(nodeId, userId, userName) {
    this.locks.set(nodeId, { userId, userName, lockedAt: new Date() });
    return { nodeId, lockedBy: userName, isLocked: true };
  }

  releaseBlockLock(nodeId) {
    this.locks.delete(nodeId);
    return { nodeId, isLocked: false };
  }

  getBlockLockStatus(nodeId) {
    return this.locks.get(nodeId) || null;
  }
}

export const crdtServer = new YjsCRDTServerEngine();
