import React from 'react';
import './Sidebar.css';
import { Home, PlusCircle, LayoutDashboard, BarChart2, FileText, Users } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export const Sidebar: React.FC = () => {
  const menuItems = [
    { icon: <Home size={22} />, path: '/', label: 'Home' },
    { icon: <PlusCircle size={22} />, path: '/create', label: 'Create' },
    { icon: <LayoutDashboard size={22} />, path: '/dashboard', label: 'Dashboard' },
    { icon: <BarChart2 size={22} />, path: '/analytics', label: 'Analytics' },
    { icon: <FileText size={22} />, path: '/reports', label: 'Reports' },
    { icon: <Users size={22} />, path: '/users', label: 'Users' },
  ];

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {menuItems.map((item, index) => (
          <NavLink 
            key={index} 
            to={item.path} 
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            title={item.label}
          >
            {item.icon}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
