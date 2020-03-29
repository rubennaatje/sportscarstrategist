import { EndTask } from './end-task';
import { Entry } from '../entry';

export class PitlaneOut extends EndTask {
  protected DoAction(entry: Entry): void {
    console.log('Pitlane out!');
  }
}
