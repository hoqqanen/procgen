var fs = require('fs')
var Canvas = require('canvas')
var canvas = new Canvas(300, 300)
var GIFEncoder = require('gifencoder')
var pg = require('..')(canvas)
pg.fillBackground("#FFF")

pg.animate(GIFEncoder, {delay: 40})

var params = {
    nSteps: 1000,
    stepsPerFrame: 20,
}

function setup(data, i, width, height) {
    const c = pg.random.uint8()
    return [c, c, c, 255]
}

function shade(data, i, width, height, isBoundary) {
    if (!isBoundary) {
        const choices = [data[i - 4], data[i + 4], data[i - 4*width], data[i + 4*width]]
        // This may be faster than calling pg.random.choice
        const c = choices[Math.floor(4*Math.random())]
        return [c, c, c, 255]
    } else {
        return [255,255,255,255]
    }
}

pg.runShader(setup)
pg.frame()
for (var i = 0; i < params.nSteps; i++) {
    pg.runShader(shade)
    if (i % params.stepsPerFrame === 0) {
        pg.frame()
    }
}
pg.save('output/diffusion', fs)
