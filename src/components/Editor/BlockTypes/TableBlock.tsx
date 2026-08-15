import React from 'react';
import { ASTNode } from '../../../types/ast';

interface TableBlockProps {
  node: ASTNode;
  isLocked: boolean;
  onUpdateTableData: (tableData: string[][]) => void;
}

export const TableBlock: React.FC<TableBlockProps> = ({ node, isLocked, onUpdateTableData }) => {
  const tableData = node.tableData || [
    ['Header 1', 'Header 2'],
    ['Cell 1', 'Cell 2']
  ];

  const handleCellChange = (rowIndex: number, colIndex: number, value: string) => {
    const updated = tableData.map((row, rIdx) =>
      row.map((cell, cIdx) => (rIdx === rowIndex && cIdx === colIndex ? value : cell))
    );
    onUpdateTableData(updated);
  };

  return (
    <div className="my-4 overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/80 p-3 shadow-lg">
      <div className="text-xs font-semibold text-slate-400 mb-2 flex items-center justify-between">
        <span>📊 AST Structural Node: Table Matrix</span>
        <span className="text-[10px] font-mono text-cyan-400">{tableData.length} Rows × {tableData[0]?.length || 0} Cols</span>
      </div>

      <table className="w-full text-xs text-left border-collapse">
        <thead>
          <tr className="border-b border-slate-800 bg-slate-900/90 text-slate-300 font-semibold">
            {tableData[0]?.map((colHeader, cIdx) => (
              <th key={cIdx} className="p-2.5">
                <input
                  disabled={isLocked}
                  type="text"
                  value={colHeader}
                  onChange={(e) => handleCellChange(0, cIdx, e.target.value)}
                  className="bg-transparent font-bold text-cyan-300 focus:outline-none w-full"
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.slice(1).map((row, rIdx) => (
            <tr key={rIdx + 1} className="border-b border-slate-800/40 hover:bg-slate-900/40 transition-colors">
              {row.map((cell, cIdx) => (
                <td key={cIdx} className="p-2.5">
                  <input
                    disabled={isLocked}
                    type="text"
                    value={cell}
                    onChange={(e) => handleCellChange(rIdx + 1, cIdx, e.target.value)}
                    className="bg-transparent text-slate-200 focus:outline-none w-full"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
