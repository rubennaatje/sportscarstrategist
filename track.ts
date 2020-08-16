import { Track } from './models/track';

export const track = {
  length: 1234,
  graphics: {
    track_path: '',
    pitlane_path: '',
    S1_path: '',
    S2_path: '',
    S3_path: '',
  },
  information: {
    location: '',
    lat_lon: { lat: 0, lon: 0 },
    text: '',
  },
  pitlane: {
    start: 7010,
    end: 90,
    length: 0,
    pitspeed: 0,
    pitspeed_start: 0,
    pitspeed_end: 0,
    pitboxes: [
      {
        num: 0,
        point: 0,
        entry_number: 33,
        garage_distance: 5,
      },
    ],
  },
  sectors: [
    {
      name: 'S1',
      start: 0,
      length: 0,
    },
    {
      name: 'S2',
      start: 0,
      length: 0,
    },
    {
      name: 'S3',
      start: 0,
      length: 0,
    },
  ],
  speedtrap: 0,
  starting_line: 0,
  finish_line: 0,
  corners: [
    {
      num: 1,
      name: 'La Source',
      point: 435,
      // temp before physics
      entry_speed: 40,
      apex_speed: 40,
      exit_speed: 40,
      turn_in_point: -20,
      exit_point: 20,

      lose_control_risk_multiplier: 100,
      car_wear_multiplier: 100,
      tyre_wear_multiplier: 10,
    },
    {
      num: 2,
      name: '',
      point: 754,
      // temp before physics
      entry_speed: 40,
      apex_speed: 40,
      exit_speed: 40,
      turn_in_point: -20,
      exit_point: 20,

      lose_control_risk_multiplier: 100,
      car_wear_multiplier: 100,
      tyre_wear_multiplier: 10,
    },
    {
      num: 3,
      name: 'Eau Rouge',
      point: 1102,
      // temp before physics
      entry_speed: 40,
      apex_speed: 40,
      exit_speed: 40,
      turn_in_point: -20,
      exit_point: 20,

      lose_control_risk_multiplier: 100,
      car_wear_multiplier: 100,
      tyre_wear_multiplier: 10,
    },
    {
      num: 4,
      name: '',
      point: 2000,
      // temp before physics
      entry_speed: 40,
      apex_speed: 40,
      exit_speed: 40,
      turn_in_point: -20,
      exit_point: 20,

      lose_control_risk_multiplier: 100,
      car_wear_multiplier: 100,
      tyre_wear_multiplier: 10,
    },
  ],
};
