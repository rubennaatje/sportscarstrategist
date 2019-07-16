import { IEngine } from "./engine";

export interface IChassis {
    name: string,
    downforce: number;
    weight: number;
    engine: IEngine;
}