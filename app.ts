import { Car } from "./models/car";
import { Driver } from "./models/driver";
import { CARS } from './tempCars';
import { Game } from "./game";
import { Entry } from "./models/entry";
import { CarCollection } from "./models/carcollection";
import { Session } from "./models/session";
import { SessionType } from "./models/enumerations/sessiontype";

var app = require('express')();
var http = require('http').Server(app);
var io : SocketIO.Server = require('socket.io')(http) ;

//ignore
var entries = CARS;
//xd
var cars: [Entry] = [null];

for(var entry in entries){
  var val = entries[entry];
  var jcar: Car = new Car();
  var jentry: Entry = new Entry(val.number, jcar);
  jentry.drivers.push(new Driver(val.driver, "DE"),new Driver("Selina Kerbusch", "BE"),new Driver("Ruben Soerdien", "NL"));
  jentry.category = val.category;
  var r1: number, r2: number, r3: number, r4: number, r5: number;
  r1 = (Math.random() * 10) - 5;
  r2 = (Math.random() * 10) - 5;
  r3 = (Math.random() * 10) - 5;
  r4 = (Math.random() * 10) - 5;
  r5 = (Math.random() * 10) - 5;

  switch(jentry.category){
    case 'LMP1': 
      r3 = r3 * 1.4;
      r4 = r4 * 1.4;
      r5 = r5 * 1.4;
      break;
    case 'LMP2': 
      r3 = r3 * 1.2;
      r4 = r4 * 1.2;
      r5 = r5 * 1.2;
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
    engine: {power: 900 + r4, name: "Gibson v6", topspeed: 300 + r5, acceleration: 100 + r3},
  }

  cars.push(jentry);
}
var carcollection: CarCollection = new CarCollection(cars);
var game: Game = new Game(io);
var freepractice: Session = new Session(carcollection, "FP1", 100, 0,new Date("10-10-2019"), SessionType.LapTimeBased);
game.AddSession(freepractice);


http.listen(4001, function () {
  console.log('listening on *:3000');
});


