import { point } from '../types/point';

export interface ICorner {
  name: string;
  entryPoint: point;
  apexPoint: point;
  exitPoint: point;
  degrees: number;
}
