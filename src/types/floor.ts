import { Zone } from "./environment";

export interface Floor {
    id: string;
    name: string;
    level: number;
    description?: string;
    width?: number;
    height?: number;
    building?: string;
    grid_data?: number[][]; // 2D array of integers
    grid_dimensions?: number[]; // Array of two integers [width, height]
    image_data?: string; // Base64-encoded image data or URL
    zones: Zone[]; // List of zones
  }