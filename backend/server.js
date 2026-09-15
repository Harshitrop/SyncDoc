import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import apiRoutes from './routes/api.js';
import { crdtServer } from './services/crdtEngine.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
});

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', apiRoutes);

app.get('/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'SyncDoc Express Backend & Socket.io CRDT Server',
    vectorClock: crdtServer.vectorClock,
    activeConnections: io.sockets.sockets.size
  });
});

// Socket.io Real-Time CRDT WebSocket Matrix Gateway (Week 2 & Final Review)
io.on('connection', (socket) => {
  console.log(`[SyncDoc Socket] Client connected: ${socket.id}`);

  socket.on('join_document', ({ docId, user }) => {
    socket.join(docId);
    console.log(`[SyncDoc Socket] User ${user?.name || socket.id} joined document ${docId}`);
    socket.to(docId).emit('user_joined', { user, timestamp: new Date() });
  });

  socket.on('crdt_delta_broadcast', ({ docId, client, operation, nodeId, deltaPatch }) => {
    const logEntry = crdtServer.applyNodeDelta(
      docId,
      client.id,
      client.name,
      client.color,
      nodeId,
      deltaPatch
    );
    io.to(docId).emit('crdt_delta_received', logEntry);
  });

  socket.on('acquire_block_lock', ({ docId, nodeId, user }) => {
    const lockStatus = crdtServer.acquireBlockLock(nodeId, user.id, user.name);
    io.to(docId).emit('block_lock_updated', lockStatus);
  });

  socket.on('release_block_lock', ({ docId, nodeId }) => {
    const lockStatus = crdtServer.releaseBlockLock(nodeId);
    io.to(docId).emit('block_lock_updated', lockStatus);
  });

  socket.on('disconnect', () => {
    console.log(`[SyncDoc Socket] Client disconnected: ${socket.id}`);
  });
});

server.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚀 SyncDoc Express Backend & Socket.io Server Active`);
  console.log(`📡 REST API Endpoint: http://localhost:${PORT}/api`);
  console.log(`⚡ WebSocket CRDT Gateway: ws://localhost:${PORT}`);
  console.log(`=======================================================`);
});
