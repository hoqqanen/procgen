/* For internal use only, not exposed to users. */

export function canonicalizePoint(point, canvas) {
    if (point.x !== undefined && point.y !== undefined) {
        return {
            x: point.x * canvas.width / 2 + canvas.width / 2,
            // Traditionally y increments going downward on canvas. 
            // We invert its sign to get the usual cartesian system.
            y: - point.y * canvas.height / 2 + canvas.height / 2
        }
    } else if (point.r !== undefined && point.theta !== undefined) {
        return canonicalizePoint({
            x: point.r * Math.cos(theta),
            y: point.r * Math.sin(theta)
        }, canvas)
    } else {
        throw {
            message: "Point didn't have enough information to plot.", 
            point: point
        }
    }
}

export function listToPoint(list) {
    return {x: list[0], y: list[1]}
}