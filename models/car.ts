import { Driver } from "./driver";
import { IChassis } from "./interfaces/chassis";
import { CarPhysics } from "./carphysics";

export class Car {
    entryNumber: number;
    chassis: IChassis;
    drivers: Driver[];
    currentDriverIndex: number;
    EngineOn: boolean;
    private carPhysics: CarPhysics;

    //temp vars
    private reachedtopspeed: boolean;
    constructor(){
        this.carPhysics =  new CarPhysics();
        this.drivers = [];
        this.entryNumber = 99;
    }

    StartEngine(){
        this.EngineOn = true;
    }

    KillEngine(){
        this.EngineOn = false;
    }

    Throttle(percentage: number){
        if(!this.reachedtopspeed){
            const acceleration = this.carPhysics.Accelerate(this.chassis);
            if(this.carPhysics.getVelocity('km/h') >= this.chassis.engine.topspeed){
                this.reachedtopspeed = true;
            }
        } else {
            // const acceleration = this.carPhysics.Decelerate(this.chassis);
            // if(this.carPhysics.velocity <=1){
            //     this.reachedtopspeed = false;
            // }
        }

        this.carPhysics.Move();
        // console.log(this.carPhysics.getVelocity('km/h'),'km/h' );
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