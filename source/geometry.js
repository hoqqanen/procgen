import * as utils from './utils';

export function circle({point: {x, y}, radius, color}, ctx) {
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, 2 * Math.PI)
    ctx.fillStyle = color
    ctx.fill()
}
