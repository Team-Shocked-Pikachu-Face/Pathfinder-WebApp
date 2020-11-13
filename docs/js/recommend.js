// var trail = JSON.parse(sessionStorage.trail);
// console.log(trail);

// this is test trail info to use while making recommend page, normally have selected trail from hike.html being saved in sessionStorage(clicking on trail's image)
var storedTrail = {
    difficulty: "MEDIUM",
    elevationGain: 2503,
    highestElevation: 10656,
    latitude: 40.3121,
    length: 8.5,
    location: "Estes Park, Colorado",
    longitude: -105.6464,
    name: "Bear Lake TH to Fern Lake TH",
    photo: "https://cdn2.apstatic.com/photos/hike/7000772_medium_1554159640.jpg"
}

class Trail {
    constructor(passedTrail, recommendation) {
    this.length = passedTrail.length;
    this.latitude = passedTrail.latitude;
    this.longitude = passedTrail.longitude;
    this.highestElevation = passedTrail.highestElevation;
    this.elevationGain = passedTrail.elevationGain;
    this.difficulty = passedTrail.difficulty;
    this.photo = passedTrail.photo;
    this.name = passedTrail.name;
    this.location = passedTrail.location;
    this.recommendation = recommendation;
    }
    getWeather () {
       const weatherAPIURL = `https://api.openweathermap.org/data/2.5/weather?lat=${this.latitude}&lon=${this.longitude}&appid=e61074558f08136b4d111a532200ab94&units=imperial`
       fetch(weatherAPIURL)
            .then(response => response.json())
            .then((data) => {
                this.weather = data
                console.log(this.weather);
                this.getRecommendations();
            })
            .catch((err) => {
                console.log(err)
            })
    }
    getRecommendations() {
        const weatherCode = this.weather.weather[0]['id'];
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
        const temp = this.weather.main['temp'];
        this.recommendation.buildRecommendation(
            this.highestElevation, this.elevationGain,
            this.length, temp, weatherCode
        )
        console.log(this.recommendation.getRecommendations());
    }
}

var focusedTrail = new Trail(storedTrail, trailRecommendation);
focusedTrail.getWeather();
// var promises = [];
// promises.push(focusedTrail.getWeather());
// Promise.all(promises).then(() => {
//     console.log(promises);
//     console.log(focusedTrail.weather);
//     focusedTrail.getRecommendations();
// });

