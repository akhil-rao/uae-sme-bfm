import React, { useMemo, useState } from 'react';
import transactionsData from '../data/transactions.json';
import { formatCurrency, formatDate } from '../utils/format.js';
import Table from '../components/Table.jsx';

const pageSize = 10;

const Transactions = () => {
  const [search, setSearch] = useState('');
  const [type, setType] = useState('all');
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState('date');
  const [sortDir, setSortDir] = useState('desc');

  const filtered = useMemo(() => {
    const dataset = transactionsData
      .filter((tx) =>
        search
          ? `${tx.description} ${tx.counterparty} ${tx.category}`.toLowerCase().includes(search.toLowerCase())
          : true
      )
      .filter((tx) => (type === 'all' ? true : type === 'inflow' ? tx.amount > 0 : tx.amount < 0));

    const sorted = [...dataset].sort((a, b) => {
      const dir = sortDir === 'asc' ? 1 : -1;
      if (sortKey === 'date') return dir * (new Date(a.date) - new Date(b.date));
      if (sortKey === 'amount') return dir * (a.amount - b.amount);
      return dir * String(a[sortKey] || '').localeCompare(String(b[sortKey] || ''));
    });
    return sorted;
  }, [search, type, sortDir, sortKey]);

  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const pageData = filtered.slice((page - 1) * pageSize, page * pageSize);

  const columns = [
    { key: 'date', label: 'Date', render: (v) => formatDate(v), sortable: true },
    { key: 'description', label: 'Description', sortable: true },
    { key: 'counterparty', label: 'Counterparty', sortable: true },
    { key: 'category', label: 'Category', sortable: true },
    {
      key: 'amount',
      label: 'Amount',
      sortable: true,
      render: (v) => <span className={v > 0 ? 'text-green-600' : 'text-red-600'}>{formatCurrency(v)}</span>,
    },
  ];

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  return (
    <div className="space-y-4">
      <div className="card flex items-center gap-4">
        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          placeholder="Search description, counterparty, category"
          className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none"
        />
        <select
          value={type}
          onChange={(e) => {
            setType(e.target.value);
            setPage(1);
          }}
          className="px-4 py-3 rounded-xl border border-slate-200 bg-white"
        >
          <option value="all">All</option>
          <option value="inflow">Inflow</option>
          <option value="outflow">Outflow</option>
        </select>
      </div>

      <Table columns={columns} data={pageData} sortKey={sortKey} sortDir={sortDir} onSort={handleSort} />

      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">
          Showing {(page - 1) * pageSize + 1}-{Math.min(page * pageSize, filtered.length)} of {filtered.length}
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="px-4 py-2 rounded-lg bg-white shadow-card disabled:opacity-50"
            disabled={page === 1}
          >
            Prev
          </button>
          <span className="text-sm font-semibold text-primary">
            Page {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="px-4 py-2 rounded-lg bg-white shadow-card disabled:opacity-50"
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
