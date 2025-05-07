import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Upload, Save, ZoomIn, ZoomOut, Eye, EyeOff, Plus, Eraser, Navigation, MapPin, Download } from 'lucide-react';
import { Environment, GridCell, Zone, ZoneShape, POI } from '@/types/environment';
import ZoneSelector from './ZoneSelector';
import POISelector from './POISelector';

interface FloorPlanProcessorProps {
  environment: Environment;
  floorId: string;
  onSave: (floorPlan: NonNullable<Environment['floorPlan']>) => Promise<void>;
}

interface Selection {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

type Mode = 'view' | 'addObstacle' | 'removeObstacle' | 'removeElement' | 'addZone' | 'addPOI';

const FloorPlanProcessor: React.FC<FloorPlanProcessorProps> = ({
  environment,
  floorId,
  onSave,
}) => {
  const [image, setImage] = useState<string | null>(environment.floorPlan?.image || null);
  const [gridData, setGridData] = useState<GridCell[][]>(environment.floorPlan?.grid || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<Mode>('view');
  const [opacity, setOpacity] = useState(70);
  const [showGrid, setShowGrid] = useState(true);
  const [zoom, setZoom] = useState(100);
  const [selection, setSelection] = useState<Selection | null>(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [imageSize, setImageSize] = useState<{ width: number; height: number } | null>(null);
  const [zones, setZones] = useState<Zone[]>(environment.floorPlan?.zones || []);
  const [currentZone, setCurrentZone] = useState<Omit<Zone, 'id' | 'shapes'> | null>(null);
  const [pois, setPois] = useState<POI[]>(environment.floorPlan?.pois || []);
  const [currentPOI, setCurrentPOI] = useState<Omit<POI, 'id' | 'x' | 'y'> | null>(null);
  const [editingPOI, setEditingPOI] = useState<POI | null>(null);
  const [editingZone, setEditingZone] = useState<Zone | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const editCanvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Fetch POIs
        const poiResponse = await fetch(`http://localhost:8000/pois/floor/${floorId}`);
        if (!poiResponse.ok) {
          throw new Error("Failed to fetch POIs");
        }
        const poiData = await poiResponse.json();
        const transformedPOIs = poiData.map((poi: POI) => ({
          ...poi,
          color: poi.color || "#00FF00", // Assign default green color if no color is provided
        }));
        setPois(transformedPOIs);
  
        // Fetch Zones
        const zoneResponse = await fetch(`http://localhost:8000/zones/floor/${floorId}`);
        if (!zoneResponse.ok) {
          throw new Error("Failed to fetch Zones");
        }
        const zoneData = await zoneResponse.json();
        setZones(zoneData);
      } catch (error) {
        console.error("Error fetching initial data:", error);
        setError(error instanceof Error ? error.message : "An error occurred");
      }
    };
  
    fetchInitialData();
  }, [floorId]);

  const createZone = async (zone: Zone) => {
    try {
      const response = await fetch("http://localhost:8000/zones", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...zone, floor_id: floorId }),
      });
      if (!response.ok) {
        throw new Error("Failed to create zone");
      }
      console.log("Zone created successfully");
    } catch (error) {
      console.error("Error creating zone:", error);
    }
  };
  
  const updateZone = async (zoneId: string, updatedZone: Partial<Zone>) => {
    try {
      const response = await fetch(`http://localhost:8000/zones/${zoneId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedZone),
      });
      if (!response.ok) {
        throw new Error("Failed to update Zone");
      }
      console.log("Zone updated successfully");
      setZones((prev) =>
        prev.map((zone) => (zone.id === zoneId ? { ...zone, ...updatedZone } : zone))
      );
    } catch (error) {
      console.error("Error updating Zone:", error);
    }
  };
  
  const deleteZone = async (zoneId: string) => {
    try {
      const response = await fetch(`http://localhost:8000/zones/${zoneId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete zone");
      }
      console.log("Zone deleted successfully");
    } catch (error) {
      console.error("Error deleting zone:", error);
    }
  };

  const handleZoneDelete = async (zoneId: string) => {
    setZones(prev => prev.filter(zone => zone.id !== zoneId));
  
    // API call to delete the zone
    await deleteZone(zoneId);
  };
  
  const createPOI = async (poi: POI) => {
    try {
      const response = await fetch("http://localhost:8000/pois", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...poi, floor_id: floorId }),
      });
      if (!response.ok) {
        throw new Error("Failed to create POI");
      }
      console.log("POI created successfully");
    } catch (error) {
      console.error("Error creating POI:", error);
    }
  };
  
  const updatePOI = async (poiId: string, updatedPOI: Partial<POI>) => {
    try {
      const response = await fetch(`http://localhost:8000/pois/${poiId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPOI),
      });
      if (!response.ok) {
        throw new Error("Failed to update POI");
      }
      console.log("POI updated successfully");
      setPois((prev) =>
        prev.map((poi) => (poi.id === poiId ? { ...poi, ...updatedPOI } : poi))
      );
    } catch (error) {
      console.error("Error updating POI:", error);
    }
  };
  
  const deletePOI = async (poiId: string) => {
    try {
      const response = await fetch(`http://localhost:8000/pois/${poiId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete POI");
      }
      console.log("POI deleted successfully");
    } catch (error) {
      console.error("Error deleting POI:", error);
    }
  };

  const handlePOIDelete = async (poiId: string) => {
    setPois(prev => prev.filter(poi => poi.id !== poiId));
  
    // API call to delete the POI
    await deletePOI(poiId);
  };

  useEffect(() => {
    if (!imageRef.current || !canvasRef.current) return;

    const updateCanvasSize = () => {
      if (!imageRef.current || !canvasRef.current || !containerRef.current) return;

      const img = imageRef.current;
      const canvas = canvasRef.current;
      const container = containerRef.current;

      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;

      setImageSize({
        width: img.naturalWidth,
        height: img.naturalHeight
      });
    };

    const img = imageRef.current;
    img.onload = updateCanvasSize;

    if (img.complete) {
      updateCanvasSize();
    }

    const resizeObserver = new ResizeObserver(updateCanvasSize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [image]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);
      setError(null);

      const reader = new FileReader();
      reader.onload = async (event) => {
        if (event.target?.result) {
          const imageData = event.target.result as string;
          setImage(imageData);

          const formData = new FormData();
          formData.append('file', file);
          formData.append('options', JSON.stringify({
            grid_size: 4,
            include_text_removal: true,
            include_walls_detection: true,
            include_furniture_detection: true
          }));

          const response = await fetch('http://localhost:8000/process_floor_plan', {
            method: 'POST',
            body: formData,
          });

          if (!response.ok) {
            throw new Error('Failed to process floor plan');
          }

          const data = await response.json();
          setGridData(data.grid);
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!image || !gridData.length) return;

    try {
      setLoading(true);
      await onSave({
        image: editedImage || image,
        grid: gridData,
        processedAt: new Date().toISOString(),
        zones,
        pois
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save floor plan');
    } finally {
      setLoading(false);
    }
  };

  const handleZoneCreate = useCallback((zone: Omit<Zone, 'id' | 'shapes'>) => {
    setCurrentZone(zone);
    setMode('addZone');
  }, []);

  const handlePOICreate = useCallback((poi: Omit<POI, 'id' | 'x' | 'y'>) => {
    setCurrentPOI(poi);
    setMode('addPOI');
  }, []);

  const handlePOIEdit = (poi: POI) => {
    const updatedPOI = { ...poi, name: "Updated POI Name" }; // Example update
    updatePOI(poi.id, updatedPOI);
  };

  const handleZoneEdit = (zone: Zone) => {
    const updatedZone = { ...zone, name: "Updated Zone Name" }; // Example update
    updateZone(zone.id, updatedZone);
  };

  const getCellCoordinates = useCallback((e: React.MouseEvent) => {
    if (!gridData || !containerRef.current) return null;
    
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const gridWidth = gridData[0].length;
    const gridHeight = gridData.length;
    
    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;
    
    const scaledX = relX / (zoom / 100);
    const scaledY = relY / (zoom / 100);
    
    const cellWidth = rect.width / gridWidth;
    const cellHeight = rect.height / gridHeight;
    
    const x = Math.floor(scaledX / cellWidth);
    const y = Math.floor(scaledY / cellHeight);
    
    if (x < 0 || x >= gridWidth || y < 0 || y >= gridHeight) return null;
    
    return { x, y };
  }, [gridData, zoom]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    if (!gridData) return;

    const coords = getCellCoordinates(e);
    if (!coords) return;

    if (mode === 'addPOI' && currentPOI) {
      const newPOI: POI = {
        id: `poi-${Date.now()}`,
        x: coords.x,
        y: coords.y,
        ...currentPOI
      };
      setPois(prev => [...prev, newPOI]);
      createPOI(newPOI);
      setMode('view');
      setCurrentPOI(null);
      return;
    }

    if (mode === 'addObstacle' || mode === 'removeObstacle' || mode === 'removeElement' || mode === 'addZone') {
      setIsSelecting(true);
      setSelection({
        startX: coords.x,
        startY: coords.y,
        endX: coords.x,
        endY: coords.y
      });
    }
  }, [gridData, mode, currentPOI, getCellCoordinates]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    if (!isSelecting || !selection || !gridData) return;
    
    const coords = getCellCoordinates(e);
    if (!coords) return;
    
    setSelection({
      ...selection,
      endX: Math.max(0, Math.min(coords.x, gridData[0].length - 1)),
      endY: Math.max(0, Math.min(coords.y, gridData.length - 1))
    });
  }, [isSelecting, selection, gridData, getCellCoordinates]);

  const applyWhiteSquare = useCallback(() => {
    if (!selection || !imageRef.current || !editCanvasRef.current || !imageSize) return;

    const canvas = editCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = imageSize.width;
    canvas.height = imageSize.height;

    ctx.drawImage(imageRef.current, 0, 0, canvas.width, canvas.height);

    const scaleX = canvas.width / gridData[0].length;
    const scaleY = canvas.height / gridData.length;

    const minX = Math.min(selection.startX, selection.endX) * scaleX;
    const maxX = (Math.max(selection.startX, selection.endX) + 1) * scaleX;
    const minY = Math.min(selection.startY, selection.endY) * scaleY;
    const maxY = (Math.max(selection.startY, selection.endY) + 1) * scaleY;

    ctx.fillStyle = 'white';
    ctx.fillRect(minX, minY, maxX - minX, maxY - minY);

    const newEditedImage = canvas.toDataURL('image/png');
    setEditedImage(newEditedImage);
    setImage(newEditedImage);
  }, [selection, gridData, imageSize]);

  const handleMouseUp = useCallback(() => {
    if (!selection || !isSelecting || !gridData) return;

    const minX = Math.min(selection.startX, selection.endX);
    const maxX = Math.max(selection.startX, selection.endX);
    const minY = Math.min(selection.startY, selection.endY);
    const maxY = Math.max(selection.startY, selection.endY);

    if (mode === 'removeElement') {
      applyWhiteSquare();
    } else if (mode === 'addZone' && currentZone) {
      if (!zones.some(z => z.name === currentZone.name)) {
        const newZone: Zone = {
          id: `zone-${Date.now()}`,
          ...currentZone,
          shape: [{
            type: 'polygon',
            coordinates: [[minX, minY], [maxX, maxY]]
          }]
        };
        setZones(prev => [...prev, newZone]);
        createZone(newZone);
      } else {
        const existingZone = zones.find(z => z.name === currentZone.name);
        if (existingZone) {
          const newShape: ZoneShape = {
            type: 'polygon',
            coordinates: [[minX, minY], [maxX, maxY]]
          };
          setZones(prev => prev.map(zone => 
            zone.id === existingZone.id 
              ? { ...zone, shape: [...zone.shape, newShape] }
              : zone
          ));
          updateZone(existingZone.id, { shape: [...existingZone.shape, newShape] });
        }
      }
    } else {
      const newGridData = gridData.map(row => [...row]);
      const cellValue = mode === 'addObstacle' ? 1 : 0;

      for (let y = minY; y <= maxY; y++) {
        for (let x = minX; x <= maxX; x++) {
          newGridData[y][x] = cellValue;
        }
      }
      setGridData(newGridData);
    }

    setIsSelecting(false);
    setSelection(null);
    if (mode === 'removeElement') {
      setMode('view');
    }
  }, [selection, isSelecting, gridData, mode, currentZone, zones, applyWhiteSquare]);

  const downloadEditedImage = useCallback(() => {
    if (!editedImage) return;

    const link = document.createElement('a');
    link.href = editedImage;
    link.download = 'edited-floor-plan.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [editedImage]);

  useEffect(() => {
    if (!canvasRef.current || !gridData.length || !showGrid || !containerRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const rect = container.getBoundingClientRect();
    const cellWidth = rect.width / gridData[0].length;
    const cellHeight = rect.height / gridData.length;

    ctx.save();
    ctx.scale(zoom / 100, zoom / 100);

    // Draw zones
    zones.forEach(zone => {
      zone.shape.forEach(shape => {
        const [[x1, y1], [x2, y2]] = shape.coordinates;
        ctx.fillStyle = `${zone.color}40`;
        ctx.fillRect(
          x1 * cellWidth,
          y1 * cellHeight,
          (x2 - x1 + 1) * cellWidth,
          (y2 - y1 + 1) * cellHeight
        );
      });
    });

    // Draw POIs
    pois.forEach((poi) => {
      const topLeftX = poi.x * cellWidth;
      const topLeftY = poi.y * cellHeight;
      const poiWidth = cellWidth * 2; // Make the POI occupy 2x2 squares
      const poiHeight = cellHeight * 2;
    
      // Draw the POI rectangle
      ctx.fillStyle = poi.color;
      ctx.fillRect(topLeftX, topLeftY, poiWidth, poiHeight);
    
      // Draw the POI border
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.strokeRect(topLeftX, topLeftY, poiWidth, poiHeight);
    
      // Draw the POI label
      ctx.font = '12px Arial';
      ctx.fillStyle = '#000';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(
        poi.name,
        topLeftX + poiWidth / 2,
        topLeftY + poiHeight / 2
      );
    });

    // Draw grid and obstacles
    gridData.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell === 1) {
          ctx.fillStyle = `rgba(255, 0, 0, ${opacity / 100})`;
          ctx.fillRect(x * cellWidth, y * cellHeight, cellWidth, cellHeight);
        }
        ctx.strokeStyle = 'rgba(128, 128, 128, 0.2)';
        ctx.strokeRect(x * cellWidth, y * cellHeight, cellWidth, cellHeight);
      });
    });

    // Draw selection
    if (isSelecting && selection) {
      const minX = Math.min(selection.startX, selection.endX);
      const maxX = Math.max(selection.startX, selection.endX);
      const minY = Math.min(selection.startY, selection.endY);
      const maxY = Math.max(selection.startY, selection.endY);

      ctx.fillStyle = mode === 'removeElement' ? 'rgba(128, 0, 128, 0.3)' :
                     mode === 'addObstacle' ? 'rgba(255, 0, 0, 0.3)' :
                     mode === 'addZone' ? 'rgba(0, 255, 0, 0.3)' :
                     'rgba(0, 0, 255, 0.3)';
      ctx.fillRect(
        minX * cellWidth,
        minY * cellHeight,
        (maxX - minX + 1) * cellWidth,
        (maxY - minY + 1) * cellHeight
      );

      ctx.strokeStyle = mode === 'removeElement' ? '#800080' :
                       mode === 'addObstacle' ? '#ff0000' :
                       mode === 'addZone' ? '#00ff00' :
                       '#0000ff';
      ctx.lineWidth = 2;
      ctx.strokeRect(
        minX * cellWidth,
        minY * cellHeight,
        (maxX - minX + 1) * cellWidth,
        (maxY - minY + 1) * cellHeight
      );
    }

    ctx.restore();
  }, [gridData, showGrid, opacity, isSelecting, selection, mode, zoom, zones, pois]);

  const ZoneList = () => {
    if (zones.length === 0) return null;
  
    return (
      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold mb-2 text-black">Zones</h3>
        <ul className="space-y-1">
          {zones.map((zone) => (
            <li key={zone.id} className="flex flex-col gap-2 p-2 bg-white rounded shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div
                    className="w-3 h-3 mr-2"
                    style={{ backgroundColor: zone.color }}
                  />
                  <span className="font-semibold text-black">{zone.name}</span>
                </div>
                <div className="flex gap-2">
                <button 
                  className="text-gray-500 text-xs hover:text-gray-700"
                  onClick={() => {
                    setCurrentZone({
                      name: zone.name,
                      type: zone.type,
                      color: zone.color,
                      category: zone.category,
                      width: zone.width,
                      height: zone.height,
                      image: zone.image
                    });
                    setMode('addZone');
                  }}
                >
                  Add Shape
                </button>
                <button 
                  className="text-red-500 text-xs hover:text-red-700"
                  onClick={() =>handleZoneDelete(zone.id)}
                >
                  Remove
                </button>
                <button
                  className="text-blue-500 text-xs hover:text-blue-700"
                  onClick={() => setEditingZone(zone)}
                >
                  Edit
                </button>
              </div>
                
              </div>
              <p className="text-sm text-gray-600">Type: {zone.type_id || "N/A"}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  };


  



  const POIList = () => {
    if (pois.length === 0) return null;
  
    return (
      <div className="mt-4 p-4 bg-orange-50 rounded-lg">
        <h3 className="font-semibold mb-2 text-black">Points of Interest</h3>
        <ul className="space-y-1">
          {pois.map((poi) => (
            <li key={poi.id} className="flex flex-col gap-2 p-2 bg-white rounded shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div
                    className="w-3 h-3 mr-2 rounded-full"
                    style={{ backgroundColor: poi.color }}
                  />
                  <span className="font-semibold text-black">{poi.name}</span>
                </div>
                <div className="flex gap-2">
                <button
                  className="text-blue-500 text-xs hover:text-blue-700"
                  onClick={() => setEditingPOI(poi)}
                >
                  Edit
                </button>
                <button 
                className="text-red-500 text-xs hover:text-red-700"
                onClick={()=>handlePOIDelete(poi.id)}
              >
                Remove
              </button>
              </div>
              </div>
              <p className="text-sm text-gray-600">Description: {poi.description || "N/A"}</p>
              <p className="text-sm text-gray-600">Category: {poi.category_id || "N/A"}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  

  return (
    <div className="flex flex-col h-full bg-irchad-gray rounded-lg p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Floor Plan Processor</h2>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition-colors">
            <Upload className="w-5 h-5" />
            <span>Upload Plan</span>
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden"
            />
          </label>

          <button
            onClick={handleSave}
            disabled={!image || loading}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              !image || loading
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-green-500 hover:bg-green-600'
            } text-white`}
          >
            <Save className="w-5 h-5" />
            <span>Save</span>
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setZoom(prev => Math.max(prev - 20, 50))}
            className="p-2 rounded hover:bg-irchad-gray-light text-white"
          >
            <ZoomOut className="w-5 h-5" />
          </button>
          <span className="text-white">{zoom}%</span>
          <button
            onClick={() => setZoom(prev => Math.min(prev + 20, 200))}
            className="p-2 rounded hover:bg-irchad-gray-light text-white"
          >
            <ZoomIn className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-white">Opacity:</span>
          <input
            type="range"
            min="10"
            max="100"
            value={opacity}
            onChange={(e) => setOpacity(Number(e.target.value))}
            className="w-24"
          />
          <span className="text-white w-12">{opacity}%</span>
        </div>

        <button
          onClick={() => setShowGrid(prev => !prev)}
          className="flex items-center gap-2 px-3 py-2 rounded hover:bg-irchad-gray-light text-white"
        >
          {showGrid ? (
            <>
              <EyeOff className="w-5 h-5" />
              <span>Hide Grid</span>
            </>
          ) : (
            <>
              <Eye className="w-5 h-5" />
              <span>Show Grid</span>
            </>
          )}
        </button>

        <button
          onClick={() => setMode(prev => prev === 'addObstacle' ? 'view' : 'addObstacle')}
          className={`flex items-center gap-2 px-3 py-2 rounded ${
            mode === 'addObstacle' ? 'bg-red-500' : 'hover:bg-irchad-gray-light'
          } text-white`}
        >
          <Plus className="w-5 h-5" />
          <span>Add Obstacle</span>
        </button>

        <button
          onClick={() => setMode(prev => prev === 'removeObstacle' ? 'view' : 'removeObstacle')}
          className={`flex items-center gap-2 px-3 py-2 rounded ${
            mode === 'removeObstacle' ? 'bg-blue-500' : 'hover:bg-irchad-gray-light'
          } text-white`}
        >
          <Eraser className="w-5 h-5" />
          <span>Remove Obstacle</span>
        </button>

        <button
          onClick={() => setMode(prev => prev === 'removeElement' ? 'view' : 'removeElement')}
          className={`flex items-center gap-2 px-3 py-2 rounded ${
            mode === 'removeElement' ? 'bg-purple-500' : 'hover:bg-irchad-gray-light'
          } text-white`}
        >
          <Eraser className="w-5 h-5" />
          <span>Remove Element</span>
        </button>

        {editedImage && (
          <button
            onClick={downloadEditedImage}
            className="flex items-center gap-2 px-3 py-2 rounded bg-green-500 hover:bg-green-600 text-white"
          >
            <Download className="w-5 h-5" />
            <span>Download Image</span>
          </button>
        )}

        <div className="ml-4 flex gap-2">
          <ZoneSelector onZoneCreate={handleZoneCreate} />
          <POISelector onPOICreate={handlePOICreate} />
        </div>
      </div>

      <canvas
        ref={editCanvasRef}
        style={{ display: 'none' }}
      />

      <div 
        ref={containerRef}
        className="flex-1 relative border border-irchad-gray-light rounded-lg overflow-hidden bg-white"
      >
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent" />
          </div>
        ) : image ? (
          <div
            className="relative w-full h-full"
            style={{
              transform: `scale(${zoom / 100})`,
              transformOrigin: 'center',
              transition: 'transform 0.2s ease-out'
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={() => {
              setIsSelecting(false);
              setSelection(null);
            }}
          >
            <img
              ref={imageRef}
              src={editedImage || image}
              alt="Floor Plan"
              className="w-full h-full object-contain"
              style={{ imageRendering: 'high-quality' }}
            />
            
            <canvas
              ref={canvasRef}
              className="absolute top-0 left-0 w-full h-full pointer-events-none"
              style={{ imageRendering: 'high-quality' }}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-irchad-gray-light">
            Upload a floor plan to begin
          </div>
        )}
      </div>

      <div className="space-y-4">
        <ZoneList />
        <POIList />
      </div>

      {error && (
        <div className="p-4 bg-red-500 bg-opacity-10 text-red-500 rounded-lg">
          {error}
        </div>
      )}
      {editingZone && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4 text-black">Edit Zone</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (editingZone) {
                  const updatedZone = {
                    ...editingZone,
                    name: e.target.zoneName.value,
                    color: e.target.zoneColor.value,
                  };
                  updateZone(editingZone.id, updatedZone);
                  setEditingZone(null);
                }
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="zoneName"
                  defaultValue={editingZone.name}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-black"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Color</label>
                <input
                  type="color"
                  name="zoneColor"
                  defaultValue={editingZone.color}
                  className="mt-1 block w-full"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingZone(null)}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    {editingPOI && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4 text-black">Edit POI</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (editingPOI) {
                  const updatedPOI = {
                    ...editingPOI,
                    name: e.target.poiName.value,
                    description: e.target.poiDescription.value,
                  };
                  updatePOI(editingPOI.id, updatedPOI);
                  setEditingPOI(null);
                }
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="poiName"
                  defaultValue={editingPOI.name}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-black"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="poiDescription"
                  defaultValue={editingPOI.description}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-black"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingPOI(null)}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default FloorPlanProcessor;