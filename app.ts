import { Car } from "./models/car";
import { Driver } from "./models/driver";
import { CARS } from './tempCars';

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http) ;
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


let car1: Car = new Car(32);

car1.drivers.push(new Driver("Timo Glock", "DE"),new Driver("Selina Kerbusch", "BE"),new Driver("Ruben Soerdien", "NL"));

car1.chassis =  { 
  name: "Oreca 07",
  weight: 900,
  downforce: 5,
  drag: 70,
  brakes: 10,
  engine: {power: 900, name: "Gibson v6", topspeed: 330, acceleration: 100},
};

let car3: Car = new Car(14);

car3.drivers.push(new Driver("Timo Glock", "DE"),new Driver("Selina Kerbusch", "BE"),new Driver("Ruben Soerdien", "NL"));

car3.chassis =  { 
  name: "Oreca 07",
  weight: 900,
  downforce: 5,
  drag:80,
  brakes: 10,
  engine: {power: 800, name: "Gibson v6", topspeed: 350, acceleration: 90},
};

function getData(){
  
}
var dataSend = [];
var count = 0;
var lastCheck: Date =  new Date();
setInterval(function(){
  // console.clear();
  car1.Throttle(100);
  car3.Throttle(100);
  dataSend = [];
  for(var cara in cars) {
    var car = cars[cara];
    if(car != null){
      car.Throttle(100);
      dataSend.push({car2:car.chassis.name, category: car.category, laps: car.GetLaps(13626), lapdistance: car.GetDistanceOnLap(13626),percentage :car.GetPercentage(13626), speed: car.carPhysics.getVelocity('km/h'),car:car,carnumber: car.entryNumber});
    }
  }

  
  
}, 10)


io.emit('event', dataSend);
io.on('connection', function (socket){
   console.log('connection');
   
  let interval = setInterval(function() {
    lastCheck = new Date();
    socket.emit('newMessage', dataSend);
  }, 500)
  socket.emit('carsEvent', dataSend);
  socket.emit('newMessage', dataSend);
  //socket.emit('NewMessage', dataSend);
  socket.on('disconnect', function () {
    clearInterval(interval);
  });
});

function arraymove(arr, fromIndex, toIndex) {
  var element = arr[fromIndex];
  arr.splice(fromIndex, 1);
  arr.splice(toIndex, 0, element);
}

http.listen(4001, function () {
  console.log('listening on *:3000');
});


