import { Car } from './car';
import { calculateDistanceTo } from '../functions/calculateTimeTo';
import { ITelemetryLog } from './singletons/TelemetryLog';

export class Telemetry {
  private car: Car;
  data: { pos: number; time: number; val: number; delta: number }[];
  date: number;
  lastLapTelemetry?: any;

  constructor(car: Car) {
    this.car = car;
    this.data = [];
    this.date = Date.now();
    this.lastLapTelemetry =
      this.car.GetLapsIndex() > 0
        ? this.car.GetTelemetry(this.car.GetLapsIndex() - 1)
        : null;
  }

  handle() {
    this.data.push({
      pos: this.car.GetDistanceOnLap(),
      time: (Date.now() - this.date) / 1000,
      val: this.car.carPhysics.getVelocity('km/h'),
      delta: this.calculateDelta(),
    });
  }
  calculateDelta() {
    if (
      this.car.GetLapsIndex() <= 1 ||
      !this.lastLapTelemetry ||
      this.lastLapTelemetry.length <= 0
    ) {
      return 0;
    }
    const goal = (Date.now() - this.date) / 1000;
    var closest = this.lastLapTelemetry.reduce(function (prev, curr) {
      return Math.abs(curr.time - goal) < Math.abs(prev.time - goal)
        ? curr
        : prev;
    });

    return calculateDistanceTo(
      closest.pos,
      this.car.GetDistanceOnLap(),
      this.car.carPhysics.getVelocity()
    );
  }

  ToJSON() {
    return {
      speed: this.data,
    };
  }
}
