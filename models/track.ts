import { TrackGraphics } from './TrackGraphics';
import { TrackInformation } from './TrackInformation';
import { Pitlane } from './Pitlane.1';
import { Sector } from './Sector';
import { Corner } from './Corner.1';

export class Track {
  length: number;
  speedtrap: number;
  starting_line: number;
  finish_line: number;
  graphics: TrackGraphics;
  information: TrackInformation;
  pitlane: Pitlane;
  sectors: Sector[];
  corners: Corner[];

  constructor(length) {
    this.length = length;
  }

  public GetNextCorner(point: number, last_corner: number = -1) {
    let result: Corner;
    if (~last_corner) {
      let next_corner = last_corner > this.corners.length ? last_corner++ : 0;
      result = this.corners.find((corner) => corner.point == next_corner);
      console.log('xd2');
    }

    if (result == null) {
      console.log('null');
      // Otherwise try finding the closest.
      const goal = point;
      result = this.corners.reduce((prev, curr) =>
        curr.point - goal < prev.point - goal ? curr : prev
      );
    }
    return result;
  }
}
