function updateClock(){

let now = new Date();

let hours = now.getHours();
let minutes = now.getMinutes();
let seconds = now.getSeconds();

let colors = ["#1a1a1d", "#2c3e50", "#2c061f", "#0f3460", "#16213e"];
let randomColor = colors[Math.floor(Math.random()*colors.length)];
document.body.style.background = randomColor;

let greeting = "";
if (hours <12){
    greeting = "Good Morning ☀️";
}
else if(hours < 18){
    greeting = "Good Afternoon 🌤️";
}
else{
    greeting = "Good Evening 🌙";
}

document.getElementById("greeting").innerText = greeting;

let image = document.getElementById("timeImage");


if(hours < 12){
    image.src = "images/sunrise.png";
}
else if(hours < 18){
    image.src = "images/afternoon.png";
}
else{
    image.src = "images/goodnight.png";
}

let ampm = "AM";

if(hours >= 12){
    ampm = "PM";
}

if(hours > 12){
    hours = hours - 12;
}

if(hours == 0){
    hours = 12;
}

if(hours < 10) hours = "0" + hours;
if(minutes < 10) minutes = "0" + minutes;
if(seconds < 10) seconds = "0" + seconds;

let time = hours + ":" + minutes + ":" + seconds + " " + ampm;

document.getElementById("clock").innerText = time;


let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

let day = days[now.getDay()];
let date = now.getDate();
let month = months[now.getMonth()];
let year = now.getFullYear();

let fullDate = day + ", " + date + " " + month + " " + year;

document.getElementById("date").innerText = fullDate;

}

setInterval(updateClock,1000);

updateClock();
