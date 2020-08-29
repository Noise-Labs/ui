(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Nexus"] = factory();
	else
		root["Nexus"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var NexusUI = _interopRequire(__webpack_require__(1));
	
	module.exports = NexusUI;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	exports.colors = colors;
	exports.context = context;
	exports.clock = clock;
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	"use strict";
	
	var Interfaces = _interopRequire(__webpack_require__(2));
	
	var math = _interopRequire(__webpack_require__(5));
	
	var Rack = _interopRequire(__webpack_require__(38));
	
	var Tune = _interopRequire(__webpack_require__(40));
	
	var Transform = _interopRequireWildcard(__webpack_require__(39));
	
	var Counter = __webpack_require__(28);
	var Radio = __webpack_require__(41);
	var Drunk = __webpack_require__(27);
	var Sequence = __webpack_require__(26);
	var Matrix = __webpack_require__(25);
	
	var WAAClock = _interopRequire(__webpack_require__(42));
	
	var Interval = _interopRequire(__webpack_require__(29));
	
	var DefaultContext = window.AudioContext || window.webkitAudioContext;
	
	function unlockAudioContext(audioContext) {
	  var events = ["touchstart", "touchend", "mousedown", "keydown"];
	
	  function unlock() {
	    events.forEach(function (eventName) {
	      return document.body.removeEventListener(eventName, unlock);
	    });
	    if (audioContext.state === "suspended") {
	      console.log("Audio context - unlocked ...");
	      audioContext.resume();
	    }
	  }
	
	  if (audioContext.state === "suspended") {
	    console.log("Audio context - suspended until user interaction ...");
	    events.forEach(function (eventName) {
	      document.body.addEventListener(eventName, unlock, false);
	    });
	  }
	}
	
	/**
	NexusUI => created as Nexus
	*/
	
	var NexusUI = (function () {
	  function NexusUI(context) {
	    _classCallCheck(this, NexusUI);
	
	    for (var key in Interfaces) {
	      this[key] = Interfaces[key];
	    }
	
	    for (var key in math) {
	      this[key] = math[key];
	    }
	
	    var Core = {
	      Rack: Rack
	    };
	
	    var Models = {
	      Counter: Counter,
	      Radio: Radio,
	      Drunk: Drunk,
	      Sequence: Sequence,
	      Matrix: Matrix
	    };
	
	    for (var key in Models) {
	      this[key] = Models[key];
	    }
	
	    for (var key in Core) {
	      this[key] = Core[key];
	    }
	
	    this._context = context;
	
	    this.tune = new Tune();
	    this.note = this.tune.note.bind(this.tune);
	
	    this._clock = null;
	    this.Interval = Interval;
	
	    this.colors = {
	      accent: "#2bb",
	      fill: "#eee",
	      light: "#fff",
	      dark: "#333",
	      mediumLight: "#ccc",
	      mediumDark: "#666"
	    };
	
	    this.transform = Transform;
	    this.add = Transform.add;
	
	    this.Add = {};
	    for (var key in Interfaces) {
	      this.Add[key] = Transform.add.bind(this, key);
	    }
	
	    /* create default component size */
	    /* jshint ignore:start */
	    var existingStylesheets = document.getElementsByTagName("style");
	    var defaultSizeDeclaration = "[nexus-ui]{height:5000px;width:5000px}";
	    var defaultStyleNode = document.createElement("style");
	    defaultStyleNode.type = "text/css";
	    defaultStyleNode.innerHTML = defaultSizeDeclaration;
	    if (existingStylesheets.length > 0) {
	      var parent = existingStylesheets[0].parentNode;
	      parent.insertBefore(defaultStyleNode, existingStylesheets[0]);
	    } else {
	      document.write("<style>" + defaultSizeDeclaration + "</style>");
	    }
	    /* jshint ignore:end */
	  }
	
	  _createClass(NexusUI, {
	    context: {
	      get: function () {
	        if (!this._context) {
	          this._context = new DefaultContext();
	        }
	        return this._context;
	      },
	      set: function (ctx) {
	        if (this._clock) {
	          this._clock.stop();
	          this._clock = null;
	        }
	
	        this._context = ctx;
	        unlockAudioContext(ctx);
	      }
	    },
	    clock: {
	      get: function () {
	        if (!this._clock) {
	          this._clock = new WAAClock(this.context);
	          this._clock.start();
	        }
	        return this._clock;
	      }
	    }
	  });
	
	  return NexusUI;
	})();
	
	var Nexus = new NexusUI();
	
	function colors() {
	  return Nexus.colors;
	}
	
	function context() {
	  return Nexus.context;
	}
	
	function clock() {
	  return Nexus.clock;
	}
	
	exports["default"] = Nexus;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = {
	  Position: __webpack_require__(3),
	  Slider: __webpack_require__(14),
	  Toggle: __webpack_require__(15),
	  /*  Range: require('./rangeslider'),
	    Waveform: require('./waveform'), */
	  Button: __webpack_require__(16),
	  TextButton: __webpack_require__(18),
	  RadioButton: __webpack_require__(19),
	  Number: __webpack_require__(20),
	  Select: __webpack_require__(21),
	  Dial: __webpack_require__(22),
	  Piano: __webpack_require__(23),
	  Sequencer: __webpack_require__(24),
	  Pan2D: __webpack_require__(30),
	  Tilt: __webpack_require__(31),
	  Multislider: __webpack_require__(32),
	  Pan: __webpack_require__(33),
	  Envelope: __webpack_require__(34),
	  Spectrogram: __webpack_require__(35),
	  Meter: __webpack_require__(36),
	  Oscilloscope: __webpack_require__(37)
	};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	
	"use strict";
	
	var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var svg = __webpack_require__(4);
	var Interface = __webpack_require__(6);
	var Step = __webpack_require__(11);
	
	var Interaction = _interopRequireWildcard(__webpack_require__(12));
	
	/**
	* Position
	*
	* @description Two-dimensional touch slider.
	*
	* @demo <span nexus-ui="position"></span>
	*
	* @example
	* var position = new Nexus.Position('#target')
	*
	* @example
	* var position = new Nexus.Position('#target',{
	*   'size': [200,200],
	*   'mode': 'absolute',  // "absolute" or "relative"
	*   'x': 0.5,  // initial x value
	*   'minX': 0,
	*   'maxX': 1,
	*   'stepX': 0,
	*   'y': 0.5,  // initial y value
	*   'minY': 0,
	*   'maxY': 1,
	*   'stepY': 0
	* })
	*
	* @output
	* change
	* Fires any time the interface's value changes. <br>
	* The event data is an object with x and y properties containing the x and y values of the interface.
	*
	* @outputexample
	* position.on('change',function(v) {
	*   console.log(v);
	* })
	*
	*
	*/
	
	var Position = (function (_Interface) {
	  function Position() {
	    _classCallCheck(this, Position);
	
	    var options = ["value"];
	
	    var defaults = {
	      size: [200, 200],
	      mode: "absolute",
	      minX: 0,
	      maxX: 1,
	      stepX: 0,
	      x: 0.5,
	      minY: 0,
	      maxY: 1,
	      stepY: 0,
	      y: 0.5
	    };
	
	    _get(Object.getPrototypeOf(Position.prototype), "constructor", this).call(this, arguments, options, defaults);
	
	    this._x = new Step(this.settings.minX, this.settings.maxX, this.settings.stepX, this.settings.x);
	    this._y = new Step(this.settings.minY, this.settings.maxY, this.settings.stepY, this.settings.y);
	
	    this.position = {
	      x: new Interaction.Handle(this.settings.mode, "horizontal", [0, this.width], [this.height, 0]),
	      y: new Interaction.Handle(this.settings.mode, "vertical", [0, this.width], [this.height, 0])
	    };
	    this.position.x.value = this._x.normalized;
	    this.position.y.value = this._y.normalized;
	
	    this.init();
	    this.render();
	  }
	
	  _inherits(Position, _Interface);
	
	  _createClass(Position, {
	    buildInterface: {
	      value: function buildInterface() {
	
	        this.knob = svg.create("circle");
	        this.element.appendChild(this.knob);
	      }
	    },
	    sizeInterface: {
	      value: function sizeInterface() {
	
	        this.position.x.resize([0, this.width], [this.height, 0]);
	        this.position.y.resize([0, this.width], [this.height, 0]);
	
	        this._minDimension = Math.min(this.width, this.height);
	
	        this.knobRadius = {
	          off: ~ ~(this._minDimension / 100) * 5 + 5 };
	        this.knobRadius.on = this.knobRadius.off * 2;
	
	        this.knob.setAttribute("cx", this.width / 2);
	        this.knob.setAttribute("cy", this.height / 2);
	        this.knob.setAttribute("r", this.knobRadius.off);
	      }
	    },
	    colorInterface: {
	      value: function colorInterface() {
	        this.element.style.backgroundColor = this.colors.fill;
	        this.knob.setAttribute("fill", this.colors.accent);
	      }
	    },
	    render: {
	      value: function render() {
	        if (this.clicked) {
	          //  this.knobRadius = 30;
	          this.knob.setAttribute("r", this.knobRadius.on);
	        } else {
	          //  this.knobRadius = 15;
	          this.knob.setAttribute("r", this.knobRadius.off);
	        }
	
	        this.knobCoordinates = {
	          x: this._x.normalized * this.width,
	          y: this.height - this._y.normalized * this.height
	        };
	
	        this.knob.setAttribute("cx", this.knobCoordinates.x);
	        this.knob.setAttribute("cy", this.knobCoordinates.y);
	      }
	    },
	    click: {
	      value: function click() {
	        this.position.x.anchor = this.mouse;
	        this.position.y.anchor = this.mouse;
	        this.move();
	      }
	    },
	    move: {
	      value: function move() {
	        if (this.clicked) {
	          this.position.x.update(this.mouse);
	          this.position.y.update(this.mouse);
	          this._x.updateNormal(this.position.x.value);
	          this._y.updateNormal(this.position.y.value);
	          this.emit("change", {
	            x: this._x.value,
	            y: this._y.value
	          });
	          this.render();
	        }
	      }
	    },
	    release: {
	      value: function release() {
	        this.render();
	      }
	    },
	    x: {
	
	      /**
	      * The interface's x value. When set, it will automatically adjust to fit min/max/step settings of the interface.
	      * @type {object}
	      * @example position.x = 0.5;
	      */
	
	      get: function () {
	        return this._x.value;
	      },
	      set: function (value) {
	        this._x.update(value);
	        this.emit("change", {
	          x: this._x.value,
	          y: this._y.value
	        });
	        this.render();
	      }
	    },
	    y: {
	
	      /**
	      * The interface's y values. When set, it will automatically adjust to fit min/max/step settings of the interface.
	      * @type {object}
	      * @example position.x = 0.5;
	      */
	
	      get: function () {
	        return this._y.value;
	      },
	      set: function (value) {
	        this._y.update(value);
	        this.emit("change", {
	          x: this._x.value,
	          y: this._y.value
	        });
	        this.render();
	      }
	    },
	    normalized: {
	      get: function () {
	        return {
	          x: this._x.normalized,
	          y: this._y.normalized
	        };
	      }
	    },
	    minX: {
	
	      /**
	      * The lower limit of value on the x axis
	      * @type {object}
	      */
	
	      get: function () {
	        return this._x.min;
	      },
	      set: function (v) {
	        this._x.min = v;
	        this.render();
	      }
	    },
	    minY: {
	
	      /**
	      * The lower limit of value on the y axis
	      * @type {object}
	      */
	
	      get: function () {
	        return this._y.min;
	      },
	      set: function (v) {
	        this._y.min = v;
	        this.render();
	      }
	    },
	    maxX: {
	
	      /**
	      * The upper limit of value on the x axis
	      * @type {object}
	      */
	
	      get: function () {
	        return this._x.max;
	      },
	      set: function (v) {
	        this._x.max = v;
	        this.render();
	      }
	    },
	    maxY: {
	
	      /**
	      * The upper limit of value on the y axis
	      * @type {object}
	      */
	
	      get: function () {
	        return this._y.max;
	      },
	      set: function (v) {
	        this._y.max = v;
	        this.render();
	      }
	    },
	    stepX: {
	
	      /**
	      * The incremental step of values on the x axis
	      * @type {object}
	      */
	
	      get: function () {
	        return this._x.step;
	      },
	      set: function (v) {
	        this._x.step = v;
	        this.render();
	      }
	    },
	    stepY: {
	
	      /**
	      * The incremental step of values on the y axis
	      * @type {object}
	      */
	
	      get: function () {
	        return this._y.step;
	      },
	      set: function (v) {
	        this._y.step = v;
	        this.render();
	      }
	    },
	    mode: {
	
	      /**
	      Absolute mode (position's value jumps to mouse click position) or relative mode (mouse drag changes value relative to its current position). Default: "absolute".
	      @type {string}
	      @example position.mode = "relative";
	      */
	
	      get: function () {
	        return this.position.x.mode;
	      },
	      set: function (v) {
	        this.position.x.mode = v;
	        this.position.y.mode = v;
	      }
	    }
	  });
	
	  return Position;
	})(Interface);
	
	module.exports = Position;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var math = __webpack_require__(5);
	
	module.exports = {
	
	  create: function (type) {
	    return document.createElementNS("http://www.w3.org/2000/svg", type);
	  },
	
	  arc: function (x, y, radius, startAngle, endAngle) {
	
	    var start = math.toCartesian(radius, endAngle);
	    var end = math.toCartesian(radius, startAngle);
	
	    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
	
	    var d = ["M", start.x + x, start.y + y, "A", radius, radius, 0, largeArcFlag, 0, end.x + x, end.y + y].join(" ");
	
	    return d;
	  },
	
	  radialGradient: function (defs, numberOfStops) {
	
	    var id = "gradient" + math.ri(100000000000);
	    var stops = [];
	
	    var gradient = document.createElementNS("http://www.w3.org/2000/svg", "radialGradient");
	    gradient.setAttribute("id", id);
	    gradient.setAttribute("cx", "50%");
	    gradient.setAttribute("cy", "50%");
	    gradient.setAttribute("r", "50%");
	
	    defs.appendChild(gradient);
	
	    for (var i = 0; i < numberOfStops; i++) {
	      var _stop = document.createElementNS("http://www.w3.org/2000/svg", "stop");
	      _stop.setAttribute("id", "stop" + i);
	      //stop.setAttribute('offset', '70%');
	      //stop.setAttribute('stop-color', 'White');
	      gradient.appendChild(_stop);
	      stops.push(_stop);
	    }
	
	    return {
	      id: id,
	      stops: stops,
	      element: gradient
	    };
	  }
	
	};

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	"use strict";
	
	/**
	 * Limit a number to within a minimum and maximum
	 * @param  {number} value Input value
	 * @param  {number} min   Lower limit
	 * @param  {number} max   Upper limit
	 * @return {number}       The input value constrained within the lower and upper limits
	 * @example
	 * Nexus.clip(11,0,10)   // returns 10
	 * Nexus.clip(-1,0,10)   // returns 0
	 * Nexus.clip(5,0,10)    // returns 5
	 */
	
	exports.clip = function (value, min, max) {
	  return Math.min(Math.max(value, min), max);
	};
	
	exports.normalize = function (value, min, max) {
	  return (value - min) / (max - min);
	};
	
	/**
	 * Scale a value from one range to another range.
	 * @param  {number} inNum  Input value
	 * @param  {number} inMin  Input range minimum
	 * @param  {number} inMax  Input range maximum
	 * @param  {number} outMin Output range minimum
	 * @param  {number} outMax Output range maximum
	 * @return {number}        The input value scaled to its new range
	 * @example
	 * Nexus.scale(0.5,0,1,0,10)   // returns 5
	 * Nexus.scale(0.9,0,1,1,0)    // returns 0.1
	 */
	exports.scale = function (inNum, inMin, inMax, outMin, outMax) {
	  if (inMin === inMax) {
	    return outMin;
	  }
	  return (inNum - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
	};
	
	exports.toPolar = function (x, y) {
	  var r = Math.sqrt(x * x + y * y);
	
	  var theta = Math.atan2(y, x);
	  if (theta < 0) {
	    theta = theta + 2 * Math.PI;
	  }
	  return { radius: r, angle: theta };
	};
	
	exports.toCartesian = function (radius, angle) {
	  var cos = Math.cos(angle);
	  var sin = Math.sin(angle);
	  return { x: radius * cos, y: radius * sin * -1 };
	};
	/*
	exports.polarToCartesian(centerX, centerY, radius, angleInDegrees) {
	  var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;
	
	  return {
	    x: centerX + (radius * Math.cos(angleInRadians)),
	    y: centerY + (radius * Math.sin(angleInRadians))
	  };
	}  */
	
	exports.prune = function (data, scale) {
	  return parseFloat(data.toFixed(scale));
	};
	
	exports.invert = function (inNum) {
	  return exports.scale(inNum, 1, 0, 0, 1);
	};
	
	/**
	 * Convert a MIDi note number to a frequency value in equal temperament.
	 * @param  {number} midi MIDI note value
	 * @return {number}      Frequence value
	 * @example
	 * Nexus.mtof(60)  // returns the frequency number of Middle C
	 */
	exports.mtof = function (midi) {
	  return Math.pow(2, (midi - 69) / 12) * 440;
	};
	
	/**
	 * Interpolate between two numbers
	 * @param  {number} loc Interpolation index (0-1)
	 * @param  {number} min Lower value
	 * @param  {number} max Upper value
	 * @return {number}     Interpolated value
	 * @example
	 * Nexus.interp(0.5,2,4)   // returns 3
	 * Nexus.interp(0.1,0,10)     // returns 1
	 */
	exports.interp = function (loc, min, max) {
	  return loc * (max - min) + min;
	};
	
	/**
	 * Return a random choice from a list of arguments
	 * @return {various} One random argument
	 * @example
	 * Nexus.pick(1,2,3,4)   // returns 1, 2, 3, or 4
	 * Nexus.pick(function1,function2)   // returns either function1 or function2
	 */
	exports.pick = function () {
	  return arguments[~ ~(Math.random() * arguments.length)];
	};
	
	/**
	 * Returns an octave multiplier for frequency values
	 * @param  {number} num Relative octave number (e.g. -1 for one octave down, 1 for one octave up)
	 * @return {number}     Octave multiplier
	 * @example
	 * Nexus.octave(-1)  // returns 0.5
	 * Nexus.octave(0)   // returns 1
	 * Nexus.octave(1)   // returns 2
	 * Nexus.octave(2)   // returns 4
	 */
	exports.octave = function (num) {
	  return Math.pow(2, num);
	};
	
	/**
	 * Random integer generator. If no second argument is given, will return random integer from 0 to bound1.
	 * @param  {number} bound1 Minimum random value
	 * @param  {number} bound2 Maximum random value
	 * @return {number}        Random integer between lower and upper boundary
	 * @example
	 * Nexus.ri(10)    // returns random int from 0 to 10
	 * Nexus.ri(20,2000) // returns random int from 20 to 2000
	 */
	exports.ri = function (bound1, bound2) {
	  if (!bound2) {
	    bound2 = bound1;
	    bound1 = 0;
	  }
	  var low = Math.min(bound1, bound2);
	  var high = Math.max(bound1, bound2);
	  return Math.floor(Math.random() * (high - low) + low);
	};
	
	/**
	 * Random float number generator. If no second argument is given, will return random float from 0 to bound1.
	 * @param  {number} bound1 Minimum random value
	 * @param  {number} bound2 Maximum random value
	 * @return {number}        Random float between lower and upper boundary
	 * @example
	 * Nexus.rf(1)    // returns random float from 0 to 1
	 * Nexus.rf(1,2) // returns random float from 1 to 2
	 */
	exports.rf = function (bound1, bound2) {
	  if (!bound2) {
	    bound2 = bound1;
	    bound1 = 0;
	  }
	  var low = Math.min(bound1, bound2);
	  var high = Math.max(bound1, bound2);
	  return Math.random() * (high - low) + low;
	};
	
	exports.cycle = function (input, min, max) {
	  input++;
	  if (input >= max) {
	    input = min;
	  }
	  return input;
	};
	
	/**
	 * Average an array of numbers
	 * @param  {Array} data Array of numbers to average
	 * @return {number}      Average of the input data
	 * @example
	 * Nexus.average([0,2,4,6,8,10])   // returns 5
	 */
	exports.average = function (data) {
	  var total = 0;
	  for (var i = 0; i < data.length; i++) {
	    total += data[i];
	  }
	  return total / data.length;
	};
	
	/**
	 * Get the distance from one (x,y) point to another (x,y) point
	 * @param  {number} x1 x of first point
	 * @param  {number} y1 y of first point
	 * @param  {number} x2 x of second point
	 * @param  {number} y2 y of second poiny
	 * @return {number}    Distance
	 * @example
	 * Nexus.distance(0,0,3,4)   // returns 5
	 */
	exports.distance = function (x1, y1, x2, y2) {
	  var a = x1 - x2;
	  var b = y1 - y2;
	  return Math.sqrt(a * a + b * b);
	};
	
	exports.gainToDB = function (gain) {
	  return 20 * Math.log10(gain);
	};
	
	/**
	 * Flip a coin, returning either 0 or 1 according to a probability
	 * @param  {number} [odds=0.5] Likelihood of returning 1
	 * @return {number}            1 or 0
	 * @example
	 * Nexus.coin(0.1)   // returns 1 (10% of the time) or 0 (90% of the time)
	 */
	exports.coin = function () {
	  var odds = arguments[0] === undefined ? 0.5 : arguments[0];
	
	  if (exports.rf(0, 1) < odds) {
	    return 1;
	  } else {
	    return 0;
	  }
	};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var svg = __webpack_require__(4);
	var dom = __webpack_require__(7);
	var util = __webpack_require__(8);
	var touch = __webpack_require__(9);
	var EventEmitter = __webpack_require__(10);
	
	var colors = __webpack_require__(1).colors;
	
	/**
	Interface
	*/
	
	var Interface = (function (_EventEmitter) {
	  function Interface(args, options, defaults) {
	    _classCallCheck(this, Interface);
	
	    _get(Object.getPrototypeOf(Interface.prototype), "constructor", this).call(this);
	    this.type = this.constructor.name;
	    this.settings = this.parseSettings(args, options, defaults);
	    this.mouse = {};
	    this.wait = false;
	    this.colors = {};
	    var defaultColors = colors(); // jshint ignore:line
	    this.colors.accent = defaultColors.accent;
	    this.colors.fill = defaultColors.fill;
	    this.colors.light = defaultColors.light;
	    this.colors.dark = defaultColors.dark;
	    this.colors.mediumLight = defaultColors.mediumLight;
	    this.colors.mediumDark = defaultColors.mediumDark;
	  }
	
	  _inherits(Interface, _EventEmitter);
	
	  _createClass(Interface, {
	    parseSettings: {
	      value: function parseSettings(args, options, defaults) {
	
	        options.unshift("target");
	        defaults.defaultSize = defaults.size.splice(0, 2);
	        defaults.size = false;
	
	        var settings = {
	          target: document.body,
	          colors: {}, // should inherit from a colors module,
	          snapWithParent: true,
	          event: function event() {},
	          component: false
	        };
	
	        for (var key in defaults) {
	          settings[key] = defaults[key];
	        }
	
	        for (var i = 0; i < args.length; i++) {
	          // grabs the next argument
	          var setting = args[i];
	          // if it's an object, it must be the settings object
	          if (util.isObject(setting)) {
	            for (var key in setting) {
	              settings[key] = setting[key];
	            }
	            // if it's a function, it must be the event setting
	          } else if (typeof setting === "function") {
	            settings.event = setting;
	            // otherwise, consider it one of the widget's custom options
	          } else if (options.length >= 1) {
	            // grab the first option -- i.e. 'target'
	            var key = options.splice(0, 1)[0];
	            settings[key] = setting;
	          }
	        }
	
	        /*  handle common settings  */
	
	        // target
	        this.parent = dom.parseElement(settings.target);
	
	        // nexus-ui attribute
	        if (this.parent && this.parent instanceof HTMLElement && !settings.component) {
	          if (!this.parent.hasAttribute("nexus-ui")) {
	            this.parent.setAttribute("nexus-ui", "");
	          }
	        }
	
	        // size
	
	        if (settings.size && Array.isArray(settings.size) && settings.snapWithParent) {
	          this.width = settings.size[0];
	          this.height = settings.size[1];
	          this.parent.style.width = this.width + "px";
	          this.parent.style.height = this.height + "px";
	        } else if (settings.snapWithParent && !settings.component) {
	
	          this.width = parseFloat(window.getComputedStyle(this.parent, null).getPropertyValue("width").replace("px", ""));
	          this.height = parseFloat(window.getComputedStyle(this.parent, null).getPropertyValue("height").replace("px", ""));
	
	          if (this.width == 5000) {
	            this.width = settings.defaultSize[0];
	            this.parent.style.width = this.parent.width = this.width + "px";
	          }
	          if (this.height == 5000) {
	            this.height = settings.defaultSize[1];
	            this.parent.style.height = this.parent.height = this.height + "px";
	          }
	        } else {
	          settings.size = settings.defaultSize;
	          this.width = settings.size[0];
	          this.height = settings.size[1];
	        }
	
	        // event
	        if (settings.event) {
	          this.event = this.on("change", settings.event);
	        } else {
	          this.event = false;
	        }
	
	        return settings;
	      }
	    },
	    init: {
	      value: function init() {
	        this.buildFrame();
	        this.buildInterface();
	        this.sizeInterface();
	        this.attachListeners();
	        this.colorInterface();
	        this.finalTouches();
	      }
	    },
	    buildFrame: {
	      value: function buildFrame() {
	        this.element = svg.create("svg");
	        this.element.setAttribute("width", this.width);
	        this.element.setAttribute("height", this.height);
	        this.parent.appendChild(this.element);
	      }
	    },
	    buildInterface: {
	      value: function buildInterface() {}
	    },
	    sizeInterface: {
	      value: function sizeInterface() {}
	    },
	    colorInterface: {
	      value: function colorInterface() {}
	    },
	    attachListeners: {
	      value: function attachListeners() {
	        var _this = this;
	
	        this.interactionTarget = this.interactionTarget || this.element;
	
	        // Setup interaction
	        if (touch.exists) {
	          this.interactionTarget.addEventListener("touchstart", function (evt) {
	            return _this.preTouch(evt);
	          });
	          this.interactionTarget.addEventListener("touchmove", function (evt) {
	            return _this.preTouchMove(evt);
	          });
	          this.interactionTarget.addEventListener("touchend", function (evt) {
	            return _this.preTouchRelease(evt);
	          });
	        }
	        this.boundPreMove = function (evt) {
	          return _this.preMove(evt);
	        };
	        this.boundPreRelease = function (evt) {
	          return _this.preRelease(evt);
	        };
	        this.interactionTarget.addEventListener("mousedown", function (evt) {
	          return _this.preClick(evt);
	        });
	      }
	    },
	    finalTouches: {
	      value: function finalTouches() {
	        this.element.style.cursor = "pointer";
	      }
	    },
	    preClick: {
	      value: function preClick(e) {
	        // 10000 getComputedStyle calls takes 100 ms.
	        // .:. one takes about .01ms
	        if (this.element instanceof HTMLElement) {
	          this.width = window.getComputedStyle(this.element, null).getPropertyValue("width").replace("px", "");
	        }
	        // 10000 getComputedStyle calls takes 40 ms.
	        // .:. one takes about .004ms
	        this.offset = dom.findPosition(this.element);
	        this.mouse = dom.locateMouse(e, this.offset);
	        this.clicked = true;
	        this.click();
	        this.moveEvent = document.addEventListener("mousemove", this.boundPreMove);
	        this.releaseEvent = document.addEventListener("mouseup", this.boundPreRelease);
	        this.emit("click");
	        e.preventDefault();
	        e.stopPropagation();
	      }
	    },
	    preMove: {
	      value: function preMove(e) {
	        var _this = this;
	
	        if (!this.wait) {
	          this.mouse = dom.locateMouse(e, this.offset);
	          this.move();
	          this.wait = true;
	          setTimeout(function () {
	            _this.wait = false;
	          }, 25);
	        }
	        e.preventDefault();
	        e.stopPropagation();
	      }
	    },
	    preRelease: {
	      value: function preRelease(e) {
	        this.mouse = dom.locateMouse(e, this.offset);
	        this.clicked = false;
	        this.release();
	        this.emit("release");
	        document.removeEventListener("mousemove", this.boundPreMove);
	        document.removeEventListener("mouseup", this.boundPreRelease);
	        e.preventDefault();
	        e.stopPropagation();
	      }
	    },
	    click: {
	      value: function click() {}
	    },
	    move: {
	      value: function move() {}
	    },
	    release: {
	      value: function release() {}
	    },
	    preTouch: {
	
	      /* touch */
	
	      value: function preTouch(e) {
	        if (this.element instanceof HTMLElement) {
	          this.width = window.getComputedStyle(this.element, null).getPropertyValue("width").replace("px", "");
	        }
	        this.offset = dom.findPosition(this.element);
	        this.mouse = dom.locateTouch(e, this.offset);
	        this.clicked = true;
	        this.touch(e);
	        this.emit("click");
	        e.preventDefault();
	        e.stopPropagation();
	      }
	    },
	    preTouchMove: {
	      value: function preTouchMove(e) {
	        if (this.clicked) {
	          this.mouse = dom.locateTouch(e, this.offset);
	          this.touchMove();
	          e.preventDefault();
	          e.stopPropagation();
	        }
	      }
	    },
	    preTouchRelease: {
	      value: function preTouchRelease(e) {
	        this.mouse = dom.locateTouch(e, this.offset);
	        this.clicked = false;
	        this.touchRelease();
	        this.emit("release");
	        e.preventDefault();
	        e.stopPropagation();
	      }
	    },
	    touch: {
	      value: function touch() {
	        this.click();
	      }
	    },
	    touchMove: {
	      value: function touchMove() {
	        this.move();
	      }
	    },
	    touchRelease: {
	      value: function touchRelease() {
	        this.release();
	      }
	    },
	    resize: {
	
	      /**
	      * Resize the interface
	      * @param width {number} New width in pixels
	      * @param height {number} New height in pixels
	      *
	      * @example
	      * button.resize(100,100);
	      */
	
	      value: function resize(width, height) {
	        this.width = width;
	        this.height = height;
	        this.parent.style.width = this.width + "px";
	        this.parent.style.height = this.height + "px";
	        this.element.setAttribute("width", this.width);
	        this.element.setAttribute("height", this.height);
	        this.sizeInterface();
	      }
	    },
	    empty: {
	      value: function empty() {
	        while (this.element.lastChild) {
	          this.element.removeChild(this.element.lastChild);
	        }
	      }
	    },
	    destroy: {
	
	      /**
	      * Remove the interface from the page and cancel its event listener(s).
	      *
	      * @example
	      * button.destroy();
	      */
	
	      value: function destroy() {
	        this.empty();
	        this.parent.removeChild(this.element);
	        this.removeAllListeners();
	        if (this.instrument) {
	          delete this.instrument[this.id];
	        }
	        this.customDestroy();
	      }
	    },
	    customDestroy: {
	      value: function customDestroy() {}
	    },
	    colorize: {
	      value: function colorize(type, color) {
	        this.colors[type] = color;
	        this.colorInterface();
	      }
	    }
	  });
	
	  return Interface;
	})(EventEmitter);
	
	module.exports = Interface;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	"use strict";
	
	exports.findPosition = function (el) {
	  var viewportOffset = el.getBoundingClientRect();
	  var top = viewportOffset.top + window.scrollY;
	  var left = viewportOffset.left + window.scrollX;
	  return { top: top, left: left };
	};
	
	exports.parseElement = function (parent) {
	  if (typeof parent === "string") {
	    parent = document.getElementById(parent.replace("#", ""));
	  }
	
	  if (parent instanceof HTMLElement || parent instanceof SVGElement) {
	    return parent;
	  } else {
	    return "No valid parent argument";
	  }
	};
	
	exports.locateMouse = function (e, offset) {
	  return {
	    x: e.pageX - offset.left,
	    y: e.pageY - offset.top
	  };
	};
	
	exports.locateTouch = function (e, offset) {
	  return {
	    x: e.targetTouches.length ? e.targetTouches[0].pageX - offset.left : false,
	    y: e.targetTouches.length ? e.targetTouches[0].pageY - offset.top : false
	  };
	};
	
	exports.SmartCanvas = function (parent) {
	  var _this = this;
	
	  this.element = document.createElement("canvas");
	  this.context = this.element.getContext("2d");
	  parent.appendChild(this.element);
	
	  this.resize = function (w, h) {
	    _this.element.width = w * 2;
	    _this.element.height = h * 2;
	    _this.element.style.width = w + "px";
	    _this.element.style.height = h + "px";
	  };
	};

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	"use strict";
	
	exports.isObject = function (obj) {
	  if (typeof obj === "object" && !Array.isArray(obj) && obj !== null && obj instanceof SVGElement === false && obj instanceof HTMLElement === false) {
	    return true;
	  } else {
	    return false;
	  }
	};
	
	// Restricts input for the given textbox to the given inputFilter function
	// cf https://stackoverflow.com/a/469362
	exports.setInputFilter = function (textbox, inputFilter) {
	  ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function (event) {
	    textbox.addEventListener(event, function () {
	      if (inputFilter(this.value)) {
	        this.oldValue = this.value;
	        this.oldSelectionStart = this.selectionStart;
	        this.oldSelectionEnd = this.selectionEnd;
	      } else if (this.hasOwnProperty("oldValue")) {
	        this.value = this.oldValue;
	        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
	      } else {
	        this.value = "";
	      }
	    });
	  });
	};

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	"use strict";
	
	exports.exists = "ontouchstart" in document.documentElement;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;
	
	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;
	
	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;
	
	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;
	
	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};
	
	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;
	
	  if (!this._events)
	    this._events = {};
	
	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      } else {
	        // At least give some kind of context to the user
	        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
	        err.context = er;
	        throw err;
	      }
	    }
	  }
	
	  handler = this._events[type];
	
	  if (isUndefined(handler))
	    return false;
	
	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        args = Array.prototype.slice.call(arguments, 1);
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    args = Array.prototype.slice.call(arguments, 1);
	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }
	
	  return true;
	};
	
	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;
	
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  if (!this._events)
	    this._events = {};
	
	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);
	
	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];
	
	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }
	
	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }
	
	  return this;
	};
	
	EventEmitter.prototype.on = EventEmitter.prototype.addListener;
	
	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  var fired = false;
	
	  function g() {
	    this.removeListener(type, g);
	
	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }
	
	  g.listener = listener;
	  this.on(type, g);
	
	  return this;
	};
	
	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;
	
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  if (!this._events || !this._events[type])
	    return this;
	
	  list = this._events[type];
	  length = list.length;
	  position = -1;
	
	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	
	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }
	
	    if (position < 0)
	      return this;
	
	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }
	
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }
	
	  return this;
	};
	
	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;
	
	  if (!this._events)
	    return this;
	
	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }
	
	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }
	
	  listeners = this._events[type];
	
	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else if (listeners) {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];
	
	  return this;
	};
	
	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};
	
	EventEmitter.prototype.listenerCount = function(type) {
	  if (this._events) {
	    var evlistener = this._events[type];
	
	    if (isFunction(evlistener))
	      return 1;
	    else if (evlistener)
	      return evlistener.length;
	  }
	  return 0;
	};
	
	EventEmitter.listenerCount = function(emitter, type) {
	  return emitter.listenerCount(type);
	};
	
	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	
	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	
	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	
	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var math = __webpack_require__(5);
	
	/**
	  Creates a steppable value with minimum, maximum, and step size. This is used in many interfaces to constrict their values to certain ranges.
	  @param {number} [min=0] minimum
	  @param {number} [max=1] maximum
	  @param {number} [step=0]
	  @param {number} [value=0] initial value
	  @returns {Object} Step
	*/
	
	var Step = (function () {
	  function Step() {
	    var min = arguments[0] === undefined ? 0 : arguments[0];
	    var max = arguments[1] === undefined ? 1 : arguments[1];
	    var step = arguments[2] === undefined ? 0 : arguments[2];
	    var value = arguments[3] === undefined ? 0 : arguments[3];
	
	    _classCallCheck(this, Step);
	
	    //Object.assign(this,{min,max,step});
	    //Cannot use Object.assign because not supported in Safari.
	    //I would expect for Babel to take care of this but it is not.
	    this.min = min;
	    this.max = max;
	    this.step = step;
	    this.value = value;
	    this.changed = false;
	    this.oldValue = false;
	    this.update(this.value);
	  }
	
	  _createClass(Step, {
	    update: {
	
	      /**
	        Update with a new value. The value will be auto-adjusted to fit the min/max/step.
	        @param {number} value
	      */
	
	      value: function update(value) {
	        if (this.step) {
	          // this.value = math.clip(Math.round(value / (this.step)) * this.step, this.min,this.max);
	          this.value = math.clip(Math.round((value - this.min) / this.step) * this.step + this.min, this.min, this.max);
	        } else {
	          this.value = math.clip(value, this.min, this.max);
	        }
	        if (this.oldValue !== this.value) {
	          this.oldValue = this.value;
	          this.changed = true;
	        } else {
	          this.changed = false;
	        }
	        return this.value;
	      }
	    },
	    updateNormal: {
	
	      /**
	        Update with a normalized value 0-1.
	        @param {number} value
	      */
	
	      value: function updateNormal(value) {
	        this.value = math.scale(value, 0, 1, this.min, this.max);
	        return this.update(this.value);
	      }
	    },
	    normalized: {
	
	      /**
	        Get a normalized version of this.value . Not settable.
	      */
	
	      get: function () {
	        return math.normalize(this.value, this.min, this.max);
	      }
	    }
	  });
	
	  return Step;
	})();
	
	module.exports = Step;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	"use strict";
	
	var math = _interopRequire(__webpack_require__(5));
	
	var ToggleModel = _interopRequire(__webpack_require__(13));
	
	/*
	how to use :
	
	dial.interaction = new Handle('radial','relative',this.width,this.height);
	// dial.interaction.mode = 'relative'
	// dial.interaction.direction = 'radial'
	
	on click:
	dial.interaction.anchor = this.mouse;
	
	on move:
	dial.interaction.update(this.mouse);
	
	console.log( dial.interaction.value ); should be a normalized value.
	
	*/
	
	/*
	  absolute/relative are property: mode
	  radial/vertical/horizontal/2d are property: direction
	
	  plan :
	
	  if relative --
	  NO on click, get value offset between current value and click value.
	  NO on move, use click value - offset
	  INSTEAD
	  use delta -- bc vertical motion on dial is impossible otherwise
	  also allow to set sensitivity
	
	*/
	
	var Handle = exports.Handle = (function () {
	  function Handle() {
	    var mode = arguments[0] === undefined ? "absolute" : arguments[0];
	    var direction = arguments[1] === undefined ? "vertical" : arguments[1];
	    var xbound = arguments[2] === undefined ? [0, 100] : arguments[2];
	    var ybound = arguments[3] === undefined ? [0, 100] : arguments[3];
	
	    _classCallCheck(this, Handle);
	
	    this.mode = mode;
	    this.direction = direction;
	    this.previous = 0;
	    this.value = 0;
	    this.sensitivity = 1;
	    this.resize(xbound, ybound);
	  }
	
	  _createClass(Handle, {
	    resize: {
	      value: function resize(xbound, ybound) {
	        this.boundary = {
	          min: {
	            x: xbound[0],
	            y: ybound[0]
	          },
	          max: {
	            x: xbound[1],
	            y: ybound[1]
	          },
	          center: {
	            x: (xbound[1] - xbound[0]) / 2 + xbound[0],
	            y: (ybound[1] - ybound[0]) / 2 + ybound[0]
	          }
	        };
	      }
	    },
	    anchor: {
	      set: function (mouse) {
	        this._anchor = this.convertPositionToValue(mouse);
	      },
	      get: function () {
	        return this._anchor;
	      }
	    },
	    update: {
	      value: function update(mouse) {
	        if (this.mode === "relative") {
	          var increment = this.convertPositionToValue(mouse) - this.anchor;
	          if (Math.abs(increment) > 0.5) {
	            increment = 0;
	          }
	          this.anchor = mouse;
	          this.value = this.value + increment * this.sensitivity;
	        } else {
	          this.value = this.convertPositionToValue(mouse);
	        }
	        this.value = math.clip(this.value, 0, 1);
	      }
	    },
	    convertPositionToValue: {
	      value: function convertPositionToValue(current) {
	        switch (this.direction) {
	          case "radial":
	            var position = math.toPolar(current.x - this.boundary.center.x, current.y - this.boundary.center.y);
	            position = position.angle / (Math.PI * 2);
	            position = (position - 0.25 + 1) % 1;
	            return position;
	          case "vertical":
	            return math.scale(current.y, this.boundary.min.y, this.boundary.max.y, 0, 1);
	          case "horizontal":
	            return math.scale(current.x, this.boundary.min.x, this.boundary.max.x, 0, 1);
	        }
	      }
	    }
	  });
	
	  return Handle;
	})();
	
	var Button = exports.Button = (function () {
	  function Button() {
	    var mode = arguments[0] === undefined ? "button" : arguments[0];
	
	    _classCallCheck(this, Button);
	
	    this.mode = mode;
	    this.state = new ToggleModel();
	    this.paintbrush = false;
	  }
	
	  _createClass(Button, {
	    click: {
	      value: function click() {
	        switch (this.mode) {
	          case "impulse":
	            this.state.on();
	            if (this.timeout) {
	              clearTimeout(this.timeout);
	            }
	            this.timeout = setTimeout(this.state.off.bind(this), 30);
	            this.emit("change", this.state);
	            break;
	          case "button":
	            this.turnOn();
	            this.emit("change", this.state);
	            break;
	          case "aftertouch":
	            this.position = {
	              x: math.clip(this.mouse.x / this.width, 0, 1),
	              y: math.clip(1 - this.mouse.y / this.height, 0, 1)
	            };
	            this.turnOn();
	            this.emit("change", {
	              state: this.state,
	              x: this.position.x,
	              y: this.position.y });
	            break;
	          case "toggle":
	            this.flip();
	            this.emit("change", this.state);
	            break;
	        }
	      }
	    },
	    move: {
	      value: function move() {
	        if (this.mode === "aftertouch") {
	          this.position = {
	            x: math.clip(this.mouse.x / this.width, 0, 1),
	            y: math.clip(1 - this.mouse.y / this.height, 0, 1)
	          };
	          this.emit("change", {
	            state: this.state,
	            x: this.position.x,
	            y: this.position.y });
	          this.render();
	        }
	      }
	    },
	    release: {
	      value: function release() {
	        switch (this.mode) {
	          case "button":
	            this.turnOff();
	            this.emit("change", this.state);
	            break;
	          case "aftertouch":
	            this.turnOff();
	            this.position = {
	              x: this.mouse.x / this.width,
	              y: 1 - this.mouse.y / this.height
	            };
	            this.emit("change", {
	              state: this.state,
	              x: this.position.x,
	              y: this.position.y });
	            break;
	        }
	      }
	    }
	  });
	
	  return Button;
	})();

/***/ }),
/* 13 */
/***/ (function(module, exports) {

	"use strict";
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var Toggle = (function () {
	  function Toggle(state) {
	    _classCallCheck(this, Toggle);
	
	    this.state = state || false;
	  }
	
	  _createClass(Toggle, {
	    flip: {
	      value: function flip(state) {
	        if (state || state === false) {
	          this.state = state;
	        } else {
	          this.state = !this.state;
	        }
	      }
	    },
	    on: {
	      value: function on() {
	        this.state = true;
	      }
	    },
	    off: {
	      value: function off() {
	        this.state = false;
	      }
	    }
	  });
	
	  return Toggle;
	})();
	
	module.exports = Toggle;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var svg = __webpack_require__(4);
	var Interface = __webpack_require__(6);
	var Step = __webpack_require__(11);
	
	var Interaction = _interopRequireWildcard(__webpack_require__(12));
	
	/**
	* Slider
	*
	* @description Horizontal or vertical slider with settable interaction modes.
	*
	* @demo <span nexus-ui="slider" step=0.2></span>
	*
	* @example
	* var slider = new Nexus.Slider('#target')
	*
	* @example
	* var slider = new Nexus.Slider('#target',{
	*     'size': [120,20],
	*     'mode': 'relative',  // 'relative' or 'absolute'
	*     'min': 0,
	*     'max': 1,
	*     'step': 0,
	*     'value': 0
	* })
	*
	* @output
	* change
	* Fires when the interface's value changes. <br>
	* Event data: <i>number</i> The number value of the interface.
	*
	* @outputexample
	* slider.on('change',function(v) {
	*   console.log(v);
	* })
	*
	*
	*/
	
	var Slider = (function (_Interface) {
	  function Slider() {
	    _classCallCheck(this, Slider);
	
	    var options = ["min", "max", "value"];
	
	    var defaults = {
	      size: [120, 20],
	      mode: "relative", // 'relative' or 'absolute'
	      min: 0,
	      max: 1,
	      step: 0,
	      value: 0
	    };
	
	    _get(Object.getPrototypeOf(Slider.prototype), "constructor", this).call(this, arguments, options, defaults);
	
	    this.orientation = "vertical"; // This will change automatically to 'horizontal'if the interface is wider than it is tall.
	
	    this._value = new Step(this.settings.min, this.settings.max, this.settings.step, this.settings.value);
	
	    this.position = new Interaction.Handle(this.settings.mode, this.orientation, [0, this.width], [this.height, 0]);
	    this.position.value = this._value.normalized;
	
	    this.init();
	
	    this.position.direction = this.orientation;
	
	    this.emit("change", this.value);
	  }
	
	  _inherits(Slider, _Interface);
	
	  _createClass(Slider, {
	    buildInterface: {
	      value: function buildInterface() {
	
	        this.bar = svg.create("rect");
	        this.fillbar = svg.create("rect");
	        this.knob = svg.create("circle");
	
	        this.element.appendChild(this.bar);
	        this.element.appendChild(this.fillbar);
	        this.element.appendChild(this.knob);
	      }
	    },
	    sizeInterface: {
	      value: function sizeInterface() {
	
	        if (this.width < this.height) {
	          this.orientation = "vertical";
	          this.position.direction = "vertical";
	        } else {
	          this.orientation = "horizontal";
	          this.position.direction = "horizontal";
	        }
	
	        if (this.position) {
	          this.position.resize([0, this.width], [this.height, 0]);
	        }
	
	        var x = undefined,
	            y = undefined,
	            w = undefined,
	            h = undefined,
	            barOffset = undefined,
	            cornerRadius = undefined;
	        this.knobData = {
	          level: 0,
	          r: 0
	        };
	
	        if (this.orientation === "vertical") {
	          this.thickness = this.width / 2;
	          x = this.width / 2;
	          y = 0;
	          w = this.thickness;
	          h = this.height;
	          this.knobData.r = this.thickness * 0.8;
	          this.knobData.level = h - this.knobData.r - this.normalized * (h - this.knobData.r * 2);
	          barOffset = "translate(" + this.thickness * -1 / 2 + ",0)";
	          cornerRadius = w / 2;
	        } else {
	          this.thickness = this.height / 2;
	          x = 0;
	          y = this.height / 2;
	          w = this.width;
	          h = this.thickness;
	          this.knobData.r = this.thickness * 0.8;
	          this.knobData.level = this.normalized * (w - this.knobData.r * 2) + this.knobData.r;
	          barOffset = "translate(0," + this.thickness * -1 / 2 + ")";
	          cornerRadius = h / 2;
	        }
	
	        this.bar.setAttribute("x", x);
	        this.bar.setAttribute("y", y);
	        this.bar.setAttribute("transform", barOffset);
	        this.bar.setAttribute("rx", cornerRadius); // corner radius
	        this.bar.setAttribute("ry", cornerRadius);
	        this.bar.setAttribute("width", w);
	        this.bar.setAttribute("height", h);
	
	        if (this.orientation === "vertical") {
	          this.fillbar.setAttribute("x", x);
	          this.fillbar.setAttribute("y", this.knobData.level);
	          this.fillbar.setAttribute("width", w);
	          this.fillbar.setAttribute("height", h - this.knobData.level);
	        } else {
	          this.fillbar.setAttribute("x", 0);
	          this.fillbar.setAttribute("y", y);
	          this.fillbar.setAttribute("width", this.knobData.level);
	          this.fillbar.setAttribute("height", h);
	        }
	        this.fillbar.setAttribute("transform", barOffset);
	        this.fillbar.setAttribute("rx", cornerRadius);
	        this.fillbar.setAttribute("ry", cornerRadius);
	
	        if (this.orientation === "vertical") {
	          this.knob.setAttribute("cx", x);
	          this.knob.setAttribute("cy", this.knobData.level);
	        } else {
	          this.knob.setAttribute("cx", this.knobData.level);
	          this.knob.setAttribute("cy", y);
	        }
	        this.knob.setAttribute("r", this.knobData.r);
	      }
	    },
	    colorInterface: {
	      value: function colorInterface() {
	        this.bar.setAttribute("fill", this.colors.fill);
	        this.fillbar.setAttribute("fill", this.colors.accent);
	        this.knob.setAttribute("fill", this.colors.accent);
	      }
	    },
	    render: {
	      value: function render() {
	        if (!this.clicked) {
	          this.knobData.r = this.thickness * 0.75;
	        }
	        this.knob.setAttribute("r", this.knobData.r);
	
	        if (this.orientation === "vertical") {
	          this.knobData.level = this.knobData.r + this._value.normalized * (this.height - this.knobData.r * 2);
	          this.knob.setAttribute("cy", this.height - this.knobData.level);
	          this.fillbar.setAttribute("y", this.height - this.knobData.level);
	          this.fillbar.setAttribute("height", this.knobData.level);
	        } else {
	          this.knobData.level = this._value.normalized * (this.width - this.knobData.r * 2) + this.knobData.r;
	          this.knob.setAttribute("cx", this.knobData.level);
	          this.fillbar.setAttribute("x", 0);
	          this.fillbar.setAttribute("width", this.knobData.level);
	        }
	      }
	    },
	    click: {
	      value: function click() {
	        this.knobData.r = this.thickness * 0.9;
	        this.position.anchor = this.mouse;
	        this.move();
	      }
	    },
	    move: {
	      value: function move() {
	        if (this.clicked) {
	          this.position.update(this.mouse);
	          this._value.updateNormal(this.position.value);
	          this.emit("change", this._value.value);
	          this.render();
	        }
	      }
	    },
	    release: {
	      value: function release() {
	        this.render();
	      }
	    },
	    normalized: {
	      get: function () {
	        return this._value.normalized;
	      }
	    },
	    value: {
	
	      /**
	      The slider's current value. If set manually, will update the interface and trigger the output event.
	      @type {number}
	      @example slider.value = 10;
	      */
	
	      get: function () {
	        return this._value.value;
	      },
	      set: function (v) {
	        this._value.update(v);
	        this.position.value = this._value.normalized;
	        this.emit("change", this._value.value);
	        this.render();
	      }
	    },
	    min: {
	
	      /**
	      Lower limit of the sliders's output range
	      @type {number}
	      @example slider.min = 1000;
	      */
	
	      get: function () {
	        return this._value.min;
	      },
	      set: function (v) {
	        this._value.min = v;
	      }
	    },
	    max: {
	
	      /**
	      Upper limit of the slider's output range
	      @type {number}
	      @example slider.max = 1000;
	      */
	
	      get: function () {
	        return this._value.max;
	      },
	      set: function (v) {
	        this._value.max = v;
	      }
	    },
	    step: {
	
	      /**
	      The increment that the slider's value changes by.
	      @type {number}
	      @example slider.step = 5;
	      */
	
	      get: function () {
	        return this._value.step;
	      },
	      set: function (v) {
	        this._value.step = v;
	      }
	    },
	    mode: {
	
	      /**
	      Absolute mode (slider's value jumps to mouse click position) or relative mode (mouse drag changes value relative to its current position). Default: "relative".
	      @type {string}
	      @example slider.mode = "relative";
	      */
	
	      get: function () {
	        return this.position.mode;
	      },
	      set: function (v) {
	        this.position.mode = v;
	      }
	    }
	  });
	
	  return Slider;
	})(Interface);
	
	module.exports = Slider;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var svg = __webpack_require__(4);
	var ToggleModel = __webpack_require__(13);
	var Interface = __webpack_require__(6);
	
	/**
	* Toggle
	*
	* @description Binary switch
	*
	* @demo <span nexus-ui="toggle"></span>
	*
	* @example
	* var toggle = new Nexus.Toggle('#target')
	*
	* @example
	* var toggle = new Nexus.Toggle('#target',{
	*     'size': [40,20],
	*     'state': false
	* })
	*
	* @output
	* change
	* Fires any time the interface's value changes. <br>
	* Parameter: The boolean state of the interface.
	*
	* @outputexample
	* toggle.on('change',function(v) {
	*   console.log(v);
	* })
	*
	*
	*/
	
	var Toggle = (function (_Interface) {
	  function Toggle() {
	    _classCallCheck(this, Toggle);
	
	    var options = ["value"];
	
	    var defaults = {
	      size: [40, 20],
	      target: false,
	      state: false
	    };
	
	    _get(Object.getPrototypeOf(Toggle.prototype), "constructor", this).call(this, arguments, options, defaults);
	
	    this._state = new ToggleModel(this.settings.state);
	
	    this.init();
	  }
	
	  _inherits(Toggle, _Interface);
	
	  _createClass(Toggle, {
	    buildInterface: {
	      value: function buildInterface() {
	
	        this.bar = svg.create("rect");
	        this.knob = svg.create("circle");
	        this.element.appendChild(this.bar);
	        this.element.appendChild(this.knob);
	      }
	    },
	    sizeInterface: {
	      value: function sizeInterface() {
	
	        if (this.height < this.width / 2) {
	          this.knobSize = this.height / 2;
	        } else {
	          this.knobSize = this.width / 4;
	        }
	
	        this.bar.setAttribute("x", this.width / 2 - this.knobSize * 1.5);
	        this.bar.setAttribute("y", this.height / 2 - this.knobSize / 2);
	        this.bar.setAttribute("rx", this.knobSize / 2);
	        this.bar.setAttribute("ry", this.knobSize / 2);
	        this.bar.setAttribute("width", this.knobSize * 3);
	        this.bar.setAttribute("height", this.knobSize);
	
	        this.knob.setAttribute("cx", this.width / 2 - this.knobSize);
	        this.knob.setAttribute("cy", this.height / 2);
	        this.knob.setAttribute("r", this.knobSize);
	      }
	    },
	    colorInterface: {
	      value: function colorInterface() {
	        this.knob.setAttribute("fill", this.colors.accent);
	        this.render();
	      }
	    },
	    render: {
	      value: function render() {
	        if (!this.state) {
	          this.knob.setAttribute("cx", this.width / 2 - this.knobSize);
	          this.bar.setAttribute("fill", this.colors.fill);
	        } else {
	          this.knob.setAttribute("cx", this.width / 2 + this.knobSize);
	          this.bar.setAttribute("fill", this.colors.accent);
	        }
	      }
	    },
	    click: {
	      value: function click() {
	        this.flip();
	        this.render();
	        this.emit("change", this.state);
	      }
	    },
	    state: {
	
	      /**
	      Whether the toggle is currently on or off. Setting this property will update the toggle interface and trigger the output event.
	      @type {boolean}
	      @example toggle.state = false;
	      */
	
	      get: function () {
	        return this._state.state;
	      },
	      set: function (value) {
	        this._state.flip(value);
	        this.emit("change", this.state);
	        this.render();
	      }
	    },
	    flip: {
	
	      /**
	      * Switch the toggle state to its opposite state
	      * @example
	      * toggle.flip();
	      */
	
	      value: function flip() {
	        this._state.flip();
	        this.render();
	      }
	    }
	  });
	
	  return Toggle;
	})(Interface);
	
	module.exports = Toggle;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var svg = __webpack_require__(4);
	var ButtonTemplate = __webpack_require__(17);
	
	/**
	* Button
	*
	* @description Circular button with optional aftertouch.
	*
	* @demo <span nexus-ui="button"></span>
	*
	* @example
	* var button = new Nexus.Button('#target')
	*
	* @example
	* var button = new Nexus.Button('#target',{
	*   'size': [80,80],
	*   'mode': 'aftertouch',
	*   'state': false
	* })
	*
	* @output
	* change
	* Fires any time the interface's value changes. <br>
	* In <b>button mode</b>, <b>toggle mode</b>, and <b>impulse mode</b>, the output data is a boolean describing the state of the button.<br>
	* In <b>aftertouch mode</b>, the output data is an object containing x (0-1) and y (0-1) positions of aftertouch.
	*
	* @outputexample
	* button.on('change',function(v) {
	*   // v is the value of the button
	*   console.log(v);
	* })
	*
	*/
	
	var Button = (function (_ButtonTemplate) {
	  function Button() {
	    _classCallCheck(this, Button);
	
	    var options = ["mode"];
	
	    var defaults = {
	      size: [80, 80],
	      mode: "aftertouch", // button, aftertouch, impulse, toggle
	      state: false
	    };
	
	    _get(Object.getPrototypeOf(Button.prototype), "constructor", this).call(this, arguments, options, defaults);
	
	    /**
	    * Interaction mode: supports "button", "aftertouch", "impulse", or "toggle"
	    * @type {string}
	    * @example button.mode = 'toggle';
	    */
	    this.mode = this.settings.mode;
	
	    this.init();
	    this.render();
	  }
	
	  _inherits(Button, _ButtonTemplate);
	
	  _createClass(Button, {
	    buildInterface: {
	      value: function buildInterface() {
	        this.pad = svg.create("circle");
	        this.element.appendChild(this.pad);
	
	        this.interactionTarget = this.pad;
	
	        // only used if in 'aftertouch' mode
	        this.defs = svg.create("defs");
	        this.element.appendChild(this.defs);
	
	        this.gradient = svg.radialGradient(this.defs, 2);
	
	        this.gradient.stops[0].setAttribute("offset", "30%");
	
	        this.gradient.stops[1].setAttribute("offset", "100%");
	      }
	    },
	    sizeInterface: {
	      value: function sizeInterface() {
	
	        this.pad.setAttribute("cx", this.width / 2);
	        this.pad.setAttribute("cy", this.height / 2);
	        this.pad.setAttribute("r", Math.min(this.width, this.height) / 2 - this.width / 40);
	        this.pad.setAttribute("stroke-width", this.width / 20);
	      }
	    },
	    colorInterface: {
	      value: function colorInterface() {
	
	        this.gradient.stops[0].setAttribute("stop-color", this.colors.accent);
	        this.gradient.stops[1].setAttribute("stop-color", this.colors.fill);
	        this.render();
	      }
	    },
	    render: {
	
	      /*
	      * Update the visual interface using its current state
	      *
	      * @example
	      * button.render();
	      */
	
	      value: function render() {
	        if (!this.state) {
	          this.pad.setAttribute("fill", this.colors.fill);
	          this.pad.setAttribute("stroke", this.colors.mediumLight);
	        } else {
	          if (this.mode === "aftertouch") {
	            this.pad.setAttribute("stroke", "url(#" + this.gradient.id + ")");
	            this.gradient.element.setAttribute("cx", this.position.x * 100 + "%");
	            this.gradient.element.setAttribute("cy", (1 - this.position.y) * 100 + "%");
	          } else {
	            this.pad.setAttribute("stroke", this.colors.accent);
	          }
	          this.pad.setAttribute("fill", this.colors.accent);
	        }
	      }
	    }
	  });
	
	  return Button;
	})(ButtonTemplate);
	
	module.exports = Button;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var svg = __webpack_require__(4);
	var math = __webpack_require__(5);
	var ToggleModel = __webpack_require__(13);
	var Interface = __webpack_require__(6);
	
	/**
	Button Template
	*/
	
	var ButtonTemplate = (function (_Interface) {
	  function ButtonTemplate(args, options, defaults) {
	    _classCallCheck(this, ButtonTemplate);
	
	    _get(Object.getPrototypeOf(ButtonTemplate.prototype), "constructor", this).call(this, args, options, defaults);
	
	    this.mode = this.settings.mode || "button";
	
	    this.position = {
	      x: 0,
	      y: 0
	    };
	
	    this._state = new ToggleModel(this.settings.state);
	  }
	
	  _inherits(ButtonTemplate, _Interface);
	
	  _createClass(ButtonTemplate, {
	    buildInterface: {
	      value: function buildInterface() {
	        this.pad = svg.create("circle");
	        this.pad.setAttribute("fill", "#d18");
	        this.pad.setAttribute("stroke", "#d18");
	        this.pad.setAttribute("stroke-width", 4);
	
	        this.element.appendChild(this.pad);
	
	        this.interactionTarget = this.pad;
	
	        this.sizeInterface();
	      }
	    },
	    sizeInterface: {
	      value: function sizeInterface() {
	        this.pad.setAttribute("cx", this.width / 2);
	        this.pad.setAttribute("cy", this.height / 2);
	        this.pad.setAttribute("r", Math.min(this.width, this.height) / 2 - 2);
	      }
	    },
	    render: {
	      value: function render() {
	        if (!this.state) {
	          this.pad.setAttribute("fill", this.colors.fill);
	          this.pad.setAttribute("stroke", this.colors.mediumLight);
	        } else {
	          this.pad.setAttribute("fill", this.colors.accent);
	          this.pad.setAttribute("stroke", this.colors.accent);
	        }
	      }
	    },
	    down: {
	      value: function down(paintbrush) {
	        switch (this.mode) {
	          case "impulse":
	            this.turnOn();
	            if (this.timeout) {
	              clearTimeout(this.timeout);
	            }
	            this.timeout = setTimeout(this.turnOff.bind(this), 30);
	            //    this.emit('change',this.state);
	            break;
	          case "button":
	            this.turnOn();
	            //    this.emit('change',this.state);
	            break;
	          case "aftertouch":
	            this.position = {
	              x: math.clip(this.mouse.x / this.width, 0, 1),
	              y: math.clip(1 - this.mouse.y / this.height, 0, 1)
	            };
	            this.turnOn();
	            //    this.emit('change',{
	            //      state: this.state,
	            //      x: this.position.x,
	            //      y: this.position.y,
	            //    });
	            break;
	          case "toggle":
	            this.flip(paintbrush);
	            //    this.emit('change',this.state);
	            break;
	        }
	      }
	    },
	    bend: {
	      value: function bend(mouse) {
	        if (this.mode === "aftertouch") {
	          this.mouse = mouse || this.mouse;
	          this.position = {
	            x: math.clip(this.mouse.x / this.width, 0, 1),
	            y: math.clip(1 - this.mouse.y / this.height, 0, 1)
	          };
	          this.emit("change", {
	            state: this.state,
	            x: this.position.x,
	            y: this.position.y });
	          this.render();
	        }
	      }
	    },
	    up: {
	      value: function up() {
	        switch (this.mode) {
	          case "button":
	            this.turnOff();
	            //  this.emit('change',this.state);
	            break;
	          case "aftertouch":
	            this.turnOff();
	            this.position = {
	              x: math.clip(this.mouse.x / this.width, 0, 1),
	              y: math.clip(1 - this.mouse.y / this.height, 0, 1)
	            };
	            //  this.emit('change',{
	            //    state: this.state,
	            //    x: this.position.x,
	            //    y: this.position.y,
	            //  });
	            break;
	        }
	      }
	    },
	    click: {
	
	      /* overwritable interaction handlers */
	
	      value: function click() {
	        this.down();
	      }
	    },
	    move: {
	      value: function move() {
	        this.bend();
	      }
	    },
	    release: {
	      value: function release() {
	        this.up();
	      }
	    },
	    state: {
	
	      /**
	      Whether the button is on (pressed) or off (not pressed)
	      @type {boolean}
	      @example button.state = true;
	      */
	
	      get: function () {
	        return this._state.state;
	      },
	      set: function (value) {
	        this._state.flip(value);
	        if (this.mode === "aftertouch") {
	          this.emit("change", {
	            state: this.state,
	            x: this.position.x,
	            y: this.position.y });
	        } else {
	          this.emit("change", this.state);
	        }
	        this.render();
	      }
	    },
	    flip: {
	
	      /**
	      Change the button to its alternate state (off=>on, on=>off), or flip it to a specified state.
	      @param value {boolean} (Optional) State to flip to.
	      @example button.flip();
	      */
	
	      value: function flip(value) {
	        this._state.flip(value);
	        if (this.mode === "aftertouch") {
	          this.emit("change", {
	            state: this.state,
	            x: this.position.x,
	            y: this.position.y });
	        } else {
	          this.emit("change", this.state);
	        }
	        this.render();
	      }
	    },
	    turnOn: {
	
	      /**
	      Turn the button's state to true.
	      @example button.turnOn();
	      */
	
	      value: function turnOn(emitting) {
	        this._state.on();
	        if (emitting !== false) {
	          if (this.mode === "aftertouch") {
	            this.emit("change", {
	              state: this.state,
	              x: this.position.x,
	              y: this.position.y });
	          } else {
	            this.emit("change", this.state);
	          }
	        }
	        this.render();
	      }
	    },
	    turnOff: {
	
	      /**
	      Turn the button's state to false.
	      @example button.turnOff();
	      */
	
	      value: function turnOff(emitting) {
	        this._state.off();
	        if (emitting !== false) {
	          if (this.mode === "aftertouch") {
	            this.emit("change", {
	              state: this.state,
	              x: this.position.x,
	              y: this.position.y });
	          } else {
	            this.emit("change", this.state);
	          }
	        }
	        this.render();
	      }
	    }
	  });
	
	  return ButtonTemplate;
	})(Interface);
	
	module.exports = ButtonTemplate;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var ButtonTemplate = __webpack_require__(17);
	
	/**
	* TextButton
	*
	* @description Text button
	*
	* @demo <span nexus-ui="textButton"></span>
	*
	* @example
	* var textbutton = new Nexus.TextButton('#target')
	*
	* @example
	* var textbutton = new Nexus.TextButton('#target',{
	*     'size': [150,50],
	*     'state': false,
	*     'text': 'Play',
	*     'alternateText': 'Stop'
	* })
	*
	* @output
	* change
	* Fires any time the interface's value changes. <br>
	* The event data is a <i>string</i> of the text on the button at the moment it was clicked.
	*
	* @outputexample
	* textbutton.on('change',function(v) {
	*   console.log(v);
	* })
	*
	*/
	
	var TextButton = (function (_ButtonTemplate) {
	  function TextButton() {
	    _classCallCheck(this, TextButton);
	
	    var options = ["value"];
	
	    var defaults = {
	      size: [150, 50],
	      state: false,
	      text: "Play"
	    };
	
	    _get(Object.getPrototypeOf(TextButton.prototype), "constructor", this).call(this, arguments, options, defaults);
	
	    this._text = this.settings.text;
	
	    if (this.settings.alternate) {
	      //TODO: Remove this conditional in a breaking-changes release
	      this.settings.alternateText = this.settings.alternate;
	      console.warn("'alternate' initiator is deprecated. Use 'alternateText' instead.");
	    }
	    this._alternateText = this.settings.alternateText;
	    this.mode = this.settings.alternateText ? "toggle" : "button";
	    this.init();
	    this.render();
	
	    this.state = this.settings.state;
	  }
	
	  _inherits(TextButton, _ButtonTemplate);
	
	  _createClass(TextButton, {
	    buildFrame: {
	      value: function buildFrame() {
	
	        this.element = document.createElement("div");
	        this.parent.appendChild(this.element);
	
	        this.textElement = document.createElement("div");
	        this.textElement.innerHTML = this._text;
	        this.element.appendChild(this.textElement);
	      }
	    },
	    buildInterface: {
	      value: function buildInterface() {}
	    },
	    colorInterface: {
	      value: function colorInterface() {
	        this.element.style.color = this.colors.dark;
	        this.render();
	      }
	    },
	    sizeInterface: {
	      value: function sizeInterface() {
	        var textsize = this.height / 3;
	        var textsize2 = this.width / (this._text.length + 2);
	        textsize = Math.min(textsize, textsize2);
	        if (this.alternateText) {
	          var textsize3 = this.width / (this.alternateText.length + 2);
	          textsize = Math.min(textsize, textsize3);
	        }
	        var styles = "width: " + this.width + "px;";
	        styles += "height: " + this.height + "px;";
	        styles += "padding: " + (this.height - textsize) / 2 + "px 0px;";
	        styles += "box-sizing: border-box;";
	        styles += "text-align: center;";
	        styles += "font-family: inherit;";
	        styles += "font-weight: 700;";
	        styles += "opacity: 1;";
	        styles += "font-size:" + textsize + "px;";
	        this.textElement.style.cssText = styles;
	        this.render();
	      }
	    },
	    render: {
	      value: function render() {
	        if (!this.state) {
	          this.element.style.backgroundColor = this.colors.fill;
	          this.textElement.style.color = this.colors.dark;
	          this.textElement.innerHTML = this._text;
	        } else {
	          this.element.style.backgroundColor = this.colors.accent;
	          this.textElement.style.color = this.colors.fill;
	          if (this.alternateText) {
	            this.textElement.innerHTML = this._alternateText;
	          } else {
	            this.textElement.innerHTML = this._text;
	          }
	        }
	      }
	    },
	    alternateText: {
	
	      /**
	      The text to display when the button is in its "on" state. If set, this puts the button in "toggle" mode.
	      @type {String}
	      */
	
	      get: function () {
	        return this._alternateText;
	      },
	      set: function (text) {
	        if (text) {
	          this.mode = "toggle";
	        } else {
	          this.mode = "button";
	        }
	        this._alternateText = text;
	        this.render();
	      }
	    },
	    text: {
	
	      /**
	      The text to display. (If .alternateText exists, then this .text will only be displayed when the button is in its "off" state.)
	      @type {String}
	      */
	
	      get: function () {
	        return this._text;
	      },
	      set: function (text) {
	        this._text = text;
	        this.sizeInterface();
	        this.render();
	      }
	    }
	  });
	
	  return TextButton;
	})(ButtonTemplate);
	
	module.exports = TextButton;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	//let svg = require('../util/svg');
	var Interface = __webpack_require__(6);
	var Button = __webpack_require__(16);
	
	/**
	 * RadioButton
	 *
	 * @description An array of buttons. By default, selecting one button will deselect all other buttons, but this can be customized using the API below.
	 *
	 * @demo <div nexus-ui="RadioButton"></div>
	 *
	 * @example
	 * var radiobutton = new Nexus.RadioButton('#target')
	 *
	 * @example
	 * var radiobutton = new Nexus.RadioButton('#target',{
	 *   'size': [120,25],
	 *   'numberOfButtons': 4,
	 *   'active': -1
	 * })
	 *
	 * @output
	 * change
	 * Fires any time the interface's value changes. <br>
	 * The event data an <i>integer</i>, the index of the button that is currently on. If no button is selected, the value will be -1.
	 *
	 * @outputexample
	 * radiobutton.on('change',function(v) {
	 *   console.log(v);
	 * })
	 *
	 */
	
	var RadioButton = (function (_Interface) {
	  function RadioButton() {
	    _classCallCheck(this, RadioButton);
	
	    var options = ["value"];
	
	    var defaults = {
	      size: [120, 25],
	      numberOfButtons: 4,
	      active: -1
	    };
	
	    _get(Object.getPrototypeOf(RadioButton.prototype), "constructor", this).call(this, arguments, options, defaults);
	
	    this.buttons = [];
	    this._numberOfButtons = this.settings.numberOfButtons;
	    this.active = this.settings.active;
	
	    this.init();
	    this.render();
	  }
	
	  _inherits(RadioButton, _Interface);
	
	  _createClass(RadioButton, {
	    buildFrame: {
	      value: function buildFrame() {
	        this.element = document.createElement("div");
	        this.parent.appendChild(this.element);
	      }
	    },
	    buildInterface: {
	      value: function buildInterface() {
	        for (var i = 0; i < this._numberOfButtons; i++) {
	          var container = document.createElement("span");
	
	          var button = new Button(container, {
	            mode: "toggle",
	            component: true
	          }, this.update.bind(this, i));
	
	          this.buttons.push(button);
	          this.element.appendChild(container);
	        }
	      }
	    },
	    sizeInterface: {
	      value: function sizeInterface() {
	        var orientation = undefined;
	        if (this.width > this.height) {
	          orientation = "horizontal";
	        } else {
	          orientation = "vertical";
	        }
	
	        var buttonWidth = this.width / (orientation === "vertical" ? 1 : this._numberOfButtons);
	        var buttonHeight = this.height / (orientation === "vertical" ? this._numberOfButtons : 1);
	
	        for (var i = 0; i < this._numberOfButtons; i++) {
	          this.buttons[i].resize(buttonWidth, buttonHeight);
	        }
	      }
	    },
	    colorInterface: {
	      value: function colorInterface() {
	        for (var i = 0; i < this._numberOfButtons; i++) {
	          this.buttons[i].colors = this.colors;
	          this.buttons[i].render();
	        }
	      }
	    },
	    update: {
	      value: function update(index) {
	        if (this.buttons[index].state) {
	          this.select(index);
	        } else {
	          this.deselect();
	        }
	        //  this.render();
	      }
	    },
	    render: {
	      value: function render() {
	        for (var i = 0; i < this.buttons.length; i++) {
	          if (i === this.active) {
	            this.buttons[i].turnOn(false);
	          } else {
	            this.buttons[i].turnOff(false);
	          }
	        }
	      }
	    },
	    select: {
	
	      /**
	      Select one button and deselect all other buttons.
	      @param index {number} The index of the button to select
	      */
	
	      value: function select(index) {
	        if (index >= 0 && index < this.buttons.length) {
	          this.active = index;
	          this.emit("change", this.active);
	          this.render();
	        }
	      }
	    },
	    deselect: {
	
	      /**
	      Deselect all buttons.
	      */
	
	      value: function deselect() {
	        this.active = -1;
	        this.emit("change", this.active);
	        this.render();
	      }
	    },
	    numberOfButtons: {
	      get: function () {
	        return this._numberOfButtons;
	      },
	
	      /**
	       * Update how many buttons are in the interface
	       * @param  {number} buttons How many buttons are in the interface
	       */
	      set: function (buttons) {
	        this._numberOfButtons = buttons;
	        for (var i = 0; i < this.buttons.length; i++) {
	          this.buttons[i].destroy();
	        }
	        this.buttons = [];
	        //  for (let i=0;i<this.buttons.length;i++) {
	        //    this.buttons[i].destroy();
	        //  }
	        this.empty();
	        this.buildInterface();
	      }
	    }
	  });
	
	  return RadioButton;
	})(Interface);
	
	module.exports = RadioButton;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var Interface = __webpack_require__(6);
	var Step = __webpack_require__(11);
	var math = __webpack_require__(5);
	var util = __webpack_require__(8);
	
	/**
	* Number
	*
	* @description Number interface which is controllable by dragging or typing.
	*
	* @demo <span nexus-ui="number"></span>
	*
	* @example
	* var number = new Nexus.Number('#target')
	*
	* @example
	* var number = new Nexus.Number('#target',{
	*   'size': [60,30],
	*   'value': 0,
	*   'min': 0,
	*   'max': 20000,
	*   'step': 1
	* })
	*
	* @output
	* change
	* Fires any time the interface's value changes. <br>
	* The event data is the number value of the interface.
	*
	* @outputexample
	* number.on('change',function(v) {
	*   console.log(v);
	* })
	*
	*
	*/
	
	var Number = (function (_Interface) {
	  function Number() {
	    _classCallCheck(this, Number);
	
	    var options = ["value"];
	
	    var defaults = {
	      size: [60, 30],
	      value: 0,
	      min: 0,
	      max: 20000,
	      step: 1
	    };
	
	    _get(Object.getPrototypeOf(Number.prototype), "constructor", this).call(this, arguments, options, defaults);
	
	    this._value = new Step(this.settings.min, this.settings.max, this.settings.step, this.settings.value);
	
	    /*
	    Default: 2. How many decimal places to clip the number's visual rendering to. This does not affect number's actual value output -- for that, set the step property to .01, .1, or 1.
	    @type {number}
	    @example number.decimalPlaces = 2;
	    */
	    this.decimalPlaces = 2;
	    this.actual = 0;
	
	    this.max = this._value.max;
	
	    this.min = this._value.min;
	
	    this.step = this._value.step;
	
	    this.init();
	    this.render();
	  }
	
	  _inherits(Number, _Interface);
	
	  _createClass(Number, {
	    buildFrame: {
	      value: function buildFrame() {
	        this.element = document.createElement("input");
	        this.element.type = "text";
	
	        this.element.addEventListener("blur", (function () {
	          this.element.style.backgroundColor = this.colors.fill;
	          this.element.style.color = this.colors.dark;
	          if (this.element.value !== this.value) {
	            this.value = parseFloat(this.element.value);
	            this.render();
	          }
	        }).bind(this));
	
	        util.setInputFilter(this.element, function (value) {
	          return /^-?\d*\.?\d*$/.test(value);
	        });
	
	        this.element.addEventListener("keydown", (function (e) {
	          if (e.which === 13) {
	            this.element.blur();
	            this.value = this.element.value;
	            this.emit("change", this.value);
	            this.render();
	          }
	        }).bind(this), true);
	
	        this.parent.appendChild(this.element);
	      }
	    },
	    sizeInterface: {
	      value: function sizeInterface() {
	
	        this._minDimension = Math.min(this.width, this.height);
	
	        var styles = "width: " + this.width + "px;";
	        styles += "height: " + this.height + "px;";
	        styles += "background-color: #e7e7e7;";
	        styles += "color: #333;";
	        styles += "font-family: arial;";
	        styles += "font-weight: 500;";
	        styles += "font-size:" + this._minDimension / 2 + "px;";
	        //  styles += 'highlight: #d18;';
	        styles += "border: none;";
	        styles += "outline: none;";
	        styles += "padding: " + this._minDimension / 4 + "px " + this._minDimension / 4 + "px;";
	        styles += "box-sizing: border-box;";
	        styles += "userSelect: text;";
	        styles += "mozUserSelect: text;";
	        styles += "webkitUserSelect: text;";
	        this.element.style.cssText += styles;
	
	        // to add eventually
	        // var css = '#'+this.elementID+'::selection{ background-color: transparent }';
	
	        this.element.value = this.value;
	      }
	    },
	    colorInterface: {
	      value: function colorInterface() {
	        this.element.style.backgroundColor = this.colors.fill;
	        this.element.style.color = this.colors.dark;
	      }
	    },
	    render: {
	      value: function render() {
	
	        this.element.value = math.prune(this.value, this.decimalPlaces);
	      }
	    },
	    click: {
	      value: function click() {
	        this.hasMoved = false;
	        this.element.readOnly = true;
	        this.actual = this.value;
	        this.initial = { y: this.mouse.y };
	        this.changeFactor = math.invert(this.mouse.x / this.width);
	      }
	    },
	    move: {
	      value: function move() {
	        this.hasMoved = true;
	        if (this.clicked) {
	
	          var newvalue = this.actual - (this.mouse.y - this.initial.y) * (math.clip(this.max - this.min, 0, 1000) / 200) * Math.pow(this.changeFactor, 2);
	          this.value = newvalue;
	
	          this.render();
	          if (this._value.changed) {
	            this.emit("change", this.value);
	          }
	        }
	      }
	    },
	    release: {
	      value: function release() {
	        if (!this.hasMoved) {
	          this.element.readOnly = false;
	          this.element.focus();
	          this.element.setSelectionRange(0, this.element.value.length);
	          this.element.style.backgroundColor = this.colors.accent;
	          this.element.style.color = this.colors.light;
	        } else {
	          document.body.focus();
	        }
	      }
	    },
	    link: {
	
	      /**
	      Connect this number interface to a dial or slider
	      @param {Interface} element Element to connect to.
	      @example number.link(slider)
	      */
	
	      value: function link(destination) {
	        var _this = this;
	
	        this.min = destination.min;
	        this.max = destination.max;
	        this.step = destination.step;
	        destination.on("change", function (v) {
	          _this.passiveUpdate(v);
	        });
	        this.on("change", function (v) {
	          destination.value = v;
	        });
	        this.value = destination.value;
	        /*  return {
	            listener1: listener1,
	            listener2: listener2,
	            destroy: () => {
	              listener1.remove() (or similar)
	              listener2.remove() (or similar)
	            }
	          } */
	      }
	    },
	    passiveUpdate: {
	      value: function passiveUpdate(v) {
	        this._value.update(v);
	        this.render();
	      }
	    },
	    value: {
	
	      /**
	      The interface's current value. If set manually, will update the interface and trigger the output event.
	      @type {number}
	      @example number.value = 10;
	      */
	
	      get: function () {
	        return this._value.value;
	      },
	      set: function (v) {
	        this._value.update(v);
	        this.emit("change", this.value);
	        this.render();
	      }
	    },
	    min: {
	
	      /**
	      Lower limit of the number's output range
	      @type {number}
	      @example number.min = 1000;
	      */
	
	      get: function () {
	        return this._value.min;
	      },
	      set: function (v) {
	        this._value.min = v;
	      }
	    },
	    max: {
	
	      /**
	      Upper limit of the number's output range
	      @type {number}
	      @example number.max = 1000;
	      */
	
	      get: function () {
	        return this._value.max;
	      },
	      set: function (v) {
	        this._value.max = v;
	      }
	    },
	    step: {
	
	      /**
	      The increment that the number's value changes by.
	      @type {number}
	      @example number.step = 5;
	      */
	
	      get: function () {
	        return this._value.step;
	      },
	      set: function (v) {
	        this._value.step = v;
	      }
	    }
	  });
	
	  return Number;
	})(Interface);
	
	module.exports = Number;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var Interface = __webpack_require__(6);
	
	/**
	* Select
	*
	* @description Dropdown menu
	*
	* @demo <span nexus-ui="select"></span>
	*
	* @example
	* var select = new Nexus.Select('#target')
	*
	* @example
	* var select = new Nexus.Select('#target',{
	*   'size': [100,30],
	*   'options': ['default','options']
	* })
	*
	* @output
	* change
	* Fires any time the interface's value changes. <br>
	* The event data is an object containing the text value of the selected option, as well as the numeric index of the selection.
	*
	* @outputexample
	* select.on('change',function(v) {
	*   console.log(v);
	* })
	*
	*
	*/
	
	var Select = (function (_Interface) {
	  function Select() {
	    _classCallCheck(this, Select);
	
	    var options = ["value"];
	
	    var defaults = {
	      size: [100, 30],
	      options: ["default", "options"]
	    };
	
	    _get(Object.getPrototypeOf(Select.prototype), "constructor", this).call(this, arguments, options, defaults);
	
	    this._selectedIndex = -1;
	    this._value = false;
	
	    this._options = this.settings.options;
	
	    this.init();
	    this.render();
	  }
	
	  _inherits(Select, _Interface);
	
	  _createClass(Select, {
	    buildFrame: {
	      value: function buildFrame() {
	        this.element = document.createElement("select");
	        this.element.style.fontSize = this.height / 2 + "px";
	        this.element.style.outline = "none";
	        this.element.style.highlight = "none";
	        this.element.style.width = this.width + "px";
	        this.element.style.height = this.height + "px";
	
	        this.boundRender = this.render.bind(this);
	
	        this.element.addEventListener("change", this.boundRender);
	
	        this.parent.appendChild(this.element);
	      }
	    },
	    attachListeners: {
	      value: function attachListeners() {}
	    },
	    buildInterface: {
	      value: function buildInterface() {
	
	        this.defineOptions();
	      }
	    },
	    colorInterface: {
	      value: function colorInterface() {
	        this.element.style.backgroundColor = this.colors.fill;
	        this.element.style.color = this.colors.dark;
	        this.element.style.border = "solid 0px " + this.colors.mediumLight;
	      }
	    },
	    render: {
	      value: function render() {
	
	        this._value = this.element.options[this.element.selectedIndex].text;
	        this._selectedIndex = this.element.selectedIndex;
	        this.emit("change", {
	          value: this._value,
	          index: this._selectedIndex
	        });
	      }
	    },
	    click: {
	      value: function click() {}
	    },
	    move: {
	      value: function move() {}
	    },
	    release: {
	      value: function release() {}
	    },
	    defineOptions: {
	
	      /**
	       * Update the list of options. This removes all existing options and creates a new list of options.
	       * @param  {array} options New array of options
	       */
	
	      value: function defineOptions(options) {
	
	        /*  function removeOptions(selectbox)
	          {
	              var i;
	              for(i = selectbox.options.length - 1 ; i >= 0 ; i--)
	              {
	                  selectbox.remove(i);
	              }
	          }
	          //using the function:
	          removeOptions(document.getElementById("mySelectObject")); */
	
	        if (options) {
	          this._options = options;
	        }
	
	        for (var i = this.element.options.length - 1; i >= 0; i--) {
	          this.element.remove(i);
	        }
	
	        for (var i = 0; i < this._options.length; i++) {
	          this.element.options.add(new Option(this._options[i], i));
	        }
	      }
	    },
	    value: {
	
	      /**
	      The text of the option that is currently selected. If set, will update the interface and trigger the output event.
	      @type {String}
	      @example select.value = "sawtooth";
	      */
	
	      get: function () {
	        return this._value;
	      },
	      set: function (v) {
	        this._value = v;
	        for (var i = 0; i < this.element.options.length; i++) {
	          if (v === this.element.options[i].text) {
	            this.selectedIndex = i;
	            break;
	          }
	        }
	      }
	    },
	    selectedIndex: {
	
	      /**
	      The numeric index of the option that is currently selected. If set, will update the interface and trigger the output event.
	      @type {number}
	      @example select.selectedIndex = 2;
	      */
	
	      get: function () {
	        return this._selectedIndex;
	      },
	      set: function (v) {
	        this._selectedIndex = v;
	        this.element.selectedIndex = v;
	        this.render();
	      }
	    },
	    customDestroy: {
	      value: function customDestroy() {
	        this.element.removeEventListener("change", this.boundRender);
	      }
	    }
	  });
	
	  return Select;
	})(Interface);
	
	module.exports = Select;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var svg = __webpack_require__(4);
	var math = __webpack_require__(5);
	var Interface = __webpack_require__(6);
	var Step = __webpack_require__(11);
	
	var Interaction = _interopRequireWildcard(__webpack_require__(12));
	
	/**
	* Dial
	*
	*
	* @description Dial with radial or linear interaction.
	*
	* @demo <span nexus-ui="dial"></span>
	*
	* @example
	* var dial = new Nexus.Dial('#target')
	*
	* @example
	* var dial = new Nexus.Dial('#target',{
	*   'size': [75,75],
	*   'interaction': 'radial', // "radial", "vertical", or "horizontal"
	*   'mode': 'relative', // "absolute" or "relative"
	*   'min': 0,
	*   'max': 1,
	*   'step': 0,
	*   'value': 0
	* })
	*
	* @output
	* change
	* Fires any time the interface's value changes. <br>
	* The event data is the number value of the interface.
	*
	* @outputexample
	* dial.on('change',function(v) {
	*   console.log(v);
	* })
	*
	* @tutorial
	* Dial
	* ygGMxq
	*
	*/
	
	var Dial = (function (_Interface) {
	  function Dial() {
	    _classCallCheck(this, Dial);
	
	    var options = ["min", "max", "value"];
	
	    var defaults = {
	      size: [75, 75],
	      interaction: "radial", // radial, vertical, horizontal
	      mode: "relative", // absolute, relative
	      min: 0,
	      max: 1,
	      step: 0,
	      value: 0
	    };
	
	    _get(Object.getPrototypeOf(Dial.prototype), "constructor", this).call(this, arguments, options, defaults);
	
	    this.interaction = this.settings.interaction;
	
	    this._value = new Step(this.settings.min, this.settings.max, this.settings.step, this.settings.value);
	
	    this.position = new Interaction.Handle(this.settings.mode, this.interaction, [0, this.width], [this.height, 0]);
	
	    this.init();
	
	    this.value = this._value.value;
	
	    this.position.value = this._value.normalized;
	
	    this.previousAngle = false;
	
	    this.emit("change", this.value);
	  }
	
	  _inherits(Dial, _Interface);
	
	  _createClass(Dial, {
	    buildInterface: {
	      value: function buildInterface() {
	
	        this.background = svg.create("circle");
	        this.screw = svg.create("circle");
	        this.handle = svg.create("path");
	        this.handle2 = svg.create("path");
	        this.handleFill = svg.create("path");
	        this.handle2Fill = svg.create("path");
	        this.handleLine = svg.create("path");
	
	        this.element.appendChild(this.background);
	        this.element.appendChild(this.handle);
	        this.element.appendChild(this.handle2);
	        this.element.appendChild(this.handleFill);
	        this.element.appendChild(this.handle2Fill);
	        this.element.appendChild(this.handleLine);
	        this.element.appendChild(this.screw);
	      }
	    },
	    sizeInterface: {
	      value: function sizeInterface() {
	
	        this.position.resize([0, this.width], [this.height, 0]);
	
	        var center = {
	          x: this.width / 2,
	          y: this.height / 2
	        };
	
	        var diameter = Math.min(this.width, this.height);
	
	        this.background.setAttribute("cx", center.x);
	        this.background.setAttribute("cy", center.y);
	        this.background.setAttribute("r", diameter / 2 - diameter / 40);
	
	        this.screw.setAttribute("cx", center.x);
	        this.screw.setAttribute("cy", center.y);
	        this.screw.setAttribute("r", diameter / 12);
	
	        var value = this.value;
	
	        var handlePoints = {
	          start: Math.PI * 1.5,
	          end: math.clip(math.scale(value, 0, 0.5, Math.PI * 1.5, Math.PI * 0.5), Math.PI * 0.5, Math.PI * 1.5)
	        };
	        var handle2Points = {
	          start: Math.PI * 2.5,
	          end: math.clip(math.scale(value, 0.5, 1, Math.PI * 2.5, Math.PI * 1.5), Math.PI * 1.5, Math.PI * 2.5)
	        };
	
	        var handlePath = svg.arc(center.x, center.y, diameter / 2 - diameter / 40, handlePoints.start, handlePoints.end);
	        var handle2Path = svg.arc(center.x, center.y, diameter / 2 - diameter / 40, handle2Points.start, handle2Points.end);
	
	        this.handle.setAttribute("d", handlePath);
	        this.handle.setAttribute("stroke-width", diameter / 20);
	        this.handle.setAttribute("fill", "none");
	
	        this.handle2.setAttribute("d", handle2Path);
	        this.handle2.setAttribute("stroke-width", diameter / 20);
	        this.handle2.setAttribute("fill", "none");
	
	        handlePath += " L " + center.x + " " + center.y;
	
	        this.handleFill.setAttribute("d", handlePath);
	        this.handleFill.setAttribute("fill-opacity", "0.3");
	
	        handle2Path += " L " + center.x + " " + center.y;
	
	        this.handle2Fill.setAttribute("d", handle2Path);
	        this.handle2Fill.setAttribute("fill-opacity", "0.3");
	
	        var arcEndingA = undefined;
	        if (value < 0.5) {
	          arcEndingA = handlePoints.end;
	        } else {
	          arcEndingA = handle2Points.end;
	        }
	
	        var arcEndingX = center.x + Math.cos(arcEndingA) * (diameter / 2);
	        var arcEndingY = center.y + Math.sin(arcEndingA) * (diameter / 2) * -1;
	
	        this.handleLine.setAttribute("d", "M " + center.x + " " + center.y + " L " + arcEndingX + " " + arcEndingY);
	        this.handleLine.setAttribute("stroke-width", diameter / 20);
	      }
	    },
	    colorInterface: {
	      value: function colorInterface() {
	        this.background.setAttribute("fill", this.colors.fill);
	        this.screw.setAttribute("fill", this.colors.accent);
	        this.handle.setAttribute("stroke", this.colors.accent);
	        this.handle2.setAttribute("stroke", this.colors.accent);
	        this.handleFill.setAttribute("fill", this.colors.accent);
	        this.handle2Fill.setAttribute("fill", this.colors.accent);
	        this.handleLine.setAttribute("stroke", this.colors.accent);
	      }
	    },
	    render: {
	      value: function render() {
	        var value = this._value.normalized;
	
	        var center = {
	          x: this.width / 2,
	          y: this.height / 2
	        };
	
	        var diameter = Math.min(this.width, this.height);
	
	        var handlePoints = {
	          start: Math.PI * 1.5,
	          end: math.clip(math.scale(value, 0, 0.5, Math.PI * 1.5, Math.PI * 0.5), Math.PI * 0.5, Math.PI * 1.5)
	        };
	        var handle2Points = {
	          start: Math.PI * 2.5,
	          end: math.clip(math.scale(value, 0.5, 1, Math.PI * 2.5, Math.PI * 1.5), Math.PI * 1.5, Math.PI * 2.5)
	        };
	
	        var handlePath = svg.arc(center.x, center.y, diameter / 2 - diameter / 40, handlePoints.start, handlePoints.end);
	        var handle2Path = svg.arc(center.x, center.y, diameter / 2 - diameter / 40, handle2Points.start, handle2Points.end);
	
	        this.handle.setAttribute("d", handlePath);
	        this.handle2.setAttribute("d", handle2Path);
	
	        handlePath += " L " + center.x + " " + center.y;
	
	        this.handleFill.setAttribute("d", handlePath);
	
	        handle2Path += " L " + center.x + " " + center.y;
	
	        this.handle2Fill.setAttribute("d", handle2Path);
	
	        var arcEndingA = undefined;
	        if (value <= 0.5) {
	          arcEndingA = handlePoints.end;
	        } else {
	          arcEndingA = handle2Points.end;
	        }
	
	        var arcEndingX = center.x + Math.cos(arcEndingA) * (diameter / 2);
	        var arcEndingY = center.y + Math.sin(arcEndingA) * (diameter / 2) * -1;
	
	        this.handleLine.setAttribute("d", "M " + center.x + " " + center.y + " L " + arcEndingX + " " + arcEndingY);
	      }
	    },
	    click: {
	      value: function click() {
	        if (this.mode === "relative") {
	          this.previousAngle = false;
	        }
	        this.position.anchor = this.mouse;
	        this.position.value = this._value.normalized;
	        this.move();
	      }
	    },
	    move: {
	      value: function move() {
	        if (this.clicked) {
	
	          this.position.update(this.mouse);
	
	          var angle = this.position.value * Math.PI * 2;
	
	          if (angle < 0) {
	            angle += Math.PI * 2;
	          }
	
	          if (this.mode === "relative") {
	            if (this.previousAngle !== false && Math.abs(this.previousAngle - angle) > 2) {
	              if (this.previousAngle > 3) {
	                angle = Math.PI * 2;
	              } else {
	                angle = 0;
	              }
	            }
	          } /* else {
	            if (this.previousAngle !== false && Math.abs(this.previousAngle - angle) > 2) {
	              if (this.previousAngle > 3) {
	                angle = Math.PI*2;
	              } else {
	                angle = 0;
	              }
	            }
	            } */
	          this.previousAngle = angle;
	
	          var realValue = angle / (Math.PI * 2);
	
	          this.value = this._value.updateNormal(realValue);
	
	          if (this.mode === "relative") {
	            this.position.value = realValue;
	          }
	
	          this.emit("change", this._value.value);
	
	          this.render();
	        }
	      }
	    },
	    release: {
	      value: function release() {}
	    },
	    value: {
	
	      /*
	      Dial's value. When set, it will automatically be adjust to fit min/max/step settings of the interface.
	      @type {number}
	      @example dial.value = 10;
	       get value() {
	        return this._value.value;
	      }
	       set value(value) {
	        this._value.update(value);
	        this.emit('change',this.value);
	        this.render();
	      }
	      */
	
	      /**
	      Dial's value. When set, it will automatically be adjust to fit min/max/step settings of the interface.
	      @type {number}
	      @example dial.value = 10;
	      */
	
	      get: function () {
	        return this._value.value;
	      },
	      set: function (v) {
	        this._value.update(v);
	        this.position.value = this._value.normalized;
	        this.emit("change", this._value.value);
	        this.render();
	      }
	    },
	    min: {
	
	      /**
	      Lower limit of the dial's output range
	      @type {number}
	      @example dial.min = 1000;
	      */
	
	      get: function () {
	        return this._value.min;
	      },
	      set: function (v) {
	        this._value.min = v;
	      }
	    },
	    max: {
	
	      /**
	      Upper limit of the dial's output range
	      @type {number}
	      @example dial.max = 1000;
	      */
	
	      get: function () {
	        return this._value.max;
	      },
	      set: function (v) {
	        this._value.max = v;
	      }
	    },
	    step: {
	
	      /**
	      The increment that the dial's value changes by.
	      @type {number}
	      @example dial.step = 5;
	      */
	
	      get: function () {
	        return this._value.step;
	      },
	      set: function (v) {
	        this._value.step = v;
	      }
	    },
	    mode: {
	
	      /**
	      Absolute mode (dial's value jumps to mouse click position) or relative mode (mouse drag changes value relative to its current position). Default: "relative".
	      @type {string}
	      @example dial.mode = "relative";
	      */
	
	      get: function () {
	        return this.position.mode;
	      },
	      set: function (v) {
	        this.position.mode = v;
	      }
	    },
	    normalized: {
	
	      /**
	      Normalized value of the dial.
	      @type {number}
	      @example dial.normalized = 0.5;
	      */
	
	      get: function () {
	        return this._value.normalized;
	      },
	      set: function (v) {
	        this._value.updateNormal(v);
	        this.emit("change", this.value);
	      }
	    }
	  });
	
	  return Dial;
	})(Interface);
	
	module.exports = Dial;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var svg = __webpack_require__(4);
	var Interface = __webpack_require__(6);
	var ButtonTemplate = __webpack_require__(17);
	var touch = __webpack_require__(9);
	
	var PianoKey = (function (_ButtonTemplate) {
	  function PianoKey() {
	    _classCallCheck(this, PianoKey);
	
	    var options = ["value", "note", "color"];
	
	    var defaults = {
	      size: [80, 80],
	      target: false,
	      mode: "button",
	      value: 0
	    };
	
	    _get(Object.getPrototypeOf(PianoKey.prototype), "constructor", this).call(this, arguments, options, defaults);
	
	    this.note = this.settings.note;
	    this.color = this.settings.color;
	
	    this.colors = {
	      w: "#fff",
	      b: "#666" };
	
	    this.init();
	    this.render();
	  }
	
	  _inherits(PianoKey, _ButtonTemplate);
	
	  _createClass(PianoKey, {
	    buildFrame: {
	      value: function buildFrame() {
	        this.element = svg.create("svg");
	        this.element.setAttribute("width", this.width);
	        this.element.setAttribute("height", this.height);
	        this.parent.appendChild(this.element);
	      }
	    },
	    buildInterface: {
	      value: function buildInterface() {
	        var _this = this;
	
	        this.pad = svg.create("rect");
	
	        this.element.appendChild(this.pad);
	
	        this.interactionTarget = this.pad;
	
	        /* events */
	
	        if (!touch.exists) {
	
	          this.click = function () {
	            //  console.log('click');
	            _this.piano.interacting = true;
	            _this.piano.paintbrush = !_this.state;
	            _this.down(_this.piano.paintbrush);
	          };
	
	          this.pad.addEventListener("mouseover", function () {
	            if (_this.piano.interacting) {
	              //    console.log('mouseover');
	              _this.down(_this.piano.paintbrush);
	            }
	          });
	
	          this.move = function () {
	            if (_this.piano.interacting) {
	              //  console.log('move');
	              _this.bend();
	            }
	          };
	
	          this.release = function () {
	            _this.piano.interacting = false;
	            //  console.log('release');
	            //  this.up();
	          };
	          this.pad.addEventListener("mouseup", function () {
	            if (_this.piano.interacting) {
	              //  console.log('mouseup');
	              _this.up();
	            }
	          });
	          this.pad.addEventListener("mouseout", function () {
	            if (_this.piano.interacting) {
	              //  console.log('mouseout');
	              _this.up();
	            }
	          });
	        }
	      }
	    },
	    sizeInterface: {
	      value: function sizeInterface() {
	
	        //let radius = Math.min(this.width,this.height) / 5;
	        var radius = 0;
	
	        this.pad.setAttribute("x", 0.5);
	        this.pad.setAttribute("y", 0.5);
	        if (this.width > 2) {
	          this.pad.setAttribute("width", this.width - 1);
	        } else {
	          this.pad.setAttribute("width", this.width);
	        }
	        if (this.height > 2) {
	          this.pad.setAttribute("height", this.height);
	        } else {
	          this.pad.setAttribute("height", this.height);
	        }
	        this.pad.setAttribute("rx", radius);
	        this.pad.setAttribute("ry", radius);
	      }
	    },
	    render: {
	      value: function render() {
	        if (!this.state) {
	          this.pad.setAttribute("fill", this.colors[this.color]);
	        } else {
	          this.pad.setAttribute("fill", this.colors.accent);
	        }
	      }
	    }
	  });
	
	  return PianoKey;
	})(ButtonTemplate);
	
	/**
	* Piano
	*
	* @description Piano keyboard interface
	*
	* @demo <div nexus-ui="piano"></div>
	*
	* @example
	* var piano = new Nexus.Piano('#target')
	*
	* @example
	* var piano = new Nexus.Piano('#target',{
	*     'size': [500,125],
	*     'mode': 'button',  // 'button', 'toggle', or 'impulse'
	*     'lowNote': 24,
	*     'highNote': 60
	* })
	*
	* @output
	* change
	* Fires any time a new key is pressed or released <br>
	* The event data is an object containing <i>note</i> and <i>state</i> properties.
	*
	* @outputexample
	* piano.on('change',function(v) {
	*   console.log(v);
	* })
	*
	*/
	
	var Piano = (function (_Interface) {
	  function Piano() {
	    _classCallCheck(this, Piano);
	
	    var options = ["value"];
	
	    var defaults = {
	      size: [500, 125],
	      lowNote: 24,
	      highNote: 60,
	      mode: "button"
	    };
	
	    _get(Object.getPrototypeOf(Piano.prototype), "constructor", this).call(this, arguments, options, defaults);
	
	    this.keyPattern = ["w", "b", "w", "b", "w", "w", "b", "w", "b", "w", "b", "w"];
	
	    this.paintbrush = false;
	
	    this.mode = this.settings.mode;
	
	    this.range = {
	      low: this.settings.lowNote,
	      high: this.settings.highNote
	    };
	
	    this.range.size = this.range.high - this.range.low + 1;
	
	    this.keys = [];
	
	    this.toggleTo = false;
	
	    this.init();
	    this.render();
	  }
	
	  _inherits(Piano, _Interface);
	
	  _createClass(Piano, {
	    buildFrame: {
	      value: function buildFrame() {
	        this.element = document.createElement("div");
	        this.element.style.position = "relative";
	        this.element.style.borderRadius = "0px";
	        this.element.style.display = "block";
	        this.element.style.width = "100%";
	        this.element.style.height = "100%";
	        this.parent.appendChild(this.element);
	      }
	    },
	    buildInterface: {
	      value: function buildInterface() {
	
	        this.keys = [];
	
	        for (var i = 0; i < this.range.size; i++) {
	
	          var container = document.createElement("span");
	          var scaleIndex = (i + this.range.low) % this.keyPattern.length;
	
	          var key = new PianoKey(container, {
	            component: true,
	            note: i + this.range.low,
	            color: this.keyPattern[scaleIndex],
	            mode: this.mode
	          }, this.keyChange.bind(this, i + this.range.low));
	
	          key.piano = this;
	
	          if (touch.exists) {
	            key.pad.index = i;
	            key.preClick = key.preMove = key.preRelease = function () {};
	            key.click = key.move = key.release = function () {};
	            key.preTouch = key.preTouchMove = key.preTouchRelease = function () {};
	            key.touch = key.touchMove = key.touchRelease = function () {};
	          }
	
	          this.keys.push(key);
	          this.element.appendChild(container);
	        }
	        if (touch.exists) {
	          this.addTouchListeners();
	        }
	      }
	    },
	    sizeInterface: {
	      value: function sizeInterface() {
	
	        var keyX = 0;
	
	        var keyPositions = [];
	
	        for (var i = 0; i < this.range.size; i++) {
	
	          keyPositions.push(keyX);
	
	          var scaleIndex = (i + this.range.low) % this.keyPattern.length;
	          var nextScaleIndex = (i + 1 + this.range.low) % this.keyPattern.length;
	          if (i + 1 + this.range.low >= this.range.high) {
	            keyX += 1;
	          } else if (this.keyPattern[scaleIndex] === "w" && this.keyPattern[nextScaleIndex] === "w") {
	            keyX += 1;
	          } else {
	            keyX += 0.5;
	          }
	        }
	        var keysWide = keyX;
	
	        //  let padding = this.width / 120;
	        var padding = 1;
	        var buttonWidth = (this.width - padding * 2) / keysWide;
	        var buttonHeight = (this.height - padding * 2) / 2;
	
	        for (var i = 0; i < this.keys.length; i++) {
	
	          var container = this.keys[i].parent;
	          container.style.position = "absolute";
	          container.style.left = keyPositions[i] * buttonWidth + padding + "px";
	          if (this.keys[i].color === "w") {
	            container.style.top = padding + "px";
	            this.keys[i].resize(buttonWidth, buttonHeight * 2);
	          } else {
	            container.style.zIndex = 1;
	            container.style.top = padding + "px";
	            this.keys[i].resize(buttonWidth, buttonHeight * 1.1);
	          }
	        }
	      }
	    },
	    colorInterface: {
	      value: function colorInterface() {
	
	        // Piano keys don't actually have a stroke border
	        // They have space between them, which shows the Piano bg color
	        this.element.style.backgroundColor = this.colors.mediumLight;
	
	        for (var i = 0; i < this.keys.length; i++) {
	          this.keys[i].colors = {
	            w: this.colors.light,
	            b: this.colors.dark,
	            accent: this.colors.accent,
	            border: this.colors.mediumLight
	          };
	          this.keys[i].colorInterface();
	          this.keys[i].render();
	        }
	      }
	    },
	    keyChange: {
	      value: function keyChange(note, on) {
	        // emit data for any key turning on/off
	        // "note" is the note value
	        // "on" is a boolean whether it is on or off
	        // in aftertouch mode, "on: is an object with state/x/y properties
	        var data = {
	          note: note
	        };
	        if (typeof on === "object") {
	          data.state = on.state;
	          //  data.x = on.x
	          //  data.y = on.y
	        } else {
	          data.state = on;
	        }
	        this.emit("change", data);
	      }
	    },
	    render: {
	
	      /* drag(note,on) {
	        this.emit('change',{
	          note: note,
	          state: on
	        });
	      } */
	
	      value: function render() {}
	    },
	    addTouchListeners: {
	      value: function addTouchListeners() {
	        this.preClick = this.preMove = this.preRelease = function () {};
	        this.click = this.move = this.release = function () {};
	        this.preTouch = this.preTouchMove = this.preTouchRelease = function () {};
	        this.touch = this.touchMove = this.touchRelease = function () {};
	
	        var allActiveTouches = {};
	        var keys = this.keys;
	
	        function cloneTouch(touch) {
	          return { identifier: touch.identifier, clientX: touch.clientX, clientY: touch.clientY };
	        }
	
	        function updateKeyState() {
	          var allActiveKeys = {};
	
	          // Check/set "key-down" status for all keys that are currently touched.
	          Object.keys(allActiveTouches).forEach(function (id) {
	            var touch = allActiveTouches[id];
	            var el = document.elementFromPoint(touch.clientX, touch.clientY);
	            var key = el ? keys[el.index] : null;
	            if (key) {
	              allActiveKeys[el.index] = id;
	              if (!key.state) {
	                key.down();
	              }
	            } else {
	              delete allActiveTouches[id];
	            }
	          });
	
	          // Set "key-up" status for all keys that are untouched.
	          keys.forEach(function (key) {
	            if (key.state && !allActiveKeys[key.pad.index]) {
	              key.up();
	            }
	          });
	        }
	
	        function handleTouchStartAndMove(e) {
	          e.preventDefault();
	          e.stopPropagation();
	          for (var i = 0; i < e.changedTouches.length; i++) {
	            var _touch = e.changedTouches[i];
	            allActiveTouches[_touch.identifier] = cloneTouch(_touch);
	          }
	          updateKeyState();
	        }
	
	        function handleTouchEnd(e) {
	          e.preventDefault();
	          e.stopPropagation();
	          for (var i = 0; i < e.changedTouches.length; i++) {
	            var _touch = e.changedTouches[i];
	            delete allActiveTouches[_touch.identifier];
	          }
	          updateKeyState();
	        }
	
	        this.element.addEventListener("touchstart", handleTouchStartAndMove);
	        this.element.addEventListener("touchmove", handleTouchStartAndMove);
	        this.element.addEventListener("touchend", handleTouchEnd);
	      }
	    },
	    setRange: {
	
	      /**
	      Define the pitch range (lowest and highest note) of the piano keyboard.
	      @param low {number} MIDI note value of the lowest note on the keyboard
	      @param high {number} MIDI note value of the highest note on the keyboard
	      */
	
	      value: function setRange(low, high) {
	        this.range.low = low;
	        this.range.high = high;
	        this.empty();
	        this.buildInterface();
	      }
	    },
	    toggleKey: {
	
	      /**
	      Turn a key on or off using its MIDI note value;
	      @param note {number} MIDI note value of the key to change
	      @param on {boolean} Whether the note should turn on or off
	      */
	
	      value: function toggleKey(note, on) {
	        this.keys[note - this.range.low].flip(on);
	      }
	    },
	    toggleIndex: {
	
	      /**
	      Turn a key on or off using its key index on the piano interface.
	      @param index {number} Index of the key to change
	      @param on {boolean} Whether the note should turn on or off
	      */
	
	      value: function toggleIndex(index, on) {
	        this.keys[index].flip(on);
	      }
	    }
	  });
	
	  return Piano;
	})(Interface);
	
	module.exports = Piano;
	
	// loop through and render the keys?

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var svg = __webpack_require__(4);
	var dom = __webpack_require__(7);
	var Interface = __webpack_require__(6);
	var ButtonTemplate = __webpack_require__(17);
	var MatrixModel = __webpack_require__(25);
	var CounterModel = __webpack_require__(28);
	var Interval = __webpack_require__(29);
	var touch = __webpack_require__(9);
	
	var MatrixCell = (function (_ButtonTemplate) {
	  function MatrixCell() {
	    _classCallCheck(this, MatrixCell);
	
	    var options = ["value"];
	
	    var defaults = {
	      size: [80, 80],
	      target: false,
	      mode: "toggle",
	      value: 0,
	      paddingRow: 2,
	      paddingColumn: 2
	    };
	
	    _get(Object.getPrototypeOf(MatrixCell.prototype), "constructor", this).call(this, arguments, options, defaults);
	
	    this.index = this.settings.index;
	    this.row = this.settings.row;
	    this.column = this.settings.column;
	
	    this.matrix = this.settings.matrix;
	
	    /**
	     *  Amount of row padding
	     *  @type {number}
	     */
	    this.paddingRow = this.settings.paddingRow || defaults.paddingRow;
	
	    /**
	     *  Amount of column padding
	     *  @type {number}
	     */
	    this.paddingColumn = this.settings.paddingColumn || defaults.paddingColumn;
	
	    this.interacting = false;
	    this.paintbrush = false;
	
	    this.init();
	    this.render();
	  }
	
	  _inherits(MatrixCell, _ButtonTemplate);
	
	  _createClass(MatrixCell, {
	    buildFrame: {
	      value: function buildFrame() {
	        this.element = svg.create("svg");
	        this.element.setAttribute("width", this.width);
	        this.element.setAttribute("height", this.height);
	        this.element.style.top = "0px";
	        this.element.style.left = "0px";
	        this.element.style.position = "absolute";
	        this.parent.appendChild(this.element);
	      }
	    },
	    buildInterface: {
	      value: function buildInterface() {
	        var _this = this;
	
	        this.pad = svg.create("rect");
	        this.element.appendChild(this.pad);
	
	        this.interactionTarget = this.pad;
	
	        /* events */
	
	        if (!touch.exists) {
	          this.click = function () {
	            _this.matrix.interacting = true;
	            _this.matrix.paintbrush = !_this.state;
	            _this.down(_this.matrix.paintbrush);
	          };
	          this.pad.addEventListener("mouseover", function () {
	            if (_this.matrix.interacting) {
	              _this.down(_this.matrix.paintbrush);
	            }
	          });
	
	          this.move = function () {};
	          this.pad.addEventListener("mousemove", function (e) {
	            if (_this.matrix.interacting) {
	              if (!_this.offset) {
	                _this.offset = dom.findPosition(_this.element);
	              }
	              _this.mouse = dom.locateMouse(e, _this.offset);
	              _this.bend();
	            }
	          });
	
	          this.release = function () {
	            _this.matrix.interacting = false;
	          };
	          this.pad.addEventListener("mouseup", function () {
	            if (_this.matrix.interacting) {
	              _this.up();
	            }
	          });
	          this.pad.addEventListener("mouseout", function () {
	            if (_this.matrix.interacting) {
	              _this.up();
	            }
	          });
	        }
	      }
	    },
	    sizeInterface: {
	      value: function sizeInterface() {
	        this.pad.setAttribute("x", this.paddingColumn / 2);
	        this.pad.setAttribute("y", this.paddingRow / 2);
	        if (this.width > 2) {
	          this.pad.setAttribute("width", this.width - this.paddingColumn);
	        } else {
	          this.pad.setAttribute("width", this.width);
	        }
	        if (this.height > 2) {
	          this.pad.setAttribute("height", this.height - this.paddingRow);
	        } else {
	          this.pad.setAttribute("height", this.height);
	        }
	        this.pad.setAttribute("fill", this.matrix.colors.fill);
	      }
	    },
	    render: {
	      value: function render() {
	        if (!this.state) {
	          this.pad.setAttribute("fill", this.matrix.colors.fill);
	        } else {
	          this.pad.setAttribute("fill", this.matrix.colors.accent);
	        }
	      }
	    }
	  });
	
	  return MatrixCell;
	})(ButtonTemplate);
	
	/**
	 * Sequencer
	 *
	 * @description Grid of buttons with built-in step sequencer.
	 *
	 * @demo <div nexus-ui="sequencer" style="width:400px;height:200px;"></div>
	 *
	 * @example
	 * var sequencer = new Nexus.Sequencer('#target')
	 *
	 * @example
	 * var sequencer = new Nexus.Sequencer('#target',{
	 *  'size': [400,200],
	 *  'mode': 'toggle',
	 *  'rows': 5,
	 *  'columns': 10,
	 *  'paddingRow': 10,
	 *  'paddingColumn': 20
	 *})
	 *
	 * @output
	 * change
	 * Fires any time the interface's matrix changes. <br>
	 * The event data is an object containing <i>row</i> (number), <i>column</i> (number), and <i>state</i> (boolean) properties.
	 *
	 * @outputexample
	 * sequencer.on('change',function(v) {
	 *   console.log(v);
	 * })
	 *
	 * @output
	 * step
	 * Fires any time the sequencer steps to the next column, in sequece mode. <br>
	 * The event data is an <i>array</i> containing all values in the column, <i>bottom row first</i>.
	 *
	 * @outputexample
	 * sequencer.on('step',function(v) {
	 *   console.log(v);
	 * })
	 */
	
	var Sequencer = (function (_Interface) {
	  function Sequencer() {
	    _classCallCheck(this, Sequencer);
	
	    var options = ["value"];
	
	    var defaults = {
	      size: [400, 200],
	      mode: "toggle",
	      rows: 5,
	      columns: 10
	    };
	
	    _get(Object.getPrototypeOf(Sequencer.prototype), "constructor", this).call(this, arguments, options, defaults);
	
	    this.active = -1;
	
	    /**
	     * Button interaction mode: see Button
	     * @type {string}
	     * @example button.mode = 'toggle';
	     */
	    this.mode = this.settings.mode;
	
	    /**
	     * The interval object which controls timing and sequence scheduling.
	     * @type {interval}
	     */
	    this.interval = new Interval(200, function () {}, false); // jshint ignore:line
	
	    /**
	     * A Matrix model containing methods for manipulating the sequencer's array of values. To learn how to manipulate the matrix, read about the matrix model.
	     * @type {matrix}
	     */
	    this.matrix = new MatrixModel(this.settings.rows, this.settings.columns);
	    this.matrix.ui = this;
	
	    /**
	     * A Counter model which the sequencer steps through. For example, you could use this model to step through the sequencer in reverse, randomly, or in a drunk walk.
	     * @type {counter}
	     */
	    this.stepper = new CounterModel(0, this.columns);
	
	    this.paddingRow = this.settings.paddingRow;
	    this.paddingColumn = this.settings.paddingColumn;
	
	    this.init();
	  }
	
	  _inherits(Sequencer, _Interface);
	
	  _createClass(Sequencer, {
	    buildFrame: {
	      value: function buildFrame() {
	        this.element = document.createElement("div");
	        this.element.style.position = "relative";
	        this.element.style.display = "block";
	        this.element.style.width = "100%";
	        this.element.style.height = "100%";
	        this.parent.appendChild(this.element);
	        if (touch.exists) {
	          this.addTouchListeners();
	        }
	      }
	    },
	    buildInterface: {
	      value: function buildInterface() {
	        this.cells = [];
	        for (var i = 0; i < this.matrix.length; i++) {
	          var _location = this.matrix.locate(i);
	          // returns {row,col}
	
	          var container = document.createElement("span");
	          container.style.position = "absolute";
	
	          var cell = new MatrixCell(container, {
	            component: true,
	            index: i,
	            row: _location.row,
	            column: _location.column,
	            mode: this.mode,
	            matrix: this,
	            paddingRow: this.paddingRow,
	            paddingColumn: this.paddingColumn
	          }, this.keyChange.bind(this, i));
	
	          //  cell.matrix = this;
	          if (touch.exists) {
	            cell.pad.index = i;
	            cell.preClick = cell.preMove = cell.preRelease = function () {};
	            cell.click = cell.move = cell.release = function () {};
	            cell.preTouch = cell.preTouchMove = cell.preTouchRelease = function () {};
	            cell.touch = cell.touchMove = cell.touchRelease = function () {};
	          }
	
	          this.cells.push(cell);
	          this.element.appendChild(container);
	        }
	        this.sizeInterface();
	      }
	    },
	    sizeInterface: {
	      value: function sizeInterface() {
	        var cellWidth = this.width / this.columns;
	        var cellHeight = this.height / this.rows;
	
	        for (var i = 0; i < this.cells.length; i++) {
	          var container = this.cells[i].parent;
	          container.style.left = this.cells[i].column * cellWidth + "px";
	          container.style.top = this.cells[i].row * cellHeight + "px";
	          this.cells[i].resize(cellWidth, cellHeight);
	        }
	      }
	    },
	    colorInterface: {
	      value: function colorInterface() {
	        for (var i = 0; i < this.cells.length; i++) {
	          this.cells[i].render();
	        }
	      }
	    },
	    update: {
	      value: function update() {
	        var _this = this;
	
	        //  console.log("updating...")
	        //on = on || false;
	        this.matrix.iterate(function (r, c, i) {
	          //  console.log(this.matrix.pattern[r][c], this.cells[i].state);
	          if (_this.matrix.pattern[r][c] !== _this.cells[i].state) {
	            if (_this.matrix.pattern[r][c] > 0) {
	              _this.cells[i].turnOn();
	            } else {
	              _this.cells[i].turnOff();
	            }
	          }
	        });
	      }
	    },
	    keyChange: {
	
	      // update => cell.turnOn => cell.emit => keyChange (seq.emit) => matrix.set.cell => update
	      //
	      // interaction => keyChange => matrix.set.cell => update => cell.turnOn
	      //                                             => emit
	      //
	      // set.cell => update => needs to emit.
	
	      value: function keyChange(note, on) {
	        // emit data for any key turning on/off
	        // i is the note index
	        // v is whether it is on or off
	        var cell = this.matrix.locate(note);
	        //  this.matrix.set.cell(cell.column,cell.row,on);
	        this.matrix.pattern[cell.row][cell.column] = on;
	        var data = {
	          row: cell.row,
	          column: cell.column,
	          state: on
	        };
	        this.emit("change", data);
	      }
	    },
	    render: {
	      value: function render() {
	        var _this = this;
	
	        if (this.stepper.value >= 0) {
	          this.matrix.iterate(function (r, c, i) {
	            if (c === _this.stepper.value) {
	              _this.cells[i].pad.setAttribute("stroke", _this.colors.mediumLight);
	              _this.cells[i].pad.setAttribute("stroke-width", "1");
	              _this.cells[i].pad.setAttribute("stroke-opacity", "1");
	            } else {
	              _this.cells[i].pad.setAttribute("stroke", "none");
	            }
	          });
	        }
	      }
	    },
	    start: {
	
	      /**
	       * Start sequencing
	       * @param  {number} ms Beat tempo in milliseconds
	       */
	
	      value: function start(ms) {
	        this.interval.event = this.next.bind(this);
	        if (ms) {
	          this.interval.ms(ms);
	        }
	        this.interval.start();
	      }
	    },
	    stop: {
	
	      /**
	      Stop sequencing
	      */
	
	      value: function stop() {
	        this.interval.stop();
	      }
	    },
	    next: {
	
	      /**
	      Manually jump to the next column and trigger the 'change' event. The "next" column is determined by your mode of sequencing.
	      */
	
	      value: function next() {
	        this.stepper.next();
	        this.emit("step", this.matrix.column(this.stepper.value).reverse());
	        this.render();
	      }
	    },
	    addTouchListeners: {
	      value: function addTouchListeners() {
	        var _this = this;
	
	        this.preClick = this.preMove = this.preRelease = function () {};
	        this.click = this.move = this.release = function () {};
	        this.preTouch = this.preTouchMove = this.preTouchRelease = function () {};
	        this.touch = this.touchMove = this.touchRelease = function () {};
	
	        this.currentElement = false;
	
	        this.element.addEventListener("touchstart", function (e) {
	          var element = document.elementFromPoint(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
	          var cell = _this.cells[element.index];
	          _this.paintbrush = !cell.state;
	          cell.down(_this.paintbrush);
	          _this.currentElement = element.index;
	          e.preventDefault();
	          e.stopPropagation();
	        });
	
	        this.element.addEventListener("touchmove", function (e) {
	          var element = document.elementFromPoint(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
	          var cell = _this.cells[element.index];
	          if (element.index !== _this.currentElement) {
	            if (_this.currentElement >= 0) {
	              var pastCell = _this.cells[_this.currentElement];
	              pastCell.up();
	            }
	            cell.down(_this.paintbrush);
	          } else {
	            cell.bend();
	          }
	          _this.currentElement = element.index;
	          e.preventDefault();
	          e.stopPropagation();
	        });
	
	        this.element.addEventListener("touchend", function (e) {
	          // no touches to calculate because none remaining
	          var cell = _this.cells[_this.currentElement];
	          cell.up();
	          _this.interacting = false;
	          _this.currentElement = false;
	          e.preventDefault();
	          e.stopPropagation();
	        });
	      }
	    },
	    rows: {
	
	      /**
	      Number of rows in the sequencer
	      @type {number}
	      */
	
	      get: function () {
	        return this.matrix.rows;
	      },
	      set: function (v) {
	        this.matrix.rows = v;
	        this.empty();
	        this.buildInterface();
	        this.update();
	      }
	    },
	    columns: {
	
	      /**
	      Number of columns in the sequencer
	      @type {number}
	      */
	
	      get: function () {
	        return this.matrix.columns;
	      },
	      set: function (v) {
	        this.matrix.columns = v;
	        this.stepper.max = v;
	        this.empty();
	        this.buildInterface();
	        this.update();
	      }
	    }
	  });
	
	  return Sequencer;
	})(Interface);
	
	module.exports = Sequencer;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var math = _interopRequire(__webpack_require__(5));
	
	var Sequence = _interopRequire(__webpack_require__(26));
	
	// For the tutorial, looking at
	
	//Pattern section:
	// .create(), .rows, .columns,
	// .pattern, .length, .formatAsText(), .log(),
	// .locate(i), .indexOf(c,r)
	// row(), column() (returns contents of row or colum)
	
	//Control section:
	// toggle x3
	// set x4
	// rotate x3
	// populate x3
	// erase x3
	
	// should some version of this have a float value for each cell?
	// could be like a mirror .pattern that has values. by default, everything is 1, but could be set...
	// not a good way to do that on interface, but as a model it would be nice...
	// for .formatAsText(), could multiply by 100 and floor, so each cell is an int from 0 to 9
	
	var Matrix = (function () {
	  function Matrix(rows, columns) {
	    var _this = this;
	
	    _classCallCheck(this, Matrix);
	
	    // should also have ability to create using an existing matrix (2d array)
	    this.pattern = [];
	    this.create(rows, columns);
	
	    this.toggle = {
	      cell: function (column, row) {
	        _this.pattern[row][column] = !_this.pattern[row][column]; // math.invert(this.pattern[row][column]);
	        if (_this.ui) {
	          _this.ui.update();
	        }
	        return _this.pattern[row][column];
	      },
	      all: function () {
	        _this.iterate(function (r, c) {
	          _this.toggle.cell(c, r);
	        });
	        if (_this.ui) {
	          _this.ui.update();
	        }
	      },
	      row: function (row) {
	        for (var i = 0; i < _this.columns; i++) {
	          _this.toggle.cell(i, row);
	        }
	        if (_this.ui) {
	          _this.ui.update();
	        }
	      },
	      column: function (column) {
	        for (var i = 0; i < _this.rows; i++) {
	          _this.toggle.cell(column, i);
	        }
	        if (_this.ui) {
	          _this.ui.update();
	        }
	      }
	    };
	
	    this.set = {
	      cell: function (column, row, value) {
	        _this.pattern[row][column] = value;
	        if (_this.ui) {
	          _this.ui.update();
	        }
	      },
	      all: function (values) {
	        // set the whole matrix using a 2d array as input
	        // this should also resize the array?
	        _this.pattern = values;
	        if (_this.ui) {
	          _this.ui.update();
	        }
	      },
	      row: function (row, values) {
	        // set a row using an array as input
	        _this.pattern[row] = values;
	        if (_this.ui) {
	          _this.ui.update();
	        }
	      },
	      column: function (column, values) {
	        // set a column using an array as input
	        _this.pattern.forEach(function (row, i) {
	          _this.pattern[i][column] = values[i];
	        });
	        if (_this.ui) {
	          _this.ui.update();
	        }
	      }
	    };
	
	    this.rotate = {
	      //should eventually do (amountX, amountY) here
	      // could just use a loop and this.rotate.row(i,amountX);
	      all: function (amount) {
	        if (!amount && amount !== 0) {
	          amount = 1;
	        }
	        amount %= _this.pattern[0].length;
	        if (amount < 0) {
	          amount = _this.pattern[0].length + amount;
	        }
	        for (var i = 0; i < _this.rows; i++) {
	          var cut = _this.pattern[i].splice(_this.pattern[i].length - amount, amount);
	          _this.pattern[i] = cut.concat(_this.pattern[i]);
	        }
	        if (_this.ui) {
	          _this.ui.update();
	        }
	      },
	      row: function (row, amount) {
	        if (!amount && amount !== 0) {
	          amount = 1;
	        }
	        amount %= _this.pattern[0].length;
	        if (amount < 0) {
	          amount = _this.pattern[0].length + amount;
	        }
	        var cut = _this.pattern[row].splice(_this.pattern[row].length - amount, amount);
	        _this.pattern[row] = cut.concat(_this.pattern[row]);
	        if (_this.ui) {
	          _this.ui.update();
	        }
	      },
	      column: function (column, amount) {
	        if (!amount && amount !== 0) {
	          amount = 1;
	        }
	        amount %= _this.pattern.length;
	        if (amount < 0) {
	          amount = _this.pattern.length + amount;
	        }
	        var proxy = [];
	        _this.pattern.forEach(function (row) {
	          proxy.push(row[column]);
	        });
	        var cut = proxy.splice(proxy.length - amount, amount);
	        proxy = cut.concat(proxy);
	        _this.pattern.forEach(function (row, i) {
	          row[column] = proxy[i];
	        });
	        if (_this.ui) {
	          _this.ui.update();
	        }
	      }
	    };
	
	    // the idea behind populate is to be able to set a whole row or column to 0 or 1
	    // IF the value is a float, such as 0.7, then it would become a probability
	    // so populate(0.7) would give each cell a 70% chance of being 1
	    this.populate = {
	      all: function (odds) {
	        var oddsSequence = new Sequence(odds);
	        _this.iterate(function (r, c) {
	          _this.pattern[r][c] = math.coin(oddsSequence.next());
	        });
	        // This could be used so that each row has same odds pattern, even if row length is not divisibly by sequence length.
	        //,() => {
	        //  odds.pos = -1;
	        // }
	        if (_this.ui) {
	          _this.ui.update();
	        }
	      },
	      row: function () {
	        var row = arguments[0] === undefined ? 0 : arguments[0];
	        var odds = arguments[1] === undefined ? 1 : arguments[1];
	
	        var oddsSequence = new Sequence(odds);
	        _this.pattern[row].forEach(function (cell, i) {
	          _this.pattern[row][i] = math.coin(oddsSequence.next());
	        });
	        if (_this.ui) {
	          _this.ui.update();
	        }
	      },
	      column: function () {
	        var column = arguments[0] === undefined ? 0 : arguments[0];
	        var odds = arguments[1] === undefined ? 1 : arguments[1];
	
	        var oddsSequence = new Sequence(odds);
	        _this.pattern.forEach(function (row, i) {
	          _this.pattern[i][column] = math.coin(oddsSequence.next());
	        });
	        if (_this.ui) {
	          _this.ui.update();
	        }
	      }
	    };
	
	    // essentiall populate(0) so i'm not sure if this is necessary but is nice
	    this.erase = {
	      all: function () {
	        _this.set.all(0);
	      },
	      row: function (row) {
	        _this.set.row(row, 0);
	      },
	      column: function (column) {
	        _this.set.column(column, 0);
	      }
	    };
	
	    // end constructor
	  }
	
	  _createClass(Matrix, {
	    create: {
	      value: function create(rows, columns) {
	        var _this = this;
	
	        this.pattern = [];
	        for (var row = 0; row < rows; row++) {
	          var arr = new Array(columns);
	          this.pattern.push(arr);
	        }
	        this.iterate(function (r, c) {
	          _this.pattern[r][c] = false;
	        });
	      }
	    },
	    iterate: {
	      value: function iterate(f, f2) {
	        var i = 0;
	        for (var row = 0; row < this.rows; row++) {
	          if (f2) {
	            f2(row);
	          }
	          for (var column = 0; column < this.columns; column++) {
	            f(row, column, i);
	            i++;
	          }
	        }
	      }
	    },
	    formatAsText: {
	      value: function formatAsText() {
	        var _this = this;
	
	        var patternString = "";
	        this.iterate(function (r, c) {
	          patternString += (_this.pattern[r][c] ? 1 : 0) + " ";
	        }, function () {
	          patternString += "\n";
	        });
	        return patternString;
	      }
	    },
	    log: {
	      value: function log() {
	        console.log(this.formatAsText());
	      }
	    },
	    update: {
	      value: function update(pattern) {
	        this.pattern = pattern || this.pattern;
	      }
	    },
	    length: {
	      get: function () {
	        return this.rows * this.columns;
	      }
	    },
	    locate: {
	      value: function locate(index) {
	        // returns row and column of cell by index
	        return {
	          row: ~ ~(index / this.columns),
	          column: index % this.columns
	        };
	      }
	    },
	    indexOf: {
	      value: function indexOf(row, column) {
	        return column + row * this.columns;
	        // returns index of cell by row and column
	      }
	    },
	    row: {
	      value: (function (_row) {
	        var _rowWrapper = function row(_x) {
	          return _row.apply(this, arguments);
	        };
	
	        _rowWrapper.toString = function () {
	          return _row.toString();
	        };
	
	        return _rowWrapper;
	      })(function (row) {
	        var data = [];
	        for (var i = 0; i < this.columns; i++) {
	          data.push(this.pattern[row] ? 1 : 0);
	        }
	        return data;
	      })
	    },
	    column: {
	      value: (function (_column) {
	        var _columnWrapper = function column(_x2) {
	          return _column.apply(this, arguments);
	        };
	
	        _columnWrapper.toString = function () {
	          return _column.toString();
	        };
	
	        return _columnWrapper;
	      })(function (column) {
	        var data = [];
	        for (var i = 0; i < this.rows; i++) {
	          data.push(this.pattern[i][column] ? 1 : 0);
	        }
	        return data;
	      })
	    },
	    rows: {
	      get: function () {
	        return this.pattern.length;
	      },
	      set: function (v) {
	        var _this = this;
	
	        var previous = this.pattern.slice(0);
	        this.create(v, this.columns);
	        this.iterate(function (r, c) {
	          if (previous[r] && previous[r][c]) {
	            _this.pattern[r][c] = previous[r][c];
	          }
	        });
	      }
	    },
	    columns: {
	      get: function () {
	        return this.pattern[0].length;
	      },
	      set: function (v) {
	        var _this = this;
	
	        var previous = this.pattern.slice(0);
	        this.create(this.rows, v);
	        this.iterate(function (r, c) {
	          if (previous[r] && previous[r][c]) {
	            _this.pattern[r][c] = previous[r][c];
	          }
	        });
	      }
	    }
	  });
	
	  return Matrix;
	})();
	
	module.exports = Matrix;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var math = _interopRequire(__webpack_require__(5));
	
	var Drunk = _interopRequire(__webpack_require__(27));
	
	var Sequence = (function () {
	  function Sequence() {
	    var sequence = arguments[0] === undefined ? [0, 10, 20, 30] : arguments[0];
	    var mode = arguments[1] === undefined ? "up" : arguments[1];
	    var position = arguments[2] === undefined ? false : arguments[2];
	
	    _classCallCheck(this, Sequence);
	
	    this.values = sequence;
	    if (!Array.isArray(this.values)) {
	      this.values = [this.values];
	    }
	    this._mode = mode;
	    this.position = position;
	
	    this.drunkWalk = new Drunk(0, this.values.length - 1);
	
	    this.startValues = {
	      up: 0,
	      down: this.values.length - 1,
	      drunk: ~ ~(this.values.length / 2),
	      random: math.ri(this.values.length)
	    };
	
	    if (this.position !== false) {
	      this.next = this[this._mode];
	    } else {
	      this.next = this.first;
	    }
	  }
	
	  _createClass(Sequence, {
	    mode: {
	      get: function () {
	        return this._mode;
	      },
	      set: function (mode) {
	        if (!(mode === "up" || mode === "down" || mode === "random" || mode === "drunk")) {
	          console.error("The only modes currently allowed are: up, down, random, drunk");
	          return;
	        }
	        this._mode = mode;
	        if (this.position) {
	          this.next = this[this._mode];
	        }
	      }
	    },
	    value: {
	      get: function () {
	        return this.values[this.position];
	      },
	      set: function (v) {
	        this.position = this.values.indexOf(v);
	      }
	    },
	    first: {
	      value: function first() {
	        if (this.position !== false) {
	          this.next = this[this._mode];
	          return this.next();
	        }
	        this.position = this.startValues[this._mode];
	        this.next = this[this._mode];
	        return this.value;
	      }
	    },
	    up: {
	      value: function up() {
	        this.position++;
	        this.position %= this.values.length;
	        return this.value;
	      }
	    },
	    down: {
	      value: function down() {
	        this.position--;
	        if (this.position < 0) {
	          this.position = (this.position + this.values.length) % this.values.length;
	        }
	        return this.value;
	      }
	    },
	    random: {
	      value: function random() {
	        this.position = math.ri(0, this.values.length);
	        return this.value;
	      }
	    },
	    drunk: {
	      value: function drunk() {
	        this.drunkWalk.max = this.values.length;
	        this.drunkWalk.value = this.position;
	        this.position = this.drunkWalk.next();
	        return this.value;
	      }
	
	      /* future methods
	      .group(start,stop) -- outputs a group of n items from the list, with wrapping
	      .loop(start,stop) -- confines sequencing to a subset of the values
	          (could even have a distinction between .originalValues and the array of values being used)
	      */
	
	    }
	  });
	
	  return Sequence;
	})();
	
	module.exports = Sequence;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var math = _interopRequire(__webpack_require__(5));
	
	var Drunk = (function () {
	    function Drunk() {
	        var min = arguments[0] === undefined ? 0 : arguments[0];
	        var max = arguments[1] === undefined ? 9 : arguments[1];
	        var value = arguments[2] === undefined ? 0 : arguments[2];
	        var increment = arguments[3] === undefined ? 1 : arguments[3];
	        var loop = arguments[4] === undefined ? false : arguments[4];
	
	        _classCallCheck(this, Drunk);
	
	        this.min = min;
	        this.max = max;
	        this.value = value;
	        this.increment = increment;
	        this.loop = loop;
	    }
	
	    _createClass(Drunk, {
	        next: {
	            value: function next() {
	                this.value += math.pick(-1 * this.increment, this.increment);
	                if (this.value > this.max) {
	                    if (this.loop) {
	                        this.value = this.min;
	                    } else {
	                        this.value = this.max - this.increment;
	                    }
	                }
	
	                if (this.value < this.min) {
	                    if (this.loop) {
	                        this.value = this.max;
	                    } else {
	                        this.value = this.min + this.increment;
	                    }
	                }
	                return this.value;
	            }
	        }
	    });
	
	    return Drunk;
	})();
	
	module.exports = Drunk;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var math = _interopRequire(__webpack_require__(5));
	
	var Drunk = _interopRequire(__webpack_require__(27));
	
	var Counter = (function () {
	    function Counter() {
	        var min = arguments[0] === undefined ? 0 : arguments[0];
	        var max = arguments[1] === undefined ? 10 : arguments[1];
	        var mode = arguments[2] === undefined ? "up" : arguments[2];
	        var value = arguments[3] === undefined ? false : arguments[3];
	
	        _classCallCheck(this, Counter);
	
	        this.min = min;
	        this.max = max;
	        this.value = value;
	        this.mode = mode;
	        this.drunkWalk = new Drunk(this.min, this.max);
	        if (this.value !== false) {
	            this.next = this[this._mode];
	        } else {
	            this.next = this.first;
	        }
	    }
	
	    _createClass(Counter, {
	        mode: {
	            set: function (mode) {
	                if (!(mode === "up" || mode === "down" || mode === "random" || mode === "drunk")) {
	                    console.error("The only modes currently allowed are: up, down, random, drunk");
	                    return;
	                }
	                this._mode = mode;
	                if (this.value) {
	                    this.next = this[this._mode];
	                }
	            },
	            get: function () {
	                return this._mode;
	            }
	        },
	        first: {
	            value: function first() {
	                if (this.value !== false) {
	                    this.next = this[this._mode];
	                    return this.next();
	                }
	                this.startValues = {
	                    up: this.min,
	                    down: this.max,
	                    drunk: ~ ~math.average(this.min, this.max),
	                    random: math.ri(this.min, this.max)
	                };
	                this.value = this.startValues[this._mode];
	                this.next = this[this._mode];
	                return this.value;
	            }
	        },
	        up: {
	            value: function up() {
	                this.value++;
	                if (this.value >= this.max) {
	                    this.value = this.min;
	                }
	                return this.value;
	            }
	        },
	        down: {
	            value: function down() {
	                this.value--;
	                if (this.value < this.min) {
	                    this.value = this.max;
	                }
	                return this.value;
	            }
	        },
	        random: {
	            value: function random() {
	                this.value = math.ri(this.min, this.max);
	                return this.value;
	            }
	        },
	        drunk: {
	            value: function drunk() {
	                this.drunkWalk.min = this.min;
	                this.drunkWalk.max = this.max;
	                this.drunkWalk.value = this.value;
	                this.value = this.drunkWalk.next();
	                return this.value;
	            }
	        }
	    });
	
	    return Counter;
	})();
	
	module.exports = Counter;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var clock = __webpack_require__(1).clock;
	
	var Interval = (function () {
	  function Interval(rate, func, on) {
	    _classCallCheck(this, Interval);
	
	    this.rate = rate;
	    this.on = on;
	    this.clock = clock(); // jshint ignore:line
	
	    this.pattern = [1];
	    this.index = 0;
	
	    this.event = func ? func : function () {};
	
	    if (this.on) {
	      this.start();
	    }
	  }
	
	  _createClass(Interval, {
	    _event: {
	      value: function _event(e) {
	        //  if (this.pattern[this.index%this.pattern.length]) {
	        this.event(e);
	        //  }
	        this.index++;
	      }
	    },
	    stop: {
	      value: function stop() {
	        this.on = false;
	        this.interval.clear();
	      }
	    },
	    start: {
	      value: function start() {
	        this.on = true;
	        this.interval = this.clock.callbackAtTime(this._event.bind(this), this.clock.context.currentTime).repeat(this.rate / 1000).tolerance({ early: 0.1, late: 1 });
	      }
	    },
	    ms: {
	      value: function ms(newrate) {
	        if (this.on) {
	          var ratio = newrate / this.rate;
	          this.rate = newrate;
	          this.clock.timeStretch(this.clock.context.currentTime, [this.interval], ratio);
	        } else {
	          this.rate = newrate;
	        }
	      }
	    }
	  });
	
	  return Interval;
	})();
	
	module.exports = Interval;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var svg = __webpack_require__(4);
	var math = __webpack_require__(5);
	var Interface = __webpack_require__(6);
	var Step = __webpack_require__(11);
	
	var Interaction = _interopRequireWildcard(__webpack_require__(12));
	
	/**
	* Pan2D
	*
	* @description Interface for moving a sound around an array of speakers. Speaker locations can be customized. The interface calculates the closeness of the sound source to each speaker and returns that distance as a numeric value.
	*
	* @demo <span nexus-ui="pan2D"></span>
	*
	* @example
	* var pan2d = new Nexus.Pan2d('#target')
	*
	* @example
	* var pan2d = new Nexus.Pan2D('#target',{
	*   'size': [200,200],
	*   'range': 0.5,  // detection radius of each speaker
	*   'mode': 'absolute',   // 'absolute' or 'relative' sound movement
	*   'speakers': [  // the speaker [x,y] positions
	*       [0.5,0.2],
	*       [0.75,0.25],
	*       [0.8,0.5],
	*       [0.75,0.75],
	*       [0.5,0.8],
	*       [0.25,0.75]
	*       [0.2,0.5],
	*       [0.25,0.25]
	*   ]
	* })
	*
	* @output
	* change
	* Fires any time the "source" node's position changes. <br>
	* The event data is an array of the amplitudes (0-1), representing the level of each speaker (as calculated by its distance to the audio source).
	*
	* @outputexample
	* pan2d.on('change',function(v) {
	*   console.log(v);
	* })
	*
	*/
	
	var Pan2D = (function (_Interface) {
	  function Pan2D() {
	    _classCallCheck(this, Pan2D);
	
	    var options = ["range"];
	
	    var defaults = {
	      size: [200, 200],
	      range: 0.5,
	      mode: "absolute",
	      speakers: [[0.5, 0.2], [0.75, 0.25], [0.8, 0.5], [0.75, 0.75], [0.5, 0.8], [0.25, 0.75], [0.2, 0.5], [0.25, 0.25]]
	    };
	
	    _get(Object.getPrototypeOf(Pan2D.prototype), "constructor", this).call(this, arguments, options, defaults);
	
	    this.value = {
	      x: new Step(0, 1, 0, 0.5),
	      y: new Step(0, 1, 0, 0.5)
	    };
	
	    /**
	    Absolute or relative mouse interaction. In "absolute" mode, the source node will jump to your mouse position on mouse click. In "relative" mode, it does not.
	    */
	    this.mode = this.settings.mode;
	
	    this.position = {
	      x: new Interaction.Handle(this.mode, "horizontal", [0, this.width], [this.height, 0]),
	      y: new Interaction.Handle(this.mode, "vertical", [0, this.width], [this.height, 0])
	    };
	    this.position.x.value = this.value.x.normalized;
	    this.position.y.value = this.value.y.normalized;
	
	    /**
	    An array of speaker locations. Update this with .moveSpeaker() or .moveAllSpeakers()
	    */
	    this.speakers = this.settings.speakers;
	
	    /**
	    Rewrite: The maximum distance from a speaker that the source node can be for it to be heard from that speaker. A low range (0.1) will result in speakers only playing when the sound is very close it. Default is 0.5 (half of the interface).
	    */
	    this.range = this.settings.range;
	
	    /**
	    The current levels for each speaker. This is calculated when a source node or speaker node is moved through interaction or programatically.
	    */
	    this.levels = [];
	
	    this.init();
	
	    this.calculateLevels();
	    this.render();
	  }
	
	  _inherits(Pan2D, _Interface);
	
	  _createClass(Pan2D, {
	    buildInterface: {
	      value: function buildInterface() {
	
	        this.knob = svg.create("circle");
	
	        this.element.appendChild(this.knob);
	
	        // add speakers
	        this.speakerElements = [];
	
	        for (var i = 0; i < this.speakers.length; i++) {
	          var speakerElement = svg.create("circle");
	
	          this.element.appendChild(speakerElement);
	
	          this.speakerElements.push(speakerElement);
	        }
	      }
	    },
	    sizeInterface: {
	      value: function sizeInterface() {
	
	        this._minDimension = Math.min(this.width, this.height);
	
	        this.knobRadius = {
	          off: ~ ~(this._minDimension / 100) * 3 + 5 };
	        this.knobRadius.on = this.knobRadius.off * 2;
	
	        this.knob.setAttribute("cx", this.width / 2);
	        this.knob.setAttribute("cy", this.height / 2);
	        this.knob.setAttribute("r", this.knobRadius.off);
	
	        for (var i = 0; i < this.speakers.length; i++) {
	          var speakerElement = this.speakerElements[i];
	          var speaker = this.speakers[i];
	          speakerElement.setAttribute("cx", speaker[0] * this.width);
	          speakerElement.setAttribute("cy", speaker[1] * this.height);
	          speakerElement.setAttribute("r", this._minDimension / 20 + 5);
	          speakerElement.setAttribute("fill-opacity", "0");
	        }
	
	        this.position.x.resize([0, this.width], [this.height, 0]);
	        this.position.y.resize([0, this.width], [this.height, 0]);
	
	        // next, need to
	        // resize positions
	        // calculate speaker distances
	        this.calculateLevels();
	        this.render();
	      }
	    },
	    colorInterface: {
	      value: function colorInterface() {
	
	        this.element.style.backgroundColor = this.colors.fill;
	        this.knob.setAttribute("fill", this.colors.mediumLight);
	
	        for (var i = 0; i < this.speakers.length; i++) {
	          var speakerElement = this.speakerElements[i];
	          speakerElement.setAttribute("fill", this.colors.accent);
	          speakerElement.setAttribute("stroke", this.colors.accent);
	        }
	      }
	    },
	    render: {
	      value: function render() {
	        this.knobCoordinates = {
	          x: this.value.x.normalized * this.width,
	          y: this.height - this.value.y.normalized * this.height
	        };
	
	        this.knob.setAttribute("cx", this.knobCoordinates.x);
	        this.knob.setAttribute("cy", this.knobCoordinates.y);
	      }
	    },
	    click: {
	      value: function click() {
	        this.position.x.anchor = this.mouse;
	        this.position.y.anchor = this.mouse;
	        this.move();
	      }
	    },
	    move: {
	      value: function move() {
	        if (this.clicked) {
	          this.position.x.update(this.mouse);
	          this.position.y.update(this.mouse);
	          // position.x and position.y are normalized
	          // so are the levels
	          // likely don't need this.value at all -- only used for drawing
	          // not going to be a 'step' or 'min' and 'max' in this one.
	          this.calculateLevels();
	          this.emit("change", this.levels);
	          this.render();
	        }
	      }
	    },
	    release: {
	      value: function release() {
	        this.render();
	      }
	    },
	    normalized: {
	      get: function () {
	        return {
	          x: this.value.x.normalized,
	          y: this.value.y.normalized
	        };
	      }
	    },
	    calculateLevels: {
	      value: function calculateLevels() {
	        var _this = this;
	
	        this.value.x.updateNormal(this.position.x.value);
	        this.value.y.updateNormal(this.position.y.value);
	        this.levels = [];
	        this.speakers.forEach(function (s, i) {
	          var distance = math.distance(s[0] * _this.width, s[1] * _this.height, _this.position.x.value * _this.width, (1 - _this.position.y.value) * _this.height);
	          var level = math.clip(1 - distance / (_this.range * _this.width), 0, 1);
	          _this.levels.push(level);
	          _this.speakerElements[i].setAttribute("fill-opacity", level);
	        });
	      }
	    },
	    moveSource: {
	
	      /**
	      Move the audio source node and trigger the output event.
	      @param x {number} New x location, normalized 0-1
	      @param y {number} New y location, normalized 0-1
	      */
	
	      value: function moveSource(x, y) {
	        var location = {
	          x: x * this.width,
	          y: y * this.height
	        };
	        this.position.x.update(location);
	        this.position.y.update(location);
	        this.calculateLevels();
	        this.emit("change", this.levels);
	        this.render();
	      }
	    },
	    moveSpeaker: {
	
	      /**
	      Move a speaker node and trigger the output event.
	      @param index {number} Index of the speaker to move
	      @param x {number} New x location, normalized 0-1
	      @param y {number} New y location, normalized 0-1
	      */
	
	      value: function moveSpeaker(index, x, y) {
	
	        this.speakers[index] = [x, y];
	        this.speakerElements[index].setAttribute("cx", x * this.width);
	        this.speakerElements[index].setAttribute("cy", y * this.height);
	        this.calculateLevels();
	        this.emit("change", this.levels);
	        this.render();
	      }
	
	      /**
	      Set all speaker locations
	      @param locations {Array} Array of speaker locations. Each item in the array should be an array of normalized x and y coordinates.
	       setSpeakers(locations) {
	       }
	      */
	
	    }
	  });
	
	  return Pan2D;
	})(Interface);
	
	module.exports = Pan2D;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var math = __webpack_require__(5);
	var svg = __webpack_require__(4);
	var Interface = __webpack_require__(6);
	
	/**
	* Tilt
	*
	* @description Device tilt sensor with 2 or 3 axes (depending on your device and browser).
	*
	* @demo <span nexus-ui='tilt'></span>
	*
	* @example
	* var tilt = new Nexus.Tilt('#target')
	*
	* @output
	* change
	* Fires at a regular interval, as long as this interface is active (see the interface's <i>.active</i> property)<br>
	* The event data is an <i>object</i> containing x (number) and y (number) properties which represent the current tilt state of the device.
	*
	* @outputexample
	* tilt.on('change',function(v) {
	*   console.log(v);
	* })
	*
	*
	*/
	
	var Tilt = (function (_Interface) {
	  function Tilt() {
	    _classCallCheck(this, Tilt);
	
	    var options = ["value"];
	
	    var defaults = {
	      size: [80, 80]
	    };
	
	    _get(Object.getPrototypeOf(Tilt.prototype), "constructor", this).call(this, arguments, options, defaults);
	
	    this._active = true;
	
	    this.init();
	
	    // add event listener for device orientation
	
	    this.boundUpdate = this.update.bind(this);
	    //	this.boundMozTilt = this.mozTilt.bind(this)
	
	    if (window.DeviceOrientationEvent) {
	      this.orientationListener = window.addEventListener("deviceorientation", this.boundUpdate, false);
	    } else {
	      this._active = false;
	      this.colorInterface();
	    }
	
	    /*else if (window.OrientationEvent) {
	    //	  	window.addEventListener('MozOrientation', this.boundMozTilt, false);
	    } else {
	    console.log('Not supported on your device or browser.');
	    } */
	  }
	
	  _inherits(Tilt, _Interface);
	
	  _createClass(Tilt, {
	    buildInterface: {
	      value: function buildInterface() {
	
	        this.title = svg.create("text");
	        this.circleX = svg.create("circle");
	        this.circleY = svg.create("circle");
	        this.circleZ = svg.create("circle");
	
	        this.barX = svg.create("path");
	        this.barY = svg.create("path");
	        this.barZ = svg.create("path");
	
	        this.barX2 = svg.create("path");
	        this.barY2 = svg.create("path");
	        this.barZ2 = svg.create("path");
	
	        this.barX.setAttribute("opacity", "0.8");
	        this.barY.setAttribute("opacity", "0.8");
	        this.barZ.setAttribute("opacity", "0.8");
	        this.barX2.setAttribute("opacity", "0.8");
	        this.barY2.setAttribute("opacity", "0.8");
	        this.barZ2.setAttribute("opacity", "0.8");
	
	        this.circleX.setAttribute("cx", this.width * 3 / 12);
	        this.circleX.setAttribute("cy", this.height * 3 / 4);
	        this.circleX.setAttribute("r", this.height / 10);
	        this.circleX.setAttribute("opacity", "0.4");
	
	        this.circleY.setAttribute("cx", this.width * 6 / 12);
	        this.circleY.setAttribute("cy", this.height * 3 / 4);
	        this.circleY.setAttribute("r", this.height / 10);
	        this.circleY.setAttribute("opacity", "0.4");
	
	        this.circleZ.setAttribute("cx", this.width * 9 / 12);
	        this.circleZ.setAttribute("cy", this.height * 3 / 4);
	        this.circleZ.setAttribute("r", this.height / 10);
	        this.circleZ.setAttribute("opacity", "0.4");
	
	        this.barX.setAttribute("stroke-width", Math.round(this.height / 30));
	        this.barY.setAttribute("stroke-width", Math.round(this.height / 30));
	        this.barZ.setAttribute("stroke-width", Math.round(this.height / 30));
	
	        this.barX.setAttribute("fill", "none");
	        this.barY.setAttribute("fill", "none");
	        this.barZ.setAttribute("fill", "none");
	
	        this.barX2.setAttribute("stroke-width", Math.round(this.height / 30));
	        this.barY2.setAttribute("stroke-width", Math.round(this.height / 30));
	        this.barZ2.setAttribute("stroke-width", Math.round(this.height / 30));
	
	        this.barX2.setAttribute("fill", "none");
	        this.barY2.setAttribute("fill", "none");
	        this.barZ2.setAttribute("fill", "none");
	
	        this.title.setAttribute("x", this.width / 2);
	        this.title.setAttribute("y", this.height / 3 + 7);
	        this.title.setAttribute("font-size", "15px");
	        this.title.setAttribute("font-weight", "bold");
	        this.title.setAttribute("letter-spacing", "2px");
	        this.title.setAttribute("opacity", "0.7");
	        this.title.setAttribute("text-anchor", "middle");
	        this.title.textContent = "TILT";
	
	        this.element.appendChild(this.circleX);
	        this.element.appendChild(this.circleY);
	        this.element.appendChild(this.circleZ);
	
	        this.element.appendChild(this.barX);
	        this.element.appendChild(this.barY);
	        this.element.appendChild(this.barZ);
	
	        this.element.appendChild(this.barX2);
	        this.element.appendChild(this.barY2);
	        this.element.appendChild(this.barZ2);
	
	        this.element.appendChild(this.title);
	      }
	    },
	    colorInterface: {
	      value: function colorInterface() {
	
	        if (this._active) {
	          this.element.style.backgroundColor = this.colors.accent;
	          this.circleX.setAttribute("fill", this.colors.light);
	          this.circleY.setAttribute("fill", this.colors.light);
	          this.circleZ.setAttribute("fill", this.colors.light);
	          this.circleX.setAttribute("stroke", this.colors.light);
	          this.circleY.setAttribute("stroke", this.colors.light);
	          this.circleZ.setAttribute("stroke", this.colors.light);
	          this.barX.setAttribute("stroke", this.colors.light);
	          this.barY.setAttribute("stroke", this.colors.light);
	          this.barZ.setAttribute("stroke", this.colors.light);
	          this.barX2.setAttribute("stroke", this.colors.light);
	          this.barY2.setAttribute("stroke", this.colors.light);
	          this.barZ2.setAttribute("stroke", this.colors.light);
	          this.title.setAttribute("fill", this.colors.light);
	        } else {
	          this.element.style.backgroundColor = this.colors.fill;
	          this.circleX.setAttribute("fill", this.colors.mediumLight);
	          this.circleY.setAttribute("fill", this.colors.mediumLight);
	          this.circleZ.setAttribute("fill", this.colors.mediumLight);
	          this.circleX.setAttribute("stroke", this.colors.mediumLight);
	          this.circleY.setAttribute("stroke", this.colors.mediumLight);
	          this.circleZ.setAttribute("stroke", this.colors.mediumLight);
	          this.barX.setAttribute("stroke", this.colors.mediumLight);
	          this.barY.setAttribute("stroke", this.colors.mediumLight);
	          this.barZ.setAttribute("stroke", this.colors.mediumLight);
	          this.barX2.setAttribute("stroke", this.colors.mediumLight);
	          this.barY2.setAttribute("stroke", this.colors.mediumLight);
	          this.barZ2.setAttribute("stroke", this.colors.mediumLight);
	          this.title.setAttribute("fill", this.colors.mediumLight);
	        }
	      }
	    },
	    update: {
	      value: function update(v) {
	        if (this._active) {
	
	          var y = v.beta;
	          var x = v.gamma;
	          var z = v.alpha;
	
	          // take the original -90 to 90 scale and normalize it 0-1
	          x = math.scale(x, -90, 90, 0, 1);
	          y = math.scale(y, -90, 90, 0, 1);
	          z = math.scale(z, 0, 360, 0, 1);
	
	          var handlePoints = {
	            start: Math.PI * 1.5,
	            end: math.clip(math.scale(x, 0, 0.5, Math.PI * 1.5, Math.PI * 0.5), Math.PI * 0.5, Math.PI * 1.5)
	          };
	          var handle2Points = {
	            start: Math.PI * 2.5,
	            end: math.clip(math.scale(x, 0.5, 1, Math.PI * 2.5, Math.PI * 1.5), Math.PI * 1.5, Math.PI * 2.5)
	          };
	
	          var handlePath = svg.arc(this.circleX.cx.baseVal.value, this.circleX.cy.baseVal.value, this.circleX.r.baseVal.value, handlePoints.start, handlePoints.end);
	          var handle2Path = svg.arc(this.circleX.cx.baseVal.value, this.circleX.cy.baseVal.value, this.circleX.r.baseVal.value, handle2Points.start, handle2Points.end);
	
	          this.barX.setAttribute("d", handlePath);
	          this.barX2.setAttribute("d", handle2Path);
	
	          handlePoints = {
	            start: Math.PI * 1.5,
	            end: math.clip(math.scale(y, 0, 0.5, Math.PI * 1.5, Math.PI * 0.5), Math.PI * 0.5, Math.PI * 1.5)
	          };
	          handle2Points = {
	            start: Math.PI * 2.5,
	            end: math.clip(math.scale(y, 0.5, 1, Math.PI * 2.5, Math.PI * 1.5), Math.PI * 1.5, Math.PI * 2.5)
	          };
	
	          handlePath = svg.arc(this.circleY.cx.baseVal.value, this.circleY.cy.baseVal.value, this.circleY.r.baseVal.value, handlePoints.start, handlePoints.end);
	          handle2Path = svg.arc(this.circleY.cx.baseVal.value, this.circleY.cy.baseVal.value, this.circleY.r.baseVal.value, handle2Points.start, handle2Points.end);
	
	          this.barY.setAttribute("d", handlePath);
	          this.barY2.setAttribute("d", handle2Path);
	
	          handlePoints = {
	            start: Math.PI * 1.5,
	            end: math.clip(math.scale(z, 0, 0.5, Math.PI * 1.5, Math.PI * 0.5), Math.PI * 0.5, Math.PI * 1.5)
	          };
	          handle2Points = {
	            start: Math.PI * 2.5,
	            end: math.clip(math.scale(z, 0.5, 1, Math.PI * 2.5, Math.PI * 1.5), Math.PI * 1.5, Math.PI * 2.5)
	          };
	
	          handlePath = svg.arc(this.circleZ.cx.baseVal.value, this.circleZ.cy.baseVal.value, this.circleZ.r.baseVal.value, handlePoints.start, handlePoints.end);
	          handle2Path = svg.arc(this.circleZ.cx.baseVal.value, this.circleZ.cy.baseVal.value, this.circleZ.r.baseVal.value, handle2Points.start, handle2Points.end);
	
	          this.barZ.setAttribute("d", handlePath);
	          this.barZ2.setAttribute("d", handle2Path);
	
	          /*
	           let pointsX = {
	            start: 0,
	            end: math.scale( x, 0, 1, 0, Math.PI*2 )
	          };
	          //  console.log(this.circleX.cx.baseVal.value);
	           let pathX = svg.arc(this.circleX.cx.baseVal.value, this.circleX.cy.baseVal.value, this.circleX.r.baseVal.value*2, pointsX.start, pointsX.end);
	           this.barX.setAttribute('d',pathX); */
	
	          //this.textH.textContent = math.prune(x,2);
	          //this.textV.textContent = math.prune(y,2);
	          //
	          //  this.circleX.setAttribute('opacity',x);
	          //  this.circleY.setAttribute('opacity',y);
	          //  this.circleZ.setAttribute('opacity',z);
	
	          this.emit("change", {
	            x: x,
	            y: y,
	            z: z
	          });
	        }
	      }
	    },
	    click: {
	      value: function click() {
	        if (window.DeviceOrientationEvent) {
	          this.active = !this.active;
	        }
	      }
	    },
	    active: {
	
	      /**
	      Whether the interface is on (emitting values) or off (paused & not emitting values). Setting this property will update it.
	      @type {boolean}
	      */
	
	      get: function () {
	        return this._active;
	      },
	      set: function (on) {
	        this._active = on;
	        this.colorInterface();
	      }
	    },
	    customDestroy: {
	      value: function customDestroy() {
	        window.removeEventListener("deviceorientation", this.boundUpdate, false);
	      }
	    }
	  });
	
	  return Tilt;
	})(Interface);
	
	module.exports = Tilt;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var math = __webpack_require__(5);
	var svg = __webpack_require__(4);
	var Interface = __webpack_require__(6);
	
	/**
	 * Multislider
	 *
	 * @description Multislider
	 *
	 * @demo <span nexus-ui="multislider"></span>
	 *
	 * @example
	 * var multislider = new Nexus.Multislider('#target')
	 *
	 * @example
	 * var multislider = new Nexus.Multislider('#target',{
	 *  'size': [200,100],
	 *  'numberOfSliders': 5,
	 *  'min': 0,
	 *  'max': 1,
	 *  'step': 0,
	 *  'candycane': 3,
	 *  'values': [0.9,0.8,0.7,0.6,0.5,0.4,0.3,0.2,0.1],
	 *  'smoothing': 0,
	 *  'mode': 'bar'  // 'bar' or 'line'
	 *})
	 *
	 * @output
	 * change
	 * Fires any time the interface's value changes. <br>
	 * The event data is an object containing <i>index</i> and <i>value</i> properties
	 *
	 * @outputexample
	 * multislider.on('change',function(v) {
	 *   console.log(v);
	 * })
	 *
	 */
	
	var Multislider = (function (_Interface) {
	  function Multislider() {
	    _classCallCheck(this, Multislider);
	
	    var options = ["value"];
	
	    var defaults = {
	      size: [200, 100],
	      numberOfSliders: 5,
	      min: 0,
	      max: 1,
	      step: 0,
	      candycane: 3,
	      values: [0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1],
	      smoothing: 0,
	      mode: "bar" // 'bar', 'line'
	    };
	
	    _get(Object.getPrototypeOf(Multislider.prototype), "constructor", this).call(this, arguments, options, defaults);
	
	    this._numberOfSliders = this.settings.numberOfSliders;
	    this._min = this.settings.min;
	    this._max = this.settings.max;
	    this._step = this.settings.step;
	
	    this._mode = this.settings.mode;
	
	    /**
	    The current values of the slider. NOTE: Use this only to get the current values. Setting this array will not update the multislider. To set the multislider's values, use setSlider() or setAllSliders()
	    @type {Array}
	    */
	    var vs = this.settings.values;
	    this.values = vs.length > this._numberOfSliders ? vs.slice(0, this._numberOfSliders) : vs.concat(Array(this._numberOfSliders - vs.length).fill(0));
	
	    this.candycane = this.settings.candycane;
	
	    this.sliderWidth = this.width / this.values.length;
	
	    /**
	    Applies a simple low-pass filter to the multislider as it is interacted with. A smoothing of 0 will be no smoothing. A smoothing of 1 will smooth 1 slider on each side of the interaction. A smoothing of 2 will smooth 2 sliders on each side, and so on.
	    @type {Number}
	    */
	    this.smoothing = this.settings.smoothing;
	
	    this.init();
	    this.render();
	  }
	
	  _inherits(Multislider, _Interface);
	
	  _createClass(Multislider, {
	    buildInterface: {
	      value: function buildInterface() {
	        if (this._mode == "line") {
	          this.line = svg.create("polyline");
	          this.line.setAttribute("stroke-width", 2);
	          this.line.setAttribute("fill", "none");
	
	          this.element.appendChild(this.line);
	
	          this.fill = svg.create("polyline");
	          this.fill.setAttribute("fill-opacity", "0.2");
	
	          this.element.appendChild(this.fill);
	
	          this.nodes = [];
	
	          this.values.forEach((function (value, index) {
	            var node = svg.create("circle");
	
	            node.setAttribute("cx", this.getX(index));
	            node.setAttribute("cy", this.getY(value));
	
	            this.element.appendChild(node);
	            this.nodes.push(node);
	          }).bind(this));
	        } else {
	          this.bars = [];
	          this.caps = [];
	
	          this.values.forEach((function (value, index) {
	            var bar = svg.create("rect");
	
	            var x = this.getBarX(index);
	            var y = this.getY(value);
	
	            bar.setAttribute("x", x - 0.1);
	            bar.setAttribute("y", y);
	            bar.setAttribute("width", this.sliderWidth + 0.2);
	            bar.setAttribute("height", this.height);
	            bar.setAttribute("opacity", 1 - (index % this.candycane + 1) / (this.candycane + 1));
	
	            this.element.appendChild(bar);
	            this.bars.push(bar);
	
	            var cap = svg.create("rect");
	
	            cap.setAttribute("x", x - 0.1);
	            cap.setAttribute("y", y);
	            cap.setAttribute("width", this.sliderWidth + 0.2);
	            cap.setAttribute("height", 5);
	
	            this.element.appendChild(cap);
	            this.caps.push(cap);
	          }).bind(this));
	        }
	      }
	    },
	    getBarX: {
	      value: function getBarX(index) {
	        return this.getX(index) - this.sliderWidth / 2;
	      }
	    },
	    getX: {
	      value: function getX(index) {
	        //return Math.floor( index * this.sliderWidth + this.sliderWidth/2 );
	        return index * this.sliderWidth + this.sliderWidth / 2;
	      }
	    },
	    getY: {
	      value: function getY(value) {
	        return math.scale(value, this._min, this._max, this.height, 0); //(1 - value) * this.height;
	      }
	    },
	    getValueFromY: {
	      value: function getValueFromY(y) {
	        var scaleAdjusted = math.scale(y, this.height, 0, this._min, this._max);
	        return this.adjustValueToStep(scaleAdjusted);
	      }
	    },
	    getIndexFromX: {
	      value: function getIndexFromX(x) {
	        return math.clip(Math.floor(x / this.width * this.values.length), 0, this.values.length - 1);
	      }
	    },
	    adjustValueToStep: {
	      value: function adjustValueToStep(value) {
	        if (!this._step) {
	          return value;
	        }
	        var offset = value % this._step;
	        value = value - value % this._step;
	        if (offset > this._step / 2) {
	          value += this._step;
	        }
	        return value;
	      }
	    },
	    adjustAllValues: {
	      value: function adjustAllValues() {
	        this.values.forEach((function (value, index) {
	          value = this.adjustValueToStep(value);
	          this.values[index] = math.clip(value, this._min, this._max);
	        }).bind(this));
	      }
	    },
	    getNormalizedValues: {
	      value: function getNormalizedValues() {
	        this.normalizedValues = [];
	        this.values.forEach((function (value) {
	          this.normalizedValues.push(math.scale(value, this._min, this._max, 0, 1));
	        }).bind(this));
	      }
	    },
	    colorInterface: {
	      value: function colorInterface() {
	        var _this = this;
	
	        this.element.style.backgroundColor = this.colors.fill;
	
	        if (this._mode == "line") {
	          this.line.setAttribute("stroke", this.colors.accent);
	          this.fill.setAttribute("fill", this.colors.accent);
	          this.nodes.forEach(function (node) {
	            node.setAttribute("fill", _this.colors.accent);
	          });
	        } else {
	          this.bars.forEach(function (bar) {
	            bar.setAttribute("fill", _this.colors.accent);
	          });
	          this.caps.forEach(function (cap) {
	            cap.setAttribute("fill", _this.colors.accent);
	          });
	        }
	      }
	    },
	    sizeInterface: {
	      value: function sizeInterface() {
	        this.sliderWidth = this.width / this.values.length;
	
	        if (this._mode == "line") {
	          this.nodes.forEach((function (node) {
	            var r = ~ ~(Math.min(this.width, this.height) / 50) + 2;
	            r = Math.min(this.sliderWidth, r);
	            node.setAttribute("r", r);
	          }).bind(this));
	        }
	
	        this.render();
	      }
	    },
	    render: {
	      value: function render() {
	        var _this = this;
	
	        if (this._mode == "line") {
	          (function () {
	            var data = "0 " + _this.getY(_this.values[0]) + ", ";
	
	            _this.values.forEach(function (value, index) {
	              var x = _this.getX(index);
	              var y = _this.getY(value);
	              data += x + " " + y + ", ";
	              _this.nodes[index].setAttribute("cx", _this.getX(index));
	              _this.nodes[index].setAttribute("cy", _this.getY(value));
	            });
	
	            data += _this.width + " " + _this.getY(_this.values[_this.values.length - 1]);
	
	            _this.line.setAttribute("points", data);
	
	            // fill data
	            // add bottom corners
	
	            data += ", " + _this.width + " " + _this.height + ", ";
	            data += "0 " + _this.height;
	
	            _this.fill.setAttribute("points", data);
	          })();
	        } else {
	          this.values.forEach(function (value, index) {
	            _this.bars[index].setAttribute("y", _this.getY(value));
	            _this.caps[index].setAttribute("y", _this.getY(value));
	          });
	        }
	      }
	    },
	    click: {
	      value: function click() {
	        this.hasMoved = false;
	        this.previousSlider = false;
	        this.move();
	      }
	    },
	    move: {
	      value: function move() {
	        if (this.clicked) {
	          this.mouse.x = math.clip(this.mouse.x, 0, this.width);
	          this.mouse.y = math.clip(this.mouse.y, 0, this.height);
	          this.hasMoved = true;
	
	          this.selectedSlider = this.getIndexFromX(this.mouse.x);
	
	          this.values[this.selectedSlider] = this.getValueFromY(this.mouse.y);
	
	          /* handle interpolation for in-between sliders */
	
	          if (this.previousSlider !== false) {
	            var distance = Math.abs(this.previousSlider - this.selectedSlider);
	            if (distance > 1) {
	              var low = Math.min(this.previousSlider, this.selectedSlider);
	              var high = Math.max(this.previousSlider, this.selectedSlider);
	              var lowValue = this.values[low];
	              var highValue = this.values[high];
	              for (var _i = low; _i < high; _i++) {
	                this.values[_i] = math.interp((_i - low) / distance, lowValue, highValue);
	                this.values[_i] = this.adjustValueToStep(this.values[_i]);
	              }
	            }
	          }
	
	          if (this.smoothing > 0) {
	            for (var i = 1; i <= this.smoothing; i++) {
	              var downCenter = this.selectedSlider - i;
	              var upCenter = this.selectedSlider + i;
	
	              if (downCenter >= 1) {
	                var downLowerNeighbor = downCenter - 1 >= 0 ? downCenter - 1 : 0;
	                var downUpperNeighbor = downCenter + 1;
	                this.values[downCenter] = (this.values[downLowerNeighbor] + this.values[downUpperNeighbor]) / 2;
	                this.values[downCenter] = this.adjustValueToStep(this.values[downCenter]);
	              }
	
	              if (upCenter < this.values.length - 1) {
	                var upLowerNeighbor = upCenter - 1;
	                var upUpperNeighbor = upCenter + 1 < this.values.length ? upCenter + 1 : this.values.length - 1;
	                this.values[upCenter] = (this.values[upLowerNeighbor] + this.values[upUpperNeighbor]) / 2;
	                this.values[upCenter] = this.adjustValueToStep(this.values[upCenter]);
	              }
	            }
	          }
	
	          this.previousSlider = this.selectedSlider;
	
	          this.emit("change", this.values);
	          this.render();
	        }
	      }
	    },
	    scan: {
	
	      // would be a cool API call to have for later...
	
	      value: function scan() {}
	    },
	    update: {
	      value: function update(index, value) {
	        this.values[index] = this.adjustValueToStep(value);
	        this.emit("change", {
	          index: index,
	          value: value
	        });
	      }
	    },
	    numberOfSliders: {
	
	      /**
	      Get the number of sliders
	      @type {Number}
	      */
	
	      get: function () {
	        return this.values.length;
	      }
	    },
	    min: {
	
	      /**
	      Lower limit of the multislider's output range
	      @type {number}
	      @example multislider.min = 1000;
	      */
	
	      get: function () {
	        return this._min;
	      },
	      set: function (v) {
	        this._min = v;
	        this.adjustAllValues();
	        this.render();
	      }
	    },
	    max: {
	
	      /**
	      Upper limit of the multislider's output range
	      @type {number}
	      @example multislider.max = 1000;
	      */
	
	      get: function () {
	        return this._max;
	      },
	      set: function (v) {
	        this._max = v;
	        this.adjustAllValues();
	        this.render();
	      }
	    },
	    step: {
	
	      /**
	      The increment that the multislider's value changes by.
	      @type {number}
	      @example multislider.step = 5;
	      */
	
	      get: function () {
	        return this._step;
	      },
	      set: function (v) {
	        this._step = v;
	        this.adjustAllValues();
	        this.render();
	      }
	    },
	    setSlider: {
	
	      /**
	      Set the value of an individual slider
	      @param index {number} Slider index
	      @param value {number} New slider value
	      @example
	      // Set the first slider to value 0.5
	      multislider.setSlider(0,0.5)
	      */
	
	      value: function setSlider(index, value) {
	        this.values[index] = this.adjustValueToStep(value);
	        this.values[index] = math.clip(this.values[index], this._min, this._max);
	        this.emit("change", {
	          index: index,
	          value: value
	        });
	      }
	    },
	    setAllSliders: {
	
	      /**
	      Set the value of all sliders at once. If the size of the input array does not match the current number of sliders, the value array will repeat until all sliders have been set. I.e. an input array of length 1 will set all sliders to that value.
	      @param values {Array} All slider values
	      @example
	      multislider.setAllSliders([0.2,0.3,0.4,0.5,0.6])
	      */
	
	      value: function setAllSliders(values) {
	        var previousLength = this.values.length;
	        var newLength = values.length;
	        this.values = values;
	        this.adjustAllValues();
	        if (previousLength != newLength) {
	          this.empty();
	          this.buildInterface();
	          this.colorInterface();
	        }
	        this.sizeInterface();
	      }
	    }
	  });
	
	  return Multislider;
	})(Interface);
	
	module.exports = Multislider;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var svg = __webpack_require__(4);
	var math = __webpack_require__(5);
	var Interface = __webpack_require__(6);
	var Step = __webpack_require__(11);
	
	var Interaction = _interopRequireWildcard(__webpack_require__(12));
	
	/**
	* Pan
	*
	* @description Stereo crossfader.
	*
	* @demo <span nexus-ui="pan"></span>
	*
	* @example
	* var pan = new Nexus.Pan('#target')
	*
	* @output
	* change
	* Fires any time the interface's value changes. <br>
	* The event data is an object containing the interface's <i>value</i> (-1 to 1), as well as <i>L</i> and <i>R</i> amplitude values (0-1) for left and right speakers, calculated by a square-root crossfade algorithm.
	*
	* @outputexample
	* pan.on('change',function(v) {
	*   console.log(v);
	* })
	*
	*
	*/
	
	var Pan = (function (_Interface) {
	  function Pan() {
	    _classCallCheck(this, Pan);
	
	    var options = ["scale", "value"];
	
	    var defaults = {
	      size: [120, 20],
	      orientation: "horizontal",
	      mode: "relative",
	      scale: [-1, 1],
	      step: 0,
	      value: 0,
	      hasKnob: true
	    };
	
	    _get(Object.getPrototypeOf(Pan.prototype), "constructor", this).call(this, arguments, options, defaults);
	
	    this.orientation = this.settings.orientation;
	
	    this.mode = this.settings.mode;
	
	    this.hasKnob = this.settings.hasKnob;
	
	    // this.step should eventually be get/set
	    // updating it will update the _value step model
	    this.step = this.settings.step; // float
	
	    this._value = new Step(this.settings.scale[0], this.settings.scale[1], this.settings.step, this.settings.value);
	
	    this.init();
	
	    this.position = new Interaction.Handle(this.mode, this.orientation, [0, this.width], [this.height, 0]);
	    this.position.value = this._value.normalized;
	
	    this.value = this._value.value;
	
	    this.emit("change", this.value);
	  }
	
	  _inherits(Pan, _Interface);
	
	  _createClass(Pan, {
	    buildInterface: {
	      value: function buildInterface() {
	
	        this.bar = svg.create("rect");
	        this.knob = svg.create("circle");
	
	        this.element.appendChild(this.bar);
	        this.element.appendChild(this.knob);
	      }
	    },
	    sizeInterface: {
	      value: function sizeInterface() {
	
	        if (this.position) {
	          this.position.resize([0, this.width], [this.height, 0]);
	        }
	
	        if (this.width < this.height) {
	          this.orientation = "vertical";
	        } else {
	          this.orientation = "horizontal";
	        }
	
	        var x = undefined,
	            y = undefined,
	            w = undefined,
	            h = undefined,
	            barOffset = undefined,
	            cornerRadius = undefined;
	        this.knobData = {
	          level: 0,
	          r: 0
	        };
	
	        if (this.orientation === "vertical") {
	          this.thickness = this.width / 2;
	          x = this.width / 2;
	          y = 0;
	          w = this.thickness;
	          h = this.height;
	          this.knobData.r = this.thickness * 0.8;
	          this.knobData.level = h - this.knobData.r - this.normalized * (h - this.knobData.r * 2);
	          barOffset = "translate(" + this.thickness * -1 / 2 + ",0)";
	          cornerRadius = w / 2;
	        } else {
	          this.thickness = this.height / 2;
	          x = 0;
	          y = this.height / 2;
	          w = this.width;
	          h = this.thickness;
	          this.knobData.r = this.thickness * 0.8;
	          this.knobData.level = this.normalized * (w - this.knobData.r * 2) + this.knobData.r;
	          barOffset = "translate(0," + this.thickness * -1 / 2 + ")";
	          cornerRadius = h / 2;
	        }
	
	        this.bar.setAttribute("x", x);
	        this.bar.setAttribute("y", y);
	        this.bar.setAttribute("transform", barOffset);
	        this.bar.setAttribute("rx", cornerRadius); // corner radius
	        this.bar.setAttribute("ry", cornerRadius);
	        this.bar.setAttribute("width", w);
	        this.bar.setAttribute("height", h);
	
	        if (this.orientation === "vertical") {
	          this.knob.setAttribute("cx", x);
	          this.knob.setAttribute("cy", this.knobData.level);
	        } else {
	          this.knob.setAttribute("cx", this.knobData.level);
	          this.knob.setAttribute("cy", y);
	        }
	        this.knob.setAttribute("r", this.knobData.r);
	      }
	    },
	    colorInterface: {
	      value: function colorInterface() {
	
	        this.bar.setAttribute("fill", this.colors.fill);
	        this.knob.setAttribute("fill", this.colors.accent);
	
	        if (!this.hasKnob) {
	          this.knob.setAttribute("fill", "transparent");
	        }
	      }
	    },
	    render: {
	      value: function render() {
	        if (!this.clicked) {
	          this.knobData.r = this.thickness * 0.75;
	        }
	        this.knob.setAttribute("r", this.knobData.r);
	
	        if (this.orientation === "vertical") {
	          this.knobData.level = this.knobData.r + this._value.normalized * (this.height - this.knobData.r * 2);
	          this.knob.setAttribute("cy", this.height - this.knobData.level);
	        } else {
	          this.knobData.level = this._value.normalized * (this.width - this.knobData.r * 2) + this.knobData.r;
	          this.knob.setAttribute("cx", this.knobData.level);
	        }
	      }
	    },
	    click: {
	      value: function click() {
	        this.knobData.r = this.thickness * 0.9;
	        this.position.anchor = this.mouse;
	        this.move();
	      }
	    },
	    move: {
	      value: function move() {
	        if (this.clicked) {
	          this.position.update(this.mouse);
	
	          this.value = this._value.updateNormal(this.position.value);
	
	          this.emit("change", {
	            value: this.value,
	            L: Math.pow(math.scale(this.value, -1, 1, 1, 0), 2),
	            R: Math.pow(math.scale(this.value, -1, 1, 0, 1), 2)
	          });
	        }
	      }
	    },
	    release: {
	      value: function release() {
	        this.render();
	      }
	    },
	    value: {
	
	      /**
	      The position of crossfader, from -1 (left) to 1 (right). Setting this value updates the interface and triggers the output event.
	      @type {number}
	      */
	
	      get: function () {
	        return this._value.value;
	      },
	      set: function (value) {
	        this._value.update(value);
	        this.position.value = this._value.normalized;
	        this.emit("change", {
	          value: this.value,
	          L: Math.pow(math.scale(this.value, -1, 1, 1, 0), 2),
	          R: Math.pow(math.scale(this.value, -1, 1, 0, 1), 2)
	        });
	        this.render();
	      }
	    },
	    normalized: {
	      get: function () {
	        return this._value.normalized;
	      }
	    }
	  });
	
	  return Pan;
	})(Interface);
	
	module.exports = Pan;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var math = __webpack_require__(5);
	var svg = __webpack_require__(4);
	var Interface = __webpack_require__(6);
	
	var Point = function Point(point, envelope) {
	
	  this.x = point.x;
	  this.y = point.y;
	
	  this.xMin = point.xMin || 0;
	  this.xMax = point.xMax || 1;
	  this.yMin = point.yMin || 0;
	  this.yMax = point.yMax || 1;
	
	  this.envelope = envelope;
	
	  this.element = svg.create("circle");
	  this.element.setAttribute("fill", this.envelope.colors.accent);
	
	  this.envelope.element.appendChild(this.element);
	
	  this.resize = function () {
	    var r = ~ ~(Math.min(this.envelope.width, this.envelope.height) / 50) + 2;
	    this.element.setAttribute("r", r);
	  };
	
	  this.move = function (x, y) {
	
	    this.x = x || x === 0 ? x : this.x;
	    this.y = y || y === 0 ? y : this.y;
	
	    if (this.envelope.nodes.indexOf(this) >= 0) {
	
	      var prevIndex = this.envelope.nodes.indexOf(this) - 1;
	      var nextIndex = this.envelope.nodes.indexOf(this) + 1;
	
	      var prevNode = this.envelope.nodes[prevIndex];
	      var nextNode = this.envelope.nodes[nextIndex];
	
	      var lowX = prevIndex >= 0 ? prevNode.x : 0;
	      lowX = lowX < this.xMin ? this.xMin : lowX;
	
	      var highX = nextIndex < this.envelope.nodes.length ? nextNode.x : 1;
	      highX = highX > this.xMax ? this.xMax : highX;
	
	      if (this.x < lowX) {
	        this.x = lowX;
	      }
	      if (this.x > highX) {
	        this.x = highX;
	      }
	
	      if (this.y < this.yMin) {
	        this.y = this.yMin;
	      }
	      if (this.y > this.yMax) {
	        this.y = this.yMax;
	      }
	    }
	
	    this.location = this.getCoordinates();
	    this.element.setAttribute("cx", this.location.x);
	    this.element.setAttribute("cy", this.location.y);
	  };
	
	  this.getCoordinates = function () {
	    return {
	      x: this.x * this.envelope.width,
	      y: (1 - this.y) * this.envelope.height
	    };
	  };
	
	  this.move(this.x, this.y, true);
	  this.resize();
	
	  this.destroy = function () {
	    this.envelope.element.removeChild(this.element);
	    this.envelope.nodes.splice(this.envelope.nodes.indexOf(this), 1);
	  };
	};
	
	/**
	* Envelope
	*
	* @description Interactive linear ramp visualization.
	*
	* @demo <span nexus-ui="envelope"></span>
	*
	* @example
	* var envelope = new Nexus.Envelope('#target')
	*
	* @example
	* var envelope = new Nexus.Envelope('#target',{
	*   'size': [300,150],
	*   'noNewPoints': false,
	*   'points': [
	*     {
	*       x: 0.1,
	*       y: 0.4
	*     },
	*     {
	*       x: 0.35,
	*       y: 0.6
	*     },
	*     {
	*       x: 0.65,
	*       y: 0.2
	*     },
	*     {
	*       x: 0.9,
	*       y: 0.4
	*     },
	*   ]
	* })
	*
	* @output
	* change
	* Fires any time a node is moved. <br>
	* The event data is an array of point locations. Each item in the array is an object containing <i>x</i> and <i>y</i> properties describing the location of a point on the envelope.
	*
	* @outputexample
	* envelope.on('change',function(v) {
	*   console.log(v);
	* })
	*
	*/
	
	var Envelope = (function (_Interface) {
	  function Envelope() {
	    _classCallCheck(this, Envelope);
	
	    var options = ["value"];
	
	    var defaults = {
	      size: [300, 150],
	      noNewPoints: false,
	      points: [{
	        x: 0.1,
	        y: 0.4
	      }, {
	        x: 0.35,
	        y: 0.6
	      }, {
	        x: 0.65,
	        y: 0.2
	      }, {
	        x: 0.9,
	        y: 0.4
	      }]
	    };
	
	    _get(Object.getPrototypeOf(Envelope.prototype), "constructor", this).call(this, arguments, options, defaults);
	
	    this.points = this.settings.points;
	
	    this.nodes = [];
	
	    this.selected = false;
	
	    this.init();
	  }
	
	  _inherits(Envelope, _Interface);
	
	  _createClass(Envelope, {
	    buildInterface: {
	      value: function buildInterface() {
	        var _this = this;
	
	        this.points.forEach(function (point) {
	          var node = new Point(point, _this);
	          _this.nodes.push(node);
	        });
	
	        this.sortPoints();
	
	        this.line = svg.create("polyline");
	        this.line.setAttribute("stroke-width", 2);
	        this.line.setAttribute("fill", "none");
	
	        this.element.appendChild(this.line);
	
	        this.fill = svg.create("polyline");
	        this.fill.setAttribute("fill-opacity", "0.2");
	
	        this.element.appendChild(this.fill);
	      }
	    },
	    sizeInterface: {
	      value: function sizeInterface() {
	
	        for (var i = 0; i < this.nodes.length; i++) {
	          this.nodes[i].resize();
	          this.nodes[i].move();
	        }
	
	        this.render();
	      }
	    },
	    colorInterface: {
	      value: function colorInterface() {
	        var _this = this;
	
	        this.element.style.backgroundColor = this.colors.fill;
	        this.line.setAttribute("stroke", this.colors.accent);
	        this.fill.setAttribute("fill", this.colors.accent);
	        this.nodes.forEach(function (node) {
	          node.element.setAttribute("fill", _this.colors.accent);
	        });
	      }
	    },
	    render: {
	      value: function render() {
	        //  this.nodes[this.selected].move( this.points )
	        this.calculatePath();
	      }
	    },
	    calculatePoints: {
	      value: function calculatePoints() {
	        var _this = this;
	
	        this.points = [];
	        this.nodes.forEach(function (node) {
	          _this.points.push({ x: node.x, y: node.y });
	        });
	      }
	    },
	    calculatePath: {
	      value: function calculatePath() {
	
	        //stroke data
	        var data = "0 " + this.nodes[0].location.y + ", ";
	
	        // data should be re-ordered based on x location.
	        // whatever function adds a node should add it at the right index
	
	        this.nodes.forEach(function (node) {
	          //  let location = node.getCoordinates();
	          data += node.location.x + " " + node.location.y + ", ";
	        });
	
	        //  data += point.x*this.width+' '+ point.y*this.height+', ';
	        data += this.width + " " + this.nodes[this.nodes.length - 1].location.y;
	
	        this.line.setAttribute("points", data);
	
	        // fill data
	        // add bottom corners
	
	        data += ", " + this.width + " " + this.height + ", ";
	        data += "0 " + this.height;
	
	        this.fill.setAttribute("points", data);
	      }
	    },
	    click: {
	      value: function click() {
	        // find nearest node and set this.selected (index)
	        this.hasMoved = false;
	        this.selected = this.findNearestNode();
	
	        this.nodes[this.selected].move(this.mouse.x / this.width, 1 - this.mouse.y / this.height);
	        this.scaleNode(this.selected);
	
	        // must do this b/c new node may have been created
	        this.calculatePoints();
	        this.emit("change", this.points);
	        this.render();
	      }
	    },
	    move: {
	      value: function move() {
	        if (this.clicked) {
	          this.mouse.x = math.clip(this.mouse.x, 0, this.width);
	          this.hasMoved = true;
	
	          this.nodes[this.selected].move(this.mouse.x / this.width, 1 - this.mouse.y / this.height);
	          this.scaleNode(this.selected);
	
	          this.calculatePoints();
	          this.emit("change", this.points);
	          this.render();
	        }
	      }
	    },
	    release: {
	      value: function release() {
	
	        if (!this.hasMoved) {
	          this.nodes[this.selected].destroy();
	        }
	
	        this.calculatePoints();
	        this.emit("change", this.points);
	        this.render();
	
	        // reset this.selected
	        this.selected = null;
	      }
	    },
	    findNearestNode: {
	      value: function findNearestNode() {
	        var nearestIndex = null;
	        // set this unreasonably high so that every distance will be lower than it.
	        var nearestDist = 10000;
	        var before = false;
	        var x = this.mouse.x / this.width;
	        var y = 1 - this.mouse.y / this.height;
	        var nodes = this.nodes;
	        for (var i = 0; i < nodes.length; i++) {
	
	          // calculate the distance from mouse to this node using pythagorean theorem
	          var distance = Math.sqrt(Math.pow(nodes[i].x - x, 2) + Math.pow(nodes[i].y - y, 2));
	
	          // if this distance is less than the previous shortest distance, use this index
	          if (distance < nearestDist) {
	            nearestDist = distance;
	            nearestIndex = i;
	            before = x > nodes[i].x;
	          }
	        }
	
	        // if not very close to any node, create a node
	        if (!this.settings.noNewPoints && nearestDist > 0.07) {
	
	          nearestIndex = this.getIndexFromX(this.mouse.x / this.width);
	
	          this.nodes.splice(nearestIndex, 0, new Point({
	            x: this.mouse.x / this.width,
	            y: 1 - this.mouse.y / this.height
	          }, this));
	          this.hasMoved = true;
	        }
	
	        return nearestIndex;
	      }
	    },
	    getIndexFromX: {
	      value: function getIndexFromX(x) {
	        var _this = this;
	
	        var index = 0;
	        this.nodes.forEach(function (node, i) {
	          if (_this.nodes[i].x <= x) {
	            index = i + 1;
	          }
	        });
	        return index;
	      }
	    },
	    scaleNode: {
	      value: function scaleNode(i) {
	
	        var clippedX = math.clip(this.nodes[i].x, 0, 1);
	        var clippedY = math.clip(this.nodes[i].y, 0, 1);
	
	        this.nodes[i].move(clippedX, clippedY);
	      }
	    },
	    sortPoints: {
	
	      /**
	      Sort the this.points array from left-most point to right-most point. You should not regularly need to use this, however it may be useful if the points get unordered.
	      */
	
	      value: function sortPoints() {
	        this.nodes.sort(function (a, b) {
	          return a.x > b.x;
	        });
	      }
	    },
	    addPoint: {
	
	      /**
	      Add a breakpoint on the envelope.
	      @param x {number} x location of the point, normalized (0-1)
	      @param y {number} y location of the point, normalized (0-1)
	      */
	
	      value: function addPoint(x, y) {
	        var index = this.nodes.length;
	
	        this.sortPoints();
	
	        for (var i = 0; i < this.nodes.length; i++) {
	          if (x < this.nodes[i].x) {
	            index = i;
	            break;
	          }
	        }
	
	        this.nodes.splice(index, 0, new Point({
	          x: x,
	          y: y
	        }, this));
	
	        this.scaleNode(index);
	
	        this.calculatePoints();
	        this.emit("change", this.points);
	
	        this.render();
	      }
	    },
	    scan: {
	
	      /**
	      Find the level at a certain x location on the envelope.
	      @param x {number} The x location to find the level of, normalized 0-1
	      */
	
	      value: function scan(x) {
	        // find surrounding points
	        var nextIndex = this.getIndexFromX(x);
	        var priorIndex = nextIndex - 1;
	        if (priorIndex < 0) {
	          priorIndex = 0;
	        }
	        if (nextIndex >= this.nodes.length) {
	          nextIndex = this.nodes.length - 1;
	        }
	        var priorPoint = this.nodes[priorIndex];
	        var nextPoint = this.nodes[nextIndex];
	        var loc = math.scale(x, priorPoint.x, nextPoint.x, 0, 1);
	        var value = math.interp(loc, priorPoint.y, nextPoint.y);
	        this.emit("scan", value);
	        return value;
	      }
	    },
	    movePoint: {
	
	      /**
	      Move a breakpoint on the envelope.
	      @param index {number} The index of the breakpoint to move
	      @param x {number} New x location, normalized 0-1
	      @param y {number} New y location, normalized 0-1
	      */
	
	      value: function movePoint(index, x, y) {
	        this.nodes[index].move(x, y);
	        this.scaleNode(index);
	        this.calculatePoints();
	        this.emit("change", this.points);
	        this.render();
	      }
	    },
	    adjustPoint: {
	
	      /**
	      Move a breakpoint on the envelope by a certain amount.
	      @param index {number} The index of the breakpoint to move
	      @param xOffset {number} X displacement, normalized 0-1
	      @param yOffset {number} Y displacement, normalized 0-1
	      */
	
	      value: function adjustPoint(index, xOffset, yOffset) {
	        this.nodes[index].move(this.nodes[index].x + xOffset, this.nodes[index].y + yOffset);
	        this.scaleNode(index);
	        this.calculatePoints();
	        this.emit("change", this.points);
	        this.render();
	      }
	    },
	    destroyPoint: {
	
	      /**
	      Remove a breakpoint from the envelope.
	      @param index {number} Index of the breakpoint to remove
	      */
	
	      value: function destroyPoint(index) {
	        this.nodes[index].destroy();
	        this.calculatePoints();
	        this.emit("change", this.points);
	        this.render();
	      }
	    },
	    setPoints: {
	
	      /**
	      Remove all existing breakpoints and add an entirely new set of breakpoints.
	      @param allPoints {array} An array of objects with x/y properties (normalized 0-1). Each object in the array specifices the x/y location of a new breakpoint to be added.
	      */
	
	      value: function setPoints(allPoints) {
	        var _this = this;
	
	        while (this.nodes.length) {
	          this.nodes[0].destroy();
	        }
	        allPoints.forEach(function (point) {
	          _this.addPoint(point.x, point.y);
	        });
	        this.calculatePoints();
	        this.emit("change", this.points);
	        this.render();
	      }
	    }
	  });
	
	  return Envelope;
	})(Interface);
	
	module.exports = Envelope;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var dom = __webpack_require__(7);
	var Interface = __webpack_require__(6);
	
	/**
	 * Spectrogram
	 *
	 * @description Audio spectrum visualization
	 *
	 * @demo <span nexus-ui="spectrogram"></span>
	 *
	 * @example
	 * var spectrogram = new Nexus.Spectrogram('#target')
	 * spectrogram.connect(myWebAudioNode)
	 *
	 * @example
	 * var spectrogram = new Nexus.Spectrogram('#target',{
	 *   'size': [300,150]
	 * })
	 * spectrogram.connect(myWebAudioNode)
	 *
	 * @output
	 * &nbsp;
	 * No events
	 *
	 */
	
	var Spectrogram = (function (_Interface) {
	  function Spectrogram() {
	    _classCallCheck(this, Spectrogram);
	
	    var options = [];
	
	    var defaults = {
	      size: [300, 150]
	    };
	
	    _get(Object.getPrototypeOf(Spectrogram.prototype), "constructor", this).call(this, arguments, options, defaults);
	
	    this.analyser = null;
	    this.bufferLength = 0;
	    this.dataArray = null;
	    this.active = false;
	    this.source = null;
	
	    this.init();
	  }
	
	  _inherits(Spectrogram, _Interface);
	
	  _createClass(Spectrogram, {
	    buildFrame: {
	      value: function buildFrame() {
	        this.canvas = new dom.SmartCanvas(this.parent);
	        this.element = this.canvas.element;
	      }
	    },
	    sizeInterface: {
	      value: function sizeInterface() {
	        this.canvas.resize(this.width, this.height);
	      }
	    },
	    colorInterface: {
	      value: function colorInterface() {
	        this.canvas.element.style.backgroundColor = this.colors.fill;
	      }
	    },
	    render: {
	      value: function render() {
	        if (this.active) {
	          requestAnimationFrame(this.render.bind(this));
	        }
	
	        if (this.analyser) {
	          this.analyser.getByteFrequencyData(this.dataArray);
	        }
	
	        this.canvas.context.fillStyle = this.colors.fill;
	        this.canvas.context.fillRect(0, 0, this.canvas.element.width, this.canvas.element.height);
	
	        if (this.source && this.dataArray) {
	          //console.log(this.dataArray);
	
	          var barWidth = this.canvas.element.width / this.bufferLength;
	          var barHeight = undefined;
	          var x = 0;
	
	          var definition = this.canvas.element.width / 50;
	
	          for (var i = 0; i < this.bufferLength; i = i + definition) {
	            barHeight = Math.max.apply(null, this.dataArray.subarray(i, i + definition));
	            barHeight /= 255;
	            barHeight *= this.canvas.element.height;
	
	            this.canvas.context.fillStyle = this.colors.accent;
	            this.canvas.context.fillRect(x, this.canvas.element.height - barHeight, barWidth * definition, barHeight);
	
	            x += barWidth * definition;
	          }
	        }
	      }
	    },
	    connect: {
	
	      /**
	      Equivalent to "patching in" an audio node to visualize.
	      @param node {AudioNode} The audio node to visualize
	      @example spectrogram.connect( Tone.Master );
	      */
	
	      value: function connect(node) {
	        if (this.source) {
	          this.disconnect();
	        }
	
	        this.analyser = node.context.createAnalyser();
	        this.analyser.fftSize = 2048;
	        this.bufferLength = this.analyser.frequencyBinCount;
	        this.dataArray = new Uint8Array(this.bufferLength);
	
	        this.active = true;
	
	        this.source = node;
	        this.source.connect(this.analyser);
	
	        this.render();
	      }
	    },
	    disconnect: {
	
	      /**
	      Stop visualizing the source node and disconnect it.
	      */
	
	      value: function disconnect() {
	        if (this.source) {
	          this.source.disconnect(this.analyser);
	        }
	
	        this.analyser = null;
	        this.bufferLength = 0;
	        this.dataArray = null;
	        this.active = false;
	        this.source = null;
	      }
	    },
	    click: {
	      value: function click() {
	        this.active = !this.active && this.source;
	        this.render();
	      }
	    },
	    customDestroy: {
	      value: function customDestroy() {
	        this.active = false;
	      }
	    }
	  });
	
	  return Spectrogram;
	})(Interface);
	
	module.exports = Spectrogram;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var dom = __webpack_require__(7);
	var math = __webpack_require__(5);
	var Interface = __webpack_require__(6);
	
	/**
	 * Meter
	 *
	 * @description Stereo decibel meter
	 *
	 * @demo <span nexus-ui="meter"></span>
	 *
	 * @example
	 * var meter = new Nexus.Meter('#target')
	 * meter.connect(myWebAudioNode)
	 *
	 * @example
	 * var meter = new Nexus.Meter('#target', {
	 *   size: [75,75]
	 * })
	 * meter.connect(myWebAudioNode)
	 *
	 * @output
	 * &nbsp;
	 * No events
	 *
	 */
	
	var Meter = (function (_Interface) {
	  function Meter() {
	    _classCallCheck(this, Meter);
	
	    var options = [];
	
	    var defaults = {
	      size: [30, 100]
	    };
	
	    _get(Object.getPrototypeOf(Meter.prototype), "constructor", this).call(this, arguments, options, defaults);
	
	    this.channels = 2;
	    this.splitter = null;
	    this.analysers = [];
	    this.bufferLength = 0;
	    this.dataArray = null;
	    this.active = false;
	    this.source = null;
	    this.db = -Infinity;
	
	    this.init();
	
	    this.meterWidth = this.canvas.element.width / this.channels;
	
	    this.render();
	  }
	
	  _inherits(Meter, _Interface);
	
	  _createClass(Meter, {
	    buildFrame: {
	      value: function buildFrame() {
	        this.canvas = new dom.SmartCanvas(this.parent);
	        this.element = this.canvas.element;
	      }
	    },
	    sizeInterface: {
	      value: function sizeInterface() {
	        this.canvas.resize(this.width, this.height);
	      }
	    },
	    colorInterface: {
	      value: function colorInterface() {
	        this.canvas.element.style.backgroundColor = this.colors.fill;
	      }
	    },
	    render: {
	      value: function render() {
	        if (this.active) {
	          requestAnimationFrame(this.render.bind(this));
	        }
	
	        this.canvas.context.fillStyle = this.colors.fill;
	        this.canvas.context.fillRect(0, 0, this.canvas.element.width, this.canvas.element.height);
	
	        for (var i = 0; i < this.analysers.length; i++) {
	          if (this.source) {
	            this.analysers[i].getFloatTimeDomainData(this.dataArray);
	
	            var rms = 0;
	
	            for (var _i = 0; _i < this.dataArray.length; _i++) {
	              rms += this.dataArray[_i] * this.dataArray[_i];
	            }
	
	            rms = Math.sqrt(rms / this.dataArray.length);
	
	            this.db = 20 * Math.log10(rms);
	          } else if (this.db > -200 && this.db !== -Infinity) {
	            this.db -= 1;
	          } else {
	            this.db = -Infinity;
	          }
	
	          //console.log(db)
	
	          if (this.db > -70) {
	            var linear = math.normalize(this.db, -70, 5);
	            var exp = linear * linear;
	            var y = math.scale(exp, 0, 1, this.element.height, 0);
	
	            this.canvas.context.fillStyle = this.colors.accent;
	            this.canvas.context.fillRect(this.meterWidth * i, y, this.meterWidth, this.canvas.element.height - y);
	
	            //console.log("rendering...")
	          }
	        }
	      }
	    },
	    connect: {
	
	      /**
	      Equivalent to "patching in" an audio node to visualize.
	      @param node {AudioNode} The audio node to visualize
	      @param channels {number} (optional) The number of channels in the source node to watch. If not specified, the interface will look for a .channelCount property on the input node. If it does not exist, the interface will default to 1 channel.
	      @example meter.connect( Tone.Master, 2 );
	      */
	
	      value: function connect(node, channels) {
	        if (this.source) {
	          this.disconnect();
	        }
	
	        this.channels = channels || node.channelCount || 2;
	
	        this.splitter = node.context.createChannelSplitter(this.channels);
	
	        this.analysers = [];
	        for (var i = 0; i < this.channels; i++) {
	          var analyser = node.context.createAnalyser();
	          analyser.fftSize = 1024;
	          analyser.smoothingTimeConstant = 1;
	          this.splitter.connect(analyser, i);
	          this.analysers.push(analyser);
	        }
	        this.bufferLength = this.analysers[0].frequencyBinCount;
	        this.dataArray = new Float32Array(this.bufferLength);
	
	        this.active = true;
	
	        this.meterWidth = this.canvas.element.width / this.channels;
	
	        this.source = node;
	        this.source.connect(this.splitter);
	
	        this.render();
	      }
	    },
	    disconnect: {
	
	      /**
	      Stop visualizing the source node and disconnect it.
	      */
	
	      value: function disconnect() {
	        if (this.source) {
	          this.source.disconnect(this.splitter);
	        }
	
	        this.splitter = null;
	        this.analysers = [];
	        this.bufferLength = 0;
	        this.dataArray = null;
	        this.active = false;
	        this.source = null;
	      }
	    },
	    click: {
	      value: function click() {
	        this.active = !this.active && this.source;
	        this.render();
	      }
	    },
	    customDestroy: {
	      value: function customDestroy() {
	        this.active = false;
	      }
	    }
	  });
	
	  return Meter;
	})(Interface);
	
	module.exports = Meter;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var dom = __webpack_require__(7);
	var Interface = __webpack_require__(6);
	
	/**
	 * Oscilloscope
	 *
	 * @description Visualizes a waveform's stream of values.
	 *
	 * @demo <span nexus-ui="oscilloscope"></span>
	 *
	 * @example
	 * var oscilloscope = new Nexus.Oscilloscope('#target')
	 * oscilloscope.connect(myWebAudioNode)
	 *
	 * @example
	 * var oscilloscope = new Nexus.Oscilloscope('#target',{
	 *   'size': [300,150]
	 * })
	 * oscilloscope.connect(myWebAudioNode)
	 *
	 * @output
	 * &nbsp;
	 * No events
	 *
	 */
	
	var Oscilloscope = (function (_Interface) {
	  function Oscilloscope() {
	    _classCallCheck(this, Oscilloscope);
	
	    var options = [];
	
	    var defaults = {
	      size: [300, 150]
	    };
	
	    _get(Object.getPrototypeOf(Oscilloscope.prototype), "constructor", this).call(this, arguments, options, defaults);
	
	    this.analyser = null;
	    this.bufferLength = 0;
	    this.dataArray = null;
	
	    this.active = false;
	
	    this.source = null;
	
	    this.init();
	
	    this.render();
	  }
	
	  _inherits(Oscilloscope, _Interface);
	
	  _createClass(Oscilloscope, {
	    buildFrame: {
	      value: function buildFrame() {
	        this.canvas = new dom.SmartCanvas(this.parent);
	        this.element = this.canvas.element;
	      }
	    },
	    sizeInterface: {
	      value: function sizeInterface() {
	        this.canvas.resize(this.width, this.height);
	      }
	    },
	    colorInterface: {
	      value: function colorInterface() {
	        this.canvas.element.style.backgroundColor = this.colors.fill;
	      }
	    },
	    render: {
	      value: function render() {
	        if (this.active) {
	          requestAnimationFrame(this.render.bind(this));
	        }
	
	        if (this.analyser) {
	          this.analyser.getByteTimeDomainData(this.dataArray);
	        }
	
	        this.canvas.context.fillStyle = this.colors.fill;
	        this.canvas.context.fillRect(0, 0, this.canvas.element.width, this.canvas.element.height);
	
	        this.canvas.context.lineWidth = ~ ~(this.height / 100 + 2);
	        this.canvas.context.strokeStyle = this.colors.accent;
	
	        this.canvas.context.beginPath();
	
	        if (this.source) {
	          var sliceWidth = this.canvas.element.width * 1 / this.bufferLength;
	          var x = 0;
	
	          for (var i = 0; i < this.bufferLength; i++) {
	            var v = this.dataArray[i] / 128;
	            var y = v * this.canvas.element.height / 2;
	
	            if (i === 0) {
	              this.canvas.context.moveTo(x, y);
	            } else {
	              this.canvas.context.lineTo(x, y);
	            }
	
	            x += sliceWidth;
	          }
	        } else {
	          this.canvas.context.moveTo(0, this.canvas.element.height / 2);
	          this.canvas.context.lineTo(this.canvas.element.width, this.canvas.element.height / 2);
	        }
	
	        this.canvas.context.stroke();
	      }
	    },
	    connect: {
	
	      /**
	      Equivalent to "patching in" an audio node to visualize.
	      @param node {AudioNode} The audio node to visualize
	      @example oscilloscope.connect( Tone.Master );
	      */
	
	      value: function connect(node) {
	        if (this.source) {
	          this.disconnect();
	        }
	
	        this.analyser = node.context.createAnalyser();
	        this.analyser.fftSize = 2048;
	        this.bufferLength = this.analyser.frequencyBinCount;
	        this.dataArray = new Uint8Array(this.bufferLength);
	        this.analyser.getByteTimeDomainData(this.dataArray);
	
	        this.active = true;
	
	        this.source = node;
	        this.source.connect(this.analyser);
	
	        this.render();
	      }
	    },
	    disconnect: {
	
	      /**
	      Stop visualizing the source node and disconnect it.
	      */
	
	      value: function disconnect() {
	        if (this.source) {
	          this.source.disconnect(this.analyser);
	        }
	
	        this.analyser = null;
	        this.bufferLength = 0;
	        this.dataArray = null;
	        this.active = false;
	        this.source = null;
	      }
	    },
	    click: {
	      value: function click() {
	        this.active = !this.active && this.source;
	        this.render();
	      }
	    },
	    customDestroy: {
	      value: function customDestroy() {
	        this.active = false;
	      }
	    }
	  });
	
	  return Oscilloscope;
	})(Interface);
	
	module.exports = Oscilloscope;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	/*
	Main concept:
	synth = new Nexus.Rack('elementID');
	
	Transform all elements inside the div
	synth.elementID will hold the first slider interface
	
	2) In future, potentially writing a rack that is re-usable?
	Could also take JSON
	
	new Nexus.Rack('#target',{
	  pre: () => {
	    create some divs here, or some audio code
	  },
	  interface: {
	    slider1: Nexus.add.slider({
	      top:10,
	      left:10,
	      width:50,
	      height:100,
	      min: 0,
	      max: 100,
	      step: 1
	    }),
	    wave1: Nexus.add.waveform({
	      file: './path/to/file.mp3',
	      width:500,
	      height:100,
	      mode: 'range'
	    })
	  },
	  init: () => {
	    // some audio init code goes here...
	  }
	});
	
	*/
	
	var transform = _interopRequireWildcard(__webpack_require__(39));
	
	var dom = _interopRequire(__webpack_require__(7));
	
	var colors = __webpack_require__(1).colors;
	
	var Rack = (function () {
	  function Rack(target, settings) {
	    _classCallCheck(this, Rack);
	
	    this.meta = {};
	    this.meta.target = target;
	    this.meta.parent = dom.parseElement(target); // should be a generic function for parsing a 'target' argument that checks for string/DOM/jQUERY
	    this.meta.colors = {};
	
	    if (settings) {
	      this.meta.attribute = settings.attribute || "nexus-ui";
	      this.meta.title = settings.name || false;
	      this.meta.open = settings.open || false;
	    } else {
	      this.meta.attribute = "nexus-ui";
	      this.meta.title = false;
	      this.meta.open = false;
	    }
	
	    var defaultColors = colors(); // jshint ignore:line
	    this.meta.colors.accent = defaultColors.accent;
	    this.meta.colors.fill = defaultColors.fill;
	    this.meta.colors.light = defaultColors.light;
	    this.meta.colors.dark = defaultColors.dark;
	    this.meta.colors.mediumLight = defaultColors.mediumLight;
	    this.meta.colors.mediumDark = defaultColors.mediumDark;
	    this.buildInterface();
	    this.colorInterface();
	  }
	
	  _createClass(Rack, {
	    buildInterface: {
	      value: function buildInterface() {
	        var _this = this;
	
	        this.meta.parent.style.boxSizing = "border-box";
	        this.meta.parent.style.userSelect = "none";
	        this.meta.parent.style.mozUserSelect = "none";
	        this.meta.parent.style.webkitUserSelect = "none";
	
	        this.meta.contents = document.createElement("div");
	
	        while (this.meta.parent.childNodes.length > 0) {
	          this.meta.contents.appendChild(this.meta.parent.childNodes[0]);
	        }
	
	        this.meta.contents.style.padding = "0px";
	        this.meta.contents.style.boxSizing = "border-box";
	
	        if (this.meta.title) {
	          this.meta.titleBar = document.createElement("div");
	          this.meta.titleBar.innerHTML = this.meta.title;
	          this.meta.titleBar.style.fontFamily = "arial";
	          this.meta.titleBar.style.position = "relative";
	          this.meta.titleBar.style.color = "#888";
	          this.meta.titleBar.style.padding = "7px";
	          this.meta.titleBar.style.fontSize = "12px";
	
	          this.meta.button = document.createElement("div");
	          this.meta.button.style.position = "absolute";
	          this.meta.button.style.top = "5px";
	          this.meta.button.style.right = "5px";
	          this.meta.button.innerHTML = "-";
	          this.meta.button.style.padding = "0px 5px 2px";
	          this.meta.button.style.lineHeight = "12px";
	          this.meta.button.style.fontSize = "15px";
	
	          this.meta.button.style.cursor = "pointer";
	
	          this.meta.button.addEventListener("mouseover", function () {
	            _this.meta.button.style.backgroundColor = _this.meta.colors.mediumDark;
	          });
	          this.meta.button.addEventListener("mouseleave", function () {
	            _this.meta.button.style.backgroundColor = _this.meta.colors.mediumLight;
	          });
	          this.meta.button.addEventListener("click", function () {
	            if (_this.meta.open) {
	              _this.hide();
	            } else {
	              _this.show();
	            }
	          });
	
	          this.meta.titleBar.appendChild(this.meta.button);
	
	          this.meta.parent.appendChild(this.meta.titleBar);
	        }
	        this.meta.parent.appendChild(this.meta.contents);
	
	        //  var width = this.meta.parent.style.width = getComputedStyle(this.meta.parent).getPropertyValue('width');
	        //    this.meta.parent.style.width = width;
	
	        var ui = transform.section(this.meta.target, this.meta.attribute);
	        for (var key in ui) {
	          this[key] = ui[key];
	        }
	      }
	    },
	    colorInterface: {
	      value: function colorInterface() {
	        if (this.meta.title) {
	          this.meta.button.style.backgroundColor = this.meta.colors.mediumLight;
	          this.meta.button.style.border = "solid 0px " + this.meta.colors.fill;
	          this.meta.parent.style.border = "solid 1px " + this.meta.colors.mediumLight;
	          this.meta.parent.style.backgroundColor = this.meta.colors.light;
	          this.meta.titleBar.style.backgroundColor = this.meta.colors.fill;
	        }
	      }
	    },
	    show: {
	      value: function show() {
	        this.meta.contents.style.display = "block";
	        this.meta.open = true;
	      }
	    },
	    hide: {
	      value: function hide() {
	        this.meta.contents.style.display = "none";
	        this.meta.open = false;
	      }
	    },
	    colorize: {
	      value: function colorize(type, color) {
	        for (var key in this) {
	          if (this[key].colorize) {
	            this[key].colorize(type, color);
	          }
	        }
	        this.meta.colors[type] = color;
	        this.colorInterface();
	      }
	    },
	    empty: {
	      value: function empty() {
	        for (var key in this) {
	          if (this[key].destroy) {
	            this[key].destroy();
	          }
	        }
	      }
	    }
	  });
	
	  return Rack;
	})();
	
	module.exports = Rack;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	"use strict";
	
	var dom = _interopRequire(__webpack_require__(7));
	
	var Interfaces = _interopRequire(__webpack_require__(2));
	
	var createInterfaceID = function (widget, interfaceIDs) {
	  var type = widget.type;
	  if (interfaceIDs[type]) {
	    interfaceIDs[type]++;
	  } else {
	    interfaceIDs[type] = 1;
	  }
	  return type + interfaceIDs[type];
	};
	
	var element = function (element, type, options) {
	  options = options || {};
	  for (var i = 0; i < element.attributes.length; i++) {
	    var att = element.attributes[i];
	    //  try {
	    //    options[att.nodeName] = eval(att.nodeValue);
	    //  } catch(e) {
	    options[att.nodeName] = att.nodeValue;
	    //  }
	  }
	  type = type[0].toUpperCase() + type.slice(1);
	  var widget = new Interfaces[type](element, options);
	  widget.id = element.id;
	  return widget;
	};
	
	var section = function (parent, keyword) {
	
	  keyword = keyword || "nexus-ui";
	
	  var interfaceIDs = {};
	
	  var container = dom.parseElement(parent);
	
	  var ui = {};
	
	  var htmlElements = container.getElementsByTagName("*");
	  var elements = [];
	  for (var i = 0; i < htmlElements.length; i++) {
	    elements.push(htmlElements[i]);
	  }
	  for (var i = 0; i < elements.length; i++) {
	    var type = elements[i].getAttribute(keyword);
	    if (type) {
	      var formattedType = false;
	      for (var key in Interfaces) {
	        if (type.toLowerCase() === key.toLowerCase()) {
	          formattedType = key;
	        }
	      }
	      console.log(formattedType);
	      var widget = element(elements[i], formattedType);
	      if (widget.id) {
	        ui[widget.id] = widget;
	      } else {
	        var id = createInterfaceID(widget, interfaceIDs);
	        ui[id] = widget;
	      }
	    }
	  }
	
	  return ui;
	};
	
	var add = function (type, parent, options) {
	  var target = document.createElement("div");
	  options = options || {};
	  if (parent) {
	    parent = dom.parseElement(parent);
	  } else {
	    parent = document.body;
	  }
	  parent.appendChild(target);
	  options.target = target;
	  if (options.size) {
	    target.style.width = options.size[0] + "px";
	    target.style.height = options.size[1] + "px";
	  }
	  return element(target, type, options);
	};
	
	exports.element = element;
	exports.section = section;
	exports.add = add;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var math = _interopRequire(__webpack_require__(5));
	
	var Tune = (function () {
	  function Tune() {
	    _classCallCheck(this, Tune);
	
	    // the scale as ratios
	    this.scale = [];
	
	    // i/o modes
	    this.mode = {
	      output: "frequency",
	      input: "step"
	    };
	
	    // ET major
	    this.etmajor = [261.62558, 293.664764, 329.627563, 349.228241, 391.995422, 440, 493.883301, 523.25116];
	
	    // Root frequency.
	    this.root = math.mtof(60); // * Math.pow(2,(60-69)/12);
	
	    // default is a major scale
	    this.createScale(0, 2, 4, 5, 7, 9, 11);
	  }
	
	  _createClass(Tune, {
	    note: {
	
	      /* Return data in the mode you are in (freq, ratio, or midi) */
	
	      value: function note(input, octave) {
	        var newvalue = undefined;
	
	        if (this.mode.output === "frequency") {
	          newvalue = this.frequency(input, octave);
	        } else if (this.mode.output === "ratio") {
	          newvalue = this.ratio(input, octave);
	        } else if (this.mode.output === "MIDI") {
	          newvalue = this.MIDI(input, octave);
	        } else {
	          newvalue = this.frequency(input, octave);
	        }
	
	        return newvalue;
	      }
	    },
	    frequency: {
	
	      /* Return freq data */
	
	      value: function frequency(stepIn, octaveIn) {
	        if (this.mode.input === "midi" || this.mode.input === "MIDI") {
	          this.stepIn += 60;
	        }
	
	        // what octave is our input
	        var octave = Math.floor(stepIn / this.scale.length);
	
	        if (octaveIn) {
	          octave += octaveIn;
	        }
	
	        // which scale degree (0 - scale length) is our input
	        var scaleDegree = stepIn % this.scale.length;
	
	        while (scaleDegree < 0) {
	          scaleDegree += this.scale.length;
	        }
	
	        var ratio = this.scale[scaleDegree];
	
	        var freq = this.root * ratio;
	
	        freq = freq * Math.pow(2, octave);
	
	        // truncate irrational numbers
	        freq = Math.floor(freq * 100000000000) / 100000000000;
	
	        return freq;
	      }
	    },
	    ratio: {
	
	      /* Force return ratio data */
	
	      value: function ratio(stepIn, octaveIn) {
	        if (this.mode.input === "midi" || this.mode.input === "MIDI") {
	          this.stepIn += 60;
	        }
	
	        // what octave is our input
	        var octave = Math.floor(stepIn / this.scale.length);
	
	        if (octaveIn) {
	          octave += octaveIn;
	        }
	
	        // which scale degree (0 - scale length) is our input
	        var scaleDegree = stepIn % this.scale.length;
	
	        // what ratio is our input to our key
	        var ratio = Math.pow(2, octave) * this.scale[scaleDegree];
	
	        ratio = Math.floor(ratio * 100000000000) / 100000000000;
	
	        return ratio;
	      }
	    },
	    MIDI: {
	
	      /* Force return adjusted MIDI data */
	
	      value: function MIDI(stepIn, octaveIn) {
	        var newvalue = this.frequency(stepIn, octaveIn);
	
	        var n = 69 + 12 * Math.log(newvalue / 440) / Math.log(2);
	
	        n = Math.floor(n * 1000000000) / 1000000000;
	
	        return n;
	      }
	    },
	    createScale: {
	      value: function createScale() {
	        var newScale = [];
	        for (var i = 0; i < arguments.length; i++) {
	          newScale.push(math.mtof(60 + arguments[i]));
	        }
	        this.loadScaleFromFrequencies(newScale);
	      }
	    },
	    createJIScale: {
	      value: function createJIScale() {
	        this.scale = [];
	        for (var i = 0; i < arguments.length; i++) {
	          this.scale.push(arguments[i]);
	        }
	      }
	    },
	    loadScaleFromFrequencies: {
	      value: function loadScaleFromFrequencies(freqs) {
	        this.scale = [];
	        for (var i = 0; i < freqs.length; i++) {
	          this.scale.push(freqs[i] / freqs[0]);
	        }
	      }
	    },
	    loadScale: {
	
	      /* Load a new scale */
	
	      value: function loadScale(name) {
	        /* load the scale */
	        var freqs = this.scales[name].frequencies;
	        this.loadScaleFromFrequencies(freqs);
	      }
	    },
	    search: {
	
	      /* Search the names of tunings
	      	 Returns an array of names of tunings */
	
	      value: function search(letters) {
	        var possible = [];
	        for (var key in this.scales) {
	          if (key.toLowerCase().indexOf(letters.toLowerCase()) !== -1) {
	            possible.push(key);
	          }
	        }
	        return possible;
	      }
	    },
	    chord: {
	
	      /* Return a collection of notes as an array */
	
	      value: function chord(midis) {
	        var output = [];
	        for (var i = 0; i < midis.length; i++) {
	          output.push(this.note(midis[i]));
	        }
	        return output;
	      }
	    }
	  });
	
	  return Tune;
	})();
	
	module.exports = Tune;

/***/ }),
/* 41 */
/***/ (function(module, exports) {

	"use strict";
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	//Disable jshint warning concerning trailing regular params
	/*jshint -W138 */
	
	var Radio = (function () {
	    //if non-existent buttons are switched, they are ignored
	
	    function Radio() {
	        for (var _len = arguments.length, onVals = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	            onVals[_key - 1] = arguments[_key];
	        }
	
	        var length = arguments[0] === undefined ? 3 : arguments[0];
	
	        _classCallCheck(this, Radio);
	
	        //each optional 'onVals' argument switches on that value in the Radio if it exists
	        //In the example below, a 3-button radio is created, index 0 is switched on, index 1 is switched on then then attempted again producing an warning, and the final argument produces a warning because the index value does not exist.
	        //Example:
	        //`  radio = new Radio(3, 0, 1, 1, 3);
	        //…  [1,1,0]
	
	        if (length < 0) {
	            length = 1;
	        }
	
	        this.length = length;
	        this.onVals = onVals;
	        this.array = new Array(length).fill(0);
	
	        if (onVals.length > 0) {
	            this.on.apply(this, onVals);
	        }
	    }
	
	    _createClass(Radio, {
	        select: {
	            value: function select(value) {
	                this.array.fill(0);
	                this.array[value] = 1;
	                return this.array;
	            }
	        },
	        flip: {
	            value: function flip() {
	                for (var _len = arguments.length, values = Array(_len), _key = 0; _key < _len; _key++) {
	                    values[_key] = arguments[_key];
	                }
	
	                //flips the specified values. if no value is specified, flips all buttons
	                var a = this.array;
	                if (values.length > 0) {
	                    values.forEach(function (v) {
	                        if (v > a.length - 1) {
	                            console.warn("Warning: AnonRadio[" + v + "] does not exist");
	                        } else {
	                            a[v] = a[v] ? 0 : 1;
	                        }
	                    });
	                } else {
	                    a.forEach(function (v, i, arr) {
	                        arr[i] = v ? 0 : 1;
	                    });
	                }
	                return a;
	            }
	        },
	        on: {
	            value: function on() {
	                for (var _len = arguments.length, values = Array(_len), _key = 0; _key < _len; _key++) {
	                    values[_key] = arguments[_key];
	                }
	
	                //switch on the specified values. if no value specified, flips on all buttons
	                var a = this.array;
	                if (values.length > 0) {
	                    values.forEach(function (v) {
	                        if (v > a.length - 1) {
	                            console.warn("Warning: AnonRadio[" + v + "] exceeds size of object");
	                        } else {
	                            if (a[v] === 1) {
	                                console.warn("Warning: AnonRadio[" + v + "] was already on.");
	                            }
	                            a[v] = 1;
	                        }
	                    });
	                } else {
	                    a.fill(1);
	                }
	                return a;
	            }
	        },
	        off: {
	            value: function off() {
	                for (var _len = arguments.length, values = Array(_len), _key = 0; _key < _len; _key++) {
	                    values[_key] = arguments[_key];
	                }
	
	                //switch off the specified values. if no value specified, flips off all buttons
	                var a = this.array;
	                if (values.length > 0) {
	                    values.forEach(function (v) {
	                        a[v] = 0;
	                    });
	                } else {
	                    a.fill(0);
	                }
	                return a;
	            }
	        }
	    });
	
	    return Radio;
	})();
	
	module.exports = Radio;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

	var WAAClock = __webpack_require__(43)
	
	module.exports = WAAClock
	if (typeof window !== 'undefined') window.WAAClock = WAAClock


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var isBrowser = (typeof window !== 'undefined')
	
	var CLOCK_DEFAULTS = {
	  toleranceLate: 0.10,
	  toleranceEarly: 0.001
	}
	
	// ==================== Event ==================== //
	var Event = function(clock, deadline, func) {
	  this.clock = clock
	  this.func = func
	  this._cleared = false // Flag used to clear an event inside callback
	
	  this.toleranceLate = clock.toleranceLate
	  this.toleranceEarly = clock.toleranceEarly
	  this._latestTime = null
	  this._earliestTime = null
	  this.deadline = null
	  this.repeatTime = null
	
	  this.schedule(deadline)
	}
	
	// Unschedules the event
	Event.prototype.clear = function() {
	  this.clock._removeEvent(this)
	  this._cleared = true
	  return this
	}
	
	// Sets the event to repeat every `time` seconds.
	Event.prototype.repeat = function(time) {
	  if (time === 0)
	    throw new Error('delay cannot be 0')
	  this.repeatTime = time
	  if (!this.clock._hasEvent(this))
	    this.schedule(this.deadline + this.repeatTime)
	  return this
	}
	
	// Sets the time tolerance of the event.
	// The event will be executed in the interval `[deadline - early, deadline + late]`
	// If the clock fails to execute the event in time, the event will be dropped.
	Event.prototype.tolerance = function(values) {
	  if (typeof values.late === 'number')
	    this.toleranceLate = values.late
	  if (typeof values.early === 'number')
	    this.toleranceEarly = values.early
	  this._refreshEarlyLateDates()
	  if (this.clock._hasEvent(this)) {
	    this.clock._removeEvent(this)
	    this.clock._insertEvent(this)
	  }
	  return this
	}
	
	// Returns true if the event is repeated, false otherwise
	Event.prototype.isRepeated = function() { return this.repeatTime !== null }
	
	// Schedules the event to be ran before `deadline`.
	// If the time is within the event tolerance, we handle the event immediately.
	// If the event was already scheduled at a different time, it is rescheduled.
	Event.prototype.schedule = function(deadline) {
	  this._cleared = false
	  this.deadline = deadline
	  this._refreshEarlyLateDates()
	
	  if (this.clock.context.currentTime >= this._earliestTime) {
	    this._execute()
	  
	  } else if (this.clock._hasEvent(this)) {
	    this.clock._removeEvent(this)
	    this.clock._insertEvent(this)
	  
	  } else this.clock._insertEvent(this)
	}
	
	Event.prototype.timeStretch = function(tRef, ratio) {
	  if (this.isRepeated())
	    this.repeatTime = this.repeatTime * ratio
	
	  var deadline = tRef + ratio * (this.deadline - tRef)
	  // If the deadline is too close or past, and the event has a repeat,
	  // we calculate the next repeat possible in the stretched space.
	  if (this.isRepeated()) {
	    while (this.clock.context.currentTime >= deadline - this.toleranceEarly)
	      deadline += this.repeatTime
	  }
	  this.schedule(deadline)
	}
	
	// Executes the event
	Event.prototype._execute = function() {
	  if (this.clock._started === false) return
	  this.clock._removeEvent(this)
	
	  if (this.clock.context.currentTime < this._latestTime)
	    this.func(this)
	  else {
	    if (this.onexpired) this.onexpired(this)
	    console.warn('event expired')
	  }
	  // In the case `schedule` is called inside `func`, we need to avoid
	  // overrwriting with yet another `schedule`.
	  if (!this.clock._hasEvent(this) && this.isRepeated() && !this._cleared)
	    this.schedule(this.deadline + this.repeatTime) 
	}
	
	// Updates cached times
	Event.prototype._refreshEarlyLateDates = function() {
	  this._latestTime = this.deadline + this.toleranceLate
	  this._earliestTime = this.deadline - this.toleranceEarly
	}
	
	// ==================== WAAClock ==================== //
	var WAAClock = module.exports = function(context, opts) {
	  var self = this
	  opts = opts || {}
	  this.tickMethod = opts.tickMethod || 'ScriptProcessorNode'
	  this.toleranceEarly = opts.toleranceEarly || CLOCK_DEFAULTS.toleranceEarly
	  this.toleranceLate = opts.toleranceLate || CLOCK_DEFAULTS.toleranceLate
	  this.context = context
	  this._events = []
	  this._started = false
	}
	
	// ---------- Public API ---------- //
	// Schedules `func` to run after `delay` seconds.
	WAAClock.prototype.setTimeout = function(func, delay) {
	  return this._createEvent(func, this._absTime(delay))
	}
	
	// Schedules `func` to run before `deadline`.
	WAAClock.prototype.callbackAtTime = function(func, deadline) {
	  return this._createEvent(func, deadline)
	}
	
	// Stretches `deadline` and `repeat` of all scheduled `events` by `ratio`, keeping
	// their relative distance to `tRef`. In fact this is equivalent to changing the tempo.
	WAAClock.prototype.timeStretch = function(tRef, events, ratio) {
	  events.forEach(function(event) { event.timeStretch(tRef, ratio) })
	  return events
	}
	
	// Removes all scheduled events and starts the clock 
	WAAClock.prototype.start = function() {
	  if (this._started === false) {
	    var self = this
	    this._started = true
	    this._events = []
	
	    if (this.tickMethod === 'ScriptProcessorNode') {
	      var bufferSize = 256
	      // We have to keep a reference to the node to avoid garbage collection
	      this._clockNode = this.context.createScriptProcessor(bufferSize, 1, 1)
	      this._clockNode.connect(this.context.destination)
	      this._clockNode.onaudioprocess = function () {
	        process.nextTick(function() { self._tick() })
	      }
	    } else if (this.tickMethod === 'manual') null // _tick is called manually
	
	    else throw new Error('invalid tickMethod ' + this.tickMethod)
	  }
	}
	
	// Stops the clock
	WAAClock.prototype.stop = function() {
	  if (this._started === true) {
	    this._started = false
	    this._clockNode.disconnect()
	  }  
	}
	
	// ---------- Private ---------- //
	
	// This function is ran periodically, and at each tick it executes
	// events for which `currentTime` is included in their tolerance interval.
	WAAClock.prototype._tick = function() {
	  var event = this._events.shift()
	
	  while(event && event._earliestTime <= this.context.currentTime) {
	    event._execute()
	    event = this._events.shift()
	  }
	
	  // Put back the last event
	  if(event) this._events.unshift(event)
	}
	
	// Creates an event and insert it to the list
	WAAClock.prototype._createEvent = function(func, deadline) {
	  return new Event(this, deadline, func)
	}
	
	// Inserts an event to the list
	WAAClock.prototype._insertEvent = function(event) {
	  this._events.splice(this._indexByTime(event._earliestTime), 0, event)
	}
	
	// Removes an event from the list
	WAAClock.prototype._removeEvent = function(event) {
	  var ind = this._events.indexOf(event)
	  if (ind !== -1) this._events.splice(ind, 1)
	}
	
	// Returns true if `event` is in queue, false otherwise
	WAAClock.prototype._hasEvent = function(event) {
	 return this._events.indexOf(event) !== -1
	}
	
	// Returns the index of the first event whose deadline is >= to `deadline`
	WAAClock.prototype._indexByTime = function(deadline) {
	  // performs a binary search
	  var low = 0
	    , high = this._events.length
	    , mid
	  while (low < high) {
	    mid = Math.floor((low + high) / 2)
	    if (this._events[mid]._earliestTime < deadline)
	      low = mid + 1
	    else high = mid
	  }
	  return low
	}
	
	// Converts from relative time to absolute time
	WAAClock.prototype._absTime = function(relTime) {
	  return relTime + this.context.currentTime
	}
	
	// Converts from absolute time to relative time 
	WAAClock.prototype._relTime = function(absTime) {
	  return absTime - this.context.currentTime
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(44)))

/***/ }),
/* 44 */
/***/ (function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	process.prependListener = noop;
	process.prependOnceListener = noop;
	
	process.listeners = function (name) { return [] }
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ })
/******/ ])
});
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAzMzFjNzIwOWZhNjAzN2JlY2YxOSIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9saWIvaW50ZXJmYWNlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvaW50ZXJmYWNlcy9wb3NpdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9saWIvdXRpbC9zdmcuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL3V0aWwvbWF0aC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvY29yZS9pbnRlcmZhY2UuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL3V0aWwvZG9tLmpzIiwid2VicGFjazovLy8uL2xpYi91dGlsL3V0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL3V0aWwvdG91Y2guanMiLCJ3ZWJwYWNrOi8vLy4vfi9ldmVudHMvZXZlbnRzLmpzIiwid2VicGFjazovLy8uL2xpYi9tb2RlbHMvc3RlcC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvdXRpbC9pbnRlcmFjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9saWIvbW9kZWxzL3RvZ2dsZS5qcyIsIndlYnBhY2s6Ly8vLi9saWIvaW50ZXJmYWNlcy9zbGlkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2ludGVyZmFjZXMvdG9nZ2xlLmpzIiwid2VicGFjazovLy8uL2xpYi9pbnRlcmZhY2VzL2J1dHRvbi5qcyIsIndlYnBhY2s6Ly8vLi9saWIvY29tcG9uZW50cy9idXR0b250ZW1wbGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9saWIvaW50ZXJmYWNlcy90ZXh0YnV0dG9uLmpzIiwid2VicGFjazovLy8uL2xpYi9pbnRlcmZhY2VzL3JhZGlvYnV0dG9uLmpzIiwid2VicGFjazovLy8uL2xpYi9pbnRlcmZhY2VzL251bWJlci5qcyIsIndlYnBhY2s6Ly8vLi9saWIvaW50ZXJmYWNlcy9zZWxlY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2ludGVyZmFjZXMvZGlhbC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvaW50ZXJmYWNlcy9waWFuby5qcyIsIndlYnBhY2s6Ly8vLi9saWIvaW50ZXJmYWNlcy9zZXF1ZW5jZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL21vZGVscy9tYXRyaXguanMiLCJ3ZWJwYWNrOi8vLy4vbGliL21vZGVscy9zZXF1ZW5jZS5qcyIsIndlYnBhY2s6Ly8vLi9saWIvbW9kZWxzL2RydW5rLmpzIiwid2VicGFjazovLy8uL2xpYi9tb2RlbHMvY291bnRlci5qcyIsIndlYnBhY2s6Ly8vLi9saWIvdGltZS9pbnRlcnZhbC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvaW50ZXJmYWNlcy9wYW4yZC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvaW50ZXJmYWNlcy90aWx0LmpzIiwid2VicGFjazovLy8uL2xpYi9pbnRlcmZhY2VzL211bHRpc2xpZGVyLmpzIiwid2VicGFjazovLy8uL2xpYi9pbnRlcmZhY2VzL3Bhbi5qcyIsIndlYnBhY2s6Ly8vLi9saWIvaW50ZXJmYWNlcy9lbnZlbG9wZS5qcyIsIndlYnBhY2s6Ly8vLi9saWIvaW50ZXJmYWNlcy9zcGVjdHJvZ3JhbS5qcyIsIndlYnBhY2s6Ly8vLi9saWIvaW50ZXJmYWNlcy9tZXRlci5qcyIsIndlYnBhY2s6Ly8vLi9saWIvaW50ZXJmYWNlcy9vc2NpbGxvc2NvcGUuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2NvcmUvcmFjay5qcyIsIndlYnBhY2s6Ly8vLi9saWIvdXRpbC90cmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vLy4vbGliL3R1bmluZy90dW5pbmcuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL21vZGVscy9yYWRpby5qcyIsIndlYnBhY2s6Ly8vLi9+L3dhYWNsb2NrL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vd2FhY2xvY2svbGliL1dBQUNsb2NrLmpzIiwid2VicGFjazovLy8uL34vcHJv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UUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBRSxDQUFDO0FBQ25HLFNBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxJQUFJLENBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUUsQ0FBQzs7QUFFbkcsU0FBSSxDQUFDLFFBQVEsR0FBRztBQUNkLFFBQUMsRUFBRSxJQUFJLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUMsWUFBWSxFQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUMsQ0FBQyxDQUFDLENBQUM7QUFDekYsUUFBQyxFQUFFLElBQUksV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBQyxVQUFVLEVBQUMsQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBQyxDQUFDLENBQUMsQ0FBQztNQUN4RixDQUFDO0FBQ0YsU0FBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDO0FBQzNDLFNBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQzs7QUFFM0MsU0FBSSxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ1osU0FBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBRWY7O2FBbkNrQixRQUFROztnQkFBUixRQUFRO0FBcUMzQixtQkFBYztjQUFB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S0FBSyxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsUUFBUSxHQUFDLEVBQUUsQ0FBQyxDQUFDOztBQUUxQyxhQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDOztBQUV2QixhQUFJLFlBQVksR0FBRztBQUNqQixnQkFBSyxFQUFFLElBQUksQ0FBQyxFQUFFLEdBQUMsR0FBRztBQUNsQixjQUFHLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBQyxDQUFDLEVBQUMsR0FBRyxFQUFDLElBQUksQ0FBQyxFQUFFLEdBQUMsR0FBRyxFQUFDLElBQUksQ0FBQyxFQUFFLEdBQUMsR0FBRyxDQUFDLEVBQUcsSUFBSSxDQUFDLEVBQUUsR0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEVBQUUsR0FBQyxHQUFHLENBQUU7VUFDN0YsQ0FBQztBQUNGLGFBQUksYUFBYSxHQUFHO0FBQ2xCLGdCQUFLLEVBQUUsSUFBSSxDQUFDLEVBQUUsR0FBQyxHQUFHO0FBQ2xCLGNBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLEVBQUUsR0FBQyxHQUFHLEVBQUMsSUFBSSxDQUFDLEVBQUUsR0FBQyxHQUFHLENBQUMsRUFBRyxJQUFJLENBQUMsRUFBRSxHQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsRUFBRSxHQUFDLEdBQUcsQ0FBRTtVQUM3RixDQUFDOztBQUVGLGFBQUksVUFBVSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxFQUFFLFFBQVEsR0FBQyxDQUFDLEdBQUMsUUFBUSxHQUFDLEVBQUUsRUFBRSxZQUFZLENBQUMsS0FBSyxFQUFFLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMzRyxhQUFJLFdBQVcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsTUFBTSxD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QUMsU0FBUyxFQUFDLEtBQUssQ0FBQyxDQUFDOztBQUczQyxhQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDbEUsYUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxFQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ2xFLGFBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzs7QUFFbEUsYUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ3ZDLGFBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztBQUN2QyxhQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7O0FBRXZDLGFBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLGNBQWMsRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNuRSxhQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxjQUFjLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDbkUsYUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsY0FBYyxFQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDOztBQUVuRSxhQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsTUFB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S0FBSyxDQUFDLENBQUM7QUFDdEQsZUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDdEQsZUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDbkQsZUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDbkQsZUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDbkQsZUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDcEQsZUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDcEQsZUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDcEQsZUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7VUFDbkQsTUFBTTtBQUNMLGVBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztBQUN0RCxlQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUMxRCxlQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUMxRCxlQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUMxRCxlQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUM1RCxlQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUM1RCxlQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUM1RCxlQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUN6RCxlQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUN6RCxlQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUN6RCxlQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUMxRCxlQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUMxRCxlQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUMxRCxlQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FB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O0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQWtDLGlDQUFpQztBQUNuRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsZUFBZTtBQUNwRDtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7O0FDek9BO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx3QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXFCO0FBQ3JCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxzQ0FBcUM7O0FBRXJDO0FBQ0E7QUFDQTs7QUFFQSw0QkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsNkJBQTRCLFVBQVUiLCJmaWxlIjoiLi9kaXN0L05leHVzVUkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJOZXh1c1wiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJOZXh1c1wiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAzMzFjNzIwOWZhNjAzN2JlY2YxOSIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IE5leHVzVUkgZnJvbSAnLi9saWIvbWFpbic7XG5cbmV4cG9ydCBkZWZhdWx0IE5leHVzVUk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2pzaGludC1sb2FkZXIhLi9pbmRleC5qcyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IEludGVyZmFjZXMgZnJvbSAnLi9pbnRlcmZhY2VzLyc7XG5pbXBvcnQgbWF0aCBmcm9tICcuL3V0aWwvbWF0aCc7XG5pbXBvcnQgUmFjayBmcm9tICcuL2NvcmUvcmFjayc7XG5pbXBvcnQgVHVuZSBmcm9tICcuL3R1bmluZy90dW5pbmcnO1xuaW1wb3J0ICogYXMgVHJhbnNmb3JtIGZyb20gJy4vdXRpbC90cmFuc2Zvcm0nO1xuXG5sZXQgQ291bnRlciA9IHJlcXVpcmUoJy4vbW9kZWxzL2NvdW50ZXInKTtcbmxldCBSYWRpbyA9IHJlcXVpcmUoJy4vbW9kZWxzL3JhZGlvJyk7XG5sZXQgRHJ1bmsgPSByZXF1aXJlKCcuL21vZGVscy9kcnVuaycpO1xubGV0IFNlcXVlbmNlID0gcmVxdWlyZSgnLi9tb2RlbHMvc2VxdWVuY2UnKTtcbmxldCBNYXRyaXggPSByZXF1aXJlKCcuL21vZGVscy9tYXRyaXgnKTtcblxuaW1wb3J0IFdBQUNsb2NrIGZyb20gJ3dhYWNsb2NrJztcbmltcG9ydCBJbnRlcnZhbCBmcm9tICcuL3RpbWUvaW50ZXJ2YWwnO1xuXG5jb25zdCBEZWZhdWx0Q29udGV4dCA9IHdpbmRvdy5BdWRpb0NvbnRleHQgfHwgd2luZG93LndlYmtpdEF1ZGlvQ29udGV4dDtcblxuZnVuY3Rpb24gdW5sb2NrQXVkaW9Db250ZXh0KGF1ZGlvQ29udGV4dCkge1xuICBjb25zdCBldmVudHMgPSBbJ3RvdWNoc3RhcnQnLCAndG91Y2hlbmQnLCAnbW91c2Vkb3duJywgJ2tleWRvd24nXTtcblxuICBmdW5jdGlvbiB1bmxvY2soKSB7XG4gICAgZXZlbnRzLmZvckVhY2goKGV2ZW50TmFtZSkgPT4gZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgdW5sb2NrKSk7XG4gICAgaWYgKGF1ZGlvQ29udGV4dC5zdGF0ZSA9PT0gJ3N1c3BlbmRlZCcpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdBdWRpbyBjb250ZXh0IC0gdW5sb2NrZWQgLi4uJyk7XG4gICAgICBhdWRpb0NvbnRleHQucmVzdW1lKCk7XG4gICAgfVxuICB9XG5cbiAgaWYgKGF1ZGlvQ29udGV4dC5zdGF0ZSA9PT0gJ3N1c3BlbmRlZCcpIHtcbiAgICBjb25zb2xlLmxvZygnQXVkaW8gY29udGV4dCAtIHN1c3BlbmRlZCB1bnRpbCB1c2VyIGludGVyYWN0aW9uIC4uLicpO1xuICAgIGV2ZW50cy5mb3JFYWNoKGV2ZW50TmFtZSA9PiB7XG4gICAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCB1bmxvY2ssIGZhbHNlKTtcbiAgICB9KTtcbiAgfVxufVxuXG4vKipcbk5leHVzVUkgPT4gY3JlYXRlZCBhcyBOZXh1c1xuKi9cblxuY2xhc3MgTmV4dXNVSSB7XG5cbiAgY29uc3RydWN0b3IoY29udGV4dCkge1xuXG4gICAgZm9yIChsZXQga2V5IGluIEludGVyZmFjZXMpIHtcbiAgICAgIHRoaXNba2V5XSA9IEludGVyZmFjZXNba2V5XTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBrZXkgaW4gbWF0aCkge1xuICAgICAgdGhpc1trZXldID0gbWF0aFtrZXldO1xuICAgIH1cblxuICAgIGxldCBDb3JlID0ge1xuICAgICAgJ1JhY2snOiBSYWNrXG4gICAgfTtcblxuICAgIGxldCBNb2RlbHMgPSB7XG4gICAgICAnQ291bnRlcic6IENvdW50ZXIsXG4gICAgICAnUmFkaW8nOiBSYWRpbyxcbiAgICAgICdEcnVuayc6IERydW5rLFxuICAgICAgJ1NlcXVlbmNlJzogU2VxdWVuY2UsXG4gICAgICAnTWF0cml4JzogTWF0cml4XG4gICAgfTtcblxuICAgIGZvciAobGV0IGtleSBpbiBNb2RlbHMpIHtcbiAgICAgIHRoaXNba2V5XSA9IE1vZGVsc1trZXldO1xuICAgIH1cblxuICAgIGZvciAobGV0IGtleSBpbiBDb3JlKSB7XG4gICAgICB0aGlzW2tleV0gPSBDb3JlW2tleV07XG4gICAgfVxuXG4gICAgdGhpcy5fY29udGV4dCA9IGNvbnRleHQ7XG5cbiAgICB0aGlzLnR1bmUgPSBuZXcgVHVuZSgpO1xuICAgIHRoaXMubm90ZSA9IHRoaXMudHVuZS5ub3RlLmJpbmQodGhpcy50dW5lKTtcblxuICAgIHRoaXMuX2Nsb2NrID0gbnVsbDtcbiAgICB0aGlzLkludGVydmFsID0gSW50ZXJ2YWw7XG5cbiAgICB0aGlzLmNvbG9ycyA9IHtcbiAgICAgIGFjY2VudDogJyMyYmInLFxuICAgICAgZmlsbDogJyNlZWUnLFxuICAgICAgbGlnaHQ6ICcjZmZmJyxcbiAgICAgIGRhcms6ICcjMzMzJyxcbiAgICAgIG1lZGl1bUxpZ2h0OiAnI2NjYycsXG4gICAgICBtZWRpdW1EYXJrOiAnIzY2NidcbiAgICB9O1xuXG4gICAgdGhpcy50cmFuc2Zvcm0gPSBUcmFuc2Zvcm07XG4gICAgdGhpcy5hZGQgPSBUcmFuc2Zvcm0uYWRkO1xuXG5cbiAgICB0aGlzLkFkZCA9IHt9O1xuICAgIGZvciAobGV0IGtleSBpbiBJbnRlcmZhY2VzKSB7XG4gICAgICB0aGlzLkFkZFtrZXldID0gVHJhbnNmb3JtLmFkZC5iaW5kKHRoaXMsIGtleSk7XG4gICAgfVxuXG5cblxuXG4gICAgLyogY3JlYXRlIGRlZmF1bHQgY29tcG9uZW50IHNpemUgKi9cbiAgICAvKiBqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG4gICAgdmFyIGV4aXN0aW5nU3R5bGVzaGVldHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInN0eWxlXCIpO1xuICAgIHZhciBkZWZhdWx0U2l6ZURlY2xhcmF0aW9uID0gJ1tuZXh1cy11aV17aGVpZ2h0OjUwMDBweDt3aWR0aDo1MDAwcHh9JztcbiAgICB2YXIgZGVmYXVsdFN0eWxlTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgZGVmYXVsdFN0eWxlTm9kZS50eXBlID0gJ3RleHQvY3NzJztcbiAgICBkZWZhdWx0U3R5bGVOb2RlLmlubmVySFRNTCA9IGRlZmF1bHRTaXplRGVjbGFyYXRpb247XG4gICAgaWYgKGV4aXN0aW5nU3R5bGVzaGVldHMubGVuZ3RoID4gMCkge1xuICAgICAgdmFyIHBhcmVudCA9IGV4aXN0aW5nU3R5bGVzaGVldHNbMF0ucGFyZW50Tm9kZVxuICAgICAgcGFyZW50Lmluc2VydEJlZm9yZShkZWZhdWx0U3R5bGVOb2RlLCBleGlzdGluZ1N0eWxlc2hlZXRzWzBdKVxuICAgIH0gZWxzZSB7XG4gICAgICBkb2N1bWVudC53cml0ZSgnPHN0eWxlPicgKyBkZWZhdWx0U2l6ZURlY2xhcmF0aW9uICsgJzxcXC9zdHlsZT4nKTtcbiAgICB9XG4gICAgLyoganNoaW50IGlnbm9yZTplbmQgKi9cblxuICB9XG5cbiAgZ2V0IGNvbnRleHQoKSB7XG4gICAgaWYgKCF0aGlzLl9jb250ZXh0KSB7XG4gICAgICB0aGlzLl9jb250ZXh0ID0gbmV3IERlZmF1bHRDb250ZXh0KCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9jb250ZXh0O1xuICB9XG5cbiAgc2V0IGNvbnRleHQoY3R4KSB7XG4gICAgaWYgKHRoaXMuX2Nsb2NrKSB7XG4gICAgICB0aGlzLl9jbG9jay5zdG9wKCk7XG4gICAgICB0aGlzLl9jbG9jayA9IG51bGw7XG4gICAgfVxuXG4gICAgdGhpcy5fY29udGV4dCA9IGN0eDtcbiAgICB1bmxvY2tBdWRpb0NvbnRleHQoY3R4KTtcbiAgfVxuXG4gIGdldCBjbG9jaygpIHtcbiAgICBpZiAoIXRoaXMuX2Nsb2NrKSB7XG4gICAgICB0aGlzLl9jbG9jayA9IG5ldyBXQUFDbG9jayh0aGlzLmNvbnRleHQpO1xuICAgICAgdGhpcy5fY2xvY2suc3RhcnQoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2Nsb2NrO1xuICB9XG59XG5cbmxldCBOZXh1cyA9IG5ldyBOZXh1c1VJKCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBjb2xvcnMoKSB7XG4gICAgcmV0dXJuIE5leHVzLmNvbG9ycztcbn1cbmV4cG9ydCBmdW5jdGlvbiBjb250ZXh0KCkge1xuICAgIHJldHVybiBOZXh1cy5jb250ZXh0O1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNsb2NrKCkge1xuICAgIHJldHVybiBOZXh1cy5jbG9jaztcbn1cblxuZXhwb3J0IGRlZmF1bHQgTmV4dXM7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2pzaGludC1sb2FkZXIhLi9saWIvbWFpbi5qcyIsImV4cG9ydCBkZWZhdWx0IHtcbiAgUG9zaXRpb246IHJlcXVpcmUoJy4vcG9zaXRpb24nKSxcbiAgU2xpZGVyOiByZXF1aXJlKCcuL3NsaWRlcicpLFxuICBUb2dnbGU6IHJlcXVpcmUoJy4vdG9nZ2xlJyksXG4vKiAgUmFuZ2U6IHJlcXVpcmUoJy4vcmFuZ2VzbGlkZXInKSxcbiAgV2F2ZWZvcm06IHJlcXVpcmUoJy4vd2F2ZWZvcm0nKSwgKi9cbiAgQnV0dG9uOiByZXF1aXJlKCcuL2J1dHRvbicpLFxuICBUZXh0QnV0dG9uOiByZXF1aXJlKCcuL3RleHRidXR0b24nKSxcbiAgUmFkaW9CdXR0b246IHJlcXVpcmUoJy4vcmFkaW9idXR0b24nKSxcbiAgTnVtYmVyOiByZXF1aXJlKCcuL251bWJlcicpLFxuICBTZWxlY3Q6IHJlcXVpcmUoJy4vc2VsZWN0JyksXG4gIERpYWw6IHJlcXVpcmUoJy4vZGlhbCcpLFxuICBQaWFubzogcmVxdWlyZSgnLi9waWFubycpLFxuICBTZXF1ZW5jZXI6IHJlcXVpcmUoJy4vc2VxdWVuY2VyJyksXG4gIFBhbjJEOiByZXF1aXJlKCcuL3BhbjJkJyksXG4gIFRpbHQ6IHJlcXVpcmUoJy4vdGlsdCcpLFxuICBNdWx0aXNsaWRlcjogcmVxdWlyZSgnLi9tdWx0aXNsaWRlcicpLFxuICBQYW46IHJlcXVpcmUoJy4vcGFuJyksXG4gIEVudmVsb3BlOiByZXF1aXJlKCcuL2VudmVsb3BlJyksXG4gIFNwZWN0cm9ncmFtOiByZXF1aXJlKCcuL3NwZWN0cm9ncmFtJyksXG4gIE1ldGVyOiByZXF1aXJlKCcuL21ldGVyJyksXG4gIE9zY2lsbG9zY29wZTogcmVxdWlyZSgnLi9vc2NpbGxvc2NvcGUnKVxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vanNoaW50LWxvYWRlciEuL2xpYi9pbnRlcmZhY2VzL2luZGV4LmpzIiwiXG4ndXNlIHN0cmljdCc7XG5cbmxldCBzdmcgPSByZXF1aXJlKCcuLi91dGlsL3N2ZycpO1xubGV0IEludGVyZmFjZSA9IHJlcXVpcmUoJy4uL2NvcmUvaW50ZXJmYWNlJyk7XG5sZXQgU3RlcCA9IHJlcXVpcmUoJy4uL21vZGVscy9zdGVwJyk7XG5pbXBvcnQgKiBhcyBJbnRlcmFjdGlvbiBmcm9tICcuLi91dGlsL2ludGVyYWN0aW9uJztcblxuLyoqXG4qIFBvc2l0aW9uXG4qXG4qIEBkZXNjcmlwdGlvbiBUd28tZGltZW5zaW9uYWwgdG91Y2ggc2xpZGVyLlxuKlxuKiBAZGVtbyA8c3BhbiBuZXh1cy11aT1cInBvc2l0aW9uXCI+PC9zcGFuPlxuKlxuKiBAZXhhbXBsZVxuKiB2YXIgcG9zaXRpb24gPSBuZXcgTmV4dXMuUG9zaXRpb24oJyN0YXJnZXQnKVxuKlxuKiBAZXhhbXBsZVxuKiB2YXIgcG9zaXRpb24gPSBuZXcgTmV4dXMuUG9zaXRpb24oJyN0YXJnZXQnLHtcbiogICAnc2l6ZSc6IFsyMDAsMjAwXSxcbiogICAnbW9kZSc6ICdhYnNvbHV0ZScsICAvLyBcImFic29sdXRlXCIgb3IgXCJyZWxhdGl2ZVwiXG4qICAgJ3gnOiAwLjUsICAvLyBpbml0aWFsIHggdmFsdWVcbiogICAnbWluWCc6IDAsXG4qICAgJ21heFgnOiAxLFxuKiAgICdzdGVwWCc6IDAsXG4qICAgJ3knOiAwLjUsICAvLyBpbml0aWFsIHkgdmFsdWVcbiogICAnbWluWSc6IDAsXG4qICAgJ21heFknOiAxLFxuKiAgICdzdGVwWSc6IDBcbiogfSlcbipcbiogQG91dHB1dFxuKiBjaGFuZ2VcbiogRmlyZXMgYW55IHRpbWUgdGhlIGludGVyZmFjZSdzIHZhbHVlIGNoYW5nZXMuIDxicj5cbiogVGhlIGV2ZW50IGRhdGEgaXMgYW4gb2JqZWN0IHdpdGggeCBhbmQgeSBwcm9wZXJ0aWVzIGNvbnRhaW5pbmcgdGhlIHggYW5kIHkgdmFsdWVzIG9mIHRoZSBpbnRlcmZhY2UuXG4qXG4qIEBvdXRwdXRleGFtcGxlXG4qIHBvc2l0aW9uLm9uKCdjaGFuZ2UnLGZ1bmN0aW9uKHYpIHtcbiogICBjb25zb2xlLmxvZyh2KTtcbiogfSlcbipcbipcbiovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvc2l0aW9uIGV4dGVuZHMgSW50ZXJmYWNlIHtcblxuICBjb25zdHJ1Y3RvcigpIHtcblxuICAgIGxldCBvcHRpb25zID0gWyd2YWx1ZSddO1xuXG4gICAgbGV0IGRlZmF1bHRzID0ge1xuICAgICAgJ3NpemUnOiBbMjAwLDIwMF0sXG4gICAgICAnbW9kZSc6ICdhYnNvbHV0ZScsXG4gICAgICAnbWluWCc6IDAsXG4gICAgICAnbWF4WCc6IDEsXG4gICAgICAnc3RlcFgnOiAwLFxuICAgICAgJ3gnOiAwLjUsXG4gICAgICAnbWluWSc6IDAsXG4gICAgICAnbWF4WSc6IDEsXG4gICAgICAnc3RlcFknOiAwLFxuICAgICAgJ3knOiAwLjVcbiAgICB9O1xuXG4gICAgc3VwZXIoYXJndW1lbnRzLG9wdGlvbnMsZGVmYXVsdHMpO1xuXG5cbiAgICB0aGlzLl94ID0gbmV3IFN0ZXAoIHRoaXMuc2V0dGluZ3MubWluWCwgdGhpcy5zZXR0aW5ncy5tYXhYLCB0aGlzLnNldHRpbmdzLnN0ZXBYLCB0aGlzLnNldHRpbmdzLnggKTtcbiAgICB0aGlzLl95ID0gbmV3IFN0ZXAoIHRoaXMuc2V0dGluZ3MubWluWSwgdGhpcy5zZXR0aW5ncy5tYXhZLCB0aGlzLnNldHRpbmdzLnN0ZXBZLCB0aGlzLnNldHRpbmdzLnkgKTtcblxuICAgIHRoaXMucG9zaXRpb24gPSB7XG4gICAgICB4OiBuZXcgSW50ZXJhY3Rpb24uSGFuZGxlKHRoaXMuc2V0dGluZ3MubW9kZSwnaG9yaXpvbnRhbCcsWzAsdGhpcy53aWR0aF0sW3RoaXMuaGVpZ2h0LDBdKSxcbiAgICAgIHk6IG5ldyBJbnRlcmFjdGlvbi5IYW5kbGUodGhpcy5zZXR0aW5ncy5tb2RlLCd2ZXJ0aWNhbCcsWzAsdGhpcy53aWR0aF0sW3RoaXMuaGVpZ2h0LDBdKVxuICAgIH07XG4gICAgdGhpcy5wb3NpdGlvbi54LnZhbHVlID0gdGhpcy5feC5ub3JtYWxpemVkO1xuICAgIHRoaXMucG9zaXRpb24ueS52YWx1ZSA9IHRoaXMuX3kubm9ybWFsaXplZDtcblxuICAgIHRoaXMuaW5pdCgpO1xuICAgIHRoaXMucmVuZGVyKCk7XG5cbiAgfVxuXG4gIGJ1aWxkSW50ZXJmYWNlKCkge1xuXG4gICAgdGhpcy5rbm9iID0gc3ZnLmNyZWF0ZSgnY2lyY2xlJyk7XG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMua25vYik7XG4gICAgXG4gIH1cblxuICBzaXplSW50ZXJmYWNlKCkge1xuXG4gICAgICB0aGlzLnBvc2l0aW9uLngucmVzaXplKFswLHRoaXMud2lkdGhdLFt0aGlzLmhlaWdodCwwXSk7XG4gICAgICB0aGlzLnBvc2l0aW9uLnkucmVzaXplKFswLHRoaXMud2lkdGhdLFt0aGlzLmhlaWdodCwwXSk7XG5cbiAgICAgIHRoaXMuX21pbkRpbWVuc2lvbiA9IE1hdGgubWluKHRoaXMud2lkdGgsdGhpcy5oZWlnaHQpO1xuXG4gICAgICB0aGlzLmtub2JSYWRpdXMgPSB7XG4gICAgICAgIG9mZjogfn4odGhpcy5fbWluRGltZW5zaW9uLzEwMCkgKiA1ICsgNSxcbiAgICAgIH07XG4gICAgICB0aGlzLmtub2JSYWRpdXMub24gPSB0aGlzLmtub2JSYWRpdXMub2ZmICogMjtcblxuICAgICAgdGhpcy5rbm9iLnNldEF0dHJpYnV0ZSgnY3gnLHRoaXMud2lkdGgvMik7XG4gICAgICB0aGlzLmtub2Iuc2V0QXR0cmlidXRlKCdjeScsdGhpcy5oZWlnaHQvMik7XG4gICAgICB0aGlzLmtub2Iuc2V0QXR0cmlidXRlKCdyJyx0aGlzLmtub2JSYWRpdXMub2ZmKTtcbiAgfVxuXG4gIGNvbG9ySW50ZXJmYWNlKCkge1xuICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHRoaXMuY29sb3JzLmZpbGw7XG4gICAgICB0aGlzLmtub2Iuc2V0QXR0cmlidXRlKCdmaWxsJywgdGhpcy5jb2xvcnMuYWNjZW50KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBpZiAodGhpcy5jbGlja2VkKSB7XG4gICAgLy8gIHRoaXMua25vYlJhZGl1cyA9IDMwO1xuICAgICAgdGhpcy5rbm9iLnNldEF0dHJpYnV0ZSgncicsdGhpcy5rbm9iUmFkaXVzLm9uKTtcbiAgICB9IGVsc2Uge1xuICAgIC8vICB0aGlzLmtub2JSYWRpdXMgPSAxNTtcbiAgICAgIHRoaXMua25vYi5zZXRBdHRyaWJ1dGUoJ3InLHRoaXMua25vYlJhZGl1cy5vZmYpO1xuICAgIH1cblxuICAgIHRoaXMua25vYkNvb3JkaW5hdGVzID0ge1xuICAgICAgeDogdGhpcy5feC5ub3JtYWxpemVkICogdGhpcy53aWR0aCxcbiAgICAgIHk6IHRoaXMuaGVpZ2h0IC0gdGhpcy5feS5ub3JtYWxpemVkICogdGhpcy5oZWlnaHRcbiAgICB9O1xuXG4gICAgdGhpcy5rbm9iLnNldEF0dHJpYnV0ZSgnY3gnLHRoaXMua25vYkNvb3JkaW5hdGVzLngpO1xuICAgIHRoaXMua25vYi5zZXRBdHRyaWJ1dGUoJ2N5Jyx0aGlzLmtub2JDb29yZGluYXRlcy55KTtcbiAgfVxuXG5cbiAgY2xpY2soKSB7XG4gICAgdGhpcy5wb3NpdGlvbi54LmFuY2hvciA9IHRoaXMubW91c2U7XG4gICAgdGhpcy5wb3NpdGlvbi55LmFuY2hvciA9IHRoaXMubW91c2U7XG4gICAgdGhpcy5tb3ZlKCk7XG4gIH1cblxuICBtb3ZlKCkge1xuICAgIGlmICh0aGlzLmNsaWNrZWQpIHtcbiAgICAgIHRoaXMucG9zaXRpb24ueC51cGRhdGUodGhpcy5tb3VzZSk7XG4gICAgICB0aGlzLnBvc2l0aW9uLnkudXBkYXRlKHRoaXMubW91c2UpO1xuICAgICAgdGhpcy5feC51cGRhdGVOb3JtYWwoIHRoaXMucG9zaXRpb24ueC52YWx1ZSApO1xuICAgICAgdGhpcy5feS51cGRhdGVOb3JtYWwoIHRoaXMucG9zaXRpb24ueS52YWx1ZSApO1xuICAgICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHtcbiAgICAgICAgeDogdGhpcy5feC52YWx1ZSxcbiAgICAgICAgeTogdGhpcy5feS52YWx1ZVxuICAgICAgfSk7XG4gICAgICB0aGlzLnJlbmRlcigpO1xuICAgIH1cbiAgfVxuXG4gIHJlbGVhc2UoKSB7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIC8qKlxuICAqIFRoZSBpbnRlcmZhY2UncyB4IHZhbHVlLiBXaGVuIHNldCwgaXQgd2lsbCBhdXRvbWF0aWNhbGx5IGFkanVzdCB0byBmaXQgbWluL21heC9zdGVwIHNldHRpbmdzIG9mIHRoZSBpbnRlcmZhY2UuXG4gICogQHR5cGUge29iamVjdH1cbiAgKiBAZXhhbXBsZSBwb3NpdGlvbi54ID0gMC41O1xuICAqL1xuXG4gIGdldCB4KCkge1xuICAgIHJldHVybiB0aGlzLl94LnZhbHVlO1xuICB9XG5cbiAgc2V0IHgodmFsdWUpIHtcbiAgICB0aGlzLl94LnVwZGF0ZSh2YWx1ZSk7XG4gICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHtcbiAgICAgIHg6IHRoaXMuX3gudmFsdWUsXG4gICAgICB5OiB0aGlzLl95LnZhbHVlXG4gICAgfSk7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIC8qKlxuICAqIFRoZSBpbnRlcmZhY2UncyB5IHZhbHVlcy4gV2hlbiBzZXQsIGl0IHdpbGwgYXV0b21hdGljYWxseSBhZGp1c3QgdG8gZml0IG1pbi9tYXgvc3RlcCBzZXR0aW5ncyBvZiB0aGUgaW50ZXJmYWNlLlxuICAqIEB0eXBlIHtvYmplY3R9XG4gICogQGV4YW1wbGUgcG9zaXRpb24ueCA9IDAuNTtcbiAgKi9cblxuICBnZXQgeSgpIHtcbiAgICByZXR1cm4gdGhpcy5feS52YWx1ZTtcbiAgfVxuXG4gIHNldCB5KHZhbHVlKSB7XG4gICAgdGhpcy5feS51cGRhdGUodmFsdWUpO1xuICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx7XG4gICAgICB4OiB0aGlzLl94LnZhbHVlLFxuICAgICAgeTogdGhpcy5feS52YWx1ZVxuICAgIH0pO1xuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuXG5cbiAgZ2V0IG5vcm1hbGl6ZWQoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IHRoaXMuX3gubm9ybWFsaXplZCxcbiAgICAgIHk6IHRoaXMuX3kubm9ybWFsaXplZFxuICAgIH07XG4gIH1cblxuICAvKipcbiAgKiBUaGUgbG93ZXIgbGltaXQgb2YgdmFsdWUgb24gdGhlIHggYXhpc1xuICAqIEB0eXBlIHtvYmplY3R9XG4gICovXG4gIGdldCBtaW5YKCkge1xuICAgIHJldHVybiB0aGlzLl94Lm1pbjtcbiAgfVxuXG4gIHNldCBtaW5YKHYpIHtcbiAgICB0aGlzLl94Lm1pbiA9IHY7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIC8qKlxuICAqIFRoZSBsb3dlciBsaW1pdCBvZiB2YWx1ZSBvbiB0aGUgeSBheGlzXG4gICogQHR5cGUge29iamVjdH1cbiAgKi9cbiAgZ2V0IG1pblkoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3kubWluO1xuICB9XG5cbiAgc2V0IG1pblkodikge1xuICAgIHRoaXMuX3kubWluID0gdjtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cblxuICAvKipcbiAgKiBUaGUgdXBwZXIgbGltaXQgb2YgdmFsdWUgb24gdGhlIHggYXhpc1xuICAqIEB0eXBlIHtvYmplY3R9XG4gICovXG4gIGdldCBtYXhYKCkge1xuICAgIHJldHVybiB0aGlzLl94Lm1heDtcbiAgfVxuXG4gIHNldCBtYXhYKHYpIHtcbiAgICB0aGlzLl94Lm1heCA9IHY7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG5cbiAgLyoqXG4gICogVGhlIHVwcGVyIGxpbWl0IG9mIHZhbHVlIG9uIHRoZSB5IGF4aXNcbiAgKiBAdHlwZSB7b2JqZWN0fVxuICAqL1xuICBnZXQgbWF4WSgpIHtcbiAgICByZXR1cm4gdGhpcy5feS5tYXg7XG4gIH1cblxuICBzZXQgbWF4WSh2KSB7XG4gICAgdGhpcy5feS5tYXggPSB2O1xuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuXG4gIC8qKlxuICAqIFRoZSBpbmNyZW1lbnRhbCBzdGVwIG9mIHZhbHVlcyBvbiB0aGUgeCBheGlzXG4gICogQHR5cGUge29iamVjdH1cbiAgKi9cbiAgZ2V0IHN0ZXBYKCkge1xuICAgIHJldHVybiB0aGlzLl94LnN0ZXA7XG4gIH1cblxuICBzZXQgc3RlcFgodikge1xuICAgIHRoaXMuX3guc3RlcCA9IHY7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG5cbiAgLyoqXG4gICogVGhlIGluY3JlbWVudGFsIHN0ZXAgb2YgdmFsdWVzIG9uIHRoZSB5IGF4aXNcbiAgKiBAdHlwZSB7b2JqZWN0fVxuICAqL1xuICBnZXQgc3RlcFkoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3kuc3RlcDtcbiAgfVxuXG4gIHNldCBzdGVwWSh2KSB7XG4gICAgdGhpcy5feS5zdGVwID0gdjtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cblxuICAvKipcbiAgQWJzb2x1dGUgbW9kZSAocG9zaXRpb24ncyB2YWx1ZSBqdW1wcyB0byBtb3VzZSBjbGljayBwb3NpdGlvbikgb3IgcmVsYXRpdmUgbW9kZSAobW91c2UgZHJhZyBjaGFuZ2VzIHZhbHVlIHJlbGF0aXZlIHRvIGl0cyBjdXJyZW50IHBvc2l0aW9uKS4gRGVmYXVsdDogXCJhYnNvbHV0ZVwiLlxuICBAdHlwZSB7c3RyaW5nfVxuICBAZXhhbXBsZSBwb3NpdGlvbi5tb2RlID0gXCJyZWxhdGl2ZVwiO1xuICAqL1xuICBnZXQgbW9kZSgpIHtcbiAgICByZXR1cm4gdGhpcy5wb3NpdGlvbi54Lm1vZGU7XG4gIH1cbiAgc2V0IG1vZGUodikge1xuICAgIHRoaXMucG9zaXRpb24ueC5tb2RlID0gdjtcbiAgICB0aGlzLnBvc2l0aW9uLnkubW9kZSA9IHY7XG4gIH1cblxuXG5cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9qc2hpbnQtbG9hZGVyIS4vbGliL2ludGVyZmFjZXMvcG9zaXRpb24uanMiLCIndXNlIHN0cmljdCc7XG5cbmxldCBtYXRoID0gcmVxdWlyZSgnLi4vdXRpbC9tYXRoJyk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcblxuICBjcmVhdGU6ICh0eXBlKSA9PiB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCB0eXBlKTtcbiAgfSxcblxuICBhcmM6ICh4LCB5LCByYWRpdXMsIHN0YXJ0QW5nbGUsIGVuZEFuZ2xlKSA9PiB7XG5cbiAgICB2YXIgc3RhcnQgPSBtYXRoLnRvQ2FydGVzaWFuKHJhZGl1cywgZW5kQW5nbGUpO1xuICAgIHZhciBlbmQgPSBtYXRoLnRvQ2FydGVzaWFuKHJhZGl1cywgc3RhcnRBbmdsZSk7XG5cbiAgICB2YXIgbGFyZ2VBcmNGbGFnID0gZW5kQW5nbGUgLSBzdGFydEFuZ2xlIDw9IDE4MCA/ICcwJyA6ICcxJztcblxuICAgIHZhciBkID0gW1xuICAgICAgICAnTScsIHN0YXJ0LngreCwgc3RhcnQueSt5LFxuICAgICAgICAnQScsIHJhZGl1cywgcmFkaXVzLCAwLCBsYXJnZUFyY0ZsYWcsIDAsIGVuZC54K3gsIGVuZC55K3lcbiAgICBdLmpvaW4oJyAnKTtcblxuICAgIHJldHVybiBkO1xuICB9LFxuXG4gIHJhZGlhbEdyYWRpZW50OiAoZGVmcyxudW1iZXJPZlN0b3BzKSA9PiB7XG5cbiAgICBsZXQgaWQgPSAnZ3JhZGllbnQnICsgbWF0aC5yaSgxMDAwMDAwMDAwMDApO1xuICAgIGxldCBzdG9wcyA9IFtdO1xuXG4gICAgbGV0IGdyYWRpZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsICdyYWRpYWxHcmFkaWVudCcpO1xuICAgIGdyYWRpZW50LnNldEF0dHJpYnV0ZSgnaWQnLCBpZCk7XG4gICAgZ3JhZGllbnQuc2V0QXR0cmlidXRlKCdjeCcsICc1MCUnKTtcbiAgICBncmFkaWVudC5zZXRBdHRyaWJ1dGUoJ2N5JywgJzUwJScpO1xuICAgIGdyYWRpZW50LnNldEF0dHJpYnV0ZSgncicsICc1MCUnKTtcblxuICAgIGRlZnMuYXBwZW5kQ2hpbGQoZ3JhZGllbnQpO1xuXG4gICAgZm9yIChsZXQgaT0wO2k8bnVtYmVyT2ZTdG9wcztpKyspIHtcbiAgICAgIGxldCBzdG9wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsICdzdG9wJyk7XG4gICAgICBzdG9wLnNldEF0dHJpYnV0ZSgnaWQnLCAnc3RvcCcraSk7XG4gICAgICAvL3N0b3Auc2V0QXR0cmlidXRlKCdvZmZzZXQnLCAnNzAlJyk7XG4gICAgICAvL3N0b3Auc2V0QXR0cmlidXRlKCdzdG9wLWNvbG9yJywgJ1doaXRlJyk7XG4gICAgICBncmFkaWVudC5hcHBlbmRDaGlsZChzdG9wKTtcbiAgICAgIHN0b3BzLnB1c2goc3RvcCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGlkOiBpZCxcbiAgICAgIHN0b3BzOiBzdG9wcyxcbiAgICAgIGVsZW1lbnQ6IGdyYWRpZW50XG4gICAgfTtcblxuICB9XG5cbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2pzaGludC1sb2FkZXIhLi9saWIvdXRpbC9zdmcuanMiLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogTGltaXQgYSBudW1iZXIgdG8gd2l0aGluIGEgbWluaW11bSBhbmQgbWF4aW11bVxuICogQHBhcmFtICB7bnVtYmVyfSB2YWx1ZSBJbnB1dCB2YWx1ZVxuICogQHBhcmFtICB7bnVtYmVyfSBtaW4gICBMb3dlciBsaW1pdFxuICogQHBhcmFtICB7bnVtYmVyfSBtYXggICBVcHBlciBsaW1pdFxuICogQHJldHVybiB7bnVtYmVyfSAgICAgICBUaGUgaW5wdXQgdmFsdWUgY29uc3RyYWluZWQgd2l0aGluIHRoZSBsb3dlciBhbmQgdXBwZXIgbGltaXRzXG4gKiBAZXhhbXBsZVxuICogTmV4dXMuY2xpcCgxMSwwLDEwKSAgIC8vIHJldHVybnMgMTBcbiAqIE5leHVzLmNsaXAoLTEsMCwxMCkgICAvLyByZXR1cm5zIDBcbiAqIE5leHVzLmNsaXAoNSwwLDEwKSAgICAvLyByZXR1cm5zIDVcbiAqL1xuXG5leHBvcnRzLmNsaXAgPSAodmFsdWUsbWluLG1heCkgPT4ge1xuICByZXR1cm4gTWF0aC5taW4oTWF0aC5tYXgodmFsdWUsbWluKSxtYXgpO1xufTtcblxuZXhwb3J0cy5ub3JtYWxpemUgPSAodmFsdWUsbWluLG1heCkgPT4ge1xuICByZXR1cm4gKCAodmFsdWUtbWluKSAvIChtYXgtbWluKSApO1xufTtcblxuLyoqXG4gKiBTY2FsZSBhIHZhbHVlIGZyb20gb25lIHJhbmdlIHRvIGFub3RoZXIgcmFuZ2UuXG4gKiBAcGFyYW0gIHtudW1iZXJ9IGluTnVtICBJbnB1dCB2YWx1ZVxuICogQHBhcmFtICB7bnVtYmVyfSBpbk1pbiAgSW5wdXQgcmFuZ2UgbWluaW11bVxuICogQHBhcmFtICB7bnVtYmVyfSBpbk1heCAgSW5wdXQgcmFuZ2UgbWF4aW11bVxuICogQHBhcmFtICB7bnVtYmVyfSBvdXRNaW4gT3V0cHV0IHJhbmdlIG1pbmltdW1cbiAqIEBwYXJhbSAge251bWJlcn0gb3V0TWF4IE91dHB1dCByYW5nZSBtYXhpbXVtXG4gKiBAcmV0dXJuIHtudW1iZXJ9ICAgICAgICBUaGUgaW5wdXQgdmFsdWUgc2NhbGVkIHRvIGl0cyBuZXcgcmFuZ2VcbiAqIEBleGFtcGxlXG4gKiBOZXh1cy5zY2FsZSgwLjUsMCwxLDAsMTApICAgLy8gcmV0dXJucyA1XG4gKiBOZXh1cy5zY2FsZSgwLjksMCwxLDEsMCkgICAgLy8gcmV0dXJucyAwLjFcbiAqL1xuZXhwb3J0cy5zY2FsZSA9IChpbk51bSwgaW5NaW4sIGluTWF4LCBvdXRNaW4sIG91dE1heCkgPT4ge1xuICBpZiAoaW5NaW4gPT09IGluTWF4KSB7XG4gICAgcmV0dXJuIG91dE1pbjtcbiAgfVxuICByZXR1cm4gKCgoaW5OdW0gLSBpbk1pbikgKiAob3V0TWF4IC0gb3V0TWluKSkgLyAoaW5NYXggLSBpbk1pbikpICsgb3V0TWluO1xufTtcblxuZXhwb3J0cy50b1BvbGFyID0gKHgseSkgPT4ge1xuICB2YXIgciA9IE1hdGguc3FydCh4KnggKyB5KnkpO1xuXG4gIHZhciB0aGV0YSA9IE1hdGguYXRhbjIoeSx4KTtcbiAgaWYgKHRoZXRhIDwgMCkge1xuICAgIHRoZXRhID0gdGhldGEgKyAoMiAqIE1hdGguUEkpO1xuICB9XG4gIHJldHVybiB7cmFkaXVzOiByLCBhbmdsZTogdGhldGF9O1xufTtcblxuZXhwb3J0cy50b0NhcnRlc2lhbiA9IGZ1bmN0aW9uKHJhZGl1cywgYW5nbGUpe1xuICB2YXIgY29zID0gTWF0aC5jb3MoYW5nbGUpO1xuICB2YXIgc2luID0gTWF0aC5zaW4oYW5nbGUpO1xuICByZXR1cm4ge3g6IHJhZGl1cypjb3MsIHk6IHJhZGl1cypzaW4qLTF9O1xufTtcbi8qXG5leHBvcnRzLnBvbGFyVG9DYXJ0ZXNpYW4oY2VudGVyWCwgY2VudGVyWSwgcmFkaXVzLCBhbmdsZUluRGVncmVlcykge1xuICB2YXIgYW5nbGVJblJhZGlhbnMgPSAoYW5nbGVJbkRlZ3JlZXMtOTApICogTWF0aC5QSSAvIDE4MC4wO1xuXG4gIHJldHVybiB7XG4gICAgeDogY2VudGVyWCArIChyYWRpdXMgKiBNYXRoLmNvcyhhbmdsZUluUmFkaWFucykpLFxuICAgIHk6IGNlbnRlclkgKyAocmFkaXVzICogTWF0aC5zaW4oYW5nbGVJblJhZGlhbnMpKVxuICB9O1xufSAgKi9cblxuXG5cbmV4cG9ydHMucHJ1bmUgPSBmdW5jdGlvbihkYXRhLCBzY2FsZSkge1xuICByZXR1cm4gcGFyc2VGbG9hdChkYXRhLnRvRml4ZWQoc2NhbGUpKTtcbn07XG5cbmV4cG9ydHMuaW52ZXJ0ID0gZnVuY3Rpb24gKGluTnVtKSB7XG4gIHJldHVybiBleHBvcnRzLnNjYWxlKGluTnVtLCAxLCAwLCAwLCAxKTtcbn07XG5cbi8qKlxuICogQ29udmVydCBhIE1JRGkgbm90ZSBudW1iZXIgdG8gYSBmcmVxdWVuY3kgdmFsdWUgaW4gZXF1YWwgdGVtcGVyYW1lbnQuXG4gKiBAcGFyYW0gIHtudW1iZXJ9IG1pZGkgTUlESSBub3RlIHZhbHVlXG4gKiBAcmV0dXJuIHtudW1iZXJ9ICAgICAgRnJlcXVlbmNlIHZhbHVlXG4gKiBAZXhhbXBsZVxuICogTmV4dXMubXRvZig2MCkgIC8vIHJldHVybnMgdGhlIGZyZXF1ZW5jeSBudW1iZXIgb2YgTWlkZGxlIENcbiAqL1xuZXhwb3J0cy5tdG9mID0gZnVuY3Rpb24obWlkaSkge1xuICByZXR1cm4gTWF0aC5wb3coMiwgKChtaWRpLTY5KS8xMikpICogNDQwO1xufTtcblxuLyoqXG4gKiBJbnRlcnBvbGF0ZSBiZXR3ZWVuIHR3byBudW1iZXJzXG4gKiBAcGFyYW0gIHtudW1iZXJ9IGxvYyBJbnRlcnBvbGF0aW9uIGluZGV4ICgwLTEpXG4gKiBAcGFyYW0gIHtudW1iZXJ9IG1pbiBMb3dlciB2YWx1ZVxuICogQHBhcmFtICB7bnVtYmVyfSBtYXggVXBwZXIgdmFsdWVcbiAqIEByZXR1cm4ge251bWJlcn0gICAgIEludGVycG9sYXRlZCB2YWx1ZVxuICogQGV4YW1wbGVcbiAqIE5leHVzLmludGVycCgwLjUsMiw0KSAgIC8vIHJldHVybnMgM1xuICogTmV4dXMuaW50ZXJwKDAuMSwwLDEwKSAgICAgLy8gcmV0dXJucyAxXG4gKi9cbmV4cG9ydHMuaW50ZXJwID0gZnVuY3Rpb24obG9jLG1pbixtYXgpIHtcbiAgcmV0dXJuIGxvYyAqIChtYXggLSBtaW4pICsgbWluO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gYSByYW5kb20gY2hvaWNlIGZyb20gYSBsaXN0IG9mIGFyZ3VtZW50c1xuICogQHJldHVybiB7dmFyaW91c30gT25lIHJhbmRvbSBhcmd1bWVudFxuICogQGV4YW1wbGVcbiAqIE5leHVzLnBpY2soMSwyLDMsNCkgICAvLyByZXR1cm5zIDEsIDIsIDMsIG9yIDRcbiAqIE5leHVzLnBpY2soZnVuY3Rpb24xLGZ1bmN0aW9uMikgICAvLyByZXR1cm5zIGVpdGhlciBmdW5jdGlvbjEgb3IgZnVuY3Rpb24yXG4gKi9cbmV4cG9ydHMucGljayA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gYXJndW1lbnRzW35+KE1hdGgucmFuZG9tKCkqYXJndW1lbnRzLmxlbmd0aCldO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIGFuIG9jdGF2ZSBtdWx0aXBsaWVyIGZvciBmcmVxdWVuY3kgdmFsdWVzXG4gKiBAcGFyYW0gIHtudW1iZXJ9IG51bSBSZWxhdGl2ZSBvY3RhdmUgbnVtYmVyIChlLmcuIC0xIGZvciBvbmUgb2N0YXZlIGRvd24sIDEgZm9yIG9uZSBvY3RhdmUgdXApXG4gKiBAcmV0dXJuIHtudW1iZXJ9ICAgICBPY3RhdmUgbXVsdGlwbGllclxuICogQGV4YW1wbGVcbiAqIE5leHVzLm9jdGF2ZSgtMSkgIC8vIHJldHVybnMgMC41XG4gKiBOZXh1cy5vY3RhdmUoMCkgICAvLyByZXR1cm5zIDFcbiAqIE5leHVzLm9jdGF2ZSgxKSAgIC8vIHJldHVybnMgMlxuICogTmV4dXMub2N0YXZlKDIpICAgLy8gcmV0dXJucyA0XG4gKi9cbmV4cG9ydHMub2N0YXZlID0gZnVuY3Rpb24obnVtKSB7XG4gIHJldHVybiBNYXRoLnBvdygyLG51bSk7XG59O1xuXG4vKipcbiAqIFJhbmRvbSBpbnRlZ2VyIGdlbmVyYXRvci4gSWYgbm8gc2Vjb25kIGFyZ3VtZW50IGlzIGdpdmVuLCB3aWxsIHJldHVybiByYW5kb20gaW50ZWdlciBmcm9tIDAgdG8gYm91bmQxLlxuICogQHBhcmFtICB7bnVtYmVyfSBib3VuZDEgTWluaW11bSByYW5kb20gdmFsdWVcbiAqIEBwYXJhbSAge251bWJlcn0gYm91bmQyIE1heGltdW0gcmFuZG9tIHZhbHVlXG4gKiBAcmV0dXJuIHtudW1iZXJ9ICAgICAgICBSYW5kb20gaW50ZWdlciBiZXR3ZWVuIGxvd2VyIGFuZCB1cHBlciBib3VuZGFyeVxuICogQGV4YW1wbGVcbiAqIE5leHVzLnJpKDEwKSAgICAvLyByZXR1cm5zIHJhbmRvbSBpbnQgZnJvbSAwIHRvIDEwXG4gKiBOZXh1cy5yaSgyMCwyMDAwKSAvLyByZXR1cm5zIHJhbmRvbSBpbnQgZnJvbSAyMCB0byAyMDAwXG4gKi9cbmV4cG9ydHMucmkgPSBmdW5jdGlvbihib3VuZDEsYm91bmQyKSB7XG4gIGlmICghYm91bmQyKSB7XG4gICAgYm91bmQyID0gYm91bmQxO1xuICAgIGJvdW5kMSA9IDA7XG4gIH1cbiAgdmFyIGxvdyA9IE1hdGgubWluKGJvdW5kMSxib3VuZDIpO1xuICB2YXIgaGlnaCA9IE1hdGgubWF4KGJvdW5kMSxib3VuZDIpO1xuICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKihoaWdoLWxvdykrbG93KTtcbn07XG5cbi8qKlxuICogUmFuZG9tIGZsb2F0IG51bWJlciBnZW5lcmF0b3IuIElmIG5vIHNlY29uZCBhcmd1bWVudCBpcyBnaXZlbiwgd2lsbCByZXR1cm4gcmFuZG9tIGZsb2F0IGZyb20gMCB0byBib3VuZDEuXG4gKiBAcGFyYW0gIHtudW1iZXJ9IGJvdW5kMSBNaW5pbXVtIHJhbmRvbSB2YWx1ZVxuICogQHBhcmFtICB7bnVtYmVyfSBib3VuZDIgTWF4aW11bSByYW5kb20gdmFsdWVcbiAqIEByZXR1cm4ge251bWJlcn0gICAgICAgIFJhbmRvbSBmbG9hdCBiZXR3ZWVuIGxvd2VyIGFuZCB1cHBlciBib3VuZGFyeVxuICogQGV4YW1wbGVcbiAqIE5leHVzLnJmKDEpICAgIC8vIHJldHVybnMgcmFuZG9tIGZsb2F0IGZyb20gMCB0byAxXG4gKiBOZXh1cy5yZigxLDIpIC8vIHJldHVybnMgcmFuZG9tIGZsb2F0IGZyb20gMSB0byAyXG4gKi9cbmV4cG9ydHMucmYgPSBmdW5jdGlvbihib3VuZDEsYm91bmQyKSB7XG4gIGlmICghYm91bmQyKSB7XG4gICAgYm91bmQyID0gYm91bmQxO1xuICAgIGJvdW5kMSA9IDA7XG4gIH1cbiAgdmFyIGxvdyA9IE1hdGgubWluKGJvdW5kMSxib3VuZDIpO1xuICB2YXIgaGlnaCA9IE1hdGgubWF4KGJvdW5kMSxib3VuZDIpO1xuICByZXR1cm4gTWF0aC5yYW5kb20oKSooaGlnaC1sb3cpK2xvdztcbn07XG5cblxuZXhwb3J0cy5jeWNsZSA9IGZ1bmN0aW9uKGlucHV0LG1pbixtYXgpIHtcbiAgaW5wdXQrKztcbiAgaWYgKGlucHV0ID49IG1heCkge1xuICAgIGlucHV0ID0gbWluO1xuICB9XG4gIHJldHVybiBpbnB1dDtcbn07XG5cbi8qKlxuICogQXZlcmFnZSBhbiBhcnJheSBvZiBudW1iZXJzXG4gKiBAcGFyYW0gIHtBcnJheX0gZGF0YSBBcnJheSBvZiBudW1iZXJzIHRvIGF2ZXJhZ2VcbiAqIEByZXR1cm4ge251bWJlcn0gICAgICBBdmVyYWdlIG9mIHRoZSBpbnB1dCBkYXRhXG4gKiBAZXhhbXBsZVxuICogTmV4dXMuYXZlcmFnZShbMCwyLDQsNiw4LDEwXSkgICAvLyByZXR1cm5zIDVcbiAqL1xuZXhwb3J0cy5hdmVyYWdlID0gZnVuY3Rpb24oZGF0YSkge1xuICBsZXQgdG90YWwgPSAwO1xuICBmb3IgKHZhciBpPTA7aTxkYXRhLmxlbmd0aDtpKyspIHtcbiAgICB0b3RhbCArPSBkYXRhW2ldO1xuICB9XG4gIHJldHVybiB0b3RhbCAvIGRhdGEubGVuZ3RoO1xufTtcblxuLyoqXG4gKiBHZXQgdGhlIGRpc3RhbmNlIGZyb20gb25lICh4LHkpIHBvaW50IHRvIGFub3RoZXIgKHgseSkgcG9pbnRcbiAqIEBwYXJhbSAge251bWJlcn0geDEgeCBvZiBmaXJzdCBwb2ludFxuICogQHBhcmFtICB7bnVtYmVyfSB5MSB5IG9mIGZpcnN0IHBvaW50XG4gKiBAcGFyYW0gIHtudW1iZXJ9IHgyIHggb2Ygc2Vjb25kIHBvaW50XG4gKiBAcGFyYW0gIHtudW1iZXJ9IHkyIHkgb2Ygc2Vjb25kIHBvaW55XG4gKiBAcmV0dXJuIHtudW1iZXJ9ICAgIERpc3RhbmNlXG4gKiBAZXhhbXBsZVxuICogTmV4dXMuZGlzdGFuY2UoMCwwLDMsNCkgICAvLyByZXR1cm5zIDVcbiAqL1xuZXhwb3J0cy5kaXN0YW5jZSA9IGZ1bmN0aW9uKHgxLHkxLHgyLHkyKSB7XG4gIGxldCBhID0geDEgLSB4MjtcbiAgbGV0IGIgPSB5MSAtIHkyO1xuICByZXR1cm4gTWF0aC5zcXJ0KCBhKmEgKyBiKmIgKTtcbn07XG5cbmV4cG9ydHMuZ2FpblRvREIgPSBmdW5jdGlvbihnYWluKSB7XG4gIHJldHVybiAyMCAqIE1hdGgubG9nMTAoZ2Fpbik7XG59O1xuXG4vKipcbiAqIEZsaXAgYSBjb2luLCByZXR1cm5pbmcgZWl0aGVyIDAgb3IgMSBhY2NvcmRpbmcgdG8gYSBwcm9iYWJpbGl0eVxuICogQHBhcmFtICB7bnVtYmVyfSBbb2Rkcz0wLjVdIExpa2VsaWhvb2Qgb2YgcmV0dXJuaW5nIDFcbiAqIEByZXR1cm4ge251bWJlcn0gICAgICAgICAgICAxIG9yIDBcbiAqIEBleGFtcGxlXG4gKiBOZXh1cy5jb2luKDAuMSkgICAvLyByZXR1cm5zIDEgKDEwJSBvZiB0aGUgdGltZSkgb3IgMCAoOTAlIG9mIHRoZSB0aW1lKVxuICovXG5leHBvcnRzLmNvaW4gPSBmdW5jdGlvbihvZGRzPTAuNSkge1xuICBpZiAoZXhwb3J0cy5yZigwLDEpIDwgb2Rkcykge1xuICAgIHJldHVybiAxO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAwO1xuICB9XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9qc2hpbnQtbG9hZGVyIS4vbGliL3V0aWwvbWF0aC5qcyIsIid1c2Ugc3RyaWN0JztcblxubGV0IHN2ZyA9IHJlcXVpcmUoJy4uL3V0aWwvc3ZnJyk7XG5sZXQgZG9tID0gcmVxdWlyZSgnLi4vdXRpbC9kb20nKTtcbmxldCB1dGlsID0gcmVxdWlyZSgnLi4vdXRpbC91dGlsJyk7XG5sZXQgdG91Y2ggPSByZXF1aXJlKCcuLi91dGlsL3RvdWNoJyk7XG5jb25zdCBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKCdldmVudHMnKTtcblxuaW1wb3J0IHsgY29sb3JzIH0gZnJvbSAnLi4vbWFpbic7XG5cbi8qKlxuSW50ZXJmYWNlXG4qL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW50ZXJmYWNlIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcblxuICBjb25zdHJ1Y3RvcihhcmdzLG9wdGlvbnMsZGVmYXVsdHMpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMudHlwZSA9IHRoaXMuY29uc3RydWN0b3IubmFtZTtcbiAgICB0aGlzLnNldHRpbmdzID0gdGhpcy5wYXJzZVNldHRpbmdzKGFyZ3Msb3B0aW9ucyxkZWZhdWx0cyk7XG4gICAgdGhpcy5tb3VzZSA9IHt9O1xuICAgIHRoaXMud2FpdCA9IGZhbHNlO1xuICAgIHRoaXMuY29sb3JzID0ge307XG4gICAgbGV0IGRlZmF1bHRDb2xvcnMgPSBjb2xvcnMoKTsgLy8ganNoaW50IGlnbm9yZTpsaW5lXG4gICAgdGhpcy5jb2xvcnMuYWNjZW50ID0gZGVmYXVsdENvbG9ycy5hY2NlbnQ7XG4gICAgdGhpcy5jb2xvcnMuZmlsbCA9IGRlZmF1bHRDb2xvcnMuZmlsbDtcbiAgICB0aGlzLmNvbG9ycy5saWdodCA9IGRlZmF1bHRDb2xvcnMubGlnaHQ7XG4gICAgdGhpcy5jb2xvcnMuZGFyayA9IGRlZmF1bHRDb2xvcnMuZGFyaztcbiAgICB0aGlzLmNvbG9ycy5tZWRpdW1MaWdodCA9IGRlZmF1bHRDb2xvcnMubWVkaXVtTGlnaHQ7XG4gICAgdGhpcy5jb2xvcnMubWVkaXVtRGFyayA9IGRlZmF1bHRDb2xvcnMubWVkaXVtRGFyaztcbiAgfVxuXG4gIHBhcnNlU2V0dGluZ3MoYXJncyxvcHRpb25zLGRlZmF1bHRzKSB7XG5cbiAgICBvcHRpb25zLnVuc2hpZnQoJ3RhcmdldCcpO1xuICAgIGRlZmF1bHRzLmRlZmF1bHRTaXplID0gZGVmYXVsdHMuc2l6ZS5zcGxpY2UoMCwyKTtcbiAgICBkZWZhdWx0cy5zaXplID0gZmFsc2U7XG5cbiAgICBsZXQgc2V0dGluZ3MgPSB7XG4gICAgICAndGFyZ2V0JzogZG9jdW1lbnQuYm9keSxcbiAgICAgICdjb2xvcnMnOiB7fSwgLy8gc2hvdWxkIGluaGVyaXQgZnJvbSBhIGNvbG9ycyBtb2R1bGUsXG4gICAgICAnc25hcFdpdGhQYXJlbnQnOiB0cnVlLFxuICAgICAgJ2V2ZW50JzogZnVuY3Rpb24oKSB7fSxcbiAgICAgICdjb21wb25lbnQnOiBmYWxzZVxuICAgIH07XG5cbiAgICBmb3IgKGxldCBrZXkgaW4gZGVmYXVsdHMpIHtcbiAgICAgIHNldHRpbmdzW2tleV0gPSBkZWZhdWx0c1trZXldO1xuICAgIH1cblxuICAgIGZvciAobGV0IGk9MDsgaTxhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAvLyBncmFicyB0aGUgbmV4dCBhcmd1bWVudFxuICAgICAgbGV0IHNldHRpbmcgPSBhcmdzW2ldO1xuICAgICAgLy8gaWYgaXQncyBhbiBvYmplY3QsIGl0IG11c3QgYmUgdGhlIHNldHRpbmdzIG9iamVjdFxuICAgICAgaWYgKCB1dGlsLmlzT2JqZWN0KHNldHRpbmcpICkge1xuICAgICAgICBmb3IgKCBsZXQga2V5IGluIHNldHRpbmcgKSB7XG4gICAgICAgICAgc2V0dGluZ3Nba2V5XSA9IHNldHRpbmdba2V5XTtcbiAgICAgICAgfVxuICAgICAgLy8gaWYgaXQncyBhIGZ1bmN0aW9uLCBpdCBtdXN0IGJlIHRoZSBldmVudCBzZXR0aW5nXG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBzZXR0aW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHNldHRpbmdzLmV2ZW50ID0gc2V0dGluZztcbiAgICAgIC8vIG90aGVyd2lzZSwgY29uc2lkZXIgaXQgb25lIG9mIHRoZSB3aWRnZXQncyBjdXN0b20gb3B0aW9uc1xuICAgICAgfSBlbHNlIGlmIChvcHRpb25zLmxlbmd0aD49MSkge1xuICAgICAgICAvLyBncmFiIHRoZSBmaXJzdCBvcHRpb24gLS0gaS5lLiAndGFyZ2V0J1xuICAgICAgICBsZXQga2V5ID0gb3B0aW9ucy5zcGxpY2UoMCwxKVswXTtcbiAgICAgICAgc2V0dGluZ3Nba2V5XSA9IHNldHRpbmc7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyogIGhhbmRsZSBjb21tb24gc2V0dGluZ3MgICovXG5cbiAgICAvLyB0YXJnZXRcbiAgICB0aGlzLnBhcmVudCA9IGRvbS5wYXJzZUVsZW1lbnQoc2V0dGluZ3MudGFyZ2V0KTtcblxuICAgIC8vIG5leHVzLXVpIGF0dHJpYnV0ZVxuICAgIGlmICh0aGlzLnBhcmVudCAmJiB0aGlzLnBhcmVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ICYmICFzZXR0aW5ncy5jb21wb25lbnQpIHtcbiAgICAgIGlmICghdGhpcy5wYXJlbnQuaGFzQXR0cmlidXRlKCduZXh1cy11aScpKSB7XG4gICAgICAgIHRoaXMucGFyZW50LnNldEF0dHJpYnV0ZSgnbmV4dXMtdWknLCcnKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBzaXplXG5cbiAgICBpZiAoc2V0dGluZ3Muc2l6ZSAmJiBBcnJheS5pc0FycmF5KHNldHRpbmdzLnNpemUpICYmIHNldHRpbmdzLnNuYXBXaXRoUGFyZW50KSB7XG4gICAgICB0aGlzLndpZHRoID0gc2V0dGluZ3Muc2l6ZVswXTtcbiAgICAgIHRoaXMuaGVpZ2h0ID0gc2V0dGluZ3Muc2l6ZVsxXTtcbiAgICAgIHRoaXMucGFyZW50LnN0eWxlLndpZHRoID0gdGhpcy53aWR0aCArICdweCc7XG4gICAgICB0aGlzLnBhcmVudC5zdHlsZS5oZWlnaHQgPSB0aGlzLmhlaWdodCArICdweCc7XG4gICAgfSBlbHNlIGlmIChzZXR0aW5ncy5zbmFwV2l0aFBhcmVudCAmJiAhc2V0dGluZ3MuY29tcG9uZW50KSB7XG5cbiAgICAgIHRoaXMud2lkdGggPSBwYXJzZUZsb2F0KHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMucGFyZW50LCBudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKCd3aWR0aCcpLnJlcGxhY2UoJ3B4JywnJykpO1xuICAgICAgdGhpcy5oZWlnaHQgPSBwYXJzZUZsb2F0KHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMucGFyZW50LCBudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKCdoZWlnaHQnKS5yZXBsYWNlKCdweCcsJycpKTtcblxuICAgICAgaWYgKHRoaXMud2lkdGg9PTUwMDApIHtcbiAgICAgICAgdGhpcy53aWR0aCA9IHNldHRpbmdzLmRlZmF1bHRTaXplWzBdO1xuICAgICAgICB0aGlzLnBhcmVudC5zdHlsZS53aWR0aCA9IHRoaXMucGFyZW50LndpZHRoID0gdGhpcy53aWR0aCArICdweCc7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5oZWlnaHQ9PTUwMDApIHtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBzZXR0aW5ncy5kZWZhdWx0U2l6ZVsxXTtcbiAgICAgICAgdGhpcy5wYXJlbnQuc3R5bGUuaGVpZ2h0ID0gdGhpcy5wYXJlbnQuaGVpZ2h0ID0gdGhpcy5oZWlnaHQgKyAncHgnO1xuICAgICAgfVxuXG4gICAgfSBlbHNlIHtcbiAgICAgIHNldHRpbmdzLnNpemUgPSBzZXR0aW5ncy5kZWZhdWx0U2l6ZTtcbiAgICAgIHRoaXMud2lkdGggPSBzZXR0aW5ncy5zaXplWzBdO1xuICAgICAgdGhpcy5oZWlnaHQgPSBzZXR0aW5ncy5zaXplWzFdO1xuICAgIH1cblxuICAgIC8vIGV2ZW50XG4gICAgaWYgKHNldHRpbmdzLmV2ZW50KSB7XG4gICAgICB0aGlzLmV2ZW50ID0gdGhpcy5vbignY2hhbmdlJywgc2V0dGluZ3MuZXZlbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmV2ZW50ID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNldHRpbmdzO1xuXG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMuYnVpbGRGcmFtZSgpO1xuICAgIHRoaXMuYnVpbGRJbnRlcmZhY2UoKTtcbiAgICB0aGlzLnNpemVJbnRlcmZhY2UoKTtcbiAgICB0aGlzLmF0dGFjaExpc3RlbmVycygpO1xuICAgIHRoaXMuY29sb3JJbnRlcmZhY2UoKTtcbiAgICB0aGlzLmZpbmFsVG91Y2hlcygpO1xuICB9XG5cbiAgYnVpbGRGcmFtZSgpIHtcbiAgICB0aGlzLmVsZW1lbnQgPSBzdmcuY3JlYXRlKCdzdmcnKTtcbiAgICB0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKCd3aWR0aCcsdGhpcy53aWR0aCk7XG4gICAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZSgnaGVpZ2h0Jyx0aGlzLmhlaWdodCk7XG4gICAgdGhpcy5wYXJlbnQuYXBwZW5kQ2hpbGQodGhpcy5lbGVtZW50KTtcbiAgfVxuXG4gIGJ1aWxkSW50ZXJmYWNlKCkge31cbiAgc2l6ZUludGVyZmFjZSgpIHt9XG4gIGNvbG9ySW50ZXJmYWNlKCkge31cblxuICBhdHRhY2hMaXN0ZW5lcnMoKSB7XG5cbiAgICB0aGlzLmludGVyYWN0aW9uVGFyZ2V0ID0gdGhpcy5pbnRlcmFjdGlvblRhcmdldCB8fCB0aGlzLmVsZW1lbnQ7XG5cbiAgICAvLyBTZXR1cCBpbnRlcmFjdGlvblxuICAgIGlmICh0b3VjaC5leGlzdHMpIHtcbiAgICAgIHRoaXMuaW50ZXJhY3Rpb25UYXJnZXQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIGV2dCA9PiB0aGlzLnByZVRvdWNoKGV2dCkpO1xuICAgICAgdGhpcy5pbnRlcmFjdGlvblRhcmdldC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBldnQgPT4gdGhpcy5wcmVUb3VjaE1vdmUoZXZ0KSk7XG4gICAgICB0aGlzLmludGVyYWN0aW9uVGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgZXZ0ID0+IHRoaXMucHJlVG91Y2hSZWxlYXNlKGV2dCkpO1xuICAgIH1cbiAgICB0aGlzLmJvdW5kUHJlTW92ZSA9IGV2dCA9PiB0aGlzLnByZU1vdmUoZXZ0KTtcbiAgICB0aGlzLmJvdW5kUHJlUmVsZWFzZSA9IGV2dCA9PiB0aGlzLnByZVJlbGVhc2UoZXZ0KTtcbiAgICB0aGlzLmludGVyYWN0aW9uVGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGV2dCA9PiB0aGlzLnByZUNsaWNrKGV2dCkpO1xuICB9XG5cbiAgZmluYWxUb3VjaGVzKCkge1xuICAgIHRoaXMuZWxlbWVudC5zdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XG4gIH1cblxuICBwcmVDbGljayhlKSB7XG4gICAgLy8gMTAwMDAgZ2V0Q29tcHV0ZWRTdHlsZSBjYWxscyB0YWtlcyAxMDAgbXMuXG4gICAgLy8gLjouIG9uZSB0YWtlcyBhYm91dCAuMDFtc1xuICAgIGlmICh0aGlzLmVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgdGhpcy53aWR0aCA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMuZWxlbWVudCwgbnVsbCkuZ2V0UHJvcGVydHlWYWx1ZSgnd2lkdGgnKS5yZXBsYWNlKCdweCcsJycpO1xuICAgIH1cbiAgICAvLyAxMDAwMCBnZXRDb21wdXRlZFN0eWxlIGNhbGxzIHRha2VzIDQwIG1zLlxuICAgIC8vIC46LiBvbmUgdGFrZXMgYWJvdXQgLjAwNG1zXG4gICAgdGhpcy5vZmZzZXQgPSBkb20uZmluZFBvc2l0aW9uKHRoaXMuZWxlbWVudCk7XG4gICAgdGhpcy5tb3VzZSA9IGRvbS5sb2NhdGVNb3VzZShlLHRoaXMub2Zmc2V0KTtcbiAgICB0aGlzLmNsaWNrZWQgPSB0cnVlO1xuICAgIHRoaXMuY2xpY2soKTtcbiAgICB0aGlzLm1vdmVFdmVudCA9IGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuYm91bmRQcmVNb3ZlKTtcbiAgICB0aGlzLnJlbGVhc2VFdmVudCA9IGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmJvdW5kUHJlUmVsZWFzZSk7XG4gICAgdGhpcy5lbWl0KCdjbGljaycpO1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICB9XG5cbiAgcHJlTW92ZShlKSB7XG4gICAgaWYgKCF0aGlzLndhaXQpIHtcbiAgICAgIHRoaXMubW91c2UgPSBkb20ubG9jYXRlTW91c2UoZSx0aGlzLm9mZnNldCk7XG4gICAgICB0aGlzLm1vdmUoKTtcbiAgICAgIHRoaXMud2FpdCA9IHRydWU7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHsgdGhpcy53YWl0ID0gZmFsc2U7IH0sMjUpO1xuICAgIH1cbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfVxuXG4gIHByZVJlbGVhc2UoZSkge1xuICAgIHRoaXMubW91c2UgPSBkb20ubG9jYXRlTW91c2UoZSx0aGlzLm9mZnNldCk7XG4gICAgdGhpcy5jbGlja2VkID0gZmFsc2U7XG4gICAgdGhpcy5yZWxlYXNlKCk7XG4gICAgdGhpcy5lbWl0KCdyZWxlYXNlJyk7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJyx0aGlzLmJvdW5kUHJlTW92ZSk7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsdGhpcy5ib3VuZFByZVJlbGVhc2UpO1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICB9XG5cbiAgY2xpY2soKSB7XG5cbiAgfVxuXG4gIG1vdmUoKSB7XG5cbiAgfVxuXG4gIHJlbGVhc2UoKSB7XG5cbiAgfVxuXG5cbiAgLyogdG91Y2ggKi9cblxuICBwcmVUb3VjaChlKSB7XG4gICAgaWYgKHRoaXMuZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICB0aGlzLndpZHRoID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy5lbGVtZW50LCBudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKCd3aWR0aCcpLnJlcGxhY2UoJ3B4JywnJyk7XG4gICAgfVxuICAgIHRoaXMub2Zmc2V0ID0gZG9tLmZpbmRQb3NpdGlvbih0aGlzLmVsZW1lbnQpO1xuICAgIHRoaXMubW91c2UgPSBkb20ubG9jYXRlVG91Y2goZSx0aGlzLm9mZnNldCk7XG4gICAgdGhpcy5jbGlja2VkID0gdHJ1ZTtcbiAgICB0aGlzLnRvdWNoKGUpO1xuICAgIHRoaXMuZW1pdCgnY2xpY2snKTtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfVxuXG4gIHByZVRvdWNoTW92ZShlKSB7XG4gICAgaWYgKHRoaXMuY2xpY2tlZCkge1xuICAgICAgdGhpcy5tb3VzZSA9IGRvbS5sb2NhdGVUb3VjaChlLHRoaXMub2Zmc2V0KTtcbiAgICAgIHRoaXMudG91Y2hNb3ZlKCk7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cbiAgfVxuXG4gIHByZVRvdWNoUmVsZWFzZShlKSB7XG4gICAgdGhpcy5tb3VzZSA9IGRvbS5sb2NhdGVUb3VjaChlLCB0aGlzLm9mZnNldCk7XG4gICAgdGhpcy5jbGlja2VkID0gZmFsc2U7XG4gICAgdGhpcy50b3VjaFJlbGVhc2UoKTtcbiAgICB0aGlzLmVtaXQoJ3JlbGVhc2UnKTtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfVxuXG4gIHRvdWNoKCkge1xuICAgIHRoaXMuY2xpY2soKTtcbiAgfVxuXG4gIHRvdWNoTW92ZSgpIHtcbiAgICB0aGlzLm1vdmUoKTtcbiAgfVxuXG4gIHRvdWNoUmVsZWFzZSgpIHtcbiAgICB0aGlzLnJlbGVhc2UoKTtcbiAgfVxuXG4gIC8qKlxuICAqIFJlc2l6ZSB0aGUgaW50ZXJmYWNlXG4gICogQHBhcmFtIHdpZHRoIHtudW1iZXJ9IE5ldyB3aWR0aCBpbiBwaXhlbHNcbiAgKiBAcGFyYW0gaGVpZ2h0IHtudW1iZXJ9IE5ldyBoZWlnaHQgaW4gcGl4ZWxzXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGJ1dHRvbi5yZXNpemUoMTAwLDEwMCk7XG4gICovXG4gIHJlc2l6ZSh3aWR0aCxoZWlnaHQpIHtcbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgdGhpcy5wYXJlbnQuc3R5bGUud2lkdGggPSB0aGlzLndpZHRoKydweCc7XG4gICAgdGhpcy5wYXJlbnQuc3R5bGUuaGVpZ2h0ID0gdGhpcy5oZWlnaHQrJ3B4JztcbiAgICB0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKCd3aWR0aCcsdGhpcy53aWR0aCk7XG4gICAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZSgnaGVpZ2h0Jyx0aGlzLmhlaWdodCk7XG4gICAgdGhpcy5zaXplSW50ZXJmYWNlKCk7XG4gIH1cblxuICBlbXB0eSgpIHtcbiAgICB3aGlsZSAodGhpcy5lbGVtZW50Lmxhc3RDaGlsZCkge1xuICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZUNoaWxkKHRoaXMuZWxlbWVudC5sYXN0Q2hpbGQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAqIFJlbW92ZSB0aGUgaW50ZXJmYWNlIGZyb20gdGhlIHBhZ2UgYW5kIGNhbmNlbCBpdHMgZXZlbnQgbGlzdGVuZXIocykuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGJ1dHRvbi5kZXN0cm95KCk7XG4gICovXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5lbXB0eSgpO1xuICAgIHRoaXMucGFyZW50LnJlbW92ZUNoaWxkKHRoaXMuZWxlbWVudCk7XG4gICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcbiAgICBpZiAodGhpcy5pbnN0cnVtZW50KSB7XG4gICAgICBkZWxldGUgdGhpcy5pbnN0cnVtZW50W3RoaXMuaWRdO1xuICAgIH1cbiAgICB0aGlzLmN1c3RvbURlc3Ryb3koKTtcbiAgfVxuXG4gIGN1c3RvbURlc3Ryb3koKSB7XG5cbiAgfVxuXG4gIGNvbG9yaXplKHR5cGUsY29sb3IpIHtcbiAgICB0aGlzLmNvbG9yc1t0eXBlXSA9IGNvbG9yO1xuICAgIHRoaXMuY29sb3JJbnRlcmZhY2UoKTtcbiAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2pzaGludC1sb2FkZXIhLi9saWIvY29yZS9pbnRlcmZhY2UuanMiLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuZmluZFBvc2l0aW9uID0gKGVsKSA9PiB7XG4gIGxldCB2aWV3cG9ydE9mZnNldCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICBsZXQgdG9wID0gdmlld3BvcnRPZmZzZXQudG9wICsgd2luZG93LnNjcm9sbFk7XG4gIGxldCBsZWZ0ID0gdmlld3BvcnRPZmZzZXQubGVmdCArIHdpbmRvdy5zY3JvbGxYO1xuICByZXR1cm4ge3RvcCxsZWZ0fTtcbn07XG5cbmV4cG9ydHMucGFyc2VFbGVtZW50ID0gKHBhcmVudCkgPT4ge1xuICBpZiAodHlwZW9mIHBhcmVudCA9PT0gJ3N0cmluZycpIHtcbiAgICBwYXJlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwYXJlbnQucmVwbGFjZSgnIycsJycpKTtcbiAgfVxuXG4gIGlmIChwYXJlbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCB8fCBwYXJlbnQgaW5zdGFuY2VvZiBTVkdFbGVtZW50KXtcbiAgICByZXR1cm4gcGFyZW50O1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAnTm8gdmFsaWQgcGFyZW50IGFyZ3VtZW50JztcbiAgfVxufTtcblxuZXhwb3J0cy5sb2NhdGVNb3VzZSA9IChlLG9mZnNldCkgPT4ge1xuICByZXR1cm4ge1xuICAgIHg6IGUucGFnZVggLSBvZmZzZXQubGVmdCxcbiAgICB5OiBlLnBhZ2VZIC0gb2Zmc2V0LnRvcFxuICB9O1xufTtcblxuZXhwb3J0cy5sb2NhdGVUb3VjaCA9IChlLG9mZnNldCkgPT4ge1xuICByZXR1cm4ge1xuICAgIHg6IGUudGFyZ2V0VG91Y2hlcy5sZW5ndGggPyBlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVggLSBvZmZzZXQubGVmdCA6IGZhbHNlLFxuICAgIHk6IGUudGFyZ2V0VG91Y2hlcy5sZW5ndGggPyBlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVkgLSBvZmZzZXQudG9wIDogZmFsc2VcbiAgfTtcbn07XG5cbmV4cG9ydHMuU21hcnRDYW52YXMgPSBmdW5jdGlvbihwYXJlbnQpIHtcblxuICB0aGlzLmVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgdGhpcy5jb250ZXh0ID0gdGhpcy5lbGVtZW50LmdldENvbnRleHQoJzJkJyk7XG4gIHBhcmVudC5hcHBlbmRDaGlsZCh0aGlzLmVsZW1lbnQpO1xuXG4gIHRoaXMucmVzaXplID0gKHcsaCkgPT4ge1xuICAgIHRoaXMuZWxlbWVudC53aWR0aCA9IHcqMjtcbiAgICB0aGlzLmVsZW1lbnQuaGVpZ2h0ID0gaCoyO1xuICAgIHRoaXMuZWxlbWVudC5zdHlsZS53aWR0aCA9IHcrJ3B4JztcbiAgICB0aGlzLmVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gaCsncHgnO1xuICB9O1xuXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9qc2hpbnQtbG9hZGVyIS4vbGliL3V0aWwvZG9tLmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLmlzT2JqZWN0ID0gKG9iaikgPT4ge1xuICBpZiAodHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgIUFycmF5LmlzQXJyYXkob2JqKSAmJiBvYmogIT09IG51bGwgJiYgb2JqIGluc3RhbmNlb2YgU1ZHRWxlbWVudCA9PT0gZmFsc2UgJiYgb2JqIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgPT09IGZhbHNlICkge1xuICAgIHJldHVybiB0cnVlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcblxuLy8gUmVzdHJpY3RzIGlucHV0IGZvciB0aGUgZ2l2ZW4gdGV4dGJveCB0byB0aGUgZ2l2ZW4gaW5wdXRGaWx0ZXIgZnVuY3Rpb25cbi8vIGNmIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS80NjkzNjJcbmV4cG9ydHMuc2V0SW5wdXRGaWx0ZXIgPSAodGV4dGJveCwgaW5wdXRGaWx0ZXIpID0+IHtcbiAgW1wiaW5wdXRcIiwgXCJrZXlkb3duXCIsIFwia2V5dXBcIiwgXCJtb3VzZWRvd25cIiwgXCJtb3VzZXVwXCIsIFwic2VsZWN0XCIsIFwiY29udGV4dG1lbnVcIiwgXCJkcm9wXCJdLmZvckVhY2goZnVuY3Rpb24oZXZlbnQpIHtcbiAgICB0ZXh0Ym94LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKGlucHV0RmlsdGVyKHRoaXMudmFsdWUpKSB7XG4gICAgICAgIHRoaXMub2xkVmFsdWUgPSB0aGlzLnZhbHVlO1xuICAgICAgICB0aGlzLm9sZFNlbGVjdGlvblN0YXJ0ID0gdGhpcy5zZWxlY3Rpb25TdGFydDtcbiAgICAgICAgdGhpcy5vbGRTZWxlY3Rpb25FbmQgPSB0aGlzLnNlbGVjdGlvbkVuZDtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5oYXNPd25Qcm9wZXJ0eShcIm9sZFZhbHVlXCIpKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLm9sZFZhbHVlO1xuICAgICAgICB0aGlzLnNldFNlbGVjdGlvblJhbmdlKHRoaXMub2xkU2VsZWN0aW9uU3RhcnQsIHRoaXMub2xkU2VsZWN0aW9uRW5kKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSBcIlwiO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn07XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vanNoaW50LWxvYWRlciEuL2xpYi91dGlsL3V0aWwuanMiLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuZXhpc3RzID0gKCdvbnRvdWNoc3RhcnQnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2pzaGludC1sb2FkZXIhLi9saWIvdXRpbC90b3VjaC5qcyIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG5mdW5jdGlvbiBFdmVudEVtaXR0ZXIoKSB7XG4gIHRoaXMuX2V2ZW50cyA9IHRoaXMuX2V2ZW50cyB8fCB7fTtcbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gdGhpcy5fbWF4TGlzdGVuZXJzIHx8IHVuZGVmaW5lZDtcbn1cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRFbWl0dGVyO1xuXG4vLyBCYWNrd2FyZHMtY29tcGF0IHdpdGggbm9kZSAwLjEwLnhcbkV2ZW50RW1pdHRlci5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX21heExpc3RlbmVycyA9IHVuZGVmaW5lZDtcblxuLy8gQnkgZGVmYXVsdCBFdmVudEVtaXR0ZXJzIHdpbGwgcHJpbnQgYSB3YXJuaW5nIGlmIG1vcmUgdGhhbiAxMCBsaXN0ZW5lcnMgYXJlXG4vLyBhZGRlZCB0byBpdC4gVGhpcyBpcyBhIHVzZWZ1bCBkZWZhdWx0IHdoaWNoIGhlbHBzIGZpbmRpbmcgbWVtb3J5IGxlYWtzLlxuRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnMgPSAxMDtcblxuLy8gT2J2aW91c2x5IG5vdCBhbGwgRW1pdHRlcnMgc2hvdWxkIGJlIGxpbWl0ZWQgdG8gMTAuIFRoaXMgZnVuY3Rpb24gYWxsb3dzXG4vLyB0aGF0IHRvIGJlIGluY3JlYXNlZC4gU2V0IHRvIHplcm8gZm9yIHVubGltaXRlZC5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuc2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24obikge1xuICBpZiAoIWlzTnVtYmVyKG4pIHx8IG4gPCAwIHx8IGlzTmFOKG4pKVxuICAgIHRocm93IFR5cGVFcnJvcignbiBtdXN0IGJlIGEgcG9zaXRpdmUgbnVtYmVyJyk7XG4gIHRoaXMuX21heExpc3RlbmVycyA9IG47XG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24odHlwZSkge1xuICB2YXIgZXIsIGhhbmRsZXIsIGxlbiwgYXJncywgaSwgbGlzdGVuZXJzO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuXG4gIC8vIElmIHRoZXJlIGlzIG5vICdlcnJvcicgZXZlbnQgbGlzdGVuZXIgdGhlbiB0aHJvdy5cbiAgaWYgKHR5cGUgPT09ICdlcnJvcicpIHtcbiAgICBpZiAoIXRoaXMuX2V2ZW50cy5lcnJvciB8fFxuICAgICAgICAoaXNPYmplY3QodGhpcy5fZXZlbnRzLmVycm9yKSAmJiAhdGhpcy5fZXZlbnRzLmVycm9yLmxlbmd0aCkpIHtcbiAgICAgIGVyID0gYXJndW1lbnRzWzFdO1xuICAgICAgaWYgKGVyIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgdGhyb3cgZXI7IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBBdCBsZWFzdCBnaXZlIHNvbWUga2luZCBvZiBjb250ZXh0IHRvIHRoZSB1c2VyXG4gICAgICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoJ1VuY2F1Z2h0LCB1bnNwZWNpZmllZCBcImVycm9yXCIgZXZlbnQuICgnICsgZXIgKyAnKScpO1xuICAgICAgICBlcnIuY29udGV4dCA9IGVyO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlciA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICBpZiAoaXNVbmRlZmluZWQoaGFuZGxlcikpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIGlmIChpc0Z1bmN0aW9uKGhhbmRsZXIpKSB7XG4gICAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAvLyBmYXN0IGNhc2VzXG4gICAgICBjYXNlIDE6XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzLCBhcmd1bWVudHNbMV0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMsIGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzJdKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAvLyBzbG93ZXJcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgICAgICBoYW5kbGVyLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChpc09iamVjdChoYW5kbGVyKSkge1xuICAgIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgIGxpc3RlbmVycyA9IGhhbmRsZXIuc2xpY2UoKTtcbiAgICBsZW4gPSBsaXN0ZW5lcnMubGVuZ3RoO1xuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKylcbiAgICAgIGxpc3RlbmVyc1tpXS5hcHBseSh0aGlzLCBhcmdzKTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBtO1xuXG4gIGlmICghaXNGdW5jdGlvbihsaXN0ZW5lcikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCdsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50cylcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcblxuICAvLyBUbyBhdm9pZCByZWN1cnNpb24gaW4gdGhlIGNhc2UgdGhhdCB0eXBlID09PSBcIm5ld0xpc3RlbmVyXCIhIEJlZm9yZVxuICAvLyBhZGRpbmcgaXQgdG8gdGhlIGxpc3RlbmVycywgZmlyc3QgZW1pdCBcIm5ld0xpc3RlbmVyXCIuXG4gIGlmICh0aGlzLl9ldmVudHMubmV3TGlzdGVuZXIpXG4gICAgdGhpcy5lbWl0KCduZXdMaXN0ZW5lcicsIHR5cGUsXG4gICAgICAgICAgICAgIGlzRnVuY3Rpb24obGlzdGVuZXIubGlzdGVuZXIpID9cbiAgICAgICAgICAgICAgbGlzdGVuZXIubGlzdGVuZXIgOiBsaXN0ZW5lcik7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgLy8gT3B0aW1pemUgdGhlIGNhc2Ugb2Ygb25lIGxpc3RlbmVyLiBEb24ndCBuZWVkIHRoZSBleHRyYSBhcnJheSBvYmplY3QuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdID0gbGlzdGVuZXI7XG4gIGVsc2UgaWYgKGlzT2JqZWN0KHRoaXMuX2V2ZW50c1t0eXBlXSkpXG4gICAgLy8gSWYgd2UndmUgYWxyZWFkeSBnb3QgYW4gYXJyYXksIGp1c3QgYXBwZW5kLlxuICAgIHRoaXMuX2V2ZW50c1t0eXBlXS5wdXNoKGxpc3RlbmVyKTtcbiAgZWxzZVxuICAgIC8vIEFkZGluZyB0aGUgc2Vjb25kIGVsZW1lbnQsIG5lZWQgdG8gY2hhbmdlIHRvIGFycmF5LlxuICAgIHRoaXMuX2V2ZW50c1t0eXBlXSA9IFt0aGlzLl9ldmVudHNbdHlwZV0sIGxpc3RlbmVyXTtcblxuICAvLyBDaGVjayBmb3IgbGlzdGVuZXIgbGVha1xuICBpZiAoaXNPYmplY3QodGhpcy5fZXZlbnRzW3R5cGVdKSAmJiAhdGhpcy5fZXZlbnRzW3R5cGVdLndhcm5lZCkge1xuICAgIGlmICghaXNVbmRlZmluZWQodGhpcy5fbWF4TGlzdGVuZXJzKSkge1xuICAgICAgbSA9IHRoaXMuX21heExpc3RlbmVycztcbiAgICB9IGVsc2Uge1xuICAgICAgbSA9IEV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzO1xuICAgIH1cblxuICAgIGlmIChtICYmIG0gPiAwICYmIHRoaXMuX2V2ZW50c1t0eXBlXS5sZW5ndGggPiBtKSB7XG4gICAgICB0aGlzLl9ldmVudHNbdHlwZV0ud2FybmVkID0gdHJ1ZTtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJyhub2RlKSB3YXJuaW5nOiBwb3NzaWJsZSBFdmVudEVtaXR0ZXIgbWVtb3J5ICcgK1xuICAgICAgICAgICAgICAgICAgICAnbGVhayBkZXRlY3RlZC4gJWQgbGlzdGVuZXJzIGFkZGVkLiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1VzZSBlbWl0dGVyLnNldE1heExpc3RlbmVycygpIHRvIGluY3JlYXNlIGxpbWl0LicsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXS5sZW5ndGgpO1xuICAgICAgaWYgKHR5cGVvZiBjb25zb2xlLnRyYWNlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIC8vIG5vdCBzdXBwb3J0ZWQgaW4gSUUgMTBcbiAgICAgICAgY29uc29sZS50cmFjZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gIGlmICghaXNGdW5jdGlvbihsaXN0ZW5lcikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCdsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcblxuICB2YXIgZmlyZWQgPSBmYWxzZTtcblxuICBmdW5jdGlvbiBnKCkge1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgZyk7XG5cbiAgICBpZiAoIWZpcmVkKSB7XG4gICAgICBmaXJlZCA9IHRydWU7XG4gICAgICBsaXN0ZW5lci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgfVxuXG4gIGcubGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgdGhpcy5vbih0eXBlLCBnKTtcblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8vIGVtaXRzIGEgJ3JlbW92ZUxpc3RlbmVyJyBldmVudCBpZmYgdGhlIGxpc3RlbmVyIHdhcyByZW1vdmVkXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIGxpc3QsIHBvc2l0aW9uLCBsZW5ndGgsIGk7XG5cbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzIHx8ICF0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgcmV0dXJuIHRoaXM7XG5cbiAgbGlzdCA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgbGVuZ3RoID0gbGlzdC5sZW5ndGg7XG4gIHBvc2l0aW9uID0gLTE7XG5cbiAgaWYgKGxpc3QgPT09IGxpc3RlbmVyIHx8XG4gICAgICAoaXNGdW5jdGlvbihsaXN0Lmxpc3RlbmVyKSAmJiBsaXN0Lmxpc3RlbmVyID09PSBsaXN0ZW5lcikpIHtcbiAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuICAgIGlmICh0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdGVuZXIpO1xuXG4gIH0gZWxzZSBpZiAoaXNPYmplY3QobGlzdCkpIHtcbiAgICBmb3IgKGkgPSBsZW5ndGg7IGktLSA+IDA7KSB7XG4gICAgICBpZiAobGlzdFtpXSA9PT0gbGlzdGVuZXIgfHxcbiAgICAgICAgICAobGlzdFtpXS5saXN0ZW5lciAmJiBsaXN0W2ldLmxpc3RlbmVyID09PSBsaXN0ZW5lcikpIHtcbiAgICAgICAgcG9zaXRpb24gPSBpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocG9zaXRpb24gPCAwKVxuICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICBpZiAobGlzdC5sZW5ndGggPT09IDEpIHtcbiAgICAgIGxpc3QubGVuZ3RoID0gMDtcbiAgICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpc3Quc3BsaWNlKHBvc2l0aW9uLCAxKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKVxuICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIGxpc3RlbmVyKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciBrZXksIGxpc3RlbmVycztcblxuICBpZiAoIXRoaXMuX2V2ZW50cylcbiAgICByZXR1cm4gdGhpcztcblxuICAvLyBub3QgbGlzdGVuaW5nIGZvciByZW1vdmVMaXN0ZW5lciwgbm8gbmVlZCB0byBlbWl0XG4gIGlmICghdGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApXG4gICAgICB0aGlzLl9ldmVudHMgPSB7fTtcbiAgICBlbHNlIGlmICh0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gZW1pdCByZW1vdmVMaXN0ZW5lciBmb3IgYWxsIGxpc3RlbmVycyBvbiBhbGwgZXZlbnRzXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgZm9yIChrZXkgaW4gdGhpcy5fZXZlbnRzKSB7XG4gICAgICBpZiAoa2V5ID09PSAncmVtb3ZlTGlzdGVuZXInKSBjb250aW51ZTtcbiAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKGtleSk7XG4gICAgfVxuICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKCdyZW1vdmVMaXN0ZW5lcicpO1xuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChpc0Z1bmN0aW9uKGxpc3RlbmVycykpIHtcbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVycyk7XG4gIH0gZWxzZSBpZiAobGlzdGVuZXJzKSB7XG4gICAgLy8gTElGTyBvcmRlclxuICAgIHdoaWxlIChsaXN0ZW5lcnMubGVuZ3RoKVxuICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnNbbGlzdGVuZXJzLmxlbmd0aCAtIDFdKTtcbiAgfVxuICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciByZXQ7XG4gIGlmICghdGhpcy5fZXZlbnRzIHx8ICF0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgcmV0ID0gW107XG4gIGVsc2UgaWYgKGlzRnVuY3Rpb24odGhpcy5fZXZlbnRzW3R5cGVdKSlcbiAgICByZXQgPSBbdGhpcy5fZXZlbnRzW3R5cGVdXTtcbiAgZWxzZVxuICAgIHJldCA9IHRoaXMuX2V2ZW50c1t0eXBlXS5zbGljZSgpO1xuICByZXR1cm4gcmV0O1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24odHlwZSkge1xuICBpZiAodGhpcy5fZXZlbnRzKSB7XG4gICAgdmFyIGV2bGlzdGVuZXIgPSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgICBpZiAoaXNGdW5jdGlvbihldmxpc3RlbmVyKSlcbiAgICAgIHJldHVybiAxO1xuICAgIGVsc2UgaWYgKGV2bGlzdGVuZXIpXG4gICAgICByZXR1cm4gZXZsaXN0ZW5lci5sZW5ndGg7XG4gIH1cbiAgcmV0dXJuIDA7XG59O1xuXG5FdmVudEVtaXR0ZXIubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uKGVtaXR0ZXIsIHR5cGUpIHtcbiAgcmV0dXJuIGVtaXR0ZXIubGlzdGVuZXJDb3VudCh0eXBlKTtcbn07XG5cbmZ1bmN0aW9uIGlzRnVuY3Rpb24oYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnZnVuY3Rpb24nO1xufVxuXG5mdW5jdGlvbiBpc051bWJlcihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdudW1iZXInO1xufVxuXG5mdW5jdGlvbiBpc09iamVjdChhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdvYmplY3QnICYmIGFyZyAhPT0gbnVsbDtcbn1cblxuZnVuY3Rpb24gaXNVbmRlZmluZWQoYXJnKSB7XG4gIHJldHVybiBhcmcgPT09IHZvaWQgMDtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9ldmVudHMvZXZlbnRzLmpzXG4vLyBtb2R1bGUgaWQgPSAxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbmxldCBtYXRoID0gcmVxdWlyZSgnLi4vdXRpbC9tYXRoJyk7XG5cbi8qKlxuICBDcmVhdGVzIGEgc3RlcHBhYmxlIHZhbHVlIHdpdGggbWluaW11bSwgbWF4aW11bSwgYW5kIHN0ZXAgc2l6ZS4gVGhpcyBpcyB1c2VkIGluIG1hbnkgaW50ZXJmYWNlcyB0byBjb25zdHJpY3QgdGhlaXIgdmFsdWVzIHRvIGNlcnRhaW4gcmFuZ2VzLlxuICBAcGFyYW0ge251bWJlcn0gW21pbj0wXSBtaW5pbXVtXG4gIEBwYXJhbSB7bnVtYmVyfSBbbWF4PTFdIG1heGltdW1cbiAgQHBhcmFtIHtudW1iZXJ9IFtzdGVwPTBdXG4gIEBwYXJhbSB7bnVtYmVyfSBbdmFsdWU9MF0gaW5pdGlhbCB2YWx1ZVxuICBAcmV0dXJucyB7T2JqZWN0fSBTdGVwXG4qL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGVwIHtcblxuICBjb25zdHJ1Y3RvcihtaW4gPSAwLG1heCA9IDEsc3RlcCA9IDAsdmFsdWUgPSAwKSB7XG4gICAgLy9PYmplY3QuYXNzaWduKHRoaXMse21pbixtYXgsc3RlcH0pO1xuICAgIC8vQ2Fubm90IHVzZSBPYmplY3QuYXNzaWduIGJlY2F1c2Ugbm90IHN1cHBvcnRlZCBpbiBTYWZhcmkuXG4gICAgLy9JIHdvdWxkIGV4cGVjdCBmb3IgQmFiZWwgdG8gdGFrZSBjYXJlIG9mIHRoaXMgYnV0IGl0IGlzIG5vdC5cbiAgICB0aGlzLm1pbiA9IG1pbjtcbiAgICB0aGlzLm1heCA9IG1heDtcbiAgICB0aGlzLnN0ZXAgPSBzdGVwO1xuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLmNoYW5nZWQgPSBmYWxzZTtcbiAgICB0aGlzLm9sZFZhbHVlID0gZmFsc2U7XG4gICAgdGhpcy51cGRhdGUodGhpcy52YWx1ZSk7XG4gIH1cblxuICAvKipcbiAgICBVcGRhdGUgd2l0aCBhIG5ldyB2YWx1ZS4gVGhlIHZhbHVlIHdpbGwgYmUgYXV0by1hZGp1c3RlZCB0byBmaXQgdGhlIG1pbi9tYXgvc3RlcC5cbiAgICBAcGFyYW0ge251bWJlcn0gdmFsdWVcbiAgKi9cblxuICB1cGRhdGUodmFsdWUpIHtcbiAgICBpZiAodGhpcy5zdGVwKSB7XG4gICAgICAvLyB0aGlzLnZhbHVlID0gbWF0aC5jbGlwKE1hdGgucm91bmQodmFsdWUgLyAodGhpcy5zdGVwKSkgKiB0aGlzLnN0ZXAsIHRoaXMubWluLHRoaXMubWF4KTtcbiAgICAgIHRoaXMudmFsdWUgPSBtYXRoLmNsaXAoTWF0aC5yb3VuZCgodmFsdWUtdGhpcy5taW4pIC8gKHRoaXMuc3RlcCkpICogdGhpcy5zdGVwICsgdGhpcy5taW4sIHRoaXMubWluLHRoaXMubWF4KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy52YWx1ZSA9IG1hdGguY2xpcCh2YWx1ZSx0aGlzLm1pbix0aGlzLm1heCk7XG4gICAgfVxuICAgIGlmICh0aGlzLm9sZFZhbHVlICE9PSB0aGlzLnZhbHVlKSB7XG4gICAgICB0aGlzLm9sZFZhbHVlID0gdGhpcy52YWx1ZTtcbiAgICAgIHRoaXMuY2hhbmdlZCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY2hhbmdlZCA9IGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgIFVwZGF0ZSB3aXRoIGEgbm9ybWFsaXplZCB2YWx1ZSAwLTEuXG4gICAgQHBhcmFtIHtudW1iZXJ9IHZhbHVlXG4gICovXG4gIHVwZGF0ZU5vcm1hbCh2YWx1ZSkge1xuICAgIHRoaXMudmFsdWUgPSBtYXRoLnNjYWxlKHZhbHVlLDAsMSx0aGlzLm1pbix0aGlzLm1heCk7XG4gICAgcmV0dXJuIHRoaXMudXBkYXRlKHRoaXMudmFsdWUpO1xuICB9XG5cbiAgLyoqXG4gICAgR2V0IGEgbm9ybWFsaXplZCB2ZXJzaW9uIG9mIHRoaXMudmFsdWUgLiBOb3Qgc2V0dGFibGUuXG4gICovXG4gIGdldCBub3JtYWxpemVkKCkge1xuICAgIHJldHVybiBtYXRoLm5vcm1hbGl6ZSh0aGlzLnZhbHVlLHRoaXMubWluLHRoaXMubWF4KTtcbiAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2pzaGludC1sb2FkZXIhLi9saWIvbW9kZWxzL3N0ZXAuanMiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBtYXRoIGZyb20gJy4uL3V0aWwvbWF0aCc7XG5pbXBvcnQgVG9nZ2xlTW9kZWwgZnJvbSAnLi4vbW9kZWxzL3RvZ2dsZSc7XG5cblxuLypcbmhvdyB0byB1c2UgOlxuXG5kaWFsLmludGVyYWN0aW9uID0gbmV3IEhhbmRsZSgncmFkaWFsJywncmVsYXRpdmUnLHRoaXMud2lkdGgsdGhpcy5oZWlnaHQpO1xuLy8gZGlhbC5pbnRlcmFjdGlvbi5tb2RlID0gJ3JlbGF0aXZlJ1xuLy8gZGlhbC5pbnRlcmFjdGlvbi5kaXJlY3Rpb24gPSAncmFkaWFsJ1xuXG5vbiBjbGljazpcbmRpYWwuaW50ZXJhY3Rpb24uYW5jaG9yID0gdGhpcy5tb3VzZTtcblxub24gbW92ZTpcbmRpYWwuaW50ZXJhY3Rpb24udXBkYXRlKHRoaXMubW91c2UpO1xuXG5jb25zb2xlLmxvZyggZGlhbC5pbnRlcmFjdGlvbi52YWx1ZSApOyBzaG91bGQgYmUgYSBub3JtYWxpemVkIHZhbHVlLlxuXG4qL1xuXG4vKlxuICBhYnNvbHV0ZS9yZWxhdGl2ZSBhcmUgcHJvcGVydHk6IG1vZGVcbiAgcmFkaWFsL3ZlcnRpY2FsL2hvcml6b250YWwvMmQgYXJlIHByb3BlcnR5OiBkaXJlY3Rpb25cblxuICBwbGFuIDpcblxuICBpZiByZWxhdGl2ZSAtLVxuICBOTyBvbiBjbGljaywgZ2V0IHZhbHVlIG9mZnNldCBiZXR3ZWVuIGN1cnJlbnQgdmFsdWUgYW5kIGNsaWNrIHZhbHVlLlxuICBOTyBvbiBtb3ZlLCB1c2UgY2xpY2sgdmFsdWUgLSBvZmZzZXRcbiAgSU5TVEVBRFxuICB1c2UgZGVsdGEgLS0gYmMgdmVydGljYWwgbW90aW9uIG9uIGRpYWwgaXMgaW1wb3NzaWJsZSBvdGhlcndpc2VcbiAgYWxzbyBhbGxvdyB0byBzZXQgc2Vuc2l0aXZpdHlcblxuKi9cblxuZXhwb3J0IGNsYXNzIEhhbmRsZSB7XG5cbiAgY29uc3RydWN0b3IobW9kZT0nYWJzb2x1dGUnLGRpcmVjdGlvbj0ndmVydGljYWwnLHhib3VuZD1bMCwxMDBdLHlib3VuZD1bMCwxMDBdKSB7XG4gICAgdGhpcy5tb2RlID0gbW9kZTtcbiAgICB0aGlzLmRpcmVjdGlvbiA9IGRpcmVjdGlvbjtcbiAgICB0aGlzLnByZXZpb3VzID0gMDtcbiAgICB0aGlzLnZhbHVlID0gMDtcbiAgICB0aGlzLnNlbnNpdGl2aXR5ID0gMTtcbiAgICB0aGlzLnJlc2l6ZSh4Ym91bmQseWJvdW5kKTtcbiAgfVxuXG4gIHJlc2l6ZSh4Ym91bmQseWJvdW5kKSB7XG4gICAgdGhpcy5ib3VuZGFyeSA9IHtcbiAgICAgIG1pbjoge1xuICAgICAgICB4OiB4Ym91bmRbMF0sXG4gICAgICAgIHk6IHlib3VuZFswXVxuICAgICAgfSxcbiAgICAgIG1heDoge1xuICAgICAgICB4OiB4Ym91bmRbMV0sXG4gICAgICAgIHk6IHlib3VuZFsxXVxuICAgICAgfSxcbiAgICAgIGNlbnRlcjoge1xuICAgICAgICB4OiAoeGJvdW5kWzFdIC0geGJvdW5kWzBdKS8yICsgeGJvdW5kWzBdLFxuICAgICAgICB5OiAoeWJvdW5kWzFdIC0geWJvdW5kWzBdKS8yICsgeWJvdW5kWzBdXG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIHNldCBhbmNob3IobW91c2UpIHtcbiAgICB0aGlzLl9hbmNob3IgPSB0aGlzLmNvbnZlcnRQb3NpdGlvblRvVmFsdWUobW91c2UpO1xuICB9XG5cbiAgZ2V0IGFuY2hvcigpIHtcbiAgICByZXR1cm4gdGhpcy5fYW5jaG9yO1xuICB9XG5cblxuICB1cGRhdGUobW91c2UpIHtcbiAgICBpZiAodGhpcy5tb2RlPT09J3JlbGF0aXZlJykge1xuICAgICAgbGV0IGluY3JlbWVudCA9IHRoaXMuY29udmVydFBvc2l0aW9uVG9WYWx1ZShtb3VzZSkgLSB0aGlzLmFuY2hvcjtcbiAgICAgIGlmIChNYXRoLmFicyhpbmNyZW1lbnQpID4gMC41KSB7IGluY3JlbWVudCA9IDA7IH1cbiAgICAgIHRoaXMuYW5jaG9yID0gbW91c2U7XG4gICAgICB0aGlzLnZhbHVlID0gdGhpcy52YWx1ZSArIGluY3JlbWVudCAqIHRoaXMuc2Vuc2l0aXZpdHk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudmFsdWUgPSB0aGlzLmNvbnZlcnRQb3NpdGlvblRvVmFsdWUobW91c2UpO1xuICAgIH1cbiAgICB0aGlzLnZhbHVlID0gbWF0aC5jbGlwKHRoaXMudmFsdWUsMCwxKTtcbiAgfVxuXG4gIGNvbnZlcnRQb3NpdGlvblRvVmFsdWUoY3VycmVudCkge1xuICAgIHN3aXRjaCh0aGlzLmRpcmVjdGlvbikge1xuICAgICAgY2FzZSAncmFkaWFsJzpcbiAgICAgICAgbGV0IHBvc2l0aW9uID0gbWF0aC50b1BvbGFyKGN1cnJlbnQueCAtIHRoaXMuYm91bmRhcnkuY2VudGVyLngsIGN1cnJlbnQueSAtIHRoaXMuYm91bmRhcnkuY2VudGVyLnkpO1xuICAgICAgICBwb3NpdGlvbiA9IHBvc2l0aW9uLmFuZ2xlIC8gKE1hdGguUEkqMik7XG4gICAgICAgIHBvc2l0aW9uID0gKChwb3NpdGlvbiAtIDAuMjUpICsgMSkgJSAxO1xuICAgICAgICByZXR1cm4gcG9zaXRpb247XG4gICAgICBjYXNlICd2ZXJ0aWNhbCc6XG4gICAgICAgIHJldHVybiBtYXRoLnNjYWxlKGN1cnJlbnQueSx0aGlzLmJvdW5kYXJ5Lm1pbi55LHRoaXMuYm91bmRhcnkubWF4LnksMCwxKTtcbiAgICAgIGNhc2UgJ2hvcml6b250YWwnOlxuICAgICAgICByZXR1cm4gbWF0aC5zY2FsZShjdXJyZW50LngsdGhpcy5ib3VuZGFyeS5taW4ueCx0aGlzLmJvdW5kYXJ5Lm1heC54LDAsMSk7XG4gICAgfVxuICB9XG5cbn1cblxuXG5leHBvcnQgY2xhc3MgQnV0dG9uIHtcblxuICBjb25zdHJ1Y3Rvcihtb2RlPSdidXR0b24nKSB7XG4gICAgdGhpcy5tb2RlID0gbW9kZTtcbiAgICB0aGlzLnN0YXRlID0gbmV3IFRvZ2dsZU1vZGVsKCk7XG4gICAgdGhpcy5wYWludGJydXNoID0gZmFsc2U7XG4gIH1cblxuICBjbGljaygpIHtcbiAgICBzd2l0Y2ggKHRoaXMubW9kZSkge1xuICAgICAgY2FzZSAnaW1wdWxzZSc6XG4gICAgICAgIHRoaXMuc3RhdGUub24oKTtcbiAgICAgICAgaWYgKHRoaXMudGltZW91dCkge1xuICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQodGhpcy5zdGF0ZS5vZmYuYmluZCh0aGlzKSwzMCk7XG4gICAgICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx0aGlzLnN0YXRlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdidXR0b24nOlxuICAgICAgICB0aGlzLnR1cm5PbigpO1xuICAgICAgICB0aGlzLmVtaXQoJ2NoYW5nZScsdGhpcy5zdGF0ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnYWZ0ZXJ0b3VjaCc6XG4gICAgICAgIHRoaXMucG9zaXRpb24gPSB7XG4gICAgICAgICAgeDogbWF0aC5jbGlwKHRoaXMubW91c2UueCAvIHRoaXMud2lkdGgsMCwxKSxcbiAgICAgICAgICB5OiBtYXRoLmNsaXAoMSAtIHRoaXMubW91c2UueSAvIHRoaXMuaGVpZ2h0LDAsMSlcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy50dXJuT24oKTtcbiAgICAgICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHtcbiAgICAgICAgICBzdGF0ZTogdGhpcy5zdGF0ZSxcbiAgICAgICAgICB4OiB0aGlzLnBvc2l0aW9uLngsXG4gICAgICAgICAgeTogdGhpcy5wb3NpdGlvbi55LFxuICAgICAgICB9KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd0b2dnbGUnOlxuICAgICAgICB0aGlzLmZsaXAoKTtcbiAgICAgICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHRoaXMuc3RhdGUpO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgfVxuXG4gIG1vdmUoKSB7XG4gICAgaWYgKHRoaXMubW9kZT09PSdhZnRlcnRvdWNoJykge1xuICAgICAgdGhpcy5wb3NpdGlvbiA9IHtcbiAgICAgICAgeDogbWF0aC5jbGlwKHRoaXMubW91c2UueCAvIHRoaXMud2lkdGgsMCwxKSxcbiAgICAgICAgeTogbWF0aC5jbGlwKDEgLSB0aGlzLm1vdXNlLnkgLyB0aGlzLmhlaWdodCwwLDEpXG4gICAgICB9O1xuICAgICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHtcbiAgICAgICAgc3RhdGU6IHRoaXMuc3RhdGUsXG4gICAgICAgIHg6IHRoaXMucG9zaXRpb24ueCxcbiAgICAgICAgeTogdGhpcy5wb3NpdGlvbi55LFxuICAgICAgfSk7XG4gICAgICB0aGlzLnJlbmRlcigpO1xuICAgIH1cbiAgfVxuXG4gIHJlbGVhc2UoKSB7XG4gICAgc3dpdGNoICh0aGlzLm1vZGUpIHtcbiAgICAgIGNhc2UgJ2J1dHRvbic6XG4gICAgICAgIHRoaXMudHVybk9mZigpO1xuICAgICAgICB0aGlzLmVtaXQoJ2NoYW5nZScsdGhpcy5zdGF0ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnYWZ0ZXJ0b3VjaCc6XG4gICAgICAgIHRoaXMudHVybk9mZigpO1xuICAgICAgICB0aGlzLnBvc2l0aW9uID0ge1xuICAgICAgICAgIHg6IHRoaXMubW91c2UueCAvIHRoaXMud2lkdGgsXG4gICAgICAgICAgeTogMSAtIHRoaXMubW91c2UueSAvIHRoaXMuaGVpZ2h0XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx7XG4gICAgICAgICAgc3RhdGU6IHRoaXMuc3RhdGUsXG4gICAgICAgICAgeDogdGhpcy5wb3NpdGlvbi54LFxuICAgICAgICAgIHk6IHRoaXMucG9zaXRpb24ueSxcbiAgICAgICAgfSk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9qc2hpbnQtbG9hZGVyIS4vbGliL3V0aWwvaW50ZXJhY3Rpb24uanMiLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvZ2dsZSB7XG5cbiAgY29uc3RydWN0b3Ioc3RhdGUpIHtcbiAgICB0aGlzLnN0YXRlID0gc3RhdGUgfHwgZmFsc2U7XG4gIH1cblxuICBmbGlwKHN0YXRlKSB7XG4gICAgaWYgKHN0YXRlIHx8IHN0YXRlID09PSBmYWxzZSkge1xuICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0YXRlID0gIXRoaXMuc3RhdGU7XG4gICAgfVxuICB9XG5cbiAgb24oKSB7XG4gICAgdGhpcy5zdGF0ZSA9IHRydWU7XG4gIH1cblxuICBvZmYoKSB7XG4gICAgdGhpcy5zdGF0ZSA9IGZhbHNlO1xuICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vanNoaW50LWxvYWRlciEuL2xpYi9tb2RlbHMvdG9nZ2xlLmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG5sZXQgc3ZnID0gcmVxdWlyZSgnLi4vdXRpbC9zdmcnKTtcbmxldCBJbnRlcmZhY2UgPSByZXF1aXJlKCcuLi9jb3JlL2ludGVyZmFjZScpO1xubGV0IFN0ZXAgPSByZXF1aXJlKCcuLi9tb2RlbHMvc3RlcCcpO1xuaW1wb3J0ICogYXMgSW50ZXJhY3Rpb24gZnJvbSAnLi4vdXRpbC9pbnRlcmFjdGlvbic7XG5cbi8qKlxuKiBTbGlkZXJcbipcbiogQGRlc2NyaXB0aW9uIEhvcml6b250YWwgb3IgdmVydGljYWwgc2xpZGVyIHdpdGggc2V0dGFibGUgaW50ZXJhY3Rpb24gbW9kZXMuXG4qXG4qIEBkZW1vIDxzcGFuIG5leHVzLXVpPVwic2xpZGVyXCIgc3RlcD0wLjI+PC9zcGFuPlxuKlxuKiBAZXhhbXBsZVxuKiB2YXIgc2xpZGVyID0gbmV3IE5leHVzLlNsaWRlcignI3RhcmdldCcpXG4qXG4qIEBleGFtcGxlXG4qIHZhciBzbGlkZXIgPSBuZXcgTmV4dXMuU2xpZGVyKCcjdGFyZ2V0Jyx7XG4qICAgICAnc2l6ZSc6IFsxMjAsMjBdLFxuKiAgICAgJ21vZGUnOiAncmVsYXRpdmUnLCAgLy8gJ3JlbGF0aXZlJyBvciAnYWJzb2x1dGUnXG4qICAgICAnbWluJzogMCxcbiogICAgICdtYXgnOiAxLFxuKiAgICAgJ3N0ZXAnOiAwLFxuKiAgICAgJ3ZhbHVlJzogMFxuKiB9KVxuKlxuKiBAb3V0cHV0XG4qIGNoYW5nZVxuKiBGaXJlcyB3aGVuIHRoZSBpbnRlcmZhY2UncyB2YWx1ZSBjaGFuZ2VzLiA8YnI+XG4qIEV2ZW50IGRhdGE6IDxpPm51bWJlcjwvaT4gVGhlIG51bWJlciB2YWx1ZSBvZiB0aGUgaW50ZXJmYWNlLlxuKlxuKiBAb3V0cHV0ZXhhbXBsZVxuKiBzbGlkZXIub24oJ2NoYW5nZScsZnVuY3Rpb24odikge1xuKiAgIGNvbnNvbGUubG9nKHYpO1xuKiB9KVxuKlxuKlxuKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2xpZGVyIGV4dGVuZHMgSW50ZXJmYWNlIHtcblxuICBjb25zdHJ1Y3RvcigpIHtcblxuICAgIGxldCBvcHRpb25zID0gWydtaW4nLCdtYXgnLCd2YWx1ZSddO1xuXG4gICAgbGV0IGRlZmF1bHRzID0ge1xuICAgICAgJ3NpemUnOiBbMTIwLDIwXSxcbiAgICAgICdtb2RlJzogJ3JlbGF0aXZlJywgIC8vICdyZWxhdGl2ZScgb3IgJ2Fic29sdXRlJ1xuICAgICAgJ21pbic6IDAsXG4gICAgICAnbWF4JzogMSxcbiAgICAgICdzdGVwJzogMCxcbiAgICAgICd2YWx1ZSc6IDBcbiAgICB9O1xuXG4gICAgc3VwZXIoYXJndW1lbnRzLG9wdGlvbnMsZGVmYXVsdHMpO1xuXG4gICAgdGhpcy5vcmllbnRhdGlvbiA9ICd2ZXJ0aWNhbCc7IC8vIFRoaXMgd2lsbCBjaGFuZ2UgYXV0b21hdGljYWxseSB0byAnaG9yaXpvbnRhbCdpZiB0aGUgaW50ZXJmYWNlIGlzIHdpZGVyIHRoYW4gaXQgaXMgdGFsbC5cblxuICAgIHRoaXMuX3ZhbHVlID0gbmV3IFN0ZXAodGhpcy5zZXR0aW5ncy5taW4sIHRoaXMuc2V0dGluZ3MubWF4LCB0aGlzLnNldHRpbmdzLnN0ZXAsIHRoaXMuc2V0dGluZ3MudmFsdWUpO1xuXG4gICAgdGhpcy5wb3NpdGlvbiA9IG5ldyBJbnRlcmFjdGlvbi5IYW5kbGUodGhpcy5zZXR0aW5ncy5tb2RlLHRoaXMub3JpZW50YXRpb24sWzAsdGhpcy53aWR0aF0sW3RoaXMuaGVpZ2h0LDBdKTtcbiAgICB0aGlzLnBvc2l0aW9uLnZhbHVlID0gdGhpcy5fdmFsdWUubm9ybWFsaXplZDtcblxuICAgIHRoaXMuaW5pdCgpO1xuXG4gICAgdGhpcy5wb3NpdGlvbi5kaXJlY3Rpb24gPSB0aGlzLm9yaWVudGF0aW9uO1xuXG4gICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHRoaXMudmFsdWUpO1xuXG4gIH1cblxuICBidWlsZEludGVyZmFjZSgpIHtcblxuICAgIHRoaXMuYmFyID0gc3ZnLmNyZWF0ZSgncmVjdCcpO1xuICAgIHRoaXMuZmlsbGJhciA9IHN2Zy5jcmVhdGUoJ3JlY3QnKTtcbiAgICB0aGlzLmtub2IgPSBzdmcuY3JlYXRlKCdjaXJjbGUnKTtcblxuICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmJhcik7XG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuZmlsbGJhcik7XG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMua25vYik7XG5cbiAgfVxuXG4gIHNpemVJbnRlcmZhY2UoKSB7XG5cbiAgICBpZiAodGhpcy53aWR0aCA8IHRoaXMuaGVpZ2h0KSB7XG4gICAgICB0aGlzLm9yaWVudGF0aW9uID0gJ3ZlcnRpY2FsJztcbiAgICAgIHRoaXMucG9zaXRpb24uZGlyZWN0aW9uID0gJ3ZlcnRpY2FsJztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5vcmllbnRhdGlvbiA9ICdob3Jpem9udGFsJztcbiAgICAgIHRoaXMucG9zaXRpb24uZGlyZWN0aW9uID0gJ2hvcml6b250YWwnO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnBvc2l0aW9uKSB7XG4gICAgICB0aGlzLnBvc2l0aW9uLnJlc2l6ZShbMCx0aGlzLndpZHRoXSxbdGhpcy5oZWlnaHQsMF0pO1xuICAgIH1cblxuICAgIGxldCB4LCB5LCB3LCBoLCBiYXJPZmZzZXQsIGNvcm5lclJhZGl1cztcbiAgICB0aGlzLmtub2JEYXRhID0ge1xuICAgICAgbGV2ZWw6IDAsXG4gICAgICByOiAwXG4gICAgfTtcblxuICAgIGlmICh0aGlzLm9yaWVudGF0aW9uID09PSAndmVydGljYWwnKSB7XG4gICAgICB0aGlzLnRoaWNrbmVzcyA9IHRoaXMud2lkdGggLyAyO1xuICAgIFx0eCA9IHRoaXMud2lkdGgvMjtcbiAgICBcdHkgPSAwO1xuICAgIFx0dyA9IHRoaXMudGhpY2tuZXNzO1xuICAgIFx0aCA9IHRoaXMuaGVpZ2h0O1xuICAgICAgdGhpcy5rbm9iRGF0YS5yID0gdGhpcy50aGlja25lc3MgKiAwLjg7XG4gICAgXHR0aGlzLmtub2JEYXRhLmxldmVsID0gaC10aGlzLmtub2JEYXRhLnItdGhpcy5ub3JtYWxpemVkKihoLXRoaXMua25vYkRhdGEucioyKTtcbiAgICAgIGJhck9mZnNldCA9ICd0cmFuc2xhdGUoJyt0aGlzLnRoaWNrbmVzcyooLTEpLzIrJywwKSc7XG4gICAgICBjb3JuZXJSYWRpdXMgPSB3LzI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudGhpY2tuZXNzID0gdGhpcy5oZWlnaHQgLyAyO1xuICAgIFx0eCA9IDA7XG4gICAgXHR5ID0gdGhpcy5oZWlnaHQvMjtcbiAgICBcdHcgPSB0aGlzLndpZHRoO1xuICAgIFx0aCA9IHRoaXMudGhpY2tuZXNzO1xuICAgICAgdGhpcy5rbm9iRGF0YS5yID0gdGhpcy50aGlja25lc3MgKiAwLjg7XG4gICAgXHR0aGlzLmtub2JEYXRhLmxldmVsID0gdGhpcy5ub3JtYWxpemVkKih3LXRoaXMua25vYkRhdGEucioyKSt0aGlzLmtub2JEYXRhLnI7XG4gICAgICBiYXJPZmZzZXQgPSAndHJhbnNsYXRlKDAsJyt0aGlzLnRoaWNrbmVzcyooLTEpLzIrJyknO1xuICAgICAgY29ybmVyUmFkaXVzID0gaC8yO1xuICAgIH1cblxuICAgIHRoaXMuYmFyLnNldEF0dHJpYnV0ZSgneCcseCk7XG4gICAgdGhpcy5iYXIuc2V0QXR0cmlidXRlKCd5Jyx5KTtcbiAgICB0aGlzLmJhci5zZXRBdHRyaWJ1dGUoJ3RyYW5zZm9ybScsYmFyT2Zmc2V0KTtcbiAgICB0aGlzLmJhci5zZXRBdHRyaWJ1dGUoJ3J4Jyxjb3JuZXJSYWRpdXMpOyAvLyBjb3JuZXIgcmFkaXVzXG4gICAgdGhpcy5iYXIuc2V0QXR0cmlidXRlKCdyeScsY29ybmVyUmFkaXVzKTtcbiAgICB0aGlzLmJhci5zZXRBdHRyaWJ1dGUoJ3dpZHRoJyx3KTtcbiAgICB0aGlzLmJhci5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsaCk7XG5cbiAgICBpZiAodGhpcy5vcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJykge1xuICAgICAgdGhpcy5maWxsYmFyLnNldEF0dHJpYnV0ZSgneCcseCk7XG4gICAgICB0aGlzLmZpbGxiYXIuc2V0QXR0cmlidXRlKCd5Jyx0aGlzLmtub2JEYXRhLmxldmVsKTtcbiAgICAgIHRoaXMuZmlsbGJhci5zZXRBdHRyaWJ1dGUoJ3dpZHRoJyx3KTtcbiAgICAgIHRoaXMuZmlsbGJhci5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsaC10aGlzLmtub2JEYXRhLmxldmVsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5maWxsYmFyLnNldEF0dHJpYnV0ZSgneCcsMCk7XG4gICAgICB0aGlzLmZpbGxiYXIuc2V0QXR0cmlidXRlKCd5Jyx5KTtcbiAgICAgIHRoaXMuZmlsbGJhci5zZXRBdHRyaWJ1dGUoJ3dpZHRoJyx0aGlzLmtub2JEYXRhLmxldmVsKTtcbiAgICAgIHRoaXMuZmlsbGJhci5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsaCk7XG4gICAgfVxuICAgIHRoaXMuZmlsbGJhci5zZXRBdHRyaWJ1dGUoJ3RyYW5zZm9ybScsYmFyT2Zmc2V0KTtcbiAgICB0aGlzLmZpbGxiYXIuc2V0QXR0cmlidXRlKCdyeCcsY29ybmVyUmFkaXVzKTtcbiAgICB0aGlzLmZpbGxiYXIuc2V0QXR0cmlidXRlKCdyeScsY29ybmVyUmFkaXVzKTtcblxuICAgIGlmICh0aGlzLm9yaWVudGF0aW9uID09PSAndmVydGljYWwnKSB7XG4gICAgICB0aGlzLmtub2Iuc2V0QXR0cmlidXRlKCdjeCcseCk7XG4gICAgICB0aGlzLmtub2Iuc2V0QXR0cmlidXRlKCdjeScsdGhpcy5rbm9iRGF0YS5sZXZlbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMua25vYi5zZXRBdHRyaWJ1dGUoJ2N4Jyx0aGlzLmtub2JEYXRhLmxldmVsKTtcbiAgICAgIHRoaXMua25vYi5zZXRBdHRyaWJ1dGUoJ2N5Jyx5KTtcbiAgICB9XG4gICAgdGhpcy5rbm9iLnNldEF0dHJpYnV0ZSgncicsdGhpcy5rbm9iRGF0YS5yKTtcblxuICB9XG5cbiAgY29sb3JJbnRlcmZhY2UoKSB7XG4gICAgdGhpcy5iYXIuc2V0QXR0cmlidXRlKCdmaWxsJywgdGhpcy5jb2xvcnMuZmlsbCk7XG4gICAgdGhpcy5maWxsYmFyLnNldEF0dHJpYnV0ZSgnZmlsbCcsIHRoaXMuY29sb3JzLmFjY2VudCk7XG4gICAgdGhpcy5rbm9iLnNldEF0dHJpYnV0ZSgnZmlsbCcsIHRoaXMuY29sb3JzLmFjY2VudCk7XG4gIH1cblxuXG4gIHJlbmRlcigpIHtcbiAgICBpZiAoIXRoaXMuY2xpY2tlZCkge1xuICAgICAgdGhpcy5rbm9iRGF0YS5yID0gdGhpcy50aGlja25lc3MqMC43NTtcbiAgICB9XG4gICAgdGhpcy5rbm9iLnNldEF0dHJpYnV0ZSgncicsdGhpcy5rbm9iRGF0YS5yKTtcblxuICAgIGlmICh0aGlzLm9yaWVudGF0aW9uID09PSAndmVydGljYWwnKSB7XG4gIFx0ICAgdGhpcy5rbm9iRGF0YS5sZXZlbCA9IHRoaXMua25vYkRhdGEucit0aGlzLl92YWx1ZS5ub3JtYWxpemVkKih0aGlzLmhlaWdodC10aGlzLmtub2JEYXRhLnIqMik7XG4gICAgICAgdGhpcy5rbm9iLnNldEF0dHJpYnV0ZSgnY3knLHRoaXMuaGVpZ2h0IC0gdGhpcy5rbm9iRGF0YS5sZXZlbCk7XG4gICAgICAgdGhpcy5maWxsYmFyLnNldEF0dHJpYnV0ZSgneScsdGhpcy5oZWlnaHQgLSB0aGlzLmtub2JEYXRhLmxldmVsKTtcbiAgICAgICB0aGlzLmZpbGxiYXIuc2V0QXR0cmlidXRlKCdoZWlnaHQnLHRoaXMua25vYkRhdGEubGV2ZWwpO1xuICAgIH0gZWxzZSB7XG4gIFx0ICAgdGhpcy5rbm9iRGF0YS5sZXZlbCA9IHRoaXMuX3ZhbHVlLm5vcm1hbGl6ZWQqKHRoaXMud2lkdGgtdGhpcy5rbm9iRGF0YS5yKjIpK3RoaXMua25vYkRhdGEucjtcbiAgICAgICB0aGlzLmtub2Iuc2V0QXR0cmlidXRlKCdjeCcsdGhpcy5rbm9iRGF0YS5sZXZlbCk7XG4gICAgICAgdGhpcy5maWxsYmFyLnNldEF0dHJpYnV0ZSgneCcsMCk7XG4gICAgICAgdGhpcy5maWxsYmFyLnNldEF0dHJpYnV0ZSgnd2lkdGgnLHRoaXMua25vYkRhdGEubGV2ZWwpO1xuICAgIH1cbiAgfVxuXG5cbiAgY2xpY2soKSB7XG4gICAgdGhpcy5rbm9iRGF0YS5yID0gdGhpcy50aGlja25lc3MqMC45O1xuICAgIHRoaXMucG9zaXRpb24uYW5jaG9yID0gdGhpcy5tb3VzZTtcbiAgICB0aGlzLm1vdmUoKTtcbiAgfVxuXG4gIG1vdmUoKSB7XG4gICAgaWYgKHRoaXMuY2xpY2tlZCkge1xuICAgICAgdGhpcy5wb3NpdGlvbi51cGRhdGUodGhpcy5tb3VzZSk7XG4gICAgICB0aGlzLl92YWx1ZS51cGRhdGVOb3JtYWwoIHRoaXMucG9zaXRpb24udmFsdWUgKTtcbiAgICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx0aGlzLl92YWx1ZS52YWx1ZSk7XG4gICAgICB0aGlzLnJlbmRlcigpO1xuXG4gICAgfVxuICB9XG5cbiAgcmVsZWFzZSgpIHtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgZ2V0IG5vcm1hbGl6ZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlLm5vcm1hbGl6ZWQ7XG4gIH1cblxuICAvKipcbiAgVGhlIHNsaWRlcidzIGN1cnJlbnQgdmFsdWUuIElmIHNldCBtYW51YWxseSwgd2lsbCB1cGRhdGUgdGhlIGludGVyZmFjZSBhbmQgdHJpZ2dlciB0aGUgb3V0cHV0IGV2ZW50LlxuICBAdHlwZSB7bnVtYmVyfVxuICBAZXhhbXBsZSBzbGlkZXIudmFsdWUgPSAxMDtcbiAgKi9cbiAgZ2V0IHZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZS52YWx1ZTtcbiAgfVxuICBzZXQgdmFsdWUodikge1xuICAgIHRoaXMuX3ZhbHVlLnVwZGF0ZSh2KTtcbiAgICB0aGlzLnBvc2l0aW9uLnZhbHVlID0gdGhpcy5fdmFsdWUubm9ybWFsaXplZDtcbiAgICB0aGlzLmVtaXQoJ2NoYW5nZScsdGhpcy5fdmFsdWUudmFsdWUpO1xuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICAvKipcbiAgTG93ZXIgbGltaXQgb2YgdGhlIHNsaWRlcnMncyBvdXRwdXQgcmFuZ2VcbiAgQHR5cGUge251bWJlcn1cbiAgQGV4YW1wbGUgc2xpZGVyLm1pbiA9IDEwMDA7XG4gICovXG4gIGdldCBtaW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlLm1pbjtcbiAgfVxuICBzZXQgbWluKHYpIHtcbiAgICB0aGlzLl92YWx1ZS5taW4gPSB2O1xuICB9XG5cbiAgLyoqXG4gIFVwcGVyIGxpbWl0IG9mIHRoZSBzbGlkZXIncyBvdXRwdXQgcmFuZ2VcbiAgQHR5cGUge251bWJlcn1cbiAgQGV4YW1wbGUgc2xpZGVyLm1heCA9IDEwMDA7XG4gICovXG4gIGdldCBtYXgoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlLm1heDtcbiAgfVxuICBzZXQgbWF4KHYpIHtcbiAgICB0aGlzLl92YWx1ZS5tYXggPSB2O1xuICB9XG5cbiAgLyoqXG4gIFRoZSBpbmNyZW1lbnQgdGhhdCB0aGUgc2xpZGVyJ3MgdmFsdWUgY2hhbmdlcyBieS5cbiAgQHR5cGUge251bWJlcn1cbiAgQGV4YW1wbGUgc2xpZGVyLnN0ZXAgPSA1O1xuICAqL1xuICBnZXQgc3RlcCgpIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWUuc3RlcDtcbiAgfVxuICBzZXQgc3RlcCh2KSB7XG4gICAgdGhpcy5fdmFsdWUuc3RlcCA9IHY7XG4gIH1cblxuICAvKipcbiAgQWJzb2x1dGUgbW9kZSAoc2xpZGVyJ3MgdmFsdWUganVtcHMgdG8gbW91c2UgY2xpY2sgcG9zaXRpb24pIG9yIHJlbGF0aXZlIG1vZGUgKG1vdXNlIGRyYWcgY2hhbmdlcyB2YWx1ZSByZWxhdGl2ZSB0byBpdHMgY3VycmVudCBwb3NpdGlvbikuIERlZmF1bHQ6IFwicmVsYXRpdmVcIi5cbiAgQHR5cGUge3N0cmluZ31cbiAgQGV4YW1wbGUgc2xpZGVyLm1vZGUgPSBcInJlbGF0aXZlXCI7XG4gICovXG4gIGdldCBtb2RlKCkge1xuICAgIHJldHVybiB0aGlzLnBvc2l0aW9uLm1vZGU7XG4gIH1cbiAgc2V0IG1vZGUodikge1xuICAgIHRoaXMucG9zaXRpb24ubW9kZSA9IHY7XG4gIH1cblxuXG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vanNoaW50LWxvYWRlciEuL2xpYi9pbnRlcmZhY2VzL3NsaWRlci5qcyIsIid1c2Ugc3RyaWN0JztcblxubGV0IHN2ZyA9IHJlcXVpcmUoJy4uL3V0aWwvc3ZnJyk7XG5sZXQgVG9nZ2xlTW9kZWwgPSByZXF1aXJlKCcuLi9tb2RlbHMvdG9nZ2xlJyk7XG5sZXQgSW50ZXJmYWNlID0gcmVxdWlyZSgnLi4vY29yZS9pbnRlcmZhY2UnKTtcblxuLyoqXG4qIFRvZ2dsZVxuKlxuKiBAZGVzY3JpcHRpb24gQmluYXJ5IHN3aXRjaFxuKlxuKiBAZGVtbyA8c3BhbiBuZXh1cy11aT1cInRvZ2dsZVwiPjwvc3Bhbj5cbipcbiogQGV4YW1wbGVcbiogdmFyIHRvZ2dsZSA9IG5ldyBOZXh1cy5Ub2dnbGUoJyN0YXJnZXQnKVxuKlxuKiBAZXhhbXBsZVxuKiB2YXIgdG9nZ2xlID0gbmV3IE5leHVzLlRvZ2dsZSgnI3RhcmdldCcse1xuKiAgICAgJ3NpemUnOiBbNDAsMjBdLFxuKiAgICAgJ3N0YXRlJzogZmFsc2VcbiogfSlcbipcbiogQG91dHB1dFxuKiBjaGFuZ2VcbiogRmlyZXMgYW55IHRpbWUgdGhlIGludGVyZmFjZSdzIHZhbHVlIGNoYW5nZXMuIDxicj5cbiogUGFyYW1ldGVyOiBUaGUgYm9vbGVhbiBzdGF0ZSBvZiB0aGUgaW50ZXJmYWNlLlxuKlxuKiBAb3V0cHV0ZXhhbXBsZVxuKiB0b2dnbGUub24oJ2NoYW5nZScsZnVuY3Rpb24odikge1xuKiAgIGNvbnNvbGUubG9nKHYpO1xuKiB9KVxuKlxuKlxuKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvZ2dsZSBleHRlbmRzIEludGVyZmFjZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7XG5cbiAgICBsZXQgb3B0aW9ucyA9IFsndmFsdWUnXTtcblxuICAgIGxldCBkZWZhdWx0cyA9IHtcbiAgICAgICdzaXplJzogWzQwLDIwXSxcbiAgICAgICd0YXJnZXQnOiBmYWxzZSxcbiAgICAgICdzdGF0ZSc6IGZhbHNlXG4gICAgfTtcblxuICAgIHN1cGVyKGFyZ3VtZW50cyxvcHRpb25zLGRlZmF1bHRzKTtcblxuICAgIHRoaXMuX3N0YXRlID0gbmV3IFRvZ2dsZU1vZGVsKHRoaXMuc2V0dGluZ3Muc3RhdGUpO1xuXG4gICAgdGhpcy5pbml0KCk7XG5cbiAgfVxuXG4gIGJ1aWxkSW50ZXJmYWNlKCkge1xuXG4gICAgdGhpcy5iYXIgPSBzdmcuY3JlYXRlKCdyZWN0Jyk7XG4gICAgdGhpcy5rbm9iID0gc3ZnLmNyZWF0ZSgnY2lyY2xlJyk7XG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuYmFyKTtcbiAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5rbm9iKTtcblxuICB9XG5cbiAgc2l6ZUludGVyZmFjZSgpIHtcblxuICAgIGlmICh0aGlzLmhlaWdodCA8IHRoaXMud2lkdGgvMikge1xuICAgICAgdGhpcy5rbm9iU2l6ZSA9IHRoaXMuaGVpZ2h0LzI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMua25vYlNpemUgPSB0aGlzLndpZHRoLzQ7XG4gICAgfVxuXG4gICAgdGhpcy5iYXIuc2V0QXR0cmlidXRlKCd4Jyx0aGlzLndpZHRoLzIgLSB0aGlzLmtub2JTaXplKjEuNSk7XG4gICAgdGhpcy5iYXIuc2V0QXR0cmlidXRlKCd5Jyx0aGlzLmhlaWdodC8yIC0gdGhpcy5rbm9iU2l6ZS8yKTtcbiAgICB0aGlzLmJhci5zZXRBdHRyaWJ1dGUoJ3J4Jyx0aGlzLmtub2JTaXplLzIpO1xuICAgIHRoaXMuYmFyLnNldEF0dHJpYnV0ZSgncnknLHRoaXMua25vYlNpemUvMik7XG4gICAgdGhpcy5iYXIuc2V0QXR0cmlidXRlKCd3aWR0aCcsdGhpcy5rbm9iU2l6ZSozKTtcbiAgICB0aGlzLmJhci5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsdGhpcy5rbm9iU2l6ZSk7XG5cbiAgICB0aGlzLmtub2Iuc2V0QXR0cmlidXRlKCdjeCcsdGhpcy53aWR0aC8yIC0gdGhpcy5rbm9iU2l6ZSk7XG4gICAgdGhpcy5rbm9iLnNldEF0dHJpYnV0ZSgnY3knLHRoaXMuaGVpZ2h0LzIpO1xuICAgIHRoaXMua25vYi5zZXRBdHRyaWJ1dGUoJ3InLHRoaXMua25vYlNpemUpO1xuXG4gIH1cblxuICBjb2xvckludGVyZmFjZSgpIHtcbiAgICB0aGlzLmtub2Iuc2V0QXR0cmlidXRlKCdmaWxsJywgdGhpcy5jb2xvcnMuYWNjZW50KTtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGlmICghdGhpcy5zdGF0ZSkge1xuICAgICAgdGhpcy5rbm9iLnNldEF0dHJpYnV0ZSgnY3gnLHRoaXMud2lkdGgvMiAtIHRoaXMua25vYlNpemUpO1xuICAgICAgdGhpcy5iYXIuc2V0QXR0cmlidXRlKCdmaWxsJywgdGhpcy5jb2xvcnMuZmlsbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMua25vYi5zZXRBdHRyaWJ1dGUoJ2N4Jyx0aGlzLndpZHRoLzIgKyB0aGlzLmtub2JTaXplKTtcbiAgICAgIHRoaXMuYmFyLnNldEF0dHJpYnV0ZSgnZmlsbCcsIHRoaXMuY29sb3JzLmFjY2VudCk7XG4gICAgfVxuICB9XG5cbiAgY2xpY2soKSB7XG4gICAgdGhpcy5mbGlwKCk7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgICB0aGlzLmVtaXQoJ2NoYW5nZScsdGhpcy5zdGF0ZSk7XG4gIH1cblxuICAvKipcbiAgV2hldGhlciB0aGUgdG9nZ2xlIGlzIGN1cnJlbnRseSBvbiBvciBvZmYuIFNldHRpbmcgdGhpcyBwcm9wZXJ0eSB3aWxsIHVwZGF0ZSB0aGUgdG9nZ2xlIGludGVyZmFjZSBhbmQgdHJpZ2dlciB0aGUgb3V0cHV0IGV2ZW50LlxuICBAdHlwZSB7Ym9vbGVhbn1cbiAgQGV4YW1wbGUgdG9nZ2xlLnN0YXRlID0gZmFsc2U7XG4gICovXG4gIGdldCBzdGF0ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fc3RhdGUuc3RhdGU7XG4gIH1cbiAgc2V0IHN0YXRlKHZhbHVlKSB7XG4gICAgdGhpcy5fc3RhdGUuZmxpcCh2YWx1ZSk7XG4gICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHRoaXMuc3RhdGUpO1xuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuXG4gIC8qKlxuICAqIFN3aXRjaCB0aGUgdG9nZ2xlIHN0YXRlIHRvIGl0cyBvcHBvc2l0ZSBzdGF0ZVxuICAqIEBleGFtcGxlXG4gICogdG9nZ2xlLmZsaXAoKTtcbiAgKi9cbiAgZmxpcCgpIHtcbiAgICB0aGlzLl9zdGF0ZS5mbGlwKCk7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2pzaGludC1sb2FkZXIhLi9saWIvaW50ZXJmYWNlcy90b2dnbGUuanMiLCIndXNlIHN0cmljdCc7XG5cbmxldCBzdmcgPSByZXF1aXJlKCcuLi91dGlsL3N2ZycpO1xubGV0IEJ1dHRvblRlbXBsYXRlID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9idXR0b250ZW1wbGF0ZScpO1xuXG4vKipcbiogQnV0dG9uXG4qXG4qIEBkZXNjcmlwdGlvbiBDaXJjdWxhciBidXR0b24gd2l0aCBvcHRpb25hbCBhZnRlcnRvdWNoLlxuKlxuKiBAZGVtbyA8c3BhbiBuZXh1cy11aT1cImJ1dHRvblwiPjwvc3Bhbj5cbipcbiogQGV4YW1wbGVcbiogdmFyIGJ1dHRvbiA9IG5ldyBOZXh1cy5CdXR0b24oJyN0YXJnZXQnKVxuKlxuKiBAZXhhbXBsZVxuKiB2YXIgYnV0dG9uID0gbmV3IE5leHVzLkJ1dHRvbignI3RhcmdldCcse1xuKiAgICdzaXplJzogWzgwLDgwXSxcbiogICAnbW9kZSc6ICdhZnRlcnRvdWNoJyxcbiogICAnc3RhdGUnOiBmYWxzZVxuKiB9KVxuKlxuKiBAb3V0cHV0XG4qIGNoYW5nZVxuKiBGaXJlcyBhbnkgdGltZSB0aGUgaW50ZXJmYWNlJ3MgdmFsdWUgY2hhbmdlcy4gPGJyPlxuKiBJbiA8Yj5idXR0b24gbW9kZTwvYj4sIDxiPnRvZ2dsZSBtb2RlPC9iPiwgYW5kIDxiPmltcHVsc2UgbW9kZTwvYj4sIHRoZSBvdXRwdXQgZGF0YSBpcyBhIGJvb2xlYW4gZGVzY3JpYmluZyB0aGUgc3RhdGUgb2YgdGhlIGJ1dHRvbi48YnI+XG4qIEluIDxiPmFmdGVydG91Y2ggbW9kZTwvYj4sIHRoZSBvdXRwdXQgZGF0YSBpcyBhbiBvYmplY3QgY29udGFpbmluZyB4ICgwLTEpIGFuZCB5ICgwLTEpIHBvc2l0aW9ucyBvZiBhZnRlcnRvdWNoLlxuKlxuKiBAb3V0cHV0ZXhhbXBsZVxuKiBidXR0b24ub24oJ2NoYW5nZScsZnVuY3Rpb24odikge1xuKiAgIC8vIHYgaXMgdGhlIHZhbHVlIG9mIHRoZSBidXR0b25cbiogICBjb25zb2xlLmxvZyh2KTtcbiogfSlcbipcbiovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJ1dHRvbiBleHRlbmRzIEJ1dHRvblRlbXBsYXRlIHtcblxuICBjb25zdHJ1Y3RvcigpIHtcblxuICAgIGxldCBvcHRpb25zID0gWydtb2RlJ107XG5cblxuICAgIGxldCBkZWZhdWx0cyA9IHtcbiAgICAgICdzaXplJzogWzgwLDgwXSxcbiAgICAgICdtb2RlJzogJ2FmdGVydG91Y2gnLCAvLyBidXR0b24sIGFmdGVydG91Y2gsIGltcHVsc2UsIHRvZ2dsZVxuICAgICAgJ3N0YXRlJzogZmFsc2VcbiAgICB9O1xuXG4gICAgc3VwZXIoYXJndW1lbnRzLG9wdGlvbnMsZGVmYXVsdHMpO1xuXG5cbiAgICAvKipcbiAgICAqIEludGVyYWN0aW9uIG1vZGU6IHN1cHBvcnRzIFwiYnV0dG9uXCIsIFwiYWZ0ZXJ0b3VjaFwiLCBcImltcHVsc2VcIiwgb3IgXCJ0b2dnbGVcIlxuICAgICogQHR5cGUge3N0cmluZ31cbiAgICAqIEBleGFtcGxlIGJ1dHRvbi5tb2RlID0gJ3RvZ2dsZSc7XG4gICAgKi9cbiAgICB0aGlzLm1vZGUgPSB0aGlzLnNldHRpbmdzLm1vZGU7XG5cbiAgICB0aGlzLmluaXQoKTtcbiAgICB0aGlzLnJlbmRlcigpO1xuXG4gIH1cblxuICBidWlsZEludGVyZmFjZSgpIHtcbiAgICB0aGlzLnBhZCA9IHN2Zy5jcmVhdGUoJ2NpcmNsZScpO1xuICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLnBhZCk7XG5cbiAgICB0aGlzLmludGVyYWN0aW9uVGFyZ2V0ID0gdGhpcy5wYWQ7XG5cbiAgICAvLyBvbmx5IHVzZWQgaWYgaW4gJ2FmdGVydG91Y2gnIG1vZGVcbiAgICB0aGlzLmRlZnMgPSBzdmcuY3JlYXRlKCdkZWZzJyk7XG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuZGVmcyk7XG5cbiAgICB0aGlzLmdyYWRpZW50ID0gc3ZnLnJhZGlhbEdyYWRpZW50KHRoaXMuZGVmcywyKTtcblxuICAgIHRoaXMuZ3JhZGllbnQuc3RvcHNbMF0uc2V0QXR0cmlidXRlKCdvZmZzZXQnLCAnMzAlJyk7XG5cbiAgICB0aGlzLmdyYWRpZW50LnN0b3BzWzFdLnNldEF0dHJpYnV0ZSgnb2Zmc2V0JywgJzEwMCUnKTtcblxuICB9XG5cbiAgc2l6ZUludGVyZmFjZSgpIHtcblxuICAgIHRoaXMucGFkLnNldEF0dHJpYnV0ZSgnY3gnLHRoaXMud2lkdGgvMik7XG4gICAgdGhpcy5wYWQuc2V0QXR0cmlidXRlKCdjeScsdGhpcy5oZWlnaHQvMik7XG4gICAgdGhpcy5wYWQuc2V0QXR0cmlidXRlKCdyJywgTWF0aC5taW4odGhpcy53aWR0aCx0aGlzLmhlaWdodCkgLyAyIC0gdGhpcy53aWR0aC80MCk7XG4gICAgdGhpcy5wYWQuc2V0QXR0cmlidXRlKCdzdHJva2Utd2lkdGgnLCB0aGlzLndpZHRoLzIwKTtcbiAgfVxuXG4gIGNvbG9ySW50ZXJmYWNlKCkge1xuXG4gICAgdGhpcy5ncmFkaWVudC5zdG9wc1swXS5zZXRBdHRyaWJ1dGUoJ3N0b3AtY29sb3InLCB0aGlzLmNvbG9ycy5hY2NlbnQpO1xuICAgIHRoaXMuZ3JhZGllbnQuc3RvcHNbMV0uc2V0QXR0cmlidXRlKCdzdG9wLWNvbG9yJywgdGhpcy5jb2xvcnMuZmlsbCk7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIC8qXG4gICogVXBkYXRlIHRoZSB2aXN1YWwgaW50ZXJmYWNlIHVzaW5nIGl0cyBjdXJyZW50IHN0YXRlXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGJ1dHRvbi5yZW5kZXIoKTtcbiAgKi9cbiAgcmVuZGVyKCkge1xuICAgIGlmICghdGhpcy5zdGF0ZSkge1xuICAgICAgdGhpcy5wYWQuc2V0QXR0cmlidXRlKCdmaWxsJywgdGhpcy5jb2xvcnMuZmlsbCk7XG4gICAgICB0aGlzLnBhZC5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsIHRoaXMuY29sb3JzLm1lZGl1bUxpZ2h0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMubW9kZT09PSdhZnRlcnRvdWNoJykge1xuICAgICAgICB0aGlzLnBhZC5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsICd1cmwoIycrdGhpcy5ncmFkaWVudC5pZCsnKScpO1xuICAgICAgICB0aGlzLmdyYWRpZW50LmVsZW1lbnQuc2V0QXR0cmlidXRlKCdjeCcsICh0aGlzLnBvc2l0aW9uLngqMTAwKSsnJScpO1xuICAgICAgICB0aGlzLmdyYWRpZW50LmVsZW1lbnQuc2V0QXR0cmlidXRlKCdjeScsICgoMS10aGlzLnBvc2l0aW9uLnkpKjEwMCkrJyUnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucGFkLnNldEF0dHJpYnV0ZSgnc3Ryb2tlJywgdGhpcy5jb2xvcnMuYWNjZW50KTtcbiAgICAgIH1cbiAgICAgIHRoaXMucGFkLnNldEF0dHJpYnV0ZSgnZmlsbCcsIHRoaXMuY29sb3JzLmFjY2VudCk7XG4gICAgfVxuICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vanNoaW50LWxvYWRlciEuL2xpYi9pbnRlcmZhY2VzL2J1dHRvbi5qcyIsIid1c2Ugc3RyaWN0JztcblxubGV0IHN2ZyA9IHJlcXVpcmUoJy4uL3V0aWwvc3ZnJyk7XG5sZXQgbWF0aCA9IHJlcXVpcmUoJy4uL3V0aWwvbWF0aCcpO1xubGV0IFRvZ2dsZU1vZGVsID0gcmVxdWlyZSgnLi4vbW9kZWxzL3RvZ2dsZScpO1xubGV0IEludGVyZmFjZSA9IHJlcXVpcmUoJy4uL2NvcmUvaW50ZXJmYWNlJyk7XG5cbi8qKlxuQnV0dG9uIFRlbXBsYXRlXG4qL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCdXR0b25UZW1wbGF0ZSBleHRlbmRzIEludGVyZmFjZSB7XG5cbiAgY29uc3RydWN0b3IoYXJncyxvcHRpb25zLGRlZmF1bHRzKSB7XG5cbiAgICBzdXBlcihhcmdzLG9wdGlvbnMsZGVmYXVsdHMpO1xuXG4gICAgdGhpcy5tb2RlID0gdGhpcy5zZXR0aW5ncy5tb2RlIHx8ICdidXR0b24nO1xuXG4gICAgdGhpcy5wb3NpdGlvbiA9IHtcbiAgICAgIHg6IDAsXG4gICAgICB5OiAwXG4gICAgfTtcblxuICAgIHRoaXMuX3N0YXRlID0gbmV3IFRvZ2dsZU1vZGVsKHRoaXMuc2V0dGluZ3Muc3RhdGUpO1xuXG4gIH1cblxuICBidWlsZEludGVyZmFjZSgpIHtcbiAgICB0aGlzLnBhZCA9IHN2Zy5jcmVhdGUoJ2NpcmNsZScpO1xuICAgIHRoaXMucGFkLnNldEF0dHJpYnV0ZSgnZmlsbCcsICcjZDE4Jyk7XG4gICAgdGhpcy5wYWQuc2V0QXR0cmlidXRlKCdzdHJva2UnLCAnI2QxOCcpO1xuICAgIHRoaXMucGFkLnNldEF0dHJpYnV0ZSgnc3Ryb2tlLXdpZHRoJywgNCk7XG5cbiAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5wYWQpO1xuXG4gICAgdGhpcy5pbnRlcmFjdGlvblRhcmdldCA9IHRoaXMucGFkO1xuXG4gICAgdGhpcy5zaXplSW50ZXJmYWNlKCk7XG4gIH1cblxuICBzaXplSW50ZXJmYWNlKCkge1xuICAgIHRoaXMucGFkLnNldEF0dHJpYnV0ZSgnY3gnLHRoaXMud2lkdGgvMik7XG4gICAgdGhpcy5wYWQuc2V0QXR0cmlidXRlKCdjeScsdGhpcy5oZWlnaHQvMik7XG4gICAgdGhpcy5wYWQuc2V0QXR0cmlidXRlKCdyJywgTWF0aC5taW4odGhpcy53aWR0aCx0aGlzLmhlaWdodCkgLyAyIC0gMik7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgaWYgKCF0aGlzLnN0YXRlKSB7XG4gICAgICB0aGlzLnBhZC5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCB0aGlzLmNvbG9ycy5maWxsKTtcbiAgICAgIHRoaXMucGFkLnNldEF0dHJpYnV0ZSgnc3Ryb2tlJywgdGhpcy5jb2xvcnMubWVkaXVtTGlnaHQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBhZC5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCB0aGlzLmNvbG9ycy5hY2NlbnQpO1xuICAgICAgdGhpcy5wYWQuc2V0QXR0cmlidXRlKCdzdHJva2UnLCB0aGlzLmNvbG9ycy5hY2NlbnQpO1xuICAgIH1cbiAgfVxuXG4gIGRvd24ocGFpbnRicnVzaCkge1xuICAgIHN3aXRjaCAodGhpcy5tb2RlKSB7XG4gICAgICBjYXNlICdpbXB1bHNlJzpcbiAgICAgICAgdGhpcy50dXJuT24oKTtcbiAgICAgICAgaWYgKHRoaXMudGltZW91dCkge1xuICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQodGhpcy50dXJuT2ZmLmJpbmQodGhpcyksMzApO1xuICAgIC8vICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx0aGlzLnN0YXRlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdidXR0b24nOlxuICAgICAgICB0aGlzLnR1cm5PbigpO1xuICAgIC8vICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx0aGlzLnN0YXRlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdhZnRlcnRvdWNoJzpcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHtcbiAgICAgICAgICB4OiBtYXRoLmNsaXAodGhpcy5tb3VzZS54IC8gdGhpcy53aWR0aCwwLDEpLFxuICAgICAgICAgIHk6IG1hdGguY2xpcCgxLXRoaXMubW91c2UueSAvIHRoaXMuaGVpZ2h0LDAsMSlcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy50dXJuT24oKTtcbiAgICAvLyAgICB0aGlzLmVtaXQoJ2NoYW5nZScse1xuICAgIC8vICAgICAgc3RhdGU6IHRoaXMuc3RhdGUsXG4gICAgLy8gICAgICB4OiB0aGlzLnBvc2l0aW9uLngsXG4gICAgLy8gICAgICB5OiB0aGlzLnBvc2l0aW9uLnksXG4gICAgLy8gICAgfSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndG9nZ2xlJzpcbiAgICAgICAgdGhpcy5mbGlwKHBhaW50YnJ1c2gpO1xuICAgIC8vICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx0aGlzLnN0YXRlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gIH1cblxuICBiZW5kKG1vdXNlKSB7XG4gICAgaWYgKHRoaXMubW9kZT09PSdhZnRlcnRvdWNoJykge1xuICAgICAgdGhpcy5tb3VzZSA9IG1vdXNlIHx8IHRoaXMubW91c2U7XG4gICAgICB0aGlzLnBvc2l0aW9uID0ge1xuICAgICAgICB4OiBtYXRoLmNsaXAodGhpcy5tb3VzZS54IC8gdGhpcy53aWR0aCwwLDEpLFxuICAgICAgICB5OiBtYXRoLmNsaXAoMSAtIHRoaXMubW91c2UueSAvIHRoaXMuaGVpZ2h0LDAsMSlcbiAgICAgIH07XG4gICAgICB0aGlzLmVtaXQoJ2NoYW5nZScse1xuICAgICAgICBzdGF0ZTogdGhpcy5zdGF0ZSxcbiAgICAgICAgeDogdGhpcy5wb3NpdGlvbi54LFxuICAgICAgICB5OiB0aGlzLnBvc2l0aW9uLnksXG4gICAgICB9KTtcbiAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgfVxuICB9XG5cbiAgdXAoKSB7XG4gICAgc3dpdGNoICh0aGlzLm1vZGUpIHtcbiAgICAgIGNhc2UgJ2J1dHRvbic6XG4gICAgICAgIHRoaXMudHVybk9mZigpO1xuICAgICAgLy8gIHRoaXMuZW1pdCgnY2hhbmdlJyx0aGlzLnN0YXRlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdhZnRlcnRvdWNoJzpcbiAgICAgICAgdGhpcy50dXJuT2ZmKCk7XG4gICAgICAgIHRoaXMucG9zaXRpb24gPSB7XG4gICAgICAgICAgeDogbWF0aC5jbGlwKHRoaXMubW91c2UueCAvIHRoaXMud2lkdGgsMCwxKSxcbiAgICAgICAgICB5OiBtYXRoLmNsaXAoMSAtIHRoaXMubW91c2UueSAvIHRoaXMuaGVpZ2h0LDAsMSlcbiAgICAgICAgfTtcbiAgICAgIC8vICB0aGlzLmVtaXQoJ2NoYW5nZScse1xuICAgICAgLy8gICAgc3RhdGU6IHRoaXMuc3RhdGUsXG4gICAgICAvLyAgICB4OiB0aGlzLnBvc2l0aW9uLngsXG4gICAgICAvLyAgICB5OiB0aGlzLnBvc2l0aW9uLnksXG4gICAgICAvLyAgfSk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIC8qIG92ZXJ3cml0YWJsZSBpbnRlcmFjdGlvbiBoYW5kbGVycyAqL1xuXG4gIGNsaWNrKCkge1xuICAgIHRoaXMuZG93bigpO1xuICB9XG4gIG1vdmUoKSB7XG4gICAgdGhpcy5iZW5kKCk7XG4gIH1cbiAgcmVsZWFzZSgpIHtcbiAgICB0aGlzLnVwKCk7XG4gIH1cblxuICAvKipcbiAgV2hldGhlciB0aGUgYnV0dG9uIGlzIG9uIChwcmVzc2VkKSBvciBvZmYgKG5vdCBwcmVzc2VkKVxuICBAdHlwZSB7Ym9vbGVhbn1cbiAgQGV4YW1wbGUgYnV0dG9uLnN0YXRlID0gdHJ1ZTtcbiAgKi9cbiAgZ2V0IHN0YXRlKCkge1xuICAgIHJldHVybiB0aGlzLl9zdGF0ZS5zdGF0ZTtcbiAgfVxuICBzZXQgc3RhdGUodmFsdWUpIHtcbiAgICB0aGlzLl9zdGF0ZS5mbGlwKHZhbHVlKTtcbiAgICBpZiAodGhpcy5tb2RlPT09J2FmdGVydG91Y2gnKSB7XG4gICAgICB0aGlzLmVtaXQoJ2NoYW5nZScse1xuICAgICAgICBzdGF0ZTogdGhpcy5zdGF0ZSxcbiAgICAgICAgeDogdGhpcy5wb3NpdGlvbi54LFxuICAgICAgICB5OiB0aGlzLnBvc2l0aW9uLnksXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHRoaXMuc3RhdGUpO1xuICAgIH1cbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgLyoqXG4gIENoYW5nZSB0aGUgYnV0dG9uIHRvIGl0cyBhbHRlcm5hdGUgc3RhdGUgKG9mZj0+b24sIG9uPT5vZmYpLCBvciBmbGlwIGl0IHRvIGEgc3BlY2lmaWVkIHN0YXRlLlxuICBAcGFyYW0gdmFsdWUge2Jvb2xlYW59IChPcHRpb25hbCkgU3RhdGUgdG8gZmxpcCB0by5cbiAgQGV4YW1wbGUgYnV0dG9uLmZsaXAoKTtcbiAgKi9cbiAgZmxpcCh2YWx1ZSkge1xuICAgIHRoaXMuX3N0YXRlLmZsaXAodmFsdWUpO1xuICAgIGlmICh0aGlzLm1vZGU9PT0nYWZ0ZXJ0b3VjaCcpIHtcbiAgICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx7XG4gICAgICAgIHN0YXRlOiB0aGlzLnN0YXRlLFxuICAgICAgICB4OiB0aGlzLnBvc2l0aW9uLngsXG4gICAgICAgIHk6IHRoaXMucG9zaXRpb24ueSxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVtaXQoJ2NoYW5nZScsdGhpcy5zdGF0ZSk7XG4gICAgfVxuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICAvKipcbiAgVHVybiB0aGUgYnV0dG9uJ3Mgc3RhdGUgdG8gdHJ1ZS5cbiAgQGV4YW1wbGUgYnV0dG9uLnR1cm5PbigpO1xuICAqL1xuICB0dXJuT24oZW1pdHRpbmcpIHtcbiAgICB0aGlzLl9zdGF0ZS5vbigpO1xuICAgIGlmIChlbWl0dGluZyE9PWZhbHNlKSB7XG4gICAgICBpZiAodGhpcy5tb2RlPT09J2FmdGVydG91Y2gnKSB7XG4gICAgICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx7XG4gICAgICAgICAgc3RhdGU6IHRoaXMuc3RhdGUsXG4gICAgICAgICAgeDogdGhpcy5wb3NpdGlvbi54LFxuICAgICAgICAgIHk6IHRoaXMucG9zaXRpb24ueSxcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmVtaXQoJ2NoYW5nZScsdGhpcy5zdGF0ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICAvKipcbiAgVHVybiB0aGUgYnV0dG9uJ3Mgc3RhdGUgdG8gZmFsc2UuXG4gIEBleGFtcGxlIGJ1dHRvbi50dXJuT2ZmKCk7XG4gICovXG4gIHR1cm5PZmYoZW1pdHRpbmcpIHtcbiAgICB0aGlzLl9zdGF0ZS5vZmYoKTtcbiAgICBpZiAoZW1pdHRpbmchPT1mYWxzZSkge1xuICAgICAgaWYgKHRoaXMubW9kZT09PSdhZnRlcnRvdWNoJykge1xuICAgICAgICB0aGlzLmVtaXQoJ2NoYW5nZScse1xuICAgICAgICAgIHN0YXRlOiB0aGlzLnN0YXRlLFxuICAgICAgICAgIHg6IHRoaXMucG9zaXRpb24ueCxcbiAgICAgICAgICB5OiB0aGlzLnBvc2l0aW9uLnksXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHRoaXMuc3RhdGUpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vanNoaW50LWxvYWRlciEuL2xpYi9jb21wb25lbnRzL2J1dHRvbnRlbXBsYXRlLmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG5sZXQgQnV0dG9uVGVtcGxhdGUgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2J1dHRvbnRlbXBsYXRlJyk7XG5cbi8qKlxuKiBUZXh0QnV0dG9uXG4qXG4qIEBkZXNjcmlwdGlvbiBUZXh0IGJ1dHRvblxuKlxuKiBAZGVtbyA8c3BhbiBuZXh1cy11aT1cInRleHRCdXR0b25cIj48L3NwYW4+XG4qXG4qIEBleGFtcGxlXG4qIHZhciB0ZXh0YnV0dG9uID0gbmV3IE5leHVzLlRleHRCdXR0b24oJyN0YXJnZXQnKVxuKlxuKiBAZXhhbXBsZVxuKiB2YXIgdGV4dGJ1dHRvbiA9IG5ldyBOZXh1cy5UZXh0QnV0dG9uKCcjdGFyZ2V0Jyx7XG4qICAgICAnc2l6ZSc6IFsxNTAsNTBdLFxuKiAgICAgJ3N0YXRlJzogZmFsc2UsXG4qICAgICAndGV4dCc6ICdQbGF5JyxcbiogICAgICdhbHRlcm5hdGVUZXh0JzogJ1N0b3AnXG4qIH0pXG4qXG4qIEBvdXRwdXRcbiogY2hhbmdlXG4qIEZpcmVzIGFueSB0aW1lIHRoZSBpbnRlcmZhY2UncyB2YWx1ZSBjaGFuZ2VzLiA8YnI+XG4qIFRoZSBldmVudCBkYXRhIGlzIGEgPGk+c3RyaW5nPC9pPiBvZiB0aGUgdGV4dCBvbiB0aGUgYnV0dG9uIGF0IHRoZSBtb21lbnQgaXQgd2FzIGNsaWNrZWQuXG4qXG4qIEBvdXRwdXRleGFtcGxlXG4qIHRleHRidXR0b24ub24oJ2NoYW5nZScsZnVuY3Rpb24odikge1xuKiAgIGNvbnNvbGUubG9nKHYpO1xuKiB9KVxuKlxuKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGV4dEJ1dHRvbiBleHRlbmRzIEJ1dHRvblRlbXBsYXRlIHtcblxuICBjb25zdHJ1Y3RvcigpIHtcblxuICAgIGxldCBvcHRpb25zID0gWyd2YWx1ZSddO1xuXG4gICAgbGV0IGRlZmF1bHRzID0ge1xuICAgICAgJ3NpemUnOiBbMTUwLDUwXSxcbiAgICAgICdzdGF0ZSc6IGZhbHNlLFxuICAgICAgJ3RleHQnOiAnUGxheSdcbiAgICB9O1xuXG4gICAgc3VwZXIoYXJndW1lbnRzLG9wdGlvbnMsZGVmYXVsdHMpO1xuXG4gICAgdGhpcy5fdGV4dCA9IHRoaXMuc2V0dGluZ3MudGV4dDtcblxuICAgIGlmKHRoaXMuc2V0dGluZ3MuYWx0ZXJuYXRlKXsgLy9UT0RPOiBSZW1vdmUgdGhpcyBjb25kaXRpb25hbCBpbiBhIGJyZWFraW5nLWNoYW5nZXMgcmVsZWFzZVxuICAgICAgdGhpcy5zZXR0aW5ncy5hbHRlcm5hdGVUZXh0ID0gdGhpcy5zZXR0aW5ncy5hbHRlcm5hdGU7XG4gICAgICBjb25zb2xlLndhcm4oXCInYWx0ZXJuYXRlJyBpbml0aWF0b3IgaXMgZGVwcmVjYXRlZC4gVXNlICdhbHRlcm5hdGVUZXh0JyBpbnN0ZWFkLlwiKTtcbiAgICB9XG4gICAgdGhpcy5fYWx0ZXJuYXRlVGV4dCA9IHRoaXMuc2V0dGluZ3MuYWx0ZXJuYXRlVGV4dDtcbiAgICB0aGlzLm1vZGUgPSAodGhpcy5zZXR0aW5ncy5hbHRlcm5hdGVUZXh0KSA/ICd0b2dnbGUnIDogJ2J1dHRvbic7XG4gICAgdGhpcy5pbml0KCk7XG4gICAgdGhpcy5yZW5kZXIoKTtcblxuICAgIHRoaXMuc3RhdGUgPSB0aGlzLnNldHRpbmdzLnN0YXRlO1xuXG4gIH1cblxuICBidWlsZEZyYW1lKCkge1xuXG4gICAgdGhpcy5lbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5wYXJlbnQuYXBwZW5kQ2hpbGQodGhpcy5lbGVtZW50KTtcblxuICAgIHRoaXMudGV4dEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLnRleHRFbGVtZW50LmlubmVySFRNTCA9IHRoaXMuX3RleHQ7XG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMudGV4dEVsZW1lbnQpO1xuICB9XG5cbiAgYnVpbGRJbnRlcmZhY2UoKSB7XG5cbiAgfVxuXG4gIGNvbG9ySW50ZXJmYWNlKCkge1xuICAgIHRoaXMuZWxlbWVudC5zdHlsZS5jb2xvciA9IHRoaXMuY29sb3JzLmRhcms7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIHNpemVJbnRlcmZhY2UoKSB7XG4gICAgICBsZXQgdGV4dHNpemUgPSB0aGlzLmhlaWdodC8zO1xuICAgICAgbGV0IHRleHRzaXplMiA9ICh0aGlzLndpZHRoIC8gKHRoaXMuX3RleHQubGVuZ3RoICsgMikgKTtcbiAgICAgIHRleHRzaXplID0gTWF0aC5taW4odGV4dHNpemUsdGV4dHNpemUyKTtcbiAgICAgIGlmICh0aGlzLmFsdGVybmF0ZVRleHQpIHtcbiAgICAgICAgbGV0IHRleHRzaXplMyA9ICh0aGlzLndpZHRoIC8gKHRoaXMuYWx0ZXJuYXRlVGV4dC5sZW5ndGggKyAyKSApO1xuICAgICAgICB0ZXh0c2l6ZSA9IE1hdGgubWluKHRleHRzaXplLHRleHRzaXplMyk7XG4gICAgICB9XG4gICAgICBsZXQgc3R5bGVzID0gJ3dpZHRoOiAnICsgdGhpcy53aWR0aCArICdweDsnO1xuICAgICAgc3R5bGVzICs9ICdoZWlnaHQ6ICcgKyB0aGlzLmhlaWdodCArICdweDsnO1xuICAgICAgc3R5bGVzICs9ICdwYWRkaW5nOiAnKyh0aGlzLmhlaWdodC10ZXh0c2l6ZSkvMisncHggMHB4Oyc7XG4gICAgICBzdHlsZXMgKz0gJ2JveC1zaXppbmc6IGJvcmRlci1ib3g7JztcbiAgICAgIHN0eWxlcyArPSAndGV4dC1hbGlnbjogY2VudGVyOyc7XG4gICAgICBzdHlsZXMgKz0gJ2ZvbnQtZmFtaWx5OiBpbmhlcml0Oyc7XG4gICAgICBzdHlsZXMgKz0gJ2ZvbnQtd2VpZ2h0OiA3MDA7JztcbiAgICAgIHN0eWxlcyArPSAnb3BhY2l0eTogMTsnO1xuICAgICAgc3R5bGVzICs9ICdmb250LXNpemU6JyArIHRleHRzaXplICsgJ3B4Oyc7XG4gICAgICB0aGlzLnRleHRFbGVtZW50LnN0eWxlLmNzc1RleHQgPSBzdHlsZXM7XG4gICAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGlmICghdGhpcy5zdGF0ZSkge1xuICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHRoaXMuY29sb3JzLmZpbGw7XG4gICAgICB0aGlzLnRleHRFbGVtZW50LnN0eWxlLmNvbG9yID0gdGhpcy5jb2xvcnMuZGFyaztcbiAgICAgIHRoaXMudGV4dEVsZW1lbnQuaW5uZXJIVE1MID0gdGhpcy5fdGV4dDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHRoaXMuY29sb3JzLmFjY2VudDtcbiAgICAgIHRoaXMudGV4dEVsZW1lbnQuc3R5bGUuY29sb3IgPSB0aGlzLmNvbG9ycy5maWxsO1xuICAgICAgaWYgKHRoaXMuYWx0ZXJuYXRlVGV4dCkge1xuICAgICAgICB0aGlzLnRleHRFbGVtZW50LmlubmVySFRNTCA9IHRoaXMuX2FsdGVybmF0ZVRleHQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnRleHRFbGVtZW50LmlubmVySFRNTCA9IHRoaXMuX3RleHQ7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gIFRoZSB0ZXh0IHRvIGRpc3BsYXkgd2hlbiB0aGUgYnV0dG9uIGlzIGluIGl0cyBcIm9uXCIgc3RhdGUuIElmIHNldCwgdGhpcyBwdXRzIHRoZSBidXR0b24gaW4gXCJ0b2dnbGVcIiBtb2RlLlxuICBAdHlwZSB7U3RyaW5nfVxuICAqL1xuICBnZXQgYWx0ZXJuYXRlVGV4dCgpIHtcbiAgICByZXR1cm4gdGhpcy5fYWx0ZXJuYXRlVGV4dDtcbiAgfVxuXG4gIHNldCBhbHRlcm5hdGVUZXh0KHRleHQpIHtcbiAgICBpZiAodGV4dCkge1xuICAgICAgdGhpcy5tb2RlID0gJ3RvZ2dsZSc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubW9kZSA9ICdidXR0b24nO1xuICAgIH1cbiAgICB0aGlzLl9hbHRlcm5hdGVUZXh0ID0gdGV4dDtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cblxuICAvKipcbiAgVGhlIHRleHQgdG8gZGlzcGxheS4gKElmIC5hbHRlcm5hdGVUZXh0IGV4aXN0cywgdGhlbiB0aGlzIC50ZXh0IHdpbGwgb25seSBiZSBkaXNwbGF5ZWQgd2hlbiB0aGUgYnV0dG9uIGlzIGluIGl0cyBcIm9mZlwiIHN0YXRlLilcbiAgQHR5cGUge1N0cmluZ31cbiAgKi9cbiAgZ2V0IHRleHQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3RleHQ7XG4gIH1cblxuICBzZXQgdGV4dCh0ZXh0KSB7XG4gICAgdGhpcy5fdGV4dCA9IHRleHQ7XG4gICAgdGhpcy5zaXplSW50ZXJmYWNlKCk7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vanNoaW50LWxvYWRlciEuL2xpYi9pbnRlcmZhY2VzL3RleHRidXR0b24uanMiLCIndXNlIHN0cmljdCc7XG5cbi8vbGV0IHN2ZyA9IHJlcXVpcmUoJy4uL3V0aWwvc3ZnJyk7XG5sZXQgSW50ZXJmYWNlID0gcmVxdWlyZSgnLi4vY29yZS9pbnRlcmZhY2UnKTtcbmxldCBCdXR0b24gPSByZXF1aXJlKCcuLi9pbnRlcmZhY2VzL2J1dHRvbicpO1xuXG4vKipcbiAqIFJhZGlvQnV0dG9uXG4gKlxuICogQGRlc2NyaXB0aW9uIEFuIGFycmF5IG9mIGJ1dHRvbnMuIEJ5IGRlZmF1bHQsIHNlbGVjdGluZyBvbmUgYnV0dG9uIHdpbGwgZGVzZWxlY3QgYWxsIG90aGVyIGJ1dHRvbnMsIGJ1dCB0aGlzIGNhbiBiZSBjdXN0b21pemVkIHVzaW5nIHRoZSBBUEkgYmVsb3cuXG4gKlxuICogQGRlbW8gPGRpdiBuZXh1cy11aT1cIlJhZGlvQnV0dG9uXCI+PC9kaXY+XG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciByYWRpb2J1dHRvbiA9IG5ldyBOZXh1cy5SYWRpb0J1dHRvbignI3RhcmdldCcpXG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciByYWRpb2J1dHRvbiA9IG5ldyBOZXh1cy5SYWRpb0J1dHRvbignI3RhcmdldCcse1xuICogICAnc2l6ZSc6IFsxMjAsMjVdLFxuICogICAnbnVtYmVyT2ZCdXR0b25zJzogNCxcbiAqICAgJ2FjdGl2ZSc6IC0xXG4gKiB9KVxuICpcbiAqIEBvdXRwdXRcbiAqIGNoYW5nZVxuICogRmlyZXMgYW55IHRpbWUgdGhlIGludGVyZmFjZSdzIHZhbHVlIGNoYW5nZXMuIDxicj5cbiAqIFRoZSBldmVudCBkYXRhIGFuIDxpPmludGVnZXI8L2k+LCB0aGUgaW5kZXggb2YgdGhlIGJ1dHRvbiB0aGF0IGlzIGN1cnJlbnRseSBvbi4gSWYgbm8gYnV0dG9uIGlzIHNlbGVjdGVkLCB0aGUgdmFsdWUgd2lsbCBiZSAtMS5cbiAqXG4gKiBAb3V0cHV0ZXhhbXBsZVxuICogcmFkaW9idXR0b24ub24oJ2NoYW5nZScsZnVuY3Rpb24odikge1xuICogICBjb25zb2xlLmxvZyh2KTtcbiAqIH0pXG4gKlxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJhZGlvQnV0dG9uIGV4dGVuZHMgSW50ZXJmYWNlIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgbGV0IG9wdGlvbnMgPSBbJ3ZhbHVlJ107XG5cbiAgICBsZXQgZGVmYXVsdHMgPSB7XG4gICAgICBzaXplOiBbMTIwLCAyNV0sXG4gICAgICBudW1iZXJPZkJ1dHRvbnM6IDQsXG4gICAgICBhY3RpdmU6IC0xXG4gICAgfTtcblxuICAgIHN1cGVyKGFyZ3VtZW50cywgb3B0aW9ucywgZGVmYXVsdHMpO1xuXG4gICAgdGhpcy5idXR0b25zID0gW107XG4gICAgdGhpcy5fbnVtYmVyT2ZCdXR0b25zID0gdGhpcy5zZXR0aW5ncy5udW1iZXJPZkJ1dHRvbnM7XG4gICAgdGhpcy5hY3RpdmUgPSB0aGlzLnNldHRpbmdzLmFjdGl2ZTtcblxuICAgIHRoaXMuaW5pdCgpO1xuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICBidWlsZEZyYW1lKCkge1xuICAgIHRoaXMuZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMucGFyZW50LmFwcGVuZENoaWxkKHRoaXMuZWxlbWVudCk7XG4gIH1cblxuICBidWlsZEludGVyZmFjZSgpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX251bWJlck9mQnV0dG9uczsgaSsrKSB7XG4gICAgICBsZXQgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXG4gICAgICBsZXQgYnV0dG9uID0gbmV3IEJ1dHRvbihcbiAgICAgICAgY29udGFpbmVyLFxuICAgICAgICB7XG4gICAgICAgICAgbW9kZTogJ3RvZ2dsZScsXG4gICAgICAgICAgY29tcG9uZW50OiB0cnVlXG4gICAgICAgIH0sXG4gICAgICAgIHRoaXMudXBkYXRlLmJpbmQodGhpcywgaSlcbiAgICAgICk7XG5cbiAgICAgIHRoaXMuYnV0dG9ucy5wdXNoKGJ1dHRvbik7XG4gICAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcbiAgICB9XG4gIH1cblxuICBzaXplSW50ZXJmYWNlKCkge1xuICAgIGxldCBvcmllbnRhdGlvbjtcbiAgICBpZiAodGhpcy53aWR0aCA+IHRoaXMuaGVpZ2h0KSB7XG4gICAgICBvcmllbnRhdGlvbiA9ICdob3Jpem9udGFsJztcbiAgICB9IGVsc2Uge1xuICAgICAgb3JpZW50YXRpb24gPSAndmVydGljYWwnO1xuICAgIH1cblxuICAgIGxldCBidXR0b25XaWR0aCA9XG4gICAgICB0aGlzLndpZHRoIC8gKG9yaWVudGF0aW9uID09PSAndmVydGljYWwnID8gMSA6IHRoaXMuX251bWJlck9mQnV0dG9ucyk7XG4gICAgbGV0IGJ1dHRvbkhlaWdodCA9XG4gICAgICB0aGlzLmhlaWdodCAvIChvcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJyA/IHRoaXMuX251bWJlck9mQnV0dG9ucyA6IDEpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9udW1iZXJPZkJ1dHRvbnM7IGkrKykge1xuICAgICAgdGhpcy5idXR0b25zW2ldLnJlc2l6ZShidXR0b25XaWR0aCwgYnV0dG9uSGVpZ2h0KTtcbiAgICB9XG4gIH1cblxuICBjb2xvckludGVyZmFjZSgpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX251bWJlck9mQnV0dG9uczsgaSsrKSB7XG4gICAgICB0aGlzLmJ1dHRvbnNbaV0uY29sb3JzID0gdGhpcy5jb2xvcnM7XG4gICAgICB0aGlzLmJ1dHRvbnNbaV0ucmVuZGVyKCk7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlKGluZGV4KSB7XG4gICAgaWYgKHRoaXMuYnV0dG9uc1tpbmRleF0uc3RhdGUpIHtcbiAgICAgIHRoaXMuc2VsZWN0KGluZGV4KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kZXNlbGVjdCgpO1xuICAgIH1cbiAgICAvLyAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYnV0dG9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGkgPT09IHRoaXMuYWN0aXZlKSB7XG4gICAgICAgIHRoaXMuYnV0dG9uc1tpXS50dXJuT24oZmFsc2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5idXR0b25zW2ldLnR1cm5PZmYoZmFsc2UpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICBTZWxlY3Qgb25lIGJ1dHRvbiBhbmQgZGVzZWxlY3QgYWxsIG90aGVyIGJ1dHRvbnMuXG4gIEBwYXJhbSBpbmRleCB7bnVtYmVyfSBUaGUgaW5kZXggb2YgdGhlIGJ1dHRvbiB0byBzZWxlY3RcbiAgKi9cbiAgc2VsZWN0KGluZGV4KSB7XG4gICAgaWYgKGluZGV4ID49IDAgJiYgaW5kZXggPCB0aGlzLmJ1dHRvbnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLmFjdGl2ZSA9IGluZGV4O1xuICAgICAgdGhpcy5lbWl0KCdjaGFuZ2UnLCB0aGlzLmFjdGl2ZSk7XG4gICAgICB0aGlzLnJlbmRlcigpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICBEZXNlbGVjdCBhbGwgYnV0dG9ucy5cbiAgKi9cbiAgZGVzZWxlY3QoKSB7XG4gICAgdGhpcy5hY3RpdmUgPSAtMTtcbiAgICB0aGlzLmVtaXQoJ2NoYW5nZScsIHRoaXMuYWN0aXZlKTtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgZ2V0IG51bWJlck9mQnV0dG9ucygpIHtcbiAgICByZXR1cm4gdGhpcy5fbnVtYmVyT2ZCdXR0b25zO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBob3cgbWFueSBidXR0b25zIGFyZSBpbiB0aGUgaW50ZXJmYWNlXG4gICAqIEBwYXJhbSAge251bWJlcn0gYnV0dG9ucyBIb3cgbWFueSBidXR0b25zIGFyZSBpbiB0aGUgaW50ZXJmYWNlXG4gICAqL1xuICBzZXQgbnVtYmVyT2ZCdXR0b25zKGJ1dHRvbnMpIHtcbiAgICB0aGlzLl9udW1iZXJPZkJ1dHRvbnMgPSBidXR0b25zO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5idXR0b25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLmJ1dHRvbnNbaV0uZGVzdHJveSgpO1xuICAgIH1cbiAgICB0aGlzLmJ1dHRvbnMgPSBbXTtcbiAgICAvLyAgZm9yIChsZXQgaT0wO2k8dGhpcy5idXR0b25zLmxlbmd0aDtpKyspIHtcbiAgICAvLyAgICB0aGlzLmJ1dHRvbnNbaV0uZGVzdHJveSgpO1xuICAgIC8vICB9XG4gICAgdGhpcy5lbXB0eSgpO1xuICAgIHRoaXMuYnVpbGRJbnRlcmZhY2UoKTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9qc2hpbnQtbG9hZGVyIS4vbGliL2ludGVyZmFjZXMvcmFkaW9idXR0b24uanMiLCIndXNlIHN0cmljdCc7XG5cbmxldCBJbnRlcmZhY2UgPSByZXF1aXJlKCcuLi9jb3JlL2ludGVyZmFjZScpO1xubGV0IFN0ZXAgPSByZXF1aXJlKCcuLi9tb2RlbHMvc3RlcCcpO1xubGV0IG1hdGggPSByZXF1aXJlKCcuLi91dGlsL21hdGgnKTtcbmxldCB1dGlsID0gcmVxdWlyZSgnLi4vdXRpbC91dGlsJyk7XG5cbi8qKlxuKiBOdW1iZXJcbipcbiogQGRlc2NyaXB0aW9uIE51bWJlciBpbnRlcmZhY2Ugd2hpY2ggaXMgY29udHJvbGxhYmxlIGJ5IGRyYWdnaW5nIG9yIHR5cGluZy5cbipcbiogQGRlbW8gPHNwYW4gbmV4dXMtdWk9XCJudW1iZXJcIj48L3NwYW4+XG4qXG4qIEBleGFtcGxlXG4qIHZhciBudW1iZXIgPSBuZXcgTmV4dXMuTnVtYmVyKCcjdGFyZ2V0JylcbipcbiogQGV4YW1wbGVcbiogdmFyIG51bWJlciA9IG5ldyBOZXh1cy5OdW1iZXIoJyN0YXJnZXQnLHtcbiogICAnc2l6ZSc6IFs2MCwzMF0sXG4qICAgJ3ZhbHVlJzogMCxcbiogICAnbWluJzogMCxcbiogICAnbWF4JzogMjAwMDAsXG4qICAgJ3N0ZXAnOiAxXG4qIH0pXG4qXG4qIEBvdXRwdXRcbiogY2hhbmdlXG4qIEZpcmVzIGFueSB0aW1lIHRoZSBpbnRlcmZhY2UncyB2YWx1ZSBjaGFuZ2VzLiA8YnI+XG4qIFRoZSBldmVudCBkYXRhIGlzIHRoZSBudW1iZXIgdmFsdWUgb2YgdGhlIGludGVyZmFjZS5cbipcbiogQG91dHB1dGV4YW1wbGVcbiogbnVtYmVyLm9uKCdjaGFuZ2UnLGZ1bmN0aW9uKHYpIHtcbiogICBjb25zb2xlLmxvZyh2KTtcbiogfSlcbipcbipcbiovXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTnVtYmVyIGV4dGVuZHMgSW50ZXJmYWNlIHtcblxuICBjb25zdHJ1Y3RvcigpIHtcblxuICAgIGxldCBvcHRpb25zID0gWyd2YWx1ZSddO1xuXG4gICAgbGV0IGRlZmF1bHRzID0ge1xuICAgICAgJ3NpemUnOiBbNjAsMzBdLFxuICAgICAgJ3ZhbHVlJzogMCxcbiAgICAgICdtaW4nOiAwLFxuICAgICAgJ21heCc6IDIwMDAwLFxuICAgICAgJ3N0ZXAnOiAxXG4gICAgfTtcblxuICAgIHN1cGVyKGFyZ3VtZW50cyxvcHRpb25zLGRlZmF1bHRzKTtcblxuICAgIHRoaXMuX3ZhbHVlID0gbmV3IFN0ZXAodGhpcy5zZXR0aW5ncy5taW4sdGhpcy5zZXR0aW5ncy5tYXgsdGhpcy5zZXR0aW5ncy5zdGVwLHRoaXMuc2V0dGluZ3MudmFsdWUpO1xuXG4gICAgLypcbiAgICBEZWZhdWx0OiAyLiBIb3cgbWFueSBkZWNpbWFsIHBsYWNlcyB0byBjbGlwIHRoZSBudW1iZXIncyB2aXN1YWwgcmVuZGVyaW5nIHRvLiBUaGlzIGRvZXMgbm90IGFmZmVjdCBudW1iZXIncyBhY3R1YWwgdmFsdWUgb3V0cHV0IC0tIGZvciB0aGF0LCBzZXQgdGhlIHN0ZXAgcHJvcGVydHkgdG8gLjAxLCAuMSwgb3IgMS5cbiAgICBAdHlwZSB7bnVtYmVyfVxuICAgIEBleGFtcGxlIG51bWJlci5kZWNpbWFsUGxhY2VzID0gMjtcbiAgICAqL1xuICAgIHRoaXMuZGVjaW1hbFBsYWNlcyA9IDI7XG4gICAgdGhpcy5hY3R1YWwgPSAwO1xuXG4gICAgdGhpcy5tYXggPSB0aGlzLl92YWx1ZS5tYXg7XG5cbiAgICB0aGlzLm1pbiA9IHRoaXMuX3ZhbHVlLm1pbjtcblxuICAgIHRoaXMuc3RlcCA9IHRoaXMuX3ZhbHVlLnN0ZXA7XG5cbiAgICB0aGlzLmluaXQoKTtcbiAgICB0aGlzLnJlbmRlcigpO1xuXG4gIH1cblxuICBidWlsZEZyYW1lKCkge1xuICAgIHRoaXMuZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgdGhpcy5lbGVtZW50LnR5cGUgPSAndGV4dCc7XG5cbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSB0aGlzLmNvbG9ycy5maWxsO1xuICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLmNvbG9yID0gdGhpcy5jb2xvcnMuZGFyaztcbiAgICAgIGlmICh0aGlzLmVsZW1lbnQudmFsdWUgIT09IHRoaXMudmFsdWUpIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHBhcnNlRmxvYXQodGhpcy5lbGVtZW50LnZhbHVlKTtcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgIH1cbiAgICB9LmJpbmQodGhpcykpO1xuXG4gICAgdXRpbC5zZXRJbnB1dEZpbHRlcih0aGlzLmVsZW1lbnQsIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICByZXR1cm4gL14tP1xcZCpcXC4/XFxkKiQvLnRlc3QodmFsdWUpOyB9KTtcblxuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgIGlmIChlLndoaWNoPT09MTMpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50LmJsdXIoKTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMuZWxlbWVudC52YWx1ZTtcbiAgICAgICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHRoaXMudmFsdWUpO1xuICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgfVxuICAgIH0uYmluZCh0aGlzKSwgdHJ1ZSk7XG5cbiAgICB0aGlzLnBhcmVudC5hcHBlbmRDaGlsZCh0aGlzLmVsZW1lbnQpO1xuXG4gIH1cblxuICBzaXplSW50ZXJmYWNlKCkge1xuXG4gICAgdGhpcy5fbWluRGltZW5zaW9uID0gTWF0aC5taW4odGhpcy53aWR0aCx0aGlzLmhlaWdodCk7XG5cbiAgICBsZXQgc3R5bGVzID0gJ3dpZHRoOiAnICsgdGhpcy53aWR0aCArICdweDsnO1xuICAgIHN0eWxlcyArPSAnaGVpZ2h0OiAnICsgdGhpcy5oZWlnaHQgKyAncHg7JztcbiAgICBzdHlsZXMgKz0gJ2JhY2tncm91bmQtY29sb3I6ICNlN2U3ZTc7JztcbiAgICBzdHlsZXMgKz0gJ2NvbG9yOiAjMzMzOyc7XG4gICAgc3R5bGVzICs9ICdmb250LWZhbWlseTogYXJpYWw7JztcbiAgICBzdHlsZXMgKz0gJ2ZvbnQtd2VpZ2h0OiA1MDA7JztcbiAgICBzdHlsZXMgKz0gJ2ZvbnQtc2l6ZTonICsgdGhpcy5fbWluRGltZW5zaW9uLzIgKyAncHg7JztcbiAgLy8gIHN0eWxlcyArPSAnaGlnaGxpZ2h0OiAjZDE4Oyc7XG4gICAgc3R5bGVzICs9ICdib3JkZXI6IG5vbmU7JztcbiAgICBzdHlsZXMgKz0gJ291dGxpbmU6IG5vbmU7JztcbiAgICBzdHlsZXMgKz0gJ3BhZGRpbmc6ICcrdGhpcy5fbWluRGltZW5zaW9uLzQrJ3B4ICcrdGhpcy5fbWluRGltZW5zaW9uLzQrJ3B4Oyc7XG4gICAgc3R5bGVzICs9ICdib3gtc2l6aW5nOiBib3JkZXItYm94Oyc7XG4gICAgc3R5bGVzICs9ICd1c2VyU2VsZWN0OiB0ZXh0Oyc7XG4gICAgc3R5bGVzICs9ICdtb3pVc2VyU2VsZWN0OiB0ZXh0Oyc7XG4gICAgc3R5bGVzICs9ICd3ZWJraXRVc2VyU2VsZWN0OiB0ZXh0Oyc7XG4gICAgdGhpcy5lbGVtZW50LnN0eWxlLmNzc1RleHQgKz0gc3R5bGVzO1xuXG4gICAgLy8gdG8gYWRkIGV2ZW50dWFsbHlcbiAgICAvLyB2YXIgY3NzID0gJyMnK3RoaXMuZWxlbWVudElEKyc6OnNlbGVjdGlvbnsgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQgfSc7XG5cbiAgICB0aGlzLmVsZW1lbnQudmFsdWUgPSB0aGlzLnZhbHVlO1xuXG4gIH1cblxuICBjb2xvckludGVyZmFjZSgpIHtcbiAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSB0aGlzLmNvbG9ycy5maWxsO1xuICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLmNvbG9yID0gdGhpcy5jb2xvcnMuZGFyaztcbiAgfVxuXG4gIHJlbmRlcigpIHtcblxuICAgIHRoaXMuZWxlbWVudC52YWx1ZSA9IG1hdGgucHJ1bmUodGhpcy52YWx1ZSx0aGlzLmRlY2ltYWxQbGFjZXMpO1xuXG4gIH1cblxuICBjbGljaygpIHtcbiAgICB0aGlzLmhhc01vdmVkID0gZmFsc2U7XG4gICAgdGhpcy5lbGVtZW50LnJlYWRPbmx5ID0gdHJ1ZTtcblx0ICB0aGlzLmFjdHVhbCA9IHRoaXMudmFsdWU7XG4gICAgdGhpcy5pbml0aWFsID0geyB5OiB0aGlzLm1vdXNlLnkgfTtcbiAgICB0aGlzLmNoYW5nZUZhY3RvciA9IG1hdGguaW52ZXJ0KCB0aGlzLm1vdXNlLnggLyB0aGlzLndpZHRoICk7XG4gIH1cblxuICBtb3ZlKCkge1xuICAgIHRoaXMuaGFzTW92ZWQgPSB0cnVlO1xuICAgIGlmICh0aGlzLmNsaWNrZWQpIHtcblxuICAgICAgbGV0IG5ld3ZhbHVlID0gdGhpcy5hY3R1YWwgLSAodGhpcy5tb3VzZS55IC0gdGhpcy5pbml0aWFsLnkpICogKCBtYXRoLmNsaXAoIHRoaXMubWF4LXRoaXMubWluLCAwLCAxMDAwICkgLyAyMDAgKSAqIE1hdGgucG93KHRoaXMuY2hhbmdlRmFjdG9yLDIpO1xuICAgICAgdGhpcy52YWx1ZSA9IG5ld3ZhbHVlO1xuXG4gIFx0XHR0aGlzLnJlbmRlcigpO1xuICAgICAgaWYgKHRoaXMuX3ZhbHVlLmNoYW5nZWQpIHtcbiAgICAgICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHRoaXMudmFsdWUpO1xuICAgICAgfVxuXG4gIFx0fVxuICB9XG5cbiAgcmVsZWFzZSgpIHtcbiAgICBpZiAoIXRoaXMuaGFzTW92ZWQpIHtcbiAgICAgIHRoaXMuZWxlbWVudC5yZWFkT25seSA9IGZhbHNlO1xuICBcdFx0dGhpcy5lbGVtZW50LmZvY3VzKCk7XG4gIFx0XHR0aGlzLmVsZW1lbnQuc2V0U2VsZWN0aW9uUmFuZ2UoMCwgdGhpcy5lbGVtZW50LnZhbHVlLmxlbmd0aCk7XG4gIFx0XHR0aGlzLmVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gdGhpcy5jb2xvcnMuYWNjZW50O1xuICBcdFx0dGhpcy5lbGVtZW50LnN0eWxlLmNvbG9yID0gdGhpcy5jb2xvcnMubGlnaHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRvY3VtZW50LmJvZHkuZm9jdXMoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgQ29ubmVjdCB0aGlzIG51bWJlciBpbnRlcmZhY2UgdG8gYSBkaWFsIG9yIHNsaWRlclxuICBAcGFyYW0ge0ludGVyZmFjZX0gZWxlbWVudCBFbGVtZW50IHRvIGNvbm5lY3QgdG8uXG4gIEBleGFtcGxlIG51bWJlci5saW5rKHNsaWRlcilcbiAgKi9cbiAgbGluayhkZXN0aW5hdGlvbikge1xuICAgIHRoaXMubWluID0gZGVzdGluYXRpb24ubWluO1xuICAgIHRoaXMubWF4ID0gZGVzdGluYXRpb24ubWF4O1xuICAgIHRoaXMuc3RlcCA9IGRlc3RpbmF0aW9uLnN0ZXA7XG4gICAgZGVzdGluYXRpb24ub24oJ2NoYW5nZScsKHYpID0+IHtcbiAgICAgIHRoaXMucGFzc2l2ZVVwZGF0ZSh2KTtcbiAgICB9KTtcbiAgICB0aGlzLm9uKCdjaGFuZ2UnLCh2KSA9PiB7XG4gICAgICBkZXN0aW5hdGlvbi52YWx1ZSA9IHY7XG4gICAgfSk7XG4gICAgdGhpcy52YWx1ZSA9IGRlc3RpbmF0aW9uLnZhbHVlO1xuICAvKiAgcmV0dXJuIHtcbiAgICAgIGxpc3RlbmVyMTogbGlzdGVuZXIxLFxuICAgICAgbGlzdGVuZXIyOiBsaXN0ZW5lcjIsXG4gICAgICBkZXN0cm95OiAoKSA9PiB7XG4gICAgICAgIGxpc3RlbmVyMS5yZW1vdmUoKSAob3Igc2ltaWxhcilcbiAgICAgICAgbGlzdGVuZXIyLnJlbW92ZSgpIChvciBzaW1pbGFyKVxuICAgICAgfVxuICAgIH0gKi9cbiAgfVxuXG4gIHBhc3NpdmVVcGRhdGUodikge1xuICAgIHRoaXMuX3ZhbHVlLnVwZGF0ZSh2KTtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgLyoqXG4gIFRoZSBpbnRlcmZhY2UncyBjdXJyZW50IHZhbHVlLiBJZiBzZXQgbWFudWFsbHksIHdpbGwgdXBkYXRlIHRoZSBpbnRlcmZhY2UgYW5kIHRyaWdnZXIgdGhlIG91dHB1dCBldmVudC5cbiAgQHR5cGUge251bWJlcn1cbiAgQGV4YW1wbGUgbnVtYmVyLnZhbHVlID0gMTA7XG4gICovXG4gIGdldCB2YWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWUudmFsdWU7XG4gIH1cbiAgc2V0IHZhbHVlKHYpIHtcbiAgICB0aGlzLl92YWx1ZS51cGRhdGUodik7XG4gICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHRoaXMudmFsdWUpO1xuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICAvKipcbiAgTG93ZXIgbGltaXQgb2YgdGhlIG51bWJlcidzIG91dHB1dCByYW5nZVxuICBAdHlwZSB7bnVtYmVyfVxuICBAZXhhbXBsZSBudW1iZXIubWluID0gMTAwMDtcbiAgKi9cbiAgZ2V0IG1pbigpIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWUubWluO1xuICB9XG4gIHNldCBtaW4odikge1xuICAgIHRoaXMuX3ZhbHVlLm1pbiA9IHY7XG4gIH1cblxuICAvKipcbiAgVXBwZXIgbGltaXQgb2YgdGhlIG51bWJlcidzIG91dHB1dCByYW5nZVxuICBAdHlwZSB7bnVtYmVyfVxuICBAZXhhbXBsZSBudW1iZXIubWF4ID0gMTAwMDtcbiAgKi9cbiAgZ2V0IG1heCgpIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWUubWF4O1xuICB9XG4gIHNldCBtYXgodikge1xuICAgIHRoaXMuX3ZhbHVlLm1heCA9IHY7XG4gIH1cblxuICAvKipcbiAgVGhlIGluY3JlbWVudCB0aGF0IHRoZSBudW1iZXIncyB2YWx1ZSBjaGFuZ2VzIGJ5LlxuICBAdHlwZSB7bnVtYmVyfVxuICBAZXhhbXBsZSBudW1iZXIuc3RlcCA9IDU7XG4gICovXG4gIGdldCBzdGVwKCkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZS5zdGVwO1xuICB9XG4gIHNldCBzdGVwKHYpIHtcbiAgICB0aGlzLl92YWx1ZS5zdGVwID0gdjtcbiAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2pzaGludC1sb2FkZXIhLi9saWIvaW50ZXJmYWNlcy9udW1iZXIuanMiLCIndXNlIHN0cmljdCc7XG5cbmxldCBJbnRlcmZhY2UgPSByZXF1aXJlKCcuLi9jb3JlL2ludGVyZmFjZScpO1xuXG4vKipcbiogU2VsZWN0XG4qXG4qIEBkZXNjcmlwdGlvbiBEcm9wZG93biBtZW51XG4qXG4qIEBkZW1vIDxzcGFuIG5leHVzLXVpPVwic2VsZWN0XCI+PC9zcGFuPlxuKlxuKiBAZXhhbXBsZVxuKiB2YXIgc2VsZWN0ID0gbmV3IE5leHVzLlNlbGVjdCgnI3RhcmdldCcpXG4qXG4qIEBleGFtcGxlXG4qIHZhciBzZWxlY3QgPSBuZXcgTmV4dXMuU2VsZWN0KCcjdGFyZ2V0Jyx7XG4qICAgJ3NpemUnOiBbMTAwLDMwXSxcbiogICAnb3B0aW9ucyc6IFsnZGVmYXVsdCcsJ29wdGlvbnMnXVxuKiB9KVxuKlxuKiBAb3V0cHV0XG4qIGNoYW5nZVxuKiBGaXJlcyBhbnkgdGltZSB0aGUgaW50ZXJmYWNlJ3MgdmFsdWUgY2hhbmdlcy4gPGJyPlxuKiBUaGUgZXZlbnQgZGF0YSBpcyBhbiBvYmplY3QgY29udGFpbmluZyB0aGUgdGV4dCB2YWx1ZSBvZiB0aGUgc2VsZWN0ZWQgb3B0aW9uLCBhcyB3ZWxsIGFzIHRoZSBudW1lcmljIGluZGV4IG9mIHRoZSBzZWxlY3Rpb24uXG4qXG4qIEBvdXRwdXRleGFtcGxlXG4qIHNlbGVjdC5vbignY2hhbmdlJyxmdW5jdGlvbih2KSB7XG4qICAgY29uc29sZS5sb2codik7XG4qIH0pXG4qXG4qXG4qL1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlbGVjdCBleHRlbmRzIEludGVyZmFjZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7XG5cbiAgICBsZXQgb3B0aW9ucyA9IFsndmFsdWUnXTtcblxuICAgIGxldCBkZWZhdWx0cyA9IHtcbiAgICAgICAnc2l6ZSc6IFsxMDAsMzBdLFxuICAgICAgICdvcHRpb25zJzogWydkZWZhdWx0Jywnb3B0aW9ucyddXG4gICAgfTtcblxuICAgIHN1cGVyKGFyZ3VtZW50cyxvcHRpb25zLGRlZmF1bHRzKTtcblxuICAgIHRoaXMuX3NlbGVjdGVkSW5kZXggPSAtMTtcbiAgICB0aGlzLl92YWx1ZSA9IGZhbHNlO1xuXG4gICAgdGhpcy5fb3B0aW9ucyA9IHRoaXMuc2V0dGluZ3Mub3B0aW9ucztcblxuICAgIHRoaXMuaW5pdCgpO1xuICAgIHRoaXMucmVuZGVyKCk7XG5cbiAgfVxuXG4gIGJ1aWxkRnJhbWUoKSB7XG4gICAgdGhpcy5lbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2VsZWN0Jyk7XG4gICAgdGhpcy5lbGVtZW50LnN0eWxlLmZvbnRTaXplID0gdGhpcy5oZWlnaHQvMisncHgnO1xuICAgIHRoaXMuZWxlbWVudC5zdHlsZS5vdXRsaW5lID0gJ25vbmUnO1xuICAgIHRoaXMuZWxlbWVudC5zdHlsZS5oaWdobGlnaHQgPSAnbm9uZSc7XG4gICAgdGhpcy5lbGVtZW50LnN0eWxlLndpZHRoID0gdGhpcy53aWR0aCsncHgnO1xuICAgIHRoaXMuZWxlbWVudC5zdHlsZS5oZWlnaHQgPSB0aGlzLmhlaWdodCsncHgnO1xuXG4gICAgdGhpcy5ib3VuZFJlbmRlciA9IHRoaXMucmVuZGVyLmJpbmQodGhpcyk7XG5cbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5ib3VuZFJlbmRlcik7XG5cbiAgICB0aGlzLnBhcmVudC5hcHBlbmRDaGlsZCh0aGlzLmVsZW1lbnQpO1xuXG4gIH1cblxuICBhdHRhY2hMaXN0ZW5lcnMoKSB7XG5cbiAgfVxuXG4gIGJ1aWxkSW50ZXJmYWNlKCkge1xuXG4gICAgdGhpcy5kZWZpbmVPcHRpb25zKCk7XG5cbiAgfVxuXG4gIGNvbG9ySW50ZXJmYWNlKCkge1xuICAgIHRoaXMuZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSB0aGlzLmNvbG9ycy5maWxsO1xuICAgIHRoaXMuZWxlbWVudC5zdHlsZS5jb2xvciA9IHRoaXMuY29sb3JzLmRhcms7XG4gICAgdGhpcy5lbGVtZW50LnN0eWxlLmJvcmRlciA9ICdzb2xpZCAwcHggJyt0aGlzLmNvbG9ycy5tZWRpdW1MaWdodDtcbiAgfVxuXG4gIHJlbmRlcigpIHtcblxuICAgIHRoaXMuX3ZhbHVlID0gdGhpcy5lbGVtZW50Lm9wdGlvbnNbdGhpcy5lbGVtZW50LnNlbGVjdGVkSW5kZXhdLnRleHQ7XG4gICAgdGhpcy5fc2VsZWN0ZWRJbmRleCA9IHRoaXMuZWxlbWVudC5zZWxlY3RlZEluZGV4O1xuICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx7XG4gICAgICB2YWx1ZTogdGhpcy5fdmFsdWUsXG4gICAgICBpbmRleDogdGhpcy5fc2VsZWN0ZWRJbmRleFxuICAgIH0pO1xuXG4gIH1cblxuICBjbGljaygpIHtcblxuICB9XG5cbiAgbW92ZSgpIHtcblxuICB9XG5cbiAgcmVsZWFzZSgpIHtcblxuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGUgbGlzdCBvZiBvcHRpb25zLiBUaGlzIHJlbW92ZXMgYWxsIGV4aXN0aW5nIG9wdGlvbnMgYW5kIGNyZWF0ZXMgYSBuZXcgbGlzdCBvZiBvcHRpb25zLlxuICAgKiBAcGFyYW0gIHthcnJheX0gb3B0aW9ucyBOZXcgYXJyYXkgb2Ygb3B0aW9uc1xuICAgKi9cblxuICBkZWZpbmVPcHRpb25zKG9wdGlvbnMpIHtcblxuICAvKiAgZnVuY3Rpb24gcmVtb3ZlT3B0aW9ucyhzZWxlY3Rib3gpXG4gICAge1xuICAgICAgICB2YXIgaTtcbiAgICAgICAgZm9yKGkgPSBzZWxlY3Rib3gub3B0aW9ucy5sZW5ndGggLSAxIDsgaSA+PSAwIDsgaS0tKVxuICAgICAgICB7XG4gICAgICAgICAgICBzZWxlY3Rib3gucmVtb3ZlKGkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vdXNpbmcgdGhlIGZ1bmN0aW9uOlxuICAgIHJlbW92ZU9wdGlvbnMoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJteVNlbGVjdE9iamVjdFwiKSk7ICovXG5cblxuICAgIGlmIChvcHRpb25zKSB7XG4gICAgICB0aGlzLl9vcHRpb25zID0gb3B0aW9ucztcbiAgICB9XG5cbiAgICBmb3IobGV0IGk9dGhpcy5lbGVtZW50Lm9wdGlvbnMubGVuZ3RoLTE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICB0aGlzLmVsZW1lbnQucmVtb3ZlKGkpO1xuICAgIH1cblxuICAgIGZvcihsZXQgaT0wO2k8dGhpcy5fb3B0aW9ucy5sZW5ndGg7aSsrKSB7XG4gICAgICB0aGlzLmVsZW1lbnQub3B0aW9ucy5hZGQobmV3IE9wdGlvbih0aGlzLl9vcHRpb25zW2ldLCBpKSk7XG4gICAgfVxuXG4gIH1cblxuXG4gIC8qKlxuICBUaGUgdGV4dCBvZiB0aGUgb3B0aW9uIHRoYXQgaXMgY3VycmVudGx5IHNlbGVjdGVkLiBJZiBzZXQsIHdpbGwgdXBkYXRlIHRoZSBpbnRlcmZhY2UgYW5kIHRyaWdnZXIgdGhlIG91dHB1dCBldmVudC5cbiAgQHR5cGUge1N0cmluZ31cbiAgQGV4YW1wbGUgc2VsZWN0LnZhbHVlID0gXCJzYXd0b290aFwiO1xuICAqL1xuICBnZXQgdmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICB9XG4gIHNldCB2YWx1ZSh2KSB7XG4gICAgdGhpcy5fdmFsdWUgPSB2O1xuICAgIGZvcihsZXQgaT0wO2k8dGhpcy5lbGVtZW50Lm9wdGlvbnMubGVuZ3RoO2krKykge1xuICAgICAgaWYgKHYgPT09IHRoaXMuZWxlbWVudC5vcHRpb25zW2ldLnRleHQpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gaTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cblxuICAvKipcbiAgVGhlIG51bWVyaWMgaW5kZXggb2YgdGhlIG9wdGlvbiB0aGF0IGlzIGN1cnJlbnRseSBzZWxlY3RlZC4gSWYgc2V0LCB3aWxsIHVwZGF0ZSB0aGUgaW50ZXJmYWNlIGFuZCB0cmlnZ2VyIHRoZSBvdXRwdXQgZXZlbnQuXG4gIEB0eXBlIHtudW1iZXJ9XG4gIEBleGFtcGxlIHNlbGVjdC5zZWxlY3RlZEluZGV4ID0gMjtcbiAgKi9cbiAgZ2V0IHNlbGVjdGVkSW5kZXgoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkSW5kZXg7XG4gIH1cbiAgc2V0IHNlbGVjdGVkSW5kZXgodikge1xuICAgIHRoaXMuX3NlbGVjdGVkSW5kZXggPSB2O1xuICAgIHRoaXMuZWxlbWVudC5zZWxlY3RlZEluZGV4ID0gdjtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgY3VzdG9tRGVzdHJveSgpIHtcbiAgICB0aGlzLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5ib3VuZFJlbmRlcik7XG4gIH1cblxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2pzaGludC1sb2FkZXIhLi9saWIvaW50ZXJmYWNlcy9zZWxlY3QuanMiLCIndXNlIHN0cmljdCc7XG5cbmxldCBzdmcgPSByZXF1aXJlKCcuLi91dGlsL3N2ZycpO1xubGV0IG1hdGggPSByZXF1aXJlKCcuLi91dGlsL21hdGgnKTtcbmxldCBJbnRlcmZhY2UgPSByZXF1aXJlKCcuLi9jb3JlL2ludGVyZmFjZScpO1xubGV0IFN0ZXAgPSByZXF1aXJlKCcuLi9tb2RlbHMvc3RlcCcpO1xuaW1wb3J0ICogYXMgSW50ZXJhY3Rpb24gZnJvbSAnLi4vdXRpbC9pbnRlcmFjdGlvbic7XG5cbi8qKlxuKiBEaWFsXG4qXG4qXG4qIEBkZXNjcmlwdGlvbiBEaWFsIHdpdGggcmFkaWFsIG9yIGxpbmVhciBpbnRlcmFjdGlvbi5cbipcbiogQGRlbW8gPHNwYW4gbmV4dXMtdWk9XCJkaWFsXCI+PC9zcGFuPlxuKlxuKiBAZXhhbXBsZVxuKiB2YXIgZGlhbCA9IG5ldyBOZXh1cy5EaWFsKCcjdGFyZ2V0JylcbipcbiogQGV4YW1wbGVcbiogdmFyIGRpYWwgPSBuZXcgTmV4dXMuRGlhbCgnI3RhcmdldCcse1xuKiAgICdzaXplJzogWzc1LDc1XSxcbiogICAnaW50ZXJhY3Rpb24nOiAncmFkaWFsJywgLy8gXCJyYWRpYWxcIiwgXCJ2ZXJ0aWNhbFwiLCBvciBcImhvcml6b250YWxcIlxuKiAgICdtb2RlJzogJ3JlbGF0aXZlJywgLy8gXCJhYnNvbHV0ZVwiIG9yIFwicmVsYXRpdmVcIlxuKiAgICdtaW4nOiAwLFxuKiAgICdtYXgnOiAxLFxuKiAgICdzdGVwJzogMCxcbiogICAndmFsdWUnOiAwXG4qIH0pXG4qXG4qIEBvdXRwdXRcbiogY2hhbmdlXG4qIEZpcmVzIGFueSB0aW1lIHRoZSBpbnRlcmZhY2UncyB2YWx1ZSBjaGFuZ2VzLiA8YnI+XG4qIFRoZSBldmVudCBkYXRhIGlzIHRoZSBudW1iZXIgdmFsdWUgb2YgdGhlIGludGVyZmFjZS5cbipcbiogQG91dHB1dGV4YW1wbGVcbiogZGlhbC5vbignY2hhbmdlJyxmdW5jdGlvbih2KSB7XG4qICAgY29uc29sZS5sb2codik7XG4qIH0pXG4qXG4qIEB0dXRvcmlhbFxuKiBEaWFsXG4qIHlnR014cVxuKlxuKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGlhbCBleHRlbmRzIEludGVyZmFjZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7XG5cbiAgICBsZXQgb3B0aW9ucyA9IFsnbWluJywnbWF4JywndmFsdWUnXTtcblxuICAgIGxldCBkZWZhdWx0cyA9IHtcbiAgICAgICdzaXplJzogWzc1LDc1XSxcbiAgICAgICdpbnRlcmFjdGlvbic6ICdyYWRpYWwnLCAvLyByYWRpYWwsIHZlcnRpY2FsLCBob3Jpem9udGFsXG4gICAgICAnbW9kZSc6ICdyZWxhdGl2ZScsIC8vIGFic29sdXRlLCByZWxhdGl2ZVxuICAgICAgJ21pbic6IDAsXG4gICAgICAnbWF4JzogMSxcbiAgICAgICdzdGVwJzogMCxcbiAgICAgICd2YWx1ZSc6IDBcbiAgICB9O1xuXG4gICAgc3VwZXIoYXJndW1lbnRzLG9wdGlvbnMsZGVmYXVsdHMpO1xuXG4gICAgdGhpcy5pbnRlcmFjdGlvbiA9IHRoaXMuc2V0dGluZ3MuaW50ZXJhY3Rpb247XG5cbiAgICB0aGlzLl92YWx1ZSA9IG5ldyBTdGVwKHRoaXMuc2V0dGluZ3MubWluLCB0aGlzLnNldHRpbmdzLm1heCwgdGhpcy5zZXR0aW5ncy5zdGVwLCB0aGlzLnNldHRpbmdzLnZhbHVlKTtcblxuICAgIHRoaXMucG9zaXRpb24gPSBuZXcgSW50ZXJhY3Rpb24uSGFuZGxlKHRoaXMuc2V0dGluZ3MubW9kZSx0aGlzLmludGVyYWN0aW9uLFswLHRoaXMud2lkdGhdLFt0aGlzLmhlaWdodCwwXSk7XG5cbiAgICB0aGlzLmluaXQoKTtcblxuICAgIHRoaXMudmFsdWUgPSB0aGlzLl92YWx1ZS52YWx1ZTtcblxuICAgIHRoaXMucG9zaXRpb24udmFsdWUgPSB0aGlzLl92YWx1ZS5ub3JtYWxpemVkO1xuXG4gICAgdGhpcy5wcmV2aW91c0FuZ2xlID0gZmFsc2U7XG5cbiAgICB0aGlzLmVtaXQoJ2NoYW5nZScsdGhpcy52YWx1ZSk7XG5cbiAgfVxuXG4gIGJ1aWxkSW50ZXJmYWNlKCkge1xuXG4gICAgdGhpcy5iYWNrZ3JvdW5kID0gc3ZnLmNyZWF0ZSgnY2lyY2xlJyk7XG4gICAgdGhpcy5zY3JldyA9IHN2Zy5jcmVhdGUoJ2NpcmNsZScpO1xuICAgIHRoaXMuaGFuZGxlID0gc3ZnLmNyZWF0ZSgncGF0aCcpO1xuICAgIHRoaXMuaGFuZGxlMiA9IHN2Zy5jcmVhdGUoJ3BhdGgnKTtcbiAgICB0aGlzLmhhbmRsZUZpbGwgPSBzdmcuY3JlYXRlKCdwYXRoJyk7XG4gICAgdGhpcy5oYW5kbGUyRmlsbCA9IHN2Zy5jcmVhdGUoJ3BhdGgnKTtcbiAgICB0aGlzLmhhbmRsZUxpbmUgPSBzdmcuY3JlYXRlKCdwYXRoJyk7XG5cbiAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5iYWNrZ3JvdW5kKTtcbiAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5oYW5kbGUpO1xuICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmhhbmRsZTIpO1xuICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmhhbmRsZUZpbGwpO1xuICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmhhbmRsZTJGaWxsKTtcbiAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5oYW5kbGVMaW5lKTtcbiAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5zY3Jldyk7XG5cbiAgfVxuXG5cbiAgc2l6ZUludGVyZmFjZSgpIHtcblxuICAgIHRoaXMucG9zaXRpb24ucmVzaXplKFswLHRoaXMud2lkdGhdLFt0aGlzLmhlaWdodCwwXSk7XG5cbiAgICBsZXQgY2VudGVyID0ge1xuICAgICAgeDogdGhpcy53aWR0aC8yLFxuICAgICAgeTogdGhpcy5oZWlnaHQvMlxuICAgIH07XG5cbiAgICBsZXQgZGlhbWV0ZXIgPSBNYXRoLm1pbih0aGlzLndpZHRoLHRoaXMuaGVpZ2h0KTtcblxuICAgIHRoaXMuYmFja2dyb3VuZC5zZXRBdHRyaWJ1dGUoJ2N4JywgY2VudGVyLngpO1xuICAgIHRoaXMuYmFja2dyb3VuZC5zZXRBdHRyaWJ1dGUoJ2N5JywgY2VudGVyLnkpO1xuICAgIHRoaXMuYmFja2dyb3VuZC5zZXRBdHRyaWJ1dGUoJ3InLCBkaWFtZXRlci8yLWRpYW1ldGVyLzQwKTtcblxuICAgIHRoaXMuc2NyZXcuc2V0QXR0cmlidXRlKCdjeCcsIGNlbnRlci54KTtcbiAgICB0aGlzLnNjcmV3LnNldEF0dHJpYnV0ZSgnY3knLCBjZW50ZXIueSk7XG4gICAgdGhpcy5zY3Jldy5zZXRBdHRyaWJ1dGUoJ3InLCBkaWFtZXRlci8xMik7XG5cbiAgICBsZXQgdmFsdWUgPSB0aGlzLnZhbHVlO1xuXG4gICAgbGV0IGhhbmRsZVBvaW50cyA9IHtcbiAgICAgIHN0YXJ0OiBNYXRoLlBJKjEuNSxcbiAgICAgIGVuZDogbWF0aC5jbGlwKCBtYXRoLnNjYWxlKHZhbHVlLDAsMC41LE1hdGguUEkqMS41LE1hdGguUEkqMC41KSAsIE1hdGguUEkqMC41LCBNYXRoLlBJKjEuNSApXG4gICAgfTtcbiAgICBsZXQgaGFuZGxlMlBvaW50cyA9IHtcbiAgICAgIHN0YXJ0OiBNYXRoLlBJKjIuNSxcbiAgICAgIGVuZDogbWF0aC5jbGlwKCBtYXRoLnNjYWxlKHZhbHVlLDAuNSwxLE1hdGguUEkqMi41LE1hdGguUEkqMS41KSAsIE1hdGguUEkqMS41LCBNYXRoLlBJKjIuNSApXG4gICAgfTtcblxuICAgIGxldCBoYW5kbGVQYXRoID0gc3ZnLmFyYyhjZW50ZXIueCwgY2VudGVyLnksIGRpYW1ldGVyLzItZGlhbWV0ZXIvNDAsIGhhbmRsZVBvaW50cy5zdGFydCwgaGFuZGxlUG9pbnRzLmVuZCk7XG4gICAgbGV0IGhhbmRsZTJQYXRoID0gc3ZnLmFyYyhjZW50ZXIueCwgY2VudGVyLnksIGRpYW1ldGVyLzItZGlhbWV0ZXIvNDAsIGhhbmRsZTJQb2ludHMuc3RhcnQsIGhhbmRsZTJQb2ludHMuZW5kKTtcblxuICAgIHRoaXMuaGFuZGxlLnNldEF0dHJpYnV0ZSgnZCcsaGFuZGxlUGF0aCk7XG4gICAgdGhpcy5oYW5kbGUuc2V0QXR0cmlidXRlKCdzdHJva2Utd2lkdGgnLCBkaWFtZXRlci8yMCk7XG4gICAgdGhpcy5oYW5kbGUuc2V0QXR0cmlidXRlKCdmaWxsJywgJ25vbmUnKTtcblxuICAgIHRoaXMuaGFuZGxlMi5zZXRBdHRyaWJ1dGUoJ2QnLGhhbmRsZTJQYXRoKTtcbiAgICB0aGlzLmhhbmRsZTIuc2V0QXR0cmlidXRlKCdzdHJva2Utd2lkdGgnLCBkaWFtZXRlci8yMCk7XG4gICAgdGhpcy5oYW5kbGUyLnNldEF0dHJpYnV0ZSgnZmlsbCcsICdub25lJyk7XG5cbiAgICBoYW5kbGVQYXRoICs9ICcgTCAnK2NlbnRlci54KycgJytjZW50ZXIueTtcblxuICAgIHRoaXMuaGFuZGxlRmlsbC5zZXRBdHRyaWJ1dGUoJ2QnLGhhbmRsZVBhdGgpO1xuICAgIHRoaXMuaGFuZGxlRmlsbC5zZXRBdHRyaWJ1dGUoJ2ZpbGwtb3BhY2l0eScsICcwLjMnKTtcblxuICAgIGhhbmRsZTJQYXRoICs9ICcgTCAnK2NlbnRlci54KycgJytjZW50ZXIueTtcblxuICAgIHRoaXMuaGFuZGxlMkZpbGwuc2V0QXR0cmlidXRlKCdkJyxoYW5kbGUyUGF0aCk7XG4gICAgdGhpcy5oYW5kbGUyRmlsbC5zZXRBdHRyaWJ1dGUoJ2ZpbGwtb3BhY2l0eScsICcwLjMnKTtcblxuICAgIGxldCBhcmNFbmRpbmdBO1xuICAgIGlmICh2YWx1ZSA8IDAuNSkge1xuICAgICAgYXJjRW5kaW5nQSA9IGhhbmRsZVBvaW50cy5lbmQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFyY0VuZGluZ0EgPSBoYW5kbGUyUG9pbnRzLmVuZDtcbiAgICB9XG5cbiAgICBsZXQgYXJjRW5kaW5nWCA9IGNlbnRlci54ICsgTWF0aC5jb3MoYXJjRW5kaW5nQSkgKiAoZGlhbWV0ZXIvMik7XG4gICAgbGV0IGFyY0VuZGluZ1kgPSBjZW50ZXIueSArIE1hdGguc2luKGFyY0VuZGluZ0EpICogKGRpYW1ldGVyLzIpICogLTE7XG5cbiAgICB0aGlzLmhhbmRsZUxpbmUuc2V0QXR0cmlidXRlKCdkJywnTSAnK2NlbnRlci54KycgJytjZW50ZXIueSsnIEwgJythcmNFbmRpbmdYKycgJythcmNFbmRpbmdZKTtcbiAgICB0aGlzLmhhbmRsZUxpbmUuc2V0QXR0cmlidXRlKCdzdHJva2Utd2lkdGgnLCBkaWFtZXRlci8yMCk7XG5cbiAgfVxuXG4gIGNvbG9ySW50ZXJmYWNlKCkge1xuICAgIHRoaXMuYmFja2dyb3VuZC5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCB0aGlzLmNvbG9ycy5maWxsKTtcbiAgICB0aGlzLnNjcmV3LnNldEF0dHJpYnV0ZSgnZmlsbCcsIHRoaXMuY29sb3JzLmFjY2VudCk7XG4gICAgdGhpcy5oYW5kbGUuc2V0QXR0cmlidXRlKCdzdHJva2UnLCB0aGlzLmNvbG9ycy5hY2NlbnQpO1xuICAgIHRoaXMuaGFuZGxlMi5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsIHRoaXMuY29sb3JzLmFjY2VudCk7XG4gICAgdGhpcy5oYW5kbGVGaWxsLnNldEF0dHJpYnV0ZSgnZmlsbCcsIHRoaXMuY29sb3JzLmFjY2VudCk7XG4gICAgdGhpcy5oYW5kbGUyRmlsbC5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCB0aGlzLmNvbG9ycy5hY2NlbnQpO1xuICAgIHRoaXMuaGFuZGxlTGluZS5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsIHRoaXMuY29sb3JzLmFjY2VudCk7XG5cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBsZXQgdmFsdWUgPSB0aGlzLl92YWx1ZS5ub3JtYWxpemVkO1xuXG4gICAgbGV0IGNlbnRlciA9IHtcbiAgICAgIHg6IHRoaXMud2lkdGgvMixcbiAgICAgIHk6IHRoaXMuaGVpZ2h0LzJcbiAgICB9O1xuXG4gICAgbGV0IGRpYW1ldGVyID0gTWF0aC5taW4odGhpcy53aWR0aCx0aGlzLmhlaWdodCk7XG5cbiAgICBsZXQgaGFuZGxlUG9pbnRzID0ge1xuICAgICAgc3RhcnQ6IE1hdGguUEkqMS41LFxuICAgICAgZW5kOiBtYXRoLmNsaXAoIG1hdGguc2NhbGUodmFsdWUsMCwwLjUsTWF0aC5QSSoxLjUsTWF0aC5QSSowLjUpICwgTWF0aC5QSSowLjUsIE1hdGguUEkqMS41IClcbiAgICB9O1xuICAgIGxldCBoYW5kbGUyUG9pbnRzID0ge1xuICAgICAgc3RhcnQ6IE1hdGguUEkgKjIuNSxcbiAgICAgIGVuZDogbWF0aC5jbGlwKCBtYXRoLnNjYWxlKHZhbHVlLDAuNSwxLE1hdGguUEkqMi41LE1hdGguUEkqMS41KSAsIE1hdGguUEkqMS41LCBNYXRoLlBJKjIuNSApXG4gICAgfTtcblxuICAgIGxldCBoYW5kbGVQYXRoID0gc3ZnLmFyYyhjZW50ZXIueCwgY2VudGVyLnksIGRpYW1ldGVyLzItZGlhbWV0ZXIvNDAsIGhhbmRsZVBvaW50cy5zdGFydCwgaGFuZGxlUG9pbnRzLmVuZCk7XG4gICAgbGV0IGhhbmRsZTJQYXRoID0gc3ZnLmFyYyhjZW50ZXIueCwgY2VudGVyLnksIGRpYW1ldGVyLzItZGlhbWV0ZXIvNDAsIGhhbmRsZTJQb2ludHMuc3RhcnQsIGhhbmRsZTJQb2ludHMuZW5kKTtcblxuICAgIHRoaXMuaGFuZGxlLnNldEF0dHJpYnV0ZSgnZCcsaGFuZGxlUGF0aCk7XG4gICAgdGhpcy5oYW5kbGUyLnNldEF0dHJpYnV0ZSgnZCcsaGFuZGxlMlBhdGgpO1xuXG5cbiAgICBoYW5kbGVQYXRoICs9ICcgTCAnK2NlbnRlci54KycgJytjZW50ZXIueTtcblxuICAgIHRoaXMuaGFuZGxlRmlsbC5zZXRBdHRyaWJ1dGUoJ2QnLGhhbmRsZVBhdGgpO1xuXG4gICAgaGFuZGxlMlBhdGggKz0gJyBMICcrY2VudGVyLngrJyAnK2NlbnRlci55O1xuXG4gICAgdGhpcy5oYW5kbGUyRmlsbC5zZXRBdHRyaWJ1dGUoJ2QnLGhhbmRsZTJQYXRoKTtcblxuICAgIGxldCBhcmNFbmRpbmdBO1xuICAgIGlmICh2YWx1ZSA8PSAwLjUpIHtcbiAgICAgIGFyY0VuZGluZ0EgPSBoYW5kbGVQb2ludHMuZW5kO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcmNFbmRpbmdBID0gaGFuZGxlMlBvaW50cy5lbmQ7XG4gICAgfVxuXG4gICAgbGV0IGFyY0VuZGluZ1ggPSBjZW50ZXIueCArIE1hdGguY29zKGFyY0VuZGluZ0EpICogKGRpYW1ldGVyLzIpO1xuICAgIGxldCBhcmNFbmRpbmdZID0gY2VudGVyLnkgKyBNYXRoLnNpbihhcmNFbmRpbmdBKSAqIChkaWFtZXRlci8yKSAqIC0xO1xuXG4gICAgdGhpcy5oYW5kbGVMaW5lLnNldEF0dHJpYnV0ZSgnZCcsJ00gJytjZW50ZXIueCsnICcrY2VudGVyLnkrJyBMICcrYXJjRW5kaW5nWCsnICcrYXJjRW5kaW5nWSk7XG5cbiAgfVxuXG5cbiAgY2xpY2soKSB7XG4gICAgaWYgKHRoaXMubW9kZT09PSdyZWxhdGl2ZScpIHtcbiAgICAgIHRoaXMucHJldmlvdXNBbmdsZSA9IGZhbHNlO1xuICAgIH1cbiAgICB0aGlzLnBvc2l0aW9uLmFuY2hvciA9IHRoaXMubW91c2U7XG4gICAgdGhpcy5wb3NpdGlvbi52YWx1ZSA9IHRoaXMuX3ZhbHVlLm5vcm1hbGl6ZWQ7XG4gICAgdGhpcy5tb3ZlKCk7XG4gICB9XG5cbiAgbW92ZSgpIHtcbiAgICBpZiAodGhpcy5jbGlja2VkKSB7XG5cbiAgICAgIHRoaXMucG9zaXRpb24udXBkYXRlKHRoaXMubW91c2UpO1xuXG4gICAgICBsZXQgYW5nbGUgPSB0aGlzLnBvc2l0aW9uLnZhbHVlKk1hdGguUEkqMjtcblxuICAgICAgaWYgKGFuZ2xlIDwgMCApIHsgYW5nbGUgKz0gKE1hdGguUEkqMik7IH1cblxuICAgICAgaWYgKHRoaXMubW9kZSA9PT0gJ3JlbGF0aXZlJykge1xuICAgICAgICBpZiAodGhpcy5wcmV2aW91c0FuZ2xlICE9PSBmYWxzZSAmJiBNYXRoLmFicyh0aGlzLnByZXZpb3VzQW5nbGUgLSBhbmdsZSkgPiAyKSB7XG4gICAgICAgICAgaWYgKHRoaXMucHJldmlvdXNBbmdsZSA+IDMpIHtcbiAgICAgICAgICAgIGFuZ2xlID0gTWF0aC5QSSoyO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhbmdsZSA9IDA7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IC8qIGVsc2Uge1xuICAgICAgICBpZiAodGhpcy5wcmV2aW91c0FuZ2xlICE9PSBmYWxzZSAmJiBNYXRoLmFicyh0aGlzLnByZXZpb3VzQW5nbGUgLSBhbmdsZSkgPiAyKSB7XG4gICAgICAgICAgaWYgKHRoaXMucHJldmlvdXNBbmdsZSA+IDMpIHtcbiAgICAgICAgICAgIGFuZ2xlID0gTWF0aC5QSSoyO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhbmdsZSA9IDA7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9ICovXG4gICAgICB0aGlzLnByZXZpb3VzQW5nbGUgPSBhbmdsZTtcblxuICAgICAgbGV0IHJlYWxWYWx1ZSA9IGFuZ2xlIC8gKE1hdGguUEkqMik7XG5cbiAgICAgIHRoaXMudmFsdWUgPSB0aGlzLl92YWx1ZS51cGRhdGVOb3JtYWwoIHJlYWxWYWx1ZSApO1xuXG4gICAgICBpZiAodGhpcy5tb2RlID09PSAncmVsYXRpdmUnKSB7XG4gICAgICAgIHRoaXMucG9zaXRpb24udmFsdWUgPSByZWFsVmFsdWU7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx0aGlzLl92YWx1ZS52YWx1ZSk7XG5cbiAgICAgIHRoaXMucmVuZGVyKCk7XG5cbiAgICB9XG4gIH1cblxuICByZWxlYXNlKCkge1xuICB9XG5cbiAgLypcbiAgRGlhbCdzIHZhbHVlLiBXaGVuIHNldCwgaXQgd2lsbCBhdXRvbWF0aWNhbGx5IGJlIGFkanVzdCB0byBmaXQgbWluL21heC9zdGVwIHNldHRpbmdzIG9mIHRoZSBpbnRlcmZhY2UuXG4gIEB0eXBlIHtudW1iZXJ9XG4gIEBleGFtcGxlIGRpYWwudmFsdWUgPSAxMDtcblxuICBnZXQgdmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlLnZhbHVlO1xuICB9XG5cbiAgc2V0IHZhbHVlKHZhbHVlKSB7XG4gICAgdGhpcy5fdmFsdWUudXBkYXRlKHZhbHVlKTtcbiAgICB0aGlzLmVtaXQoJ2NoYW5nZScsdGhpcy52YWx1ZSk7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuKi9cblxuICAgIC8qKlxuICAgIERpYWwncyB2YWx1ZS4gV2hlbiBzZXQsIGl0IHdpbGwgYXV0b21hdGljYWxseSBiZSBhZGp1c3QgdG8gZml0IG1pbi9tYXgvc3RlcCBzZXR0aW5ncyBvZiB0aGUgaW50ZXJmYWNlLlxuICAgIEB0eXBlIHtudW1iZXJ9XG4gICAgQGV4YW1wbGUgZGlhbC52YWx1ZSA9IDEwO1xuICAgICovXG4gICAgZ2V0IHZhbHVlKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlLnZhbHVlO1xuICAgIH1cbiAgICBzZXQgdmFsdWUodikge1xuICAgICAgdGhpcy5fdmFsdWUudXBkYXRlKHYpO1xuICAgICAgdGhpcy5wb3NpdGlvbi52YWx1ZSA9IHRoaXMuX3ZhbHVlLm5vcm1hbGl6ZWQ7XG4gICAgICB0aGlzLmVtaXQoJ2NoYW5nZScsdGhpcy5fdmFsdWUudmFsdWUpO1xuICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICBMb3dlciBsaW1pdCBvZiB0aGUgZGlhbCdzIG91dHB1dCByYW5nZVxuICAgIEB0eXBlIHtudW1iZXJ9XG4gICAgQGV4YW1wbGUgZGlhbC5taW4gPSAxMDAwO1xuICAgICovXG4gICAgZ2V0IG1pbigpIHtcbiAgICAgIHJldHVybiB0aGlzLl92YWx1ZS5taW47XG4gICAgfVxuICAgIHNldCBtaW4odikge1xuICAgICAgdGhpcy5fdmFsdWUubWluID0gdjtcbiAgICB9XG5cbiAgICAvKipcbiAgICBVcHBlciBsaW1pdCBvZiB0aGUgZGlhbCdzIG91dHB1dCByYW5nZVxuICAgIEB0eXBlIHtudW1iZXJ9XG4gICAgQGV4YW1wbGUgZGlhbC5tYXggPSAxMDAwO1xuICAgICovXG4gICAgZ2V0IG1heCgpIHtcbiAgICAgIHJldHVybiB0aGlzLl92YWx1ZS5tYXg7XG4gICAgfVxuICAgIHNldCBtYXgodikge1xuICAgICAgdGhpcy5fdmFsdWUubWF4ID0gdjtcbiAgICB9XG5cbiAgICAvKipcbiAgICBUaGUgaW5jcmVtZW50IHRoYXQgdGhlIGRpYWwncyB2YWx1ZSBjaGFuZ2VzIGJ5LlxuICAgIEB0eXBlIHtudW1iZXJ9XG4gICAgQGV4YW1wbGUgZGlhbC5zdGVwID0gNTtcbiAgICAqL1xuICAgIGdldCBzdGVwKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlLnN0ZXA7XG4gICAgfVxuICAgIHNldCBzdGVwKHYpIHtcbiAgICAgIHRoaXMuX3ZhbHVlLnN0ZXAgPSB2O1xuICAgIH1cblxuICAgIC8qKlxuICAgIEFic29sdXRlIG1vZGUgKGRpYWwncyB2YWx1ZSBqdW1wcyB0byBtb3VzZSBjbGljayBwb3NpdGlvbikgb3IgcmVsYXRpdmUgbW9kZSAobW91c2UgZHJhZyBjaGFuZ2VzIHZhbHVlIHJlbGF0aXZlIHRvIGl0cyBjdXJyZW50IHBvc2l0aW9uKS4gRGVmYXVsdDogXCJyZWxhdGl2ZVwiLlxuICAgIEB0eXBlIHtzdHJpbmd9XG4gICAgQGV4YW1wbGUgZGlhbC5tb2RlID0gXCJyZWxhdGl2ZVwiO1xuICAgICovXG4gICAgZ2V0IG1vZGUoKSB7XG4gICAgICByZXR1cm4gdGhpcy5wb3NpdGlvbi5tb2RlO1xuICAgIH1cbiAgICBzZXQgbW9kZSh2KSB7XG4gICAgICB0aGlzLnBvc2l0aW9uLm1vZGUgPSB2O1xuICAgIH1cblxuXG4gIC8qKlxuICBOb3JtYWxpemVkIHZhbHVlIG9mIHRoZSBkaWFsLlxuICBAdHlwZSB7bnVtYmVyfVxuICBAZXhhbXBsZSBkaWFsLm5vcm1hbGl6ZWQgPSAwLjU7XG4gICovXG4gIGdldCBub3JtYWxpemVkKCkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZS5ub3JtYWxpemVkO1xuICB9XG5cbiAgc2V0IG5vcm1hbGl6ZWQodikge1xuICAgIHRoaXMuX3ZhbHVlLnVwZGF0ZU5vcm1hbCh2KTtcbiAgICB0aGlzLmVtaXQoJ2NoYW5nZScsdGhpcy52YWx1ZSk7XG4gIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9qc2hpbnQtbG9hZGVyIS4vbGliL2ludGVyZmFjZXMvZGlhbC5qcyIsIid1c2Ugc3RyaWN0JztcblxubGV0IHN2ZyA9IHJlcXVpcmUoJy4uL3V0aWwvc3ZnJyk7XG5sZXQgSW50ZXJmYWNlID0gcmVxdWlyZSgnLi4vY29yZS9pbnRlcmZhY2UnKTtcbmxldCBCdXR0b25UZW1wbGF0ZSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvYnV0dG9udGVtcGxhdGUnKTtcbmxldCB0b3VjaCA9IHJlcXVpcmUoJy4uL3V0aWwvdG91Y2gnKTtcblxuY2xhc3MgUGlhbm9LZXkgZXh0ZW5kcyBCdXR0b25UZW1wbGF0ZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7XG5cbiAgICBsZXQgb3B0aW9ucyA9IFsndmFsdWUnLCdub3RlJywnY29sb3InXTtcblxuICAgIGxldCBkZWZhdWx0cyA9IHtcbiAgICAgICdzaXplJzogWzgwLDgwXSxcbiAgICAgICd0YXJnZXQnOiBmYWxzZSxcbiAgICAgICdtb2RlJzogJ2J1dHRvbicsXG4gICAgICAndmFsdWUnOiAwXG4gICAgfTtcblxuICAgIHN1cGVyKGFyZ3VtZW50cyxvcHRpb25zLGRlZmF1bHRzKTtcblxuICAgIHRoaXMubm90ZSA9IHRoaXMuc2V0dGluZ3Mubm90ZTtcbiAgICB0aGlzLmNvbG9yID0gdGhpcy5zZXR0aW5ncy5jb2xvcjtcblxuICAgIHRoaXMuY29sb3JzID0ge1xuICAgICAgJ3cnOiAnI2ZmZicsXG4gICAgICAnYic6ICcjNjY2JyxcbiAgICB9O1xuXG4gICAgdGhpcy5pbml0KCk7XG4gICAgdGhpcy5yZW5kZXIoKTtcblxuICB9XG5cbiAgYnVpbGRGcmFtZSgpIHtcbiAgICB0aGlzLmVsZW1lbnQgPSBzdmcuY3JlYXRlKCdzdmcnKTtcbiAgICB0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKCd3aWR0aCcsdGhpcy53aWR0aCk7XG4gICAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZSgnaGVpZ2h0Jyx0aGlzLmhlaWdodCk7XG4gICAgdGhpcy5wYXJlbnQuYXBwZW5kQ2hpbGQodGhpcy5lbGVtZW50KTtcbiAgfVxuXG4gIGJ1aWxkSW50ZXJmYWNlKCkge1xuXG4gICAgdGhpcy5wYWQgPSBzdmcuY3JlYXRlKCdyZWN0Jyk7XG5cbiAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5wYWQpO1xuXG4gICAgdGhpcy5pbnRlcmFjdGlvblRhcmdldCA9IHRoaXMucGFkO1xuXG4gICAgLyogZXZlbnRzICovXG5cbiAgICBpZiAoIXRvdWNoLmV4aXN0cykge1xuXG4gICAgICB0aGlzLmNsaWNrID0gKCkgPT4ge1xuICAgICAgLy8gIGNvbnNvbGUubG9nKCdjbGljaycpO1xuICAgICAgICB0aGlzLnBpYW5vLmludGVyYWN0aW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5waWFuby5wYWludGJydXNoID0gIXRoaXMuc3RhdGU7XG4gICAgICAgIHRoaXMuZG93bih0aGlzLnBpYW5vLnBhaW50YnJ1c2gpO1xuICAgICAgfTtcblxuICAgICAgdGhpcy5wYWQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5waWFuby5pbnRlcmFjdGluZykge1xuICAgICAgLy8gICAgY29uc29sZS5sb2coJ21vdXNlb3ZlcicpO1xuICAgICAgICAgIHRoaXMuZG93bih0aGlzLnBpYW5vLnBhaW50YnJ1c2gpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuXG4gICAgICB0aGlzLm1vdmUgPSAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnBpYW5vLmludGVyYWN0aW5nKSB7XG4gICAgICAgIC8vICBjb25zb2xlLmxvZygnbW92ZScpO1xuICAgICAgICAgIHRoaXMuYmVuZCgpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG5cbiAgICAgIHRoaXMucmVsZWFzZSA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5waWFuby5pbnRlcmFjdGluZyA9IGZhbHNlO1xuICAgICAgLy8gIGNvbnNvbGUubG9nKCdyZWxlYXNlJyk7XG4gICAgICAvLyAgdGhpcy51cCgpO1xuICAgICAgfTtcbiAgICAgIHRoaXMucGFkLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnBpYW5vLmludGVyYWN0aW5nKSB7XG4gICAgICAgIC8vICBjb25zb2xlLmxvZygnbW91c2V1cCcpO1xuICAgICAgICAgIHRoaXMudXAoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICB0aGlzLnBhZC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucGlhbm8uaW50ZXJhY3RpbmcpIHtcbiAgICAgICAgLy8gIGNvbnNvbGUubG9nKCdtb3VzZW91dCcpO1xuICAgICAgICAgIHRoaXMudXAoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIHNpemVJbnRlcmZhY2UoKSB7XG5cbiAgICAgICAgLy9sZXQgcmFkaXVzID0gTWF0aC5taW4odGhpcy53aWR0aCx0aGlzLmhlaWdodCkgLyA1O1xuICAgICAgICBsZXQgcmFkaXVzID0gMDtcblxuICAgICAgICB0aGlzLnBhZC5zZXRBdHRyaWJ1dGUoJ3gnLDAuNSk7XG4gICAgICAgIHRoaXMucGFkLnNldEF0dHJpYnV0ZSgneScsMC41KTtcbiAgICAgICAgaWYgKHRoaXMud2lkdGggPiAyKSB7XG4gICAgICAgICAgdGhpcy5wYWQuc2V0QXR0cmlidXRlKCd3aWR0aCcsIHRoaXMud2lkdGggLSAxKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnBhZC5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgdGhpcy53aWR0aCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaGVpZ2h0ID4gMikge1xuICAgICAgICAgIHRoaXMucGFkLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgdGhpcy5oZWlnaHQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucGFkLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgdGhpcy5oZWlnaHQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucGFkLnNldEF0dHJpYnV0ZSgncngnLCByYWRpdXMpO1xuICAgICAgICB0aGlzLnBhZC5zZXRBdHRyaWJ1dGUoJ3J5JywgcmFkaXVzKTtcblxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGlmICghdGhpcy5zdGF0ZSkge1xuICAgICAgdGhpcy5wYWQuc2V0QXR0cmlidXRlKCdmaWxsJywgdGhpcy5jb2xvcnNbdGhpcy5jb2xvcl0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBhZC5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCB0aGlzLmNvbG9ycy5hY2NlbnQpO1xuICAgIH1cbiAgfVxuXG59XG5cbi8qKlxuKiBQaWFub1xuKlxuKiBAZGVzY3JpcHRpb24gUGlhbm8ga2V5Ym9hcmQgaW50ZXJmYWNlXG4qXG4qIEBkZW1vIDxkaXYgbmV4dXMtdWk9XCJwaWFub1wiPjwvZGl2PlxuKlxuKiBAZXhhbXBsZVxuKiB2YXIgcGlhbm8gPSBuZXcgTmV4dXMuUGlhbm8oJyN0YXJnZXQnKVxuKlxuKiBAZXhhbXBsZVxuKiB2YXIgcGlhbm8gPSBuZXcgTmV4dXMuUGlhbm8oJyN0YXJnZXQnLHtcbiogICAgICdzaXplJzogWzUwMCwxMjVdLFxuKiAgICAgJ21vZGUnOiAnYnV0dG9uJywgIC8vICdidXR0b24nLCAndG9nZ2xlJywgb3IgJ2ltcHVsc2UnXG4qICAgICAnbG93Tm90ZSc6IDI0LFxuKiAgICAgJ2hpZ2hOb3RlJzogNjBcbiogfSlcbipcbiogQG91dHB1dFxuKiBjaGFuZ2VcbiogRmlyZXMgYW55IHRpbWUgYSBuZXcga2V5IGlzIHByZXNzZWQgb3IgcmVsZWFzZWQgPGJyPlxuKiBUaGUgZXZlbnQgZGF0YSBpcyBhbiBvYmplY3QgY29udGFpbmluZyA8aT5ub3RlPC9pPiBhbmQgPGk+c3RhdGU8L2k+IHByb3BlcnRpZXMuXG4qXG4qIEBvdXRwdXRleGFtcGxlXG4qIHBpYW5vLm9uKCdjaGFuZ2UnLGZ1bmN0aW9uKHYpIHtcbiogICBjb25zb2xlLmxvZyh2KTtcbiogfSlcbipcbiovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBpYW5vIGV4dGVuZHMgSW50ZXJmYWNlIHtcblxuICBjb25zdHJ1Y3RvcigpIHtcblxuICAgIGxldCBvcHRpb25zID0gWyd2YWx1ZSddO1xuXG4gICAgbGV0IGRlZmF1bHRzID0ge1xuICAgICAgJ3NpemUnOiBbNTAwLDEyNV0sXG4gICAgICAnbG93Tm90ZSc6IDI0LFxuICAgICAgJ2hpZ2hOb3RlJzogNjAsXG4gICAgICAnbW9kZSc6ICdidXR0b24nXG4gICAgfTtcblxuICAgIHN1cGVyKGFyZ3VtZW50cyxvcHRpb25zLGRlZmF1bHRzKTtcblxuICAgIHRoaXMua2V5UGF0dGVybiA9IFsndycsJ2InLCd3JywnYicsJ3cnLCd3JywnYicsJ3cnLCdiJywndycsJ2InLCd3J107XG5cbiAgICB0aGlzLnBhaW50YnJ1c2ggPSBmYWxzZTtcblxuICAgIHRoaXMubW9kZSA9IHRoaXMuc2V0dGluZ3MubW9kZTtcblxuICAgIHRoaXMucmFuZ2UgPSB7XG4gICAgICBsb3c6IHRoaXMuc2V0dGluZ3MubG93Tm90ZSxcbiAgICAgIGhpZ2g6IHRoaXMuc2V0dGluZ3MuaGlnaE5vdGVcbiAgICB9O1xuXG4gICAgdGhpcy5yYW5nZS5zaXplID0gdGhpcy5yYW5nZS5oaWdoIC0gdGhpcy5yYW5nZS5sb3cgKyAxO1xuXG4gICAgdGhpcy5rZXlzID0gW107XG5cbiAgICB0aGlzLnRvZ2dsZVRvID0gZmFsc2U7XG5cbiAgICB0aGlzLmluaXQoKTtcbiAgICB0aGlzLnJlbmRlcigpO1xuXG4gIH1cblxuICBidWlsZEZyYW1lKCkge1xuICAgIHRoaXMuZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMuZWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSc7XG4gICAgdGhpcy5lbGVtZW50LnN0eWxlLmJvcmRlclJhZGl1cyA9ICcwcHgnO1xuICAgIHRoaXMuZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICB0aGlzLmVsZW1lbnQuc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgdGhpcy5lbGVtZW50LnN0eWxlLmhlaWdodCA9ICcxMDAlJztcbiAgICB0aGlzLnBhcmVudC5hcHBlbmRDaGlsZCh0aGlzLmVsZW1lbnQpO1xuICB9XG5cbiAgYnVpbGRJbnRlcmZhY2UoKSB7XG5cbiAgICB0aGlzLmtleXMgPSBbXTtcblxuICAgIGZvciAobGV0IGk9MDtpPHRoaXMucmFuZ2Uuc2l6ZTtpKyspIHtcblxuICAgICAgbGV0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgIGxldCBzY2FsZUluZGV4ID0gKGkrdGhpcy5yYW5nZS5sb3cpICUgdGhpcy5rZXlQYXR0ZXJuLmxlbmd0aDtcblxuICAgICAgbGV0IGtleSA9IG5ldyBQaWFub0tleShjb250YWluZXIsIHtcbiAgICAgICAgICBjb21wb25lbnQ6IHRydWUsXG4gICAgICAgICAgbm90ZTogaSt0aGlzLnJhbmdlLmxvdyxcbiAgICAgICAgICBjb2xvcjogdGhpcy5rZXlQYXR0ZXJuW3NjYWxlSW5kZXhdLFxuICAgICAgICAgIG1vZGU6IHRoaXMubW9kZVxuICAgICAgICB9LCB0aGlzLmtleUNoYW5nZS5iaW5kKHRoaXMsaSt0aGlzLnJhbmdlLmxvdykpO1xuXG4gICAgICBrZXkucGlhbm8gPSB0aGlzO1xuXG4gICAgICBpZiAodG91Y2guZXhpc3RzKSB7XG4gICAgICAgIGtleS5wYWQuaW5kZXggPSBpO1xuICAgICAgICBrZXkucHJlQ2xpY2sgPSBrZXkucHJlTW92ZSA9IGtleS5wcmVSZWxlYXNlID0gKCkgPT4ge307XG4gICAgICAgIGtleS5jbGljayA9IGtleS5tb3ZlID0ga2V5LnJlbGVhc2UgPSAoKSA9PiB7fTtcbiAgICAgICAga2V5LnByZVRvdWNoID0ga2V5LnByZVRvdWNoTW92ZSA9IGtleS5wcmVUb3VjaFJlbGVhc2UgPSAoKSA9PiB7fTtcbiAgICAgICAga2V5LnRvdWNoID0ga2V5LnRvdWNoTW92ZSA9IGtleS50b3VjaFJlbGVhc2UgPSAoKSA9PiB7fTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5rZXlzLnB1c2goa2V5KTtcbiAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZChjb250YWluZXIpO1xuXG4gICAgfVxuICAgIGlmICh0b3VjaC5leGlzdHMpIHtcbiAgICAgIHRoaXMuYWRkVG91Y2hMaXN0ZW5lcnMoKTtcbiAgICB9XG5cbiAgfVxuXG4gIHNpemVJbnRlcmZhY2UoKSB7XG5cbiAgICBsZXQga2V5WCA9IDA7XG5cbiAgICBsZXQga2V5UG9zaXRpb25zID0gW107XG5cbiAgICBmb3IgKGxldCBpPTA7aTx0aGlzLnJhbmdlLnNpemU7aSsrKSB7XG5cbiAgICAgIGtleVBvc2l0aW9ucy5wdXNoKGtleVgpO1xuXG4gICAgICBsZXQgc2NhbGVJbmRleCA9IChpK3RoaXMucmFuZ2UubG93KSAlIHRoaXMua2V5UGF0dGVybi5sZW5ndGg7XG4gICAgICBsZXQgbmV4dFNjYWxlSW5kZXggPSAoaSsxK3RoaXMucmFuZ2UubG93KSAlIHRoaXMua2V5UGF0dGVybi5sZW5ndGg7XG4gICAgICBpZiAoaSsxK3RoaXMucmFuZ2UubG93ID49IHRoaXMucmFuZ2UuaGlnaCkge1xuICAgICAgICBrZXlYICs9IDE7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMua2V5UGF0dGVybltzY2FsZUluZGV4XSA9PT0gJ3cnICYmIHRoaXMua2V5UGF0dGVybltuZXh0U2NhbGVJbmRleF0gPT09ICd3Jykge1xuICAgICAgICBrZXlYICs9IDE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBrZXlYICs9IDAuNTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGV0IGtleXNXaWRlID0ga2V5WDtcblxuXG4gIC8vICBsZXQgcGFkZGluZyA9IHRoaXMud2lkdGggLyAxMjA7XG4gICAgbGV0IHBhZGRpbmcgPSAxO1xuICAgIGxldCBidXR0b25XaWR0aCA9ICh0aGlzLndpZHRoLXBhZGRpbmcqMikgLyBrZXlzV2lkZTtcbiAgICBsZXQgYnV0dG9uSGVpZ2h0ID0gKHRoaXMuaGVpZ2h0LXBhZGRpbmcqMikgLyAyO1xuXG4gICAgZm9yIChsZXQgaT0wO2k8dGhpcy5rZXlzLmxlbmd0aDtpKyspIHtcblxuICAgICAgbGV0IGNvbnRhaW5lciA9IHRoaXMua2V5c1tpXS5wYXJlbnQ7XG4gICAgICBjb250YWluZXIuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgY29udGFpbmVyLnN0eWxlLmxlZnQgPSAoa2V5UG9zaXRpb25zW2ldKmJ1dHRvbldpZHRoK3BhZGRpbmcpICsgJ3B4JztcbiAgICAgIGlmICh0aGlzLmtleXNbaV0uY29sb3IgPT09ICd3Jykge1xuICAgICAgICBjb250YWluZXIuc3R5bGUudG9wID0gKHBhZGRpbmcpICsgJ3B4JztcbiAgICAgICAgdGhpcy5rZXlzW2ldLnJlc2l6ZShidXR0b25XaWR0aCwgYnV0dG9uSGVpZ2h0KjIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29udGFpbmVyLnN0eWxlLnpJbmRleCA9IDE7XG4gICAgICAgIGNvbnRhaW5lci5zdHlsZS50b3AgPSBwYWRkaW5nKydweCc7XG4gICAgICAgIHRoaXMua2V5c1tpXS5yZXNpemUoYnV0dG9uV2lkdGgsIGJ1dHRvbkhlaWdodCoxLjEpO1xuICAgICAgfVxuXG4gICAgfVxuXG4gIH1cblxuICBjb2xvckludGVyZmFjZSgpIHtcblxuICAgIC8vIFBpYW5vIGtleXMgZG9uJ3QgYWN0dWFsbHkgaGF2ZSBhIHN0cm9rZSBib3JkZXJcbiAgICAvLyBUaGV5IGhhdmUgc3BhY2UgYmV0d2VlbiB0aGVtLCB3aGljaCBzaG93cyB0aGUgUGlhbm8gYmcgY29sb3JcbiAgICB0aGlzLmVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gdGhpcy5jb2xvcnMubWVkaXVtTGlnaHQ7XG5cbiAgICBmb3IgKGxldCBpPTA7aTx0aGlzLmtleXMubGVuZ3RoO2krKykge1xuICAgICAgdGhpcy5rZXlzW2ldLmNvbG9ycyA9IHtcbiAgICAgICAgJ3cnOiB0aGlzLmNvbG9ycy5saWdodCxcbiAgICAgICAgJ2InOiB0aGlzLmNvbG9ycy5kYXJrLFxuICAgICAgICAnYWNjZW50JzogdGhpcy5jb2xvcnMuYWNjZW50LFxuICAgICAgICAnYm9yZGVyJzogdGhpcy5jb2xvcnMubWVkaXVtTGlnaHRcbiAgICAgIH07XG4gICAgICB0aGlzLmtleXNbaV0uY29sb3JJbnRlcmZhY2UoKTtcbiAgICAgIHRoaXMua2V5c1tpXS5yZW5kZXIoKTtcbiAgICB9XG5cblxuICB9XG5cbiAga2V5Q2hhbmdlKG5vdGUsb24pIHtcbiAgICAvLyBlbWl0IGRhdGEgZm9yIGFueSBrZXkgdHVybmluZyBvbi9vZmZcbiAgICAvLyBcIm5vdGVcIiBpcyB0aGUgbm90ZSB2YWx1ZVxuICAgIC8vIFwib25cIiBpcyBhIGJvb2xlYW4gd2hldGhlciBpdCBpcyBvbiBvciBvZmZcbiAgICAvLyBpbiBhZnRlcnRvdWNoIG1vZGUsIFwib246IGlzIGFuIG9iamVjdCB3aXRoIHN0YXRlL3gveSBwcm9wZXJ0aWVzXG4gICAgdmFyIGRhdGEgPSB7XG4gICAgICBub3RlOiBub3RlXG4gICAgfTtcbiAgICBpZiAodHlwZW9mIG9uID09PSAnb2JqZWN0Jykge1xuICAgICAgZGF0YS5zdGF0ZSA9IG9uLnN0YXRlO1xuICAgIC8vICBkYXRhLnggPSBvbi54XG4gICAgLy8gIGRhdGEueSA9IG9uLnlcbiAgICB9IGVsc2Uge1xuICAgICAgZGF0YS5zdGF0ZSA9IG9uO1xuICAgIH1cbiAgICB0aGlzLmVtaXQoJ2NoYW5nZScsZGF0YSk7XG4gIH1cblxuICAvKiBkcmFnKG5vdGUsb24pIHtcbiAgICB0aGlzLmVtaXQoJ2NoYW5nZScse1xuICAgICAgbm90ZTogbm90ZSxcbiAgICAgIHN0YXRlOiBvblxuICAgIH0pO1xuICB9ICovXG5cbiAgcmVuZGVyKCkge1xuICAgIC8vIGxvb3AgdGhyb3VnaCBhbmQgcmVuZGVyIHRoZSBrZXlzP1xuICB9XG5cbiAgYWRkVG91Y2hMaXN0ZW5lcnMoKSB7XG4gICAgdGhpcy5wcmVDbGljayA9IHRoaXMucHJlTW92ZSA9IHRoaXMucHJlUmVsZWFzZSA9ICgpID0+IHt9O1xuICAgIHRoaXMuY2xpY2sgPSB0aGlzLm1vdmUgPSB0aGlzLnJlbGVhc2UgPSAoKSA9PiB7fTtcbiAgICB0aGlzLnByZVRvdWNoID0gdGhpcy5wcmVUb3VjaE1vdmUgPSB0aGlzLnByZVRvdWNoUmVsZWFzZSA9ICgpID0+IHt9O1xuICAgIHRoaXMudG91Y2ggPSB0aGlzLnRvdWNoTW92ZSA9IHRoaXMudG91Y2hSZWxlYXNlID0gKCkgPT4ge307XG5cbiAgICBjb25zdCBhbGxBY3RpdmVUb3VjaGVzID0ge307XG4gICAgY29uc3Qga2V5cyA9IHRoaXMua2V5cztcblxuICAgIGZ1bmN0aW9uIGNsb25lVG91Y2godG91Y2gpIHtcbiAgICAgIHJldHVybiB7IGlkZW50aWZpZXI6IHRvdWNoLmlkZW50aWZpZXIsIGNsaWVudFg6IHRvdWNoLmNsaWVudFgsIGNsaWVudFk6IHRvdWNoLmNsaWVudFkgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVLZXlTdGF0ZSgpIHtcbiAgICAgIGNvbnN0IGFsbEFjdGl2ZUtleXMgPSB7fTtcblxuICAgICAgLy8gQ2hlY2svc2V0IFwia2V5LWRvd25cIiBzdGF0dXMgZm9yIGFsbCBrZXlzIHRoYXQgYXJlIGN1cnJlbnRseSB0b3VjaGVkLlxuICAgICAgT2JqZWN0LmtleXMoYWxsQWN0aXZlVG91Y2hlcykuZm9yRWFjaChpZCA9PiB7XG4gICAgICAgIGNvbnN0IHRvdWNoID0gYWxsQWN0aXZlVG91Y2hlc1tpZF07XG4gICAgICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuZWxlbWVudEZyb21Qb2ludCh0b3VjaC5jbGllbnRYLCB0b3VjaC5jbGllbnRZKTtcbiAgICAgICAgbGV0IGtleSA9IGVsID8ga2V5c1tlbC5pbmRleF0gOiBudWxsO1xuICAgICAgICBpZiAoa2V5KSB7XG4gICAgICAgICAgYWxsQWN0aXZlS2V5c1tlbC5pbmRleF0gPSBpZDtcbiAgICAgICAgICBpZiAoIWtleS5zdGF0ZSkge1xuICAgICAgICAgICAga2V5LmRvd24oKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZGVsZXRlIGFsbEFjdGl2ZVRvdWNoZXNbaWRdO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgLy8gU2V0IFwia2V5LXVwXCIgc3RhdHVzIGZvciBhbGwga2V5cyB0aGF0IGFyZSB1bnRvdWNoZWQuXG4gICAgICBrZXlzLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgaWYgKGtleS5zdGF0ZSAmJiAhYWxsQWN0aXZlS2V5c1trZXkucGFkLmluZGV4XSkge1xuICAgICAgICAgIGtleS51cCgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVUb3VjaFN0YXJ0QW5kTW92ZShlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlLmNoYW5nZWRUb3VjaGVzLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgY29uc3QgdG91Y2ggPSBlLmNoYW5nZWRUb3VjaGVzW2ldO1xuICAgICAgICBhbGxBY3RpdmVUb3VjaGVzW3RvdWNoLmlkZW50aWZpZXJdID0gY2xvbmVUb3VjaCh0b3VjaCk7XG4gICAgICB9XG4gICAgICB1cGRhdGVLZXlTdGF0ZSgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhbmRsZVRvdWNoRW5kKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGUuY2hhbmdlZFRvdWNoZXMubGVuZ3RoOyBpKyspe1xuICAgICAgICBjb25zdCB0b3VjaCA9IGUuY2hhbmdlZFRvdWNoZXNbaV07XG4gICAgICAgIGRlbGV0ZSBhbGxBY3RpdmVUb3VjaGVzW3RvdWNoLmlkZW50aWZpZXJdO1xuICAgICAgfVxuICAgICAgdXBkYXRlS2V5U3RhdGUoKTtcbiAgICB9XG5cbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIGhhbmRsZVRvdWNoU3RhcnRBbmRNb3ZlKTtcbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgaGFuZGxlVG91Y2hTdGFydEFuZE1vdmUpO1xuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIGhhbmRsZVRvdWNoRW5kKTtcbiAgfVxuXG4gIC8qKlxuICBEZWZpbmUgdGhlIHBpdGNoIHJhbmdlIChsb3dlc3QgYW5kIGhpZ2hlc3Qgbm90ZSkgb2YgdGhlIHBpYW5vIGtleWJvYXJkLlxuICBAcGFyYW0gbG93IHtudW1iZXJ9IE1JREkgbm90ZSB2YWx1ZSBvZiB0aGUgbG93ZXN0IG5vdGUgb24gdGhlIGtleWJvYXJkXG4gIEBwYXJhbSBoaWdoIHtudW1iZXJ9IE1JREkgbm90ZSB2YWx1ZSBvZiB0aGUgaGlnaGVzdCBub3RlIG9uIHRoZSBrZXlib2FyZFxuICAqL1xuICBzZXRSYW5nZShsb3csaGlnaCkge1xuICAgIHRoaXMucmFuZ2UubG93ID0gbG93O1xuICAgIHRoaXMucmFuZ2UuaGlnaCA9IGhpZ2g7XG4gICAgdGhpcy5lbXB0eSgpO1xuICAgIHRoaXMuYnVpbGRJbnRlcmZhY2UoKTtcbiAgfVxuXG4gIC8qKlxuICBUdXJuIGEga2V5IG9uIG9yIG9mZiB1c2luZyBpdHMgTUlESSBub3RlIHZhbHVlO1xuICBAcGFyYW0gbm90ZSB7bnVtYmVyfSBNSURJIG5vdGUgdmFsdWUgb2YgdGhlIGtleSB0byBjaGFuZ2VcbiAgQHBhcmFtIG9uIHtib29sZWFufSBXaGV0aGVyIHRoZSBub3RlIHNob3VsZCB0dXJuIG9uIG9yIG9mZlxuICAqL1xuICB0b2dnbGVLZXkobm90ZSwgb24pIHtcbiAgICB0aGlzLmtleXNbbm90ZS10aGlzLnJhbmdlLmxvd10uZmxpcChvbik7XG4gIH1cblxuICAvKipcbiAgVHVybiBhIGtleSBvbiBvciBvZmYgdXNpbmcgaXRzIGtleSBpbmRleCBvbiB0aGUgcGlhbm8gaW50ZXJmYWNlLlxuICBAcGFyYW0gaW5kZXgge251bWJlcn0gSW5kZXggb2YgdGhlIGtleSB0byBjaGFuZ2VcbiAgQHBhcmFtIG9uIHtib29sZWFufSBXaGV0aGVyIHRoZSBub3RlIHNob3VsZCB0dXJuIG9uIG9yIG9mZlxuICAqL1xuICB0b2dnbGVJbmRleChpbmRleCwgb24pIHtcbiAgICB0aGlzLmtleXNbaW5kZXhdLmZsaXAob24pO1xuICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vanNoaW50LWxvYWRlciEuL2xpYi9pbnRlcmZhY2VzL3BpYW5vLmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG5sZXQgc3ZnID0gcmVxdWlyZSgnLi4vdXRpbC9zdmcnKTtcbmxldCBkb20gPSByZXF1aXJlKCcuLi91dGlsL2RvbScpO1xubGV0IEludGVyZmFjZSA9IHJlcXVpcmUoJy4uL2NvcmUvaW50ZXJmYWNlJyk7XG5sZXQgQnV0dG9uVGVtcGxhdGUgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2J1dHRvbnRlbXBsYXRlJyk7XG5sZXQgTWF0cml4TW9kZWwgPSByZXF1aXJlKCcuLi9tb2RlbHMvbWF0cml4Jyk7XG5sZXQgQ291bnRlck1vZGVsID0gcmVxdWlyZSgnLi4vbW9kZWxzL2NvdW50ZXInKTtcbmxldCBJbnRlcnZhbCA9IHJlcXVpcmUoJy4uL3RpbWUvaW50ZXJ2YWwnKTtcbmxldCB0b3VjaCA9IHJlcXVpcmUoJy4uL3V0aWwvdG91Y2gnKTtcblxuY2xhc3MgTWF0cml4Q2VsbCBleHRlbmRzIEJ1dHRvblRlbXBsYXRlIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgbGV0IG9wdGlvbnMgPSBbJ3ZhbHVlJ107XG5cbiAgICBsZXQgZGVmYXVsdHMgPSB7XG4gICAgICBzaXplOiBbODAsIDgwXSxcbiAgICAgIHRhcmdldDogZmFsc2UsXG4gICAgICBtb2RlOiAndG9nZ2xlJyxcbiAgICAgIHZhbHVlOiAwLFxuICAgICAgcGFkZGluZ1JvdzogMixcbiAgICAgIHBhZGRpbmdDb2x1bW46IDJcbiAgICB9O1xuXG4gICAgc3VwZXIoYXJndW1lbnRzLCBvcHRpb25zLCBkZWZhdWx0cyk7XG5cbiAgICB0aGlzLmluZGV4ID0gdGhpcy5zZXR0aW5ncy5pbmRleDtcbiAgICB0aGlzLnJvdyA9IHRoaXMuc2V0dGluZ3Mucm93O1xuICAgIHRoaXMuY29sdW1uID0gdGhpcy5zZXR0aW5ncy5jb2x1bW47XG5cbiAgICB0aGlzLm1hdHJpeCA9IHRoaXMuc2V0dGluZ3MubWF0cml4O1xuXG4gICAgLyoqXG4gICAgICogIEFtb3VudCBvZiByb3cgcGFkZGluZ1xuICAgICAqICBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIHRoaXMucGFkZGluZ1JvdyA9IHRoaXMuc2V0dGluZ3MucGFkZGluZ1JvdyB8fCBkZWZhdWx0cy5wYWRkaW5nUm93O1xuXG4gICAgLyoqXG4gICAgICogIEFtb3VudCBvZiBjb2x1bW4gcGFkZGluZ1xuICAgICAqICBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIHRoaXMucGFkZGluZ0NvbHVtbiA9IHRoaXMuc2V0dGluZ3MucGFkZGluZ0NvbHVtbiB8fCBkZWZhdWx0cy5wYWRkaW5nQ29sdW1uO1xuXG4gICAgdGhpcy5pbnRlcmFjdGluZyA9IGZhbHNlO1xuICAgIHRoaXMucGFpbnRicnVzaCA9IGZhbHNlO1xuXG4gICAgdGhpcy5pbml0KCk7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIGJ1aWxkRnJhbWUoKSB7XG4gICAgdGhpcy5lbGVtZW50ID0gc3ZnLmNyZWF0ZSgnc3ZnJyk7XG4gICAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZSgnd2lkdGgnLCB0aGlzLndpZHRoKTtcbiAgICB0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCB0aGlzLmhlaWdodCk7XG4gICAgdGhpcy5lbGVtZW50LnN0eWxlLnRvcCA9ICcwcHgnO1xuICAgIHRoaXMuZWxlbWVudC5zdHlsZS5sZWZ0ID0gJzBweCc7XG4gICAgdGhpcy5lbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICB0aGlzLnBhcmVudC5hcHBlbmRDaGlsZCh0aGlzLmVsZW1lbnQpO1xuICB9XG5cbiAgYnVpbGRJbnRlcmZhY2UoKSB7XG4gICAgdGhpcy5wYWQgPSBzdmcuY3JlYXRlKCdyZWN0Jyk7XG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMucGFkKTtcblxuICAgIHRoaXMuaW50ZXJhY3Rpb25UYXJnZXQgPSB0aGlzLnBhZDtcblxuICAgIC8qIGV2ZW50cyAqL1xuXG4gICAgaWYgKCF0b3VjaC5leGlzdHMpIHtcbiAgICAgIHRoaXMuY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMubWF0cml4LmludGVyYWN0aW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5tYXRyaXgucGFpbnRicnVzaCA9ICF0aGlzLnN0YXRlO1xuICAgICAgICB0aGlzLmRvd24odGhpcy5tYXRyaXgucGFpbnRicnVzaCk7XG4gICAgICB9O1xuICAgICAgdGhpcy5wYWQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5tYXRyaXguaW50ZXJhY3RpbmcpIHtcbiAgICAgICAgICB0aGlzLmRvd24odGhpcy5tYXRyaXgucGFpbnRicnVzaCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLm1vdmUgPSAoKSA9PiB7fTtcbiAgICAgIHRoaXMucGFkLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGUgPT4ge1xuICAgICAgICBpZiAodGhpcy5tYXRyaXguaW50ZXJhY3RpbmcpIHtcbiAgICAgICAgICBpZiAoIXRoaXMub2Zmc2V0KSB7XG4gICAgICAgICAgICB0aGlzLm9mZnNldCA9IGRvbS5maW5kUG9zaXRpb24odGhpcy5lbGVtZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5tb3VzZSA9IGRvbS5sb2NhdGVNb3VzZShlLCB0aGlzLm9mZnNldCk7XG4gICAgICAgICAgdGhpcy5iZW5kKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnJlbGVhc2UgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMubWF0cml4LmludGVyYWN0aW5nID0gZmFsc2U7XG4gICAgICB9O1xuICAgICAgdGhpcy5wYWQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMubWF0cml4LmludGVyYWN0aW5nKSB7XG4gICAgICAgICAgdGhpcy51cCgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHRoaXMucGFkLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5tYXRyaXguaW50ZXJhY3RpbmcpIHtcbiAgICAgICAgICB0aGlzLnVwKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHNpemVJbnRlcmZhY2UoKSB7XG4gICAgdGhpcy5wYWQuc2V0QXR0cmlidXRlKCd4JywgdGhpcy5wYWRkaW5nQ29sdW1uIC8gMik7XG4gICAgdGhpcy5wYWQuc2V0QXR0cmlidXRlKCd5JywgdGhpcy5wYWRkaW5nUm93IC8gMik7XG4gICAgaWYgKHRoaXMud2lkdGggPiAyKSB7XG4gICAgICB0aGlzLnBhZC5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgdGhpcy53aWR0aCAtIHRoaXMucGFkZGluZ0NvbHVtbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucGFkLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCB0aGlzLndpZHRoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuaGVpZ2h0ID4gMikge1xuICAgICAgdGhpcy5wYWQuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCB0aGlzLmhlaWdodCAtIHRoaXMucGFkZGluZ1Jvdyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucGFkLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgdGhpcy5oZWlnaHQpO1xuICAgIH1cbiAgICB0aGlzLnBhZC5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCB0aGlzLm1hdHJpeC5jb2xvcnMuZmlsbCk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgaWYgKCF0aGlzLnN0YXRlKSB7XG4gICAgICB0aGlzLnBhZC5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCB0aGlzLm1hdHJpeC5jb2xvcnMuZmlsbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucGFkLnNldEF0dHJpYnV0ZSgnZmlsbCcsIHRoaXMubWF0cml4LmNvbG9ycy5hY2NlbnQpO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIFNlcXVlbmNlclxuICpcbiAqIEBkZXNjcmlwdGlvbiBHcmlkIG9mIGJ1dHRvbnMgd2l0aCBidWlsdC1pbiBzdGVwIHNlcXVlbmNlci5cbiAqXG4gKiBAZGVtbyA8ZGl2IG5leHVzLXVpPVwic2VxdWVuY2VyXCIgc3R5bGU9XCJ3aWR0aDo0MDBweDtoZWlnaHQ6MjAwcHg7XCI+PC9kaXY+XG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciBzZXF1ZW5jZXIgPSBuZXcgTmV4dXMuU2VxdWVuY2VyKCcjdGFyZ2V0JylcbiAqXG4gKiBAZXhhbXBsZVxuICogdmFyIHNlcXVlbmNlciA9IG5ldyBOZXh1cy5TZXF1ZW5jZXIoJyN0YXJnZXQnLHtcbiAqICAnc2l6ZSc6IFs0MDAsMjAwXSxcbiAqICAnbW9kZSc6ICd0b2dnbGUnLFxuICogICdyb3dzJzogNSxcbiAqICAnY29sdW1ucyc6IDEwLFxuICogICdwYWRkaW5nUm93JzogMTAsXG4gKiAgJ3BhZGRpbmdDb2x1bW4nOiAyMFxuICp9KVxuICpcbiAqIEBvdXRwdXRcbiAqIGNoYW5nZVxuICogRmlyZXMgYW55IHRpbWUgdGhlIGludGVyZmFjZSdzIG1hdHJpeCBjaGFuZ2VzLiA8YnI+XG4gKiBUaGUgZXZlbnQgZGF0YSBpcyBhbiBvYmplY3QgY29udGFpbmluZyA8aT5yb3c8L2k+IChudW1iZXIpLCA8aT5jb2x1bW48L2k+IChudW1iZXIpLCBhbmQgPGk+c3RhdGU8L2k+IChib29sZWFuKSBwcm9wZXJ0aWVzLlxuICpcbiAqIEBvdXRwdXRleGFtcGxlXG4gKiBzZXF1ZW5jZXIub24oJ2NoYW5nZScsZnVuY3Rpb24odikge1xuICogICBjb25zb2xlLmxvZyh2KTtcbiAqIH0pXG4gKlxuICogQG91dHB1dFxuICogc3RlcFxuICogRmlyZXMgYW55IHRpbWUgdGhlIHNlcXVlbmNlciBzdGVwcyB0byB0aGUgbmV4dCBjb2x1bW4sIGluIHNlcXVlY2UgbW9kZS4gPGJyPlxuICogVGhlIGV2ZW50IGRhdGEgaXMgYW4gPGk+YXJyYXk8L2k+IGNvbnRhaW5pbmcgYWxsIHZhbHVlcyBpbiB0aGUgY29sdW1uLCA8aT5ib3R0b20gcm93IGZpcnN0PC9pPi5cbiAqXG4gKiBAb3V0cHV0ZXhhbXBsZVxuICogc2VxdWVuY2VyLm9uKCdzdGVwJyxmdW5jdGlvbih2KSB7XG4gKiAgIGNvbnNvbGUubG9nKHYpO1xuICogfSlcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZXF1ZW5jZXIgZXh0ZW5kcyBJbnRlcmZhY2Uge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBsZXQgb3B0aW9ucyA9IFsndmFsdWUnXTtcblxuICAgIGxldCBkZWZhdWx0cyA9IHtcbiAgICAgIHNpemU6IFs0MDAsIDIwMF0sXG4gICAgICBtb2RlOiAndG9nZ2xlJyxcbiAgICAgIHJvd3M6IDUsXG4gICAgICBjb2x1bW5zOiAxMFxuICAgIH07XG5cbiAgICBzdXBlcihhcmd1bWVudHMsIG9wdGlvbnMsIGRlZmF1bHRzKTtcblxuICAgIHRoaXMuYWN0aXZlID0gLTE7XG5cbiAgICAvKipcbiAgICAgKiBCdXR0b24gaW50ZXJhY3Rpb24gbW9kZTogc2VlIEJ1dHRvblxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICogQGV4YW1wbGUgYnV0dG9uLm1vZGUgPSAndG9nZ2xlJztcbiAgICAgKi9cbiAgICB0aGlzLm1vZGUgPSB0aGlzLnNldHRpbmdzLm1vZGU7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgaW50ZXJ2YWwgb2JqZWN0IHdoaWNoIGNvbnRyb2xzIHRpbWluZyBhbmQgc2VxdWVuY2Ugc2NoZWR1bGluZy5cbiAgICAgKiBAdHlwZSB7aW50ZXJ2YWx9XG4gICAgICovXG4gICAgdGhpcy5pbnRlcnZhbCA9IG5ldyBJbnRlcnZhbCgyMDAsIGZ1bmN0aW9uKCkge30sIGZhbHNlKTsgLy8ganNoaW50IGlnbm9yZTpsaW5lXG5cbiAgICAvKipcbiAgICAgKiBBIE1hdHJpeCBtb2RlbCBjb250YWluaW5nIG1ldGhvZHMgZm9yIG1hbmlwdWxhdGluZyB0aGUgc2VxdWVuY2VyJ3MgYXJyYXkgb2YgdmFsdWVzLiBUbyBsZWFybiBob3cgdG8gbWFuaXB1bGF0ZSB0aGUgbWF0cml4LCByZWFkIGFib3V0IHRoZSBtYXRyaXggbW9kZWwuXG4gICAgICogQHR5cGUge21hdHJpeH1cbiAgICAgKi9cbiAgICB0aGlzLm1hdHJpeCA9IG5ldyBNYXRyaXhNb2RlbCh0aGlzLnNldHRpbmdzLnJvd3MsIHRoaXMuc2V0dGluZ3MuY29sdW1ucyk7XG4gICAgdGhpcy5tYXRyaXgudWkgPSB0aGlzO1xuXG4gICAgLyoqXG4gICAgICogQSBDb3VudGVyIG1vZGVsIHdoaWNoIHRoZSBzZXF1ZW5jZXIgc3RlcHMgdGhyb3VnaC4gRm9yIGV4YW1wbGUsIHlvdSBjb3VsZCB1c2UgdGhpcyBtb2RlbCB0byBzdGVwIHRocm91Z2ggdGhlIHNlcXVlbmNlciBpbiByZXZlcnNlLCByYW5kb21seSwgb3IgaW4gYSBkcnVuayB3YWxrLlxuICAgICAqIEB0eXBlIHtjb3VudGVyfVxuICAgICAqL1xuICAgIHRoaXMuc3RlcHBlciA9IG5ldyBDb3VudGVyTW9kZWwoMCwgdGhpcy5jb2x1bW5zKTtcblxuICAgIHRoaXMucGFkZGluZ1JvdyA9IHRoaXMuc2V0dGluZ3MucGFkZGluZ1JvdztcbiAgICB0aGlzLnBhZGRpbmdDb2x1bW4gPSB0aGlzLnNldHRpbmdzLnBhZGRpbmdDb2x1bW47XG5cbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG4gIGJ1aWxkRnJhbWUoKSB7XG4gICAgdGhpcy5lbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5lbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJztcbiAgICB0aGlzLmVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgdGhpcy5lbGVtZW50LnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgIHRoaXMuZWxlbWVudC5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XG4gICAgdGhpcy5wYXJlbnQuYXBwZW5kQ2hpbGQodGhpcy5lbGVtZW50KTtcbiAgICBpZiAodG91Y2guZXhpc3RzKSB7XG4gICAgICB0aGlzLmFkZFRvdWNoTGlzdGVuZXJzKCk7XG4gICAgfVxuICB9XG5cbiAgYnVpbGRJbnRlcmZhY2UoKSB7XG4gICAgdGhpcy5jZWxscyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5tYXRyaXgubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBsb2NhdGlvbiA9IHRoaXMubWF0cml4LmxvY2F0ZShpKTtcbiAgICAgIC8vIHJldHVybnMge3Jvdyxjb2x9XG5cbiAgICAgIGxldCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICBjb250YWluZXIuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuXG4gICAgICBsZXQgY2VsbCA9IG5ldyBNYXRyaXhDZWxsKFxuICAgICAgICBjb250YWluZXIsXG4gICAgICAgIHtcbiAgICAgICAgICBjb21wb25lbnQ6IHRydWUsXG4gICAgICAgICAgaW5kZXg6IGksXG4gICAgICAgICAgcm93OiBsb2NhdGlvbi5yb3csXG4gICAgICAgICAgY29sdW1uOiBsb2NhdGlvbi5jb2x1bW4sXG4gICAgICAgICAgbW9kZTogdGhpcy5tb2RlLFxuICAgICAgICAgIG1hdHJpeDogdGhpcyxcbiAgICAgICAgICBwYWRkaW5nUm93OiB0aGlzLnBhZGRpbmdSb3csXG4gICAgICAgICAgcGFkZGluZ0NvbHVtbjogdGhpcy5wYWRkaW5nQ29sdW1uXG4gICAgICAgIH0sXG4gICAgICAgIHRoaXMua2V5Q2hhbmdlLmJpbmQodGhpcywgaSlcbiAgICAgICk7XG5cbiAgICAgIC8vICBjZWxsLm1hdHJpeCA9IHRoaXM7XG4gICAgICBpZiAodG91Y2guZXhpc3RzKSB7XG4gICAgICAgIGNlbGwucGFkLmluZGV4ID0gaTtcbiAgICAgICAgY2VsbC5wcmVDbGljayA9IGNlbGwucHJlTW92ZSA9IGNlbGwucHJlUmVsZWFzZSA9ICgpID0+IHt9O1xuICAgICAgICBjZWxsLmNsaWNrID0gY2VsbC5tb3ZlID0gY2VsbC5yZWxlYXNlID0gKCkgPT4ge307XG4gICAgICAgIGNlbGwucHJlVG91Y2ggPSBjZWxsLnByZVRvdWNoTW92ZSA9IGNlbGwucHJlVG91Y2hSZWxlYXNlID0gKCkgPT4ge307XG4gICAgICAgIGNlbGwudG91Y2ggPSBjZWxsLnRvdWNoTW92ZSA9IGNlbGwudG91Y2hSZWxlYXNlID0gKCkgPT4ge307XG4gICAgICB9XG5cbiAgICAgIHRoaXMuY2VsbHMucHVzaChjZWxsKTtcbiAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZChjb250YWluZXIpO1xuICAgIH1cbiAgICB0aGlzLnNpemVJbnRlcmZhY2UoKTtcbiAgfVxuXG4gIHNpemVJbnRlcmZhY2UoKSB7XG4gICAgbGV0IGNlbGxXaWR0aCA9IHRoaXMud2lkdGggLyB0aGlzLmNvbHVtbnM7XG4gICAgbGV0IGNlbGxIZWlnaHQgPSB0aGlzLmhlaWdodCAvIHRoaXMucm93cztcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jZWxscy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IGNvbnRhaW5lciA9IHRoaXMuY2VsbHNbaV0ucGFyZW50O1xuICAgICAgY29udGFpbmVyLnN0eWxlLmxlZnQgPSB0aGlzLmNlbGxzW2ldLmNvbHVtbiAqIGNlbGxXaWR0aCArICdweCc7XG4gICAgICBjb250YWluZXIuc3R5bGUudG9wID0gdGhpcy5jZWxsc1tpXS5yb3cgKiBjZWxsSGVpZ2h0ICsgJ3B4JztcbiAgICAgIHRoaXMuY2VsbHNbaV0ucmVzaXplKGNlbGxXaWR0aCwgY2VsbEhlaWdodCk7XG4gICAgfVxuICB9XG5cbiAgY29sb3JJbnRlcmZhY2UoKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmNlbGxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLmNlbGxzW2ldLnJlbmRlcigpO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZSgpIHtcbiAgICAvLyAgY29uc29sZS5sb2coXCJ1cGRhdGluZy4uLlwiKVxuICAgIC8vb24gPSBvbiB8fCBmYWxzZTtcbiAgICB0aGlzLm1hdHJpeC5pdGVyYXRlKChyLCBjLCBpKSA9PiB7XG4gICAgICAvLyAgY29uc29sZS5sb2codGhpcy5tYXRyaXgucGF0dGVybltyXVtjXSwgdGhpcy5jZWxsc1tpXS5zdGF0ZSk7XG4gICAgICBpZiAodGhpcy5tYXRyaXgucGF0dGVybltyXVtjXSAhPT0gdGhpcy5jZWxsc1tpXS5zdGF0ZSkge1xuICAgICAgICBpZiAodGhpcy5tYXRyaXgucGF0dGVybltyXVtjXSA+IDApIHtcbiAgICAgICAgICB0aGlzLmNlbGxzW2ldLnR1cm5PbigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuY2VsbHNbaV0udHVybk9mZigpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvLyB1cGRhdGUgPT4gY2VsbC50dXJuT24gPT4gY2VsbC5lbWl0ID0+IGtleUNoYW5nZSAoc2VxLmVtaXQpID0+IG1hdHJpeC5zZXQuY2VsbCA9PiB1cGRhdGVcbiAgLy9cbiAgLy8gaW50ZXJhY3Rpb24gPT4ga2V5Q2hhbmdlID0+IG1hdHJpeC5zZXQuY2VsbCA9PiB1cGRhdGUgPT4gY2VsbC50dXJuT25cbiAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9PiBlbWl0XG4gIC8vXG4gIC8vIHNldC5jZWxsID0+IHVwZGF0ZSA9PiBuZWVkcyB0byBlbWl0LlxuXG4gIGtleUNoYW5nZShub3RlLCBvbikge1xuICAgIC8vIGVtaXQgZGF0YSBmb3IgYW55IGtleSB0dXJuaW5nIG9uL29mZlxuICAgIC8vIGkgaXMgdGhlIG5vdGUgaW5kZXhcbiAgICAvLyB2IGlzIHdoZXRoZXIgaXQgaXMgb24gb3Igb2ZmXG4gICAgbGV0IGNlbGwgPSB0aGlzLm1hdHJpeC5sb2NhdGUobm90ZSk7XG4gICAgLy8gIHRoaXMubWF0cml4LnNldC5jZWxsKGNlbGwuY29sdW1uLGNlbGwucm93LG9uKTtcbiAgICB0aGlzLm1hdHJpeC5wYXR0ZXJuW2NlbGwucm93XVtjZWxsLmNvbHVtbl0gPSBvbjtcbiAgICB2YXIgZGF0YSA9IHtcbiAgICAgIHJvdzogY2VsbC5yb3csXG4gICAgICBjb2x1bW46IGNlbGwuY29sdW1uLFxuICAgICAgc3RhdGU6IG9uXG4gICAgfTtcbiAgICB0aGlzLmVtaXQoJ2NoYW5nZScsIGRhdGEpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGlmICh0aGlzLnN0ZXBwZXIudmFsdWUgPj0gMCkge1xuICAgICAgdGhpcy5tYXRyaXguaXRlcmF0ZSgociwgYywgaSkgPT4ge1xuICAgICAgICBpZiAoYyA9PT0gdGhpcy5zdGVwcGVyLnZhbHVlKSB7XG4gICAgICAgICAgdGhpcy5jZWxsc1tpXS5wYWQuc2V0QXR0cmlidXRlKCdzdHJva2UnLCB0aGlzLmNvbG9ycy5tZWRpdW1MaWdodCk7XG4gICAgICAgICAgdGhpcy5jZWxsc1tpXS5wYWQuc2V0QXR0cmlidXRlKCdzdHJva2Utd2lkdGgnLCAnMScpO1xuICAgICAgICAgIHRoaXMuY2VsbHNbaV0ucGFkLnNldEF0dHJpYnV0ZSgnc3Ryb2tlLW9wYWNpdHknLCAnMScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuY2VsbHNbaV0ucGFkLnNldEF0dHJpYnV0ZSgnc3Ryb2tlJywgJ25vbmUnKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFN0YXJ0IHNlcXVlbmNpbmdcbiAgICogQHBhcmFtICB7bnVtYmVyfSBtcyBCZWF0IHRlbXBvIGluIG1pbGxpc2Vjb25kc1xuICAgKi9cbiAgc3RhcnQobXMpIHtcbiAgICB0aGlzLmludGVydmFsLmV2ZW50ID0gdGhpcy5uZXh0LmJpbmQodGhpcyk7XG4gICAgaWYgKG1zKSB7XG4gICAgICB0aGlzLmludGVydmFsLm1zKG1zKTtcbiAgICB9XG4gICAgdGhpcy5pbnRlcnZhbC5zdGFydCgpO1xuICB9XG5cbiAgLyoqXG4gIFN0b3Agc2VxdWVuY2luZ1xuICAqL1xuICBzdG9wKCkge1xuICAgIHRoaXMuaW50ZXJ2YWwuc3RvcCgpO1xuICB9XG5cbiAgLyoqXG4gIE1hbnVhbGx5IGp1bXAgdG8gdGhlIG5leHQgY29sdW1uIGFuZCB0cmlnZ2VyIHRoZSAnY2hhbmdlJyBldmVudC4gVGhlIFwibmV4dFwiIGNvbHVtbiBpcyBkZXRlcm1pbmVkIGJ5IHlvdXIgbW9kZSBvZiBzZXF1ZW5jaW5nLlxuICAqL1xuICBuZXh0KCkge1xuICAgIHRoaXMuc3RlcHBlci5uZXh0KCk7XG4gICAgdGhpcy5lbWl0KCdzdGVwJywgdGhpcy5tYXRyaXguY29sdW1uKHRoaXMuc3RlcHBlci52YWx1ZSkucmV2ZXJzZSgpKTtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgYWRkVG91Y2hMaXN0ZW5lcnMoKSB7XG4gICAgdGhpcy5wcmVDbGljayA9IHRoaXMucHJlTW92ZSA9IHRoaXMucHJlUmVsZWFzZSA9ICgpID0+IHt9O1xuICAgIHRoaXMuY2xpY2sgPSB0aGlzLm1vdmUgPSB0aGlzLnJlbGVhc2UgPSAoKSA9PiB7fTtcbiAgICB0aGlzLnByZVRvdWNoID0gdGhpcy5wcmVUb3VjaE1vdmUgPSB0aGlzLnByZVRvdWNoUmVsZWFzZSA9ICgpID0+IHt9O1xuICAgIHRoaXMudG91Y2ggPSB0aGlzLnRvdWNoTW92ZSA9IHRoaXMudG91Y2hSZWxlYXNlID0gKCkgPT4ge307XG5cbiAgICB0aGlzLmN1cnJlbnRFbGVtZW50ID0gZmFsc2U7XG5cbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIGUgPT4ge1xuICAgICAgbGV0IGVsZW1lbnQgPSBkb2N1bWVudC5lbGVtZW50RnJvbVBvaW50KFxuICAgICAgICBlLnRhcmdldFRvdWNoZXNbMF0uY2xpZW50WCxcbiAgICAgICAgZS50YXJnZXRUb3VjaGVzWzBdLmNsaWVudFlcbiAgICAgICk7XG4gICAgICBsZXQgY2VsbCA9IHRoaXMuY2VsbHNbZWxlbWVudC5pbmRleF07XG4gICAgICB0aGlzLnBhaW50YnJ1c2ggPSAhY2VsbC5zdGF0ZTtcbiAgICAgIGNlbGwuZG93bih0aGlzLnBhaW50YnJ1c2gpO1xuICAgICAgdGhpcy5jdXJyZW50RWxlbWVudCA9IGVsZW1lbnQuaW5kZXg7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIGUgPT4ge1xuICAgICAgbGV0IGVsZW1lbnQgPSBkb2N1bWVudC5lbGVtZW50RnJvbVBvaW50KFxuICAgICAgICBlLnRhcmdldFRvdWNoZXNbMF0uY2xpZW50WCxcbiAgICAgICAgZS50YXJnZXRUb3VjaGVzWzBdLmNsaWVudFlcbiAgICAgICk7XG4gICAgICBsZXQgY2VsbCA9IHRoaXMuY2VsbHNbZWxlbWVudC5pbmRleF07XG4gICAgICBpZiAoZWxlbWVudC5pbmRleCAhPT0gdGhpcy5jdXJyZW50RWxlbWVudCkge1xuICAgICAgICBpZiAodGhpcy5jdXJyZW50RWxlbWVudCA+PSAwKSB7XG4gICAgICAgICAgbGV0IHBhc3RDZWxsID0gdGhpcy5jZWxsc1t0aGlzLmN1cnJlbnRFbGVtZW50XTtcbiAgICAgICAgICBwYXN0Q2VsbC51cCgpO1xuICAgICAgICB9XG4gICAgICAgIGNlbGwuZG93bih0aGlzLnBhaW50YnJ1c2gpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2VsbC5iZW5kKCk7XG4gICAgICB9XG4gICAgICB0aGlzLmN1cnJlbnRFbGVtZW50ID0gZWxlbWVudC5pbmRleDtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBlID0+IHtcbiAgICAgIC8vIG5vIHRvdWNoZXMgdG8gY2FsY3VsYXRlIGJlY2F1c2Ugbm9uZSByZW1haW5pbmdcbiAgICAgIGxldCBjZWxsID0gdGhpcy5jZWxsc1t0aGlzLmN1cnJlbnRFbGVtZW50XTtcbiAgICAgIGNlbGwudXAoKTtcbiAgICAgIHRoaXMuaW50ZXJhY3RpbmcgPSBmYWxzZTtcbiAgICAgIHRoaXMuY3VycmVudEVsZW1lbnQgPSBmYWxzZTtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgTnVtYmVyIG9mIHJvd3MgaW4gdGhlIHNlcXVlbmNlclxuICBAdHlwZSB7bnVtYmVyfVxuICAqL1xuICBnZXQgcm93cygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXRyaXgucm93cztcbiAgfVxuXG4gIHNldCByb3dzKHYpIHtcbiAgICB0aGlzLm1hdHJpeC5yb3dzID0gdjtcbiAgICB0aGlzLmVtcHR5KCk7XG4gICAgdGhpcy5idWlsZEludGVyZmFjZSgpO1xuICAgIHRoaXMudXBkYXRlKCk7XG4gIH1cblxuICAvKipcbiAgTnVtYmVyIG9mIGNvbHVtbnMgaW4gdGhlIHNlcXVlbmNlclxuICBAdHlwZSB7bnVtYmVyfVxuICAqL1xuICBnZXQgY29sdW1ucygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXRyaXguY29sdW1ucztcbiAgfVxuXG4gIHNldCBjb2x1bW5zKHYpIHtcbiAgICB0aGlzLm1hdHJpeC5jb2x1bW5zID0gdjtcbiAgICB0aGlzLnN0ZXBwZXIubWF4ID0gdjtcbiAgICB0aGlzLmVtcHR5KCk7XG4gICAgdGhpcy5idWlsZEludGVyZmFjZSgpO1xuICAgIHRoaXMudXBkYXRlKCk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vanNoaW50LWxvYWRlciEuL2xpYi9pbnRlcmZhY2VzL3NlcXVlbmNlci5qcyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IG1hdGggZnJvbSAnLi4vdXRpbC9tYXRoJztcbmltcG9ydCBTZXF1ZW5jZSBmcm9tICcuLi9tb2RlbHMvc2VxdWVuY2UnO1xuXG4vLyBGb3IgdGhlIHR1dG9yaWFsLCBsb29raW5nIGF0XG5cbi8vUGF0dGVybiBzZWN0aW9uOlxuLy8gLmNyZWF0ZSgpLCAucm93cywgLmNvbHVtbnMsXG4vLyAucGF0dGVybiwgLmxlbmd0aCwgLmZvcm1hdEFzVGV4dCgpLCAubG9nKCksXG4vLyAubG9jYXRlKGkpLCAuaW5kZXhPZihjLHIpXG4vLyByb3coKSwgY29sdW1uKCkgKHJldHVybnMgY29udGVudHMgb2Ygcm93IG9yIGNvbHVtKVxuXG4vL0NvbnRyb2wgc2VjdGlvbjpcbi8vIHRvZ2dsZSB4M1xuLy8gc2V0IHg0XG4vLyByb3RhdGUgeDNcbi8vIHBvcHVsYXRlIHgzXG4vLyBlcmFzZSB4M1xuXG5cbi8vIHNob3VsZCBzb21lIHZlcnNpb24gb2YgdGhpcyBoYXZlIGEgZmxvYXQgdmFsdWUgZm9yIGVhY2ggY2VsbD9cbi8vIGNvdWxkIGJlIGxpa2UgYSBtaXJyb3IgLnBhdHRlcm4gdGhhdCBoYXMgdmFsdWVzLiBieSBkZWZhdWx0LCBldmVyeXRoaW5nIGlzIDEsIGJ1dCBjb3VsZCBiZSBzZXQuLi5cbi8vIG5vdCBhIGdvb2Qgd2F5IHRvIGRvIHRoYXQgb24gaW50ZXJmYWNlLCBidXQgYXMgYSBtb2RlbCBpdCB3b3VsZCBiZSBuaWNlLi4uXG4vLyBmb3IgLmZvcm1hdEFzVGV4dCgpLCBjb3VsZCBtdWx0aXBseSBieSAxMDAgYW5kIGZsb29yLCBzbyBlYWNoIGNlbGwgaXMgYW4gaW50IGZyb20gMCB0byA5XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hdHJpeCB7XG5cbiAgY29uc3RydWN0b3Iocm93cyxjb2x1bW5zKSB7XG4gICAgLy8gc2hvdWxkIGFsc28gaGF2ZSBhYmlsaXR5IHRvIGNyZWF0ZSB1c2luZyBhbiBleGlzdGluZyBtYXRyaXggKDJkIGFycmF5KVxuICAgIHRoaXMucGF0dGVybiA9IFtdO1xuICAgIHRoaXMuY3JlYXRlKHJvd3MsY29sdW1ucyk7XG5cbiAgICB0aGlzLnRvZ2dsZSA9IHtcbiAgICAgIGNlbGw6IChjb2x1bW4sIHJvdykgPT4ge1xuICAgICAgICB0aGlzLnBhdHRlcm5bcm93XVtjb2x1bW5dID0gIXRoaXMucGF0dGVybltyb3ddW2NvbHVtbl07IC8vIG1hdGguaW52ZXJ0KHRoaXMucGF0dGVybltyb3ddW2NvbHVtbl0pO1xuICAgICAgICBpZiAodGhpcy51aSkgeyB0aGlzLnVpLnVwZGF0ZSgpOyB9XG4gICAgICAgIHJldHVybiB0aGlzLnBhdHRlcm5bcm93XVtjb2x1bW5dO1xuICAgICAgfSxcbiAgICAgIGFsbDogKCkgPT4ge1xuICAgICAgICB0aGlzLml0ZXJhdGUoKHIsYykgPT4geyB0aGlzLnRvZ2dsZS5jZWxsKGMscik7IH0pO1xuICAgICAgICBpZiAodGhpcy51aSkgeyB0aGlzLnVpLnVwZGF0ZSgpOyB9XG4gICAgICB9LFxuICAgICAgcm93OiAocm93KSA9PiB7XG4gICAgICAgIGZvciAobGV0IGk9MDsgaTx0aGlzLmNvbHVtbnM7IGkrKykge1xuICAgICAgICAgIHRoaXMudG9nZ2xlLmNlbGwoaSxyb3cpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnVpKSB7IHRoaXMudWkudXBkYXRlKCk7IH1cbiAgICAgIH0sXG4gICAgICBjb2x1bW46IChjb2x1bW4pID0+IHtcbiAgICAgICAgZm9yIChsZXQgaT0wOyBpPHRoaXMucm93czsgaSsrKSB7XG4gICAgICAgICAgdGhpcy50b2dnbGUuY2VsbChjb2x1bW4saSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMudWkpIHsgdGhpcy51aS51cGRhdGUoKTsgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLnNldCA9IHtcbiAgICAgIGNlbGw6IChjb2x1bW4sIHJvdywgdmFsdWUpID0+IHtcbiAgICAgICAgdGhpcy5wYXR0ZXJuW3Jvd11bY29sdW1uXSA9IHZhbHVlO1xuICAgICAgICBpZiAodGhpcy51aSkgeyB0aGlzLnVpLnVwZGF0ZSgpOyB9XG4gICAgICB9LFxuICAgICAgYWxsOiAodmFsdWVzKSA9PiB7XG4gICAgICAgIC8vIHNldCB0aGUgd2hvbGUgbWF0cml4IHVzaW5nIGEgMmQgYXJyYXkgYXMgaW5wdXRcbiAgICAgICAgLy8gdGhpcyBzaG91bGQgYWxzbyByZXNpemUgdGhlIGFycmF5P1xuICAgICAgICB0aGlzLnBhdHRlcm4gPSB2YWx1ZXM7XG4gICAgICAgIGlmICh0aGlzLnVpKSB7IHRoaXMudWkudXBkYXRlKCk7IH1cbiAgICAgIH0sXG4gICAgICByb3c6IChyb3csdmFsdWVzKSA9PiB7XG4gICAgICAgIC8vIHNldCBhIHJvdyB1c2luZyBhbiBhcnJheSBhcyBpbnB1dFxuICAgICAgICB0aGlzLnBhdHRlcm5bcm93XSA9IHZhbHVlcztcbiAgICAgICAgaWYgKHRoaXMudWkpIHsgdGhpcy51aS51cGRhdGUoKTsgfVxuICAgICAgfSxcbiAgICAgIGNvbHVtbjogKGNvbHVtbix2YWx1ZXMpID0+IHtcbiAgICAgICAgLy8gc2V0IGEgY29sdW1uIHVzaW5nIGFuIGFycmF5IGFzIGlucHV0XG4gICAgICAgIHRoaXMucGF0dGVybi5mb3JFYWNoKChyb3csaSkgPT4ge1xuICAgICAgICAgIHRoaXMucGF0dGVybltpXVtjb2x1bW5dID0gdmFsdWVzW2ldO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHRoaXMudWkpIHsgdGhpcy51aS51cGRhdGUoKTsgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLnJvdGF0ZSA9IHtcbiAgICAgIC8vc2hvdWxkIGV2ZW50dWFsbHkgZG8gKGFtb3VudFgsIGFtb3VudFkpIGhlcmVcbiAgICAgIC8vIGNvdWxkIGp1c3QgdXNlIGEgbG9vcCBhbmQgdGhpcy5yb3RhdGUucm93KGksYW1vdW50WCk7XG4gICAgICBhbGw6IChhbW91bnQpID0+IHtcbiAgICAgICAgaWYgKCFhbW91bnQgJiYgYW1vdW50IT09MCkge1xuICAgICAgICAgIGFtb3VudCA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgYW1vdW50ICU9IHRoaXMucGF0dGVyblswXS5sZW5ndGg7XG4gICAgICAgIGlmIChhbW91bnQgPCAwKSB7XG4gICAgICAgICAgYW1vdW50ID0gdGhpcy5wYXR0ZXJuWzBdLmxlbmd0aCArIGFtb3VudDtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBpPTA7IGk8dGhpcy5yb3dzOyBpKyspIHtcbiAgICAgICAgICBsZXQgY3V0ID0gdGhpcy5wYXR0ZXJuW2ldLnNwbGljZSggdGhpcy5wYXR0ZXJuW2ldLmxlbmd0aCAtIGFtb3VudCwgYW1vdW50ICk7XG4gICAgICAgICAgdGhpcy5wYXR0ZXJuW2ldID0gY3V0LmNvbmNhdCggdGhpcy5wYXR0ZXJuW2ldICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMudWkpIHsgdGhpcy51aS51cGRhdGUoKTsgfVxuICAgICAgfSxcbiAgICAgIHJvdzogKHJvdyxhbW91bnQpID0+IHtcbiAgICAgICAgaWYgKCFhbW91bnQgJiYgYW1vdW50IT09MCkge1xuICAgICAgICAgIGFtb3VudCA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgYW1vdW50ICU9IHRoaXMucGF0dGVyblswXS5sZW5ndGg7XG4gICAgICAgIGlmIChhbW91bnQgPCAwKSB7XG4gICAgICAgICAgYW1vdW50ID0gdGhpcy5wYXR0ZXJuWzBdLmxlbmd0aCArIGFtb3VudDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgY3V0ID0gdGhpcy5wYXR0ZXJuW3Jvd10uc3BsaWNlKCB0aGlzLnBhdHRlcm5bcm93XS5sZW5ndGggLSBhbW91bnQsIGFtb3VudCApO1xuICAgICAgICB0aGlzLnBhdHRlcm5bcm93XSA9IGN1dC5jb25jYXQoIHRoaXMucGF0dGVybltyb3ddICk7XG4gICAgICAgIGlmICh0aGlzLnVpKSB7IHRoaXMudWkudXBkYXRlKCk7IH1cbiAgICAgIH0sXG4gICAgICBjb2x1bW46IChjb2x1bW4sIGFtb3VudCkgPT4ge1xuICAgICAgICBpZiAoIWFtb3VudCAmJiBhbW91bnQhPT0wKSB7XG4gICAgICAgICAgYW1vdW50ID0gMTtcbiAgICAgICAgfVxuICAgICAgICBhbW91bnQgJT0gdGhpcy5wYXR0ZXJuLmxlbmd0aDtcbiAgICAgICAgaWYgKGFtb3VudCA8IDApIHtcbiAgICAgICAgICBhbW91bnQgPSB0aGlzLnBhdHRlcm4ubGVuZ3RoICsgYW1vdW50O1xuICAgICAgICB9XG4gICAgICAgIGxldCBwcm94eSA9IFtdO1xuICAgICAgICB0aGlzLnBhdHRlcm4uZm9yRWFjaCgocm93KSA9PiB7XG4gICAgICAgICAgcHJveHkucHVzaCggcm93W2NvbHVtbl0gKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGxldCBjdXQgPSBwcm94eS5zcGxpY2UoIHByb3h5Lmxlbmd0aCAtIGFtb3VudCwgYW1vdW50ICk7XG4gICAgICAgIHByb3h5ID0gY3V0LmNvbmNhdCggcHJveHkgKTtcbiAgICAgICAgdGhpcy5wYXR0ZXJuLmZvckVhY2goKHJvdyxpKSA9PiB7XG4gICAgICAgICAgcm93W2NvbHVtbl0gPSBwcm94eVtpXTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICh0aGlzLnVpKSB7IHRoaXMudWkudXBkYXRlKCk7IH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gdGhlIGlkZWEgYmVoaW5kIHBvcHVsYXRlIGlzIHRvIGJlIGFibGUgdG8gc2V0IGEgd2hvbGUgcm93IG9yIGNvbHVtbiB0byAwIG9yIDFcbiAgICAvLyBJRiB0aGUgdmFsdWUgaXMgYSBmbG9hdCwgc3VjaCBhcyAwLjcsIHRoZW4gaXQgd291bGQgYmVjb21lIGEgcHJvYmFiaWxpdHlcbiAgICAvLyBzbyBwb3B1bGF0ZSgwLjcpIHdvdWxkIGdpdmUgZWFjaCBjZWxsIGEgNzAlIGNoYW5jZSBvZiBiZWluZyAxXG4gICAgdGhpcy5wb3B1bGF0ZSA9IHtcbiAgICAgIGFsbDogKG9kZHMpID0+IHtcbiAgICAgICAgbGV0IG9kZHNTZXF1ZW5jZSA9IG5ldyBTZXF1ZW5jZShvZGRzKTtcbiAgICAgICAgdGhpcy5pdGVyYXRlKChyLGMpID0+IHtcbiAgICAgICAgICB0aGlzLnBhdHRlcm5bcl1bY10gPSBtYXRoLmNvaW4ob2Rkc1NlcXVlbmNlLm5leHQoKSk7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBUaGlzIGNvdWxkIGJlIHVzZWQgc28gdGhhdCBlYWNoIHJvdyBoYXMgc2FtZSBvZGRzIHBhdHRlcm4sIGV2ZW4gaWYgcm93IGxlbmd0aCBpcyBub3QgZGl2aXNpYmx5IGJ5IHNlcXVlbmNlIGxlbmd0aC5cbiAgICAgICAgLy8sKCkgPT4ge1xuICAgICAgICAvLyAgb2Rkcy5wb3MgPSAtMTtcbiAgICAgICAgLy8gfVxuICAgICAgICBpZiAodGhpcy51aSkgeyB0aGlzLnVpLnVwZGF0ZSgpOyB9XG4gICAgICB9LFxuICAgICAgcm93OiAocm93PTAsb2Rkcz0xKSA9PiB7XG4gICAgICAgIGxldCBvZGRzU2VxdWVuY2UgPSBuZXcgU2VxdWVuY2Uob2Rkcyk7XG4gICAgICAgIHRoaXMucGF0dGVybltyb3ddLmZvckVhY2goKGNlbGwsaSkgPT4ge1xuICAgICAgICAgIHRoaXMucGF0dGVybltyb3ddW2ldID0gbWF0aC5jb2luKG9kZHNTZXF1ZW5jZS5uZXh0KCkpO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHRoaXMudWkpIHsgdGhpcy51aS51cGRhdGUoKTsgfVxuICAgICAgfSxcbiAgICAgIGNvbHVtbjogKGNvbHVtbj0wLG9kZHM9MSkgPT4ge1xuICAgICAgICBsZXQgb2Rkc1NlcXVlbmNlID0gbmV3IFNlcXVlbmNlKG9kZHMpO1xuICAgICAgICB0aGlzLnBhdHRlcm4uZm9yRWFjaCgocm93LGkpID0+IHtcbiAgICAgICAgICB0aGlzLnBhdHRlcm5baV1bY29sdW1uXSA9IG1hdGguY29pbihvZGRzU2VxdWVuY2UubmV4dCgpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICh0aGlzLnVpKSB7IHRoaXMudWkudXBkYXRlKCk7IH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gZXNzZW50aWFsbCBwb3B1bGF0ZSgwKSBzbyBpJ20gbm90IHN1cmUgaWYgdGhpcyBpcyBuZWNlc3NhcnkgYnV0IGlzIG5pY2VcbiAgICB0aGlzLmVyYXNlID0ge1xuICAgICAgYWxsOiAoKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0LmFsbCgwKTtcbiAgICAgIH0sXG4gICAgICByb3c6IChyb3cpID0+IHtcbiAgICAgICAgdGhpcy5zZXQucm93KHJvdywwKTtcbiAgICAgIH0sXG4gICAgICBjb2x1bW46IChjb2x1bW4pID0+IHtcbiAgICAgICAgdGhpcy5zZXQuY29sdW1uKGNvbHVtbiwwKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gIC8vIGVuZCBjb25zdHJ1Y3RvclxuICB9XG5cblxuICBjcmVhdGUocm93cyxjb2x1bW5zKSB7XG4gICAgdGhpcy5wYXR0ZXJuID0gW107XG4gICAgZm9yICggbGV0IHJvdz0wOyByb3cgPCByb3dzOyByb3crKyApIHtcbiAgICAgIGxldCBhcnIgPSBuZXcgQXJyYXkoY29sdW1ucyk7XG4gICAgICB0aGlzLnBhdHRlcm4ucHVzaChhcnIpO1xuICAgIH1cbiAgICB0aGlzLml0ZXJhdGUoKHIsYykgPT4geyB0aGlzLnBhdHRlcm5bcl1bY10gPSBmYWxzZTsgfSk7XG4gIH1cblxuICBpdGVyYXRlKGYsIGYyKSB7XG4gICAgbGV0IGkgPSAwO1xuICAgIGZvciAoIGxldCByb3c9MDsgcm93IDwgdGhpcy5yb3dzOyByb3crKyApIHtcbiAgICAgIGlmIChmMikgeyBmMihyb3cpOyB9XG4gICAgICBmb3IgKCBsZXQgY29sdW1uPTA7IGNvbHVtbiA8IHRoaXMuY29sdW1uczsgY29sdW1uKysgKSB7XG4gICAgICAgIGYocm93LGNvbHVtbixpKTtcbiAgICAgICAgaSsrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZvcm1hdEFzVGV4dCgpIHtcbiAgICBsZXQgcGF0dGVyblN0cmluZyA9ICcnO1xuICAgIHRoaXMuaXRlcmF0ZShcbiAgICAgIChyLGMpID0+IHsgcGF0dGVyblN0cmluZyArPSAodGhpcy5wYXR0ZXJuW3JdW2NdID8gMSA6IDApICsgJyAnOyB9LFxuICAgICAgKCkgPT4geyBwYXR0ZXJuU3RyaW5nICs9ICdcXG4nOyB9XG4gICAgKTtcbiAgICByZXR1cm4gcGF0dGVyblN0cmluZztcbiAgfVxuXG4gIGxvZygpIHtcbiAgICBjb25zb2xlLmxvZyh0aGlzLmZvcm1hdEFzVGV4dCgpKTtcbiAgfVxuXG4gIHVwZGF0ZShwYXR0ZXJuKSB7XG4gICAgdGhpcy5wYXR0ZXJuID0gcGF0dGVybiB8fCB0aGlzLnBhdHRlcm47XG4gIH1cblxuICBnZXQgbGVuZ3RoKCkge1xuICAgIHJldHVybiB0aGlzLnJvd3MqdGhpcy5jb2x1bW5zO1xuICB9XG5cbiAgbG9jYXRlKGluZGV4KSB7XG4gICAgLy8gcmV0dXJucyByb3cgYW5kIGNvbHVtbiBvZiBjZWxsIGJ5IGluZGV4XG4gICAgcmV0dXJuIHtcbiAgICAgIHJvdzogfn4oIGluZGV4IC8gdGhpcy5jb2x1bW5zICksXG4gICAgICBjb2x1bW46IGluZGV4ICUgdGhpcy5jb2x1bW5zXG4gICAgfTtcbiAgfVxuXG4gIGluZGV4T2Yocm93LGNvbHVtbikge1xuICAgIHJldHVybiBjb2x1bW4gKyByb3cgKiB0aGlzLmNvbHVtbnM7XG4gICAgLy8gcmV0dXJucyBpbmRleCBvZiBjZWxsIGJ5IHJvdyBhbmQgY29sdW1uXG4gIH1cblxuICByb3cocm93KSB7XG4gICAgbGV0IGRhdGEgPSBbXTtcbiAgICBmb3IgKGxldCBpPTA7IGk8dGhpcy5jb2x1bW5zOyBpKyspIHtcbiAgICAgIGRhdGEucHVzaCh0aGlzLnBhdHRlcm5bcm93XSA/IDEgOiAwKTtcbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICBjb2x1bW4oY29sdW1uKSB7XG4gICAgbGV0IGRhdGEgPSBbXTtcbiAgICBmb3IgKGxldCBpPTA7IGk8dGhpcy5yb3dzOyBpKyspIHtcbiAgICAgIGRhdGEucHVzaCh0aGlzLnBhdHRlcm5baV1bY29sdW1uXSA/IDEgOiAwKTtcbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICBnZXQgcm93cygpIHtcbiAgICByZXR1cm4gdGhpcy5wYXR0ZXJuLmxlbmd0aDtcbiAgfVxuICBzZXQgcm93cyh2KSB7XG4gICAgbGV0IHByZXZpb3VzID0gdGhpcy5wYXR0ZXJuLnNsaWNlKDApO1xuICAgIHRoaXMuY3JlYXRlKHYsdGhpcy5jb2x1bW5zKTtcbiAgICB0aGlzLml0ZXJhdGUoKHIsYykgPT4ge1xuICAgICAgaWYgKHByZXZpb3VzW3JdICYmIHByZXZpb3VzW3JdW2NdKSB7XG4gICAgICAgIHRoaXMucGF0dGVybltyXVtjXSA9IHByZXZpb3VzW3JdW2NdO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZ2V0IGNvbHVtbnMoKSB7XG4gICAgcmV0dXJuIHRoaXMucGF0dGVyblswXS5sZW5ndGg7XG4gIH1cbiAgc2V0IGNvbHVtbnModikge1xuICAgIGxldCBwcmV2aW91cyA9IHRoaXMucGF0dGVybi5zbGljZSgwKTtcbiAgICB0aGlzLmNyZWF0ZSh0aGlzLnJvd3Msdik7XG4gICAgdGhpcy5pdGVyYXRlKChyLGMpID0+IHtcbiAgICAgIGlmIChwcmV2aW91c1tyXSAmJiBwcmV2aW91c1tyXVtjXSkge1xuICAgICAgICB0aGlzLnBhdHRlcm5bcl1bY10gPSBwcmV2aW91c1tyXVtjXTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2pzaGludC1sb2FkZXIhLi9saWIvbW9kZWxzL21hdHJpeC5qcyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCBtYXRoIGZyb20gJy4uL3V0aWwvbWF0aCc7XHJcbmltcG9ydCBEcnVuayBmcm9tICcuL2RydW5rJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlcXVlbmNlIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihzZXF1ZW5jZSA9IFswLDEwLDIwLDMwXSwgbW9kZT0ndXAnLCBwb3NpdGlvbj1mYWxzZSkge1xyXG4gICAgICAgIHRoaXMudmFsdWVzID0gc2VxdWVuY2U7XHJcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHRoaXMudmFsdWVzKSkge1xyXG4gICAgICAgICAgdGhpcy52YWx1ZXMgPSBbdGhpcy52YWx1ZXNdO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9tb2RlID0gbW9kZTtcclxuICAgICAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XHJcblxyXG4gICAgICAgIHRoaXMuZHJ1bmtXYWxrID0gbmV3IERydW5rKDAsIHRoaXMudmFsdWVzLmxlbmd0aCAtIDEpO1xyXG5cclxuICAgICAgICB0aGlzLnN0YXJ0VmFsdWVzID0ge1xyXG4gICAgICAgICAgJ3VwJzogMCxcclxuICAgICAgICAgICdkb3duJzogdGhpcy52YWx1ZXMubGVuZ3RoIC0gMSxcclxuICAgICAgICAgICdkcnVuayc6IH5+KHRoaXMudmFsdWVzLmxlbmd0aC8yKSxcclxuICAgICAgICAgICdyYW5kb20nOiBtYXRoLnJpKHRoaXMudmFsdWVzLmxlbmd0aClcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBpZiAodGhpcy5wb3NpdGlvbiE9PWZhbHNlKSB7XHJcbiAgICAgICAgICB0aGlzLm5leHQgPSB0aGlzW3RoaXMuX21vZGVdO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLm5leHQgPSB0aGlzLmZpcnN0O1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIGdldCBtb2RlKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5fbW9kZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgbW9kZShtb2RlKSB7XHJcbiAgICAgICAgaWYgKCEobW9kZSA9PT0gJ3VwJyB8fCBtb2RlID09PSAnZG93bicgfHwgbW9kZSA9PT0gJ3JhbmRvbScgfHwgbW9kZSA9PT0gJ2RydW5rJykpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcignVGhlIG9ubHkgbW9kZXMgY3VycmVudGx5IGFsbG93ZWQgYXJlOiB1cCwgZG93biwgcmFuZG9tLCBkcnVuaycpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX21vZGUgPSBtb2RlO1xyXG4gICAgICAgIGlmICh0aGlzLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICB0aGlzLm5leHQgPSB0aGlzW3RoaXMuX21vZGVdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXQgdmFsdWUoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnZhbHVlc1t0aGlzLnBvc2l0aW9uXTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgdmFsdWUodikge1xyXG4gICAgICB0aGlzLnBvc2l0aW9uID0gdGhpcy52YWx1ZXMuaW5kZXhPZih2KTtcclxuICAgIH1cclxuXHJcbiAgICBmaXJzdCgpIHtcclxuICAgICAgaWYgKHRoaXMucG9zaXRpb24hPT1mYWxzZSkge1xyXG4gICAgICAgIHRoaXMubmV4dCA9IHRoaXNbdGhpcy5fbW9kZV07XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubmV4dCgpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMucG9zaXRpb24gPSB0aGlzLnN0YXJ0VmFsdWVzW3RoaXMuX21vZGVdO1xyXG4gICAgICB0aGlzLm5leHQgPSB0aGlzW3RoaXMuX21vZGVdO1xyXG4gICAgICByZXR1cm4gdGhpcy52YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICB1cCgpIHtcclxuICAgICAgdGhpcy5wb3NpdGlvbisrO1xyXG4gICAgICB0aGlzLnBvc2l0aW9uICU9IHRoaXMudmFsdWVzLmxlbmd0aDtcclxuICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZG93bigpIHtcclxuICAgICAgdGhpcy5wb3NpdGlvbi0tO1xyXG4gICAgICBpZiAodGhpcy5wb3NpdGlvbiA8IDApIHtcclxuICAgICAgICB0aGlzLnBvc2l0aW9uID0gKHRoaXMucG9zaXRpb24gKyB0aGlzLnZhbHVlcy5sZW5ndGgpICUgdGhpcy52YWx1ZXMubGVuZ3RoO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHJhbmRvbSgpIHtcclxuICAgICAgdGhpcy5wb3NpdGlvbiA9IG1hdGgucmkoMCwgdGhpcy52YWx1ZXMubGVuZ3RoKTtcclxuICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZHJ1bmsoKSB7XHJcbiAgICAgIHRoaXMuZHJ1bmtXYWxrLm1heCA9IHRoaXMudmFsdWVzLmxlbmd0aDtcclxuICAgICAgdGhpcy5kcnVua1dhbGsudmFsdWUgPSB0aGlzLnBvc2l0aW9uO1xyXG4gICAgICB0aGlzLnBvc2l0aW9uID0gdGhpcy5kcnVua1dhbGsubmV4dCgpO1xyXG4gICAgICByZXR1cm4gdGhpcy52YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKiBmdXR1cmUgbWV0aG9kc1xyXG4gICAgLmdyb3VwKHN0YXJ0LHN0b3ApIC0tIG91dHB1dHMgYSBncm91cCBvZiBuIGl0ZW1zIGZyb20gdGhlIGxpc3QsIHdpdGggd3JhcHBpbmdcclxuICAgIC5sb29wKHN0YXJ0LHN0b3ApIC0tIGNvbmZpbmVzIHNlcXVlbmNpbmcgdG8gYSBzdWJzZXQgb2YgdGhlIHZhbHVlc1xyXG4gICAgICAgIChjb3VsZCBldmVuIGhhdmUgYSBkaXN0aW5jdGlvbiBiZXR3ZWVuIC5vcmlnaW5hbFZhbHVlcyBhbmQgdGhlIGFycmF5IG9mIHZhbHVlcyBiZWluZyB1c2VkKVxyXG4gICAgKi9cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2pzaGludC1sb2FkZXIhLi9saWIvbW9kZWxzL3NlcXVlbmNlLmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgbWF0aCBmcm9tICcuLi91dGlsL21hdGgnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEcnVuayB7XG5cbiAgICBjb25zdHJ1Y3RvcihtaW49MCwgbWF4PTksIHZhbHVlPTAsIGluY3JlbWVudD0xLCBsb29wPWZhbHNlKSB7XG4gICAgICAgIHRoaXMubWluID0gbWluO1xuICAgICAgICB0aGlzLm1heCA9IG1heDtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLmluY3JlbWVudCA9IGluY3JlbWVudDtcbiAgICAgICAgdGhpcy5sb29wID0gbG9vcDtcbiAgICB9XG5cbiAgICBuZXh0KCkge1xuICAgICAgICB0aGlzLnZhbHVlICs9IG1hdGgucGljaygtMSAqIHRoaXMuaW5jcmVtZW50LCB0aGlzLmluY3JlbWVudCk7XG4gICAgICAgIGlmICh0aGlzLnZhbHVlID4gdGhpcy5tYXgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmxvb3ApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5taW47XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLm1heCAtIHRoaXMuaW5jcmVtZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMudmFsdWUgPCB0aGlzLm1pbikge1xuICAgICAgICAgICAgaWYgKHRoaXMubG9vcCkge1xuICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLm1heDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMubWluICsgdGhpcy5pbmNyZW1lbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9qc2hpbnQtbG9hZGVyIS4vbGliL21vZGVscy9kcnVuay5qcyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IG1hdGggZnJvbSAnLi4vdXRpbC9tYXRoJztcbmltcG9ydCBEcnVuayBmcm9tICcuL2RydW5rJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ291bnRlciB7XG5cbiAgICBjb25zdHJ1Y3RvcihtaW49MCwgbWF4PTEwLCBtb2RlPSd1cCcsIHZhbHVlPWZhbHNlKSB7XG4gICAgICAgIHRoaXMubWluID0gbWluO1xuICAgICAgICB0aGlzLm1heCA9IG1heDtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLm1vZGUgPSBtb2RlO1xuICAgICAgICB0aGlzLmRydW5rV2FsayA9IG5ldyBEcnVuayh0aGlzLm1pbiwgdGhpcy5tYXgpO1xuICAgICAgICBpZiAodGhpcy52YWx1ZSE9PWZhbHNlKSB7XG4gICAgICAgICAgdGhpcy5uZXh0ID0gdGhpc1t0aGlzLl9tb2RlXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLm5leHQgPSB0aGlzLmZpcnN0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0IG1vZGUobW9kZSkge1xuICAgICAgICBpZiAoIShtb2RlID09PSAndXAnIHx8IG1vZGUgPT09ICdkb3duJyB8fCBtb2RlID09PSAncmFuZG9tJyB8fCBtb2RlID09PSAnZHJ1bmsnKSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignVGhlIG9ubHkgbW9kZXMgY3VycmVudGx5IGFsbG93ZWQgYXJlOiB1cCwgZG93biwgcmFuZG9tLCBkcnVuaycpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX21vZGUgPSBtb2RlO1xuICAgICAgICBpZiAodGhpcy52YWx1ZSkge1xuICAgICAgICAgIHRoaXMubmV4dCA9IHRoaXNbdGhpcy5fbW9kZV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgbW9kZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21vZGU7XG4gICAgfVxuXG4gICAgZmlyc3QoKSB7XG4gICAgICBpZiAodGhpcy52YWx1ZSE9PWZhbHNlKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IHRoaXNbdGhpcy5fbW9kZV07XG4gICAgICAgIHJldHVybiB0aGlzLm5leHQoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc3RhcnRWYWx1ZXMgPSB7XG4gICAgICAgICd1cCc6IHRoaXMubWluLFxuICAgICAgICAnZG93bic6IHRoaXMubWF4LFxuICAgICAgICAnZHJ1bmsnOiB+fm1hdGguYXZlcmFnZSh0aGlzLm1pbix0aGlzLm1heCksXG4gICAgICAgICdyYW5kb20nOiBtYXRoLnJpKHRoaXMubWluLHRoaXMubWF4KVxuICAgICAgfTtcbiAgICAgIHRoaXMudmFsdWUgPSB0aGlzLnN0YXJ0VmFsdWVzW3RoaXMuX21vZGVdO1xuICAgICAgdGhpcy5uZXh0ID0gdGhpc1t0aGlzLl9tb2RlXTtcbiAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICAgIH1cblxuICAgIHVwKCkge1xuICAgICAgICB0aGlzLnZhbHVlKys7XG4gICAgICAgIGlmICh0aGlzLnZhbHVlID49IHRoaXMubWF4KSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5taW47XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XG4gICAgfVxuXG4gICAgZG93bigpIHtcbiAgICAgICAgdGhpcy52YWx1ZS0tO1xuICAgICAgICBpZiAodGhpcy52YWx1ZSA8IHRoaXMubWluKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5tYXg7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XG4gICAgfVxuXG4gICAgcmFuZG9tKCkge1xuICAgICAgICB0aGlzLnZhbHVlID0gbWF0aC5yaSh0aGlzLm1pbiwgdGhpcy5tYXgpO1xuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgICB9XG5cbiAgICBkcnVuaygpIHtcbiAgICAgICAgdGhpcy5kcnVua1dhbGsubWluID0gdGhpcy5taW47XG4gICAgICAgIHRoaXMuZHJ1bmtXYWxrLm1heCA9IHRoaXMubWF4O1xuICAgICAgICB0aGlzLmRydW5rV2Fsay52YWx1ZSA9IHRoaXMudmFsdWU7XG4gICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLmRydW5rV2Fsay5uZXh0KCk7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vanNoaW50LWxvYWRlciEuL2xpYi9tb2RlbHMvY291bnRlci5qcyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHsgY2xvY2sgfSBmcm9tICcuLi9tYWluJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW50ZXJ2YWwge1xuXG4gIGNvbnN0cnVjdG9yKHJhdGUsZnVuYyxvbikge1xuXG4gICAgdGhpcy5yYXRlID0gcmF0ZTtcbiAgICB0aGlzLm9uID0gb247XG4gICAgdGhpcy5jbG9jayA9IGNsb2NrKCk7IC8vIGpzaGludCBpZ25vcmU6bGluZVxuXG4gICAgdGhpcy5wYXR0ZXJuID0gWzFdO1xuICAgIHRoaXMuaW5kZXggPSAwO1xuXG4gICAgdGhpcy5ldmVudCA9IGZ1bmMgPyBmdW5jIDogZnVuY3Rpb24oKSB7IH07XG5cbiAgICBpZiAodGhpcy5vbikge1xuICAgICAgdGhpcy5zdGFydCgpO1xuICAgIH1cblxuICB9XG5cbiAgX2V2ZW50KGUpIHtcbiAgLy8gIGlmICh0aGlzLnBhdHRlcm5bdGhpcy5pbmRleCV0aGlzLnBhdHRlcm4ubGVuZ3RoXSkge1xuICAgICAgdGhpcy5ldmVudChlKTtcbiAgLy8gIH1cbiAgICB0aGlzLmluZGV4Kys7XG4gIH1cblxuICBzdG9wKCkge1xuICAgIHRoaXMub24gPSBmYWxzZTtcbiAgICB0aGlzLmludGVydmFsLmNsZWFyKCk7XG4gIH1cblxuICBzdGFydCgpIHtcbiAgICB0aGlzLm9uID0gdHJ1ZTtcbiAgICB0aGlzLmludGVydmFsID0gdGhpcy5jbG9jay5jYWxsYmFja0F0VGltZSh0aGlzLl9ldmVudC5iaW5kKHRoaXMpLCB0aGlzLmNsb2NrLmNvbnRleHQuY3VycmVudFRpbWUpLnJlcGVhdCh0aGlzLnJhdGUvMTAwMCkudG9sZXJhbmNlKHtlYXJseTogMC4xLCBsYXRlOjF9KTtcbiAgfVxuXG4gIG1zKG5ld3JhdGUpIHtcbiAgICBpZiAodGhpcy5vbikge1xuICAgICAgdmFyIHJhdGlvID0gbmV3cmF0ZS90aGlzLnJhdGU7XG4gICAgICB0aGlzLnJhdGUgPSBuZXdyYXRlO1xuICAgICAgdGhpcy5jbG9jay50aW1lU3RyZXRjaCh0aGlzLmNsb2NrLmNvbnRleHQuY3VycmVudFRpbWUsIFt0aGlzLmludGVydmFsXSwgcmF0aW8pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJhdGUgPSBuZXdyYXRlO1xuICAgIH1cbiAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2pzaGludC1sb2FkZXIhLi9saWIvdGltZS9pbnRlcnZhbC5qcyIsIid1c2Ugc3RyaWN0JztcblxubGV0IHN2ZyA9IHJlcXVpcmUoJy4uL3V0aWwvc3ZnJyk7XG5sZXQgbWF0aCA9IHJlcXVpcmUoJy4uL3V0aWwvbWF0aCcpO1xubGV0IEludGVyZmFjZSA9IHJlcXVpcmUoJy4uL2NvcmUvaW50ZXJmYWNlJyk7XG5sZXQgU3RlcCA9IHJlcXVpcmUoJy4uL21vZGVscy9zdGVwJyk7XG5pbXBvcnQgKiBhcyBJbnRlcmFjdGlvbiBmcm9tICcuLi91dGlsL2ludGVyYWN0aW9uJztcblxuLyoqXG4qIFBhbjJEXG4qXG4qIEBkZXNjcmlwdGlvbiBJbnRlcmZhY2UgZm9yIG1vdmluZyBhIHNvdW5kIGFyb3VuZCBhbiBhcnJheSBvZiBzcGVha2Vycy4gU3BlYWtlciBsb2NhdGlvbnMgY2FuIGJlIGN1c3RvbWl6ZWQuIFRoZSBpbnRlcmZhY2UgY2FsY3VsYXRlcyB0aGUgY2xvc2VuZXNzIG9mIHRoZSBzb3VuZCBzb3VyY2UgdG8gZWFjaCBzcGVha2VyIGFuZCByZXR1cm5zIHRoYXQgZGlzdGFuY2UgYXMgYSBudW1lcmljIHZhbHVlLlxuKlxuKiBAZGVtbyA8c3BhbiBuZXh1cy11aT1cInBhbjJEXCI+PC9zcGFuPlxuKlxuKiBAZXhhbXBsZVxuKiB2YXIgcGFuMmQgPSBuZXcgTmV4dXMuUGFuMmQoJyN0YXJnZXQnKVxuKlxuKiBAZXhhbXBsZVxuKiB2YXIgcGFuMmQgPSBuZXcgTmV4dXMuUGFuMkQoJyN0YXJnZXQnLHtcbiogICAnc2l6ZSc6IFsyMDAsMjAwXSxcbiogICAncmFuZ2UnOiAwLjUsICAvLyBkZXRlY3Rpb24gcmFkaXVzIG9mIGVhY2ggc3BlYWtlclxuKiAgICdtb2RlJzogJ2Fic29sdXRlJywgICAvLyAnYWJzb2x1dGUnIG9yICdyZWxhdGl2ZScgc291bmQgbW92ZW1lbnRcbiogICAnc3BlYWtlcnMnOiBbICAvLyB0aGUgc3BlYWtlciBbeCx5XSBwb3NpdGlvbnNcbiogICAgICAgWzAuNSwwLjJdLFxuKiAgICAgICBbMC43NSwwLjI1XSxcbiogICAgICAgWzAuOCwwLjVdLFxuKiAgICAgICBbMC43NSwwLjc1XSxcbiogICAgICAgWzAuNSwwLjhdLFxuKiAgICAgICBbMC4yNSwwLjc1XVxuKiAgICAgICBbMC4yLDAuNV0sXG4qICAgICAgIFswLjI1LDAuMjVdXG4qICAgXVxuKiB9KVxuKlxuKiBAb3V0cHV0XG4qIGNoYW5nZVxuKiBGaXJlcyBhbnkgdGltZSB0aGUgXCJzb3VyY2VcIiBub2RlJ3MgcG9zaXRpb24gY2hhbmdlcy4gPGJyPlxuKiBUaGUgZXZlbnQgZGF0YSBpcyBhbiBhcnJheSBvZiB0aGUgYW1wbGl0dWRlcyAoMC0xKSwgcmVwcmVzZW50aW5nIHRoZSBsZXZlbCBvZiBlYWNoIHNwZWFrZXIgKGFzIGNhbGN1bGF0ZWQgYnkgaXRzIGRpc3RhbmNlIHRvIHRoZSBhdWRpbyBzb3VyY2UpLlxuKlxuKiBAb3V0cHV0ZXhhbXBsZVxuKiBwYW4yZC5vbignY2hhbmdlJyxmdW5jdGlvbih2KSB7XG4qICAgY29uc29sZS5sb2codik7XG4qIH0pXG4qXG4qL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYW4yRCBleHRlbmRzIEludGVyZmFjZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7XG5cbiAgICBsZXQgb3B0aW9ucyA9IFsncmFuZ2UnXTtcblxuICAgIGxldCBkZWZhdWx0cyA9IHtcbiAgICAgICdzaXplJzogWzIwMCwyMDBdLFxuICAgICAgJ3JhbmdlJzogMC41LFxuICAgICAgJ21vZGUnOiAnYWJzb2x1dGUnLFxuICAgICAgJ3NwZWFrZXJzJzogW1xuICAgICAgICBbMC41LDAuMl0sXG4gICAgICAgIFswLjc1LDAuMjVdLFxuICAgICAgICBbMC44LDAuNV0sXG4gICAgICAgIFswLjc1LDAuNzVdLFxuICAgICAgICBbMC41LDAuOF0sXG4gICAgICAgIFswLjI1LDAuNzVdLFxuICAgICAgICBbMC4yLDAuNV0sXG4gICAgICAgIFswLjI1LDAuMjVdXG4gICAgICBdXG4gICAgfTtcblxuICAgIHN1cGVyKGFyZ3VtZW50cyxvcHRpb25zLGRlZmF1bHRzKTtcblxuICAgIHRoaXMudmFsdWUgPSB7XG4gICAgICB4OiBuZXcgU3RlcCgwLDEsMCwwLjUpLFxuICAgICAgeTogbmV3IFN0ZXAoMCwxLDAsMC41KVxuICAgIH07XG5cbiAgICAvKipcbiAgICBBYnNvbHV0ZSBvciByZWxhdGl2ZSBtb3VzZSBpbnRlcmFjdGlvbi4gSW4gXCJhYnNvbHV0ZVwiIG1vZGUsIHRoZSBzb3VyY2Ugbm9kZSB3aWxsIGp1bXAgdG8geW91ciBtb3VzZSBwb3NpdGlvbiBvbiBtb3VzZSBjbGljay4gSW4gXCJyZWxhdGl2ZVwiIG1vZGUsIGl0IGRvZXMgbm90LlxuICAgICovXG4gICAgdGhpcy5tb2RlID0gdGhpcy5zZXR0aW5ncy5tb2RlO1xuXG4gICAgdGhpcy5wb3NpdGlvbiA9IHtcbiAgICAgIHg6IG5ldyBJbnRlcmFjdGlvbi5IYW5kbGUodGhpcy5tb2RlLCdob3Jpem9udGFsJyxbMCx0aGlzLndpZHRoXSxbdGhpcy5oZWlnaHQsMF0pLFxuICAgICAgeTogbmV3IEludGVyYWN0aW9uLkhhbmRsZSh0aGlzLm1vZGUsJ3ZlcnRpY2FsJyxbMCx0aGlzLndpZHRoXSxbdGhpcy5oZWlnaHQsMF0pXG4gICAgfTtcbiAgICB0aGlzLnBvc2l0aW9uLngudmFsdWUgPSB0aGlzLnZhbHVlLngubm9ybWFsaXplZDtcbiAgICB0aGlzLnBvc2l0aW9uLnkudmFsdWUgPSB0aGlzLnZhbHVlLnkubm9ybWFsaXplZDtcblxuICAgIC8qKlxuICAgIEFuIGFycmF5IG9mIHNwZWFrZXIgbG9jYXRpb25zLiBVcGRhdGUgdGhpcyB3aXRoIC5tb3ZlU3BlYWtlcigpIG9yIC5tb3ZlQWxsU3BlYWtlcnMoKVxuICAgICovXG4gICAgdGhpcy5zcGVha2VycyA9IHRoaXMuc2V0dGluZ3Muc3BlYWtlcnM7XG5cbiAgICAvKipcbiAgICBSZXdyaXRlOiBUaGUgbWF4aW11bSBkaXN0YW5jZSBmcm9tIGEgc3BlYWtlciB0aGF0IHRoZSBzb3VyY2Ugbm9kZSBjYW4gYmUgZm9yIGl0IHRvIGJlIGhlYXJkIGZyb20gdGhhdCBzcGVha2VyLiBBIGxvdyByYW5nZSAoMC4xKSB3aWxsIHJlc3VsdCBpbiBzcGVha2VycyBvbmx5IHBsYXlpbmcgd2hlbiB0aGUgc291bmQgaXMgdmVyeSBjbG9zZSBpdC4gRGVmYXVsdCBpcyAwLjUgKGhhbGYgb2YgdGhlIGludGVyZmFjZSkuXG4gICAgKi9cbiAgICB0aGlzLnJhbmdlID0gdGhpcy5zZXR0aW5ncy5yYW5nZTtcblxuICAgIC8qKlxuICAgIFRoZSBjdXJyZW50IGxldmVscyBmb3IgZWFjaCBzcGVha2VyLiBUaGlzIGlzIGNhbGN1bGF0ZWQgd2hlbiBhIHNvdXJjZSBub2RlIG9yIHNwZWFrZXIgbm9kZSBpcyBtb3ZlZCB0aHJvdWdoIGludGVyYWN0aW9uIG9yIHByb2dyYW1hdGljYWxseS5cbiAgICAqL1xuICAgIHRoaXMubGV2ZWxzID0gW107XG5cbiAgICB0aGlzLmluaXQoKTtcblxuICAgIHRoaXMuY2FsY3VsYXRlTGV2ZWxzKCk7XG4gICAgdGhpcy5yZW5kZXIoKTtcblxuICB9XG5cbiAgYnVpbGRJbnRlcmZhY2UoKSB7XG5cbiAgICB0aGlzLmtub2IgPSBzdmcuY3JlYXRlKCdjaXJjbGUnKTtcblxuXG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMua25vYik7XG5cblxuICAgIC8vIGFkZCBzcGVha2Vyc1xuICAgIHRoaXMuc3BlYWtlckVsZW1lbnRzID0gW107XG5cbiAgICBmb3IgKGxldCBpPTA7aTx0aGlzLnNwZWFrZXJzLmxlbmd0aDtpKyspIHtcbiAgICAgIGxldCBzcGVha2VyRWxlbWVudCA9IHN2Zy5jcmVhdGUoJ2NpcmNsZScpO1xuXG4gICAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQoc3BlYWtlckVsZW1lbnQpO1xuXG4gICAgICB0aGlzLnNwZWFrZXJFbGVtZW50cy5wdXNoKHNwZWFrZXJFbGVtZW50KTtcbiAgICB9XG5cbiAgfVxuXG4gIHNpemVJbnRlcmZhY2UoKSB7XG5cbiAgICAgICAgdGhpcy5fbWluRGltZW5zaW9uID0gTWF0aC5taW4odGhpcy53aWR0aCx0aGlzLmhlaWdodCk7XG5cbiAgICAgICAgdGhpcy5rbm9iUmFkaXVzID0ge1xuICAgICAgICAgIG9mZjogfn4odGhpcy5fbWluRGltZW5zaW9uLzEwMCkgKiAzICsgNSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5rbm9iUmFkaXVzLm9uID0gdGhpcy5rbm9iUmFkaXVzLm9mZiAqIDI7XG5cbiAgICAgICAgdGhpcy5rbm9iLnNldEF0dHJpYnV0ZSgnY3gnLHRoaXMud2lkdGgvMik7XG4gICAgICAgIHRoaXMua25vYi5zZXRBdHRyaWJ1dGUoJ2N5Jyx0aGlzLmhlaWdodC8yKTtcbiAgICAgICAgdGhpcy5rbm9iLnNldEF0dHJpYnV0ZSgncicsdGhpcy5rbm9iUmFkaXVzLm9mZik7XG5cbiAgICAgICAgZm9yIChsZXQgaT0wO2k8dGhpcy5zcGVha2Vycy5sZW5ndGg7aSsrKSB7XG4gICAgICAgICAgbGV0IHNwZWFrZXJFbGVtZW50ID0gdGhpcy5zcGVha2VyRWxlbWVudHNbaV07XG4gICAgICAgICAgbGV0IHNwZWFrZXIgPSB0aGlzLnNwZWFrZXJzW2ldO1xuICAgICAgICAgIHNwZWFrZXJFbGVtZW50LnNldEF0dHJpYnV0ZSgnY3gnLHNwZWFrZXJbMF0qdGhpcy53aWR0aCk7XG4gICAgICAgICAgc3BlYWtlckVsZW1lbnQuc2V0QXR0cmlidXRlKCdjeScsc3BlYWtlclsxXSp0aGlzLmhlaWdodCk7XG4gICAgICAgICAgc3BlYWtlckVsZW1lbnQuc2V0QXR0cmlidXRlKCdyJyx0aGlzLl9taW5EaW1lbnNpb24vMjAgKyA1KTtcbiAgICAgICAgICBzcGVha2VyRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2ZpbGwtb3BhY2l0eScsICcwJyk7XG4gICAgICAgIH1cblxuICAgICAgdGhpcy5wb3NpdGlvbi54LnJlc2l6ZShbMCx0aGlzLndpZHRoXSxbdGhpcy5oZWlnaHQsMF0pO1xuICAgICAgdGhpcy5wb3NpdGlvbi55LnJlc2l6ZShbMCx0aGlzLndpZHRoXSxbdGhpcy5oZWlnaHQsMF0pO1xuXG4gICAgICAgIC8vIG5leHQsIG5lZWQgdG9cbiAgICAgICAgLy8gcmVzaXplIHBvc2l0aW9uc1xuICAgICAgICAvLyBjYWxjdWxhdGUgc3BlYWtlciBkaXN0YW5jZXNcbiAgICAgIHRoaXMuY2FsY3VsYXRlTGV2ZWxzKCk7XG4gICAgICB0aGlzLnJlbmRlcigpO1xuXG4gIH1cblxuICBjb2xvckludGVyZmFjZSgpIHtcblxuICAgIHRoaXMuZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSB0aGlzLmNvbG9ycy5maWxsO1xuICAgIHRoaXMua25vYi5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCB0aGlzLmNvbG9ycy5tZWRpdW1MaWdodCk7XG5cbiAgICBmb3IgKGxldCBpPTA7aTx0aGlzLnNwZWFrZXJzLmxlbmd0aDtpKyspIHtcbiAgICAgIGxldCBzcGVha2VyRWxlbWVudCA9IHRoaXMuc3BlYWtlckVsZW1lbnRzW2ldO1xuICAgICAgc3BlYWtlckVsZW1lbnQuc2V0QXR0cmlidXRlKCdmaWxsJywgdGhpcy5jb2xvcnMuYWNjZW50KTtcbiAgICAgIHNwZWFrZXJFbGVtZW50LnNldEF0dHJpYnV0ZSgnc3Ryb2tlJywgdGhpcy5jb2xvcnMuYWNjZW50KTtcbiAgICB9XG5cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICB0aGlzLmtub2JDb29yZGluYXRlcyA9IHtcbiAgICAgIHg6IHRoaXMudmFsdWUueC5ub3JtYWxpemVkICogdGhpcy53aWR0aCxcbiAgICAgIHk6IHRoaXMuaGVpZ2h0IC0gdGhpcy52YWx1ZS55Lm5vcm1hbGl6ZWQgKiB0aGlzLmhlaWdodFxuICAgIH07XG5cbiAgICB0aGlzLmtub2Iuc2V0QXR0cmlidXRlKCdjeCcsdGhpcy5rbm9iQ29vcmRpbmF0ZXMueCk7XG4gICAgdGhpcy5rbm9iLnNldEF0dHJpYnV0ZSgnY3knLHRoaXMua25vYkNvb3JkaW5hdGVzLnkpO1xuICB9XG5cblxuICBjbGljaygpIHtcbiAgICB0aGlzLnBvc2l0aW9uLnguYW5jaG9yID0gdGhpcy5tb3VzZTtcbiAgICB0aGlzLnBvc2l0aW9uLnkuYW5jaG9yID0gdGhpcy5tb3VzZTtcbiAgICB0aGlzLm1vdmUoKTtcbiAgfVxuXG4gIG1vdmUoKSB7XG4gICAgaWYgKHRoaXMuY2xpY2tlZCkge1xuICAgICAgdGhpcy5wb3NpdGlvbi54LnVwZGF0ZSh0aGlzLm1vdXNlKTtcbiAgICAgIHRoaXMucG9zaXRpb24ueS51cGRhdGUodGhpcy5tb3VzZSk7XG4gICAgICAvLyBwb3NpdGlvbi54IGFuZCBwb3NpdGlvbi55IGFyZSBub3JtYWxpemVkXG4gICAgICAvLyBzbyBhcmUgdGhlIGxldmVsc1xuICAgICAgLy8gbGlrZWx5IGRvbid0IG5lZWQgdGhpcy52YWx1ZSBhdCBhbGwgLS0gb25seSB1c2VkIGZvciBkcmF3aW5nXG4gICAgICAvLyBub3QgZ29pbmcgdG8gYmUgYSAnc3RlcCcgb3IgJ21pbicgYW5kICdtYXgnIGluIHRoaXMgb25lLlxuICAgICAgdGhpcy5jYWxjdWxhdGVMZXZlbHMoKTtcbiAgICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx0aGlzLmxldmVscyk7XG4gICAgICB0aGlzLnJlbmRlcigpO1xuICAgIH1cbiAgfVxuXG4gIHJlbGVhc2UoKSB7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIGdldCBub3JtYWxpemVkKCkge1xuICAgIHJldHVybiB7XG4gICAgICB4OiB0aGlzLnZhbHVlLngubm9ybWFsaXplZCxcbiAgICAgIHk6IHRoaXMudmFsdWUueS5ub3JtYWxpemVkXG4gICAgfTtcbiAgfVxuXG4gIGNhbGN1bGF0ZUxldmVscygpIHtcbiAgICB0aGlzLnZhbHVlLngudXBkYXRlTm9ybWFsKCB0aGlzLnBvc2l0aW9uLngudmFsdWUgKTtcbiAgICB0aGlzLnZhbHVlLnkudXBkYXRlTm9ybWFsKCB0aGlzLnBvc2l0aW9uLnkudmFsdWUgKTtcbiAgICB0aGlzLmxldmVscyA9IFtdO1xuICAgIHRoaXMuc3BlYWtlcnMuZm9yRWFjaCgocyxpKSA9PiB7XG4gICAgICBsZXQgZGlzdGFuY2UgPSBtYXRoLmRpc3RhbmNlKHNbMF0qdGhpcy53aWR0aCxzWzFdKnRoaXMuaGVpZ2h0LHRoaXMucG9zaXRpb24ueC52YWx1ZSp0aGlzLndpZHRoLCgxLXRoaXMucG9zaXRpb24ueS52YWx1ZSkqdGhpcy5oZWlnaHQpO1xuICAgICAgbGV0IGxldmVsID0gbWF0aC5jbGlwKDEtZGlzdGFuY2UvKHRoaXMucmFuZ2UqdGhpcy53aWR0aCksMCwxKTtcbiAgICAgIHRoaXMubGV2ZWxzLnB1c2gobGV2ZWwpO1xuICAgICAgdGhpcy5zcGVha2VyRWxlbWVudHNbaV0uc2V0QXR0cmlidXRlKCdmaWxsLW9wYWNpdHknLCBsZXZlbCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgTW92ZSB0aGUgYXVkaW8gc291cmNlIG5vZGUgYW5kIHRyaWdnZXIgdGhlIG91dHB1dCBldmVudC5cbiAgQHBhcmFtIHgge251bWJlcn0gTmV3IHggbG9jYXRpb24sIG5vcm1hbGl6ZWQgMC0xXG4gIEBwYXJhbSB5IHtudW1iZXJ9IE5ldyB5IGxvY2F0aW9uLCBub3JtYWxpemVkIDAtMVxuICAqL1xuICBtb3ZlU291cmNlKHgseSkge1xuICAgIGxldCBsb2NhdGlvbiA9IHtcbiAgICAgIHg6IHgqdGhpcy53aWR0aCxcbiAgICAgIHk6IHkqdGhpcy5oZWlnaHRcbiAgICB9O1xuICAgIHRoaXMucG9zaXRpb24ueC51cGRhdGUobG9jYXRpb24pO1xuICAgIHRoaXMucG9zaXRpb24ueS51cGRhdGUobG9jYXRpb24pO1xuICAgIHRoaXMuY2FsY3VsYXRlTGV2ZWxzKCk7XG4gICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHRoaXMubGV2ZWxzKTtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgLyoqXG4gIE1vdmUgYSBzcGVha2VyIG5vZGUgYW5kIHRyaWdnZXIgdGhlIG91dHB1dCBldmVudC5cbiAgQHBhcmFtIGluZGV4IHtudW1iZXJ9IEluZGV4IG9mIHRoZSBzcGVha2VyIHRvIG1vdmVcbiAgQHBhcmFtIHgge251bWJlcn0gTmV3IHggbG9jYXRpb24sIG5vcm1hbGl6ZWQgMC0xXG4gIEBwYXJhbSB5IHtudW1iZXJ9IE5ldyB5IGxvY2F0aW9uLCBub3JtYWxpemVkIDAtMVxuICAqL1xuICBtb3ZlU3BlYWtlcihpbmRleCx4LHkpIHtcblxuICAgIHRoaXMuc3BlYWtlcnNbaW5kZXhdID0gW3gseV07XG4gICAgdGhpcy5zcGVha2VyRWxlbWVudHNbaW5kZXhdLnNldEF0dHJpYnV0ZSgnY3gnLCB4KnRoaXMud2lkdGgpO1xuICAgIHRoaXMuc3BlYWtlckVsZW1lbnRzW2luZGV4XS5zZXRBdHRyaWJ1dGUoJ2N5JywgeSp0aGlzLmhlaWdodCk7XG4gICAgdGhpcy5jYWxjdWxhdGVMZXZlbHMoKTtcbiAgICB0aGlzLmVtaXQoJ2NoYW5nZScsdGhpcy5sZXZlbHMpO1xuICAgIHRoaXMucmVuZGVyKCk7XG5cbiAgfVxuXG4gIC8qKlxuICBTZXQgYWxsIHNwZWFrZXIgbG9jYXRpb25zXG4gIEBwYXJhbSBsb2NhdGlvbnMge0FycmF5fSBBcnJheSBvZiBzcGVha2VyIGxvY2F0aW9ucy4gRWFjaCBpdGVtIGluIHRoZSBhcnJheSBzaG91bGQgYmUgYW4gYXJyYXkgb2Ygbm9ybWFsaXplZCB4IGFuZCB5IGNvb3JkaW5hdGVzLlxuXG4gIHNldFNwZWFrZXJzKGxvY2F0aW9ucykge1xuXG4gIH1cbiAgKi9cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9qc2hpbnQtbG9hZGVyIS4vbGliL2ludGVyZmFjZXMvcGFuMmQuanMiLCIndXNlIHN0cmljdCc7XG5cbmxldCBtYXRoID0gcmVxdWlyZSgnLi4vdXRpbC9tYXRoJyk7XG5sZXQgc3ZnID0gcmVxdWlyZSgnLi4vdXRpbC9zdmcnKTtcbmxldCBJbnRlcmZhY2UgPSByZXF1aXJlKCcuLi9jb3JlL2ludGVyZmFjZScpO1xuXG4vKipcbiogVGlsdFxuKlxuKiBAZGVzY3JpcHRpb24gRGV2aWNlIHRpbHQgc2Vuc29yIHdpdGggMiBvciAzIGF4ZXMgKGRlcGVuZGluZyBvbiB5b3VyIGRldmljZSBhbmQgYnJvd3NlcikuXG4qXG4qIEBkZW1vIDxzcGFuIG5leHVzLXVpPSd0aWx0Jz48L3NwYW4+XG4qXG4qIEBleGFtcGxlXG4qIHZhciB0aWx0ID0gbmV3IE5leHVzLlRpbHQoJyN0YXJnZXQnKVxuKlxuKiBAb3V0cHV0XG4qIGNoYW5nZVxuKiBGaXJlcyBhdCBhIHJlZ3VsYXIgaW50ZXJ2YWwsIGFzIGxvbmcgYXMgdGhpcyBpbnRlcmZhY2UgaXMgYWN0aXZlIChzZWUgdGhlIGludGVyZmFjZSdzIDxpPi5hY3RpdmU8L2k+IHByb3BlcnR5KTxicj5cbiogVGhlIGV2ZW50IGRhdGEgaXMgYW4gPGk+b2JqZWN0PC9pPiBjb250YWluaW5nIHggKG51bWJlcikgYW5kIHkgKG51bWJlcikgcHJvcGVydGllcyB3aGljaCByZXByZXNlbnQgdGhlIGN1cnJlbnQgdGlsdCBzdGF0ZSBvZiB0aGUgZGV2aWNlLlxuKlxuKiBAb3V0cHV0ZXhhbXBsZVxuKiB0aWx0Lm9uKCdjaGFuZ2UnLGZ1bmN0aW9uKHYpIHtcbiogICBjb25zb2xlLmxvZyh2KTtcbiogfSlcbipcbipcbiovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRpbHQgZXh0ZW5kcyBJbnRlcmZhY2Uge1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgbGV0IG9wdGlvbnMgPSBbJ3ZhbHVlJ107XG5cbiAgICBsZXQgZGVmYXVsdHMgPSB7XG4gICAgICAnc2l6ZSc6IFs4MCw4MF1cbiAgICB9O1xuXG4gICAgc3VwZXIoYXJndW1lbnRzLG9wdGlvbnMsZGVmYXVsdHMpO1xuXG4gICAgdGhpcy5fYWN0aXZlID0gdHJ1ZTtcblxuICAgIHRoaXMuaW5pdCgpO1xuXG4gICAgLy8gYWRkIGV2ZW50IGxpc3RlbmVyIGZvciBkZXZpY2Ugb3JpZW50YXRpb25cblxuICBcdHRoaXMuYm91bmRVcGRhdGUgPSB0aGlzLnVwZGF0ZS5iaW5kKHRoaXMpO1xuICAvL1x0dGhpcy5ib3VuZE1velRpbHQgPSB0aGlzLm1velRpbHQuYmluZCh0aGlzKVxuXG4gIFx0aWYgKHdpbmRvdy5EZXZpY2VPcmllbnRhdGlvbkV2ZW50KSB7XG4gIFx0XHR0aGlzLm9yaWVudGF0aW9uTGlzdGVuZXIgPSB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignZGV2aWNlb3JpZW50YXRpb24nLCB0aGlzLmJvdW5kVXBkYXRlLCBmYWxzZSk7XG4gIFx0fSBlbHNlIHtcbiAgICAgIHRoaXMuX2FjdGl2ZSA9IGZhbHNlO1xuICAgICAgdGhpcy5jb2xvckludGVyZmFjZSgpO1xuICAgIH1cblxuXG5cbiAgICAgIC8qZWxzZSBpZiAod2luZG93Lk9yaWVudGF0aW9uRXZlbnQpIHtcbiAgLy9cdCAgXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignTW96T3JpZW50YXRpb24nLCB0aGlzLmJvdW5kTW96VGlsdCwgZmFsc2UpO1xuICBcdH0gZWxzZSB7XG4gIFx0ICBcdGNvbnNvbGUubG9nKCdOb3Qgc3VwcG9ydGVkIG9uIHlvdXIgZGV2aWNlIG9yIGJyb3dzZXIuJyk7XG4gIFx0fSAqL1xuXG5cbiAgfVxuXG5cbiAgYnVpbGRJbnRlcmZhY2UoKSB7XG5cbiAgICB0aGlzLnRpdGxlID0gc3ZnLmNyZWF0ZSgndGV4dCcpO1xuICAgIHRoaXMuY2lyY2xlWCA9IHN2Zy5jcmVhdGUoJ2NpcmNsZScpO1xuICAgIHRoaXMuY2lyY2xlWSA9IHN2Zy5jcmVhdGUoJ2NpcmNsZScpO1xuICAgIHRoaXMuY2lyY2xlWiA9IHN2Zy5jcmVhdGUoJ2NpcmNsZScpO1xuXG4gICAgdGhpcy5iYXJYID0gc3ZnLmNyZWF0ZSgncGF0aCcpO1xuICAgIHRoaXMuYmFyWSA9IHN2Zy5jcmVhdGUoJ3BhdGgnKTtcbiAgICB0aGlzLmJhclogPSBzdmcuY3JlYXRlKCdwYXRoJyk7XG5cbiAgICB0aGlzLmJhclgyID0gc3ZnLmNyZWF0ZSgncGF0aCcpO1xuICAgIHRoaXMuYmFyWTIgPSBzdmcuY3JlYXRlKCdwYXRoJyk7XG4gICAgdGhpcy5iYXJaMiA9IHN2Zy5jcmVhdGUoJ3BhdGgnKTtcblxuICAgIHRoaXMuYmFyWC5zZXRBdHRyaWJ1dGUoJ29wYWNpdHknLCcwLjgnKTtcbiAgICB0aGlzLmJhclkuc2V0QXR0cmlidXRlKCdvcGFjaXR5JywnMC44Jyk7XG4gICAgdGhpcy5iYXJaLnNldEF0dHJpYnV0ZSgnb3BhY2l0eScsJzAuOCcpO1xuICAgIHRoaXMuYmFyWDIuc2V0QXR0cmlidXRlKCdvcGFjaXR5JywnMC44Jyk7XG4gICAgdGhpcy5iYXJZMi5zZXRBdHRyaWJ1dGUoJ29wYWNpdHknLCcwLjgnKTtcbiAgICB0aGlzLmJhcloyLnNldEF0dHJpYnV0ZSgnb3BhY2l0eScsJzAuOCcpO1xuXG4gICAgdGhpcy5jaXJjbGVYLnNldEF0dHJpYnV0ZSgnY3gnLHRoaXMud2lkdGgqMy8xMik7XG4gICAgdGhpcy5jaXJjbGVYLnNldEF0dHJpYnV0ZSgnY3knLHRoaXMuaGVpZ2h0KjMvNCk7XG4gICAgdGhpcy5jaXJjbGVYLnNldEF0dHJpYnV0ZSgncicsdGhpcy5oZWlnaHQvMTApO1xuICAgIHRoaXMuY2lyY2xlWC5zZXRBdHRyaWJ1dGUoJ29wYWNpdHknLCcwLjQnKTtcblxuICAgIHRoaXMuY2lyY2xlWS5zZXRBdHRyaWJ1dGUoJ2N4Jyx0aGlzLndpZHRoKjYvMTIpO1xuICAgIHRoaXMuY2lyY2xlWS5zZXRBdHRyaWJ1dGUoJ2N5Jyx0aGlzLmhlaWdodCozLzQpO1xuICAgIHRoaXMuY2lyY2xlWS5zZXRBdHRyaWJ1dGUoJ3InLHRoaXMuaGVpZ2h0LzEwKTtcbiAgICB0aGlzLmNpcmNsZVkuc2V0QXR0cmlidXRlKCdvcGFjaXR5JywnMC40Jyk7XG5cbiAgICB0aGlzLmNpcmNsZVouc2V0QXR0cmlidXRlKCdjeCcsdGhpcy53aWR0aCo5LzEyKTtcbiAgICB0aGlzLmNpcmNsZVouc2V0QXR0cmlidXRlKCdjeScsdGhpcy5oZWlnaHQqMy80KTtcbiAgICB0aGlzLmNpcmNsZVouc2V0QXR0cmlidXRlKCdyJyx0aGlzLmhlaWdodC8xMCk7XG4gICAgdGhpcy5jaXJjbGVaLnNldEF0dHJpYnV0ZSgnb3BhY2l0eScsJzAuNCcpO1xuXG5cbiAgICB0aGlzLmJhclguc2V0QXR0cmlidXRlKCdzdHJva2Utd2lkdGgnLE1hdGgucm91bmQodGhpcy5oZWlnaHQvMzApKTtcbiAgICB0aGlzLmJhclkuc2V0QXR0cmlidXRlKCdzdHJva2Utd2lkdGgnLE1hdGgucm91bmQodGhpcy5oZWlnaHQvMzApKTtcbiAgICB0aGlzLmJhclouc2V0QXR0cmlidXRlKCdzdHJva2Utd2lkdGgnLE1hdGgucm91bmQodGhpcy5oZWlnaHQvMzApKTtcblxuICAgIHRoaXMuYmFyWC5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCAnbm9uZScpO1xuICAgIHRoaXMuYmFyWS5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCAnbm9uZScpO1xuICAgIHRoaXMuYmFyWi5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCAnbm9uZScpO1xuXG4gICAgdGhpcy5iYXJYMi5zZXRBdHRyaWJ1dGUoJ3N0cm9rZS13aWR0aCcsTWF0aC5yb3VuZCh0aGlzLmhlaWdodC8zMCkpO1xuICAgIHRoaXMuYmFyWTIuc2V0QXR0cmlidXRlKCdzdHJva2Utd2lkdGgnLE1hdGgucm91bmQodGhpcy5oZWlnaHQvMzApKTtcbiAgICB0aGlzLmJhcloyLnNldEF0dHJpYnV0ZSgnc3Ryb2tlLXdpZHRoJyxNYXRoLnJvdW5kKHRoaXMuaGVpZ2h0LzMwKSk7XG5cbiAgICB0aGlzLmJhclgyLnNldEF0dHJpYnV0ZSgnZmlsbCcsICdub25lJyk7XG4gICAgdGhpcy5iYXJZMi5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCAnbm9uZScpO1xuICAgIHRoaXMuYmFyWjIuc2V0QXR0cmlidXRlKCdmaWxsJywgJ25vbmUnKTtcblxuXG4gICAgdGhpcy50aXRsZS5zZXRBdHRyaWJ1dGUoJ3gnLHRoaXMud2lkdGgvMik7XG4gICAgdGhpcy50aXRsZS5zZXRBdHRyaWJ1dGUoJ3knLHRoaXMuaGVpZ2h0LzMrNyk7XG4gICAgdGhpcy50aXRsZS5zZXRBdHRyaWJ1dGUoJ2ZvbnQtc2l6ZScsJzE1cHgnKTtcbiAgICB0aGlzLnRpdGxlLnNldEF0dHJpYnV0ZSgnZm9udC13ZWlnaHQnLCdib2xkJyk7XG4gICAgdGhpcy50aXRsZS5zZXRBdHRyaWJ1dGUoJ2xldHRlci1zcGFjaW5nJywnMnB4Jyk7XG4gICAgdGhpcy50aXRsZS5zZXRBdHRyaWJ1dGUoJ29wYWNpdHknLCcwLjcnKTtcbiAgICB0aGlzLnRpdGxlLnNldEF0dHJpYnV0ZSgndGV4dC1hbmNob3InLCdtaWRkbGUnKTtcbiAgICB0aGlzLnRpdGxlLnRleHRDb250ZW50ID0gJ1RJTFQnO1xuXG5cbiAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5jaXJjbGVYKTtcbiAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5jaXJjbGVZKTtcbiAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5jaXJjbGVaKTtcblxuICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmJhclgpO1xuICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmJhclkpO1xuICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmJhclopO1xuXG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuYmFyWDIpO1xuICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmJhclkyKTtcbiAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5iYXJaMik7XG5cbiAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy50aXRsZSk7XG5cbiAgfVxuXG4gIGNvbG9ySW50ZXJmYWNlKCkge1xuXG4gICAgaWYgKHRoaXMuX2FjdGl2ZSkge1xuICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHRoaXMuY29sb3JzLmFjY2VudDtcbiAgICAgIHRoaXMuY2lyY2xlWC5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLHRoaXMuY29sb3JzLmxpZ2h0KTtcbiAgICAgIHRoaXMuY2lyY2xlWS5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLHRoaXMuY29sb3JzLmxpZ2h0KTtcbiAgICAgIHRoaXMuY2lyY2xlWi5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLHRoaXMuY29sb3JzLmxpZ2h0KTtcbiAgICAgIHRoaXMuY2lyY2xlWC5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsdGhpcy5jb2xvcnMubGlnaHQpO1xuICAgICAgdGhpcy5jaXJjbGVZLnNldEF0dHJpYnV0ZSgnc3Ryb2tlJyx0aGlzLmNvbG9ycy5saWdodCk7XG4gICAgICB0aGlzLmNpcmNsZVouc2V0QXR0cmlidXRlKCdzdHJva2UnLHRoaXMuY29sb3JzLmxpZ2h0KTtcbiAgICAgIHRoaXMuYmFyWC5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsdGhpcy5jb2xvcnMubGlnaHQpO1xuICAgICAgdGhpcy5iYXJZLnNldEF0dHJpYnV0ZSgnc3Ryb2tlJyx0aGlzLmNvbG9ycy5saWdodCk7XG4gICAgICB0aGlzLmJhclouc2V0QXR0cmlidXRlKCdzdHJva2UnLHRoaXMuY29sb3JzLmxpZ2h0KTtcbiAgICAgIHRoaXMuYmFyWDIuc2V0QXR0cmlidXRlKCdzdHJva2UnLHRoaXMuY29sb3JzLmxpZ2h0KTtcbiAgICAgIHRoaXMuYmFyWTIuc2V0QXR0cmlidXRlKCdzdHJva2UnLHRoaXMuY29sb3JzLmxpZ2h0KTtcbiAgICAgIHRoaXMuYmFyWjIuc2V0QXR0cmlidXRlKCdzdHJva2UnLHRoaXMuY29sb3JzLmxpZ2h0KTtcbiAgICAgIHRoaXMudGl0bGUuc2V0QXR0cmlidXRlKCdmaWxsJyx0aGlzLmNvbG9ycy5saWdodCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSB0aGlzLmNvbG9ycy5maWxsO1xuICAgICAgdGhpcy5jaXJjbGVYLnNldEF0dHJpYnV0ZSgnZmlsbCcsdGhpcy5jb2xvcnMubWVkaXVtTGlnaHQpO1xuICAgICAgdGhpcy5jaXJjbGVZLnNldEF0dHJpYnV0ZSgnZmlsbCcsdGhpcy5jb2xvcnMubWVkaXVtTGlnaHQpO1xuICAgICAgdGhpcy5jaXJjbGVaLnNldEF0dHJpYnV0ZSgnZmlsbCcsdGhpcy5jb2xvcnMubWVkaXVtTGlnaHQpO1xuICAgICAgdGhpcy5jaXJjbGVYLnNldEF0dHJpYnV0ZSgnc3Ryb2tlJyx0aGlzLmNvbG9ycy5tZWRpdW1MaWdodCk7XG4gICAgICB0aGlzLmNpcmNsZVkuc2V0QXR0cmlidXRlKCdzdHJva2UnLHRoaXMuY29sb3JzLm1lZGl1bUxpZ2h0KTtcbiAgICAgIHRoaXMuY2lyY2xlWi5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsdGhpcy5jb2xvcnMubWVkaXVtTGlnaHQpO1xuICAgICAgdGhpcy5iYXJYLnNldEF0dHJpYnV0ZSgnc3Ryb2tlJyx0aGlzLmNvbG9ycy5tZWRpdW1MaWdodCk7XG4gICAgICB0aGlzLmJhclkuc2V0QXR0cmlidXRlKCdzdHJva2UnLHRoaXMuY29sb3JzLm1lZGl1bUxpZ2h0KTtcbiAgICAgIHRoaXMuYmFyWi5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsdGhpcy5jb2xvcnMubWVkaXVtTGlnaHQpO1xuICAgICAgdGhpcy5iYXJYMi5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsdGhpcy5jb2xvcnMubWVkaXVtTGlnaHQpO1xuICAgICAgdGhpcy5iYXJZMi5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsdGhpcy5jb2xvcnMubWVkaXVtTGlnaHQpO1xuICAgICAgdGhpcy5iYXJaMi5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsdGhpcy5jb2xvcnMubWVkaXVtTGlnaHQpO1xuICAgICAgdGhpcy50aXRsZS5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLHRoaXMuY29sb3JzLm1lZGl1bUxpZ2h0KTtcbiAgICB9XG5cbiAgfVxuXG4gIHVwZGF0ZSh2KSB7XG4gICAgaWYgKHRoaXMuX2FjdGl2ZSl7XG5cbiAgICAgIGxldCB5ID0gdi5iZXRhO1xuICAgICAgbGV0IHggPSB2LmdhbW1hO1xuICAgICAgbGV0IHogPSB2LmFscGhhO1xuXG4gICAgICAvLyB0YWtlIHRoZSBvcmlnaW5hbCAtOTAgdG8gOTAgc2NhbGUgYW5kIG5vcm1hbGl6ZSBpdCAwLTFcbiAgICAgIHggPSBtYXRoLnNjYWxlKHgsLTkwLDkwLDAsMSk7XG4gICAgICB5ID0gbWF0aC5zY2FsZSh5LC05MCw5MCwwLDEpO1xuICAgICAgeiA9IG1hdGguc2NhbGUoeiwwLDM2MCwwLDEpO1xuXG5cbiAgICAgIGxldCBoYW5kbGVQb2ludHMgPSB7XG4gICAgICAgIHN0YXJ0OiBNYXRoLlBJKjEuNSxcbiAgICAgICAgZW5kOiBtYXRoLmNsaXAoIG1hdGguc2NhbGUoeCwwLDAuNSxNYXRoLlBJKjEuNSxNYXRoLlBJKjAuNSkgLCBNYXRoLlBJKjAuNSwgTWF0aC5QSSoxLjUgKVxuICAgICAgfTtcbiAgICAgIGxldCBoYW5kbGUyUG9pbnRzID0ge1xuICAgICAgICBzdGFydDogTWF0aC5QSSoyLjUsXG4gICAgICAgIGVuZDogbWF0aC5jbGlwKCBtYXRoLnNjYWxlKHgsMC41LDEsTWF0aC5QSSoyLjUsTWF0aC5QSSoxLjUpICwgTWF0aC5QSSoxLjUsIE1hdGguUEkqMi41IClcbiAgICAgIH07XG5cbiAgICAgIGxldCBoYW5kbGVQYXRoID0gc3ZnLmFyYyh0aGlzLmNpcmNsZVguY3guYmFzZVZhbC52YWx1ZSwgdGhpcy5jaXJjbGVYLmN5LmJhc2VWYWwudmFsdWUsIHRoaXMuY2lyY2xlWC5yLmJhc2VWYWwudmFsdWUsIGhhbmRsZVBvaW50cy5zdGFydCwgaGFuZGxlUG9pbnRzLmVuZCk7XG4gICAgICBsZXQgaGFuZGxlMlBhdGggPSBzdmcuYXJjKHRoaXMuY2lyY2xlWC5jeC5iYXNlVmFsLnZhbHVlLCB0aGlzLmNpcmNsZVguY3kuYmFzZVZhbC52YWx1ZSwgdGhpcy5jaXJjbGVYLnIuYmFzZVZhbC52YWx1ZSwgaGFuZGxlMlBvaW50cy5zdGFydCwgaGFuZGxlMlBvaW50cy5lbmQpO1xuXG4gICAgICB0aGlzLmJhclguc2V0QXR0cmlidXRlKCdkJywgaGFuZGxlUGF0aCk7XG4gICAgICB0aGlzLmJhclgyLnNldEF0dHJpYnV0ZSgnZCcsIGhhbmRsZTJQYXRoKTtcblxuXG5cblxuXG4gICAgICBoYW5kbGVQb2ludHMgPSB7XG4gICAgICAgIHN0YXJ0OiBNYXRoLlBJKjEuNSxcbiAgICAgICAgZW5kOiBtYXRoLmNsaXAoIG1hdGguc2NhbGUoeSwwLDAuNSxNYXRoLlBJKjEuNSxNYXRoLlBJKjAuNSkgLCBNYXRoLlBJKjAuNSwgTWF0aC5QSSoxLjUgKVxuICAgICAgfTtcbiAgICAgIGhhbmRsZTJQb2ludHMgPSB7XG4gICAgICAgIHN0YXJ0OiBNYXRoLlBJKjIuNSxcbiAgICAgICAgZW5kOiBtYXRoLmNsaXAoIG1hdGguc2NhbGUoeSwwLjUsMSxNYXRoLlBJKjIuNSxNYXRoLlBJKjEuNSkgLCBNYXRoLlBJKjEuNSwgTWF0aC5QSSoyLjUgKVxuICAgICAgfTtcblxuICAgICAgaGFuZGxlUGF0aCA9IHN2Zy5hcmModGhpcy5jaXJjbGVZLmN4LmJhc2VWYWwudmFsdWUsIHRoaXMuY2lyY2xlWS5jeS5iYXNlVmFsLnZhbHVlLCB0aGlzLmNpcmNsZVkuci5iYXNlVmFsLnZhbHVlLCBoYW5kbGVQb2ludHMuc3RhcnQsIGhhbmRsZVBvaW50cy5lbmQpO1xuICAgICAgaGFuZGxlMlBhdGggPSBzdmcuYXJjKHRoaXMuY2lyY2xlWS5jeC5iYXNlVmFsLnZhbHVlLCB0aGlzLmNpcmNsZVkuY3kuYmFzZVZhbC52YWx1ZSwgdGhpcy5jaXJjbGVZLnIuYmFzZVZhbC52YWx1ZSwgaGFuZGxlMlBvaW50cy5zdGFydCwgaGFuZGxlMlBvaW50cy5lbmQpO1xuXG4gICAgICB0aGlzLmJhclkuc2V0QXR0cmlidXRlKCdkJywgaGFuZGxlUGF0aCk7XG4gICAgICB0aGlzLmJhclkyLnNldEF0dHJpYnV0ZSgnZCcsIGhhbmRsZTJQYXRoKTtcblxuXG5cblxuXG5cbiAgICAgIGhhbmRsZVBvaW50cyA9IHtcbiAgICAgICAgc3RhcnQ6IE1hdGguUEkqMS41LFxuICAgICAgICBlbmQ6IG1hdGguY2xpcCggbWF0aC5zY2FsZSh6LDAsMC41LE1hdGguUEkqMS41LE1hdGguUEkqMC41KSAsIE1hdGguUEkqMC41LCBNYXRoLlBJKjEuNSApXG4gICAgICB9O1xuICAgICAgaGFuZGxlMlBvaW50cyA9IHtcbiAgICAgICAgc3RhcnQ6IE1hdGguUEkqMi41LFxuICAgICAgICBlbmQ6IG1hdGguY2xpcCggbWF0aC5zY2FsZSh6LDAuNSwxLE1hdGguUEkqMi41LE1hdGguUEkqMS41KSAsIE1hdGguUEkqMS41LCBNYXRoLlBJKjIuNSApXG4gICAgICB9O1xuXG4gICAgICBoYW5kbGVQYXRoID0gc3ZnLmFyYyh0aGlzLmNpcmNsZVouY3guYmFzZVZhbC52YWx1ZSwgdGhpcy5jaXJjbGVaLmN5LmJhc2VWYWwudmFsdWUsIHRoaXMuY2lyY2xlWi5yLmJhc2VWYWwudmFsdWUsIGhhbmRsZVBvaW50cy5zdGFydCwgaGFuZGxlUG9pbnRzLmVuZCk7XG4gICAgICBoYW5kbGUyUGF0aCA9IHN2Zy5hcmModGhpcy5jaXJjbGVaLmN4LmJhc2VWYWwudmFsdWUsIHRoaXMuY2lyY2xlWi5jeS5iYXNlVmFsLnZhbHVlLCB0aGlzLmNpcmNsZVouci5iYXNlVmFsLnZhbHVlLCBoYW5kbGUyUG9pbnRzLnN0YXJ0LCBoYW5kbGUyUG9pbnRzLmVuZCk7XG5cbiAgICAgIHRoaXMuYmFyWi5zZXRBdHRyaWJ1dGUoJ2QnLCBoYW5kbGVQYXRoKTtcbiAgICAgIHRoaXMuYmFyWjIuc2V0QXR0cmlidXRlKCdkJywgaGFuZGxlMlBhdGgpO1xuXG5cbiAgICAgIC8qXG5cbiAgICAgIGxldCBwb2ludHNYID0ge1xuICAgICAgICBzdGFydDogMCxcbiAgICAgICAgZW5kOiBtYXRoLnNjYWxlKCB4LCAwLCAxLCAwLCBNYXRoLlBJKjIgKVxuICAgICAgfTtcblxuICAgIC8vICBjb25zb2xlLmxvZyh0aGlzLmNpcmNsZVguY3guYmFzZVZhbC52YWx1ZSk7XG5cbiAgICAgIGxldCBwYXRoWCA9IHN2Zy5hcmModGhpcy5jaXJjbGVYLmN4LmJhc2VWYWwudmFsdWUsIHRoaXMuY2lyY2xlWC5jeS5iYXNlVmFsLnZhbHVlLCB0aGlzLmNpcmNsZVguci5iYXNlVmFsLnZhbHVlKjIsIHBvaW50c1guc3RhcnQsIHBvaW50c1guZW5kKTtcblxuICAgICAgdGhpcy5iYXJYLnNldEF0dHJpYnV0ZSgnZCcscGF0aFgpOyAqL1xuXG4gICAgICAvL3RoaXMudGV4dEgudGV4dENvbnRlbnQgPSBtYXRoLnBydW5lKHgsMik7XG4gICAgICAvL3RoaXMudGV4dFYudGV4dENvbnRlbnQgPSBtYXRoLnBydW5lKHksMik7XG4gICAgICAvL1xuICAgIC8vICB0aGlzLmNpcmNsZVguc2V0QXR0cmlidXRlKCdvcGFjaXR5Jyx4KTtcbiAgICAvLyAgdGhpcy5jaXJjbGVZLnNldEF0dHJpYnV0ZSgnb3BhY2l0eScseSk7XG4gICAgLy8gIHRoaXMuY2lyY2xlWi5zZXRBdHRyaWJ1dGUoJ29wYWNpdHknLHopO1xuXG4gICAgICB0aGlzLmVtaXQoJ2NoYW5nZScsIHtcbiAgICAgICAgeDogeCxcbiAgICAgICAgeTogeSxcbiAgICAgICAgejogelxuICAgICAgfSk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIGNsaWNrKCkge1xuICAgIGlmICh3aW5kb3cuRGV2aWNlT3JpZW50YXRpb25FdmVudCkge1xuICAgICAgdGhpcy5hY3RpdmUgPSAhdGhpcy5hY3RpdmU7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gIFdoZXRoZXIgdGhlIGludGVyZmFjZSBpcyBvbiAoZW1pdHRpbmcgdmFsdWVzKSBvciBvZmYgKHBhdXNlZCAmIG5vdCBlbWl0dGluZyB2YWx1ZXMpLiBTZXR0aW5nIHRoaXMgcHJvcGVydHkgd2lsbCB1cGRhdGUgaXQuXG4gIEB0eXBlIHtib29sZWFufVxuICAqL1xuXG4gIGdldCBhY3RpdmUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FjdGl2ZTtcbiAgfVxuXG4gIHNldCBhY3RpdmUob24pIHtcbiAgICB0aGlzLl9hY3RpdmUgPSBvbjtcbiAgICB0aGlzLmNvbG9ySW50ZXJmYWNlKCk7XG4gIH1cblxuICBjdXN0b21EZXN0cm95KCkge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdkZXZpY2VvcmllbnRhdGlvbicsIHRoaXMuYm91bmRVcGRhdGUsIGZhbHNlKTtcbiAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2pzaGludC1sb2FkZXIhLi9saWIvaW50ZXJmYWNlcy90aWx0LmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG5sZXQgbWF0aCA9IHJlcXVpcmUoJy4uL3V0aWwvbWF0aCcpO1xubGV0IHN2ZyA9IHJlcXVpcmUoJy4uL3V0aWwvc3ZnJyk7XG5sZXQgSW50ZXJmYWNlID0gcmVxdWlyZSgnLi4vY29yZS9pbnRlcmZhY2UnKTtcblxuLyoqXG4gKiBNdWx0aXNsaWRlclxuICpcbiAqIEBkZXNjcmlwdGlvbiBNdWx0aXNsaWRlclxuICpcbiAqIEBkZW1vIDxzcGFuIG5leHVzLXVpPVwibXVsdGlzbGlkZXJcIj48L3NwYW4+XG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciBtdWx0aXNsaWRlciA9IG5ldyBOZXh1cy5NdWx0aXNsaWRlcignI3RhcmdldCcpXG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciBtdWx0aXNsaWRlciA9IG5ldyBOZXh1cy5NdWx0aXNsaWRlcignI3RhcmdldCcse1xuICogICdzaXplJzogWzIwMCwxMDBdLFxuICogICdudW1iZXJPZlNsaWRlcnMnOiA1LFxuICogICdtaW4nOiAwLFxuICogICdtYXgnOiAxLFxuICogICdzdGVwJzogMCxcbiAqICAnY2FuZHljYW5lJzogMyxcbiAqICAndmFsdWVzJzogWzAuOSwwLjgsMC43LDAuNiwwLjUsMC40LDAuMywwLjIsMC4xXSxcbiAqICAnc21vb3RoaW5nJzogMCxcbiAqICAnbW9kZSc6ICdiYXInICAvLyAnYmFyJyBvciAnbGluZSdcbiAqfSlcbiAqXG4gKiBAb3V0cHV0XG4gKiBjaGFuZ2VcbiAqIEZpcmVzIGFueSB0aW1lIHRoZSBpbnRlcmZhY2UncyB2YWx1ZSBjaGFuZ2VzLiA8YnI+XG4gKiBUaGUgZXZlbnQgZGF0YSBpcyBhbiBvYmplY3QgY29udGFpbmluZyA8aT5pbmRleDwvaT4gYW5kIDxpPnZhbHVlPC9pPiBwcm9wZXJ0aWVzXG4gKlxuICogQG91dHB1dGV4YW1wbGVcbiAqIG11bHRpc2xpZGVyLm9uKCdjaGFuZ2UnLGZ1bmN0aW9uKHYpIHtcbiAqICAgY29uc29sZS5sb2codik7XG4gKiB9KVxuICpcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNdWx0aXNsaWRlciBleHRlbmRzIEludGVyZmFjZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGxldCBvcHRpb25zID0gWyd2YWx1ZSddO1xuXG4gICAgbGV0IGRlZmF1bHRzID0ge1xuICAgICAgc2l6ZTogWzIwMCwgMTAwXSxcbiAgICAgIG51bWJlck9mU2xpZGVyczogNSxcbiAgICAgIG1pbjogMCxcbiAgICAgIG1heDogMSxcbiAgICAgIHN0ZXA6IDAsXG4gICAgICBjYW5keWNhbmU6IDMsXG4gICAgICB2YWx1ZXM6IFswLjksIDAuOCwgMC43LCAwLjYsIDAuNSwgMC40LCAwLjMsIDAuMiwgMC4xXSxcbiAgICAgIHNtb290aGluZzogMCxcbiAgICAgIG1vZGU6ICdiYXInIC8vICdiYXInLCAnbGluZSdcbiAgICB9O1xuXG4gICAgc3VwZXIoYXJndW1lbnRzLCBvcHRpb25zLCBkZWZhdWx0cyk7XG5cbiAgICB0aGlzLl9udW1iZXJPZlNsaWRlcnMgPSB0aGlzLnNldHRpbmdzLm51bWJlck9mU2xpZGVycztcbiAgICB0aGlzLl9taW4gPSB0aGlzLnNldHRpbmdzLm1pbjtcbiAgICB0aGlzLl9tYXggPSB0aGlzLnNldHRpbmdzLm1heDtcbiAgICB0aGlzLl9zdGVwID0gdGhpcy5zZXR0aW5ncy5zdGVwO1xuXG4gICAgdGhpcy5fbW9kZSA9IHRoaXMuc2V0dGluZ3MubW9kZTtcblxuICAgIC8qKlxuICAgIFRoZSBjdXJyZW50IHZhbHVlcyBvZiB0aGUgc2xpZGVyLiBOT1RFOiBVc2UgdGhpcyBvbmx5IHRvIGdldCB0aGUgY3VycmVudCB2YWx1ZXMuIFNldHRpbmcgdGhpcyBhcnJheSB3aWxsIG5vdCB1cGRhdGUgdGhlIG11bHRpc2xpZGVyLiBUbyBzZXQgdGhlIG11bHRpc2xpZGVyJ3MgdmFsdWVzLCB1c2Ugc2V0U2xpZGVyKCkgb3Igc2V0QWxsU2xpZGVycygpXG4gICAgQHR5cGUge0FycmF5fVxuICAgICovXG4gICAgY29uc3QgdnMgPSB0aGlzLnNldHRpbmdzLnZhbHVlcztcbiAgICB0aGlzLnZhbHVlcyA9IHZzLmxlbmd0aCA+IHRoaXMuX251bWJlck9mU2xpZGVycyA/IHZzLnNsaWNlKDAsIHRoaXMuX251bWJlck9mU2xpZGVycykgOiB2cy5jb25jYXQoQXJyYXkodGhpcy5fbnVtYmVyT2ZTbGlkZXJzIC0gdnMubGVuZ3RoKS5maWxsKDApKTtcblxuICAgIHRoaXMuY2FuZHljYW5lID0gdGhpcy5zZXR0aW5ncy5jYW5keWNhbmU7XG5cbiAgICB0aGlzLnNsaWRlcldpZHRoID0gdGhpcy53aWR0aCAvIHRoaXMudmFsdWVzLmxlbmd0aDtcblxuICAgIC8qKlxuICAgIEFwcGxpZXMgYSBzaW1wbGUgbG93LXBhc3MgZmlsdGVyIHRvIHRoZSBtdWx0aXNsaWRlciBhcyBpdCBpcyBpbnRlcmFjdGVkIHdpdGguIEEgc21vb3RoaW5nIG9mIDAgd2lsbCBiZSBubyBzbW9vdGhpbmcuIEEgc21vb3RoaW5nIG9mIDEgd2lsbCBzbW9vdGggMSBzbGlkZXIgb24gZWFjaCBzaWRlIG9mIHRoZSBpbnRlcmFjdGlvbi4gQSBzbW9vdGhpbmcgb2YgMiB3aWxsIHNtb290aCAyIHNsaWRlcnMgb24gZWFjaCBzaWRlLCBhbmQgc28gb24uXG4gICAgQHR5cGUge051bWJlcn1cbiAgICAqL1xuICAgIHRoaXMuc21vb3RoaW5nID0gdGhpcy5zZXR0aW5ncy5zbW9vdGhpbmc7XG5cbiAgICB0aGlzLmluaXQoKTtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgYnVpbGRJbnRlcmZhY2UoKSB7XG4gICAgaWYgKHRoaXMuX21vZGUgPT0gJ2xpbmUnKSB7XG4gICAgICB0aGlzLmxpbmUgPSBzdmcuY3JlYXRlKCdwb2x5bGluZScpO1xuICAgICAgdGhpcy5saW5lLnNldEF0dHJpYnV0ZSgnc3Ryb2tlLXdpZHRoJywgMik7XG4gICAgICB0aGlzLmxpbmUuc2V0QXR0cmlidXRlKCdmaWxsJywgJ25vbmUnKTtcblxuICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMubGluZSk7XG5cbiAgICAgIHRoaXMuZmlsbCA9IHN2Zy5jcmVhdGUoJ3BvbHlsaW5lJyk7XG4gICAgICB0aGlzLmZpbGwuc2V0QXR0cmlidXRlKCdmaWxsLW9wYWNpdHknLCAnMC4yJyk7XG5cbiAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmZpbGwpO1xuXG4gICAgICB0aGlzLm5vZGVzID0gW107XG5cbiAgICAgIHRoaXMudmFsdWVzLmZvckVhY2goXG4gICAgICAgIGZ1bmN0aW9uKHZhbHVlLCBpbmRleCkge1xuICAgICAgICAgIGxldCBub2RlID0gc3ZnLmNyZWF0ZSgnY2lyY2xlJyk7XG5cbiAgICAgICAgICBub2RlLnNldEF0dHJpYnV0ZSgnY3gnLCB0aGlzLmdldFgoaW5kZXgpKTtcbiAgICAgICAgICBub2RlLnNldEF0dHJpYnV0ZSgnY3knLCB0aGlzLmdldFkodmFsdWUpKTtcblxuICAgICAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZChub2RlKTtcbiAgICAgICAgICB0aGlzLm5vZGVzLnB1c2gobm9kZSk7XG4gICAgICAgIH0uYmluZCh0aGlzKVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5iYXJzID0gW107XG4gICAgICB0aGlzLmNhcHMgPSBbXTtcblxuICAgICAgdGhpcy52YWx1ZXMuZm9yRWFjaChcbiAgICAgICAgZnVuY3Rpb24odmFsdWUsIGluZGV4KSB7XG4gICAgICAgICAgbGV0IGJhciA9IHN2Zy5jcmVhdGUoJ3JlY3QnKTtcblxuICAgICAgICAgIGxldCB4ID0gdGhpcy5nZXRCYXJYKGluZGV4KTtcbiAgICAgICAgICBsZXQgeSA9IHRoaXMuZ2V0WSh2YWx1ZSk7XG5cbiAgICAgICAgICBiYXIuc2V0QXR0cmlidXRlKCd4JywgeCAtIDAuMSk7XG4gICAgICAgICAgYmFyLnNldEF0dHJpYnV0ZSgneScsIHkpO1xuICAgICAgICAgIGJhci5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgdGhpcy5zbGlkZXJXaWR0aCArIDAuMik7XG4gICAgICAgICAgYmFyLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgdGhpcy5oZWlnaHQpO1xuICAgICAgICAgIGJhci5zZXRBdHRyaWJ1dGUoXG4gICAgICAgICAgICAnb3BhY2l0eScsXG4gICAgICAgICAgICAxIC0gKChpbmRleCAlIHRoaXMuY2FuZHljYW5lKSArIDEpIC8gKHRoaXMuY2FuZHljYW5lICsgMSlcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKGJhcik7XG4gICAgICAgICAgdGhpcy5iYXJzLnB1c2goYmFyKTtcblxuICAgICAgICAgIGxldCBjYXAgPSBzdmcuY3JlYXRlKCdyZWN0Jyk7XG5cbiAgICAgICAgICBjYXAuc2V0QXR0cmlidXRlKCd4JywgeCAtIDAuMSk7XG4gICAgICAgICAgY2FwLnNldEF0dHJpYnV0ZSgneScsIHkpO1xuICAgICAgICAgIGNhcC5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgdGhpcy5zbGlkZXJXaWR0aCArIDAuMik7XG4gICAgICAgICAgY2FwLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgNSk7XG5cbiAgICAgICAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQoY2FwKTtcbiAgICAgICAgICB0aGlzLmNhcHMucHVzaChjYXApO1xuICAgICAgICB9LmJpbmQodGhpcylcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgZ2V0QmFyWChpbmRleCkge1xuICAgIHJldHVybiB0aGlzLmdldFgoaW5kZXgpIC0gdGhpcy5zbGlkZXJXaWR0aCAvIDI7XG4gIH1cblxuICBnZXRYKGluZGV4KSB7XG4gICAgLy9yZXR1cm4gTWF0aC5mbG9vciggaW5kZXggKiB0aGlzLnNsaWRlcldpZHRoICsgdGhpcy5zbGlkZXJXaWR0aC8yICk7XG4gICAgcmV0dXJuIGluZGV4ICogdGhpcy5zbGlkZXJXaWR0aCArIHRoaXMuc2xpZGVyV2lkdGggLyAyO1xuICB9XG5cbiAgZ2V0WSh2YWx1ZSkge1xuICAgIHJldHVybiBtYXRoLnNjYWxlKHZhbHVlLCB0aGlzLl9taW4sIHRoaXMuX21heCwgdGhpcy5oZWlnaHQsIDApOyAvLygxIC0gdmFsdWUpICogdGhpcy5oZWlnaHQ7XG4gIH1cblxuICBnZXRWYWx1ZUZyb21ZKHkpIHtcbiAgICBsZXQgc2NhbGVBZGp1c3RlZCA9IG1hdGguc2NhbGUoeSwgdGhpcy5oZWlnaHQsIDAsIHRoaXMuX21pbiwgdGhpcy5fbWF4KTtcbiAgICByZXR1cm4gdGhpcy5hZGp1c3RWYWx1ZVRvU3RlcChzY2FsZUFkanVzdGVkKTtcbiAgfVxuXG4gIGdldEluZGV4RnJvbVgoeCkge1xuICAgIHJldHVybiBtYXRoLmNsaXAoXG4gICAgICBNYXRoLmZsb29yKCh4IC8gdGhpcy53aWR0aCkgKiB0aGlzLnZhbHVlcy5sZW5ndGgpLFxuICAgICAgMCxcbiAgICAgIHRoaXMudmFsdWVzLmxlbmd0aCAtIDFcbiAgICApO1xuICB9XG5cbiAgYWRqdXN0VmFsdWVUb1N0ZXAodmFsdWUpIHtcbiAgICBpZiAoIXRoaXMuX3N0ZXApIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgbGV0IG9mZnNldCA9IHZhbHVlICUgdGhpcy5fc3RlcDtcbiAgICB2YWx1ZSA9IHZhbHVlIC0gKHZhbHVlICUgdGhpcy5fc3RlcCk7XG4gICAgaWYgKG9mZnNldCA+IHRoaXMuX3N0ZXAgLyAyKSB7XG4gICAgICB2YWx1ZSArPSB0aGlzLl9zdGVwO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICBhZGp1c3RBbGxWYWx1ZXMoKSB7XG4gICAgdGhpcy52YWx1ZXMuZm9yRWFjaChcbiAgICAgIGZ1bmN0aW9uKHZhbHVlLCBpbmRleCkge1xuICAgICAgICB2YWx1ZSA9IHRoaXMuYWRqdXN0VmFsdWVUb1N0ZXAodmFsdWUpO1xuICAgICAgICB0aGlzLnZhbHVlc1tpbmRleF0gPSBtYXRoLmNsaXAodmFsdWUsIHRoaXMuX21pbiwgdGhpcy5fbWF4KTtcbiAgICAgIH0uYmluZCh0aGlzKVxuICAgICk7XG4gIH1cblxuICBnZXROb3JtYWxpemVkVmFsdWVzKCkge1xuICAgIHRoaXMubm9ybWFsaXplZFZhbHVlcyA9IFtdO1xuICAgIHRoaXMudmFsdWVzLmZvckVhY2goXG4gICAgICBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICB0aGlzLm5vcm1hbGl6ZWRWYWx1ZXMucHVzaChcbiAgICAgICAgICBtYXRoLnNjYWxlKHZhbHVlLCB0aGlzLl9taW4sIHRoaXMuX21heCwgMCwgMSlcbiAgICAgICAgKTtcbiAgICAgIH0uYmluZCh0aGlzKVxuICAgICk7XG4gIH1cblxuICBjb2xvckludGVyZmFjZSgpIHtcbiAgICB0aGlzLmVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gdGhpcy5jb2xvcnMuZmlsbDtcblxuICAgIGlmICh0aGlzLl9tb2RlID09ICdsaW5lJykge1xuICAgICAgdGhpcy5saW5lLnNldEF0dHJpYnV0ZSgnc3Ryb2tlJywgdGhpcy5jb2xvcnMuYWNjZW50KTtcbiAgICAgIHRoaXMuZmlsbC5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCB0aGlzLmNvbG9ycy5hY2NlbnQpO1xuICAgICAgdGhpcy5ub2Rlcy5mb3JFYWNoKG5vZGUgPT4ge1xuICAgICAgICBub2RlLnNldEF0dHJpYnV0ZSgnZmlsbCcsIHRoaXMuY29sb3JzLmFjY2VudCk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5iYXJzLmZvckVhY2goYmFyID0+IHtcbiAgICAgICAgYmFyLnNldEF0dHJpYnV0ZSgnZmlsbCcsIHRoaXMuY29sb3JzLmFjY2VudCk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuY2Fwcy5mb3JFYWNoKGNhcCA9PiB7XG4gICAgICAgIGNhcC5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCB0aGlzLmNvbG9ycy5hY2NlbnQpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgc2l6ZUludGVyZmFjZSgpIHtcbiAgICB0aGlzLnNsaWRlcldpZHRoID0gdGhpcy53aWR0aCAvIHRoaXMudmFsdWVzLmxlbmd0aDtcblxuICAgIGlmICh0aGlzLl9tb2RlID09ICdsaW5lJykge1xuICAgICAgdGhpcy5ub2Rlcy5mb3JFYWNoKFxuICAgICAgICBmdW5jdGlvbihub2RlKSB7XG4gICAgICAgICAgbGV0IHIgPSB+fihNYXRoLm1pbih0aGlzLndpZHRoLCB0aGlzLmhlaWdodCkgLyA1MCkgKyAyO1xuICAgICAgICAgIHIgPSBNYXRoLm1pbih0aGlzLnNsaWRlcldpZHRoLCByKTtcbiAgICAgICAgICBub2RlLnNldEF0dHJpYnV0ZSgncicsIHIpO1xuICAgICAgICB9LmJpbmQodGhpcylcbiAgICAgICk7XG4gICAgfVxuXG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBpZiAodGhpcy5fbW9kZSA9PSAnbGluZScpIHtcbiAgICAgIGxldCBkYXRhID0gJzAgJyArIHRoaXMuZ2V0WSh0aGlzLnZhbHVlc1swXSkgKyAnLCAnO1xuXG4gICAgICB0aGlzLnZhbHVlcy5mb3JFYWNoKCh2YWx1ZSwgaW5kZXgpID0+IHtcbiAgICAgICAgbGV0IHggPSB0aGlzLmdldFgoaW5kZXgpO1xuICAgICAgICBsZXQgeSA9IHRoaXMuZ2V0WSh2YWx1ZSk7XG4gICAgICAgIGRhdGEgKz0geCArICcgJyArIHkgKyAnLCAnO1xuICAgICAgICB0aGlzLm5vZGVzW2luZGV4XS5zZXRBdHRyaWJ1dGUoJ2N4JywgdGhpcy5nZXRYKGluZGV4KSk7XG4gICAgICAgIHRoaXMubm9kZXNbaW5kZXhdLnNldEF0dHJpYnV0ZSgnY3knLCB0aGlzLmdldFkodmFsdWUpKTtcbiAgICAgIH0pO1xuXG4gICAgICBkYXRhICs9IHRoaXMud2lkdGggKyAnICcgKyB0aGlzLmdldFkodGhpcy52YWx1ZXNbdGhpcy52YWx1ZXMubGVuZ3RoIC0gMV0pO1xuXG4gICAgICB0aGlzLmxpbmUuc2V0QXR0cmlidXRlKCdwb2ludHMnLCBkYXRhKTtcblxuICAgICAgLy8gZmlsbCBkYXRhXG4gICAgICAvLyBhZGQgYm90dG9tIGNvcm5lcnNcblxuICAgICAgZGF0YSArPSAnLCAnICsgdGhpcy53aWR0aCArICcgJyArIHRoaXMuaGVpZ2h0ICsgJywgJztcbiAgICAgIGRhdGEgKz0gJzAgJyArIHRoaXMuaGVpZ2h0O1xuXG4gICAgICB0aGlzLmZpbGwuc2V0QXR0cmlidXRlKCdwb2ludHMnLCBkYXRhKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy52YWx1ZXMuZm9yRWFjaCgodmFsdWUsIGluZGV4KSA9PiB7XG4gICAgICAgIHRoaXMuYmFyc1tpbmRleF0uc2V0QXR0cmlidXRlKCd5JywgdGhpcy5nZXRZKHZhbHVlKSk7XG4gICAgICAgIHRoaXMuY2Fwc1tpbmRleF0uc2V0QXR0cmlidXRlKCd5JywgdGhpcy5nZXRZKHZhbHVlKSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBjbGljaygpIHtcbiAgICB0aGlzLmhhc01vdmVkID0gZmFsc2U7XG4gICAgdGhpcy5wcmV2aW91c1NsaWRlciA9IGZhbHNlO1xuICAgIHRoaXMubW92ZSgpO1xuICB9XG5cbiAgbW92ZSgpIHtcbiAgICBpZiAodGhpcy5jbGlja2VkKSB7XG4gICAgICB0aGlzLm1vdXNlLnggPSBtYXRoLmNsaXAodGhpcy5tb3VzZS54LCAwLCB0aGlzLndpZHRoKTtcbiAgICAgIHRoaXMubW91c2UueSA9IG1hdGguY2xpcCh0aGlzLm1vdXNlLnksIDAsIHRoaXMuaGVpZ2h0KTtcbiAgICAgIHRoaXMuaGFzTW92ZWQgPSB0cnVlO1xuXG4gICAgICB0aGlzLnNlbGVjdGVkU2xpZGVyID0gdGhpcy5nZXRJbmRleEZyb21YKHRoaXMubW91c2UueCk7XG5cbiAgICAgIHRoaXMudmFsdWVzW3RoaXMuc2VsZWN0ZWRTbGlkZXJdID0gdGhpcy5nZXRWYWx1ZUZyb21ZKHRoaXMubW91c2UueSk7XG5cbiAgICAgIC8qIGhhbmRsZSBpbnRlcnBvbGF0aW9uIGZvciBpbi1iZXR3ZWVuIHNsaWRlcnMgKi9cblxuICAgICAgaWYgKHRoaXMucHJldmlvdXNTbGlkZXIgIT09IGZhbHNlKSB7XG4gICAgICAgIGxldCBkaXN0YW5jZSA9IE1hdGguYWJzKHRoaXMucHJldmlvdXNTbGlkZXIgLSB0aGlzLnNlbGVjdGVkU2xpZGVyKTtcbiAgICAgICAgaWYgKGRpc3RhbmNlID4gMSkge1xuICAgICAgICAgIGxldCBsb3cgPSBNYXRoLm1pbih0aGlzLnByZXZpb3VzU2xpZGVyLCB0aGlzLnNlbGVjdGVkU2xpZGVyKTtcbiAgICAgICAgICBsZXQgaGlnaCA9IE1hdGgubWF4KHRoaXMucHJldmlvdXNTbGlkZXIsIHRoaXMuc2VsZWN0ZWRTbGlkZXIpO1xuICAgICAgICAgIGxldCBsb3dWYWx1ZSA9IHRoaXMudmFsdWVzW2xvd107XG4gICAgICAgICAgbGV0IGhpZ2hWYWx1ZSA9IHRoaXMudmFsdWVzW2hpZ2hdO1xuICAgICAgICAgIGZvciAobGV0IGkgPSBsb3c7IGkgPCBoaWdoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWVzW2ldID0gbWF0aC5pbnRlcnAoXG4gICAgICAgICAgICAgIChpIC0gbG93KSAvIGRpc3RhbmNlLFxuICAgICAgICAgICAgICBsb3dWYWx1ZSxcbiAgICAgICAgICAgICAgaGlnaFZhbHVlXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdGhpcy52YWx1ZXNbaV0gPSB0aGlzLmFkanVzdFZhbHVlVG9TdGVwKHRoaXMudmFsdWVzW2ldKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuc21vb3RoaW5nID4gMCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8PSB0aGlzLnNtb290aGluZzsgaSsrKSB7XG4gICAgICAgICAgbGV0IGRvd25DZW50ZXIgPSB0aGlzLnNlbGVjdGVkU2xpZGVyIC0gaTtcbiAgICAgICAgICBsZXQgdXBDZW50ZXIgPSB0aGlzLnNlbGVjdGVkU2xpZGVyICsgaTtcblxuICAgICAgICAgIGlmIChkb3duQ2VudGVyID49IDEpIHtcbiAgICAgICAgICAgIGxldCBkb3duTG93ZXJOZWlnaGJvciA9IGRvd25DZW50ZXIgLSAxID49IDAgPyBkb3duQ2VudGVyIC0gMSA6IDA7XG4gICAgICAgICAgICBsZXQgZG93blVwcGVyTmVpZ2hib3IgPSBkb3duQ2VudGVyICsgMTtcbiAgICAgICAgICAgIHRoaXMudmFsdWVzW2Rvd25DZW50ZXJdID1cbiAgICAgICAgICAgICAgKHRoaXMudmFsdWVzW2Rvd25Mb3dlck5laWdoYm9yXSArXG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZXNbZG93blVwcGVyTmVpZ2hib3JdKSAvXG4gICAgICAgICAgICAgIDI7XG4gICAgICAgICAgICB0aGlzLnZhbHVlc1tkb3duQ2VudGVyXSA9IHRoaXMuYWRqdXN0VmFsdWVUb1N0ZXAoXG4gICAgICAgICAgICAgIHRoaXMudmFsdWVzW2Rvd25DZW50ZXJdXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh1cENlbnRlciA8IHRoaXMudmFsdWVzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIGxldCB1cExvd2VyTmVpZ2hib3IgPSB1cENlbnRlciAtIDE7XG4gICAgICAgICAgICBsZXQgdXBVcHBlck5laWdoYm9yID0gdXBDZW50ZXIgKyAxIDwgdGhpcy52YWx1ZXMubGVuZ3RoID8gdXBDZW50ZXIgKyAxIDogdGhpcy52YWx1ZXMubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIHRoaXMudmFsdWVzW3VwQ2VudGVyXSA9XG4gICAgICAgICAgICAgICh0aGlzLnZhbHVlc1t1cExvd2VyTmVpZ2hib3JdICsgdGhpcy52YWx1ZXNbdXBVcHBlck5laWdoYm9yXSkgLyAyO1xuICAgICAgICAgICAgdGhpcy52YWx1ZXNbdXBDZW50ZXJdID0gdGhpcy5hZGp1c3RWYWx1ZVRvU3RlcChcbiAgICAgICAgICAgICAgdGhpcy52YWx1ZXNbdXBDZW50ZXJdXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLnByZXZpb3VzU2xpZGVyID0gdGhpcy5zZWxlY3RlZFNsaWRlcjtcblxuICAgICAgdGhpcy5lbWl0KCdjaGFuZ2UnLCB0aGlzLnZhbHVlcyk7XG4gICAgICB0aGlzLnJlbmRlcigpO1xuICAgIH1cbiAgfVxuXG4gIC8vIHdvdWxkIGJlIGEgY29vbCBBUEkgY2FsbCB0byBoYXZlIGZvciBsYXRlci4uLlxuICBzY2FuKCkge31cblxuICB1cGRhdGUoaW5kZXgsIHZhbHVlKSB7XG4gICAgdGhpcy52YWx1ZXNbaW5kZXhdID0gdGhpcy5hZGp1c3RWYWx1ZVRvU3RlcCh2YWx1ZSk7XG4gICAgdGhpcy5lbWl0KCdjaGFuZ2UnLCB7XG4gICAgICBpbmRleDogaW5kZXgsXG4gICAgICB2YWx1ZTogdmFsdWVcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICBHZXQgdGhlIG51bWJlciBvZiBzbGlkZXJzXG4gIEB0eXBlIHtOdW1iZXJ9XG4gICovXG4gIGdldCBudW1iZXJPZlNsaWRlcnMoKSB7XG4gICAgcmV0dXJuIHRoaXMudmFsdWVzLmxlbmd0aDtcbiAgfVxuXG4gIC8qKlxuICBMb3dlciBsaW1pdCBvZiB0aGUgbXVsdGlzbGlkZXIncyBvdXRwdXQgcmFuZ2VcbiAgQHR5cGUge251bWJlcn1cbiAgQGV4YW1wbGUgbXVsdGlzbGlkZXIubWluID0gMTAwMDtcbiAgKi9cbiAgZ2V0IG1pbigpIHtcbiAgICByZXR1cm4gdGhpcy5fbWluO1xuICB9XG4gIHNldCBtaW4odikge1xuICAgIHRoaXMuX21pbiA9IHY7XG4gICAgdGhpcy5hZGp1c3RBbGxWYWx1ZXMoKTtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgLyoqXG4gIFVwcGVyIGxpbWl0IG9mIHRoZSBtdWx0aXNsaWRlcidzIG91dHB1dCByYW5nZVxuICBAdHlwZSB7bnVtYmVyfVxuICBAZXhhbXBsZSBtdWx0aXNsaWRlci5tYXggPSAxMDAwO1xuICAqL1xuICBnZXQgbWF4KCkge1xuICAgIHJldHVybiB0aGlzLl9tYXg7XG4gIH1cbiAgc2V0IG1heCh2KSB7XG4gICAgdGhpcy5fbWF4ID0gdjtcbiAgICB0aGlzLmFkanVzdEFsbFZhbHVlcygpO1xuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICAvKipcbiAgVGhlIGluY3JlbWVudCB0aGF0IHRoZSBtdWx0aXNsaWRlcidzIHZhbHVlIGNoYW5nZXMgYnkuXG4gIEB0eXBlIHtudW1iZXJ9XG4gIEBleGFtcGxlIG11bHRpc2xpZGVyLnN0ZXAgPSA1O1xuICAqL1xuICBnZXQgc3RlcCgpIHtcbiAgICByZXR1cm4gdGhpcy5fc3RlcDtcbiAgfVxuICBzZXQgc3RlcCh2KSB7XG4gICAgdGhpcy5fc3RlcCA9IHY7XG4gICAgdGhpcy5hZGp1c3RBbGxWYWx1ZXMoKTtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgLyoqXG4gIFNldCB0aGUgdmFsdWUgb2YgYW4gaW5kaXZpZHVhbCBzbGlkZXJcbiAgQHBhcmFtIGluZGV4IHtudW1iZXJ9IFNsaWRlciBpbmRleFxuICBAcGFyYW0gdmFsdWUge251bWJlcn0gTmV3IHNsaWRlciB2YWx1ZVxuICBAZXhhbXBsZVxuICAvLyBTZXQgdGhlIGZpcnN0IHNsaWRlciB0byB2YWx1ZSAwLjVcbiAgbXVsdGlzbGlkZXIuc2V0U2xpZGVyKDAsMC41KVxuICAqL1xuICBzZXRTbGlkZXIoaW5kZXgsIHZhbHVlKSB7XG4gICAgdGhpcy52YWx1ZXNbaW5kZXhdID0gdGhpcy5hZGp1c3RWYWx1ZVRvU3RlcCh2YWx1ZSk7XG4gICAgdGhpcy52YWx1ZXNbaW5kZXhdID0gbWF0aC5jbGlwKHRoaXMudmFsdWVzW2luZGV4XSwgdGhpcy5fbWluLCB0aGlzLl9tYXgpO1xuICAgIHRoaXMuZW1pdCgnY2hhbmdlJywge1xuICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgdmFsdWU6IHZhbHVlXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgU2V0IHRoZSB2YWx1ZSBvZiBhbGwgc2xpZGVycyBhdCBvbmNlLiBJZiB0aGUgc2l6ZSBvZiB0aGUgaW5wdXQgYXJyYXkgZG9lcyBub3QgbWF0Y2ggdGhlIGN1cnJlbnQgbnVtYmVyIG9mIHNsaWRlcnMsIHRoZSB2YWx1ZSBhcnJheSB3aWxsIHJlcGVhdCB1bnRpbCBhbGwgc2xpZGVycyBoYXZlIGJlZW4gc2V0LiBJLmUuIGFuIGlucHV0IGFycmF5IG9mIGxlbmd0aCAxIHdpbGwgc2V0IGFsbCBzbGlkZXJzIHRvIHRoYXQgdmFsdWUuXG4gIEBwYXJhbSB2YWx1ZXMge0FycmF5fSBBbGwgc2xpZGVyIHZhbHVlc1xuICBAZXhhbXBsZVxuICBtdWx0aXNsaWRlci5zZXRBbGxTbGlkZXJzKFswLjIsMC4zLDAuNCwwLjUsMC42XSlcbiAgKi9cbiAgc2V0QWxsU2xpZGVycyh2YWx1ZXMpIHtcbiAgICBsZXQgcHJldmlvdXNMZW5ndGggPSB0aGlzLnZhbHVlcy5sZW5ndGg7XG4gICAgbGV0IG5ld0xlbmd0aCA9IHZhbHVlcy5sZW5ndGg7XG4gICAgdGhpcy52YWx1ZXMgPSB2YWx1ZXM7XG4gICAgdGhpcy5hZGp1c3RBbGxWYWx1ZXMoKTtcbiAgICBpZiAocHJldmlvdXNMZW5ndGggIT0gbmV3TGVuZ3RoKSB7XG4gICAgICB0aGlzLmVtcHR5KCk7XG4gICAgICB0aGlzLmJ1aWxkSW50ZXJmYWNlKCk7XG4gICAgICB0aGlzLmNvbG9ySW50ZXJmYWNlKCk7XG4gICAgfVxuICAgIHRoaXMuc2l6ZUludGVyZmFjZSgpO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2pzaGludC1sb2FkZXIhLi9saWIvaW50ZXJmYWNlcy9tdWx0aXNsaWRlci5qcyIsIid1c2Ugc3RyaWN0JztcblxubGV0IHN2ZyA9IHJlcXVpcmUoJy4uL3V0aWwvc3ZnJyk7XG5sZXQgbWF0aCA9IHJlcXVpcmUoJy4uL3V0aWwvbWF0aCcpO1xubGV0IEludGVyZmFjZSA9IHJlcXVpcmUoJy4uL2NvcmUvaW50ZXJmYWNlJyk7XG5sZXQgU3RlcCA9IHJlcXVpcmUoJy4uL21vZGVscy9zdGVwJyk7XG5pbXBvcnQgKiBhcyBJbnRlcmFjdGlvbiBmcm9tICcuLi91dGlsL2ludGVyYWN0aW9uJztcblxuLyoqXG4qIFBhblxuKlxuKiBAZGVzY3JpcHRpb24gU3RlcmVvIGNyb3NzZmFkZXIuXG4qXG4qIEBkZW1vIDxzcGFuIG5leHVzLXVpPVwicGFuXCI+PC9zcGFuPlxuKlxuKiBAZXhhbXBsZVxuKiB2YXIgcGFuID0gbmV3IE5leHVzLlBhbignI3RhcmdldCcpXG4qXG4qIEBvdXRwdXRcbiogY2hhbmdlXG4qIEZpcmVzIGFueSB0aW1lIHRoZSBpbnRlcmZhY2UncyB2YWx1ZSBjaGFuZ2VzLiA8YnI+XG4qIFRoZSBldmVudCBkYXRhIGlzIGFuIG9iamVjdCBjb250YWluaW5nIHRoZSBpbnRlcmZhY2UncyA8aT52YWx1ZTwvaT4gKC0xIHRvIDEpLCBhcyB3ZWxsIGFzIDxpPkw8L2k+IGFuZCA8aT5SPC9pPiBhbXBsaXR1ZGUgdmFsdWVzICgwLTEpIGZvciBsZWZ0IGFuZCByaWdodCBzcGVha2VycywgY2FsY3VsYXRlZCBieSBhIHNxdWFyZS1yb290IGNyb3NzZmFkZSBhbGdvcml0aG0uXG4qXG4qIEBvdXRwdXRleGFtcGxlXG4qIHBhbi5vbignY2hhbmdlJyxmdW5jdGlvbih2KSB7XG4qICAgY29uc29sZS5sb2codik7XG4qIH0pXG4qXG4qXG4qL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYW4gZXh0ZW5kcyBJbnRlcmZhY2Uge1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgbGV0IG9wdGlvbnMgPSBbJ3NjYWxlJywndmFsdWUnXTtcblxuICAgIGxldCBkZWZhdWx0cyA9IHtcbiAgICAgICdzaXplJzogWzEyMCwyMF0sXG4gICAgICAnb3JpZW50YXRpb24nOiAnaG9yaXpvbnRhbCcsXG4gICAgICAnbW9kZSc6ICdyZWxhdGl2ZScsXG4gICAgICAnc2NhbGUnOiBbLTEsMV0sXG4gICAgICAnc3RlcCc6IDAsXG4gICAgICAndmFsdWUnOiAwLFxuICAgICAgJ2hhc0tub2InOiB0cnVlXG4gICAgfTtcblxuICAgIHN1cGVyKGFyZ3VtZW50cyxvcHRpb25zLGRlZmF1bHRzKTtcblxuICAgIHRoaXMub3JpZW50YXRpb24gPSB0aGlzLnNldHRpbmdzLm9yaWVudGF0aW9uO1xuXG4gICAgdGhpcy5tb2RlID0gdGhpcy5zZXR0aW5ncy5tb2RlO1xuXG4gICAgdGhpcy5oYXNLbm9iID0gdGhpcy5zZXR0aW5ncy5oYXNLbm9iO1xuXG4gICAgLy8gdGhpcy5zdGVwIHNob3VsZCBldmVudHVhbGx5IGJlIGdldC9zZXRcbiAgICAvLyB1cGRhdGluZyBpdCB3aWxsIHVwZGF0ZSB0aGUgX3ZhbHVlIHN0ZXAgbW9kZWxcbiAgICB0aGlzLnN0ZXAgPSB0aGlzLnNldHRpbmdzLnN0ZXA7IC8vIGZsb2F0XG5cbiAgICB0aGlzLl92YWx1ZSA9IG5ldyBTdGVwKHRoaXMuc2V0dGluZ3Muc2NhbGVbMF0sIHRoaXMuc2V0dGluZ3Muc2NhbGVbMV0sIHRoaXMuc2V0dGluZ3Muc3RlcCwgdGhpcy5zZXR0aW5ncy52YWx1ZSk7XG5cbiAgICB0aGlzLmluaXQoKTtcblxuICAgIHRoaXMucG9zaXRpb24gPSBuZXcgSW50ZXJhY3Rpb24uSGFuZGxlKHRoaXMubW9kZSx0aGlzLm9yaWVudGF0aW9uLFswLHRoaXMud2lkdGhdLFt0aGlzLmhlaWdodCwwXSk7XG4gICAgdGhpcy5wb3NpdGlvbi52YWx1ZSA9IHRoaXMuX3ZhbHVlLm5vcm1hbGl6ZWQ7XG5cbiAgICB0aGlzLnZhbHVlID0gdGhpcy5fdmFsdWUudmFsdWU7XG5cbiAgICB0aGlzLmVtaXQoJ2NoYW5nZScsdGhpcy52YWx1ZSk7XG5cbiAgfVxuXG4gIGJ1aWxkSW50ZXJmYWNlKCkge1xuXG4gICAgdGhpcy5iYXIgPSBzdmcuY3JlYXRlKCdyZWN0Jyk7XG4gICAgdGhpcy5rbm9iID0gc3ZnLmNyZWF0ZSgnY2lyY2xlJyk7XG5cbiAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5iYXIpO1xuICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmtub2IpO1xuXG4gIH1cblxuICBzaXplSW50ZXJmYWNlKCkge1xuXG4gICAgaWYgKHRoaXMucG9zaXRpb24pIHtcbiAgICAgIHRoaXMucG9zaXRpb24ucmVzaXplKFswLHRoaXMud2lkdGhdLFt0aGlzLmhlaWdodCwwXSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMud2lkdGggPCB0aGlzLmhlaWdodCkge1xuICAgICAgdGhpcy5vcmllbnRhdGlvbiA9ICd2ZXJ0aWNhbCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub3JpZW50YXRpb24gPSAnaG9yaXpvbnRhbCc7XG4gICAgfVxuXG4gICAgbGV0IHgsIHksIHcsIGgsIGJhck9mZnNldCwgY29ybmVyUmFkaXVzO1xuICAgIHRoaXMua25vYkRhdGEgPSB7XG4gICAgICBsZXZlbDogMCxcbiAgICAgIHI6IDBcbiAgICB9O1xuXG4gICAgaWYgKHRoaXMub3JpZW50YXRpb24gPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgIHRoaXMudGhpY2tuZXNzID0gdGhpcy53aWR0aCAvIDI7XG4gICAgXHR4ID0gdGhpcy53aWR0aC8yO1xuICAgIFx0eSA9IDA7XG4gICAgXHR3ID0gdGhpcy50aGlja25lc3M7XG4gICAgXHRoID0gdGhpcy5oZWlnaHQ7XG4gICAgICB0aGlzLmtub2JEYXRhLnIgPSB0aGlzLnRoaWNrbmVzcyAqIDAuODtcbiAgICBcdHRoaXMua25vYkRhdGEubGV2ZWwgPSBoLXRoaXMua25vYkRhdGEuci10aGlzLm5vcm1hbGl6ZWQqKGgtdGhpcy5rbm9iRGF0YS5yKjIpO1xuICAgICAgYmFyT2Zmc2V0ID0gJ3RyYW5zbGF0ZSgnK3RoaXMudGhpY2tuZXNzKigtMSkvMisnLDApJztcbiAgICAgIGNvcm5lclJhZGl1cyA9IHcvMjtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy50aGlja25lc3MgPSB0aGlzLmhlaWdodCAvIDI7XG4gICAgXHR4ID0gMDtcbiAgICBcdHkgPSB0aGlzLmhlaWdodC8yO1xuICAgIFx0dyA9IHRoaXMud2lkdGg7XG4gICAgXHRoID0gdGhpcy50aGlja25lc3M7XG4gICAgICB0aGlzLmtub2JEYXRhLnIgPSB0aGlzLnRoaWNrbmVzcyAqIDAuODtcbiAgICBcdHRoaXMua25vYkRhdGEubGV2ZWwgPSB0aGlzLm5vcm1hbGl6ZWQqKHctdGhpcy5rbm9iRGF0YS5yKjIpK3RoaXMua25vYkRhdGEucjtcbiAgICAgIGJhck9mZnNldCA9ICd0cmFuc2xhdGUoMCwnK3RoaXMudGhpY2tuZXNzKigtMSkvMisnKSc7XG4gICAgICBjb3JuZXJSYWRpdXMgPSBoLzI7XG4gICAgfVxuXG4gICAgdGhpcy5iYXIuc2V0QXR0cmlidXRlKCd4Jyx4KTtcbiAgICB0aGlzLmJhci5zZXRBdHRyaWJ1dGUoJ3knLHkpO1xuICAgIHRoaXMuYmFyLnNldEF0dHJpYnV0ZSgndHJhbnNmb3JtJyxiYXJPZmZzZXQpO1xuICAgIHRoaXMuYmFyLnNldEF0dHJpYnV0ZSgncngnLGNvcm5lclJhZGl1cyk7IC8vIGNvcm5lciByYWRpdXNcbiAgICB0aGlzLmJhci5zZXRBdHRyaWJ1dGUoJ3J5Jyxjb3JuZXJSYWRpdXMpO1xuICAgIHRoaXMuYmFyLnNldEF0dHJpYnV0ZSgnd2lkdGgnLHcpO1xuICAgIHRoaXMuYmFyLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JyxoKTtcblxuICAgIGlmICh0aGlzLm9yaWVudGF0aW9uID09PSAndmVydGljYWwnKSB7XG4gICAgICB0aGlzLmtub2Iuc2V0QXR0cmlidXRlKCdjeCcseCk7XG4gICAgICB0aGlzLmtub2Iuc2V0QXR0cmlidXRlKCdjeScsdGhpcy5rbm9iRGF0YS5sZXZlbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMua25vYi5zZXRBdHRyaWJ1dGUoJ2N4Jyx0aGlzLmtub2JEYXRhLmxldmVsKTtcbiAgICAgIHRoaXMua25vYi5zZXRBdHRyaWJ1dGUoJ2N5Jyx5KTtcbiAgICB9XG4gICAgdGhpcy5rbm9iLnNldEF0dHJpYnV0ZSgncicsdGhpcy5rbm9iRGF0YS5yKTtcblxuICB9XG5cbiAgY29sb3JJbnRlcmZhY2UoKSB7XG5cbiAgICB0aGlzLmJhci5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCB0aGlzLmNvbG9ycy5maWxsKTtcbiAgICB0aGlzLmtub2Iuc2V0QXR0cmlidXRlKCdmaWxsJywgdGhpcy5jb2xvcnMuYWNjZW50KTtcblxuICAgIGlmICghdGhpcy5oYXNLbm9iKSB7XG4gICAgICB0aGlzLmtub2Iuc2V0QXR0cmlidXRlKCdmaWxsJywndHJhbnNwYXJlbnQnKTtcbiAgICB9XG5cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBpZiAoIXRoaXMuY2xpY2tlZCkge1xuICAgICAgdGhpcy5rbm9iRGF0YS5yID0gdGhpcy50aGlja25lc3MqMC43NTtcbiAgICB9XG4gICAgdGhpcy5rbm9iLnNldEF0dHJpYnV0ZSgncicsdGhpcy5rbm9iRGF0YS5yKTtcblxuICAgIGlmICh0aGlzLm9yaWVudGF0aW9uID09PSAndmVydGljYWwnKSB7XG4gIFx0ICAgdGhpcy5rbm9iRGF0YS5sZXZlbCA9IHRoaXMua25vYkRhdGEucit0aGlzLl92YWx1ZS5ub3JtYWxpemVkKih0aGlzLmhlaWdodC10aGlzLmtub2JEYXRhLnIqMik7XG4gICAgICAgdGhpcy5rbm9iLnNldEF0dHJpYnV0ZSgnY3knLHRoaXMuaGVpZ2h0IC0gdGhpcy5rbm9iRGF0YS5sZXZlbCk7XG4gICAgfSBlbHNlIHtcbiAgXHQgICB0aGlzLmtub2JEYXRhLmxldmVsID0gdGhpcy5fdmFsdWUubm9ybWFsaXplZCoodGhpcy53aWR0aC10aGlzLmtub2JEYXRhLnIqMikrdGhpcy5rbm9iRGF0YS5yO1xuICAgICAgIHRoaXMua25vYi5zZXRBdHRyaWJ1dGUoJ2N4Jyx0aGlzLmtub2JEYXRhLmxldmVsKTtcbiAgICB9XG4gIH1cblxuXG4gIGNsaWNrKCkge1xuICAgIHRoaXMua25vYkRhdGEuciA9IHRoaXMudGhpY2tuZXNzKjAuOTtcbiAgICB0aGlzLnBvc2l0aW9uLmFuY2hvciA9IHRoaXMubW91c2U7XG4gICAgdGhpcy5tb3ZlKCk7XG4gIH1cblxuICBtb3ZlKCkge1xuICAgIGlmICh0aGlzLmNsaWNrZWQpIHtcbiAgICAgIHRoaXMucG9zaXRpb24udXBkYXRlKHRoaXMubW91c2UpO1xuXG4gICAgICB0aGlzLnZhbHVlID0gdGhpcy5fdmFsdWUudXBkYXRlTm9ybWFsKCB0aGlzLnBvc2l0aW9uLnZhbHVlICk7XG5cbiAgICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx7XG4gICAgICAgIHZhbHVlOiB0aGlzLnZhbHVlLFxuICAgICAgICBMOiBNYXRoLnBvdyggbWF0aC5zY2FsZSh0aGlzLnZhbHVlLC0xLDEsMSwwKSwgMiksXG4gICAgICAgIFI6IE1hdGgucG93KCBtYXRoLnNjYWxlKHRoaXMudmFsdWUsLTEsMSwwLDEpLCAyKVxuICAgICAgfSk7XG5cbiAgICB9XG4gIH1cblxuICByZWxlYXNlKCkge1xuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICAvKipcbiAgVGhlIHBvc2l0aW9uIG9mIGNyb3NzZmFkZXIsIGZyb20gLTEgKGxlZnQpIHRvIDEgKHJpZ2h0KS4gU2V0dGluZyB0aGlzIHZhbHVlIHVwZGF0ZXMgdGhlIGludGVyZmFjZSBhbmQgdHJpZ2dlcnMgdGhlIG91dHB1dCBldmVudC5cbiAgQHR5cGUge251bWJlcn1cbiAgKi9cbiAgZ2V0IHZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZS52YWx1ZTtcbiAgfVxuXG4gIHNldCB2YWx1ZSh2YWx1ZSkge1xuICAgIHRoaXMuX3ZhbHVlLnVwZGF0ZSh2YWx1ZSk7XG4gICAgdGhpcy5wb3NpdGlvbi52YWx1ZSA9IHRoaXMuX3ZhbHVlLm5vcm1hbGl6ZWQ7XG4gICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHtcbiAgICAgIHZhbHVlOiB0aGlzLnZhbHVlLFxuICAgICAgTDogTWF0aC5wb3coIG1hdGguc2NhbGUodGhpcy52YWx1ZSwtMSwxLDEsMCksIDIpLFxuICAgICAgUjogTWF0aC5wb3coIG1hdGguc2NhbGUodGhpcy52YWx1ZSwtMSwxLDAsMSksIDIpXG4gICAgfSk7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIGdldCBub3JtYWxpemVkKCkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZS5ub3JtYWxpemVkO1xuICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vanNoaW50LWxvYWRlciEuL2xpYi9pbnRlcmZhY2VzL3Bhbi5qcyIsIid1c2Ugc3RyaWN0JztcblxubGV0IG1hdGggPSByZXF1aXJlKCcuLi91dGlsL21hdGgnKTtcbmxldCBzdmcgPSByZXF1aXJlKCcuLi91dGlsL3N2ZycpO1xubGV0IEludGVyZmFjZSA9IHJlcXVpcmUoJy4uL2NvcmUvaW50ZXJmYWNlJyk7XG5cblxubGV0IFBvaW50ID0gZnVuY3Rpb24ocG9pbnQsZW52ZWxvcGUpIHtcblxuICB0aGlzLnggPSBwb2ludC54O1xuICB0aGlzLnkgPSBwb2ludC55O1xuXG4gIHRoaXMueE1pbiA9IHBvaW50LnhNaW4gfHwgMDtcbiAgdGhpcy54TWF4ID0gcG9pbnQueE1heCB8fCAxO1xuICB0aGlzLnlNaW4gPSBwb2ludC55TWluIHx8IDA7XG4gIHRoaXMueU1heCA9IHBvaW50LnlNYXggfHwgMTtcblxuICB0aGlzLmVudmVsb3BlID0gZW52ZWxvcGU7XG5cbiAgdGhpcy5lbGVtZW50ID0gc3ZnLmNyZWF0ZSgnY2lyY2xlJyk7XG4gIHRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLHRoaXMuZW52ZWxvcGUuY29sb3JzLmFjY2VudCk7XG5cbiAgdGhpcy5lbnZlbG9wZS5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuZWxlbWVudCk7XG5cbiAgdGhpcy5yZXNpemUgPSBmdW5jdGlvbigpIHtcbiAgICBsZXQgciA9IH5+KE1hdGgubWluKHRoaXMuZW52ZWxvcGUud2lkdGgsdGhpcy5lbnZlbG9wZS5oZWlnaHQpLzUwKSsyO1xuICAgIHRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3InLHIpO1xuICB9O1xuXG4gIHRoaXMubW92ZSA9IGZ1bmN0aW9uKHgseSkge1xuXG4gICAgdGhpcy54ID0gKHggfHwgeD09PTApID8geCA6IHRoaXMueDtcbiAgICB0aGlzLnkgPSAoeSB8fCB5PT09MCkgPyB5IDogdGhpcy55O1xuXG4gICAgaWYgKHRoaXMuZW52ZWxvcGUubm9kZXMuaW5kZXhPZih0aGlzKT49MCkge1xuXG4gICAgICBsZXQgcHJldkluZGV4ID0gdGhpcy5lbnZlbG9wZS5ub2Rlcy5pbmRleE9mKHRoaXMpLTE7XG4gICAgICBsZXQgbmV4dEluZGV4ID0gdGhpcy5lbnZlbG9wZS5ub2Rlcy5pbmRleE9mKHRoaXMpKzE7XG5cbiAgICAgIGxldCBwcmV2Tm9kZSA9IHRoaXMuZW52ZWxvcGUubm9kZXNbcHJldkluZGV4XTtcbiAgICAgIGxldCBuZXh0Tm9kZSA9IHRoaXMuZW52ZWxvcGUubm9kZXNbbmV4dEluZGV4XTtcblxuICAgICAgbGV0IGxvd1ggPSBwcmV2SW5kZXggPj0gMCA/IHByZXZOb2RlLnggOiAwO1xuXHQgICAgbG93WCA9IGxvd1g8dGhpcy54TWluP3RoaXMueE1pbjpsb3dYO1xuXG4gICAgICBsZXQgaGlnaFggPSBuZXh0SW5kZXggPCB0aGlzLmVudmVsb3BlLm5vZGVzLmxlbmd0aCA/IG5leHROb2RlLnggOiAxO1xuXHQgICAgaGlnaFggPSBoaWdoWD50aGlzLnhNYXg/dGhpcy54TWF4OmhpZ2hYO1xuXG4gIFx0ICBpZiAodGhpcy54IDwgbG93WCkgeyB0aGlzLnggPSBsb3dYOyB9XG4gICAgICBpZiAodGhpcy54ID4gaGlnaFgpIHsgdGhpcy54ID0gaGlnaFg7IH1cblxuICAgICAgaWYgKHRoaXMueSA8IHRoaXMueU1pbikgeyB0aGlzLnkgPSB0aGlzLnlNaW47IH1cbiAgICAgIGlmICh0aGlzLnkgPiB0aGlzLnlNYXgpIHsgdGhpcy55ID0gdGhpcy55TWF4OyB9XG5cbiAgICB9XG5cbiAgICB0aGlzLmxvY2F0aW9uID0gdGhpcy5nZXRDb29yZGluYXRlcygpO1xuICAgIHRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2N4JywgdGhpcy5sb2NhdGlvbi54KTtcbiAgICB0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKCdjeScsIHRoaXMubG9jYXRpb24ueSk7XG4gIH07XG5cbiAgdGhpcy5nZXRDb29yZGluYXRlcyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICB4OiB0aGlzLnggKiB0aGlzLmVudmVsb3BlLndpZHRoLFxuICAgICAgeTogKDEtdGhpcy55KSAqIHRoaXMuZW52ZWxvcGUuaGVpZ2h0XG4gICAgfTtcbiAgfTtcblxuICB0aGlzLm1vdmUodGhpcy54LHRoaXMueSx0cnVlKTtcbiAgdGhpcy5yZXNpemUoKTtcblxuICB0aGlzLmRlc3Ryb3kgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmVudmVsb3BlLmVsZW1lbnQucmVtb3ZlQ2hpbGQodGhpcy5lbGVtZW50KTtcbiAgICB0aGlzLmVudmVsb3BlLm5vZGVzLnNwbGljZSh0aGlzLmVudmVsb3BlLm5vZGVzLmluZGV4T2YodGhpcyksMSk7XG4gIH07XG5cblxufTtcblxuXG4vKipcbiogRW52ZWxvcGVcbipcbiogQGRlc2NyaXB0aW9uIEludGVyYWN0aXZlIGxpbmVhciByYW1wIHZpc3VhbGl6YXRpb24uXG4qXG4qIEBkZW1vIDxzcGFuIG5leHVzLXVpPVwiZW52ZWxvcGVcIj48L3NwYW4+XG4qXG4qIEBleGFtcGxlXG4qIHZhciBlbnZlbG9wZSA9IG5ldyBOZXh1cy5FbnZlbG9wZSgnI3RhcmdldCcpXG4qXG4qIEBleGFtcGxlXG4qIHZhciBlbnZlbG9wZSA9IG5ldyBOZXh1cy5FbnZlbG9wZSgnI3RhcmdldCcse1xuKiAgICdzaXplJzogWzMwMCwxNTBdLFxuKiAgICdub05ld1BvaW50cyc6IGZhbHNlLFxuKiAgICdwb2ludHMnOiBbXG4qICAgICB7XG4qICAgICAgIHg6IDAuMSxcbiogICAgICAgeTogMC40XG4qICAgICB9LFxuKiAgICAge1xuKiAgICAgICB4OiAwLjM1LFxuKiAgICAgICB5OiAwLjZcbiogICAgIH0sXG4qICAgICB7XG4qICAgICAgIHg6IDAuNjUsXG4qICAgICAgIHk6IDAuMlxuKiAgICAgfSxcbiogICAgIHtcbiogICAgICAgeDogMC45LFxuKiAgICAgICB5OiAwLjRcbiogICAgIH0sXG4qICAgXVxuKiB9KVxuKlxuKiBAb3V0cHV0XG4qIGNoYW5nZVxuKiBGaXJlcyBhbnkgdGltZSBhIG5vZGUgaXMgbW92ZWQuIDxicj5cbiogVGhlIGV2ZW50IGRhdGEgaXMgYW4gYXJyYXkgb2YgcG9pbnQgbG9jYXRpb25zLiBFYWNoIGl0ZW0gaW4gdGhlIGFycmF5IGlzIGFuIG9iamVjdCBjb250YWluaW5nIDxpPng8L2k+IGFuZCA8aT55PC9pPiBwcm9wZXJ0aWVzIGRlc2NyaWJpbmcgdGhlIGxvY2F0aW9uIG9mIGEgcG9pbnQgb24gdGhlIGVudmVsb3BlLlxuKlxuKiBAb3V0cHV0ZXhhbXBsZVxuKiBlbnZlbG9wZS5vbignY2hhbmdlJyxmdW5jdGlvbih2KSB7XG4qICAgY29uc29sZS5sb2codik7XG4qIH0pXG4qXG4qL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbnZlbG9wZSBleHRlbmRzIEludGVyZmFjZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7XG5cbiAgICBsZXQgb3B0aW9ucyA9IFsndmFsdWUnXTtcblxuICAgIGxldCBkZWZhdWx0cyA9IHtcbiAgICAgICdzaXplJzogWzMwMCwxNTBdLFxuICAgICAgJ25vTmV3UG9pbnRzJzpmYWxzZSxcbiAgICAgICdwb2ludHMnOiBbXG4gIFx0XHRcdHtcbiAgXHRcdFx0XHR4OiAwLjEsXG4gIFx0XHRcdFx0eTogMC40XG4gIFx0XHRcdH0sXG4gIFx0XHRcdHtcbiAgXHRcdFx0XHR4OiAwLjM1LFxuICBcdFx0XHRcdHk6IDAuNlxuICBcdFx0XHR9LFxuICBcdFx0XHR7XG4gIFx0XHRcdFx0eDogMC42NSxcbiAgXHRcdFx0XHR5OiAwLjJcbiAgXHRcdFx0fSxcbiAgXHRcdFx0e1xuICBcdFx0XHRcdHg6IDAuOSxcbiAgXHRcdFx0XHR5OiAwLjRcbiAgXHRcdFx0fVxuICBcdFx0XVxuICAgIH07XG5cbiAgICBzdXBlcihhcmd1bWVudHMsb3B0aW9ucyxkZWZhdWx0cyk7XG5cbiAgICB0aGlzLnBvaW50cyA9IHRoaXMuc2V0dGluZ3MucG9pbnRzO1xuXG4gICAgdGhpcy5ub2RlcyA9IFtdO1xuXG4gICAgdGhpcy5zZWxlY3RlZCA9IGZhbHNlO1xuXG4gICAgdGhpcy5pbml0KCk7XG5cblxuICB9XG5cbiAgYnVpbGRJbnRlcmZhY2UoKSB7XG5cblxuICAgIHRoaXMucG9pbnRzLmZvckVhY2goKHBvaW50KSA9PiB7XG4gICAgICBsZXQgbm9kZSA9IG5ldyBQb2ludChwb2ludCx0aGlzKTtcbiAgICAgIHRoaXMubm9kZXMucHVzaChub2RlKTtcbiAgICB9KTtcblxuICAgIHRoaXMuc29ydFBvaW50cygpO1xuXG4gICAgdGhpcy5saW5lID0gc3ZnLmNyZWF0ZSgncG9seWxpbmUnKTtcbiAgICB0aGlzLmxpbmUuc2V0QXR0cmlidXRlKCdzdHJva2Utd2lkdGgnLCAyKTtcbiAgICB0aGlzLmxpbmUuc2V0QXR0cmlidXRlKCdmaWxsJywgJ25vbmUnKTtcblxuICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmxpbmUpO1xuXG4gICAgdGhpcy5maWxsID0gc3ZnLmNyZWF0ZSgncG9seWxpbmUnKTtcbiAgICB0aGlzLmZpbGwuc2V0QXR0cmlidXRlKCdmaWxsLW9wYWNpdHknLCAnMC4yJyk7XG5cbiAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5maWxsKTtcblxuICB9XG5cbiAgc2l6ZUludGVyZmFjZSgpIHtcblxuICAgIGZvciAobGV0IGk9MDsgaTx0aGlzLm5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLm5vZGVzW2ldLnJlc2l6ZSgpO1xuICAgICAgdGhpcy5ub2Rlc1tpXS5tb3ZlKCk7XG4gICAgfVxuXG4gICAgdGhpcy5yZW5kZXIoKTtcblxuICB9XG5cbiAgY29sb3JJbnRlcmZhY2UoKSB7XG5cbiAgICB0aGlzLmVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gdGhpcy5jb2xvcnMuZmlsbDtcbiAgICB0aGlzLmxpbmUuc2V0QXR0cmlidXRlKCdzdHJva2UnLCB0aGlzLmNvbG9ycy5hY2NlbnQpO1xuICAgIHRoaXMuZmlsbC5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCB0aGlzLmNvbG9ycy5hY2NlbnQpO1xuICAgIHRoaXMubm9kZXMuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgbm9kZS5lbGVtZW50LnNldEF0dHJpYnV0ZSgnZmlsbCcsdGhpcy5jb2xvcnMuYWNjZW50KTtcbiAgICB9KTtcblxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAvLyAgdGhpcy5ub2Rlc1t0aGlzLnNlbGVjdGVkXS5tb3ZlKCB0aGlzLnBvaW50cyApXG4gICAgdGhpcy5jYWxjdWxhdGVQYXRoKCk7XG4gIH1cblxuICBjYWxjdWxhdGVQb2ludHMoKSB7XG4gICAgdGhpcy5wb2ludHMgPSBbXTtcbiAgICB0aGlzLm5vZGVzLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgIHRoaXMucG9pbnRzLnB1c2goeyB4OiBub2RlLngsIHk6IG5vZGUueSB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGNhbGN1bGF0ZVBhdGgoKSB7XG5cbiAgICAvL3N0cm9rZSBkYXRhXG4gICAgbGV0IGRhdGEgPSAnMCAnKyB0aGlzLm5vZGVzWzBdLmxvY2F0aW9uLnkrJywgJztcblxuICAgIC8vIGRhdGEgc2hvdWxkIGJlIHJlLW9yZGVyZWQgYmFzZWQgb24geCBsb2NhdGlvbi5cbiAgICAvLyB3aGF0ZXZlciBmdW5jdGlvbiBhZGRzIGEgbm9kZSBzaG91bGQgYWRkIGl0IGF0IHRoZSByaWdodCBpbmRleFxuXG4gICAgdGhpcy5ub2Rlcy5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgLy8gIGxldCBsb2NhdGlvbiA9IG5vZGUuZ2V0Q29vcmRpbmF0ZXMoKTtcbiAgICAgIGRhdGEgKz0gbm9kZS5sb2NhdGlvbi54ICsgJyAnICsgbm9kZS5sb2NhdGlvbi55ICsgJywgJztcbiAgICB9KTtcblxuXG4gIC8vICBkYXRhICs9IHBvaW50LngqdGhpcy53aWR0aCsnICcrIHBvaW50LnkqdGhpcy5oZWlnaHQrJywgJztcbiAgICBkYXRhICs9IHRoaXMud2lkdGggKyAnICcrIHRoaXMubm9kZXNbdGhpcy5ub2Rlcy5sZW5ndGgtMV0ubG9jYXRpb24ueTtcblxuICAgIHRoaXMubGluZS5zZXRBdHRyaWJ1dGUoJ3BvaW50cycsIGRhdGEpO1xuXG4gICAgLy8gZmlsbCBkYXRhXG4gICAgLy8gYWRkIGJvdHRvbSBjb3JuZXJzXG5cbiAgICBkYXRhICs9ICcsICcrdGhpcy53aWR0aCArJyAnK3RoaXMuaGVpZ2h0KycsICc7XG4gICAgZGF0YSArPSAnMCAnK3RoaXMuaGVpZ2h0O1xuXG4gICAgdGhpcy5maWxsLnNldEF0dHJpYnV0ZSgncG9pbnRzJywgZGF0YSk7XG5cbiAgfVxuXG5cblxuICBjbGljaygpIHtcbiAgXHQvLyBmaW5kIG5lYXJlc3Qgbm9kZSBhbmQgc2V0IHRoaXMuc2VsZWN0ZWQgKGluZGV4KVxuICAgIHRoaXMuaGFzTW92ZWQgPSBmYWxzZTtcbiAgXHR0aGlzLnNlbGVjdGVkID0gdGhpcy5maW5kTmVhcmVzdE5vZGUoKTtcblxuICAgIHRoaXMubm9kZXNbdGhpcy5zZWxlY3RlZF0ubW92ZSh0aGlzLm1vdXNlLngvdGhpcy53aWR0aCwxLXRoaXMubW91c2UueS90aGlzLmhlaWdodCk7XG4gICAgdGhpcy5zY2FsZU5vZGUodGhpcy5zZWxlY3RlZCk7XG5cbiAgICAvLyBtdXN0IGRvIHRoaXMgYi9jIG5ldyBub2RlIG1heSBoYXZlIGJlZW4gY3JlYXRlZFxuICAgIHRoaXMuY2FsY3VsYXRlUG9pbnRzKCk7XG4gICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHRoaXMucG9pbnRzKTtcbiAgXHR0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgbW92ZSgpIHtcbiAgXHRpZiAodGhpcy5jbGlja2VkKSB7XG4gICAgICB0aGlzLm1vdXNlLnggPSBtYXRoLmNsaXAodGhpcy5tb3VzZS54LDAsdGhpcy53aWR0aCk7XG4gICAgICB0aGlzLmhhc01vdmVkID0gdHJ1ZTtcblxuICAgICAgdGhpcy5ub2Rlc1t0aGlzLnNlbGVjdGVkXS5tb3ZlKHRoaXMubW91c2UueC90aGlzLndpZHRoLDEtdGhpcy5tb3VzZS55L3RoaXMuaGVpZ2h0KTtcbiAgICBcdHRoaXMuc2NhbGVOb2RlKHRoaXMuc2VsZWN0ZWQpO1xuXG4gICAgICB0aGlzLmNhbGN1bGF0ZVBvaW50cygpO1xuICBcdFx0dGhpcy5lbWl0KCdjaGFuZ2UnLHRoaXMucG9pbnRzKTtcbiAgXHRcdHRoaXMucmVuZGVyKCk7XG4gIFx0fVxuICB9XG5cbiAgcmVsZWFzZSgpIHtcblxuICBcdGlmICghdGhpcy5oYXNNb3ZlZCkge1xuICAgICAgdGhpcy5ub2Rlc1t0aGlzLnNlbGVjdGVkXS5kZXN0cm95KCk7XG4gIFx0fVxuXG4gICAgdGhpcy5jYWxjdWxhdGVQb2ludHMoKTtcbiAgICB0aGlzLmVtaXQoJ2NoYW5nZScsdGhpcy5wb2ludHMpO1xuICBcdHRoaXMucmVuZGVyKCk7XG5cbiAgXHQvLyByZXNldCB0aGlzLnNlbGVjdGVkXG4gIFx0dGhpcy5zZWxlY3RlZCA9IG51bGw7XG4gIH1cblxuXG4gIGZpbmROZWFyZXN0Tm9kZSgpIHtcbiAgXHR2YXIgbmVhcmVzdEluZGV4ID0gbnVsbDtcbiAgICAvLyBzZXQgdGhpcyB1bnJlYXNvbmFibHkgaGlnaCBzbyB0aGF0IGV2ZXJ5IGRpc3RhbmNlIHdpbGwgYmUgbG93ZXIgdGhhbiBpdC5cbiAgXHR2YXIgbmVhcmVzdERpc3QgPSAxMDAwMDtcbiAgXHR2YXIgYmVmb3JlID0gZmFsc2U7XG4gICAgbGV0IHggPSB0aGlzLm1vdXNlLngvdGhpcy53aWR0aDtcbiAgICBsZXQgeSA9IDEtdGhpcy5tb3VzZS55L3RoaXMuaGVpZ2h0O1xuICAgIGxldCBub2RlcyA9IHRoaXMubm9kZXM7XG4gIFx0Zm9yIChsZXQgaSA9IDA7IGk8bm9kZXMubGVuZ3RoOyBpKyspIHtcblxuICAgICAgLy8gY2FsY3VsYXRlIHRoZSBkaXN0YW5jZSBmcm9tIG1vdXNlIHRvIHRoaXMgbm9kZSB1c2luZyBweXRoYWdvcmVhbiB0aGVvcmVtXG4gIFx0XHR2YXIgZGlzdGFuY2UgPSBNYXRoLnNxcnQoICBNYXRoLnBvdyggKG5vZGVzW2ldLnggLSB4KSwgMikgKyBNYXRoLnBvdygobm9kZXNbaV0ueSAtIHkpLCAyKSApO1xuXG4gICAgICAvLyBpZiB0aGlzIGRpc3RhbmNlIGlzIGxlc3MgdGhhbiB0aGUgcHJldmlvdXMgc2hvcnRlc3QgZGlzdGFuY2UsIHVzZSB0aGlzIGluZGV4XG4gIFx0XHRpZiAoZGlzdGFuY2UgPCBuZWFyZXN0RGlzdCkge1xuICBcdFx0XHRuZWFyZXN0RGlzdCA9IGRpc3RhbmNlO1xuICBcdFx0XHRuZWFyZXN0SW5kZXggPSBpO1xuICBcdFx0XHRiZWZvcmUgPSB4ID4gbm9kZXNbaV0ueDtcbiAgXHRcdH1cblxuICBcdH1cblxuICAgIC8vIGlmIG5vdCB2ZXJ5IGNsb3NlIHRvIGFueSBub2RlLCBjcmVhdGUgYSBub2RlXG4gIFx0aWYgKCF0aGlzLnNldHRpbmdzLm5vTmV3UG9pbnRzICYmIG5lYXJlc3REaXN0PjAuMDcpIHtcblxuICAgICAgbmVhcmVzdEluZGV4ID0gdGhpcy5nZXRJbmRleEZyb21YKHRoaXMubW91c2UueC90aGlzLndpZHRoKTtcblxuICBcdFx0dGhpcy5ub2Rlcy5zcGxpY2UobmVhcmVzdEluZGV4LDAsIG5ldyBQb2ludCh7XG4gIFx0XHRcdHg6IHRoaXMubW91c2UueC90aGlzLndpZHRoLFxuICBcdFx0XHR5OiAxLXRoaXMubW91c2UueS90aGlzLmhlaWdodFxuICBcdFx0fSwgdGhpcykpO1xuICAgICAgdGhpcy5oYXNNb3ZlZCA9IHRydWU7XG5cbiAgXHR9XG5cbiAgXHRyZXR1cm4gbmVhcmVzdEluZGV4O1xuICB9XG5cbiAgZ2V0SW5kZXhGcm9tWCh4KSB7XG4gICAgbGV0IGluZGV4ID0gMDtcbiAgICB0aGlzLm5vZGVzLmZvckVhY2goKG5vZGUsaSkgPT4ge1xuICAgICAgaWYgKHRoaXMubm9kZXNbaV0ueCA8PSB4KSB7XG4gICAgICAgIGluZGV4ID0gaSsxO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBpbmRleDtcbiAgfVxuXG4gIHNjYWxlTm9kZShpKSB7XG5cbiAgXHRsZXQgY2xpcHBlZFggPSBtYXRoLmNsaXAodGhpcy5ub2Rlc1tpXS54LCAwLCAxKTtcbiAgXHRsZXQgY2xpcHBlZFkgPSBtYXRoLmNsaXAodGhpcy5ub2Rlc1tpXS55LCAwLCAxKTtcblxuICAgIHRoaXMubm9kZXNbaV0ubW92ZSggY2xpcHBlZFgsIGNsaXBwZWRZICk7XG5cbiAgfVxuXG4gIC8qKlxuICBTb3J0IHRoZSB0aGlzLnBvaW50cyBhcnJheSBmcm9tIGxlZnQtbW9zdCBwb2ludCB0byByaWdodC1tb3N0IHBvaW50LiBZb3Ugc2hvdWxkIG5vdCByZWd1bGFybHkgbmVlZCB0byB1c2UgdGhpcywgaG93ZXZlciBpdCBtYXkgYmUgdXNlZnVsIGlmIHRoZSBwb2ludHMgZ2V0IHVub3JkZXJlZC5cbiAgKi9cbiAgc29ydFBvaW50cygpIHtcbiAgICB0aGlzLm5vZGVzLnNvcnQoZnVuY3Rpb24oYSwgYil7XG4gICAgICByZXR1cm4gYS54ID4gYi54O1xuICAgIH0pO1xuICB9XG5cblxuICAvKipcbiAgQWRkIGEgYnJlYWtwb2ludCBvbiB0aGUgZW52ZWxvcGUuXG4gIEBwYXJhbSB4IHtudW1iZXJ9IHggbG9jYXRpb24gb2YgdGhlIHBvaW50LCBub3JtYWxpemVkICgwLTEpXG4gIEBwYXJhbSB5IHtudW1iZXJ9IHkgbG9jYXRpb24gb2YgdGhlIHBvaW50LCBub3JtYWxpemVkICgwLTEpXG4gICovXG4gIGFkZFBvaW50KHgseSkge1xuICAgIGxldCBpbmRleCA9IHRoaXMubm9kZXMubGVuZ3RoO1xuXG4gICAgdGhpcy5zb3J0UG9pbnRzKCk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaTx0aGlzLm5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoeCA8IHRoaXMubm9kZXNbaV0ueCkge1xuICAgICAgICBpbmRleCA9IGk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICBcdH1cblxuICAgIHRoaXMubm9kZXMuc3BsaWNlKGluZGV4LCAwLCBuZXcgUG9pbnQoe1xuICAgICAgeDogeCxcbiAgICAgIHk6IHlcbiAgICB9LCB0aGlzKSk7XG5cbiAgICB0aGlzLnNjYWxlTm9kZShpbmRleCk7XG5cbiAgICB0aGlzLmNhbGN1bGF0ZVBvaW50cygpO1xuICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx0aGlzLnBvaW50cyk7XG5cbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cblxuICAvKipcbiAgRmluZCB0aGUgbGV2ZWwgYXQgYSBjZXJ0YWluIHggbG9jYXRpb24gb24gdGhlIGVudmVsb3BlLlxuICBAcGFyYW0geCB7bnVtYmVyfSBUaGUgeCBsb2NhdGlvbiB0byBmaW5kIHRoZSBsZXZlbCBvZiwgbm9ybWFsaXplZCAwLTFcbiAgKi9cbiAgc2Nhbih4KSB7XG4gICAgLy8gZmluZCBzdXJyb3VuZGluZyBwb2ludHNcbiAgICBsZXQgbmV4dEluZGV4ID0gdGhpcy5nZXRJbmRleEZyb21YKHgpO1xuICAgIGxldCBwcmlvckluZGV4ID0gbmV4dEluZGV4LTE7XG4gICAgaWYgKHByaW9ySW5kZXggPCAwKSB7XG4gICAgICBwcmlvckluZGV4ID0gMDtcbiAgICB9XG4gICAgaWYgKG5leHRJbmRleCA+PSB0aGlzLm5vZGVzLmxlbmd0aCkge1xuICAgICAgbmV4dEluZGV4ID0gdGhpcy5ub2Rlcy5sZW5ndGgtMTtcbiAgICB9XG4gICAgbGV0IHByaW9yUG9pbnQgPSB0aGlzLm5vZGVzW3ByaW9ySW5kZXhdO1xuICAgIGxldCBuZXh0UG9pbnQgPSB0aGlzLm5vZGVzW25leHRJbmRleF07XG4gICAgbGV0IGxvYyA9IG1hdGguc2NhbGUoeCxwcmlvclBvaW50LngsIG5leHRQb2ludC54LCAwLCAxKTtcbiAgICBsZXQgdmFsdWUgPSBtYXRoLmludGVycChsb2MscHJpb3JQb2ludC55LG5leHRQb2ludC55KTtcbiAgICB0aGlzLmVtaXQoJ3NjYW4nLHZhbHVlKTtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuXG4gIC8qKlxuICBNb3ZlIGEgYnJlYWtwb2ludCBvbiB0aGUgZW52ZWxvcGUuXG4gIEBwYXJhbSBpbmRleCB7bnVtYmVyfSBUaGUgaW5kZXggb2YgdGhlIGJyZWFrcG9pbnQgdG8gbW92ZVxuICBAcGFyYW0geCB7bnVtYmVyfSBOZXcgeCBsb2NhdGlvbiwgbm9ybWFsaXplZCAwLTFcbiAgQHBhcmFtIHkge251bWJlcn0gTmV3IHkgbG9jYXRpb24sIG5vcm1hbGl6ZWQgMC0xXG4gICovXG4gIG1vdmVQb2ludChpbmRleCx4LHkpIHtcbiAgICB0aGlzLm5vZGVzW2luZGV4XS5tb3ZlKHgseSk7XG4gICAgdGhpcy5zY2FsZU5vZGUoaW5kZXgpO1xuICAgIHRoaXMuY2FsY3VsYXRlUG9pbnRzKCk7XG4gICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHRoaXMucG9pbnRzKTtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cblxuICAvKipcbiAgTW92ZSBhIGJyZWFrcG9pbnQgb24gdGhlIGVudmVsb3BlIGJ5IGEgY2VydGFpbiBhbW91bnQuXG4gIEBwYXJhbSBpbmRleCB7bnVtYmVyfSBUaGUgaW5kZXggb2YgdGhlIGJyZWFrcG9pbnQgdG8gbW92ZVxuICBAcGFyYW0geE9mZnNldCB7bnVtYmVyfSBYIGRpc3BsYWNlbWVudCwgbm9ybWFsaXplZCAwLTFcbiAgQHBhcmFtIHlPZmZzZXQge251bWJlcn0gWSBkaXNwbGFjZW1lbnQsIG5vcm1hbGl6ZWQgMC0xXG4gICovXG4gIGFkanVzdFBvaW50KGluZGV4LHhPZmZzZXQseU9mZnNldCkge1xuICAgIHRoaXMubm9kZXNbaW5kZXhdLm1vdmUodGhpcy5ub2Rlc1tpbmRleF0ueCt4T2Zmc2V0LHRoaXMubm9kZXNbaW5kZXhdLnkreU9mZnNldCk7XG4gICAgdGhpcy5zY2FsZU5vZGUoaW5kZXgpO1xuICAgIHRoaXMuY2FsY3VsYXRlUG9pbnRzKCk7XG4gICAgdGhpcy5lbWl0KCdjaGFuZ2UnLHRoaXMucG9pbnRzKTtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cblxuICAvKipcbiAgUmVtb3ZlIGEgYnJlYWtwb2ludCBmcm9tIHRoZSBlbnZlbG9wZS5cbiAgQHBhcmFtIGluZGV4IHtudW1iZXJ9IEluZGV4IG9mIHRoZSBicmVha3BvaW50IHRvIHJlbW92ZVxuICAqL1xuICBkZXN0cm95UG9pbnQoaW5kZXgpIHtcbiAgICB0aGlzLm5vZGVzW2luZGV4XS5kZXN0cm95KCk7XG4gICAgdGhpcy5jYWxjdWxhdGVQb2ludHMoKTtcbiAgICB0aGlzLmVtaXQoJ2NoYW5nZScsdGhpcy5wb2ludHMpO1xuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuXG4gIC8qKlxuICBSZW1vdmUgYWxsIGV4aXN0aW5nIGJyZWFrcG9pbnRzIGFuZCBhZGQgYW4gZW50aXJlbHkgbmV3IHNldCBvZiBicmVha3BvaW50cy5cbiAgQHBhcmFtIGFsbFBvaW50cyB7YXJyYXl9IEFuIGFycmF5IG9mIG9iamVjdHMgd2l0aCB4L3kgcHJvcGVydGllcyAobm9ybWFsaXplZCAwLTEpLiBFYWNoIG9iamVjdCBpbiB0aGUgYXJyYXkgc3BlY2lmaWNlcyB0aGUgeC95IGxvY2F0aW9uIG9mIGEgbmV3IGJyZWFrcG9pbnQgdG8gYmUgYWRkZWQuXG4gICovXG4gIHNldFBvaW50cyhhbGxQb2ludHMpIHtcbiAgICB3aGlsZSAodGhpcy5ub2Rlcy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubm9kZXNbMF0uZGVzdHJveSgpO1xuICAgIH1cbiAgICBhbGxQb2ludHMuZm9yRWFjaCgocG9pbnQpID0+IHtcbiAgICAgIHRoaXMuYWRkUG9pbnQocG9pbnQueCxwb2ludC55KTtcbiAgICB9KTtcbiAgICB0aGlzLmNhbGN1bGF0ZVBvaW50cygpO1xuICAgIHRoaXMuZW1pdCgnY2hhbmdlJyx0aGlzLnBvaW50cyk7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2pzaGludC1sb2FkZXIhLi9saWIvaW50ZXJmYWNlcy9lbnZlbG9wZS5qcyIsIid1c2Ugc3RyaWN0JztcblxubGV0IGRvbSA9IHJlcXVpcmUoJy4uL3V0aWwvZG9tJyk7XG5sZXQgSW50ZXJmYWNlID0gcmVxdWlyZSgnLi4vY29yZS9pbnRlcmZhY2UnKTtcblxuLyoqXG4gKiBTcGVjdHJvZ3JhbVxuICpcbiAqIEBkZXNjcmlwdGlvbiBBdWRpbyBzcGVjdHJ1bSB2aXN1YWxpemF0aW9uXG4gKlxuICogQGRlbW8gPHNwYW4gbmV4dXMtdWk9XCJzcGVjdHJvZ3JhbVwiPjwvc3Bhbj5cbiAqXG4gKiBAZXhhbXBsZVxuICogdmFyIHNwZWN0cm9ncmFtID0gbmV3IE5leHVzLlNwZWN0cm9ncmFtKCcjdGFyZ2V0JylcbiAqIHNwZWN0cm9ncmFtLmNvbm5lY3QobXlXZWJBdWRpb05vZGUpXG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciBzcGVjdHJvZ3JhbSA9IG5ldyBOZXh1cy5TcGVjdHJvZ3JhbSgnI3RhcmdldCcse1xuICogICAnc2l6ZSc6IFszMDAsMTUwXVxuICogfSlcbiAqIHNwZWN0cm9ncmFtLmNvbm5lY3QobXlXZWJBdWRpb05vZGUpXG4gKlxuICogQG91dHB1dFxuICogJm5ic3A7XG4gKiBObyBldmVudHNcbiAqXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3BlY3Ryb2dyYW0gZXh0ZW5kcyBJbnRlcmZhY2Uge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBsZXQgb3B0aW9ucyA9IFtdO1xuXG4gICAgbGV0IGRlZmF1bHRzID0ge1xuICAgICAgc2l6ZTogWzMwMCwgMTUwXVxuICAgIH07XG5cbiAgICBzdXBlcihhcmd1bWVudHMsIG9wdGlvbnMsIGRlZmF1bHRzKTtcblxuICAgIHRoaXMuYW5hbHlzZXIgPSBudWxsO1xuICAgIHRoaXMuYnVmZmVyTGVuZ3RoID0gMDtcbiAgICB0aGlzLmRhdGFBcnJheSA9IG51bGw7XG4gICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcbiAgICB0aGlzLnNvdXJjZSA9IG51bGw7XG5cbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG4gIGJ1aWxkRnJhbWUoKSB7XG4gICAgdGhpcy5jYW52YXMgPSBuZXcgZG9tLlNtYXJ0Q2FudmFzKHRoaXMucGFyZW50KTtcbiAgICB0aGlzLmVsZW1lbnQgPSB0aGlzLmNhbnZhcy5lbGVtZW50O1xuICB9XG5cbiAgc2l6ZUludGVyZmFjZSgpIHtcbiAgICB0aGlzLmNhbnZhcy5yZXNpemUodGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICB9XG5cbiAgY29sb3JJbnRlcmZhY2UoKSB7XG4gICAgdGhpcy5jYW52YXMuZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSB0aGlzLmNvbG9ycy5maWxsO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGlmICh0aGlzLmFjdGl2ZSkge1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMucmVuZGVyLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmFuYWx5c2VyKSB7XG4gICAgICB0aGlzLmFuYWx5c2VyLmdldEJ5dGVGcmVxdWVuY3lEYXRhKHRoaXMuZGF0YUFycmF5KTtcbiAgICB9XG5cbiAgICB0aGlzLmNhbnZhcy5jb250ZXh0LmZpbGxTdHlsZSA9IHRoaXMuY29sb3JzLmZpbGw7XG4gICAgdGhpcy5jYW52YXMuY29udGV4dC5maWxsUmVjdChcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgdGhpcy5jYW52YXMuZWxlbWVudC53aWR0aCxcbiAgICAgIHRoaXMuY2FudmFzLmVsZW1lbnQuaGVpZ2h0XG4gICAgKTtcblxuICAgIGlmICh0aGlzLnNvdXJjZSAmJiB0aGlzLmRhdGFBcnJheSkge1xuICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLmRhdGFBcnJheSk7XG5cbiAgICAgIGxldCBiYXJXaWR0aCA9IHRoaXMuY2FudmFzLmVsZW1lbnQud2lkdGggLyB0aGlzLmJ1ZmZlckxlbmd0aDtcbiAgICAgIGxldCBiYXJIZWlnaHQ7XG4gICAgICBsZXQgeCA9IDA7XG5cbiAgICAgIGxldCBkZWZpbml0aW9uID0gdGhpcy5jYW52YXMuZWxlbWVudC53aWR0aCAvIDUwO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYnVmZmVyTGVuZ3RoOyBpID0gaSArIGRlZmluaXRpb24pIHtcbiAgICAgICAgYmFySGVpZ2h0ID0gTWF0aC5tYXguYXBwbHkoXG4gICAgICAgICAgbnVsbCxcbiAgICAgICAgICB0aGlzLmRhdGFBcnJheS5zdWJhcnJheShpLCBpICsgZGVmaW5pdGlvbilcbiAgICAgICAgKTtcbiAgICAgICAgYmFySGVpZ2h0IC89IDI1NTtcbiAgICAgICAgYmFySGVpZ2h0ICo9IHRoaXMuY2FudmFzLmVsZW1lbnQuaGVpZ2h0O1xuXG4gICAgICAgIHRoaXMuY2FudmFzLmNvbnRleHQuZmlsbFN0eWxlID0gdGhpcy5jb2xvcnMuYWNjZW50O1xuICAgICAgICB0aGlzLmNhbnZhcy5jb250ZXh0LmZpbGxSZWN0KFxuICAgICAgICAgIHgsXG4gICAgICAgICAgdGhpcy5jYW52YXMuZWxlbWVudC5oZWlnaHQgLSBiYXJIZWlnaHQsXG4gICAgICAgICAgYmFyV2lkdGggKiBkZWZpbml0aW9uLFxuICAgICAgICAgIGJhckhlaWdodFxuICAgICAgICApO1xuXG4gICAgICAgIHggKz0gYmFyV2lkdGggKiBkZWZpbml0aW9uO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICBFcXVpdmFsZW50IHRvIFwicGF0Y2hpbmcgaW5cIiBhbiBhdWRpbyBub2RlIHRvIHZpc3VhbGl6ZS5cbiAgQHBhcmFtIG5vZGUge0F1ZGlvTm9kZX0gVGhlIGF1ZGlvIG5vZGUgdG8gdmlzdWFsaXplXG4gIEBleGFtcGxlIHNwZWN0cm9ncmFtLmNvbm5lY3QoIFRvbmUuTWFzdGVyICk7XG4gICovXG4gIGNvbm5lY3Qobm9kZSkge1xuICAgIGlmICh0aGlzLnNvdXJjZSkge1xuICAgICAgdGhpcy5kaXNjb25uZWN0KCk7XG4gICAgfVxuXG4gICAgdGhpcy5hbmFseXNlciA9IG5vZGUuY29udGV4dC5jcmVhdGVBbmFseXNlcigpO1xuICAgIHRoaXMuYW5hbHlzZXIuZmZ0U2l6ZSA9IDIwNDg7XG4gICAgdGhpcy5idWZmZXJMZW5ndGggPSB0aGlzLmFuYWx5c2VyLmZyZXF1ZW5jeUJpbkNvdW50O1xuICAgIHRoaXMuZGF0YUFycmF5ID0gbmV3IFVpbnQ4QXJyYXkodGhpcy5idWZmZXJMZW5ndGgpO1xuXG4gICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xuXG4gICAgdGhpcy5zb3VyY2UgPSBub2RlO1xuICAgIHRoaXMuc291cmNlLmNvbm5lY3QodGhpcy5hbmFseXNlcik7XG5cbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgLyoqXG4gIFN0b3AgdmlzdWFsaXppbmcgdGhlIHNvdXJjZSBub2RlIGFuZCBkaXNjb25uZWN0IGl0LlxuICAqL1xuICBkaXNjb25uZWN0KCkge1xuICAgIGlmICh0aGlzLnNvdXJjZSkge1xuICAgICAgdGhpcy5zb3VyY2UuZGlzY29ubmVjdCh0aGlzLmFuYWx5c2VyKTtcbiAgICB9XG5cbiAgICB0aGlzLmFuYWx5c2VyID0gbnVsbDtcbiAgICB0aGlzLmJ1ZmZlckxlbmd0aCA9IDA7XG4gICAgdGhpcy5kYXRhQXJyYXkgPSBudWxsO1xuICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gICAgdGhpcy5zb3VyY2UgPSBudWxsO1xuICB9XG5cbiAgY2xpY2soKSB7XG4gICAgdGhpcy5hY3RpdmUgPSAhdGhpcy5hY3RpdmUgJiYgdGhpcy5zb3VyY2U7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIGN1c3RvbURlc3Ryb3koKSB7XG4gICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9qc2hpbnQtbG9hZGVyIS4vbGliL2ludGVyZmFjZXMvc3BlY3Ryb2dyYW0uanMiLCIndXNlIHN0cmljdCc7XG5cbmxldCBkb20gPSByZXF1aXJlKCcuLi91dGlsL2RvbScpO1xubGV0IG1hdGggPSByZXF1aXJlKCcuLi91dGlsL21hdGgnKTtcbmxldCBJbnRlcmZhY2UgPSByZXF1aXJlKCcuLi9jb3JlL2ludGVyZmFjZScpO1xuXG4vKipcbiAqIE1ldGVyXG4gKlxuICogQGRlc2NyaXB0aW9uIFN0ZXJlbyBkZWNpYmVsIG1ldGVyXG4gKlxuICogQGRlbW8gPHNwYW4gbmV4dXMtdWk9XCJtZXRlclwiPjwvc3Bhbj5cbiAqXG4gKiBAZXhhbXBsZVxuICogdmFyIG1ldGVyID0gbmV3IE5leHVzLk1ldGVyKCcjdGFyZ2V0JylcbiAqIG1ldGVyLmNvbm5lY3QobXlXZWJBdWRpb05vZGUpXG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciBtZXRlciA9IG5ldyBOZXh1cy5NZXRlcignI3RhcmdldCcsIHtcbiAqICAgc2l6ZTogWzc1LDc1XVxuICogfSlcbiAqIG1ldGVyLmNvbm5lY3QobXlXZWJBdWRpb05vZGUpXG4gKlxuICogQG91dHB1dFxuICogJm5ic3A7XG4gKiBObyBldmVudHNcbiAqXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWV0ZXIgZXh0ZW5kcyBJbnRlcmZhY2Uge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBsZXQgb3B0aW9ucyA9IFtdO1xuXG4gICAgbGV0IGRlZmF1bHRzID0ge1xuICAgICAgc2l6ZTogWzMwLCAxMDBdXG4gICAgfTtcblxuICAgIHN1cGVyKGFyZ3VtZW50cywgb3B0aW9ucywgZGVmYXVsdHMpO1xuXG4gICAgdGhpcy5jaGFubmVscyA9IDI7XG4gICAgdGhpcy5zcGxpdHRlciA9IG51bGw7XG4gICAgdGhpcy5hbmFseXNlcnMgPSBbXTtcbiAgICB0aGlzLmJ1ZmZlckxlbmd0aCA9IDA7XG4gICAgdGhpcy5kYXRhQXJyYXkgPSBudWxsO1xuICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gICAgdGhpcy5zb3VyY2UgPSBudWxsO1xuICAgIHRoaXMuZGIgPSAtSW5maW5pdHk7XG5cbiAgICB0aGlzLmluaXQoKTtcblxuICAgIHRoaXMubWV0ZXJXaWR0aCA9IHRoaXMuY2FudmFzLmVsZW1lbnQud2lkdGggLyB0aGlzLmNoYW5uZWxzO1xuXG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIGJ1aWxkRnJhbWUoKSB7XG4gICAgdGhpcy5jYW52YXMgPSBuZXcgZG9tLlNtYXJ0Q2FudmFzKHRoaXMucGFyZW50KTtcbiAgICB0aGlzLmVsZW1lbnQgPSB0aGlzLmNhbnZhcy5lbGVtZW50O1xuICB9XG5cbiAgc2l6ZUludGVyZmFjZSgpIHtcbiAgICB0aGlzLmNhbnZhcy5yZXNpemUodGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICB9XG5cbiAgY29sb3JJbnRlcmZhY2UoKSB7XG4gICAgdGhpcy5jYW52YXMuZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSB0aGlzLmNvbG9ycy5maWxsO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGlmICh0aGlzLmFjdGl2ZSkge1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMucmVuZGVyLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIHRoaXMuY2FudmFzLmNvbnRleHQuZmlsbFN0eWxlID0gdGhpcy5jb2xvcnMuZmlsbDtcbiAgICB0aGlzLmNhbnZhcy5jb250ZXh0LmZpbGxSZWN0KFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICB0aGlzLmNhbnZhcy5lbGVtZW50LndpZHRoLFxuICAgICAgdGhpcy5jYW52YXMuZWxlbWVudC5oZWlnaHRcbiAgICApO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmFuYWx5c2Vycy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHRoaXMuc291cmNlKSB7XG4gICAgICAgIHRoaXMuYW5hbHlzZXJzW2ldLmdldEZsb2F0VGltZURvbWFpbkRhdGEodGhpcy5kYXRhQXJyYXkpO1xuXG4gICAgICAgIGxldCBybXMgPSAwO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5kYXRhQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBybXMgKz0gdGhpcy5kYXRhQXJyYXlbaV0gKiB0aGlzLmRhdGFBcnJheVtpXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJtcyA9IE1hdGguc3FydChybXMgLyB0aGlzLmRhdGFBcnJheS5sZW5ndGgpO1xuXG4gICAgICAgIHRoaXMuZGIgPSAyMCAqIE1hdGgubG9nMTAocm1zKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5kYiA+IC0yMDAgJiYgdGhpcy5kYiAhPT0gLUluZmluaXR5KSB7XG4gICAgICAgIHRoaXMuZGIgLT0gMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZGIgPSAtSW5maW5pdHk7XG4gICAgICB9XG5cbiAgICAgIC8vY29uc29sZS5sb2coZGIpXG5cbiAgICAgIGlmICh0aGlzLmRiID4gLTcwKSB7XG4gICAgICAgIGxldCBsaW5lYXIgPSBtYXRoLm5vcm1hbGl6ZSh0aGlzLmRiLCAtNzAsIDUpO1xuICAgICAgICBsZXQgZXhwID0gbGluZWFyICogbGluZWFyO1xuICAgICAgICBsZXQgeSA9IG1hdGguc2NhbGUoZXhwLCAwLCAxLCB0aGlzLmVsZW1lbnQuaGVpZ2h0LCAwKTtcblxuICAgICAgICB0aGlzLmNhbnZhcy5jb250ZXh0LmZpbGxTdHlsZSA9IHRoaXMuY29sb3JzLmFjY2VudDtcbiAgICAgICAgdGhpcy5jYW52YXMuY29udGV4dC5maWxsUmVjdChcbiAgICAgICAgICB0aGlzLm1ldGVyV2lkdGggKiBpLFxuICAgICAgICAgIHksXG4gICAgICAgICAgdGhpcy5tZXRlcldpZHRoLFxuICAgICAgICAgIHRoaXMuY2FudmFzLmVsZW1lbnQuaGVpZ2h0IC0geVxuICAgICAgICApO1xuXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJyZW5kZXJpbmcuLi5cIilcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgRXF1aXZhbGVudCB0byBcInBhdGNoaW5nIGluXCIgYW4gYXVkaW8gbm9kZSB0byB2aXN1YWxpemUuXG4gIEBwYXJhbSBub2RlIHtBdWRpb05vZGV9IFRoZSBhdWRpbyBub2RlIHRvIHZpc3VhbGl6ZVxuICBAcGFyYW0gY2hhbm5lbHMge251bWJlcn0gKG9wdGlvbmFsKSBUaGUgbnVtYmVyIG9mIGNoYW5uZWxzIGluIHRoZSBzb3VyY2Ugbm9kZSB0byB3YXRjaC4gSWYgbm90IHNwZWNpZmllZCwgdGhlIGludGVyZmFjZSB3aWxsIGxvb2sgZm9yIGEgLmNoYW5uZWxDb3VudCBwcm9wZXJ0eSBvbiB0aGUgaW5wdXQgbm9kZS4gSWYgaXQgZG9lcyBub3QgZXhpc3QsIHRoZSBpbnRlcmZhY2Ugd2lsbCBkZWZhdWx0IHRvIDEgY2hhbm5lbC5cbiAgQGV4YW1wbGUgbWV0ZXIuY29ubmVjdCggVG9uZS5NYXN0ZXIsIDIgKTtcbiAgKi9cbiAgY29ubmVjdChub2RlLCBjaGFubmVscykge1xuICAgIGlmICh0aGlzLnNvdXJjZSkge1xuICAgICAgdGhpcy5kaXNjb25uZWN0KCk7XG4gICAgfVxuXG4gICAgdGhpcy5jaGFubmVscyA9IGNoYW5uZWxzIHx8IG5vZGUuY2hhbm5lbENvdW50IHx8IDI7XG5cbiAgICB0aGlzLnNwbGl0dGVyID0gbm9kZS5jb250ZXh0LmNyZWF0ZUNoYW5uZWxTcGxpdHRlcih0aGlzLmNoYW5uZWxzKTtcblxuICAgIHRoaXMuYW5hbHlzZXJzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNoYW5uZWxzOyBpKyspIHtcbiAgICAgIGNvbnN0IGFuYWx5c2VyID0gbm9kZS5jb250ZXh0LmNyZWF0ZUFuYWx5c2VyKCk7XG4gICAgICBhbmFseXNlci5mZnRTaXplID0gMTAyNDtcbiAgICAgIGFuYWx5c2VyLnNtb290aGluZ1RpbWVDb25zdGFudCA9IDE7XG4gICAgICB0aGlzLnNwbGl0dGVyLmNvbm5lY3QoYW5hbHlzZXIsIGkpO1xuICAgICAgdGhpcy5hbmFseXNlcnMucHVzaChhbmFseXNlcik7XG4gICAgfVxuICAgIHRoaXMuYnVmZmVyTGVuZ3RoID0gdGhpcy5hbmFseXNlcnNbMF0uZnJlcXVlbmN5QmluQ291bnQ7XG4gICAgdGhpcy5kYXRhQXJyYXkgPSBuZXcgRmxvYXQzMkFycmF5KHRoaXMuYnVmZmVyTGVuZ3RoKTtcblxuICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcblxuICAgIHRoaXMubWV0ZXJXaWR0aCA9IHRoaXMuY2FudmFzLmVsZW1lbnQud2lkdGggLyB0aGlzLmNoYW5uZWxzO1xuXG4gICAgdGhpcy5zb3VyY2UgPSBub2RlO1xuICAgIHRoaXMuc291cmNlLmNvbm5lY3QodGhpcy5zcGxpdHRlcik7XG5cbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgLyoqXG4gIFN0b3AgdmlzdWFsaXppbmcgdGhlIHNvdXJjZSBub2RlIGFuZCBkaXNjb25uZWN0IGl0LlxuICAqL1xuICBkaXNjb25uZWN0KCkge1xuICAgIGlmICh0aGlzLnNvdXJjZSkge1xuICAgICAgdGhpcy5zb3VyY2UuZGlzY29ubmVjdCh0aGlzLnNwbGl0dGVyKTtcbiAgICB9XG5cbiAgICB0aGlzLnNwbGl0dGVyID0gbnVsbDtcbiAgICB0aGlzLmFuYWx5c2VycyA9IFtdO1xuICAgIHRoaXMuYnVmZmVyTGVuZ3RoID0gMDtcbiAgICB0aGlzLmRhdGFBcnJheSA9IG51bGw7XG4gICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcbiAgICB0aGlzLnNvdXJjZSA9IG51bGw7XG4gIH1cblxuICBjbGljaygpIHtcbiAgICB0aGlzLmFjdGl2ZSA9ICF0aGlzLmFjdGl2ZSAmJiB0aGlzLnNvdXJjZTtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgY3VzdG9tRGVzdHJveSgpIHtcbiAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2pzaGludC1sb2FkZXIhLi9saWIvaW50ZXJmYWNlcy9tZXRlci5qcyIsIid1c2Ugc3RyaWN0JztcblxubGV0IGRvbSA9IHJlcXVpcmUoJy4uL3V0aWwvZG9tJyk7XG5sZXQgSW50ZXJmYWNlID0gcmVxdWlyZSgnLi4vY29yZS9pbnRlcmZhY2UnKTtcblxuLyoqXG4gKiBPc2NpbGxvc2NvcGVcbiAqXG4gKiBAZGVzY3JpcHRpb24gVmlzdWFsaXplcyBhIHdhdmVmb3JtJ3Mgc3RyZWFtIG9mIHZhbHVlcy5cbiAqXG4gKiBAZGVtbyA8c3BhbiBuZXh1cy11aT1cIm9zY2lsbG9zY29wZVwiPjwvc3Bhbj5cbiAqXG4gKiBAZXhhbXBsZVxuICogdmFyIG9zY2lsbG9zY29wZSA9IG5ldyBOZXh1cy5Pc2NpbGxvc2NvcGUoJyN0YXJnZXQnKVxuICogb3NjaWxsb3Njb3BlLmNvbm5lY3QobXlXZWJBdWRpb05vZGUpXG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciBvc2NpbGxvc2NvcGUgPSBuZXcgTmV4dXMuT3NjaWxsb3Njb3BlKCcjdGFyZ2V0Jyx7XG4gKiAgICdzaXplJzogWzMwMCwxNTBdXG4gKiB9KVxuICogb3NjaWxsb3Njb3BlLmNvbm5lY3QobXlXZWJBdWRpb05vZGUpXG4gKlxuICogQG91dHB1dFxuICogJm5ic3A7XG4gKiBObyBldmVudHNcbiAqXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3NjaWxsb3Njb3BlIGV4dGVuZHMgSW50ZXJmYWNlIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgbGV0IG9wdGlvbnMgPSBbXTtcblxuICAgIGxldCBkZWZhdWx0cyA9IHtcbiAgICAgIHNpemU6IFszMDAsIDE1MF1cbiAgICB9O1xuXG4gICAgc3VwZXIoYXJndW1lbnRzLCBvcHRpb25zLCBkZWZhdWx0cyk7XG5cbiAgICB0aGlzLmFuYWx5c2VyID0gbnVsbDtcbiAgICB0aGlzLmJ1ZmZlckxlbmd0aCA9IDA7XG4gICAgdGhpcy5kYXRhQXJyYXkgPSBudWxsO1xuXG4gICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcblxuICAgIHRoaXMuc291cmNlID0gbnVsbDtcblxuICAgIHRoaXMuaW5pdCgpO1xuXG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIGJ1aWxkRnJhbWUoKSB7XG4gICAgdGhpcy5jYW52YXMgPSBuZXcgZG9tLlNtYXJ0Q2FudmFzKHRoaXMucGFyZW50KTtcbiAgICB0aGlzLmVsZW1lbnQgPSB0aGlzLmNhbnZhcy5lbGVtZW50O1xuICB9XG5cbiAgc2l6ZUludGVyZmFjZSgpIHtcbiAgICB0aGlzLmNhbnZhcy5yZXNpemUodGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICB9XG5cbiAgY29sb3JJbnRlcmZhY2UoKSB7XG4gICAgdGhpcy5jYW52YXMuZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSB0aGlzLmNvbG9ycy5maWxsO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGlmICh0aGlzLmFjdGl2ZSkge1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMucmVuZGVyLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmFuYWx5c2VyKSB7XG4gICAgICB0aGlzLmFuYWx5c2VyLmdldEJ5dGVUaW1lRG9tYWluRGF0YSh0aGlzLmRhdGFBcnJheSk7XG4gICAgfVxuXG4gICAgdGhpcy5jYW52YXMuY29udGV4dC5maWxsU3R5bGUgPSB0aGlzLmNvbG9ycy5maWxsO1xuICAgIHRoaXMuY2FudmFzLmNvbnRleHQuZmlsbFJlY3QoXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIHRoaXMuY2FudmFzLmVsZW1lbnQud2lkdGgsXG4gICAgICB0aGlzLmNhbnZhcy5lbGVtZW50LmhlaWdodFxuICAgICk7XG5cbiAgICB0aGlzLmNhbnZhcy5jb250ZXh0LmxpbmVXaWR0aCA9IH5+KHRoaXMuaGVpZ2h0IC8gMTAwICsgMik7XG4gICAgdGhpcy5jYW52YXMuY29udGV4dC5zdHJva2VTdHlsZSA9IHRoaXMuY29sb3JzLmFjY2VudDtcblxuICAgIHRoaXMuY2FudmFzLmNvbnRleHQuYmVnaW5QYXRoKCk7XG5cbiAgICBpZiAodGhpcy5zb3VyY2UpIHtcbiAgICAgIHZhciBzbGljZVdpZHRoID0gKHRoaXMuY2FudmFzLmVsZW1lbnQud2lkdGggKiAxLjApIC8gdGhpcy5idWZmZXJMZW5ndGg7XG4gICAgICB2YXIgeCA9IDA7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5idWZmZXJMZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgdiA9IHRoaXMuZGF0YUFycmF5W2ldIC8gMTI4LjA7XG4gICAgICAgIHZhciB5ID0gKHYgKiB0aGlzLmNhbnZhcy5lbGVtZW50LmhlaWdodCkgLyAyO1xuXG4gICAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgICAgdGhpcy5jYW52YXMuY29udGV4dC5tb3ZlVG8oeCwgeSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5jYW52YXMuY29udGV4dC5saW5lVG8oeCwgeSk7XG4gICAgICAgIH1cblxuICAgICAgICB4ICs9IHNsaWNlV2lkdGg7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY2FudmFzLmNvbnRleHQubW92ZVRvKDAsIHRoaXMuY2FudmFzLmVsZW1lbnQuaGVpZ2h0IC8gMik7XG4gICAgICB0aGlzLmNhbnZhcy5jb250ZXh0LmxpbmVUbyhcbiAgICAgICAgdGhpcy5jYW52YXMuZWxlbWVudC53aWR0aCxcbiAgICAgICAgdGhpcy5jYW52YXMuZWxlbWVudC5oZWlnaHQgLyAyXG4gICAgICApO1xuICAgIH1cblxuICAgIHRoaXMuY2FudmFzLmNvbnRleHQuc3Ryb2tlKCk7XG4gIH1cblxuICAvKipcbiAgRXF1aXZhbGVudCB0byBcInBhdGNoaW5nIGluXCIgYW4gYXVkaW8gbm9kZSB0byB2aXN1YWxpemUuXG4gIEBwYXJhbSBub2RlIHtBdWRpb05vZGV9IFRoZSBhdWRpbyBub2RlIHRvIHZpc3VhbGl6ZVxuICBAZXhhbXBsZSBvc2NpbGxvc2NvcGUuY29ubmVjdCggVG9uZS5NYXN0ZXIgKTtcbiAgKi9cblxuICBjb25uZWN0KG5vZGUpIHtcbiAgICBpZiAodGhpcy5zb3VyY2UpIHtcbiAgICAgIHRoaXMuZGlzY29ubmVjdCgpO1xuICAgIH1cblxuICAgIHRoaXMuYW5hbHlzZXIgPSBub2RlLmNvbnRleHQuY3JlYXRlQW5hbHlzZXIoKTtcbiAgICB0aGlzLmFuYWx5c2VyLmZmdFNpemUgPSAyMDQ4O1xuICAgIHRoaXMuYnVmZmVyTGVuZ3RoID0gdGhpcy5hbmFseXNlci5mcmVxdWVuY3lCaW5Db3VudDtcbiAgICB0aGlzLmRhdGFBcnJheSA9IG5ldyBVaW50OEFycmF5KHRoaXMuYnVmZmVyTGVuZ3RoKTtcbiAgICB0aGlzLmFuYWx5c2VyLmdldEJ5dGVUaW1lRG9tYWluRGF0YSh0aGlzLmRhdGFBcnJheSk7XG5cbiAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XG5cbiAgICB0aGlzLnNvdXJjZSA9IG5vZGU7XG4gICAgdGhpcy5zb3VyY2UuY29ubmVjdCh0aGlzLmFuYWx5c2VyKTtcblxuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICAvKipcbiAgU3RvcCB2aXN1YWxpemluZyB0aGUgc291cmNlIG5vZGUgYW5kIGRpc2Nvbm5lY3QgaXQuXG4gICovXG4gIGRpc2Nvbm5lY3QoKSB7XG4gICAgaWYgKHRoaXMuc291cmNlKSB7XG4gICAgICB0aGlzLnNvdXJjZS5kaXNjb25uZWN0KHRoaXMuYW5hbHlzZXIpO1xuICAgIH1cblxuICAgIHRoaXMuYW5hbHlzZXIgPSBudWxsO1xuICAgIHRoaXMuYnVmZmVyTGVuZ3RoID0gMDtcbiAgICB0aGlzLmRhdGFBcnJheSA9IG51bGw7XG4gICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcbiAgICB0aGlzLnNvdXJjZSA9IG51bGw7XG4gIH1cblxuICBjbGljaygpIHtcbiAgICB0aGlzLmFjdGl2ZSA9ICF0aGlzLmFjdGl2ZSAmJiB0aGlzLnNvdXJjZTtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgY3VzdG9tRGVzdHJveSgpIHtcbiAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2pzaGludC1sb2FkZXIhLi9saWIvaW50ZXJmYWNlcy9vc2NpbGxvc2NvcGUuanMiLCIvKlxuTWFpbiBjb25jZXB0Olxuc3ludGggPSBuZXcgTmV4dXMuUmFjaygnZWxlbWVudElEJyk7XG5cblRyYW5zZm9ybSBhbGwgZWxlbWVudHMgaW5zaWRlIHRoZSBkaXZcbnN5bnRoLmVsZW1lbnRJRCB3aWxsIGhvbGQgdGhlIGZpcnN0IHNsaWRlciBpbnRlcmZhY2VcblxuMikgSW4gZnV0dXJlLCBwb3RlbnRpYWxseSB3cml0aW5nIGEgcmFjayB0aGF0IGlzIHJlLXVzYWJsZT9cbkNvdWxkIGFsc28gdGFrZSBKU09OXG5cbm5ldyBOZXh1cy5SYWNrKCcjdGFyZ2V0Jyx7XG4gIHByZTogKCkgPT4ge1xuICAgIGNyZWF0ZSBzb21lIGRpdnMgaGVyZSwgb3Igc29tZSBhdWRpbyBjb2RlXG4gIH0sXG4gIGludGVyZmFjZToge1xuICAgIHNsaWRlcjE6IE5leHVzLmFkZC5zbGlkZXIoe1xuICAgICAgdG9wOjEwLFxuICAgICAgbGVmdDoxMCxcbiAgICAgIHdpZHRoOjUwLFxuICAgICAgaGVpZ2h0OjEwMCxcbiAgICAgIG1pbjogMCxcbiAgICAgIG1heDogMTAwLFxuICAgICAgc3RlcDogMVxuICAgIH0pLFxuICAgIHdhdmUxOiBOZXh1cy5hZGQud2F2ZWZvcm0oe1xuICAgICAgZmlsZTogJy4vcGF0aC90by9maWxlLm1wMycsXG4gICAgICB3aWR0aDo1MDAsXG4gICAgICBoZWlnaHQ6MTAwLFxuICAgICAgbW9kZTogJ3JhbmdlJ1xuICAgIH0pXG4gIH0sXG4gIGluaXQ6ICgpID0+IHtcbiAgICAvLyBzb21lIGF1ZGlvIGluaXQgY29kZSBnb2VzIGhlcmUuLi5cbiAgfVxufSk7XG5cbiovXG5cbmltcG9ydCAqIGFzIHRyYW5zZm9ybSBmcm9tICcuLi91dGlsL3RyYW5zZm9ybSc7XG5pbXBvcnQgZG9tIGZyb20gJy4uL3V0aWwvZG9tJztcblxuaW1wb3J0IHsgY29sb3JzIH0gZnJvbSAnLi4vbWFpbic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJhY2sge1xuXG4gIGNvbnN0cnVjdG9yKHRhcmdldCwgc2V0dGluZ3MpIHtcblxuICAgIHRoaXMubWV0YSA9IHt9O1xuICAgIHRoaXMubWV0YS50YXJnZXQgPSB0YXJnZXQ7XG4gICAgdGhpcy5tZXRhLnBhcmVudCA9IGRvbS5wYXJzZUVsZW1lbnQodGFyZ2V0KTsgLy8gc2hvdWxkIGJlIGEgZ2VuZXJpYyBmdW5jdGlvbiBmb3IgcGFyc2luZyBhICd0YXJnZXQnIGFyZ3VtZW50IHRoYXQgY2hlY2tzIGZvciBzdHJpbmcvRE9NL2pRVUVSWVxuICAgIHRoaXMubWV0YS5jb2xvcnMgPSB7fTtcblxuICAgIGlmIChzZXR0aW5ncykge1xuICAgICAgdGhpcy5tZXRhLmF0dHJpYnV0ZSA9IHNldHRpbmdzLmF0dHJpYnV0ZSB8fCAnbmV4dXMtdWknO1xuICAgICAgdGhpcy5tZXRhLnRpdGxlID0gc2V0dGluZ3MubmFtZSB8fCBmYWxzZTtcbiAgICAgIHRoaXMubWV0YS5vcGVuID0gc2V0dGluZ3Mub3BlbiB8fCBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tZXRhLmF0dHJpYnV0ZSA9ICduZXh1cy11aSc7XG4gICAgICB0aGlzLm1ldGEudGl0bGUgPSBmYWxzZTtcbiAgICAgIHRoaXMubWV0YS5vcGVuID0gZmFsc2U7XG4gICAgfVxuXG4gICAgbGV0IGRlZmF1bHRDb2xvcnMgPSBjb2xvcnMoKTsgLy8ganNoaW50IGlnbm9yZTpsaW5lXG4gICAgdGhpcy5tZXRhLmNvbG9ycy5hY2NlbnQgPSBkZWZhdWx0Q29sb3JzLmFjY2VudDtcbiAgICB0aGlzLm1ldGEuY29sb3JzLmZpbGwgPSBkZWZhdWx0Q29sb3JzLmZpbGw7XG4gICAgdGhpcy5tZXRhLmNvbG9ycy5saWdodCA9IGRlZmF1bHRDb2xvcnMubGlnaHQ7XG4gICAgdGhpcy5tZXRhLmNvbG9ycy5kYXJrID0gZGVmYXVsdENvbG9ycy5kYXJrO1xuICAgIHRoaXMubWV0YS5jb2xvcnMubWVkaXVtTGlnaHQgPSBkZWZhdWx0Q29sb3JzLm1lZGl1bUxpZ2h0O1xuICAgIHRoaXMubWV0YS5jb2xvcnMubWVkaXVtRGFyayA9IGRlZmF1bHRDb2xvcnMubWVkaXVtRGFyaztcbiAgICB0aGlzLmJ1aWxkSW50ZXJmYWNlKCk7XG4gICAgdGhpcy5jb2xvckludGVyZmFjZSgpO1xuICB9XG5cbiAgYnVpbGRJbnRlcmZhY2UoKSB7XG4gICAgdGhpcy5tZXRhLnBhcmVudC5zdHlsZS5ib3hTaXppbmcgPSAnYm9yZGVyLWJveCc7XG4gICAgdGhpcy5tZXRhLnBhcmVudC5zdHlsZS51c2VyU2VsZWN0ID0gJ25vbmUnO1xuICAgIHRoaXMubWV0YS5wYXJlbnQuc3R5bGUubW96VXNlclNlbGVjdCA9ICdub25lJztcbiAgICB0aGlzLm1ldGEucGFyZW50LnN0eWxlLndlYmtpdFVzZXJTZWxlY3QgPSAnbm9uZSc7XG5cbiAgICB0aGlzLm1ldGEuY29udGVudHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgIHdoaWxlICh0aGlzLm1ldGEucGFyZW50LmNoaWxkTm9kZXMubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLm1ldGEuY29udGVudHMuYXBwZW5kQ2hpbGQodGhpcy5tZXRhLnBhcmVudC5jaGlsZE5vZGVzWzBdKTtcbiAgICB9XG5cbiAgICB0aGlzLm1ldGEuY29udGVudHMuc3R5bGUucGFkZGluZyA9ICcwcHgnO1xuICAgIHRoaXMubWV0YS5jb250ZW50cy5zdHlsZS5ib3hTaXppbmcgPSAnYm9yZGVyLWJveCc7XG5cbiAgICBpZiAodGhpcy5tZXRhLnRpdGxlKSB7XG4gICAgICB0aGlzLm1ldGEudGl0bGVCYXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHRoaXMubWV0YS50aXRsZUJhci5pbm5lckhUTUwgPSB0aGlzLm1ldGEudGl0bGU7XG4gICAgICB0aGlzLm1ldGEudGl0bGVCYXIuc3R5bGUuZm9udEZhbWlseSA9ICdhcmlhbCc7XG4gICAgICB0aGlzLm1ldGEudGl0bGVCYXIuc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnO1xuICAgICAgdGhpcy5tZXRhLnRpdGxlQmFyLnN0eWxlLmNvbG9yID0gJyM4ODgnO1xuICAgICAgdGhpcy5tZXRhLnRpdGxlQmFyLnN0eWxlLnBhZGRpbmcgPSAnN3B4JztcbiAgICAgIHRoaXMubWV0YS50aXRsZUJhci5zdHlsZS5mb250U2l6ZSA9ICcxMnB4JztcblxuICAgICAgdGhpcy5tZXRhLmJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgdGhpcy5tZXRhLmJ1dHRvbi5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgICB0aGlzLm1ldGEuYnV0dG9uLnN0eWxlLnRvcCA9ICc1cHgnIDtcbiAgICAgIHRoaXMubWV0YS5idXR0b24uc3R5bGUucmlnaHQgPSAnNXB4JyA7XG4gICAgICB0aGlzLm1ldGEuYnV0dG9uLmlubmVySFRNTCA9ICctJztcbiAgICAgIHRoaXMubWV0YS5idXR0b24uc3R5bGUucGFkZGluZyA9ICcwcHggNXB4IDJweCc7XG4gICAgICB0aGlzLm1ldGEuYnV0dG9uLnN0eWxlLmxpbmVIZWlnaHQgPSAnMTJweCc7XG4gICAgICB0aGlzLm1ldGEuYnV0dG9uLnN0eWxlLmZvbnRTaXplID0gJzE1cHgnO1xuXG4gICAgICB0aGlzLm1ldGEuYnV0dG9uLnN0eWxlLmN1cnNvciA9ICdwb2ludGVyJztcblxuICAgICAgdGhpcy5tZXRhLmJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCAoKSA9PiB7XG4gICAgICAgIHRoaXMubWV0YS5idXR0b24uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gdGhpcy5tZXRhLmNvbG9ycy5tZWRpdW1EYXJrO1xuICAgICAgfSk7XG4gICAgICB0aGlzLm1ldGEuYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoKSA9PiB7XG4gICAgICAgIHRoaXMubWV0YS5idXR0b24uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gdGhpcy5tZXRhLmNvbG9ycy5tZWRpdW1MaWdodDtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5tZXRhLmJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMubWV0YS5vcGVuKSB7XG4gICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG5cbiAgICAgIHRoaXMubWV0YS50aXRsZUJhci5hcHBlbmRDaGlsZCh0aGlzLm1ldGEuYnV0dG9uKTtcblxuICAgICAgdGhpcy5tZXRhLnBhcmVudC5hcHBlbmRDaGlsZCh0aGlzLm1ldGEudGl0bGVCYXIpO1xuICAgIH1cbiAgICB0aGlzLm1ldGEucGFyZW50LmFwcGVuZENoaWxkKHRoaXMubWV0YS5jb250ZW50cyk7XG5cbiAgLy8gIHZhciB3aWR0aCA9IHRoaXMubWV0YS5wYXJlbnQuc3R5bGUud2lkdGggPSBnZXRDb21wdXRlZFN0eWxlKHRoaXMubWV0YS5wYXJlbnQpLmdldFByb3BlcnR5VmFsdWUoJ3dpZHRoJyk7XG4vLyAgICB0aGlzLm1ldGEucGFyZW50LnN0eWxlLndpZHRoID0gd2lkdGg7XG5cbiAgICBsZXQgdWkgPSB0cmFuc2Zvcm0uc2VjdGlvbih0aGlzLm1ldGEudGFyZ2V0LCB0aGlzLm1ldGEuYXR0cmlidXRlKTtcbiAgICBmb3IgKHZhciBrZXkgaW4gdWkpIHtcbiAgICAgIHRoaXNba2V5XSA9IHVpW2tleV07XG4gICAgfVxuICB9XG5cbiAgY29sb3JJbnRlcmZhY2UoKSB7XG4gICAgaWYgKHRoaXMubWV0YS50aXRsZSkge1xuICAgICAgdGhpcy5tZXRhLmJ1dHRvbi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSB0aGlzLm1ldGEuY29sb3JzLm1lZGl1bUxpZ2h0O1xuICAgICAgdGhpcy5tZXRhLmJ1dHRvbi5zdHlsZS5ib3JkZXIgPSAnc29saWQgMHB4ICcrdGhpcy5tZXRhLmNvbG9ycy5maWxsO1xuICAgICAgdGhpcy5tZXRhLnBhcmVudC5zdHlsZS5ib3JkZXIgPSAnc29saWQgMXB4ICcrdGhpcy5tZXRhLmNvbG9ycy5tZWRpdW1MaWdodDtcbiAgICAgIHRoaXMubWV0YS5wYXJlbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gdGhpcy5tZXRhLmNvbG9ycy5saWdodDtcbiAgICAgIHRoaXMubWV0YS50aXRsZUJhci5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSB0aGlzLm1ldGEuY29sb3JzLmZpbGw7XG4gICAgfVxuICB9XG5cbiAgc2hvdygpIHtcbiAgICB0aGlzLm1ldGEuY29udGVudHMuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgdGhpcy5tZXRhLm9wZW4gPSB0cnVlO1xuICB9XG5cbiAgaGlkZSgpIHtcbiAgICB0aGlzLm1ldGEuY29udGVudHMuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB0aGlzLm1ldGEub3BlbiA9IGZhbHNlO1xuICB9XG5cbiAgY29sb3JpemUodHlwZSxjb2xvcikge1xuICAgIGZvciAodmFyIGtleSBpbiB0aGlzKSB7XG4gICAgICBpZiAodGhpc1trZXldLmNvbG9yaXplKSB7XG4gICAgICAgIHRoaXNba2V5XS5jb2xvcml6ZSh0eXBlLGNvbG9yKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5tZXRhLmNvbG9yc1t0eXBlXSA9IGNvbG9yO1xuICAgIHRoaXMuY29sb3JJbnRlcmZhY2UoKTtcbiAgfVxuXG4gIGVtcHR5KCkge1xuICAgIGZvciAodmFyIGtleSBpbiB0aGlzKSB7XG4gICAgICBpZiAodGhpc1trZXldLmRlc3Ryb3kpIHtcbiAgICAgICAgdGhpc1trZXldLmRlc3Ryb3koKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9qc2hpbnQtbG9hZGVyIS4vbGliL2NvcmUvcmFjay5qcyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IGRvbSBmcm9tICcuLi91dGlsL2RvbSc7XG5pbXBvcnQgSW50ZXJmYWNlcyBmcm9tICcuLi9pbnRlcmZhY2VzLyc7XG5cbmxldCBjcmVhdGVJbnRlcmZhY2VJRCA9ICh3aWRnZXQsaW50ZXJmYWNlSURzKSA9PiB7XG4gIGxldCB0eXBlID0gd2lkZ2V0LnR5cGU7XG4gIGlmIChpbnRlcmZhY2VJRHNbdHlwZV0pIHtcbiAgICBpbnRlcmZhY2VJRHNbdHlwZV0rKztcbiAgfSBlbHNlIHtcbiAgICBpbnRlcmZhY2VJRHNbdHlwZV0gPSAxO1xuICB9XG4gIHJldHVybiAoIHR5cGUgKyBpbnRlcmZhY2VJRHNbdHlwZV0gKTtcbn07XG5cbmxldCBlbGVtZW50ID0gKGVsZW1lbnQsdHlwZSxvcHRpb25zKSA9PiB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGVsZW1lbnQuYXR0cmlidXRlcy5sZW5ndGg7IGkrKyl7XG4gICAgbGV0IGF0dCA9IGVsZW1lbnQuYXR0cmlidXRlc1tpXTtcbiAgLy8gIHRyeSB7XG4gIC8vICAgIG9wdGlvbnNbYXR0Lm5vZGVOYW1lXSA9IGV2YWwoYXR0Lm5vZGVWYWx1ZSk7XG4gIC8vICB9IGNhdGNoKGUpIHtcbiAgICAgIG9wdGlvbnNbYXR0Lm5vZGVOYW1lXSA9IGF0dC5ub2RlVmFsdWU7XG4gIC8vICB9XG4gIH1cbiAgdHlwZSA9IHR5cGVbMF0udG9VcHBlckNhc2UoKSArIHR5cGUuc2xpY2UoMSk7XG4gIGxldCB3aWRnZXQgPSBuZXcgSW50ZXJmYWNlc1t0eXBlXShlbGVtZW50LG9wdGlvbnMpO1xuICB3aWRnZXQuaWQgPSBlbGVtZW50LmlkO1xuICByZXR1cm4gd2lkZ2V0O1xufTtcblxuXG5sZXQgc2VjdGlvbiA9IChwYXJlbnQsa2V5d29yZCkgPT4ge1xuXG4gIGtleXdvcmQgPSBrZXl3b3JkIHx8ICduZXh1cy11aSc7XG5cbiAgbGV0IGludGVyZmFjZUlEcyA9IHt9O1xuXG4gIGxldCBjb250YWluZXIgPSBkb20ucGFyc2VFbGVtZW50KHBhcmVudCk7XG5cbiAgbGV0IHVpID0ge307XG5cbiAgbGV0IGh0bWxFbGVtZW50cyA9IGNvbnRhaW5lci5nZXRFbGVtZW50c0J5VGFnTmFtZSgnKicpO1xuICBsZXQgZWxlbWVudHMgPSBbXTtcbiAgZm9yIChsZXQgaT0wOyBpPGh0bWxFbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIGVsZW1lbnRzLnB1c2goaHRtbEVsZW1lbnRzW2ldKTtcbiAgfVxuICBmb3IgKGxldCBpPTA7aTxlbGVtZW50cy5sZW5ndGg7aSsrKSB7XG4gICAgbGV0IHR5cGUgPSBlbGVtZW50c1tpXS5nZXRBdHRyaWJ1dGUoa2V5d29yZCk7XG4gICAgaWYgKHR5cGUpIHtcbiAgICAgIGxldCBmb3JtYXR0ZWRUeXBlID0gZmFsc2U7XG4gICAgICBmb3IgKGxldCBrZXkgaW4gSW50ZXJmYWNlcykge1xuICAgICAgICBpZiAodHlwZS50b0xvd2VyQ2FzZSgpPT09a2V5LnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgICBmb3JtYXR0ZWRUeXBlID0ga2V5O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjb25zb2xlLmxvZyhmb3JtYXR0ZWRUeXBlKTtcbiAgICAgIGxldCB3aWRnZXQgPSBlbGVtZW50KGVsZW1lbnRzW2ldLGZvcm1hdHRlZFR5cGUpO1xuICAgICAgaWYgKHdpZGdldC5pZCkge1xuICAgICAgICB1aVt3aWRnZXQuaWRdID0gd2lkZ2V0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IGlkID0gY3JlYXRlSW50ZXJmYWNlSUQod2lkZ2V0LGludGVyZmFjZUlEcyk7XG4gICAgICAgIHVpW2lkXSA9IHdpZGdldDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdWk7XG5cbn07XG5cbmxldCBhZGQgPSAodHlwZSxwYXJlbnQsb3B0aW9ucykgPT4ge1xuICBsZXQgdGFyZ2V0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBpZiAocGFyZW50KSB7XG4gICAgcGFyZW50ID0gZG9tLnBhcnNlRWxlbWVudChwYXJlbnQpO1xuICB9IGVsc2Uge1xuICAgIHBhcmVudCA9IGRvY3VtZW50LmJvZHk7XG4gIH1cbiAgcGFyZW50LmFwcGVuZENoaWxkKHRhcmdldCk7XG4gIG9wdGlvbnMudGFyZ2V0ID0gdGFyZ2V0O1xuICBpZiAob3B0aW9ucy5zaXplKSB7XG4gICAgdGFyZ2V0LnN0eWxlLndpZHRoID0gb3B0aW9ucy5zaXplWzBdICsgJ3B4JztcbiAgICB0YXJnZXQuc3R5bGUuaGVpZ2h0ID0gb3B0aW9ucy5zaXplWzFdICsgJ3B4JztcbiAgfVxuICByZXR1cm4gZWxlbWVudCh0YXJnZXQsdHlwZSxvcHRpb25zKTtcbn07XG5cbmV4cG9ydCB7IGVsZW1lbnQgfTtcbmV4cG9ydCB7IHNlY3Rpb24gfTtcbmV4cG9ydCB7IGFkZCB9O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9qc2hpbnQtbG9hZGVyIS4vbGliL3V0aWwvdHJhbnNmb3JtLmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgbWF0aCBmcm9tICcuLi91dGlsL21hdGgnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUdW5lIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgLy8gdGhlIHNjYWxlIGFzIHJhdGlvc1xuICAgIHRoaXMuc2NhbGUgPSBbXTtcblxuICAgIC8vIGkvbyBtb2Rlc1xuICAgIHRoaXMubW9kZSA9IHtcbiAgICAgIG91dHB1dDogJ2ZyZXF1ZW5jeScsXG4gICAgICBpbnB1dDogJ3N0ZXAnXG4gICAgfTtcblxuICAgIC8vIEVUIG1ham9yXG4gICAgdGhpcy5ldG1ham9yID0gW1xuICAgICAgMjYxLjYyNTU4LFxuICAgICAgMjkzLjY2NDc2NCxcbiAgICAgIDMyOS42Mjc1NjMsXG4gICAgICAzNDkuMjI4MjQxLFxuICAgICAgMzkxLjk5NTQyMixcbiAgICAgIDQ0MCxcbiAgICAgIDQ5My44ODMzMDEsXG4gICAgICA1MjMuMjUxMTZcbiAgICBdO1xuXG4gICAgLy8gUm9vdCBmcmVxdWVuY3kuXG4gICAgdGhpcy5yb290ID0gbWF0aC5tdG9mKDYwKTsgLy8gKiBNYXRoLnBvdygyLCg2MC02OSkvMTIpO1xuXG4gICAgLy8gZGVmYXVsdCBpcyBhIG1ham9yIHNjYWxlXG4gICAgdGhpcy5jcmVhdGVTY2FsZSgwLCAyLCA0LCA1LCA3LCA5LCAxMSk7XG4gIH1cblxuICAvKiBSZXR1cm4gZGF0YSBpbiB0aGUgbW9kZSB5b3UgYXJlIGluIChmcmVxLCByYXRpbywgb3IgbWlkaSkgKi9cbiAgbm90ZShpbnB1dCwgb2N0YXZlKSB7XG4gICAgbGV0IG5ld3ZhbHVlO1xuXG4gICAgaWYgKHRoaXMubW9kZS5vdXRwdXQgPT09ICdmcmVxdWVuY3knKSB7XG4gICAgICBuZXd2YWx1ZSA9IHRoaXMuZnJlcXVlbmN5KGlucHV0LCBvY3RhdmUpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5tb2RlLm91dHB1dCA9PT0gJ3JhdGlvJykge1xuICAgICAgbmV3dmFsdWUgPSB0aGlzLnJhdGlvKGlucHV0LCBvY3RhdmUpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5tb2RlLm91dHB1dCA9PT0gJ01JREknKSB7XG4gICAgICBuZXd2YWx1ZSA9IHRoaXMuTUlESShpbnB1dCwgb2N0YXZlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbmV3dmFsdWUgPSB0aGlzLmZyZXF1ZW5jeShpbnB1dCwgb2N0YXZlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3dmFsdWU7XG4gIH1cblxuICAvKiBSZXR1cm4gZnJlcSBkYXRhICovXG4gIGZyZXF1ZW5jeShzdGVwSW4sIG9jdGF2ZUluKSB7XG4gICAgaWYgKHRoaXMubW9kZS5pbnB1dCA9PT0gJ21pZGknIHx8IHRoaXMubW9kZS5pbnB1dCA9PT0gJ01JREknKSB7XG4gICAgICB0aGlzLnN0ZXBJbiArPSA2MDtcbiAgICB9XG5cbiAgICAvLyB3aGF0IG9jdGF2ZSBpcyBvdXIgaW5wdXRcbiAgICBsZXQgb2N0YXZlID0gTWF0aC5mbG9vcihzdGVwSW4gLyB0aGlzLnNjYWxlLmxlbmd0aCk7XG5cbiAgICBpZiAob2N0YXZlSW4pIHtcbiAgICAgIG9jdGF2ZSArPSBvY3RhdmVJbjtcbiAgICB9XG5cbiAgICAvLyB3aGljaCBzY2FsZSBkZWdyZWUgKDAgLSBzY2FsZSBsZW5ndGgpIGlzIG91ciBpbnB1dFxuICAgIGxldCBzY2FsZURlZ3JlZSA9IHN0ZXBJbiAlIHRoaXMuc2NhbGUubGVuZ3RoO1xuXG4gICAgd2hpbGUgKHNjYWxlRGVncmVlIDwgMCkge1xuICAgICAgc2NhbGVEZWdyZWUgKz0gdGhpcy5zY2FsZS5sZW5ndGg7XG4gICAgfVxuXG4gICAgbGV0IHJhdGlvID0gdGhpcy5zY2FsZVtzY2FsZURlZ3JlZV07XG5cbiAgICBsZXQgZnJlcSA9IHRoaXMucm9vdCAqIHJhdGlvO1xuXG4gICAgZnJlcSA9IGZyZXEgKiBNYXRoLnBvdygyLCBvY3RhdmUpO1xuXG4gICAgLy8gdHJ1bmNhdGUgaXJyYXRpb25hbCBudW1iZXJzXG4gICAgZnJlcSA9IE1hdGguZmxvb3IoZnJlcSAqIDEwMDAwMDAwMDAwMCkgLyAxMDAwMDAwMDAwMDA7XG5cbiAgICByZXR1cm4gZnJlcTtcbiAgfVxuXG4gIC8qIEZvcmNlIHJldHVybiByYXRpbyBkYXRhICovXG5cbiAgcmF0aW8oc3RlcEluLCBvY3RhdmVJbikge1xuICAgIGlmICh0aGlzLm1vZGUuaW5wdXQgPT09ICdtaWRpJyB8fCB0aGlzLm1vZGUuaW5wdXQgPT09ICdNSURJJykge1xuICAgICAgdGhpcy5zdGVwSW4gKz0gNjA7XG4gICAgfVxuXG4gICAgLy8gd2hhdCBvY3RhdmUgaXMgb3VyIGlucHV0XG4gICAgbGV0IG9jdGF2ZSA9IE1hdGguZmxvb3Ioc3RlcEluIC8gdGhpcy5zY2FsZS5sZW5ndGgpO1xuXG4gICAgaWYgKG9jdGF2ZUluKSB7XG4gICAgICBvY3RhdmUgKz0gb2N0YXZlSW47XG4gICAgfVxuXG4gICAgLy8gd2hpY2ggc2NhbGUgZGVncmVlICgwIC0gc2NhbGUgbGVuZ3RoKSBpcyBvdXIgaW5wdXRcbiAgICBsZXQgc2NhbGVEZWdyZWUgPSBzdGVwSW4gJSB0aGlzLnNjYWxlLmxlbmd0aDtcblxuICAgIC8vIHdoYXQgcmF0aW8gaXMgb3VyIGlucHV0IHRvIG91ciBrZXlcbiAgICBsZXQgcmF0aW8gPSBNYXRoLnBvdygyLCBvY3RhdmUpICogdGhpcy5zY2FsZVtzY2FsZURlZ3JlZV07XG5cbiAgICByYXRpbyA9IE1hdGguZmxvb3IocmF0aW8gKiAxMDAwMDAwMDAwMDApIC8gMTAwMDAwMDAwMDAwO1xuXG4gICAgcmV0dXJuIHJhdGlvO1xuICB9XG5cbiAgLyogRm9yY2UgcmV0dXJuIGFkanVzdGVkIE1JREkgZGF0YSAqL1xuXG4gIE1JREkoc3RlcEluLCBvY3RhdmVJbikge1xuICAgIGxldCBuZXd2YWx1ZSA9IHRoaXMuZnJlcXVlbmN5KHN0ZXBJbiwgb2N0YXZlSW4pO1xuXG4gICAgbGV0IG4gPSA2OSArICgxMiAqIE1hdGgubG9nKG5ld3ZhbHVlIC8gNDQwKSkgLyBNYXRoLmxvZygyKTtcblxuICAgIG4gPSBNYXRoLmZsb29yKG4gKiAxMDAwMDAwMDAwKSAvIDEwMDAwMDAwMDA7XG5cbiAgICByZXR1cm4gbjtcbiAgfVxuXG4gIGNyZWF0ZVNjYWxlKCkge1xuICAgIGxldCBuZXdTY2FsZSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBuZXdTY2FsZS5wdXNoKG1hdGgubXRvZig2MCArIGFyZ3VtZW50c1tpXSkpO1xuICAgIH1cbiAgICB0aGlzLmxvYWRTY2FsZUZyb21GcmVxdWVuY2llcyhuZXdTY2FsZSk7XG4gIH1cblxuICBjcmVhdGVKSVNjYWxlKCkge1xuICAgIHRoaXMuc2NhbGUgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5zY2FsZS5wdXNoKGFyZ3VtZW50c1tpXSk7XG4gICAgfVxuICB9XG5cbiAgbG9hZFNjYWxlRnJvbUZyZXF1ZW5jaWVzKGZyZXFzKSB7XG4gICAgdGhpcy5zY2FsZSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZnJlcXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMuc2NhbGUucHVzaChmcmVxc1tpXSAvIGZyZXFzWzBdKTtcbiAgICB9XG4gIH1cblxuICAvKiBMb2FkIGEgbmV3IHNjYWxlICovXG5cbiAgbG9hZFNjYWxlKG5hbWUpIHtcbiAgICAvKiBsb2FkIHRoZSBzY2FsZSAqL1xuICAgIGxldCBmcmVxcyA9IHRoaXMuc2NhbGVzW25hbWVdLmZyZXF1ZW5jaWVzO1xuICAgIHRoaXMubG9hZFNjYWxlRnJvbUZyZXF1ZW5jaWVzKGZyZXFzKTtcbiAgfVxuXG4gIC8qIFNlYXJjaCB0aGUgbmFtZXMgb2YgdHVuaW5nc1xuICBcdCBSZXR1cm5zIGFuIGFycmF5IG9mIG5hbWVzIG9mIHR1bmluZ3MgKi9cblxuICBzZWFyY2gobGV0dGVycykge1xuICAgIGxldCBwb3NzaWJsZSA9IFtdO1xuICAgIGZvciAobGV0IGtleSBpbiB0aGlzLnNjYWxlcykge1xuICAgICAgaWYgKGtleS50b0xvd2VyQ2FzZSgpLmluZGV4T2YobGV0dGVycy50b0xvd2VyQ2FzZSgpKSAhPT0gLTEpIHtcbiAgICAgICAgcG9zc2libGUucHVzaChrZXkpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcG9zc2libGU7XG4gIH1cblxuICAvKiBSZXR1cm4gYSBjb2xsZWN0aW9uIG9mIG5vdGVzIGFzIGFuIGFycmF5ICovXG5cbiAgY2hvcmQobWlkaXMpIHtcbiAgICBsZXQgb3V0cHV0ID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtaWRpcy5sZW5ndGg7IGkrKykge1xuICAgICAgb3V0cHV0LnB1c2godGhpcy5ub3RlKG1pZGlzW2ldKSk7XG4gICAgfVxuICAgIHJldHVybiBvdXRwdXQ7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vanNoaW50LWxvYWRlciEuL2xpYi90dW5pbmcvdHVuaW5nLmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG4vL0Rpc2FibGUganNoaW50IHdhcm5pbmcgY29uY2VybmluZyB0cmFpbGluZyByZWd1bGFyIHBhcmFtc1xuLypqc2hpbnQgLVcxMzggKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmFkaW8ge1xuICAgIC8vaWYgbm9uLWV4aXN0ZW50IGJ1dHRvbnMgYXJlIHN3aXRjaGVkLCB0aGV5IGFyZSBpZ25vcmVkXG5cbiAgICBjb25zdHJ1Y3RvcihsZW5ndGggPSAzLCAuLi5vblZhbHMpIHtcbiAgICAgICAgLy9lYWNoIG9wdGlvbmFsICdvblZhbHMnIGFyZ3VtZW50IHN3aXRjaGVzIG9uIHRoYXQgdmFsdWUgaW4gdGhlIFJhZGlvIGlmIGl0IGV4aXN0c1xuICAgICAgICAvL0luIHRoZSBleGFtcGxlIGJlbG93LCBhIDMtYnV0dG9uIHJhZGlvIGlzIGNyZWF0ZWQsIGluZGV4IDAgaXMgc3dpdGNoZWQgb24sIGluZGV4IDEgaXMgc3dpdGNoZWQgb24gdGhlbiB0aGVuIGF0dGVtcHRlZCBhZ2FpbiBwcm9kdWNpbmcgYW4gd2FybmluZywgYW5kIHRoZSBmaW5hbCBhcmd1bWVudCBwcm9kdWNlcyBhIHdhcm5pbmcgYmVjYXVzZSB0aGUgaW5kZXggdmFsdWUgZG9lcyBub3QgZXhpc3QuXG4gICAgICAgIC8vRXhhbXBsZTpcbiAgICAgICAgLy9gICByYWRpbyA9IG5ldyBSYWRpbygzLCAwLCAxLCAxLCAzKTtcbiAgICAgICAgLy/igKYgIFsxLDEsMF1cblxuICAgICAgICBpZiAobGVuZ3RoIDwgMCkgeyBsZW5ndGggPSAxOyB9XG5cbiAgICAgICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XG4gICAgICAgIHRoaXMub25WYWxzID0gb25WYWxzO1xuICAgICAgICB0aGlzLmFycmF5ID0gbmV3IEFycmF5KGxlbmd0aCkuZmlsbCgwKTtcblxuICAgICAgICBpZiAob25WYWxzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMub24oLi4ub25WYWxzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNlbGVjdCh2YWx1ZSkge1xuICAgICAgICB0aGlzLmFycmF5LmZpbGwoMCk7XG4gICAgICAgIHRoaXMuYXJyYXlbdmFsdWVdID0gMTtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXJyYXk7XG4gICAgfVxuXG4gICAgZmxpcCguLi52YWx1ZXMpIHtcbiAgICAgICAgLy9mbGlwcyB0aGUgc3BlY2lmaWVkIHZhbHVlcy4gaWYgbm8gdmFsdWUgaXMgc3BlY2lmaWVkLCBmbGlwcyBhbGwgYnV0dG9uc1xuICAgICAgICBsZXQgYSA9IHRoaXMuYXJyYXk7XG4gICAgICAgIGlmICh2YWx1ZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdmFsdWVzLmZvckVhY2goZnVuY3Rpb24odikge1xuICAgICAgICAgICAgICAgIGlmICh2ID4gYS5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignV2FybmluZzogQW5vblJhZGlvWycgKyB2ICsgJ10gZG9lcyBub3QgZXhpc3QnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhW3ZdID0gKGFbdl0gPyAwIDogMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhLmZvckVhY2goZnVuY3Rpb24odiwgaSwgYXJyKSB7XG4gICAgICAgICAgICAgICAgYXJyW2ldID0gKHYgPyAwIDogMSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYTtcbiAgICB9XG5cbiAgICBvbiguLi52YWx1ZXMpIHtcbiAgICAgICAgLy9zd2l0Y2ggb24gdGhlIHNwZWNpZmllZCB2YWx1ZXMuIGlmIG5vIHZhbHVlIHNwZWNpZmllZCwgZmxpcHMgb24gYWxsIGJ1dHRvbnNcbiAgICAgICAgbGV0IGEgPSB0aGlzLmFycmF5O1xuICAgICAgICBpZiAodmFsdWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHZhbHVlcy5mb3JFYWNoKGZ1bmN0aW9uKHYpIHtcbiAgICAgICAgICAgICAgICBpZiAodiA+IGEubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ1dhcm5pbmc6IEFub25SYWRpb1snICsgdiArICddIGV4Y2VlZHMgc2l6ZSBvZiBvYmplY3QnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoYVt2XSA9PT0gMSkgeyBjb25zb2xlLndhcm4oJ1dhcm5pbmc6IEFub25SYWRpb1snICsgdiArICddIHdhcyBhbHJlYWR5IG9uLicpOyB9XG4gICAgICAgICAgICAgICAgICAgIGFbdl0gPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYS5maWxsKDEpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhO1xuICAgIH1cblxuICAgIG9mZiguLi52YWx1ZXMpIHtcbiAgICAgICAgLy9zd2l0Y2ggb2ZmIHRoZSBzcGVjaWZpZWQgdmFsdWVzLiBpZiBubyB2YWx1ZSBzcGVjaWZpZWQsIGZsaXBzIG9mZiBhbGwgYnV0dG9uc1xuICAgICAgICBsZXQgYSA9IHRoaXMuYXJyYXk7XG4gICAgICAgIGlmICh2YWx1ZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdmFsdWVzLmZvckVhY2goZnVuY3Rpb24odikge1xuICAgICAgICAgICAgICAgIGFbdl0gPSAwO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhLmZpbGwoMCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGE7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9qc2hpbnQtbG9hZGVyIS4vbGliL21vZGVscy9yYWRpby5qcyIsInZhciBXQUFDbG9jayA9IHJlcXVpcmUoJy4vbGliL1dBQUNsb2NrJylcblxubW9kdWxlLmV4cG9ydHMgPSBXQUFDbG9ja1xuaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB3aW5kb3cuV0FBQ2xvY2sgPSBXQUFDbG9ja1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3dhYWNsb2NrL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA0MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaXNCcm93c2VyID0gKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKVxuXG52YXIgQ0xPQ0tfREVGQVVMVFMgPSB7XG4gIHRvbGVyYW5jZUxhdGU6IDAuMTAsXG4gIHRvbGVyYW5jZUVhcmx5OiAwLjAwMVxufVxuXG4vLyA9PT09PT09PT09PT09PT09PT09PSBFdmVudCA9PT09PT09PT09PT09PT09PT09PSAvL1xudmFyIEV2ZW50ID0gZnVuY3Rpb24oY2xvY2ssIGRlYWRsaW5lLCBmdW5jKSB7XG4gIHRoaXMuY2xvY2sgPSBjbG9ja1xuICB0aGlzLmZ1bmMgPSBmdW5jXG4gIHRoaXMuX2NsZWFyZWQgPSBmYWxzZSAvLyBGbGFnIHVzZWQgdG8gY2xlYXIgYW4gZXZlbnQgaW5zaWRlIGNhbGxiYWNrXG5cbiAgdGhpcy50b2xlcmFuY2VMYXRlID0gY2xvY2sudG9sZXJhbmNlTGF0ZVxuICB0aGlzLnRvbGVyYW5jZUVhcmx5ID0gY2xvY2sudG9sZXJhbmNlRWFybHlcbiAgdGhpcy5fbGF0ZXN0VGltZSA9IG51bGxcbiAgdGhpcy5fZWFybGllc3RUaW1lID0gbnVsbFxuICB0aGlzLmRlYWRsaW5lID0gbnVsbFxuICB0aGlzLnJlcGVhdFRpbWUgPSBudWxsXG5cbiAgdGhpcy5zY2hlZHVsZShkZWFkbGluZSlcbn1cblxuLy8gVW5zY2hlZHVsZXMgdGhlIGV2ZW50XG5FdmVudC5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5jbG9jay5fcmVtb3ZlRXZlbnQodGhpcylcbiAgdGhpcy5fY2xlYXJlZCA9IHRydWVcbiAgcmV0dXJuIHRoaXNcbn1cblxuLy8gU2V0cyB0aGUgZXZlbnQgdG8gcmVwZWF0IGV2ZXJ5IGB0aW1lYCBzZWNvbmRzLlxuRXZlbnQucHJvdG90eXBlLnJlcGVhdCA9IGZ1bmN0aW9uKHRpbWUpIHtcbiAgaWYgKHRpbWUgPT09IDApXG4gICAgdGhyb3cgbmV3IEVycm9yKCdkZWxheSBjYW5ub3QgYmUgMCcpXG4gIHRoaXMucmVwZWF0VGltZSA9IHRpbWVcbiAgaWYgKCF0aGlzLmNsb2NrLl9oYXNFdmVudCh0aGlzKSlcbiAgICB0aGlzLnNjaGVkdWxlKHRoaXMuZGVhZGxpbmUgKyB0aGlzLnJlcGVhdFRpbWUpXG4gIHJldHVybiB0aGlzXG59XG5cbi8vIFNldHMgdGhlIHRpbWUgdG9sZXJhbmNlIG9mIHRoZSBldmVudC5cbi8vIFRoZSBldmVudCB3aWxsIGJlIGV4ZWN1dGVkIGluIHRoZSBpbnRlcnZhbCBgW2RlYWRsaW5lIC0gZWFybHksIGRlYWRsaW5lICsgbGF0ZV1gXG4vLyBJZiB0aGUgY2xvY2sgZmFpbHMgdG8gZXhlY3V0ZSB0aGUgZXZlbnQgaW4gdGltZSwgdGhlIGV2ZW50IHdpbGwgYmUgZHJvcHBlZC5cbkV2ZW50LnByb3RvdHlwZS50b2xlcmFuY2UgPSBmdW5jdGlvbih2YWx1ZXMpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZXMubGF0ZSA9PT0gJ251bWJlcicpXG4gICAgdGhpcy50b2xlcmFuY2VMYXRlID0gdmFsdWVzLmxhdGVcbiAgaWYgKHR5cGVvZiB2YWx1ZXMuZWFybHkgPT09ICdudW1iZXInKVxuICAgIHRoaXMudG9sZXJhbmNlRWFybHkgPSB2YWx1ZXMuZWFybHlcbiAgdGhpcy5fcmVmcmVzaEVhcmx5TGF0ZURhdGVzKClcbiAgaWYgKHRoaXMuY2xvY2suX2hhc0V2ZW50KHRoaXMpKSB7XG4gICAgdGhpcy5jbG9jay5fcmVtb3ZlRXZlbnQodGhpcylcbiAgICB0aGlzLmNsb2NrLl9pbnNlcnRFdmVudCh0aGlzKVxuICB9XG4gIHJldHVybiB0aGlzXG59XG5cbi8vIFJldHVybnMgdHJ1ZSBpZiB0aGUgZXZlbnQgaXMgcmVwZWF0ZWQsIGZhbHNlIG90aGVyd2lzZVxuRXZlbnQucHJvdG90eXBlLmlzUmVwZWF0ZWQgPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXMucmVwZWF0VGltZSAhPT0gbnVsbCB9XG5cbi8vIFNjaGVkdWxlcyB0aGUgZXZlbnQgdG8gYmUgcmFuIGJlZm9yZSBgZGVhZGxpbmVgLlxuLy8gSWYgdGhlIHRpbWUgaXMgd2l0aGluIHRoZSBldmVudCB0b2xlcmFuY2UsIHdlIGhhbmRsZSB0aGUgZXZlbnQgaW1tZWRpYXRlbHkuXG4vLyBJZiB0aGUgZXZlbnQgd2FzIGFscmVhZHkgc2NoZWR1bGVkIGF0IGEgZGlmZmVyZW50IHRpbWUsIGl0IGlzIHJlc2NoZWR1bGVkLlxuRXZlbnQucHJvdG90eXBlLnNjaGVkdWxlID0gZnVuY3Rpb24oZGVhZGxpbmUpIHtcbiAgdGhpcy5fY2xlYXJlZCA9IGZhbHNlXG4gIHRoaXMuZGVhZGxpbmUgPSBkZWFkbGluZVxuICB0aGlzLl9yZWZyZXNoRWFybHlMYXRlRGF0ZXMoKVxuXG4gIGlmICh0aGlzLmNsb2NrLmNvbnRleHQuY3VycmVudFRpbWUgPj0gdGhpcy5fZWFybGllc3RUaW1lKSB7XG4gICAgdGhpcy5fZXhlY3V0ZSgpXG4gIFxuICB9IGVsc2UgaWYgKHRoaXMuY2xvY2suX2hhc0V2ZW50KHRoaXMpKSB7XG4gICAgdGhpcy5jbG9jay5fcmVtb3ZlRXZlbnQodGhpcylcbiAgICB0aGlzLmNsb2NrLl9pbnNlcnRFdmVudCh0aGlzKVxuICBcbiAgfSBlbHNlIHRoaXMuY2xvY2suX2luc2VydEV2ZW50KHRoaXMpXG59XG5cbkV2ZW50LnByb3RvdHlwZS50aW1lU3RyZXRjaCA9IGZ1bmN0aW9uKHRSZWYsIHJhdGlvKSB7XG4gIGlmICh0aGlzLmlzUmVwZWF0ZWQoKSlcbiAgICB0aGlzLnJlcGVhdFRpbWUgPSB0aGlzLnJlcGVhdFRpbWUgKiByYXRpb1xuXG4gIHZhciBkZWFkbGluZSA9IHRSZWYgKyByYXRpbyAqICh0aGlzLmRlYWRsaW5lIC0gdFJlZilcbiAgLy8gSWYgdGhlIGRlYWRsaW5lIGlzIHRvbyBjbG9zZSBvciBwYXN0LCBhbmQgdGhlIGV2ZW50IGhhcyBhIHJlcGVhdCxcbiAgLy8gd2UgY2FsY3VsYXRlIHRoZSBuZXh0IHJlcGVhdCBwb3NzaWJsZSBpbiB0aGUgc3RyZXRjaGVkIHNwYWNlLlxuICBpZiAodGhpcy5pc1JlcGVhdGVkKCkpIHtcbiAgICB3aGlsZSAodGhpcy5jbG9jay5jb250ZXh0LmN1cnJlbnRUaW1lID49IGRlYWRsaW5lIC0gdGhpcy50b2xlcmFuY2VFYXJseSlcbiAgICAgIGRlYWRsaW5lICs9IHRoaXMucmVwZWF0VGltZVxuICB9XG4gIHRoaXMuc2NoZWR1bGUoZGVhZGxpbmUpXG59XG5cbi8vIEV4ZWN1dGVzIHRoZSBldmVudFxuRXZlbnQucHJvdG90eXBlLl9leGVjdXRlID0gZnVuY3Rpb24oKSB7XG4gIGlmICh0aGlzLmNsb2NrLl9zdGFydGVkID09PSBmYWxzZSkgcmV0dXJuXG4gIHRoaXMuY2xvY2suX3JlbW92ZUV2ZW50KHRoaXMpXG5cbiAgaWYgKHRoaXMuY2xvY2suY29udGV4dC5jdXJyZW50VGltZSA8IHRoaXMuX2xhdGVzdFRpbWUpXG4gICAgdGhpcy5mdW5jKHRoaXMpXG4gIGVsc2Uge1xuICAgIGlmICh0aGlzLm9uZXhwaXJlZCkgdGhpcy5vbmV4cGlyZWQodGhpcylcbiAgICBjb25zb2xlLndhcm4oJ2V2ZW50IGV4cGlyZWQnKVxuICB9XG4gIC8vIEluIHRoZSBjYXNlIGBzY2hlZHVsZWAgaXMgY2FsbGVkIGluc2lkZSBgZnVuY2AsIHdlIG5lZWQgdG8gYXZvaWRcbiAgLy8gb3ZlcnJ3cml0aW5nIHdpdGggeWV0IGFub3RoZXIgYHNjaGVkdWxlYC5cbiAgaWYgKCF0aGlzLmNsb2NrLl9oYXNFdmVudCh0aGlzKSAmJiB0aGlzLmlzUmVwZWF0ZWQoKSAmJiAhdGhpcy5fY2xlYXJlZClcbiAgICB0aGlzLnNjaGVkdWxlKHRoaXMuZGVhZGxpbmUgKyB0aGlzLnJlcGVhdFRpbWUpIFxufVxuXG4vLyBVcGRhdGVzIGNhY2hlZCB0aW1lc1xuRXZlbnQucHJvdG90eXBlLl9yZWZyZXNoRWFybHlMYXRlRGF0ZXMgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5fbGF0ZXN0VGltZSA9IHRoaXMuZGVhZGxpbmUgKyB0aGlzLnRvbGVyYW5jZUxhdGVcbiAgdGhpcy5fZWFybGllc3RUaW1lID0gdGhpcy5kZWFkbGluZSAtIHRoaXMudG9sZXJhbmNlRWFybHlcbn1cblxuLy8gPT09PT09PT09PT09PT09PT09PT0gV0FBQ2xvY2sgPT09PT09PT09PT09PT09PT09PT0gLy9cbnZhciBXQUFDbG9jayA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oY29udGV4dCwgb3B0cykge1xuICB2YXIgc2VsZiA9IHRoaXNcbiAgb3B0cyA9IG9wdHMgfHwge31cbiAgdGhpcy50aWNrTWV0aG9kID0gb3B0cy50aWNrTWV0aG9kIHx8ICdTY3JpcHRQcm9jZXNzb3JOb2RlJ1xuICB0aGlzLnRvbGVyYW5jZUVhcmx5ID0gb3B0cy50b2xlcmFuY2VFYXJseSB8fCBDTE9DS19ERUZBVUxUUy50b2xlcmFuY2VFYXJseVxuICB0aGlzLnRvbGVyYW5jZUxhdGUgPSBvcHRzLnRvbGVyYW5jZUxhdGUgfHwgQ0xPQ0tfREVGQVVMVFMudG9sZXJhbmNlTGF0ZVxuICB0aGlzLmNvbnRleHQgPSBjb250ZXh0XG4gIHRoaXMuX2V2ZW50cyA9IFtdXG4gIHRoaXMuX3N0YXJ0ZWQgPSBmYWxzZVxufVxuXG4vLyAtLS0tLS0tLS0tIFB1YmxpYyBBUEkgLS0tLS0tLS0tLSAvL1xuLy8gU2NoZWR1bGVzIGBmdW5jYCB0byBydW4gYWZ0ZXIgYGRlbGF5YCBzZWNvbmRzLlxuV0FBQ2xvY2sucHJvdG90eXBlLnNldFRpbWVvdXQgPSBmdW5jdGlvbihmdW5jLCBkZWxheSkge1xuICByZXR1cm4gdGhpcy5fY3JlYXRlRXZlbnQoZnVuYywgdGhpcy5fYWJzVGltZShkZWxheSkpXG59XG5cbi8vIFNjaGVkdWxlcyBgZnVuY2AgdG8gcnVuIGJlZm9yZSBgZGVhZGxpbmVgLlxuV0FBQ2xvY2sucHJvdG90eXBlLmNhbGxiYWNrQXRUaW1lID0gZnVuY3Rpb24oZnVuYywgZGVhZGxpbmUpIHtcbiAgcmV0dXJuIHRoaXMuX2NyZWF0ZUV2ZW50KGZ1bmMsIGRlYWRsaW5lKVxufVxuXG4vLyBTdHJldGNoZXMgYGRlYWRsaW5lYCBhbmQgYHJlcGVhdGAgb2YgYWxsIHNjaGVkdWxlZCBgZXZlbnRzYCBieSBgcmF0aW9gLCBrZWVwaW5nXG4vLyB0aGVpciByZWxhdGl2ZSBkaXN0YW5jZSB0byBgdFJlZmAuIEluIGZhY3QgdGhpcyBpcyBlcXVpdmFsZW50IHRvIGNoYW5naW5nIHRoZSB0ZW1wby5cbldBQUNsb2NrLnByb3RvdHlwZS50aW1lU3RyZXRjaCA9IGZ1bmN0aW9uKHRSZWYsIGV2ZW50cywgcmF0aW8pIHtcbiAgZXZlbnRzLmZvckVhY2goZnVuY3Rpb24oZXZlbnQpIHsgZXZlbnQudGltZVN0cmV0Y2godFJlZiwgcmF0aW8pIH0pXG4gIHJldHVybiBldmVudHNcbn1cblxuLy8gUmVtb3ZlcyBhbGwgc2NoZWR1bGVkIGV2ZW50cyBhbmQgc3RhcnRzIHRoZSBjbG9jayBcbldBQUNsb2NrLnByb3RvdHlwZS5zdGFydCA9IGZ1bmN0aW9uKCkge1xuICBpZiAodGhpcy5fc3RhcnRlZCA9PT0gZmFsc2UpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXNcbiAgICB0aGlzLl9zdGFydGVkID0gdHJ1ZVxuICAgIHRoaXMuX2V2ZW50cyA9IFtdXG5cbiAgICBpZiAodGhpcy50aWNrTWV0aG9kID09PSAnU2NyaXB0UHJvY2Vzc29yTm9kZScpIHtcbiAgICAgIHZhciBidWZmZXJTaXplID0gMjU2XG4gICAgICAvLyBXZSBoYXZlIHRvIGtlZXAgYSByZWZlcmVuY2UgdG8gdGhlIG5vZGUgdG8gYXZvaWQgZ2FyYmFnZSBjb2xsZWN0aW9uXG4gICAgICB0aGlzLl9jbG9ja05vZGUgPSB0aGlzLmNvbnRleHQuY3JlYXRlU2NyaXB0UHJvY2Vzc29yKGJ1ZmZlclNpemUsIDEsIDEpXG4gICAgICB0aGlzLl9jbG9ja05vZGUuY29ubmVjdCh0aGlzLmNvbnRleHQuZGVzdGluYXRpb24pXG4gICAgICB0aGlzLl9jbG9ja05vZGUub25hdWRpb3Byb2Nlc3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHByb2Nlc3MubmV4dFRpY2soZnVuY3Rpb24oKSB7IHNlbGYuX3RpY2soKSB9KVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy50aWNrTWV0aG9kID09PSAnbWFudWFsJykgbnVsbCAvLyBfdGljayBpcyBjYWxsZWQgbWFudWFsbHlcblxuICAgIGVsc2UgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIHRpY2tNZXRob2QgJyArIHRoaXMudGlja01ldGhvZClcbiAgfVxufVxuXG4vLyBTdG9wcyB0aGUgY2xvY2tcbldBQUNsb2NrLnByb3RvdHlwZS5zdG9wID0gZnVuY3Rpb24oKSB7XG4gIGlmICh0aGlzLl9zdGFydGVkID09PSB0cnVlKSB7XG4gICAgdGhpcy5fc3RhcnRlZCA9IGZhbHNlXG4gICAgdGhpcy5fY2xvY2tOb2RlLmRpc2Nvbm5lY3QoKVxuICB9ICBcbn1cblxuLy8gLS0tLS0tLS0tLSBQcml2YXRlIC0tLS0tLS0tLS0gLy9cblxuLy8gVGhpcyBmdW5jdGlvbiBpcyByYW4gcGVyaW9kaWNhbGx5LCBhbmQgYXQgZWFjaCB0aWNrIGl0IGV4ZWN1dGVzXG4vLyBldmVudHMgZm9yIHdoaWNoIGBjdXJyZW50VGltZWAgaXMgaW5jbHVkZWQgaW4gdGhlaXIgdG9sZXJhbmNlIGludGVydmFsLlxuV0FBQ2xvY2sucHJvdG90eXBlLl90aWNrID0gZnVuY3Rpb24oKSB7XG4gIHZhciBldmVudCA9IHRoaXMuX2V2ZW50cy5zaGlmdCgpXG5cbiAgd2hpbGUoZXZlbnQgJiYgZXZlbnQuX2VhcmxpZXN0VGltZSA8PSB0aGlzLmNvbnRleHQuY3VycmVudFRpbWUpIHtcbiAgICBldmVudC5fZXhlY3V0ZSgpXG4gICAgZXZlbnQgPSB0aGlzLl9ldmVudHMuc2hpZnQoKVxuICB9XG5cbiAgLy8gUHV0IGJhY2sgdGhlIGxhc3QgZXZlbnRcbiAgaWYoZXZlbnQpIHRoaXMuX2V2ZW50cy51bnNoaWZ0KGV2ZW50KVxufVxuXG4vLyBDcmVhdGVzIGFuIGV2ZW50IGFuZCBpbnNlcnQgaXQgdG8gdGhlIGxpc3RcbldBQUNsb2NrLnByb3RvdHlwZS5fY3JlYXRlRXZlbnQgPSBmdW5jdGlvbihmdW5jLCBkZWFkbGluZSkge1xuICByZXR1cm4gbmV3IEV2ZW50KHRoaXMsIGRlYWRsaW5lLCBmdW5jKVxufVxuXG4vLyBJbnNlcnRzIGFuIGV2ZW50IHRvIHRoZSBsaXN0XG5XQUFDbG9jay5wcm90b3R5cGUuX2luc2VydEV2ZW50ID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgdGhpcy5fZXZlbnRzLnNwbGljZSh0aGlzLl9pbmRleEJ5VGltZShldmVudC5fZWFybGllc3RUaW1lKSwgMCwgZXZlbnQpXG59XG5cbi8vIFJlbW92ZXMgYW4gZXZlbnQgZnJvbSB0aGUgbGlzdFxuV0FBQ2xvY2sucHJvdG90eXBlLl9yZW1vdmVFdmVudCA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gIHZhciBpbmQgPSB0aGlzLl9ldmVudHMuaW5kZXhPZihldmVudClcbiAgaWYgKGluZCAhPT0gLTEpIHRoaXMuX2V2ZW50cy5zcGxpY2UoaW5kLCAxKVxufVxuXG4vLyBSZXR1cm5zIHRydWUgaWYgYGV2ZW50YCBpcyBpbiBxdWV1ZSwgZmFsc2Ugb3RoZXJ3aXNlXG5XQUFDbG9jay5wcm90b3R5cGUuX2hhc0V2ZW50ID0gZnVuY3Rpb24oZXZlbnQpIHtcbiByZXR1cm4gdGhpcy5fZXZlbnRzLmluZGV4T2YoZXZlbnQpICE9PSAtMVxufVxuXG4vLyBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgZmlyc3QgZXZlbnQgd2hvc2UgZGVhZGxpbmUgaXMgPj0gdG8gYGRlYWRsaW5lYFxuV0FBQ2xvY2sucHJvdG90eXBlLl9pbmRleEJ5VGltZSA9IGZ1bmN0aW9uKGRlYWRsaW5lKSB7XG4gIC8vIHBlcmZvcm1zIGEgYmluYXJ5IHNlYXJjaFxuICB2YXIgbG93ID0gMFxuICAgICwgaGlnaCA9IHRoaXMuX2V2ZW50cy5sZW5ndGhcbiAgICAsIG1pZFxuICB3aGlsZSAobG93IDwgaGlnaCkge1xuICAgIG1pZCA9IE1hdGguZmxvb3IoKGxvdyArIGhpZ2gpIC8gMilcbiAgICBpZiAodGhpcy5fZXZlbnRzW21pZF0uX2VhcmxpZXN0VGltZSA8IGRlYWRsaW5lKVxuICAgICAgbG93ID0gbWlkICsgMVxuICAgIGVsc2UgaGlnaCA9IG1pZFxuICB9XG4gIHJldHVybiBsb3dcbn1cblxuLy8gQ29udmVydHMgZnJvbSByZWxhdGl2ZSB0aW1lIHRvIGFic29sdXRlIHRpbWVcbldBQUNsb2NrLnByb3RvdHlwZS5fYWJzVGltZSA9IGZ1bmN0aW9uKHJlbFRpbWUpIHtcbiAgcmV0dXJuIHJlbFRpbWUgKyB0aGlzLmNvbnRleHQuY3VycmVudFRpbWVcbn1cblxuLy8gQ29udmVydHMgZnJvbSBhYnNvbHV0ZSB0aW1lIHRvIHJlbGF0aXZlIHRpbWUgXG5XQUFDbG9jay5wcm90b3R5cGUuX3JlbFRpbWUgPSBmdW5jdGlvbihhYnNUaW1lKSB7XG4gIHJldHVybiBhYnNUaW1lIC0gdGhpcy5jb250ZXh0LmN1cnJlbnRUaW1lXG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3dhYWNsb2NrL2xpYi9XQUFDbG9jay5qc1xuLy8gbW9kdWxlIGlkID0gNDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9wcm9jZXNzL2Jyb3dzZXIuanNcbi8vIG1vZHVsZSBpZCA9IDQ0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=