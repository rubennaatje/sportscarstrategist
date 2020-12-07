import { Entry } from '../models/entry';
import { SessionType } from '../models/enumerations/sessiontype';
import { sendData } from '../models/interfaces/sendData';

export const sortTrackPositionWithLaps = (a: Entry, b: Entry) =>
  a.car.laps < b.car.laps
    ? 1
    : a.car.laps === b.car.laps
    ? a.car.GetDistanceOnLap() < b.car.GetDistanceOnLap()
      ? 1
      : a.car.GetDistanceOnLap() === b.car.GetDistanceOnLap()
      ? +a.entryNumber > +b.entryNumber
        ? 1
        : -1
      : -1
    : -1;

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
