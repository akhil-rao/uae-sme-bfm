import React from 'react';
import transactions from '../data/transactions.json';
import { buildCashflowTrend } from '../utils/group.js';
import { formatCurrency } from '../utils/format.js';
import LineChart from '../components/LineChart.jsx';

const Cashflow = () => {
  const trend = buildCashflowTrend(transactions);
  const latest = trend[trend.length - 1] || { inflow: 0, outflow: 0, net: 0 };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div className="card">
          <p className="text-slate-500 text-sm">Latest Inflow</p>
          <p className="text-3xl font-bold text-primary">{formatCurrency(latest.inflow)}</p>
        </div>
        <div className="card">
          <p className="text-slate-500 text-sm">Latest Outflow</p>
          <p className="text-3xl font-bold text-primary">{formatCurrency(latest.outflow)}</p>
        </div>
        <div className="card">
          <p className="text-slate-500 text-sm">Net</p>
          <p className={`text-3xl font-bold ${latest.net >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {formatCurrency(latest.net)}
          </p>
        </div>
      </div>
      <LineChart data={trend} />
    </div>
  );
};

export default Cashflow;
