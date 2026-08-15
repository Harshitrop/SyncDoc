# 🚀 SyncDoc - Collaborative Document Engine with AST Conflict Resolution

![SyncDoc Banner](https://img.shields.io/badge/SyncDoc-AST%20Conflict%20Engine-8b5cf6?style=for-the-badge&logo=react)
![React 18](https://img.shields.io/badge/React-18.2.0-61dafb?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-3178c6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.2.0-646cff?style=for-the-badge&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.3-38bdf8?style=for-the-badge&logo=tailwindcss)
![Yjs CRDT](https://img.shields.io/badge/CRDT-Yjs%20Protocol-10b981?style=for-the-badge)

> **SyncDoc** is an ultra-modern, high-performance collaborative document editing platform engineered around **Abstract Syntax Tree (AST) node diffing** and **Conflict-free Replicated Data Type (CRDT)** matrix synchronization.

---

## 🌟 Problem Statement & Architectural Solution

Multi-user text editors frequently suffer from destructive overwrites and sync conflicts. Plain text line merging is insufficient for complex structural documents, leading to lost work when multiple users edit the same document simultaneously.

### ⚡ The SyncDoc Solution
As User A types a new paragraph, User B concurrently adds a code block lower down the page. The system's **AST conflict resolution** ensures neither edit is lost. Both users see live visual block state indicators showing who is editing what, preventing layout-destructive overwrites in real-time.

---

## ✨ Key Features & Frontend Modules

### 1. 📝 Block-Based AST Structural Editor (Week 1 Scope)
- **Targeted Atomic Block Updates**: Mutates specific AST Nodes in real-time without full document text-area rebuilds.
- **7 Atomic Block Types**:
  - `HeadingBlock` (H1, H2, H3 with custom anchors)
  - `ParagraphBlock` (Rich inline text editing)
  - `CodeBlock` (Syntax highlighted block with runnable AST simulation output)
  - `CalloutBlock` (Info, Warning, Success, Danger alert variants)
  - `TableBlock` (Interactive AST matrix table with dynamic cell editing)
  - `TaskBlock` (Checklist items with automatic percentage progress tracking)
  - `MathDiagramBlock` (LaTeX math formula node renderer)

### 2. 👥 Real-Time Multi-User Collaboration & Presence (Week 2 Scope)
- **Collaborator Presence Badges**: Avatars, typing status indicators, and role badges.
- **Visual Block-State Indicators**: Displays active user lock tags (`🔒 Dave Miller is editing...`) with glowing borders around locked blocks.
- **Yjs WebSocket Routing Engine**: Event routing layer broadcasting `NODE_MUTATE`, `BLOCK_LOCK`, and `CRDT_VECTOR_SYNC`.

### 3. 🔀 Dual-User Split Simulator View (Mid-Project Review)
- **Side-by-Side Live Simulator**: User A (Frontend Lead) and User B (Backend Architect) edit simultaneously on screen to prove zero-overwrite data convergence.

### 4. 🕸️ Live Interactive 2D AST Node Tree Graph
- **Visual Tree Hierarchy**: SVG/Canvas node graph displaying `RootDocument` → `Category Branches` → `Leaf AST Blocks`.
- **JSON Schema Inspector**: Formatted AST JSON viewer with one-click copy capability.

### 5. 📊 CRDT Network Matrix & Telemetry
- Real-time telemetry dashboard tracking `Vector Clock`, `Ops/sec`, `Ping (ms)`, and `Conflict Loss Rate (0.00%)` with interactive conflict simulation.

### 🎨 Dynamic Design System & Theme Selector
- 🔮 **Midnight Violet** (Electric Violet & Pink Dark Theme)
- 👑 **Cyber Gold** (Luxury Amber & Gold Dark Theme)
- ☀️ **Pearl Light** (Clean Glassmorphism Light Theme)

---

## 👥 Internship Team & Branch Structure

| Name | Role | Responsibilities | Git Branch |
| :--- | :--- | :--- | :--- |
| **Jyoti** | **Frontend Team Lead** | AST Block Editor, UI Architecture, Presence & CRDT Matrix | `Frontend-jyoti` |
| **Harshit** | **Frontend Developer** | Document Browser, Theme Presets, AST Graph Visualizer | `Frontend-harshit` |
| **Nikhil** | **Backend Architect** | Express API, Socket.io & Yjs WebSocket Routing | `Backend-nikhil` |
| **Nandini** | **Database Engineer** | MongoDB AST Schema, Mongoose Recursive Hooks | `Backend-nandini` |

---

## 📅 Timeline & Development Milestones

| Timeline | Backend Scope | Frontend Scope |
| :--- | :--- | :--- |
| **Week 1** | AST Modeling: Nested MongoDB schemas | **Editor Foundations**: React UI for document browsing & block text rendering |
| **Week 2** | CRDT Integration: WebSocket routing layer | **Sync Implementation**: Yjs WebSocket client connection & presence locks |
| **Mid-Project** | Sanity Checks: Stress test 10 concurrent clients | **Delta Tracking**: Prove zero-overwrite handling for incoming deltas |
| **Week 3** | Transformation Engine: PDF/HTML compilation | **Block Management**: Atomic state tracking & cursor selection bounds |
| **Week 4** | Security Hardening: DOMPurify XSS controls | **Refine & Polish**: Visual block state indicators & real-time cursor sync |

---

## 🚀 Quick Start & Installation

### Option 1: Development Server (Vite)

```bash
# Clone the repository
git clone https://github.com/Harshitrop/SyncDoc.git
cd SyncDoc

# Switch to Frontend branch
git checkout Frontend-jyoti

# Install dependencies
npm install

# Run Vite local development server
npm run dev
```

Open your browser at `http://localhost:3000`.

### Option 2: Standalone Live Preview (Zero-Dependency)

Double-click **`standalone.html`** in your project folder to run the complete interactive platform in any web browser without needing Node.js or `npm`.

---

## 📄 License & Acknowledgments

Built for Internship Project 2: **SyncDoc Collaborative Document Engine**. Developed with React, TypeScript, Vite, Tailwind CSS, and Yjs CRDT architecture.
