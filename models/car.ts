import { IChassis } from './interfaces/chassis';
import { CarPhysics } from './carphysics';
import { Entry } from './entry';
import { TimedLap } from './timedlap';
import { Corner } from './Corner.1';
import { Track } from './track';
import { CarState } from './enumerations/carstate';

export class Car {
  chassis: IChassis;
  EngineOn: boolean;
  carPhysics: CarPhysics;
  entry: Entry;
  laps: Record<number, TimedLap>;
  next_corner: Corner;
  lapIndex: number;
  sessionIndex: number;
  onTrack: boolean;
  pitIn: boolean;
  //temp vars

  constructor() {
    this.carPhysics = new CarPhysics();
    this.laps = {};
    this.laps[0] = new TimedLap(0, this);
    this.laps[0].start(Date.now());

    this.lapIndex = 0;
    this.onTrack = true;
    this.pitIn = true;
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

  GetLapsIndex(): number {
    return this.lapIndex;
  }

  GetLapsAsArray() {
    return Object.values(this.laps);
  }

  isNextLap(): number {
    if (
      Math.floor(
        this.carPhysics.distanceTravelledOnLap / this.entry.track.length
      ) > 0
    ) {
      return this.carPhysics.distanceTravelledOnLap % this.entry.track.length;
    }
    return -1;
  }

  GetDistanceOnLap() {
    return this.carPhysics.distanceTravelledOnLap;
  }

  GetFastestLap(sessionIndex: number) {
    const fastestLap = this.GetLapsAsArray().sort((a, b) =>
      a.laptimeS < b.laptimeS ? 1 : -1
    )[0];
    return { laptime: fastestLap.laptimeS, lapNr: fastestLap.lapNR };
  }

  GetPercentage(round: boolean = false) {
    var percentage = (this.GetDistanceOnLap() / this.entry.track.length) * 100;
    if (round) {
      return Math.round(percentage);
    }
    return percentage;
  }

  GetPitlanePercentage(round: boolean = false) {
    var percentage =
      (this.carPhysics.distanceTravelledOnPitlane /
        this.entry.track.pitlane.length) *
      100;
    if (round) {
      return Math.round(percentage);
    }
    return percentage;
  }
  Brake(percentage: number) {
    this.carPhysics.Decelerate(this.chassis);
  }

  Move() {
    const oldLocation = this.GetDistanceOnLap();
    if (this.onTrack) {
      const laps: number = this.GetLapsIndex();
      this.carPhysics.Move();
      const newLocation = this.GetDistanceOnLap();
      const isNextLap = this.isNextLap();
      if (isNextLap !== -1) {
        this.laps[laps].finish(Date.now());

        this.lapIndex += 1;
        this.laps[this.GetLapsIndex()] = new TimedLap(
          this.GetLapsIndex(),
          this
        );
        this.laps[this.GetLapsIndex()].start(Date.now());

        this.carPhysics.distanceTravelledOnLap = isNextLap;
        console.log('next lap!', this.entry.entryNumber);
      } else if (
        this.pitIn &&
        oldLocation <= this.GetTrack().pitlane.start &&
        newLocation > this.GetTrack().pitlane.start
      ) {
        console.log('shoot into pitlane');
        this.onTrack = false;
        this.pitIn = false;
        this.entry.state = CarState.PIT_IN;
      }

      if (
        this.next_corner.exit_point + this.next_corner.point <
        this.GetDistanceOnLap()
      ) {
        this.next_corner = this.GetNextCornerOnTrack();
      }
    } else if (
      this.entry.state !== CarState.GARAGE &&
      this.entry.state !== CarState.PITBOX
    ) {
      // PIT stuff
      const pitlane = this.GetTrack().pitlane;
      const oldPitlaneDistance = this.carPhysics.distanceTravelledOnPitlane;
      this.carPhysics.MoveInPitlane();
      const pitlanedistance = this.carPhysics.distanceTravelledOnPitlane;

      if (
        oldPitlaneDistance < pitlane.pitlaneFL &&
        pitlanedistance > pitlane.pitlaneFL
      ) {
        const laps: number = this.GetLapsIndex();
        this.laps[laps].finish(Date.now());
        // console.log(this.laps[laps]);
        this.lapIndex += 1;
        this.laps[this.GetLapsIndex()] = new TimedLap(
          this.GetLapsIndex(),
          this
        );
        this.laps[this.GetLapsIndex()].start(Date.now());
        this.carPhysics.distanceTravelledOnLap = 0;
      }
      switch (this.entry.state) {
        case CarState.PIT_IN:
          if (this.entry.GetPitBox()?.point < pitlanedistance) {
            console.log('pitted');
            this.entry.state = CarState.PITBOX;
          }
        case CarState.PIT_OUT: {
          if (pitlanedistance > pitlane.length) {
            this.onTrack = true;
            this.carPhysics.distanceTravelledOnLap = pitlane.end;
            this.carPhysics.distanceTravelledOnPitlane = 0;
            this.entry.state = CarState.ON_TRACK;
            this.Move();
            this.next_corner = this.GetNextCornerOnTrack();
          }
        }
      }
    }
  }

  ToJSON() {
    return {
      lapdistance: this.GetDistanceOnLap(),
      laps: this.GetLapsIndex(),
      percentage: this.GetPercentage(),
      speed: this.carPhysics.getVelocity('km/h'),
      currentTelemetry: this.laps[this.GetLapsIndex()].telemetry.speed,
      laptimes: this.GetLaptimes(),
      inPitlane: !this.onTrack,
    };
  }

  GetLaptimes() {
    let res = [];

    this.GetLapsAsArray().forEach((lap) => {
      res.push(lap.laptimeS);
    });

    return res;
  }

  GetTelemetry(lap: number = -1) {
    if (lap === -1) {
      return this.laps[this.GetLapsIndex()].telemetry.speed;
    } else {
      return this.laps[lap].telemetry.speed;
    }
  }
}
