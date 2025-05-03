import React, { useState } from 'react';
import { POI } from '@/types/environment';

interface POISelectorProps {
  onPOICreate: (poi: Omit<POI, 'id' | 'x' | 'y'>) => void;
}

const POISelector: React.FC<POISelectorProps> = ({ onPOICreate }) => {
  const [poiName, setPoiName] = useState('');
  const [poiColor, setPoiColor] = useState('#FF5733'); // Default orange color
  const [isCreating, setIsCreating] = useState(false);
  const [poiType, setPoiType] = useState('default');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!poiName.trim()) return;

    onPOICreate({
      name: poiName.trim(),
      color: poiColor,
      type: poiType,
      description: description.trim()
    });

    setPoiName('');
    setDescription('');
    setIsCreating(false);
  };

  if (!isCreating) {
    return (
      <button
        onClick={() => setIsCreating(true)}
        className="px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors text-sm"
      >
        Add POI
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        value={poiName}
        onChange={(e) => setPoiName(e.target.value)}
        placeholder="POI name"
        className="px-2 py-1 border rounded text-sm"
        autoFocus
      />
      <input
        type="color"
        value={poiColor}
        onChange={(e) => setPoiColor(e.target.value)}
        className="w-8 h-8 rounded cursor-pointer"
      />
      <select
        value={poiType}
        onChange={(e) => setPoiType(e.target.value)}
        className="px-2 py-1 border rounded text-sm"
      >
        <option value="default">Default</option>
        <option value="entrance">Entrance</option>
        <option value="exit">Exit</option>
        <option value="landmark">Landmark</option>
      </select>
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

export default POISelector;