import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProjectDetailsPopup from './BiddingDetailsCard';
import BiddingFormCard from './BiddingForm';

import {
  Search,
  Filter,
  FileText,
  Calendar,
  DollarSign,
  Clock,
  Users,
  Eye,
  Star,
  MapPin,
  Briefcase,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  ArrowRight,
  X,
  Upload,
  Send,
  Shield,
  Home,
  Settings,
  Bell,
  UserCircle,
  LogOut,
  ChevronDown,
  User,
  Activity,
  BarChart3,
  MessageSquare,
  ImportIcon,
  IndianRupee
} from 'lucide-react';

import {
  openViewDetails,
  closeViewDetails,
  showBiddingForm,
  hideBiddingForm,
  recalculateDashMode,

} from './dashboardSlice';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AvailableProjects = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBudgetRange, setSelectedBudgetRange] = useState('all');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { viewProject, showViewDetails, showBiddingForm: isBiddingFormVisible } = useSelector(
    state => state.projectsDashboard
  );
  const dashboardMode = useSelector(state => state.projectsDashboard.dashMode)
  useEffect(() => {
    dispatch(recalculateDashMode())
      if (dashboardMode === 'execution') {
        navigate('/'); 
      }
  }, [dashboardMode, navigate]);
  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: Home, link: "/" },
    { id: 'projects', label: 'Available Projects', icon: FileText, link: "/availableprojects" },
    { id: 'bids', label: 'My Bids', icon: DollarSign, link: "/bids" },
    { id: 'settings', label: 'Settings', icon: Settings, link: "/settings" },
  ];
const toggleProfileDropdown = () => {
    setIsProfileOpen(!isProfileOpen);
  };
  // Minimal mock data - only 2 projects
  const projects = [
    {
      id: 1,
      name: 'Municipal Infrastructure Upgrade',
      description: 'Comprehensive road and utilities upgrade in the downtown area including water pipeline replacement and electrical infrastructure modernization.',
      department: 'Public Works Department',
      zone: 'Downtown District',
      region: 'Central Mumbai',
      category: 'Infrastructure',
      deadline: '2024-09-15',
      expectedStartDate: '2024-08-01',
      bidSubmissionDeadline: '2024-07-20',
      budget: '₹1,50,000',
      budgetValue: 150000,
      rating: 4.8,
      contractorRequirements: [
        'Valid Construction License (Class A)',
        'Minimum 5 years experience in municipal projects',
        'Safety certification from recognized authority'
      ],
      requiredMaterials: [
        'High-grade concrete (Grade M25)',
        'Steel reinforcement bars',
        'Electrical cables and fixtures'
      ],
      estimatedQuantities: [
        'Concrete: 500 cubic meters',
        'Steel: 50 tons',
        'Electrical cables: 2km'
      ],
      documents: {
        legal: [
          { name: 'Project Agreement Template', type: 'PDF', size: '2.4 MB' },
          { name: 'Terms & Conditions', type: 'PDF', size: '1.8 MB' }
        ],
        blueprints: [
          { name: 'Site Layout Plan', type: 'PDF', size: '5.6 MB' },
          { name: 'Electrical Schematic', type: 'PDF', size: '4.2 MB' }
        ],
        boq: [
          { name: 'Bill of Quantities - Main', type: 'XLSX', size: '890 KB' }
        ],
        safety: [
          { name: 'Safety Protocols', type: 'PDF', size: '1.9 MB' }
        ]
      },
      aiSupplierMatch: true,
      comments: 'This project is part of the city\'s smart infrastructure initiative.',
      bidsCount: 8,
      timeLeft: '5 days',
      status: 'bidding',
      urgency: 'high'
    },
    {
      id: 2,
      name: 'Primary Healthcare Center Renovation',
      description: 'Interior and exterior renovation of PHCs including HVAC systems, medical gas pipelines, and patient-friendly facilities.',
      department: 'Health Infrastructure Division',
      zone: 'Rural Block B',
      region: 'North Karnataka',
      category: 'Renovation',
      deadline: '2024-08-30',
      expectedStartDate: '2024-08-15',
      bidSubmissionDeadline: '2024-07-25',
      budget: '₹95,000',
      budgetValue: 95000,
      rating: 4.5,
      contractorRequirements: [
        'Class B Contractor License or higher',
        'Previous healthcare facility work (min. 2 projects)',
        'Sanitation & Safety Compliance Certification'
      ],
      requiredMaterials: [
        'Non-toxic Paints',
        'LED Fixtures',
        'Medical-grade Piping'
      ],
      estimatedQuantities: [
        'Paint: 3,000 sq. ft',
        'LED Panels: 100 units',
        'Gas Pipe: 400 meters'
      ],
      documents: {
        legal: [
          { name: 'PHC Renovation Contract', type: 'PDF', size: '2.0 MB' }
        ],
        blueprints: [
          { name: 'Interior Refurb Plan', type: 'PDF', size: '3.1 MB' }
        ],
        boq: [
          { name: 'Detailed BoQ', type: 'XLSX', size: '700 KB' }
        ],
        safety: [
          { name: 'Hospital Safety Manual', type: 'PDF', size: '1.7 MB' }
        ]
      },
      aiSupplierMatch: true,
      comments: 'Essential healthcare project. Speed and hygiene compliance will influence contractor selection.',
      bidsCount: 5,
      timeLeft: '7 days',
      status: 'bidding',
      urgency: 'medium'
    }
  ];

  const categories = ['all', 'Infrastructure', 'Renovation', 'Construction', 'Maintenance'];
  const budgetRanges = [
    { label: 'All Budgets', value: 'all' },
    { label: '₹50,000 - ₹1,00,000', value: '50000-100000' },
    { label: '₹1,00,000 - ₹2,00,000', value: '100000-200000' },
    { label: '₹2,00,000+', value: '200000+' }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    
    const matchesBudget = selectedBudgetRange === 'all' || 
      (selectedBudgetRange === '50000-100000' && project.budgetValue >= 50000 && project.budgetValue <= 100000) ||
      (selectedBudgetRange === '100000-200000' && project.budgetValue >= 100000 && project.budgetValue <= 200000) ||
      (selectedBudgetRange === '200000+' && project.budgetValue >= 200000);
    
    return matchesSearch && matchesCategory && matchesBudget;
  });

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high': return 'text-red-400 bg-red-400/20';
      case 'medium': return 'text-yellow-400 bg-yellow-400/20';
      case 'low': return 'text-green-400 bg-green-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  return (
    <div className="flex h-screen font-sans bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Sidebar */}
      <div className="w-72 bg-slate-800/60 backdrop-blur-xl border-r border-slate-700/50 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-yellow-500/5"></div>

        {/* Logo */}
        <div className="flex items-center gap-3 p-6 relative z-10">
          <div className="w-10 h-10 bg-gradient-to-r from-amber-400 to-orange-300 rounded-xl flex items-center justify-center">
            <Shield className="w-6 h-6 text-slate-900" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-amber-400 to-orange-300 bg-clip-text text-transparent">
            SecurePortal
          </h1>
        </div>

        {/* Navigation */}
        <nav className="mt-4 px-4 relative z-10">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link to={item.link} key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all duration-300 ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r from-yellow-300 via-emerald-400 to-cyan-400 text-slate-900 font-medium hover:brightness-110 transition-all shadow-lg shadow-emerald-500/20'
                      : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </Link>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="absolute bottom-6 left-4 right-4 bg-slate-700/50 rounded-xl p-4 backdrop-blur-sm">
          <div className="flex items-center gap-3 cursor-pointer"
          onClick={toggleProfileDropdown}>
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-slate-900" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">Contractor</p>
              <p className="text-xs text-slate-400">contractor@secureportal.com</p>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </div>
          {isProfileOpen && (
            <div className="mt-3 bg-slate-600/50 rounded-lg p-2">
              <Link to="/profile">
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:bg-slate-500/50 rounded-md transition-colors">
                  <UserCircle className="w-4 h-4" />
                  Profile
                </button>
              </Link>
              <Link to="/logout">
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm bg-red-400/40 text-red-400/90 hover:bg-slate-500/50 rounded-md transition-colors">
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-slate-800/30 backdrop-blur-sm border-b border-slate-700/50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-cyan-400">Available Projects</h2>
              <p className="text-slate-400 mt-1">Discover and bid on government projects</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  className="pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                />
              </div>
              <button className="relative p-2 bg-slate-700/50 rounded-lg hover:bg-slate-600/50 transition-colors">
                <Bell className="w-5 h-5 text-slate-300" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-6">
          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <TrendingUp className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{filteredProjects.length}</h3>
              <p className="text-slate-400 text-sm">Available Projects</p>
            </div>
            
            <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <TrendingUp className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">8</h3>
              <p className="text-slate-400 text-sm">Projects Viewed</p>
            </div>
            
            <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-emerald-400 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <TrendingUp className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">2</h3>
              <p className="text-slate-400 text-sm">Active Bids</p>
            </div>
            
            <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <TrendingUp className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">85%</h3>
              <p className="text-slate-400 text-sm">Success Rate</p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search projects, categories, or locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
              />
            </div>
            
            <div className="flex gap-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
              >
                {categories.map(category => (
                  <option key={category} value={category} className="bg-slate-800">
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
              
              <select
                value={selectedBudgetRange}
                onChange={(e) => setSelectedBudgetRange(e.target.value)}
                className="px-4 py-3 bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
              >
                {budgetRanges.map(range => (
                  <option key={range.value} value={range.value} className="bg-slate-800">
                    {range.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div key={project.id} className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 hover:transform hover:scale-105">
                {/* Project Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 rounded-xl flex items-center justify-center">
                      <FileText className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div className={`px-2 py-1 rounded-lg text-xs font-medium ${getUrgencyColor(project.urgency)}`}>
                      {project.urgency} priority
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-slate-300">{project.rating}</span>
                  </div>
                </div>

                {/* Project Title */}
                <h3 className="text-xl font-bold text-white mb-2">{project.name}</h3>
                <p className="text-sm text-slate-400 mb-4 line-clamp-2">{project.description}</p>

                {/* Project Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-300">{project.region}, {project.zone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-300">{project.department}</span>
                  </div>
                </div>

                {/* Budget and Timeline */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-slate-700/30 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <IndianRupee className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs text-slate-400">Budget</span>
                    </div>
                    <p className="text-sm font-bold text-emerald-400">{project.budget}</p>
                  </div>
                  
                  <div className="bg-slate-700/30 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-yellow-400" />
                      <span className="text-xs text-slate-400">Time Left</span>
                    </div>
                    <p className="text-sm font-bold text-yellow-400">{project.timeLeft}</p>
                  </div>
                </div>

                {/* Bids Count */}
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-300">{project.bidsCount} bids submitted</span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    className="flex-1 bg-slate-600/30 hover:bg-slate-600/50 text-slate-300 hover:text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                    onClick={() => {
                      dispatch(openViewDetails(project));
                    }}
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-slate-700/30 rounded-full flex items-center justify-center">
                <Search className="w-12 h-12 text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No projects found</h3>
              <p className="text-slate-400">Try adjusting your search criteria or filters</p>
            </div>
          )}
        </div>
      </div>

      {/* Project Details Modal */}
      {showViewDetails && (
        <ProjectDetailsPopup  
          isOpen={showViewDetails} 
          onClose={() => dispatch(closeViewDetails())} 
          project={viewProject}
          onInterested={() => {
            dispatch(showBiddingForm());
            dispatch(closeViewDetails());
          }}
        />
      )}
      
      {/* Bidding Form Modal */}
      {isBiddingFormVisible && (
        <BiddingFormCard
          project={viewProject}
          show={true}
          onClose={() => dispatch(hideBiddingForm())}
        />
      )}
    </div>
  );
};

export default AvailableProjects;