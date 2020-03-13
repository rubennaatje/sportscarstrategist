import { Car } from "./car";

export class Telemetry {
    private car: Car;
    speed: {}[];
    date: number;
    constructor(car: Car){
        this.car = car;
        this.speed = [];
        this.date = Date.now();
    }

    handle(){
        this.speed.push({pos: this.car.GetDistanceOnLap(), time: (Date.now() - this.date) / 1000, val: this.car.carPhysics.getVelocity("km/h")});
    }

    ToJSON() {
        return {
            speed: this.speed
        }
    }
}