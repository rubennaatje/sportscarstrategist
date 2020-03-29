import { EndTask } from './end-task';
import { Entry } from '../entry';

export class GarageOut extends EndTask {
  protected DoAction(entry: Entry): void {
    console.log('garage out!');
    Commentary.getInstance().AddEvent('Garage out!');
  }
}
