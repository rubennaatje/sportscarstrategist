import { Entry } from '../models/entry';
import { SessionType } from '../models/enumerations/sessiontype';
import { sendData } from '../models/interfaces/sendData';

export const sortTrackPositionWithLaps = (a: Entry, b: Entry) => {
  const [carA, carB, equal] = [1, 2, 3];

  console.log(a.car.lapIndex, b.car.lapIndex);
  if (a.car.lapIndex < b.car.lapIndex) {
    console.log('<');
    return carB;
  } else if (a.car.lapIndex > b.car.lapIndex) {
    console.log('>');
    return carA;
  }
  // If equal then:
  return sortTrackPosition(a, b);
};

export const sortTrackPosition = (a: Entry, b: Entry) =>
  a.car.GetDistanceOnLap() < b.car.GetDistanceOnLap()
    ? 1
    : a.car.GetDistanceOnLap() === b.car.GetDistanceOnLap()
    ? 0
    : -1;

export const sortByEntryNumber = (a: sendData, b: sendData) =>
  +a.carnumber > +b.carnumber ? 1 : -1;
// `${a.realdeal.entryNumber}`.localeCompare(`${b.al/}`b, 'en', { numeric: true }

export const sortLaptimePosition = (a: Entry, b: Entry) =>
  a.car.GetFastestLap(1)?.laptime < b.car.GetFastestLap(1)?.laptime ? 1 : -1;

export const getSortFunction: (
  sessionType: SessionType
) => (a: Entry, b: Entry) => number = (sessiontype: SessionType) =>
  sessiontype === SessionType.LapTimeBased
    ? sortLaptimePosition
    : sortTrackPositionWithLaps;
