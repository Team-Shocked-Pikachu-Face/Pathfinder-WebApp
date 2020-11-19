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

/* Warm Clothing Objects*/
//head wear
const warmHead1 = new Clothing('./clothes/warmHead1.jpg', '', [60, 120], 'head', [800]);
gearClothesHolder.storeClothes(warmHead1);
const warmHead2 = new Clothing('./clothes/warmHead2.jpg', '', [60, 120], 'head', [800]);
gearClothesHolder.storeClothes(warmHead2);
const warmHead3 = new Clothing('./clothes/warmHead3.jpg', '', [60, 120], 'head', [300]);
gearClothesHolder.storeClothes(warmHead3);
//jackets
const warmJacket1 = new Clothing('./clothes/warmJacket1.jpg', '', [60,70], 'jacket', [200, 300, 500, 600, 700, 800, 802]);
gearClothesHolder.storeClothes(warmJacket1);
const warmJacket2 = new Clothing('./clothes/warmJacket2.jpg', '', [60,70], 'jacket', [200, 300, 500, 600, 700, 800, 802]);
gearClothesHolder.storeClothes(warmJacket2);
//shirts
const warmShirt1 = new Clothing('./clothes/warmShirt1.jpg', '', [70,120], 'shirt', [200, 300, 500, 600, 700, 800, 802]);
gearClothesHolder.storeClothes(warmShirt1);
const warmShirt2 = new Clothing('./clothes/warmShirt2.jpg', '', [70,120], 'shirt', [200, 300, 500, 600, 700, 800, 802]);
gearClothesHolder.storeClothes(warmShirt2);
//pants/shorts
const warmPants1 = new Clothing('./clothes/warmPants1.jpg', '', [60, 120], 'pant', [200, 300, 500, 600, 700, 800, 802]);
gearClothesHolder.storeClothes(warmPants1);
const warmPants2 = new Clothing('./clothes/warmPants2.jpg', '', [60, 120], 'pant', [200, 300, 500, 600, 700, 800, 802]);
gearClothesHolder.storeClothes(warmPants2);
const warmShorts1 = new Clothing('./clothes/warmShorts1.jpg', 'cargo shorts', [70, 120], 'pant', [200, 300, 500, 600, 700, 800, 802]);
gearClothesHolder.storeClothes(warmShorts1);

/* Cold Clothing Objects*/
//head wear
const coldHead1 = new Clothing('./clothes/coldHead1.jpg', '', [-20,60], 'head', [200, 300, 500, 600, 700, 800, 802]);
gearClothesHolder.storeClothes(coldHead1);
const coldHead2 = new Clothing('./clothes/coldHead2.jpg', 'Due to the cold weather, one recommendation is to wear an insulated beanie. This will provide maximum warmth.', [-20,60], 'head', [200, 300, 500, 600, 700, 800, 802]);
gearClothesHolder.storeClothes(coldHead2);
//jackets
const coldJacket1 = new Clothing('./clothes/coldJacket1.jpg', '', [45,60], 'jacket', [200, 300, 500, 600, 700, 800, 802]);
gearClothesHolder.storeClothes(coldJacket1);
const coldJacket2 = new Clothing('./clothes/coldJacket2.jpg', '', [45,60], 'jacket', [200, 300, 500, 600, 700, 800, 802]);
gearClothesHolder.storeClothes(coldJacket2);
const coldJacket3 = new Clothing('./clothes/coldJacket3.jpg', '', [45,60], 'jacket', [200, 300, 500, 600, 700, 800, 802]);
gearClothesHolder.storeClothes(coldJacket3);
//shirts
const longSleeve1 = new Clothing('./clothes/longSleeve1.jpg', '', [-20,70], 'shirt', [200, 300, 500, 600, 700, 800, 802]);
gearClothesHolder.storeClothes(longSleeve1);
const longSleeve2 = new Clothing('./clothes/longSleeve2.jpg', '', [-20,70], 'shirt', [200, 300, 500, 600, 700, 800, 802]);
gearClothesHolder.storeClothes(longSleeve2);
//pants
const coldPants2 = new Clothing('./clothes/coldPants2.jpg', 'windproof and waterproof', [45, 60], 'pant', [200, 300, 500, 600, 700, 800, 802]);
gearClothesHolder.storeClothes(coldPants2);

/* Winter Clothing Objects*/
//head wear

//jackets
const winterJacket1 = new Clothing('./clothes/winterJacket1.jpg', '', [-20,45], 'jacket', [200, 300, 500, 600, 700, 800, 802]);
gearClothesHolder.storeClothes(winterJacket1);
const winterJacket2 = new Clothing('./clothes/winterJacket2.jpg', '', [-20,45], 'jacket', [200, 300, 500, 600, 700, 800, 802]);
gearClothesHolder.storeClothes(winterJacket2);
//pants
const winterPants1 = new Clothing('./clothes/winterPants1.jpg', 'insulated and wind/waterproof', [-20,44.99999], 'pant', [200, 300, 500, 600, 700, 800, 802]);
gearClothesHolder.storeClothes(winterPants1);

/* Footwear */
//regular hiking boots/shoes
const hikingBoot1 = new Clothing('./clothes/hikingBoot1.jpg', '', [45,130], 'footwear', [200, 300, 500, 600, 700, 800, 802]);
gearClothesHolder.storeClothes(hikingBoot1);
const hikingBoot2 = new Clothing('./clothes/hikingBoot2.jpg', '', [45,130], 'footwear', [200, 300, 500, 600, 700, 800, 802]);
gearClothesHolder.storeClothes(hikingBoot2);
//winter boots
const hikingBootCold1 = new Clothing('./clothes/hikingBootCold1.jpg', '', [-20, 45], 'footwear', [200, 300, 500, 600, 700, 800, 802]);
gearClothesHolder.storeClothes(hikingBootCold1);
const hikingBootCold2 = new Clothing('./clothes/hikingBootCold2.jpg', '', [-20, 45], 'footwear', [200, 300, 500, 600, 700, 800, 802]);
gearClothesHolder.storeClothes(hikingBootCold2);

/* Gear Objects */
//hiking poles
const hikingPoles = new Gear('./gear/hikingPoles.jpg', '', [-20,130], 700, [0,200], [200, 300, 500, 600, 700, 800, 802]);
gearClothesHolder.storeGear(hikingPoles);
//water bottle
const waterBottle = new Gear('./gear/waterBottle.jpg', '', [-20,130], 0, [0, 6], [200, 300, 500, 600, 700, 800, 802]);
gearClothesHolder.storeGear(waterBottle);
//hydration bag
const hydrationBag = new Gear('./gear/hydrationBag.jpg', '', [-20,130], 0, [6,200], [200, 300, 500, 600, 700, 800, 802]);
gearClothesHolder.storeGear(hydrationBag);
//sunglasses
const sunglasses = new Gear('./gear/sunglasses.jpg', '', [-20,130], 0, [0,200], [800]);
gearClothesHolder.storeGear(sunglasses);
//poncho
const poncho = new Gear('./gear/poncho.jpg', '', [60,130], 0, [0,200], [200, 500]);
gearClothesHolder.storeGear(poncho);
//snack short
const snack1 = new Gear('./gear/snack1.jpg', '', [-20,130], 0, [0,200], [200, 300, 500, 600, 700, 800, 802]);
gearClothesHolder.storeGear(snack1);
//snack medium
const snack2 = new Gear('./gear/snack2.jpg', '', [-20,130], 0, [5, 200], [200, 300, 500, 600, 700, 800, 802]);
gearClothesHolder.storeGear(snack2);
//snack long
const snack3 = new Gear('./gear/snack3.jpg', '', [-20,130], 0, [10, 200], [200, 300, 500, 600, 700, 800, 802]);
gearClothesHolder.storeGear(snack3);

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
