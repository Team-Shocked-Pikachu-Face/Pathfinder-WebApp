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
    constructor(passedTrail) {
    this.length = passedTrail.length;
    this.latitude = passedTrail.latitude;
    this.longitude = passedTrail.longitude;
    this.highestElevation = passedTrail.highestElevation;
    this.elevationGain = passedTrail.elevationGain;
    this.difficulty = passedTrail.difficulty;
    this.photo = passedTrail.photo;
    this.name = passedTrail.name;
    this.location = passedTrail.location;
    }
    async getWeather () {
       const weatherAPIURL = `https://api.openweathermap.org/data/2.5/weather?lat=${this.latitude}&lon=${this.longitude}&appid=e61074558f08136b4d111a532200ab94&units=imperial`
       return fetch(weatherAPIURL)
            .then(response => response.json())
            .then((data) => {
                this.weather = data
            })
            .catch((err) => {
                console.log(err)
            })
    }
    getRecommendations() {
        console.log("getting Recommendation");
    }
}

var focusedTrail = new Trail(storedTrail)
var promises = [];
promises.push(focusedTrail.getWeather());
Promise.all(promises).then(() => {
    console.log(promises);
    console.log(focusedTrail.weather);
    focusedTrail.getRecommendations();
});

