import { Driver } from './driver';
import { Car } from './car';
import { Track } from './track';
import { CarState } from './enumerations/carstate';
import { TaskList } from './tasklist';
import { Task } from './task';
import { GarageOut } from './end-tasks/end-garage-pitbox';
import { PitboxOut } from './end-tasks/pitbox-pitlane';

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
    this.state = CarState.ON_TRACK;
    this.taskList = new TaskList();
  }

  handle() {
    switch (this.state) {
      case CarState.GARAGE:
        break;
      case CarState.OFF_TRACK:
        break;
      case CarState.ON_TRACK:
        this.GetActiveDriver().handle(this.car);
        break;
      case CarState.PITBOX:
        break;
      case CarState.PIT_OUT:
        this.GetActiveDriver().handle(this.car);
        this.state = CarState.ON_TRACK;
        break;
    }

    const res = this.taskList.HandleCurrentTask();
    if (!res && this.taskList.tasks.length > 0) {
      this.taskList.StartTask(this.state);
      if (this.entryNumber == 7) {
        // console.log('start task!', this.taskList.GetCurrentTask(), this.state);
      }
    }
  }

  getout() {
    this.taskList.AddTask(
      new Task(
        'getting out of garage',
        1000,
        100,
        CarState.GARAGE,
        1,
        40,
        true,
        new GarageOut(this)
      )
    );
    this.taskList.AddTask(
      new Task(
        'PIT OUT',
        100,
        100,
        CarState.PITBOX,
        1,
        40,
        true,
        new PitboxOut(this)
      )
    );
  }

  getin() {
    this.taskList.AddTask(
      new Task(
        'getting out of garage',
        1000,
        100,
        CarState.GARAGE,
        1,
        40,
        true,
        new GarageOut(this)
      )
    );
    this.taskList.AddTask(
      new Task(
        'PIT OUT',
        100,
        100,
        CarState.PITBOX,
        1,
        40,
        true,
        new PitboxOut(this)
      )
    );
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
