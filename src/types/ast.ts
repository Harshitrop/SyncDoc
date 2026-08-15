export type BlockType = 
  | 'heading' 
  | 'paragraph' 
  | 'code' 
  | 'callout' 
  | 'table' 
  | 'task' 
  | 'math';

export interface ASTNode {
  id: string;
  type: BlockType;
  content: string;
  level?: 1 | 2 | 3; // for headings
  language?: string; // for code blocks
  variant?: 'info' | 'warning' | 'success' | 'danger'; // for callouts
  checked?: boolean; // for tasks
  tableData?: string[][]; // for tables
  formula?: string; // for math/diagrams
  lockedBy?: string | null; // User ID who locked this block
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
