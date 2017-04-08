import * as geometry from './geometry';
import * as random from './random';
import * as renderers from './renderers';
import Palette from './Palette';
import Point from './Point';
import PointList from './PointList';

module.exports = function(canvas, bgColor = "#FFF") {
  var ctx =  canvas.getContext("2d")
  var encoder;
  var imageData = ctx.getImageData(0,0, canvas.width, canvas.height);
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
      this.renderPoints([point], render, data)
    },
    renderPoints: function(points, render, data) {
      var d = typeof data === "function" ? data(points) : data
      d.points = points.map(p => p.toCanvasCoordinates(canvas))
      d.color = d.color || this.defaultPalette.next()
      render(ctx, d)
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
    animate: function(GIFEncoder, {repeat = -1, delay = 16 /*60 fps*/}) {
      encoder = new GIFEncoder(canvas.width, canvas.height)
      encoder.setRepeat(repeat);
      encoder.setDelay(delay);
      encoder.start()
    },
    frame: function() {
      encoder.addFrame(ctx)
    },
    runShader: function(s) {
      const W = canvas.width
      const H = canvas.height
      var L = imageData.data.length
      var data = imageData.data
      var newData = ctx.createImageData(W, H);
      for (var i = 0; i < L; i += 4) {
        var isBoundary = i < 4*W || i > L - 4*W || i % (4*W) === 0 || i % (4*W) === 4*W - 1
        var v = s(data, i, W, H, isBoundary)
        newData.data[i] = v[0]
        newData.data[i+1] = v[1]
        newData.data[i+2] = v[2]
        newData.data[i+3] = v[3]
      }
      imageData.data.set(newData.data)
      ctx.putImageData(imageData, 0, 0);
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
