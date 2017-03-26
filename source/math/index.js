
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

/**
 * Samples from a discrete probability distribution
 * @param {[number]} pList 
 */
export function sample(pList) {
    const cumulativeP = cumulativeSum(pList)
    if (cumulativeP[cumulativeP.length - 1] != 1) {
        throw "Probability distribution to sample from doesn't sum to 1."
    }
    const draw = Math.random()
    return cumulativeP.indexOf(cumulativeP.find(x => x > draw))
}
