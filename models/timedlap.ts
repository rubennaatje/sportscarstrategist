import { Telemetry } from './telemetry';
import { Car } from './car';
import { ITelemetryLog, TelemetryLog } from './singletons/TelemetryLog';

export class TimedLap {
  lapNR: number;
  startTimeS: number;
  laptimeS: number;
  telemetry?: Telemetry;
  car: Car;

  constructor(i: number, car: Car) {
    this.lapNR = i;
    this.telemetry = new Telemetry(car);
    this.car = car;
  }

  handle() {
    this.telemetry.handle();
  }

  getTelemetry() {
    if (this.telemetry) {
      return this.ToJSON().telemetry.speed;
    }
    return TelemetryLog.getInstance().getTelemetry(
      this.car.entry.entryNumber,
      this.lapNR
    ).telemetry.speed;
  }

  start(time: number) {
    this.startTimeS = time;
  }

  finish(time: number) {
    this.laptimeS = time - this.startTimeS;
    TelemetryLog.getInstance().saveTelemetry(this);
    this.telemetry = undefined;
  }

  ToJSON(): ITelemetryLog {
    return {
      lapNR: this.lapNR,
      startTimeS: this.startTimeS,
      laptimeS: this.laptimeS,
      telemetry: this.telemetry.ToJSON(),
      carNumber: this.car.entry.entryNumber,
    };
  }
}
