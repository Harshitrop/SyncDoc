import { useState, useCallback } from 'react';
import { DocumentAST, ASTNode, BlockType } from '../types/ast';
import { INITIAL_DOCUMENT } from '../mock/sampleDoc';

export function useASTEditor() {
  const [doc, setDoc] = useState<DocumentAST>(INITIAL_DOCUMENT);
  const [activeNodeId, setActiveNodeId] = useState<string | null>('node-h1');
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  // Atomic AST Node content mutation (Week 1 & 2 requirement: Target AST node changes without full text-area rebuilds)
  const updateNodeContent = useCallback((nodeId: string, newContent: string) => {
    setDoc(prev => ({
      ...prev,
      version: prev.version + 1,
      updatedAt: new Date().toISOString(),
      nodes: prev.nodes.map(node => {
        if (node.id === nodeId) {
          return {
            ...node,
            content: newContent,
            version: node.version + 1,
            timestamp: new Date().toISOString(),
            lastModifiedBy: 'Alex Chen (You)'
          };
        }
        // Also check nested task children if any
        if (node.children) {
          return {
            ...node,
            children: node.children.map(child =>
              child.id === nodeId
                ? { ...child, content: newContent, version: child.version + 1, timestamp: new Date().toISOString() }
                : child
            )
          };
        }
        return node;
      })
    }));
  }, []);

  const updateTableData = useCallback((nodeId: string, newTableData: string[][]) => {
    setDoc(prev => ({
      ...prev,
      version: prev.version + 1,
      nodes: prev.nodes.map(node =>
        node.id === nodeId
          ? { ...node, tableData: newTableData, version: node.version + 1, timestamp: new Date().toISOString() }
          : node
      )
    }));
  }, []);

  const toggleTaskChecked = useCallback((parentTaskId: string, taskId: string) => {
    setDoc(prev => ({
      ...prev,
      version: prev.version + 1,
      nodes: prev.nodes.map(node => {
        if (node.id === parentTaskId && node.children) {
          return {
            ...node,
            children: node.children.map(child =>
              child.id === taskId ? { ...child, checked: !child.checked } : child
            )
          };
        }
        return node;
      })
    }));
  }, []);

  const addNodeAfter = useCallback((targetNodeId: string, type: BlockType = 'paragraph') => {
    const newNodeId = `node-${Date.now()}`;
    const newNode: ASTNode = {
      id: newNodeId,
      type,
      content: type === 'heading' ? 'New Section Heading' : type === 'code' ? '// Add your code here' : 'Type block content...',
      level: type === 'heading' ? 2 : undefined,
      language: type === 'code' ? 'typescript' : undefined,
      variant: type === 'callout' ? 'info' : undefined,
      version: 1,
      timestamp: new Date().toISOString(),
      lastModifiedBy: 'Alex Chen (You)'
    };

    setDoc(prev => {
      const index = prev.nodes.findIndex(n => n.id === targetNodeId);
      const newNodes = [...prev.nodes];
      if (index >= 0) {
        newNodes.splice(index + 1, 0, newNode);
      } else {
        newNodes.push(newNode);
      }
      return { ...prev, version: prev.version + 1, nodes: newNodes };
    });

    setActiveNodeId(newNodeId);
  }, []);

  const deleteNode = useCallback((nodeId: string) => {
    setDoc(prev => {
      if (prev.nodes.length <= 1) return prev; // Keep at least one block
      return {
        ...prev,
        version: prev.version + 1,
        nodes: prev.nodes.filter(n => n.id !== nodeId)
      };
    });
  }, []);

  const moveNode = useCallback((nodeId: string, direction: 'up' | 'down') => {
    setDoc(prev => {
      const index = prev.nodes.findIndex(n => n.id === nodeId);
      if (index === -1) return prev;
      if (direction === 'up' && index === 0) return prev;
      if (direction === 'down' && index === prev.nodes.length - 1) return prev;

      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      const newNodes = [...prev.nodes];
      const [movedNode] = newNodes.splice(index, 1);
      newNodes.splice(targetIndex, 0, movedNode);

      return { ...prev, version: prev.version + 1, nodes: newNodes };
    });
  }, []);

  return {
    doc,
    activeNodeId,
    setActiveNodeId,
    selectedNodeId,
    setSelectedNodeId,
    updateNodeContent,
    updateTableData,
    toggleTaskChecked,
    addNodeAfter,
    deleteNode,
    moveNode
  };
}
