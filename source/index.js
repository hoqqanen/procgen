import * as geometry from './geometry';
import * as random from './random';
import * as renderers from './renderers';
import Palette from './Palette';
import PointList from './PointList';
import * as utils from './utils';

module.exports = function(canvas, bgColor = "#FFF") {
  var ctx =  canvas.getContext("2d")
  return {
    save: (name, fs) => {
      // This only makes sense while using node canvas
      canvas.createPNGStream().pipe(fs.createWriteStream(name + ".png"))
    },
    defaultPalette: new Palette({color: "#000"}),
    setPalette: function(p) {
      this.defaultPalette = p
    },
    renderPoint: function(point, render, data) {
      data.point = utils.canonicalizePoint(point, canvas)
      data.color = data.color || this.defaultPalette.next()
      render(ctx, data)
    },
    fillBackground: function(color) {
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    },
    bgColor: bgColor,
    canvas: canvas,
    clear: function() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.fillBackground(this.bgColor);
    },
    ctx: ctx,

    // Library exports
    geometry: geometry,
    random: random,
    renderers: renderers,
    PointList: PointList,
    Palette: Palette,
  };
}