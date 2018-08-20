/*
	Source:
	van Creij, Maurice (2018). "spinner.js: Product spinner with innertia.", http://www.woollymittens.nl/.

	License:
	This work is licensed under a Creative Commons Attribution 3.0 Unported License.
*/

// establish the class
var Spinner = function (config) {

	this.only = function (config) {
		// start an instance of the script
		return new this.Main(config, this);
	};

	this.each = function (config) {
		var _config, _context = this, instances = [];
		// for all element
		for (var a = 0, b = config.elements.length; a < b; a += 1) {
			// clone the configuration
			_config = Object.create(config);
			// insert the current element
			_config.element = config.elements[a];
			// start a new instance of the object
			instances[a] = new this.Main(_config, _context);
		}
		// return the instances
		return instances;
	};

	return (config.elements) ? this.each(config) : this.only(config);

};

// return as a require.js module
if (typeof module !== 'undefined') {
	exports = module.exports = Spinner;
}

// extend the class
Spinner.prototype.Main = function(config, context) {

	// PROPERTIES

	this.config = {
		'rot': 0,
		'delta': -0.005,
		'attenuation': 1.05,
		'direction': -1
	};

	for (var key in config) {
		this.config[key] = config[key];
	}

	this.assets = [];
	this.assetCount = 0;
	this.attenuation = 1;

	// METHODS

	this.init = function() {
		// if the target element exists
		if (this.config.element) {
			// set state to waiting
			this.config.element.className += ' waiting';
			// add the event handlers
			this.config.element.addEventListener('click', this.onLoadAssets.bind(this));
		}
	};

	this.redraw = function() {
		// calculate the active frame from the rotation
		var frame = Math.round((this.assetCount - 1) * this.config.rot);
		// for all frames
		for (var a = 0, b = this.assetCount; a < b; a += 1) {
			// reset the visibility
			this.assets[a].style.visibility = (a === frame) ? 'visible' : 'hidden';
		}
	};

	this.loop = function() {
		// recalculate
		this.config.rot += this.config.delta;
		this.config.rot -= (this.config.rot > 1) ? 1 : 0;
		this.config.rot += (this.config.rot < 0) ? 1 : 0;
		this.config.delta = this.config.delta / this.attenuation;
		// redraw
		this.redraw();
		// repeat
		window.requestAnimationFrame(this.loop.bind(this));
	};

	// EVENTS

	this.onLoadAssets = function(evt) {
		// cancel the click
		evt.preventDefault();
		// if the component is not active yet
		if (!/busy|active/.test(this.config.element.className)) {
			// set the component as busy
			this.config.element.className = this.config.element.className.replace(/ waiting/g, ' busy');
			// wait for a redraw
			var _this = this;
			window.requestAnimationFrame(function() {
				// insert all the frames
				for (var a = _this.config.min; a <= _this.config.max; a += 1) {
					// calculate the index
					var index = a - _this.config.min;
					// create the image
					_this.assets[index] = document.createElement('img');
					_this.assets[index].setAttribute('src', _this.config.path.replace(/{i}/g, a));
					_this.assets[index].addEventListener('load', _this.onAssetsComplete.bind(_this));
					// insert it
					_this.config.element.appendChild(_this.assets[index]);
				}
			});
		}
	};

	this.onAssetsComplete = function(evt) {
		// count the asset
		this.assetCount += 1;
		// if the assets are complete
		if (this.assetCount === this.config.max - this.config.min) {
			// make the component active
			this.config.element.className = this.config.element.className.replace(/ busy/g, ' active');
			// add the mouse handler
			this.config.element.addEventListener('mousedown', this.onInteract.bind(this, true));
			this.config.element.addEventListener('mouseup', this.onInteract.bind(this, false));
			this.config.element.addEventListener('mouseout', this.onAbandoned.bind(this, false));
			this.config.element.addEventListener('mouseover', this.onAbandoned.bind(this, true));
			this.config.element.addEventListener('mousemove', this.onMoved.bind(this));
			// add the touch handler
			this.config.element.addEventListener('touchstart', this.onInteract.bind(this, true));
			this.config.element.addEventListener('touchend', this.onInteract.bind(this, false));
			this.config.element.addEventListener('touchmove', this.onMoved.bind(this));
			// show the first frame
			this.redraw();
			this.loop();
		}
	};

	this.onAbandoned = function(state, evt) {
		clearTimeout(this.abandonedTimeout);
		if (!state) this.abandonedTimeout = setTimeout(this.onInteract.bind(this, false), 100);
	};

	this.onInteract = function(state, evt) {
		// cancel any dragging that may occur
		if (evt) evt.preventDefault();
		// set the interaction state
		this.interaction = state;
		// halt the rotation
		this.attenuation = (state) ? this.config.attenuation : 1;
	};

	this.onMoved = function(evt) {
		// cancel any dragging that may occur
		evt.preventDefault();
		// if there's interaction
		if (this.interaction) {
			// harvest the coordinate
			var xpos = evt.clientX || evt.touches[0].clientX;
			// if there was a previous measurement
			if (this.config.xpos) {
				// update the rotation based on the movement
				this.config.delta -= this.config.direction * Math.min(Math.max((this.config.xpos - xpos) / this.config.element.offsetWidth, -0.0007), 0.0007);
				this.config.delta = Math.min(Math.max(this.config.delta, -0.05), 0.05);
			}
			// store the new coordinate
			this.config.xpos = xpos;
			// update the rotation frame
			this.redraw();
		}
	};

	this.init();

};
