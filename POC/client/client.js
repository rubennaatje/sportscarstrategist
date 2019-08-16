var blessed = require('blessed')
  , contrib = require('blessed-contrib')

const io = require('socket.io-client')
const socket = io('http://localhost:3000');

var screen = blessed.screen()
var cardata = {car2:'', laps:  0, lapdistance:  0,percentage : 0}
//create layout and widgets
var grid = new contrib.grid({rows: 2, cols: 4, screen: screen})

var table =  grid.set(0, 1, 2, 3, contrib.canvas, 
  {  fg: 'green'
  , label: 'Informations' })

  var log = grid.set(0, 0, 1, 1, contrib.log, 
    { fg: "green"
    , selectedFg: "green"
    , label: 'Server Log'})

    table.setLabel({text:'trackmap', side:'right'})
    log.log(JSON.stringify(table.width) + " test");



    

screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

screen.key(['tab'], function(ch, key) {

});

socket.on('connect', () => {
  log.log(socket.id); // 'G5p5...'
});
socket.on('event', (data) => {
  // console.log(data.percentage);
  log.log('update' + data.percentage);
  cardata = data;
});

update = function(){
  screen.render();
  // table.ctx.clear(table.width,table.height);
  table.ctx.loadFromSVG();
  table.ctx.drawCar({carpercentage:cardata.percentage, number: 14, color:'red'}); 
}
// tree.focus()
update();
    
setInterval(update, 100);