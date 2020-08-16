import { Pitbox } from './Pitbox';

export interface Pitlane {
  start: number;
  end: number;
  length: number;
  pitspeed: number;
  pitspeed_start: number;
  pitspeed_end: number;
  pitboxes: Pitbox[];
}
