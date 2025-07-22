import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Overview from "./pages/Overview";
import ProductCatalog from "./pages/ProductCatalog";
import IncomingOrders from "./pages/IncomingOrders";
import DeliveryManagement from "./pages/DeliveryManagement";
import FundTracker from "./pages/FundTracker";
import DeliveryHistory from "./pages/DeliveryHistory";
import Messaging from "./pages/Messaging";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import ProjectDetail from "./pages/ProjectDetail";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

const pages = [
  Overview,
  ProductCatalog,
  IncomingOrders,
  DeliveryManagement,
  FundTracker,
  DeliveryHistory,
  Messaging,
  Profile,
  Settings,
];

function MainLayout() {
  const [active, setActive] = useState(0);
  const Page = pages[active];
  // Only show sidebar items for Operations/Communication (first 7)
  const sidebarActive = active < 7 ? active : 0;
  return (
    <div className="h-screen flex bg-[#23294a] overflow-hidden">
      <Sidebar active={sidebarActive} onSelect={setActive} />
      <div className="flex-1 flex flex-col h-screen">
        {/* <Topbar
          onProfile={() => setActive(7)}
          onSettings={() => setActive(8)}
          onLogout={() => setActive(0)}
          className="ml-2"
        /> */}
        <main className="flex-1 bg-[#23294a] dark:bg-[#23294a]/90 backdrop-blur-xl overflow-y-auto">
          <Page />
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/supplier/project/:projectId" element={<ProjectDetail />} />
      </Routes>
    </Router>
  );
} 