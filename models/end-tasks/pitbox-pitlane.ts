import { EndTask } from './end-task';
import { Entry } from '../entry';

export class PitboxOut extends EndTask {
  protected DoAction(entry: Entry): void {
    console.log('pitbox out!');
  }
}
