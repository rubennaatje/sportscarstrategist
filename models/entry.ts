import { Driver } from './driver';
import { Car } from './car';
import { Track } from './track';
import { CarState } from './enumerations/carstate';
import { TaskList } from './tasklist';

export class Entry {
  category: string;
  drivers: Driver[];
  entryNumber: string | number;
  currentDriverIndex: number;
  car: Car;
  track: Track;
  state: CarState;
  taskList: TaskList;

  constructor(entryNumber: string | number, car: Car) {
    this.drivers = [];
    this.currentDriverIndex = 0;
    this.entryNumber = entryNumber;
    this.car = car;
    this.car.entry = this;
    this.state = CarState.GARAGE;
    this.taskList = new TaskList();
  }

  handle() {
    switch (this.state) {
      case CarState.GARAGE:
        break;
      case CarState.OFF_TRACK:
        break;
      case CarState.ON_TRACK:
        break;
      case CarState.PITBOX:
        break;
    }

    this.GetActiveDriver().handle(this.car);
    //this.taskList.getCurrentTask();
  }

  RunTelemetry() {
    // in the future this will be a list of ITelemetry items that will be looped through
    // this.telemetry.handle();
    this.car.laps[this.car.GetLaps()].handle();
  }

  GetActiveDriver() {
    return this.drivers[this.currentDriverIndex];
  }

  // send data
  ToJson() {
    return {
      EntryNumber: this.entryNumber,
      category: this.category,
      drivers: this.drivers,
      currentDriverIndex: this.currentDriverIndex,
      car: {
        chassis: this.car.chassis.name,
        category: this.car.entry.category,
        extra: this.car.ToJSON(),
      },
    };
  }
}
