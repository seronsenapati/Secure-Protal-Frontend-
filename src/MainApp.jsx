import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Landing page
import LandingPage from "./components/landingPage/components/landing/LandingPage/index.jsx";

// Contractor
import ContractorDashboard from "./components/contractorDash/LandingDashboardContractor.jsx";

// Supplier
// TODO: Replace with actual SupplierLogin component if/when available
const SupplierLogin = () => <div>Supplier Login (Component not found)</div>;
import SupplierDashboard from "./components/supplier/pages/Overview.jsx";

// Government
// TODO: Replace with actual GovLogin component if/when available
const GovLogin = () => <div>Government Login (Component not found)</div>;
// TODO: Replace with actual ProjectManagerDashboard component if/when available
const ProjectManagerDashboard = () => <div>Project Manager Dashboard (Component not found)</div>;
import SupervisorDashboard from "./components/supervisorDash/LandingDashboardSupervisor.jsx";

function MainApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/contractor/login" element={<LandingPage contractorLoginModalOpen />} />
        <Route path="/dashboard/contractor" element={<ContractorDashboard />} />
        <Route path="/supplier/login" element={<SupplierLogin />} />
        <Route path="/dashboard/supplier" element={<SupplierDashboard />} />
        <Route path="/gov/login" element={<GovLogin />} />
        <Route path="/dashboard/pm" element={<ProjectManagerDashboard />} />
        <Route path="/dashboard/supervisor" element={<SupervisorDashboard />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default MainApp;