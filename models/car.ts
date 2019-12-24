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
        this.laps.push(new TimedLap(1,this));
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
        return Math.floor(this.carPhysics.distanceTravelled / this.entry.track.lengthKM * 1000);
    }

    GetDistanceOnLap(){
        return this.carPhysics.distanceTravelled % this.entry.track.lengthKM * 1000;
    }

    GetPercentage(round: boolean = false){
        var percentage = this.GetDistanceOnLap() / (this.entry.track.lengthKM * 1000) * 100;
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
            console.log("new lap!", this.GetLaps())
            this.laps.push(new TimedLap(this.GetLaps(), this))
        }

    }

    ToJSON(){
        return { 
            lapdistance: this.GetDistanceOnLap(),
            laps: this.GetLaps(),
            percentage: this.GetPercentage(),
            speed: this.carPhysics.getVelocity('km/h')
        }
    }
}