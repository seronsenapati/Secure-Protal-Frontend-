import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
  getMyProjects, 
  createProject as createProjectApi, 
  getProjectById,
  finalizeProjectTeam
} from '../../services/projectService';
import { getBidsByProject, assignContractor } from '../../services/bidService';
import { requestFund } from '../../services/fundService';
import { 
  uploadDocument, 
  listDocumentsByEntity,
  downloadDocument as downloadDocumentApi
} from '../../services/documentService';
import { isAuthenticated, getCurrentUserRole } from '../../services/authService';

// Components
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
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import Layout from './components/Layout';
import { ProjectContext } from './projectContext';

const initialProjects = [];

// Component to handle tab state based on route
const RouteHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [projects, setProjects] = useState(initialProjects);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Fetch projects on component mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const pmId = localStorage.getItem('userId');
        if (!pmId) {
          navigate('/login');
          return;
        }
        
        setIsLoading(true);
        const data = await getMyProjects(pmId);
        setProjects(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch projects:', err);
        setError('Failed to load projects. Please try again.');
        toast.error('Failed to load projects');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [navigate]);

  // Set active tab based on route
  useEffect(() => {
    const path = location.pathname.split('/').pop() || 'dashboard';
    setActiveTab(path);
  }, [location]);

  // Check authentication
  useEffect(() => {
    if (!isAuthenticated() || getCurrentUserRole() !== 'pm') {
      navigate('/login');
    }
  }, [navigate]);

  // Handle project creation
  const handleCreateProject = async (projectData, pmId, departmentId, pmName) => {
    try {
      setIsLoading(true);
      const newProject = await createProjectApi(projectData, pmId, departmentId, pmName);
      setProjects(prev => [...prev, newProject]);
      toast.success('Project created successfully!');
      return newProject;
    } catch (error) {
      console.error('Error creating project:', error);
      toast.error('Failed to create project');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Handle fetching project by ID
  const fetchProjectById = async (projectId) => {
    try {
      setIsLoading(true);
      const project = await getProjectById(projectId);
      return project;
    } catch (error) {
      console.error('Error fetching project:', error);
      toast.error('Failed to fetch project details');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Handle fetching bids for a project
  const fetchBids = async (projectId) => {
    try {
      setIsLoading(true);
      const bids = await getBidsByProject(projectId);
      return bids;
    } catch (error) {
      console.error('Error fetching bids:', error);
      toast.error('Failed to fetch bids');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Handle fund request
  const handleRequestFund = async (fundData) => {
    try {
      setIsLoading(true);
      const result = await requestFund(fundData);
      toast.success('Fund request submitted successfully');
      return result;
    } catch (error) {
      console.error('Error requesting fund:', error);
      toast.error('Failed to submit fund request');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Handle document upload
  const handleUploadDocument = async (file, entityType, entityId, purpose, userId, role) => {
    try {
      setIsLoading(true);
      const result = await uploadDocument(file, entityType, entityId, purpose, userId, role);
      toast.success('Document uploaded successfully');
      return result;
    } catch (error) {
      console.error('Error uploading document:', error);
      toast.error('Failed to upload document');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Handle fetching documents
  const fetchDocuments = async (entityType, entityId) => {
    try {
      setIsLoading(true);
      const documents = await listDocumentsByEntity(entityType, entityId);
      return documents;
    } catch (error) {
      console.error('Error fetching documents:', error);
      toast.error('Failed to fetch documents');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Handle document download
  const handleDownloadDocument = async (fileId, fileName) => {
    try {
      setIsLoading(true);
      await downloadDocumentApi(fileId, fileName);
    } catch (error) {
      console.error('Error downloading document:', error);
      toast.error('Failed to download document');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Handle finalizing project team
  const handleFinalizeTeam = async (projectId, contractorId, supervisorId) => {
    try {
      setIsLoading(true);
      const result = await finalizeProjectTeam(projectId, contractorId, supervisorId);
      toast.success('Project team finalized successfully');
      return result;
    } catch (error) {
      console.error('Error finalizing team:', error);
      toast.error('Failed to finalize project team');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Handle contractor assignment
  const handleAssignContractor = async (bidId, projectId) => {
    try {
      setIsLoading(true);
      const result = await assignContractor(bidId, projectId);
      toast.success('Contractor assigned successfully');
      return result;
    } catch (error) {
      console.error('Error assigning contractor:', error);
      toast.error('Failed to assign contractor');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Set active tab based on route
  useEffect(() => {
    const path = location.pathname.split('/').pop() || 'dashboard';
    setActiveTab(path);
  }, [location]);

  // Check authentication
  useEffect(() => {
    if (!isAuthenticated() || getCurrentUserRole() !== 'pm') {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <ProjectContext.Provider value={{
      projects,
      isLoading,
      error,
      createProject: handleCreateProject,
      getProject: fetchProjectById,
      getBids: fetchBids,
      requestFund: handleRequestFund,
      uploadDocument: handleUploadDocument,
      downloadDocument: handleDownloadDocument,
      getDocuments: fetchDocuments,
      finalizeTeam: handleFinalizeTeam,
      assignContractor: handleAssignContractor,
      refreshProjects: () => {
        const pmId = localStorage.getItem('userId');
        if (pmId) {
          getMyProjects(pmId).then(setProjects).catch(console.error);
        }
      }
    }}>
      <Routes>
        <Route path="/" element={<Layout activeTab={activeTab} setActiveTab={setActiveTab} />}>
          <Route index element={<DashboardHome />} />
          <Route path="create-project" element={<CreateProject />} />
          <Route path="all-projects" element={<AllProjects />} />
          <Route path="view-bids" element={<ViewBids />} />
          <Route path="assign-team" element={<AssignSupervisorSupplier />} />
          <Route path="monitor" element={<ProjectMonitoring />} />
          <Route path="fund-requests" element={<FundRequests />} />
          <Route path="documents" element={<DocumentsBlueprints />} />
          <Route path="chat" element={<InternalChat />} />
          <Route path="reports" element={<ExportReports />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </ProjectContext.Provider>
  );
};

const App = () => {
  // Configure toast notifications
  useEffect(() => {
    toast.configure({
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }, []);

  return <RouteHandler />;
};

export default App;
