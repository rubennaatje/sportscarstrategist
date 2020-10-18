import { Car } from './models/car';
import { Driver } from './models/driver';
import { CARS } from './tempCars';
import { Game } from './game';
import { Entry } from './models/entry';
import { CarCollection } from './models/carcollection';
import { Session } from './models/session';
import { SessionType } from './models/enumerations/sessiontype';
import { Track } from './models/track';
import { TrackMediator } from './models/trackmediator';
import { track as trackk } from './track';

var app = require('express')();
var http = require('http').Server(app);
var io: SocketIO.Server = require('socket.io')(http);
let track = new Track(7001);
track.corners = trackk.corners;
track.graphics = trackk.graphics;
track.information = trackk.information;
//ignore
var entries = CARS;
//xd
var cars: Entry[] = [];

for (var entry = 0; entry < CARS.length - 1; entry++) {
  var val = entries[entry];
  var jcar: Car = new Car();
  var jentry: Entry = new Entry(val.number, jcar);
  jentry.drivers.push(
    new Driver(val.driver, 'DE'),
    new Driver('Selina Kerbusch', 'BE'),
    new Driver('Ruben Soerdien', 'NL')
  );
  jentry.category = val.category;
  var r1: number, r2: number, r3: number, r4: number, r5: number;
  r1 = Math.random() * 10 + 1;
  r2 = Math.random() * 10 + 1;
  r3 = Math.random() * 30 + 1;
  r4 = Math.random() * 10 + 1;
  r5 = Math.random() * 30 + 1;

  switch (jentry.category) {
    case 'LMP1':
      r3 = r3 * 2;
      r4 = r4 * 2;
      r5 = r5 * 2;
      break;
    case 'LMP2':
      r3 = r3 * 1.5;
      r4 = r4 * 1.5;
      r5 = r5 * 1.5;
      break;
    case 'LMGTEAm':
      r3 = r3 * 0.8;
      r4 = r4 * 0.8;
      r5 = r5 * 0.8;
      break;
  }

  jcar.chassis = {
    name: val.car,
    weight: 900 + r1,
    downforce: 5,
    drag: 30 + r2,
    brakes: 10 + r3,
    engine: {
      power: 900 + r4,
      name: 'Gibson v6',
      topspeed: 280 + r5,
      acceleration: 70 + r3,
    },
  };

  cars.push(jentry);
}

let carcollection: CarCollection = new CarCollection(cars);
let trackmediator: TrackMediator = new TrackMediator(track, carcollection);
let game: Game = new Game(io, carcollection, trackmediator);
let freepractice: Session = new Session(
  carcollection,
  'FP1',
  100,
  0,
  new Date('10-10-2019'),
  SessionType.LapTimeBased
);
game.AddSession(freepractice);

http.listen(4001, function () {
  console.log('listening on *:3000');
});
