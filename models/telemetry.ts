import { Car } from "./car";

export class Telemetry {
    private car: Car;
    speed: {}[]
    constructor(car: Car){
        this.car = car;
        this.speed = [];
    }

    handle(){
        if(this.speed[this.car.GetLaps(13626)] == null){
            this.speed[this.car.GetLaps(13626)] = [];
        }
        this.speed[this.car.GetLaps(13626)][this.car.GetDistanceOnLap(13626)] = this.car.carPhysics.getVelocity("km/h");
    }
}