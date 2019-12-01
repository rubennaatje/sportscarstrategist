import { Car } from "./car";
import { Entry } from "./entry";

export class CarCollection {
    private cars: Entry[];
    
    constructor(cars: Entry[]){
        this.cars = cars;
    }

    AddCar(car: Entry): void {
        //this.cars.push(car);
    }

    GetCars(): Entry[]{
        return this.cars;
    }

    handle(f: (arg0: Entry) => void) {
        for(var c of this.cars){
            if(c != null){
                f(c);
            }
        }
    }
}