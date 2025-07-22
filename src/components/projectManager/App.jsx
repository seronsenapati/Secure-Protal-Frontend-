import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import DashboardHome from './pages/DashboardHome';
import CreateProject from './pages/CreateProject';
import AllProjects from './pages/AllProjects';
import ViewBids from './pages/ViewBids';
import AssignSupervisorSupplier from './pages/AssignSupervisorSupplier';
import ProjectMonitoring from './pages/ProjectMonitoring';
import FundRequests from './pages/FundRequests';
import DocumentsBlueprints from './pages/DocumentsBlueprints';
import InternalChat from './pages/InternalChat';
import ExportReports from './pages/ExportReports';
import ParticleBackground from './components/ParticleBackground';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import { ProjectContext } from './projectContext';

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

const App = () => {
  const [dynamicProjects, setDynamicProjects] = useState([]);
  const addProject = (project) => setDynamicProjects(prev => [...prev, project]);

  return (
    <ProjectContext.Provider value={{ addProject, dynamicProjects, hardcodedProjects }}>
      <Router>
        <div className="relative min-h-screen flex bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-text font-sans">
          <ParticleBackground />
          <Sidebar />
          <div className="flex-1 flex flex-col min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900  ">
            {/* <Topbar /> */}
            <main className="flex-1 p-6 ">
              <Routes>
                <Route path="/" element={<DashboardHome />} />
                <Route path="/create-project" element={<CreateProject />} />
                <Route path="/all-projects" element={<AllProjects />} />
                <Route path="/view-bids" element={<ViewBids />} />
                <Route path="/assign-supervisor-supplier" element={<AssignSupervisorSupplier />} />
                <Route path="/project-monitoring" element={<ProjectMonitoring />} />
                <Route path="/fund-requests" element={<FundRequests />} />
                <Route path="/documents-blueprints" element={<DocumentsBlueprints />} />
                <Route path="/internal-chat" element={<InternalChat />} />
                <Route path="/export-reports" element={<ExportReports />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </ProjectContext.Provider>
  );
};

export default App;
