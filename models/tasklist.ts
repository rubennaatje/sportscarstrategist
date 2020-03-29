import { Task } from './task';
import { CarState } from './enumerations/carstate';

export class TaskList {
  tasks: Task[];
  currentTask: number;

  constructor() {
    this.tasks = [];
  }

  StartTask(CarState: CarState) {
    return this.tasks.map((task, i) => task.starttype === CarState);
  }

  AddTask(task: Task) {
    this.tasks.push(task);
  }

  GetCurrentTask(): Task {
    return this.tasks[this.currentTask];
  }

  //EndCurrentTask();
}
