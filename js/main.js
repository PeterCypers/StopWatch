const button = document.getElementById("start_stop");
const colorbutton = document.getElementById("colorize");
const resetbutton = document.getElementById("buttonReset");
const intervalButton = document.getElementById("interval");
const milliseconds = document.getElementById("smaller");
const seconds = document.getElementById("seconds");
const minutes = document.getElementById("minutes");
const hours = document.getElementById("hours");
let hourTimer = 1, minTimer = 1, secTimer = 1, millisecTimer = 1;
let clicked = true;
let intervalclicked = false;
let millisecondsInterval, secondsInterval;
let updateSecMinInterval, updateHoursInterval;
let colorInterval;
let colors;

const hours2 = document.getElementById("hours2");
const minutes2 = document.getElementById("minutes2");
const seconds2 = document.getElementById("seconds2");
const day = document.getElementById("day");
const month = document.getElementById("month");
const year = document.getElementById("year");

function activateIntervals () {
        millisecondsInterval = setInterval(displayMilliseconds, 1);
        secondsInterval = setInterval(displaySeconds, 1000);
}

function activateTimers() {
    updateSecMinInterval = setInterval(updateSecMin, 1000);
    updateHoursInterval = setInterval(updateHours, 60000);
}

function displayMilliseconds() {
    milliseconds.innerHTML = millisecTimer;
    millisecTimer++;
    if(millisecTimer === 999){
        millisecTimer = 0;
    }
}

function displaySeconds() {
  if(secTimer === 60){
    seconds.innerHTML = 0;
  }else{
    seconds.innerHTML = secTimer;
  }
  secTimer++;
  if(secTimer === 61){
    secTimer = 1;
    displayMinutes();
  }
}

function displayMinutes() {
    if(minTimer !== 60) minutes.innerHTML = minTimer;
    minTimer++;
    if(minTimer === 61){
        minTimer = 1;
        displayHours();
    }
}

function displayHours() {
    hours.innerHTML = hourTimer;
    hourTimer++;
    if(hourTimer === 999){
        clearInterval(millisecondsInterval);
        throw new Error("Programme running too long.");
    }
}

//Colors

function activateColor(){
    colorInterval = setInterval(colorize, 10000);
}

function colorize(){
    colors = randomizeColors();
    hours.style.backgroundColor = colors[0];
    minutes.style.backgroundColor = colors[1];
    seconds.style.backgroundColor = colors[2];
    milliseconds.style.backgroundColor = colors[3];
}

function randomizeColors(){
    const colorArray = ["aquamarine", "blueviolet", "cadetblue", "lightseagreen", "darkslategray", "darkturquoise", "deepskyblue", "darkseagreen", "darkcyan"];
    let colorSet = new Set();
    while(colorSet.size < 4){
        let randomNumber = Math.floor(Math.random() * colorArray.length);
        colorSet.add(colorArray[randomNumber]);
    }
    return [...colorSet];
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
    }
}

//buttons
button.onclick = async () => {
    setClicked(clicked);
}

intervalButton.onclick = () => {
    if(!intervalclicked){
        activateColor();
        intervalButton.innerText = "Interval on";
        intervalclicked = true;
    }else{
        clearInterval(colorInterval);
        intervalButton.innerText = "Interval off";
        intervalclicked = false;
    }
}

colorbutton.onclick = () => {
    colorize();
}

resetbutton.onclick = () => {
    hourTimer = 1, minTimer = 1, secTimer = 1, millisecTimer = 1;
    seconds.innerText = 0;
    minutes.innerText = 0;
    hours.innerText = 0;
    milliseconds.innerText = 0;
}

//time & date
function initialize(){
    const date = new Date();
    //time
    hours2.innerText = date.getHours();
    minutes2.innerText = date.getMinutes();
    seconds2.innerText = date.getSeconds();
    //date
    day.innerText = date.getDate();
    month.innerText = date.getMonth() + 1;
    year.innerText = date.getFullYear();
}
//every sec
function updateSecMin(){
    const date = new Date();
    minutes2.innerText = date.getMinutes();
    seconds2.innerText = date.getSeconds();
}
//every min
function updateHours(){
    const date = new Date();
    hours2.innerText = date.getHours();

    //update date every minute
    day.innerText = date.getDate();
    month.innerText = date.getMonth();
    year.innerText = date.getFullYear();
    
}

function init(){
    initialize();
    activateTimers();
}

window.onload = init;