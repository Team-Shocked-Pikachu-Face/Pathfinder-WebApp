class GearClothCollection {
    #clothes
    #gear
    constructor() {
        this.#clothes = []
        this.#gear = []
    }
    storeClothes (clothing) {
        if(clothing instanceof Clothing) {
            this.#clothes.push(clothing);
        }
    }
    getClothes () {
        return this.#clothes;
    }
    storeGear (gear) {
        if(gear instanceof Gear) {
            this.#gear.push(gear);
        }
    }
    getGear () {
        return this.#gear;
    }
}

const gearClothesHolder = new GearClothCollection;


class RecommendedItem {
    #image
    #description
    #tempRange
    #weatherCodes
    constructor(image, description, tempRange, weatherCodes) {
        this.#image = image;
        this.#description = description;
        this.#tempRange = tempRange;
        this.#weatherCodes = weatherCodes;
    }
    getImage() {
        return this.#image;
    }
    getDescription () {
        return this.#description;
    }
    getTempRange () {
        return this.#tempRange;
    }
    getWeatherCodes () {
        return this.#weatherCodes;
    }
}

class Gear extends RecommendedItem{
    #elevationGain
    #distanceRange
    constructor(image, description, tempRange, elevationGain, distanceRange, weatherCodes) {
        super(image, description, tempRange, weatherCodes);
        this.#elevationGain = elevationGain;
        this.#distanceRange = distanceRange;
        // this.#weatherCodes = weatherCodes;
    }
    checkGear(temp, elevationGain, distance, weatherCode) {
        if(temp >= (this.getTempRange())[0] && temp <= (this.getTempRange())[1]) {
            if(elevationGain >=this.#elevationGain) {
                if(distance >= this.#distanceRange[0] && distance <= this.#distanceRange[1]) {
                    if(this.getWeatherCodes().includes(weatherCode)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
}

class Clothing extends RecommendedItem{
    #type
    constructor(image, description, tempRange, type, weatherCodes) {
        super(image, description, tempRange, weatherCodes)
        this.#type = type;
    }
    checkClothing(temp, weatherCode) {
        if(temp >= (this.getTempRange())[0] && temp <= (this.getTempRange())[1]) {
            if(this.getWeatherCodes().includes(weatherCode)) {
                return true;
            }
        }
        return false;
    }
    getType () {
        return this.#type
    }
}


/* 
Weather codes for the below object creations can be found at: https://openweathermap.org/weather-conditions
*/

/* Winter Clothing Objects*/
//head wear

//jackets

//shirts

//pants


/* Cold Clothing Objects*/
//head wear
const coldHead1 = new Clothing('../clothes/coldHead1.jpg', '', [45,60], 'head', [200, 300, 400, 500, 600, 700, 800]);
gearClothesHolder.storeClothes(coldHead1);
const coldHead2 = new Clothing('../clothes/coldHead2.jpg', '', [45,60], 'head', [200, 300, 400, 500, 600, 700, 800]);
gearClothesHolder.storeClothes(coldHead2);
//jackets
const coldJacket1 = new Clothing('../clothes/coldJacket1.jpg', '', [45,60], 'jacket', [200, 300, 400, 500, 600, 700, 800]);
gearClothesHolder.storeClothes(coldJacket1);
const coldJacket2 = new Clothing('../clothes/coldJacket2.jpg', '', [45,60], 'jacket', [200, 300, 400, 500, 600, 700, 800]);
gearClothesHolder.storeClothes(coldJacket2);
const coldJacket3 = new Clothing('../clothes/coldJacket3.jpg', '', [45,60], 'jacket', [200, 300, 400, 500, 600, 700, 800]);
gearClothesHolder.storeClothes(coldJacket3);
//shirts
const longSleeve1 = new Clothing('../clothes/longSleeve1.jpg', '', [45,60], 'shirt', [200, 300, 500, 600, 700, 800]);
gearClothesHolder.storeClothes(longSleeve1);
const longSleeve2 = new Clothing('../clothes/longSleeve2.jpg', '', [45,60], 'shirt', [200, 300, 500, 600, 700, 800]);
gearClothesHolder.storeClothes(longSleeve2);
//pants
const coldPants1 = new Clothing('../clothes/coldPants1.jpg', '', [45,60], 'pant', [200, 300, 500, 600, 700, 800]);
gearClothesHolder.storeClothes(coldPants1);
const coldPants2 = new Clothing('../clothes/coldPants2.jpg', '', [45,60], 'pant', [200, 300, 500, 600, 700, 800]);
gearClothesHolder.storeClothes(coldPants2);
const coldPants3 = new Clothing('../clothes/coldPants3.jpg', '', [45,60], 'pant', [200, 300, 500, 600, 700, 800]);
gearClothesHolder.storeClothes(coldPants3);
/* Warm Clothing Objects*/
//head wear

//jackets

//shirts

//pants

/* Footwear */
//regular hiking boots/shoes
const hikingBoot1 = new Clothing('../clothes/hikingBoot1.jpg', '', [45,130], 'footwear', [200, 300, 700, 800]);
gearClothesHolder.storeClothes(hikingBoot1);
const hikingBoot2 = new Clothing('../clothes/hikingBoot2.jpg', '', [45,130], 'footwear');
gearClothesHolder.storeClothes(hikingBoot1);
//Snow boots
const hikingBootSnow1 = new Clothing('../clothes/hikingBootSnow1.jpg', '', [-20, 65], 'footwear', [500, 600]);
gearClothesHolder.storeClothes(hikingBootSnow1);


/* Gear Objects */
//hiking poles
const hikingPoles = new Gear('../gear/hikingPoles.png', '', [-20,130], 700, [0,200], [200, 300, 500, 600, 700, 800]);
gearClothesHolder.storeGear(hikingPoles);
//water bottle
const waterBottle = new Gear('../gear/waterBottle.jpg', '', [-20,130], 0, [0, 5.999], [200, 300, 500, 600, 700, 800]);
gearClothesHolder.storeGear(waterBottle);
//hydration bag
const hydrationBag = new Gear('../gear/hydrationBag.jpg', '', [-20,130], 0, [6,200], [200, 300, 500, 600, 700, 800]);
gearClothesHolder.storeGear(hydrationBag);
//sunglasses
const sunglasses = new Gear('../gear/sunglasses.jpg', '', [-20,130], 700, [0,200], [800]);
gearClothesHolder.storeGear(sunglasses);

console.log(gearClothesHolder.getClothes());
console.log(gearClothesHolder.getGear());


class Recommendation {
    #recommendations
    #GearClothCollection
    constructor (GearClothCollection) {
        if(!(Recommendation.instance)) {
          Recommendation.instance = this;
          Recommendation.instance.#GearClothCollection = GearClothCollection;
          Recommendation.instance.#recommendations = {
              head: [],
              jacket: [],
              shirt: [],
              pant: [],
              footwear: [],
              gear: []
          };
        }
        return Recommendation.instance;
    }
    buildRecommendation(elevation, elevationGain, distance, temp, weatherCode) {
        const clothes = this.#GearClothCollection.getClothes();
        for(let i in clothes) {
            if(clothes[i].checkClothing(temp, weatherCode)) {
                this.#recommendations[clothes[i].getType()].push(clothes[i]);
            }
        }
        const gear = this.#GearClothCollection.getGear();
        for(let i in gear) {
            if(gear[i].checkGear(temp, elevationGain, distance, weatherCode)) {
                this.#recommendations['gear'].push(gear[i]);
            }
        }
    }
    getRecommendations() {
        return this.#recommendations;
    }

  }

const trailRecommendation = new Recommendation(gearClothesHolder);
// trailRecommendation.buildRecommendation(10656, 2503, 8.5, 55, 600);
// console.log(trailRecommendation.getRecommendations());
