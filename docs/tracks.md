# Laps

**Because I feel like I massively underestimated this (this was just me randomly thinking about it) I will do this totally different.**

 example of a tracktem, i'm calling it tracktem bcs I don't know what to call it else.

```jsx
{
  "adjustments": {
    "corners": [
      {
        "turn": 1,
        "lift": -10,
        "braking": 10,
        "throttle": 0
      }
    ]
  },

  "laps": [
    {
      "lap_info": {
        "laptime": 22222222,
        "car_wear": 222222,
        "fuel usage": 2222,
        "risk": 60
      },
      "corners": [
        {
          "turn": 1,
          "lift": -150,
          "braking": -100,
          "throttle": 500,
          "fuel_usage": 30,
          "delta": 23566,
          "tyre_wear": 40,
          "car_wear": 20,
          "lose_control_risk": 60
        }
      ]
    }
  ]
}
```

more consistent drivers car stay closer to the tracktem. Faster drivers can drive with higher lose_control_risk. Trying to make your am go as fast as your pro isn't going to work out, he will likely spin and/or crash.

## Algorithm

Simple algorithm that, none of the stuff is visible to the user, he only ever tells the driver to brake, throttle and lift earlier or later. Direct improvement of tracktem. That's the training phase.

In the race (or even during practice) you of course give orders, be easy on the tyres, easy with the fuel, manage the car, drive safe. Or the other way around.

behind the scenes this works like this:

```jsx
{
  "drive_safe": 10,
  "save_fuel": 55,
  "save_tyres": 45,
  "save_car": 60
}
```

During training an algorithm makes sets of these tracktems. after each lap is done they get a score (which is relative to the car) and its other laps. These laps will get a score. Each lap the driver looks at it's orders and selects a lap. it's orders basically come down to the json above. Of course he can also receive changes during his lap. That's when the algorithm chooses another tracktem.

There's other simple orders, for fuel mixture, how much defending, letting a car past, etc.

## Track data

```jsx
{
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
        lat_lon: {lat: 0, lon: 0 },
        text: '',
    },
    pitlane: {
        start: 0,
        end: 0,
        length: 0,
        pitspeed: 0,
        pitspeed_start: 0,
        pitspeed_end: 0,
    },
    sectors: {
        'S1': {
            start: 0,
            length: 0,
        },
        'S2': {
            start: 0,
            length: 0,
        },
        'S3': {
            start: 0,
            length: 0,
        }
    },
    speedtrap: 0,
    starting_line: 0,
    finish_line: 0,
    corners: [{
        number: 1,
        name: '',
        point: 0,
        // temp before physics
        entry_speed: 40,
        apex_speed: 40,
        exit_speed: 40,
        turning_point: 0,
        exit_point: 0, 
        lose_control_risk_multiplier: 100,
        car_wear_multiplier: 100,
        tyre_wear_multiplier: 10,
    }]
}
```

## Interfaces / classes

```tsx
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
```

