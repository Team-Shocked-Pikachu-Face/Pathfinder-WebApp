var storedTrail = JSON.parse(sessionStorage.trail);
console.log(storedTrail);

// this is test trail info to use while making recommend page, normally have selected trail from hike.html being saved in sessionStorage(clicking on trail's image)
// var storedTrail = {
//     difficulty: "MEDIUM",
//     elevationGain: 2503,
//     highestElevation: 10656,
//     latitude: 40.3121,
//     length: 8.5,
//     location: "Estes Park, Colorado",
//     longitude: -105.6464,
//     name: "Bear Lake TH to Fern Lake TH",
//     photo: "https://cdn2.apstatic.com/photos/hike/7000772_medium_1554159640.jpg"
// }

class Trail {
    constructor(passedTrail, recommendation) {
    this.length = passedTrail.length;
    this.latitude = passedTrail.latitude;
    this.longitude = passedTrail.longitude;
    this.highestElevation = passedTrail.high;
    this.elevationGain = passedTrail.high - passedTrail.low;
    this.difficulty = passedTrail.difficulty;
    this.photo = passedTrail.imgMedium;
    this.name = passedTrail.name;
    this.location = passedTrail.location;
    this.recommendation = recommendation;
    }
    getWeather () {
       const weatherAPIURL = `https://api.openweathermap.org/data/2.5/weather?lat=${this.latitude}&lon=${this.longitude}&appid=e61074558f08136b4d111a532200ab94&units=imperial`
       fetch(weatherAPIURL)
            .then(response => response.json())
            .then((data) => {
                this.weather = data;
                setupHeader(this);
                this.getRecommendations();
            })
            .catch((err) => {
                console.log(err)
            })
    }
    getRecommendations() {
        let weatherCode = convertWeatherCode(this.weather.weather[0]['id']);
        let temp = this.weather.main['temp'];
        this.recommendation.buildRecommendation(
            this.highestElevation, this.elevationGain,
            this.length, temp, weatherCode
        )
        this.showRecommendations();
    }
    showRecommendations () {
        $('.ui.accordion')
            .accordion({
                exclusive: false
            });

        let recommendations = this.recommendation.getRecommendations();
        console.log(recommendations);
        attachHeadRecommendations(recommendations);
        attachJacketRecommendations(recommendations);
        attachShirtRecommendations(recommendations);
        attachPantRecommendations(recommendations);
        attachFootwearRecommendations(recommendations);
        attachGearRecommendations(recommendations);
    }
}

var focusedTrail = new Trail(storedTrail, trailRecommendation);
focusedTrail.getWeather();

function setupHeader(trail) {
    console.log(trail);
    var date = new Date();
    const trailH2 = document.getElementById("trailName");
    trailH2.innerText = trail.name + " - " + date.getMonth().toString() + "/" + date.getDate().toString() + " - Clothing & Gear Recommendations";
    const weatherPBar = document.getElementById('trailWeather');
    weatherPBar.innerText = trail.weather.main['temp'].toString() + " Degrees, " + trail.weather.weather[0]['description'];
    const lengthPBar = document.getElementById('trailLength');
    lengthPBar.innerText = "Distance: " + trail.length.toString() + " miles";
    const elevGainPBar = document.getElementById('trailElevationGain');
    elevGainPBar.innerText = "Elevation Gain: " + trail.elevationGain.toString() + " feet";
    const trailDifficultyPBar = document.getElementById('trailDifficulty');
    trailDifficultyPBar.innerText = "Difficulty: " + trail.difficulty.toString();
}

function convertWeatherCode(weatherCode) {
    if(weatherCode >= 200 && weatherCode <= 299) {
        weatherCode = 200;
    } else if (weatherCode >= 300 && weatherCode <= 399) {
        weatherCode = 300;
    } else if (weatherCode >= 500 && weatherCode <= 599) {
        weatherCode = 500;
    } else if (weatherCode >= 600 && weatherCode <= 699) {
        weatherCode = 600;
    } else if (weatherCode >= 700 && weatherCode <= 799) {
        weatherCode = 700;
    } else if (weatherCode === 801) {
        weatherCode = 800;
    } else if (weatherCode >= 802 && weatherCode <= 804) {
        weatherCode = 802;
    }
    return weatherCode;
}

function attachHeadRecommendations(recommendations) {
    let head = recommendations['head'];
    let headImages = document.getElementById('headImages');
    for(let i in head) {
        let image = document.createElement('img');
        image.src = head[i].getImage();
        headImages.appendChild(image);
        $(image)
            .popup({
                content : head[i].getDescription()
            })
        ;
    }
}

function attachJacketRecommendations(recommendations) {
    let jacket = recommendations['jacket'];
    let jacketImages = document.getElementById('jacketImages');
    for(let i in jacket) {
        let image = document.createElement('img');
        image.src = jacket[i].getImage();
        jacketImages.appendChild(image);
    }
}

function attachShirtRecommendations(recommendations) {
    let shirt = recommendations['shirt'];
    let shirtImages = document.getElementById('shirtImages');
    for(let i in shirt) {
        let image = document.createElement('img');
        image.src = shirt[i].getImage();
        shirtImages.appendChild(image);
    }
}

function attachPantRecommendations(recommendations) {
    let pant = recommendations['pant'];
    let pantImages = document.getElementById('pantImages');
    for(let i in pant) {
        let image = document.createElement('img');
        image.src = pant[i].getImage();
        pantImages.appendChild(image);
    }
}

function attachFootwearRecommendations(recommendations) {
    let footwear = recommendations['footwear'];
    let footwearImages = document.getElementById('footwearImages');
    for(let i in footwear) {
        let image = document.createElement('img');
        image.src = footwear[i].getImage();
        footwearImages.appendChild(image);
    }
}

function attachGearRecommendations(recommendations) {
    let gear = recommendations['gear'];
    let gearImages = document.getElementById('miscImages');
    for(let i in gear) {
        let image = document.createElement('img');
        image.src = gear[i].getImage();
        gearImages.appendChild(image);
    }
}