var fs = require('fs')
var Canvas = require('canvas')
var canvas = new Canvas(512, 300)
var GIFEncoder = require('gifencoder')
var pg = require('..')(canvas)
pg.fillBackground("#FFF")

pg.animate(GIFEncoder, {delay: 100, repeat: 20})

var params = {
    nSteps: 10000,
    stepsPerFrame: 400,
}

function setup(data, i, width, height) {
    const c = pg.random.uint8()
    return [c, c, c, 255]
    // Other options
    /*
    return i/4 < width * height / 2 ? [0,0,0,255] : [255,255,255,255]
    return Math.floor((i%width)%64 / 32) === 0 ? [0,0,0,255] : [255,255,255,255]
    */
}

function shade(data, i, width, height, isBoundary) {
    if (!isBoundary) {
        const choices = [data[i - 4], data[i + 4], data[i - 4*width], data[i + 4*width]]
        // This may be faster than calling pg.random.choice
        const c = choices[Math.floor(4*Math.random())]
        return [c, c, c, 255]
    } else {
        return data.slice(i,i+4)
    }
}

pg.runShader(setup)
pg.frame()
for (var i = 0; i < params.nSteps; i++) {
    pg.runShader(shade)
    if (i % params.stepsPerFrame === 0) {
        console.log(i/params.nSteps)
        pg.frame()
    }
}
pg.save('output/diffusion', fs)
