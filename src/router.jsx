import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard.jsx';
import Accounts from './pages/Accounts.jsx';
import Transactions from './pages/Transactions.jsx';
import Cashflow from './pages/Cashflow.jsx';
import Beneficiaries from './pages/Beneficiaries.jsx';
import Customers from './pages/Customers.jsx';
import Suppliers from './pages/Suppliers.jsx';

const Router = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/dashboard" replace />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/accounts" element={<Accounts />} />
    <Route path="/transactions" element={<Transactions />} />
    <Route path="/cashflow" element={<Cashflow />} />
    <Route path="/beneficiaries" element={<Beneficiaries />} />
    <Route path="/customers" element={<Customers />} />
    <Route path="/suppliers" element={<Suppliers />} />
  </Routes>
);

export default Router;
