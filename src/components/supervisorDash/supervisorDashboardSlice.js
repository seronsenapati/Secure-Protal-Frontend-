import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: {
    Name: "",
    firmName: "",
    state:"",
    region:"",
    experience: "",
  },
  supplier: {},
  showViewDetails: false,
  showBiddingForm: false,
  fundReq: [
    {
      "id": 1,
      "tasks": [
        {
          "id": 1,
          "description": "Foundation construction",
          "amount": 50000
        },
        {
          "id": 2,
          "description": "Plumbing installation",
          "amount": 35000
        }
      ],
      "laborCosts": [
        {
          "id": 1,
          "role": "Mason",
          "howMany": 4,
          "days": 12,
          "dailyRate": 850
        },
        {
          "id": 2,
          "role": "Plumber",
          "howMany": 2,
          "days": 8,
          "dailyRate": 1200
        }
      ],
      "timeline": [
        {
          "id": 1,
          "phase": "Foundation Work",
          "startDate": "2025-07-12",
          "endDate": "2025-07-24"
        },
        {
          "id": 2,
          "phase": "Plumbing Setup",
          "startDate": "2025-07-25",
          "endDate": "2025-08-02"
        }
      ],
      "totalAmount": 149600,
      "notes": "Request submitted at 07:45 PM IST on July 10, 2025. Additional materials may be needed due to weather delays.",
      "status": "approved",
      "submissionDate": "2025-07-10T19:45:00+05:30"
    },
    {
      "id": 2,
      "tasks": [
        {
          "id": 1,
          "description": "Electrical wiring setup",
          "amount": 30000
        },
        {
          "id": 2,
          "description": "Painting interior walls",
          "amount": 25000
        }
      ],
      "laborCosts": [
        {
          "id": 1,
          "role": "Electrician",
          "howMany": 2,
          "days": 7,
          "dailyRate": 1000
        },
        {
          "id": 2,
          "role": "Painter",
          "howMany": 3,
          "days": 10,
          "dailyRate": 700
        }
      ],
      "timeline": [
        {
          "id": 1,
          "phase": "Electrical Work",
          "startDate": "2025-08-03",
          "endDate": "2025-08-10"
        },
        {
          "id": 2,
          "phase": "Painting Phase",
          "startDate": "2025-08-11",
          "endDate": "2025-08-20"
        }
      ],
      "totalAmount": 101900,
      "notes": "Request submitted at 07:45 PM IST on July 10, 2025. Requires urgent approval for next phase.",
      "status": "pending",
      "submissionDate": "2025-07-10T19:45:00+05:30"
    }
  ],
  allotedProject: {
    id: 1,
    name: 'Municipal Infrastructure Upgrade',
    description: 'Comprehensive road and utilities upgrade in the downtown area including water pipeline replacement, electrical infrastructure modernization, and road resurfacing.',
    department: 'Public Works Department',
    zone: 'Downtown District',
    region: 'Central Mumbai',
    deadline: '2024-09-15',
    expectedStartDate: '2024-08-01',
    bidSubmissionDeadline: '2024-07-20',
    budget: '₹1,50,000',
    contractorRequirements: [
      'Valid Construction License (Class A)',
      'Minimum 5 years experience in municipal projects',
      'Safety certification from recognized authority',
      'Equipment ownership/lease certification'
    ],
    requiredMaterials: [
      'High-grade concrete (Grade M25)',
      'Steel reinforcement bars',
      'Electrical cables and fixtures',
      'Water pipeline materials (PVC/HDPE)'
    ],
    estimatedQuantities: [
      'Concrete: 500 cubic meters',
      'Steel: 50 tons',
      'Electrical cables: 2km',
      'Pipeline: 1.5km'
    ],
    documents: {
      legal: [
        { name: 'Project Agreement Template', type: 'PDF', size: '2.4 MB' },
        { name: 'Terms & Conditions', type: 'PDF', size: '1.8 MB' },
        { name: 'Compliance Guidelines', type: 'PDF', size: '3.2 MB' }
      ],
      blueprints: [
        { name: 'Site Layout Plan', type: 'PDF', size: '5.6 MB' },
        { name: 'Electrical Schematic', type: 'PDF', size: '4.2 MB' },
        { name: 'Water Pipeline Layout', type: 'PDF', size: '3.8 MB' }
      ],
      boq: [
        { name: 'Bill of Quantities - Main', type: 'XLSX', size: '890 KB' },
        { name: 'Material Specifications', type: 'PDF', size: '2.1 MB' }
      ],
      safety: [
        { name: 'Safety Protocols', type: 'PDF', size: '1.9 MB' },
        { name: 'Emergency Procedures', type: 'PDF', size: '1.2 MB' },
        { name: 'Environmental Impact Assessment', type: 'PDF', size: '4.5 MB' }
      ]
    },
    aiSupplierMatch: true,
    comments: 'This project is part of the city\'s smart infrastructure initiative. Priority will be given to contractors with experience in smart city projects.',
    bidsCount: 8,
    timeLeft: '5 days',
    status: 'execution',
    progress: 10,
    supervisor: "someone",
    currentPhase: "Phase 1",
    nextPhase: "Phase 2",
    startDate: "10/09/2025",
    endDate: "10/12/2025"
  },
  bill: [],
  submittedUpdates: [
    {
      id: 1,
      date: '2024-07-03',
      type: 'daily',
      workDone: 'Completed foundation excavation for section A',
      hoursWorked: '8',
      status: 'approved',
      photos: 3
    },
    {
      id: 2,
      date: '2024-07-02',
      type: 'daily',
      workDone: 'Steel reinforcement installation',
      hoursWorked: '7.5',
      status: 'pending',
      photos: 5
    },
  ],
  settings: {
    notificationPrefs: { email: true, push: false, sms: false },
    theme: 'light',
    language: 'en',
    memoryEnabled: true,
  },
};

const supervisorDashboardSlice = createSlice({
  name: 'supervisorDashboard',
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    openViewDetails: (state, action) => {
      state.viewProject = action.payload;
      state.showViewDetails = true;
    },
    closeViewDetails: (state) => {
      state.showViewDetails = false;
    },
    showBiddingForm: (state) => {
      state.showBiddingForm = true;
      state.showViewDetails = false;
    },
    hideBiddingForm: (state) => {
      state.showBiddingForm = false;
      state.viewProject = null;
    },
    clearProject: (state) => {
      state.viewProject = null;
      state.showViewDetails = false;
      state.showBiddingForm = false;
    },
    setSubmittedUpdates: (state, action) => {
      state.submittedUpdates = action.payload;
    },
    setFundReq: (state, action) => {
      state.fundReq = action.payload;
    },
    setBill: (state, action) => {
      state.bill = action.payload;
    },
    updateProfile: (state, action) => {
      state.profile = { ...state.profile, ...action.payload };
    },
    updateSettings: (state, action) => {
      state.settings = { ...state.settings, ...action.payload };
    },
    toggleMemory: (state) => {
      state.settings.memoryEnabled = !state.settings.memoryEnabled;
    },
    updateProjectPhase: (state, action) => {
      const newPhase = action.payload;
      const phaseSequence = ['Phase 1', 'Phase 2', 'Phase 3', 'Completion'];
      if (phaseSequence.includes(newPhase)) {
        state.allotedProject.currentPhase = newPhase;
        const currentIndex = phaseSequence.indexOf(newPhase);
        state.allotedProject.nextPhase = phaseSequence[currentIndex + 1] || '';
      } else {
        console.error('Invalid phase provided:', newPhase);
      }
    },
  }
});

export const {
  openViewDetails,
  closeViewDetails,
  showBiddingForm,
  hideBiddingForm,
  clearProject,
  setSubmittedUpdates,
  setFundReq,
  setBill,
  updateProfile,
  updateSettings,
  toggleMemory,
  updateProjectPhase
} = supervisorDashboardSlice.actions;

export default supervisorDashboardSlice.reducer;