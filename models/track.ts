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
      let next_corner = last_corner > this.corners.length ? 0 : last_corner++;
      result = this.corners.find((corner) => corner.point == next_corner);
    }

    if (result == null) {
      // Otherwise try finding the closest.
      const goal = point;
      result = this.corners.reduce((prev, curr) =>
        curr.point - goal > 0 && curr.point - goal < prev.point - goal
          ? curr
          : prev
      );
    }
    return result;
  }
}
