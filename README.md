# SyncDoc
A collaborative document engine featuring AST conflict resolution to prevent destructive overwrites during simultaneous multi-user editing.

Project Overview
SyncDoc is a Collaborative Document Engine designed to solve the problem of destructive overwrites and sync conflicts in multi-user text editors. Because plain text merging is often insufficient for complex structural documents, SyncDoc ensures no work is lost when multiple users edit the same document simultaneously.

Key Features & Modules

Conflict Resolution: The system uses AST conflict resolution to ensure that concurrent edits (such as one user typing a paragraph while another adds a code block) are preserved without layout-destructive overwrites.

Live Visual Indicators: Both users are provided with live visual block state indicators that show who is editing what in real-time.

Custom Editor UI: The frontend is a block-based text interface built in React. It matches incoming AST node changes without triggering full text-area rebuilds.

Synchronization Engine: This routing layer utilizes Node.js and Yjs. It relies on Conflict-free Replicated Data Type (CRDT) matrix architectures over WebSockets.

AST Database: The database relies on Express and Mongoose. It uses complex, nested schemas for handling structural document nodes alongside deep pre-save hook validation.

Transformation Pipeline & Security: Backend utilities built with Node.js and DOMPurify safely compile AST trees into PDF or HTML formats. This pipeline actively blocks XSS injection fragments to ensure security.
