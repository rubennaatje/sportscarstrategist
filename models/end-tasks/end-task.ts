import { Entry } from '../entry';

export abstract class EndTask {
  done: Date;

  public Handle(entry: Entry) {
    this.done = new Date();
    this.DoAction(entry);
  }

  protected abstract DoAction(entry: Entry): void;
}
