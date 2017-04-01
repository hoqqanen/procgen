import {choice, sample} from '../random';

export default class Palette {
    constructor({colorList, probs, color}) {
        if (color) {
            this.colorList = [color]
            this.probs = [1]
        } else if (colorList) {
            this.colorList = colorList
            this.probs = probs || Array(colorList.length).fill(1/colorList.length)
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
}
