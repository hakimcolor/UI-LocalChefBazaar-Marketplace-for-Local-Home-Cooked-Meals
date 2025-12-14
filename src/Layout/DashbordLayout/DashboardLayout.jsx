// src/Layout/DashbordLayout/DashboardLayout.jsx
import React from 'react';
import { Outlet } from 'react-router';
import UserAside from '../../Componentes/Asideber/UserAside';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-[260px_1fr] bg-[#FFF8F2]">
      <title>LocalChefBazaar || dashbord</title>
      {/* Sidebar */}
      <aside className="border-r border-[#f1e3d6] bg-white sticky top-0 h-screen hidden md:block">
        <UserAside />
      </aside>

      {/* Mobile Sidebar – optional */}
      <div className="md:hidden">
        <UserAside />
      </div>

      {/* Content */}
      <main className="p-5 md:p-8">
        <div className="max-w-5xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
