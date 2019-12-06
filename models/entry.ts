import { Driver } from "./driver";
import { Car } from "./car";
import { Telemetry } from "./telemetry";

export class Entry {
    category: string;
    drivers: Driver[];
    entryNumber: (string | number);
    currentDriverIndex: number;
    car: Car;
    telemetry: Telemetry;
    

    handle() {
        this.GetActiveDriver().handle(this.car);
    }

    RunTelemetry(){
        // in the future this will be a list of ITelemetry items that will be looped through
        this.telemetry.handle();
    }

    GetActiveDriver() {
        return this.drivers[this.currentDriverIndex];
    }

    constructor(entryNumber: (string | number), car: Car) {
        this.drivers = [];
        this.currentDriverIndex = 0;
        this.entryNumber = entryNumber;
        this.car = car;
        this.telemetry = new Telemetry(car);
    }
}