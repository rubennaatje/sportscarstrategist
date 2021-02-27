export interface Corner {
  num: number;
  name: string;
  point: number;

  // Temp b4 finished physics.
  entry_speed: number;
  apex_speed: number;
  exit_speed: number;

  turn_in_point: number;
  exit_point: number;
  // end temp stuff
  // Multipliers
  lose_control_risk_multiplier: number;
  car_wear_multiplier: number;
  tyre_wear_multiplier: number;
  last_corner?: boolean;
}
