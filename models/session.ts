import { SessionType } from "./enumerations/sessiontype";
import { CarCollection } from "./carcollection";
import { Entry } from "./entry";

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
            dataSend.push({ car2: entry.car.chassis.name, category: entry.category, laps: entry.car.GetLaps(), lapdistance: entry.car.GetDistanceOnLap(), percentage: entry.car.GetPercentage(), speed: entry.car.carPhysics.getVelocity('km/h'), carnumber: entry.entryNumber });
        });

        return dataSend;
    }

    handle() {
        this.cars.handle((entry: Entry) => {
            // Q1W - some weird kid on the train that decided to suddenly touch my keyboard
            entry.handle();
        });
    }
}