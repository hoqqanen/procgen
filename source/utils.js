
export function canonicalizePoint(point, canvas) {
    if (point.x !== undefined && point.y !== undefined) {
        return {
            x: point.x * canvas.width / 2 + canvas.width / 2,
            y: - point.y * canvas.height / 2 + canvas.height / 2 // Make positive up
        }
    } else if (point.r !== undefined && point.theta !== undefined) {
        return canonicalizePoint({
            x: point.r * Math.cos(theta),
            y: point.r * Math.sin(theta)
        }, canvas)
    } else {
        // Should throw an error
    }
}
