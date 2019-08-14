import { IEngine } from "./interfaces/engine";
import { IChassis } from "./interfaces/chassis";

export class CarPhysics {
    velocity: number;
    distanceTravelled: number;
    lastCheck: Date;
    
    constructor(){
        this.lastCheck = new Date();
        this.velocity = 0;
        this.distanceTravelled = 0;
    }

    GetNewVelocity(AccelerationMS: number) {
        console.log("????????????",AccelerationMS);
       let msPassed = this.GetTimePassed();
        let increasedBy = (AccelerationMS / 1000) * msPassed;
        this.velocity = this.velocity + increasedBy;

       return this.velocity;
    }

    getVelocity(type: string = 'm/s'){
        switch(type){
            case 'm/s': return this.velocity;
            case 'km/s': return this.velocity / 60;
            case 'km/h': return Math.round(this.velocity * 3.6);
            case 'm/h': return this.velocity / 60;
            case 'mph': return this.velocity;
        }
    }

    ConvertValue(num:number, type: string = 'meter'){
        switch(type){
            case 'meter': return num;
            case 'kilometer': return Math.round(num / 1000);
            case 'km/h': return num / 1000 * 60;
            case 'm/h': return num / 60;
            case 'mph': return num;
        }
    }

    
    Accelerate(chassis: IChassis) {
        // console.clear();
        let msPassed = this.GetTimePassed();

        if(this.getVelocity('km/h') < chassis.engine.topspeed && msPassed > 0){
            this.GetNewVelocity(this.CalculateAcceleration(chassis));
        }
        
        if(this.getVelocity('km/h') > chassis.engine.topspeed){
            this.velocity = chassis.engine.topspeed / 3.6;
        }
    }

    Decelerate(chassis: IChassis){
        let msPassed = this.GetTimePassed();
        if(this.getVelocity() > 0 && msPassed > 0){
            this.GetNewVelocity(this.CalculateDeceleration(chassis));
        } 
        
        if (this.getVelocity() <= 0) {
            this.velocity = 1;
        }
    }

    Move(){
        let msPassed = this.GetTimePassed(true);
        console.log("!!! " + this.velocity,"________________", msPassed,"ms");
        this.distanceTravelled = this.distanceTravelled + (this.getVelocity() / 1000 * msPassed);
    }

    CalculateFriction(chassis: IChassis){
        
        return (5000 + (chassis.downforce * (this.velocity / 1000 )) / 100000);
    }
    
    GetTimePassed(isCheck: boolean = false) : number{
        const dif = new Date().getTime() - this.lastCheck.getTime() ;
        if(isCheck){
            this.lastCheck = new Date();
        }
        return dif;
    }

    CalculateAcceleration(chassis: IChassis) : number {
        let acceleration = (((12.5  + (20 * chassis.engine.acceleration))  / 3.6) / 100);
        return Math.round(acceleration);
    }

    CalculateDeceleration(chassis: IChassis) : number {
        return -5.41;
    }
    

}