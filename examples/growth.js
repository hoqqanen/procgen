var fs = require('fs')
var Canvas = require('canvas')
var canvas = new Canvas(800, 800)
var GIFEncoder = require('gifencoder')
var pg = require('..')(canvas)
pg.fillBackground("#FFF")

pg.animate(GIFEncoder, {})

var params = {nP: 36, nSteps: 400,
    renderer: pg.renderers.circle, nSpawn: 2, neighborDistance: .01, 
    forceRatio: 1000, pointRadius: .5, stepSize: .002, spawnCap: 2, stepsPerFrame: 5}
var pts = pg.geometry.circlePoints(params.nP, .15).map(pg.Point.fromList);

function neighborForce(p, q) {
    const d = p.distance(q)
    const direction = d < params.neighborDistance ? 1 : -1
    return p.sub(q).scale(direction * params.forceRatio)
}
function nonNeighborForce(p, q) {
    return p.sub(q).scale(Math.exp(-p.distance(q)))
}

function getForce(p, i, points) {
    var forces = []
    forces.push(neighborForce(p, points[(i-1+points.length)%points.length]))
    forces.push(neighborForce(p, points[(i+1) % points.length]))
    points.forEach((q, j) => {
        if (Math.abs(j - i) > 1) { // also boundary of the array...
            forces.push(nonNeighborForce(p, q))
        }
    })
    return forces.reduce((acc, f) => acc.add(f))
}

function grow(points) {
    var spawnPts = Array(Math.floor(Math.random() * params.nSpawn)).fill(0)
    spawnPts = spawnPts.map(_ => Math.floor(Math.random() * points.length))
    var newPts = []
    points.forEach((p, i) => {
        newPts.push(p)
        if (spawnPts.indexOf(i) !== -1) {
            newPts.push(pg.Point.lerp(p, points[(i+1) % points.length], 0))// Math.random()))
        }
    })
    var forces = newPts.map(getForce)
    return newPts.map((p, i) => {
        return p.add(forces[i].normalize().scale(params.stepSize))
    })
}

var L = new pg.PointList({list: pts})
for (var i = 0; i < params.nSteps; i++) {
    L.points.forEach(p => pg.renderPoint(p, params.renderer, {radius: params.pointRadius}))
    L.update(grow)
    if (i % params.stepsPerFrame === 0) {
        pg.frame()
    }
}
pg.save('output/grow', fs)
