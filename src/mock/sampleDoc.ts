import { DocumentAST, UserPresence } from '../types/ast';

export const INITIAL_DOCUMENT: DocumentAST = {
  id: 'doc-sync-spec-2026',
  title: 'SyncDoc: Collaborative AST Engine Technical Spec v2.4',
  version: 50,
  rootId: 'root-node-00',
  createdAt: '2026-08-10T09:30:00Z',
  updatedAt: '2026-09-15T21:00:00Z',
  nodes: [
    {
      id: 'node-h1',
      type: 'heading',
      level: 1,
      content: 'SyncDoc Architecture & AST Conflict Resolution Matrix',
      version: 5,
      timestamp: '2026-09-15T20:15:00Z',
      lastModifiedBy: 'Jyoti (Frontend Lead)'
    },
    {
      id: 'node-callout-1',
      type: 'callout',
      variant: 'info',
      content: '🚀 SyncDoc engine guarantees zero-overwrite collaborative editing by resolving structural diffs at the Abstract Syntax Tree (AST) node level rather than naive plain-text line merging.',
      version: 8,
      timestamp: '2026-09-15T20:18:00Z',
      lastModifiedBy: 'Jyoti (Frontend Lead)'
    },
    {
      id: 'node-p1',
      type: 'paragraph',
      content: 'Multi-user text editors frequently suffer from destructive overwrites and sync conflicts. Plain text merging is insufficient for complex structural documents, leading to lost work when multiple users edit the same document simultaneously.',
      version: 15,
      timestamp: '2026-09-15T20:20:00Z',
      lastModifiedBy: 'Sarah Lin'
    },
    {
      id: 'node-code-1',
      type: 'code',
      language: 'typescript',
      content: `// Yjs WebSocket Matrix Routing & AST Node Diffing
import { YDoc, YMap, applyUpdate } from 'yjs';

export class ASTSyncEngine {
  private doc = new YDoc();
  private astNodes = this.doc.getMap('ast_nodes');

  public applyDelta(clientId: string, nodeId: string, patch: Record<string, any>): void {
    this.doc.transact(() => {
      const existing = this.astNodes.get(nodeId) || {};
      this.astNodes.set(nodeId, { ...existing, ...patch, version: (existing.version || 1) + 1 });
    });
  }
}`,
      version: 10,
      timestamp: '2026-09-15T20:35:00Z',
      lastModifiedBy: 'Dave Miller',
      lockedBy: 'usr-backend-1'
    },
    {
      id: 'node-callout-warning',
      type: 'callout',
      variant: 'warning',
      content: '⚡ Visual Block-State Indicator: Block #node-code-1 is currently being modified by Dave Miller (Backend Architect). Remote operational lock active.',
      version: 4,
      timestamp: '2026-09-15T20:36:00Z',
      lastModifiedBy: 'Dave Miller'
    },
    {
      id: 'node-table-1',
      type: 'table',
      content: 'Performance Benchmark Across 10 Concurrent Clients',
      tableData: [
        ['Sync Engine', 'Conflict Loss Rate', 'Avg Sync Latency', 'AST Node Re-renders'],
        ['Naive Plain Text Sync', '14.2%', '145 ms', 'Full Text-area Rebuild'],
        ['SyncDoc Yjs AST Matrix', '0.00%', '11.8 ms', 'Targeted Atomic Node Update']
      ],
      version: 6,
      timestamp: '2026-09-15T20:45:00Z',
      lastModifiedBy: 'Sarah Lin'
    },
    {
      id: 'node-task-1',
      type: 'task',
      content: 'Sprint Milestones (Week 1 to Week 4 Completed)',
      children: [
        {
          id: 'task-1',
          type: 'task',
          checked: true,
          content: 'Week 1: Editor Foundations & Recursive Mongoose AST Modeling',
          version: 1,
          timestamp: '2026-09-15T18:00:00Z'
        },
        {
          id: 'task-2',
          type: 'task',
          checked: true,
          content: 'Week 2: Yjs WebSocket Routing & Visual Operational Block Locks',
          version: 1,
          timestamp: '2026-09-15T18:30:00Z'
        },
        {
          id: 'task-3',
          type: 'task',
          checked: true,
          content: 'Week 3: Block Selection Bounds & PDF Transformation Engine',
          version: 1,
          timestamp: '2026-09-15T19:00:00Z'
        },
        {
          id: 'task-4',
          type: 'task',
          checked: true,
          content: 'Week 4: DOMPurify XSS Hardening & Time-Travel Version History',
          version: 1,
          timestamp: '2026-09-15T19:30:00Z'
        }
      ],
      version: 5,
      timestamp: '2026-09-15T20:50:00Z',
      lastModifiedBy: 'Jyoti (Frontend Lead)'
    },
    {
      id: 'node-math-1',
      type: 'math',
      formula: 'CRDT_Convergence(S_1, S_2) = \\lim_{t \\to \\infty} (A_t \\oplus B_t) = \\text{AST}_{unified}',
      content: 'Conflict-Free State Convergence Formula',
      version: 3,
      timestamp: '2026-09-15T20:55:00Z',
      lastModifiedBy: 'Dave Miller'
    }
  ]
};

export const INITIAL_COLLABORATORS: UserPresence[] = [
  {
    id: 'usr-lead-frontend',
    name: 'Jyoti (You)',
    role: 'Frontend Team Lead',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    color: '#a855f7',
    activeBlockId: 'node-h1',
    cursorOffset: 12,
    isOnline: true,
    isTyping: false
  },
  {
    id: 'usr-backend-1',
    name: 'Dave Miller',
    role: 'Backend Architect',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    color: '#f59e0b',
    activeBlockId: 'node-code-1',
    cursorOffset: 45,
    isOnline: true,
    isTyping: true
  },
  {
    id: 'usr-frontend-2',
    name: 'Sarah Lin',
    role: 'UI Developer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    color: '#10b981',
    activeBlockId: 'node-p1',
    cursorOffset: 24,
    isOnline: true,
    isTyping: false
  },
  {
    id: 'usr-backend-2',
    name: 'Marcus Vance',
    role: 'Database Engineer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    color: '#ec4899',
    activeBlockId: null,
    cursorOffset: 0,
    isOnline: true,
    isTyping: false
  }
];
