import { Car } from './car';
import { calculateDistanceTo } from '../functions/calculateTimeTo';

export class Telemetry {
  private car: Car;
  speed: { pos: number; time: number; val: number; delta: number }[];
  date: number;
  constructor(car: Car) {
    this.car = car;
    this.speed = [];
    this.date = Date.now();
  }

  handle() {
    this.speed.push({
      pos: this.car.GetDistanceOnLap(),
      time: (Date.now() - this.date) / 1000,
      val: this.car.carPhysics.getVelocity('km/h'),
      delta: this.calculateDelta(),
    });
  }
  calculateDelta() {
    const lastLapTelemetry = this.car.GetTelemetry(this.car.GetLapsIndex() - 1);

    if (
      this.car.GetLapsIndex() <= 1 ||
      !lastLapTelemetry ||
      lastLapTelemetry.length <= 0
    ) {
      return 0;
    }
    const goal = (Date.now() - this.date) / 1000;
    var closest = lastLapTelemetry.reduce(function (prev, curr) {
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
      speed: this.speed,
    };
  }
}
