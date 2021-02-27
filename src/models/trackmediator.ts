import { Track } from './track';
import { CarCollection } from './carcollection';
import { Car } from './car';
import { Entry } from './entry';
import { CarState } from './enumerations/carstate';

import { sortTrackPosition } from '../functions/standingssort';
import { calculateDistanceTo } from '../functions/calculateTimeTo';
import { Session } from './session';

export class TrackMediator {
  track: Track;
  private cars: CarCollection;

  constructor(track: Track, cars: CarCollection) {
    this.track = track;
    this.cars = cars;

    for (const entry of this.cars.GetCars()) {
      entry.track = this.track;
      entry.car.next_corner = entry.car.GetNextCornerOnTrack();
    }
  }

  handle() {
    this.cars.handle((entry) => {
      entry.car.Move();
    });
    this.getStandings();
  }

  getStandings() {
    this.cars
      .GetCars()
      .sort(sortTrackPosition)
      .forEach((entry, i) => {
        if (i !== 0 && entry.state !== CarState.ON_TRACK) {
          const carInFront = this.cars.GetCars()[i - 1];

          const distanceToCarInFront =
            carInFront.car.GetDistanceOnLap() - entry.car.GetDistanceOnLap();

          if (
            distanceToCarInFront < 100 &&
            entry.car.next_corner.point +
              entry.car.next_corner.turn_in_point -
              100 -
              entry.car.GetDistanceOnLap() >
              0
          ) {
            if (distanceToCarInFront > 10) {
            } else {
            }
          } else if (
            distanceToCarInFront > 1 &&
            distanceToCarInFront < 5 &&
            entry.car.next_corner.point +
              entry.car.next_corner.turn_in_point -
              100 -
              entry.car.GetDistanceOnLap() <
              0
          ) {
            entry.car.carPhysics.distanceTravelledOnLap =
              carInFront.car.GetDistanceOnLap() - 5;
            entry.car.carPhysics.velocity = carInFront.car.carPhysics.velocity;
            console.log(
              `${entry.entryNumber} getting held up by ${carInFront.entryNumber}!`
            );
          }
        }
      });
  }

  staticJson() {
    return { track: this.track.staticJson(), cars: this.cars.staticJson() };
  }
}
