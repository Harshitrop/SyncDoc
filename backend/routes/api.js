import express from 'express';
import { ASTDocument } from '../models/ASTDocument.js';
import { crdtServer } from '../services/crdtEngine.js';
import { ASTTransformationPipeline } from '../services/transformationPipeline.js';

const router = express.Router();

// 1. Get all workspace documents
router.get('/documents', async (req, res) => {
  try {
    const docs = await ASTDocument.find().select('id title version rootId updatedAt createdAt');
    res.json(docs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. Get specific AST Document by ID
router.get('/documents/:id', async (req, res) => {
  try {
    const doc = await ASTDocument.findOne({ id: req.params.id });
    if (!doc) {
      return res.status(404).json({ error: 'Document not found' });
    }
    res.json(doc);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. Create or Update AST Document
router.post('/documents', async (req, res) => {
  try {
    const { id, title, rootId, nodes } = req.body;
    let doc = await ASTDocument.findOne({ id });
    if (doc) {
      doc.title = title || doc.title;
      doc.nodes = nodes || doc.nodes;
    } else {
      doc = new ASTDocument({ id, title, rootId, nodes });
    }
    await doc.save();
    res.json(doc);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 4. Test DOMPurify Security XSS Sanitization Endpoint (Week 4 Requirement)
router.post('/security/sanitize', (req, res) => {
  const { payload } = req.body;
  const result = ASTTransformationPipeline.sanitizePayload(payload || '');
  res.json({
    status: 'success',
    timestamp: new Date().toISOString(),
    isClean: !result.containsXSS,
    xssBlocked: result.containsXSS,
    originalPayload: result.original,
    sanitizedPayload: result.cleanContent
  });
});

// 5. Compile AST to HTML & PDF Structure (Week 3 Requirement)
router.post('/documents/:id/export/html', async (req, res) => {
  try {
    const { documentAST } = req.body;
    const html = ASTTransformationPipeline.compileASTToHTML(documentAST);
    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
