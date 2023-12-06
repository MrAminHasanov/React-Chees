import { pos } from './../../Types/stateInterface';

export const idToPos = (id: number): pos => ({ x: (id % 8) + 1, y: Math.floor(id / 8) + 1 })
export const posToId = (x: number, y: number): number | string =>
    ((x > 0 && x < 9) && (y > 0 && y < 9)) ? ((y - 1) * 8 + x - 1) : "squareNotExists";