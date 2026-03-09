function updateClock(){

let now = new Date();

let hours = now.getHours();
let minutes = now.getMinutes();
let seconds = now.getSeconds();


// RGB background color generator
let colors = ["#1a1a1d", "#2c3e50", "#2c061f", "#0f3460", "#16213e"];
let randomColor = colors[Math.floor(Math.random()*colors.length)];
document.body.style.background = randomColor;

// Greeting message based on time of day
let greeting = "";
//morning: 5am to 12pm.
if (hours <12){
    greeting = "Good Morning ☀️";
}
//afternoon: 12pm to 6pm.
else if(hours < 18){
    greeting = "Good Afternoon ";
}
//night: 6pm to 6am.
else{
    greeting = "Good Night 🌙";
}

document.getElementById("greeting").innerText = greeting;

let image = document.getElementById("timeImage");

// change image based on time of day
if(hours < 12){
    image.src = "images/sunrise.png";
}
else if(hours < 18){
    image.src = "images/afternoon.png";
}
else{
    image.src = "images/goodnight.png";
}

// convert to 12-hour format and determine AM/PM
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

// date formatting
let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

let day = days[now.getDay()];
let date = now.getDate();
let month = months[now.getMonth()];
let year = now.getFullYear();

let fullDate = day + "," + date + " " + month + " " + year;

document.getElementById("date").innerText = fullDate;

}

setInterval(updateClock,1000);
updateClock();

// hindu panchang details selection box.
function getPanchang(){

let today = new Date();

let days = [
"रविवार","सोमवार","मंगलवार","बुधवार","गुरुवार","शुक्रवार","शनिवार"
];

document.getElementById("day").innerText =
today.toDateString();

document.getElementById("vaar").innerText =
days[today.getDay()];

document.getElementById("paksha").innerText = "शुक्ल पक्ष";

document.getElementById("sunrise").innerText = "06:20 AM";

document.getElementById("sunset").innerText = "06:10 PM";

let tithi = [
"प्रतिपदा","द्वितीया","तृतीया","चतुर्थी","पंचमी",
"षष्ठी","सप्तमी","अष्टमी","नवमी","दशमी",
"एकादशी","द्वादशी","त्रायोदशी","चतुर्दशी","पूर्णिमा"
];

let nakshatra = [
"अश्विनी","भरणी","क्रितिका","रोहणी","मृगशीर्षा",
"अर्द्रा","पुनर्वसु","पुष्य","अश्लेषा","मघा",
"पूर्वफाल्गुनी","उत्तरफाल्गुनी","हस्त","चित्रा"
];

let yoga = [
"विश्कुम्भा","प्रीति","अयुष्मान","सौभाग्य","शोभन",
"अतिगंड","सुकर्म","धृति","शूल","गंड"
];

let karana = [
"बव","बालव","कौलव","तैतिल","गर","वणिज","विष्टि","शकुनि","चतुष्पाद","नाग","किस्तुघ्न"
];

let index = today.getDate();

document.getElementById("tithi").innerText =
tithi[index % tithi.length];

document.getElementById("nakshatra").innerText =
nakshatra[index % nakshatra.length];

document.getElementById("yoga").innerText =
yoga[index % yoga.length];

document.getElementById("karana").innerText =
karana[index % karana.length];

}

navigator.geolocation.getCurrentPosition(function(position){

let lat = position.coords.latitude;
let lon = position.coords.longitude;

console.log("Latitude:", lat);
console.log("Longitude:", lon);

document.getElementById("location").innerText =
lat.toFixed(2) + ", " + lon.toFixed(2);

});

async function getSunTime(){

let res = await fetch(
"https://api.sunrise-sunset.org/json?lat=19.07&lng=72.87&formatted=0"
);

let data = await res.json();

let sunrise = new Date(data.results.sunrise).toLocaleTimeString();
let sunset = new Date(data.results.sunset).toLocaleTimeString();

document.getElementById("sunrise").innerText = sunrise;
document.getElementById("sunset").innerText = sunset;

}

function moonPhase(){

let date = new Date();

let phase = date.getDate() % 8;

let phases = [
"New Moon 🌑",
"Waxing Crescent 🌒",
"First Quarter 🌓",
"Waxing Gibbous 🌔",
"Full Moon 🌕",
"Waning Gibbous 🌖",
"Last Quarter 🌗",
"Waning Crescent 🌘"
];

document.getElementById("moon").innerText =
phases[phase];

}

let today = new Date();

if(today.getMonth()==2 && today.getDate()==25){
document.getElementById("festival").innerText="Holi";
}
else{
document.getElementById("festival").innerText="None";
}

async function getLocation(){

if(!navigator.geolocation){
document.getElementById("location").innerText = "Location not supported";
return;
}

navigator.geolocation.getCurrentPosition(async function(position){

let lat = position.coords.latitude;
let lon = position.coords.longitude;

try{

let response = await fetch(
`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
);

let data = await response.json();

let city =
data.address.city ||
data.address.town ||
data.address.village ||
data.address.state;

let country = data.address.country;

document.getElementById("location").innerText =
city + ", " + country;

}catch(error){

document.getElementById("location").innerText =
lat.toFixed(2) + ", " + lon.toFixed(2);

}

});

}

function detectFestival(){

let today = new Date();

let day = today.getDate();
let month = today.getMonth() + 1; // months start from 0

let festival = "None";

if(day == 26 && month == 1){
festival = "Republic Day 🇮🇳";
}

else if(day == 15 && month == 8){
festival = "Independence Day 🇮🇳";
}

else if(day == 2 && month == 10){
festival = "Gandhi Jayanti";
}

else if(day == 25 && month == 12){
festival = "Christmas 🎄";
}

document.getElementById("festival").innerText = festival;

}

function getRealPanchang(){

let today = new Date();

// convert date to Julian day
let jd = (today / 86400000) + 2440587.5;

// sun longitude approximation
let sun = (280.46 + 0.9856474 * jd) % 360;

// moon longitude approximation
let moon = (218.32 + 13.176396 * jd) % 360;

// difference between moon and sun
let diff = (moon - sun + 360) % 360;


// ---------- TITHI ----------

let tithiIndex = Math.floor(diff / 12);

let tithiNames = [
"Pratipada","Dwitiya","Tritiya","Chaturthi","Panchami",
"Shashthi","Saptami","Ashtami","Navami","Dashami",
"Ekadashi","Dwadashi","Trayodashi","Chaturdashi","Purnima",
"Pratipada","Dwitiya","Tritiya","Chaturthi","Panchami",
"Shashthi","Saptami","Ashtami","Navami","Dashami",
"Ekadashi","Dwadashi","Trayodashi","Chaturdashi","Amavasya"
];

document.getElementById("tithi").innerText =
tithiNames[tithiIndex];


// ---------- PAKSHA ----------

let paksha = (tithiIndex < 15) ? "Shukla Paksha" : "Krishna Paksha";

document.getElementById("paksha").innerText = paksha;


// ---------- NAKSHATRA ----------

let nakIndex = Math.floor((moon % 360) / 13.333);

let nakshatraNames = [
"Ashwini","Bharani","Krittika","Rohini","Mrigashira",
"Ardra","Punarvasu","Pushya","Ashlesha","Magha",
"Purva Phalguni","Uttara Phalguni","Hasta","Chitra",
"Swati","Vishakha","Anuradha","Jyeshtha","Mula",
"Purva Ashadha","Uttara Ashadha","Shravana",
"Dhanishta","Shatabhisha","Purva Bhadrapada",
"Uttara Bhadrapada","Revati"
];

document.getElementById("nakshatra").innerText =
nakshatraNames[nakIndex];

}

getRealPanchang();

detectFestival();

getLocation();

moonPhase();

getSunTime();

getPanchang();