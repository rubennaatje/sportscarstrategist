import { IPitlane } from "./interfaces/pitlane";

export class PitLane implements IPitlane{
    entryDistance: number;    exitDistance: number;
    length: number;
    maxSpeed: number;
    boxLocations: [number];
}