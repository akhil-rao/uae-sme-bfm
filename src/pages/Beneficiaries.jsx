import React from 'react';
import beneficiaries from '../data/beneficiaries.json';

const Beneficiaries = () => {
  const types = ['Supplier', 'Utilities', 'Government'];
  return (
    <div className="space-y-6">
      {types.map((type) => (
        <div key={type} className="card">
          <div className="flex items-center justify-between mb-3">
            <p className="font-semibold text-primary">{type}</p>
            <span className="text-xs text-slate-500">{beneficiaries.filter((b) => b.type === type).length} records</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {beneficiaries
              .filter((b) => b.type === type)
              .map((b) => (
                <div key={b.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50">
                  <p className="font-semibold text-primary">{b.name}</p>
                  <p className="text-xs text-slate-500">{b.iban}</p>
                  <p className="text-xs text-slate-500">{b.bank}</p>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Beneficiaries;
