import { Car } from './car';
import { Entry } from './entry';
import { CarState } from './enumerations/carstate';

export class CarCollection {
  private cars: Entry[];

  constructor(cars: Entry[]) {
    this.cars = cars;
  }

  AddCar(car: Entry): void {
    this.cars.push(car);
  }

  GetCars(): Entry[] {
    return this.cars;
  }

  GetCarsByState(state: CarState, entry: number | string = -1): Entry[] {
    return this.cars.filter(
      (car) => car.state === state && car.entryNumber != entry
    );
  }

  GetCarByEntryNumber(entryNumber: string | number): Entry {
    // == instead of === on purpose
    return this.cars.find((entry) => entry.entryNumber == entryNumber);
  }

  async handle(f: (arg0: Entry) => void) {
    for (var c of this.cars) {
      if (c != null) {
        f(c);
      }
    }
  }
  staticJson(): {}[] {
    let dataSend: {}[] = [];

    this.handle((entry: Entry) => {
      dataSend.push({
        chassis: entry.car.chassis,
        category: entry.category,
        carnumber: entry.entryNumber,
        car: {
          drivers: entry.drivers.map((driver) => ({
            stats: driver.driverStats,
            name: driver.name,
            nationality: driver.nationality,
            category: driver.category,
          })),
        },
      });
    });

    return dataSend;
  }
}
