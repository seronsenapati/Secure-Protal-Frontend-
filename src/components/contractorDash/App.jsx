import './App.css';
import Dashboard from './LandingDashboardContractor';
import AvailableProjects from './AvailableProjects';
import RequestFund from './RequestFund';
import MyBids from './MyBids';
import Updates from './ProjectUpdates';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Expense from './Expense';
// import Profile from './Profile'
// import SettingsTab from './Settings'

function App() {
  

  return (
   <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  )
}

export default App
