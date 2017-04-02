// To run: `node examples/randomWalk.js` from the root directory
var fs = require('fs')
var Canvas = require('canvas')
var canvas = new Canvas(500, 300)
var pg = require('..')(canvas)
pg.fillBackground("#FFF")
const colors = ["#005C09","#00680A","#007B0C","#018E0E","#01A611","#005C09","#00680A","#007B0C"]
pg.setPalette(new pg.Palette({colorList: colors}))
var params = {nPaths: 10, nSteps: 10000, stepSize: 1/100, renderer: pg.renderers.circle}
for (var i = 0; i < params.nPaths; i++) {
    var L = new pg.PointList({list: pg.random.walk2d(params.nSteps, {stepScale: params.stepSize})})
    L.points.forEach(p => pg.renderPoint(p, params.renderer, {radius: 3}))
}
pg.save('output/randomWalk', fs)