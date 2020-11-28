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
let warmHead1Description = "Ballcaps are cool in warm weather and keep the sun off of your face"; 
const warmHead1 = new Clothing('./clothes/warmHead1.jpg', warmHead1Description, [60, 120], 'head', [800]);
gearClothesHolder.storeClothes(warmHead1);
let warmHead2Description = "Wide brimmed caps protect the neck and head from the sun";
const warmHead2 = new Clothing('./clothes/warmHead2.jpg', warmHead2Description, [60, 120], 'head', [800]);
gearClothesHolder.storeClothes(warmHead2);
let warmHead3Description = "Boony hats offer great head an neck protection from the sun ";
const warmHead3 = new Clothing('./clothes/warmHead3.jpg', warmHead3Description, [60, 120], 'head', [300]);
gearClothesHolder.storeClothes(warmHead3);
//jackets
let warmJacket1Description = "Light pullovers can provide a light extra layer in warm or slightly cool conditions";
const warmJacket1 = new Clothing('./clothes/warmJacket1.jpg', warmJacket1Description, [60,70], 'jacket', [200, 300, 500, 600, 700, 800, 802]);
gearClothesHolder.storeClothes(warmJacket1);
let warmJacket2Description = "Sweatshirts can provide a light extra layer in warm or slightly cool conditions";
const warmJacket2 = new Clothing('./clothes/warmJacket2.jpg', warmJacket2Description, [60,70], 'jacket', [200, 300, 500, 600, 700, 800, 802]);
gearClothesHolder.storeClothes(warmJacket2);
//shirts
let warmShirt1Description = "Short sleeved t-shirts are as great base layer for warm or slighly cool conditions";
const warmShirt1 = new Clothing('./clothes/warmShirt1.jpg', warmShirt1Description, [70,120], 'shirt', [200, 300, 500, 600, 700, 800, 802]);
gearClothesHolder.storeClothes(warmShirt1);
let warmShirt2Description = "Long sleeved button up shirts provide cool sun protection on the arms and neck"; 
const warmShirt2 = new Clothing('./clothes/warmShirt2.jpg', warmShirt2Description, [70,120], 'shirt', [200, 300, 500, 600, 700, 800, 802]);
gearClothesHolder.storeClothes(warmShirt2);
//pants/shorts
let warmPants1Description = "Long legged cargo pants can protect from the sun as well as poison ivy and ticks. They may have the added benefit of many pockets as well";
const warmPants1 = new Clothing('./clothes/warmPants1.jpg', warmPants1Description, [60, 120], 'pant', [200, 300, 500, 600, 700, 800, 802]);
gearClothesHolder.storeClothes(warmPants1);
let warmPants2Description = "Long pants can help keep the legs warm and protect from poinonous plants or ticks"; 
const warmPants2 = new Clothing('./clothes/warmPants2.jpg', warmPants2Description, [60, 120], 'pant', [200, 300, 500, 600, 700, 800, 802]);
gearClothesHolder.storeClothes(warmPants2);
let warmShorts1Description = "Cargo shorts are a lightweight alternative to long legged pants that can be cooler in warm weather"; 
const warmShorts1 = new Clothing('./clothes/warmShorts1.jpg', warmShorts1Description, [70, 120], 'pant', [200, 300, 500, 600, 700, 800, 802]);
gearClothesHolder.storeClothes(warmShorts1);

/* Cold Clothing Objects*/
//head wear
let coldHead1Description = "Knit caps are very warm in windy or cold conditions"; 
const coldHead1 = new Clothing('./clothes/coldHead1.jpg', coldHead1Description, [-20,60], 'head', [200, 300, 500, 600, 700, 800, 802]);
gearClothesHolder.storeClothes(coldHead1);
let coldHead2Description = "Due to the cold weather, one recommendation is to wear an insulated beanie. This will provide maximum warmth.";
const coldHead2 = new Clothing('./clothes/coldHead2.jpg', coldHead2Description, [-20,60], 'head', [200, 300, 500, 600, 700, 800, 802]);
gearClothesHolder.storeClothes(coldHead2);
//jackets
let coldJacket1Description = "Windbreaker Jackets are especially helpful at keeping warm in windy and cold conditions"; 
const coldJacket1 = new Clothing('./clothes/coldJacket1.jpg', coldJacket1Description, [45,60], 'jacket', [200, 300, 500, 600, 700, 800, 802]);
gearClothesHolder.storeClothes(coldJacket1);
let coldJacket2Description = "Puffy Jackets trap warm air inside them and create a great insulating layer. They are also easy to pack and great to use as a pillow"; 
const coldJacket2 = new Clothing('./clothes/coldJacket2.jpg', coldJacket2Description, [45,60], 'jacket', [200, 300, 500, 600, 700, 800, 802]);
gearClothesHolder.storeClothes(coldJacket2);
let coldJacket3Description = "Windbreaker Jackets are especially helpful at keeping warm in windy and cold conditions";
const coldJacket3 = new Clothing('./clothes/coldJacket3.jpg', coldJacket3Description, [45,60], 'jacket', [200, 300, 500, 600, 700, 800, 802]);
gearClothesHolder.storeClothes(coldJacket3);
//shirts
let longSleeve1Description = "Longsleeve base layers such as this can be a great extra insulating layer in cold conditions"; 
const longSleeve1 = new Clothing('./clothes/longSleeve1.jpg', longSleeve1Description, [-20,70], 'shirt', [200, 300, 500, 600, 700, 800, 802]);
gearClothesHolder.storeClothes(longSleeve1);
let longSleeve2Description = "Longsleeve base layers like this one can make for a great light layer in cool conditions. They also protect the arms and shoulders from the sun"; 
const longSleeve2 = new Clothing('./clothes/longSleeve2.jpg', longSleeve2Description, [-20,70], 'shirt', [200, 300, 500, 600, 700, 800, 802]);
gearClothesHolder.storeClothes(longSleeve2);
//pants
let coldPants2Description = "Long pants can provide warmth to the legs by keeping cold wind off and may be waterproof as well"; 
const coldPants2 = new Clothing('./clothes/coldPants2.jpg', coldPants2Description, [45, 60], 'pant', [200, 300, 500, 600, 700, 800, 802]);
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
let hikingPoleDescription = "Hiking poles are especially helpful on longer hikes and can reduce the strain on a hikers knees, especially on trails with changes in elevation"; 
const hikingPoles = new Gear('./gear/hikingPoles.jpg', hikingPoleDescription, [-20,130], 700, [0,200], [200, 300, 500, 600, 700, 800, 802]);
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
