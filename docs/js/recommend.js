var storedTrail = JSON.parse(sessionStorage.trail);

class Trail {
    /* Creates a trail object, whose attributes are used to find recommendations*/
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
       /* Gets the weather from API for the trail based on lat & lon,
          Sets the weather attribute.
        */
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
        /* Gets recommendations from trail's recommendation object */
        let weatherCode = convertWeatherCode(this.weather.weather[0]['id']);
        let temp = this.weather.main['temp'];
        this.recommendation.buildRecommendation(
            this.highestElevation, this.elevationGain,
            this.length, temp, weatherCode
        )
        // call method to display built recommendations
        this.showRecommendations();
    }
    showRecommendations () {
        /* Attaches images and descriptions to divs on recommend.html */
        $('.ui.accordion')
            .accordion({
                exclusive: false
            });

        let recommendations = this.recommendation.getRecommendations();
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
    // top of page trail information div info
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
    /* Converts API weather code to a base line */
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
    // create image elements for each recommended headwear item
    let head = recommendations['head'];
    let headImages = document.getElementById('headImages');
    for(let i in head) {
        let image = document.createElement('img');
        image.src = head[i].getImage();
        headImages.appendChild(image);
        // give it a popup of its description
        $(image)
            .popup({
                content : head[i].getDescription()
            })
        ;
    }
}

function attachJacketRecommendations(recommendations) {
    // create image elements for each recommended jacket item
    let jacket = recommendations['jacket'];
    let jacketImages = document.getElementById('jacketImages');
    for(let i in jacket) {
        let image = document.createElement('img');
        image.src = jacket[i].getImage();
        jacketImages.appendChild(image);
        // give it a popup of its description
        $(image)
            .popup({
                content : jacket[i].getDescription()
            })
        ;
    }
}

function attachShirtRecommendations(recommendations) {
    // create image elements for each recommended shirt item
    let shirt = recommendations['shirt'];
    let shirtImages = document.getElementById('shirtImages');
    for(let i in shirt) {
        let image = document.createElement('img');
        image.src = shirt[i].getImage();
        shirtImages.appendChild(image);
        // give it a popup of its description
        $(image)
            .popup({
                content : shirt[i].getDescription()
            })
        ;
    }
}

function attachPantRecommendations(recommendations) {
    // create image elements for each recommended pants/legs item
    let pant = recommendations['pant'];
    let pantImages = document.getElementById('pantImages');
    for(let i in pant) {
        let image = document.createElement('img');
        image.src = pant[i].getImage();
        pantImages.appendChild(image);
        // give it a popup of its description
        $(image)
            .popup({
                content : pant[i].getDescription()
            })
        ;
    }
}

function attachFootwearRecommendations(recommendations) {
    // create image elements for each recommended footwear item
    let footwear = recommendations['footwear'];
    let footwearImages = document.getElementById('footwearImages');
    for(let i in footwear) {
        let image = document.createElement('img');
        image.src = footwear[i].getImage();
        footwearImages.appendChild(image);
        // give it a popup of its description
        $(image)
            .popup({
                content : footwear[i].getDescription()
            })
        ;
    }
}

function attachGearRecommendations(recommendations) {
    // create image elements for each recommended gear item
    let gear = recommendations['gear'];
    let gearImages = document.getElementById('miscImages');
    for(let i in gear) {
        let image = document.createElement('img');
        image.src = gear[i].getImage();
        gearImages.appendChild(image);
        // give it a popup of its description
        $(image)
            .popup({
                content : gear[i].getDescription()
            })
        ;
    }
}