
export function circle(ctx, {point: {x, y}, radius = 1, color = "#000"}) {
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, 2 * Math.PI)
    ctx.fillStyle = color
    ctx.fill()
}
