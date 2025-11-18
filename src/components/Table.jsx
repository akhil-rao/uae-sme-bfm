import React from 'react';

const Table = ({ columns = [], data = [], sortKey, sortDir, onSort }) => (
  <div className="card overflow-hidden">
    <table className="w-full text-left">
      <thead className="bg-light text-primary text-sm">
        <tr>
          {columns.map((col) => (
            <th
              key={col.key}
              className={`px-4 py-3 font-semibold ${col.sortable ? 'cursor-pointer select-none' : ''}`}
              onClick={() => col.sortable && onSort && onSort(col.key)}
            >
              <span className="inline-flex items-center gap-1">
                {col.label}
                {col.sortable && sortKey === col.key && <span>{sortDir === 'asc' ? '▲' : '▼'}</span>}
              </span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100">
        {data.map((row, idx) => (
          <tr key={idx} className="hover:bg-slate-50">
            {columns.map((col) => (
              <td key={col.key} className="px-4 py-3 text-sm text-slate-700">
                {col.render ? col.render(row[col.key], row) : row[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Table;
