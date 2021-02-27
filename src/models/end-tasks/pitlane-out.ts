import { EndTask } from './end-task';
import { Entry } from '../entry';
import { CarState } from '../enumerations/carstate';

export class PitlaneOut extends EndTask {
  protected DoAction(entry: Entry): void {
    console.log('Pitlane out!');
    entry.state = CarState.ON_TRACK;
  }
}
