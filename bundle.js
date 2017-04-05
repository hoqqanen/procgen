(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _random = require("../random");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Palette = function () {
    function Palette(_ref) {
        var colorList = _ref.colorList,
            probs = _ref.probs,
            color = _ref.color;

        _classCallCheck(this, Palette);

        if (color) {
            this.colorList = [color];
            this.probs = [1];
        } else if (colorList) {
            this.colorList = colorList;
            // If we have no probs we assume a uniform distribution. See next()
            this.probs = probs || null;
        } else {
            throw {
                message: "Insufficient arguments to construct a palette",
                args: arguments
            };
        }
    }

    _createClass(Palette, [{
        key: "next",
        value: function next() {
            if (this.probs) {
                return this.colorList[(0, _random.sample)(this.probs)];
            } else {
                return (0, _random.choice)(this.colorList);
            }
        }
    }, {
        key: "get",
        value: function get(x) {
            // maps [0, 1] to the color space
            return null;
        }
    }]);

    return Palette;
}();

exports.default = Palette;

},{"../random":8}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Point = function () {
    function Point(x, y) {
        _classCallCheck(this, Point);

        this.x = x;
        this.y = y;
    }

    _createClass(Point, [{
        key: "add",
        value: function add(q) {
            return new Point(this.x + q.x, this.y + q.y);
        }
    }, {
        key: "sub",
        value: function sub(q) {
            return new Point(this.x - q.x, this.y - q.y);
        }
    }, {
        key: "scale",
        value: function scale(a) {
            return new Point(this.x * a, this.y * a);
        }
    }, {
        key: "dot",
        value: function dot(q) {
            return this.x * q.x + this.y * q.y;
        }
    }, {
        key: "norm",
        value: function norm() {
            return Math.hypot(this.x, this.y);
        }
    }, {
        key: "normalize",
        value: function normalize() {
            return this.scale(1 / Math.max(this.norm(), 1e-9));
        }
    }, {
        key: "distance",
        value: function distance(q) {
            return this.sub(q).norm();
        }
    }, {
        key: "toCanvasCoordinates",
        value: function toCanvasCoordinates(canvas) {
            // Traditionally y increments going downward on canvas. 
            // We invert its sign to get the usual cartesian system.
            var yDirection = -1;

            /* The shorter direction of the canvas is exactly 1 unit.
             * Scale the longer side to be in the same units. If we don't do this
             * distances end up getting squished into different metrics.
             */
            if (canvas.width > canvas.height) {
                var aspect = canvas.height / canvas.width;
                return {
                    x: this.x * canvas.width / 2 * aspect + canvas.width / 2,
                    y: yDirection * this.y * canvas.height / 2 + canvas.height / 2
                };
            } else {
                var _aspect = canvas.width / canvas.height;
                return {
                    x: this.x * canvas.width / 2 + canvas.width / 2,
                    y: yDirection * this.y * canvas.height / 2 * _aspect + canvas.height / 2
                };
            }
        }
    }], [{
        key: "fromPolar",
        value: function fromPolar(r, theta) {
            return new Point(r * Math.cos(theta), r * Math.sin(theta));
        }
    }, {
        key: "lerp",
        value: function lerp(p, q, a) {
            return p.scale(1 - a).add(q.scale(a));
        }
    }, {
        key: "fromList",
        value: function fromList(lst) {
            if (!lst.length || lst.length != 2) {
                throw {
                    message: "Trying to make a point from a list without exactly 2 entries",
                    list: lst
                };
            } else {
                return new Point(lst[0], lst[1]);
            }
        }
    }]);

    return Point;
}();

exports.default = Point;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Point = require("../Point");

var _Point2 = _interopRequireDefault(_Point);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PointList = function () {
    function PointList(_ref) {
        var n = _ref.n,
            policy = _ref.policy,
            list = _ref.list;

        _classCallCheck(this, PointList);

        if (list) {
            // We assume the list is homogenous, and either all Points or arrays of length 2.
            this.points = list[0] instanceof _Point2.default ? list : list.map(_Point2.default.fromList);
        } else if (policy && n) {
            this.points = [];
            for (var i = 0; i < n; i++) {
                this.points.push(policy(i, this.points));
            }
        } else {
            throw {
                message: "Invalid point list constructor arguments",
                args: arguments
            };
        }
    }

    _createClass(PointList, [{
        key: "filter",
        value: function filter(policy) {
            var _this = this;

            var newList = [];
            this.points.forEach(function (e, i) {
                if (policy(e, i, _this)) {
                    newList.push(e);
                }
            });
            this.points = newList;
        }
    }, {
        key: "update",
        value: function update(updateFn) {
            this.points = updateFn(this.points);
        }
    }, {
        key: "mapUpdate",
        value: function mapUpdate(updatePoint) {
            var _this2 = this;

            var newList = [];
            this.points.forEach(function (e, i) {
                newList.push(updatePoint(e, i, _this2.points));
            });
            this.points = newList;
        }
    }]);

    return PointList;
}();

exports.default = PointList;

},{"../Point":2}],4:[function(require,module,exports){
'use strict';

var _ = require('./');

var procgen = _interopRequireWildcard(_);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

window.procgen = procgen.default;

},{"./":6}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.toCircle = toCircle;
exports.circlePoints = circlePoints;
exports.degToRad = degToRad;
exports.scale = scale;
exports.L1 = L1;
exports.Lp = Lp;
exports.norm = norm;

/* Takes an angle in radians and returns a point on the unit circle at that angle */
function toCircle(theta) {
    var r = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    // rename polarToCartesian?
    return [r * Math.cos(theta), r * Math.sin(theta)];
}

function circlePoints(n, r) {
    return Array(n).fill(1).map(function (_, i) {
        return toCircle(2 * Math.PI * i / n, r);
    });
}

function degToRad(theta) {
    return theta * Math.PI / 180;
}

function scale(vec, a) {
    return vec.map(function (v) {
        return v.length ? scale(v, a) : v * a;
    });
}

function L1(vec) {
    return vec.reduce(function (acc, v) {
        return acc + v;
    });
}

function Lp(vec, p) {
    return Math.pow(vec.reduce(function (acc, v) {
        return acc + Math.pow(v, p);
    }), 1 / p);
}

function norm(vec) {
    return Math.hypot(vec);
}

},{}],6:[function(require,module,exports){
'use strict';

var _geometry = require('./geometry');

var geometry = _interopRequireWildcard(_geometry);

var _random = require('./random');

var random = _interopRequireWildcard(_random);

var _renderers = require('./renderers');

var renderers = _interopRequireWildcard(_renderers);

var _Palette = require('./Palette');

var _Palette2 = _interopRequireDefault(_Palette);

var _Point = require('./Point');

var _Point2 = _interopRequireDefault(_Point);

var _PointList = require('./PointList');

var _PointList2 = _interopRequireDefault(_PointList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

module.exports = function (canvas) {
  var bgColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "#FFF";

  var ctx = canvas.getContext("2d");
  var encoder;
  return {
    save: function save(name, fs) {
      if (encoder) {
        encoder.createReadStream().pipe(fs.createWriteStream(name + '.gif'));
        encoder.finish();
        encoder = undefined;
      } else {
        // This only makes sense while using node canvas
        canvas.createPNGStream().pipe(fs.createWriteStream(name + ".png"));
      }
    },
    defaultPalette: new _Palette2.default({ color: "#000" }),
    setPalette: function setPalette(p) {
      this.defaultPalette = p;
    },
    renderPoint: function renderPoint(point, render, data) {
      data.point = point.toCanvasCoordinates(canvas);
      data.color = data.color || this.defaultPalette.next();
      render(ctx, data);
    },
    fillBackground: function fillBackground(color) {
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    },
    bgColor: bgColor,
    canvas: canvas,
    clear: function clear() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.fillBackground(this.bgColor);
    },
    ctx: ctx,
    animate: function animate(GIFEncoder, opts) {
      opts = opts || {};
      encoder = new GIFEncoder(canvas.width, canvas.height);
      encoder.setRepeat(opts.repeat === undefined ? -1 : opts.repeat);
      encoder.setDelay(opts.delay || 16); // 60fps
      encoder.start();
    },
    frame: function frame() {
      encoder.addFrame(ctx);
    },

    // Library exports
    geometry: geometry,
    random: random,
    renderers: renderers,
    Point: _Point2.default,
    PointList: _PointList2.default,
    Palette: _Palette2.default
  };
};

},{"./Palette":1,"./Point":2,"./PointList":3,"./geometry":5,"./random":8,"./renderers":9}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.sum = sum;
exports.cumulativeSum = cumulativeSum;

/*
Adds two arrays of scalars of the same length.
TODO: extend to arbitrary shapes
*/
function sum(a, b) {
    // TODO: assert a and b are same shape
    return a.map(function (v, i) {
        return v + b[i];
    });
}

/**
 * Given [x0, x1, x2, ...] returns an array of [x0, x0+x1, x0+x1+x2, ...]
 * @param {[number]} values
 */
function cumulativeSum(values) {
    var r = [];
    values.reduce(function (acc, v) {
        r.push(acc);
        return acc.length ? sum(acc, v) : acc + v;
    });
    return r;
}

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.rand = rand;
exports.sample = sample;
exports.choice = choice;
exports.uniform = uniform;
exports.uniformDiscrete = uniformDiscrete;
exports.walk1d = walk1d;
exports.walk2d = walk2d;

var _math = require('../math');

var _geometry = require('../geometry');

function rand(low, high) {
    return Math.random() * (high - low) + low;
}

/**
 * Samples from a discrete probability distribution
 * Note that the distribution need not sum to 1.
 * @param {[number]} pList 
 */
function sample(pList) {
    // TODO: More efficient implementation.
    var cumulativeP = (0, _math.cumulativeSum)(pList);
    var normalizer = cumulativeP[cumulativeP.length - 1];
    var distribution = cumulativeP.map(function (x) {
        return x / normalizer;
    });
    var draw = Math.random();
    return distribution.indexOf(distribution.find(function (x) {
        return x > draw;
    }));
}

/**
 * Samples from a uniform discrete probability distribution
 * @param {Array} lst
 */
function choice(lst) {
    return lst[Math.floor(Math.random() * lst.length)];
}

function uniform(shape) {
    var low = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;
    var high = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

    if (shape.length === 0) {
        return rand(low, high);
    } else {
        var r = [];
        for (var i = 0; i < shape[0]; i++) {
            r[i] = uniform(shape.slice(1), low, high);
        }
        return r;
    }
}

function uniformDiscrete(n, values) {
    // TODO: Support other shapes
    var continuous = uniform([n], 0, values.length);
    return continuous.map(function (c) {
        return values[Math.floor(c)];
    });
}

function walk1d(n, _ref) {
    var _ref$step = _ref.step,
        step = _ref$step === undefined ? 1 : _ref$step,
        _ref$start = _ref.start,
        start = _ref$start === undefined ? 0 : _ref$start,
        _ref$stepScale = _ref.stepScale,
        stepScale = _ref$stepScale === undefined ? 1 : _ref$stepScale;

    return (0, _math.cumulativeSum)([start].concat(uniformDiscrete(n, [-step, step])));
}

function walk2d(n, _ref2) {
    var _ref2$steps = _ref2.steps,
        steps = _ref2$steps === undefined ? [[-1, 0], [0, -1], [1, 0], [0, 1]] : _ref2$steps,
        _ref2$start = _ref2.start,
        start = _ref2$start === undefined ? [0, 0] : _ref2$start,
        _ref2$stepScale = _ref2.stepScale,
        stepScale = _ref2$stepScale === undefined ? 1 : _ref2$stepScale;

    return (0, _math.cumulativeSum)([start].concat(uniformDiscrete(n, (0, _geometry.scale)(steps, stepScale))));
}

},{"../geometry":5,"../math":7}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.circle = circle;
function circle(ctx, _ref) {
    var _ref$point = _ref.point,
        x = _ref$point.x,
        y = _ref$point.y,
        _ref$radius = _ref.radius,
        radius = _ref$radius === undefined ? 1 : _ref$radius,
        _ref$color = _ref.color,
        color = _ref$color === undefined ? "#000" : _ref$color;

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
}

},{}]},{},[4]);
