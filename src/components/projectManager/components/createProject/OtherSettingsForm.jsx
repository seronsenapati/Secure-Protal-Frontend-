import React from 'react';

export default function OtherSettingsForm({ data, onChange }) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block font-semibold text-primary mb-1">Enable AI-based Contractor Match</label>
        <input
          type="checkbox"
          checked={data.aiMatch}
          onChange={e => onChange('aiMatch', e.target.checked)}
          className="accent-accent w-5 h-5 mr-2"
        />
        <span className="text-secondary text-sm">Let the system suggest best-fit contractors based on requirements</span>
      </div>
      <div>
        <label className="block font-semibold text-primary mb-1">Additional Comments</label>
        <textarea
          className="glass w-full p-3 rounded-lg focus:ring-2 focus:ring-accent/30"
          placeholder="Any special instructions or notes..."
          value={data.comments}
          onChange={e => onChange('comments', e.target.value)}
          rows={3}
        />
      </div>
    </div>
  );
} 