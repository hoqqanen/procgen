import * as geometry from './geometry';
import * as random from './random';
import * as renderers from './renderers';
import Palette from './Palette';
import Point from './Point';
import PointList from './PointList';

module.exports = function(canvas, bgColor = "#FFF") {
  var ctx =  canvas.getContext("2d")
  var encoder;
  return {
    save: (name, fs) => {
      if (encoder) {
        encoder.createReadStream().pipe(fs.createWriteStream(name + '.gif'))
        encoder.finish()
        encoder = undefined
      } else {
        // This only makes sense while using node canvas
        canvas.createPNGStream().pipe(fs.createWriteStream(name + ".png"))
      }
    },
    defaultPalette: new Palette({color: "#000"}),
    setPalette: function(p) {
      this.defaultPalette = p
    },
    renderPoint: function(point, render, data) {
      data.point = point.toCanvasCoordinates(canvas)
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
    animate: function(GIFEncoder, opts) {
      opts = opts || {}
      encoder = new GIFEncoder(canvas.width, canvas.height)
      encoder.setRepeat(opts.repeat === undefined ? -1 : opts.repeat);
      encoder.setDelay(opts.delay || 16); // 60fps
      encoder.start()
    },
    frame: function() {
      encoder.addFrame(ctx)
    },

    // Library exports
    geometry: geometry,
    random: random,
    renderers: renderers,
    Point: Point,
    PointList: PointList,
    Palette: Palette,
  };
}
