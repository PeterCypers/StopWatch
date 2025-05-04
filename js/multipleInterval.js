const button = document.getElementById("start_stop");
const milliseconds = document.getElementById("milliseconds");
const seconds = document.getElementById("seconds");
const minutes = document.getElementById("minutes");
const hours = document.getElementById("hours");
let hourTimer = 1, minTimer = 1, secTimer = 1, millisecTimer = 1;
let clicked = true;
let millisecondsInterval, secondsInterval, minutesInterval, hoursInterval;
//let secondsInterval = window.setInterval(displaySeconds, 1000); (why window?)

function activateIntervals () {
        millisecondsInterval = setInterval(displayMilliseconds, 100);
        secondsInterval = setInterval(displaySeconds, 1000); 
        minutesInterval = setInterval(displayMinutes, 60000);
        hoursInterval = setInterval(displayHours, 3600000);
}




function displayMilliseconds() {
    milliseconds.innerHTML = millisecTimer;
    millisecTimer++;
    if(millisecTimer === 999){
        millisecTimer = 0;
    }
}

function displaySeconds() {
//   seconds.innerHTML = new Date().getSeconds(); //no longer need to work with date object
  seconds.innerHTML = secTimer;
  secTimer++;
  if(secTimer === 60){
    secTimer = 0;
    throw new Error("programme running for too long");
  }
}

function displayMinutes() {
    minutes.innerHTML = minTimer;
    minTimer++;
    if(minTimer === 60){
        minTimer = 0;
    }
}

function displayHours() {
    hours.innerHTML = hourTimer;
    hourTimer++;
    if(hourTimer === 1000){
        throw new Error("programme running for too long");
    }
}

function setClicked (isClicked){
    if(isClicked){
        button.className = "clicked";
        button.innerHTML = "Stop";
        clicked = false;
        activateIntervals();
    } 
    if(!isClicked) {
        button.className = "unclicked";
        button.innerHTML = "Start";
        clicked = true;
        clearInterval(millisecondsInterval);
        clearInterval(secondsInterval);
        clearInterval(minutesInterval);
        clearInterval(hoursInterval);
    }
}



button.onclick = async () => {
    setClicked(clicked);
}

//window.clearInterval(secondsInterval); (why window?)

//never gets called, interval is never not in progress
// setTimeout(() => {
//     clearInterval(displaySeconds);
// }, 0);