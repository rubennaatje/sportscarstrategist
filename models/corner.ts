import { ICorner } from "./interfaces/corner";
import { point } from "./types/point";

export class Corner implements ICorner {
    name: string;    
    steeringPoint: point;
    apexPoint: point;
    cornerExitPoint: point;
    exitPoint: point;
    degrees: number;
    GetMaxSpeed() : number{
        return 20;
    }

}