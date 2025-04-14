import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Upload, Save, ZoomIn, ZoomOut, Eye, EyeOff, Plus, Eraser, Navigation, MapPin, Download } from 'lucide-react';
import { Environment, GridCell } from '@/types/environment';
import { pre } from 'framer-motion/client';

interface FloorPlanProcessorProps {
  environment: Environment;
  onSave: (floorPlan: NonNullable<Environment['floorPlan']>) => Promise<void>;
}

interface Selection {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

type Mode = 'view' | 'addObstacle' | 'removeObstacle' | 'removeElement';

const FloorPlanProcessor: React.FC<FloorPlanProcessorProps> = ({
  environment,
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

  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const editCanvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Update canvas size when image loads
  useEffect(() => {
    if (!imageRef.current || !canvasRef.current) return;

    const updateCanvasSize = () => {
      if (!imageRef.current || !canvasRef.current || !containerRef.current) return;

      const img = imageRef.current;
      const canvas = canvasRef.current;
      const container = containerRef.current;

      // Set canvas size to match container dimensions for sharp rendering
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;

      // Store actual image dimensions
      setImageSize({
        width: img.naturalWidth,
        height: img.naturalHeight
      });
    };

    const img = imageRef.current;
    img.onload = updateCanvasSize;

    // Initial update
    if (img.complete) {
      updateCanvasSize();
    }

    // Update on resize
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

      // Convert file to base64
      const reader = new FileReader();
      reader.onload = async (event) => {
        if (event.target?.result) {
          const imageData = event.target.result as string;
          setImage(imageData);

          // Process image with API
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
        processedAt: new Date().toISOString()
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save floor plan');
    } finally {
      setLoading(false);
    }
  };

  const getCellCoordinates = useCallback((e: React.MouseEvent) => {
    if (!gridData || !imageRef.current || !containerRef.current) return null;
    
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const gridWidth = gridData[0].length;
    const gridHeight = gridData.length;
    
    // Get coordinates relative to the container
    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;
    
    // Scale coordinates based on zoom level
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
    if (!gridData || (mode !== 'addObstacle' && mode !== 'removeObstacle' && mode !== 'removeElement')) return;
    
    const coords = getCellCoordinates(e);
    if (!coords) return;
    
    setIsSelecting(true);
    setSelection({
      startX: coords.x,
      startY: coords.y,
      endX: coords.x,
      endY: coords.y
    });
  }, [gridData, mode, getCellCoordinates]);

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

    // Set canvas size to match original image dimensions
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
  }, [selection, isSelecting, gridData, mode, applyWhiteSquare]);

  const downloadEditedImage = useCallback(() => {
    if (!editedImage) return;

    const link = document.createElement('a');
    link.href = editedImage;
    link.download = 'edited-floor-plan.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [editedImage]);

  // Draw grid overlay
  useEffect(() => {
    if (!canvasRef.current || !gridData.length || !showGrid || !containerRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear the entire canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const rect = container.getBoundingClientRect();
    const cellWidth = rect.width / gridData[0].length;
    const cellHeight = rect.height / gridData.length;

    // Apply zoom scaling to context
    ctx.save();
    ctx.scale(zoom / 100, zoom / 100);

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

    // Draw selection overlay
    if (isSelecting && selection) {
      const minX = Math.min(selection.startX, selection.endX);
      const maxX = Math.max(selection.startX, selection.endX);
      const minY = Math.min(selection.startY, selection.endY);
      const maxY = Math.max(selection.startY, selection.endY);

      ctx.fillStyle = mode === 'removeElement' ? 'rgba(128, 0, 128, 0.3)' :
                     mode === 'addObstacle' ? 'rgba(255, 0, 0, 0.3)' :
                     'rgba(0, 0, 255, 0.3)';
      ctx.fillRect(
        minX * cellWidth,
        minY * cellHeight,
        (maxX - minX + 1) * cellWidth,
        (maxY - minY + 1) * cellHeight
      );

      ctx.strokeStyle = mode === 'removeElement' ? '#800080' :
                       mode === 'addObstacle' ? '#ff0000' :
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
  }, [gridData, showGrid, opacity, isSelecting, selection, mode, zoom]);

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

      {/* Controls */}
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
      </div>

      <canvas
        ref={editCanvasRef}
        style={{ display: 'none' }}
      />

      {/* Floor Plan Display */}
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

      {error && (
        <div className="p-4 bg-red-500 bg-opacity-10 text-red-500 rounded-lg">
          {error}
        </div>
      )}
    </div>
  );
};

export default FloorPlanProcessor;