import React from 'react';
import { UploadCloud } from 'lucide-react';

export default function DocumentUploadForm({ data, onChange, errors }) {
  const handleFile = (field, file) => {
    onChange(field, file);
  };
  return (
    <div className="space-y-6">
      <div>
        <label className="block font-semibold text-primary mb-1">Legal Documents *</label>
        <div className="flex items-center gap-4">
          <input
            type="file"
            className="hidden"
            id="legal-upload"
            onChange={e => handleFile('legal', e.target.files[0])}
            accept=".pdf,.doc,.docx"
          />
          <label htmlFor="legal-upload" className="flex items-center gap-2 px-4 py-2 rounded bg-accent text-white cursor-pointer hover:scale-105 transition">
            <UploadCloud size={18} /> Upload Legal
          </label>
          {data.legal && <span className="text-primary text-sm">{data.legal.name}</span>}
        </div>
        {errors.legal && <span className="text-error text-xs">{errors.legal}</span>}
      </div>
      <div>
        <label className="block font-semibold text-primary mb-1">Blueprints *</label>
        <div className="flex items-center gap-4">
          <input
            type="file"
            className="hidden"
            id="blueprints-upload"
            onChange={e => handleFile('blueprints', e.target.files[0])}
            accept=".pdf,.jpg,.jpeg,.png"
          />
          <label htmlFor="blueprints-upload" className="flex items-center gap-2 px-4 py-2 rounded bg-accent text-white cursor-pointer hover:scale-105 transition">
            <UploadCloud size={18} /> Upload Blueprints
          </label>
          {data.blueprints && <span className="text-primary text-sm">{data.blueprints.name}</span>}
        </div>
        {errors.blueprints && <span className="text-error text-xs">{errors.blueprints}</span>}
      </div>
      <div>
        <label className="block font-semibold text-primary mb-1">BoQ (Bill of Quantities) *</label>
        <div className="flex items-center gap-4">
          <input
            type="file"
            className="hidden"
            id="boq-upload"
            onChange={e => handleFile('boq', e.target.files[0])}
            accept=".pdf,.xlsx"
          />
          <label htmlFor="boq-upload" className="flex items-center gap-2 px-4 py-2 rounded bg-accent text-white cursor-pointer hover:scale-105 transition">
            <UploadCloud size={18} /> Upload BoQ
          </label>
          {data.boq && <span className="text-primary text-sm">{data.boq.name}</span>}
        </div>
        {errors.boq && <span className="text-error text-xs">{errors.boq}</span>}
      </div>
      <div>
        <label className="block font-semibold text-primary mb-1">Safety Documents *</label>
        <div className="flex items-center gap-4">
          <input
            type="file"
            className="hidden"
            id="safety-upload"
            onChange={e => handleFile('safety', e.target.files[0])}
            accept=".pdf,.doc,.docx"
          />
          <label htmlFor="safety-upload" className="flex items-center gap-2 px-4 py-2 rounded bg-accent text-white cursor-pointer hover:scale-105 transition">
            <UploadCloud size={18} /> Upload Safety
          </label>
          {data.safety && <span className="text-primary text-sm">{data.safety.name}</span>}
        </div>
        {errors.safety && <span className="text-error text-xs">{errors.safety}</span>}
      </div>
    </div>
  );
} 