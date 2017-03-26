// To run: `node examples/randomWalk.js` from the root directory
var fs = require('fs')
var Canvas = require('canvas')
var procgen = require('..')
var canvas = new Canvas(1000, 1000)
var pg = procgen(canvas)
pg.fillBackground("#FFF")
var params = {nPaths: 10, nSteps: 5000, stepSize: 1/200, renderer: pg.renderers.circle}
for (var i = 0; i < params.nPaths; i++) {
    var L = new pg.PointList({list: pg.geometry.scale(pg.random.walk2d(params.nSteps), params.stepSize)})
    L.list.forEach(p => pg.renderPoint(p, params.renderer, {radius: 1, color: "#000"}))
}
pg.save('randomWalk', fs)