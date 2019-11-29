import { Car } from "./models/car";
import { Driver } from "./models/driver";
import { CARS } from './tempCars';
import { Game } from "./game";

var app = require('express')();
var http = require('http').Server(app);
var io : SocketIO.Server = require('socket.io')(http) ;
const { red, white, blue, bold } = require('kleur');

//ignore
var entries = CARS;
//xd
var cars: [Car] = [null];

for(var entry in entries){
  var val = entries[entry];
  var jcar: Car = new Car(val.number);
  jcar.drivers.push(new Driver(val.driver, "DE"),new Driver("Selina Kerbusch", "BE"),new Driver("Ruben Soerdien", "NL"));
  jcar.category = val.category;
  var r1,r2,r3,r4,r5;
  r1 = (Math.random() * 10) - 5;
  r2 = (Math.random() * 10) - 5;
  r3 = (Math.random() * 10) - 5;
  r4 = (Math.random() * 10) - 5;
  r5 = (Math.random() * 10) - 5;

  switch(jcar.category){
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

  cars.push(jcar);
}

var game: Game = new Game(io, cars);

http.listen(4001, function () {
  console.log('listening on *:3000');
});


