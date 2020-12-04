import { Entry } from '../models/entry';

export const sortTrackPositionWithLaps = (a: Entry, b: Entry) =>
  a.car.laps < b.car.laps
    ? 1
    : a.car.laps === b.car.laps
    ? a.car.GetDistanceOnLap() < b.car.GetDistanceOnLap()
      ? 1
      : -1
    : -1;

export const sortTrackPosition = (a: Entry, b: Entry) =>
  a.car.GetDistanceOnLap() < b.car.GetDistanceOnLap() ? 1 : -1;
