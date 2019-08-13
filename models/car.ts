import { Driver } from "./driver";
import { IChassis } from "./interfaces/chassis";
import { CarPhysics } from "./carphysics";

export class Car {
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
    }

    StartEngine(){
        this.EngineOn = true;
    }

    KillEngine(){
        this.EngineOn = false;
    }

    Throttle(percentage: number){
        if(!this.reachedtopspeed){
            const acceleration = this.carPhysics.CalculateAccelerationByEngine(this.chassis);
            if(this.carPhysics.velocity >= this.chassis.engine.topspeed){
                this.reachedtopspeed = true;
            }
        } else {
            const acceleration = this.carPhysics.CalculateDecelerationByEngine(this.chassis.engine);
            if(this.carPhysics.velocity <=0){
                this.reachedtopspeed = false;
            }
        }
    }

    Brake(percentage: number){
        
    }
}