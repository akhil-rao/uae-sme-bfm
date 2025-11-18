import React from 'react';
import { LineChart as ReLineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { formatCurrency } from '../utils/format.js';

const LineChart = ({ data }) => (
  <div className="card h-80">
    <ResponsiveContainer width="100%" height="100%">
      <ReLineChart data={data} margin={{ top: 20, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey="month" tick={{ fill: '#334155', fontSize: 12 }} />
        <YAxis tickFormatter={(v) => formatCurrency(v).replace('AED', 'AED ')} tick={{ fill: '#334155', fontSize: 12 }} />
        <Tooltip formatter={(value) => formatCurrency(value)} labelStyle={{ color: '#0A3D62' }} />
        <Legend />
        <Line type="monotone" dataKey="inflow" stroke="#1B7FCC" strokeWidth={3} dot={false} name="Inflow" />
        <Line type="monotone" dataKey="outflow" stroke="#94a3b8" strokeWidth={3} dot={false} name="Outflow" />
        <Line type="monotone" dataKey="net" stroke="#0A3D62" strokeWidth={3} dot={false} name="Net" />
      </ReLineChart>
    </ResponsiveContainer>
  </div>
);

export default LineChart;
