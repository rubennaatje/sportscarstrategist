import { Car } from "./models/car";
import { Driver } from "./models/driver";

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http) ;
const { red, white, blue, bold } = require('kleur');



let car: Car = new Car();

car.drivers.push(new Driver("Timo Glock", "DE"),new Driver("Selina Kerbusch", "BE"),new Driver("Ruben Soerdien", "NL"));

car.chassis =  { 
  name: "Oreca 07",
  weight: 900,
  downforce: 5,
  drag:0,
  brakes: 10,
  engine: {power: 900, name: "Gibson v6", topspeed: 340, acceleration: 100},
};


setInterval(function(){
  // console.clear();
  car.Throttle(100);
  console.log(car.GetLaps(13626), car.GetDistanceOnLap(13626), car.GetPercentage(13626)+'%');
},200)



io.on('connection', function (socket){
   console.log('connection');

  socket.on('CH01', function (from, msg) {
    console.log('MSG', from, ' saying ', msg);
  });
  var arraypos = 59;
  setInterval(function() {
    console.log(car.carPhysics.getVelocity('km/h') + "!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    socket.emit('event', {car2:car.chassis.name, laps: car.GetLaps(13626), lapdistance: car.GetDistanceOnLap(13626),percentage :car.GetPercentage(13626), speed: car.carPhysics.getVelocity('km/h')});
  }, 500)

});

function arraymove(arr, fromIndex, toIndex) {
  var element = arr[fromIndex];
  arr.splice(fromIndex, 1);
  arr.splice(toIndex, 0, element);
}

http.listen(3000, function () {
  console.log('listening on *:3000');
});


