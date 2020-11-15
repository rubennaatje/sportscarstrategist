import { Entry } from '../entry';

export abstract class EndTask {
  done: Date;
  entry: Entry;
  constructor(entry: Entry) {
    this.entry = entry;
  }
  public Handle(entry: Entry = null) {
    this.done = new Date();
    this.DoAction(entry || this.entry);
  }

  protected abstract DoAction(entry: Entry): void;
}
