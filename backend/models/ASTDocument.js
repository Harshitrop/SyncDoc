import mongoose from 'mongoose';

// Recursive AST Node Schema
const ASTNodeSchema = new mongoose.Schema({
  id: { type: String, required: true },
  type: { 
    type: String, 
    required: true,
    enum: ['heading', 'paragraph', 'code', 'callout', 'table', 'task', 'math', 'image']
  },
  content: { type: String, default: '' },
  level: { type: Number }, // for headings
  language: { type: String }, // for code
  variant: { type: String }, // for callouts
  checked: { type: Boolean }, // for tasks
  tableData: { type: [[String]], default: undefined }, // for tables
  formula: { type: String }, // for math
  lockedBy: { type: String, default: null }, // user ID currently editing
  lastModifiedBy: { type: String, default: 'System' },
  version: { type: Number, default: 1 },
  timestamp: { type: Date, default: Date.now }
});

// Recursive Children Support
ASTNodeSchema.add({ children: [ASTNodeSchema] });

// Main Document AST Schema
const ASTDocumentSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  version: { type: Number, default: 1 },
  rootId: { type: String, required: true },
  nodes: [ASTNodeSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Recursive Mongoose pre-save hook to trace block relationships & increment version (Week 1 & 3 requirement)
ASTDocumentSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  this.version += 1;
  
  // Validate nested relationships recursively
  const validateNodes = (nodes) => {
    nodes.forEach(node => {
      if (!node.id) {
        node.id = `node-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
      }
      if (node.children && node.children.length > 0) {
        validateNodes(node.children);
      }
    });
  };

  validateNodes(this.nodes);
  next();
});

export const ASTDocument = mongoose.model('ASTDocument', ASTDocumentSchema);
