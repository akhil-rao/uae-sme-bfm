import React from 'react';
import { ArrowDownRight, ArrowUpRight, ShieldAlert, Trophy, Truck } from 'lucide-react';
import accounts from '../data/accounts.json';
import transactions from '../data/transactions.json';
import beneficiaries from '../data/beneficiaries.json';
import { formatCurrency } from '../utils/format.js';
import { buildCashflowTrend, groupByCategory, groupByCounterparty } from '../utils/group.js';
import SummaryCard from '../components/SummaryCard.jsx';
import LineChart from '../components/LineChart.jsx';

const Dashboard = () => {
  const totalCash = accounts.reduce((sum, acc) => sum + acc.balance, 0);
  const inflow = transactions.filter((t) => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
  const outflow = transactions.filter((t) => t.amount < 0).reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const topCustomer = groupByCounterparty(transactions, 'inflow')[0];
  const topSupplier = groupByCounterparty(transactions, 'outflow')[0];
  const categorySpend = groupByCategory(transactions.filter((t) => t.amount < 0)).slice(0, 5);
  const alerts = [
    ...accounts.filter((acc) => acc.balance < 50000).map((acc) => ({
      type: 'warning',
      message: `${acc.name} is below AED 50K threshold`,
    })),
    ...transactions
      .filter((tx) => tx.amount < -75000)
      .slice(0, 3)
      .map((tx) => ({ type: 'danger', message: `Large debit ${formatCurrency(Math.abs(tx.amount))} to ${tx.counterparty}` })),
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-5 gap-4">
        <SummaryCard title="Total Cash" value={formatCurrency(totalCash)} helper="Across all accounts" icon={<ArrowUpRight />} />
        <SummaryCard title="Inflow (YTD)" value={formatCurrency(inflow)} helper="Collections & POS" icon={<ArrowUpRight />} />
        <SummaryCard title="Outflow (YTD)" value={formatCurrency(outflow)} helper="Payroll, suppliers, rent" icon={<ArrowDownRight />} />
        <SummaryCard
          title="Top Customer"
          value={topCustomer ? `${topCustomer.name}` : 'N/A'}
          helper={topCustomer ? formatCurrency(topCustomer.total) : ''}
          icon={<Trophy />}
        />
        <SummaryCard
          title="Top Supplier"
          value={topSupplier ? topSupplier.name : 'N/A'}
          helper={topSupplier ? formatCurrency(topSupplier.total) : ''}
          icon={<Truck />}
        />
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <LineChart data={buildCashflowTrend(transactions)} />
        </div>
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <p className="font-semibold text-primary">Alerts</p>
            <span className="badge">Live</span>
          </div>
          <div className="space-y-3">
            {alerts.map((alert, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-3 p-3 rounded-xl ${
                  alert.type === 'danger' ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700'
                }`}
              >
                <ShieldAlert size={18} />
                <p className="text-sm leading-relaxed">{alert.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="card col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-primary">Category Spending</h3>
            <span className="text-xs text-slate-500">Top 5</span>
          </div>
          <div className="space-y-3">
            {categorySpend.map((cat) => (
              <div key={cat.category} className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-primary">{cat.category}</p>
                  <p className="text-xs text-slate-500">{cat.count} transactions</p>
                </div>
                <p className="font-semibold">{formatCurrency(Math.abs(cat.total))}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <h3 className="font-semibold text-primary mb-3">Beneficiaries</h3>
          <div className="space-y-3">
            {beneficiaries.slice(0, 5).map((b) => (
              <div key={b.id} className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-primary">{b.name}</p>
                  <p className="text-xs text-slate-500">{b.type}</p>
                </div>
                <span className="badge">{b.bank}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
