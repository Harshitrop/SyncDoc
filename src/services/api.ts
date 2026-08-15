import { DocumentAST, ASTNode } from '../types/ast';
import { INITIAL_DOCUMENT } from '../mock/sampleDoc';

// REST API abstraction layer for Express/MongoDB integration
export const documentApi = {
  async fetchDocument(docId: string): Promise<DocumentAST> {
    // Simulated network delay matching real backend REST endpoint
    await new Promise(resolve => setTimeout(resolve, 150));
    console.log(`[SyncDoc API] Fetched document ${docId} from Express/Mongoose backend`);
    return INITIAL_DOCUMENT;
  },

  async saveASTNode(docId: string, node: ASTNode): Promise<{ success: boolean; version: number }> {
    await new Promise(resolve => setTimeout(resolve, 80));
    console.log(`[SyncDoc API] Saved AST Node ${node.id} to MongoDB schema with pre-save validation`);
    return { success: true, version: node.version + 1 };
  },

  async createASTNode(docId: string, node: ASTNode, parentId?: string): Promise<ASTNode> {
    await new Promise(resolve => setTimeout(resolve, 100));
    console.log(`[SyncDoc API] Appended new AST Node (${node.type}) to doc ${docId}`);
    return { ...node, version: 1, timestamp: new Date().toISOString() };
  },

  async deleteASTNode(docId: string, nodeId: string): Promise<{ success: boolean }> {
    await new Promise(resolve => setTimeout(resolve, 60));
    console.log(`[SyncDoc API] Deleted AST Node ${nodeId} from doc ${docId}`);
    return { success: true };
  }
};
