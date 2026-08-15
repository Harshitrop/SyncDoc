import React, { useState } from 'react';
import { DocumentAST } from '../../types/ast';
import { CodeIcon, CheckIcon } from '../ui/Icons';

interface JSONInspectorProps {
  doc: DocumentAST;
}

export const JSONInspector: React.FC<JSONInspectorProps> = ({ doc }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(doc, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full h-full min-h-0 overflow-hidden glass-panel rounded-2xl border border-slate-800/80 p-4 md:p-6 flex flex-col space-y-3">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2">
          <CodeIcon className="w-5 h-5 text-cyan-400" />
          <h3 className="font-heading font-bold text-base text-white">Live AST JSON Schema</h3>
        </div>
        <button
          onClick={handleCopy}
          className="px-3 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all flex items-center space-x-1"
        >
          {copied ? (
            <>
              <CheckIcon className="w-3.5 h-3.5 text-emerald-400" />
              <span>Copied JSON</span>
            </>
          ) : (
            <span>Copy Schema</span>
          )}
        </button>
      </div>

      <pre className="flex-1 overflow-y-auto p-4 rounded-xl bg-slate-950 text-cyan-300 font-mono text-xs leading-relaxed border border-slate-800">
        {JSON.stringify(doc, null, 2)}
      </pre>
    </div>
  );
};
