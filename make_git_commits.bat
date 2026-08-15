@echo off
echo ========================================================
echo   SyncDoc Git Setup for Branch: Frontend-jyoti
echo   Repo: https://github.com/Harshitrop/SyncDoc.git
echo ========================================================

git init

git add package.json tsconfig.json vite.config.ts tailwind.config.js postcss.config.js .gitignore .vscode/
git commit -m "feat(init): Initialize Vite + React + TypeScript + Tailwind project scaffold"

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

git add src/components/ASTInspector/ASTGraph.tsx src/components/ASTInspector/JSONInspector.tsx src/App.tsx src/main.tsx index.html standalone.html src/index.css
git commit -m "feat(theme): Upgrade design system with Midnight Violet, Gold, and Pearl Light theme presets"

git branch -M Frontend-jyoti
git remote remove origin 2>nul
git remote add origin https://github.com/Harshitrop/SyncDoc.git

echo ========================================================
echo   SUCCESS! 10 Commits Created for branch Frontend-jyoti
echo   Now run: git push -u origin Frontend-jyoti --force
echo ========================================================
