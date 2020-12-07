import { SessionType } from './enumerations/sessiontype';
import { CarCollection } from './carcollection';
import { Entry } from './entry';
import { TrackMediator } from './trackmediator';
import {
  sortTrackPosition,
  sortTrackPositionWithLaps,
  getSortFunction,
  sortByEntryNumber,
} from '../functions/standingssort';
import { throws } from 'assert';
import { calculateDistanceTo } from '../functions/calculateTimeTo';

export class Session {
  private lengthMinutes: number;
  private lengthLaps: number;
  private startTime: Date;
  private sessionType: SessionType;
  private sessionName: string;
  private data: {}[];

  cars: CarCollection;

  constructor(
    cars: CarCollection,
    sessionName: string,
    lengthMinutes: number,
    lengthLaps: number,
    startTime: Date,
    sessionType: SessionType
  ) {
    this.sessionName = sessionName;
    this.lengthLaps = lengthLaps;
    this.lengthMinutes = lengthMinutes;
    this.startTime = startTime;
    this.sessionType = sessionType;
    this.cars = cars;
  }

  GetSessionName() {
    return this.sessionName;
  }

  GetSessionType() {
    return this.sessionName;
  }

  GetLengthMinutes() {
    return this.lengthMinutes;
  }

  GetLengthLaps() {
    return this.lengthLaps;
  }

  GetStartTime() {
    return this.startTime;
  }

  GetCars() {
    const res = this.cars
      .GetCars()
      .sort(getSortFunction(this.sessionType))
      .map((entry, i, array) => ({
        pos: i + 1,
        gap:
          i === 0
            ? 0
            : calculateDistanceTo(
                array[i - 1].car.GetDistanceOnLap(),
                entry.car.GetDistanceOnLap(),
                entry.car.carPhysics.getVelocity()
              ),
        car2: entry.car.chassis.name,
        category: entry.category,
        laps: entry.car.GetLaps(),
        lapdistance: entry.car.GetDistanceOnLap(),
        percentage: entry.car.GetPercentage(),
        pitlaneDistance: entry.car.carPhysics.distanceTravelledOnPitlane,
        pitlanePercentage: entry.car.GetPitlanePercentage(),
        speed: entry.car.carPhysics.getVelocity('km/h'),
        carnumber: entry.entryNumber,
        fastestlap: entry.car.GetFastestLap(1),
        realdeal: entry.ToJson(),
      }))
      .sort(sortByEntryNumber);
    res.forEach((car) => {
      if (car.carnumber === 7 || car.carnumber === 1) {
        // console.log(car.pitlanePercentage);
      }
    });
    return res;
  }

  getState() {
    return {
      sessionName: this.sessionName,
      lengthLaps: this.lengthLaps,
      lengthMinutes: this.lengthMinutes,
      startTime: this.startTime,
      sessionType: this.sessionType,
    };
  }

  handle() {
    this.cars.handle((entry: Entry) => {
      // Q1W - some weird kid on the train that decided to suddenly touch my keyboard
      entry.handle();
    });
  }
}
