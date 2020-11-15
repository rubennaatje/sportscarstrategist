import { EndTask } from './end-task';
import { Entry } from '../entry';
import { CarState } from '../enumerations/carstate';

export class PitboxOut extends EndTask {
  protected DoAction(entry: Entry): void {
    console.log('pitbox out!');
    entry.state = CarState.PIT_OUT;
  }
}
