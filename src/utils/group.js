import { formatDate } from './format.js';

export const groupByCategory = (transactions = []) => {
  const map = new Map();
  transactions.forEach((tx) => {
    const current = map.get(tx.category) || { category: tx.category, total: 0, count: 0 };
    current.total += tx.amount;
    current.count += 1;
    map.set(tx.category, current);
  });
  return Array.from(map.values()).sort((a, b) => Math.abs(b.total) - Math.abs(a.total));
};

export const groupByCounterparty = (transactions = [], type = 'outflow') => {
  const map = new Map();
  const filterFn = type === 'inflow' ? (t) => t.amount > 0 : (t) => t.amount < 0;
  transactions.filter(filterFn).forEach((tx) => {
    const current = map.get(tx.counterparty) || { name: tx.counterparty, total: 0, count: 0 };
    current.total += Math.abs(tx.amount);
    current.count += 1;
    map.set(tx.counterparty, current);
  });
  return Array.from(map.values()).sort((a, b) => b.total - a.total);
};

export const buildCashflowTrend = (transactions = []) => {
  const monthly = new Map();
  transactions.forEach((tx) => {
    const date = new Date(tx.date);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-01`;
    const current = monthly.get(key) || { month: formatDate(key), inflow: 0, outflow: 0 };
    if (tx.amount > 0) {
      current.inflow += tx.amount;
    } else {
      current.outflow += Math.abs(tx.amount);
    }
    monthly.set(key, current);
  });
  return Array.from(monthly.entries())
    .sort((a, b) => new Date(a[0]) - new Date(b[0]))
    .map(([, value]) => ({
      ...value,
      net: value.inflow - value.outflow,
    }));
};
