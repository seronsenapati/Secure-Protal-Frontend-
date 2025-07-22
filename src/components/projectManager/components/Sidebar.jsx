import React, { useState } from "react";
import { Home, PlusSquare, FolderOpen, Gavel, Users, BarChart2, FileText, MessageCircle, FileDown, IndianRupee, Box, ClipboardList, Truck, CreditCard, History, Shield, User, UserCircle, LogOut, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
const menu = [
  { name: 'Dashboard Home', icon: <Home size={22} />, id: '', color: 'border-emerald-400' },
  { name: 'Create Project', icon: <PlusSquare size={22} />, id: 'create-project', color: 'border-emerald-400' },
  { name: 'All My Projects', icon: <FolderOpen size={22} />, id: 'all-projects', color: 'border-emerald-400' },
  { name: 'Project Monitoring', icon: <BarChart2 size={22} />, id: 'project-monitoring', color: 'border-emerald-400' },
  { name: 'Fund Requests', icon: <IndianRupee size={22} />, id: 'fund-requests', color: 'border-cyan-400' },
  { name: 'Documents & Blueprints', icon: <FileText size={22} />, id: 'documents-blueprints', color: 'border-amber-400' },
  { name: 'Internal Chat', icon: <MessageCircle size={22} />, id: 'internal-chat', color: 'border-emerald-400' },
];

export default function Sidebar() {
  const [activeItem,setActiveItem] = useState()
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleProfileDropdown = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleItemClick = (itemId) => {
    if (onItemSelect) {
      onItemSelect(itemId);
    }
  };

  return (
    <aside className=" left-0 top-0 min-h-full w-80 z-30 bg-slate-800/60 backdrop-blur-xl border-r border-slate-700/50 shadow-[0_4px_24px_rgba(0,0,0,0.3)]  flex flex-col py-8 px-4 overflow-x-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-yellow-500/5  "></div>
      
      {/* Logo */}
      <div className="mb-10 flex items-center justify-center gap-3 relative z-10">
        <div className="w-10 h-10 bg-gradient-to-r from-amber-400 to-orange-300 rounded-xl flex items-center justify-center">
          <Shield className="w-6 h-6 text-slate-900" />
        </div>
        <h1 className="text-xl font-bold bg-gradient-to-r from-amber-400 to-orange-300 bg-clip-text text-transparent">
          SecurePortal
        </h1>
      </div>

      {/* Navigation */}
      <nav
        className="flex-1 flex flex-col gap-2 overflow-y-auto overflow-x-hidden max-h-[calc(100vh-200px)] min-h-0 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800 scrollbar-thumb-rounded-full scrollbar-track-rounded-full pb-4 pr-4 -mr-4 relative z-10"
        style={{
          scrollbarColor: '#475569 #1e293b',
          scrollbarWidth: 'thin',
        }}
      >
        {menu.map((item) => {
          const isActive = activeItem === item.id;
          return (
           <Link to={`/${item.id}`}>
             <button
              key={item.name}
              onClick={() => setActiveItem(item.id)}
              className={`group flex items-center gap-3 w-full pl-4 ml-1 mx-2 py-3 rounded-xl transition-all duration-300 font-medium text-base text-left
                hover:bg-slate-700/50 hover:text-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-400/20
                ${isActive 
                  ? `bg-gradient-to-r from-yellow-300 via-emerald-400 to-cyan-400 text-slate-900 font-medium shadow-lg shadow-emerald-500/20 ${item.color}` 
                  : "text-slate-300"
                }`
              }
            >
              <span className="group-hover:scale-110 transition-transform">{item.icon}</span>
              <span className="break-words whitespace-normal">{item.name}</span>
            </button>
           </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="mt-auto bg-slate-700/50 rounded-xl p-4 backdrop-blur-sm relative z-10 mb-4">
        <div 
          className="flex items-center gap-3 cursor-pointer"
          onClick={toggleProfileDropdown}
        >
          <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-slate-900" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-white">Project Manager</p>
            <p className="text-xs text-slate-400">manager@secureportal.com</p>
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

      {/* Footer */}
      <div className="text-xs text-center text-slate-400 relative z-10">
        <span>© 2025 Project Manager</span>
      </div>
    </aside>
  );
}