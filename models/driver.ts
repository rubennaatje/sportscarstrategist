import { Category } from './types/category';
import { DriverStats } from './types/driverstats';
import { Car } from './car';
import { TrackMediator } from './trackmediator';

export class Driver {
  name: string;
  nationality: string;
  category: Category;
  driverStats: DriverStats;
  fatique: number;
  driveMins: number;
  car: Car;

  constructor(name: string, nationality: string, car: Car = null) {
    this.name = name;
    this.nationality = nationality;
    this.car = car;
    this.category = 'bronze';
    this.driverStats = {
      rawspeed: 90,
      consistency: 100,
      mistakes: 10,
    };
  }

  getCurrentSpeed() {
    const rawspeed = this.driverStats.rawspeed;
    let newSpeed = rawspeed - (this.fatique / 10) * ((Math.random() + 1) * 10);

    return newSpeed;
  }

  handle(car: Car) {
    if (
      car.next_corner.turn_in_point + car.next_corner.point - 100 <
      car.GetDistanceOnLap()
    ) {
      console.log(`coming close to ${car.next_corner.name}!`);
      if (car.next_corner.entry_speed < car.carPhysics.getVelocity('km/h')) {
        car.Brake(50);
        return;
      }
    }
    car.Throttle(100);
  }
}
