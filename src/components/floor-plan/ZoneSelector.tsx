import React, { useEffect, useState } from 'react';
import { Zone } from '@/types/environment';

interface ZoneSelectorProps {
  onZoneCreate: (zone: Omit<Zone, 'id' | 'shapes'>) => void;
}

interface ZoneType {
  id: string;
  name: string;
  description?: string;
}

const ZoneSelector: React.FC<ZoneSelectorProps> = ({ onZoneCreate }) => {
  const [zoneName, setZoneName] = useState('');
  const [zoneColor, setZoneColor] = useState('#3B82F6'); // Default blue color
  const [isCreating, setIsCreating] = useState(false);
  const [types, setTypes] = useState<ZoneType[]>([]);
  const [zoneType, setZoneType] = useState('');

  useEffect(() => {
    const fetchZoneTypes = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_CARTOGRAPHIE_SERVICE}/zones/types`);
        if (!response.ok) {
          throw new Error('Failed to fetch zone types');
        }
        const data = await response.json();
        setTypes(data);
        if (data.length > 0) {
          setZoneType(data[0].id); // Set the first type as the default
        }
      } catch (error) {
        console.error('Error fetching zone types:', error);
      }
    };

    fetchZoneTypes();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!zoneName.trim()) return;

    onZoneCreate({
      name: zoneName.trim(),
      type: zoneType, // Optional: Keep the type for display purposes
      type_id: zoneType, // Use the selected type ID
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
        className="px-2 py-1 border rounded text-sm text-black"
        autoFocus
      />
      <input
        type="color"
        value={zoneColor}
        onChange={(e) => setZoneColor(e.target.value)}
        className="w-8 h-8 rounded cursor-pointer "
      />
      <select
        value={zoneType}
        onChange={(e) => setZoneType(e.target.value)}
        className="px-2 py-1 border rounded text-sm text-black"
      >
        {types.map((type) => (
          <option key={type.id} value={type.id}>
            {type.name}
          </option>
        ))}
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

export default ZoneSelector;
