import { Task } from './task';
import { CarState } from './enumerations/carstate';

export class TaskList {
  tasks: Task[];
  currentTask: number;

  startTask(CarState: CarState) {
    return this.tasks.map((task, i) => task.starttype === CarState);
  }

  getCurrentTask() {
    return this.tasks[this.currentTask];
  }
}
