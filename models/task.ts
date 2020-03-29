import { EndTask } from './end-tasks/end-task';
import { CarState } from './enumerations/carstate';

export class Task {
  taskId: number;
  finished: boolean = false;
  description: string;
  length: number;
  doneTime: number;
  starttype: CarState;
  prio: number;
  cancellableTill: number;
  visible: boolean;
  index: number;
  endTask: EndTask;

  /**
   *
   */
  constructor(
    description: string,
    length: number,
    doneTime: number,
    startType: CarState,
    prio: number,
    cancellableTill: number,
    visible: boolean,
    endTask: EndTask
  ) {
    this.description = description;
    this.length = length;
    this.doneTime = doneTime;
    this.starttype = startType;
    this.prio = prio;
    this.cancellableTill = cancellableTill;
    this.visible = visible;
    this.endTask = endTask;
  }
  /**
   * Handle
   */
  public Handle(time: number) {
    this.doneTime += time;
    if (this.doneTime >= length) {
      this.finished = true;
    }
  }
}
