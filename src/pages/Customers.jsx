import React from 'react';
import transactions from '../data/transactions.json';
import merchant from '../data/merchant.json';
import { groupByCounterparty } from '../utils/group.js';
import { formatCurrency } from '../utils/format.js';

const Customers = () => {
  const customers = groupByCounterparty(transactions, 'inflow').slice(0, 10);

  return (
    <div className="space-y-6">
      <div className="card">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs text-slate-500">Merchant POS</p>
            <p className="font-bold text-primary">{merchant.name}</p>
          </div>
          <span className="badge">{merchant.location}</span>
        </div>
        <div className="grid grid-cols-4 gap-4 text-sm text-slate-600">
          <div>
            <p className="text-xs text-slate-500">Monthly Volume</p>
            <p className="font-semibold text-primary">{formatCurrency(merchant.monthlyVolume)}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Average Ticket</p>
            <p className="font-semibold text-primary">{formatCurrency(merchant.averageTicket)}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Top Card</p>
            <p className="font-semibold text-primary">{merchant.topCard}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Settlement Account</p>
            <p className="font-semibold text-primary">{merchant.settlementAccount}</p>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <p className="font-semibold text-primary">Top Customers</p>
          <span className="text-xs text-slate-500">Based on inflow volume</span>
        </div>
        <div className="space-y-3">
          {customers.map((cust, idx) => (
            <div key={cust.name} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-light text-primary flex items-center justify-center font-bold">#{idx + 1}</div>
                <div>
                  <p className="font-semibold text-primary">{cust.name}</p>
                  <p className="text-xs text-slate-500">{cust.count} credits</p>
                </div>
              </div>
              <p className="font-semibold">{formatCurrency(cust.total)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Customers;
