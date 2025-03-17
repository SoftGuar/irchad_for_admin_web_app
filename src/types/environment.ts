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
}

export interface Zone {
    id: string,
    type:string,
    name:string,
    width:number,
    height: number,
    category: string,
    image:string,
}

export interface POI {
    id: string,
    type:string,
    name:string,
    width:number,
    height: number,
    category: string,
    image:string,
    zone?: string,
}

interface History {
    message:string,
    timestamp: string,
}