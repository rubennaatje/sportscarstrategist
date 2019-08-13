import { Car } from "./models/car";
import { Driver } from "./models/driver";

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http) ;
const { red, white, blue, bold } = require('kleur');

var data = [
  ['1', '8', bold().green('RUN'), bold().yellow().bgRed(' LMP1 '),'Toyota Gazoo Racing','NAKAJIMA K.','Toyota TS050 - Hybrid','54','',''],
  ['2', '7', bold().green('RUN'), bold().yellow().bgRed(' LMP1 '),'Toyota Gazoo Racing','LOPEZ J.','Toyota TS050 - Hybrid','54','0.160','0.160'],
  ['3', '3', bold().green('RUN'), bold().yellow().bgRed(' LMP1 '),'Rebellion Racing','LAURENT T.','Rebellion R13 - Gibson','54','1.806','1.646'],
  ['4', '11', bold().green('RUN'), bold().yellow().bgRed(' LMP1 '),'SMP Racing','ALESHIN M.','BR Engineering BR1 - AER','54','2.638','0.832'],
  ['5', '1', bold().red('PIT'), bold().yellow().bgRed('LMP1'),'Rebellion Racing','SENNA B.','Rebellion R13 - Gibson','54','2.638','0.527'],
  ['6', '17', bold().green('RUN'), bold().yellow().bgRed('LMP1'),'SMP Racing','ORUDZHEV E.','BR Engineering BR1 - AER','53','2.638','0.938'],
  ['7', '10', bold().green('RUN'), bold().yellow().bgRed('LMP1'),'DragonSpeed','HEDMAN H.','BR Engineering BR1 - Gibson','53','2.638','0.682'],
  ['8', '4', bold().red('PIT'), bold().yellow().bgRed('LMP1'),'Bykolles Racing Team','RUBERTI P.','Enso CLM P1/01 - Nismo','53','gap','int'],
  ['9', '31', bold().green('RUN'), bold().yellow().bgBlue('LMP2'),'DragonSpeed','DAVIDSON A.','Oreca 07 - Gibson','52','gap','int'],
  ['10', '28', bold().green('RUN'), bold().yellow().bgBlue('LMP2'),'TDS Racing','PERRODO F.','Oreca 07 - Gibson','52','gap','int'],
  ['11', '26', bold().green('RUN'), bold().yellow().bgBlue('LMP2'),'G-Drive Racing','VERGNE J.','Aurus 01 - Gibson','52','gap','int'],
  ['12', '38', bold().green('RUN'), bold().yellow().bgBlue('LMP2'),'Jackie Chan DC Racing','AUBRY G.','Oreca 07 - Gibson','51','gap','int'],
  ['13', '32', bold().green('RUN'), bold().yellow().bgBlue('LMP2'),'United Autosports','BRUNDLE A.','Ligier JSP217 - Gibson','51','gap','int'],
  ['15', '29', bold().yellow('OUT'), bold().yellow().bgBlue('LMP2'),'Signatech Alpine Matmut','NEGRÃO A.','Alpine A470 - Gibson','51','gap','int'],
  ['14', '36', bold().gray('RET'), bold().yellow().bgBlue('LMP2'),'Racing Team Nederland','VAN EERD F.','Dallara P217 Gibson','50','gap','int'],
  ['16', '22', bold().green('RUN'), bold().yellow().bgBlue('LMP2'),'United Autosports','DI RESTA P.','Ligier JSP217 - Gibson','50','gap','int'],
  ['17', '39', bold().green('RUN'), bold().yellow().bgBlue('LMP2'),'Graff','CAPILLAIRE V.','Oreca 07 - Gibson','50','gap','int'],
  ['18', '43', bold().green('RUN'), bold().yellow().bgBlue('LMP2'),'RLR M Sport/Tower Events','NATO N.','Oreca 07 - Gibson','50','gap','int'],
  ['19', '48', bold().gray('RET'), bold().yellow().bgGreen('GTE PRO'),'IDEC Sport','CHATIN P.','Oreca 07 - Gibson','49','gap','int'],
  ['20', '29', bold().yellow('OUT'), bold().yellow().bgBlue('LMP2'),'Signatech Alpine Matmut','NEGRÃO A.','Alpine A470 - Gibson','51','gap','int'],
  ['21', '36', bold().gray('RET'), bold().yellow().bgBlue('LMP2'),'Racing Team Nederland','VAN EERD F.','Dallara P217 Gibson','50','gap','int'],
  ['22', '22', bold().green('RUN'), bold().yellow().bgBlue('LMP2'),'United Autosports','DI RESTA P.','Ligier JSP217 - Gibson','50','gap','int'],
  ['23', '39', bold().green('RUN'), bold().yellow().bgBlue('LMP2'),'Graff','CAPILLAIRE V.','Oreca 07 - Gibson','50','gap','int'],
  ['24', '43', bold().green('RUN'), bold().yellow().bgBlue('LMP2'),'RLR M Sport/Tower Events','NATO N.','Oreca 07 - Gibson','50','gap','int'],
  ['25', '48', bold().gray('RET'), bold().yellow().bgGreen('GTE PRO'),'IDEC Sport','CHATIN P.','Oreca 07 - Gibson','49','gap','int'],
  ['26', '29', bold().yellow('OUT'), bold().yellow().bgBlue('LMP2'),'Signatech Alpine Matmut','NEGRÃO A.','Alpine A470 - Gibson','51','gap','int'],
  ['27', '36', bold().gray('RET'), bold().yellow().bgBlue('LMP2'),'Racing Team Nederland','VAN EERD F.','Dallara P217 Gibson','50','gap','int'],
  ['28', '22', bold().green('RUN'), bold().yellow().bgBlue('LMP2'),'United Autosports','DI RESTA P.','Ligier JSP217 - Gibson','50','gap','int'],
  ['29', '39', bold().green('RUN'), bold().yellow().bgBlue('LMP2'),'Graff','CAPILLAIRE V.','Oreca 07 - Gibson','50','gap','int'],
  ['30', '43', bold().green('RUN'), bold().yellow().bgBlue('LMP2'),'RLR M Sport/Tower Events','NATO N.','Oreca 07 - Gibson','50','gap','int'],
  ['31', '48', bold().gray('RET'), bold().yellow().bgGreen('GTE PRO'),'IDEC Sport','CHATIN P.','Oreca 07 - Gibson','49','gap','int'],
  ['32', '29', bold().yellow('OUT'), bold().yellow().bgBlue('LMP2'),'Signatech Alpine Matmut','NEGRÃO A.','Alpine A470 - Gibson','51','gap','int'],
  ['33', '36', bold().gray('RET'), bold().yellow().bgBlue('LMP2'),'Racing Team Nederland','VAN EERD F.','Dallara P217 Gibson','50','gap','int'],
  ['34', '22', bold().green('RUN'), bold().yellow().bgBlue('LMP2'),'United Autosports','DI RESTA P.','Ligier JSP217 - Gibson','50','gap','int'],
  ['35', '39', bold().green('RUN'), bold().yellow().bgBlue('LMP2'),'Graff','CAPILLAIRE V.','Oreca 07 - Gibson','50','gap','int'],
  ['36', '43', bold().green('RUN'), bold().yellow().bgBlue('LMP2'),'RLR M Sport/Tower Events','NATO N.','Oreca 07 - Gibson','50','gap','int'],
  ['37', '48', bold().gray('RET'), bold().yellow().bgGreen('GTE PRO'),'IDEC Sport','CHATIN P.','Oreca 07 - Gibson','49','gap','int'],
  ['38', '29', bold().yellow('OUT'), bold().yellow().bgGreen('GTE PRO'),'Signatech Alpine Matmut','NEGRÃO A.','Alpine A470 - Gibson','51','gap','int'],
  ['39', '36', bold().gray('RET'), bold().yellow().bgGreen('GTE PRO'),'Racing Team Nederland','VAN EERD F.','Dallara P217 Gibson','50','gap','int'],
  ['40', '22', bold().green('RUN'), bold().yellow().bgGreen('GTE PRO'),'United Autosports','DI RESTA P.','Ligier JSP217 - Gibson','50','gap','int'],
  ['41', '39', bold().green('RUN'),bold().yellow().bgGreen('GTE PRO'),'Graff','CAPILLAIRE V.','Oreca 07 - Gibson','50','gap','int'],
  ['42', '43', bold().green('RUN'), bold().yellow().bgGreen('GTE PRO'),'RLR M Sport/Tower Events','NATO N.','Oreca 07 - Gibson','50','gap','int'],
  ['43', '48', bold().gray('RET'), bold().yellow().bgGreen('GTE PRO'),'IDEC Sport','CHATIN P.','Oreca 07 - Gibson','49','gap','int'],
  ['44', '8', bold().green('RUN'), bold().yellow().bgGreen('GTE PRO'),'Toyota Gazoo Racing','NAKAJIMA K.','Toyota TS050 - Hybrid','54','',''],
  ['45', '7', bold().green('RUN'), bold().yellow().bgGreen('GTE PRO'),'Toyota Gazoo Racing','LOPEZ J.','Toyota TS050 - Hybrid','54','0.160','0.160'],
  ['46', '3', bold().green('RUN'), bold().yellow().bgGreen('GTE PRO'),'Rebellion Racing','LAURENT T.','Rebellion R13 - Gibson','54','1.806','1.646'],
  ['47', '11', bold().green('RUN'), bold().yellow().bgGreen('GTE PRO'),'SMP Racing','ALESHIN M.','BR Engineering BR1 - AER','54','2.638','0.832'],
  ['48', '1', bold().red('PIT'), bold().yellow().bgGreen('GTE PRO'),'Rebellion Racing','SENNA B.','Rebellion R13 - Gibson','54','2.638','0.527'],
  ['49', '17', bold().green('RUN'), bold().yellow().bgGreen('GTE PRO'),'SMP Racing','ORUDZHEV E.','BR Engineering BR1 - AER','53','2.638','0.938'],
  ['50', '10', bold().green('RUN'), bold().white().bgGreen('GTE PRO'),'DragonSpeed','HEDMAN H.','BR Engineering BR1 - Gibson','53','2.638','0.682'],
  ['51', '4', bold().red('PIT'), bold().yellow().bgGreen('GTE PRO'),'Bykolles Racing Team','RUBERTI P.','Enso CLM P1/01 - Nismo','53','gap','int'],
  ['52', '31', bold().green('RUN'), bold().white().bgYellow('GTE AM'),'DragonSpeed','DAVIDSON A.','Oreca 07 - Gibson','52','gap','int'],
  ['53', '28', bold().green('RUN'), bold().yellow().bgYellow('GTE AM'),'TDS Racing','PERRODO F.','Oreca 07 - Gibson','52','gap','int'],
  ['54', '26', bold().green('RUN'), bold().yellow().bgYellow('GTE AM'),'G-Drive Racing','VERGNE J.','Aurus 01 - Gibson','52','gap','int'],
  ['55', '38', bold().green('RUN'), bold().yellow().bgYellow('GTE AM'),'Jackie Chan DC Racing','AUBRY G.','Oreca 07 - Gibson','51','gap','int'],
  ['56', '32', bold().green('RUN'), bold().yellow().bgYellow('GTE AM'),'United Autosports','BRUNDLE A.','Ligier JSP217 - Gibson','51','gap','int'],
  ['57', '29', bold().yellow('OUT'), bold().yellow().bgYellow('GTE AM'),'Signatech Alpine Matmut','NEGRÃO A.','Alpine A470 - Gibson','51','gap','int'],
  ['58', '36', bold().gray('RET'), bold().yellow().bgYellow('GTE AM'),'Racing Team Nederland','VAN EERD F.','Dallara P217 Gibson','50','gap','int'],
  ['59', '22', bold().green('RUN'), bold().yellow().bgYellow('GTE AM'),'United Autosports','DI RESTA P.','Ligier JSP217 - Gibson','50','gap','int'],
  ['60', '39', bold().green('RUN'), bold().yellow().bgYellow('GTE AM'),'Graff','CAPILLAIRE V.','Oreca 07 - Gibson','50','gap','int'],

];


let car: Car = new Car();

car.drivers.push(new Driver("Timo Glock", "DE"),new Driver("Selina Kerbusch", "BE"),new Driver("Ruben Soerdien", "NL"));

car.chassis =  { 
  name: "Oreca 07",
  weight: 900,
  downforce: 5,
  brakes: 10,
  engine: {power: 900, name: "Gibson v6", topspeed: 340, acceleration: 40},
};

setInterval(function(){car.Throttle(100)},100)



io.on('connection', function (socket){
   console.log('connection');

  socket.on('CH01', function (from, msg) {
    console.log('MSG', from, ' saying ', msg);
  });
  var arraypos = 59;
  setInterval(function() {
    var d = Math.random();
    if (d < 0.2){
      arraymove(data,arraypos, arraypos-1);
     arraypos = arraypos-1;
     if (arraypos === 1){
       arraypos = 59;
     }
    }

    socket.emit('event', data);
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


