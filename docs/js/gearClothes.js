class GearClothCollection {
    #clothes
    #gear
    constructor() {
        this.#clothes = []
        this.#gear = []
    }
    storeClothing (clothing) {
        if(clothing.hasOwnProperty('bodyPart')) {
            this.#clothes.push(clothing);
        }
    }
    getClothes () {
        return this.#clothes;
    }
    storeGear (gear) {
        if(gear.hasOwnProperty('elevationGain')) {
            this.#gear.push(gear);
        }
    }
    getgear () {
        return this.#gear;
    }
}

const gearClothesHolder = new GearClothCollection;


class RecommendedItem {
    #image
    #description
    #tempRange
    constructor(image, description, tempRange) {
        this.#image = image;
        this.#description = description;
        this.#tempRange = tempRange;
    }
    getImage() {
        return this.#image;
    }
    getDescription () {
        return this.description;
    }
}

class Gear extends RecommendedItem{
    #elevationGain
    #distance
    #weatherCodeRange
    constructor(image, description, tempRange, elevationGain, distance, weatherCodeRange) {
        super(image, description, tempRange)
        this.#elevationGain = elevationGain;
        this.#distance = distance;
        this.#weatherCodeRange = weatherCodeRange;
    }
    checkGear(temp, elevationGain, distance, weatherCode) {
        if(temp >= this.#temprange[0] && temp <= this.#temprange[1]) {
            if(this.#elevationGain >= elevationGain) {
                if(this.#distance >= distance) {
                    if(weatherCode >= this.#weatherCodeRange[0] && weatherCode <= this.#weatherCodeRange[1]) {
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
    constructor(image, description, tempRange, type) {
        super(image, description, tempRange)
        this.#type = type;
        this.#elevation = elevation;
    }
    checkClothing(temp, elevation) {
        if(temp >= this.#temprange[0] && temp <= this.#temprange[1]) {
            if(this.#elevation >= elevation) {
                return true;
            }
        }
        return false;
    }
    getType () {
        return this.#bodyPart
    }
}

/* Winter Clothing Objects*/
//head wear

//jackets

//shirts

//pants


/* Cold Clothing Objects*/
//head wear
const headCold1 = new Clothing('../clothes/headCold1.jpg', '', [40,60], 'head');
//jackets

//shirts

//pants


/* Warm Clothing Objects*/
//head wear

//jackets

//shirts

//pants


/* Gear Objects */