import { Track } from './track';
import { CarCollection } from './carcollection';
import { Car } from './car';
import { Entry } from './entry';

export class TrackMediator {
  track: Track;
  private cars: CarCollection;

  constructor(track: Track, cars: CarCollection) {
    this.track = track;
    this.cars = cars;

    for (const iterator of this.cars.GetCars()) {
      iterator.track = this.track;
    }
  }

  handle() {
    this.cars.handle((entry) => {
      if (entry.entryNumber == '8') {
        console.log(this.track.GetNextCorner(entry.car.GetDistanceOnLap()));
      }
      entry.car.Move();
    });
  }

  findCarsClose(entry: Entry) {
    let test = this.cars.GetCars().reduce(function (prev, curr) {
      return entry != curr &&
        curr.car.GetDistanceOnLap() - entry.car.GetDistanceOnLap() >
          prev.car.GetDistanceOnLap() - entry.car.GetDistanceOnLap()
        ? curr
        : prev;
    });
    return test;
  }
}
