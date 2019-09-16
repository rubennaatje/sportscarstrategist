import { Car } from "./car";

export class CarLink {
    nextLink: CarLink;
    previousLink: CarLink;
    car: Car;
    
    constructor(car: Car){
        this.car = car;
    }
}