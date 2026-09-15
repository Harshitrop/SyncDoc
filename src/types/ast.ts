export type BlockType = 
  | 'heading' 
  | 'paragraph' 
  | 'code' 
  | 'callout' 
  | 'table' 
  | 'task' 
  | 'math'
  | 'image';

export interface ASTNode {
  id: string;
  type: BlockType;
  content: string;
  level?: 1 | 2 | 3;
  language?: string;
  variant?: 'info' | 'warning' | 'success' | 'danger';
  checked?: boolean;
  tableData?: string[][];
  formula?: string;
  imageUrl?: string;
  lockedBy?: string | null;
  lastModifiedBy?: string;
  version: number;
  timestamp: string;
  children?: ASTNode[];
}

export interface DocumentAST {
  id: string;
  title: string;
  version: number;
  rootId: string;
  createdAt: string;
  updatedAt: string;
  nodes: ASTNode[];
}

export interface UserPresence {
  id: string;
  name: string;
  role: string;
  avatar: string;
  color: string;
  activeBlockId: string | null;
  cursorOffset?: number;
  isOnline: boolean;
  isTyping?: boolean;
}

export type CRDTOperationType = 
  | 'NODE_INSERT' 
  | 'NODE_MUTATE' 
  | 'NODE_DELETE' 
  | 'BLOCK_LOCK' 
  | 'BLOCK_UNLOCK'
  | 'CRDT_VECTOR_SYNC';

export interface CRDTLogEntry {
  id: string;
  timestamp: string;
  clientId: string;
  clientName: string;
  clientColor: string;
  operation: CRDTOperationType;
  nodeId: string;
  deltaSummary: string;
  clockVector: string;
  conflictResolved: boolean;
}

export interface SyncTelemetry {
  status: 'connected' | 'syncing' | 'reconnecting' | 'offline';
  pingMs: number;
  opsPerSec: number;
  vectorClock: number;
  activeCollaborators: number;
  totalASTNodes: number;
}
