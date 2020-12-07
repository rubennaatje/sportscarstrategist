import { EndTask } from './end-task';
import { Entry } from '../entry';
import { CarState } from '../enumerations/carstate';

export class GarageIn extends EndTask {
  protected DoAction(entry: Entry): void {
    console.log('Garage in!');
    entry.state = CarState.GARAGE;
    // entry.car.carPhysics.distanceTravelledOnPitlane = entry.GetPitBox().point;
  }
}
