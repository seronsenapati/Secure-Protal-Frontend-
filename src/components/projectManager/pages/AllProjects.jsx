import React, { useContext, useState } from 'react';
import { Flag, XCircle, CheckCircle, User, Truck, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectContext } from '../projectContext';

const STATUS_STYLES = {
  'On Bidding': 'bg-purple-100 text-purple-800 text-xs font-semibold rounded-md px-2 py-1',
  'Ongoing': 'bg-blue-600/20 text-blue-400 rounded-md px-2 py-1 text-xs font-semibold',
  'Completed': 'bg-green-600/20 text-green-400 rounded-md px-2 py-1 text-xs font-semibold',
  'Delayed': 'bg-red-600/20 text-red-400 rounded-md px-2 py-1 text-xs font-semibold',
};

// --- HARDCODED PROJECTS (unchanged, add your real data here) ---
const hardcodedProjects = [
  {
    id: 101,
    title: 'Bridge Construction Phase 1',
    contractor: 'ABC Infra Ltd.',
    supervisor: 'John Doe',
    budgetUsed: 4500000,
    budgetTotal: 6000000,
    status: 'Ongoing',
    startDate: '2025-06-01',
    deadline: '2025-12-31',
    flagged: false,
    thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    createdAt: '2025-05-20',
    zone: 'North',
  },
  {
    id: 102,
    title: 'School Renovation',
    contractor: 'BuildPro',
    supervisor: 'Jane Smith',
    budgetUsed: 2000000,
    budgetTotal: 2000000,
    status: 'Completed',
    startDate: '2024-01-15',
    deadline: '2024-07-30',
    flagged: false,
    thumbnail: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    createdAt: '2024-01-10',
    zone: 'East',
  },
  {
    id: 103,
    title: 'Highway Expansion',
    contractor: 'XYZ Corp.',
    supervisor: 'Amit Kumar',
    budgetUsed: 3500000,
    budgetTotal: 5000000,
    status: 'Delayed',
    startDate: '2025-03-10',
    deadline: '2025-09-15',
    flagged: true,
    thumbnail: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=400&q=80',
    createdAt: '2025-03-01',
    zone: 'West',
  },
];

// --- DYNAMIC PROJECTS (On Bidding) ---
const initialDynamicProjects = [];

const DUMMY_BIDS = [
  {
    id: 1,
    name: 'BuildTech India Pvt. Ltd.',
    amount: 4500000,
    duration: 120,
    proposal: 'proposal-buildtech.pdf',
  },
  {
    id: 2,
    name: 'CementPro Infra',
    amount: 4700000,
    duration: 110,
    proposal: 'proposal-cementpro.pdf',
  },
];

const DUMMY_SUPPLIERS = [
  { id: 1, name: 'ShreeBuild Co.', zone: 'East' },
  { id: 2, name: 'CementPro Ltd.', zone: 'West' },
  { id: 3, name: 'SteelMart', zone: 'North' },
];

const DUMMY_SUPERVISORS = [
  { id: 1, name: 'Amit Kumar', region: 'East', experience: 8 },
  { id: 2, name: 'Priya Singh', region: 'West', experience: 5 },
  { id: 3, name: 'Rakesh Verma', region: 'East', experience: 3 },
];

function getNearestSupplier(zone) {
  return DUMMY_SUPPLIERS.find(s => s.zone === zone) || DUMMY_SUPPLIERS[0];
}

function daysAgo(dateStr) {
  const created = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now - created) / (1000 * 60 * 60 * 24));
  return diff === 0 ? 'Today' : `${diff} day${diff > 1 ? 's' : ''} ago`;
}

function ProjectCard({ project, onClick, isDynamic }) {
  const percentUsed = project.budgetTotal ? Math.round((project.budgetUsed / project.budgetTotal) * 100) : 0;
  return (
    <div
      className={`bg-white rounded-xl p-4 border border-white/10 shadow-md flex flex-col gap-2 cursor-pointer transition-transform duration-200 hover:scale-105 hover:shadow-xl group`}
      onClick={() => onClick(project)}
      tabIndex={0}
      aria-label={`View details for project ${project.title}`}
    >
      <div className="relative h-40 w-full rounded-t-xl overflow-hidden bg-border mb-2">
        <img
          src={project.thumbnail || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80'}
          alt="Project Thumbnail"
          className="object-cover w-full h-full group-hover:opacity-90 transition"
        />
        {project.flagged && (
          <Flag className="absolute top-2 right-2 text-error bg-white rounded-full p-1 w-7 h-7 shadow" />
        )}
      </div>
      <div className="flex items-center gap-2 justify-between mb-1">
          <h3 className="font-bold text-lg text-primary truncate" title={project.title}>{project.title}</h3>
        <span className={STATUS_STYLES[project.status]}>{project.status}</span>
        </div>
        <div className="text-sm text-secondary flex flex-col gap-1">
        <span><span className="font-semibold text-text">Contractor:</span> {project.contractor || <span className="italic text-gray-400">Not Assigned</span>}</span>
        <span><span className="font-semibold text-text">Supervisor:</span> {project.supervisor || <span className="italic text-gray-400">Not Assigned</span>}</span>
        </div>
        <div className="mt-2">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-secondary">Budget Used</span>
            <span className="text-secondary">{percentUsed}%</span>
          </div>
          <div className="w-full h-2 bg-border rounded-full overflow-hidden">
            <div
              className="h-full bg-accent rounded-full transition-all"
              style={{ width: `${percentUsed}%` }}
            />
          </div>
          <div className="flex justify-between text-xs mt-1">
          <span className="text-primary font-semibold">₹{project.budgetUsed?.toLocaleString?.() || 0}</span>
          <span className="text-secondary">/ ₹{project.budgetTotal?.toLocaleString?.() || 0}</span>
        </div>
        </div>
        <div className="flex justify-between items-center text-xs mt-2">
        <span className="text-secondary">{project.startDate || (project.createdAt && daysAgo(project.createdAt))}</span>
          <span className="text-secondary">|</span>
        <span className="text-secondary">{project.deadline || (project.zone && `${project.zone} Zone`)}</span>
      </div>
    </div>
  );
}

function OnBiddingModal({ project, onClose, onAssign }) {
  const [step, setStep] = useState(0);
  const [assignedContractor, setAssignedContractor] = useState(null);
  const [autoSupplier, setAutoSupplier] = useState(null);
  const [selectedSupervisor, setSelectedSupervisor] = useState('');
  const [confirming, setConfirming] = useState(false);

  // Step 1: Assign Contractor
  const handleAssignContractor = (bid) => {
    setAssignedContractor(bid);
    setStep(1);
    setTimeout(() => {
      setAutoSupplier(getNearestSupplier(project.zone));
    }, 400);
  };

  // Step 2: Confirm Supervisor
  const handleConfirmSupervisor = () => {
    setConfirming(true);
    setTimeout(() => {
      onAssign({
        contractor: assignedContractor.name,
        supplier: autoSupplier.name,
        supervisor: DUMMY_SUPERVISORS.find(s => s.id === Number(selectedSupervisor))?.name || '',
      });
      setConfirming(false);
      onClose();
    }, 900);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-[#121826] text-white rounded-2xl shadow-xl p-6 max-w-2xl w-full relative overflow-y-auto max-h-[90vh]"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={e => e.stopPropagation()}
        >
          <button className="absolute top-4 right-4 text-secondary hover:text-error" onClick={onClose} aria-label="Close popup"><XCircle size={28} /></button>
          {/* Stepper Tabs */}
          <div className="flex gap-4 mb-6 border-b border-white/10 pb-2">
            <button className={`font-semibold px-2 pb-1 border-b-2 transition-all ${step === 0 ? 'border-purple-400 text-purple-300' : 'border-transparent text-white/60'}`} onClick={() => setStep(0)}>1. View Bids</button>
            <button className={`font-semibold px-2 pb-1 border-b-2 transition-all ${step === 1 ? 'border-green-400 text-green-300' : 'border-transparent text-white/60'}`} disabled={!assignedContractor} onClick={() => assignedContractor && setStep(1)}>2. Auto Supplier</button>
            <button className={`font-semibold px-2 pb-1 border-b-2 transition-all ${step === 2 ? 'border-blue-400 text-blue-300' : 'border-transparent text-white/60'}`} disabled={!autoSupplier} onClick={() => autoSupplier && setStep(2)}>3. Assign Supervisor</button>
          </div>
          {/* Step Content */}
          <div className="space-y-6">
            {step === 0 && (
              <div className="space-y-4">
                {DUMMY_BIDS.map(bid => (
                  <div key={bid.id} className="bg-[#181F2A] rounded-xl p-4 border border-white/10 shadow space-y-2 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div className="flex flex-col gap-1">
                      <span className="font-bold text-lg flex items-center gap-2"><User size={18} />{bid.name}</span>
                      <span className="text-sm flex items-center gap-1"><FileText size={16} /> Proposal: <a href={`/${bid.proposal}`} className="underline text-blue-400 hover:text-blue-300" download>Download</a></span>
                      <span className="text-sm">Bid Amount: <span className="font-semibold text-green-400">₹{bid.amount.toLocaleString()}</span></span>
                      <span className="text-sm">Timeline: <span className="font-semibold text-blue-400">{bid.duration} days</span></span>
                    </div>
                    <button
                      className="mt-2 md:mt-0 px-4 py-2 rounded-lg bg-purple-600/80 text-white font-semibold shadow hover:bg-purple-700 transition"
                      onClick={() => handleAssignContractor(bid)}
                      aria-label="Assign Contractor"
                    >
                      <CheckCircle className="inline mr-1 text-green-300" size={18} /> Assign Contractor
                    </button>
                  </div>
                ))}
                {DUMMY_BIDS.length === 0 && <div className="text-center text-secondary py-8">No bids found.</div>}
              </div>
            )}
            {step === 1 && assignedContractor && (
              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-2 bg-green-600/20 text-green-400 px-4 py-2 rounded-full font-semibold">
                  <CheckCircle size={20} /> Supplier Auto-Selected: {autoSupplier?.name} ({autoSupplier?.zone} Zone)
                </div>
                <button
                  className="mt-4 px-5 py-2 rounded bg-blue-600/80 text-white font-semibold shadow hover:bg-blue-700 transition"
                  onClick={() => setStep(2)}
                  aria-label="Next: Assign Supervisor"
                >
                  Next: Assign Supervisor
                </button>
            </div>
            )}
            {step === 2 && autoSupplier && (
              <div className="flex flex-col gap-4">
                <label className="font-semibold text-white mb-2">Select Supervisor</label>
              <select
                  className="glass px-3 py-2 rounded-lg focus:ring-2 focus:ring-accent/30 text-primary font-semibold text-black"
                  value={selectedSupervisor}
                  onChange={e => setSelectedSupervisor(e.target.value)}
                  aria-label="Select supervisor"
                >
                  <option value="" disabled>Select supervisor…</option>
                  {DUMMY_SUPERVISORS.filter(s => s.region === project.zone).map(sup => (
                    <option key={sup.id} value={sup.id}>{sup.name} ({sup.experience} yrs)</option>
                ))}
              </select>
                <button
                  className="mt-3 px-5 py-2 rounded bg-green-600/80 text-white font-semibold shadow hover:bg-green-700 transition disabled:opacity-50"
                  disabled={!selectedSupervisor || confirming}
                  onClick={handleConfirmSupervisor}
                  aria-label="Confirm supervisor assignment"
                >
                  <CheckCircle className="inline mr-1 text-white" size={18} /> Confirm Assignment
                </button>
            </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function AllProjects() {
  const { hardcodedProjects, dynamicProjects } = useContext(ProjectContext);
  const [modalProject, setModalProject] = useState(null);

  const handleAssign = ({ contractor, supplier, supervisor }) => {
    // Update dynamicProjects in context (would need a setter in context for full sync, but for now, just update local modal state)
    // This is a demo; in a real app, you would update context state here
    if (modalProject) {
      modalProject.status = 'Ongoing';
      modalProject.contractor = contractor;
      modalProject.supplier = supplier;
      modalProject.supervisor = supervisor;
    }
    setModalProject(null);
  };

  return (
    <div className="h-full w-full bg-[#F4F6F9] p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-primary">All My Projects</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Render hardcoded cards first */}
        {hardcodedProjects.map(project => (
          <ProjectCard key={project.id} project={project} onClick={() => {}} isDynamic={false} />
        ))}
        {/* Render dynamic On Bidding cards */}
        {dynamicProjects.map(project => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={p => p.status === 'On Bidding' ? setModalProject(p) : null}
            isDynamic={true}
          />
        ))}
        {hardcodedProjects.length + dynamicProjects.length === 0 && (
          <div className="col-span-full text-center text-secondary py-12">No projects found.</div>
        )}
      </div>
      {modalProject && (
        <OnBiddingModal
          project={modalProject}
          onClose={() => setModalProject(null)}
          onAssign={handleAssign}
        />
      )}
    </div>
  );
} 