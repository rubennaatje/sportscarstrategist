import { IEngine } from "./engine";

export interface IChassis {
    name: string;
    weight: number;
    // everything is a score from 0(very very slow) to 100 (f1 level so 0 downforce would mean pretty much no downforce while 100 would mean a lot) 
    downforce: number;
    drag: number;
    brakes: number;
    engine: IEngine;
}