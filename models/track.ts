import { ITrackPath } from "./types/trackpath";
import { ISector } from "./interfaces/sector";
import { ICorner } from "./interfaces/corner";
import { PitLane } from "./pitlane";

export class Track {
    trackPath: ITrackPath;
    pitlane: PitLane;
    s1: ISector;
    s2: ISector;
    s3: ISector;
    corners: ICorner[];
    gripLevel: number;
    defaultTrackPoints: number[];
    length: number;

    constructor(length: number) {
        this.length = length;
        this.gripLevel = 60;
        this.corners = [];
    }

    GetLengthKM(){
        this.length * 1000;
    }

    GetGripLevel() {
        return this.gripLevel;
    }
}