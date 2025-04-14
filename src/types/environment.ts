export interface Environment {
    id: string;
    name: string;
    type: string;
    layers: number;
    address: string;
    history: History[];
    description: string;
    addingDate: string;
    lastEdited: string;
    // New fields for floor plan functionality
    floorPlan?: {
        image: string | null;
        grid: GridCell[][] | null;
        processedAt?: string;
    };
}

export interface Zone {
    id: string,
    type: string,
    name: string,
    width: number,
    height: number,
    category: string,
    image: string,
}

export interface POI {
    id: string,
    type: string,
    name: string,
    width: number,
    height: number,
    category: string,
    image: string,
    zone?: string,
}

interface History {
    message: string,
    timestamp: string,
}

export type GridCell = 0 | 1;

export interface PathResult {
    path: [number, number][];
    distance: number;
    time: number;
    instructions: string[];
}