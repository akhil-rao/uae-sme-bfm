import React from 'react';
import transactions from '../data/transactions.json';
import { groupByCounterparty, groupByCategory } from '../utils/group.js';
import { formatCurrency } from '../utils/format.js';

const Suppliers = () => {
  const suppliers = groupByCounterparty(transactions, 'outflow').slice(0, 10);
  const categories = groupByCategory(transactions.filter((t) => t.amount < 0)).slice(0, 6);

  return (
    <div className="space-y-6">
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <p className="font-semibold text-primary">Top Suppliers</p>
          <span className="text-xs text-slate-500">By outflow value</span>
        </div>
        <div className="space-y-3">
          {suppliers.map((sup, idx) => (
            <div key={sup.name} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">#{idx + 1}</div>
                <div>
                  <p className="font-semibold text-primary">{sup.name}</p>
                  <p className="text-xs text-slate-500">{sup.count} payments</p>
                </div>
              </div>
              <p className="font-semibold">{formatCurrency(sup.total)}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-3">
          <p className="font-semibold text-primary">Spending by Category</p>
          <span className="text-xs text-slate-500">Top 6 categories</span>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {categories.map((cat) => (
            <div key={cat.category} className="p-4 rounded-xl bg-slate-50">
              <p className="font-semibold text-primary">{cat.category}</p>
              <p className="text-xs text-slate-500">{cat.count} bills</p>
              <p className="font-semibold mt-1">{formatCurrency(Math.abs(cat.total))}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Suppliers;
