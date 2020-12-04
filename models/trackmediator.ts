import { Track } from './track';
import { CarCollection } from './carcollection';
import { Car } from './car';
import { Entry } from './entry';
import { CarState } from './enumerations/carstate';
import kleur = require('kleur');
import { sortTrackPosition } from '../functions/standingssort';
import { calculateDistanceTo } from '../functions/calculateTimeTo';

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

      // if (entry.state === CarState.ON_TRACK) {
      //   const carInFront = this.findCarsClose(entry);
      //   if (carInFront) {
      //     const distanceToCarInFront =
      //       carInFront.car.GetDistanceOnLap() - entry.car.GetDistanceOnLap();

      //     if (distanceToCarInFront < 100) {
      //     }

      //     if (
      //       distanceToCarInFront < 100 &&
      //       entry.car.next_corner.point +
      //         entry.car.next_corner.turn_in_point -
      //         100 -
      //         entry.car.GetDistanceOnLap() >
      //         0
      //     ) {
      //       if (distanceToCarInFront > 10) {
      //       } else {
      //       }
      //     } else if (
      //       distanceToCarInFront > 1 &&
      //       distanceToCarInFront < 5 &&
      //       entry.car.next_corner.point +
      //         entry.car.next_corner.turn_in_point -
      //         100 -
      //         entry.car.GetDistanceOnLap() <
      //         0
      //     ) {
      //       entry.car.carPhysics.distanceTravelledOnLap =
      //         carInFront.car.GetDistanceOnLap() - 5;
      //       entry.car.carPhysics.velocity = carInFront.car.carPhysics.velocity;
      //       console.log(
      //         kleur.green(
      //           `${entry.entryNumber} getting held up by ${carInFront.entryNumber}!`
      //         )
      //       );
      //     }
      //   }
      // }
    });
  }

  getStandings() {
    const res = this.cars.GetCars().sort(sortTrackPosition);
    res.forEach((entry, i) => {
      if (i !== 0) {
        const carInFront = this.cars.GetCars()[i - 1];

        console.log(
          i + 1,
          entry.entryNumber,
          calculateDistanceTo(
            carInFront.car.GetDistanceOnLap(),
            entry.car.GetDistanceOnLap(),
            entry.car.carPhysics.getVelocity()
          )
        );
      }
    });
  }

  findCarsClose(entry: Entry) {
    const cars = this.cars.GetCarsByState(CarState.ON_TRACK, entry.entryNumber);
    if (cars.length < 1) {
      return null;
    }
    let test = cars.reduce(function (prev, curr) {
      const currDistance =
        curr.car.GetDistanceOnLap() - entry.car.GetDistanceOnLap();
      const prevDistance =
        prev.car.GetDistanceOnLap() - entry.car.GetDistanceOnLap();
      return currDistance > 0 && currDistance < prevDistance ? curr : prev;
    });
    return test;
  }

  findCarInFront(entry: Entry) {
    const goal = entry.car.GetDistanceOnLap();
    const result = this.cars
      .GetCars()
      .reduce((prev, curr) =>
        (prev != curr &&
          curr.entryNumber !== entry.entryNumber &&
          curr.car.GetDistanceOnLap() - goal > 0 &&
          curr.car.GetDistanceOnLap() - goal <
            prev.car.GetDistanceOnLap() - goal) ||
        prev.car.GetDistanceOnLap() - goal < 0
          ? curr
          : prev
      );
    return result;
  }

  staticJson() {
    return { track: this.track.staticJson(), cars: this.cars.staticJson() };
  }
}
