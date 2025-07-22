import React from 'react';
import { FileText, BadgeCheck, AlertTriangle, Clock, PieChart, CheckCircle, XCircle, Image as ImageIcon, Video } from 'lucide-react';
import { motion } from 'framer-motion';

// Dummy Data
const PROGRESS_UPDATES = [
  {
    id: 1,
    contractor: 'Amit Sharma',
    timestamp: '2024-06-10 10:30',
    description: 'Foundation work completed. Awaiting supervisor validation.',
    media: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80' },
    ],
    status: 'In Progress',
    validated: false,
  },
  {
    id: 2,
    contractor: 'Priya Verma',
    timestamp: '2024-06-09 16:00',
    description: 'Steel delivered and checked. Progress photos uploaded.',
    media: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80' },
      { type: 'video', url: 'https://samplelib.com/mp4/sample-5s.mp4' },
    ],
    status: 'Submitted',
    validated: true,
  },
];

const SUPERVISOR_VALIDATIONS = [
  {
    id: 1,
    date: '2024-06-10',
    notes: 'Site visit completed. All safety protocols followed.',
    report: 'report-1.pdf',
    status: 'Approved',
  },
  {
    id: 2,
    date: '2024-06-08',
    notes: 'Minor issues flagged. Awaiting contractor response.',
    report: 'report-2.pdf',
    status: 'Flagged',
  },
];

const MATERIALS = [
  { name: 'Cement', delivered: 1000, used: 700 },
  { name: 'Steel', delivered: 500, used: 350 },
  { name: 'Bricks', delivered: 5000, used: 3200 },
];

const FUND_DATA = {
  total: 2000000,
  requested: 800000,
  approved: 700000,
  released: 600000,
};

const ISSUE_ALERTS = [
  {
    id: 1,
    phase: 'Foundation',
    summary: 'Delay detected in concrete curing',
    timestamp: '2024-06-10 09:00',
    type: 'delay',
  },
  {
    id: 2,
    phase: 'Material Delivery',
    summary: 'Steel grade mismatch reported',
    timestamp: '2024-06-09 14:30',
    type: 'material',
  },
  {
    id: 3,
    phase: 'Inspection',
    summary: 'Supervisor flagged safety concern',
    timestamp: '2024-06-08 17:00',
    type: 'supervisor',
  },
];

const LAST_UPDATED = '2024-06-10 11:00';

function ProgressUpdateCard({ update }) {
  return (
    <motion.div layout className="bg-white rounded-xl shadow-card p-5 mb-4">
      <div className="flex items-center gap-3 mb-2">
        <span className="font-semibold text-primary">{update.contractor}</span>
        <span className="text-xs text-secondary flex items-center gap-1"><Clock size={14} /> {update.timestamp}</span>
        <span className={`ml-2 px-2 py-1 rounded-full text-xs font-semibold ${update.status === 'In Progress' ? 'bg-accent/10 text-accent' : update.status === 'Submitted' ? 'bg-primary/10 text-primary' : 'bg-warning/10 text-warning'}`}>{update.status}</span>
        {update.validated && <span className="ml-2 inline-flex items-center gap-1 text-success text-xs font-semibold"><BadgeCheck size={14} /> Validated by Supervisor</span>}
      </div>
      <div className="text-sm text-secondary mb-3">{update.description}</div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {update.media.map((m, i) => (
          <div key={i} className="rounded-lg overflow-hidden border border-border bg-[#F7F9FC] flex items-center justify-center aspect-video">
            {m.type === 'image' ? (
              <img src={m.url} alt="media" className="object-cover w-full h-full" />
            ) : (
              <video src={m.url} controls className="w-full h-full bg-black">
                <track kind="captions" />
              </video>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function MaterialTable({ materials }) {
  return (
    <div className="bg-white rounded-xl shadow-card p-5">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-primary bg-[#F7F9FC]">
            <th className="py-2 px-3 text-left font-semibold">Material</th>
            <th className="py-2 px-3 text-left font-semibold">Delivered</th>
            <th className="py-2 px-3 text-left font-semibold">Used</th>
            <th className="py-2 px-3 text-left font-semibold">Balance</th>
            <th className="py-2 px-3 text-left font-semibold">Usage</th>
          </tr>
        </thead>
        <tbody>
          {materials.map(mat => {
            const balance = mat.delivered - mat.used;
            const percent = Math.round((mat.used / mat.delivered) * 100);
            return (
              <tr key={mat.name} className="border-b last:border-0">
                <td className="py-2 px-3 font-medium text-primary">{mat.name}</td>
                <td className="py-2 px-3">{mat.delivered}</td>
                <td className="py-2 px-3">{mat.used}</td>
                <td className="py-2 px-3">{balance}</td>
                <td className="py-2 px-3">
                  <div className="w-full bg-border rounded-full h-3">
                    <div className="bg-accent h-3 rounded-full" style={{ width: `${percent}%` }} />
                  </div>
                  <span className="text-xs text-secondary ml-2">{percent}%</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function FundPieChart({ data }) {
  // Dummy pie chart using CSS (not a real chart lib)
  const total = data.total;
  const requested = (data.requested / total) * 100;
  const approved = (data.approved / total) * 100;
  const released = (data.released / total) * 100;
  return (
    <div className="bg-white rounded-xl shadow-card p-5 flex flex-col md:flex-row items-center gap-6">
      <div className="flex flex-col items-center">
        <div className="relative w-32 h-32 flex items-center justify-center">
          {/* Pie chart using conic-gradient */}
          <div
            className="w-32 h-32 rounded-full"
            style={{
              background: `conic-gradient(#63ACE5 0% ${requested}%, #2ECC71 ${requested}% ${requested + approved}%, #F39C12 ${requested + approved}% ${requested + approved + released}%, #F7F9FC ${requested + approved + released}% 100%)`,
            }}
          />
          <span className="absolute inset-0 flex items-center justify-center font-bold text-primary text-lg">₹{(total / 100000).toFixed(1)}L</span>
        </div>
        <div className="flex flex-col gap-1 mt-3 text-xs">
          <span><span className="inline-block w-3 h-3 rounded-full bg-accent mr-2" />Funds Requested</span>
          <span><span className="inline-block w-3 h-3 rounded-full bg-success mr-2" />Funds Approved</span>
          <span><span className="inline-block w-3 h-3 rounded-full bg-warning mr-2" />Funds Released</span>
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-2">
        <div className="font-semibold text-primary">Total Budget: <span className="text-accent">₹{total.toLocaleString()}</span></div>
        <div className="text-primary">Funds Requested: <span className="text-accent">₹{data.requested.toLocaleString()}</span></div>
        <div className="text-primary">Funds Approved: <span className="text-success">₹{data.approved.toLocaleString()}</span></div>
        <div className="text-primary">Funds Released: <span className="text-warning">₹{data.released.toLocaleString()}</span></div>
        <div className="font-semibold text-primary mt-2">Current Balance: <span className="text-primary">₹{(total - data.released).toLocaleString()}</span></div>
        <a href="#" className="text-accent underline text-xs mt-1">View Full Fund Tracker</a>
      </div>
    </div>
  );
}

function IssueAlert({ alert }) {
  let icon, color;
  if (alert.type === 'delay') {
    icon = <Clock className="text-warning" size={20} />;
    color = 'bg-warning/10 border-warning';
  } else if (alert.type === 'material') {
    icon = <AlertTriangle className="text-error" size={20} />;
    color = 'bg-error/10 border-error';
  } else {
    icon = <BadgeCheck className="text-accent" size={20} />;
    color = 'bg-accent/10 border-accent';
  }
  return (
    <div className={`flex items-center gap-4 p-4 rounded-xl border-2 ${color} mb-3 bg-white`}>
      {icon}
      <div className="flex-1">
        <div className="font-semibold text-primary">{alert.phase}</div>
        <div className="text-sm text-secondary">{alert.summary}</div>
        <div className="text-xs text-secondary mt-1">{alert.timestamp}</div>
      </div>
      <button className="px-3 py-1 rounded bg-accent text-white text-xs font-semibold shadow-card hover:bg-accent/90 transition">View Details</button>
    </div>
  );
}

export default function ProjectMonitoring() {
  return (
    <div className="h-full w-full bg-[#F7F9FC] p-0 m-0">
      <div className="w-full h-full">
        <div className="text-xs text-secondary mb-4">Last Updated: {LAST_UPDATED}</div>
        {/* Section 1: Progress Updates */}
        <motion.div layout className="mb-8">
          <div className="text-lg font-bold text-primary mb-4">Contractor Progress Updates</div>
          {PROGRESS_UPDATES.map(update => (
            <ProgressUpdateCard key={update.id} update={update} />
          ))}
        </motion.div>
        {/* Section 2: Supervisor Validations */}
        <motion.div layout className="mb-8">
          <div className="text-lg font-bold text-primary mb-4">Supervisor Validations & Site Visits</div>
          <div className="bg-white rounded-xl shadow-card p-5">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-primary bg-[#F7F9FC]">
                  <th className="py-2 px-3 text-left font-semibold">Visit Date</th>
                  <th className="py-2 px-3 text-left font-semibold">Notes</th>
                  <th className="py-2 px-3 text-left font-semibold">Report</th>
                  <th className="py-2 px-3 text-left font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {SUPERVISOR_VALIDATIONS.map(val => (
                  <tr key={val.id} className="border-b last:border-0">
                    <td className="py-2 px-3 font-medium text-primary">{val.date}</td>
                    <td className="py-2 px-3">{val.notes}</td>
                    <td className="py-2 px-3">
                      <a href={`/${val.report}`} download className="flex items-center gap-1 text-accent hover:underline"><FileText size={16} /> Download</a>
                    </td>
                    <td className="py-2 px-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold
                        ${val.status === 'Approved' ? 'bg-success/10 text-success' : val.status === 'Flagged' ? 'bg-error/10 text-error' : 'bg-warning/10 text-warning'}`}>{val.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
        {/* Section 3: Material Usage Tracker */}
        <motion.div layout className="mb-8">
          <div className="text-lg font-bold text-primary mb-4">Material Usage & Delivery</div>
          <MaterialTable materials={MATERIALS} />
        </motion.div>
        {/* Section 4: Fund Tracker */}
        <motion.div layout className="mb-8">
          <div className="text-lg font-bold text-primary mb-4">Fund Usage Overview</div>
          <FundPieChart data={FUND_DATA} />
        </motion.div>
        {/* Section 5: Issue Flags & AI Alerts */}
        <motion.div layout className="mb-8">
          <div className="text-lg font-bold text-primary mb-4">AI Flags & Timeline Deviations</div>
          {ISSUE_ALERTS.map(alert => (
            <IssueAlert key={alert.id} alert={alert} />
          ))}
        </motion.div>
      </div>
    </div>
  );
} 