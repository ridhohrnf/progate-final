// document.addEventListener("DOMContentLoaded", event =>{
//     let skycons = new Skycons({"color":"#3da4ab"});
//     skycons.add("icon",Skycons.CLEAR_DAY);
//     skycons.play();
// });
// icon start
// icon end
// const all
const inputCity = document.querySelector("input");
const infoTxt = document.querySelector(".info-txt");
const wrapper = document.querySelector(".wrapper");
const inputPart = document.querySelector(".input-part");
const locationBtn = document.querySelector("button");
const back = document.querySelector("header i");
const wIcon = document.querySelector(".weather-part img");
let key = '9c7ef7eabe90688b0faf867cee3695bb';
let api;
// City Enter
inputCity.addEventListener("keyup", e=>{
    if(e.key == "Enter" && inputCity.value != ""){
        requestAPI(inputCity.value);
    }
})
// location button
locationBtn.addEventListener("click", ()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }else{
        alert("Your browser not support geolocation api");
    }
})
function onSuccess(position){
    const {latitude, longitude} = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${key}`;
    fetchData();
}
function onError(error){
    infoTxt.innerHTML = error.message;
    infoTxt.classList.add("error");
}
function requestAPI(city){
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`;
    fetchData();
}

function fetchData(){
    infoTxt.innerHTML = "Getting Weather Details...";
    infoTxt.classList.add("pending")
    // Respon API terus dijadiin objek javascript terus manggil array dalamnya weather details function 
    fetch (api).then(response => response.json()).then(result => weatherDetails(result));
}

function weatherDetails(info){
    infoTxt.classList.replace("pending","error");
    if(info.cod == '404'){
        infoTxt.innerHTML = `${inputCity.value} nama kota yang salah`;
    }
    // else if(!info == ''){
    //     infoTxt.innerHTML = `${inputCity.value} isn't a valid city name`;
    else{
        const city = info.name;
        const country = info.sys.country;
        const {description, id} = info.weather[0];
        const {feels_like, humidity, temp} = info.main;
        const dt = new Date(info.dt*1000);
        const {speed, deg} = info.wind;

        if(id==800){
            wIcon.src =  "animated/day.svg";
        }else if(id >= 200 && id <= 232){
            wIcon.src =  "animated/thuder.svg"; 
        }else if(id >= 600 && id <= 622){
            wIcon.src =  "animated/snowy-6.svg"; 
        }else if(id >= 701 && id <= 781){
            wIcon.src =  "animated/cloudy.svg"; 
        }else if(id >= 801 && id <= 804){
            wIcon.src =  "animated/cloudy-day-1.svg"; 
        }else if((id >= 300 && id <= 321) || (id >= 500 && id <=531)){
            wIcon.src =  "animated/rainy-6.svg"; 
        }

        wrapper.querySelector(".weather-part .baru").innerHTML=`${dt.toDateString()}`
        wrapper.querySelector(".temp .numb").innerHTML =Math.floor(temp) ;
        wrapper.querySelector(".weather").innerHTML = description;
        wrapper.querySelector(".location span").innerHTML = `${city}, ${country}`;
        wrapper.querySelector(".wind span").innerHTML = `${speed}m/s, ${deg}°`;
        wrapper.querySelector(".temp .numb-2").innerHTML = Math.floor(feels_like);
        wrapper.querySelector(".humidity span").innerHTML = `${humidity}%`;

        infoTxt.classList.remove("pending","error");
        wrapper.classList.add("active");
        console.log(info);
    }
}
back.addEventListener("click", ()=>{
    wrapper.classList.remove("active");
});
