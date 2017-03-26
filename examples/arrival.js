// Setup :/
var fs = require('fs')
var Canvas = require('canvas')
var procgen = require('..')
var canvas = new Canvas(1000, 1000)
var pg = procgen(canvas)
pg.fillBackground("#FFF")


// Todo: take params as CLargs?
var params = {nPaths: 100, nSteps: 2500, stepSize: 1/200, renderer: pg.renderers.circle}
var circlePoints = pg.random.uniform([params.nPaths], 0, 2*Math.PI).map(pg.geometry.toCircle)
circlePoints = pg.geometry.scale(circlePoints, .5)
for (var i = 0; i < params.nPaths; i++) {
    var L = new pg.PointList({list: pg.random.walk2d(params.nSteps, {start: circlePoints[i], stepScale: params.stepSize})})
    L.list.forEach(p => pg.renderPoint(p, params.renderer, {radius: 1, color: "#000"}))
}
pg.save('output/arrival', fs)