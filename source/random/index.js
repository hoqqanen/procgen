import {cumulativeSum} from '../math'
import {scale} from '../geometry'

export function rand(low, high) {
    return Math.random() * (high - low) + low
}

/**
 * Samples from a discrete probability distribution
 * Note that the distribution need not sum to 1.
 * @param {[number]} pList 
 */
export function sample(pList) {
    const cumulativeP = cumulativeSum(pList)
    const normalizer = cumulativeP[cumulativeP.length - 1]
    const distribution = cumulativeP.map(x => x/normalizer)
    const draw = Math.random()
    return distribution.indexOf(distribution.find(x => x > draw))
}

/**
 * Samples from a uniform discrete probability distribution
 * @param {Array} lst
 */
export function choice(lst) {
    return lst[Math.floor(Math.random() * lst.length)]
}

export function uniform(shape, low = -1, high = 1) {
    if (shape.length === 0) {
        return rand(low, high)
    } else {
        var r = [];
        for (var i = 0; i < shape[0]; i++) {
            r[i] = uniform(shape.slice(1), low, high);
        }
        return r;
    }
}

export function uniformDiscrete(shape, values) {
    const continuous = uniform(shape, 0, values.length)
    return continuous.map(c => values[Math.floor(c)])
}

export function walk1d(n, {step = 1, start = 0, stepScale = 1}) {
    return cumulativeSum([start].concat(uniformDiscrete([n], [-step, step])))
}

export function walk2d(n, {steps = [[-1, 0], [0, -1], [1, 0], [0, 1]], start = [0, 0], stepScale = 1}) {
    return cumulativeSum([start].concat(uniformDiscrete([n], scale(steps, stepScale))))
}