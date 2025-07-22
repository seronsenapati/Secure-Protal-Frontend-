
import './App.css'
import Dashboard from './components/LandingDashboardContractor'
import AvailableProjects from './components/AvailableProjects'
import RequestFund from './components/RequestFund'
import MyBids from './components/MyBids'
import Updates from './components/ProjectUpdates'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Expense from './components/Expense'
// import Profile from './components/contractorDash/Profile'
// import SettingsTab from './components/contractorDash/Settings'

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
