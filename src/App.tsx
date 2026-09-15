import React, { useState } from 'react';
import { useASTEditor } from './hooks/useASTEditor';
import { useCollaboration } from './hooks/useCollaboration';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { BlockEditor } from './components/Editor/BlockEditor';
import { ASTGraph } from './components/ASTInspector/ASTGraph';
import { JSONInspector } from './components/ASTInspector/JSONInspector';
import { NetworkDeltas } from './components/CRDTMatrix/NetworkDeltas';
import { SplitSimulator } from './components/SplitSimulator';
import { InviteModal } from './components/InviteModal';
import { DOMPurifyModal } from './components/SecurityPipeline/DOMPurifyModal';
import { HistoryTimeline } from './components/VersionHistory/HistoryTimeline';

export function App() {
  const {
    doc,
    activeNodeId,
    setActiveNodeId,
    updateNodeContent,
    updateTableData,
    toggleTaskChecked,
    addNodeAfter,
    deleteNode
  } = useASTEditor();

  const {
    collaborators,
    crdtLogs,
    telemetry,
    simulateRemoteTyping,
    triggerConflictSimulation
  } = useCollaboration();

  const [activeView, setActiveView] = useState<'editor' | 'ast' | 'crdt'>('editor');
  const [isSplitView, setIsSplitView] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [isSecurityOpen, setIsSecurityOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  };

  const handleSimulateTyping = () => {
    const targetNodeId = activeNodeId || 'node-p1';
    simulateRemoteTyping('usr-backend-1', targetNodeId);
  };

  return (
    <div className={`h-screen w-screen flex flex-col overflow-hidden ${isDarkMode ? 'dark bg-cyber-950 text-slate-100' : 'light bg-slate-100 text-slate-900'}`}>
      {/* Top Header Navigation */}
      <Header
        title={doc.title}
        version={doc.version}
        collaborators={collaborators}
        telemetry={telemetry}
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
        isSplitView={isSplitView}
        onToggleSplitView={() => setIsSplitView(!isSplitView)}
        activeView={activeView}
        onChangeView={(view) => {
          setActiveView(view);
          setIsSplitView(false);
        }}
        onOpenInvite={() => setIsInviteOpen(true)}
        onOpenSecurity={() => setIsSecurityOpen(true)}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onTriggerConflictDemo={triggerConflictSimulation}
      />

      {/* Workspace Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar Dashboard */}
        <Sidebar
          telemetry={telemetry}
          collaborators={collaborators}
          onSimulateTyping={handleSimulateTyping}
          onSimulateConflict={triggerConflictSimulation}
          activeView={activeView}
          onChangeView={(view) => {
            setActiveView(view);
            setIsSplitView(false);
          }}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden bg-slate-950/40 relative">
          {isSplitView ? (
            <SplitSimulator
              doc={doc}
              collaborators={collaborators}
              activeNodeId={activeNodeId}
              onSetActiveNodeId={setActiveNodeId}
              onUpdateContent={updateNodeContent}
              onUpdateTableData={updateTableData}
              onToggleTaskChecked={toggleTaskChecked}
              onAddBlockAfter={addNodeAfter}
              onDeleteNode={deleteNode}
              onTriggerConflict={triggerConflictSimulation}
            />
          ) : activeView === 'editor' ? (
            <BlockEditor
              doc={doc}
              activeNodeId={activeNodeId}
              onSetActiveNodeId={setActiveNodeId}
              collaborators={collaborators}
              onUpdateContent={updateNodeContent}
              onUpdateTableData={updateTableData}
              onToggleTaskChecked={toggleTaskChecked}
              onAddBlockAfter={addNodeAfter}
              onDeleteNode={deleteNode}
            />
          ) : activeView === 'ast' ? (
            <div className="p-4 md:p-6 flex-1 h-full min-h-0 grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-hidden">
              <div className="lg:col-span-2 h-full flex flex-col min-h-0">
                <ASTGraph
                  doc={doc}
                  activeNodeId={activeNodeId}
                  onSelectNode={(nodeId) => setActiveNodeId(nodeId)}
                />
              </div>
              <div className="h-full hidden lg:flex flex-col min-h-0">
                <JSONInspector doc={doc} />
              </div>
            </div>
          ) : (
            <div className="p-4 md:p-6 h-full overflow-hidden">
              <NetworkDeltas
                logs={crdtLogs}
                telemetry={telemetry}
                onTriggerConflict={triggerConflictSimulation}
              />
            </div>
          )}
        </div>
      </div>

      {/* Collaborator Invite Modal */}
      <InviteModal
        isOpen={isInviteOpen}
        onClose={() => setIsInviteOpen(false)}
        collaborators={collaborators}
      />

      {/* DOMPurify Security & PDF Modal (Week 3 & 4) */}
      <DOMPurifyModal
        isOpen={isSecurityOpen}
        onClose={() => setIsSecurityOpen(false)}
        doc={doc}
      />

      {/* Time Travel Version History Modal (Week 4) */}
      <HistoryTimeline
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        doc={doc}
      />
    </div>
  );
}

export default App;
