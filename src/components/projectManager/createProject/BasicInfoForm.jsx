import React from 'react';
const DEPARTMENTS = ['Public Works', 'Education', 'Health', 'Transport'];
const ZONES = ['North', 'South', 'East', 'West', 'Central'];

export default function BasicInfoForm({ data, onChange, errors }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block font-semibold text-primary mb-1">Project Title *</label>
        <input
          className={`glass w-full p-3 rounded-lg focus:ring-2 focus:ring-accent/30 ${errors.title ? 'border-error' : ''}`}
          placeholder="Enter project title"
          value={data.title}
          onChange={e => onChange('title', e.target.value)}
          required
        />
        {errors.title && <span className="text-error text-xs">{errors.title}</span>}
      </div>
      <div className="md:col-span-2">
        <label className="block font-semibold text-primary mb-1">Project Description *</label>
        <textarea
          className={`glass w-full p-3 rounded-lg focus:ring-2 focus:ring-accent/30 ${errors.description ? 'border-error' : ''}`}
          placeholder="Describe the project"
          value={data.description}
          onChange={e => onChange('description', e.target.value)}
          rows={3}
          required
        />
        {errors.description && <span className="text-error text-xs">{errors.description}</span>}
      </div>
      <div>
        <label className="block font-semibold text-primary mb-1">Department</label>
        <input
          className="glass w-full p-3 rounded-lg bg-gray-100 text-secondary cursor-not-allowed"
          value={DEPARTMENTS[0]}
          disabled
        />
      </div>
      <div>
        <label className="block font-semibold text-primary mb-1">Zone / Region *</label>
        <select
          className={`glass w-full p-3 rounded-lg focus:ring-2 focus:ring-accent/30 ${errors.zone ? 'border-error' : ''}`}
          value={data.zone}
          onChange={e => onChange('zone', e.target.value)}
          required
        >
          <option value="">Select Zone</option>
          {ZONES.map(z => <option key={z} value={z}>{z}</option>)}
        </select>
        {errors.zone && <span className="text-error text-xs">{errors.zone}</span>}
      </div>
    </div>
  );
} 