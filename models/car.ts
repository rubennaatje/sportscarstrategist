import { Driver } from "./driver";
import { IChassis } from "./interfaces/chassis";
import { CarPhysics } from "./carphysics";

export class Car {
    chassis: IChassis;
    EngineOn: boolean;
    carPhysics: CarPhysics;

    //temp vars
    private reachedtopspeed: boolean;
    constructor(){
        this.carPhysics =  new CarPhysics();
    }

    StartEngine(){
        this.EngineOn = true;
    }

    KillEngine(){
        this.EngineOn = false;
    }

    Throttle(percentage: number){
        const r: number = Math.floor(this.GetPercentage(13626));
        if(!this.reachedtopspeed){
            const acceleration = this.carPhysics.Accelerate(this.chassis);
            if(r === 50 || r === 25){
                this.reachedtopspeed = true;
            }
        } else {
            const acceleration = this.carPhysics.Decelerate(this.chassis);
            if(this.carPhysics.velocity <=100 + (this.chassis.brakes + this.chassis.downforce / 2)){
                this.reachedtopspeed = false;
            }
        }

        this.carPhysics.Move();
    }

    GetLaps(length: number) : number{
        return Math.floor(this.carPhysics.distanceTravelled / length);
    }

    GetDistanceOnLap(length:number){
        return this.carPhysics.distanceTravelled % length;
    }

    GetPercentage(length:number, round: boolean = false){
        var percentage = this.GetDistanceOnLap(length) / length * 100;
        if(round){
            return Math.round(percentage);
        }
        return percentage;
    }

    Brake(percentage: number){
        
    }
}