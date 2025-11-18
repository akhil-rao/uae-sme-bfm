import React from 'react';
import accounts from '../data/accounts.json';
import loans from '../data/loans.json';
import { formatCurrency } from '../utils/format.js';
import Table from '../components/Table.jsx';

const Accounts = () => {
  const columns = [
    { key: 'bank', label: 'Bank' },
    { key: 'name', label: 'Account Name' },
    { key: 'accountNumber', label: 'IBAN' },
    { key: 'type', label: 'Type' },
    { key: 'balance', label: 'Balance', render: (v) => formatCurrency(v) },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        {accounts.map((acc) => (
          <div key={acc.id} className="card">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-xs text-slate-500">{acc.bank}</p>
                <p className="font-bold text-primary">{acc.name}</p>
              </div>
              <span className="badge">{acc.type}</span>
            </div>
            <p className="text-sm text-slate-500">{acc.accountNumber}</p>
            <p className="text-2xl font-bold text-primary mt-3">{formatCurrency(acc.balance)}</p>
          </div>
        ))}
      </div>

      <Table columns={columns} data={accounts} />

      <div className="card">
        <div className="flex items-center justify-between mb-3">
          <p className="font-semibold text-primary">Loans & Facilities</p>
          <span className="text-xs text-slate-500">Committed</span>
        </div>
        <div className="space-y-4">
          {loans.map((loan) => (
            <div key={loan.id} className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-primary">{loan.lender}</p>
                <p className="text-xs text-slate-500">Start {loan.startDate} • {loan.tenureMonths} months</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">Balance {formatCurrency(loan.balance)}</p>
                <p className="text-xs text-slate-500">Rate {loan.rate}% • EMI {formatCurrency(loan.monthlyPayment)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Accounts;
