import { IEngine } from "./interfaces/engine";
import { IChassis } from "./interfaces/chassis";

export class CarPhysics {
    velocity: number;
    lastCheck: Date;
    
    constructor(){
        this.lastCheck = new Date();
        this.velocity = 0;
    }

    calculateAcceleration( velocityF:number, msPassed: number) : number {
        return (velocityF - this.velocity) / msPassed;
    }

    GetNewVelocity(AccelerationMS: number) {
       let msPassed = this.GetTimePassed();
       this.lastCheck = new Date();
       let passedSinceLastTime = (AccelerationMS / 1000) * msPassed;
       this.velocity = this.velocity + passedSinceLastTime
       return this.velocity;
    }

    CalculateAccelerationByEngine(chassis: IChassis) {
        let msPassed = this.GetTimePassed();
        if(this.velocity < chassis.engine.topspeed && this.velocity > -0.1 && msPassed > 0){
            this.velocity += (((chassis.engine.acceleration / 1000) )  * msPassed - this.CalculateFriction(chassis));
        }
        
        if(this.velocity > chassis.engine.topspeed){
            this.velocity =  chassis.engine.topspeed;
        }

        this.lastCheck = new Date();
    }

    CalculateDecelerationByEngine(engine: IEngine) {
        let msPassed = this.GetTimePassed();

        if(this.velocity > 0) {
            this.velocity -= (((engine.acceleration / 1000))  * msPassed);
        }

        if(this.velocity < 0){
            this.velocity =  0;
        }
    }

    CalculateFriction(chassis: IChassis){
        console.log( "aaa" + (chassis.weight + (chassis.downforce * (this.velocity / 1000 )) / 200000));
        return (50 + (chassis.downforce * (this.velocity / 1000 )) / 100000);
    }
    
    GetTimePassed() : number{
        return new Date().getMilliseconds() - this.lastCheck.getMilliseconds();
    }

    

}