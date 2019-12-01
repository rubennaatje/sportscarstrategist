import { Driver } from "./driver";
import { Car } from "./car";

export class Entry {
    category: string;
    drivers: Driver[];
    entryNumber: (string | number);
    currentDriverIndex: number;
    car: Car;
    
    constructor(entryNumber: (string | number), car: Car){
        this.drivers = [];
        this.entryNumber = entryNumber;
        this.car = car;
    }
}