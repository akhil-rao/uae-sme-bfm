import React from 'react';
import { Bell, Search, User } from 'lucide-react';

const Topbar = () => (
  <header className="flex items-center justify-between mb-8">
    <div>
      <p className="text-slate-500 text-sm">Welcome back</p>
      <h1 className="text-2xl font-bold text-primary">Morning, Finance Team</h1>
    </div>
    <div className="flex items-center gap-4">
      <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-card min-w-[320px]">
        <Search size={18} className="text-slate-400" />
        <input
          type="text"
          placeholder="Search transactions, accounts, people"
          className="flex-1 px-3 py-2 outline-none text-sm"
        />
      </div>
      <button className="relative bg-white h-11 w-11 rounded-2xl shadow-card flex items-center justify-center text-primary">
        <Bell size={18} />
        <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500" />
      </button>
      <div className="flex items-center gap-2 bg-white rounded-2xl px-3 py-2 shadow-card">
        <div className="h-10 w-10 bg-primary text-white rounded-xl flex items-center justify-center">
          <User size={20} />
        </div>
        <div>
          <p className="font-semibold text-primary leading-4">Gulf Traders LLC</p>
          <p className="text-xs text-slate-500">Corporate</p>
        </div>
      </div>
    </div>
  </header>
);

export default Topbar;
