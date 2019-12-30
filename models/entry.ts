import { Driver } from "./driver";
import { Car } from "./car";
import { Telemetry } from "./telemetry";
import { Track } from "./track";

export class Entry {
    category: string;
    drivers: Driver[];
    entryNumber: (string | number);
    currentDriverIndex: number;
    car: Car;
    track: Track;
    

    handle() {
        this.GetActiveDriver().handle(this.car);
    }

    RunTelemetry(){
        // in the future this will be a list of ITelemetry items that will be looped through
        // this.telemetry.handle();
    }

    GetActiveDriver() {
        return this.drivers[this.currentDriverIndex];
    }

    constructor(entryNumber: (string | number), car: Car) {
        this.drivers = [];
        this.currentDriverIndex = 0;
        this.entryNumber = entryNumber;
        this.car = car;
        this.car.entry = this;
    }


    // send data
    ToJson(){
        return {
            EntryNumber: this.entryNumber,
            category: this.category,
            drivers: this.drivers,
            currentDriverIndex: this.currentDriverIndex,
            car: {
                chassis: this.car.chassis.name,
                category: this.car.entry.category,
                extra: this.car.ToJSON()
            }
        };
    }
}