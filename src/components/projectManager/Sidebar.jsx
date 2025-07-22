import React, { useState } from "react";
import { NavLink, useLocation } from 'react-router-dom';
import { Home, PlusSquare, FolderOpen, Gavel, Users, BarChart2, FileText, MessageCircle, FileDown, IndianRupee, Box, ClipboardList, Truck, CreditCard, History } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';

const menu = [
  { name: 'Dashboard Home', icon: <Home size={22} />, to: '/', color: 'border-blue-500' },
  { name: 'Create Project', icon: <PlusSquare size={22} />, to: '/create-project', color: 'border-blue-500' },
  { name: 'All My Projects', icon: <FolderOpen size={22} />, to: '/all-projects', color: 'border-blue-500' },
  { name: 'Project Monitoring', icon: <BarChart2 size={22} />, to: '/project-monitoring', color: 'border-blue-500' },
  { name: 'Fund Requests', icon: <IndianRupee size={22} />, to: '/fund-requests', color: 'border-teal-500' },
  { name: 'Documents & Blueprints', icon: <FileText size={22} />, to: '/documents-blueprints', color: 'border-orange-500' },
  { name: 'Internal Chat', icon: <MessageCircle size={22} />, to: '/internal-chat', color: 'border-blue-500' },
  { name: 'Export Reports', icon: <FileDown size={22} />, to: '/export-reports', color: 'border-blue-500' },
  { name: 'Product Catalog', icon: <Box size={22} />, to: '/product-catalog', color: 'border-blue-500' },
  { name: 'Incoming Orders', icon: <ClipboardList size={22} />, to: '/incoming-orders', color: 'border-blue-500' },
  { name: 'Delivery Management', icon: <Truck size={22} />, to: '/delivery-management', color: 'border-blue-500' },
  { name: 'Payment & Fund Tracker', icon: <CreditCard size={22} />, to: '/fund-tracker', color: 'border-blue-500' },
  { name: 'Delivery History', icon: <History size={22} />, to: '/delivery-history', color: 'border-blue-500' },
  { name: 'Messaging', icon: <MessageCircle size={22} />, to: '/messaging', color: 'border-blue-500' },
];

export default function Sidebar() {
  const location = useLocation();
  return (
    <aside className="fixed left-0 top-0 h-full w-80 z-30 bg-white/60 backdrop-blur-xl border-r border-white/30 shadow-[0_4px_24px_rgba(42,77,105,0.08)] rounded-tr-2xl rounded-br-2xl flex flex-col py-8 px-4 min-h-0 overflow-x-hidden">
      <div className="mb-10 flex items-center justify-center">
        <span className="text-2xl font-bold text-primary tracking-widest">SecurePortal</span>
      </div>
      <nav
        className="flex-1 flex flex-col gap-2 overflow-y-auto overflow-x-hidden max-h-[calc(100vh-120px)] min-h-0 scrollbar-thin scrollbar-thumb-[#2A4D69]/80 scrollbar-track-[#F7F9FC] scrollbar-thumb-rounded-full scrollbar-track-rounded-full pb-4 pr-4 -mr-4"
        style={{
          scrollbarColor: '#2A4D69 #F7F9FC',
          scrollbarWidth: 'thin',
        }}
      >
        {menu.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <NavLink
              key={item.name}
              to={item.to}
              className={({ isActive }) =>
                `group flex items-center gap-3 w-full pl-4 ml-1 mx-2 py-3 rounded-2xl transition-all duration-200 font-medium text-base
                hover:bg-accent/10 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent/20
                ${isActive ? `bg-accent/20 text-primary font-semibold shadow-lg ${item.color}` : "text-secondary"}`
              }
              style={{ position: 'relative' }}
            >
              <span className="text-primary group-hover:scale-110 transition-transform">{item.icon}</span>
              <span className="break-words whitespace-normal">{item.name}</span>
            </NavLink>
          );
        })}
      </nav>
      <div className="mt-auto text-xs text-center text-secondary pt-8">
        <span>© 2025 Project Manager</span>
      </div>
    </aside>
  );
} 