import { Driver } from "./driver";
import { IChassis } from "./interfaces/chassis";
import { CarPhysics } from "./carphysics";
import { Entry } from "./entry";
import { TimedLap } from "./timedlap";

export class Car {
    chassis: IChassis;
    EngineOn: boolean;
    carPhysics: CarPhysics;
    entry: Entry;
    laps: TimedLap[];

    //temp vars
    private reachedtopspeed: boolean;
    constructor(){
        this.carPhysics =  new CarPhysics();
        this.laps = [];
        this.laps.push(new TimedLap(0,this));
        this.laps[0].start(Date.now());
    }

    StartEngine(){
        this.EngineOn = true;
    }

    KillEngine(){
        this.EngineOn = false;
    }

    Throttle(percentage: number){
        const r: number = Math.floor(this.GetPercentage());
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
    }

    GetLaps() : number{
        return Math.floor(this.carPhysics.distanceTravelled / (this.entry.track.length ));
    }

    GetDistanceOnLap(){
        return this.carPhysics.distanceTravelled % this.entry.track.length;
    }

    GetPercentage(round: boolean = false){
        var percentage = this.GetDistanceOnLap() / this.entry.track.length * 100;
        if(round){
            return Math.round(percentage);
        }
        return percentage;
    }

    Brake(percentage: number){
        
    }

    Move(){
        const laps: number = this.GetLaps();
        this.carPhysics.Move();
        

        if(laps !== this.GetLaps()){
            this.laps[laps].finish(Date.now());
            this.laps.push(new TimedLap(this.GetLaps(), this));
            this.laps[this.GetLaps()].start(Date.now());
        }

    }

    ToJSON(){
        return { 
            lapdistance: this.GetDistanceOnLap(),
            laps: this.GetLaps(),
            percentage: this.GetPercentage(),
            speed: this.carPhysics.getVelocity('km/h'),
            currentTelemetry: this.laps[this.GetLaps()].telemetry.speed
        }
    }
    
    GetTelemetry(lap: number = -1){
        if(lap === -1){
            return this.laps[this.GetLaps()].telemetry.speed;
        } else {
            return this.laps[lap].telemetry.speed;
        }
    }
}