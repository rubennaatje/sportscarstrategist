import { Category } from "./types/category";
import { DriverStats } from "./types/driverstats";

export class Driver {
    name: string;
    nationality: string;
    category: Category;
    driverStats: DriverStats;
    fatique: number;
    driveMins: number;

    constructor(name: string, nationality: string){
        this.name = name;
        this.nationality = nationality;

        this.category = "bronze";
        this.driverStats = {
            rawspeed: 90,
            consistency: 100,
            mistakes: 10,
        };
    }

    getCurrentSpeed(){
        const rawspeed = this.driverStats.rawspeed;
        let newSpeed = rawspeed - (this.fatique / 10) * ((Math.random() + 1) * 10);

        return newSpeed;
    }
}