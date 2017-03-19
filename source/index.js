var fs = require('fs')

import * as geometry from './geometry';
import * as utils from './utils';

module.exports = function(canvas) {
  var ctx =  canvas.getContext('2d')
  return {
    save: function(name) {
      // This may only make sense while using node canvas
      canvas.createPNGStream().pipe(fs.createWriteStream(name + '.png'))
    },
    drawPoint: function(point, drawMethod, data) {
      data.point = utils.canonicalizePoint(point, canvas)
      drawMethod(data, ctx)
    },
    canvas: canvas,
    ctx: ctx,
    geometry: geometry
  };
}