import { create } from 'zustand'

interface LonLatState {
    lon: number;
    lat: number;
    radius: number;
    setLonLat: (lon: number, lat: number) => void;
    setRadius: (radius: number) => void;
}

export const useLonLatStore = create<LonLatState>((set) => ({
    lon: 0,
    lat: 0,
    radius: 1000,
    setLonLat: (lon: number, lat: number) => set({ lon, lat }),
    setRadius: (radius: number) => set({ radius }),
}));