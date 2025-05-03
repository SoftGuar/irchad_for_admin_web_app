import React, { useState } from 'react';
import { Zone } from '@/types/environment';

interface ZoneSelectorProps {
  onZoneCreate: (zone: Omit<Zone, 'id' | 'shapes'>) => void;
}

const ZoneSelector: React.FC<ZoneSelectorProps> = ({ onZoneCreate }) => {
  const [zoneName, setZoneName] = useState('');
  const [zoneColor, setZoneColor] = useState('#3B82F6'); // Default blue color
  const [isCreating, setIsCreating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!zoneName.trim()) return;

    onZoneCreate({
      name: zoneName.trim(),
      type: 'custom',
      color: zoneColor,
      category: 'custom',
      width: 0,
      height: 0,
      image: ''
    });

    setZoneName('');
    setIsCreating(false);
  };

  if (!isCreating) {
    return (
      <button
        onClick={() => setIsCreating(true)}
        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
      >
        Create Zone
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        value={zoneName}
        onChange={(e) => setZoneName(e.target.value)}
        placeholder="Zone name"
        className="px-2 py-1 border rounded text-sm"
        autoFocus
      />
      <input
        type="color"
        value={zoneColor}
        onChange={(e) => setZoneColor(e.target.value)}
        className="w-8 h-8 rounded cursor-pointer"
      />
      <button
        type="submit"
        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-sm"
      >
        Add
      </button>
      <button
        type="button"
        onClick={() => setIsCreating(false)}
        className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors text-sm"
      >
        Cancel
      </button>
    </form>
  );
};

export default ZoneSelector;
