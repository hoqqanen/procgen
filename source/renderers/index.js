
export function circle(ctx, {points, radius = 1, color = "#000"}) {
    // assert there is only one point?
    ctx.beginPath()
    ctx.arc(points[0].x, points[0].y, radius, 0, 2 * Math.PI)
    ctx.fillStyle = color
    ctx.fill()
}

export function line(ctx, {points, color = "#000"}) {
    // assert there are only two points?
    ctx.beginPath()
    ctx.moveTo(points[0].x, points[0].y)
    ctx.lineTo(points[1].x, points[1].y)
    ctx.strokeStyle = color
    ctx.stroke()
}