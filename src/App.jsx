import React from 'react';
import Sidebar from './components/Sidebar.jsx';
import Topbar from './components/Topbar.jsx';
import Router from './router.jsx';

const App = () => (
  <div className="flex bg-light">
    <Sidebar />
    <main className="flex-1 p-8 overflow-auto">
      <Topbar />
      <Router />
    </main>
  </div>
);

export default App;
