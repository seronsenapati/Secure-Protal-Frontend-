import React from 'react';
import { Folder, Clock, CheckCircle, AlertTriangle, Info, Calendar, FileText, User, ChevronDown, PieChart } from 'lucide-react';
import { motion } from 'framer-motion';

const STATS = [
  { label: 'Total Projects', value: 24, icon: <Folder size={28} />, color: 'bg-accent/10 text-accent' },
  { label: 'Ongoing Projects', value: 14, icon: <Clock size={28} />, color: 'bg-yellow-100 text-yellow-600' },
  { label: 'Completed Projects', value: 7, icon: <CheckCircle size={28} />, color: 'bg-success/10 text-success' },
  { label: 'Delayed Projects', value: 3, icon: <AlertTriangle size={28} />, color: 'bg-error/10 text-error' },
];

const ALERTS = [
  { id: 1, project: 'Bridge Construction', text: 'Fund request submitted', type: 'fund', time: '2 hours ago', icon: <Info className="text-accent" size={18} /> },
  { id: 2, project: 'School Renovation', text: 'Progress delayed', type: 'delay', time: '1 day ago', icon: <AlertTriangle className="text-error" size={18} /> },
  { id: 3, project: 'Water Supply Upgrade', text: 'Bid submission deadline approaching', type: 'bid', time: '3 days ago', icon: <Clock className="text-yellow-600" size={18} /> },
];

const DEADLINES = [
  { id: 1, project: 'Bridge Construction', type: 'Bid Submission', daysLeft: 3, status: 'Bidding', icon: <Calendar className="text-accent" size={18} /> },
  { id: 2, project: 'School Renovation', type: 'Project Start', daysLeft: 7, status: 'Launch', icon: <Clock className="text-success" size={18} /> },
];

const PROGRESS = 65;

const ACTIVITY = [
  { id: 1, user: 'Project Manager', action: 'Uploaded report', time: 'Today at 9:32 AM', icon: <FileText className="text-accent" size={16} /> },
  { id: 2, user: 'Supervisor', action: 'Validated site', time: 'Yesterday at 4:10 PM', icon: <User className="text-primary" size={16} /> },
  { id: 3, user: 'Contractor', action: 'Submitted fund request', time: 'Yesterday at 2:45 PM', icon: <Info className="text-accent" size={16} /> },
];

function StatsCard({ stat }) {
  return (
    <motion.div whileHover={{ scale: 1.04 }} className={`flex flex-col items-center justify-center rounded-xl p-6 shadow-card transition cursor-pointer ${stat.color}`}> 
      <div className="mb-2">{stat.icon}</div>
      <div className="text-2xl font-bold">{stat.value}</div>
      <div className="text-sm font-medium text-secondary text-center">{stat.label}</div>
    </motion.div>
  );
}

function AlertList({ alerts }) {
  return (
    <div className="bg-white rounded-xl shadow-card p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="font-bold text-primary text-lg">Recent Alerts</div>
        <button className="flex items-center gap-1 text-xs text-secondary bg-[#F7F9FC] px-2 py-1 rounded hover:bg-accent/10"><ChevronDown size={14} /> All</button>
      </div>
      <div className="space-y-3">
        {alerts.map(alert => (
          <div key={alert.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/5 transition">
            {alert.icon}
            <div className="flex-1">
              <div className="font-semibold text-primary text-sm">{alert.project}</div>
              <div className="text-xs text-secondary">{alert.text}</div>
            </div>
            <div className="text-xs text-secondary whitespace-nowrap">{alert.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DeadlineCard({ deadline }) {
  return (
    <div className="flex items-center gap-3 bg-white rounded-xl shadow-card p-4 mb-3">
      {deadline.icon}
      <div className="flex-1">
        <div className="font-semibold text-primary text-sm">{deadline.project}</div>
        <div className="text-xs text-secondary">{deadline.type}</div>
      </div>
      <div className="text-xs text-secondary">{deadline.daysLeft} days left</div>
      <span className="px-2 py-0.5 rounded-full bg-accent/10 text-accent text-xs font-semibold">{deadline.status}</span>
    </div>
  );
}

function ProgressChart({ percent }) {
  return (
    <div className="bg-white rounded-xl shadow-card p-6 flex flex-col items-center">
      <div className="font-bold text-primary mb-2">Project Completion Overview</div>
      <div className="relative w-24 h-24 flex items-center justify-center mb-2">
        <svg width="96" height="96" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="16" fill="#F7F9FC" stroke="#E1EAF2" strokeWidth="4" />
          <circle
            cx="18" cy="18" r="16"
            fill="none"
            stroke="#63ACE5"
            strokeWidth="4"
            strokeDasharray={`${percent} ${100 - percent}`}
            strokeDashoffset="0"
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-bold text-primary text-xl">{percent}%</span>
      </div>
    </div>
  );
}

function ActivityLog({ activity }) {
  return (
    <div className="bg-white rounded-xl shadow-card p-5">
      <div className="font-bold text-primary text-lg mb-3">Recent Activity</div>
      <div className="space-y-3">
        {activity.map(a => (
          <div key={a.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/5 transition">
            {a.icon}
            <div className="flex-1">
              <div className="font-semibold text-primary text-sm">{a.user}</div>
              <div className="text-xs text-secondary">{a.action}</div>
            </div>
            <div className="text-xs text-secondary whitespace-nowrap">{a.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DashboardHome() {
  return (
    <div className="h-full w-full bg-[#F7F9FC] p-0 m-0">
      <div className="w-full h-full flex flex-col gap-8 p-6">
        {/* Section 1: Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map(stat => <StatsCard key={stat.label} stat={stat} />)}
        </div>
        {/* Section 2: Recent Alerts */}
        <AlertList alerts={ALERTS} />
        {/* Section 3: Upcoming Deadlines */}
        <div className="bg-white rounded-xl shadow-card p-5">
          <div className="font-bold text-primary text-lg mb-3">Upcoming Deadlines</div>
          {DEADLINES.map(dl => <DeadlineCard key={dl.id} deadline={dl} />)}
        </div>
        {/* Section 4: Progress Chart */}
        <ProgressChart percent={PROGRESS} />
        {/* Section 5: Activity Log */}
        <ActivityLog activity={ACTIVITY} />
      </div>
    </div>
  );
} 