import { CRDTLogEntry, UserPresence, CRDTOperationType } from '../types/ast';

type MessageListener = (data: any) => void;

class WebSocketSyncAdapter {
  private listeners: Map<string, Set<MessageListener>> = new Map();
  private isConnected: boolean = true;
  private vectorClock: number = 1048;

  constructor() {
    console.log('[SyncDoc WebSocket] Yjs CRDT Matrix routing layer initialized');
  }

  public subscribe(event: string, callback: MessageListener): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(callback);

    return () => {
      this.listeners.get(event)?.delete(callback);
    };
  }

  public emit(event: string, data: any): void {
    if (!this.isConnected) return;
    this.vectorClock++;

    // Broadcast to local subscribers
    const eventSubscribers = this.listeners.get(event);
    if (eventSubscribers) {
      eventSubscribers.forEach(cb => cb(data));
    }
  }

  public broadcastCRDTDelta(
    client: UserPresence,
    operation: CRDTOperationType,
    nodeId: string,
    deltaSummary: string
  ): CRDTLogEntry {
    const entry: CRDTLogEntry = {
      id: `crdt-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }),
      clientId: client.id,
      clientName: client.name,
      clientColor: client.color,
      operation,
      nodeId,
      deltaSummary,
      clockVector: `v${this.vectorClock}`,
      conflictResolved: true
    };

    this.emit('crdt_delta', entry);
    return entry;
  }
}

export const wsAdapter = new WebSocketSyncAdapter();
