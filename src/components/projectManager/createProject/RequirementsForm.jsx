import React from 'react';
import { Plus } from 'lucide-react';
const SKILLS = ['Civil Engineering', 'Electrical', 'Plumbing', 'Masonry', 'Surveying'];
const LICENSES = ['Class A', 'Class B', 'Class C', 'ISO 9001', 'Safety'];

export default function RequirementsForm({ data, onChange, errors }) {
  const toggleMulti = (field, value) => {
    const arr = data[field] || [];
    if (arr.includes(value)) {
      onChange(field, arr.filter(v => v !== value));
    } else {
      onChange(field, [...arr, value]);
    }
  };
  const addMaterial = () => onChange('materials', [...(data.materials || []), { name: '', qty: '' }]);
  const updateMaterial = (i, field, value) => {
    const arr = [...(data.materials || [])];
    arr[i][field] = value;
    onChange('materials', arr);
  };
  const removeMaterial = (i) => {
    const arr = [...(data.materials || [])];
    arr.splice(i, 1);
    onChange('materials', arr);
  };
  return (
    <div className="space-y-6">
      <div>
        <label className="block font-semibold text-primary mb-1">Skills Required *</label>
        <div className="flex flex-wrap gap-2">
          {SKILLS.map(skill => (
            <button
              type="button"
              key={skill}
              className={`px-3 py-1 rounded-full border ${data.skills?.includes(skill) ? 'bg-accent text-white border-accent' : 'bg-border text-primary border-border'} transition`}
              onClick={() => toggleMulti('skills', skill)}
            >
              {skill}
            </button>
          ))}
        </div>
        {errors.skills && <span className="text-error text-xs">{errors.skills}</span>}
      </div>
      <div>
        <label className="block font-semibold text-primary mb-1">License Types Required *</label>
        <div className="flex flex-wrap gap-2">
          {LICENSES.map(lic => (
            <button
              type="button"
              key={lic}
              className={`px-3 py-1 rounded-full border ${data.licenses?.includes(lic) ? 'bg-accent text-white border-accent' : 'bg-border text-primary border-border'} transition`}
              onClick={() => toggleMulti('licenses', lic)}
            >
              {lic}
            </button>
          ))}
        </div>
        {errors.licenses && <span className="text-error text-xs">{errors.licenses}</span>}
      </div>
      <div>
        <label className="block font-semibold text-primary mb-1">Materials Needed *</label>
        <div className="space-y-2">
          {(data.materials || []).map((mat, i) => (
            <div key={i} className="flex gap-2 items-center">
              <input
                className="glass p-2 rounded-lg flex-1 focus:ring-2 focus:ring-accent/30"
                placeholder="Material Name"
                value={mat.name}
                onChange={e => updateMaterial(i, 'name', e.target.value)}
                required
              />
              <input
                type="number"
                className="glass p-2 rounded-lg w-24 focus:ring-2 focus:ring-accent/30"
                placeholder="Qty"
                value={mat.qty}
                onChange={e => updateMaterial(i, 'qty', e.target.value)}
                required
              />
              <button type="button" onClick={() => removeMaterial(i)} className="text-error font-bold px-2">×</button>
            </div>
          ))}
          <button type="button" onClick={addMaterial} className="flex items-center gap-1 px-3 py-1 rounded bg-accent text-white hover:scale-105 transition mt-2">
            <Plus size={16} /> Add Material
          </button>
        </div>
        {errors.materials && <span className="text-error text-xs">{errors.materials}</span>}
      </div>
    </div>
  );
} 