import { Track } from "./track";
import { CarCollection } from "./carcollection";
import { Car } from "./car";
import { Entry } from "./entry";

export class TrackMediator {
    track: Track;
    private cars: CarCollection;

    constructor(track: Track, cars: CarCollection) {
        this.track = track;
        this.cars = cars;
    }

    handle() {
        this.cars.handle((entry) => {
            entry.car.Move();
        });
    }

    findCarsClose(entry: Entry) {
        let test = this.cars.GetCars().reduce(function (prev, curr) {
            return (
                entry != curr &&
                    curr.car.GetDistanceOnLap(100) - entry.car.GetDistanceOnLap(100) < prev.car.GetDistanceOnLap(100) - entry.car.GetDistanceOnLap(100) ? curr : prev
            );
        });
        console.log(Math.abs(test.car.GetDistanceOnLap(100) - entry.car.GetDistanceOnLap(100)) + " "+test.entryNumber);
        return test;
    }
}