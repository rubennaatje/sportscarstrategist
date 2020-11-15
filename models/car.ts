import { IChassis } from './interfaces/chassis';
import { CarPhysics } from './carphysics';
import { Entry } from './entry';
import { TimedLap } from './timedlap';
import { Corner } from './Corner.1';
import { Track } from './track';

export class Car {
  chassis: IChassis;
  EngineOn: boolean;
  carPhysics: CarPhysics;
  entry: Entry;
  laps: TimedLap[];
  next_corner: Corner;

  //temp vars
  private reachedtopspeed: boolean;
  constructor() {
    this.carPhysics = new CarPhysics();
    this.laps = [];
    this.laps[0] = new TimedLap(0, this);
    this.laps[0].start(Date.now());
  }

  GetTrack(): Track {
    return this.entry.track;
  }

  GetNextCornerOnTrack(): Corner {
    const nextCorner = this.GetTrack().GetNextCorner(
      this.GetDistanceOnLap(),
      this.next_corner?.num || 0
    );
    return nextCorner;
  }

  StartEngine() {
    this.EngineOn = true;
  }

  KillEngine() {
    this.EngineOn = false;
  }

  Throttle(percentage: number) {
    const acceleration = this.carPhysics.Accelerate(this.chassis);
  }

  GetLaps(): number {
    return Math.floor(
      this.carPhysics.distanceTravelled / this.entry.track.length
    );
  }

  GetDistanceOnLap() {
    return this.carPhysics.distanceTravelled % this.entry.track.length;
  }

  GetPercentage(round: boolean = false) {
    var percentage = (this.GetDistanceOnLap() / this.entry.track.length) * 100;
    if (round) {
      return Math.round(percentage);
    }
    return percentage;
  }

  Brake(percentage: number) {
    this.carPhysics.Decelerate(this.chassis);
  }

  Move() {
    const laps: number = this.GetLaps();
    this.carPhysics.Move();

    if (laps !== this.GetLaps()) {
      this.laps[laps].finish(Date.now());
      console.log(this.laps[laps]);
      this.laps[this.GetLaps()] = new TimedLap(this.GetLaps(), this);
      this.laps[this.GetLaps()].start(Date.now());
    }

    if (
      this.next_corner.exit_point + this.next_corner.point <
      this.GetDistanceOnLap()
    ) {
      this.next_corner = this.GetNextCornerOnTrack();
    }
  }

  ToJSON() {
    return {
      lapdistance: this.GetDistanceOnLap(),
      laps: this.GetLaps(),
      percentage: this.GetPercentage(),
      speed: this.carPhysics.getVelocity('km/h'),
      currentTelemetry: this.laps[this.GetLaps()].telemetry.speed,
      laptimes: this.GetLaptimes(),
    };
  }

  GetLaptimes() {
    let res = [];

    this.laps.forEach((lap) => {
      res.push(lap.laptimeS);
    });

    return res;
  }

  GetTelemetry(lap: number = -1) {
    if (lap === -1) {
      return this.laps[this.GetLaps()].telemetry.speed;
    } else {
      return this.laps[lap].telemetry.speed;
    }
  }
}
