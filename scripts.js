const $ = document;
const body = $.querySelector("body");
const author = $.querySelector(".author");
const imgLoc = $.querySelector(".img-location");
const cryptoDivTop = $.querySelector(".crypto-top");
const cryptoDivBottom = $.querySelector(".crypto-bottom");
const timeElement = $.querySelector(".time");
const weatherDiv = $.querySelector(".weather");



//////////////////////////////////////////////////////////////////////////
//         setting time          ////////////////////////////////////////

function setCurrentTime() {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString("en-us", {timeStyle: "medium"}).padStart(11, "0");
    timeElement.textContent = formattedTime;
}

setInterval(setCurrentTime, 1000);

//////////////////////////////////////////////////////////////////////
//          setting background           ////////////////////////////


async function setBG() {
    try {
        const res = await fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature");
        if(!res.ok) {
            throw new Error (`Response Status: ${res.status}`)
        }
        const data = await res.json();
        console.log(data)
        body.style.backgroundImage = `url(${data.urls.regular})`;
        author.textContent = `By: ${data.user.name}`;
        imgLoc.textContent = data.location.name;
    } catch (err) {
        console.error(err.message);
        body.style.backgroundImage = `url("https://images.unsplash.com/photo-1472214103451-9374bd1c798e?crop=entropy&cs=srgb&fm=jpg&ixid=M3wxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjIzNTc3MzV8&ixlib=rb-4.1.0&q=85")`;
        author.textContent = `By: Robert Lukeman`;
        imgLoc.textContent = `Skye, United Kingdom`;
    }
}

setBG()

/////////////////////////////////////////////////////////////////////////
//          setting crypto currency            /////////////////////////


async function getCryptoData() {
    try {
        const res = await fetch("https://api.coingecko.com/api/v3/coins/bitcoin");
        if(!res.ok) {
            throw new Error(`Response Status: ${res.status}`);
        }
        const data = await res.json();
        console.log(data);
        cryptoDivTop.innerHTML = `
            <img src=${data.image.large} />
            <p>${data.name}</p>
        `
        cryptoDivBottom.innerHTML = `
            <div>
                <Img class="crypto-status-img" src="images/currency-exchange.svg" />
                <span>$${data.market_data.current_price.usd}</span>
            </div>
            <div>
                <Img class="crypto-status-img" src="images/arrow-up-square-fill.svg" />
                <span>$${data.market_data.high_24h.usd}</span>
            </div>
            <div>
                <Img class="crypto-status-img" src="images/arrow-down-square-fill.svg" />
                <span>$${data.market_data.low_24h.usd}</span>
            </div>
        `
    } catch (err) {
        console.error(err.message);
    }
}

getCryptoData();


///////////////////////////////////////////////////////////////////////////////////////
//         setting weather       /////////////////////////////////////////////////////

let locationLat
let locationLon

navigator.geolocation.getCurrentPosition( position => {
    console.log(position);
    // console.log(position.coords.latitude);
    // console.log(position.coords.longitude);
    locationLat = position.coords.latitude.toFixed(2);
    locationLon = position.coords.longitude.toFixed(2);
    console.log(locationLat, locationLon);

    async function getWeather() {
        try{
            const res = await fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${locationLat}&lon=${locationLon}&units=metric`)
            if(!res.ok){
                throw new Error(`Response Status: ${res.status}`)
            }
            const data = await res.json();
            console.log(data)
            console.log(data.weather[0].icon)

            weatherDiv.innerHTML = `
                <img src=https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png />
            `

        } catch (err) {
            console.error(err.message)
        }
    }
    
    getWeather();

})

