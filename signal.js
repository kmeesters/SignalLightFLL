//server
var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname)).listen(1394);

// RaspberryPi Signal light config
var signalLight = 0; // Set to 1 to use Raspberry GPIO use
var signalLightGPIO = {
	RedPin : 16, //GPIO 36
	AmberPin : 20, //GPIO 38
	GreenPin : 21 //GPIO 40
};
var gpio = require("pi-gpio");
var on = 1;

//Open the Pins

gpio.open(gpioPin, "output", function(err) {



console.log('GPIO pin '+gpioPin+' is open. toggling LED every 100 mS for 10s');


intervalId = setInterval( function(){
  gpio.write(gpioPin, on, function() { // toggle pin between high (1) and low (0)
    on = (on + 1) % 2;
    });
  }, 100);
});

durationId= setTimeout( function(){
  clearInterval(intervalId);
  clearTimeout(durationId);
  console.log('10 seconds blinking completed');
  gpio.write(gpioPin, 0, function() { // turn off pin 16
    gpio.close(gpioPin); // then Close pin 16
    process.exit(0); // and terminate the program
  });
}, 10000); // duration in mS