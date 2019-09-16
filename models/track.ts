import { ITrackPath } from "./types/trackpath";
import { IPitlane } from "./interfaces/pitlane";
import { ISector } from "./interfaces/sector";
import { ICorner } from "./interfaces/corner";

export class track {
    trackPath: ITrackPath;
    pitlane: IPitlane;
    s1: ISector;
    s2: ISector;
    s3: ISector;
    corners: [ICorner];
    gripLevel: number;

    lengthKM: number;

    constructor(lengthKM: number){
        this.lengthKM = lengthKM;
        this.gripLevel = 60;
        
    }

    GetNextCorner(){
      
    }

    GetGripLevel(){
        return this.gripLevel;
    }
}