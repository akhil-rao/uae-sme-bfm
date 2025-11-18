import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, CreditCard, Shuffle, Activity, Users, Truck, Gift } from 'lucide-react';

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: Home },
  { to: '/accounts', label: 'Accounts', icon: CreditCard },
  { to: '/transactions', label: 'Transactions', icon: Shuffle },
  { to: '/cashflow', label: 'Cashflow', icon: Activity },
  { to: '/beneficiaries', label: 'Beneficiaries', icon: Gift },
  { to: '/customers', label: 'Customers', icon: Users },
  { to: '/suppliers', label: 'Suppliers', icon: Truck },
];

const Sidebar = () => (
  <aside className="w-64 min-h-screen bg-white shadow-card sticky top-0">
    <div className="px-6 py-8 border-b border-slate-100">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-2xl bg-primary text-white flex items-center justify-center font-bold text-xl">
          BFM
        </div>
        <div>
          <p className="text-primary font-bold text-lg">UAE SME BFM</p>
          <p className="text-slate-500 text-sm">Business Finance Manager</p>
        </div>
      </div>
    </div>
    <nav className="p-4 flex flex-col gap-2">
      {links.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all hover:bg-light hover:text-primary ${
              isActive ? 'link-active' : 'text-slate-700'
            }`
          }
        >
          <Icon size={18} />
          {label}
        </NavLink>
      ))}
    </nav>
    <div className="mt-auto p-4">
      <div className="card">
        <p className="text-sm text-slate-500">Need help?</p>
        <p className="font-semibold text-primary mb-3">Talk to your relationship manager</p>
        <button className="w-full bg-primary text-white py-2 rounded-lg font-semibold shadow-card">Contact</button>
      </div>
    </div>
  </aside>
);

export default Sidebar;
