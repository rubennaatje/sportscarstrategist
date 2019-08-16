var blessed = require('blessed')
  , contrib = require('blessed-contrib')

const io = require('socket.io-client')
const socket = io('http://localhost:3000');
const { red, white, blue, bold } = require('kleur');

var screen = blessed.screen()
var cardata = {car2:'', laps:  0, lapdistance:  0,percentage : 0, speed:0}
//create layout and widgets
var grid = new contrib.grid({rows: 12, cols: 12, screen: screen})

var table =  grid.set(0, 9, 8, 3, contrib.canvas, 
  {  fg: 'white'
  , label: 'Informations' })

  var log = grid.set(6, 0, 6, 6, contrib.log, 
    { fg: "white"
    , selectedFg: "blue"
    , label: 'Server Log'})

    table.setLabel({text:'trackmap', side:'right'})
    log.log(JSON.stringify(table.width) + " test");



    

screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

//fake shit
//dummy data
var servers = ['US1', 'US2', 'EU1', 'AU1', 'AS1', 'JP1']
var commands = ['grep', 'node', 'java', 'timer', '~/ls -l', 'netns', 'watchdog', 'gulp', 'tar -xvf', 'awk', 'npm install']


var donut = grid.set(8, 8, 4, 2, contrib.donut, 
  {
  label: 'Percent Donut',
  radius: 16,
  arcWidth: 4,
  yPadding: 2,
  data: [{label: 'Storage', percent: 87}]
})


var gauge = grid.set(8, 10, 2, 2, contrib.gauge, {label: 'Storage', percent: [80,20]})
var gauge_two = grid.set(2, 9, 2, 3, contrib.gauge, {label: 'Deployment Progress', percent: 80})

var gauge_percent = 0
setInterval(function() {
  gauge.setData([gauge_percent, 100-gauge_percent]);
  gauge_percent++;
  if (gauge_percent>=100) gauge_percent = 0  
}, 200)

var gauge_percent_two = 0
setInterval(function() {
  gauge_two.setData(gauge_percent_two);
  gauge_percent_two++;
  if (gauge_percent_two>=100) gauge_percent_two = 0  
}, 200)

var sparkline = grid.set(10, 10, 2, 2, contrib.sparkline, 
  { label: 'Throughput (bits/sec)'
  , tags: true
  , style: { fg: 'blue', titleFg: 'white' }})

var bar = grid.set(4, 6, 4.1, 3, contrib.bar, 
  { label: 'Server Utilization (%)'
  , barWidth: 4
  , barSpacing: 6
  , xOffset: 2
  , maxHeight: 9})

  var transactionsLine = grid.set(0, 0, 6, 6, contrib.line, 
    { showNthLabel: 5
    , maxY: 100
    , label: 'Total Transactions'
    , showLegend: true
    , legend: {width: 10}})

  var errorsLine = grid.set(0, 6, 4, 3, contrib.line, 
    { style: 
      { line: "red"
      , text: "white"
      , baseline: "black"}
    , label: 'Errors Rate'
    , maxY: 400
    , showLegend: true })


function fillBar() {
  var arr = []
  for (var i=0; i<servers.length; i++) {
    arr.push(Math.round(Math.random()*10))
  }
  bar.setData({titles: servers, data: arr})
}
fillBar()
setInterval(fillBar, 2000)
    
var spark1 = [1,2,5,2,1,5,1,2,5,2,1,5,4,4,5,4,1,5,1,2,5,2,1,5,1,2,5,2,1,5,1,2,5,2,1,5]
var spark2 = [4,4,5,4,1,5,1,2,5,2,1,5,4,4,5,4,1,5,1,2,5,2,1,5,1,2,5,2,1,5,1,2,5,2,1,5]

refreshSpark()
setInterval(refreshSpark, 1000)

function refreshSpark() {
  spark1.shift()
  spark1.push(Math.random()*5+1)       
  spark2.shift()
  spark2.push(Math.random()*5+1)       
  sparkline.setData(['Server1', 'Server2'], [spark1, spark2])  
}

var transactionsData = {
  title: 'USA',
  style: {line: 'red'},
  x: ['00:00', '00:05', '00:10', '00:15', '00:20', '00:30', '00:40', '00:50', '01:00', '01:10', '01:20', '01:30', '01:40', '01:50', '02:00', '02:10', '02:20', '02:30', '02:40', '02:50', '03:00', '03:10', '03:20', '03:30', '03:40', '03:50', '04:00', '04:10', '04:20', '04:30'],
  y: [0, 20, 40, 45, 45, 50, 55, 70, 65, 58, 50, 55, 60, 65, 70, 80, 70, 50, 40, 50, 60, 70, 82, 88, 89, 89, 89, 80, 72, 70]
}

var transactionsData1 = {
  title: 'Europe',
  style: {line: 'yellow'},
  x: ['00:00', '00:05', '00:10', '00:15', '00:20', '00:30', '00:40', '00:50', '01:00', '01:10', '01:20', '01:30', '01:40', '01:50', '02:00', '02:10', '02:20', '02:30', '02:40', '02:50', '03:00', '03:10', '03:20', '03:30', '03:40', '03:50', '04:00', '04:10', '04:20', '04:30'],
  y: [0, 5, 5, 10, 10, 15, 20, 30, 25, 30, 30, 20, 20, 30, 30, 20, 15, 15, 19, 25, 30, 25, 25, 20, 25, 30, 35, 35, 30, 30]
}

var errorsData = {
  title: 'Speed car 14',
  x: ['0%','0%','0%','0%','0%','0%','0%','0%','0%','0%','0%','0%'],
  y: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1]
}

var latencyData = {
  x: ['t1', 't2', 't3', 't4'],
  y: [5, 1, 7, 5]
}

// setLineData([transactionsData, transactionsData1], transactionsLine)
setLineData([errorsData], errorsLine)
// setLineData([latencyData], latencyLine)

setInterval(function() {
  setLineData([transactionsData, transactionsData1], transactionsLine)
  screen.render()
}, 500)

setInterval(function() {   
   setLineData([errorsData], errorsLine)
}, 1500)



var pct = 0.00;

function updateDonut(){
 if (pct > 0.99) pct = 0.00;
 var color = "green";
 if (pct >= 0.25) color = "cyan";
 if (pct >= 0.5) color = "yellow";
 if (pct >= 0.75) color = "red";  
 donut.setData([
   {percent: parseFloat((pct+0.00) % 1).toFixed(2), label: 'storage', 'color': color}
 ]);
 pct += 0.01;
}

setInterval(function() {   
  updateDonut();
  screen.render()
}, 500)

function setLineData(mockData, line) {
 for (var i=0; i<mockData.length; i++) {
   var last = mockData[i].y[mockData[i].y.length-1]
   mockData[i].y.shift()
   var num = Math.max(last + Math.round(Math.random()*10) - 5, 10)    
   mockData[i].y.push(num)  
 }
 
 line.setData(mockData)
}


//update shizzle

socket.on('connect', () => {
  log.log(socket.id); // 'G5p5...'
});
socket.on('event', (data) => {
  // console.log(data.percentage);
  log.log('update' + data.percentage);
  log.log('update' + data.speed);
  cardata = data;
  errorsData.x.slice(0,1)
  errorsData.y.slice(0,1)
  errorsData.x.push(Math.floor(data.percentage) + '%');
  errorsData.y.push(data.speed);
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