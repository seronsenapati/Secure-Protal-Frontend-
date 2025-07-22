import React, { useState } from 'react';
import { Download, FileText, FileSpreadsheet, Calendar, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DUMMY_PROJECTS = [
  { id: 1, name: 'Bridge Construction', zone: 'North', status: 'Ongoing' },
  { id: 2, name: 'School Renovation', zone: 'East', status: 'Completed' },
  { id: 3, name: 'Water Supply Upgrade', zone: 'West', status: 'Delayed' },
];

const REPORT_TYPES = [
  {
    key: 'progress',
    title: 'Project Progress Report',
    summary: 'Includes project title, zone, status, tasks completed, live updates, supervisor notes, and issues.',
    options: ['pdf', 'csv'],
    badge: 'Last exported',
  },
  {
    key: 'fund',
    title: 'Fund Usage Report',
    summary: 'Shows total budget, requested vs released funds, fund requests, remaining balance, and a chart preview.',
    options: ['pdf', 'xlsx'],
    badge: 'Last exported',
  },
  {
    key: 'docs',
    title: 'Document Summary Report',
    summary: 'Lists all uploaded documents, uploader, upload date, and type.',
    options: ['pdf'],
    badge: 'Last exported',
  },
];

const DUMMY_EXPORTS = [
  { id: 1, type: 'Progress', date: '2024-06-10', format: 'PDF', project: 'Bridge Construction' },
  { id: 2, type: 'Fund Usage', date: '2024-06-09', format: 'Excel', project: 'School Renovation' },
  { id: 3, type: 'Document Summary', date: '2024-06-08', format: 'PDF', project: 'Bridge Construction' },
];

function ProjectSelector({ projects, value, onChange }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-semibold text-primary mb-1">Select Project</label>
      <select
        className="glass w-full p-3 rounded-lg border border-accent/30 focus:ring-2 focus:ring-accent/30 text-primary"
        value={value}
        onChange={e => onChange(e.target.value)}
      >
        <option value="">-- Select Project --</option>
        {projects.map(p => (
          <option key={p.id} value={p.id}>{p.name}</option>
        ))}
      </select>
    </div>
  );
}

function DateRangeFilter({ value, onChange }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-semibold text-primary mb-1 flex items-center gap-2"><Calendar size={16} className="text-accent" /> Date Range</label>
      <div className="flex gap-2">
        <input
          type="date"
          className="glass p-2 rounded-lg border border-border focus:ring-2 focus:ring-accent/30"
          value={value.start}
          onChange={e => onChange({ ...value, start: e.target.value })}
        />
        <span className="text-secondary">to</span>
        <input
          type="date"
          className="glass p-2 rounded-lg border border-border focus:ring-2 focus:ring-accent/30"
          value={value.end}
          onChange={e => onChange({ ...value, end: e.target.value })}
        />
      </div>
    </div>
  );
}

function ReportCard({ type, project, lastExport, onExport, includeAttachments }) {
  return (
    <div className="bg-white rounded-xl shadow-card p-6 flex flex-col gap-4 flex-1 min-w-[260px]">
      <div className="flex items-center gap-2 mb-2">
        {type.key === 'progress' && <FileText className="text-accent" size={28} />}
        {type.key === 'fund' && <FileSpreadsheet className="text-success" size={28} />}
        {type.key === 'docs' && <FileText className="text-primary" size={28} />}
        <div className="font-bold text-primary text-lg">{type.title}</div>
      </div>
      <div className="text-sm text-secondary mb-2">{type.summary}</div>
      {type.key === 'fund' && (
        <div className="w-full h-2 bg-border rounded-full mb-2">
          <div className="h-2 bg-accent rounded-full" style={{ width: '60%' }} />
        </div>
      )}
      <div className="flex gap-2 mt-2">
        {type.options.includes('pdf') && (
          <button
            className="flex items-center gap-1 px-4 py-2 rounded bg-primary text-white font-semibold shadow-card hover:scale-105 transition text-xs"
            onClick={() => onExport(type, 'PDF')}
          >
            <Download size={16} /> Export as PDF
          </button>
        )}
        {type.options.includes('csv') && (
          <button
            className="flex items-center gap-1 px-4 py-2 rounded bg-accent text-white font-semibold shadow-card hover:scale-105 transition text-xs"
            onClick={() => onExport(type, 'CSV')}
          >
            <Download size={16} /> Export as CSV
          </button>
        )}
        {type.options.includes('xlsx') && (
          <button
            className="flex items-center gap-1 px-4 py-2 rounded bg-success text-white font-semibold shadow-card hover:scale-105 transition text-xs"
            onClick={() => onExport(type, 'Excel')}
          >
            <Download size={16} /> Export as Excel
          </button>
        )}
      </div>
      <div className="flex items-center gap-2 mt-2">
        <span className="inline-block px-2 py-0.5 rounded-full bg-accent/10 text-accent text-xs font-semibold">{type.badge}: {lastExport || 'Never'}</span>
        {includeAttachments && <span className="inline-block px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">With Attachments</span>}
      </div>
    </div>
  );
}

function ExportReportsPanel() {
  const [selectedProject, setSelectedProject] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [includeAttachments, setIncludeAttachments] = useState(false);
  const [exportLog, setExportLog] = useState(DUMMY_EXPORTS);
  const [toast, setToast] = useState(null);

  const handleExport = (type, format) => {
    if (!selectedProject) {
      setToast('Please select a project first.');
      setTimeout(() => setToast(null), 2000);
      return;
    }
    setExportLog(log => [
      { id: Math.random().toString(36).slice(2), type: type.title, date: new Date().toISOString().slice(0, 10), format, project: DUMMY_PROJECTS.find(p => p.id == selectedProject)?.name },
      ...log.slice(0, 4),
    ]);
    setToast('Report exported successfully');
    setTimeout(() => setToast(null), 2000);
  };

  const lastExport = (key) => {
    const found = exportLog.find(e => e.type.toLowerCase().includes(key));
    return found ? found.date : null;
  };

  return (
    <div className="h-full w-full bg-[#F7F9FC] p-0 m-0">
      <div className="w-full h-full flex flex-col gap-8 p-6">
        {/* Section 1: Project Selection & Date Range */}
        <div className="flex flex-col md:flex-row gap-6 items-end">
          <div className="flex-1">
            <ProjectSelector projects={DUMMY_PROJECTS} value={selectedProject} onChange={setSelectedProject} />
          </div>
          <div className="flex-1">
            <DateRangeFilter value={dateRange} onChange={setDateRange} />
          </div>
          <div className="flex items-center gap-2 mb-2">
            <input type="checkbox" id="include-attachments" checked={includeAttachments} onChange={e => setIncludeAttachments(e.target.checked)} className="accent-accent w-4 h-4" />
            <label htmlFor="include-attachments" className="text-sm text-primary font-medium">Include Attachments</label>
          </div>
        </div>
        {/* Section 2: Report Types */}
        <div className="flex flex-col md:flex-row gap-6">
          {REPORT_TYPES.map(type => (
            <ReportCard
              key={type.key}
              type={type}
              project={DUMMY_PROJECTS.find(p => p.id == selectedProject)}
              lastExport={lastExport(type.key)}
              onExport={handleExport}
              includeAttachments={includeAttachments}
            />
          ))}
        </div>
        {/* Export Activity Log */}
        <div className="bg-white rounded-xl shadow-card p-6 mt-4">
          <div className="font-bold text-primary mb-2">Export Activity Log</div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-primary bg-[#F7F9FC]">
                <th className="py-2 px-3 text-left font-semibold">Date</th>
                <th className="py-2 px-3 text-left font-semibold">Project</th>
                <th className="py-2 px-3 text-left font-semibold">Report</th>
                <th className="py-2 px-3 text-left font-semibold">Format</th>
              </tr>
            </thead>
            <tbody>
              {exportLog.map(e => (
                <tr key={e.id} className="border-b last:border-0">
                  <td className="py-2 px-3">{e.date}</td>
                  <td className="py-2 px-3">{e.project}</td>
                  <td className="py-2 px-3">{e.type}</td>
                  <td className="py-2 px-3">{e.format}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Toast */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.4 }}
              className="fixed left-1/2 -translate-x-1/2 bottom-8 bg-primary text-white px-6 py-3 rounded-xl shadow-card flex items-center gap-2 z-50"
            >
              <CheckCircle className="text-success" size={24} />
              <span>{toast}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function ExportReports() {
  return <ExportReportsPanel />;
} 