import { Task } from './task';
import { CarState } from './enumerations/carstate';

export class TaskList {
  tasks: Task[];
  currentTask: number | undefined;
  lastCheck: Date;

  constructor() {
    this.tasks = [];
    this.lastCheck = new Date();
  }

  StartTask(carState: CarState) {
    const possibleTasks = this.tasks.filter(
      (task) => task.starttype == carState
    );
    if (possibleTasks.length > 0) {
      this.currentTask = possibleTasks[0].index;
    }
  }

  AddTask(task: Task) {
    task.index = this.tasks.length;
    this.tasks.push(task);
  }

  RemoveTask(task: Task) {
    this.tasks.splice(task.index, 1);
  }

  GetCurrentTask(): Task {
    return this.tasks[this.currentTask];
  }

  HandleCurrentTask() {
    let currentTask = this.GetCurrentTask();

    if (currentTask?.finished) {
      console.log('taskdone: ', currentTask);
      console.log('tasks left:', this.tasks.length - 1);
      this.RemoveTask(currentTask);
      this.currentTask = undefined;
      currentTask = null;

      return false;
    }

    return currentTask?.Handle(this.GetTimePassed());
  }

  GetTimePassed(isCheck: boolean = false): number {
    const dif = new Date().getTime() - this.lastCheck.getTime();
    if (isCheck) {
      this.lastCheck = new Date();
    }
    return dif;
  }
}
