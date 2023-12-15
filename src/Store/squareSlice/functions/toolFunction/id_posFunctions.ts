import { pos } from './../../Types/stateInterface';

export const idToPos = (id: any): pos => ({ x: (id % 8) + 1, y: Math.floor(id / 8) + 1 })
export const posToId = (x: number, y: number): number => ((y - 1) * 8 + x - 1);
