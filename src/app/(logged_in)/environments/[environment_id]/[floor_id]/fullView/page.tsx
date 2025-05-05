"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import FloorPlanProcessor from '@/components/floor-plan/FloorPlanProcessor';
import { Environment } from '@/types/environment';

const FullView = () => {
  const { floor_id } = useParams();
  const [environment, setEnvironment] = useState<Environment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnvironment = async () => {
      try {
        const response = await fetch(`http://localhost:8000/floors/${floor_id}`);
        if (!response.ok) throw new Error('Failed to fetch environment');
        const data = await response.json();
        
        // Transform the room data to match Environment interface
        const environmentData: Environment = {
          id: data.id,
          name: data.name,
          type: data.type || 'default',
          layers: 1,
          address: data.building || '',
          history: [],
          description: '',
          addingDate: data.created_at || new Date().toISOString(),
          lastEdited: data.updated_at || new Date().toISOString(),
          floorPlan: {
            image: data.image_data || null,
            grid: data.grid_data || null,
            processedAt: data.updated_at || null
          }
        };
        
        setEnvironment(environmentData);
      } catch (error) {
        console.error('Error fetching environment:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEnvironment();
  }, [floor_id]);

  const handleSaveFloorPlan = async (floorPlan: NonNullable<Environment['floorPlan']>) => {
    if (!environment) return;

    try {
      const response = await fetch(`http://localhost:8000/floors/${floor_id}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: environment.id,
          name: environment.name,
          building: environment.address,
          floor: 1,
          width: 10, 
          height: 8,
          coordinates: [0, 0], 
          grid_data: floorPlan.grid,
          grid_dimensions: floorPlan.grid ? [floorPlan.grid[0].length, floorPlan.grid.length] : [0, 0],
          image_data: floorPlan.image
        }),
      });

      if (!response.ok) throw new Error('Failed to save floor plan');

      setEnvironment(prev => prev ? {
        ...prev,
        floorPlan,
        lastEdited: new Date().toISOString()
      } : null);
    } catch (error) {
      console.error('Error saving floor plan:', error);
      throw error;
    }
  };

  if (loading || !environment) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-irchad-gray-dark">
      <div className="flex-1 p-6">
        <FloorPlanProcessor 
          environment={environment}
          onSave={handleSaveFloorPlan}
          floorId={floor_id as string}
        />
      </div>
    </div>
  );
};

export default FullView;