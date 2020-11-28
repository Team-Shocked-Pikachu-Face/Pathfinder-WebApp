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
let warmHead1Description = "Due to the temperature being above 60 degrees, a ballcap is cool in warm weather and keep the sun off of your face."; 
const warmHead1 = new Clothing('./clothes/warmHead1.jpg', warmHead1Description, [60, 120], 'head', [800]);
gearClothesHolder.storeClothes(warmHead1);
let warmHead2Description = "Due to the temperature being above 60 degrees, wide brimmed caps protect the neck and head from the sun.";
const warmHead2 = new Clothing('./clothes/warmHead2.jpg', warmHead2Description, [60, 120], 'head', [800]);
gearClothesHolder.storeClothes(warmHead2);
let warmHead3Description = "Due to the temperature being above 60 degrees and drizzling rain, a water resistant boony hat offers great head and neck protection from the sun and light rain.";
const warmHead3 = new Clothing('./clothes/warmHead3.jpg', warmHead3Description, [60, 120], 'head', [300]);
gearClothesHolder.storeClothes(warmHead3);
//jackets
let warmJacket1Description = "Because the temperature will be between 60-70 degrees, light pullovers can provide a light extra layer in warm or slightly cool conditions.";
const warmJacket1 = new Clothing('./clothes/warmJacket1.jpg', warmJacket1Description, [60,70], 'jacket', [200, 300, 500, 600, 700, 800, 802]);
gearClothesHolder.storeClothes(warmJacket1);
let warmJacket2Description = "Because the temperature will be between 60-70 degrees, sweatshirts can provide a light extra layer in warm or slightly cool conditions.";
const warmJacket2 = new Clothing('./clothes/warmJacket2.jpg', warmJacket2Description, [60,70], 'jacket', [200, 300, 500, 600, 700, 800, 802]);
gearClothesHolder.storeClothes(warmJacket2);
//shirts
let warmShirt1Description = "Short sleeved t-shirts are as great base layer for warm or slighly cool conditions above 70 degrees.";
const warmShirt1 = new Clothing('./clothes/warmShirt1.jpg', warmShirt1Description, [70,120], 'shirt', [200, 300, 500, 600, 700, 800, 802]);
gearClothesHolder.storeClothes(warmShirt1);
let warmShirt2Description = "Long sleeved light-weight button up shirts provide cool sun protection on the arms and neck for temperatures above 70 degrees."; 
const warmShirt2 = new Clothing('./clothes/warmShirt2.jpg', warmShirt2Description, [70,120], 'shirt', [200, 300, 500, 600, 700, 800, 802]);
gearClothesHolder.storeClothes(warmShirt2);
//pants/shorts
let warmPants1Description = `Long legged, light, hiking-cargo pants can protect from the sun as well as poison ivy and ticks. They may have the added benefit of many pockets as well. \
    These are suitable to wear above 60 degrees.`;
const warmPants1 = new Clothing('./clothes/warmPants1.jpg', warmPants1Description, [60, 120], 'pant', [200, 300, 500, 600, 700, 800, 802]);
gearClothesHolder.storeClothes(warmPants1);
let warmPants2Description = "Jeans can help keep the legs stay warm and protect from poinonous plants or ticks. These are suitable to wear above 60 degrees."; 
const warmPants2 = new Clothing('./clothes/warmPants2.jpg', warmPants2Description, [60, 120], 'pant', [200, 300, 500, 600, 700, 800, 802]);
gearClothesHolder.storeClothes(warmPants2);
let warmShorts1Description = `Cargo shorts are a lightweight alternative to long legged pants that can be cooler in warm weather. \
    These are a good option for those who want to stay very cool in temperatures above 70.`; 
const warmShorts1 = new Clothing('./clothes/warmShorts1.jpg', warmShorts1Description, [70, 120], 'pant', [200, 300, 500, 600, 700, 800, 802]);
gearClothesHolder.storeClothes(warmShorts1);

/* Cold Clothing Objects*/
//head wear
let coldHead1Description = "Knit caps are warm in windy or cold conditions with temperatures below 60 degrees."; 
const coldHead1 = new Clothing('./clothes/coldHead1.jpg', coldHead1Description, [-20,60], 'head', [200, 300, 500, 600, 700, 800, 802]);
gearClothesHolder.storeClothes(coldHead1);
let coldHead2Description = "An insulated beanie will keep your head very warm in windy or cold conditions with temperatures below 60 degrees.";
const coldHead2 = new Clothing('./clothes/coldHead2.jpg', coldHead2Description, [-20,60], 'head', [200, 300, 500, 600, 700, 800, 802]);
gearClothesHolder.storeClothes(coldHead2);
//jackets
let coldJacket1Description = "Lightly insulated windbreaker jackets are helpful for those who want to feel perfectly warm in colder tempeartures from 45-60 degrees."; 
const coldJacket1 = new Clothing('./clothes/coldJacket1.jpg', coldJacket1Description, [45,60], 'jacket', [200, 300, 500, 600, 700, 800, 802]);
gearClothesHolder.storeClothes(coldJacket1);
let coldJacket2Description = `Lighter down-jackets trap warm air inside them and create a great insulating layer for temperatures between 45-60 degrees. /
    They are also easy to pack and great to use as a pillow.`; 
const coldJacket2 = new Clothing('./clothes/coldJacket2.jpg', coldJacket2Description, [45,60], 'jacket', [200, 300, 500, 600, 700, 800, 802]);
gearClothesHolder.storeClothes(coldJacket2);
let coldJacket3Description = `A non-insulated windbreaker jackets are a recommendation to keep warm in windy and cold conditions. These are more suited for those who like to be\
    cooler side when temperatures are between 45-60 degrees.`;
const coldJacket3 = new Clothing('./clothes/coldJacket3.jpg', coldJacket3Description, [45,60], 'jacket', [200, 300, 500, 600, 700, 800, 802]);
gearClothesHolder.storeClothes(coldJacket3);
//shirts
let longSleeve1Description = "Heavier longsleeve base layers such as this can be a great extra insulating layer in colder conditions with temperatures\
    lower than 70 degrees."; 
const longSleeve1 = new Clothing('./clothes/longSleeve1.jpg', longSleeve1Description, [-20,70], 'shirt', [200, 300, 500, 600, 700, 800, 802]);
gearClothesHolder.storeClothes(longSleeve1);
let longSleeve2Description = "A lighter technical longsleeve base layer like this one can make for a great light layer in colder conditions below 70 degrees.\
    They also protect the arms and shoulders from the sun."; 
const longSleeve2 = new Clothing('./clothes/longSleeve2.jpg', longSleeve2Description, [-20,70], 'shirt', [200, 300, 500, 600, 700, 800, 802]);
gearClothesHolder.storeClothes(longSleeve2);
//pants
let coldPants2Description = "Wind breaking long pants can provide warmth to the legs by keeping cold wind off and may be waterproof as well.\
    These are recommended for temperatures between 45-60 degrees."; 
const coldPants2 = new Clothing('./clothes/coldPants2.jpg', coldPants2Description, [45, 60], 'pant', [200, 300, 500, 600, 700, 800, 802]);
gearClothesHolder.storeClothes(coldPants2);

/* Winter Clothing Objects*/
//head wear

//jackets
const winterJacket1Description = "A heavy, insulated, windproof jacket such as this one, is one recommendation to stay warm for temperatures below 45.\
    Those who do not need extreme warmth should consider a style of jacket like this.";
const winterJacket1 = new Clothing('./clothes/winterJacket1.jpg', winterJacket1Description, [-20,45], 'jacket', [200, 300, 500, 600, 700, 800, 802]);
gearClothesHolder.storeClothes(winterJacket1);
const winterJacket2Description = "A very heavy, insulated, snow rated jacket such as this one, is one recommendation to stay warm for temperatures below 45.\
    Those who want extreme warmth should consider a style of jacket like this.";
const winterJacket2 = new Clothing('./clothes/winterJacket2.jpg', winterJacket2Description, [-20,45], 'jacket', [200, 300, 500, 600, 700, 800, 802]);
gearClothesHolder.storeClothes(winterJacket2);
//pants
const winterPants1Description = "Heavy, insulated, and wind proof pants like these are recommended to stay warm below 45 degrees."
const winterPants1 = new Clothing('./clothes/winterPants1.jpg', winterPants1Description, [-20,44.99999], 'pant', [200, 300, 500, 600, 700, 800, 802]);
gearClothesHolder.storeClothes(winterPants1);

/* Footwear */
//regular hiking boots/shoes
const hikingBoot1Description = "Water proof, breathable hiking boots are recommended to wear above 45 degrees. These will provide better ankle support and\
    protection from nature while hiking compared to traditional tennis-shoes.";
const hikingBoot1 = new Clothing('./clothes/hikingBoot1.jpg', hikingBoot1Description, [45,130], 'footwear', [200, 300, 500, 600, 700, 800, 802]);
gearClothesHolder.storeClothes(hikingBoot1);
const hikingBoot2Description = "Water proof, breathable hiking boots are recommended to wear above 45 degrees. These will provide better ankle support and\
    protection from nature while hiking compared to traditional tennis-shoes.";
const hikingBoot2 = new Clothing('./clothes/hikingBoot2.jpg', hikingBoot2Description, [45,130], 'footwear', [200, 300, 500, 600, 700, 800, 802]);
gearClothesHolder.storeClothes(hikingBoot2);
//winter boots
const hikingBootCold1Description = "Water proof, insulated hiking boots are recommended to wear for temperatures below 45 degrees.";
const hikingBootCold1 = new Clothing('./clothes/hikingBootCold1.jpg', hikingBootCold1Description, [-20, 45], 'footwear', [200, 300, 500, 600, 700, 800, 802]);
gearClothesHolder.storeClothes(hikingBootCold1);
const hikingBootCold2Description = "Water proof, insulated hiking boots are recommended to wear for temperatures below 45 degrees.";
const hikingBootCold2 = new Clothing('./clothes/hikingBootCold2.jpg', hikingBootCold2Description, [-20, 45], 'footwear', [200, 300, 500, 600, 700, 800, 802]);
gearClothesHolder.storeClothes(hikingBootCold2);

/* Gear Objects */
//hiking poles
const hikingPoleDescription = "Hiking poles are especially helpful on elevated hikes and can reduce the strain on a hikers knees, it is recommennded to bring\
    because this trail has a total elevation gain greater than 700 feet. They can also act as supports to push down on when ascending in elevation."; 
const hikingPoles = new Gear('./gear/hikingPoles.jpg', hikingPoleDescription, [-20,130], 700, [0,200], [200, 300, 500, 600, 700, 800, 802]);
gearClothesHolder.storeGear(hikingPoles);
//water bottle
const waterBottleDescription = "A water bottle is recommended for hydration because the trail is less than 6 miles in length.";
const waterBottle = new Gear('./gear/waterBottle.jpg', waterBottleDescription, [-20,130], 0, [0, 6], [200, 300, 500, 600, 700, 800, 802]);
gearClothesHolder.storeGear(waterBottle);
//hydration bag
const hydrationBagDescription = "A hydration bag is recommended for hydration because the trail is greater than 6 miles in length.";
const hydrationBag = new Gear('./gear/hydrationBag.jpg', hydrationBagDescription, [-20,130], 0, [6,200], [200, 300, 500, 600, 700, 800, 802]);
gearClothesHolder.storeGear(hydrationBag);
//sunglasses
const sunglassesDescription = "Sunglasses are recommended to wear to protect your eyes because it will be sunny out on the trail.";
const sunglasses = new Gear('./gear/sunglasses.jpg', sunglassesDescription, [-20,130], 0, [0,200], [800]);
gearClothesHolder.storeGear(sunglasses);
//poncho
const ponchoDescription = "A rain poncho is recommended to wear to keep yourself dry because rain is expected on the trail.";
const poncho = new Gear('./gear/poncho.jpg', ponchoDescription, [60,130], 0, [0,200], [200, 500]);
gearClothesHolder.storeGear(poncho);
//snack short
const snack1Description = "A nutritious energy bar is recommended as a base snack for fuel to bring on any hike.";
const snack1 = new Gear('./gear/snack1.jpg', snack1Description, [-20,130], 0, [0,200], [200, 300, 500, 600, 700, 800, 802]); 
gearClothesHolder.storeGear(snack1);
//snack medium
const snack2Description = "Trail mix is recommended as an intermediate snack for fuel when hiking longer than 5 miles.";
const snack2 = new Gear('./gear/snack2.jpg', snack2Description, [-20,130], 0, [5, 200], [200, 300, 500, 600, 700, 800, 802]);
gearClothesHolder.storeGear(snack2); 
//snack long
const snack3Description = "Sandwiches are recommended as an advanced snack for fuel when hiking longer than 10 miles. \
    We recommend peanut butter sandwiches as they will stay fresh, and provide the protein and fuel you need for a longer hike."
const snack3 = new Gear('./gear/snack3.jpg', snack3Description, [-20,130], 0, [10, 200], [200, 300, 500, 600, 700, 800, 802]);
gearClothesHolder.storeGear(snack3);


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
