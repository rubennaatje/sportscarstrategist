import { CarState } from "./enumerations/carstate";

export class Task {
    startTime: Date;
    finished: boolean = false;
    description: string;
    length: number;
    starttype: CarState;
    endtype: CarState;
    prio: number;
    cancellableTill: number;
    index: number;
}