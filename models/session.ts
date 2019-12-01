import { SessionType } from "./enumerations/sessiontype";
import { CarCollection } from "./carcollection";

export class Session {
    private lengthMinutes: number;
    private lengthLaps: number;
    private startTime: Date;
    private sessionType: SessionType;
    private sessionName: string;
    private data: {}[];
    cars: CarCollection;

    constructor(cars: CarCollection,sessionName: string,lengthMinutes: number, lengthLaps: number, startTime: Date, sessionType: SessionType){
        this.sessionName = sessionName;
        this.lengthLaps = lengthLaps;
        this.lengthMinutes = lengthMinutes;
        this.startTime = startTime;
        this.sessionType = sessionType;
        this.cars = cars;
    }

    GetSessionName(){
        return this.sessionName;
    }

    GetSessionType(){
        return this.sessionName;
    }

    GetLengthMinutes(){
        return this.lengthMinutes;
    }

    GetLengthLaps(){
        return this.lengthLaps;
    }

    GetStartTime(){
        return this.startTime;
    }

    GetCars() :{}[] {
        let dataSend: {}[] = [];

        this.cars.handle((entry) => {
            entry.car.Throttle(100);
            dataSend.push({ car2: entry.car.chassis.name, category: entry.category, laps: entry.car.GetLaps(13626), lapdistance: entry.car.GetDistanceOnLap(13626), percentage: entry.car.GetPercentage(13626), speed: entry.car.carPhysics.getVelocity('km/h'), car: entry, carnumber: entry.entryNumber });
        });

        return dataSend;
    }

    handle() {

    }
}