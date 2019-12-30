export class ISector {
    sectorName: string;
    startDistance: number;
    endDistance: number;

    constructor(startDistance: number, endDistance: number){
        this.startDistance = startDistance;
        this.endDistance = endDistance;
    }

    GetLength(): number {
        return this.endDistance - this.startDistance;
    }
}