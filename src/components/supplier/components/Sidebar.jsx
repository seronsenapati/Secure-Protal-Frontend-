import React, { useState } from "react";
import { Home, Box, ClipboardList, Truck, CreditCard, History, MessageCircle, Shield, User, UserCircle, LogOut, ChevronDown } from "lucide-react";

const navSections = [
  {
    items: [
      { label: "Overview", icon: Home },
      { label: "Product Catalog", icon: Box },
      { label: "Incoming Orders", icon: ClipboardList },
      { label: "Delivery Management", icon: Truck },
      { label: "Payment & Fund Tracker", icon: CreditCard },
      { label: "Delivery History", icon: History },
      { label: "Messaging", icon: MessageCircle },
    ],
  },
];

export default function Sidebar({ active, onSelect, collapsed = false }) {
  const [hovered, setHovered] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleProfileDropdown = () => {
    setIsProfileOpen(!isProfileOpen);
  };
  
  return (
    <div className="w-72 bg-slate-800/60 backdrop-blur-xl border-r border-slate-700/50 relative h-screen flex flex-col">
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-yellow-500/5"></div>

      {/* Logo */}
      <div className="flex items-center gap-3 p-6 relative z-10">
        <div className="w-10 h-10 bg-gradient-to-r from-amber-400 to-orange-300 rounded-xl flex items-center justify-center">
          <Shield className="w-6 h-6 text-slate-900" />
        </div>
        <h1 className="text-xl font-bold bg-gradient-to-r from-amber-400 to-orange-300 bg-clip-text text-transparent">
          SecurePortal
        </h1>
      </div>

      {/* Navigation */}
      <nav className="mt-4 px-4 relative z-10 flex-1">
        {navSections.map((section) => (
          <div key="nav-section">
            {section.items.map((item, idx) => {
              const Icon = item.icon;
              const isActive = active === idx;
              return (
                <button
                  key={item.label}
                  onClick={() => onSelect(idx)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-yellow-300 via-emerald-400 to-cyan-400 text-slate-900 font-medium hover:brightness-110 transition-all shadow-lg shadow-emerald-500/20'
                      : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* User Profile */}
      <div className="absolute bottom-6 left-4 right-4 bg-slate-700/50 rounded-xl p-4 backdrop-blur-sm  z-10">
        <div 
          className="flex items-center gap-3 cursor-pointer"
          onClick={toggleProfileDropdown}
        >
          <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-slate-900" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-white">Supplier</p>
            <p className="text-xs text-slate-400">supplier@secureportal.com</p>
          </div>
          <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
        </div>
        {isProfileOpen && (
          <div className="mt-3 bg-slate-600/50 rounded-lg p-2 flex flex-col gap-3">
            <button 
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:bg-slate-500/50 rounded-md transition-colors"
              onClick={() => setIsProfileOpen(false)}
            >
              <UserCircle className="w-4 h-4" />
              Profile
            </button>
            <button className="w-full flex items-center gap-2 px-3 py-2 text-sm bg-red-400/40 text-red-400/90 hover:bg-slate-500/50 rounded-md transition-colors">
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}