
/*
Adds two arrays of scalars of the same length.
TODO: extend to arbitrary shapes
*/
export function sum(a, b) {
    // TODO: assert a and b are same shape
    return a.map((v, i) => v + b[i])
}

/**
 * Given [x0, x1, x2, ...] returns an array of [x0, x0+x1, x0+x1+x2, ...]
 * @param {[number]} values
 */
export function cumulativeSum(values) {
    var r = []
    values.reduce((acc, v) => {
        r.push(acc)
        return acc.length ? sum(acc, v) : acc + v
    })
    return r
}
