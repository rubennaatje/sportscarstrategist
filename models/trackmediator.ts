import { Track } from './track';
import { CarCollection } from './carcollection';
import { Car } from './car';
import { Entry } from './entry';
import { CarState } from './enumerations/carstate';

export class TrackMediator {
  track: Track;
  private cars: CarCollection;

  constructor(track: Track, cars: CarCollection) {
    this.track = track;
    this.cars = cars;

    for (const iterator of this.cars.GetCars()) {
      iterator.track = this.track;
      iterator.car.next_corner = iterator.car.GetNextCornerOnTrack();
    }
  }

  handle() {
    this.cars.handle((entry) => {
      entry.car.Move();
      // entry.car.GetDistanceOnLap() - this.findCarsClose(entry).car.GetDistanceOnLap();

      if (entry.state === CarState.ON_TRACK && entry.entryNumber == '7') {
        const carInFront = this.findCarsClose(entry);

        const distanceToCarInFront =
          carInFront.car.GetDistanceOnLap() - entry.car.GetDistanceOnLap();

        if (
          distanceToCarInFront < 100 &&
          entry.car.GetNextCornerOnTrack().turn_in_point - 100 >
            entry.car.GetDistanceOnLap()
        ) {
          if (distanceToCarInFront < 10) {
            console.log('really close into a corner!!');
          }
        }
        console.log(distanceToCarInFront, carInFront.entryNumber);
      }
    });
  }

  findCarsClose(entry: Entry) {
    let test = this.cars.GetCars().reduce(function (prev, curr) {
      const distance =
        curr.car.GetDistanceOnLap() - entry.car.GetDistanceOnLap();
      if (curr === entry) {
        console.log('xd');
        return prev;
      }
      return entry != curr &&
        distance > 0 &&
        distance > prev.car.GetDistanceOnLap() - entry.car.GetDistanceOnLap()
        ? curr
        : prev;
    });
    return test;
  }

  findCarInFront(entry: Entry) {
    const goal = entry.car.GetDistanceOnLap();
    const result = this.cars
      .GetCars()
      .reduce((prev, curr) =>
        (prev != curr &&
          curr.entryNumber !== curr.entryNumber &&
          curr.car.GetDistanceOnLap() - goal > 0 &&
          curr.car.GetDistanceOnLap() - goal <
            prev.car.GetDistanceOnLap() - goal) ||
        prev.car.GetDistanceOnLap() - goal > 0
          ? curr
          : prev
      );
    return result;
  }
}
