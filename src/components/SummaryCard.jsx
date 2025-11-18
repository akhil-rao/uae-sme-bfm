import React from 'react';

const SummaryCard = ({ title, value, helper, icon }) => (
  <div className="card flex justify-between items-start">
    <div>
      <p className="text-slate-500 text-sm">{title}</p>
      <p className="text-2xl font-bold text-primary mt-2">{value}</p>
      {helper && <p className="text-xs text-slate-500 mt-2">{helper}</p>}
    </div>
    {icon && <div className="h-11 w-11 rounded-xl bg-light text-primary flex items-center justify-center">{icon}</div>}
  </div>
);

export default SummaryCard;
