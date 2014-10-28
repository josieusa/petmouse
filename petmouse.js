var mirror = true;
var http = require('http');
var b = require('bonescript');
var SERVO = ['P9_22', 'P9_14'];
var INPUT = ['P9_33', 'P9_35'];
var duty_min = 0.03;
var position = [0.55, 0.55];
b.pinMode(SERVO[0], b.OUTPUT);
b.pinMode(SERVO[1], b.OUTPUT);
var lastValues = [[0,0,0], [0,0,0]];
var currentIndex = [0, 0];
var currentServo = 0;
var count = [0, 0];
var move = [0, 0];
var correction1 = [0.85, 1.3];
var correction2 = [0.2, 0.2];
var scale = [0.20, 0.10];
var tolerance = [0.0005, 0.002];
var updateValue = [defineUpdateValue(0), defineUpdateValue(1)];
http.createServer(function (req, res) {
  void(req);
  res.writeHead(200, {'Content-Type': 'text/plain'} );
  var x = mirror ? 1 - position[0] :  position[0];
  res.write(x + "," + position[1]);
  res.end();
  return;
}).listen(8000);
updateDuty();
function updateDuty() {
    b.analogRead(INPUT[currentServo], updateValue[currentServo]);
    if((count[0] % 10) === 0) {
      scheduleMove(0);
    }
    count[0]++;
    if((count[1] % 10) === 0) {
      scheduleMove(1);
    }
    count[1]++;
    var duty_cycle = (position[currentServo]*0.115) + duty_min;
    b.analogWrite(SERVO[currentServo], duty_cycle, 60, scheduleNextUpdate);
}
function defineUpdateValue(switchXY) {
  return function(x) {
	// 0.55 is the default position for both servos
    if(isNaN(x.value)){x.value = 0.55;}
    lastValues[switchXY][currentIndex[switchXY]] = x.value;
    currentIndex[switchXY]++;
    if(currentIndex[switchXY] === lastValues[switchXY].length - 1) {
      currentIndex[switchXY] = 0;
    }
  };
}
function sign (x) {
    return x>=0?1:-1;
}
function scheduleMove(switchXY) {
    var filteredValue = 0.0;
    for(var i = 0; i < lastValues[switchXY].length; i++) {
      filteredValue += lastValues[switchXY][i];
    } 
    filteredValue /= lastValues[switchXY].length;
    var exponent = 2;
    var error = correction1[switchXY]*filteredValue - 0.5 + correction2[switchXY];
    var errorFunc = Math.pow(error, exponent)*sign(error);
    var maxErrorFunc = Math.pow(0.5, exponent);
    var moveValue = errorFunc/maxErrorFunc*scale[switchXY]*Math.pow(-1, switchXY+1);
    if(Math.abs(moveValue) >= tolerance[switchXY]) {
      move[switchXY] = moveValue;
    }
}
function scheduleNextUpdate() {
    position[currentServo] += move[currentServo];
    move[currentServo] = 0;
    if(position[currentServo] < 0.025) {
      position[currentServo] = 0.025;
    } else if(position[currentServo] > 1) {
      position[currentServo] = 1;
    }
    // IMPORTANT: updateDuty and this function which sets currentServo must be the only ones to use it
    if(currentServo === 0) {
        currentServo = 1;
    } else if(currentServo === 1) {
        currentServo = 0;
    }
    setTimeout(updateDuty, 1);
}
