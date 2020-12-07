import { Track } from './models/track';

export const track = {
  length: 1234,
  graphics: {
    track_path:
      'M 131 319.6 C 97.3 343.4 62.6 365.8 27.6 387.7 C 22.4 390.9 17.7 395.2 11.9 397 C 9.9 397.7 7.4 398.5 5.6 397.5 C 4.1 396.7 3.2 394.8 3 393.1 C 2.6 388.3 6.5 382.5 7.9 379.6 C 17.3 359.4 24.2 342 34.1 324.1 C 39 315.2 44.1 306.3 50.5 298.4 C 59.7 286.9 71.4 277.4 81.8 266.9 C 91.3 257.3 100.8 247.7 110.2 238.1 C 116.7 231.4 124.1 225.4 129.7 217.9 C 133.8 212.5 135.9 205.8 139.8 200.3 C 142.8 196.3 145.9 192.1 149.8 189.1 C 154.4 185.5 159.9 183 165.4 181 C 172.5 178.4 180.5 178.7 187.5 175.8 C 193 173.5 197.7 169.9 202.5 166.6 C 211.1 160.8 218.9 154 227.1 147.8 C 235.7 141.3 244.2 134.8 252.9 128.5 C 259.5 123.7 266.2 118.9 273.1 114.4 C 276.3 112.3 279.5 110.3 282.8 108.5 C 287.9 105.8 293.2 103.5 298.6 101.3 C 312.7 95.7 327.4 91.7 341.6 86.5 C 395.8 66.8 488.2 29.9 502.9 24.4 C 514.3 20.1 525.3 14.6 537.2 12.2 C 539.7 11.6 542.3 11.1 544.8 11.7 C 548.4 12.4 551.4 14.4 554.2 16.6 C 557 18.8 558.7 21.9 561 24.5 C 562.3 25.8 563.2 27.2 564.6 28.1 C 566.6 29.4 568.8 30.1 571 30.5 C 573 30.9 575 30.7 577 30.2 C 583.8 28.7 589.7 24.7 596.2 22.3 C 600 20.9 603.8 19.3 607.8 18.6 C 610.9 18 614.2 17.4 617.3 18.1 C 620.5 18.9 623.8 20.4 626.1 22.8 C 642.4 40 660.1 60.9 676.8 80.3 C 681.4 85.6 686.2 90.8 690.4 96.4 C 692.1 98.6 694 100.7 695.1 103.3 C 696.5 106.5 697.6 110 697.3 113.4 C 697 116.2 695.6 118.8 694 121 C 692.6 122.9 690.7 124.5 688.6 125.7 C 686.5 126.9 684.1 127.6 681.7 127.9 C 679.6 128.2 677.4 128.2 675.4 127.6 C 672.9 127 670.6 125.6 668.6 124.1 C 665.6 121.8 663.5 118.7 661.1 115.8 C 652.6 105.9 642.8 91.5 637 85.1 C 635 83 631.6 82.2 628.6 81.7 C 625.9 81.3 623 81.5 620.2 82.2 C 615 83.5 610.5 86.8 605.5 88.9 C 598.5 91.9 591.5 94.6 584.5 97.3 C 576.6 100.4 568.7 103.7 560.7 106.5 C 551.9 109.5 543 112 534 114.4 C 517.5 118.9 500.6 122.2 484 126.8 C 479.1 128.2 474.1 129.2 469.4 131.2 C 465.9 132.8 462.4 134.7 459.4 137.2 C 456.9 139.2 454.4 141.6 452.8 144.5 C 450.8 148 450.1 152.2 449.4 156.2 C 448.7 159.8 448.8 163.6 448.8 167.3 C 448.7 171.6 448.6 176 449.1 180.3 C 449.8 185.6 450.8 190.9 452.5 196 C 454 200.3 455.8 204.5 458.5 208.2 C 460.2 210.6 462.6 212.6 464.9 214.5 C 467.5 216.6 470.3 218.3 473.1 220 C 476.3 222 479.6 224 483.1 225.4 C 496 230.6 510 232.5 523.4 236.4 C 541.3 241.5 559.2 246.9 576.9 252.7 C 583.1 254.7 589.6 256.1 595.4 259.1 C 598 260.5 600.5 262.3 602.5 264.4 C 604.6 266.7 606.4 269.3 607.3 272.2 C 608.3 275.2 608.5 278.5 608.2 281.7 C 607.9 285 606.6 288 605.7 291.2 C 604 296.5 601 301.4 600.1 307 C 599.6 310.2 599.6 313.7 600.4 316.9 C 601.1 320.3 602.6 323.7 604.6 326.6 C 605.6 327.9 606.9 328.8 608.1 329.7 C 616.5 335.8 625.7 340.7 635 344.9 C 647.6 350.5 661.5 355.6 672.5 364.5 C 675 366.6 677.4 369.3 678.8 372.3 C 680 374.9 680.8 377.9 680.5 380.8 C 680.3 384.5 678.6 388.1 676.7 391.2 C 669.6 403.1 663.2 412.9 654.8 423.3 C 652.4 426.3 649.3 428.8 646 430.7 C 643.1 432.3 639.9 433.4 636.6 434 C 631.9 434.8 627.2 434.5 622.5 433.9 C 613.5 432.8 604.7 430.2 596.1 427.3 C 588.1 424.7 580.2 421.6 572.9 417.5 C 563.2 412.1 554.3 405.3 545.6 398.3 C 537 391.3 528.5 383.8 521 375.5 C 511.2 364.7 503.1 352.4 494.6 340.4 C 487.8 330.8 482.2 320.2 475 310.9 C 469.5 303.7 464 296.3 456.9 290.6 C 450.6 285.5 442.9 282.3 435.6 278.6 C 427.9 274.8 420.2 271.2 412.1 268.4 C 398.9 263.8 385.4 260.1 371.7 257.7 C 366.3 256.8 360.7 255.8 355.2 256.4 C 349.8 256.9 344.5 258.9 339.4 261 C 330.8 264.4 323.1 269.8 314.9 274 C 303.5 279.9 292.4 286.5 280.5 291.3 C 274.6 293.7 268.4 295.3 262.3 296.9 C 256 298.6 249.6 300 243.3 301.4 C 222.6 305.9 189.7 314.1 181.2 314.1 C 179.5 314.1 176.8 312.3 175.9 310.3 C 175.2 309 175.9 307.3 176 305.9 C 176.2 302.8 177.5 299.6 176.7 296.7 C 176.2 295.1 175.3 293.6 174 292.7 C 172.9 292 171.6 291.7 170.3 291.8 C 168.1 291.9 166.1 293.1 164.3 294.5 C 152.2 303.4 142.4 311.6 131 319.6 C 131 319.6 131 319.6 131 319.6 Z',
    pitlane_path:
      'M 176 307.7 C 176 307.7 178 302.6 178.4 299.8 C 178.8 297.3 179 294.6 178.4 292.1 C 178 290.3 177.2 288.6 176 287.3 C 174.6 285.8 172.6 284.7 170.6 284.4 C 168 284.1 165.4 285.2 163 286.1 C 159.5 287.4 156.5 289.6 153.4 291.6 C 149.2 294.3 145.3 297.5 141.3 300.4 C 138.8 302.2 136.2 303.8 134 305.8 C 130.3 309 128.3 313.4 124.1 316.6 C 117.6 321.4 93.4 337.7 78 348.2 C 60.4 360.2 41.7 372.8 25 384.3 C 23.6 385.2 22.1 386.2 20.4 386.5 C 19.1 386.7 17.7 386.4 16.6 385.8 C 15.3 385.1 14.1 383.9 13.4 382.5 C 12.8 381 13 379.2 13.1 377.6 C 13.5 373.1 15 368.9 16.4 364.6 C 18 359.8 22 350.6 22 350.6',
    S1_path:
      'M 131 319.6 C 97.3 343.4 62.6 365.8 27.6 387.7 C 22.4 390.9 17.7 395.2 11.9 397 C 9.9 397.7 7.4 398.5 5.6 397.5 C 4.1 396.7 3.2 394.8 3 393.1 C 2.6 388.3 6.5 382.5 7.9 379.6 C 17.3 359.4 24.2 342 34.1 324.1 C 39 315.2 44.1 306.3 50.5 298.4 C 59.7 286.9 71.4 277.4 81.8 266.9 C 91.3 257.3 100.8 247.7 110.2 238.1 C 116.7 231.4 124.1 225.4 129.7 217.9 C 133.8 212.5 135.9 205.8 139.8 200.3 C 142.8 196.3 145.9 192.1 149.8 189.1 C 154.4 185.5 159.9 183 165.4 181 C 172.5 178.4 180.5 178.7 187.5 175.8 C 193 173.5 197.7 169.9 202.5 166.6 C 211.1 160.8 218.9 154 227.1 147.8 C 235.7 141.3 244.2 134.8 252.9 128.5 C 259.5 123.7 266.2 118.9 273.1 114.4 C 276.3 112.3 279.5 110.3 282.8 108.5 C 287.9 105.8 293.2 103.5 298.6 101.3 C 312.7 95.7 327.4 91.7 341.6 86.5 C 395.8 66.8 488.2 29.9 502.9 24.4',
    S2_path:
      'M 502.9 24.4 C 514.3 20.1 525.3 14.6 537.2 12.2 C 539.7 11.6 542.3 11.1 544.8 11.7 C 548.4 12.4 551.4 14.4 554.2 16.6 C 557 18.8 558.7 21.9 561 24.5 C 562.3 25.8 563.2 27.2 564.6 28.1 C 566.6 29.4 568.8 30.1 571 30.5 C 573 30.9 575 30.7 577 30.2 C 583.8 28.7 589.7 24.7 596.2 22.3 C 600 20.9 603.8 19.3 607.8 18.6 C 610.9 18 614.2 17.4 617.3 18.1 C 620.5 18.9 623.8 20.4 626.1 22.8 C 642.4 40 660.1 60.9 676.8 80.3 C 681.4 85.6 686.2 90.8 690.4 96.4 C 692.1 98.6 694 100.7 695.1 103.3 C 696.5 106.5 697.6 110 697.3 113.4 C 697 116.2 695.6 118.8 694 121 C 692.6 122.9 690.7 124.5 688.6 125.7 C 686.5 126.9 684.1 127.6 681.7 127.9 C 679.6 128.2 677.4 128.2 675.4 127.6 C 672.9 127 670.6 125.6 668.6 124.1 C 665.6 121.8 663.5 118.7 661.1 115.8 C 652.6 105.9 642.8 91.5 637 85.1 C 635 83 631.6 82.2 628.6 81.7 C 625.9 81.3 623 81.5 620.2 82.2 C 615 83.5 610.5 86.8 605.5 88.9 C 598.5 91.9 591.5 94.6 584.5 97.3 C 576.6 100.4 568.7 103.7 560.7 106.5 C 551.9 109.5 543 112 534 114.4 C 517.5 118.9 500.6 122.2 484 126.8 C 479.1 128.2 474.1 129.2 469.4 131.2 C 465.9 132.8 462.4 134.7 459.4 137.2 C 456.9 139.2 454.4 141.6 452.8 144.5 C 450.8 148 450.1 152.2 449.4 156.2 C 448.7 159.8 448.8 163.6 448.8 167.3 C 448.7 171.6 448.6 176 449.1 180.3 C 449.8 185.6 450.8 190.9 452.5 196 C 454 200.3 455.8 204.5 458.5 208.2 C 460.2 210.6 462.6 212.6 464.9 214.5 C 467.5 216.6 470.3 218.3 473.1 220 C 476.3 222 479.6 224 483.1 225.4 C 496 230.6 510 232.5 523.4 236.4 C 541.3 241.5 559.2 246.9 576.9 252.7 C 583.1 254.7 589.6 256.1 595.4 259.1 C 598 260.5 600.5 262.3 602.5 264.4 C 604.6 266.7 606.4 269.3 607.3 272.2 C 608.3 275.2 608.5 278.5 608.2 281.7 C 607.9 285 606.6 288 605.7 291.2 C 604 296.5 601 301.4 600.1 307 C 599.6 310.2 599.6 313.7 600.4 316.9 C 601.1 320.3 602.6 323.7 604.6 326.6 C 605.6 327.9 606.9 328.8 608.1 329.7 C 616.5 335.8 625.7 340.7 635 344.9 C 647.6 350.5 661.5 355.6 672.5 364.5 C 675 366.6 677.4 369.3 678.8 372.3 C 680 374.9 680.8 377.9 680.5 380.8 C 680.3 384.5 678.6 388.1 676.7 391.2 C 672.9 397.6 669.3 403.3 665.5 408.9',
    S3_path:
      'M 665.5 408.9 C 662.2 413.7 658.7 418.4 654.8 423.3 C 652.4 426.3 649.3 428.8 646 430.7 C 643.1 432.3 639.9 433.4 636.6 434 C 631.9 434.8 627.2 434.5 622.5 433.9 C 613.5 432.8 604.7 430.2 596.1 427.3 C 588.1 424.7 580.2 421.6 572.9 417.5 C 563.2 412.1 554.3 405.3 545.6 398.3 C 537 391.3 528.5 383.8 521 375.5 C 511.2 364.7 503.1 352.4 494.6 340.4 C 487.8 330.8 482.2 320.2 475 310.9 C 469.5 303.7 464 296.3 456.9 290.6 C 450.6 285.5 442.9 282.3 435.6 278.6 C 427.9 274.8 420.2 271.2 412.1 268.4 C 398.9 263.8 385.4 260.1 371.7 257.7 C 366.3 256.8 360.7 255.8 355.2 256.4 C 349.8 256.9 344.5 258.9 339.4 261 C 330.8 264.4 323.1 269.8 314.9 274 C 303.5 279.9 292.4 286.5 280.5 291.3 C 274.6 293.7 268.4 295.3 262.3 296.9 C 256 298.6 249.6 300 243.3 301.4 C 222.6 305.9 189.7 314.1 181.2 314.1 C 179.5 314.1 176.8 312.3 175.9 310.3 C 175.2 309 175.9 307.3 176 305.9 C 176.2 302.8 177.5 299.6 176.7 296.7 C 176.2 295.1 175.3 293.6 174 292.7 C 172.9 292 171.6 291.7 170.3 291.8 C 168.1 291.9 166.1 293.1 164.3 294.5 C 152.2 303.4 142.4 311.6 131 319.6',
  },
  information: {
    location: '',
    lat_lon: { lat: 0, lon: 0 },
    text: '',
  },
  pitlane: {
    start: 6785,
    end: 500,
    length: 654,
    pitspeed: 60,
    pitlaneFL: 300,
    pitspeed_start: 10,
    pitspeed_end: 80,
    pitboxes: [
      {
        num: 0,
        point: 250,
        entry_number: 7,
        garage_distance: 5,
      },
      {
        num: 1,
        point: 255,
        entry_number: 7,
        garage_distance: 5,
      },
      {
        num: 2,
        point: 260,
        entry_number: 7,
        garage_distance: 5,
      },
      {
        num: 3,
        point: 265,
        entry_number: 7,
        garage_distance: 5,
      },
      {
        num: 4,
        point: 270,
        entry_number: 7,
        garage_distance: 5,
      },
      {
        num: 5,
        point: 275,
        entry_number: 7,
        garage_distance: 5,
      },
      {
        num: 6,
        point: 280,
        entry_number: 7,
        garage_distance: 5,
      },
      {
        num: 7,
        point: 285,
        entry_number: 7,
        garage_distance: 5,
      },
      {
        num: 8,
        point: 290,
        entry_number: 7,
        garage_distance: 5,
      },
      {
        num: 9,
        point: 295,
        entry_number: 7,
        garage_distance: 5,
      },
      {
        num: 10,
        point: 300,
        entry_number: 7,
        garage_distance: 5,
      },
      {
        num: 11,
        point: 305,
        entry_number: 7,
        garage_distance: 5,
      },
      {
        num: 12,
        point: 310,
        entry_number: 7,
        garage_distance: 5,
      },
      {
        num: 13,
        point: 315,
        entry_number: 7,
        garage_distance: 5,
      },
      {
        num: 14,
        point: 320,
        entry_number: 7,
        garage_distance: 5,
      },
      {
        num: 15,
        point: 325,
        entry_number: 7,
        garage_distance: 5,
      },
      {
        num: 16,
        point: 330,
        entry_number: 7,
        garage_distance: 5,
      },
      {
        num: 17,
        point: 335,
        entry_number: 7,
        garage_distance: 5,
      },
      {
        num: 18,
        point: 340,
        entry_number: 7,
        garage_distance: 5,
      },
      {
        num: 19,
        point: 345,
        entry_number: 7,
        garage_distance: 5,
      },
      {
        num: 0,
        point: 350,
        entry_number: 7,
        garage_distance: 5,
      },
      {
        num: 0,
        point: 355,
        entry_number: 7,
        garage_distance: 5,
      },
      {
        num: 0,
        point: 360,
        entry_number: 7,
        garage_distance: 5,
      },
      {
        num: 0,
        point: 365,
        entry_number: 7,
        garage_distance: 5,
      },
      {
        num: 0,
        point: 370,
        entry_number: 7,
        garage_distance: 5,
      },
      {
        num: 0,
        point: 375,
        entry_number: 7,
        garage_distance: 5,
      },
      {
        num: 0,
        point: 380,
        entry_number: 7,
        garage_distance: 5,
      },
      {
        num: 0,
        point: 385,
        entry_number: 7,
        garage_distance: 5,
      },
      {
        num: 0,
        point: 390,
        entry_number: 7,
        garage_distance: 5,
      },
      {
        num: 0,
        point: 395,
        entry_number: 7,
        garage_distance: 5,
      },
      {
        num: 0,
        point: 400,
        entry_number: 7,
        garage_distance: 5,
      },
      {
        num: 0,
        point: 405,
        entry_number: 7,
        garage_distance: 5,
      },
      {
        num: 0,
        point: 410,
        entry_number: 7,
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
