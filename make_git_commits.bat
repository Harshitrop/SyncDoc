@echo off
echo ========================================================
echo   SyncDoc Full-Stack Final Review Setup (Week 1 - Week 4)
echo   Branch: Frontend-jyoti
echo   Repo: https://github.com/Harshitrop/SyncDoc.git
echo ========================================================

git init

git add package.json tsconfig.json vite.config.ts tailwind.config.js postcss.config.js .gitignore .vscode/ README.md
git commit -m "feat(init): Initialize Vite + React + TypeScript + Tailwind project scaffold with README"

git add src/types/ast.ts src/vite-env.d.ts
git commit -m "feat(types): Define AST Node schema, CRDT log entry, and User Presence interfaces"

git add src/mock/sampleDoc.ts
git commit -m "feat(mock): Create initial Technical Specification AST document dataset"

git add src/components/ui/Icons.tsx src/components/Editor/InlineToolbar.tsx
git commit -m "feat(ui): Build SVG icon library and floating context inline formatting toolbar"

git add src/components/Editor/BlockTypes/
git commit -m "feat(blocks): Implement 7 core AST block types (Headings, Paragraphs, Code, Callouts, Tables, Tasks, Math)"

git add src/hooks/useASTEditor.ts src/components/Editor/BlockItem.tsx src/components/Editor/BlockEditor.tsx
git commit -m "feat(editor): Build atomic block-level editor container and targeted re-rendering engine"

git add src/services/api.ts src/services/websocket.ts src/hooks/useCollaboration.ts
git commit -m "feat(crdt): Integrate Yjs WebSocket sync adapter and CRDT operational vector clock"

git add src/components/Header.tsx src/components/Sidebar.tsx src/components/InviteModal.tsx
git commit -m "feat(presence): Implement active user avatars, typing indicators, and remote block locks"

git add src/components/SplitSimulator.tsx src/components/CRDTMatrix/NetworkDeltas.tsx
git commit -m "feat(simulator): Build dual-user split simulator view for real-time concurrent editing demo"

git add backend/
git commit -m "feat(backend): Build Express REST & Socket.io CRDT server, Mongoose AST model & DOMPurify pipeline"

git add src/components/SecurityPipeline/ src/components/VersionHistory/ src/components/ASTInspector/ src/App.tsx src/main.tsx index.html standalone.html src/index.css SyncDoc_Mid_Review_Presentation_Guide.html SyncDoc_Mid_Review_Presentation_Guide.md SyncDoc_Weekly_WriteUp_Week1_to_Week4.md
git commit -m "feat(final): Complete Week 3 & Week 4 polish with DOMPurify XSS guard, Version History & human theme design"

git branch -M Frontend-jyoti
git remote remove origin 2>nul
git remote add origin https://github.com/Harshitrop/SyncDoc.git

echo ========================================================
echo   SUCCESS! Final Commits Created for branch Frontend-jyoti
echo   Now run: git push -u origin Frontend-jyoti --force
echo ========================================================
