import {cumulativeSum} from '../math'

export function rand(low, high) {
    return Math.random() * (high - low) + low
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

export function walk1d(n, step = 1, start = 0) {
    const steps = uniformDiscrete([n], [-step, step])
    return cumulativeSum(steps)
}

export function walk2d(n, steps = [[-1, 0], [0, -1], [1, 0], [0, 1]], start = [0, 0]) {
    return cumulativeSum(uniformDiscrete([n], steps))
}

