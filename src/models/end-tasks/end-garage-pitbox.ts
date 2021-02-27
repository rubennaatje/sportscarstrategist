import { EndTask } from './end-task';
import { Entry } from '../entry';
import { Commentary } from '../singletons/commentary';
import { CarState } from '../enumerations/carstate';

export class GarageOut extends EndTask {
  protected DoAction(entry: Entry): void {
    console.log('garage out!');
    Commentary.getInstance().AddEvent('Garage out!');
    entry.state = CarState.PITBOX;
  }
}
