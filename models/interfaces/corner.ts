import { point } from "../types/point";

export interface ICorner {
    name: string;
    steeringPoint: point;
    apexPoint: point;
    cornerExitPoint: point;
    exitPoint: point; 
    degrees: number;
}