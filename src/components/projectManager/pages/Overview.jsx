import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipboardList, Truck, CreditCard, Home, Calendar, PackageCheck, ArrowRight, X, Package, Archive } from "lucide-react";
import { motion } from "framer-motion";
import { StatsCard } from "../components/dashboard";
import { ProjectSummary } from "../components/dashboard";
import { UpcomingDelivery } from "../components/dashboard";

const stats = [
  {
    label: "Projects Active",
    value: 2,
    icon: Home,
    badge: "+1 today",
    color: "from-blue-600 to-emerald-500",
  },
  {
    label: "Orders Received",
    value: 8,
    icon: ClipboardList,
    badge: "+2 today",
    color: "from-emerald-500 to-blue-600",
  },
  {
    label: "Deliveries Completed",
    value: 5,
    icon: Truck,
    badge: "+1 today",
    color: "from-blue-600 to-emerald-500",
  },
  {
    label: "Payments Received",
    value: 3,
    icon: CreditCard,
    badge: "+0 today",
    color: "from-emerald-500 to-blue-600",
  },
];

const project = {
  name: "Municipal Infrastructure Upgrade",
  materials: ["Cement", "Steel", "Bricks"],
  lastDelivery: "12 May 2025",
  progress: 60,
  status: "On Track",
  statusColor: "bg-emerald-500",
};

const upcomingDelivery = {
  project: "Smart City Roadworks",
  due: "18 May 2025",
  items: ["Bitumen", "Concrete Pipes"],
  countdown: "3 days left",
};

export default function Overview() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="p-6 md:p-8 space-y-8 font-sans">
      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((card, idx) => (
          <StatsCard key={card.label} card={card} index={idx} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Project Summary Section */}
        <ProjectSummary project={project} onViewDetails={openModal} />

        {/* Upcoming Delivery Panel */}
        <UpcomingDelivery delivery={upcomingDelivery} />
      </div>

      {/* Project Details Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop with blur and dark overlay */}
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-md"
            onClick={closeModal}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative z-10 w-full max-w-xl mx-4 rounded-xl bg-[#1a1f36] shadow-2xl border border-slate-700 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-700">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-slate-700/50 rounded-lg flex items-center justify-center">
                  <Home className="w-4 h-4 text-slate-300" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Project Details</h2>
                  <p className="text-xs text-slate-400">Complete project information</p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="p-1.5 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 transition-colors"
              >
                <X className="w-4 h-4 text-slate-300" />
              </button>
            </div>

            {/* Content */}
            <div className="p-0">
              <div className="bg-[#232846] rounded-xl p-4 md:p-5 w-full max-w-2xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                  <div>
                    <div className="text-xl font-bold text-white mb-2">{project.name}</div>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {project.materials.map((mat) => (
                        <span key={mat} className="px-3 py-0.5 rounded-full bg-blue-800/80 text-blue-100 text-xs font-semibold">{mat}</span>
                      ))}
                    </div>
                  </div>
                  {/* Circular Progress Bar */}
                  <div className="flex flex-col items-center gap-1">
                    <div className="relative w-16 h-16 flex items-center justify-center">
                      <svg width="64" height="64" viewBox="0 0 64 64">
                        <circle cx="32" cy="32" r="28" fill="none" stroke="#2A334A" strokeWidth="7" />
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          fill="none"
                          stroke="#10B981"
                          strokeWidth="7"
                          strokeDasharray={2 * Math.PI * 28}
                          strokeDashoffset={2 * Math.PI * 28 * (1 - project.progress / 100)}
                          strokeLinecap="round"
                          style={{ transition: 'stroke-dashoffset 0.6s' }}
                        />
                        <text x="32" y="40" textAnchor="middle" className="fill-white font-bold text-base">{project.progress}%</text>
                      </svg>
                    </div>
                    <span className="mt-0.5 px-2 py-0.5 rounded-full bg-emerald-900/60 text-emerald-300 text-xs font-semibold">{project.progress}% Complete</span>
                  </div>
                </div>
                {/* Deliveries Table */}
                <div className="overflow-x-auto rounded-lg">
                  <table className="min-w-full text-left text-white text-sm">
                    <thead>
                      <tr className="bg-[#20243a] text-slate-200 text-xs">
                        <th className="px-3 py-2 font-semibold">Date</th>
                        <th className="px-3 py-2 font-semibold">Item</th>
                        <th className="px-3 py-2 font-semibold">Quantity</th>
                        <th className="px-3 py-2 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-slate-700">
                        <td className="px-3 py-2">
                          <span className="inline-block rounded bg-slate-800/70 text-xs px-2 py-0.5 text-white font-semibold">12 May 2025</span>
                        </td>
                        <td className="px-3 py-2 flex items-center gap-2">
                          <Package className="w-4 h-4 text-blue-300" /> Cement
                        </td>
                        <td className="px-3 py-2">200 bags</td>
                        <td className="px-3 py-2">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-900/80 text-emerald-200 font-semibold text-xs">Delivered</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2">
                          <span className="inline-block rounded bg-slate-800/70 text-xs px-2 py-0.5 text-white font-semibold">15 May 2025</span>
                        </td>
                        <td className="px-3 py-2 flex items-center gap-2">
                          {/* Brick icon SVG */}
                          <svg className="w-4 h-4 text-orange-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="7" width="18" height="4" rx="1" fill="currentColor"/><rect x="3" y="13" width="7.5" height="4" rx="1" fill="currentColor"/><rect x="13.5" y="13" width="7.5" height="4" rx="1" fill="currentColor"/></svg>
                          Bricks
                        </td>
                        <td className="px-3 py-2">500 pcs</td>
                        <td className="px-3 py-2">
                          <span className="px-2 py-0.5 rounded-full bg-amber-800/80 text-amber-200 font-semibold text-xs">Pending</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {/* Modern Request Support Button */}
                <div className="flex justify-end mt-5">
                  <button className="flex items-center gap-2 px-5 py-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-700 text-white font-semibold text-base shadow-lg hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-blue-400">
                    <svg xmlns='http://www.w3.org/2000/svg' className='w-5 h-5 text-white opacity-90' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth='1.5'><circle cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='1.5' fill='none'/><path strokeLinecap='round' strokeLinejoin='round' d='M12 16h.01M12 8v2a2 2 0 002 2h0a2 2 0 00-2 2v0' /></svg>
                    Request Support
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            {/* Removed View Full Project button */}
          </motion.div>
        </div>
      )}
    </div>
  );
} 