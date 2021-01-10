import { Telemetry } from './telemetry';
import { Car } from './car';

export class TimedLap {
  lapNR: number;
  startTimeS: number;
  laptimeS: number;
  telemetry: Telemetry;

  constructor(i: number, car: Car) {
    this.lapNR = i;
    this.telemetry = new Telemetry(car);
  }

  handle() {
    this.telemetry.handle();
  }

  start(time: number) {
    this.startTimeS = time;
  }

  finish(time: number) {
    this.laptimeS = time - this.startTimeS;
  }

  ToJSON() {
    return {
      lapNR: this.lapNR,
      startTimeS: this.startTimeS,
      laptimeS: this.laptimeS,
      telemetry: this.telemetry.ToJSON(),
    };
  }
}
