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
      entry_speed: 80,
      apex_speed: 84,
      exit_speed: 90,
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
      entry_speed: 300,
      apex_speed: 300,
      exit_speed: 300,
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
      entry_speed: 280,
      apex_speed: 280,
      exit_speed: 280,
      turn_in_point: -20,
      exit_point: 20,

      lose_control_risk_multiplier: 100,
      car_wear_multiplier: 100,
      tyre_wear_multiplier: 10,
    },
    {
      num: 4,
      name: 'Eau Rouge',
      point: 1180,
      // temp before physics
      entry_speed: 330,
      apex_speed: 330,
      exit_speed: 330,
      turn_in_point: -20,
      exit_point: 20,

      lose_control_risk_multiplier: 100,
      car_wear_multiplier: 100,
      tyre_wear_multiplier: 10,
    },
    {
      num: 5,
      name: 'Raidillon',
      point: 1340,
      // temp before physics
      entry_speed: 1000,
      apex_speed: 1000,
      exit_speed: 1000,
      turn_in_point: -20,
      exit_point: 20,

      lose_control_risk_multiplier: 100,
      car_wear_multiplier: 100,
      tyre_wear_multiplier: 10,
    },
    {
      num: 6,
      name: 'Kemmel',
      point: 1680,
      // temp before physics
      entry_speed: 1000,
      apex_speed: 1000,
      exit_speed: 1000,
      turn_in_point: -20,
      exit_point: 20,

      lose_control_risk_multiplier: 100,
      car_wear_multiplier: 100,
      tyre_wear_multiplier: 10,
    },
    {
      num: 7,
      name: 'Les Combes',
      point: 2470,
      // temp before physics
      entry_speed: 130,
      apex_speed: 130,
      exit_speed: 140,
      turn_in_point: -20,
      exit_point: 20,

      lose_control_risk_multiplier: 100,
      car_wear_multiplier: 100,
      tyre_wear_multiplier: 10,
    },
    {
      num: 8,
      name: 'Les Combes',
      point: 2550,
      // temp before physics
      entry_speed: 125,
      apex_speed: 125,
      exit_speed: 125,
      turn_in_point: -20,
      exit_point: 20,

      lose_control_risk_multiplier: 100,
      car_wear_multiplier: 100,
      tyre_wear_multiplier: 10,
    },
    {
      num: 9,
      name: 'Les Combes',
      point: 2700,
      // temp before physics
      entry_speed: 165,
      apex_speed: 165,
      exit_speed: 165,
      turn_in_point: -20,
      exit_point: 20,

      lose_control_risk_multiplier: 100,
      car_wear_multiplier: 100,
      tyre_wear_multiplier: 10,
    },
    {
      num: 10,
      name: 'Bruxelles',
      point: 3100,
      // temp before physics
      entry_speed: 100,
      apex_speed: 100,
      exit_speed: 100,
      turn_in_point: -20,
      exit_point: 20,

      lose_control_risk_multiplier: 100,
      car_wear_multiplier: 100,
      tyre_wear_multiplier: 10,
    },
    {
      num: 11,
      name: 'Unnamed',
      point: 3350,
      // temp before physics
      entry_speed: 145,
      apex_speed: 145,
      exit_speed: 145,
      turn_in_point: -20,
      exit_point: 20,

      lose_control_risk_multiplier: 100,
      car_wear_multiplier: 100,
      tyre_wear_multiplier: 10,
    },
    {
      num: 12,
      name: 'Pouhon',
      point: 4000,
      // temp before physics
      entry_speed: 220,
      apex_speed: 220,
      exit_speed: 220,
      turn_in_point: -100,
      exit_point: 100,

      lose_control_risk_multiplier: 100,
      car_wear_multiplier: 100,
      tyre_wear_multiplier: 10,
    },
    {
      num: 13,
      name: 'Campus -1',
      point: 4560,
      // temp before physics
      entry_speed: 150,
      apex_speed: 150,
      exit_speed: 180,
      turn_in_point: -20,
      exit_point: 20,

      lose_control_risk_multiplier: 100,
      car_wear_multiplier: 100,
      tyre_wear_multiplier: 10,
    },
    {
      num: 14,
      name: 'Campus',
      point: 4700,
      // temp before physics
      entry_speed: 165,
      apex_speed: 165,
      exit_speed: 165,
      turn_in_point: -20,
      exit_point: 20,

      lose_control_risk_multiplier: 100,
      car_wear_multiplier: 100,
      tyre_wear_multiplier: 10,
    },
    {
      num: 15,
      name: 'Stavelot',
      point: 5000,
      // temp before physics
      entry_speed: 140,
      apex_speed: 140,
      exit_speed: 140,
      turn_in_point: -20,
      exit_point: 20,

      lose_control_risk_multiplier: 100,
      car_wear_multiplier: 100,
      tyre_wear_multiplier: 10,
    },
    {
      num: 16,
      name: 'Courbre Paul Frere',
      point: 5231,
      // temp before physics
      entry_speed: 220,
      apex_speed: 220,
      exit_speed: 220,
      turn_in_point: -20,
      exit_point: 20,

      lose_control_risk_multiplier: 100,
      car_wear_multiplier: 100,
      tyre_wear_multiplier: 10,
    },
    {
      num: 17,
      name: 'Virage',
      point: 6000,
      // temp before physics
      entry_speed: 280,
      apex_speed: 280,
      exit_speed: 280,
      turn_in_point: -20,
      exit_point: 20,

      lose_control_risk_multiplier: 100,
      car_wear_multiplier: 100,
      tyre_wear_multiplier: 10,
    },
    {
      num: 18,
      name: 'Blancimont',
      point: 6230,
      // temp before physics
      entry_speed: 1000,
      apex_speed: 1000,
      exit_speed: 1000,
      turn_in_point: -20,
      exit_point: 20,

      lose_control_risk_multiplier: 100,
      car_wear_multiplier: 100,
      tyre_wear_multiplier: 10,
    },
    {
      num: 19,
      name: 'Bus stop 1',
      point: 6785,
      // temp before physics
      entry_speed: 65,
      apex_speed: 65,
      exit_speed: 65,
      turn_in_point: -20,
      exit_point: 20,

      lose_control_risk_multiplier: 100,
      car_wear_multiplier: 100,
      tyre_wear_multiplier: 10,
    },
    {
      num: 20,
      name: 'Bus stop 2',
      point: 6840,
      // temp before physics
      entry_speed: 70,
      apex_speed: 70,
      exit_speed: 70,
      turn_in_point: -20,
      exit_point: 20,

      lose_control_risk_multiplier: 100,
      car_wear_multiplier: 100,
      tyre_wear_multiplier: 10,
      last_corner: true,
    },
  ],
};
