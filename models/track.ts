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
        (prev != curr &&
          curr.point - goal > 0 &&
          curr.point - goal < prev.point - goal) ||
        prev.point - goal < 0
          ? curr
          : prev
      );

      if (result.point < goal && result.last_corner) {
        result = this.corners[0];
      }
    }
    return result;
  }

  staticJson() {
    return {
      length: this.length,
      points: {
        speedtrap: this.speedtrap,
        starting_line: this.starting_line,
        finish_line: this.finish_line,
      },
      pitlane: this.pitlane,
      sectors: this.sectors,
      corners: this.corners,
      information: this.information,
    };
  }
}
