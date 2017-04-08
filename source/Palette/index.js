import {choice, sample} from '../random';

export default class Palette {
    constructor({colorList, probs, color, colorFunc}) {
        if (color) {
            this.colorList = [color]
            this.probs = [1]
        } else if (colorList) {
            this.colorList = colorList
            // If we have no probs we assume a uniform distribution. See next()
            this.probs = probs || null
        } else if (colorFunc) {
            this.next = colorFunc
        } else {
            throw {
                message: "Insufficient arguments to construct a palette",
                args: arguments
            }
        }
    }

    next() {
        if (this.probs) {
            return this.colorList[sample(this.probs)]
        } else {
            return choice(this.colorList)
        }
    }

    get(x) { // maps [0, 1] to the color space
        return null
    }

    // TODO: This should be on Color which should be a full-fledged color class
    static randGray() {
        var value = Math.random() * 0xFF | 0;
        var grayscale = (value << 16) | (value << 8) | value;
        return '#' + grayscale.toString(16);
    }
}
