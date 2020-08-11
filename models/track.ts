export class Track {
  length: number;
  speedtrap: number;
  starting_line: number;
  finish_line: number;
  graphics: TrackGraphics;
  information: TrackInformation;
  pitlane: Pitlane;
  sectors: Sector[];
  corners: Object[];
}

export interface TrackGraphics {
  track_path: string;
  pitlane_path: string;
  S1_path: string;
  S1_color?: string;
  S2_path: string;
  S2_color?: string;
  S3_path: string;
  S3_color?: string;
}

export interface TrackInformation {
  location: string;
  lat_lon: { lat: number; lon: number };
  text: string;
}

export interface Pitlane {
  start: number;
  end: number;
  length: number;
  pitspeed: number;
  pitspeed_start: number;
  pitspeed_end: number;
  pitboxes: Pitbox[];
}

export interface Pitbox {
  point: number;
  entry_number: number;
  garage_distance: number;
  num: number;
}

export interface Sector {
  name: string;
  start: number;
  length: number;
}

export interface Corner {
  num: number;
  name: string;
  point: number;

  // Temp b4 finished physics.
  entry_speed: number;
  apex_speed: number;
  exit_speed: number;
  // end temp stuff

  // Multipliers
  lose_control_risk_multiplier: number;
  car_wear_multiplier: number;
  tyre_wear_multiplier: number;
}
